function formatDate(timeStamp) {
  let currentDate = new Date(timeStamp);
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
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let date = document.querySelector("#date");
  return `${day} ${hour}:${minutes}`;
}
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
  let humidity = document.querySelector("#Humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let realFeel = document.querySelector("#real-feel");
  realFeel.innerHTML = Math.round(response.data.main.feels_like);
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  function tempToFar(event) {
    event.preventDefault();
    centigrade.classList.remove("active");
    farenheit.classList.add("active");
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
    farenheit.classList.remove("active");
    centigrade.classList.add("active");

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
