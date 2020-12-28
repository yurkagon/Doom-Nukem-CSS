import $ from "jquery";

class Control {
  public readonly MOUSE_SENSITIVITY = 1.5;
  public readonly ROTATION_SPEED = 2;

  public moveState = {
    toForward: false,
    toBack: false,
    toLeft: false,
    toRight: false,
    rotateLeft: false,
    rotateRight: false
  };

  public mouseRotateDelta: number = 0;
  private prevMousePosition: Position = {
    x: 0,
    y: 0
  };

  private mouseCallback: (value: number) => void;
  private shotCallback: () => void;

  public constructor() {
    this.attachMouseMove();
    this.attachShot();
    this.attachKeyDown();
    this.attachKeyUp();
  }

  public setMouseCallback(callback: (value: number) => void) {
    this.mouseCallback = callback;
  }

  public setShotCallback(callback: () => void) {
    this.shotCallback = callback;
  }

  private attachKeyDown(): void {
    $("body").keydown((e: JQuery.KeyDownEvent) => {
      const { keyCode } = e;

      if (keyCode == 37 || keyCode == 65) this.moveState.toLeft = true;
      if (keyCode == 39 || keyCode == 68) this.moveState.toRight = true;
      if (keyCode == 38 || keyCode == 87) this.moveState.toForward = true;
      if (keyCode == 40 || keyCode == 83) this.moveState.toBack = true;

      if (keyCode == 81) this.moveState.rotateLeft = true;
      if (keyCode == 69) this.moveState.rotateRight = true;
    });
  }
  private attachKeyUp(): void {
    $("body").keyup((e: JQuery.KeyUpEvent) => {
      const { keyCode } = e;

      if (keyCode == 37 || keyCode == 65) this.moveState.toLeft = false;
      if (keyCode == 39 || keyCode == 68) this.moveState.toRight = false;
      if (keyCode == 38 || keyCode == 87) this.moveState.toForward = false;
      if (keyCode == 40 || keyCode == 83) this.moveState.toBack = false;

      if (keyCode == 81) this.moveState.rotateLeft = false;
      if (keyCode == 69) this.moveState.rotateRight = false;
    });
  }

  private attachMouseMove(): void {
    $(document).bind("mousemove", event => {
      if (!this.mouseCallback) return;

      const { MOUSE_SENSITIVITY, ROTATION_SPEED } = this;

      const mousePosition: Position = {
        x: event.pageX,
        y: event.pageY
      };

      const delta = this.prevMousePosition.x - mousePosition.x;

      if (Math.abs(delta) < 50) {
        const valueToRotate = (delta * MOUSE_SENSITIVITY * ROTATION_SPEED) / 20;
        this.mouseCallback(valueToRotate);
      }

      this.prevMousePosition = mousePosition;
    });
  }

  private attachShot(): void {
    $("body").click(() => {
      if (!this.shotCallback) return;

      this.shotCallback();
    });
  }

  public isMoving(): boolean {
    const { toForward, toBack, toLeft, toRight } = this.moveState;

    const forwardAndBackTogether = toForward && toBack;
    const leftAndRightTogether = toLeft && toRight;

    if (forwardAndBackTogether || leftAndRightTogether) {
      return false;
    }

    return toForward || toBack || toLeft || toRight;
  }
}

export default Control;
