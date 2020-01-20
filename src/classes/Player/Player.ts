import PlayerController from "./PlayerController";
import { observable, action } from "mobx";

class Player extends PlayerController {
  @observable public hp = 30;

  private constructor() {
    super();
  }

  @action
  public addHP(value: number) {
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
