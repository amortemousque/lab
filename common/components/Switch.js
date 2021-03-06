export class Switch extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.button2D = this.querySelector(".button-2D");
    this.button3D = this.querySelector(".button-3D");
    this.button2D.addEventListener("click", this.handleChange.bind(this));
    this.button3D.addEventListener("click", this.handleChange.bind(this));
  }

  handleChange(event) {
    window.location.pathname = event.target.classList.contains("button-2D") ? "2d" : "3d";
  }
}

window.customElements.define("lab-switch", Switch);
