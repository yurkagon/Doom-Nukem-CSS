export interface EnemyConfig {
  type: string;
  position: Position;
}

export enum EnemyState {
  default = "default",
  walk = "walk",
  attack = "attack",
  dead = "dead"
}
