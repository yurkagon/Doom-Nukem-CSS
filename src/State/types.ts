import { Operation } from "utils/ResourceLoader";

export enum Screen {
  empty,
  loading,
  game,
  menu,
  level_select
}

export interface ResourcesData {
  images: string[];
  sounds: string[];
  operations?: Operation[];
}
