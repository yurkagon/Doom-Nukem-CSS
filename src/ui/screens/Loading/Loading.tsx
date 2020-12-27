import React, { Component } from "react";
import { observer } from "mobx-react";

import State from "State";

import Screen from "ui/components/Screen";

import "./style.scss";

@observer
class Loading extends Component {
  render() {
    const { loadedItems } = State.loader;

    return (
      <Screen className="loading-screen">
        <div className="wrapper">
          {loadedItems.map((el, index) => (
            <div key={index}>{el}</div>
          ))}
        </div>
      </Screen>
    );
  }
}

export default Loading;
