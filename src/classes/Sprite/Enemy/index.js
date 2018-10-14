import Sprite from '../index';

class Enemy extends Sprite {
	constructor(type, x, z, y=200) {
		super(type, x, y, z, 'enemy');
	}
}

export default Enemy;
