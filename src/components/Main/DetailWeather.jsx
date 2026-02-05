export default function DetailWheather(props) {
  return (
    <div>
      <h4>
        {props.value}
        {props.units}
      </h4>
      <p>{props.dataType}</p>
    </div>
  );
}
