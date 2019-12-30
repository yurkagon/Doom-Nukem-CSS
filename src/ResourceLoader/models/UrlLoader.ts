abstract class UrlLoader {
  public abstract handleUrl(url: string): Promise<any>;

  public load(url: string | string[]) {
    if (typeof url === "string") {
      return this.handleUrl(url);
    }
    if (Array.isArray(url)) {
      return Promise.all(url.map(el => this.load(el)));
    }
  }

  public getExactPath(url: string) {
    return `${window.location.origin}/${url}`;
  }
}

export default UrlLoader;
