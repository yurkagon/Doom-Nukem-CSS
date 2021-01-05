import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

import UserInterface from "./UserInterface";

import preloadData from "./preloadData";

class UI {
  private static readonly root = $("#ui").get(0);

  public static readonly preloadData = preloadData;

  public static init() {
    ReactDOM.render(<UserInterface />, this.root);
  }
}

export default UI;
