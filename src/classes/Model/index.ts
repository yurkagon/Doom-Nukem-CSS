import $ from "jquery";
import { IModelConfig } from "./types";
import { IPosition } from "../../types";
import GameObjectLOD from "../GameObjectLOD/index";

abstract class Model extends GameObjectLOD {
  private static readonly DEFAULT_ROTATION: IPosition = { x: 0, y: 0, z: 0 };
  private static readonly DEFAULT_SCALE: IPosition = { x: 1, y: 1, z: 1 };

  private static readonly level: JQuery = $(".level");

  private name: string;
  private rotation: IPosition;
  private scale: IPosition;

  protected positionCorrector: IPosition = {
    x: 0,
    y: 0,
    z: 0
  };

  private config: IModelConfig;

  constructor(config: IModelConfig) {
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
