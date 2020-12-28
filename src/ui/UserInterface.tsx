import React, { Component } from "react";
import { observer } from "mobx-react";

import State, { Screen } from "State";

import { Loading, Game, Menu, LevelSelect } from "./screens";

@observer
class UserInterface extends Component {
  public render() {
    if (State.loader.isLoading) {
      return <Loading />;
    }
    console.log(State.screen, Screen.level_select);
    switch (State.screen) {
      case Screen.game:
        return <Game />;
      case Screen.menu:
        return <Menu />;
      case Screen.level_select:
        return <LevelSelect />;
      default:
        return null;
    }
  }
}

export default UserInterface;
