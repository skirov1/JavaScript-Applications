function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';
    const list = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');

    loadBtn.addEventListener('click', getData);
    createBtn.addEventListener('click', postData);

    async function getData() {
        const response = await fetch(baseUrl);
        const data = await response.json();

        list.replaceChildren(...Object.values(data).map(createListItem));
    }

    async function postData() {
        const person = personInput.value;
        const phone = phoneInput.value;

        const data = {
            person: person,
            phone: phone
        };

        const response = await fetch(baseUrl, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        personInput.value = '';
        phoneInput.value = '';

        const responseData = await response.json();

        list.appendChild(createListItem(responseData));
    }

    async function deleteData(id, li) {
        await fetch(`${baseUrl}/${id}`, {
            method: 'delete'
        });

        li.remove();
    }

    function createListItem(record) {
        const li = document.createElement('li');
        li.textContent = `${record.person}: ${record.phone}`

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteData(record._id, li));
        li.appendChild(deleteBtn);

        return li;
    }
}

attachEvents();