import Weapon from "./Weapon";

export type WeaponType = "shotgun" | "pistol";

export type WeaponsData = {
  [K in WeaponType]: Weapon;
};
