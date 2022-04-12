import React from "react";
import axios from "axios";
import { currentWeather, weatherAPI } from "../apis/weatherApi";
import { weatherForecastData } from "../data/data";

export default class OtherTemperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: this.props.temperature,
      condition: this.props.condition
    }
  }

  render() {
    return (
     <div>
       <p className="display-4">{this.props.temperature} °C</p>
       <span className="small"style={{ color: '#868B94' }}>{this.props.condition}</span>
     </div>
    )
  }
}