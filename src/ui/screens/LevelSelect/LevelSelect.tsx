import React, { Component } from "react";

import Level, { LevelName } from "classes/Level";

import ScreenWrapper from "ui/components/Screen";
import Header from "ui/components/Header";
import ButtonGroup from "ui/components/ButtonGroup";
import BackButton from "ui/components/BackButton";

import "./style.scss";

class LevelSelect extends Component {
  private levelNames: { name: LevelName; text: string }[] = [
    {
      name: "level_1",
      text: "Wolfenstein castle"
    },
    {
      name: "level_2",
      text: "Long night"
    }
  ];

  public render() {
    return (
      <ScreenWrapper className="menu level-select">
        <div className="navigation">
          <Header>Select level</Header>

          {
            <ButtonGroup
              data={this.levelNames.map(data => ({
                text: data.text,
                onClick: () => {
                  Level.load(data.name);
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
