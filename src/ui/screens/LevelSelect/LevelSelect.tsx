import React, { Component } from "react";

import sleep from "utils/sleep";

import Level from "classes/Level";
import BackgroundMusic from "classes/BackgroundMusic";

import ScreenWrapper from "ui/components/Screen";
import Text from "ui/components/Text";
import ButtonGroup from "ui/components/ButtonGroup";
import { ButtonData } from "ui/components/ButtonGroup/types";

import "./style.scss";

class LevelSelect extends Component {
  private buttonsData: ButtonData[] = [
    {
      text: "level_1",
      onClick: () => {
        BackgroundMusic.stop();

        Level.load("level_1");
      }
    }
  ];

  public render() {
    return (
      <ScreenWrapper className="menu">
        <div className="navigation">
          {<ButtonGroup data={this.buttonsData} />}
        </div>
      </ScreenWrapper>
    );
  }
}

export default LevelSelect;
