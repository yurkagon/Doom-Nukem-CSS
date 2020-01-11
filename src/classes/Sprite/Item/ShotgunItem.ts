import Item from "./Item";
import { IPosition } from "../../../types";
import { takeWeapon } from "../../../variables/sounds";

class ShotgunItem extends Item {
  constructor(position: IPosition) {
    super({
      type: "shotgun",
      position: {
        ...position,
        y: 350
      }
    });
  }

  pickItem() {
    console.log("Pick shotgun");
    takeWeapon.play();

    super.pickItem();
  }
}

export default ShotgunItem;
