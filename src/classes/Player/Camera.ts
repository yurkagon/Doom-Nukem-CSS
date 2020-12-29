import $ from "jquery";

import GameObject from "../GameObject";

import { FOV, PLAYER_MOVE_SPEED } from "variables/constants";
import Angle from "helpers/angle";

abstract class Camera extends GameObject {
  public rotation = {
    x: 0,
    y: 0
  };
  public origin = {
    x: 0,
    z: 0
  };

  public readonly camera = $("#camera");

  public moveBy(vectorToMove: Position): void {
    const targetPosition = {
      x: this.position.x + vectorToMove.x,
      z: this.position.z + vectorToMove.z
    };

    this.position.x = targetPosition.x;
    this.position.z = targetPosition.z;
  }

  public getPosition() {
    return this.convertCameraPositionToRealPosition(this.position);
  }

  public isObjectVisibleFromFov(gameObject: GameObject, fov: number): boolean {
    const angle = Angle.getAngleBetween(
      this.getPosition(),
      gameObject.getPosition()
    );

    const playerViewAngle = this.getPlayerViewAngle();

    // console.log(
    //   {
    //     angle: angle.toFixed(2),
    //     playerViewAngle: playerViewAngle.toFixed(2)
    //   },
    //   Math.abs(angle - playerViewAngle)
    // );

    const playerViewLeft = playerViewAngle - fov / 2;
    const playerViewRight = playerViewAngle + fov / 2;

    return Angle.isAngleBetween(angle, playerViewLeft, playerViewRight);
  }

  public getPlayerViewAngle(): number {
    return Angle.normalize(-this.rotation.y - 90);
  }

  protected goForward(): Position {
    const { rotation } = this;

    return {
      x: -Math.sin((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED,
      z: Math.cos((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED
    };
  }
  protected goBack(): Position {
    const { rotation } = this;

    return {
      x: Math.sin((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED,
      z: -Math.cos((rotation.y * Math.PI) / 180) * PLAYER_MOVE_SPEED
    };
  }
  protected goLeft(): Position {
    const { rotation } = this;

    return {
      x: -Math.sin(((rotation.y - 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED,
      z: Math.cos(((rotation.y - 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED
    };
  }
  protected goRight(): Position {
    const { rotation } = this;

    return {
      x: -Math.sin(((rotation.y + 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED,
      z: Math.cos(((rotation.y + 90) * Math.PI) / 180) * PLAYER_MOVE_SPEED
    };
  }

  protected rotate(degree: number) {
    const { rotation, origin } = this;
    rotation.y -= degree;
    if (rotation.y < 0) rotation.y = 360 + rotation.y;
    if (rotation.y > 360) rotation.y = rotation.y - 360;

    const angle = ((rotation.y % 360) / 360) * 2 * Math.PI;

    origin.x = -Math.sin(angle) * FOV;
    origin.z = -(FOV - Math.cos(angle) * FOV);
  }

  protected convertCameraPositionToRealPosition(position: Position): Position {
    return this.convertRealPositionToCameraPosition(position);
  }

  protected convertRealPositionToCameraPosition(position: Position): Position {
    // return {
    //   x: -position.x - 130,
    //   z: -position.z + 1000
    // };
    return {
      x: -position.x - 130,
      z: -position.z + 800
    };
  }
}

export default Camera;
