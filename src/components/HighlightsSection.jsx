import Sun from "./Sun";
import DetailWeather from "./DetailWeather";

export default function HighlightsSection(props) {
  console.log("Highlight Section:", props);
  console.log("Highlight Section2:", props.weatherData);
  console.log("Sunrise", props.weatherData.sunrise.getHours());

  const sunriseH = props.weatherData.sunrise.getHours();
  const sunriseM = props.weatherData.sunrise.getMinutes();
  const sunriseFormatted = `${sunriseH}:${sunriseM} AM`;

  const sunsetH = props.weatherData.sunset.getHours();
  const sunsetM = props.weatherData.sunset.getMinutes();
  const sunsetFormatted = `${sunsetH}:${sunsetM} PM`;

  return (
    <section className="highlights-container">
      <div className="basic-info-container">
        <h2 className="temperature">{props.weatherData.temperature}</h2>
        <p className="text">
          Feels like:
          <span className="feels-temperature">
            {props.weatherData.feelsLike}
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
        <img src={props.weatherData.icon} alt="Current weather conditions" />
        <p>Sunny</p>
      </div>
      <div className="detail-info-container">
        <DetailWeather>Humidity</DetailWeather>
        <DetailWeather>Wind Spead</DetailWeather>
        <DetailWeather>Pressure</DetailWeather>
        <DetailWeather>UV</DetailWeather>
      </div>
    </section>
  );
}
