export type ICell = " " | "#";

export enum ICollisionType {
  vertical = "vertical",
  horizontal = "horizontal"
}

export type ICollisionMap = ICell[][];

export type ICellInfo = {
  current: ICell;
  front: ICell;
  right: ICell;
  left: ICell;
  back: ICell;
};
