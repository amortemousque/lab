export class Mondrian extends HTMLUListElement {

    constructor() {
        super();
    }

    connectedCallback() {    
        this.draw();
    }

    attributeChangedCallback(name) {
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

