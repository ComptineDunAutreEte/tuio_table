/*eslint-disable*/

import FormationWidget from './FormationWidget';

class FormationBWidget extends FormationWidget{
    constructor(idf, x, y, width, height, imgSrc){
        super(idf, x,y,width, height, imgSrc);
    }

    onTouchCreation(tuioTouch) {
        if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
            if (!FormationWidget.okB) {
                console.log("L'équipe B a choisi la formation " + this.getId());
                FormationWidget.formationRChoisie = this;
                document.getElementById("textEquipeB").innerHTML = "L'équipe bleu a choisi la " + this.getId();
            }
            else {
                console.log("vous avez déjà choisi la " + FormationWidget.formationBChoisie.getId());
            }
        }
    }
}

export default FormationBWidget;
