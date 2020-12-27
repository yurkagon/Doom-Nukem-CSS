import UrlLoader from "./UrlLoader";

class ImageLoader extends UrlLoader {
  public handleUrl(
    url: string,
    callback?: (name: string) => void
  ): Promise<void> {
    return new Promise(resolve => {
      const image = new Image();
      image.src = this.getExactPath(url);

      const onEnd = () => {
        callback && callback(url);
        resolve();
      };

      image.onload = onEnd;
      image.onabort = onEnd;
      image.onerror = onEnd;
    });
  }
}

export default ImageLoader;
