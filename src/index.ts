import UI from "./ui";
import State, { Screen } from "./ui/State";

(async () => {
  if (process.env.NODE_ENV === "production") {
    UI.init();
    State.setScreen(Screen.loading);

    await State.loadingState.loadResources({
      images: [
        "img/skybox.jpg",
        "img/background.jpg",
        "img/glass.png",
        "img/icon.png",
        "img/wall.jpg",
        "img/weapon.png",
        "img/splash.png",
        "img/enemy/guard.png",
        "img/items/medkit.png",
        "img/items/shotgun.png",
        "img/grass.jpg",
        "img/models/house/sidingTexture.jpg",
        "img/models/house/Front.png",
        "img/models/house/Side.png"
      ],
      sounds: [
        "sounds/start.wav",
        "sounds/main_theme.mp3",
        "sounds/voice/medkit.wav",
        "sounds/items/itemPickUp.wav",
        "sounds/items/pickWeapon.wav"
      ]
    });
  }

  require("./initScene").default();
})();
