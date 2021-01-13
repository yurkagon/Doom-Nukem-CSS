import React, { Component, HTMLProps, createRef } from "react";
import { observer } from "mobx-react";
import cn from "classnames";

import Player from "classes/Player";

const player = Player.getInstance();

@observer
class BouncingWrapper extends Component<HTMLProps<HTMLDivElement>> {
  render() {
    const { className } = this.props;

    return (
      <div
        {...this.props}
        className={cn(
          "weapon-bouncer",
          player.isMoving && "bouncing",
          className
        )}
      />
    );
  }
}

export default BouncingWrapper;
