/*eslint-disable*/

class WaitingScreen {
    constructor(){

    }

    populate(){
        // ajouter le texte 
        const texte = "Répondez à la question sur vos tablettes...";
        $('#app').append('<div id="topHalf" class="row">' + texte + ' </div>')

    }
} export default WaitingScreen;