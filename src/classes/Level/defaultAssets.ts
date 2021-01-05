import { ResourcesData } from "State";

import { step1Url, step2Url, step3Url } from "sound/data/player/steps";

import { pistol_shot_url } from "sound/data/weapons/pistol_shot";
import { shotgun_shot_url } from "sound/data/weapons/shotgun_shot";

import { itemPickUpUrl } from "sound/data/items/itemPickup";
import { weaponPickupUrl } from "sound/data/items/weaponPickup";

const data: ResourcesData = {
  images: [
    "img/weapons/shotgun.png",
    "img/weapons/pistol.png",
    "img/enemy/guard.png",
    "img/enemy/zombie.png",
    "img/items/medkit.png",
    "img/items/shotgun.png",
    "img/items/pistol.png",
    "img/hud/face.png"
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
