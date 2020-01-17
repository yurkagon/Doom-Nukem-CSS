import CollisionDetector from "./CollisionDetector";
import { ICollisionMap } from "./CollisionDetector/types";
import { IPosition } from "../../types";

import testMap from "./testMap";
import House from "../../prefabs/models/House";

class Map {
  private collisionDetector: CollisionDetector;

  constructor(map: ICollisionMap) {
    this.collisionDetector = new CollisionDetector(map);

    this.attachMap();
  }

  public handleCollision(
    targetPosition: IPosition,
    currentPosition: IPosition
  ) {
    return this.collisionDetector.handleCollision(
      targetPosition,
      currentPosition
    );
  }

  public setCollision(position: IPosition) {
    return this.collisionDetector.setCollision(position);
  }

  private attachMap() {
    let str = "";
    this.collisionDetector.forEach((symbol, position, i, k) => {
      if (symbol === "#") {
        console.log(position);
        new House({
          position: {
            ...position,
            y: 493
          }
        });
      }
    });
  }
}

export default new Map(testMap);
