import { ResourcesData } from "State";

import { doom_e1m1Url } from "sound/data/music/doom_e1m1";
import { medkitVoiceUrl } from "sound/data/voice/medkitVoice";

const preloadData: ResourcesData = {
  images: [
    "img/skybox.jpg",
    "img/floor/1.jpg",
    "img/walls/gray.png",
    "img/models/house/sidingTexture.jpg",
    "img/models/house/Front.png",
    "img/models/house/Side.png"
  ],
  sounds: ["sounds/start.wav", medkitVoiceUrl, doom_e1m1Url]
};

export default preloadData;
