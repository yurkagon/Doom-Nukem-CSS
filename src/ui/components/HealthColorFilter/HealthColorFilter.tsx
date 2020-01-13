import React, { Component } from "react";
import { observer } from "mobx-react";

import Player from "../../../classes/Player";

import "./style.scss";

@observer
class HealthColorFilter extends Component {
  render() {
    const player = Player.getInstance();

    if (player.hp > 15) return null;

    let opacity = 0;

    if (player.hp <= 15) opacity = 0.2;
    if (player.hp < 10) opacity = 0.25;
    if (player.hp < 5) opacity = 0.3;
    if (player.hp === 0) opacity = 0.5;

    return (
      <div className="ui-wrapper health-color-filter" style={{ opacity }} />
    );
  }
}

export default HealthColorFilter;
