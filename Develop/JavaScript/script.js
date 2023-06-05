const tempEl = document.querySelector('.temp');
const windEl = document.querySelector('.wind');
const humidityEl = document.querySelector('.humidity');

const lat = '0.12';
const lon = '51.50';
const key = '2e309e024080180b521d8b0a1763af0d';
const keyUrl ='https://api.openweathermap.org/data/3.0/onecall?lat=0.12&lon=51.50&appid=ad42d5d3bd5325566ad7fa64ed6aa17a';

fetch(keyUrl)
.then(response => response.json())
.then(data => {
    const temperature = data.main.temp; 
    const humidity = date.main.humidity;

    document.querySelector('.temp').textContent = 'Temperature';
    document.querySelector('.humidity').textContent = 'Humidity';
})
.catch(error => {
    // console.log('Error:', error)
});
