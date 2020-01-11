import GameObject from "../GameObject/index";

import $ from "jquery";
import { FOV, PLAYER_MOVE_SPEED } from "../../variables/constants";
import { IPosition } from "../../types";

import Angle from "../../helpers/angle";
import CollisionDetector from "../CollisionDetector";

abstract class PlayerCamera extends GameObject {
  public rotation = {
    x: 0,
    y: 0
  };
  public origin = {
    x: 0,
    z: 0
  };

  private _camera = $("#camera");

  get camera() {
    // camera is a static DIV. All 3d operations are inside
    return this._camera;
  }
  protected goForward(): IPosition {
    const { rotation } = this;

    return {
      x: -Math.sin((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED,
      z: Math.cos((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED
    };
  }
  protected goBack(): IPosition {
    const { rotation } = this;

    return {
      x: Math.sin((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED,
      z: -Math.cos((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED
    };
  }
  protected goLeft(): IPosition {
    const { rotation } = this;

    return {
      x: -Math.sin(((rotation.y - 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED,
      z: Math.cos(((rotation.y - 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED
    };
  }
  protected goRight(): IPosition {
    const { rotation } = this;

    return {
      x: -Math.sin(((rotation.y + 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED,
      z: Math.cos(((rotation.y + 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED
    };
  }

  public moveBy(vectorToMove: IPosition): void {
    const currentPosition = this.position;
    const targetPosition = {
      x: currentPosition.x + vectorToMove.x,
      z: currentPosition.z + vectorToMove.z
    };

    const resultPosition = CollisionDetector.checkCollision(
      this.convertPlayerPositionToRealPosition(targetPosition),
      this.convertPlayerPositionToRealPosition(currentPosition)
    );

    const result = this.convertRealPositionToPlayerPosition(resultPosition);

    this.position.x = result.x;
    this.position.z = result.z;
  }

  public isObjectVisibleFromFov(gameObject: GameObject, fov: number): boolean {
    const playerPos = this.getPosition();
    const gameObjectPos = gameObject.getPosition();

    const dx = playerPos.x - gameObjectPos.x;
    const dz = gameObjectPos.z - playerPos.z;

    const angle = Angle.normalize((Math.atan2(dz, dx) * 180) / Math.PI);
    const playerViewAngle = Angle.normalize(-this.rotation.y - 90);

    const playerViewLeft = playerViewAngle - fov / 2;
    const playerViewRight = playerViewAngle + fov / 2;

    return Angle.isAngleBetween(angle, playerViewLeft, playerViewRight);
  }

  rotate(degree) {
    const { rotation, origin } = this;
    rotation.y -= degree;
    if (rotation.y < 0) rotation.y = 360 + rotation.y;
    if (rotation.y > 360) rotation.y = rotation.y - 360;

    const angle = ((rotation.y % 360) / 360) * 2 * Math.PI;

    origin.x = -Math.sin(angle) * FOV;
    origin.z = -(FOV - Math.cos(angle) * FOV);
  }

  getPosition() {
    return this.convertPlayerPositionToRealPosition(this.position);
  }

  private convertPlayerPositionToRealPosition(position: IPosition): IPosition {
    return {
      x: -position.x - 128,
      z: -position.z + 700
    };
  }

  private convertRealPositionToPlayerPosition(position: IPosition): IPosition {
    return {
      x: -position.x - 128,
      z: -position.z + 700
    };
  }
}

export default PlayerCamera;
