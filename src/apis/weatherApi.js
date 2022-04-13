import axios from "axios";
import React, { useState } from 'react'

export const lat = localStorage.getItem("Latitude");
export const lon = localStorage.getItem("Longitude");

export function currentWeather() {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`

  return axios({
    method: "get",
    url: currentWeatherUrl,
  })
  .then((response) => {
    return response;
  })
  .catch((err) => {
    return err;
  });
}

export function weatherAPI(){
  const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
  
  return axios({
    method: "get",
    url: weatherUrl,
  })
  .then((response) => {
    return response;
  })
  .catch((err) => {
    return err;
  });

}
export default class location extends React.Component{
state = { 
  lat: null,
  lon: null,
  errorMessage: '',
};
  
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude, lon: position.coords.longitude }),
      err => this.setState({ errorMessage: err.message })
    );
  }

  componentDidUpdate() {
    console.log("My component was just updated")
  }

  render () {
    if(this.state.errorMessage && !this.state.lat) {
      return <div>Error: { this.state.errorMessage }</div>
    }

    if(!this.state.errorMessage && this.state.lat) {
      return <div >lat={ this.state.lat }</div>
    }

    // return <div><Spinner message="Please accept location request." /></div>
  }
}