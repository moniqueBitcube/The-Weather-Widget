import React from "react";
import axios from "axios";
export default class CurrentWeatherIcon extends React.Component {
  state = {
    icon: [],
  }

  componentDidMount() {
    const API_KEY = "897d5da384a2c950dbe07d72cea8b002";
    const lat = "40.7128";
    const lon = "-74.0060";

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then( res => {
      const weather = res.data;
      this.setState({ icon: weather.weather[0].icon });
      let icon = weather;
      console.log(icon);
    })
  }

  render() {
    return (
      <div>
        <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt="weather icon" />
      </div>
    );
  }
}