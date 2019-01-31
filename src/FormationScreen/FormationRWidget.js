/*eslint-disable*/

import FormationWidget from './FormationWidget';

class FormationRWidget extends FormationWidget{
    constructor(idf, x, y, width, height, imgSrc){
        super(idf, x,y,width, height, imgSrc);
    }

    onTouchCreation(tuioTouch) {
        if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
            if (!FormationWidget.okR){
                console.log("L'équipe R a choisi la formation " + this.getId());
                FormationWidget.formationBChoisie = this;
                document.getElementById("textEquipeR").innerHTML = "L'équipe rouge a choisi la " +  this.getId();
            }
            else {
                console.log("vous avez déjà choisi la " + FormationWidget.formationBChoisie.getId());
            }
        }
    }
}

export default FormationRWidget;
