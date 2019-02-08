/* eslint-disable */

import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';


class FormationWidget extends ElementWidget {

    constructor(idf, x, y, width, height, imgSrc) {
        super(x, y, width, height, 0, 1);
        if (new.target === ElementWidget) {
            throw new TypeError('ElementWidget is an abstract class. It cannot be instanciated');
        }
        this.src = imgSrc;
        this._domElem = $('<img>');
        this._domElem.attr('src', imgSrc);
        this._domElem.css('width', `${this.width}px`);
        this._domElem.css('height', `${this.height}px`);
        this._domElem.css('position', 'absolute');
        this._domElem.css('z-index', `${this.zIndex}`);
        this._domElem.css('left', `${x}px`);
        this._domElem.css('top', `${y}px`);
        this.hasDuplicate = false;
        this.idf = idf;
        this.observer = null;
    }

    getId(){
        return this.idf;
    }

    onTouchCreation(tuioTouch) {
        super.onTouchCreation(tuioTouch);
        if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
            if (this.src == 'assets/Formation/okR.PNG') {
                if (!FormationWidget.okR && FormationWidget.formationRChoisie !== null){
                    FormationWidget.okR = true;
                    console.log("okR");
                    document.getElementById("textEquipeR").innerHTML = "Equipe Rouge : Vous avez choisi la formation" + FormationWidget.formationRChoisie.getId() + "!";
                    // console.log("L'équipe rouge a choisi la formation" + FormationWidget.formationRChoisie.getId());
                }
            }
            else if (this.src == 'assets/Formation/okB.PNG'){
                if (!FormationWidget.okB && FormationWidget.formationBChoisie !== null){
                    FormationWidget.okB = true;
                    console.log("okB");
                    document.getElementById("textEquipeB").innerHTML = "Equipe Bleue : Vous avez choisi la formation " + FormationWidget.formationBChoisie.getId() + "!";
                    // console.log("L'équipe bleue a choisi la formation" + FormationWidget.formationBChoisie.getId());
                }
            }
            if (FormationWidget.okR && FormationWidget.okB){
                this.observer.formationChosen(FormationWidget.formationRChoisie.getId(),FormationWidget.formationBChoisie.getId());
            }
        }
    }

    onTouchUpdate(tuioTouch) {

    }

    get domElem() { return this._domElem; }
}
FormationWidget.okR = false;
FormationWidget.okB = false;
FormationWidget.formationRChoisie = null;
FormationWidget.formationBChoisie = null;

export default FormationWidget;
