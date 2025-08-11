import CurrentCitySection from "./CurrentCitySection";
import HighlightsSection from "./HighlightsSection";
import ForecastSection from "./ForecastSection";
import HourlyForecastSection from "../HourlyForecastSection";
// import HourlyForecastSection from "./HourlyForecastSection";

export default function Main(props) {
  return (
    <main className="flex-container">
      <CurrentCitySection
        city={props.city}
        date={props.date}
        time={props.time}
      />
      <HighlightsSection weatherData={props.weatherData} />
      <ForecastSection futureWeatherData={props.futureWeatherData} />
      <HourlyForecastSection futureWeatherData={props.futureWeatherData} />
    </main>
  );
}
