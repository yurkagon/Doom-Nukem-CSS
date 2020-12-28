import sleep from "utils/sleep";

import AudioLoader from "./models/AudioLoader";
import ImageLoader from "./models/ImageLoader";
import OperationHandler from "./models/OperationHandler";

import { Operation } from "./types";

class ResourceLoader {
  private static audioLoader = new AudioLoader();
  private static imageLoader = new ImageLoader();
  private static operationHandler = new OperationHandler();

  public static async load({
    images = [],
    sounds = [],
    operations = [],
    onUpdate
  }: {
    images: string[];
    sounds: string[];
    operations?: Operation[];
    onUpdate?: (name: string, progress: string) => void;
  }) {
    const resourceLength = images.length + sounds.length;
    let currentLoadedCount = 0;

    const handler = (name: string) => {
      currentLoadedCount++;
      if (onUpdate) {
        const percentage = (currentLoadedCount / resourceLength) * 100;
        onUpdate(name, percentage.toFixed(2));
      }
    };

    await this.audioLoader.load(sounds, handler);
    await this.imageLoader.load(images, handler);

    if (operations) {
      await this.operationHandler.load(operations, handler);
    }

    await sleep(200);
  }
}

export default ResourceLoader;
