class Angle {
  public static normalize(angle: number): number {
    const range = 360;

    return ((angle % range) + range) % range;
  }

  public static normalize180(angle: number): number {
    const range = 180;

    return ((angle % range) + range) % range;
  }

  public static isAngleBetween(
    mid: number,
    start: number,
    end: number
  ): boolean {
    end = end - start < 0 ? end - start + 360 : end - start;
    mid = mid - start < 0 ? mid - start + 360 : mid - start;
    return mid < end;
  }

  public static toRad = (degrees: number) => (degrees * Math.PI) / 180;

  public static toDeg = (radians: number) => (radians * 180) / Math.PI;

  public static getAngleBetween(pos1: Position, pos2: Position) {
    const dx = pos1.x - pos2.x;
    const dz = pos2.z - pos1.z;

    const angle = this.normalize((Math.atan2(dz, dx) * 180) / Math.PI);

    return angle;
  }
}

export default Angle;
