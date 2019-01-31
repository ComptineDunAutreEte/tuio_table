/*eslint-disable*/

class WaitingScreen {
    constructor(){
        this.containerID = "app";
        this.containerClass = "container-fluid d-flex h-100";
    }

    populate(){
        // ajouter le texte 
        const texte = "Répondez à la question sur vos tablettes...";
        const str = '<div id="zeubWait" class="row align-self-center align-items-center w-100"> </div>';
        $('#app').append(str);
        document.getElementById(this.containerID).className = this.containerClass + " " + "firstScreenBackground";
        $('#app').append('<h1 id="topHalf" class="row">' + texte + ' </h1>')

    }
} export default WaitingScreen;