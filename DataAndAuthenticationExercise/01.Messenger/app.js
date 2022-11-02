function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/messenger';
    const sendBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');
    const messages = document.getElementById('messages');
    const nameInput = document.getElementsByName('author')[0];
    const messageInput = document.getElementsByName('content')[0];

    refreshBtn.addEventListener('click', getData);
    sendBtn.addEventListener('click', postData);

    async function getData() {
        const response = await fetch(baseUrl);
        const data = await response.json();

        messages.textContent = displayMessage(data);
    }

    async function postData() {
        const author = nameInput.value;
        const content = messageInput.value;

        const data = {
            author : author,
            content : content
        };

        const response = await fetch(baseUrl, {
            method : 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    function displayMessage(data) {
        let messageRes = [];
        Array.from(Object.values(data).map( (m) => {
            messageRes.push(`${m.author}: ${m.content}`);
        }));

        return messageRes.join('\n');
    }
}

attachEvents();