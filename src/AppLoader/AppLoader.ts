import $ from "jquery";

import "./style.scss";

class AppLoader {
  private root = $("#root");
  private loaderContainer;

  loadedPromise: Promise<any>;

  constructor() {
    const loader = $("<div/>");
    loader.addClass("loading-screen");

    this.loaderContainer = loader;

    this.show();
  }

  public show() {
    this.root.append(this.loaderContainer);
  }

  public set(percent: number, text: string = "") {
    let content = `
      <span class="loading-title">Loading...</span>
      <div class="line-container">
        <div class="line" style="width: ${percent}%"></div>
        <div class="percent">${percent}%</div>
      </div>
      <div class='text'>${text}</div>
    `;

    this.loaderContainer.html(content);

    const button = $("<div/>")
      .addClass("start-button")
      .text(`Let's rock!`);

    if (percent === 100) {
      this.loadedPromise = new Promise(res =>
        button.addClass("active").click(res)
      );
    }

    this.loaderContainer.append(button);
  }

  public hide() {
    this.loaderContainer.remove();
  }

  waitUntilStartIsPressed() {
    return this.loadedPromise;
  }
}

export default new AppLoader();
