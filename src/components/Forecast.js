import React from "react";
import axios from "axios";
import { weatherAPI } from "../apis/weatherApi";
export default class Forecast extends React.Component {
  state = {
    maxTemp: [],
    minTemp: []
  }

  componentDidMount() {
    weatherAPI()
      .then(res => {
        const weather = res.data;
        // this.setState({ maxTemp: weather.list[0].main.temp_max, minTemp: weather.list[0].main.temp_min });
      })
  }

  render() {
    return (
      <div>
        {/* Add to Hourly Page */}
        <p className="">Max Temperature: {this.state.maxTemp} °C</p>
        <p className="">Min Temperature: {this.state.minTemp} °C</p>
      </div>
    )
  }


}