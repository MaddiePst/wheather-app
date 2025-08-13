// import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
// import SearchResultsList from "./SearchResultsList";

export default function Header({ city, onChange, onKeyDown, getLocation }) {
  // function getCurLocation() {
  //   props.getLocation();
  //   // props.search(props.location.latitude, props.location.longitude);
  // }

  return (
    <header className="header">
      {/* Dark/Light Mode */}
      <div className="toggle-container">
        <label className="toggle-label">
          <input type="checkbox" className="toggle-input" />
          {/* <span className="slider" onClick={props.toggleDarkMode}></span> */}
        </label>
        <p>Dark Mode</p>
      </div>

      {/* Search Bar */}
      <form action="/search" method="get" className="form-container">
        <div className="serarch-bar-container">
          <label className="site-search"></label>
          <SearchBar city={city} onKeyDown={onKeyDown} onChange={onChange} />
          {/* <SearchResultsList 
            city={props.city}
            handleChange={props.handleChange}
          /> */}
        </div>
      </form>
      {/* Current Location */}
      <button className="location" onClick={() => getLocation()}>
        <ion-icon name="locate" className="icon"></ion-icon>
        Current Location
      </button>
    </header>
  );
}
