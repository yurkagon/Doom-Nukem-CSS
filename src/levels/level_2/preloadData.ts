import { ResourcesData } from "State";

import houseSidingTexture from "models/House/textures/sidingTexture.jpg";
import houseFrontTexture from "models/House/textures/Front.png";
import houseSideTexture from "models/House/textures/Side.png";

import { dark_theme } from "sounds/music/dark_theme";
import { medkitVoiceUrl } from "sounds/voice/medkitVoice";

const preloadData: ResourcesData = {
  images: [houseSidingTexture, houseFrontTexture, houseSideTexture],
  sounds: [medkitVoiceUrl, dark_theme]
};

export default preloadData;
