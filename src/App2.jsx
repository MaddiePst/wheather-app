import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";

const App2 = () => {
  const [isDark, setIsDark] = useState(false);
  const [city, setCity] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weatherData, setWeatherData] = useState(null);
  const [futureWeatherData, setFutureWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState("imperial");

  // Get Current Location (when enter the website)
  const getLocation = () => {
    // Check if Geolocation API is available in the browser
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    // Request the user's location (latitude and longitude)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError(err.message);
      }
    );
  };

  // Set Lat and Lon on searched city
  const fetchCityWeather = async (cityName) => {
    console.log("CIty from fetchCityWeather: ", cityName);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}c&appid=67263f61c34be6002f3dec2554277cb1`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Data fetchCityWeather: ", data);
    setLocation({
      latitude: data.coord.lat,
      longitude: data.coord.lon,
    });
    setCity(data.name);
    // search(location.latitude, location.longitude);
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    if (!lat || !lon) return;
    try {
      const resToday = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=7263f61c34be6002f3dec2554277cb1`
      );
      const today = await resToday.json();
      setWeatherData(today);

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=7263f61c34be6002f3dec2554277cb1`
      );
      const forecast = await resForecast.json();
      setFutureWeatherData(forecast);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeatherByCoords(location.latitude, location.longitude);
    }
  }, [location]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && city.trim()) {
      e.preventDefault();
      fetchCityWeather(city.trim());
      console.log("City: ", city);
    }
  };

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <Header
        // toggleDarkMode={toggleDarkMode}
        onKeyDown={handleKeyDown}
        city={city}
        getLocation={getLocation}
        onChange={(e) => setCity(e.target.value)}
        // getCity={searchCity}
        // search={search(location.latitude, location.longitude)}
      />
      {/* <Main
        isDark={isDark}
        city={city}
        date={date}
        time={formattedTime}
        weatherData={weatherData}
        futureWeatherData={futureWeatherData}
        handleUnits={handleUnits}
        units={units}
      /> */}
    </div>
  );
};

export default App2;
