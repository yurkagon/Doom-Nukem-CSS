import $ from "jquery";
import GameObject from "../GameObject/index";
import Player from "../Player/Player";
import { Distance } from "../../helpers";
const angles = require('angles');
// import angles from 'angles';

abstract class GameObjectLOD extends GameObject {
  protected VISIBILITY_DISTANCE = 4000;
  protected self: JQuery = $("<div/>");

  protected isActive: boolean = true;
  protected isVisible: boolean = true;

  private static readonly SKIP_RENDER = 50;
  private renderCount = GameObjectLOD.SKIP_RENDER;

  start() {
    this.isActive = true;
  }

  update() {
    this.renderCount++;
    if (GameObjectLOD.SKIP_RENDER >= this.renderCount) return;
    this.renderCount = 0;

    const player = Player.getInstance();

    const distance = Distance(player.getPosition(), this.getPosition());

    if (this.isVisibleByPlayer()) {
      this.setActiveStatus(true);
    } else {
      this.setActiveStatus(false);
    }

    // if (this.isActive && distance > this.VISIBILITY_DISTANCE) {
    //   this.setActiveStatus(false);
    // } else if (!this.isActive && distance < this.VISIBILITY_DISTANCE) {
    //   this.setActiveStatus(true);
    // }
////////

  }

  private isVisibleByPlayer() {
    const fov = 100;
    const player = Player.getInstance();

    const playerPos = player.getPosition();
    const thisPos = this.getPosition();

    const dx = playerPos.x - thisPos.x;
    const dz = thisPos.z - playerPos.z;

    const angle = angles.normalize(Math.atan2(dz, dx) * 180 / Math.PI);
    const playerViewAngle = angles.normalize(-player.rotation.y - 90);
    console.clear();
    console.log(angle, playerViewAngle)
    const playerViewLeft = angles.normalize(playerViewAngle - fov / 2);
    const playerViewRight = angles.normalize(playerViewAngle + fov / 2);

    return playerViewLeft < angle && playerViewRight > angle;
  }

  private setActiveStatus(status: boolean): void {
    this.self.css("display", status ? "block" : "none");
    this.isActive = status;
  }
}

export default GameObjectLOD;
