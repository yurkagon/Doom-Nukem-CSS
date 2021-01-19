import Scene from "classes/Scene";
import Model, { Transform } from "classes/Model";

import data from "./data";

import "./style.scss";

class House extends Model {
  VISION_CHECKING = false;

  protected positionCorrector: Position = {
    x: 250,
    z: 170,
    y: 0
  };

  constructor(transform?: Transform) {
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
