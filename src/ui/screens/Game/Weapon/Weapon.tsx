import React, { Component, createRef } from "react";
import { observer } from "mobx-react";
import $ from "jquery";
import cn from "classnames";

import Player from "classes/Player";

import "./style.scss";

const player = Player.getInstance();

@observer
class Weapon extends Component {
  private static weaponElementRef = createRef<HTMLDivElement>();

  public static weaponBouncingUpdater() {
    // return;
    if (!this.weaponElementRef.current) return;
    const weapon = $(this.weaponElementRef.current);

    if (player.isMoving()) {
      weapon
        .animate(
          {
            right: 30,
            bottom: -30
          },
          500
        )
        .animate(
          {
            right: 0,
            bottom: 0
          },
          200
        );
    } else {
      weapon.stop();
    }
  }

  render() {
    const { weapon } = player.inventory;

    return (
      <div className="weapon-container" ref={Weapon.weaponElementRef}>
        <div
          className={cn("weapon", weapon.name, weapon.isShooting && "shooting")}
        />
      </div>
    );
  }
}

export default Weapon;
