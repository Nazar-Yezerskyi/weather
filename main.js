function initialize() {
  const apiKey = 'df59189ce5d7f9c060464802b2848b6f';
  const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
  const searchInput = document.querySelector('.search input');
  const searchButton = document.querySelector('.search button');
  const menu = document.querySelector('.menu');
  const modal = document.querySelector('.q1');
  const buttonElem = document.querySelector('.modal__main button');
  const html = `
        <div class="menu">
            <div class="weather">
                <div class="weather-icon">
                    <i class="fa-regular fa-sun fa-3x"></i>
                </div>
                <h1 class="temp">22 &#8451;</h1>
                <h1 class="city">Lviv</h1>
            </div>
            <div class="detail">
                <div class="details">
                    <i class="fa-regular fa-droplet fa-3x"></i>
                    <h1 class="humidity">50%</h1>
                </div>
                <div class="details">
                    <i class="fa-regular fa-wind fa-3x"></i>
                    <h1 class="wind">23 km/h</h1>
                </div>
            </div>
        </div>
  `;
   menu.innerHTML = html;
   const weatherIcon = document.querySelector('.weather-icon i');

  function checkWeather(city) {
    fetch(apiUrl + city + '?key=DJN72HVKMNSNA7T9XK7F4FT9E')
    .then(response => response.json())
    .then(data => {
        console.log(data, "data");

        document.querySelector(".city").innerHTML = data.resolvedAddress;
        document.querySelector(".temp").innerHTML = Math.round((data.currentConditions.temp - 30) / 2) + "&#8451;";
        document.querySelector(".humidity").innerHTML = data.currentConditions.humidity + "%";
        document.querySelector(".wind").innerHTML = data.currentConditions.windspeed + " km/h";

      
        switch (data.currentConditions.conditions) {
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
    })
    

  }

  function toggleMenu() {
    if (!menu.classList.contains('menu_active')) {
      menu.classList.add('menu_active');
      checkWeather(searchInput.value);
    }
    checkWeather(searchInput.value);
  }

  function openModal() {
    modal.classList.add('active');
    setTimeout(closeModal, 3000);
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  buttonElem.addEventListener('click', closeModal);

  searchButton.addEventListener('click', function () {
    if (searchInput.value.trim() === '') {
      openModal();
    } else {
      toggleMenu();
    }
    searchInput.value = '';
  });
}

document.addEventListener('DOMContentLoaded', initialize);
