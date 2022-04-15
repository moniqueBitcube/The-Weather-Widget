import React from "react";

export default class Humidity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      humidity: this.props.humidity,
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <p style={{ fontSize: '14pt' }}>Humidity</p>
            <span className="iconify daily" data-icon="wi:humidity"></span> <span>{this.state.humidity} %</span>
          </div>
        </div>
      </div>
    )
  }
}