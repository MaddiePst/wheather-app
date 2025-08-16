import Sun from "./Sun";
import DetailWeather from "./DetailWeather";

export default function HighlightsSection(props) {
  // console.log("Highlight section: ", props.weatherData);
  if (!props.weatherData) {
    return <p>Loading weather</p>;
  } else {
    // Format tome for Sunrise and Sunset
    const sunriseDate = new Date(props.weatherData.sys.sunrise * 1000);
    const sunsetDate = new Date(props.weatherData.sys.sunset * 1000);

    const sunriseH = sunriseDate.getHours();
    const sunriseM = sunriseDate.getMinutes();
    const sunriseFormatted = `${sunriseH}:${sunriseM} AM`;

    const sunsetH = sunsetDate.getHours();
    const sunsetM = sunsetDate.getMinutes();
    const sunsetFormatted = `${sunsetH}:${sunsetM} PM`;

    return (
      <section className="highlights-container">
        <div className="basic-info-container">
          <button className="temperature" onClick={props.handleUnits}>
            {Math.round(props.weatherData.main.temp)}&deg;
            {props.units === "metric" ? " C" : " F"}
          </button>
          <p className="text">
            Feels like:{" "}
            <span className="feels-temperature">
              {Math.round(props.weatherData.main.feels_like)}&deg;
              {props.units === "metric" ? " C" : " F"}
            </span>
          </p>
          <div className="rise-or-set-container">
            <Sun
              riseOrSet={
                <ion-icon name="arrow-up" className="arrow"></ion-icon>
              }
              title="Sunrise"
              time={sunriseFormatted}
            />
            <Sun
              riseOrSet={
                <ion-icon name="arrow-down" className="arrow"></ion-icon>
              }
              title="Sunset"
              time={sunsetFormatted}
            />
          </div>
        </div>
        <div className="image-weather">
          <img
            src={`https://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}@2x.png`}
            alt="Current weather conditions"
            className="icon-img"
          />
          <p className="weather-desc">{props.weatherData.weather[0].main}</p>
        </div>
        <div className="detail-info-container">
          <DetailWeather
            dataType="High"
            value={Math.round(props.weatherData.main.temp_max)}
            units={props.units === "metric" ? `\u00b0 C` : `\u00b0 F`}
          ></DetailWeather>
          <DetailWeather
            dataType="Low"
            value={Math.round(props.weatherData.main.temp_min)}
            units={props.units === "metric" ? `\u00b0 C` : `\u00b0 F`}
          ></DetailWeather>

          <DetailWeather
            // img={
            //   <img src="./img/humidity-icon-15.jpg" alt="Humidity Iconnnn "></img>
            // }
            dataType="Humidity"
            value={props.weatherData.main.humidity}
            units="%"
          ></DetailWeather>
          <DetailWeather
            dataType="Wind Speed"
            value={
              props.units === "metric"
                ? Math.round(props.weatherData.wind.speed)
                : Math.round(props.weatherData.wind.speed / 1.61)
            }
            units={props.units === "metric" ? " km/h" : ` mi/h`}
          ></DetailWeather>
          <DetailWeather
            dataType="Pressure"
            value={
              props.units === "metric"
                ? props.weatherData.main.pressure
                : Math.round(props.weatherData.main.pressure / 69)
            }
            units={props.units === "metric" ? " hPa" : " psi"}
          ></DetailWeather>
          <DetailWeather
            dataType="Visibility"
            value={
              props.units === "metric"
                ? Math.round(props.weatherData.visibility / 1000)
                : Math.round(props.weatherData.visibility / 1610)
            }
            // {`/1000` : ``}
            units={props.units === "metric" ? " km" : ` mi`}
          ></DetailWeather>
        </div>
      </section>
    );
  }
}
