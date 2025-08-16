import Forecast from "./Forecast.jsx";

export default function ForecastSection({ futureWeatherData }) {
  if (!futureWeatherData) {
    return <p>Loading forecast</p>;
  }
  console.log("Future weather data: ", futureWeatherData);
  return (
    <section className="forecast-section-container">
      <h2 className="title-center">5 Days Forecast</h2>
      {futureWeatherData.map((item, index) => {
        return (
          <Forecast
            icon={`https://openweathermap.org/img/wn/${item.icon1}@2x.png`}
            tempDate={item.temp}
            date={item.date}
          />
        );
      })}
      {/* <Forecast
        iconDate={forecastItems.icon1Date1}
        tempDate={props.futureWeatherData.time1Date1Temp}
        date={props.futureWeatherData.date1}
        units={props.units}
      />

      <Forecast
        iconDate={props.futureWeatherData.icon1Date2}
        tempDate={props.futureWeatherData.time1Date2Temp}
        date={props.futureWeatherData.date2}
        units={props.units}
      />
      <Forecast
        iconDate={props.futureWeatherData.icon1Date3}
        tempDate={props.futureWeatherData.time1Date3Temp}
        date={props.futureWeatherData.date3}
        units={props.units}
      />
      <Forecast
        iconDate={props.futureWeatherData.icon1Date4}
        tempDate={props.futureWeatherData.time1Date4Temp}
        date={props.futureWeatherData.date4}
        units={props.units}
      />
      <Forecast
        iconDate={props.futureWeatherData.icon1Date5}
        tempDate={props.futureWeatherData.time1Date5Temp}
        date={props.futureWeatherData.date5}
        units={props.units}
      /> */}
    </section>
  );
}
