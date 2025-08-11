import Sun from "./Sun";
import DetailWeather from "./DetailWeather";

export default function HighlightsSection(props) {
  // Why it gives me the wrong sunrise/sunset ?????
  const sunriseH = props.weatherData.sunrise.getHours();
  const sunriseM = props.weatherData.sunrise.getMinutes();
  const sunriseFormatted = `${sunriseH}:${sunriseM} AM`;
  // console.log(sunriseFormatted);

  const sunsetH = props.weatherData.sunset.getHours();
  const sunsetM = props.weatherData.sunset.getMinutes();
  const sunsetFormatted = `${sunsetH}:${sunsetM} PM`;

  return (
    <section className="highlights-container">
      <div className="basic-info-container">
        <h2 className="temperature">{props.weatherData.temperature}&deg;C</h2>
        <p className="text">
          Feels like:{" "}
          <span className="feels-temperature">
            {props.weatherData.feelsLike}&deg;C
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
          units={`\u00b0C `}
        ></DetailWeather>
        <DetailWeather
          dataType="Low"
          value={props.weatherData.low}
          units={`\u00b0C `}
        ></DetailWeather>

        <DetailWeather
          // img={
          //   <img src="./img/humidity-icon-15.jpg" alt="Humidity Iconnnn "></img>
          // }
          dataType="Humidity"
          value={props.weatherData.humidity}
          units=" %"
        ></DetailWeather>
        <DetailWeather
          dataType="Wind Speed"
          value={props.weatherData.windSpeed}
          units=" km/h"
        ></DetailWeather>
        <DetailWeather
          dataType="Pressure"
          value={props.weatherData.pressure}
          units=" hPa"
        ></DetailWeather>
        <DetailWeather
          dataType="Visibility"
          value={props.weatherData.visibility}
          units=" km"
        ></DetailWeather>
      </div>
    </section>
  );
}
