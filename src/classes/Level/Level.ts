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
    this.collisionDetector.forEach((symbol, position, i, k) => {
      if (symbol === "#") {
        new MedkitItem(position);
        new MedkitItem({
          ...position,
          x: position.x + 1000
        });
        new MedkitItem({
          ...position,
          z: position.z + 1000
        });
        new MedkitItem({
          x: position.x + 1000,
          z: position.z + 1000
        });
        // new MedkitItem(position);
        // new MedkitItem(position);
        new Wall({
          position: {
            ...position,
            y: 0
          }
        });
      }
    });
  }
}

export default new Map(testMap);
