import Sprite from '../index';
import { Distance } from '../../../helpers';
import { takeWeapon, itemPickUp, medkitVoice } from '../../../variables/sounds';

class Item extends Sprite {
	constructor(type, x, z) {
		super(type, x, 350, z, 'item');
	}

	Update(degree, plPos) {
		super.Update(degree);

		const distance = Distance(plPos, this.getPosition());

		if (distance < 150) this.pickItem();
	}

	pickItem() {
		this.self.remove();
		this.selfCont.remove();
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
