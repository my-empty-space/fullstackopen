import axios from "axios";
const API = "https://studies.cs.helsinki.fi/restcountries/api"

export const getAllCountries = () => {
  const req = axios.get(`${API}/all`)
  return req.then(res => res.data)
}

export const getCountryByName = (name) => {
  const req = axios.get(`${API}/name/${name}`)
  return req.then(res => res.data)
}