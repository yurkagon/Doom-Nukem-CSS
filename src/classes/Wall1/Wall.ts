import $ from "jquery";

import { generateTranslate3d } from "helpers";

import GameObject from "../GameObject";

import "./style.scss";

interface IWallConfig {
  position?: Position;
  rotation?: number;
  scale?: number;
  css?: {
    [key: string]: string;
  };
}

class Wall extends GameObject {
  private static readonly container = $(".level");
  private readonly element: JQuery = $("<div/>").addClass("wall-old");

  constructor({ position, rotation = 0, scale = 150 }: IWallConfig = {}) {
    super(position);

    this.element.css(
      "transform",
      `rotateY(${rotation + "deg"}) ${generateTranslate3d(
        this.position
      )} scale3d(${scale}, 1, 1)`
    );

    this.element.css("width", `200px`);
  }

  start() {
    Wall.container.append(this.element);
  }

  update() {}
}

export default Wall;
