import { observable, action } from "mobx";

import PlayerController from "./PlayerController";
import Inventory from "./Inventory";

class Player extends PlayerController {
  @observable public hp = 40;

  public readonly inventory: Inventory = new Inventory();

  private constructor() {
    super();
  }

  @action
  public addHP(value: number) {
    const godMode = true;
    if (godMode) return;

    let result = this.hp + value;

    if (result > 100) {
      result = 100;
    } else if (result < 0) {
      result = 0;
    }

    this.hp = result;

    if (this.hp <= 0) this.onDie();
  }

  update() {
    if (this.hp <= 0 && this.position.y >= -100) this.position.y -= 2;

    super.update();
  }

  protected onShot() {
    if (!this.allowMovement) return;

    this.inventory.weapon.shot();
  }

  private onDie() {
    this.allowMovement = false;
  }

  private static instance: Player;
  public static getInstance(): Player {
    if (Player.instance) {
      return Player.instance;
    } else {
      Player.instance = new Player();

      return Player.instance;
    }
  }
}

export default Player;
