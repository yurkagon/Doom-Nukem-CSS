import PlayerController from './PlayerController';


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
    console.log('Player has been created');
  };

  start() {

  }

  update() {

  }
}

export default Player;
