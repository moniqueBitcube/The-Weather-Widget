import React from "react";
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import WindSpeed from "./WindSpeed";
import Humidity from "./Humidy";
import Forecast from './Forecast';

export default class HourlyPageDialog extends React.Component {
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
  }

  openBox = () => {
    this.setState({
      isOpen: true
    })
  }

  closeBox = () => {
    this.setState({
      isOpen: false
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.openBox}>Open ReactDialogBox </button>

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
                <WindSpeed />
                <Humidity />
                <Forecast />
              </div>
            </ReactDialogBox>
          </>
        )}
      </div>
    )
  }
}

