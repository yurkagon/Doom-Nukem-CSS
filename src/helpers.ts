import { iPosition } from "./types";

export const Distance = (p1: iPosition, p2: iPosition): number => {
  return Math.sqrt((p2.x - p1.x)**2 + (p2.z - p1.z)**2)
};

export const generateCoordDiff = value => ({
  x: value * Math.random() * ((Math.random() * 2) > 1 ? 1 : -1),
  z: value * Math.random() * ((Math.random() * 2) > 1 ? 1 : -1)
});

export const generetaTranslate3d = (position: iPosition): string => {
  const { x, y, z } = position;

  return `translate3d(${x}px, ${y}px, ${z}px)`;
}
