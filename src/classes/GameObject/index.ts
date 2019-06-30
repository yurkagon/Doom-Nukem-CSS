abstract class GameObject {
  static readonly defaultPosition: iPosition = {
    x: 0,
    y: 0,
    z: 0
  };

  protected position: iPosition;

  constructor(position: iPosition = GameObject.defaultPosition) {
    this.position = position;

    if (this.start) {
      this.start();
    }
  }
  abstract start(): void
  abstract update(): void

  getPosition() {
		return this.position;
	}
}

export default GameObject;
