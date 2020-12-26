import $ from "jquery";

import Scene from "./classes/Scene/Scene";
import Player from "./classes/Player/Player";

import Enemy from "./classes/Sprite/Enemy/Enemy";

import { mainThemeMusic, startPhrase } from "./variables/sounds";
import SkyBox from "./classes/SkyBox/SkyBox";

import House from "./prefabs/models/House";
import Wall1 from "./classes/Wall1";
import testWeaponUpdater from "./testWeaponUpdater";
import LevelMap from "classes/LevelMap";
import testMap from "classes/LevelMap/testMap";

const player = Player.getInstance();
const scene = Scene.getInstance();

// import Wall from "./classes/Wall";

export default async () => {
  setLevel();

  scene.init({
    player,
    levelMap: new LevelMap(testMap),
    start() {
      new SkyBox();

      // setTimeout(() => {
      //   mainThemeMusic.play();
      //   startPhrase.play();
      // }, 1000);
    },
    update() {
      testWeaponUpdater();
    }
  });
};

const setLevel = () => {
  initWalls();
  new House({
    position: {
      x: 0,
      y: 493,
      z: -3000
    }
  });

  for (let i = 0; i < 40; i++)
    new Enemy({
      type: "guard",
      position: {
        x: 1000 + i * 100,
        z: 1000 + i * 100
      }
    });
};

const initWalls = () => {
  new Wall1({
    position: {
      x: 0,
      z: 14150,
      y: 100
    }
  });

  new Wall1({
    position: {
      x: 0,
      z: -13950,
      y: 100
    }
  });

  new Wall1({
    position: {
      x: 830,
      z: -14004,
      y: 100
    },
    rotation: 90
  });

  new Wall1({
    position: {
      x: 830,
      z: 14100,
      y: 100
    },
    rotation: 90
  });
};
