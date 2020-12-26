import UI from "./ui";
import State, { Screen } from "./ui/State";

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
      "img/hud/font.png"
    ],
    sounds: ["sounds/menu/start_menu.flac"]
  });
  // }

  State.setScreen(Screen.menu);
})();
