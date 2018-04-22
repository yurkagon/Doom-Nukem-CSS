class Item {
	constructor(type, x, z) {
		this.self = $('<div/>').addClass("item " + type);
		this.translate3d = `translate3d(${x}px, 350px, ${z}px)`;
		this.rotate3d = '';
		this.self.css('transform',this.rotate3d + this.translate3d);
		$('.items').append(this.self);

		this.position = {
			x, z,
		}
	}

	Update(degree) {
		const { position, origin } = this;

		const angle = ((-degree % 360) / 360) * 2 * Math.PI;
		const originX = -Math.sin(angle) * FOV;
		const originZ = -(FOV - Math.cos(angle) * FOV);

		this.translate3d = `translate3d(${position.x + originX}px, 350px, ${position.z + originZ}px)`;
		this.rotate3d = `rotate3d(0, 1, 0, ${-degree}deg)`;
		this.self.css('transform',this.rotate3d + this.translate3d);
	}
}