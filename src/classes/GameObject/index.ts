import Scene from "../Scene/Scene";
import { IPosition } from "../../types";

abstract class GameObject {
  static readonly defaultPosition: IPosition = {
    x: 0,
    y: 0,
    z: 0
  };

  public position: IPosition;

  public isStarted = false;

  constructor(position: IPosition = { ...GameObject.defaultPosition }) {
    this.position = position;

    const scene = Scene.getInstance();
    scene.subscribeGameObject(this);
  }
  abstract start(): void;
  abstract update(): void;

  destroy() {
    const scene = Scene.getInstance();
    scene.unSubscribeGameObject(this);
  }

  getPosition() {
    return this.position;
  }
}

export default GameObject;
