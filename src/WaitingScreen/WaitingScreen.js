/*eslint-disable*/

class WaitingScreen {
    constructor(){
        this.containerID = "app";
        this.containerClass = "container-fluid d-flex h-100";
    }

    populate(){
        // ajouter le texte 
        const texte = "Répondez à la question sur vos tablettes...";
        document.getElementById(this.containerID).className = this.containerClass + " " + "firstScreenBackground";
        $('#app').append('<div id="wtext" class="col"> </div>');
        $('#wtext').append('<div class="row h-50 w-100 align-items-center d-flex justify-content-center" style="transform: rotate(180deg);" id="topText" > </div>')
        $('#topText').append('<h1 class="text-center">' + texte + ' </h1>')
        $('#wtext').append('<div class="row h-50 w-100 align-items-center d-flex justify-content-center" id="botText" > </div>')
        $('#botText').append('<h1 class="text-center">' + texte + ' </h1>')
    }
} export default WaitingScreen;