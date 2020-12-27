abstract class UrlLoader {
  public abstract handleUrl(
    url: string,
    callback?: (name: string) => void
  ): Promise<any>;

  public load(url: string | string[], callback?: (name: string) => void) {
    if (typeof url === "string") {
      return this.handleUrl(url, callback);
    }

    if (Array.isArray(url)) {
      return Promise.all(url.map(el => this.load(el, callback)));
    }
  }

  public getExactPath(url: string) {
    return `${window.location.href}/${url}`;
  }
}

export default UrlLoader;
