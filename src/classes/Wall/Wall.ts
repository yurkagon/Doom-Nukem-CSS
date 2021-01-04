import { CellInfo } from "classes/MapHandler";
import Model from "classes/Model";

import data from "./data";

import "./style.scss";

class Wall extends Model {
  protected readonly VISIBILITY_DISTANCE = 8000;

  VISION_CHECKING = false;

  protected positionCorrector: Position = {
    x: 129,
    z: 500,
    y: 190
  };

  private sides: CellInfo;

  constructor(position: Position, sides: CellInfo) {
    super({
      name: "wall",
      data,
      scale: {
        x: 10,
        y: 3,
        z: 10
      },
      position: {
        ...position,
        y: 0
      }
    });

    this.sides = sides;
  }

  start() {
    super.start();

    Object.keys(this.sides).forEach(key => {
      const space = this.sides[key];

      if (space && space === " ") return;
      this.self.find(`.face.${key}`).remove();
    });
  }
}

export default Wall;
