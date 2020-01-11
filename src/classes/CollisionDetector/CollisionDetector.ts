import { Distance } from "../../helpers";

import { IPosition } from "../../types";

import { ICell, ICollisionType } from "./types";
import Angle from "../../helpers/angle";

class CollisionDetector {
  private collisionMap: ICell[][] = require("./collisionMap").default;

  public handleCollision(
    targetPosition: IPosition,
    currentPosition: IPosition
  ) {
    const mapTargetPosition = this.getMapPosition(targetPosition);
    const mapCurrentPosition = this.getMapPosition(currentPosition);
    const space = this.getSymbol(mapTargetPosition);

    if (space === "#") {
      const vector = {
        x: targetPosition.x - currentPosition.x,
        z: targetPosition.z - currentPosition.z
      };

      const targetDistance = Distance(targetPosition, currentPosition);
      const angle = Angle.toDeg(Math.atan2(vector.x, vector.z));

      const collisionType = this.getCollisionType(
        mapCurrentPosition,
        mapTargetPosition
      );

      let newPosition;
      if (collisionType === ICollisionType.horizontal) {
        const angleToMove = -Math.PI / 2;
        const collisionDistance =
          (Math.abs(90 - Math.abs(angle)) / 90) * targetDistance;

        if (90 <= angle && angle <= 180 && !newPosition) {
          newPosition = {
            x: currentPosition.x + Math.cos(angleToMove) * collisionDistance,
            z: currentPosition.z + Math.sin(angleToMove) * collisionDistance
          };
        }
        if (0 <= angle && 90 > angle && !newPosition) {
          newPosition = {
            x: currentPosition.x + Math.cos(angleToMove) * collisionDistance,
            z: currentPosition.z - Math.sin(angleToMove) * collisionDistance
          };
        }
        if (-90 <= angle && angle < 0 && !newPosition) {
          newPosition = {
            x: currentPosition.x + Math.cos(angleToMove) * collisionDistance,
            z: currentPosition.z - Math.sin(angleToMove) * collisionDistance
          };
        }
        if (-90 > angle && angle >= -180 && !newPosition) {
          newPosition = {
            x: currentPosition.x - Math.cos(angleToMove) * collisionDistance,
            z: currentPosition.z + Math.sin(angleToMove) * collisionDistance
          };
        }
      } else if (collisionType === ICollisionType.vertical) {
        const angleToMove = Math.PI;
        const collisionDistance =
          targetDistance -
          (Math.abs(90 - Math.abs(angle)) / 90) * targetDistance;

        if (90 <= angle && angle <= 180 && !newPosition) {
          newPosition = {
            x: currentPosition.x - Math.cos(angleToMove) * collisionDistance,
            z: currentPosition.z - Math.sin(angleToMove) * collisionDistance
          };
        }

        if (90 > angle && angle >= 0 && !newPosition) {
          newPosition = {
            x: currentPosition.x - Math.cos(angleToMove) * collisionDistance,
            z: currentPosition.z + Math.sin(angleToMove) * collisionDistance
          };
        }

        if (-90 <= angle && angle < 0 && !newPosition) {
          newPosition = {
            x: currentPosition.x + Math.cos(angleToMove) * collisionDistance,
            z: currentPosition.z - Math.sin(angleToMove) * collisionDistance
          };
        }

        if (-90 > angle && angle > -180 && !newPosition) {
          newPosition = {
            x: currentPosition.x + Math.cos(angleToMove) * collisionDistance,
            z: currentPosition.z + Math.sin(angleToMove) * collisionDistance
          };
        }
      }

      if (this.getSymbol(this.getMapPosition(newPosition)) === "#") {
        return this.handleCollision(newPosition, currentPosition);
      } else {
        return newPosition;
      }
    }

    return targetPosition;
  }

  private getCollisionType(
    position: IPosition,
    targetPosition: IPosition
  ): ICollisionType {
    if (position.z === targetPosition.z) {
      return ICollisionType.horizontal;
    } else {
      return ICollisionType.vertical;
    }
  }

  public setCollision(position: IPosition) {
    const mapPosition = this.getMapPosition(position);

    try {
      this.collisionMap[mapPosition.z][mapPosition.x] = "#";
    } catch {}
  }

  private getMapPosition(position: IPosition): IPosition {
    const normalizedPosition = this.normalizePosition(position);

    return {
      x: Math.ceil(normalizedPosition.x - 1),
      z: Math.ceil(normalizedPosition.z - 1)
    };
  }

  private normalizePosition(position: IPosition): IPosition {
    return {
      x: (position.x + 15000) / 1000,
      z: (position.z + 15000) / 1000
    };
  }

  private getSymbol(position: IPosition) {
    try {
      return this.collisionMap[position.z][position.x];
    } catch {
      return "#";
    }
  }
}

export default new CollisionDetector();
