import UpdateStrategy from "./UpdateStrategy";

class IntervalStrategy extends UpdateStrategy {
  private timerId: NodeJS.Timeout;

  public run() {
    this.timerId = setInterval(this.callback, this.interval);
  }
}

export default IntervalStrategy;
