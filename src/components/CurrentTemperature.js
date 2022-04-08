import React from "react";
import axios from "axios";
export default class CurrentTemperature extends React.Component {
  state = {
    weather: [],
    condition: [],
  }

  componentDidMount() {
    const lat = "40.7128";
    const lon = "-74.0060";

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&cnt=5`)
    .then( res => {
      const weather = res.data;
      this.setState({ weather: weather.list[0].main.temp, condition: weather.list[0].weather[0].main });
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