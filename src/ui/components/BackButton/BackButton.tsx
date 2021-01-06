import React, { FC, useCallback } from "react";
import State, { Screen } from "State";

import menu_back from "sounds/menu/menu_back";

import Text from "../Text";

import { Props } from "./types";

import "./style.scss";

const BackButton: FC<Props> = ({ backScreen }) => {
  const onClick = useCallback(() => {
    State.setScreen(backScreen);
    menu_back.play();
  }, [backScreen]);

  return (
    <Text className="back-button" onClick={onClick}>
      Back
    </Text>
  );
};

BackButton.defaultProps = {
  backScreen: Screen.menu
};

export default BackButton;
