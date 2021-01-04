import React, { Component, createRef } from "react";
import { observer } from "mobx-react";
import $ from "jquery";
import cn from "classnames";

import Player from "classes/Player";

import "./style.scss";

const player = Player.getInstance();

@observer
class Weapon extends Component {
  private static weaponBouncingContainerRef = createRef<HTMLDivElement>();

  public static weaponBouncingUpdater() {
    if (!this.weaponBouncingContainerRef.current) return;
    const weapon = $(this.weaponBouncingContainerRef.current);

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
    const { weapon, isChangingWeapon, weaponChangingTime } = player.inventory;

    return (
      <div className="weapon-container" ref={Weapon.weaponBouncingContainerRef}>
        <div
          className={cn("changing-weapon", isChangingWeapon && "active")}
          style={{ animationDuration: `${weaponChangingTime}ms` }}
        >
          <div
            className={cn(
              "weapon",
              weapon.name,
              weapon.isShooting && "shooting"
            )}
            style={{ animationDuration: `${weapon.timePerShot}ms` }}
          />
        </div>
      </div>
    );
  }
}

export default Weapon;
