/* eslint-disable */

import PionsWidget from "./PionsWidget";
import BallonWidget from "./BallonWidget";
import Pions from "./Pions";


class PionsBRWidget extends PionsWidget {

    constructor(place, idp, x, y, width, height, imgSrc) {
        super(idp, x, y, width, height, imgSrc);
        this.place = place;
        this.ballon = null;
        if (!PionsBRWidget.unPionADejaEteChoisiPourAvoirLeBallon){
            PionsBRWidget.pionChoisiPourAvoirLeBallonAuDebut = PionsBRWidget.getRandomInt(10);
            PionsBRWidget.unPionADejaEteChoisiPourAvoirLeBallon = true;
        }
        if (PionsBRWidget.pionChoisiPourAvoirLeBallonAuDebut === this.idp) {
            this.aLeBallon = true;
            if (imgSrc ===  'assets/MainScreen/pionB.png'){
                this.ballon = new BallonWidget(this.x + this.width + 5, this.y + 20, 50,50, 'assets/MainScreen/ballon.png');
            }
            else {
                this.ballon = new BallonWidget(this.x - 40, this.y + 20, 50,50, 'assets/MainScreen/ballon.png');
            }

            this.ballon.addTo('#mainScreen');}
        else {this.aLeBallon = false;}
        this.voisins = PionsWidget.getListePionsN()[this.place].voisins;
        this.nbVoisins = PionsWidget.getListePionsN()[this.place].nbVoisins;
        PionsWidget.listePionsBR.push(this);
        PionsWidget.nbPionsBR++;

        //savoir si un pion a été touché 1 ou 2 fois
        this.aEteBouge = false;
        this.nbTouched = 0;
        this.touched2times = false;
        this.passDisplayed = false;

        this.mx = x;
        this.my = y;
    }

    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    contains(liste, n, obj){
        for (var l = 0; l < n; l++){
            if (liste[l] === obj){
                return true;
            }
        }
        return false;
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

    displayPass(){
        console.log("display pass");
        this.nbTouched = 0;
        this.passDisplayed = true;
        if (PionsBRWidget.pionDisplayed != null){
            if (PionsBRWidget.pionDisplayed !== this){
                for (var k = 0; k < PionsBRWidget.pionDisplayed.nbVoisins; k++) {
                    if (!this.contains(this.voisins, this.nbVoisins, PionsBRWidget.pionDisplayed.voisins[k])){
                        PionsBRWidget.pionDisplayed.voisins[k]._domElem.attr('src', 'assets/MainScreen/bcircle.png');
                        PionsBRWidget.pionDisplayed.voisins[k].src = 'assets/MainScreen/bcircle.png';
                    }
                }
            }
        }
        PionsBRWidget.firstButtonClicked = this;
        PionsBRWidget.pionDisplayed = this;
    }

    onTouchCreation(tuioTouch) {
        if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
           // else if (this.nbTouched == 0) {
            super.onTouchCreation(tuioTouch);
            if (this.aLeBallon) {
                this.ballon.bougeParPion = true;
                this.ballon.onTouchCreation(tuioTouch);
            }
            //    }
            for (var i = 0; i < this.nbVoisins; i++) {
                this.voisins[i]._domElem.attr('src', 'assets/MainScreen/bscircle.png');
                this.voisins[i].src = 'assets/MainScreen/bscircle.png';
            }
        }
    }


    onTouchUpdate(tuioTouch){
        super.onTouchUpdate(tuioTouch);
        if (this.aLeBallon){
            this.ballon.onTouchUpdate(tuioTouch);
        }
      /*  if (this.aLeBallon){
            if (this.ballon.src ===  'assets/MainScreen/pionB.png') {
                /*   this.ballon._domElem.css('left', `${this.internX + this.width + 5}px`);
                   this.ballon.internX = this.internX + this.width + 5;
                   this.ballon.mx = this.ballon.internX;*/
                /*   tuioTouch.x = tuioTouch.x + this.width + 5;*/
        /*        tuioTouch.update(tuioTouch.x + this.width + 5, tuioTouch.y + 20);
            }
            else {
                /* this.ballon._domElem.css('left', `${this.internX - 40}px`);
                 this.ballon.internX = this.internX - 40; */
                //   tuioTouch.x = tuioTouch.x - 40;
        /*        tuioTouch.update(tuioTouch.x - 40, tuioTouch.y + 20);
            }
            /*   tuioTouch.y = tuioTouch.y + 20;*/
      //  }
    }

    voisIsNotPanw(vois){
        for (var i = 0; i < PionsWidget.nbPionsBR; i++){
            if (vois.idp === PionsWidget.listePionsBR[i].place) {
                return false;
            }
        }
        return true;
    }


    onTouchDeletion(tuioTouchId) {
        let deplace = false;
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
        super.onTouchDeletion(tuioTouchId);
        if (this.aLeBallon) this.ballon.onTouchDeletion(tuioTouchId);
        if (typeof (this._lastTouchesValues[tuioTouchId]) !== 'undefined') {
            let nbV = this.nbVoisins;
            const intX = this.internX;
            const intY = this.internY;
            const vois = this.voisins;
            for (var i = 0; i < nbV; i++) {
                if (((intX <= vois[i].internX + 20 - 14.5) &&
                    (intX >= vois[i].internX - 20 - 14.5) &&
                    (intY <= vois[i].internY + 20 - 14.5) &&
                    (intY >= vois[i].internY - 20 - 14.5)) &&
                    (this.voisIsNotPanw(vois[i]))){
                    for (var j = 0; j < this.nbVoisins; j++){
                        this.voisins[j]._domElem.attr('src', 'assets/MainScreen/bcircle.png');
                        this.voisins[j].src = 'assets/MainScreen/bcircle.png';
                    }
                    /*Changement coordonnées du pion*/
                    this._domElem.css('left', `${this.voisins[i].internX - 14.5}px`);
                    this._domElem.css('top', `${this.voisins[i].internY - 14.5}px`);
                    this.internX = this.voisins[i].internX - 14.5;
                    this.internY = this.voisins[i].internY - 14.5;
                    this.place = this.voisins[i].idp;
                    this.mx = this.internX;
                    this.my = this.internY;
                    this.nbVoisins = this.voisins[i].nbVoisins;
                    this.voisins = this.voisins[i].voisins;

                    /*Changement coordonnées du ballon*/
                    if (this.aLeBallon){
                        if (this.src === 'assets/MainScreen/pionB.png') {
                            this.ballon._domElem.css('left', `${this.internX + this.width + 5}px`);
                            this.ballon.internX = this.internX + this.width + 5;
                            this.ballon.mx = this.ballon.internX;
                        }
                        else {
                            this.ballon._domElem.css('left', `${this.internX - 40}px`);
                            this.ballon.internX = this.internX - 40;
                            this.ballon.mx = this.ballon.internX;
                        }
                        this.ballon._domElem.css('top', `${this.internY + 20}px`);
                        this.ballon.internY = this.internY + 20;
                        this.ballon.my = this.ballon.internY;

                    }
                    nbV = i;
                    deplace = true;
                }
            }
            if (!deplace) {
                console.log("iiccii");
                this._domElem.css('left', `${this.mx}px`);
                this._domElem.css('top', `${this.my}px`);
                this.internX = this.mx;
                this.internY = this.my;


                /*Changement coordonnées du ballon*/
                if (this.aLeBallon) {
                    this.ballon._domElem.css('left', `${this.ballon.mx}px`);
                    this.ballon.internX = this.ballon.mx;
                    this.ballon._domElem.css('top', `${this.ballon.my}px`);
                    this.ballon.internY = this.ballon.my;
                }
            }
            if (!this.passDisplayed) {
                for (var k = 0; k < this.nbVoisins; k++) {
                    this.voisins[k]._domElem.attr('src', 'assets/MainScreen/bcircle.png');
                    this.voisins[k].src = 'assets/MainScreen/bcircle.png';
                }
            }
            console.log("nombre de fois touche : " + this.nbTouched);
          /*  if (this.src === 'assets/MainScreen/pionB.png') {
                this.pawnTouched("blue");
            }
            else {
                this.pawnTouched("red");
            }*/
        }
        else {console.log("eruicvjdilj");}
    }


    moveTo(x, y, angle = null) {
      console.log("x : " + x +", y : " + y + " / internX : " + this.internX + ", internY : " + this.internY);
       if ((x === this.internX)&&(y === this.internY)){
         /*  if (PionsBRWidget.firstButtonClicked != null){
              console.log("ici !!!");
              PionsBRWidget.secondButtonClicked = this;
              console.log("this : " + this);
              /*const tabDiag = PionsBRWidget.buildTabDiagonale(PionsBRWidget.firstButtonClicked.internX, PionsBRWidget.firstButtonClicked.y,PionsBRWidget.secondButtonClicked.internX, PionsBRWidget.secondButtonClicked.y);
              for (var i = 0; i < tabDiag.length; i++){
                  PionsBRWidget.firstButtonClicked.ballon.internX = tabDiag[i];
                  i++;
                  PionsBRWidget.firstButtonClicked.ballon.internY = tabDiag[i];
              }*/
         /*     PionsBRWidget.secondButtonClicked.aLeBallon = true;
              PionsBRWidget.firstButtonClicked.aLeBallon = false;
              PionsBRWidget.secondButtonClicked.ballon = PionsBRWidget.firstButtonClicked.ballon;
              if (PionsBRWidget.secondButtonClicked.ballon.src === 'assets/MainScreen/pionB.png') {
                  PionsBRWidget.secondButtonClicked.ballon.internX = PionsBRWidget.secondButtonClicked.internX + PionsBRWidget.secondButtonClicked.width + 5;
              }
              else {
                  PionsBRWidget.secondButtonClicked.ballon.internX = PionsBRWidget.secondButtonClicked.internX - 40;
              }
              PionsBRWidget.secondButtonClicked.ballon.internY = PionsBRWidget.secondButtonClicked.internY + 20;

              PionsBRWidget.firstButtonClicked = null;
              PionsBRWidget.secondButtonClicked = null;
           }*/
           if (!this.passDisplayed){
               this.nbTouched++;
               console.log(this.nbTouched);
           }
           else {
               this.passDisplayed = false;
               this.nbTouched = 0;
               PionsBRWidget.firstButtonClicked = null;
           }

           /*this.aEteBouge = true;*/ console.log("presque pas bouge");
       }
       else {
           this.nbTouched = 0;
           for (var k = 0; k < PionsBRWidget.pionDisplayed.nbVoisins; k++) {
               if (!this.contains(this.voisins, this.nbVoisins, PionsBRWidget.pionDisplayed.voisins[k])){
                   PionsBRWidget.pionDisplayed.voisins[k]._domElem.attr('src', 'assets/MainScreen/bcircle.png');
                   PionsBRWidget.pionDisplayed.voisins[k].src = 'assets/MainScreen/bcircle.png';
               }
           }
           PionsBRWidget.firstButtonClicked = null;
       }
       if (this.nbTouched === 2){
           console.log("2 fois touche");
           this.nbTouched = 0;
           this.displayPass();
       }
        super.moveTo(x, y, angle);
    }



}
PionsBRWidget.pionDisplayed = null;
PionsBRWidget.unPionADejaEteChoisiPourAvoirLeBallon = false;
PionsBRWidget.pionChoisiPourAvoirLeBallonAuDebut = 0;
PionsBRWidget.firstButtonClicked = null;
PionsBRWidget.secondButtonClicked = null;

export default PionsBRWidget;
