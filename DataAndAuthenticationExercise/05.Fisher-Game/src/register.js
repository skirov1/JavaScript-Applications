document.querySelector('form').addEventListener('submit', onSubmit);
document.querySelectorAll('a').forEach(x => x.classList.remove('active'));
document.getElementById('register').classList.add('active');

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('rePass');

    try {
        if(email == '' || password == '') {
            throw new Error('All fields are required!');
        }
        if(password != repass) {
            throw new Error('Passwords don\'t match!');
        }

        const response = await fetch('http://localhost:3030/users/register', {
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
            throw Error(error.message);
        }

        const data = await response.json();

        sessionStorage.setItem('accessToken', data.accessToken);

        window.location = 'http://127.0.0.1:5500/05.Fisher-Game/src/index.html'; 

    } catch(err) {
        document.querySelector('p.notification').textContent = err.message;
    }
}