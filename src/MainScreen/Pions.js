/*eslint-disable*/

import PionsWidget from "./PionsWidget";

class Pions{
    constructor(idp, x,y,couleur){
        this.couleur = couleur;
        this.ballon = false;
        this.x = x;
        this.y = y;

        //ce tab donne les actions possible que peut faire le joueur en cliquant sur ce pion
        this.actionsPossibles = {};

        if (couleur == "rouge"){this.src = 'assets/MainScreen/pionR.png';}
        else if (couleur == "bleu") {this.src = 'assets/MainScreen/pionB.png';}
        else if (couleur == "bleuS") {this.src = 'assets/MainScreen/pionBS.png';}
        else if (couleur == "rougeS") {this.src = 'assets/MainScreen/pionRS.png';}
        else if (couleur == "none") {this.src = 'assets/MainScreen/pionN.png';}
        this.widget = new PionsWidget(idp, x, y, 100,100, this.src);
        this.widget.addTo('#mainScreen');
    }

    changeCouleur(couleur){
        if (couleur != this.couleur){
            this.couleur = couleur;
            if (couleur == "rouge"){this.src = 'assets/MainScreen/pionR.png';}
            else if (couleur == "bleu") {this.src = 'assets/MainScreen/pionB.png';}
            else {this.src = 'assets/MainScreen/pionN.png';}
            this.widget.changeSrc(this.src);
        }
    }

    updateActionsPossibles(){
    }
}
export default Pions;
