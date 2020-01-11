import PlayerController from "./PlayerController";

class Player extends PlayerController {
  private static instance: Player;
  public static getInstance(): Player {
    if (Player.instance) {
      return Player.instance;
    } else {
      Player.instance = new Player();

      return Player.instance;
    }
  }

  private constructor() {
    super();
    const data = JSON.parse(localStorage.getItem("player-position"));
    console.log(data);
    if (data) {
      this.position = data.position;
      this.position.y = 0;
      this.origin = data.origin;
      this.rotation = data.rotation;
    }

    setInterval(this.savePosition, 5000);
  }

  start() {
    super.start();
  }

  update() {
    super.update();
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
}

export default Player;
