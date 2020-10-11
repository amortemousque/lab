import { pieces } from "../../common/mondrian-data.js";

const parseColor = number => {
  let colorArray = Array(6)
    .fill(0)
    .concat(...number.toString(16));
  const color = colorArray.slice(colorArray.length - 6, colorArray.length).join("");
  return color;
};

export class Mondrian extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.draw();
  }

  attributeChangedCallback(name) {
    this.draw();
  }

  draw() {
    this.innerHTML = "";
    for (let piece of pieces) {
      let { w, h } = piece.dimension;
      let pieceElement = document.createElement("lab-mondrian-piece");
      pieceElement.id = piece.name;
      pieceElement.style.gridRowStart = h ? `span ${h}` : undefined;
      pieceElement.style.gridColumnStart = w ? `span ${w}` : undefined;
      pieceElement.style.backgroundColor = `#${parseColor(piece.color)}`;

      this.appendChild(pieceElement);
    }
  }
}
