import React from "react";

export default class Rain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rain: this.props.rain
    }
  }

  render() {
    return (
      <div>
        <span className="iconify daily" data-icon="carbon:rain-heavy"></span> <span>{this.state.rain} %</span>
      </div>
    )
  }
}