import React, { Component } from "react";
import { observer } from "mobx-react";
import Loading from "./screens/Loading";

import State, { Screen } from "./State";

@observer
class UserInterface extends Component {
  public render() {
    if (State.loadingState.isLoading) {
      return <Loading />;
    }

    switch (State.screen) {
      default:
        return null;
    }
  }
}

export default UserInterface;
