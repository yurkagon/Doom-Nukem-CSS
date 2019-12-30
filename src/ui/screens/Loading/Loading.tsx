import React, { Component } from "react";

import Screen from "../../components/Screen";

import "./style.scss";

class Loading extends Component {
  render() {
    const percent = 30;
    return (
      <Screen className="loading-screen">
        <span className="loading-title">Loading...</span>
        <div className="line-container">
          <div className="line" style={{ width: `percent${percent}` }} />
          <div className="percent">${percent}%</div>
        </div>
        <div className="text">file.png</div>
      </Screen>
    );
  }
}

export default Loading;
