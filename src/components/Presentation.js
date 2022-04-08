import React from "react";
import CurrentWeatherIcon from "./CurrentWeatherIcon";
import CurrentTemperature from "./CurrentTemperature";
import axios from "axios";
export default class Presentation extends React.Component {
  state = {
    cityName: []
  }

  weather = {
    day: 'Friday',
    date: 'March 1st',
    time: '12:00 PM',
  }

  componentDidMount() {
    const lat = "-28.681459";
    const lon = "27.065849";

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then( res => {
      const weather = res.data;
      this.setState({ cityName: weather.name });
      let cityName = weather;
      console.log(cityName);
    })
  }

  render() {
    return (
      <div>
        <div style={{  }}>
          <h1 style={{ textAlign: 'center' }}>5-Day Forecast.</h1>

        </div>

        <div>
          <h4 style={{ textAlign: 'center', marginTop: '50px' }}>{this.state.cityName}</h4>
        </div>


        <div style={{ margin: '30px auto', width: '15%', textAlign: 'center' }}>
          <h3>{this.weather.day}</h3>
          <p>{this.weather.date}, {this.weather.time}</p>
          <CurrentWeatherIcon />
          <CurrentTemperature />
        </div>

      </div>
    );
  }
}