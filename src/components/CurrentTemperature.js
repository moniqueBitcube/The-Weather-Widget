import React from "react";
import axios from "axios";
import { currentWeather, weatherAPI } from "../apis/weatherApi";
import { weatherForecastData } from "../data/data";

export default class CurrentTemperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: this.props.temperature,
      condition: this.props.condition
    }
  }

  componentDidMount() {
    currentWeather()
    .then(res => {
      const weather = res.data;
      this.setState({ temperature: Math.round(weather.main.temp), condition: weather.weather[0].description });
    })
  }

  render() {
    return (
     <div style={{ margin: '20px' }}>
       <p className="display-5">{this.state.temperature} °C</p>
       <p className="medium" style={{ textTransform: 'capitalize' }}>{this.state.condition}</p>
     </div>
    )
  }
}