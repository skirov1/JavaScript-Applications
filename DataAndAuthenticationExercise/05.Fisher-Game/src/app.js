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
}

async function onLoadCatch() {
    const response = await fetch('http://localhost:3030/data/catches');

    const data = await response.json();
    return data;    
}

function createCatch(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    onCreate(data);
}

async function onCreate(body) {
    const header = getHeader('post', body);
    const response = await fetch('http://localhost:3030/data/catches', header);
    const data = await response.json();
    return data;
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