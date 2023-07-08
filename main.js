const apiKey = 'df59189ce5d7f9c060464802b2848b6f'
const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const searchInput = document.querySelector(".search input")
const searchButton = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon i")
const menu = document.querySelector('.menu')

const modal = document.querySelector('.q1');
const buttonElem = document.querySelector ('.modal__main button');

async function checkWeather(city){
    const response = await fetch(apiUrl + city +'?key=DJN72HVKMNSNA7T9XK7F4FT9E'); 
    const data =  await response.json();
    console.log(data, "data");

    document.querySelector(".city").innerHTML = data.resolvedAddress;
    document.querySelector(".temp").innerHTML = Math.round((data.currentConditions.temp - 30)/2) + "&#8451";
    document.querySelector(".humidity").innerHTML = data.currentConditions.humidity + "%"; 
    document.querySelector(".wind").innerHTML = data.currentConditions.windspeed + " km/h";
    
   
    if (data.currentConditions.conditions == 'Partially cloudy') {
        weatherIcon.className = "fa-sharp fa-regular fa-cloud fa-3x";
    } else if (data.currentConditions.conditions == "Overcast") {
        weatherIcon.className = "fa-sharp fa-regular fa-cloud fa-3x";

    } else if (data.currentConditions.conditions == 'Rain') {
        weatherIcon.className = "fa-solid fa-cloud-showers";
    }
    else if (data.currentConditions.conditions == 'Clear') {
        weatherIcon.className = "fa-regular fa-sun fa-3x";
    }
    
}

function toggleMenu() {
    if (!menu.classList.contains('menu_active')) {
      menu.classList.add('menu_active'); 
      checkWeather(searchInput.value); 
    }
    checkWeather(searchInput.value)
  }
function openModal (){
    modalElem.classList.add('modal.active')
    }
  buttonElem.addEventListener('click', () =>{
    closeModal();
  })
    searchButton.addEventListener('click', () => {
      if (searchInput.value.trim() === '') {
        openModal();
        
      } else {
        
        toggleMenu();
      }
      searchInput.value = '';
    });
    
    function openModal() {
      modal.classList.add('active');
      setTimeout(closeModal, 3000);
    }
    
    function closeModal() {
      modal.classList.remove('active');
    }
  


 
