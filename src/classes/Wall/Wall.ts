import $ from "jquery";
import { iPosition } from "../../types";
import GameObjectLOD from "../GameObjectLOD";
import { generateTranslate3d } from "../../helpers";

import "./style.scss";

class Wall extends GameObjectLOD {
  private static readonly container = $(".level");
  private readonly element: JQuery = $("<div/>").addClass("wall");

  constructor(position?: iPosition, rotation: number = 0) {
    super(position);

    this.element.css(
      "transform",
      `rotateY(${rotation + "deg"}) ${generateTranslate3d(
        this.position
      )} scale3d(40, 1, 1)`
    );
  }

  start() {
    Wall.container.append(this.element);
    super.start();
  }
}

export default Wall;
