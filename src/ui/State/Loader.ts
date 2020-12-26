import { observable, action } from "mobx";
import ResourceLoader from "../../utils/ResourceLoader";

class Loader {
  @observable public isLoading = false;

  @observable public percent = 0;
  @observable public currentLoadedItem = "";
  @observable public buttonFunction: () => void;

  @action
  public setState(percent: number, currentLoadedItem: string = "") {
    this.percent = percent;
    this.currentLoadedItem = currentLoadedItem;
  }

  @action
  public setLoadingStatus(status: boolean) {
    this.isLoading = status;
  }

  public async loadResources(
    data: { images: string[]; sounds: string[] },
    callback?: () => void
  ) {
    this.setLoadingStatus(true);

    await ResourceLoader.load({
      ...data,
      onUpdate: (name, progress) => {
        this.setState(Number(progress), name);
      }
    });

    callback && callback();
    this.setLoadingStatus(false);
  }
}

export default Loader;
