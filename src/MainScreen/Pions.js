/*eslint-disable*/

import PionsWidget from "./PionsWidget";
import PionsBRWidget from "./PionsBRWidget";

class Pions{
    constructor(place, idp, x,y,couleur, valuesSaved){
        if (valuesSaved == null){
            this.ballon = false;
            this.x = x;
            this.y = y;

            //ce tab donne les actions possible que peut faire le joueur en cliquant sur ce pion
            this.actionsPossibles = {};

            if (couleur === "rouge"){this.src = 'assets/MainScreen/pionR.png'; this.widget = new PionsBRWidget(place, idp, x, y, 100,100, this.src, null);}
            else if (couleur === "bleu") {this.src = 'assets/MainScreen/pionB.png'; this.widget = new PionsBRWidget(place, idp, x, y, 100,100, this.src, null);}
            else if (couleur === "none") {this.src = 'assets/MainScreen/pionN.png'; this.widget = new PionsWidget(idp, x, y, 100,100, this.src, null);}
            else {this.src = 'assets/MainScreen/pionNBR.png';this.widget = new PionsBRWidget(idp, x, y, 100,100, this.src, null);}
            this.widget.addTo('#mainScreen');
        }
        else {
            //Re-création des pions BR à partir de leur valeurs à la fin de la partie précédente
            for (var i = 0; i < valuesSaved[0].length; i++){
                let place = valuesSaved[0][i];
                let ballon = valuesSaved[1][i];
                let src = valuesSaved[2][i];
                this.widget = new PionsBRWidget(place, i, PionsWidget.listePionsN[place].x - 14.5, PionsWidget.listePionsN[place].y -14.5, 100,100,src, ballon);
                this.widget.addTo('#mainScreen');
            }
        }

    }

}
export default Pions;
