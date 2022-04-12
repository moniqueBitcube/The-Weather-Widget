import React from "react";
import axios from "axios";
import { weatherAPI } from "../apis/weatherApi";
import { weatherForecastData } from "../data/data";
export default class Humidity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      humidity: this.props.humidity,
    }
  }

  componentDidMount() {
    // weatherAPI()
    // .then( res => {
    //   const weather = res.data;
    //   this.setState({ humidity: weather.list[0].main.humidity });
    // })

    let dailyHumidity = [];
    weatherForecastData.daily.map((item, index) => {
      if (index <= 5) {
        return dailyHumidity.push(item.humidity);
      }

    })

    dailyHumidity = dailyHumidity.filter(Boolean);
    this.setState({ dailyHumidity })
  }

  render() {
    return (
      <div>
        {
          this.state.dailyHumidity.map((item, index) => {
            return (
              <div key={index}>
                <p className="" >{this.state.dailyHumidity} %</p>
              </div>
            )
          })
        }
      </div>
    )
  }


}