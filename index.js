// Your code here
const form = document.querySelector('#weather-app form');
const input = document.querySelector('#weather-search');
const weatherSection = document.getElementById('weather');

const API_KEY = '6a0888f3963b1b35a33ecb1b78280346';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    input.value = '';
    weatherSection.innerHTML = '';
    try {
        const url = `${BASE_URL}?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=imperial`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const data = await response.json();
        renderWeather (data);
    } catch (error) {
        renderNotFound();
    }
});

const renderWeather = (data) => {
    const {
        name: city,
        sys: { country },
        coord: { lat, lon },
        weather: [{ icon, description }],
        main: { temp, feels_like },
        dt,
    } = data;

    const updatedTime = new Date(dt * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
    });

    weatherSection.innerHTML = `
    <h2>${city}, ${country}</h2>
    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank">
    Click to view map
    </a>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
    <p style="text-transform: capitalize;">${description}</p><br>
    <p>Current: ${temp.toFixed(2)}&deg F</p>
    <p>Feels Like: ${feels_like.toFixed(2)}&deg F</p><br>
    <p>Last Updated: ${updatedTime}</p>`;
};

const renderNotFound = () => {
    weatherSection.innerHTML = `<h2>Location not found</h2>`;
};