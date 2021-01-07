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
import stone6Texture from "classes/Wall/textures/stone-6.jpg";
import metal1Texture from "classes/Wall/textures/metal-1.jpg";
import metal2Texture from "classes/Wall/textures/metal-2.jpg";
import wood1Texture from "classes/Wall/textures/wood-1.jpg";
import wood2Texture from "classes/Wall/textures/wood-2.jpg";
import wood3Texture from "classes/Wall/textures/wood-3.jpg";
import wood4Texture from "classes/Wall/textures/wood-4.jpg";
import brick1Texture from "classes/Wall/textures/brick-1.jpg";
import brick2Texture from "classes/Wall/textures/brick-2.jpg";
import prison1Texture from "classes/Wall/textures/prison-1.jpg";
import prison2Texture from "classes/Wall/textures/prison-2.jpg";
import prison3Texture from "classes/Wall/textures/prison-3.jpg";

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
    stone6Texture,
    metal1Texture,
    metal2Texture,
    wood1Texture,
    wood2Texture,
    wood3Texture,
    wood4Texture,
    brick1Texture,
    brick2Texture,
    prison1Texture,
    prison2Texture,
    prison3Texture
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
