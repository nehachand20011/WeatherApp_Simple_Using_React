import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { TiWeatherDownpour, TiWeatherSunny, TiWeatherCloudy } from 'react-icons/ti';

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const apiKey = '6159a30eb1b23e7f288164e5091bda1a'; //open weather  actual API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

      const response = await axios.get(apiUrl);
      const { main, weather: [{ description, icon }] } = response.data;
      const temperature = main.temp;
      const feelsLike = main.feels_like;
      const humidity = main.humidity;
      const windSpeed = response.data.wind.speed;

      setWeather({ temperature, description, feelsLike, humidity, windSpeed, icon });
    } catch (error) {
      console.error(error);
      setWeather(null);
    }
  };

  const renderWeatherIcon = () => {
    if (weather) {
      if (weather.description.includes('rain')) {
        return <TiWeatherDownpour />;
      } else if (weather.description.includes('clear')) {
        return <TiWeatherSunny />;
      } else if (weather.description.includes('cloud')) {
        return <TiWeatherCloudy />;
      }
    }
    return null;
  };

  return (
    <div>
      <h1>Weather</h1>
      <div>
        <input
          type="text"
          value={location}
          placeholder="Enter location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>
      {weather && (
        <div>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Feels Like: {weather.feelsLike}°C</p>
          <p>Description: {weather.description}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.windSpeed} m/s</p>
          {renderWeatherIcon()}
        </div>
      )}
    </div>
  );
}

export default App;
