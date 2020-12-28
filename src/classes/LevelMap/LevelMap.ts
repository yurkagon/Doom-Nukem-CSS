import CollisionDetector from "./CollisionDetector";
import { ICollisionMap } from "./CollisionDetector/types";

import Wall from "../Wall";

class LevelMap {
  private collisionDetector: CollisionDetector;

  constructor(map: ICollisionMap) {
    this.collisionDetector = new CollisionDetector(map);

    this.attachMap();
  }

  public handleCollision(targetPosition: Position, currentPosition: Position) {
    return this.collisionDetector.handleCollision(
      targetPosition,
      currentPosition
    );
  }

  public setCollision(position: Position) {
    return this.collisionDetector.setCollision(position);
  }

  private attachMap() {
    this.collisionDetector.forEach((position, cellInfo) => {
      if (cellInfo.current === "#") {
        new Wall(position, cellInfo);
      }
    });
  }
}

export default LevelMap;
