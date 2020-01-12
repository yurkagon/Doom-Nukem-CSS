abstract class UpdateStrategy {
  protected callback: () => void;
  protected interval: number;

  public setUpdater(callback: () => void, interval: number): void {
    this.callback = callback;
    this.interval = interval;
  }

  public abstract run();
  public abstract stop();
}

export default UpdateStrategy;
