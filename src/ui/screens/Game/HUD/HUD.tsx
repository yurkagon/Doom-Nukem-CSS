import React, { Component } from "react";

import HealthBar from "./HealthBar";
import HealthColorFilter from "./HealthColorFilter";

class HUD extends Component {
  render() {
    return (
      <div className="ui-wrapper">
        <HealthBar />
        <HealthColorFilter />
      </div>
    );
  }
}

export default HUD;
