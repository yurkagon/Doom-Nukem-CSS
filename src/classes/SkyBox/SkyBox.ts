import GameObject from "classes/GameObject";
import Player from "classes/Player";

import { SkyboxConfig } from "./types";

class SkyBox extends GameObject {
  private player: Player;

  private rotatingMultiplier: number;
  private url: string;
  private positionY: number;
  private size: string;

  constructor(props: SkyboxConfig) {
    super();

    this.rotatingMultiplier = props.rotatingMultiplier || -15;
    this.url = props.url;
    this.positionY = props.positionY;
    this.size = props.size;
  }

  start() {
    this.player = Player.getInstance();

    this.player.camera.css("background-image", `url(${this.url})`);

    if (this.size) {
      this.player.camera.css("background-size", this.size);
    }

    this.update();
  }

  update() {
    const { camera, rotation } = this.player;

    const positionX = this.rotatingMultiplier * rotation.y;

    camera.css("background-position", `${positionX}px ${this.positionY}px`);
  }
}

export default SkyBox;
