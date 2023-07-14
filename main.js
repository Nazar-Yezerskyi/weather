function createMenu() {
  const menu = document.createElement('div');
  menu.classList.add('menu');

  const weatherDiv = document.createElement('div');
  weatherDiv.classList.add('weather');

  const weatherIconDiv = document.createElement('div');
  weatherIconDiv.classList.add('weather-icon');

  const weatherIcon = document.createElement('i');
  weatherIcon.classList.add('fa-regular', 'fa-sun', 'fa-3x');

  weatherIconDiv.appendChild(weatherIcon);

  const tempHeading = document.createElement('h1');
  tempHeading.setAttribute('id','temp');
  tempHeading.innerHTML = '22 &#8451;';

  const cityHeading = document.createElement('h1');
  cityHeading.setAttribute('id','city');
  cityHeading.innerHTML = 'Lviv';

  weatherDiv.appendChild(weatherIconDiv);
  weatherDiv.appendChild(tempHeading);
  weatherDiv.appendChild(cityHeading);

  const detailDiv = document.createElement('div');
  detailDiv.classList.add('detail');

  const detailsDiv1 = document.createElement('div');
  detailsDiv1.classList.add('details');

  const dropletIcon = document.createElement('i');
  dropletIcon.classList.add('fa-regular', 'fa-droplet', 'fa-3x');

  const humidityHeading = document.createElement('h1');
  humidityHeading.setAttribute('id', 'humidity');
  humidityHeading.innerHTML = '50%';

  detailsDiv1.appendChild(dropletIcon);
  detailsDiv1.appendChild(humidityHeading);

  const detailsDiv2 = document.createElement('div');
  detailsDiv2.classList.add('details');

  const windIcon = document.createElement('i');
  windIcon.classList.add('fa-regular', 'fa-wind', 'fa-3x');

  const windHeading = document.createElement('h1');
  windHeading.setAttribute('id','wind');
  windHeading.innerHTML = '23 km/h';

  detailsDiv2.appendChild(windIcon);
  detailsDiv2.appendChild(windHeading);

  detailDiv.appendChild(detailsDiv1);
  detailDiv.appendChild(detailsDiv2);

  menu.appendChild(weatherDiv);
  menu.appendChild(detailDiv);

  return menu;
}


function checkWeather(apiUrl, city) {
  return fetch(apiUrl + city + '?key=DJN72HVKMNSNA7T9XK7F4FT9E')
    .then(response => response.json())
    .then(data => {
      console.log(data, "data");

      document.getElementById("city").innerHTML = data.resolvedAddress;
      document.getElementById("temp").innerHTML = Math.round((data.currentConditions.temp - 30) / 2) + "&#8451;";
      document.getElementById("humidity").innerHTML = data.currentConditions.humidity + "%";
      document.getElementById("wind").innerHTML = data.currentConditions.windspeed + " km/h";

      const weatherIcon = document.querySelector('.weather-icon i');
      setWeatherIcon(weatherIcon, data.currentConditions.conditions);
    });
}

function setWeatherIcon(weatherIcon, conditions) {
  switch (conditions) {
    case 'Partially cloudy':
    case 'Overcast':
      weatherIcon.className = "fa-sharp fa-regular fa-cloud fa-3x";
      break;
    case 'Rain':
      weatherIcon.className = "fa-solid fa-cloud-showers";
      break;
    case 'Clear':
      weatherIcon.className = "fa-regular fa-sun fa-3x";
      break;
    default:
      break;
  }
}


function toggleMenu(apiUrl) {
  const menu = document.querySelector('.menu');
  const searchInput = document.querySelector('.search input');
  if (!menu.classList.contains('menu_active')) {
    menu.classList.add('menu_active');
    checkWeather(apiUrl, searchInput.value);
  }
  checkWeather(apiUrl, searchInput.value);
}

function openModal() {
  const modal = document.querySelector('.modal_box');
  modal.classList.add('active');
  setTimeout(closeModal, 3000);
}

function closeModal() {
  const modal = document.querySelector('.modal_box');
  modal.classList.remove('active');
}

function initialize() {
  const apiKey = 'df59189ce5d7f9c060464802b2848b6f';
  const searchButton = document.querySelector('.search button');
  const buttonElem = document.querySelector('.modal__main button');
  const menu = createMenu();
  document.body.appendChild(menu);

  function searchButtonClick() {
    const searchInput = document.querySelector('.search input');
    const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    if (searchInput.value.trim() === '') {
      openModal();
    } else {
      toggleMenu(apiUrl);
    }
    searchInput.value = '';
  }

  function closeButtonClick() {
    closeModal();
  }

  buttonElem.addEventListener('click', closeButtonClick);
  searchButton.addEventListener('click', searchButtonClick);
}

document.addEventListener('DOMContentLoaded', initialize);
