import axios from "axios";

const API_KEY = "897d5da384a2c950dbe07d72cea8b002";
const lat = "40.7128";
const lon = "-74.0060";

export default axios.get({
  baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
})