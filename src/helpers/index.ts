import { IPosition } from "../types";

export const Distance = (p1: IPosition, p2: IPosition): number => {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.z - p1.z) ** 2);
};

export const generateCoordDiff = value => ({
  x: value * Math.random() * (Math.random() * 2 > 1 ? 1 : -1),
  z: value * Math.random() * (Math.random() * 2 > 1 ? 1 : -1)
});

export const generateTranslate3d = (position: IPosition): string => {
  const { x, y, z } = position;

  return `translate3d(${x}px, ${y}px, ${z}px)`;
};

export const chance = value => ({
  to: callback => {
    if (Math.random() < value) return callback();
  }
});
