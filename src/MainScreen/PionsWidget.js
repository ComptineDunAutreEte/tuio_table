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

        if (imgSrc === 'assets/MainScreen/pionN.png'){
            this.nbVoisins = 0;
            this.voisins = [];
        }
        let deplace = false;
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
      //  if (this.src === 'assets/MainScreen/pionN.png'){this.initVoisins();console.log(idp + "  :   " + this.voisins); console.log("nbVoisinsINIT : " + this.nbVoisins);}
        if (this.src === 'assets/MainScreen/pionN.png'){ PionsWidget.listePionsN.push(this); PionsWidget.nbPionsN++;}
        if (PionsWidget.nbPionsN === 56) {for (var i = 0; i < PionsWidget.nbPionsN; i++) {PionsWidget.listePionsN[i].updateVoisins();console.log(PionsWidget.listePionsN[i].idp + "  :   " + PionsWidget.listePionsN[i].voisins); console.log("nbVoisinsUPDATE : " + PionsWidget.listePionsN[i].nbVoisins);}}
      /*  if (PionsWidget.nbPionsN === 55){
            for (var j = 0; j < PionsWidget.nbPionsN; j++){PionsWidget.listePionsN[j].updatePasses();}
        }*/

        for (var j = 0; j < PionsWidget.nbPionsBR; j++) {
            PionsWidget.setPionsTouches(j, 0);
        }
        // voir : en fait si on appuye sur un bouton il faudrait le garde en mémoire si c'est un bouton qui n'était pas
        //sléctionné, lequel on garde en mémoire ?
    }

    updateVoisins(){
        let id = 0;
        let idPionsHaut = [6, 13, 20, 27,34,41,48,55];
        let idPionsBas = [0, 7, 14, 21, 28, 35, 42, 49];
        let idPionsGauches = [0, 1, 2, 3, 4, 5, 6];
        let idPionsDroits = [49,50,51,52,53,54,55];

        if (!idPionsHaut.includes(this.idp)){
            this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 1];
            id++;
            if (!idPionsGauches.includes(this.idp)){
                this.voisins[id] = PionsWidget.getListePionsN()[this.idp - 6];
                id++;
            }
            if (!idPionsDroits.includes(this.idp)){
                this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 8];
                id++;
            }
        }
        if (!idPionsBas.includes((this.idp))){
            this.voisins[id] = PionsWidget.getListePionsN()[this.idp - 1];
            id++;
            if (!idPionsGauches.includes(this.idp)){
                this.voisins[id] = PionsWidget.getListePionsN()[this.idp - 8];
                id++;
            }
            if (!idPionsDroits.includes(this.idp)){
                this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 6];
                id++;
            }
        }
        if (!idPionsGauches.includes(this.idp)){
            this.voisins[id] = PionsWidget.getListePionsN()[this.idp - 7];
            id++;
        }
        if (!idPionsDroits.includes(this.idp)){
            this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 7];
        }
        this.nbVoisins = this.voisins.length;
    }


   /* updateVoisinss(){
        let id = 0;
        let idPionsBas = [6, 13, 20, 27,34,41,48,55];
        if (this.idp === 0){
            this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 1];
            id++;
            this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 7];
            id++;
            this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 8];
        }
        else {
            if (this.idp % 7 !== 0){
                this.voisins[id] = PionsWidget.getListePionsN()[this.idp - 1];
                id++;
                if (this.idp > 6){
                    this.voisins[id] = PionsWidget.getListePionsN()[this.idp - 8];
                    id++;
                }
                if (this.idp < 49){
                    this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 6];
                    id++;
                }
            }
            if (!idPionsBas.includes(this.idp)){
                this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 1];
                id++;
                if (this.idp > 6){
                    this.voisins[id] = PionsWidget.getListePionsN()[this.idp - 6];
                    id++;
                }
                if (this.idp < 49){
                    this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 8];
                    id++;
                }
            }
            if (this.idp > 6){
                this.voisins[id] = PionsWidget.getListePionsN()[this.idp - 7];
                id++;
            }
            if (this.idp < 49){
                this.voisins[id] = PionsWidget.getListePionsN()[this.idp + 7];
            }
        }
        this.nbVoisins = this.voisins.length;
    }*/

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
        if (this.src === 'assets/MainScreen/pionB.png' || this.src === 'assets/MainScreen/pionR.png') {
            super.onTouchDeletion(tuioTouchId);
        }
    }




    /* FOR DEMO CODE */
    pawnTouched(type) {
            if (type === "blue"){
                this.observer.pawnMoved("indiv");
            } else if (type === "red"){
                this.observer.pawnMoved("collectif");
            }
    }
    /* END DEMO CODE */

    get domElem(){ return this._domElem; }

    /*
    *
    *
    *  if (PionsBRWidget.firstButtonClicked != null){
                   PionsBRWidget.secondButtonClicked = this;
                   const tabDiag = PionsBRWidget.buildTabDiagonale(PionsBRWidget.firstButtonClicked.internX, PionsBRWidget.firstButtonClicked.y,PionsBRWidget.secondButtonClicked.internX, PionsBRWidget.secondButtonClicked.y);
                   for (var i = 0; i < tabDiag.length; i++){
                       this.ballon.internX = tabDiag[i];
                   }
               }


               static buildTabDiagonale(x1, y1, x2, y2){
        let t = [];
        const OA =  Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        const OD = (x1 - x2);
        //const AD = (y1 - y2);
        let OC = 0;
        let OB = 0;
        let BC = 0;
        const xB = x1 - (OD / 10);
        const xC = xB;
        const yC = y1;
        let yB = 0;
        for (var i = 0; i < 10; i++){
            OC = (OD / (10*i));
            OB = OC * OA;
            BC = Math.sqrt(Math.pow(OB, 2) - Math.pow(OC, 2));
            yB = yC - Math.sqrt(Math.pow(BC, 2) - Math.pow(xC - xB, 2));
            t.push(xB);
            t.push(yB);
        }
        return t;
    }

    * */
}
PionsWidget.nbPionsN = 0;
PionsWidget.nbPionsBR = 0;
PionsWidget.listePionsN = [];
PionsWidget.pionsTouches = [];
PionsWidget.listePionsBR = [];

export default PionsWidget;
