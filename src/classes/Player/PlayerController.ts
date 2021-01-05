import State from "State";
import { playRandomFootstep } from "sound/data/player/steps";

import Camera from "./Camera";
import Scene from "../Scene";
import Control from "./Control";

abstract class PlayerController extends Camera {
  private controller = new Control();

  private stepState = true;

  protected allowMovement = true;

  constructor() {
    super();

    if (State.settings.savePosition) {
      const data = JSON.parse(localStorage.getItem("player-position"));

      if (data) {
        this.position = data.position;
        this.position.y = 0;
        this.origin = data.origin;
        this.rotation = data.rotation;
      }

      setInterval(this.savePosition, 5000);
    }
  }

  protected abstract onShot(): void;

  start() {
    this.controller.setMouseCallback(this.onMouseMove.bind(this));
    this.controller.setShotCallback(this.onShot.bind(this));
  }

  update() {
    if (!this.allowMovement) return;

    const {
      toForward,
      toBack,
      toLeft,
      toRight,
      rotateLeft,
      rotateRight
    } = this.controller.moveState;

    if (this.controller.isMoving()) {
      const moves: Array<Position> = [];

      if (toForward) moves.push(this.goForward());
      if (toBack) moves.push(this.goBack());
      if (toLeft) moves.push(this.goLeft());
      if (toRight) moves.push(this.goRight());

      const vectorToMove = moves.reduce(
        (value: Position, acc: Position): Position => ({
          x: value.x + acc.x,
          z: value.z + acc.z
        })
      );

      this.moveBy(vectorToMove);
    }

    if (rotateLeft) this.rotate(this.controller.ROTATION_SPEED);
    if (rotateRight) this.rotate(-this.controller.ROTATION_SPEED);
  }

  public moveBy(vectorToMove: Position): void {
    if (State.settings.noclip) {
      return super.moveBy(vectorToMove);
    }

    const currentPosition = this.position;
    const targetPosition = {
      x: currentPosition.x + vectorToMove.x,
      z: currentPosition.z + vectorToMove.z
    };

    const resultPosition = Scene.getInstance().levelMap.handleCollision(
      this.convertCameraPositionToRealPosition(targetPosition),
      this.convertCameraPositionToRealPosition(currentPosition)
    );

    const result = this.convertRealPositionToCameraPosition(resultPosition);

    this.position.x = result.x;
    this.position.z = result.z;

    this.stepsEffect();
  }

  private onMouseMove(value: number) {
    if (this.allowMovement) {
      this.rotate(value);
    }
  }

  private stepsEffect() {
    const { position, stepState } = this;
    const value = 0.8;
    position.y += stepState ? value : -value;
    if (Math.abs(position.y) > 12) {
      this.stepState = !stepState;

      this.stepState && playRandomFootstep();
    }
  }

  public isMoving() {
    return this.allowMovement && this.controller.isMoving();
  }

  public savePosition = () => {
    localStorage.setItem(
      "player-position",
      JSON.stringify({
        position: this.position,
        origin: this.origin,
        rotation: this.rotation
      })
    );
  };
}

export default PlayerController;
