import React, { Component, Fragment } from "react";

import Level from "classes/Level";

import State, { Screen } from "ui/State";

import ScreenWrapper from "ui/components/Screen";
import Text from "ui/components/Text";
import ButtonGroup from "ui/components/ButtonGroup";
import { ButtonData } from "ui/components/ButtonGroup/types";

import { start_menu } from "sound";

import "./style.scss";

class Game extends Component {
  public state = {
    clicked: false
  };

  private buttonsData: ButtonData[] = [
    {
      text: "New game",
      onClick: () => {
        Level.load("level_1");

        State.setScreen(Screen.game);
      }
    },
    {
      text: "Options",
      onClick: () => {}
    },
    {
      text: "About",
      onClick: () => {}
    },
    {
      text: "Quit",
      onClick: () => {}
    }
  ];

  private startMenu = () => {
    const { clicked } = this.state;

    if (!clicked)
      this.setState({ clicked: true }, () => {
        start_menu.play();
      });
  };

  public render() {
    const { clicked } = this.state;

    return (
      <ScreenWrapper className="menu" onClick={this.startMenu}>
        <div className="navigation">
          {clicked && <ButtonGroup data={this.buttonsData} />}
          {!clicked && (
            <Fragment>
              <div>
                <Text>Hmm...</Text>
                <Text>Seems like you</Text>
                <Text>have to click</Text>
                <Text>On the screen</Text>
              </div>
            </Fragment>
          )}
        </div>
      </ScreenWrapper>
    );
  }
}

export default Game;
