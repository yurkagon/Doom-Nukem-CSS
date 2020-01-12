import UpdateStrategy from "./UpdateStrategy";

class IntervalStrategy extends UpdateStrategy {
  private timerId: NodeJS.Timeout;

  public runUpdating(callback: () => void, interval: number) {
    this.callback = callback;
    this.interval = interval;

    this.timerId = setInterval(callback, interval);
  }
}

export default IntervalStrategy;
