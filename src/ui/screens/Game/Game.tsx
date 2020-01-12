import React, { Component } from "react";
import HUD from "../../components/HUD";

import "./style.scss";

class Game extends Component {
  public render() {
    return (
      <div className="overlay-filter">
        <HUD />
      </div>
    );
  }
}

export default Game;
