import $ from "jquery";
import "../style/index.scss";

import Scene from "./classes/Scene/Scene";
import Player from "./classes/Player/Player";

import Enemy from "./classes/Sprite/Enemy/Enemy";

import { mainThemeMusic, startPhrase } from "./variables/sounds";
import SkyBox from "./classes/SkyBox/SkyBox";

import House from "./prefabs/models/House";
import Wall1 from "./classes/Wall1";

const player = Player.getInstance();
const scene = Scene.getInstance();

const weapon = $(".testWeapon");

// import Wall from "./classes/Wall";

export default async () => {
  setLevel();

  scene.init({
    player,
    start() {
      new SkyBox();

      // setTimeout(() => {
      //   mainThemeMusic.play();
      //   startPhrase.play();
      // }, 1000);
    },
    update() {
      if (player.isMoving()) {
        weapon
          .animate(
            {
              right: "150px",
              bottom: "-80px"
            },
            500
          )
          .animate(
            {
              right: "200px",
              bottom: 0
            },
            200
          );
      } else {
        weapon.stop();
      }
    }
  });
};

const setLevel = () => {
  initWalls();
  for (let i = 0; i < 5; i++)
    new House({
      position: {
        x: 1000 * i * 2,
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
