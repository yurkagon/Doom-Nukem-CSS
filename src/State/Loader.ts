import { observable, action } from "mobx";
import ResourceLoader from "../utils/ResourceLoader";

import { ResourcesData } from "./types";

class Loader {
  @observable public isLoading = false;

  @observable public loadedItems: string[] = [];

  @action
  public addLoadedItem(loadedItem: string) {
    this.loadedItems.unshift(loadedItem);
  }

  @action
  public setLoadingStatus(status: boolean) {
    this.isLoading = status;
  }

  public async loadResources(data: ResourcesData, callback?: () => void) {
    this.setLoadingStatus(true);

    await ResourceLoader.load({
      ...data,
      onUpdate: name => {
        this.addLoadedItem(name);
      }
    });

    callback && callback();
    this.setLoadingStatus(false);
  }
}

export default Loader;
