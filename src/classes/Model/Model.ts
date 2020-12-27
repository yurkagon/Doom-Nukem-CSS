import $ from "jquery";

import GameObjectLOD from "../GameObjectLOD";

import { ModelConfig } from "./types";

abstract class Model extends GameObjectLOD {
  private static readonly DEFAULT_ROTATION: Position = { x: 0, y: 0, z: 0 };
  private static readonly DEFAULT_SCALE: Position = { x: 1, y: 1, z: 1 };

  private static readonly level: JQuery = $(".level");

  private name: string;
  private rotation: Position;
  private scale: Position;

  protected positionCorrector: Position = {
    x: 0,
    y: 0,
    z: 0
  };

  private config: ModelConfig;

  constructor(config: ModelConfig) {
    super(config.position);

    this.config = config;

    this.name = config.name;
    this.rotation = config.rotation || Object.create(Model.DEFAULT_ROTATION);
    this.scale = config.scale || Object.create(Model.DEFAULT_SCALE);
  }

  public start() {
    this.self.addClass(this.name);
    this.self.append(this.config.data);

    Model.level.append(this.self);

    this.updateTransform();

    super.start();
  }

  private updateTransform() {
    const { position, rotation, scale, positionCorrector } = this;

    const translate3d = `translate3d(${position.x +
      positionCorrector.x}px, ${position.y +
      positionCorrector.y}px, ${position.z + positionCorrector.z}px)`;
    const scale3d = `scale3d(${scale.x}, ${scale.y}, ${scale.z})`;

    const transform = `${translate3d} ${scale3d}`;

    this.self.css("transform", transform);
  }
}

export default Model;
