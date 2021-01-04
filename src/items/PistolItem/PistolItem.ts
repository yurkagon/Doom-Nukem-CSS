import { WeaponItem } from "classes/Item";
import { WeaponType } from "classes/Player/Inventory/Weapon";

import "./style.scss";

class PistolItem extends WeaponItem {
  protected name: WeaponType = "pistol";
  protected bulletCount: number = 10;

  constructor(position: Position) {
    super({
      type: "pistol",
      position: {
        ...position,
        y: 350
      }
    });
  }
}

export default PistolItem;
