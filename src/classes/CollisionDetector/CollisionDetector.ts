import { Distance } from "../../helpers";

import { iPosition } from "../../types";

import { ICell, ICollisionType } from "./types";
import Angle from "../../helpers/angle";

class CollisionDetector {
  private collisionMap: ICell[][] = require("./collisionMap").default;

  public checkCollision(targetPosition: iPosition, currentPosition: iPosition) {
    const mapTargetPosition = this.getMapPosition(targetPosition);
    const mapCurrentPosition = this.getMapPosition(currentPosition);
    const space = this.getSymbol(mapTargetPosition);

    if (space === "#") {
      const vector = {
        x: targetPosition.x - currentPosition.x,
        z: targetPosition.z - currentPosition.z
      };

      const collisionType = this.getCollisionType(
        mapCurrentPosition,
        mapTargetPosition
      );

      const targetDistance = Distance(targetPosition, currentPosition);

      const angle = Angle.toDeg(Math.atan2(vector.x, vector.z));

      if (collisionType === ICollisionType.horizontal) {
        const angleToMove = Math.PI;
        const speed =
          targetDistance -
          (Math.abs(90 - Math.abs(angle)) / 90) * targetDistance;

        if (90 <= angle && angle <= 180) {
          return {
            x: currentPosition.x + Math.cos(angleToMove) * speed,
            z: currentPosition.z + Math.sin(angleToMove) * speed
          };
        }
        if (-90 >= angle && angle >= -180) {
          return {
            x: currentPosition.x - Math.cos(angleToMove) * speed,
            z: currentPosition.z + Math.sin(angleToMove) * speed
          };
        }

        if (-90 <= angle && angle <= 0) {
          return {
            x: currentPosition.x - Math.cos(angleToMove) * speed,
            z: currentPosition.z + Math.sin(angleToMove) * speed
          };
        }

        if (0 <= angle && 90 >= angle) {
          return {
            x: currentPosition.x + Math.cos(angleToMove) * speed,
            z: currentPosition.z - Math.sin(angleToMove) * speed
          };
        }
      } else if (collisionType === ICollisionType.vertical) {
        const angleToMove = Math.PI;
        const speed =
          targetDistance -
          (Math.abs(90 - Math.abs(angle)) / 90) * targetDistance;

        if (-90 >= angle && angle >= -180) {
          return {
            x: currentPosition.x + Math.cos(angleToMove) * speed,
            z: currentPosition.z + Math.sin(angleToMove) * speed
          };
        }
        if (90 <= angle && angle <= 180) {
          return {
            x: currentPosition.x - Math.cos(angleToMove) * speed,
            z: currentPosition.z - Math.sin(angleToMove) * speed
          };
        }
        if (90 >= angle && angle >= 0) {
          return {
            x: currentPosition.x - Math.cos(angleToMove) * speed,
            z: currentPosition.z + Math.sin(angleToMove) * speed
          };
        }
        if (-90 <= angle && angle <= 0) {
          return {
            x: currentPosition.x + Math.cos(angleToMove) * speed,
            z: currentPosition.z - Math.sin(angleToMove) * speed
          };
        }
      }

      return targetPosition;
    }

    return targetPosition;
  }

  private getCollisionType(
    position: iPosition,
    targetPosition: iPosition
  ): ICollisionType {
    if (position.z === targetPosition.z) {
      return ICollisionType.horizontal;
    } else {
      return ICollisionType.vertical;
    }
  }

  public setCollision(position: iPosition) {
    const mapPosition = this.getMapPosition(position);

    try {
      this.collisionMap[mapPosition.z][mapPosition.x] = "#";
    } catch {}
  }

  private getMapPosition(position: iPosition): iPosition {
    const normalizedPosition = this.normalizePosition(position);

    return {
      x: Math.ceil(normalizedPosition.x - 1),
      z: Math.ceil(normalizedPosition.z - 1)
    };
  }

  private normalizePosition(position: iPosition): iPosition {
    return {
      x: (position.x + 15000) / 1000,
      z: (position.z + 15000) / 1000
    };
  }

  private getSymbol(position: iPosition) {
    try {
      return this.collisionMap[position.z][position.x];
    } catch {
      return "#";
    }
  }
}

export default new CollisionDetector();
