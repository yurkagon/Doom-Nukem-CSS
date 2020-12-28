import React, { Component } from "react";

import Screen from "ui/components/Screen";

import HUD from "./HUD";
import Weapon from "./Weapon";

import "./style.scss";

class Game extends Component {
  public render() {
    return (
      <Screen>
        <Weapon />

        <div className="overlay-filter" />

        <HUD />
      </Screen>
    );
  }
}

export default Game;
