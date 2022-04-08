import axios from "axios";

const lat = "40.7128";
const lon = "-74.0060";

export default axios.get({
  baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
})