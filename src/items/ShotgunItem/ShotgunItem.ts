import Player from "classes/Player";
import Item from "classes/Item";

import { takeWeapon } from "variables/sounds";

import "./style.scss";

class ShotgunItem extends Item {
  constructor(position: Position) {
    super({
      type: "shotgun",
      position: {
        ...position,
        y: 350
      }
    });
  }

  public onPick() {
    const player = Player.getInstance();

    player.inventory.setWeapon("shotgun");

    takeWeapon.play();

    super.onPick();
  }
}

export default ShotgunItem;
