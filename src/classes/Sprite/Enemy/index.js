import Sprite from '../index';
import { Distance } from '../../../helpers';

const LOGIC_INTERVAL = 500;


class Enemy extends Sprite {
  static LOGIC_INTERVAL = 500;
  static VISION_DISTANCE = 2500;
  static MAX_WALKING_TO_PLAYER_DISTANCE = 3100;
  static ATACK_DISTANCE = 1000;

  static states = {
    DEFAULT: 'default',
    DEAD: 'dead',
    WALK: 'walk',
    DEAD: 'dead',
    ATACK: 'atack'
  }
  currenState = null;
  timer = null;

	constructor(type, x, z, y = 200) {
    super(type, x, y, z, 'enemy');
    this.logicUpdate = this.logicUpdate.bind(this);

    this.setState(Enemy.states.DEFAULT);
    this.timer = setInterval(this.logicUpdate, Enemy.LOGIC_INTERVAL);
  }
  logicUpdate() {
    const {
      VISION_DISTANCE,
      MAX_WALKING_TO_PLAYER_DISTANCE,
      ATACK_DISTANCE,
      states
    } = Enemy;

    const distance = Distance(this.getPosition(), window.player.getPosition());

    switch(this.currenState) {
      case states.DEFAULT:
        if(distance <= ATACK_DISTANCE) {
          this.setState(states.ATACK);
        } else if(distance <= VISION_DISTANCE) {
          this.setState(states.WALK);
        }
        break;
      case states.WALK:
        if(distance <= ATACK_DISTANCE) {
          this.setState(states.ATACK);
        } else if(distance >= MAX_WALKING_TO_PLAYER_DISTANCE) {
          this.setState(states.DEFAULT);
        }
        break;
      case states.ATACK:
        if(distance >= ATACK_DISTANCE) {
          this.setState(states.WALK);
        }
      default:
        return;

    }
  }
  setState(state) {
    this.self.removeClass(this.currenState);
    this.self.addClass(state);
    this.currenState = state;
  }
}

export default Enemy;
