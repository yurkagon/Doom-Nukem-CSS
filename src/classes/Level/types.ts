import Sound from "classes/Sound";

import { CellMap } from "classes/MapHandler";
import { SkyboxConfig } from "classes/SkyBox";
import { ResourcesData } from "State";

export type LevelName = "level_1";

export interface MapConfig {
  data: CellMap;
}

export interface LevelConfig {
  start?: () => void;
  update?: () => void;
  map: MapConfig;
  skybox?: SkyboxConfig;
  preloadData: ResourcesData;
  music?: Sound;
  playerStartPosition: {
    data: Position;
    rotation?: number;
  };
}
