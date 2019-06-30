import Sprite from '../index';
import Player from '../../Player/Player';
import { Distance } from '../../../helpers';
import { takeWeapon, itemPickUp, medkitVoice } from '../../../variables/sounds';

class Item extends Sprite {
	constructor(type, x, z) {
		super(type, x, 350, z, 'item');
	}

	update() {
    super.update();
    const player = Player.getInstance();

		const distance = Distance(player.getPosition(), this.getPosition());

		if (distance < 150) this.pickItem();
	}

	pickItem() {
		this.self.remove();
		this.selfContainer.remove();
    itemActions(this._type);
    this.isRemoved = true;
	}
}

function itemActions(type) {
	switch(type) {
		case 'shotgun':
			takeWeapon.load();
			takeWeapon.play();
			break;
		case 'medkit':
			itemPickUp.play();
			setTimeout(() => medkitVoice.play(), 100);
			break;
	}
}

export default Item;
