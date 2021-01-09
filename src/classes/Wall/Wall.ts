import _ from "lodash";

import { CellInfo, Cell } from "classes/MapHandler";
import Model from "classes/Model";

import data from "./data";

import { WallTexturesData, TextureData } from "./types";

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
      original: require("./textures/gray.png").default,
      darker: null
    },
    s: {
      name: "stone",
      original: require("./textures/stone-1.png").default,
      darker: null
    },
    sf: {
      name: "stone-face",
      original: require("./textures/stone-2.jpg").default,
      darker: null
    },
    sn: {
      name: "stone-nameplate",
      original: require("./textures/stone-3.jpg").default,
      darker: null
    },
    se: {
      name: "stone-eagle",
      original: require("./textures/stone-4.jpg").default,
      darker: null
    },
    sl: {
      name: "stone-logo",
      original: require("./textures/stone-5.jpg").default,
      darker: null
    },
    so: {
      name: "stone-old",
      original: require("./textures/stone-6.jpg").default,
      darker: null
    },
    m1: {
      name: "metal_1",
      original: require("./textures/metal-1.jpg").default,
      darker: null
    },
    m2: {
      name: "metal_2",
      original: require("./textures/metal-2.jpg").default,
      darker: null
    },
    w: {
      name: "wood",
      original: require("./textures/wood-1.jpg").default,
      darker: null
    },
    we: {
      name: "wood-eagle",
      original: require("./textures/wood-2.jpg").default,
      darker: null
    },
    wf: {
      name: "wood-face",
      original: require("./textures/wood-3.jpg").default,
      darker: null
    },
    wl: {
      name: "wood-logo",
      original: require("./textures/wood-4.jpg").default,
      darker: null
    },
    b: {
      name: "brick",
      original: require("./textures/brick-1.jpg").default,
      darker: null
    },
    bl: {
      name: "brick-logo",
      original: require("./textures/brick-2.jpg").default,
      darker: null
    },
    p: {
      name: "prison-wall",
      original: require("./textures/prison-1.jpg").default,
      darker: null
    },
    pn: {
      name: "prison-nameplate",
      original: require("./textures/prison-3.jpg").default,
      darker: null
    },
    pb: {
      name: "prison-bars",
      original: require("./textures/prison-2.jpg").default,
      darker: null
    }
  };

  private static brightnessValue: number = -50;

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

    const textureData = this.getTextureData(this.sides);
    this.self.find(".wall__face").addClass(`face-texture__${textureData.name}`);

    if (textureData.darker) {
      this.self
        .find(".wall__face--left")
        .css("background-image", `url(${textureData.darker})`);
      this.self
        .find(".wall__face--back")
        .css("background-image", `url(${textureData.darker})`);
    }
  }

  private getFaces() {
    if (!this.faces) {
      this.faces = this.self.find(".wall__face");
    }

    return this.faces;
  }

  private getTextureData(cellInfo: CellInfo): TextureData {
    const char = cellInfo.current;

    return Wall.textureMap[char];
  }

  protected onDarknessUpdate(darkness: number): void {
    const faces = this.getFaces();

    console.log(faces);

    faces.css("background-color", `rgba(0, 0, 0, ${1 - darkness})`);
  }

  public static async generateTextures(): Promise<void> {
    const module = await import("utils/ImageProcessor");
    const ImageProcessor = module.default;

    await Promise.all(
      _.map(this.textureMap, async (el, cell: Cell) => {
        const url = await ImageProcessor.applyBrightness(
          el.original,
          this.brightnessValue
        );

        this.textureMap[cell].darker = url;
      })
    );
  }
}

export default Wall;
