/* eslint-disable */

import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';


class PionsWidget extends ElementWidget {

    constructor(idp, x, y, width, height, imgSrc) {
        if (imgSrc === 'assets/MainScreen/pionN.png'){
            super(x, y, width, height, 0, 1);
        }
        else {
            super(x, y, width, height, 0, 1.3);
        }

        if (new.target === ElementWidget) {
            throw new TypeError('ElementWidget is an abstract class. It cannot be instanciated');
        }
        this.mx = x;
        this.my = y;
        this.nbVoisins = 0;
        let deplace = false;
        this.voisins = [];
        this.aEteTouche = false;
        this._domElem = $('<img>');
        if (imgSrc !== ''){ this.src = imgSrc; this._domElem.attr('src', imgSrc);}


        this._domElem.css('width', `${this.width}px`);
        this._domElem.css('height', `${this.height}px`);
        this._domElem.css('position', 'absolute');
        this._domElem.css('z-index', `${this.zIndex}`);
        this._domElem.css('left', `${x}px`);
        this._domElem.css('top', `${y}px`);
        this.hasDuplicate = false;
        this.idp = idp;
        if (this.src === 'assets/MainScreen/pionN.png'){this.initVoisins();console.log(idp + "  :   " + this.voisins); console.log("nbVoisinsINIT : " + this.nbVoisins);}
        if (this.src === 'assets/MainScreen/pionN.png'){ PionsWidget.listePionsN.push(this); PionsWidget.nbPionsN++;}
        if (PionsWidget.nbPionsN === 55) {for (var i = 0; i < PionsWidget.nbPionsN; i++) {PionsWidget.listePionsN[i].updateVoisins();console.log(idp + "  :   " + PionsWidget.listePionsN[i].voisins); console.log("nbVoisinsUPDATE : " + PionsWidget.listePionsN[i].nbVoisins);}}
        else {PionsWidget.listePionsBR.push(this);PionsWidget.nbPionsBR++;}
        for (var j = 0; j < PionsWidget.nbPionsBR; j++) {
            PionsWidget.setPionsTouches(j, 0);
        }
        // voir : en fait si on appuye sur un bouton il faudrait le garde en mémoire si c'est un bouton qui n'était pas
        //sléctionné, lequel on garde en mémoire ?
    }


    updateVoisins(){
        var id = 0;
        if (this.idp % 7 !== 0){
            this.voisins[id] = PionsWidget.getListePionsN()[this.idp - 1];
            id++;
            if (this.idp > 6){
                this.voisins[id] = PionsWidget.getListePionsN()[this.idp - 8];
                id++;
            }
            if (this.idp < 48){
                this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 6];
                id++;
            }
        }
        if ((this.idp % 6 !== 0) || (this.idp === 0)){
            this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 1];
            id++;
            if (this.idp > 6){
                this.voisins[id] = PionsWidget.getListePionsN()[this.idp - 6];
                id++;
            }
            if (this.idp < 48){
                this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 8];
                id++;
            }
        }
        if (this.idp > 6){
            this.voisins[id] = PionsWidget.getListePionsN()[this.idp - 7];
            id++;
        }
        if (this.idp < 48){
            this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 7];
        }
    }

    initVoisins(){
        if (this.idp % 7 !== 0){
            this.voisins[this.nbVoisins] = PionsWidget.getListePionsN()[this.idp - 1];
            this.nbVoisins++;
            if (this.idp > 6){
                this.voisins[this.nbVoisins] = PionsWidget.getListePionsN()[this.idp - 8];
                this.nbVoisins++;
            }
            if (this.idp < 48){
                this.voisins[this.nbVoisins] = PionsWidget.getListePionsN()[this.idp + 6];
                this.nbVoisins++;
            }
        }
        if ((this.idp % 6 !== 0) || (this.idp === 0)){
            this.voisins[this.nbVoisins] = PionsWidget.getListePionsN()[this.idp + 1];
            this.nbVoisins++;
            if (this.idp > 6){
                this.voisins[this.nbVoisins] = PionsWidget.getListePionsN()[this.idp - 6];
                this.nbVoisins++;
            }
            if (this.idp < 48){
                this.voisins[this.nbVoisins] = PionsWidget.getListePionsN()[this.idp + 8];
                this.nbVoisins++;
            }
        }
        if (this.idp > 6){
            this.voisins[this.nbVoisins] = PionsWidget.getListePionsN()[this.idp - 7];
            this.nbVoisins++;
        }
        if (this.idp < 48){
            this.voisins[this.nbVoisins] = PionsWidget.getListePionsN()[this.idp + 7];
            this.nbVoisins++;
        }
    }

    static getListePionsN() {
        return PionsWidget.listePionsN;
    }

    static getListePionsBR() {
        return PionsWidget.listePionsBR;
    }

    static getPionsTouches() {
        return PionsWidget.pionsTouches;
    }

    static setPionsTouches(id, val) {
        PionsWidget.pionsTouches[id] = val;
    }

  /*  changeSrc(couleur) {
        PionsWidget.nbPions--;
        const idp = this.idp;
        const x = this.x;
        const y = this.y;
        this.deleteWidget();
        PionsWidget.getListePions()[idp] = new Pions(idp, x, y, couleur);
    }*/


    getSrc(){
        return this.src;
    }

  /*  deleteWidget(){
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
    }*/

    onTouchCreation(tuioTouch) {
        if (this.src === 'assets/MainScreen/pionB.png' || this.src === 'assets/MainScreen/pionR.png') {
            super.onTouchCreation(tuioTouch);
            //console.log(this.voisins);
            for (var i = 0; i < this.nbVoisins; i++){
                this.voisins[i]._domElem.attr('src', 'assets/MainScreen/bscircle.png');
                this.voisins[i].src = 'assets/MainScreen/bscircle.png';
            }
           // console.log("LES VOISINS : " + this.voisins);
        }


        // SI LE PION EST TOUCHE
     /*   if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
            if (this.src === 'assets/MainScreen/pionB.png' || this.src === 'assets/MainScreen/pionR.png') {
                // this.deselectionnerAll(PionsWidget.getListePions()[this.idp]);
                if (PionsWidget.getPionsTouches()[this.idp] !== 1) {
                    console.log("selectionné");
                    PionsWidget.setPionsTouches(this.idp, 1);
                    //Si le pion est bleu non sélectionné
                    if (PionsWidget.getListePionsBR()[this.idp].src === 'assets/MainScreen/pionB.png') {
                        // PionsWidget.getListePions()[this.idp].src = 'assets/MainScreen/pionBS.png';
                        this._domElem.css('width', `${this.width + 50}px`);
                        this._domElem.css('height', `${this.height + 50}px`);
                      /*  for (var i = 0; i < this.nbVoisins; i++){
                            console.log(this.voisins[i]);
                        }*/

                        // new PionsWidget(-1, this.x + 20, this.y + 20, this.width, this.height, this.src);
                        //this.changeSrc("bleuS");
                        // new PionsWidget.getListePions()[i];
           /*             console.log("2");
                        // this.pawnTouched("blue");
                    }
                    //Si le pion est rouge non sélectionné
                    else if (PionsWidget.getListePionsBR()[this.idp].src === 'assets/MainScreen/pionR.png') {
                        this._domElem.css('width', `${this.width + 50}px`);
                        this._domElem.css('height', `${this.height + 50}px`);
                    /*    for (var j = 0; j < this.nbVoisins; j++){
                            console.log(this.voisins[j]);
                        }*/
                        //  PionsWidget.getListePions()[this.idp].src = 'assets/MainScreen/pionRS.png';
                        //this.changeSrc("rougeS");
            /*            console.log("4");
                        //  PionsWidget.getListePions()[this.idp] = new Pions(this.idp, this.x, this.y, "rougeS");
                        //  this.pawnTouched("red");
                    }

                    this.aEteTouche = true;
                    //} else {

                    //  PionsWidget.setPionsTouches(this.idp, 0);
                    //Si le pion est bleu sélectionné
                    /*  if (PionsWidget.getListePions()[this.idp].src === 'assets/MainScreen/pionBS.png') {
                         // PionsWidget.getListePions()[this.idp].src = 'assets/MainScreen/pionB.png';
                          console.log("5");
                      }
                      //Si le pion est rouge sélectionné
                      else if (PionsWidget.getListePions()[this.idp].src === 'assets/MainScreen/pionRS.png') {
                        //  PionsWidget.getListePions()[this.idp].src = 'assets/MainScreen/pionR.png';
                         // PionsWidget.getListePions()[this.idp] = new Pions(this.idp, this.x, this.y, "rouge");
                          //this.changeSrc("rouge");
                          //new Pions(this.idp, this.x, this.y, "rouge");
                          console.log("7");
                      }*/
         /*       }
                console.log("On touch : " + this.width + "    " + this.height);
                console.log("onTouch :" + this.aEteTouche);
                console.log(this.src);
                console.log(PionsWidget.pionsTouches[this.idp]);
            }
        }*/
    }

    onTouchDeletion(tuioTouchId) {
      /*  if(this.aEteTouche){
            PionsWidget.setPionsTouches(this.idp, 0);
            console.log("désélectionné");
            this._domElem.css('width', `${this.width}px`);
            this._domElem.css('height', `${this.height}px`);
            this.aEteTouche = false;
            console.log("After touch : " + this.width + "    " + this.height);
            console.log("After touch :" + this.aEteTouche);
        }
       // return super.onTouchDeletion(tuioTouchId);*/
        if (this.src === 'assets/MainScreen/pionB.png' || this.src === 'assets/MainScreen/pionR.png'){
            super.onTouchDeletion(tuioTouchId);
            const nbV = this.nbVoisins;
            for (var i = 0; i < nbV;i++){
                if ((this.internX <= this.voisins[i].internX + 20 - 14.5)&&
                    (this.internX >= this.voisins[i].internX - 20 - 14.5) &&
                    (this.internY <= this.voisins[i].internY + 20 - 14.5) &&
                    (this.internY >= this.voisins[i].internY - 20 - 14.5)){
                    this._domElem.css('left', `${this.voisins[i].internX - 14.5}px`);
                    this._domElem.css('top', `${this.voisins[i].internY - 14.5}px`);
                    this.internX = this.voisins[i].internX - 14.5;
                    this.internY = this.voisins[i].internY - 14.5;
                    this.mx = this.internX;
                    this.my = this.internY;
                    this.voisins = this.voisins[i].voisins;
                    this.nbVoisins = this.voisins[i].nbVoisins;
                    this.deplace = true;
                }
            }
            if (!this.deplace){
                this.deplace = false;
                this._domElem.css('left', `${this.mx}px`);
                this._domElem.css('top', `${this.my}px`);
                this.internX = this.mx;
                this.internY = this.my;
            }
        }
    }

    onTouchUpdate(tuioTouch){
        if (this.src === 'assets/MainScreen/pionB.png' || this.src === 'assets/MainScreen/pionR.png') {
            super.onTouchUpdate(tuioTouch);
        }
    }

    moveTo(x, y, angle = null) {
        if (this.src === 'assets/MainScreen/pionB.png' || this.src === 'assets/MainScreen/pionR.png') {
            super.moveTo(x, y, angle);
        }
    }

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
PionsWidget.nbPionsN = 0;
PionsWidget.nbPionsBR = 0;
PionsWidget.listePionsN = [];
PionsWidget.pionsTouches = [];
PionsWidget.listePionsBR = [];

export default PionsWidget;
