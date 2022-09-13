const getElement = (id) => document.getElementById(id);

const humidity = getElement('current-humidity');
const pressure = getElement('current-pressure');
const temperature = getElement('current-temperature');
const windSpeed = getElement('current-wind-speed');
const summary = getElement('weather-summary');
const getWeatherButton = getElement('getWeather');

const getCurrentLocation = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            getGeoData(position.coords.latitude, position.coords.longitude);
    })
    }else {
        alert('NO geolocation API in your browser!');
    }
    
};

const getGeoData = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f3c5b0b7cafbe8ee1d7bac96a1e932b9`)
        .then(response => response.json())
        .then(data => displayGeoData(data))
        .catch(error => {
            console.log(error)
        })
};

const displayGeoData = (data) => {
    humidity.innerText = `Humidity: ${data.main.humidity} %`;
    pressure.innerText = `Pressure: ${data.main.pressure} mm `;
    temperature.innerText = `Temperature: ${Math.round(data.main.temp-273.15)} С`;
    windSpeed.innerText = `Wind speed: ${data.wind.speed} m/s`;
}


getWeatherButton.addEventListener('click', getCurrentLocation)