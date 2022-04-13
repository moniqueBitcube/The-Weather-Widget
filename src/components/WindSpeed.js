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

  componentDidMount() {
    // weatherAPI()
    // .then( res => {
    //   const weather = res.data;
    //   this.setState({ windSpeed: weather.list[0].wind.speed });
    // })

    console.log(weatherForecastData)

    let dailyWindSpeed = [];
    weatherForecastData.daily.map((item, index) => {
      return dailyWindSpeed.push(item.wind_speed);
    })

    dailyWindSpeed = dailyWindSpeed.filter(Boolean);
    this.setState({ dailyWindSpeed })
  }

  render() {
    return (
      <div>

        <i className="fa fa-location-arrow" aria-hidden="true"></i>

      </div>
    )
  }


}