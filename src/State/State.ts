import $ from "jquery";
import { observable, action } from "mobx";
import Settings from "classes/Settings";

import Loader from "./Loader";

import { Screen } from "./types";

class State {
  @observable public screen = Screen.loading;
  @observable public nightmode = false;

  public readonly settings: Settings = new Settings();
  public readonly loader: Loader = new Loader();

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
