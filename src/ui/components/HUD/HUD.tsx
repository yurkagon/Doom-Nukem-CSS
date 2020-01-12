import React, { Component } from "react";
import HealthBar from "../HealthBar";

class HUD extends Component {
  render() {
    return (
      <div className="ui-wrapper">
        <HealthBar />
      </div>
    );
  }
}

export default HUD;
