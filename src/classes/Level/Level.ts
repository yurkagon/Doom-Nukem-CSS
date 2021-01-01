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

  public static async load(levelName: LevelName) {
    const scene = Scene.getInstance();
    const player = Player.getInstance();

    State.setScreen(Screen.loading);

    State.loader.addLoadedItem(`Load chunks for ${levelName}`);
    const config = await this.loadLevelData(levelName);
    State.loader.addLoadedItem(`Chunks loaded`);

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
              start() {
                player.setPosition(
                  config.playerStartPosition.data,
                  config.playerStartPosition.rotation
                );

                config.start && config.start();
              },
              update() {
                UiWeapon.weaponBouncingUpdater();

                if (State.settings.positionDebugger) {
                  console.log(player.getPosition());
                }

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

  private static async loadLevelData(
    levelName: LevelName
  ): Promise<LevelConfig> {
    const module = await import(`../../levels/${levelName}`);

    return module.default;
  }
}

export default Level;
