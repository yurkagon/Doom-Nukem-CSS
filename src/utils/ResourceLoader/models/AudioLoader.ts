import UrlLoader from "./UrlLoader";

class AudioLoader extends UrlLoader {
  public handleUrl(url: string, callback?: (name: string) => void) {
    return new Promise(resolve => {
      const audio = new Audio();

      audio.src = this.getExactPath(url);

      const onEnd = () => {
        audio.removeEventListener("canplaythrough", onEnd);

        callback && callback(url);

        resolve();
      };

      audio.addEventListener("canplaythrough", onEnd);

      audio.onerror = onEnd;
    });
  }
}

export default AudioLoader;
