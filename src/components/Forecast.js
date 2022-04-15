import React from "react";

export default class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      maxTemperature: this.props.maxTemperature,
      minTemperature: this.props.minTemperature,
      mornTemperature: this.props.mornTemperature,
      eveTemperature: this.props.eveTemperature,
      rain: this.props.rain
    }
  }

  render() {
    return (
      <div>
        <span className="iconify daily" data-icon="carbon:temperature-max"></span> <span>Max temperature is <span>{Math.floor(this.state.maxTemperature)} °C </span></span> <br />
        <span className="iconify daily" data-icon="carbon:temperature-min"></span> <span>Min temperature is <span>{Math.floor(this.state.minTemperature)} °C </span></span> <br />
        <span className="iconify daily" data-icon="eva:sun-outline"></span> <span>Morning's temperature is <span>{Math.floor(this.state.mornTemperature)} °C </span></span> <br />
        <span className="iconify daily" data-icon="carbon:haze-night"></span> <span>Evening's temperature is <span>{Math.floor(this.state.eveTemperature)} °C </span></span>

        <span>{this.state.rain}</span>
      </div>
    )
  }
}