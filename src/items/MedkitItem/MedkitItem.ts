import Player from "classes/Player";
import Item from "classes/Item";
import Sound from "classes/Sound";

import { chance } from "helpers";
import sleep from "utils/sleep";

import medkitVoice from "sounds/voice/medkitVoice";

import "./style.scss";

class MedkitItem extends Item {
  private hpAmount: number = 70;

  private voiceEffect: Sound = medkitVoice;

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

    chance(0.4).to(async () => {
      await sleep(200);

      this.voiceEffect.play();
    });

    super.onPick();
  }
}

export default MedkitItem;
