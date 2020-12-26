import Camera from "./Camera";
import { IPosition } from "../../types";
import Scene from "../Scene/Scene";
import Enemy from "../Sprite/Enemy/Enemy";
import Control from "./Control";
import Level from "../Level";

abstract class PlayerController extends Camera {
  private controller = new Control();

  private stepState = true;

  protected allowMovement = true;

  constructor() {
    super();
    const data = JSON.parse(localStorage.getItem("player-position"));

    if (data) {
      this.position = data.position;
      this.position.y = 0;
      this.origin = data.origin;
      this.rotation = data.rotation;
    }

    setInterval(this.savePosition, 5000);

    (window as any).player = this;
  }

  start() {
    this.controller.setMouseCallback(this.onMouseMove);
    this.controller.setShotCallback(this.onShot);
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
    }

    if (rotateLeft) this.rotate(this.controller.ROTATION_SPEED);
    if (rotateRight) this.rotate(-this.controller.ROTATION_SPEED);
  }

  public moveBy(vectorToMove: IPosition): void {
    const noclip = false;
    if (noclip) {
      return super.moveBy(vectorToMove);
    }

    const currentPosition = this.position;
    const targetPosition = {
      x: currentPosition.x + vectorToMove.x,
      z: currentPosition.z + vectorToMove.z
    };

    const resultPosition = Level.handleCollision(
      this.convertCameraPositionToRealPosition(targetPosition),
      this.convertCameraPositionToRealPosition(currentPosition)
    );

    const result = this.convertRealPositionToCameraPosition(resultPosition);

    this.position.x = result.x;
    this.position.z = result.z;

    this.stepsEffect();
  }

  private onMouseMove = (value: number) => {
    if (this.allowMovement) {
      this.rotate(value);
    }
  };

  private onShot = () => {
    if (!this.allowMovement) return;

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
