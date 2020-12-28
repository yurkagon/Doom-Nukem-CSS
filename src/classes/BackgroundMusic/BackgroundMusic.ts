import Sound from "sound";

class BackgroundMusic {
  private static currentMusic: HTMLAudioElement = null;

  private constructor() {}

  public static play(music: Sound) {
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
