import React from "react";
import axios from "axios";
import { currentWeather, weatherAPI } from "../apis/weatherApi";
import { weatherForecastData } from "../data/data";

export default class CurrentWeatherIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: this.props.icon,
    }
  }
  componentDidMount() {
    currentWeather()
    .then( res => {
      const weather = res.data;
      this.setState({ icon: weather.weather[0].icon });
    })
  }

  render() {
    return (
      <div>
        <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt="weather icon" style={{ width: '80px'}}/>
      </div>
    );
  }
}