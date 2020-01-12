import PlayerController from "./PlayerController";
import { observable, action } from "mobx";

class Player extends PlayerController {
  @observable public hp = 100;

  private constructor() {
    super();
    const data = JSON.parse(localStorage.getItem("player-position"));

    if (data) {
      this.position = data.position;
      this.position.y = 0;
      this.origin = data.origin;
      this.rotation = data.rotation;
    }

    setInterval(this.savePosition, 5000);

    (window as any).player = this;
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

    if (this.hp === 0) this.onDie();
  }

  private onDie() {
    console.log("dead");
  }

  public savePosition = () => {
    localStorage.setItem(
      "player-position",
      JSON.stringify({
        position: this.position,
        origin: this.origin,
        rotation: this.rotation
      })
    );
  };

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
