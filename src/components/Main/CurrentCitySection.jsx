export default function CurrentCitySection(props) {
  console.log();
  return (
    <section className="current-city-container">
      <div className="writing-container">
        <h4 className="city">{props.city}</h4>
        <h1 className="time">{props.time}</h1>
        <p className="date-current-city">{props.date}</p>
      </div>
    </section>
  );
}
