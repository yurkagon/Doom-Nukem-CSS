import React, { Component, createRef } from "react";
import State from "State";

import Screen from "ui/components/Screen";

import HUD from "./HUD";
import Weapon from "./Weapon";

import "./style.scss";

class Game extends Component {
  private ref = createRef<HTMLDivElement>();

  private onClick = () => {
    State.lockCursor();
  };

  public render() {
    return (
      <Screen className="game-ui-wrapper" ref={this.ref} onClick={this.onClick}>
        <Weapon />

        <div className="overlay-filter" />

        <HUD />
      </Screen>
    );
  }
}

export default Game;
