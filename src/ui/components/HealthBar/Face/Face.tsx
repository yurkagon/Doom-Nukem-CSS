import React, { Component } from "react";

import { IProps } from "./types";
import "./style.scss";

class Face extends Component<IProps> {
  public state = {
    iteration: 0
  };

  private iterationInterval = 500;

  private timerId: NodeJS.Timeout;

  public componentDidMount() {
    this.startIteration();
  }

  public componentWillUnmount() {
    clearInterval(this.timerId);
  }

  private startIteration() {
    this.timerId = setInterval(() => {
      const { iteration } = this.state;
      if (iteration < 4) {
        this.setState({ iteration: iteration + 1 });
      } else {
        this.setState({ iteration: 0 });
      }
    }, this.iterationInterval);
  }

  private getFaceState() {
    const { hp } = this.props;
    const { iteration } = this.state;

    if (hp === 0) return 25;

    const hpState = Math.ceil((100 - hp) / 20) || 1;

    const result = hpState + iteration * 5;
    console.log(result);
    return result;
  }

  public render() {
    const faceState = this.getFaceState();

    return <div className={`flynn flynn${faceState}`} />;
  }
}

export default Face;
