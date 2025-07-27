const API_KEY = '232fd12faa92a848e25b5c3df4a2199f'; // Get from https://openweathermap.org/

// DOM Elements
const cityInput = document.getElementById('city-input');
const fetchWeatherBtn = document.getElementById('fetch-weather');
const getLocationBtn = document.getElementById('get-location');
const weatherResult = document.getElementById('weather-result');

// Event Listeners
fetchWeatherBtn.addEventListener('click', fetchWeatherByCity);
getLocationBtn.addEventListener('click', fetchWeatherByLocation);

// Fetch weather by city name
async function fetchWeatherByCity() {
  const city = cityInput.value.trim();
  if (!city) return alert('Please enter a city name');

  try {
    const data = await getWeatherData(`q=${city}`);
    displayWeather(data);
    checkJoggingConditions(data);
  } catch (error) {
    alert('Failed to fetch weather. Please try again.');
    console.error(error);
  }
}

// Fetch weather by user location
function fetchWeatherByLocation() {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const data = await getWeatherData(`lat=${latitude}&lon=${longitude}`);
        displayWeather(data);
        checkJoggingConditions(data);
      } catch (error) {
        alert('Failed to fetch weather for your location.');
        console.error(error);
      }
    },
    (error) => {
      alert('Unable to retrieve your location. Please enter a city manually.');
    }
  );
}

// Get weather data from API
async function getWeatherData(query) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&appid=${API_KEY}`
  );
  const data = await response.json();
  
  if (data.cod !== 200) {
    throw new Error(data.message || 'City not found');
  }
  
  return data;
}

// Display weather data
function displayWeather(data) {
  weatherResult.classList.remove('hidden');
  
  document.getElementById('city-name').textContent = data.name;
  document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById('weather-desc').textContent = data.weather[0].description;
  document.getElementById('wind-speed').textContent = data.wind.speed;
  document.getElementById('humidity').textContent = data.main.humidity;
  
  const iconCode = data.weather[0].icon;
  document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Check if weather is good for jogging
function checkJoggingConditions(data) {
  const recommendation = document.getElementById('jogging-recommendation');
  const temp = data.main.temp;
  const weather = data.weather[0].main.toLowerCase();
  const windSpeed = data.wind.speed;
  
  // Conditions for good jogging weather
  const isGoodTemp = temp >= 15 && temp <= 30;
  const isNoRain = !weather.includes('rain');
  const isNotWindy = windSpeed < 20;
  
  if (isGoodTemp && isNoRain && isNotWindy) {
    recommendation.textContent = '✅ Great weather for jogging!';
    recommendation.className = 'recommendation good';
  } else {
    recommendation.textContent = '❌ Not ideal for jogging';
    recommendation.className = 'recommendation bad';
  }
}