import React from "react";
import CurrentWeatherIcon from "./CurrentWeatherIcon";
import CurrentTemperature from "./CurrentTemperature";
import axios from "axios";
import "../style/presentation.css"

export default class Presentation extends React.Component {
  state = {
    cityName: [],
    country: [],
    dateAndTime: [],
    day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'][new Date().getDay()],
  }

  componentDidMount() {
    const lat = "40.7128";
    const lon = "-74.0060";

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&cnt=5`)
      .then(res => {
        const weather = res.data;
        this.setState({ cityName: weather.city.name, countryName: weather.city.country, dateAndTime: weather.list[0].dt_txt });
        let cityName = weather;
        console.log(cityName);
        console.log(weather.list[0])
      })
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1 style={{ textAlign: 'center' }}>5-Day Forecast.</h1>
        </div>

        <div className="subHeader">
          <h4 style={{ textAlign: 'center', marginTop: '20px' }}>{this.state.cityName}, {this.state.countryName}</h4>
        </div>

        <div className="container" style={{ margin: '30px auto' }}>
          <div className="row row-cols-5">
            <div className="col" style={{ textAlign: 'center' }}>
              <h3 style={{ paddingBottom: '20px' }}>{this.state.day}</h3>
              <p className="font">{this.state.dateAndTime}</p>
              <p className="font"><CurrentWeatherIcon /></p>
              <p className="font"><CurrentTemperature /></p>
            </div>
            <div className="col">Column</div>
            <div className="col">Column</div>
            <div className="col">Column</div>
            <div className="col">Column</div>
          </div>
        </div>

      </div>
    );
  }
}