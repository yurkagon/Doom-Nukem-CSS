import React, { Component } from "react";
import { observer } from "mobx-react";

import State, { Screen } from "State";

import { Loading, Game, Menu, LevelSelect, FakeQuit, About } from "./screens";

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
      case Screen.level_select:
        return <LevelSelect />;
      case Screen.about:
        return <About />;
      case Screen.fake_quit:
        return <FakeQuit />;
      default:
        return null;
    }
  }
}

export default UserInterface;
