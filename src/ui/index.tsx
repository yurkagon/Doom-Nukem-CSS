import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

import UserInterface from "./UserInterface";

class UI {
  private static root = $("#ui");

  public static init() {
    ReactDOM.render(<UserInterface />, this.root[0]);
  }
}

export default UI;
