import UrlLoader from "./UrlLoader";

class AudioLoader extends UrlLoader {
  public handleUrl(url: string) {
    return new Promise(resolve => {
      const audio = new Audio();

      audio.src = this.getExactPath(url);

      const callback = () => {
        audio.removeEventListener("canplaythrough", callback);

        resolve();
      };

      audio.addEventListener("canplaythrough", callback);

      audio.onerror = callback;
    });
  }
}

export default AudioLoader;
