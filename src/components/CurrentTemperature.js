import React from "react";
import axios from "axios";
import weatherApi from "../apis/weatherApi";
export default class CurrentTemperature extends React.Component {
  state = {
    weather: [],
    condition: [],
  }

  componentDidMount() {
    const lat = "-28.681459";
    const lon = "27.065849";

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
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