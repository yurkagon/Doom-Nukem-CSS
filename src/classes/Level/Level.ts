import CollisionDetector from "./CollisionDetector";
import { ICollisionMap } from "./CollisionDetector/types";
import { IPosition } from "../../types";

import testMap from "./testMap";
import House from "../../prefabs/models/House";
import Wall from "../Wall";
import MedkitItem from "../Sprite/Item/MedkitItem";

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
    this.collisionDetector.forEach((symbol, position, sides) => {
      if (symbol === "#") {
        new Wall(position, sides);
      }
    });
  }
}

export default new Map(testMap);
