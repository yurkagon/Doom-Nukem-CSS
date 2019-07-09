import $ from "jquery";
import "../style/index.scss";

import Scene from "./classes/Scene/Scene";
import Player from "./classes/Player/Player";

import Enemy from "./classes/Sprite/Enemy/Enemy";

import { mainThemeMusic, startPhrase } from "./variables/sounds";
import SkyBox from "./classes/SkyBox/SkyBox";
import MedkitItem from "./classes/Sprite/Item/MedkitItem";
import ShotgunItem from "./classes/Sprite/Item/ShotgunItem";
import House from "./classes/Model/House";

const player = Player.getInstance();
const scene = Scene.getInstance();

const weapon = $(".testWeapon");

scene.init({
  player,
  start() {
    new SkyBox();

    new MedkitItem({
      x: 250,
      z: 600
    });
    new ShotgunItem({
      x: 250,
      z: 900
    });

    for (let i = 0; i < 10; i++) {
      new House({
        position: {
          x: 110 * i * 10,
          y: 493,
          z: 3000
        }
      });
    }

    for (let i = 0; i < 10; i++) {
      new Enemy({
        type: "guard",
        position: {
          x: 1000,
          z: 1000
        }
      });
    }

    setTimeout(() => {
      mainThemeMusic.play();
      startPhrase.play();
    }, 1000);
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
