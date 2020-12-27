import UI from "./ui";
import State, { Screen } from "./State";

import "../style/index.scss";

(async () => {
  UI.init();

  // if (process.env.NODE_ENV === "production") {
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
      "sounds/menu/menu_click.wav",
      "sounds/music/main_theme.mp3"
    ]
  });
  // }

  State.setScreen(Screen.menu);
})();
