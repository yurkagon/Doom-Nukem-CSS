import React, { Component } from "react";
import { observer } from "mobx-react";

import { Loading, Game } from "./screens";

import State, { Screen } from "./State";

@observer
class UserInterface extends Component {
  public render() {
    if (State.loadingState.isLoading) {
      return <Loading />;
    }

    switch (State.screen) {
      case Screen.game:
        return <Game />;
      default:
        return null;
    }
  }
}

export default UserInterface;
