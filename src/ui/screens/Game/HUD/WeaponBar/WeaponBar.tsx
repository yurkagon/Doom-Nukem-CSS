import React, { Component } from "react";
import { observer } from "mobx-react";
import cn from "classnames";

import Player from "classes/Player";
import Text from "ui/components/Text";

import "./style.scss";

@observer
class WeaponBar extends Component {
  render() {
    const player = Player.getInstance();
    const { weapon } = player.inventory;

    console.log("WeaponBar");
    return (
      <div className="weapon-bar">
        <div className={cn("weapon", weapon.name)} />

        {weapon.bulletCount > 0 && (
          <Text className="bullet-value">{weapon.bulletCount}</Text>
        )}
      </div>
    );
  }
}

export default WeaponBar;
