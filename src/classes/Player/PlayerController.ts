import $ from "jquery";

import PlayerCamera from "./PlayerCamera";
import { IPosition } from "../../types";
import Scene from "../Scene/Scene";
import Enemy from "../Sprite/Enemy/Enemy";
import { Distance } from "../../helpers";
import Control from "./Control";

abstract class PlayerController extends PlayerCamera {
  private controller = new Control();

  private stepState = true;

  start() {
    this.controller.setMouseCallback(this.onMouseMove);
    this.controller.setShotCallback(this.onShot);
  }

  update() {
    const {
      toForward,
      toBack,
      toLeft,
      toRight,
      rotateLeft,
      rotateRight
    } = this.controller.moveState;

    if (this.controller.isMoving()) {
      const moves: Array<IPosition> = [];

      if (toForward) moves.push(this.goForward());
      if (toBack) moves.push(this.goBack());
      if (toLeft) moves.push(this.goLeft());
      if (toRight) moves.push(this.goRight());

      const vectorToMove = moves.reduce(
        (value: IPosition, acc: IPosition): IPosition => ({
          x: value.x + acc.x,
          z: value.z + acc.z
        })
      );

      this.moveBy(vectorToMove);
      this.stepsEffect();
    }

    if (rotateLeft) this.rotate(this.controller.ROTATION_SPEED);
    if (rotateRight) this.rotate(-this.controller.ROTATION_SPEED);
  }

  private onMouseMove = (value: number) => {
    this.rotate(value);
  };

  private onShot = () => {
    for (let gameObject of Scene.getInstance().gameObjects) {
      if (gameObject instanceof Enemy) {
        if (gameObject.currentState !== Enemy.states.DEAD) {
          if (this.isObjectVisibleFromFov(gameObject, 5)) {
            gameObject.setState(Enemy.states.DEAD);
            break;
          }
        }
      }
    }
  };

  private stepsEffect() {
    const { position, stepState } = this;
    const value = 0.8;
    position.y += stepState ? value : -value;
    if (Math.abs(position.y) > 12) this.stepState = !stepState;
  }

  public isMoving() {
    return this.controller.isMoving();
  }
}

export default PlayerController;
