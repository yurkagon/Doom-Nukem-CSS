import AudioLoader from "./models/AudioLoader";
import ImageLoader from "./models/ImageLoader";

class ResourceLoader {
  private static audioLoader = new AudioLoader();
  private static imageLoader = new ImageLoader();

  public static async load({
    images = [],
    sounds = []
  }: {
    images: string[];
    sounds: string[];
  }) {
    await this.audioLoader.load(sounds);
    await this.imageLoader.load(images);
  }
}

export default ResourceLoader;
