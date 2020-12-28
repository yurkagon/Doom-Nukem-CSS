import { takeWeapon } from "variables/sounds";

import Item from "./Item";

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

  pickItem() {
    console.log("Pick shotgun");
    takeWeapon.play();

    super.pickItem();
  }
}

export default ShotgunItem;
