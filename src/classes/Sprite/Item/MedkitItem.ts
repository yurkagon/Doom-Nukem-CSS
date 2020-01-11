import Item from "./Item";
import { itemPickUp, medkitVoice } from "../../../variables/sounds";
import { IPosition } from "../../../types";

class MedkitItem extends Item {
  constructor(position: IPosition) {
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
