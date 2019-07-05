import $ from "jquery";

import PlayerCamera from "./PlayerCamera";
import { iPosition } from "../../types";

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

  private prevMousePostion: iPosition = {
    x: 0,
    y: 0
  };

  start() {
    this.attachMouseMove();
    this.attachKeyDown();
    this.attachKeyUp();
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
      const moves: Array<iPosition> = [];

      if (toForward) moves.push(this.goForward());
      if (toBack) moves.push(this.goBack());
      if (toLeft) moves.push(this.goLeft());
      if (toRight) moves.push(this.goRight());

      const vectorToMove = moves.reduce(
        (value: iPosition, acc: iPosition): iPosition => ({
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

      const mousePosition: iPosition = {
        x: event.pageX,
        y: event.pageY
      };

      if (mousePosition.x > this.prevMousePostion.x) {
        this.rotate(-MOUSE_SENSITIVITY * ROTATION_SPEED);
      } else if (mousePosition.x < this.prevMousePostion.x) {
        this.rotate(MOUSE_SENSITIVITY * ROTATION_SPEED);
      }

      this.prevMousePostion = mousePosition;
    });
  }

  public isMoving(): boolean {
    const { toForward, toBack, toLeft, toRight } = this.moveState;

    return toForward || toBack || toLeft || toRight;
  }
}

export default PlayerController;
