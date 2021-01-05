import { ResourcesData } from "State";

import { menu_click_url } from "sound/data/menu/menu_click";
import { duke_theme_url } from "sound/data/menu/menu_music";
import { start_menu_url } from "sound/data/menu/start_menu";

const preloadData: ResourcesData = {
  images: [
    "img/icon.png",
    "img/splash.png",
    "img/menu/background.png",
    "img/background.jpg",
    "img/hud/font.png"
  ],
  sounds: [start_menu_url, menu_click_url, duke_theme_url]
};

export default preloadData;
