import Forecast from "./Forecast.jsx";

export default function ForecastSection({ futureWeatherData, units }) {
  if (!futureWeatherData) {
    return <p>Loading forecast</p>;
  }

  let forecastDataByDay = [];

  const filterWeatherDataByDay = () => {
    if (futureWeatherData?.list) {
      forecastDataByDay = futureWeatherData.list
        .filter((item) => new Date(item.dt_txt).getHours() === 12)
        .slice(0, 5)
        .map((item) => {
          const dateObj = new Date(item.dt_txt);
          const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
            dateObj.getDay()
          ];
          const monthName = [
            "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sep","Oct","Nov","Dec",
          ][dateObj.getMonth()];

          return {
            date: `${dayName}, ${dateObj.getDate()} ${monthName}`,
            icon1: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
            temp: Math.round(item.main.temp),
          };
        });
    }
  };

  filterWeatherDataByDay();

  return (
    <section className="forecast-section-container">
      <h2 className="title-center">5 Days Forecast</h2>
      <div className="outside-forecast-container">
        {forecastDataByDay.map((item) => (
          <Forecast
            key={item.date}
            icon={item.icon1}
            tempDate={item.temp}
            date={item.date}
            units={units}
          />
        ))}
      </div>
    </section>
  );
}
