import { CellMap, CellInfo, Cell } from "./types";

class MapHandler {
  public cellMap: CellMap;

  constructor(map: CellMap) {
    this.cellMap = map;
  }

  public forEach(
    callback: (
      position: Position,
      cellInfo: CellInfo,
      i: number,
      k: number
    ) => void
  ): void {
    for (let i = 0; i < this.cellMap.length; i++) {
      for (let k = 0; k < this.cellMap[i].length; k++) {
        const space = this.cellMap[i][k];
        callback(
          this.getRealPositionFromLocalPosition({
            x: k,
            z: i
          }),
          {
            current: space,
            front: this.getSymbolByLocalPosition({
              x: k,
              z: i + 1
            }),
            left: this.getSymbolByLocalPosition({
              x: k - 1,
              z: i
            }),
            right: this.getSymbolByLocalPosition({
              x: k + 1,
              z: i
            }),
            back: this.getSymbolByLocalPosition({
              x: k,
              z: i - 1
            })
          },
          i,
          k
        );
      }
    }
  }

  protected getSymbolByLocalPosition(position: Position): Cell {
    try {
      return this.cellMap[position.z][position.x];
    } catch {
      return "#";
    }
  }

  protected getLocalPosition(position: Position): Position {
    const normalizedPosition = this.normalizePosition(position);

    return {
      x: Math.ceil(normalizedPosition.x - 1),
      z: Math.ceil(normalizedPosition.z - 1)
    };
  }

  protected getRealPositionFromLocalPosition(position: Position): Position {
    return {
      x: position.x * 1000 - 15000,
      z: position.z * 1000 - 15000
    };
  }

  private normalizePosition(position: Position): Position {
    return {
      x: (position.x + 15000) / 1000,
      z: (position.z + 15000) / 1000
    };
  }
}

export default MapHandler;
