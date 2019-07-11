import $ from "jquery";
import GameObject from "../GameObject/index";
import Player from "../Player/Player";
import { Distance } from "../../helpers";

import { isAngleBetween } from '../../helpers/angle';

const angles = require("angles");

abstract class GameObjectLOD extends GameObject {
  protected fov = 100;
  protected VISIBILITY_DISTANCE = 4000;
  protected self: JQuery = $("<div/>");

  protected isActive: boolean = true;
  protected isVisible: boolean = true;

  private static readonly SKIP_RENDER = 100;
  private renderCount = GameObjectLOD.SKIP_RENDER;

  start() {
    this.isActive = true;
    this.isVisible = true;
  }

  update() {
    this.renderCount++;
    if (GameObjectLOD.SKIP_RENDER >= this.renderCount) return;
    this.renderCount = 0;

    const player = Player.getInstance();
    const distance = Distance(player.getPosition(), this.getPosition());

    const isTooLongDistance = distance > this.VISIBILITY_DISTANCE;
    const isCurrentlyVisible = !isTooLongDistance && this.isVisibleByPlayer();

    // if (isTooLongDistance) {
    //   this.setActiveStatus(false);
    // } else {
    //   this.setActiveStatus(true);
    // }

    this.setVisibleStatus(isCurrentlyVisible);
  }

  private isVisibleByPlayer(): boolean {
    const player = Player.getInstance();

    const playerPos = player.getPosition();
    const thisPos = this.getPosition();

    const dx = playerPos.x - thisPos.x;
    const dz = thisPos.z - playerPos.z;

    const angle = angles.normalize((Math.atan2(dz, dx) * 180) / Math.PI);
    const playerViewAngle = angles.normalize(-player.rotation.y - 90);

    const playerViewLeft = playerViewAngle - this.fov / 2;
    const playerViewRight = playerViewAngle + this.fov / 2;

    return isAngleBetween(angle, playerViewLeft, playerViewRight);
  }

  private setActiveStatus(status: boolean): void {
    this.isActive = status;
    this.setVisibleStatus(status);
  }

  private setVisibleStatus(status: boolean): void {
    this.self.css("display", status ? "block" : "none");
    this.isVisible = status;
  }
}

export default GameObjectLOD;
