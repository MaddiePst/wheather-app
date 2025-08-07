// import logo from "./logo.svg";
import "./index.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { useState, useEffect } from "react";

export default function App() {
  const timestamp = 1691347200;
  const date1 = new Date(timestamp * 1000);
  const date2 = new Date(timestamp * 1000);

  const [isDark, setIsDark] = useState(false);
  const [city, setCity] = useState("Atlanta");
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    feelsLike: null,
    humidity: null,
    pressure: null,
    windSpeed: null,
    visibility: null,
    location: null,
    sunrise: date1,
    sunset: date2,
    icon: null,
  });

  console.log(weatherData);

  // Why the background doesn't toggle
  function toggleDarkMode() {
    setIsDark((prevIsDark) => !prevIsDark);
  }

  // Display correct time and date for the location fetched
  const now = new Date();
  console.log(now);
  const date = now.toDateString();
  console.log(date);
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const formattedTime = `${hour}:${minutes}`;
  console.log(formattedTime);

  // fetching data what am I doing wrong?
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=67263f61c34be6002f3dec2554277cb1`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("App Data:", data);
      setWeatherData({
        temperature: Math.floor(data.main.temp),
        feelsLike: Math.floor(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        visibility: data.visibility,
        location: data.name,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        icon: `https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`,
      });
    } catch (error) {}
  };

  useEffect(() => {
    search(city);
  }, [city]);

  const handleChange = (value) => {
    search(value);
    setCity(value);
  };

  // function SearchComponent() {
  //   const [data, setData] = useState(/* your initial array of data */);
  //   const [searchTerm, setSearchTerm] = useState("");
  // }

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <Header
        toggleDarkMode={toggleDarkMode}
        handleChange={handleChange}
        city={city}
        setCity={setCity}
      />
      <Main
        city={city}
        date={date}
        time={formattedTime}
        weatherData={weatherData}
      />
    </div>
  );
}
