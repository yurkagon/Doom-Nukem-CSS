import $ from "jquery";

class Sprite {
	constructor(type, x, z) {
		this.selfCont = $('<div/>').addClass("sprite-cont");
		this.self = $('<div/>').addClass("item " + type);

		this.translate3d = `translate3d(${x}px, 350px, ${z}px)`;
		this.rotate3d = '';
		this.self.css('transform', this.translate3d);

		$('.sprites').append(this.selfCont);
		this.selfCont.append(this.self);

        this.position = {x, z};
        this._type = type;
	}

	Update(degree) {
		const { position } = this;

		this.translate3d = `translate3d(${position.x}px, 350px, ${position.z}px)`;
		this.rotate3d = `rotate3d(0, 1, 0, ${-degree}deg)`;

		this.selfCont.css('transform', this.translate3d)
		this.self.css('transform',this.rotate3d);
	}
	getPosition() {
		return this.position;
	}
}

export default Sprite;
