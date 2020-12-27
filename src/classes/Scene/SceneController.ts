import $ from "jquery";
import GameObject from "classes/GameObject";
import Player from "classes/Player";
import LevelMap from "classes/LevelMap";

import { generateTranslate3d } from "helpers";

import {
  UpdateStrategy,
  IntervalStrategy,
  TimeoutStrategy
} from "./UpdateStrategy";

import { SceneConfig } from "./types";

abstract class SceneController {
  static readonly RENDER_SPEED = 8;

  private player: Player;
  public gameObjects: Array<GameObject> = [];

  public levelMap: LevelMap;
  private readonly levelWrapper: JQuery = $(".level");

  private sceneStart: () => void;
  private sceneUpdate: () => void;

  private updateStrategy: UpdateStrategy = new IntervalStrategy();

  constructor() {
    this.update = this.update.bind(this);
  }

  public init(config: SceneConfig): void {
    this.levelMap = config.levelMap;
    this.player = config.player;
    this.sceneStart = config.start;
    this.sceneUpdate = config.update;

    if (this.sceneStart) {
      this.sceneStart.call(this);
    }
    this.runUpdating();
  }

  private runUpdating() {
    this.updateStrategy.setUpdater(this.update, SceneController.RENDER_SPEED);
    this.updateStrategy.run();
  }

  private update() {
    for (let gameObject of this.gameObjects) {
      if (!gameObject.isStarted) {
        gameObject.start();
        gameObject.isStarted = true;

        continue;
      }

      gameObject.update();
    }

    if (this.sceneUpdate) {
      this.sceneUpdate.call(this);
    }
    this.updateFrame();
  }

  private updateFrame(): void {
    const { rotation, position, origin } = this.player;

    const rotate3d = `rotateY(${rotation.y}deg)`;
    const translate3d = generateTranslate3d({
      x: position.x + origin.x,
      y: position.y,
      z: position.z + origin.z
    });

    this.levelWrapper.css("transform", rotate3d + translate3d);
  }

  public subscribeGameObject(gameObject: GameObject): void {
    this.gameObjects.push(gameObject);
  }
  public unSubscribeGameObject(gameObject: GameObject): void {
    const index = this.gameObjects.indexOf(gameObject);

    this.gameObjects.splice(index, 1);
  }
}

export default SceneController;
