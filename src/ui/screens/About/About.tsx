import React, { FC } from "react";

import ScreenWrapper from "ui/components/Screen";
import Header from "ui/components/Header";
import Text from "ui/components/Text";

import BackButton from "ui/components/BackButton";

import "./style.scss";

const About: FC<{}> = () => (
  <ScreenWrapper className="menu about">
    <Header>About</Header>

    <div className="text-wrapper">
      <Text className="mb-1">The game created by developer, who</Text>
      <Text className="mb-4">loves oldschool 3d shooters</Text>

      <Text className="mb-1">It uses only CSS transforms for</Text>
      <Text className="mb-1">rendering, no canvas, no raycasting</Text>
      <Text className="mb-4">were used</Text>

      <Text className="mb-10">Have fun!!!</Text>

      <Text className="mb-4">Yuragon</Text>
    </div>

    <BackButton />
  </ScreenWrapper>
);

export default About;
