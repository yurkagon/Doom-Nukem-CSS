import $ from "jquery";

import "./style.scss";

class AppLoader {
  private root = $("#root");
  private loaderContainer;

  constructor() {
    const loader = $("<div/>");
    loader.addClass("loading-screen");

    this.loaderContainer = loader;

    this.show();
  }

  show() {
    this.root.append(this.loaderContainer);
  }

  set(percent: number, text: string = "") {
    this.loaderContainer.html(
      `
        <span class="loading-title">Loading...</span>
        <div class="line-container">
          <div class="line" style="width: ${percent}%"></div>
          <div class="percent">${percent}%</div>
        </div>
        <div class='text'>${text}</div>
      `
    );
  }

  hide() {
    this.loaderContainer.remove();
  }
}

export default new AppLoader();
