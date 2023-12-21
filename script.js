async function fetchWeather() {
    const city = document.getElementById("city").value;
    const weatherInfoContainer = document.getElementById("weather-info");

    try {
        const apiKey = '3d44bce85822d085e12abe8eba7e3380';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }

        const weatherData = await response.json();
        weatherInfoContainer.textContent = generateWeatherText(weatherData);
    } catch (error) {
        console.error(error);
        weatherInfoContainer.textContent = "Error fetching weather data. Please try again.";
    }
    
}
function generateWeatherText(weatherData) {
    return `
        Weather Information for ${weatherData.name}, ${weatherData.sys.country}
        Temperature: ${weatherData.main.temp}°C
        Humidity: ${weatherData.main.humidity}%
        Pressure: ${weatherData.main.pressure} hPa
        Wind Speed: ${weatherData.wind.speed} m/s
    `;
}
