/*eslint-disable*/

import Terrain from "./Terrain";

class MainScreen {
    constructor(width, height, observer, valuesSaved, startingTeam) {
        this.width = width;
        this.height = height;
        this.containerID = "app";
        this.containerClass = "container-fluid d-flex h-100";
        this.terrain = null;
        this.observer = observer;
        this.offset = 10;
        this.valuesSaved = valuesSaved;
        this.startingTeam = startingTeam;
    }

    populate(id) {
        const pid = "#" + id;
        const str = '<div id="mainScreen" class="row align-self-center align-items-center h-100 w-100"> </div>';
        $(pid).append(str);
        this.terrain = new Terrain(this.offset, this.offset, this.width - (2 * this.offset), this.height - (2 * this.offset), '#mainScreen', this.observer, this.valuesSaved, this.startingTeam);
        const btnID = "zeub";
        $(pid).append('<button id="' + btnID + '" type="button" class="btn-circle btn-xxl middleScreen" style="z-index: 300"></button>');
        const that = this;

        document.getElementById(btnID).onclick = () => {
            that.observer.playingSequence.playTurn();
        }
    }


    highlight(color) {
        const originalClass = "row align-self-center align-items-center w-100 h-100";
        const red = "row align-self-center align-items-center w-100 h-100 highlight_W2Red";
        const blue = "row align-self-center align-items-center w-100 h-100 highlight_W2Blue";

        if (color === "blue") {
            console.log("blue detected");
            document.getElementById("mainScreen").className = blue;
        }
        else if (color === "red") {
            document.getElementById("mainScreen").className = red;
        }
        else {
            document.getElementById("mainScreen").className = originalClass;
        }
    }

    startOfTurn(team) {
        let classe = "infoBlue";
        if (!team) {
            console.log("team undefined : setting default to BLUE");
            team = "blue";
            classe = "infoBlue";
        }
        this.highlight(team);

        if (team === "red") {
            classe = "infoRed";
        }
        if (document.getElementById('turnInfoText')) {
            document.getElementById('turnInfoText').remove();
            console.error("just removed text");
        }
        $('#mainScreen').append('<span id="turnInfoText" style="display:block; z-index: 111; margin: auto;">\<h1 class="' + classe + '">A vous de jouer Equipe ' + team + ' !!</h1\</span>');
    }
}

export default MainScreen;
