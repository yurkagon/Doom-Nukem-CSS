import Weapon, { WeaponType } from "./Weapon";

export type WeaponsData = {
  [K in WeaponType]: Weapon;
};
