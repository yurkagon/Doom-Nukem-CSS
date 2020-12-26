import React, { Component } from "react";

import { menu_click } from "sound";

import Text from "../Text";

import { Props } from "./types";

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
