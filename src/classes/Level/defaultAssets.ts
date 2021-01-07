import { ResourcesData } from "State";

import shotgun from "ui/screens/Game/Weapon/weapon_styles/shotgun.png";
import pistol from "ui/screens/Game/Weapon/weapon_styles/pistol.png";
import guard from "enemies/Guard/guard.png";
import zombie from "enemies/Zombie/zombie.png";
import medkitItem from "items/MedkitItem/medkit.png";
import shotgunItem from "items/ShotgunItem/shotgun.png";
import pistolItem from "items/PistolItem/pistol.png";
import hudFace from "ui/screens/Game/HUD/HealthBar/Face/face.png";

import stone1Texture from "classes/Wall/textures/stone-1.png";
import stone2Texture from "classes/Wall/textures/stone-2.jpg";
import stone3Texture from "classes/Wall/textures/stone-3.jpg";
import stone4Texture from "classes/Wall/textures/stone-4.jpg";
import stone5Texture from "classes/Wall/textures/stone-5.jpg";
import stone6Texture from "classes/Wall/textures/stone-2.jpg";

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
    grayWall,
    stone1Texture,
    stone2Texture,
    stone3Texture,
    stone4Texture,
    stone5Texture,
    stone6Texture
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
