import $ from "jquery";
import GameObject from "../GameObject/index";
import Player from "../Player/Player";
import { iSceneConfig } from "../../types";
import { generetaTranslate3d } from "../../helpers";

abstract class SceneController {
  static readonly RENDER_SPEED = 8;

  private player: Player;
  private gameObjets: Array<GameObject> = [];
  private readonly level: JQuery = $(".level");

  private sceneStart: () => void;
  private sceneUpdate: () => void;

  constructor() {
    this.update = this.update.bind(this);
  }

  public subscrubeGameObject(gameObject: GameObject): void {
    this.gameObjets.push(gameObject);
  }

  public init(config: iSceneConfig): void {
    this.player = config.player;
    this.sceneStart = config.start;
    this.sceneUpdate = config.update;

    if (this.sceneStart) {
      this.sceneStart.call(this);
    }
    this.runUpdating();
  }

  private runUpdating() {
    const timerId = setTimeout(() => {
      this.update();

      clearTimeout(timerId);

      this.runUpdating();
    }, SceneController.RENDER_SPEED);
  }

  private update(): void {
    for (let gameObject of this.gameObjets) {
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
    const translate3d = generetaTranslate3d({
      x: position.x + origin.x,
      y: position.y,
      z: position.z + origin.z
    });

    this.level.css("transform", rotate3d + translate3d);
  }
}

export default SceneController;
