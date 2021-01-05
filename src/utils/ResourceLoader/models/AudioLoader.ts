import UrlLoader from "./UrlLoader";

class AudioLoader extends UrlLoader {
  public handleUrl(
    url: string,
    callback?: (name: string) => void
  ): Promise<void> {
    return new Promise(resolve => {
      const audio = new Audio();

      audio.src = this.getExactPath(url);

      let resolved: boolean;
      let timerId: NodeJS.Timeout;

      const onEnd = () => {
        if (resolved) return;

        audio.removeEventListener("canplaythrough", onEnd);

        callback && callback(url);

        resolve();

        resolved = true;
        clearTimeout(timerId);
      };

      audio.addEventListener("canplaythrough", onEnd);
      audio.onerror = onEnd;

      timerId = setTimeout(() => {
        onEnd();
        console.error(`Cannot preload: ${url}`);
      }, 1000);
    });
  }
}

export default AudioLoader;
