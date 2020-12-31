import { observable, action } from "mobx";
import Settings from "classes/Settings";

import Loader from "./Loader";

import { Screen } from "./types";

class State {
  public readonly settings: Settings = new Settings();

  @observable public screen = Screen.loading;

  public loader = new Loader();

  @action
  public setScreen(screen: Screen) {
    this.screen = screen;
  }
}

export default State;
