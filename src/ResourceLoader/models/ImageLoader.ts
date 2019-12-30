import UrlLoader from "./UrlLoader";

class ImageLoader extends UrlLoader {
  public handleUrl(url: string) {
    return new Promise(resolve => {
      const image = new Image();
      image.src = this.getExactPath(url);

      image.onload = resolve;
      image.onabort = resolve;
      image.onerror = resolve;
    });
  }
}

export default ImageLoader;
