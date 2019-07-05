import Sprite from "../index";
import Player from "../../Player/Player";
import { Distance } from "../../../helpers";

class Item extends Sprite {
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

    if (distance < 150) this.pickItem();
  }

  pickItem() {
    this.self.remove();
    this.selfContainer.remove();
    this.isRemoved = true;
  }
}

export default Item;
