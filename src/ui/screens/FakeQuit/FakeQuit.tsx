import React, { FC } from "react";

import ScreenWrapper from "ui/components/Screen";
import Text from "ui/components/Text";

import BackButton from "ui/components/BackButton";

import "./style.scss";

const FakeQuit: FC<{}> = () => (
  <ScreenWrapper className="menu fake-quit">
    <div className="navigation">
      <div>
        <Text className="mb-3">Are you kidding!</Text>
        <Text>You can just close</Text>
        <Text>the browser tab</Text>
      </div>

      <BackButton />
    </div>
  </ScreenWrapper>
);

export default FakeQuit;
