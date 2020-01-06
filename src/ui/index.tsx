import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

import UserInterface from "./UserInterface";

class UI {
  private static readonly root = $("#ui").get(0);

  public static init() {
    ReactDOM.render(<UserInterface />, this.root);
  }
}

export default UI;
