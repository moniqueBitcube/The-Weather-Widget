import React from "react";
import "../style/search.css"
import { currentWeather, weatherAPI } from "../apis/weatherApi";
import { weatherForecastData, currentWeatherForecast } from "../data/data";
import 'react-js-dialog-box/dist/index.css'
import WindSpeed from "./WindSpeed";
import Humidity from "./Humidy";
import Forecast from './Forecast';
import "../style/presentation.css";

export default class Presentation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: new Date(this.props.dt * 1000).toLocaleDateString(),
      predictions: []
    }
  }

  componentDidMount() {
    weatherAPI()
      .then(res => {
        const weather = res.data;
        console.log(weather)
        const currentDate = new Date(this.props.dt * 1000);
        const predictions = weather.hourly.filter(item => {
          const date = new Date(item.dt * 1000);
          if (currentDate.getFullYear() === date.getFullYear() && currentDate.getMonth() === date.getMonth() && currentDate.getDate() === date.getDate()) {
            return true;
          } else {
            return false;
          }
        })
        this.setState({ predictions: predictions });
      })
  }


  showAddOns = () => {
    var x = document.querySelector("#addOns");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  render() {
    return (
      <div>
        <div>
          <div className="row" style={{ padding: '0 50px' }} onClick={this.showAddOns}>
            {
              this.state.predictions.map((item, index) => {
                const today = new Date(item.dt * 1000);
                return (
                  <div className="column3" key={index}>
                    <div className="h-65">
                      <span >
                        <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="weather icon" style={{ width: '60px' }} />
                      </span>

                      <p className="" style={{ fontSize: '16pt' }}>{item.temp} °C</p>
                      <p className="" style={{ textTransform: 'capitalize', fontSize: '.75rem' }}>{item.weather[0].description}</p>
                    </div>

                    <i className="fa fa-tint"></i>
                    <WindSpeed />
                    <hr />
                    <p>{today.getHours()}</p>
                  </div>
                )
              })
            }
          </div>
        </div>


        <div id="addOns" style={{ display: 'none', padding: '0px 50px' }}>

          <h6>Day Details</h6>
          <hr />
        </div>
      </div>

    );
  }
}

