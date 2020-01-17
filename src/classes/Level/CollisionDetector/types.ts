export type ICell = " " | "#";

export enum ICollisionType {
  vertical = "vertical",
  horizontal = "horizontal"
}

export type ICollisionMap = ICell[][];
