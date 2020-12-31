import State, { Screen } from "State";

import sleep from "utils/sleep";

import Scene from "classes/Scene";
import Player from "classes/Player";
import LevelMap from "classes/LevelMap";
import SkyBox from "classes/SkyBox";
import BackgroundMusic from "classes/BackgroundMusic";

import UiWeapon from "ui/screens/Game/Weapon";

import defaultAssets from "./defaultAssets";

import { LevelName, LevelConfig } from "./types";

class Level {
  private constructor() {}

  public static load(levelName: LevelName) {
    const levelData = require(`../../levels/${levelName}`).default;

    this.initLevel(levelData);
  }

  private static async initLevel(config: LevelConfig) {
    State.setScreen(Screen.loading);

    const scene = Scene.getInstance();
    const player = Player.getInstance();

    State.loader.addLoadedItem("Initialization resources");

    await State.loader.loadResources({
      ...config.preloadData,
      images: [...defaultAssets.images, ...config.preloadData.images],
      sounds: [...defaultAssets.images, ...config.preloadData.sounds],
      operations: [
        {
          name: "Camera enabled",
          method: () => {
            player.camera.css("display", "block");
          }
        },
        {
          name: "Load skybox",
          method: () => {
            if (config.skybox) {
              new SkyBox(config.skybox);
            }
          }
        },
        {
          name: "Disabled background music",
          method: () => {
            BackgroundMusic.stop();
          }
        },
        {
          name: "Background music executing",
          method: () => {
            if (!config.music) return;

            sleep(1000).then(() => {
              BackgroundMusic.play(config.music);
            });
          }
        },
        {
          name: "Initialization scene",
          method: () => {
            scene.init({
              player,
              ...config,
              update() {
                UiWeapon.weaponBouncingUpdater();

                config.update && config.update();
              },
              levelMap: new LevelMap(config.map.data)
            });
          }
        },
        ...(config.preloadData.operations || [])
      ]
    });

    State.setScreen(Screen.game);
  }
}

export default Level;
