import CurrentCitySection from "./CurrentCitySection";
import HighlightsSection from "./HighlightsSection";
import ForecastSection from "./ForecastSection";
import HourlyForecastSection from "./HourlyForecastSection";

export default function Main({
  city,
  weatherData,
  forecastItems,
  units,
  handleUnits,
  futureWeatherData,
  isDark,
}) {
  // Display  time and date for the location(city) fetched
  const timezoneCitySearched = weatherData?.timezone;
  const workingTimezone =
    new Date().getTime() + new Date().getTimezoneOffset() * 60000;
  const cityTimezoneLast = new Date(
    workingTimezone + timezoneCitySearched * 1000
  );
  const date = cityTimezoneLast.toDateString();
  const hour = cityTimezoneLast.getHours();

  const minutes = cityTimezoneLast.getMinutes();
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
      <ForecastSection futureWeatherData={futureWeatherData} units={units} />
      <HourlyForecastSection
        isDark={isDark}
        forecastItems={forecastItems}
        units={units}
      />
    </main>
  );
}
