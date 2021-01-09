import { Cell } from "classes/MapHandler";

type TextureData = {
  original: string;
  name: string;
  darker: null | string;
};

export type WallTexturesData = Partial<
  {
    [key in Cell]: TextureData;
  }
>;
