import State, { Screen } from "State";
import Level from "classes/Level";
import UI from "ui";

import "../style/index.scss";

(async () => {
  UI.init();

  if (State.settings.skipMenuOnLoad) return Level.load("level_1");

  State.setScreen(Screen.loading);

  await State.loader.loadResources({
    images: [
      "img/icon.png",
      "img/splash.png",
      "img/menu/background.png",
      "img/background.jpg",
      "img/hud/font.png"
    ],
    sounds: [
      "sounds/menu/start_menu.flac",
      "sounds/weapons/pistol.wav",
      "sounds/music/main_theme.mp3"
    ]
  });

  State.setScreen(Screen.menu);
})();
