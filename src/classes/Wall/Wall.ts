import Model from "../../classes/Model";
import { ITransform } from "../../classes/Model/types";

import data from "./data";

import "./style.scss";
import { IPosition } from "../../types";

class Wall extends Model {
  protected readonly VISIBILITY_DISTANCE = 5000;

  VISION_CHECKING = false;

  protected positionCorrector: IPosition = {
    x: 127,
    z: 600.05,
    y: 190
  };

  constructor(transform?: ITransform) {
    super({
      name: "wall",
      data,
      scale: {
        x: 10,
        y: 3,
        z: 10
      },
      ...(transform || {})
    });
  }
}

export default Wall;
