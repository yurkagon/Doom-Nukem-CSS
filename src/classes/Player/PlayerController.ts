import $ from 'jquery';

import PlayerCamera from './PlayerCamera';
import { iPosition } from '../../types';

abstract class PlayerController extends PlayerCamera {

  static readonly MOUSE_SENSITIVITY = 1.5;
  static readonly ROTATION_SPEED = 2;

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

    if (toForward) this.moveForward();
    if (toBack) this.moveBack();
    if (toLeft)	this.moveLeft();
    if (toRight) this.moveRight();

    if (rotateLeft) this.rotate(PlayerController.ROTATION_SPEED);
    if (rotateRight) this.rotate(-PlayerController.ROTATION_SPEED);

    if (toForward || toBack || toLeft || toRight) this.stepsEffect();
  }

  private attachKeyDown(): void {
    $('body').keydown((e: JQuery.KeyDownEvent) => {
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
    $('body').keyup((e: JQuery.KeyUpEvent) => {
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
    $(document).bind('mousemove', (event) => {
      const { MOUSE_SENSITIVITY, ROTATION_SPEED } = PlayerController;

      const mousePosition: iPosition = {
        x: event.pageX,
        y: event.pageY
      };

      if (mousePosition.x > this.prevMousePostion.x) {
        this.rotate(-MOUSE_SENSITIVITY*ROTATION_SPEED);
      }
      else if (mousePosition.x < this.prevMousePostion.x) {
        this.rotate(MOUSE_SENSITIVITY*ROTATION_SPEED);
      }

      this.prevMousePostion = mousePosition;
    });
  }

  public isMoving(): boolean {
    const {
      toForward,
      toBack,
      toLeft,
      toRight,
    } = this.moveState;

    return toForward || toBack || toLeft || toRight;
  }
}

export default PlayerController;
