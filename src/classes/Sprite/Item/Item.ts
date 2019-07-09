import Sprite from "../index";
import Player from "../../Player/Player";
import { Distance } from "../../../helpers";

class Item extends Sprite {
  private static readonly DISTANCE_TO_PICK = 150;

  constructor(config) {
    const { type, position } = config;
    super({
      type,
      position: {
        ...position,
        y: 350
      },
      classType: "item"
    });
  }

  update() {
    super.update();
    const player = Player.getInstance();

    const distance = Distance(player.getPosition(), this.getPosition());

    if (distance < Item.DISTANCE_TO_PICK) this.pickItem();
  }

  pickItem() {
    this.destroy();
  }
}

export default Item;
