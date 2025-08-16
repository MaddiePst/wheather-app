import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=67263f61c34be6002f3dec2554277cb1`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log("Data fetchCityWeather(today): ", data);
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
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=67263f61c34be6002f3dec2554277cb1`
      );
      const today = await resToday.json();
      setWeatherData(today);
      // console.log("Weather Data(today): ", today);

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=67263f61c34be6002f3dec2554277cb1`
      );
      const forecast = await resForecast.json();
      setFutureWeatherData(forecast);
      console.log("Forecast (futureWeatherData--forecast): ", forecast);
      console.log("Forecast (futureWeatherData): ", futureWeatherData);
    } catch (err) {
      setError(err.message);
    }
  };

  let forecastItems = [];
  // const forecastItemsFunc = async () => {
  if (futureWeatherData?.list) {
    forecastItems = futureWeatherData.list.slice(0, 5).map((item) => {
      const dateObj = new Date(item.dt_txt);
      const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
        dateObj.getDay()
      ];
      const monthName = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][dateObj.getMonth()];
      return {
        date: `${dayName}, ${dateObj.getDate()} ${monthName}`,
        time: `${dateObj.getHours()}:${
          dateObj.getMinutes() < 10 ? "0" : ""
        }${dateObj.getMinutes()}`,
        icon1: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        description: item.weather[0].main,
        temp: Math.round(item.main.temp),
        tempHigh: Math.round(item.main.temp_max),
        tempLow: Math.round(item.main.temp_min),
      };
    });
  }
  console.log("Forecast Items(byHour): ", forecastItems);
  // };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeatherByCoords(location.latitude, location.longitude);
    }
  }, [location]);

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      setCity(savedCity);
      fetchCityWeather(savedCity);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && city.trim()) {
      e.preventDefault();
      localStorage.setItem("lastCity", city.trim());
      fetchCityWeather(city.trim());
      console.log("City: ", city);
    }
  };

  // Toggle dark mode
  function toggleDarkMode() {
    setIsDark((prevIsDark) => !prevIsDark);
  }
  // Set background color based on isDark
  document.querySelector("body").style.backgroundColor = isDark
    ? "#383838"
    : "  #9E9E9E";

  // Change units (imperial => metric)
  function handleUnits() {
    setUnits((prevUnits) => (prevUnits === "metric" ? "imperial" : "metric"));
  }

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <Header
        toggleDarkMode={toggleDarkMode}
        onKeyDown={handleKeyDown}
        city={city}
        getLocation={getLocation}
        onChange={(e) => setCity(e.target.value)}
      />
      <Main
        isDark={isDark}
        city={city}
        // date={date}
        // time={formattedTime}
        weatherData={weatherData}
        futureWeatherData={futureWeatherData}
        handleUnits={handleUnits}
        units={units}
      />
    </div>
  );
};

export default App2;
