import { SoundConfig } from "./types";

class Sound {
  private url: string;
  private defaultVolume: number;

  constructor(url: string, defaultVolume: number = 1) {
    this.url = url;
    this.defaultVolume = defaultVolume;
  }

  public play(config: SoundConfig = {}) {
    const { volume, loop } = config;

    const audio = new Audio(this.url);

    audio.volume = typeof volume === "undefined" ? this.defaultVolume : volume;

    audio.loop = loop;

    audio.play();

    return audio;
  }
}

export default Sound;
