export default function SearchResultsList(props) {
  return (
    // Doesn't work
    <div className="results-list">
      {props.results.map((result, id) => (
        <div
          key={id}
          className="search-result"
          onClick={(e) => props.handleChange(e.target.value)}
        >
          {console.log(`Results: ${props.results}`)}
          {console.log(`Result: ${result.name}`)}
          {/* {console.log(`Handle Change: ${props.handleChange()}`)} */}
          {result.name}
        </div>
      ))}
    </div>
  );
}
