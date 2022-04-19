import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { locations } from '../data/locations'

export function SingleSelect() {
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
    const lat = item.lat;
    const lon = item.lon;

    localStorage.setItem("Search Latitude", lat);
    localStorage.setItem("Search Longitude", lon);

    window.location.reload();
  }

    return (
    <div className="App">
      <header className="App-header">
        <div >
          <ReactSearchAutocomplete
            items={locations}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
          />
        </div>
      </header>
    </div>
  )
}

export default SingleSelect;