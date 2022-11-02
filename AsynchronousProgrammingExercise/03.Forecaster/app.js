function attachEvents() {
    let baseUrl = 'http://localhost:3030/jsonstore/forecaster'
    let locationInput = document.getElementById('location');
    let getWeatherBtn = document.getElementById('submit');
    let forecastBox = document.getElementById('forecast');
    let currentForecast = document.getElementById('current');
    let upcomingForecast = document.getElementById('upcoming');
    let forecastSymbol = '';

    let locationName = '';
    let locationCode = '';
    
    getWeatherBtn.addEventListener('click', () => {
        fetch(`${baseUrl}/locations`)
            .then(response => response.json())
            .then(data => {
                data.forEach(location => {
                    if(locationInput.value == location.name)
                    {
                        locationName = location.name;
                        locationCode = location.code;

                        fetch(`${baseUrl}/today/${locationCode}`)
                            .then(response => response.json())
                            .then(data => {
                                let locationForecast = data.forecast;
                                let locationCondititon = locationForecast.condition;

                                let forecastsDiv = createTag('div', null, 'forecasts');
                                let conditionSpan = createTag('span', null, 'condition');
                                conditionSpan.appendChild(createTag('span', data.name, 'forecast-data'));
                                conditionSpan.appendChild(createTag('span', `${locationForecast.low}°/${locationForecast.high}°`, 'forecast-data'));
                                conditionSpan.appendChild(createTag('span', locationCondititon, 'forecast-data'));
                                
                                switch(locationCondititon) {
                                    case 'Sunny': forecastSymbol = '☀'; break;
                                    case 'Partly sunny': forecastSymbol = '⛅'; break;
                                    case 'Overcast': forecastSymbol = '☁'; break;
                                    case 'Rain': forecastSymbol = '☂'; break;
                                    case 'Degrees': forecastSymbol = '°'; break;
                                }

                                forecastsDiv.appendChild(createTag('span', forecastSymbol, 'condition symbol'))
                                forecastsDiv.appendChild(conditionSpan);

                                currentForecast.appendChild(forecastsDiv);

                                forecastBox.style.display = 'block';
                            })

                            fetch(`${baseUrl}/upcoming/${locationCode}`)
                            .then(response => response.json())
                            .then(data => {
                                let upcomingForecastBox = createTag('div', null, 'forecast-info');
                                data.forecast.forEach(location => {
                                    let upcomingSpan = createTag('span', null, 'upcoming');
                                    let locationLowTemp = location.low;
                                    let locationHighTemp = location.high;
                                    let locationCondititon = location.condition;
                                    
                                    switch(locationCondititon) {
                                        case 'Sunny': forecastSymbol = '☀'; break;
                                        case 'Partly sunny': forecastSymbol = '⛅'; break;
                                        case 'Overcast': forecastSymbol = '☁'; break;
                                        case 'Rain': forecastSymbol = '☂'; break;
                                        case 'Degrees': forecastSymbol = '°'; break;
                                    }

                                    upcomingSpan.appendChild(createTag('span', forecastSymbol, 'symbol'));
                                    upcomingSpan.appendChild(createTag('span', `${locationLowTemp}°/${locationHighTemp}°`, 'forecast-data'));
                                    upcomingSpan.appendChild(createTag('span', locationCondititon, 'forecast-data'));

                                    upcomingForecastBox.appendChild(upcomingSpan);
                                });

                                upcomingForecast.appendChild(upcomingForecastBox);
                            })
                    }
                })
            })
    })

    function createTag(tag, text = null, className = null, id = null, type = null) {
        let el = document.createElement(tag);
        if (text) { el.textContent = text; }
        if (type) { el.type = type; }
        if (id) { el.id = id; }
        if (className) { el.className = className; }
        return el;

    }
}

attachEvents();