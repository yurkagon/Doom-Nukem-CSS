import State from "State";
import Sound from "classes/Sound";

class BackgroundMusic {
  private static currentMusic: HTMLAudioElement = null;

  private constructor() {}

  public static play(music: Sound) {
    if (!State.settings.backgroundMusic) return;

    const audio = music.play({ loop: true });

    this.currentMusic = audio;
  }

  public static stop() {
    if (this.currentMusic) {
      this.currentMusic.pause();

      this.currentMusic = null;
    }
  }
}

export default BackgroundMusic;
