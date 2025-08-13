import CurrentCitySection from "./CurrentCitySection";
import HighlightsSection from "./HighlightsSection";
import ForecastSection from "./ForecastSection";
import HourlyForecastSection from "./HourlyForecastSection";
// import HourlyForecastSection from "./HourlyForecastSection";

export default function Main(props) {
  return (
    <main className="flex-container">
      <CurrentCitySection
        city={props.city}
        date={props.date}
        time={props.time}
      />
      <HighlightsSection
        weatherData={props.weatherData}
        handleUnits={props.handleUnits}
        units={props.units}
      />
      <ForecastSection
        futureWeatherData={props.futureWeatherData}
        units={props.units}
      />
      <HourlyForecastSection
        isDark={props.isDark}
        futureWeatherData={props.futureWeatherData}
        units={props.units}
      />
    </main>
  );
}
