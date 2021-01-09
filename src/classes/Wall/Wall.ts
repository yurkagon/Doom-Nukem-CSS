import _ from "lodash";

import { CellInfo } from "classes/MapHandler";
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
  private faces: JQuery<HTMLElement>;

  protected readonly VISIBILITY_DISTANCE = 8000;

  protected VISION_CHECKING = false;

  constructor(position: Position, sides: CellInfo) {
    super({
      name: "wall",
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

      this.self.find(`.wall__face--${key}`).remove();
    });

    this.self.find(".wall__face").addClass(this.getFaceClassName(this.sides));
  }

  private getFaces() {
    if (!this.faces) {
      this.faces = this.self.find(".wall__face");
    }

    return this.faces;
  }

  private getFaceClassName(cellInfo: CellInfo): string {
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

    return `face-texture__${name}`;
  }

  protected onDarknessUpdate(darkness: number): void {
    const faces = this.getFaces();

    console.log(faces);

    faces.css("background-color", `rgba(0, 0, 0, ${1 - darkness})`);
  }
}

export default Wall;
