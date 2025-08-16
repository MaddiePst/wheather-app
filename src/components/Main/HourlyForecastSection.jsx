import HourForecast from "./HourForecast";

export default function HourlyForecastSection({ futureWeatherData }) {
  return (
    <div className="hourly-forecast-container">
      <h2 className="title-center">Hourly Forecast:</h2>
      <div className="hourly-forecast">
        {futureWeatherData.map((f, index) => (
          <HourForecast
            key={index}
            // isDark={isDark}
            time={f.time}
            icon={f.icon}
            iconDesc={f.description}
            temp={f.temp}
            high={f.tempHigh}
            low={f.tempLow}
            // units={units}
          />
        ))}
      </div>
    </div>
  );
}
