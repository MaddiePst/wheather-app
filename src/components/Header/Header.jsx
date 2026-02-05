import SearchBar from "./SearchBar";

export default function Header({
  city,
  onChange,
  onKeyDown,
  getLocation,
  toggleDarkMode,
  inputValue,
}) {
  return (
    <header className="header">
      {/* Dark / Light Mode */}
      <div className="toggle-container">
        <label className="toggle-label">
          <input
            type="checkbox"
            className="toggle-input"
            onChange={toggleDarkMode}
            aria-label="Toggle dark mode"
          />
          <span className="slider" />
        </label>
        <span className="dark-mode">Dark Mode</span>
      </div>

      {/* Search */}
      <div className="search-bar-container">
        <SearchBar
          inputValue={inputValue}
          city={city}
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
      </div>

      {/* Current Location */}
      <button
        className="location"
        onClick={getLocation}
        aria-label="Use current location"
      >
        <ion-icon name="locate" className="icon" />
        <span>Current Location</span>
      </button>
    </header>
  );
}
