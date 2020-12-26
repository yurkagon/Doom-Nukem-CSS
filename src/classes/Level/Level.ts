import Scene from "classes/Scene";
import Player from "classes/Player";
import LevelMap from "classes/LevelMap";

// import testWeaponUpdater from "testWeaponUpdater";

import { LevelName, LevelConfig } from "./types";

import testWeaponUpdater from "testWeaponUpdater";

class Level {
  private constructor() {}

  public static load(levelName: LevelName) {
    const levelData = require(`../../levels/${levelName}`).default;

    this.initLevel(levelData);
  }

  private static initLevel(config: LevelConfig) {
    const scene = Scene.getInstance();
    const player = Player.getInstance();

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
}

export default Level;
