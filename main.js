function initialize() {
  const apiKey = 'df59189ce5d7f9c060464802b2848b6f';
  const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
  const searchInput = document.querySelector('.search input');
  const searchButton = document.querySelector('.search button');
  const weatherIcon = document.querySelector('.weather-icon i');
  const menu = document.querySelector('.menu');
  const modal = document.querySelector('.q1');
  const buttonElem = document.querySelector('.modal__main button');

  function checkWeather(city) {
    const apiKey = 'df59189ce5d7f9c060464802b2848b6f';
    const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
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
