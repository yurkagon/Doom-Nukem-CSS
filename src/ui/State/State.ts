import { observable, action } from "mobx";

import LoadingState from "./LoadingState";

import { Screen } from "./types";

class State {
  @observable
  public screen = Screen.loading;

  public loadingState = new LoadingState();

  @action
  public setScreen(screen: Screen) {
    this.screen = screen;
  }
}

export default State;
