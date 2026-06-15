import { useState, useEffect } from "react"
import { getAllCountries, getCountryByName } from "./services/countries"

const Countries = ({ countriesToShow, handleShowBtn }) => {
  const [countryToRender, setCountryToRender] = useState(null)

  useEffect(() => {
    console.log(`Paises a mostrar: ${countriesToShow}`)

    if (countriesToShow !== null && countriesToShow.length === 1) {
      const countryName = countriesToShow[0]

      getCountryByName(countryName)
        .then((country) => setCountryToRender(country))
    }
  }, [countriesToShow])

  if (countriesToShow === null) return
  if (countriesToShow.length === 0) return <p>There are no matches</p>
  if (countriesToShow.length > 10) return <p>Too many matches, specify another filter</p>

  if (countriesToShow.length > 1) {
    return (<ul>
      {countriesToShow.map((e, i) => (
        <li key={i}>
          {e} <button onClick={() => handleShowBtn(e)}>Show</button>
        </li>
      ))}
    </ul>)
  }


  if (!countryToRender) return <h2>Renderizando</h2>
  return (<div>
    <h2>{countryToRender?.name?.common}</h2>
    <h3>{countryToRender?.name?.official}</h3>
    {countryToRender?.capital?.[0] && <p><b>Capital:</b> {countryToRender.capital[0]}</p>}
    <p><b>Area:</b> {countryToRender?.area}</p>

    <h4>Languages</h4>
    <ul>
      {Object.keys(countryToRender?.languages).map((e) => (
        <li key={e}>{countryToRender?.languages[e]}</li>
      ))}
    </ul>

    <img src={countryToRender.flags.png} alt={`flag of ${countryToRender.name.common}`} />
  </div>)

}

const App = () => {
  const [inputValue, setInputValue] = useState("")
  const [countriesList, setCountriesList] = useState([])
  const [countriesToShow, setCountriesToShow] = useState(null)

  useEffect(() => {
    getAllCountries()
      .then(data => {
        const countries = data.map((element) => (
          element.name.official
        ))
        setCountriesList(countries)
      })
  }, [])

  const handleChange = (e) => {
    const currentValue = e.target.value
    setInputValue(currentValue)

    // Early return
    if (currentValue === "") {
      setCountriesToShow(null)
      return
    }

    // Buscar paises que conciden con los parametros de busqueda
    const countriesCoincidences = countriesList.reduce((acc, curr) => {
      if (curr.toLowerCase().includes(currentValue.toLowerCase())) {
        return [...acc, curr]
      }

      return acc
    }, [])

    setCountriesToShow(countriesCoincidences)
  }

  const handleShowBtn = (countryName) => {
    setCountriesToShow([countryName])
  }

  return (
    <>
      <h1>Countries</h1>

      <form>
        <label>
          Find countries:{" "}
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
      </form>

      <Countries countriesToShow={countriesToShow} handleShowBtn={handleShowBtn} />

    </>
  )
}

export default App
