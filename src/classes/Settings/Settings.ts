import { observable } from "mobx";

class Settings {
  public productionMode = false;

  @observable public enemy_ai: boolean = false;

  @observable public noclip: boolean = false;
  @observable public godmode: boolean = true;

  @observable public backgroundMusic = false;

  public infinite_ammo = true;

  public skipMenuOnLoad: boolean = true;
  public positionDebugger: boolean = false;

  public savePosition: boolean = true;

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
      this.infinite_ammo = false;
    }
  }
}

export default Settings;
