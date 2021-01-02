import { observable } from "mobx";

class Settings {
  @observable public enemy_ai: boolean = true;

  @observable public noclip: boolean = false;
  @observable public godmode: boolean = true;

  @observable public backgroundMusic = false;

  public skipMenuOnLoad: boolean = true;
  public positionDebugger: boolean = false;

  public savePosition: boolean = true;

  public productionMode = false;

  constructor() {
    const isProduction =
      process.env.NODE_ENV === "production" || this.productionMode;

    if (isProduction) {
      this.skipMenuOnLoad = false;
      this.godmode = false;
      this.noclip = false;
      this.enemy_ai = true;
      this.backgroundMusic = true;
      this.savePosition = false;
      this.productionMode = true;
      this.positionDebugger = false;
    }
  }
}

export default Settings;
