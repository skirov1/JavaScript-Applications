let userData = null;

window.addEventListener('load', onLoad);

document.getElementById('addForm').addEventListener('submit', createCatch);
document.querySelector('.load').addEventListener('click', onLoadCatch);

document.getElementById('logout').addEventListener('click', async () => {
    const header = getHeader('get', '');

    const response = await fetch('http://localhost:3030/users/logout', header);
    sessionStorage.clear();
    onLoad();
})

function onLoad() {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    const catches = document.getElementById('catches');
    const token = sessionStorage.getItem('accessToken');
    const userName = document.querySelector('p.email span');
    const addBtn = document.querySelector('.add');
    if (token) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'inline-block';
        userName.textContent = sessionStorage.getItem('email');
        addBtn.disabled = false;
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
        userName.textContent = 'guest';
        addBtn.disabled = true;
    }
    catches.addEventListener('click', eventHandler);
}

async function onLoadCatch() {
    const response = await fetch('http://localhost:3030/data/catches');

    const data = await response.json();
    
    document
    .getElementById('catches')
    .replaceChildren(...data.map(createCatch));
}

function createCatch(data) {
    const isOwner = userData && data._ownerId === userData.id;

    const div = document.createElement('div');
    div.classList.add('catch');
    div.dataset.id = data._id;

    const html = `
	<label>Angler</label>
	<input type="text" class="angler" value="${data.angler}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Weight</label>
	<input type="text" class="weight" value="${data.weight}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Species</label>
	<input type="text" class="species" value="${data.species}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Location</label>
	<input type="text" class="location" value="${data.location}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Bait</label>
	<input type="text" class="bait" value="${data.bait}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Capture Time</label>
	<input type="number" class="captureTime" value="${data.captureTime}" ${
        !isOwner ? 'disabled' : ''
    }>
	<button class="update" data-id="${data._ownerId}" ${!isOwner ? 'disabled' : ''}>
		Update
	</button>
	<button class="delete" data-id="${data._ownerId}" ${!isOwner ? 'disabled' : ''}>
		Delete
	</button>
`;
    div.innerHTML = html;
    return div;
}

async function onCreate(body) {
    const header = getHeader('post', body);
    const response = await fetch('http://localhost:3030/data/catches', header);
    const data = await response.json();
    return data;
}

async function onDelete(ev) {
    const catchId = ev.target.parentNode.dataset.id;
    ev.target.parentNode.remove();

    await fetch(`http://localhost:3030/data/catches/${catchId}`, {
        method: 'delete',
        headers: {
            'X-authorization': userData.accessToken,
            'content-type': 'application/json',
        },
    });
}

async function onUpdate(ev) {
    const catchId = ev.target.parentNode.dataset.id;

    const data = Object.fromEntries(
        Array.from(ev.target.parentNode.children)
            .filter(el => el.nodeName == 'INPUT')
            .map(el => [el.className, el.value])
    );

    const res = await fetch(`http://localhost:3030/data/catches/${catchId}`, {
        method: 'put',
        headers: {
            'X-authorization': userData.accessToken,
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

function eventHandler(ev) {
    if (ev.target.nodeName !== 'BUTTON') {
        return;
    }
    ev.target.className == 'update' ? onUpdate(ev) : onDelete(ev);
}

function getHeader(method, body) {
    const token = sessionStorage.getItem('accessToken');
    const header = {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
    }
    if(body) {
        header.body = JSON.stringify(body);
    }
    return header;
}