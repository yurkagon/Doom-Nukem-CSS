import Sound from "classes/Sound";

import duke_theme_url from "../music/duke_theme.mp3";

const sound = new Sound(duke_theme_url, 0.3);

export { sound as default, duke_theme_url };
