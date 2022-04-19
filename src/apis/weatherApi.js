import axios from "axios";

export const lat = localStorage.getItem("Latitude");
export const lon = localStorage.getItem("Longitude");

export const search_lat = localStorage.getItem("Search Latitude");
export const search_lon = localStorage.getItem("Search Longitude");

export function currentWeather() {
  localStorage.clear();
  if (lat) {
    const geo_currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`

    return axios({
      method: "get",
      url: geo_currentWeatherUrl,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
  } 
  
  else if (!lat && search_lat) {
    const search_currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${search_lat}&lon=${search_lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`

    return axios({
      method: "get",
      url: search_currentWeatherUrl,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
  }
  
  else {
    const default_currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=-28.681459&lon=27.065849&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`

    return axios({
      method: "get",
      url: default_currentWeatherUrl,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
  }
}

export function weatherAPI() {
  if (lat) {
    const geo_weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`

    return axios({
      method: "get",
      url: geo_weatherUrl,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
  } 
  else if (!lat && search_lat) {
    const search_weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${search_lat}&lon=${search_lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`

    return axios({
      method: "get",
      url: search_weatherUrl,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });

  }
  
  else {
    const default_weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=-28.681459&lon=27.065849&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`

    return axios({
      method: "get",
      url: default_weatherUrl,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
  }
}