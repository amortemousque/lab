import { Settings } from './components/settings.js';
import { MondrianPiece } from './components/mondrian-piece.js';
import { Mondrian } from './components/mondrian.js';

window.customElements.define('lab-settings', Settings);
window.customElements.define('lab-mondrian-piece', MondrianPiece, { extends: "li" })
window.customElements.define('lab-mondrian', Mondrian, { extends: "ul" });
