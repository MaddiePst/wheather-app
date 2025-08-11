// import { useState } from "react";

// I want to be able to search the city and display automatically
export default function SearchBar(props) {
  return (
    <div className="input-wrapper">
      <input
        // type="search"
        className="search-bar"
        placeholder="🔎Search for your preffered city..."
        value={props.city}
        onKeyDown={props.onKeyDown}
        onChange={props.onChange}
      />
    </div>
  );
}
