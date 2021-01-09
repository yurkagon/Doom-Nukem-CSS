import $ from "jquery";

import Player from "classes/Player";
import GameObjectLOD from "classes/GameObjectLOD";

import { generateTranslate3d } from "helpers";

import { SpriteConfig } from "./types";

import "./style.scss";

class Sprite extends GameObjectLOD {
  private static readonly spriteElementList: JQuery = $(".sprites");

  protected readonly spriteElement: JQuery = $("<div/>");
  readonly self: JQuery = $("<div/>").addClass("sprite-cont");

  private config: SpriteConfig;

  constructor(config: SpriteConfig) {
    super(config.position);

    this.config = config;
  }

  public start() {
    const { type, position, classType = "" } = this.config;

    this.spriteElement.addClass(`sprite ${classType} ${type}`);
    this.spriteElement.css("transform", generateTranslate3d(position));
    this.self.append(this.spriteElement);
    Sprite.spriteElementList.append(this.self);

    super.start();
  }

  public update() {
    if (this.isActive) {
      const player = Player.getInstance();

      const translate3d = generateTranslate3d(this.getPosition());
      const rotate3d = `rotate3d(0, 1, 0, ${-player.rotation.y}deg)`;

      this.self.css("transform", translate3d);
      this.spriteElement.css("transform", rotate3d);
    }

    super.update();
  }

  public destroy() {
    this.spriteElement.remove();
    this.self.remove();

    super.destroy();
  }

  protected onDarknessUpdate(darkness: number): void {
    this.spriteElement.css("filter", `brightness(${darkness})`);
  }
}

export default Sprite;
