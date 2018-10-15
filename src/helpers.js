export const Distance = (p1, p2) => Math.sqrt((p2.x - p1.x)**2 + (p2.z - p1.z)**2);

export const generateCoordDiff = value => ({
  x: value * Math.random() * ((Math.random() * 2) > 1 ? 1 : -1),
  z: value * Math.random() * ((Math.random() * 2) > 1 ? 1 : -1)
});
