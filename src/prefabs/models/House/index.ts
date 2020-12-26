import Model from "../../../classes/Model";
import { ITransform } from "../../../classes/Model/types";

import data from "./data";

import "./style.scss";
import { IPosition } from "../../../types";

import Scene from "classes/Scene/Scene";

class House extends Model {
  protected readonly VISIBILITY_DISTANCE = 4000;

  VISION_CHECKING = false;

  protected positionCorrector: IPosition = {
    x: 250,
    z: 170,
    y: 0
  };

  constructor(transform?: ITransform) {
    super({
      name: "house",
      data,
      scale: {
        x: 4,
        y: 3,
        z: 2.5
      },
      ...(transform || {})
    });
  }

  start() {
    Scene.getInstance().levelMap.setCollision({
      x: this.position.x + 1000,
      z: this.position.z + 1000
    });

    super.start();
  }
}

export default House;
