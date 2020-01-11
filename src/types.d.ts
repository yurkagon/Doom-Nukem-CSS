import Player from "./classes/Player/Player";

interface IPosition {
  x: number;
  y?: number;
  z?: number;
}

interface iSceneConfig {
  player: Player;
  start?(): void;
  update?(): void;
}

interface iSpriteConfig {
  type: string;
  classType: string;
  position?: IPosition;
}
