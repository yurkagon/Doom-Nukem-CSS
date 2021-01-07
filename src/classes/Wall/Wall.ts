import _ from "lodash";

import { CellInfo } from "classes/MapHandler";
import Model from "classes/Model";
import Player from "classes/Player";

import { Distance } from "helpers";

import data from "./data";

import "./style.scss";

class Wall extends Model {
  protected positionCorrector: Position = {
    x: 129,
    z: 500,
    y: 190
  };

  private sides: CellInfo;

  protected readonly VISIBILITY_DISTANCE = 8000;

  protected VISION_CHECKING = false;

  prevBrightness;
  faces;

  constructor(position: Position, sides: CellInfo) {
    super({
      name: Wall.getName(sides),
      data,
      scale: {
        x: 10,
        y: 3,
        z: 10
      },
      position: {
        ...position,
        y: 0
      }
    });

    this.sides = sides;
  }

  start() {
    super.start();

    _.forEach(this.sides, (space, key) => {
      if (space === " ") return;

      this.self.find(`.face.${key}`).remove();
    });

    this.faces = this.self.find(".face");

    this.updateBrightness();
  }

  // TODO: implement lighting
  update() {
    super.update();
    if (this.isActive) {
      this.updateBrightness();
    }
  }

  updateBrightness() {
    const distance = Distance(
      Player.getInstance().getPosition(),
      this.position
    );

    const brightDistance = this.VISIBILITY_DISTANCE / 2;

    const brightness = (() => {
      const value = +((brightDistance - distance) / brightDistance).toFixed(2);

      return value >= 0 ? value : 0;
    })();

    console.log(brightness);

    if (this.prevBrightness !== brightness) {
      this.faces.css("filter", `brightness(${brightness})`);
      this.prevBrightness = brightness;
    }
  }

  private static getName(cellInfo: CellInfo): string {
    const char = cellInfo.current;

    const name = ((): string => {
      switch (char) {
        case "#":
          return "default";
        case "s":
          return "stone";
        case "sf":
          return "stone-face";
        case "sn":
          return "stone-nameplate";
        case "se":
          return "stone-eagle";
        case "sl":
          return "stone-logo";
        case "so":
          return "stone-old";
        case "m1":
          return "metal_1";
        case "m2":
          return "metal_2";
        case "w":
          return "wood";
        case "we":
          return "wood-eagle";
        case "wf":
          return "wood-face";
        case "wl":
          return "wood-logo";
        case "b":
          return "brick";
        case "bl":
          return "brick-logo";
        case "p":
          return "prison-wall";
        case "pn":
          return "prison-nameplate";
        case "pb":
          return "prison-bars";

        default:
          return "";
      }
    })();

    return `wall ${name}`;
  }
}

export default Wall;
