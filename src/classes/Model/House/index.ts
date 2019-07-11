import { ITransform } from "../types";

import data from "./data";
import Model from "../index";

class House extends Model {
  protected readonly VISIBILITY_DISTANCE = 4000;

  protected fov = 250;

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
