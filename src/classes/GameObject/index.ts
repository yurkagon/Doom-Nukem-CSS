import Player from '../player';

abstract class GameObject {
  protected position: iPosition;

  constructor(position: iPosition) {
    this.position = position;

    if (this.start) {
      this.start();
    }
  }
  abstract start(): void
  abstract update(player: Player): void

  getPosition() {
		return this.position;
	}
}

export default GameObject;
