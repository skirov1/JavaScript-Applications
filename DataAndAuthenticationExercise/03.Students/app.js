(async function solution() {
    const baseUrl = 'http://localhost:3030/jsonstore/collections/students';
    document.getElementById('form').addEventListener('submit', onSubmit);
    const table = document.querySelector('#results tbody');

    const response = await fetch(baseUrl);
    const data = await response.json();


    Object.values(data).forEach((student) => {
        const tr = document.createElement("tr");
        Object.values(student)
          .slice(0, -1)
          .forEach((val) => {
            const cell = tr.insertCell();
            cell.textContent = val;
          });
        table.appendChild(tr);
      });

    async function onSubmit(event) {
        event.preventDefault();
        
        const data = new FormData(event.target);

        const student = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            facultyNumber: data.get('facultyNumber'),
            grade: data.get('grade')
        }

         await fetch(baseUrl, {
            method : 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
        
    }
})();
