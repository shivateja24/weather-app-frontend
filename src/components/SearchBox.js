import React from 'react';
import './SearchBox.css';
function Search({
  handleCityChange,
  handleCurrentLocationClick,
  handleSuggestionClick,
  city,
  currentLocation,
  fetchWeather,
  suggestions,
}) {
  return (
    <div className="search-comp">
      <div className="searchbox">
        <input
          type="text"
          placeholder="Enter city name"
          value = {city}
          onChange={handleCityChange}
        />
        <div className="search-button" onClick={fetchWeather}>
          <img src="/icons/search.png" alt="Get Weather" />
        </div>
      </div>
      {suggestions.length > 0 && (
        <div className="custom-dropdown">
          {currentLocation && (
            <div className="dropdown-item" onClick={handleCurrentLocationClick}>
              <img
                src="/icons/home_loc.png"
                alt="Location Icon"
                className="icon"
              />
              <span>
                <strong>Current Location:</strong> {currentLocation.name},
                {currentLocation.state}, {currentLocation.country}
              </span>
            </div>
          )}
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <img
                src="/icons/home_loc.png"
                alt="Location Icon"
                className="icon"
              />
              <span>
                {suggestion.name}, {suggestion.state}, {suggestion.country}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;