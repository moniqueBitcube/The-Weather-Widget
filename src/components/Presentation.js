import React from "react";
import CurrentWeatherIcon from "./CurrentWeatherIcon";
import CurrentTemperature from "./CurrentTemperature";
import "../style/presentation.css"
import "../style/search.css"

import { currentWeather, weatherAPI } from "../apis/weatherApi";

import { weatherForecastData, currentWeatherForecast } from "../data/data";
import SingleSelect from "./Search";
import HourlyPageDialog from "./HourlyPageDialog";

import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import WindSpeed from "./WindSpeed";
import Humidity from "./Humidy";
import Forecast from './Forecast';

export default class Presentation extends React.Component {
  constructor(props) {
    super(props);

    const weekday = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    var today = new Date(),
      time = today.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' }),
      day = weekday[today.getDay()];

    this.state = {
      cityName: [],
      country: [],
      dateAndTime: [],
      time: [new Date().getTime()],
      // day: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][new Date().getDay()],
      timestamp: [],
      dailyDt: [],
      dailyTemp: [],
      dailyIcon: [],
      condition: [],
      isOpen: false,
      currentTime: time,
      currentDay: day
    }
  }

  componentDidMount() {
    currentWeather()
      .then(res => {
        const weather = res.data;
        console.log(weather)
        this.setState({ cityName: weather.name, countryName: weather.sys.country, timestamp: new Date(weather.dt * 1000).toLocaleDateString() });
      })

    weatherAPI()
    .then (res => {
      const weather = res.data;
      console.log("api", weather)

    })


    let dailyTemp = [];
    let dailyTimestamp = [];
    let dailyCondition = [];
    let dailyIcon = [];
    let dailyDt = [];
    let dayOfWeek = [];

    weatherAPI()
    .then (res => {
      const weather = res.data;
      // weatherforecast 
      // and comment out api
      weather.daily.map((item, index) => {
      if (index <= 4) {
        dailyTemp.push(Math.round(item.temp.day));
        dailyTimestamp.push(new Date(item.dt * 1000).toLocaleDateString());

        var timestamp = item.dt;
        var a = new Date(timestamp * 1000);
        var weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        dayOfWeek.push(weekdays[a.getDay()]);
      }

      item.weather.map((item, index) => {
        if (index <= 4) {
          dailyCondition.push(item.main);
          dailyIcon.push(item.icon);
        }
      })

    });

    dailyTemp = dailyTemp.filter(Boolean);
    dailyTimestamp = dailyTimestamp.filter(Boolean);
    dailyCondition = dailyCondition.filter(Boolean);
    dailyIcon = dailyIcon.filter(Boolean);



    this.setState({ dailyTemp, dailyTimestamp, dailyCondition, dailyIcon, dailyDt, dayOfWeek });

  })

    //Refresh the page every 5 minutes.
    setTimeout(function () {
      window.location.reload();
    }, 300000);
  }

  openBox = () => {
    console.log('open')
    this.setState({
      isOpen: true
    })
  }

  closeBox = () => {
    this.setState({
      isOpen: false
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
        <div className="bar ">
          <div className="search">
            <SingleSelect />
          </div>
        </div>

        <div className="weatherPage" id="gradient" style={{ color: "#ffffff" }}>
          <div className="subHeader">
            <h1 style={{ textAlign: 'center', marginTop: '20px' }}>{this.state.cityName}, {this.state.countryName}</h1>
          </div>

          <div>
            <div className="container">
              <div className="card" style={{ padding: '10px 30px 40px 30px' }}>
                <div className="card--body">
                  <span><CurrentWeatherIcon /></span>
                  <h6><CurrentTemperature /></h6>
                </div>
                <div style={{ margin: '0 auto' }}>
                  <span className="medium">Updated as of {this.state.currentTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ padding: '0 50px' }}>
            {
              this.state.dailyTemp.map((item, index) => {
                return (
                  <div className="column" key={index}>
                    <div className="card shadow" style={{ borderRadius: '35px', cursor: 'pointer' }} onClick={this.openBox}>
                      <div className="card-body p-5">

                        <div className="d-flex">
                          <h6 className="flex-grow-1">{this.state.dayOfWeek[index]}</h6>
                          <p>{this.state.dailyTimestamp[index]}</p>
                        </div>

                        <div className="d-flex flex-column text-center mt-5 mb-4">
                          <span>
                            <img src={`http://openweathermap.org/img/w/${this.state.dailyIcon[index]}.png`} alt="weather icon" style={{ width: '80px' }} />
                          </span>

                          <p className="display-6">{this.state.dailyTemp[index]} °C</p>
                          <span className="small">{this.state.dailyCondition[index]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>

        </div>
        <div>
          {this.state.isOpen && (
            <>
              <ReactDialogBox
                closeBox={this.closeBox}
                modalWidth='60%'
                closeButtonColor='black'
                bodyBackgroundColor='white'
                bodyTextColor='black'
                bodyHeight='200px'
                headerText={this.state.day}
              >
                <div>

                </div>
              </ReactDialogBox>
            </>
          )}
        </div>
      </div>


    );
  }
}

