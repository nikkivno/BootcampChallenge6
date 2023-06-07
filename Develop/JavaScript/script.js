const key = '2e309e024080180b521d8b0a1763af0d';


// Search bar to API

document.querySelector('#search').addEventListener("submit", function (event) {
    event.preventDefault();
    let location = document.getElementById('locationSearch').value;
    getWeather(location);
    getForecast(location);
})

// Current Time

function displayCurrentDate() {
    let currentDate = dayjs().format('MMM, D')
    document.querySelector('#currentDate').textContent= 'Date: ' + currentDate;
}

// Current Weather 

function getWeather(city) {
    const keyUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=ad42d5d3bd5325566ad7fa64ed6aa17a&units=metric';
    fetch(keyUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const cityName = data.name;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const feelsLike = data.main.feels_like;
            const windSpeed = data.wind.speed;

            document.querySelector('.location').textContent = cityName;
            document.querySelector('#currentTemp').textContent = 'Temperature: ' + temperature +'°C';
            document.querySelector('#currentHumidity').textContent = 'Humidity: ' + humidity;
            document.querySelector('#currentFeelsLike').textContent = 'Feels Like: ' + feelsLike;
            document.querySelector('#currentWindSpeed').textContent = 'Wind Speed: ' + windSpeed;
        })
        .catch(error => {
            console.log('Error:', error)
        });
}

// 5 day predicted forecast

function getForecast(city) {
    const keyUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=ad42d5d3bd5325566ad7fa64ed6aa17a&units=metric';
    fetch(keyUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let cardIndex = 0;
        for (i = 0; i < data.list.length; i++)  {
            if (data.list[i].dt_txt.includes('12:00:00')){
                console.log(data.list[i])
                let date = document.querySelectorAll('.date')[cardIndex];
                date.textContent= data.list[i].dt_txt.split(' ')[0];
                
                let temp = document.querySelectorAll('.temp')[cardIndex];
                temp.textContent='Temperature: ' + data.list[i].main.temp + '°C';
                
                let humidity = document.querySelectorAll('.humidity')[cardIndex];
                humidity.textContent='Humidity: ' + data.list[i].main.humidity;
                
                let windSpeed = document.querySelectorAll('.windSpeed')[cardIndex];
                windSpeed.textContent='Wind Speed: ' + data.list[i].wind.speed;

                cardIndex++
            }
        }

        })
        .catch(error => {
            console.log('Error:', error)
        });
}

// Local Storage 

function storeSearch() {
    const searchHistory = localStorage.getItem('weatherSearchHistory');
    const parsedSearchHistory = searchHistory ? JSON.parse(searchHistory) : [];
    const newSearchTerm = document.getElementById('locationSearch').value;
    
    parsedSearchHistory.push(newSearchTerm);

    const updatedSearchHistory = JSON.stringify(parsedSearchHistory);

    localStorage.setItem('weatherSearchHistory', updatedSearchHistory);
  }
