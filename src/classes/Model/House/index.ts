import Model from "..";
import { ITransform } from "../types";

import data from "./data";

class House extends Model {
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
