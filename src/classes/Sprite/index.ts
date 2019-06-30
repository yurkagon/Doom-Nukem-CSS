import $ from "jquery";
import GameObject from '../GameObject';

class Sprite extends GameObject {
  isRemoved = false;

	constructor(type, x, y, z, classType = '') {
    super();

		this.selfContainer = $('<div/>').addClass('sprite-cont');
		this.self = $('<div/>').addClass(`sprite ${classType} ${type}`);

		this.translate3d = `translate3d(${x}px, ${y}px, ${z}px)`;
		this.rotate3d = '';
		this.self.css('transform', this.translate3d);

		$('.sprites').append(this.selfContainer);
		this.selfContainer.append(this.self);

    this.position = {x, y, z};
    this._type = type;
  }

  start() {
    console.log('selfCont')
  }

	Update(degree) {
		const { position } = this;

		this.translate3d = `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`;
		this.rotate3d = `rotate3d(0, 1, 0, ${-degree}deg)`;

		this.selfContainer.css('transform', this.translate3d)
		this.self.css('transform',this.rotate3d);
	}
	getPosition() {
		return this.position;
	}
}

export default Sprite;
