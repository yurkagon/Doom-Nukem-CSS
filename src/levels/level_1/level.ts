import { LevelConfig } from "classes/Level";
import { doom_e1m1 } from "sound";

import House from "prefabs/models/House";

import Guard from "enemies/Guard";

import map from "./map";
import preloadData from "./preloadData";

const data: LevelConfig = {
  start() {
    setLevel();
  },
  map: {
    data: map
  },
  skybox: {
    url: "img/skybox.jpg",
    rotatingMultiplier: -15,
    positionY: -5,
    size: "60%"
  },
  preloadData,
  music: doom_e1m1,
  playerStartPosition: {
    data: { x: 427.26237372717844, z: 1879.027509262054 },
    rotation: 30
  }
};

const setLevel = () => {
  // new House({
  //   position: {
  //     x: 0,
  //     y: 493,
  //     z: -3000
  //   }
  // });

  for (let i = 0; i < 3; i++)
    new Guard({
      position: { x: -709.4456751799761, z: -3231.267917978993 }
    });
};

export default data;
