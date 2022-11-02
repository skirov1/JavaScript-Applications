function solve() {
    let baseUrl = 'http://localhost:3030/jsonstore/bus/schedule';
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let infoBox = document.getElementsByClassName('info')[0];
    let stopName = '';
    let nextStopId = 'depot';

    function depart() {
        departBtn.disabled = true;
        arriveBtn.disabled = false;
        fetch(`${baseUrl}/${nextStopId}`)
            .then(response => response.json())
            .then(data => {
                stopName = data.name;
                nextStopId = data.next;
                infoBox.textContent = `Next stop ${stopName}`  
            })
            .catch(err => {
                infoBox.textContent = 'Error';
            })
        }

    function arrive() {
        departBtn.disabled = false;
        arriveBtn.disabled = true;
        infoBox.textContent = `Arriving at ${stopName}`
    }

    return {
        depart,
        arrive
    };
}

let result = solve();