import { Distance } from "helpers";
import Angle from "helpers/angle";

import { CollisionType, ICollisionMap, CellInfo } from "./types";

class CollisionDetector {
  public collisionMap: ICollisionMap;

  constructor(map: ICollisionMap) {
    this.setCollisionMap(map);
  }

  public setCollisionMap(map: ICollisionMap) {
    this.collisionMap = map;
  }

  public handleCollision(targetPosition: Position, currentPosition: Position) {
    const localTargetPosition = this.getMapPosition(targetPosition);
    const localCurrentPosition = this.getMapPosition(currentPosition);
    const space = this.getSymbol(localTargetPosition);

    if (space === "#") {
      return this.handleWall(
        targetPosition,
        currentPosition,
        localTargetPosition,
        localCurrentPosition
      );
    }

    return targetPosition;
  }

  private handleWall(
    targetPosition: Position,
    currentPosition: Position,
    localTargetPosition: Position,
    localCurrentPosition: Position
  ) {
    const vector = {
      x: targetPosition.x - currentPosition.x,
      z: targetPosition.z - currentPosition.z
    };

    const angle = Angle.toDeg(Math.atan2(vector.x, vector.z));

    const targetDistance = Distance(targetPosition, currentPosition);

    const collisionType = this.getCollisionType(
      localCurrentPosition,
      localTargetPosition
    );

    let delta: Position;
    if (collisionType === CollisionType.horizontal) {
      const angleToMove = -Math.PI / 2;
      const collisionDistance =
        (Math.abs(90 - Math.abs(angle)) / 90) * targetDistance;

      if (90 <= angle && angle <= 180 && !delta) {
        delta = {
          x: Math.cos(angleToMove) * collisionDistance,
          z: Math.sin(angleToMove) * collisionDistance
        };
      }
      if (0 <= angle && 90 > angle && !delta) {
        delta = {
          x: Math.cos(angleToMove) * collisionDistance,
          z: -Math.sin(angleToMove) * collisionDistance
        };
      }
      if (-90 <= angle && angle < 0 && !delta) {
        delta = {
          x: Math.cos(angleToMove) * collisionDistance,
          z: -Math.sin(angleToMove) * collisionDistance
        };
      }
      if (-90 > angle && angle >= -180 && !delta) {
        delta = {
          x: -Math.cos(angleToMove) * collisionDistance,
          z: Math.sin(angleToMove) * collisionDistance
        };
      }
    } else if (collisionType === CollisionType.vertical) {
      const angleToMove = Math.PI;
      const collisionDistance =
        targetDistance - (Math.abs(90 - Math.abs(angle)) / 90) * targetDistance;

      if (90 <= angle && angle <= 180 && !delta) {
        delta = {
          x: -Math.cos(angleToMove) * collisionDistance,
          z: -Math.sin(angleToMove) * collisionDistance
        };
      }

      if (90 > angle && angle >= 0 && !delta) {
        delta = {
          x: -Math.cos(angleToMove) * collisionDistance,
          z: Math.sin(angleToMove) * collisionDistance
        };
      }

      if (-90 <= angle && angle < 0 && !delta) {
        delta = {
          x: Math.cos(angleToMove) * collisionDistance,
          z: -Math.sin(angleToMove) * collisionDistance
        };
      }

      if (-90 > angle && angle > -180 && !delta) {
        delta = {
          x: Math.cos(angleToMove) * collisionDistance,
          z: Math.sin(angleToMove) * collisionDistance
        };
      }
    }

    let newPosition = {
      x: currentPosition.x + delta.x,
      z: currentPosition.z + delta.z
    };

    if (this.getSymbol(this.getMapPosition(newPosition)) === "#") {
      newPosition = {
        x: currentPosition.x - delta.x * 2,
        z: currentPosition.z - delta.z * 2
      };
    }
    return newPosition;
  }

  private getCollisionType(
    position: Position,
    targetPosition: Position
  ): CollisionType {
    if (position.z === targetPosition.z) {
      return CollisionType.horizontal;
    } else {
      return CollisionType.vertical;
    }
  }

  public setCollision(position: Position) {
    const mapPosition = this.getMapPosition(position);

    try {
      this.collisionMap[mapPosition.z][mapPosition.x] = "#";
    } catch {}
  }

  private getMapPosition(position: Position): Position {
    const normalizedPosition = this.normalizePosition(position);

    return {
      x: Math.ceil(normalizedPosition.x - 1),
      z: Math.ceil(normalizedPosition.z - 1)
    };
  }

  private normalizePosition(position: Position): Position {
    return {
      x: (position.x + 15000) / 1000,
      z: (position.z + 15000) / 1000
    };
  }

  private getRealPositionFromNormalizedPosition(position: Position): Position {
    return {
      x: position.x * 1000 - 15000,
      z: position.z * 1000 - 15000
    };
  }

  private getSymbol(position: Position) {
    try {
      return this.collisionMap[position.z][position.x];
    } catch {
      return "#";
    }
  }

  public forEach(
    callback: (
      position: Position,
      cellInfo: CellInfo,
      i: number,
      k: number
    ) => void
  ) {
    for (let i = 0; i < this.collisionMap.length; i++) {
      for (let k = 0; k < this.collisionMap[i].length; k++) {
        const space = this.collisionMap[i][k];
        callback(
          this.getRealPositionFromNormalizedPosition({
            x: k,
            z: i
          }),
          {
            current: space,
            front: this.getSymbol({
              x: k,
              z: i + 1
            }),
            left: this.getSymbol({
              x: k - 1,
              z: i
            }),
            right: this.getSymbol({
              x: k + 1,
              z: i
            }),
            back: this.getSymbol({
              x: k,
              z: i - 1
            })
          },
          i,
          k
        );
      }
    }
  }
}

export default CollisionDetector;
