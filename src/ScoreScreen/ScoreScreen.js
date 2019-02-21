/* eslint-disable */

class ScoreScreen {
    // screen contenant deux cartes pour afficher les highscores
    constructor(scores) {
        this.id = "highscores";
        this.scores = scores;
        this.containerID = "app";
        this.containerClass = "container-fluid d-flex h-100";
    }

    populate() {
        const pid = "#" + this.containerID;
        const str = '<div id="' + this.id + '" class="container align-self-center align-items-center w-100 h-100"></div>';
        $(pid).addClass('scoreScreen');
        $(pid).append(str);

        this.createDivs(this.id);
        // document.getElementById(this.containerID).className = this.containerClass + " " + "scoreScreenBackground";

    }

    /** populate function **/
    createDivs(parentID) {
        const pid = "#" + parentID;
        const topRowID = "topRow";
        const botRowID = "botRow";
        const mainColID = "mainCol";
        // main COL
        $(pid).append('<div id="' + mainColID + '" class="h-100 w-100 flex-score-container"> </div>');
        // Top row
        $("#" + mainColID).append('<div id="' + topRowID + '" class="row justify-content-center pb-5 topScoreRow"></div>');
        // Bottom row
        $("#" + mainColID).append('<div id="' + botRowID + '" class="row justify-content-center pt-5"></div>');
        this.buildTable(topRowID);
        this.buildTable(botRowID);
    }

    buildTable(id) {
        // bas = equipe rouge
        // prendre le tableau d'equipes et constuire une liste de noms de joueurs
        $("#" + id).append('<div class="card text-center">\
        <div class="card-body">\
            <h5 class="card-title">Scores à cette question</h5>\
                <table class="table">\
                <tbody id="table'+ id +'">\
                </tbody>\
            </table>\
            </div>\
        </div>');

        for (let i = 1; i < this.scores.length +1 ; i++) {
            $("#table" + id ).append('<tr>\
            <th scope="row">'+ i +'</th>\
            <td>Pseudo</td>\
            <td>Temps</td>\
            <td>équipe</td>\
        </tr>'
        );
        }
    }

} export default ScoreScreen;