import { ResourcesData } from "State";

import houseSidingTexture from "models/House/textures/sidingTexture.jpg";
import houseFrontTexture from "models/House/textures/Front.png";
import houseSideTexture from "models/House/textures/Side.png";

import { doom_e1m1Url } from "sounds/music/doom_e1m1";
import { medkitVoiceUrl } from "sounds/voice/medkitVoice";

const preloadData: ResourcesData = {
  images: [houseSidingTexture, houseFrontTexture, houseSideTexture],
  sounds: ["sounds/start.wav", medkitVoiceUrl, doom_e1m1Url]
};

export default preloadData;
