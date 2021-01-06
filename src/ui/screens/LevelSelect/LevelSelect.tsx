import React, { Component } from "react";

import Level, { LevelName } from "classes/Level";

import ScreenWrapper from "ui/components/Screen";
import ButtonGroup from "ui/components/ButtonGroup";
import BackButton from "ui/components/BackButton";

import "./style.scss";

class LevelSelect extends Component {
  private levelNames: LevelName[] = ["level_1"];

  public render() {
    return (
      <ScreenWrapper className="menu">
        <div className="navigation">
          {
            <ButtonGroup
              data={this.levelNames.map(levelName => ({
                text: levelName,
                onClick: () => {
                  Level.load(levelName);
                }
              }))}
            />
          }

          <BackButton />
        </div>
      </ScreenWrapper>
    );
  }
}

export default LevelSelect;
