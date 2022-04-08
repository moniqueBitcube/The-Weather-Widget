import React from "react";
import axios from "axios";
import weatherApi from "../apis/weatherApi";
export default class CurrentTemperature extends React.Component {
  state = {
    weather: [],
    condition: [],
  }

  componentDidMount() {
    const API_KEY = "897d5da384a2c950dbe07d72cea8b002";
    const lat = "40.7128";
    const lon = "-74.0060";

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then( res => {
      const weather = res.data;
      this.setState({ weather: weather.main.temp, condition: weather.weather[0].main });
      let temperature = weather;
      console.log(temperature);
    })
  }

  render() {
    return (
     <div>
       <p>{this.state.weather}</p>
       <p>{this.state.condition}</p>
     </div>
    )
  }
}