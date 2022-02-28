// task 1 --------------------
const cities = {
    2643743: "London",
    625144: "Minsk",
    3099434: "Gdansk",
    703448: "Kyiv",
    498817: "Saint Petersburg",
    468902: "Yaroslavl",
    2147714: "Sydney"
}
const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "appid": "de150d5b3c45b8130de34768a349c444"
}
const weatherDiv = document.querySelector('.weather');
const select = document.createElement('select');
select.id = "city";
weatherDiv.insertAdjacentElement('afterbegin', select);

for (let key in cities) {
    let option = document.createElement('option');
    option.value = key;
    option.text = cities[key];
    select.appendChild(option);
}

function getWeather() {
    let cityId = select.value;
    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}

function showWeather(data) {
    console.log(data);
    document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    document.querySelector('.city-name').innerHTML = data.name;
    document.querySelector('.description').innerHTML = data.weather[0].description;
    document.querySelector('.temperature').innerHTML = `Temperature: ${Math.round(data.main.temp)}&deg`;
    document.querySelector('.temperature-feels-like').innerHTML = `Temperature feels like: ${Math.round(data.main.feels_like)}&deg`;
    document.querySelector('.wind-speed').innerHTML = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
}

getWeather();
document.querySelector('#city').onchange = getWeather;