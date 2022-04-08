import React from "react";
import axios from "axios";
export default class CurrentWeatherIcon extends React.Component {
  state = {
    icon: [],
  }

  componentDidMount() {

    const lat = "40.7128";
    const lon = "-74.0060";

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&cnt=5`)
    .then( res => {
      const weather = res.data;
      this.setState({ icon: weather.list[0].weather[0].icon });
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