import Model from "../../classes/Model";

import data from "./data";

import "./style.scss";
import { IPosition } from "../../types";
import { ICell } from "../Level/CollisionDetector/types";

class Wall extends Model {
  protected readonly VISIBILITY_DISTANCE = 4000;

  VISION_CHECKING = false;

  protected positionCorrector: IPosition = {
    x: 129,
    z: 600.05,
    y: 190
  };

  private sides: { front: ICell; right: ICell; left: ICell; back: ICell };

  constructor(
    position: IPosition,
    sides: { front: ICell; right: ICell; left: ICell; back: ICell }
  ) {
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
      if (space === " ") return;
      this.self.find(`.face.${key}`).remove();
    });
  }
}

export default Wall;
