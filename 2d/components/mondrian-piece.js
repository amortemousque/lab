export class MondrianPiece extends HTMLLIElement {
  constructor() {
    super();
    this.gradient = false;
  }

  connectedCallback() {
    var settings = document.querySelector("lab-settings");
    settings.addEventListener("settingsChange", this.handleSettingChange.bind(this));
  }

  handleSettingChange({ detail }) {
    this.gradient = detail.gradient;
    this.gradientAnimated = detail.gradientAnimated;
    this.gradientFollowPointer = detail.gradientFollowPointer;

    if (this.gradient)
      this.style.backgroundImage =
        "linear-gradient(deg, var(--background-darker),  var(--background-darker),  var(--background), var(--background), var(--background), var(--background)";
    else this.style.backgroundImage = null;

    if (this.gradientAnimated) this.style.animation = "gradientBG 5s ease infinite";
    else this.style.animation = null;
  }
}
