import React from 'react';
import './WeatherInfo.css';

function WeatherInfo({ weather, loading, error , currentLocation, handleCurrentLocationClick}) {
  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  const getWeatherClass = (codee) => {
    if(codee == null) return '';
    const  code = codee.weather[0].id ;
    if (code >= 200 && code < 300) return 'thunderstorm';
    if (code >= 300 && code < 400) return 'drizzle';
    if (code >= 500 && code < 600) return 'rain';
    if (code >= 600 && code < 700) return 'snow';
    if (code >= 700 && code < 800) return 'atmosphere';
    if (code === 800) return 'clear';
    if (code >= 800 && code < 900) return 'clouds';
    return '';
  };

  return (
    <div className={`weather ${getWeatherClass(weather)}`}>
      {loading ? (
        <div className="weather-info">
          <div className = "loading-info">
            <img src="/icons/rain.gif" width="64px" alt="Loading..." />
            <p>Loading...</p>
          </div>

        </div>
      ) : error ? (
        <div className="weather-info">
          <p className="error">{error}</p>
        </div>
      ) : weather ? (
        <div className="weather-info">
          <div className="weather-head">
            <h2>{weather.weather[0].description}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="Weather Icon"
              className="weather-icon"
            />

            <p className="weather-details city">
              {weather.name}
            </p>
            <p className="weather-details date">{getCurrentDate()}</p>
          </div>
          
          <p className="weather-element">
            <img src="/icons/temperature.png" alt="Temperature Icon" />
             <p>Temperature :{weather.main.temp} deg</p>
          </p>
          <p className="weather-element">
            <img src="/icons/humidity.png" alt="Humidity Icon" />
            <p>Humidity: {weather.main.humidity}%</p>
          </p>
          <p className="weather-element">
            <img src="/icons/wind.png" alt="Wind Icon" />
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </p>
        </div>
      ) : (
        <div className="weather-info">
          <p className = "weather-head">Select the city to know weather</p>
          {currentLocation && <p className="weather-element" onClick = {handleCurrentLocationClick}>
            <img src="/icons/home_loc.png"   />
            <p>currentLocation : {currentLocation.name}</p>
          </p> }
        </div>
      )}
    </div>
  );
}

export default WeatherInfo;
