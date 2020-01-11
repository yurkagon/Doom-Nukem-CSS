import React, { Component } from "react";
import { observer } from "mobx-react";
import classnames from "classnames";

import State from "../../State";

import Screen from "../../components/Screen";

import "./style.scss";

@observer
class Loading extends Component {
  render() {
    const { percent, currentLoadedItem, buttonFunction } = State.loadingState;
    const active = percent >= 100;

    return (
      <Screen className="loading-screen">
        <span className="loading-title">Loading...</span>
        <div className="line-container">
          <div className="line" style={{ width: `${percent}%` }} />
          <div className="percent">${percent}%</div>
        </div>
        <div className="text">{currentLoadedItem}</div>
        <button
          onClick={buttonFunction}
          disabled={!active}
          className={classnames("start-button", { active })}
        >
          Let's rock!
        </button>
      </Screen>
    );
  }
}

export default Loading;
