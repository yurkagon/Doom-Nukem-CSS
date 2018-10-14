import $ from "jquery";

class Sprite {
  isRemoved = false;

	constructor(type, x, y, z, classType = '') {
		this.selfCont = $('<div/>').addClass('sprite-cont');
		this.self = $('<div/>').addClass(`sprite ${classType} ${type}`);

		this.translate3d = `translate3d(${x}px, ${y}px, ${z}px)`;
		this.rotate3d = '';
		this.self.css('transform', this.translate3d);

		$('.sprites').append(this.selfCont);
		this.selfCont.append(this.self);

    this.position = {x, y, z};
    this._type = type;
	}

	Update(degree) {
		const { position } = this;

		this.translate3d = `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`;
		this.rotate3d = `rotate3d(0, 1, 0, ${-degree}deg)`;

		this.selfCont.css('transform', this.translate3d)
		this.self.css('transform',this.rotate3d);
	}
	getPosition() {
		return this.position;
	}
}

export default Sprite;
