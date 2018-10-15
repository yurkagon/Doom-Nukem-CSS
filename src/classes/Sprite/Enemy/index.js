import Sprite from '../index';

class Enemy extends Sprite {
  states = {
    DEFAULT: 'default',
    DEAD: 'dead',
    WALK: 'walk'
  }
  currenState = null;
	constructor(type, x, z, y=200) {
    super(type, x, y, z, 'enemy');
    this.setState(this.states.WALK);
  }
  setState(state) {
    this.self.removeClass(this.currenState);
    this.self.addClass(state);
    this.currenState = state;
  }
}

export default Enemy;
