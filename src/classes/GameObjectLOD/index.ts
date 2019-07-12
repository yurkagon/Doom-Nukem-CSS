import $ from "jquery";
import GameObject from "../GameObject/index";
import Player from "../Player/Player";
import { Distance } from "../../helpers";

import { isAngleBetween, normalize } from "../../helpers/angle";

const angles = require("angles");

abstract class GameObjectLOD extends GameObject {
  protected self: JQuery = $("<div/>");

  protected fov = 90;
  protected VISIBILITY_DISTANCE = 4000;
  private MIN_VISIBILITY_DISTANCE = 1000;
  protected VISION_CHECKING = true;

  protected isActive: boolean = true;
  protected isVisible: boolean = true;

  private static readonly SKIP_RENDER = 10;
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

    const isClose = distance < this.MIN_VISIBILITY_DISTANCE;
    const shouldBeActive = distance < this.VISIBILITY_DISTANCE;

    const shouldBeVisible =
      ( isClose ||
      shouldBeActive) && this.isVisibleByPlayer();

    this.setStatus(shouldBeActive, shouldBeVisible);
  }

  private isVisibleByPlayer(): boolean {
    if (!this.VISION_CHECKING) return true;

    const player = Player.getInstance();

    return player.isObjectVisibleFromFov(this, this.fov);
  }

  private setStatus(shouldActive, shouldVisible): void {
    if (shouldActive && !this.isActive) {
      this.isActive = true;
    } else if (!shouldActive && this.isActive) {
      this.isActive = false;
    }
    if (shouldVisible && !this.isVisible) {
      this.isVisible = true;
      this.self.css("display", "block");
    } else if (!shouldVisible && this.isVisible) {
      this.isVisible = false;
      this.self.css("display", "none");
    }
  }

  // private setVisibleStatus(status: boolean): void {
  //   this.self.css("display", status ? "block" : "none");
  //   this.isVisible = status;
  // }
}

export default GameObjectLOD;
