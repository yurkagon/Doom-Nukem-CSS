import Player from "classes/Player";
import Item from "classes/Item";
import Sound from "sound";

import weaponPickup from "sound/data/weaponPickup";

import "./style.scss";

class ShotgunItem extends Item {
  protected readonly sound: Sound = weaponPickup;

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

    player.inventory.changeWeapon("shotgun");

    super.onPick();
  }
}

export default ShotgunItem;
