import State, { Screen } from "State";
import Scene from "classes/Scene";
import Player from "classes/Player";
import LevelMap from "classes/LevelMap";
import SkyBox from "classes/SkyBox";

import { LevelName, LevelConfig } from "./types";

import testWeaponUpdater from "testWeaponUpdater";

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
          name: "Initialization scene",
          method: () => {
            scene.init({
              player,
              ...config,
              update() {
                testWeaponUpdater();

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
