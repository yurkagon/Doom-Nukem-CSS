abstract class GameObject {
  constructor() {
    if (this.start) {
      this.start();
    }
  }
  abstract start(): void
  abstract update(): void
}

export default GameObject;
