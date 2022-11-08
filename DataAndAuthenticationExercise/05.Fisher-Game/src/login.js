document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');

    try {
        if(email == '') {
            throw new Error('Email is required!');
        }
        if (password == '') {
            throw new Error('Password is required!');
        }

        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();

        sessionStorage.setItem('accessToken', data.accessToken);

        document.querySelector('span').textContent = email;
        
        window.location = 'http://127.0.0.1:5500/05.Fisher-Game/src/index.html';
        
    } catch(err) {
        document.querySelector('p.notification').textContent = err.message;
    }
}