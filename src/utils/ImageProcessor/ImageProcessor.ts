import imageFilter from "image-filter-core";
import imageBrightness from "image-brightness";

class ImageProcessor {
  public static async applyBrightness(
    imgUrl: string,
    level: number
  ): Promise<string> {
    const imgData = await this.getImageData(imgUrl);

    const updatedImageData = await imageBrightness({
      adjustment: level,
      data: imgData
    });

    const url = this.getUrlFromImageData(updatedImageData);

    return url;
  }

  private static async getImageData(imgUrl: string): Promise<ImageData> {
    const img = await this.createImageElement(imgUrl);
    const context = this.createImageCanvasContext(img);

    const imageData = context.getImageData(0, 0, img.width, img.height);

    return imageData;
  }

  private static async createImageElement(
    imgUrl: string
  ): Promise<HTMLImageElement> {
    const img = document.createElement("img");
    img.setAttribute("src", imgUrl);

    await new Promise(resolve => {
      img.onload = resolve;
      img.onabort = resolve;
      img.onerror = resolve;
    });

    return img;
  }

  private static createImageCanvasContext(
    img: HTMLImageElement
  ): CanvasRenderingContext2D {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);

    return context;
  }

  private static getUrlFromImageData(imgData: ImageData): string {
    return imageFilter.convertImageDataToCanvasURL(imgData);
  }
}

export default ImageProcessor;
