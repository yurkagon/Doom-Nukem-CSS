import { LevelConfig } from "classes/Level";

import House from "prefabs/models/House";
import Wall1 from "classes/Wall1";
import Enemy from "classes/Sprite/Enemy";

import map from "./map";

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
  }
};

const setLevel = () => {
  initWalls();
  // new House({
  //   position: {
  //     x: 0,
  //     y: 493,
  //     z: -3000
  //   }
  // });

  for (let i = 0; i < 40; i++)
    new Enemy({
      type: "guard",
      position: {
        x: 1000 + i * 100,
        z: 1000 + i * 100
      }
    });
};

const initWalls = () => {
  new Wall1({
    position: {
      x: 0,
      z: 14150,
      y: 100
    }
  });

  new Wall1({
    position: {
      x: 0,
      z: -13950,
      y: 100
    }
  });

  new Wall1({
    position: {
      x: 830,
      z: -14004,
      y: 100
    },
    rotation: 90
  });

  new Wall1({
    position: {
      x: 830,
      z: 14100,
      y: 100
    },
    rotation: 90
  });
};

export default data;
