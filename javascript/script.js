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
  hour = `0${hour};`;
}

currentDay.innerHTML = `${day}  ${date} ${month}  ${hour}:${minutes}`;
console.log(`${day}  ${date} ${month}  ${hour}:${minutes}`);

function showData(request) {
  let temperature = Math.round(request.data.main.temp);
  console.log(request);
  let degrees = document.querySelector("#degrees-celsius");
  degrees.innerHTML = `${temperature}ºC`;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${request.data.name}, ${request.data.sys.country}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${request.data.main.humidity}%`;
  let weather = document.querySelector("#weather");
  weather.innerHTML = `${request.data.weather[0].main}`;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `${request.data.wind.speed} km/h`;
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

function getCurrentLocation(geocords) {
  let apiKey = "0bc997255f5a3bef3c5d47209c8da7d5";
  let lon = Math.round(geocords.coords.longitude);
  let lat = Math.round(geocords.coords.latitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showData);
}

let search = document.querySelector("form");
search.addEventListener("submit", searchCity);

let current = document.querySelector("#current-location");
current.addEventListener("click", getLocation);

//degrees change

//function currentTemp() {
//let celsius = document.querySelector("#degrees-celsius");
// if (celsius.innerHTML === "22ºC") {
// celsius.innerHTML = "ºC";
//} else {
//celsius.innerHTML = "22ºC";
//}

//let fahrenheit = document.querySelector("#degrees-fahrenheit");
//if (fahrenheit.innerHTML === "72ºF") {
//fahrenheit.innerHTML = "ºF";
//} else {
//fahrenheit.innerHTML = "72ºF";
//}
//}

//let temp = document.querySelector("#current-temp");
//temp.addEventListener("click", currentTemp);
