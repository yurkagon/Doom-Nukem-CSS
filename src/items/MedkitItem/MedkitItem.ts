import Player from "classes/Player";
import Item from "classes/Item";

import { chance } from "helpers";
import sleep from "utils/sleep";

import { itemPickUp, medkitVoice } from "variables/sounds";

import "./style.scss";

class MedkitItem extends Item {
  private hpAmount: number = 70;

  constructor(position: Position) {
    super({
      type: "medkit",
      position: {
        ...position,
        y: 350
      }
    });
  }

  protected onPick() {
    const player = Player.getInstance();
    if (player.isHpFull()) return;

    player.addHP(this.hpAmount);

    itemPickUp.play();

    chance(0.4).to(async () => {
      await sleep(100);
      medkitVoice.play();
    });

    super.onPick();
  }
}

export default MedkitItem;
