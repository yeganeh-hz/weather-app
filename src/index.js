function showTemp(response) {
  let tempC = Math.round(response.data.main.temp);
  let currentTempreture = document.querySelector("#current-temp");
  currentTempreture.innerHTML = tempC;
  let tempMin = document.querySelector("#temp-min");
  let minTempC = Math.round(response.data.main.temp_min);
  tempMin.innerHTML = `${minTempC}°C`;
  let maxTempC = Math.round(response.data.main.temp_max);
  let tempMax = document.querySelector("#temp-max");
  tempMax.innerHTML = `${maxTempC}°C`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  function tempToFar(event) {
    event.preventDefault();
    let tempToFarenheit = Math.round(response.data.main.temp * 1.8 + 32);
    currentTempreture.innerHTML = tempToFarenheit;
    let minTempF = Math.round(response.data.main.temp_min * 1.8 + 32);
    tempMin.innerHTML = `${minTempF}°F`;
    let maxTempF = Math.round(response.data.main.temp_max * 1.8 + 32);
    tempMax.innerHTML = `${maxTempF}°F`;
  }
  let farenheit = document.querySelector(".farenheit");
  farenheit.addEventListener("click", tempToFar);
  function tempToCenti(event) {
    event.preventDefault();
    currentTempreture.innerHTML = tempC;
    tempMin.innerHTML = `${minTempC}°C`;
    tempMax.innerHTML = `${maxTempC}°C`;
  }

  let centigrade = document.querySelector(".centigrade");
  centigrade.addEventListener("click", tempToCenti);
}

function searchEngine(event) {
  event.preventDefault();
  let search = document.querySelector("#search-engine");
  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = search.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=4fab9024e2cecbaa1a0258f6ff898680&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let searchButton = document.querySelector("#submit-form");
searchButton.addEventListener("submit", searchEngine);

let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
let today = document.querySelector("#today");
today.innerHTML = day;
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();
let time = document.querySelector(".time");
if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${hour}:${minutes}`;

// this is for testing a new commit
