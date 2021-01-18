import _ from "lodash";

import State from "State";

import { CellInfo, Cell } from "classes/MapHandler";
import Model from "classes/Model";

import data from "./data";

import { WallTexturesData, TextureData } from "./types";

import textureData from "./textureData";

import "./style.scss";

class Wall extends Model {
  private sides: CellInfo;
  private faces: JQuery<HTMLElement>;

  protected readonly VISIBILITY_DISTANCE = 8000;
  protected VISION_CHECKING = false;
  protected positionCorrector: Position = {
    x: 129,
    z: 500,
    y: 190
  };

  private static textureMap: WallTexturesData = textureData;
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

    if (textureData.darker && State.settings.wall_shadow) {
      this.self
        .find(".wall__face--right")
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

    faces.css("background-color", `rgba(0, 0, 0, ${1 - darkness})`);
  }

  public static async generateTextures(): Promise<void> {
    const module = await import("utils/ImageProcessor");
    const ImageProcessor = module.default;

    await Promise.all(
      _.map(this.textureMap, async (el, cell: Cell) => {
        const url = await ImageProcessor.applyBrightness(
          el.original,
          el.brightnessValue || this.brightnessValue
        );

        this.textureMap[cell].darker = url;
      })
    );
  }
}

export default Wall;
