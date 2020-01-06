import React, { Component } from "react";
import { observer } from "mobx-react";
import Loading from "./screens/Loading";

import State, { Screen } from "./State";

@observer
class UserInterface extends Component {
  public render() {
    console.log(State.screen, Screen);
    switch (State.screen) {
      case Screen.loading:
        return <Loading />;

      default:
        return null;
    }
  }
}

export default UserInterface;
