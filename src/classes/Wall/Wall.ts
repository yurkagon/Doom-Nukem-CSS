import $ from "jquery";
import { iPosition } from "../../types";
import GameObjectLOD from "../GameObjectLOD";

import "./style.scss";
import { generetaTranslate3d } from "../../helpers";
import Player from "../Player/Player";
import GameObject from "../GameObject";

const angles = require("angles");

class Wall extends GameObjectLOD {
  private static readonly container = $(".level");
  private readonly element: JQuery = $("<div/>").addClass("wall");

  private rotation: number;

  private firstPoint: iPosition;
  private secondPoint: iPosition;

  a = 0;

  constructor(position?: iPosition, rotation: number = 0) {
    super(position);

    this.rotation = rotation;
    this.element.css(
      "transform",
      `rotateY(${rotation + "deg"}) ${generetaTranslate3d(
        this.position
      )} scale3d(40, 1, 1)`
    );

    const rad = angles.toRad(rotation);

    this.secondPoint = {
      z: 2000 * Math.sin(rad),
      x: 2000 * Math.cos(rad)
    };

    this.firstPoint = {
      z: -2000 * Math.sin(rad),
      x: -2000 * Math.cos(rad)
    };
  }

  start() {
    Wall.container.append(this.element);
    super.start();
  }
}

export default Wall;
