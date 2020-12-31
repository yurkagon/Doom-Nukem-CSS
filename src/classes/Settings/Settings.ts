import { observable } from "mobx";

class Settings {
  @observable public enemy_ai: boolean = true;

  @observable public noclip: boolean = false;
  @observable public godmode: boolean = true;

  private constructor() {}

  private static instance: Settings;
  public static getInstance(): Settings {
    if (Settings.instance) {
      return Settings.instance;
    } else {
      Settings.instance = new Settings();

      return Settings.instance;
    }
  }
}

export default Settings;
