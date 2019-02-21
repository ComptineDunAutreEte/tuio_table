/*eslint-disable*/

class TutoScreen {
    constructor(){
        this.containerID = "app";
        this.containerClass = "container-fluid d-flex h-100";
    }

    populate(){
        const pid = "#" + this.containerID;
        $(pid).addClass("tutoScreenBackground");
    }
} export default TutoScreen;