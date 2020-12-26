class Sound {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public play() {
    return new Audio(this.url).play();
  }
}

export default Sound;
