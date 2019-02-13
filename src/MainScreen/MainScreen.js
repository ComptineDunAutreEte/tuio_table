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
        const str = '<div id="mainScreen" class="row align-self-center align-items-center h-100 w-100"> </div>';
        $(pid).append(str);
        this.terrain = new Terrain(this.offset, this.offset, this.width - (2 * this.offset), this.height - (2 * this.offset), '#mainScreen', this.observer);
    }

    highlight(color) {
        console.log("attempting highlight");
        const originalClass = "row align-self-center align-items-center w-100 h-100";
        const red = "row align-self-center align-items-center w-100 h-100 highlight_W2Red";
        const blue = "row align-self-center align-items-center w-100 h-100 highlight_W2Blue";

        if (color === "blue") {
            document.getElementById("mainScreen").className = blue;

        }
        else if (color === "red") {
            document.getElementById("mainScreen").className = red;
        }
        else {
            document.getElementById("mainScreen").className = originalClass;
        }
        this.startOfTurn("")
        console.log(document.getElementById("mainScreen").className);
    }

    startOfTurn(team) {
        let classe = "infoBlue";
        if (!team) {
            console.log("team undefined")
            team = ""
        }
        if (team === "red") {
            classe = "infoRed";
        }
        $('#mainScreen').append('<span id="turnInfoText" style="display:block; z-index: 111; margin: auto;">\
                                    <h1 class="' + classe + '">A vous de jouer Equipe ' + team + ' !!</h1\
                                </span>');
                                }
}

export default MainScreen;
