/* eslint-disable */

import PionsWidget from "./PionsWidget";
import BallonWidget from "./BallonWidget";


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

    static contains(liste, n, obj){
        for (var l = 0; l < n; l++){
            if (liste[l] === obj){
                return true;
            }
        }
        return false;
    }

    static coequipierLePlusLoin(pion){
        let pionLePlusLoin = pion;
        for (var i = 0; i < PionsWidget.nbPionsBR; i++){
            if (pion.src === PionsWidget.listePionsBR[i].src){
                if (pion.src === 'assets/MainScreen/pionB.png') {
                    if (PionsWidget.listePionsBR[i].internX > pionLePlusLoin.internX + 100){
                        pionLePlusLoin = PionsWidget.listePionsBR[i];
                    }
                }
                else {
                    if (PionsWidget.listePionsBR[i].internX < pionLePlusLoin.internX - 100){
                        pionLePlusLoin = PionsWidget.listePionsBR[i];
                    }
                }

            }
        }
        return pionLePlusLoin;
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
        this.nbTouched = 0;
        this.passDisplayed = true;
        if (PionsBRWidget.pionDisplayed != null){
            if (PionsBRWidget.pionDisplayed !== this){
                for (var k = 0; k < PionsBRWidget.pionDisplayed.nbVoisins; k++) {
                    if (!PionsBRWidget.contains(this.voisins, this.nbVoisins, PionsBRWidget.pionDisplayed.voisins[k])){
                        PionsBRWidget.pionDisplayed.voisins[k]._domElem.attr('src', 'assets/MainScreen/pionN.png');
                        PionsBRWidget.pionDisplayed.voisins[k].src = 'assets/MainScreen/pionN.png';
                    }
                }
            }
        }
        PionsBRWidget.firstButtonClicked = this;
        PionsBRWidget.pionDisplayed = this;
    }

    onTouchCreation(tuioTouch) {
        if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
            if (this.src === 'assets/MainScreen/pionB.png'){
                if (PionsBRWidget.teamBleueJoue){
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
            else {
                if (PionsBRWidget.teamRougeJoue){
                    super.onTouchCreation(tuioTouch);
                    if (this.aLeBallon) {
                        this.ballon.bougeParPion = true;
                        this.ballon.onTouchCreation(tuioTouch);
                    }
                    //    }
                    for (var j = 0; j < this.nbVoisins; j++) {
                        this.voisins[j]._domElem.attr('src', 'assets/MainScreen/bscircle.png');
                        this.voisins[j].src = 'assets/MainScreen/bscircle.png';
                    }
                }
            }
           // else if (this.nbTouched == 0) {

        }
    }


    onTouchUpdate(tuioTouch){
        super.onTouchUpdate(tuioTouch);
        if (this.aLeBallon){
            this.ballon.onTouchUpdate(tuioTouch);
        }
        if (this.aLeBallon){
           /* if (this.ballon.src ===  'assets/MainScreen/pionB.png') {
                   this.ballon._domElem.css('left', `${this.internX + this.width + 5}px`);
                   this.ballon.internX = this.internX + this.width + 5;
                   this.ballon.mx = this.ballon.internX;
                   tuioTouch.x = tuioTouch.x + this.width + 5;
                tuioTouch.update(tuioTouch.x + this.width + 5, tuioTouch.y + 20);
            }
            else {
                 this.ballon._domElem.css('left', `${this.internX - 40}px`);
                 this.ballon.internX = this.internX - 40;
                   tuioTouch.x = tuioTouch.x - 40;
                tuioTouch.update(tuioTouch.x - 40, tuioTouch.y + 20);
            }
               tuioTouch.y = tuioTouch.y + 20;*/
        }
    }

    isNextToBut(id){
        const listeCasesBleusButs = [49,50,51,52,53,54,55];
        const listeCasesRougesButs = [0,1,2,3,4,5,6];
        if (this.src === 'assets/MainScreen/pionB.png') {
            if (listeCasesBleusButs.includes(id)){
                return true;
            }
        }
        else {
            if (listeCasesRougesButs.includes(id)){
                return true;
            }
        }
        return false;
    }

    /* */

    static voisIsNotPawn(vois){
        for (var i = 0; i < PionsWidget.nbPionsBR; i++){
            if (vois.idp === PionsWidget.listePionsBR[i].place) {
                return false;
            }
        }
        return true;
    }

    static voisIsDifferent(vois){
        return this.src !== vois.src;
    }

    replaceBallon(){
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

    static getPionOnCase(idp){
        for (var i = 0; i < PionsWidget.nbPionsBR; i++){
            if (PionsWidget.listePionsBR[i].place === idp){
                return PionsWidget.listePionsBR[i];
            }
        }
        return null;
    }

    static goOnVoisin(me, voisin){
        me._domElem.css('left', `${voisin.internX - 14.5}px`);
        me._domElem.css('top', `${voisin.internY - 14.5}px`);
        me.internX = voisin.internX - 14.5;
        me.internY = voisin.internY - 14.5;
        me.place = voisin.idp;
        me.mx = me.internX;
        me.my = me.internY;
        me.nbVoisins = voisin.nbVoisins;
        me.voisins = voisin.voisins;
    }

    takeBallon(pionVoisin){
        this.ballon = pionVoisin.ballon;
        this.aLeBallon = true;
        pionVoisin.aLeBallon = false;
        this.replaceBallon();
    }

    deselectVoisins(moi){
        for (var j = 0; j < moi.nbVoisins; j++){
            moi.voisins[j]._domElem.attr('src', 'assets/MainScreen/pionN.png');
            moi.voisins[j].src = 'assets/MainScreen/pionN.png';
        }
    }

/*    myMove(elem) {
        var pos = 0;
        var id = setInterval(frame, 10);
        this.frame(elem, pos, id);
    }

    frame(elem, pos, id) {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }*/

    displayNextImage(x, images) {
        x = (x === images.length - 1) ? 0 : x + 1;
        document.getElementById("img").src = images[x];
    }

    displayPreviousImage() {
        x = (x <= 0) ? images.length - 1 : x - 1;
        document.getElementById("img").src = images[x];
    }

    startTimer(x, images) {
        setInterval(this.displayNextImage, 3000, x, images);
    }

    static changeCages(){
        console.log("près du but");
        const img = document.createElement("img");

        img.src ='assets/MainScreen/cages1.jpg';
        const cname = "switchCages1";
        img.backgroundImage = 'assets/MainScreen/cages1.jpg';
        img.style.position = "absolute";
        img.style.left = "1780px";
        img.style.top = "380px";
        img.style.width = "119px";
        img.style.height = "320px";
        img.style.zIndex = "400";
        img.className = cname;

        const img2 = document.createElement("img");
        img2.src = 'assets/MainScreen/cages2.jpg';
        const cname2 = "switchCage2";
        img2.backgroundImage = 'assets/MainScreen/cages2.jpg';
        img2.style.position = "absolute";
        img2.style.left = "1780px";
        img2.style.top = "380px";
        img2.style.width = "119px";
        img2.style.height = "320px";
        img2.style.zIndex = "400";
        img2.className = cname2;

        const img3 = document.createElement("img");
        img3.src = 'assets/MainScreen/cages4.jpg';
        const cname3 = "switchCage3";
        img3.backgroundImage = 'assets/MainScreen/cages4.jpg';
        img3.style.position = "absolute";
        img3.style.left = "1780px";
        img3.style.top = "380px";
        img3.style.width = "119px";
        img3.style.height = "320px";
        img3.style.zIndex = "400";
        img3.className = cname3;

        $('#mainScreen').append(img2, img);
    }

    onTouchDeletion(tuioTouchId) {
        let deplace = false;
          if(this.aEteTouche){
              PionsWidget.setPionsTouches(this.idp, 0);
              console.log("désélectionné");
              this._domElem.css('width', `${this.width}px`);
              this._domElem.css('height', `${this.height}px`);
              this.aEteTouche = false;
              console.log("After touch : " + this.width + "    " + this.height);
              console.log("After touch :" + this.aEteTouche);
          }
         // return super.onTouchDeletion(tuioTouchId);
        super.onTouchDeletion(tuioTouchId);
        if (this.aLeBallon) this.ballon.onTouchDeletion(tuioTouchId);
        if (typeof (this._lastTouchesValues[tuioTouchId]) !== 'undefined') {
            let nbV = this.nbVoisins;
            const intX = this.internX;
            const intY = this.internY;
            const vois = this.voisins;
            for (var i = 0; i < nbV; i++) {
                //Si le pion est relaché près d'un de ses voisins
                if ((intX <= vois[i].internX + 20 - 14.5) &&
                    (intX >= vois[i].internX - 20 - 14.5) &&
                    (intY <= vois[i].internY + 20 - 14.5) &&
                    (intY >= vois[i].internY - 20 - 14.5)){

                    //Si le voisin n'est pas un pion mais une case
                    if (PionsBRWidget.voisIsNotPawn(vois[i])){
                        //On remet les voisins normaux
                        this.deselectVoisins(this);

                        //Changement coordonnées de ce pion qui prend les coordonnées de son voisin
                        PionsBRWidget.goOnVoisin(this, this.voisins[i]);

                        //Changement coordonnées du ballon si le pion le possède
                        if (this.aLeBallon){
                            this.replaceBallon();
                        }
                        nbV = i;
                        deplace = true;
                        if (this.isNextToBut(this.idp)){
                            PionsBRWidget.changeCages();
                        }
                        /*  if (this.src === 'assets/MainScreen/pionB.png'){this.pawnTouched("blue");}
                          else {this.pawnTouched("red");}*/
                    }
                    //Sinon si c'est un pion mais qu'il est différent
                    else if (PionsBRWidget.voisIsDifferent(PionsBRWidget.getPionOnCase(vois[i].idp))){
                        //S'il a le ballon il lui prend, sinon il ne peut pas se déplacer

                        const pionVoisin = PionsBRWidget.getPionOnCase(vois[i].idp);
                        if (pionVoisin.aLeBallon){
                            //On remet les voisins normaux
                            this.deselectVoisins(this);
                            this.takeBallon(pionVoisin);
                            const place = this.place;
                            PionsBRWidget.goOnVoisin(this, vois[i]);
                            PionsBRWidget.goOnVoisin(pionVoisin, PionsWidget.listePionsN[place]);

                            console.log("voisin après : " + PionsBRWidget.getPionOnCase(vois[i].idp).aLeBallon);
                            console.log("moi après : " + this.aLeBallon);

                            deplace = true;
                        }
                        else {
                            console.log("he doesn't have the ball");
                        }
                    }

                }
            }
            //Si le pion n'a pas été placé sur un voisin, ou si la case est prise il revient à sa place
            if (!deplace) {
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
                //Si le pion a été touché deux fois on ne déselectionne pas ses voisins
                if (this.nbTouched === 1){
                    this.nbTouched = -1;
                    PionsBRWidget.firstButtonClicked = this;
                    console.log("touché 2 fois : " + this.nbTouched);
                }
                //Sinon
                else {
                    //On remet les voisins normaux
                    for (var j = 0; j < PionsWidget.nbPionsBR; j++){
                        this.deselectVoisins(PionsWidget.listePionsBR[j]);
                    }

                    PionsBRWidget.firstButtonClicked = this;
                    this.nbTouched++;
                    console.log(this.nbTouched);
                }
            }
            else {
                if (this.src === 'assets/MainScreen/pionB.png'){
                    this.pawnTouched("blue");
                }else {this.pawnTouched("red");}
            }
         /*   if (!this.passDisplayed) {
                for (var k = 0; k < this.nbVoisins; k++) {
                    this.voisins[k]._domElem.attr('src', 'assets/MainScreen/pionN.png');
                    this.voisins[k].src = 'assets/MainScreen/pionN.png';
                }
            }*/
          /*  if (this.src === 'assets/MainScreen/pionB.png') {
                this.pawnTouched("blue");
            }
            else {
                this.pawnTouched("red");
            }*/
        }
        else {}
    }


    moveTo(x, y, angle = null) {
    /*   if ((x === this.internX)&&(y === this.internY)){
           //affichage possibilités passe
          /* if (PionsBRWidget.firstButtonClicked != null){
              console.log("ici !!!");
              PionsBRWidget.secondButtonClicked = this;
              console.log("this : " + this);
              const tabDiag = PionsBRWidget.buildTabDiagonale(PionsBRWidget.firstButtonClicked.internX, PionsBRWidget.firstButtonClicked.y,PionsBRWidget.secondButtonClicked.internX, PionsBRWidget.secondButtonClicked.y);
              for (var i = 0; i < tabDiag.length; i++){
                  PionsBRWidget.firstButtonClicked.ballon.internX = tabDiag[i];
                  i++;
                  PionsBRWidget.firstButtonClicked.ballon.internY = tabDiag[i];
              }
              PionsBRWidget.secondButtonClicked.aLeBallon = true;
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
        /*   if (!this.passDisplayed){
               this.nbTouched++;
               console.log(this.nbTouched);
           }
           else {
               this.passDisplayed = false;
               this.nbTouched = 0;
               PionsBRWidget.firstButtonClicked = null;
               PionsBRWidget.pionDisplayed = null;
           }
       }
       else {
           this.nbTouched = 0;
           if (PionsBRWidget.pionDisplayed != null){
               for (var k = 0; k < PionsBRWidget.pionDisplayed.nbVoisins; k++) {
                   if (!PionsBRWidget.contains(this.voisins, this.nbVoisins, PionsBRWidget.pionDisplayed.voisins[k])){
                       PionsBRWidget.pionDisplayed.voisins[k]._domElem.attr('src', 'assets/MainScreen/pionN.png');
                       PionsBRWidget.pionDisplayed.voisins[k].src = 'assets/MainScreen/pionN.png';
                   }
               }
           }
           PionsBRWidget.firstButtonClicked = null;
       }
       if (this.nbTouched === 2){
           console.log("2 fois touche");
           this.nbTouched = 0;
           this.displayPass();
           if (this.aLeBallon){
               console.log("envoie ballon");
               const cLePlusLoin = PionsBRWidget.coequipierLePlusLoin(this);
               if (this !== cLePlusLoin){
                   console.log("pas le même");
               }
               else {
                   console.log("le même");
               }
               console.log(cLePlusLoin);
               this.ballon.internX = 100;
               this.ballon.internY = 100;
               this.aLeBallon = false;
               cLePlusLoin.aLeBallon = true;
               cLePlusLoin.ballon = this.ballon;
               if (this.src === 'assets/MainScreen/pionB.png') {
                   this.ballon._domElem.css('left', `${cLePlusLoin.internX + cLePlusLoin.width + 5}px`);
                   cLePlusLoin.ballon.internX = cLePlusLoin.internX + this.width + 5;
               }
               else {
                   cLePlusLoin.ballon._domElem.css('left', `${cLePlusLoin.internX - 40}px`);
                   cLePlusLoin.ballon.internX = cLePlusLoin.internX - 40;}
               cLePlusLoin.ballon._domElem.css('top', `${cLePlusLoin.internY + 20}px`);
               cLePlusLoin.ballon.internY = cLePlusLoin.internY + 20;
           }

       }*/
        super.moveTo(x, y, angle);
    }



}
PionsBRWidget.pionDisplayed = null;
PionsBRWidget.unPionADejaEteChoisiPourAvoirLeBallon = false;
PionsBRWidget.pionChoisiPourAvoirLeBallonAuDebut = 0;
PionsBRWidget.firstButtonClicked = null;
PionsBRWidget.secondButtonClicked = null;
PionsBRWidget.teamRougeJoue = false;
PionsBRWidget.teamBleueJoue = true;

export default PionsBRWidget;
