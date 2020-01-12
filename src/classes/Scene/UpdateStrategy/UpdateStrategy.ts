abstract class UpdateStrategy {
  protected callback: () => void;
  protected interval: number;

  public abstract runUpdating(callback: () => void, interval: number);

  // public abstract stop();
}

export default UpdateStrategy;
