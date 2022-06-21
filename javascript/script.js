//date

let now = new Date();

let currentDay = document.querySelector("#current-day");

let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = week[now.getDay()];
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hour < 10) {
  hour = `0${hour}`;
}

currentDay.innerHTML = `${day}  ${date} ${month}  ${hour}:${minutes}`;
console.log(`${day}  ${date} ${month}  ${hour}:${minutes}`);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//main

function getForecast(geocoords) {
  console.log(geocoords);
  let apiKey = "0bc997255f5a3bef3c5d47209c8da7d5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${geocoords.lat}&lon=${geocoords.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeatherForecast);
}

function showData(request) {
  let temperature = Math.round(request.data.main.temp);
  console.log(request);
  let degrees = document.querySelector("#temp-number");
  degrees.innerHTML = `${temperature}`;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${request.data.name}, ${request.data.sys.country}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${request.data.main.humidity}%`;
  let weather = document.querySelector("#weather");
  weather.innerHTML = `${request.data.weather[0].main}`;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `${request.data.wind.speed} km/h`;
  let weatherIcon = document.querySelector("#current-weather");
  console.log(weatherIcon);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${request.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = request.data.main.temp;
  celsiusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  getForecast(request.data.coord);
}

function getTemperature(city) {
  let apiKey = "0bc997255f5a3bef3c5d47209c8da7d5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;

  axios.get(apiUrl).then(showData);
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");
  getTemperature(input.value.toLowerCase());
}

//current location
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

function getCurrentLocation(geocoords) {
  let apiKey = "0bc997255f5a3bef3c5d47209c8da7d5";
  let lon = Math.round(geocoords.coords.longitude);
  let lat = Math.round(geocoords.coords.latitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showData);
}

let search = document.querySelector("form");
search.addEventListener("submit", searchCity);

let current = document.querySelector("#current-location");
current.addEventListener("click", getLocation);
//unit conversion
function degreesFahrenheit(event) {
  event.preventDefault();
  let fahrenheitCalculation = (celsiusTemperature * 9) / 5 + 32;
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let temperatureElement = document.querySelector("#temp-number");
  temperatureElement.innerHTML = Math.round(fahrenheitCalculation);
}

function degreesCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-number");
  celsiusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", degreesFahrenheit);

let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", degreesCelsius);

//forecast

function showWeatherForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let weatherForecast = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row" id= "weather-forecast">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
                  
                     <div id="forecast-${index}" class="col-12">
                     <div class="weather-forecast-date">
                      ${formatDay(forecastDay.dt)}<br /></div>
                         <img id="pic-${index}" style="display:'';" src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" width=30%/ class="forecast-icons"> <br/>
                          <span style="display: none;" class="span1" id="max-${index}"> ${Math.round(
          forecastDay.temp.max
        )}º|</span><span style="display: none;" class="span2" id="min-${index}">${Math.round(
          forecastDay.temp.min
        )}º</span>
                 
                 
                    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  weatherForecast.innerHTML = forecastHTML;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      let forecast = document.querySelector(`#forecast-${index}`);
      forecast.addEventListener("mouseover", showForecastTemp);
      forecast.addEventListener("mouseout", showForecastImage);
    }
  });
}

function showForecastTemp() {
  let days = ["0", "1", "2", "3", "4"];

  days.forEach(function (day) {
    let max = document.querySelector(`#max-${day}`);
    max.style.display = "inline";
    let min = document.querySelector(`#min-${day}`);
    min.style.display = "initial";
    let icon = document.querySelector(`#pic-${day}`);
    icon.style.display = "none";
  });
}

function showForecastImage() {
  let days = ["0", "1", "2", "3", "4"];

  days.forEach(function (day) {
    let max = document.querySelector(`#max-${day}`);
    max.style.display = "none";
    let min = document.querySelector(`#min-${day}`);
    min.style.display = "none";
    let icon = document.querySelector(`#pic-${day}`);
    icon.style.display = "initial";
  });
}
