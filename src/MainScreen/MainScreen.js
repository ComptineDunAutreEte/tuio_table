/*eslint-disable*/

import Terrain from "./Terrain";

class MainScreen {
    constructor(width, height, observer) {
        this.width = width;
        this.height = height;
        this.containerID = "app";
        this.containerClass = "container-fluid d-flex h-100";
        this.terrain = null;
        this.observer = observer;
        this.offset = 10;
    }

    populate(id) {
        const pid = "#" + id;
        const str = '<div id="mainScreen" class="row align-self-center align-items-center w-100 highlighted highlight"> </div>';
        $(pid).append(str);
        this.terrain = new Terrain(this.offset, this.offset, this.width-(2*this.offset), this.height-(2*this.offset), '#mainScreen', this.observer);
    }

    highlight(color) {
        const originalClass = "row align-self-center align-items-center w-100";
        const red = "row align-self-center align-items-center w-100";
        const blue = "row align-self-center align-items-center w-100";

        if (color === "blue") {
            $('#app').className = blue;
        }
        else if (color === "red") {
            $('#app').className = red;
        }
        else {
            $('#app').className = originalClass;
        }
    }
}

export default MainScreen;
