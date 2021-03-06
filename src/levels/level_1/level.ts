import { LevelConfig } from "classes/Level";

import { generateCoordinateNoiseValue } from "helpers";

import House from "models/House";

import Guard from "enemies/Guard";
import Zombie from "enemies/Zombie";
import MedkitItem from "items/MedkitItem";
import ShotgunItem from "items/ShotgunItem";

import doom_e1m1 from "sounds/music/doom_e1m1";

import skybox from "./skybox.jpg";
import floor from "./floor.jpg";

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
    url: skybox,
    rotatingMultiplier: -15,
    positionY: -5,
    size: "60%"
  },
  floor: {
    url: floor
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

  new ShotgunItem({ x: -1558.681641589877, z: -3363.771691838703 });

  new MedkitItem({ x: -709.4456751799761, z: -3231.267917978993 });

  for (let i = 0; i < 3; i++) {
    const noisePosition = generateCoordinateNoiseValue(500);
    new Guard({
      position: {
        x: -709.4456751799761 + noisePosition.x,
        z: -3231.267917978993 + noisePosition.z
      }
    });
  }

  for (let i = 0; i < 10; i++) {
    const noisePosition = generateCoordinateNoiseValue(500);
    new Guard({
      position: {
        x: -3402.1376817627192 + noisePosition.x,
        z: -3528.3517358205772 + noisePosition.z
      }
    });
  }

  for (let i = 0; i < 4; i++) {
    const noisePosition = generateCoordinateNoiseValue(500);
    new Zombie({
      position: {
        x: -3402.1376817627192 + noisePosition.x,
        z: -3528.3517358205772 + noisePosition.z
      }
    });
  }

  new Guard({ position: { x: -3447.3057917891865, z: -1352.1616926411084 } });
  new Guard({ position: { x: -3778.7432811592416, z: -89.1741625587174 } });
};

export default data;
