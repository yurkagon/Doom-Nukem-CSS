import React, { Component } from "react";

import HealthBar from "./HealthBar";
import HealthColorFilter from "./HealthColorFilter";
import WeaponBar from "./WeaponBar";

class HUD extends Component {
  render() {
    return (
      <div className="ui-wrapper">
        <WeaponBar />
        <HealthBar />
        <HealthColorFilter />
      </div>
    );
  }
}

export default HUD;
