import { observable } from "mobx";
import { LevelName } from "classes/Level";

class Settings {
  public productionMode = false;

  @observable public wall_shadow = true;
  @observable public backgroundMusic = true;

  @observable public noclip: boolean = true;
  @observable public godmode: boolean = true;
  @observable public infinite_ammo = true;
  @observable public enemy_ai: boolean = true;

  public skipMenuOnLoad: boolean = true;
  public developmentAutoLoadLevel: LevelName = "level_2";
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
