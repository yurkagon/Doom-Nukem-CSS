export interface IPosition {
  x: number;
  y?: number;
  z?: number;
}

export interface iSpriteConfig {
  type: string;
  classType: string;
  position?: IPosition;
}
