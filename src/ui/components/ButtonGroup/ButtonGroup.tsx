import React, { Component } from "react";

import menu_click from "sounds/menu/menu_click";

import Text from "../Text";

import { Props } from "./types";

import "./style.scss";

class ButtonGroup extends Component<Props> {
  render() {
    const { data } = this.props;

    return (
      <div className="button-group">
        {data.map(buttonData => (
          <Text
            key={buttonData.text}
            onClick={() => {
              menu_click.play();
              buttonData.onClick();
            }}
          >
            {buttonData.text}
          </Text>
        ))}
      </div>
    );
  }
}

export default ButtonGroup;
