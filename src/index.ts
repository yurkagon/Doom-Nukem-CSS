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

import ResourceLoader from "./ResourceLoader";
import AppLoader from "./AppLoader";

const player = Player.getInstance();
const scene = Scene.getInstance();

const weapon = $(".testWeapon");

(async () => {
  AppLoader.show();
  await ResourceLoader.load({
    images: [
      "img/skybox.jpg",
      "img/background.jpg",
      "img/glass.png",
      "img/icon.png",
      "img/wall.jpg",
      "img/weapon.png",
      "img/splash.png",
      "img/enemy/guard.png",
      "img/items/medkit.png",
      "img/items/shotgun.png",
      "img/grass.jpg",
      "img/models/house/sidingTexture.jpg",
      "img/models/house/Front.png",
      "img/models/house/Side.png"
    ],
    sounds: [
      "sounds/start.wav",
      "sounds/main_theme.mp3",
      "sounds/voice/medkit.wav",
      "sounds/items/itemPickUp.wav",
      "sounds/items/pickWeapon.wav"
    ],
    onUpdate: (name, progress) => {
      AppLoader.set(+progress, name);
    }
  });
  // AppLoader.hide();

  console.log("loaded");

  new ShotgunItem({
    x: 1000,
    z: 1000
  });

  scene.init({
    player,
    start() {
      new SkyBox();

      setLevel();

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
})();

const setLevel = () => {
  for (let i = 0; i < 5; i++)
    new House({
      position: {
        x: 110 * i * 20 - 5000,
        y: 493,
        z: -3000
      }
    });

  for (let i = 0; i < 30; i++)
    new Enemy({
      type: "guard",
      position: {
        x: 1000 + i * 100,
        z: 1000 + i * 100
      }
    });
};
