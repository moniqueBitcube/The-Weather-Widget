import React from 'react';

export default class Geolocation extends React.Component {
  state = { 
    lat: null, 
    lon: null,
    errorMessage: ''
  };
  
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude, lon: position.coords.longitude }),
      err => this.setState({ errorMessage: err.message })
    );
  }

  render () {
    if(!this.state.errorMessage && this.state.lat) {
      localStorage.setItem("Latitude", this.state.lat);
      localStorage.setItem("Longitude", this.state.lon);
      return console.log(this.state.lat, this.state.lon);
    }
  }
}