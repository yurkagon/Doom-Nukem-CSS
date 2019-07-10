import $ from "jquery";
import GameObject from "../GameObject/index";
import Player from "../Player/Player";
import { Distance } from "../../helpers";

abstract class GameObjectLOD extends GameObject {
  protected VISIBILITY_DISTANCE = 4000;
  protected self: JQuery = $("<div/>");

  protected isVisible: boolean;

  start() {
    this.isVisible = true;
  }

  update() {
    if (new Date().getTime() % 1000 < 10) return;

    const player = Player.getInstance();

    const distance = Distance(player.getPosition(), this.getPosition());

    if (this.isVisible && distance > this.VISIBILITY_DISTANCE) {
      this.setVisibility(false);
    } else if (!this.isVisible && distance < this.VISIBILITY_DISTANCE) {
      this.setVisibility(true);
    }
  }

  private setVisibility(status: boolean): void {
    this.self.css("display", status ? "block" : "none");
    this.isVisible = status;
  }
}

export default GameObjectLOD;
