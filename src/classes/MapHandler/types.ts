export type Cell = " " | "#" | "s" | "sf" | "sn" | "se" | "sl";

export type CellMap = Cell[][];

export type CellInfo = {
  current: Cell;
  front: Cell;
  right: Cell;
  left: Cell;
  back: Cell;
};
