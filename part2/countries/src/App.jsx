import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
      .then(response => setWeather(response.data))
  }, [capital, apiKey])

  if (!weather) {
    return null
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div>temperature {weather.main.temp} °C</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital ? country.capital[0] : 'unknown'}</div>
      <div>area {country.area}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt || `flag of ${country.name.common}`}
        width="150"
      />
      {country.capital && <Weather capital={country.capital[0]} />}
    </div>
  )
}

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    axios.get(`${baseUrl}/all`).then(response => setCountries(response.data))
  }, [])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
    setSelected(null)
  }

  const matches = query === ''
    ? []
    : countries.filter(country =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      )

  const renderResult = () => {
    if (selected) {
      return <CountryDetails country={selected} />
    }
    if (query === '') {
      return null
    }
    if (matches.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    if (matches.length === 1) {
      return <CountryDetails country={matches[0]} />
    }
    if (matches.length === 0) {
      return <p>No matches</p>
    }
    return (
      <div>
        {matches.map(country =>
          <div key={country.name.common}>
            {country.name.common}{' '}
            <button onClick={() => setSelected(country)}>show</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div>
        find countries <input value={query} onChange={handleQueryChange} />
      </div>
      {renderResult()}
    </div>
  )
}

export default App
