export class Settings extends HTMLElement {
  constructor() {
    super();
    this.form = null;
  }

  connectedCallback() {
    var template = document.querySelector("#lab-settings");
    var clone = document.importNode(template.content, true);
    this.form = clone.querySelector("form");
    this.form.addEventListener("change", this.handleChange.bind(this));
    this.appendChild(clone);
  }

  get values() {
    var formData = new FormData(this.form);
    return {
      gradient: formData.get("gradient"),
      gradientAnimated: formData.get("gradientAnimated"),
      gradientFollowPointer: formData.get("gradientFollowPointer"),
    };
  }

  handleChange(event) {
    event.preventDefault();
    var event = new CustomEvent("settingsChange", { detail: this.values });
    this.dispatchEvent(event);
  }
}
