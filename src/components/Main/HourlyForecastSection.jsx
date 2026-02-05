import HourForecast from "./HourForecast";

export default function HourlyForecastSection({
  forecastItems,
  units,
  isDark,
}) {
  if (!forecastItems) {
    return "Weather loading...";
  }
  return (
    <div className="hourly-forecast-container">
      <h2 className="title-center">Hourly Forecast:</h2>
      <div className="hourly-forecast">
        {forecastItems.map((f, index) => (
          <HourForecast
            key={index}
            isDark={isDark}
            time={f.time}
            icon={f.icon1}
            iconDesc={f.description}
            temp={f.temp}
            high={f.tempHigh}
            low={f.tempLow}
            units={units}
          />
        ))}
      </div>
    </div>
  );
}
