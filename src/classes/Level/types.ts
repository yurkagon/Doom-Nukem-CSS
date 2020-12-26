import { ICollisionMap } from "classes/LevelMap";

export type LevelName = "level_1";

export interface MapConfig {
  data: ICollisionMap;
}

export interface LevelConfig {
  start?: () => void;
  update?: () => void;
  map: MapConfig;
}
