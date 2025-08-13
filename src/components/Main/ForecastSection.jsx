import Forecast from "./Forecast.jsx";

export default function ForecastSection(props) {
  return (
    <section className="forecast-section-container">
      <h2 className="title-center">5 Days Forecast</h2>
      <Forecast
        iconDate={props.futureWeatherData.icon1Date1}
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
      />
    </section>
  );
}
