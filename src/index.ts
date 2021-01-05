import State, { Screen } from "State";
import Level from "classes/Level";
import UI from "ui";

import { menu_click_url } from "sound/data/menu/menu_click";
import { duke_theme_url } from "sound/data/menu/menu_music";
import { start_menu_url } from "sound/data/menu/start_menu";

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
    sounds: [start_menu_url, menu_click_url, duke_theme_url]
  });

  State.setScreen(Screen.menu);
})();
