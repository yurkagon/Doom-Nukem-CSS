import Player from "./classes/Player/Player";
import LevelMap from "classes/LevelMap";

interface IPosition {
  x: number;
  y?: number;
  z?: number;
}

interface iSceneConfig {
  player: Player;
  start?(): void;
  update?(): void;
  levelMap: LevelMap;
}

interface iSpriteConfig {
  type: string;
  classType: string;
  position?: IPosition;
}
