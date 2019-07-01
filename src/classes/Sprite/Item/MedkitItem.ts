import Item from "./Item";
import { itemPickUp, medkitVoice } from '../../../variables/sounds';
import { iPosition } from "../../../types";

class MedkitItem extends Item {
	constructor(position: iPosition) {
    super({
      type: 'medkit',
      position: {
        ...position,
        y: 350
      },
    });
  }

  pickItem() {
    itemPickUp.play();
    setTimeout(() => medkitVoice.play(), 100);

    super.pickItem();
  }
}

export default MedkitItem;
