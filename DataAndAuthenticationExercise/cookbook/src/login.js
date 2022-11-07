document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');

    try {
        if(email == '') {
            document.querySelector('[name="email"]').style.border = '1px solid red';
            throw new Error('Email is required!');
        }
        if (password == '') {
            document.querySelector('[name="password"]').style.border = '1px solid red';
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

        window.location = '/';

    } catch(err) {
        alert(err.message);
    }
}