export default function DetailWheather(props) {
  // const percentage = "%";
  return (
    <div>
      {/* {props.img} */}
      <h4>
        {props.value}
        {props.units}
      </h4>
      <p>{props.dataType}</p>
    </div>
  );
}
