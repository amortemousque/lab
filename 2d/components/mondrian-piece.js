export class MondrianPiece extends HTMLLIElement {

    constructor() {
        super();
        this.gradient = false;
    }

    connectedCallback() {
        var settings = document.querySelector('lab-settings');
        settings.addEventListener('settingsChange', this.handleSettingChange.bind(this))
        document.body.addEventListener('mousemove', this.handleMouseMove.bind(this))
    }

    handleMouseMove(event) {
        let { clientX, clientY } = event;
        let { top, left, bottom, right } = this.getBoundingClientRect()
        let elementCenterY = ((bottom - top) / 2 + top);
        let elementCenterX = ((right - left) / 2 + left);

        //translate the coordinate of pointer
        let x = clientX - elementCenterX;
        let y = clientY - elementCenterY;

        let angle = Math.atan2(y, x) * 180 / Math.PI;
        if (this.gradientFollowPointer) {
            this.style.backgroundImage = "linear-gradient(" + (angle + 45) + "deg, var(--background), var(--background-darker), var(--background), var(--background), var(--background-darker), var(--background), var(--background), var(--background-darker), var(--background))";
        }

    }

    handleSettingChange({ detail }) {
        this.gradient = detail.gradient;
        this.gradientAnimated = detail.gradientAnimated;
        this.gradientFollowPointer = detail.gradientFollowPointer;

        if (this.gradient)
            this.style.backgroundImage = "linear-gradient(45deg,var(--background),var(--background-darker), var(--background),var(--background), var(--background-darker), var(--background),var(--background), var(--background-darker), var(--background))"
        else
            this.style.backgroundImage = null

        if (this.gradientAnimated)
            this.style.animation = 'gradientBG 5s ease infinite'
        else
            this.style.animation = null
    }
}