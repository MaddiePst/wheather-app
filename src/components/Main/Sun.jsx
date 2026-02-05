export default function Sun(props) {
  return (
    <div className="sun-container">
      <div className="image-container">
        {props.riseOrSet}
        <ion-icon name="sunny" className="rise-or-set"></ion-icon>
      </div>
      <div className="info-container">
        <h4>{props.title}</h4>
        <p>{props.time}</p>
      </div>
    </div>
  );
}
