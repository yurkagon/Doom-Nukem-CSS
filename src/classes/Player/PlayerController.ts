import $ from "jquery";

import PlayerCamera from "./PlayerCamera";
import { IPosition } from "../../types";
import Scene from "../Scene/Scene";
import Enemy from "../Sprite/Enemy/Enemy";
import { Distance } from "../../helpers";

abstract class PlayerController extends PlayerCamera {
  static readonly MOUSE_SENSITIVITY = 1.5;
  static readonly ROTATION_SPEED = 2;

  private _stepState = true;

  private moveState = {
    toForward: false,
    toBack: false,
    toLeft: false,
    toRight: false,
    rotateLeft: false,
    rotateRight: false
  };

  private prevMousePostion: IPosition = {
    x: 0,
    y: 0
  };

  start() {
    this.attachMouseMove();
    this.attachKeyDown();
    this.attachKeyUp();

    this.attachShot();
  }

  update() {
    const {
      toForward,
      toBack,
      toLeft,
      toRight,
      rotateLeft,
      rotateRight
    } = this.moveState;

    if (this.isMoving()) {
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

    if (rotateLeft) this.rotate(PlayerController.ROTATION_SPEED);
    if (rotateRight) this.rotate(-PlayerController.ROTATION_SPEED);
  }

  private stepsEffect() {
    const { position, _stepState } = this;
    const value = 0.8;
    position.y += _stepState ? value : -value;
    if (Math.abs(position.y) > 12) this._stepState = !_stepState;
  }

  private attachKeyDown(): void {
    $("body").keydown((e: JQuery.KeyDownEvent) => {
      const { keyCode } = e;

      if (keyCode == 37 || keyCode == 65) this.moveState.toLeft = true;
      if (keyCode == 39 || keyCode == 68) this.moveState.toRight = true;
      if (keyCode == 38 || keyCode == 87) this.moveState.toForward = true;
      if (keyCode == 40 || keyCode == 83) this.moveState.toBack = true;

      if (keyCode == 81) this.moveState.rotateLeft = true;
      if (keyCode == 69) this.moveState.rotateRight = true;
    });
  }

  private attachShot(): void {
    $("body").click(() => {
      for (let gameObject of Scene.getInstance().gameObjects) {
        if (gameObject instanceof Enemy) {
          if (gameObject.currenState !== Enemy.states.DEAD) {
            // const distance = Distance(this.getPosition(), gameObject.getPosition());
            // console.log((10000 - distance)/10000)
            if (this.isObjectVisibleFromFov(gameObject, 5)) {
              gameObject.setState(Enemy.states.DEAD);
              break;
            }
          }
        }
      }
    });
  }

  private attachKeyUp(): void {
    $("body").keyup((e: JQuery.KeyUpEvent) => {
      const { keyCode } = e;

      if (keyCode == 37 || keyCode == 65) this.moveState.toLeft = false;
      if (keyCode == 39 || keyCode == 68) this.moveState.toRight = false;
      if (keyCode == 38 || keyCode == 87) this.moveState.toForward = false;
      if (keyCode == 40 || keyCode == 83) this.moveState.toBack = false;

      if (keyCode == 81) this.moveState.rotateLeft = false;
      if (keyCode == 69) this.moveState.rotateRight = false;
    });
  }

  private attachMouseMove(): void {
    $(document).bind("mousemove", event => {
      const { MOUSE_SENSITIVITY, ROTATION_SPEED } = PlayerController;

      const mousePosition: IPosition = {
        x: event.pageX,
        y: event.pageY
      };

      const delta = this.prevMousePostion.x - mousePosition.x;

      if (Math.abs(delta) < 50) {
        const toRotate = (delta * MOUSE_SENSITIVITY * ROTATION_SPEED) / 20;
        this.rotate(toRotate);
      }

      this.prevMousePostion = mousePosition;
    });
  }

  public isMoving(): boolean {
    const { toForward, toBack, toLeft, toRight } = this.moveState;

    const forwardAndBackTogether = toForward && toBack;
    const leftAndRightTogether = toLeft && toRight;

    if (forwardAndBackTogether || leftAndRightTogether) {
      return false;
    }

    return toForward || toBack || toLeft || toRight;
  }
}

export default PlayerController;
