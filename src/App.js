import React, { useState, useEffect } from 'react';
import Login from './components/Login.js';
import Search from './components/SearchBox.js';
import WeatherInfo from './components/WeatherInfo.js';
import RecentHistory from './components/RecentHistory.js';
import axios from 'axios';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [User, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const API_KEY = process.env.API_KEY_WEATHER;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCurrentLocationWeather(latitude, longitude);
        },
        (error) => {
          console.error('Error fetching location', error);
        }
      );
    }

    const token = localStorage.getItem("jwt_token");
    const timestamp = new Date().toLocaleString();

    if(token)
    {
      const username = localStorage.getItem("username");
      setUser(username);
      setIsLogin(true);
      fetch('http://localhost:5000/history', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then(response => response.json())
      .then(data => {console.log(data); setHistory(data.history);})
      .catch(error => console.error('Error:', error));
            
    }
  }, []);

  const fetchCurrentLocationWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      const locationData = response.data;
      setCurrentLocation({
        name: locationData.name,
        state: locationData.sys.state,
        country: locationData.sys.country,
      });
    } catch (err) {
      console.error('Error fetching current location weather', err);
    }
  };

  const fetchWeather = async () => {
    if (!city) return;
  
    setLoading(true);
    setError('');
    setWeather(null);
    setSuggestions([]);
    console.log(history);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setTimeout(() => {
      setLoading(false);
      const timestamp = new Date().toLocaleString();
      setWeather(response.data);
  
        
        setHistory((prevHistory) => [
          ...prevHistory,
          { city, timestamp }
        ]);
  
      }, 1000);

      const token = localStorage.getItem("jwt_token");
      const timestamp = new Date().toLocaleString();

      if(token)
      {fetch('http://localhost:5000/history', {
          method: 'PUT',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              city: city,
              timestamp: timestamp
          })
      })
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));}

  
      console.log(response.data);
    } catch (err) {
      if (err.code === 'ERR_NETWORK')
       { setError('Check your network connection!');
         setLoading(false);}
      else {setError('City not found. Please try again.');
    setLoading(false);}
     }
  };
  

  const fetchCitySuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_KEY}`
      );
      setSuggestions(response.data);
    } catch (err) {
      console.log('Error fetching city suggestions', err);
    }
  };

  const handleCityChange = (e) => {
    const input = e.target.value;
    setCity(input);
    fetchCitySuggestions(input);
  };

  const handleSuggestionClick = (suggestion) => {
    const cityString = `${suggestion.name}, ${suggestion.state || ''}, ${suggestion.country}`;
    setCity(cityString);
    setSuggestions([]);
     fetchWeather();
  };

  const handleCurrentLocationClick = () => {
    if (currentLocation) {
      const cityString = `${currentLocation.name}, ${currentLocation.state || ''}, ${currentLocation.country}`;
      setCity(cityString);

       fetchWeather();
     }
  };

  const handleHistoryClick = (city)=>{
          setCity(city);
          fetchWeather();
 
  }
  const onLogin = (username,password)=>{
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: username,
          password: password 
      })
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      const token = data.token;  
      localStorage.setItem("jwt_token",data.token);
      localStorage.setItem("username",username);
      setUser(username);
      setIsLogin(true);
      toast.success('Login successful');
      fetch('http://localhost:5000/history', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {console.log(data); setHistory(data.history);})
    .catch(error => console.error('Error:', error));

  })
  .catch(error => {console.error('Error:', error);
                   toast.error(error);});

                  
  }

  const onSignup = (username,password)=>{
    fetch('http://localhost:5000/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username:  username,
        password: password
    })
})
.then(response => response.json())
.then(data => {console.log(data);
               toast.success('Signup successful');})
.catch(error => {console.error('Error:', error);
                 toast.error(error);
});

  return ;

  }

  const onLogout = ()=>{
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("username");
    setUser(null);
    setIsLogin(false);
    setHistory([]);
   }

  return (
    <div className="App" onClick = {()=>{setSuggestions([]);}}>
      <ToastContainer />
      <Login
        User={User}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        onLogin = {onLogin}
        onLogout = {onLogout}
        onSignup = {onSignup}
        className="login"
      />
      <div className="weather-app">
        <Search
          fetchCitySuggestions={fetchCitySuggestions}
          handleCityChange={handleCityChange}
          fetchWeather={fetchWeather}
          currentLocation={currentLocation}
          fetchCurrentLocationWeather={fetchCurrentLocationWeather}
          city={city}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          setCity={setCity}
          handleSuggestionClick={handleSuggestionClick}
          handleCurrentLocationClick={handleCurrentLocationClick}
          className="search"
        />
        <div className="main-content">
          <WeatherInfo
            weather={weather}
            loading={loading}
            error={error}
            currentLocation={currentLocation}
            handleCurrentLocationClick={handleCurrentLocationClick}

            className="weatherinfo"
          />
          <RecentHistory history={history} handleHistoryClick = {handleHistoryClick} className="history" />
        </div>
      </div>
      
    </div>
  );
}

export default App;
