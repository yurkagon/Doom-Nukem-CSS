import { observable, action } from "mobx";

class LoadingState {
  @observable
  public percent = 0;

  @observable
  public currentLoadedItem = "";

  @action
  public setState(percent: number, currentLoadedItem: string = "") {
    this.percent = percent;
    this.currentLoadedItem = currentLoadedItem;
  }
}

export default LoadingState;
