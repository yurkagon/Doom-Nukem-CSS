import React, { Component, createRef } from "react";
import { observer } from "mobx-react";
import $ from "jquery";
import cn from "classnames";

import State from "State";

import Player from "classes/Player";

import BouncingWrapper from "./BouncingWrapper";

import "./style.scss";

const player = Player.getInstance();

@observer
class Weapon extends Component {
  render() {
    const { weapon, isChangingWeapon, weaponChangingTime } = player.inventory;

    return (
      <BouncingWrapper>
        <div
          className={cn("weapon-container", State.nightmode && "nightmode", {
            "shot-light": State.nightmode && weapon.isShooting
          })}
        >
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
      </BouncingWrapper>
    );
  }
}

export default Weapon;
