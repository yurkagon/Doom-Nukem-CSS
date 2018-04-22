class Item {
	constructor(type, x, z) {
		this.selfCont = $('<div/>').addClass("sprite-cont");
		this.self = $('<div/>').addClass("item " + type);

		this.translate3d = `translate3d(${x}px, 350px, ${z}px)`;
		this.rotate3d = '';
		this.self.css('transform', this.translate3d);

		$('.items').append(this.selfCont);
		this.selfCont.append(this.self);

		this.position = {x, z};

		this._picked = false;
	}

	Update(degree, plPos) {
		const { position } = this;

		this.translate3d = `translate3d(${position.x}px, 350px, ${position.z}px)`;
		this.rotate3d = `rotate3d(0, 1, 0, ${-degree}deg)`;

		this.selfCont.css('transform', this.translate3d)
		this.self.css('transform',this.rotate3d);

		const distance = Distance(plPos, this.getPosition());

		if (distance < 150) this.pickItem();
	}
	getPosition() {
		return this.position;
	}
	get picked() {
		return this._picked;
	}
	
	pickItem() {
		this._picked = true;
		this.self.remove();
		this.selfCont.remove();
		takeWeapon.load();
		takeWeapon.play();
	}
}