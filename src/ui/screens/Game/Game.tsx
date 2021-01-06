import React, { Component } from "react";
import State from "State";

import Screen from "ui/components/Screen";

import HUD from "./HUD";
import Weapon from "./Weapon";

import "./style.scss";

class Game extends Component {
  private onClick = () => {
    State.lockCursor();
  };

  public render() {
    return (
      <Screen className="game-ui-wrapper" onClick={this.onClick}>
        <Weapon />

        <div className="overlay-filter" />

        <HUD />
      </Screen>
    );
  }
}

export default Game;
