// import logo from "./logo.svg";
import "./index.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { useState, useEffect } from "react";
// import DataFetch from "./utils/DataFetch";

export default function App() {
  // const API_KEY = "67263f61c34be6002f3dec2554277cb1";
  //State variables definition
  const [isDark, setIsDark] = useState(false);

  //State variables definition
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [units, setUnits] = useState("imperial");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    feelsLike: null,
    sunrise: new Date(null),
    sunset: new Date(null),
    description: null,
    humidity: null,
    pressure: null,
    windSpeed: null,
    visibility: null,
    location: null,
    icon: null,
    high: null,
    low: null,
  });
  const [futureWeatherData, setFutureWeatherData] = useState({
    date: new Date(null),
    time: null,
  });

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
        // console.log("Position", position);
        // Success callback
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        // Error callback
        setError(err.message);
      }
    );
  };

  console.log("Location (initial): ", location);

  // Set Lat and Lon on searched city
  const searchCity = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}c&appid=67263f61c34be6002f3dec2554277cb1`;
    const response = await fetch(url);
    const dataCity = await response.json();
    console.log("City Data:", dataCity);
    setLocation({
      latitude: dataCity.coord.lat,
      longitude: dataCity.coord.lon,
    });
    search(location.latitude, location.longitude);
  };

  // fetching data for Today (Highlights Section)
  const search = async (latitude, longitude) => {
    if (latitude === null && longitude === null) return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=67263f61c34be6002f3dec2554277cb1`;

      const response = await fetch(url);
      const data = await response.json();
      console.log("App Data:", data);
      setCity(data.name);
      setWeatherData({
        temperature: Math.floor(data.main.temp),
        feelsLike: Math.floor(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        sunrise: new Date(data.sys.sunrise),
        sunset: new Date(data.sys.sunset),
        description: data.weather[0].main,
        windSpeed: data.wind.speed,
        visibility: data.visibility,
        location: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        high: Math.round(data.main.temp_max),
        low: Math.round(data.main.temp_min),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("Weather Data (initial): ", weatherData);

  // fetching data for forecast Future Days and Multiple Hours
  const searchForecast = async (latitude, longitude) => {
    if (latitude === null && longitude === null) return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=67263f61c34be6002f3dec2554277cb1`;

      const response = await fetch(url);
      const data2 = await response.json();
      console.log("App Data 2:", data2);
      const dayNames = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
      };
      const monthName = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "Jun",
        7: "Jul",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec",
      };

      setFutureWeatherData({
        date1: `${
          dayNames[new Date(data2.list[0].dt_txt).getDay()]
        }, ${new Date(data2.list[0].dt_txt).getDate()} ${
          monthName[new Date(data2.list[0].dt_txt).getMonth() + 1]
        } `,

        time1Date1: `${new Date(data2.list[0].dt_txt).getHours()}:${
          (new Date(data2.list[0].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[0].dt_txt).getMinutes()
        }`,
        icon1Date1: `https://openweathermap.org/img/wn/${data2.list[0].weather[0].icon}@2x.png`,
        icon1Desc: data2.list[0].weather[0].main,
        time1Date1Temp: Math.round(data2.list[0].main.temp),
        tempHigh1: Math.round(data2.list[0].main.temp_max),
        tempLow1: Math.round(data2.list[0].main.temp_min),

        time2Date1: `${new Date(data2.list[1].dt_txt).getHours()}:${
          (new Date(data2.list[1].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[1].dt_txt).getMinutes()
        }`,
        icon2Date1: `https://openweathermap.org/img/wn/${data2.list[1].weather[0].icon}@2x.png`,
        icon2Desc: data2.list[1].weather[0].main,
        time2Date1Temp: Math.round(data2.list[1].main.temp),
        tempHigh2: Math.round(data2.list[1].main.temp_max),
        tempLow2: Math.round(data2.list[1].main.temp_min),

        time3Date1: `${new Date(data2.list[2].dt_txt).getHours()}:${
          (new Date(data2.list[2].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[2].dt_txt).getMinutes()
        }`,
        icon3Date1: `https://openweathermap.org/img/wn/${data2.list[2].weather[0].icon}@2x.png`,
        icon3Desc: data2.list[2].weather[0].main,
        time3Date1Temp: Math.round(data2.list[2].main.temp),
        tempHigh3: Math.round(data2.list[2].main.temp_max),
        tempLow3: Math.round(data2.list[2].main.temp_min),

        time4Date1: `${new Date(data2.list[3].dt_txt).getHours()}:${
          (new Date(data2.list[3].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[3].dt_txt).getMinutes()
        }`,
        icon4Date1: `https://openweathermap.org/img/wn/${data2.list[3].weather[0].icon}@2x.png`,
        icon4Desc: data2.list[3].weather[0].main,
        time4Date1Temp: Math.round(data2.list[3].main.temp),
        tempHigh4: Math.round(data2.list[3].main.temp_max),
        tempLow4: Math.round(data2.list[3].main.temp_min),

        time5Date1: `${new Date(data2.list[4].dt_txt).getHours()}:${
          (new Date(data2.list[4].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[4].dt_txt).getMinutes()
        }`,
        icon5Date1: `https://openweathermap.org/img/wn/${data2.list[4].weather[0].icon}@2x.png`,
        icon5Desc: data2.list[4].weather[0].main,
        time5Date1Temp: Math.round(data2.list[4].main.temp),
        tempHigh5: Math.round(data2.list[4].main.temp_max),
        tempLow5: Math.round(data2.list[4].main.temp_min),

        time6Date1: `${new Date(data2.list[5].dt_txt).getHours()}:${
          (new Date(data2.list[5].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[5].dt_txt).getMinutes()
        }`,
        icon6Date1: `https://openweathermap.org/img/wn/${data2.list[5].weather[0].icon}@2x.png`,
        icon6Desc: data2.list[5].weather[0].main,
        time6Date1Temp: Math.round(data2.list[5].main.temp),
        tempHigh6: Math.round(data2.list[5].main.temp_max),
        tempLow6: Math.round(data2.list[5].main.temp_min),

        time7Date1: `${new Date(data2.list[6].dt_txt).getHours()}:${
          (new Date(data2.list[6].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[6].dt_txt).getMinutes()
        }`,
        icon7Date1: `https://openweathermap.org/img/wn/${data2.list[6].weather[0].icon}@2x.png`,
        icon7Desc: data2.list[6].weather[0].main,
        time7Date1Temp: Math.round(data2.list[6].main.temp),
        tempHigh7: Math.round(data2.list[6].main.temp_max),
        tempLow7: Math.round(data2.list[6].main.temp_min),

        time8Date1: `${new Date(data2.list[7].dt_txt).getHours()}:${
          (new Date(data2.list[7].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[7].dt_txt).getMinutes()
        }`,
        icon8Date1: `https://openweathermap.org/img/wn/${data2.list[7].weather[0].icon}@2x.png`,
        icon8Desc: data2.list[7].weather[0].main,
        time8Date1Temp: Math.round(data2.list[7].main.temp),
        tempHigh: Math.round(data2.list[7].main.temp_max),
        tempLow: Math.round(data2.list[7].main.temp_min),

        date2: `${
          dayNames[new Date(data2.list[8].dt_txt).getDay()]
        }, ${new Date(data2.list[8].dt_txt).getDate()} ${
          monthName[new Date(data2.list[8].dt_txt).getMonth() + 1]
        }`,
        time1Date2: `${new Date(data2.list[8].dt_txt).getHours()}:${
          (new Date(data2.list[8].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[8].dt_txt).getMinutes()
        }`,
        icon1Date2: `https://openweathermap.org/img/wn/${data2.list[8].weather[0].icon}@2x.png`,
        time1Date2Temp: Math.round(data2.list[8].main.temp),

        time2Date2: `${new Date(data2.list[9].dt_txt).getHours()}:${
          (new Date(data2.list[9].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[9].dt_txt).getMinutes()
        }`,
        icon2Date2: `https://openweathermap.org/img/wn/${data2.list[9].weather[0].icon}@2x.png`,
        time2Date2Temp: Math.round(data2.list[9].main.temp),

        time3Date2: `${new Date(data2.list[10].dt_txt).getHours()}:${
          (new Date(data2.list[10].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[10].dt_txt).getMinutes()
        }`,
        icon3Date2: `https://openweathermap.org/img/wn/${data2.list[10].weather[0].icon}@2x.png`,
        time3Date2Temp: Math.round(data2.list[10].main.temp),

        time4Date2: `${new Date(data2.list[11].dt_txt).getHours()}:${
          (new Date(data2.list[11].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[11].dt_txt).getMinutes()
        }`,
        icon4Date2: `https://openweathermap.org/img/wn/${data2.list[11].weather[0].icon}@2x.png`,
        time4Date2Temp: Math.round(data2.list[11].main.temp),

        time5Date2: `${new Date(data2.list[12].dt_txt).getHours()}:${
          (new Date(data2.list[12].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[12].dt_txt).getMinutes()
        }`,
        icon5Date2: `https://openweathermap.org/img/wn/${data2.list[12].weather[0].icon}@2x.png`,
        time5Date2Temp: Math.round(data2.list[12].main.temp),

        time6Date2: `${new Date(data2.list[13].dt_txt).getHours()}:${
          (new Date(data2.list[13].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[13].dt_txt).getMinutes()
        }`,
        icon6Date2: `https://openweathermap.org/img/wn/${data2.list[13].weather[0].icon}@2x.png`,
        time6Date2Temp: Math.round(data2.list[13].main.temp),

        time7Date2: `${new Date(data2.list[14].dt_txt).getHours()}:${
          (new Date(data2.list[14].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[14].dt_txt).getMinutes()
        }`,
        icon7Date2: `https://openweathermap.org/img/wn/${data2.list[14].weather[0].icon}@2x.png`,
        time7Date2Temp: Math.round(data2.list[14].main.temp),

        time8Date2: `${new Date(data2.list[15].dt_txt).getHours()}:${
          (new Date(data2.list[15].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[15].dt_txt).getMinutes()
        }`,
        icon8Date2: `https://openweathermap.org/img/wn/${data2.list[15].weather[0].icon}@2x.png`,
        time8Date2Temp: Math.round(data2.list[15].main.temp),

        date3: `${
          dayNames[new Date(data2.list[16].dt_txt).getDay()]
        }, ${new Date(data2.list[16].dt_txt).getDate()} ${
          monthName[new Date(data2.list[16].dt_txt).getMonth() + 1]
        }`,
        time1Date3: `${new Date(data2.list[16].dt_txt).getHours()}:${
          (new Date(data2.list[16].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[16].dt_txt).getMinutes()
        }`,
        icon1Date3: `https://openweathermap.org/img/wn/${data2.list[16].weather[0].icon}@2x.png`,
        time1Date3Temp: Math.round(data2.list[16].main.temp),

        time2Date3: `${new Date(data2.list[17].dt_txt).getHours()}:${
          (new Date(data2.list[17].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[17].dt_txt).getMinutes()
        }`,
        icon2Date3: `https://openweathermap.org/img/wn/${data2.list[17].weather[0].icon}@2x.png`,
        time2Date3Temp: Math.round(data2.list[17].main.temp),

        time3Date3: `${new Date(data2.list[18].dt_txt).getHours()}:${
          (new Date(data2.list[18].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[18].dt_txt).getMinutes()
        }`,
        icon3Date3: `https://openweathermap.org/img/wn/${data2.list[18].weather[0].icon}@2x.png`,
        time3Date3Temp: Math.round(data2.list[18].main.temp),

        time4Date3: `${new Date(data2.list[19].dt_txt).getHours()}:${
          (new Date(data2.list[19].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[19].dt_txt).getMinutes()
        }`,
        icon4Date3: `https://openweathermap.org/img/wn/${data2.list[19].weather[0].icon}@2x.png`,
        time4Date3Temp: Math.round(data2.list[19].main.temp),

        time5Date3: `${new Date(data2.list[20].dt_txt).getHours()}:${
          (new Date(data2.list[20].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[20].dt_txt).getMinutes()
        }`,
        icon5Date3: `https://openweathermap.org/img/wn/${data2.list[20].weather[0].icon}@2x.png`,
        time5Date3Temp: Math.round(data2.list[20].main.temp),

        time6Date3: `${new Date(data2.list[21].dt_txt).getHours()}:${
          (new Date(data2.list[21].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[21].dt_txt).getMinutes()
        }`,
        icon6Date3: `https://openweathermap.org/img/wn/${data2.list[21].weather[0].icon}@2x.png`,
        time6Date3Temp: Math.round(data2.list[21].main.temp),

        time7Date3: `${new Date(data2.list[22].dt_txt).getHours()}:${
          (new Date(data2.list[22].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[22].dt_txt).getMinutes()
        }`,
        icon7Date3: `https://openweathermap.org/img/wn/${data2.list[22].weather[0].icon}@2x.png`,
        time7Date3Temp: Math.round(data2.list[22].main.temp),

        time8Date3: `${new Date(data2.list[23].dt_txt).getHours()}:${
          (new Date(data2.list[23].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[23].dt_txt).getMinutes()
        }`,
        icon8Date3: `https://openweathermap.org/img/wn/${data2.list[23].weather[0].icon}@2x.png`,
        time8Date3Temp: Math.round(data2.list[23].main.temp),

        date4: `${
          dayNames[new Date(data2.list[24].dt_txt).getDay()]
        }, ${new Date(data2.list[24].dt_txt).getDate()} ${
          monthName[new Date(data2.list[24].dt_txt).getMonth() + 1]
        } `,
        time1Date4: `${new Date(data2.list[24].dt_txt).getHours()}:${
          (new Date(data2.list[24].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[24].dt_txt).getMinutes()
        }`,
        icon1Date4: `https://openweathermap.org/img/wn/${data2.list[24].weather[0].icon}@2x.png`,
        time1Date4Temp: Math.round(data2.list[24].main.temp),

        time2Date4: `${new Date(data2.list[25].dt_txt).getHours()}:${
          (new Date(data2.list[25].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[25].dt_txt).getMinutes()
        }`,
        icon2Date4: `https://openweathermap.org/img/wn/${data2.list[25].weather[0].icon}@2x.png`,
        time2Date4Temp: Math.round(data2.list[25].main.temp),

        time3Date4: `${new Date(data2.list[26].dt_txt).getHours()}:${
          (new Date(data2.list[26].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[26].dt_txt).getMinutes()
        }`,
        icon3Date4: `https://openweathermap.org/img/wn/${data2.list[26].weather[0].icon}@2x.png`,
        time3Date4Temp: Math.round(data2.list[26].main.temp),

        time4Date4: `${new Date(data2.list[27].dt_txt).getHours()}:${
          (new Date(data2.list[27].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[27].dt_txt).getMinutes()
        }`,
        icon4Date4: `https://openweathermap.org/img/wn/${data2.list[27].weather[0].icon}@2x.png`,
        time4Date4Temp: Math.round(data2.list[27].main.temp),

        time5Date4: `${new Date(data2.list[28].dt_txt).getHours()}:${
          (new Date(data2.list[28].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[28].dt_txt).getMinutes()
        }`,
        icon5Date4: `https://openweathermap.org/img/wn/${data2.list[28].weather[0].icon}@2x.png`,
        time5Date4Temp: Math.round(data2.list[28].main.temp),

        time6Date4: `${new Date(data2.list[29].dt_txt).getHours()}:${
          (new Date(data2.list[29].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[29].dt_txt).getMinutes()
        }`,
        icon6Date4: `https://openweathermap.org/img/wn/${data2.list[29].weather[0].icon}@2x.png`,
        time6Date4Temp: Math.round(data2.list[29].main.temp),

        time7Date4: `${new Date(data2.list[30].dt_txt).getHours()}:${
          (new Date(data2.list[30].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[30].dt_txt).getMinutes()
        }`,
        icon7Date4: `https://openweathermap.org/img/wn/${data2.list[30].weather[0].icon}@2x.png`,
        time7Date4Temp: Math.round(data2.list[30].main.temp),

        time8Date4: `${new Date(data2.list[31].dt_txt).getHours()}:${
          (new Date(data2.list[31].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[31].dt_txt).getMinutes()
        }`,
        icon8Date4: `https://openweathermap.org/img/wn/${data2.list[31].weather[0].icon}@2x.png`,
        time8Date4Temp: Math.round(data2.list[31].main.temp),

        date5: `${
          dayNames[new Date(data2.list[32].dt_txt).getDay()]
        }, ${new Date(data2.list[32].dt_txt).getDate()} ${
          monthName[new Date(data2.list[32].dt_txt).getMonth() + 1]
        } `,
        time1Date5: `${new Date(data2.list[32].dt_txt).getHours()}:${
          (new Date(data2.list[32].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[32].dt_txt).getMinutes()
        }`,
        icon1Date5: `https://openweathermap.org/img/wn/${data2.list[32].weather[0].icon}@2x.png`,
        time1Date5Temp: Math.round(data2.list[32].main.temp),

        time2Date5: `${new Date(data2.list[33].dt_txt).getHours()}:${
          (new Date(data2.list[33].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[33].dt_txt).getMinutes()
        }`,
        icon2Date5: `https://openweathermap.org/img/wn/${data2.list[33].weather[0].icon}@2x.png`,
        time2Date5Temp: Math.round(data2.list[33].main.temp),

        time3Date5: `${new Date(data2.list[34].dt_txt).getHours()}:${
          (new Date(data2.list[34].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[34].dt_txt).getMinutes()
        }`,
        icon3Date5: `https://openweathermap.org/img/wn/${data2.list[34].weather[0].icon}@2x.png`,
        time3Date5Temp: Math.round(data2.list[34].main.temp),

        time4Date5: `${new Date(data2.list[35].dt_txt).getHours()}:${
          (new Date(data2.list[35].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[35].dt_txt).getMinutes()
        }`,
        icon4Date5: `https://openweathermap.org/img/wn/${data2.list[35].weather[0].icon}@2x.png`,
        time4Date5Temp: Math.round(data2.list[35].main.temp),

        time5Date5: `${new Date(data2.list[36].dt_txt).getHours()}:${
          (new Date(data2.list[36].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[36].dt_txt).getMinutes()
        }`,
        icon5Date5: `https://openweathermap.org/img/wn/${data2.list[36].weather[0].icon}@2x.png`,
        time5Date5Temp: Math.round(data2.list[36].main.temp),

        time6Date5: `${new Date(data2.list[37].dt_txt).getHours()}:${
          (new Date(data2.list[37].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[37].dt_txt).getMinutes()
        }`,
        icon6Date5: `https://openweathermap.org/img/wn/${data2.list[37].weather[0].icon}@2x.png`,
        time6Date5Temp: Math.round(data2.list[37].main.temp),

        time7Date5: `${new Date(data2.list[38].dt_txt).getHours()}:${
          (new Date(data2.list[38].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[38].dt_txt).getMinutes()
        }`,
        icon7Date5: `https://openweathermap.org/img/wn/${data2.list[38].weather[0].icon}@2x.png`,
        time7Date5Temp: Math.round(data2.list[38].main.temp),

        time8Date5: `${new Date(data2.list[39].dt_txt).getHours()}:${
          (new Date(data2.list[39].dt_txt).getMinutes() < 10 ? "0" : "") +
          new Date(data2.list[39].dt_txt).getMinutes()
        }`,
        icon8Date5: `https://openweathermap.org/img/wn/${data2.list[39].weather[0].icon}@2x.png`,
        time8Date5Temp: Math.round(data2.list[39].main.temp),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Why the background doesn't toggle ????
  function toggleDarkMode() {
    setIsDark((prevIsDark) => !prevIsDark);
  }
  // Set background color
  document.querySelector("body").style.backgroundColor = isDark
    ? "#383838"
    : "  #9E9E9E";

  // Change units (imperial => metric)
  function handleUnits() {
    setUnits((prevUnits) => (prevUnits === "metric" ? "imperial" : "metric"));
  }

  // Display  time and date for the location fetched
  const now = new Date();
  const date = now.toDateString();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const formattedTime = `${hour}:${(minutes < 10 ? "0" : "") + minutes}`;

  // console.log(futureWeatherData);

  // Rerender website based on conditions
  useEffect(() => {
    getLocation();
    search(location.latitude, location.longitude);
    searchForecast(location.latitude, location.longitude);
  }, [city, location.latitude, location.longitude, units]);

  // Handle 'Enter' on search city
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("City:", city);
      if (city.trim()) {
        // searchCity(city);
        search(city.trim()); // Call parent or local search function
        setCity(city); // optional: clear input after search
        console.log("City:", city);
      }
    }
  };

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <Header
        toggleDarkMode={toggleDarkMode}
        onKeyDown={handleKeyDown}
        city={city}
        getLocation={getLocation}
        // setCity={setCity}
        onChange={(e) => setCity(e.target.value)}
        getCity={searchCity}
        // search={search(location.latitude, location.longitude)}
      />
      <Main
        isDark={isDark}
        city={city}
        date={date}
        time={formattedTime}
        weatherData={weatherData}
        futureWeatherData={futureWeatherData}
        handleUnits={handleUnits}
        units={units}
      />
    </div>
  );
}
