import React from "react";
import axios from "axios";
export default class CurrentWeatherIcon extends React.Component {
  state = {
    icon: [],
  }

  componentDidMount() {
    const lat = "-28.681459";
    const lon = "27.065849";

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
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