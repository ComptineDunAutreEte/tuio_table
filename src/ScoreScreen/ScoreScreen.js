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
        const str = '<div id="' + this.id + '" class="container align-self-center align-items-center w-100 h-100"> </div>';
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
        $(pid).append('<div id="' + mainColID + '" class="col h-100 w-100 align-items-center"> </div>');
        // Top row
        $("#" + mainColID).append('<div id="' + topRowID + '" class="row justify-content-center pb-5 blueTeam"></div>');
        // Bottom row
        $("#" + mainColID).append('<div id="' + botRowID + '" class="row justify-content-center pt-5 redTeam"></div>');
        this.buildTable(topRowID);
        this.buildTable(botRowID);
    }

    buildTable(id) {
        // bas = equipe rouge
        // prendre le tableau d'equipes et constuire une liste de noms de joueurs
        $("#" + id ).append('<table class="table">\
        <tbody>\
          <tr>\
            <th scope="row">1</th>\
            <td>Mark</td>\
            <td>Otto</td>\
            <td>@mdo</td>\
          </tr>\
          <tr>\
            <th scope="row">2</th>\
            <td>Jacob</td>\
            <td>Thornton</td>\
            <td>@fat</td>\
          </tr>\
          <tr>\
            <th scope="row">3</th>\
            <td>Larry</td>\
            <td>the Bird</td>\
            <td>@twitter</td>\
          </tr>\
        </tbody>\
      </table>')
    }

} export default ScoreScreen;