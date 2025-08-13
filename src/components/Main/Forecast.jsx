export default function Forecast(props) {
  return (
    <div className="forecast-container">
      <img
        src={props.iconDate}
        alt="Weather conditions"
        className="icon-img-s"
      />
      <p className="temp-date">
        {props.tempDate}&deg;{props.units === "metric" ? " C" : " F"}
      </p>
      <p className="date">{props.date}</p>
    </div>
  );
}
