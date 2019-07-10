import $ from "jquery";

import GameObject from "../GameObject/index";
import Player from "../Player/Player";

import { generetaTranslate3d } from "../../helpers";
import { iSpriteConfig } from "../../types";

class Sprite extends GameObject {
  private static readonly spriteElementList: JQuery = $(".sprites");

  protected readonly spriteElement: JQuery = $("<div/>");
  private readonly self: JQuery = $("<div/>").addClass("sprite-cont");

  constructor(config: iSpriteConfig) {
    super(config.position);
    const { type, position, classType = "" } = config;

    this.spriteElement.addClass(`sprite ${classType} ${type}`);
    this.spriteElement.css("transform", generetaTranslate3d(position));
    this.self.append(this.spriteElement);
    Sprite.spriteElementList.append(this.self);
  }

  start() {
    console.log("Sprite is created");
  }

  update() {
    const player = Player.getInstance();

    const translate3d = generetaTranslate3d(this.getPosition());
    const rotate3d = `rotate3d(0, 1, 0, ${-player.rotation.y}deg)`;

    this.self.css("transform", translate3d);
    this.spriteElement.css("transform", rotate3d);
  }

  destroy() {
    this.spriteElement.remove();
    this.self.remove();

    super.destroy();
  }
}

export default Sprite;
