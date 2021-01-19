import State, { Screen } from "State";
import _ from "lodash";

import sleep from "utils/sleep";

import Scene from "classes/Scene";
import Player from "classes/Player";
import LevelMap from "classes/LevelMap";
import SkyBox from "classes/SkyBox";
import BackgroundMusic from "classes/BackgroundMusic";
import Surface from "classes/Surface";
import Wall from "classes/Wall";

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

    State.nightmode = Boolean(config.nightmode);

    await State.loader.loadResources({
      ...config.preloadData,
      images: _.compact([
        ...defaultAssets.images,
        ...config.preloadData.images,
        config?.skybox?.url,
        config?.floor?.url
      ]),
      sounds: _.compact([
        ...defaultAssets.sounds,
        ...config.preloadData.sounds
      ]),
      operations: _.compact([
        State.settings.wall_shadow && {
          name: "Generating textures",
          method: () => Wall.generateTextures()
        },
        {
          name: "Camera enabled",
          method: () => {
            player.camera.css("display", "block");
          }
        },
        config.skybox && {
          name: "Load skybox",
          method: () => {
            new SkyBox(config.skybox);
          }
        },
        config.floor && {
          name: "Load surfaces",
          method: () => {
            Surface.setFloor(config.floor.url);
          }
        },
        {
          name: "Disabled background music",
          method: () => {
            BackgroundMusic.stop();
          }
        },
        config.music && {
          name: "Background music executing",
          method: () => {
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
                if (!State.settings.savePosition) {
                  player.setPosition(
                    config.playerStartPosition.data,
                    config.playerStartPosition.rotation
                  );
                }

                config.start && config.start();
              },
              update() {
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
      ])
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
