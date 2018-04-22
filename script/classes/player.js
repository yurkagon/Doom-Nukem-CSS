class Player {
	constructor() {

		this.position = {
			x: 0,
			y: 0,
			z: 0,
		};
		this.rotation = {
			x: 0,
			y: 0,
		},
		this.origin = {
			x: 0,
			y: 0,
		}
		this._camera = $('#camera');
	}
	get camera() {
		// camera is a static DIV. All 3d operations are inside
		return this._camera;
	}
	moveForward() {
		const { position, rotation } = this;
		position.x -= Math.sin(rotation.y * Math.PI / 180) * PLAYER_MOVE_SPEED;
		position.z += Math.cos(rotation.y * Math.PI / 180) * PLAYER_MOVE_SPEED;
	}
	moveBack() {
		const { position, rotation } = this;
		position.x += Math.sin(rotation.y * Math.PI / 180) * PLAYER_MOVE_SPEED;
		position.z -= Math.cos(rotation.y * Math.PI / 180) * PLAYER_MOVE_SPEED;
	}
	moveLeft() {
		const { position, rotation } = this;
		position.x -= Math.sin((rotation.y-90) * Math.PI / 180) * PLAYER_MOVE_SPEED;
		position.z += Math.cos((rotation.y-90) * Math.PI / 180) * PLAYER_MOVE_SPEED;
	}
	moveRight() {
		const { position, rotation } = this;
		position.x -= Math.sin((rotation.y+90) * Math.PI / 180) * PLAYER_MOVE_SPEED;
		position.z += Math.cos((rotation.y+90) * Math.PI / 180) * PLAYER_MOVE_SPEED;
	}
}