import CurrentCitySection from "./CurrentCitySection";
import HighlightsSection from "./HighlightsSection";
import ForecastSection from "./ForecastSection";
import HourlyForecastSection from "./HourlyForecastSection";
// import HourlyForecastSection from "./HourlyForecastSection";

export default function Main({
  city,
  weatherData,
  forecastItems,
  units,
  handleUnits,
  futureWeatherData,
}) {
  // Display  time and date for the location fetched
  const now = new Date();
  const date = now.toDateString();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const formattedTime = `${hour}:${(minutes < 10 ? "0" : "") + minutes}`;

  if (!weatherData) return <p>Loading weather</p>;
  return (
    <main className="flex-container">
      <CurrentCitySection city={city} date={date} time={formattedTime} />
      <HighlightsSection
        weatherData={weatherData}
        handleUnits={handleUnits}
        units={units}
      />
      {/* <ForecastSection futureWeatherData={futureWeatherData} units={units} /> */}
      <HourlyForecastSection
        // isDark={props.isDark}
        futureWeatherData={futureWeatherData}
        forecastItems={forecastItems}
        // units={units}
      />
    </main>
  );
}
