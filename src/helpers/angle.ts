export const isAngleBetween = (mid, start, end): boolean => {
  end = end - start < 0 ? end - start + 360 : end - start;
  mid = mid - start < 0 ? mid - start + 360 : mid - start;
  return mid < end;
};

export const normalize = (angle: number): number => {
  const range = 360;

  return ((angle % range) + range) % range;
};
