import { itemPickUp, medkitVoice } from "variables/sounds";

import Item from "./Item";

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

  pickItem() {
    console.log("Pick medkit");
    itemPickUp.play();
    setTimeout(() => medkitVoice.play(), 100);

    super.pickItem();
  }
}

export default MedkitItem;
