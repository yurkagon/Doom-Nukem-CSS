import Player from "classes/Player";
import LevelMap from "classes/LevelMap";

export interface SceneConfig {
  player: Player;
  start?(): void;
  update?(): void;
  levelMap: LevelMap;
}
