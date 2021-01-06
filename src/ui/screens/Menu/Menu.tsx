import React, { Component, Fragment } from "react";
import State, { Screen } from "State";

import sleep from "utils/sleep";

import BackgroundMusic from "classes/BackgroundMusic";

import ScreenWrapper from "ui/components/Screen";
import Text from "ui/components/Text";
import ButtonGroup from "ui/components/ButtonGroup";
import { ButtonData } from "ui/components/ButtonGroup/types";

import start_menu from "sounds/menu/start_menu";
import menu_music from "sounds/menu/menu_music";

import "./style.scss";

class Menu extends Component {
  private static isInitialized = false;

  public state = {
    clicked: Menu.isInitialized
  };

  private buttonsData: ButtonData[] = [
    {
      text: "New game",
      onClick: () => {
        State.setScreen(Screen.level_select);
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
      onClick: () => {
        State.setScreen(Screen.fake_quit);
      }
    }
  ];

  private startMenu = () => {
    const { clicked } = this.state;

    if (!clicked)
      this.setState({ clicked: true }, () => {
        this.onMenuInit();
        Menu.isInitialized = true;
      });
  };

  private async onMenuInit() {
    start_menu.play();

    await sleep(600);

    BackgroundMusic.play(menu_music);
  }

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

export default Menu;
