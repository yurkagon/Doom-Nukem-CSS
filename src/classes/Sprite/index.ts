import $ from "jquery";

import GameObject from "../GameObject/index";
import Player from "../Player/Player";

import { generetaTranslate3d } from "../../helpers";
import { iSpriteConfig } from "../../types";

class Sprite extends GameObject {
  private static readonly spritesElement: JQuery = $(".sprites");

  protected readonly self: JQuery = $("<div/>");
  private readonly selfContainer: JQuery = $("<div/>").addClass("sprite-cont");

  constructor(config: iSpriteConfig) {
    super(config.position);
    const { type, position, classType = "" } = config;

    this.self.addClass(`sprite ${classType} ${type}`);
    this.self.css("transform", generetaTranslate3d(position));
    this.selfContainer.append(this.self);
    Sprite.spritesElement.append(this.selfContainer);
  }

  start() {
    console.log("Sprite is created");
  }

  update() {
    const player = Player.getInstance();

    const translate3d = generetaTranslate3d(this.getPosition());
    const rotate3d = `rotate3d(0, 1, 0, ${-player.rotation.y}deg)`;

    this.selfContainer.css("transform", translate3d);
    this.self.css("transform", rotate3d);
  }

  destroy() {
    this.self.remove();
    this.selfContainer.remove();

    super.destroy();
  }
}

export default Sprite;
