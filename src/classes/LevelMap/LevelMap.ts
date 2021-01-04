import { CellMap } from "classes/MapHandler";

import CollisionDetector from "./CollisionDetector";

import Wall from "../Wall";

class LevelMap {
  private collisionDetector: CollisionDetector;

  constructor(map: CellMap) {
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
      if (cellInfo.current !== " ") {
        new Wall(position, cellInfo);
      }
    });
  }
}

export default LevelMap;
