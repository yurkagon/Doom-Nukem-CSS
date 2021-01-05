import { ResourcesData } from "State";

import { doom_e1m1Url } from "sounds/music/doom_e1m1";
import { medkitVoiceUrl } from "sounds/voice/medkitVoice";

const preloadData: ResourcesData = {
  images: [
    "img/floor/1.jpg",
    "img/walls/gray.png",
    "img/models/house/sidingTexture.jpg",
    "img/models/house/Front.png",
    "img/models/house/Side.png"
  ],
  sounds: ["sounds/start.wav", medkitVoiceUrl, doom_e1m1Url]
};

export default preloadData;
