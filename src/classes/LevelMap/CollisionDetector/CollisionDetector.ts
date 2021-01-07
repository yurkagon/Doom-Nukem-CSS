import MapHandler from "classes/MapHandler";

import { Distance } from "helpers";
import Angle from "helpers/angle";

import { CollisionType } from "./types";

class CollisionDetector extends MapHandler {
  public handleCollision(targetPosition: Position, currentPosition: Position) {
    const localTargetPosition = this.getLocalPosition(targetPosition);
    const localCurrentPosition = this.getLocalPosition(currentPosition);

    if (this.isCollidedByLocalPosition(localTargetPosition)) {
      return this.handleWall(
        targetPosition,
        currentPosition,
        localTargetPosition,
        localCurrentPosition
      );
    }

    return targetPosition;
  }

  public setCollision(position: Position): void {
    const mapPosition = this.getLocalPosition(position);

    try {
      this.cellMap[mapPosition.z][mapPosition.x] = "#";
    } catch {}
  }

  private handleWall(
    targetPosition: Position,
    currentPosition: Position,
    localTargetPosition: Position,
    localCurrentPosition: Position
  ): Position {
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

    if (this.isCollidedByLocalPosition(this.getLocalPosition(newPosition))) {
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

  private isCollidedByLocalPosition(position: Position): boolean {
    const char = this.getSymbolByLocalPosition(position);

    return char !== " ";
  }
}

export default CollisionDetector;
