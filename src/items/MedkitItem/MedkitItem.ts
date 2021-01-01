import Item from "classes/Item";

import { itemPickUp, medkitVoice } from "variables/sounds";

import "./style.scss";

class MedkitItem extends Item {
  constructor(position: Position) {
    super({
      type: "medkit",
      position: {
        ...position,
        y: 350
      }
    });
  }

  public onPick() {
    console.log("Pick medkit");
    itemPickUp.play();
    setTimeout(() => medkitVoice.play(), 100);

    super.onPick();
  }
}

export default MedkitItem;
