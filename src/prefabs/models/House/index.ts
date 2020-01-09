import Model from "../../../classes/Model";
import { ITransform } from "../../../classes/Model/types";

import data from "./data";

import "./style.scss";

class House extends Model {
  protected readonly VISIBILITY_DISTANCE = 4000;

  VISION_CHECKING = false;

  constructor(transform?: ITransform) {
    super({
      name: "house",
      data,
      scale: {
        x: 3,
        y: 3,
        z: 3
      },
      ...(transform || {})
    });
  }
}

export default House;
