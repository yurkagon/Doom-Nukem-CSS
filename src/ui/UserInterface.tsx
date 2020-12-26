import React, { Component } from "react";
import { observer } from "mobx-react";

import { Loading, Game, Menu } from "./screens";

import State, { Screen } from "./State";

@observer
class UserInterface extends Component {
  public render() {
    if (State.loader.isLoading) {
      return <Loading />;
    }

    switch (State.screen) {
      case Screen.game:
        return <Game />;
      case Screen.menu:
        return <Menu />;
      default:
        return null;
    }
  }
}

export default UserInterface;
