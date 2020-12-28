import { observable, action } from "mobx";

import Loader from "./Loader";

import { Screen } from "./types";

class State {
  @observable
  public screen = Screen.loading;

  public loader = new Loader();

  @action
  public setScreen(screen: Screen) {
    this.screen = screen;
  }
}

export default State;
