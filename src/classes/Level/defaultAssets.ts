import { ResourcesData } from "State";

import shotgun from "ui/screens/Game/Weapon/weapon_styles/shotgun.png";
import pistol from "ui/screens/Game/Weapon/weapon_styles/pistol.png";
import guard from "enemies/Guard/guard.png";
import zombie from "enemies/Zombie/zombie.png";
import medkitItem from "items/MedkitItem/medkit.png";
import shotgunItem from "items/ShotgunItem/shotgun.png";
import pistolItem from "items/PistolItem/pistol.png";
import hudFace from "ui/screens/Game/HUD/HealthBar/Face/face.png";

import grayWall from "classes/Wall/textures/gray.png";

import { step1Url, step2Url, step3Url } from "sounds/player/steps";
import { pistol_shot_url } from "sounds/weapons/pistol_shot";
import { shotgun_shot_url } from "sounds/weapons/shotgun_shot";
import { itemPickUpUrl } from "sounds/items/itemPickup";
import { weaponPickupUrl } from "sounds/items/weaponPickup";

const data: ResourcesData = {
  images: [
    shotgun,
    pistol,
    guard,
    zombie,
    medkitItem,
    shotgunItem,
    pistolItem,
    hudFace,
    grayWall
  ],
  sounds: [
    itemPickUpUrl,
    weaponPickupUrl,
    pistol_shot_url,
    shotgun_shot_url,
    step1Url,
    step2Url,
    step3Url
  ]
};

export default data;
