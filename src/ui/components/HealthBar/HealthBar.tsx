import React, { Component } from "react";
import { observer } from "mobx-react";

import Player from "classes/Player";
import Text from "ui/components/Text";

import Face from "./Face";

import "./style.scss";

@observer
class HealthBar extends Component {
  render() {
    const player = Player.getInstance();

    const hp = Math.round(player.hp);

    return (
      <div className="health-bar">
        <Face hp={hp} />

        <Text className="health-value">{hp}</Text>
      </div>
    );
  }
}

export default HealthBar;
