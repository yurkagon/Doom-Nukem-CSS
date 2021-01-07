import $ from "jquery";
import Player from "classes/Player";
import GameObject from "classes/GameObject";

import { Distance } from "helpers";

abstract class GameObjectLOD extends GameObject {
  protected self: JQuery = $("<div/>");

  protected fov = 90;
  protected VISIBILITY_DISTANCE = 4000;
  private MIN_VISIBILITY_DISTANCE = 1000;
  protected VISION_CHECKING = true;

  protected isActive: boolean = true;
  protected isVisible: boolean = true;

  private static readonly SKIP_RENDER = 100;
  private renderCount = GameObjectLOD.SKIP_RENDER;

  private distanceToPlayer: number;

  private darknessLevel: number;

  public start() {
    this.isActive = true;
    this.isVisible = true;
  }

  public update() {
    this.darknessLevelUpdater();

    this.renderCount++;
    if (GameObjectLOD.SKIP_RENDER >= this.renderCount) return;
    this.renderCount = 0;

    this.visionStatusUpdater();
  }

  public active(): boolean {
    return this.isActive;
  }

  public getDistanceToPlayer(): number {
    return this.distanceToPlayer;
  }

  private darknessLevelUpdater(): void {
    if (!this.isActive) return;

    const distance = Distance(
      Player.getInstance().getPosition(),
      this.position
    );

    const darknessDistance = this.VISIBILITY_DISTANCE / 2;

    const darkness = (() => {
      const value = +((darknessDistance - distance) / darknessDistance).toFixed(
        2
      );

      return value >= 0 ? value : 0;
    })();

    if (this.darknessLevel !== darkness) {
      this.onDarknessUpdate(darkness);
      this.darknessLevel = darkness;
    }
  }

  protected onDarknessUpdate(darkness: number) {}

  private visionStatusUpdater(): void {
    const player = Player.getInstance();
    const distance = Distance(player.getPosition(), this.getPosition());

    this.distanceToPlayer = distance;

    const isClose = distance < this.MIN_VISIBILITY_DISTANCE;
    const shouldBeActive = distance < this.VISIBILITY_DISTANCE;

    const shouldBeVisible =
      isClose || (shouldBeActive && this.isVisibleByPlayer());

    this.setStatus(shouldBeActive, shouldBeVisible);
  }

  private isVisibleByPlayer(): boolean {
    if (!this.VISION_CHECKING) return true;

    const player = Player.getInstance();

    return player.isObjectVisibleFromFov(this, this.fov);
  }

  private setStatus(shouldActive: boolean, shouldVisible: boolean): void {
    if (shouldActive && !this.isActive) {
      this.isActive = true;
    } else if (!shouldActive && this.isActive) {
      this.isActive = false;
    }
    if (shouldVisible && !this.isVisible) {
      this.isVisible = true;
      this.self.css("visibility", "inherit");
    } else if (!shouldVisible && this.isVisible) {
      this.isVisible = false;
      this.self.css("visibility", "hidden");
    }
  }
}

export default GameObjectLOD;
