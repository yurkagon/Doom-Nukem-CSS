import GameObject from "../GameObject/index";

import $ from "jquery";
import { FOV, PLAYER_MOVE_SPEED } from "../../variables/constants";

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
  moveForward() {
    const { position, rotation } = this;
    position.x -= Math.sin((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED;
    position.z += Math.cos((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED;
  }
  moveBack() {
    const { position, rotation } = this;
    position.x += Math.sin((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED;
    position.z -= Math.cos((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED;
  }
  moveLeft() {
    const { position, rotation } = this;
    position.x -=
      Math.sin(((rotation.y - 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED;
    position.z +=
      Math.cos(((rotation.y - 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED;
  }
  moveRight() {
    const { position, rotation } = this;
    position.x -=
      Math.sin(((rotation.y + 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED;
    position.z +=
      Math.cos(((rotation.y + 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED;
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
