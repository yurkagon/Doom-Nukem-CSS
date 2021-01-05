import { ResourcesData } from "State";

import { menu_click_url } from "sounds/menu/menu_click";
import { duke_theme_url } from "sounds/menu/menu_music";
import { start_menu_url } from "sounds/menu/start_menu";

const preloadData: ResourcesData = {
  images: [
    "icon.png",
    "img/splash.png",
    "img/menu/background.png",
    "img/background.jpg",
    "img/hud/font.png"
  ],
  sounds: [start_menu_url, menu_click_url, duke_theme_url]
};

export default preloadData;
