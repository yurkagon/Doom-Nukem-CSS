import Sprite from "../index";
import Player from "../../Player/Player";
import { Distance } from "../../../helpers";

class Item extends Sprite {
  VISIBILITY_DISTANCE = 6000;
  private static readonly DISTANCE_TO_PICK = 150;

  constructor(config) {
    super({
      type: config.type,
      position: {
        ...config.position,
        y: 350
      },
      classType: "item"
    });
  }

  update() {
    super.update();

    if (this.isActive) {
      const player = Player.getInstance();

      const distance = Distance(player.getPosition(), this.getPosition());

      if (distance < Item.DISTANCE_TO_PICK) this.pickItem();
    }
  }

  pickItem() {
    this.destroy();
  }
}

export default Item;
