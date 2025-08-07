import CurrentCitySection from "./CurrentCitySection";
import HighlightsSection from "../HighlightsSection";
import ForecastSection from "../ForecastSection";
// import HourlyForecastSection from "./HourlyForecastSection";

export default function Main(props) {
  console.log(props);
  return (
    <main className="flex-container">
      <CurrentCitySection
        city={props.city}
        date={props.date}
        time={props.time}
      />
      <HighlightsSection weatherData={props.weatherData} />
      <ForecastSection />
      {/* <HourlyForecastSection /> */}
    </main>
  );
}
