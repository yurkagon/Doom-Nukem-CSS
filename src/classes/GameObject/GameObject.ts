import Scene from "../Scene";

abstract class GameObject {
  static readonly defaultPosition: Position = {
    x: 0,
    y: 0,
    z: 0
  };

  public position: Position;

  public isStarted = false;

  constructor(position: Position = { ...GameObject.defaultPosition }) {
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
