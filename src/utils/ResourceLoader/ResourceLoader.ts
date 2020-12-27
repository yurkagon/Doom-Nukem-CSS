import AudioLoader from "./models/AudioLoader";
import ImageLoader from "./models/ImageLoader";

class ResourceLoader {
  private static audioLoader = new AudioLoader();
  private static imageLoader = new ImageLoader();

  public static async load({
    images = [],
    sounds = [],
    onUpdate
  }: {
    images: string[];
    sounds: string[];
    onUpdate?: (name: string, progress: string) => void;
  }) {
    const resourceLength = images.length + sounds.length;
    let currentLoadedCount = 0;

    const handler = name => {
      currentLoadedCount++;
      if (onUpdate) {
        const percentage = (currentLoadedCount / resourceLength) * 100;
        onUpdate(name, percentage.toFixed(2));
      }
    };

    await this.audioLoader.load(sounds, handler);
    await this.imageLoader.load(images, handler);
  }
}

export default ResourceLoader;
