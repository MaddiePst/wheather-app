import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import "./index.css";

const API_KEY = "67263f61c34be6002f3dec2554277cb1";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [city, setCity] = useState("Atlanta");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weatherData, setWeatherData] = useState(null);
  const [futureWeatherData, setFutureWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState("imperial");
  const [inputValue, setInputValue] = useState("");

  /* =====================
     GEOLOCATION
  ====================== */
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (err) => setError(err.message)
    );
  };

  /* =====================
     FETCH WEATHER
  ====================== */
  const fetchCityWeather = async (cityName) => {
    if (!cityName) {
      setError("City is not found");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${API_KEY}`
      );
      const data = await res.json();

      setLocation({
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      });
      setCity(data.name);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    if (!lat || !lon) return;

    try {
      const resToday = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
      );
      const today = await resToday.json();
      setWeatherData(today);
      setCity(today.name);

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
      );
      const forecast = await resForecast.json();
      setFutureWeatherData(forecast);
    } catch (err) {
      setError(err.message);
    }
  };

  /* =====================
     DERIVED FORECAST DATA
  ====================== */
  const forecastItems = useMemo(() => {
    if (!futureWeatherData?.list) return [];

    return futureWeatherData.list.slice(0, 5).map((item) => {
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
        time: `${dateObj.getHours()}:${String(
          dateObj.getMinutes()
        ).padStart(2, "0")}`,
        icon1: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        description: item.weather[0].main,
        temp: Math.round(item.main.temp),
        tempHigh: Math.round(item.main.temp_max),
        tempLow: Math.round(item.main.temp_min),
      };
    });
  }, [futureWeatherData]);

  /* =====================
     EFFECTS
  ====================== */
  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeatherByCoords(location.latitude, location.longitude);
    }
  }, [location, units]);

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      setCity(savedCity);
      fetchCityWeather(savedCity);
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? "#383838" : "#9E9E9E";
  }, [isDark]);

  /* =====================
     HANDLERS
  ====================== */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const trimmedCity = inputValue.trim();
      localStorage.setItem("lastCity", trimmedCity);
      setCity(trimmedCity);
      fetchCityWeather(trimmedCity);
      setInputValue("");
    }
  };

  const toggleDarkMode = () => setIsDark((prev) => !prev);

  const handleUnits = () => {
    setUnits((prev) => (prev === "imperial" ? "metric" : "imperial"));
  };

  /* =====================
     RENDER
  ====================== */
  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <Header
        inputValue={inputValue}
        toggleDarkMode={toggleDarkMode}
        onKeyDown={handleKeyDown}
        city={city}
        getLocation={getLocation}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Main
        isDark={isDark}
        city={city}
        forecastItems={forecastItems}
        weatherData={weatherData}
        futureWeatherData={futureWeatherData}
        handleUnits={handleUnits}
        units={units}
        error={error}
      />
    </div>
  );
};

export default App;
