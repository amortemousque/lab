import { Settings } from "./settings.js";
import { MondrianPiece } from "./mondrian-piece.js";
import { Mondrian } from "./mondrian.js";

window.customElements.define("lab-settings", Settings);
window.customElements.define("lab-mondrian-piece", MondrianPiece, { extends: "li" });
window.customElements.define("lab-mondrian", Mondrian, { extends: "ul" });
