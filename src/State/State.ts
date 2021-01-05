import $ from "jquery";
import { observable, action } from "mobx";
import Settings from "classes/Settings";

import Loader from "./Loader";

import { Screen } from "./types";

class State {
  public readonly settings: Settings = new Settings();

  @observable public screen = Screen.loading;

  public loader = new Loader();

  get isPointerLocked(): boolean {
    return Boolean(document.pointerLockElement);
  }

  @action
  public setScreen(screen: Screen) {
    this.screen = screen;
  }

  public lockCursor(): void {
    if (this.isPointerLocked) return;

    $(".game-ui-wrapper")
      .get(0)
      .requestPointerLock();
  }
}

export default State;
