/* eslint-disable */

import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';
import Pions from "./Pions";


class PionsWidget extends ElementWidget {


    /**
     * ImageWidget constructor.
     *
     * @constructor
     * @param {number} x - ImageWidget's upperleft coin abscissa.
     * @param {number} y - ImageWidget's upperleft coin ordinate.
     * @param {number} width - ImageWidget's width.
     * @param {number} height - ImageWidget's height.
     */
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
        if (idp == -1){ this.idp = PionsWidget.nbPions;}
        else {this.idp = idp;}
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

    changeSrc(couleur) {
        PionsWidget.nbPions--;
        const idp = this.idp;
        const x = this.x;
        const y = this.y;
        this.deleteWidget();
        PionsWidget.getListePions()[idp] = new Pions(idp, x, y, couleur);
    }


    getSrc(){
        return this.src;
    }

    deleteWidget(){
        super.deleteWidget();
    }

    deselectionnerAll(obj){
        for (var i = 0; i < PionsWidget.nbPions; i++){
            //ON VERIFIE QUE DANS LA LISTE DES PIONS TOUCHES S'IL Y'EN A UN QUI EST TOUCHE
            if (PionsWidget.getPionsTouches()[i] == 1){
                if (PionsWidget.getListePions()[i] != obj){
                    PionsWidget.setPionsTouches(i, 0);
                }
            }
        }
    }


    onTouchCreation(tuioTouch) {
        super.onTouchCreation(tuioTouch);
        // SI LE PION EST TOUCHE
        if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
            this.deselectionnerAll(this);
            if (PionsWidget.getPionsTouches()[this.idp] != 1) {
                console.log("selectionné");
                PionsWidget.setPionsTouches(this.idp, 1);
                if (this.src === 'assets/MainScreen/pionB.png') {
                    this.src = 'assets/MainScreen/pionBS.png';
                   // new PionsWidget(-1, this.x + 20, this.y + 20, this.width, this.height, this.src);
                    //this.changeSrc("bleuS");
                    console.log("2");
                    this.pawnTouched("blue");
                } else if (this.src === 'assets/MainScreen/pionR.png') {
                    this.src = 'assets/MainScreen/pionRS.png';
                    //this.changeSrc("rougeS");
                    console.log("4");
                    this.pawnTouched("red");
                }
            } else {
                console.log("désélectionné");
                PionsWidget.setPionsTouches(this.idp, 0);
                if (this.src === 'assets/MainScreen/pionBS.png') {
                    this.src = 'assets/MainScreen/pionB.png';
                   // this.pawnTouched("blue");
                    //this.changeSrc("bleu");
                    console.log("5");
                } else if (this.src === 'assets/MainScreen/pionRS.png') {
                    this.src = 'assets/MainScreen/pionR.png';
                    //this.changeSrc("rouge");
                    console.log("7");
                  //  this.pawnTouched("red");
                }
            }
            console.log(this.src);
            console.log(PionsWidget.pionsTouches[this.idp]);
        }
    }

    onTouchUpdate(tuioTouch){}

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

    get domElem(){ return this._domElem; }
}
PionsWidget.nbPions = 0;
PionsWidget.listPions = [];
PionsWidget.pionsTouches = [];

export default PionsWidget;
