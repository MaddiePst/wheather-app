export default function SearchBar({ city, onChange, onKeyDown, inputValue }) {
  return (
    <div className="input-wrapper">
      <input
        className="search-bar"
        placeholder="🔎Search for your preffered city..."
        value={inputValue}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
    </div>
  );
}
