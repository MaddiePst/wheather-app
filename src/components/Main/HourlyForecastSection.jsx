import HourForecast from "./HourForecast";

export default function HourlyForecastSection(props) {
  // console.log(props.futureWeatherData.date1);
  // console.log(props.futureWeatherData.time1Date1);
  // console.log(props.futureWeatherData.time2Date1);
  // console.log(props.futureWeatherData.time3Date1);
  console.log(props.futureWeatherData.icon1Desc);
  console.log(props.futureWeatherData.icon2Desc);
  console.log(props.futureWeatherData.icon3Desc);
  console.log(props.futureWeatherData.icon4Desc);
  console.log(props.futureWeatherData.icon5Desc);

  return (
    <div className="hourly-forecast-container">
      <h2 className="title-center">Hourly Forecast:</h2>
      <div className="hourly-forecast">
        <HourForecast
          isDark={props.isDark}
          time={props.futureWeatherData.time1Date1}
          icon={props.futureWeatherData.icon1Date1}
          iconDesc={props.futureWeatherData.icon1Desc}
          temp={props.futureWeatherData.time1Date1Temp}
          high={props.futureWeatherData.tempHigh1}
          low={props.futureWeatherData.tempLow1}
          units={props.units}
        />
        <HourForecast
          isDark={props.isDark}
          time={props.futureWeatherData.time2Date1}
          icon={props.futureWeatherData.icon2Date1}
          iconDesc={props.futureWeatherData.icon2Desc}
          temp={props.futureWeatherData.time2Date1Temp}
          high={props.futureWeatherData.tempHigh2}
          low={props.futureWeatherData.tempLow2}
          units={props.units}
        />

        <HourForecast
          isDark={props.isDark}
          time={props.futureWeatherData.time3Date1}
          icon={props.futureWeatherData.icon3Date1}
          iconDesc={props.futureWeatherData.icon3Desc}
          temp={props.futureWeatherData.time3Date1Temp}
          high={props.futureWeatherData.tempHigh3}
          low={props.futureWeatherData.tempLow3}
          units={props.units}
        />
        <HourForecast
          isDark={props.isDark}
          time={props.futureWeatherData.time4Date1}
          icon={props.futureWeatherData.icon4Date1}
          iconDesc={props.futureWeatherData.icon4Desc}
          temp={props.futureWeatherData.time4Date1Temp}
          high={props.futureWeatherData.tempHigh4}
          low={props.futureWeatherData.tempLow4}
          units={props.units}
        />
        <HourForecast
          isDark={props.isDark}
          time={props.futureWeatherData.time5Date1}
          icon={props.futureWeatherData.icon5Date1}
          iconDesc={props.futureWeatherData.icon5Desc}
          temp={props.futureWeatherData.time5Date1Temp}
          high={props.futureWeatherData.tempHigh5}
          low={props.futureWeatherData.tempLow5}
          units={props.units}
        />
      </div>
    </div>
  );
}
