import _ from "lodash";

import { Cell, CellInfo } from "classes/MapHandler";
import Model from "classes/Model";

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
