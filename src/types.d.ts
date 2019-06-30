import Player from "./classes/Player/Player";

interface iPosition {
  x: number;
  y?: number;
  z?: number;
}

interface iSceneConfig {
  player: Player;
  start?(): void;
  update?(): void;
}
