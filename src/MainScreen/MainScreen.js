/*eslint-disable*/

import Terrain from "./Terrain";

class MainScreen{
    constructor(width, height, observer){
        this.width = width;
        this.height = height;
        this.containerID = "app";
        this.containerClass = "container-fluid d-flex h-100";
        this.terrain = null;
        this.observer = observer;
    }

    populate(id) {
        const pid = "#" + id;
        const str = '<div id="mainScreen" class="row align-self-center align-items-center w-100"> </div>';
        $(pid).append(str);
        console.log("observer at TERRAIN : " + this.observer)
        this.terrain =  new Terrain(0,0, this.width, this.height, '#mainScreen', this.observer);
        document.getElementById(this.containerID).className = this.containerClass + " " + "MainScreenBackground";
    }
}

export default MainScreen;
