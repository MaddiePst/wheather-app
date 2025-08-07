// import { useState } from "react";

export default function SearchBar(props) {
  // Still need to work on the fetch website

  return (
    <div className="input-wrapper">
      <input
        // type="search"
        className="search-bar"
        placeholder="🔎Search for your preffered city..."
        value={props.input}
        onChange={(e) => props.handleChange(e.target.value)}
      />
    </div>
  );
}
