const key = '2e309e024080180b521d8b0a1763af0d';

// const weatherImage = document.querySelectorAll('#weatherImage')
// const sunImage = "https://openweathermap.org/img/wn/01d@2x.png";
// const sunCloudImage = " https://openweathermap.org/img/wn/02d@2x.png"
// const cloudImage = "https://openweathermap.org/img/wn/03d@2x.png"
// const stormCloudImage = " https://openweathermap.org/img/wn/04d@2x.png"
// const stormRainImage = " https://openweathermap.org/img/wn/09d@2x.png"
// const sunRainImage = " https://openweathermap.org/img/wn/10d@2x.png"
// const lighteningImage = " https://openweathermap.org/img/wn/11d@2x.png"
// const snowImage = " https://openweathermap.org/img/wn/13d@2x.png"
// const mistImage = " https://openweathermap.org/img/wn/50d@2x.png"

// if (data.weather[0].main == "Clouds") {
//     weatherImage.src = cloudImage;
// } else if (data.weather[0].main == "Clear" ) {
//     weatherImage.src = sunImage;
// }  else if (data.weather[0].main == "Thunderstorm" ) {
//     weatherImage.src = lighteningImage;
// }   else if (data.weather[0].main == "Drizzle" ) {
//     weatherImage.src = sunImage
// }   else if (data.weather[0].main == "Rain" ) {
//     weatherImage.src = sunRainImage;
// }   else if (data.weather[0].main == "Snow" ) {
//     weatherImage.src = snowImage;
// }


// Search bar to API

document.querySelector('#search').addEventListener("submit", function (event) {
    event.preventDefault();
    let location = document.getElementById('locationSearch').value;
    getWeather(location);
    getForecast(location);
})

// Current Time

function displayCurrentDate() {
    let currentDate = dayjs().format('MMM D, YYYY')
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
            // const weatherImage = data.weather.icon;
            

            displayCurrentDate();

            document.querySelector('.location').textContent = cityName;
            document.querySelector('#currentTemp').textContent = 'Temperature: ' + temperature +'°C';
            document.querySelector('#currentHumidity').textContent = 'Humidity: ' + humidity;
            document.querySelector('#currentFeelsLike').textContent = 'Feels Like: ' + feelsLike;
            document.querySelector('#currentWindSpeed').textContent = 'Wind Speed: ' + windSpeed; 
            // weatherImage.document.querySelector('#weatherImage')

            // const weatherImage = document.querySelectorAll('#weatherImage')
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

                let weatherImage = document.querySelectorAll('.weatherImage')[cardIndex];
                weatherImage.src = `https://openweathermap.org/img/w/$%7Bdata.list[i].weather[0].icon%7D.png`;

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
