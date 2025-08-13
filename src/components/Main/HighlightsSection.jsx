import Sun from "./Sun";
import DetailWeather from "./DetailWeather";

export default function HighlightsSection(props) {
  // Format tome for Sunrise and Sunset
  const sunriseH = props.weatherData.sunrise.getHours();
  const sunriseM = props.weatherData.sunrise.getMinutes();
  const sunriseFormatted = `${sunriseH}:${sunriseM} AM`;

  const sunsetH = props.weatherData.sunset.getHours();
  const sunsetM = props.weatherData.sunset.getMinutes();
  const sunsetFormatted = `${sunsetH}:${sunsetM} PM`;

  return (
    <section className="highlights-container">
      <div className="basic-info-container">
        <button className="temperature" onClick={props.handleUnits}>
          {props.weatherData.temperature}&deg;
          {props.units === "metric" ? " C" : " F"}
        </button>
        <p className="text">
          Feels like:{" "}
          <span className="feels-temperature">
            {props.weatherData.feelsLike}&deg;
            {props.units === "metric" ? " C" : " F"}
          </span>
        </p>
        <div className="rise-or-set-container">
          <Sun
            riseOrSet={<ion-icon name="arrow-up" className="arrow"></ion-icon>}
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
          src={props.weatherData.icon}
          alt="Current weather conditions"
          className="icon-img"
        />
        <p className="weather-desc">{props.weatherData.description}</p>
      </div>
      <div className="detail-info-container">
        <DetailWeather
          dataType="High"
          value={props.weatherData.high}
          units={props.units === "metric" ? `\u00b0 C` : `\u00b0 F`}
        ></DetailWeather>
        <DetailWeather
          dataType="Low"
          value={props.weatherData.low}
          units={props.units === "metric" ? `\u00b0 C` : `\u00b0 F`}
        ></DetailWeather>

        <DetailWeather
          // img={
          //   <img src="./img/humidity-icon-15.jpg" alt="Humidity Iconnnn "></img>
          // }
          dataType="Humidity"
          value={props.weatherData.humidity}
          units="%"
        ></DetailWeather>
        <DetailWeather
          dataType="Wind Speed"
          value={
            props.units === "metric"
              ? props.weatherData.windSpeed
              : Math.round(props.weatherData.windSpeed / 1.61)
          }
          units={props.units === "metric" ? " km/h" : ` mi/h`}
        ></DetailWeather>
        <DetailWeather
          dataType="Pressure"
          value={
            props.units === "metric"
              ? props.weatherData.pressure
              : Math.round(props.weatherData.pressure / 69)
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
