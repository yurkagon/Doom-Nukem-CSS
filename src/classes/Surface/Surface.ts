import $ from "jquery";

class Surface {
  private static floor = $(".floor");

  private constructor() {}

  public static setFloor(url: string) {
    this.floor.css("background-image", `url(${url})`);
  }
}

export default Surface;
