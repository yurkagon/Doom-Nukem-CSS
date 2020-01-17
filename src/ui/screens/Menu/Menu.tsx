import React, { Component, Fragment } from "react";
import Screen from "../../components/Screen";

import "./style.scss";

class Game extends Component {
  public state = {
    clicked: false
  };

  private startMenu = () => {
    this.setState({ clicked: true }, () => {
      new Audio("sounds/menu/start_menu.flac").play();
    });
  };

  public render() {
    return (
      <Screen className="menu" onClick={this.startMenu}>
        <Fragment>
          <h1>menu</h1> <h1>menu</h1> <h1>menu</h1> <h1>menu</h1> <h1>menu</h1>
          <h1>menu</h1> <h1>menu</h1>
        </Fragment>
      </Screen>
    );
  }
}

export default Game;
