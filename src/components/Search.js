import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export function SingleSelect() {
  const items = [
    {
      id: 0,
      name: 'Winburg',
      lat: '-28.681459',
      lon: '27.065849'
    },
    {
      id: 1,
      name: 'Bloemfontein',
      lat: '-29.085215',
      lon: '26.159576'
    },
    {
      id: 2,
      name: 'Riebeek-Wes',
      lat: '-33.350640',
      lon: '18.869920'
    }
  ]

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

    return (
    <div className="App">
      <header className="App-header">
        <div >
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
          />
        </div>
      </header>
    </div>
  )
}

export default SingleSelect;