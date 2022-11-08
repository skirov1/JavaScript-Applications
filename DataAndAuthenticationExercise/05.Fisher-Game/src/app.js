window.addEventListener('load', async () => {
    document.getElementById('logout').style.display = 'none';
    document.getElementById('logout').addEventListener('click', () => {
        const token = sessionStorage.getItem('accessToken');
    
        fetch('http://localhost:3030/users/logout', {
            headers : {
                'X-Authorization': token
            }
        })
    
        sessionStorage.removeItem('accessToken');
        window.location = 'http://127.0.0.1:5500/05.Fisher-Game/src/index.html';
    })
    checkUser();
})

function checkUser() {
    const token = sessionStorage.getItem('accessToken');

    if(token != null) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        document.getElementById('logout').style.display = 'inline-block';
    } else {
        document.getElementById('guest').style.display = 'inline-block';
    }
}