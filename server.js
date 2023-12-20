const express = require('express');
const bodyParser = require('body-parser');
const { getRealWeatherData } = require('./weather-api'); // Asegúrate de reemplazar con la ruta correcta de tu módulo

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/api/weather/:city", async (req, res) => {
    const city = req.params.city;
    try {
        const weatherData = await getRealWeatherData(city);
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching real weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/weather', async (req, res) => {
    const city = req.body.city;

    try {
        const weatherData = await getRealWeatherData(city);
        res.json(weatherData);
    } catch (error) {
        console.log('Error fetching real weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
