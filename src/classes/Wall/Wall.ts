import _ from "lodash";

import { CellInfo, Cell } from "classes/MapHandler";
import Model from "classes/Model";

import data from "./data";

import { WallTexturesData } from "./types";

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

  private static textureMap: WallTexturesData = {
    "#": {
      name: "default",
      original: require("./textures/gray.png"),
      darker: null
    },
    s: {
      name: "stone",
      original: require("./textures/gray.png"),
      darker: null
    },
    sf: {
      name: "stone-face",
      original: require("./textures/gray.png"),
      darker: null
    },
    sn: {
      name: "stone-nameplate",
      original: require("./textures/gray.png"),
      darker: null
    },
    se: {
      name: "stone-eagle",
      original: require("./textures/gray.png"),
      darker: null
    },
    sl: {
      name: "stone-logo",
      original: require("./textures/gray.png"),
      darker: null
    },
    so: {
      name: "stone-old",
      original: require("./textures/gray.png"),
      darker: null
    },
    m1: {
      name: "metal_1",
      original: require("./textures/gray.png"),
      darker: null
    },
    m2: {
      name: "metal_2",
      original: require("./textures/gray.png"),
      darker: null
    },
    w: {
      name: "wood",
      original: require("./textures/gray.png"),
      darker: null
    },
    we: {
      name: "wood-eagle",
      original: require("./textures/gray.png"),
      darker: null
    },
    wf: {
      name: "wood-face",
      original: require("./textures/gray.png"),
      darker: null
    },
    wl: {
      name: "wood-logo",
      original: require("./textures/gray.png"),
      darker: null
    },
    b: {
      name: "brick",
      original: require("./textures/gray.png"),
      darker: null
    },
    bl: {
      name: "brick-logo",
      original: require("./textures/gray.png"),
      darker: null
    },
    p: {
      name: "prison-wall",
      original: require("./textures/gray.png"),
      darker: null
    },
    pn: {
      name: "prison-nameplate",
      original: require("./textures/gray.png"),
      darker: null
    },
    pb: {
      name: "prison-bars",
      original: require("./textures/gray.png"),
      darker: null
    }
  };

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

    const name = Wall.textureMap[char].name;

    return `face-texture__${name}`;
  }

  protected onDarknessUpdate(darkness: number): void {
    const faces = this.getFaces();

    console.log(faces);

    faces.css("background-color", `rgba(0, 0, 0, ${1 - darkness})`);
  }
}

export default Wall;
