/*eslint-disable*/

class TutoScreen {
    constructor(obs) {
        this.containerID = "app";
        this.containerClass = "container-fluid d-flex h-100";
        this.observer = obs;
    }

    populate() {
        const pid = "#" + this.containerID;
        const btnID = "btn";
        const that = this;
        $(pid).addClass("tutoScreenBackground");
        $(pid).append('<button id="' + btnID + '" type="button" class="btn-circle btn-xxl middleScreen"></button>');
        document.getElementById(btnID).onclick = () => {
            that.observer.finishedTutoScreen();
        };
    }
} export default TutoScreen;