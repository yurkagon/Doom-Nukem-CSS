import Player from "classes/Player";
import { Distance } from "helpers";
import Sound from "sound";

import itemPickup from "sound/data/items/itemPickup";

import Sprite from "../Sprite";

import { Props } from "./types";

import "./style.scss";

class Item extends Sprite {
  private static readonly DISTANCE_TO_PICK = 150;

  protected readonly sound: Sound = itemPickup;

  constructor(config: Props) {
    super({
      type: config.type,
      position: {
        ...config.position,
        y: 350
      },
      classType: "item"
    });
  }

  public update() {
    super.update();

    if (this.isActive) {
      const player = Player.getInstance();

      const distance = Distance(player.getPosition(), this.getPosition());

      if (distance < Item.DISTANCE_TO_PICK) this.onPick();
    }
  }

  protected onPick() {
    this.destroy();
    this.sound.play();
  }
}

export default Item;
