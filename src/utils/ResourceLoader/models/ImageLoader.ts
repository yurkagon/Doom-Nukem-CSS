import UrlLoader from "./UrlLoader";

class ImageLoader extends UrlLoader {
  public handleUrl(
    url: string,
    callback?: (name: string) => void
  ): Promise<void> {
    return new Promise(resolve => {
      const image = new Image();

      const onEnd = () => {
        callback && callback(url);
        resolve();
      };

      image.onload = onEnd;
      image.onabort = onEnd;
      image.onerror = onEnd;

      image.src = this.getExactPath(url);
    });
  }
}

export default ImageLoader;
