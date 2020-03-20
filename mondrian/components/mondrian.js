import { Settings } from './settings.js';
import { MondrianPiece } from './mondrian-piece.js';

class Mondrian extends HTMLUListElement {

    constructor() {
        super();
    }

    connectedCallback() {    
        this.draw();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name == 'pieces')
            this.draw();
    }

    draw() {
        this.innerHTML = '';
        for(let i = 0; i < this.getAttribute('pieces'); i++) {
            this.appendChild(document.createElement('li', { is: 'lab-mondrian-piece' }))
        }
    }
}

window.customElements.define('lab-mondrian',Mondrian, { extends: "ul" });
