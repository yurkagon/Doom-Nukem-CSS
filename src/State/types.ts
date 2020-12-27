import { Operation } from "utils/ResourceLoader";

export enum Screen {
  empty,
  loading,
  game,
  menu
}

export interface ResourcesData {
  images: string[];
  sounds: string[];
  operations?: Operation[];
}
