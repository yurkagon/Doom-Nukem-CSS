import $ from "jquery";

import Player from "classes/Player";
import GameObjectLOD from "classes/GameObjectLOD";

import { generateTranslate3d } from "helpers";

import { SpriteConfig } from "./types";

import "./style.scss";

class Sprite extends GameObjectLOD {
  protected readonly self: JQuery = $("<div/>").addClass("sprite-cont");
  protected readonly rotationContainer: JQuery = $("<div/>");
  protected readonly texture: JQuery = $("<div/>").addClass("texture");

  private config: SpriteConfig;

  protected VISIBILITY_DISTANCE = 8000;

  private static readonly spriteListContainer: JQuery = $(".sprites");

  constructor(config: SpriteConfig) {
    super(config.position);

    this.config = config;
  }

  public start() {
    const { type, position, classType = "" } = this.config;

    this.self.css("transform", generateTranslate3d(position));

    this.rotationContainer.addClass(`sprite ${classType} ${type}`);
    this.rotationContainer.append(this.texture);

    this.self.append(this.rotationContainer);

    Sprite.spriteListContainer.append(this.self);

    super.start();
  }

  public update() {
    if (this.isActive) {
      const player = Player.getInstance();

      const translate3d = generateTranslate3d(this.getPosition());
      const rotate3d = `rotate3d(0, 1, 0, ${-player.rotation.y}deg)`;

      this.self.css("transform", translate3d);
      this.rotationContainer.css("transform", rotate3d);
    }

    super.update();
  }

  public destroy() {
    this.rotationContainer.remove();
    this.self.remove();

    super.destroy();
  }

  protected onDarknessUpdate(darkness: number): void {
    this.texture.css("filter", `brightness(${darkness})`);
  }
}

export default Sprite;
