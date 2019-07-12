import GameObject from "../GameObject/index";

import $ from "jquery";
import { FOV, PLAYER_MOVE_SPEED } from "../../variables/constants";
import { iPosition } from "../../types";

import { isAngleBetween, normalize } from "../../helpers/angle";

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
  protected goForward(): iPosition {
    const { rotation } = this;

    return {
      x: -Math.sin((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED,
      z: Math.cos((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED
    };
  }
  protected goBack(): iPosition {
    const { rotation } = this;

    return {
      x: Math.sin((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED,
      z: -Math.cos((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED
    };
  }
  protected goLeft(): iPosition {
    const { rotation } = this;

    return {
      x: -Math.sin(((rotation.y - 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED,
      z: Math.cos(((rotation.y - 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED
    };
  }
  protected goRight(): iPosition {
    const { rotation } = this;

    return {
      x: -Math.sin(((rotation.y + 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED,
      z: Math.cos(((rotation.y + 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED
    };
  }

  public moveBy(vectorToMove: iPosition): void {
    this.position.x += vectorToMove.x;
    this.position.z += vectorToMove.z;
  }

  public isObjectVisibleFromFov(gameObject: GameObject, fov: number): boolean {
    const playerPos = this.getPosition();
    const gameObjectPos = gameObject.getPosition();

    const dx = playerPos.x - gameObjectPos.x;
    const dz = gameObjectPos.z - playerPos.z;

    const angle = normalize((Math.atan2(dz, dx) * 180) / Math.PI);
    const playerViewAngle = normalize(-this.rotation.y - 90);

    const playerViewLeft = playerViewAngle - fov / 2;
    const playerViewRight = playerViewAngle + fov / 2;

    return isAngleBetween(angle, playerViewLeft, playerViewRight);
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
    return {
      x: -this.position.x - 128,
      z: -this.position.z + 700
    };
  }
}

export default PlayerCamera;
