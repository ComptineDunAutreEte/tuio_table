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
                FormationWidget.formationRChoisie = this;
                document.getElementById("textEquipeR").innerHTML = "Equipe Rouge : Formation " + this.getId() + ".";
            }
            else {
                console.log("Vous avez déjà choisi la " + FormationWidget.formationRChoisie.getId());
            }
        }
    }
}

export default FormationRWidget;
