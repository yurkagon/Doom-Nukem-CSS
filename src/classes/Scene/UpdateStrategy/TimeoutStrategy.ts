import UpdateStrategy from "./UpdateStrategy";

class TimeoutStrategy extends UpdateStrategy {
  private timerId: NodeJS.Timeout;

  public run() {
    this.timerId = setTimeout(() => {
      this.callback();

      clearTimeout(this.timerId);

      this.run();
    }, this.interval);
  }
}

export default TimeoutStrategy;
