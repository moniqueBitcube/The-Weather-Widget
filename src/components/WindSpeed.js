import React from "react";
import axios from "axios";
import { weatherAPI } from "../apis/weatherApi";
import { weatherForecastData } from "../data/data";
export default class WindSpeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windSpeed: this.props.windSpeed,
    }
  }

  render() {
    return (
      <div>
        <i className="fa fa-location-arrow" aria-hidden="true"></i> <span style={{ fontSize: '9pt' }}>{Math.floor(this.state.windSpeed)} km/h </span>
      </div>
    )
  }


}