import React, { Component } from "react";
import { observer } from "mobx-react";

import Player from "../../../classes/Player";

import Face from "./Face";

import "./style.scss";

@observer
class HealthBar extends Component {
  render() {
    const player = Player.getInstance();

    const hp = player.hp;

    return (
      <div className="health-bar">
        <Face hp={hp} />
        <span className="zorque-font">{hp}</span>
      </div>
    );
  }
}

export default HealthBar;
