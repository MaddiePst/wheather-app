export default function HourForecast(props) {
  return (
    <div
      className="hour-container"
      style={{
        background: props.isDark
          ? "#292929"
          : props.iconDate === "Rain" || props.iconDesc === "Clouds"
          ? "#868e96"
          : "#f88000",
      }}
    >
      <p className="hour-bold">{props.time}</p>
      <img src={props.icon} alt="Weather conditions" className="icon-hour" />
      <p className="hour-bold hour-temp">
        {props.temp}&deg;{props.units === "metric" ? " C" : " F"}
      </p>
      <p className="hour-med-weight">
        H: {props.high}&deg;{props.units === "metric" ? " C" : " F"}
      </p>
      <p className="hour-med-weight">
        L: {props.low}&deg;{props.units === "metric" ? " C" : " F"}
      </p>
    </div>
  );
}
