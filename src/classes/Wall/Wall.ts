import Model from "../../classes/Model";
import { ITransform } from "../../classes/Model/types";

import data from "./data";

import "./style.scss";
import { IPosition } from "../../types";

class Wall extends Model {
  protected readonly VISIBILITY_DISTANCE = 40000;

  VISION_CHECKING = false;

  protected positionCorrector: IPosition = {
    x: 127,
    z: 600,
    y: 200
  };

  constructor(transform?: ITransform) {
    super({
      name: "wall",
      data,
      scale: {
        x: 10.02,
        y: 2.5,
        z: 8
      },
      ...(transform || {})
    });
  }
}

export default Wall;
