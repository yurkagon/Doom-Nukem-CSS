import { WallTexturesData } from "./types";

const stoneTextureBrightnessValue = -60;
const woodTextureBrightnessValue = -37;
const brickTextureBrightnessValue = -45;
const prisonTextureBrightnessValue = -60;

const textureData: WallTexturesData = {
  "#": {
    name: "default",
    original: require("./textures/gray.png").default,
    darker: null,
    brightnessValue: -30
  },
  s: {
    name: "stone",
    original: require("./textures/stone-1.png").default,
    darker: null,
    brightnessValue: stoneTextureBrightnessValue
  },
  sf: {
    name: "stone-face",
    original: require("./textures/stone-2.jpg").default,
    darker: null,
    brightnessValue: stoneTextureBrightnessValue
  },
  sn: {
    name: "stone-nameplate",
    original: require("./textures/stone-3.jpg").default,
    darker: null,
    brightnessValue: stoneTextureBrightnessValue
  },
  se: {
    name: "stone-eagle",
    original: require("./textures/stone-4.jpg").default,
    darker: null,
    brightnessValue: stoneTextureBrightnessValue
  },
  sl: {
    name: "stone-logo",
    original: require("./textures/stone-5.jpg").default,
    darker: null,
    brightnessValue: stoneTextureBrightnessValue
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
    darker: null,
    brightnessValue: woodTextureBrightnessValue
  },
  we: {
    name: "wood-eagle",
    original: require("./textures/wood-2.jpg").default,
    darker: null,
    brightnessValue: woodTextureBrightnessValue
  },
  wf: {
    name: "wood-face",
    original: require("./textures/wood-3.jpg").default,
    darker: null,
    brightnessValue: woodTextureBrightnessValue
  },
  wl: {
    name: "wood-logo",
    original: require("./textures/wood-4.jpg").default,
    darker: null,
    brightnessValue: woodTextureBrightnessValue
  },
  b: {
    name: "brick",
    original: require("./textures/brick-1.jpg").default,
    darker: null,
    brightnessValue: brickTextureBrightnessValue
  },
  bl: {
    name: "brick-logo",
    original: require("./textures/brick-2.jpg").default,
    darker: null,
    brightnessValue: brickTextureBrightnessValue
  },
  p: {
    name: "prison-wall",
    original: require("./textures/prison-1.jpg").default,
    darker: null,
    brightnessValue: prisonTextureBrightnessValue
  },
  pn: {
    name: "prison-nameplate",
    original: require("./textures/prison-3.jpg").default,
    darker: null,
    brightnessValue: prisonTextureBrightnessValue
  },
  pb: {
    name: "prison-bars",
    original: require("./textures/prison-2.jpg").default,
    darker: null,
    brightnessValue: prisonTextureBrightnessValue
  }
};

export default textureData;
