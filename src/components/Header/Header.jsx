// import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
// import SearchResultsList from "./SearchResultsList";

export default function Header(props) {
  // const [results, setResults] = useState([]);
  // const [input, setInput] = useState("");

  // const fetchData = (value) => {
  //   fetch(
  //     "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={67263f61c34be6002f3dec2554277cb1}"
  //   ).then(
  //     (response) => response.json().then((json) => console.log(json))
  //     //   {
  //     //   const results = json.filter((location) => {
  //     //     return (
  //     //       value && location && location.name.toLowerCase().includes(value)
  //     //     );
  //     //   });
  //     //   setResults(results);
  //     // })
  //   );
  // };

  // const handleChange = (value) => {
  //   fetchData(value);
  //   setInput(value);
  // };

  return (
    <header className="header">
      {/* Dark/Light Mode */}
      <div className="toggle-container">
        <label className="toggle-label">
          <input type="checkbox" className="toggle-input" />
          <span className="slider" onClick={props.toggleDarkMode}></span>
        </label>
        <p>Dark Mode</p>
      </div>

      {/* Search Bar */}
      <form action="/search" method="get" className="form-container">
        <div className="serarch-bar-container">
          <label className="site-search"></label>
          <SearchBar
            city={props.city}
            setCity={props.setCity}
            handleChange={props.handleChange}
          />
          {/* <SearchResultsList 
            city={props.city}
            handleChange={props.handleChange}
          /> */}
        </div>
      </form>
      {/* Current Location */}
      <button className="location">
        <ion-icon name="locate" className="icon"></ion-icon>
        Current Location
      </button>
    </header>
  );
}
