import React from "react";
import CurrentWeatherIcon from "./CurrentWeatherIcon";
import CurrentTemperature from "./CurrentTemperature";
import "../style/weatherPage.css"
import "../style/search.css"
import "../style/dialog.css"

import { currentWeather, weatherAPI } from "../apis/weatherApi";

import { weatherForecastData, currentWeatherForecast } from "../data/data";
import SingleSelect from "./Search";
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import Presentation from "./Presentation";

import Geolocation from "./Geolocation";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel, Thumbs } from 'react-responsive-carousel';

const weekday = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default class WeatherPage extends React.Component {
  constructor(props) {
    super(props);

    const today = new Date(),
      time = today.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });

    this.state = {
      cityName: '',
      country: '',
      dailyTemp: [],
      dailyIcon: [],
      isOpen: false,
      currentTime: time,
      predictions: [],
      feelsLike: '',
      wind: '',
      visibility: '',
      barometer: '',
      humidity: ''
    }
  }


  componentDidMount() {
    currentWeather()
      .then(res => {
        const weather = res.data;

        this.setState({
          cityName: weather.name, countryName: weather.sys.country, feelsLike: weather.main.feels_like,
          wind: weather.wind.speed, visibility: weather.visibility, barometer: weather.main.pressure, humidity: weather.main.humidity
        });

      })


    weatherAPI()
      .then(res => {
        const weather = res.data;
        const predictions = weather.daily.slice(0, 5);
        this.setState({ predictions });
        console.log("feelsLike", predictions)
      })

    //Refresh the page every 5 minutes.
    setTimeout(function () {
      window.location.reload();
    }, 300000);
  }

  openBox = (dt) => {
    console.log('open')
    this.setState({
      isOpen: true,
      selectedDay: dt,
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
                  <span className="medium" style={{ fontWeight: '600' }}>Updated as of {this.state.currentTime}</span>
                </div>
                <div style={{ margin: '0 auto', textAlign: 'center' }} className="subheading">
                  <div className="small subheading" style={{ paddingTop: '10px' }}>
                    <span style={{ marginRight: '10px' }}>Feels like {Math.floor(this.state.feelsLike)} °C </span>
                    <span style={{ marginRight: '10px' }}>Wind <i className="fa fa-location-arrow" aria-hidden="true"></i> {this.state.wind} km/h </span>
                    <span style={{ marginRight: '10px' }}>Barometer {this.state.barometer} mb </span>
                    <span>Humidity {this.state.humidity} % </span>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>

          </div>

          <div className="row" style={{ padding: '0 50px' }}>
            {
              this.state.predictions.map((item, index) => {
                const today = new Date(item.dt * 1000);
                return (
                  <div className="column" key={index} style={{borderCollapse: 'collapse'}}>
                    <div className="card shadow hoverEffect" style={{ borderRadius: '35px', cursor: 'pointer' }} onClick={e => this.openBox(item.dt)}>
                      <div className="card-body p-4">

                        <div className="d-flex">
                          <h6 className="flex-grow-1">{weekday[today.getDay()]}</h6>
                          <p>{today.toLocaleDateString()}</p>
                        </div>

                        <div className="d-flex flex-column text-center mt-4 mb-4">
                          <span>
                            <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="weather icon" style={{ width: '80px' }} />
                          </span>

                          <p className="display-6">{Math.floor(item.temp.day)} °C</p>
                          <span className="small" style={{ textTransform: 'capitalize' }}>{item.weather[0].description}</span>
                          {/* <span style={{ paddingTop: '10px', textDecoration: 'underline', fontSize: '8pt' }}>View Hourly Forecast</span> */}
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
          {
            this.state.isOpen && (
              <>
                <ReactDialogBox
                  closeBox={this.closeBox}
                  modalWidth='80%'

                  bodyHeight='650px'
                  headerText='Hourly Forecast'

                  headerBackgroundColor="#7F9BA6"
                  headerTextColor="#FFF"
                  bodyBackgroundColor='#7F9BA6'
                  closeButtonColor='#FFF'
                  bodyTextColor='#FFF'
                >
                  <div className="scroll">
                    <Presentation dt={this.state.selectedDay} />
                  </div>
                </ReactDialogBox>
              </>
            )
          }
        </div>
      </div>


    );
  }
}

