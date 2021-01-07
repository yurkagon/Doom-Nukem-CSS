export type Cell =
  | " "
  | "#"
  | "s"
  | "sf"
  | "sn"
  | "se"
  | "sl"
  | "so"
  | "m1"
  | "m2"
  | "w"
  | "we"
  | "wf"
  | "wl"
  | "b"
  | "p"
  | "pn"
  | "pb";

export type CellMap = Cell[][];

export type CellInfo = {
  current: Cell;
  front: Cell;
  right: Cell;
  left: Cell;
  back: Cell;
};
