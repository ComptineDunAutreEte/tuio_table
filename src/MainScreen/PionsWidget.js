/* eslint-disable */

import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';
import Pions from "./Pions";


class PionsWidget extends ElementWidget {

    constructor(idp, x, y, width, height, imgSrc) {
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
        for (var i = 0; i < PionsWidget.nbPions; i++) {
            PionsWidget.setPionsTouches(i, 0);
        }
        PionsWidget.listPions.push(this);
        if (idp == -1) this.idp = PionsWidget.nbPions;
        else this.idp = idp;
        PionsWidget.nbPions++;
        this.voisins = [this.idp - 1, this.idp + 1, this.idp - 6, this.idp - 7, this.idp - 8, this.idp + 6, this.idp + 7, this.idp + 8];
        // voir : en fait si on appuye sur un bouton il faudrait le garde en mémoire si c'est un bouton qui n'était pas
        //sléctionné, lequel on garde en mémoire ?
    }

    static getListePions() {
        return PionsWidget.listPions;
    }
    static getPionsTouches() {
        return PionsWidget.pionsTouches;
    }

    static setPionsTouches(id, val) {
        PionsWidget.pionsTouches[id] = val;
    }


    getSrc() {
        return this.src;
    }

    changeSrc(src) {
        this.src = src;
    }

    deleteWidget() {
        super.deleteWidget();
    }

    onTouchCreation(tuioTouch) {
        super.onTouchCreation(tuioTouch);
        // SI LE PION EST TOUCHE
        if (this.isTouched(tuioTouch.x, tuioTouch.y)) {

            console.log(PionsWidget.getListePions()[this.idp].src);

            //DANS TOUS LES AUTRES PIONS
            for (var i = 0; i < PionsWidget.nbPions; i++) {
                //ON VERIFIE QUE DANS LA LISTE DES PIONS TOUCHES S'IL Y'EN A UN QUI EST TOUCHE
                if (PionsWidget.getPionsTouches()[i] == 1) {
                    //const tpion = PionsWidget.getListePions()[i];
                    PionsWidget.setPionsTouches(i, 0);
                    if (PionsWidget.getListePions()[i].src == 'assets/MainScreen/pionBS.png') {
                        PionsWidget.getListePions()[i].src = 'assets/MainScreen/PionB';
                        this.pawnTouched("blue");
                        /*PionsWidget.nbPions--;
                        tpion.deleteWidget();
                        PionsWidget.getListePions()[i] = new Pions(PionsWidget.getListePions()[i].idp, PionsWidget.getListePions()[i].x, PionsWidget.getListePions()[i].y, "bleu");*/
                    } else if (PionsWidget.getListePions()[i].src == 'assets/MainScreen/pionRS.png') {
                        PionsWidget.getListePions()[i].src = 'assets/MainScreen/PionR';
                        this.pawnTouched("red");
                        /* PionsWidget.nbPions--;
                         tpion.deleteWidget();
                         PionsWidget.getListePions()[i] = new Pions(PionsWidget.getListePions()[i].idp, PionsWidget.getListePions()[i].x, PionsWidget.getListePions()[i].y, "rouge");*/
                    } else {

                    }
                    /*PionsWidget.getListePions()[i].src = 'assets/MainScreen/pionN.png';
                    this.deleteWidget();
                    PionsWidget.nbPions--;*/
                    // this.pawnTouched();
                    // PionsWidget.getListePions()[i].src = 'assets/MainScreen/pionN.png';
                }
            }
            PionsWidget.setPionsTouches(this.idp, 1);
            if (this.src == 'assets/MainScreen/pionB.png') {
                console.log("pion bleu touche");
                this.src = 'assets/MainScreen/pionBS.png';
                /*PionsWidget.nbPions--;
                PionsWidget.getListePions()[this.idp] = new Pions(this.idp, this.x, this.y, "bleuS");
                this.deleteWidget();*/

            } else if (this.src == 'assets/MainScreen/pionR.png') {
                console.log("pion rouge touche");
                this.src = 'assets/MainScreen/pionRS.png';
                /* PionsWidget.nbPions--;
                 PionsWidget.getListePions()[this.idp] = new Pions(this.idp, this.x, this.y, "rougeS");
                 this.deleteWidget();*/

            } else {}
            // PionsWidget.getListePions()[i].src = 'assets/MainScreen/pionB.png';
            console.log(PionsWidget.pionsTouches);

        }
    }

    onTouchUpdate(tuioTouch) {}

    /* FOR DEMO CODE */
    pawnTouched(type) {
            console.log("pawntouchedc; obs = ");
            console.log(this.observer);
            if (type === "blue"){
                this.observer.pawnMoved("indiv");
            } else if (type === "red"){
                this.observer.pawnMoved("collectif");
            }
        }
        /* END DEMO CODE */

    get domElem() { return this._domElem; }
}
PionsWidget.nbPions = 0;
PionsWidget.listPions = [];
PionsWidget.pionsTouches = [];

export default PionsWidget;