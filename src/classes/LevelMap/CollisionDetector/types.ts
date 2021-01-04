export type Cell = " " | "#";

export enum CollisionType {
  vertical = "vertical",
  horizontal = "horizontal"
}

export type ICollisionMap = Cell[][];

export type CellInfo = {
  current: Cell;
  front: Cell;
  right: Cell;
  left: Cell;
  back: Cell;
};
