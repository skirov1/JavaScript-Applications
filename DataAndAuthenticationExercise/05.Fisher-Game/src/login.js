document.querySelector('form').addEventListener('submit', onSubmit);
document.querySelectorAll('a').forEach(x => x.classList.remove('active'));
document.getElementById('login').classList.add('active');

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

        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email,
            accessToken: data.accessToken,
            id: data._id
        }));

        document.querySelector('span').textContent = email;
        
        window.location = './index.html';
        
    } catch(err) {
        document.querySelector('p.notification').textContent = err.message;
    }
}