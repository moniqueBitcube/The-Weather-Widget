import React from "react";
import "../style/search.css"
import { currentWeather, weatherAPI } from "../apis/weatherApi";
import { weatherForecastData, currentWeatherForecast } from "../data/data";
import 'react-js-dialog-box/dist/index.css'
import WindSpeed from "./WindSpeed";
import Humidity from "./Humidy";
import Forecast from './Forecast';
import "../style/presentation.css";
import { Carousel } from 'react-responsive-carousel';
import { isSameDate } from "../utils/isSameDate";
import Rain from "./Rain";
import { convertToDate } from "../utils/convertToDate";
export default class Presentation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: new Date(this.props.dt * 1000).toLocaleDateString(),
      predictions: [],
      dailyPredictions: []
    }
  }

  componentDidMount() {
    weatherAPI()
      .then(res => {
        const weather = res.data;
        console.log(weather)
        const currentDate = new Date(this.props.dt * 1000);
        const predictions = weather.hourly.filter(item => {
          const { today } = convertToDate(item);
          if (isSameDate(currentDate, today)) {
            return true;
          } else {
            return false;
          }
        })

        const dailyPredictions = weather.daily.filter(item => {
          const { today } = convertToDate(item);
          if (isSameDate(currentDate, today)) {
            return true;
          } else {
            return false;
          }
        });
        this.setState({ predictions: predictions, dailyPredictions: dailyPredictions });
        console.log("dailyPredictions", dailyPredictions)
        console.log("predictions", predictions)
      })
  }

  render() {
    return (
      <div>
        <div>
          <div className="row" style={{ padding: '0 30px' }}>
          <Carousel>
            {
              this.state.predictions.map((item, index) => {
                const { twelveHours } = convertToDate(item);
                return (
                  <div className="column3" key={index}>
                    <div className="h-65">
                      <span >
                        <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="weather icon" style={{ width: '60px' }} />
                      </span>

                      <p className="" style={{ fontSize: '16pt' }}>{Math.floor(item.temp)} °C</p>
                      <p className="" style={{ textTransform: 'capitalize', fontSize: '.75rem' }}>{item.weather[0].description}</p>
                    </div>

                    <WindSpeed windSpeed={item.wind_speed}/>
                    <hr />
                    <p>{twelveHours}</p>
                  </div>
                )
              })
            }
            </Carousel>
          </div>
        </div>


        <div style={{ padding: '0px 40px' }}>
          {
            this.state.dailyPredictions.map((item, index) => {
              const { sunrise, sunset, moonrise, moonset } = convertToDate(item);
              return (
                <div key={index}>
                  <h5>Day Details</h5>
                  <hr />

                  <div className="row dayRows">
                    <div className="dailyColumn">
                      <div>
                        <Forecast maxTemperature={item.temp.max} minTemperature={item.temp.min} mornTemperature={item.temp.morn} eveTemperature={item.temp.eve}/>
                      </div>
                    </div>
                    <div className="dailyColumn">
                      <div>
                        <p style={{ fontSize: '14pt' }}>Sunrise</p>
                        <span className="iconify daily" data-icon="wi:sunrise" style={{ width: '70px !important', height: '70px !important' }}></span> <span>{sunrise.getHours() + ':' + sunrise.getMinutes() + ' AM'}</span>

                        <p style={{ fontSize: '14pt' }}>Sunset</p>
                        <span className="iconify daily" data-icon="wi:sunset"></span> <span>{sunset.getHours() + ':' + sunset.getMinutes() + ' PM'}</span>
                      </div>
                    </div>
                    <div className="dailyColumn">  
                      <div>
                        <p style={{ fontSize: '14pt' }}>Moonrise</p>
                        <span className="iconify daily" data-icon="wi:moonrise"></span> <span>{moonrise.getHours() + ':' + moonrise.getMinutes() + ' PM'}</span>

                        <p style={{ fontSize: '14pt' }}>Moonset</p>
                        <span className="iconify daily" data-icon="wi:moonset"></span><span>{moonset.getHours() + ':' + moonset.getMinutes() + ' AM'}</span>
                      </div>
                    </div>
                    <div className="dailyColumn">
                      <Humidity humidity={item.humidity}/>

                      <p style={{ fontSize: '14pt' }}>Rain</p>
                      <span><Rain rain={item.rain}/></span>
                    </div>
                  </div>
                  <hr/>
                  <div className="row dayRows">
                    <div className="dailyColumn">
                      <p style={{ fontSize: '14pt' }}>Cloudiness</p>
                      <span className="iconify daily" data-icon="bi:cloud-haze2"></span> <span>There is a {item.clouds} % chance of clouds.</span>
                    </div>
                    <div className="dailyColumn">
                      <p style={{ fontSize: '14pt' }}>UVI Index</p>
                      <span className="iconify daily" data-icon="arcticons:ruuvistation"></span> <span>{item.uvi} % </span>
                    </div>
                    <div className="dailyColumn">
                      <p style={{ fontSize: '14pt' }}>Dew Point</p>
                      <span className="iconify daily" data-icon="carbon:dew-point"></span> <span>{item.dew_point} % </span>
                    </div>
                    <div className="dailyColumn">
                      <p style={{ fontSize: '14pt' }}>Wind Speed</p>
                      <span className="iconify daily" data-icon="bi:wind"></span> <span>{item.wind_speed} km/h </span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
