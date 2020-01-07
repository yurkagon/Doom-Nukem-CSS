import React, { Component } from "react";
import { observer } from "mobx-react";

import State from "../../State";

import Screen from "../../components/Screen";

import "./style.scss";

@observer
class Loading extends Component {
  render() {
    const { percent, currentLoadedItem, buttonFunction } = State.loadingState;

    return (
      <Screen className="loading-screen">
        <span className="loading-title">Loading...</span>
        <div className="line-container">
          <div className="line" style={{ width: `${percent}%` }} />
          <div className="percent">${percent}%</div>
        </div>
        <div className="text">{currentLoadedItem}</div>
        <button onClick={buttonFunction} className="start-button">
          Let's rock!
        </button>
      </Screen>
    );
  }
}

export default Loading;
