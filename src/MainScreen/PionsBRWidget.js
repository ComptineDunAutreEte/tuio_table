/* eslint-disable */

import PionsWidget from "./PionsWidget";
import BallonWidget from "./BallonWidget";


class PionsBRWidget extends PionsWidget {

    constructor(place, idp, x, y, width, height, imgSrc, ballon, premiereCreation) {
        super(idp, x, y, width, height, imgSrc);
        this.internX = x;
        this.internY = y;
        this.place = place;

        if (premiereCreation){
            console.log("starting team dans pionBRWidget : " + PionsWidget.startingTeam);
            if (!PionsBRWidget.unPionADejaEteChoisiPourAvoirLeBallon){
                if (PionsWidget.startingTeam === "blue"){
                    console.log("it's blue");
                    PionsBRWidget.pionChoisiPourAvoirLeBallonAuDebut = PionsBRWidget.getRandomIntInclusive(0,4);
                    PionsBRWidget.unPionADejaEteChoisiPourAvoirLeBallon = true;
                }
                else {
                    console.log("it's red");
                    PionsBRWidget.pionChoisiPourAvoirLeBallonAuDebut = PionsBRWidget.getRandomIntInclusive(5,9);
                    PionsBRWidget.unPionADejaEteChoisiPourAvoirLeBallon = true;
                }
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
            else {this.ballon = null; this.aLeBallon = false;}
        }
        else {
            if (ballon != null) {
                this.ballon = new BallonWidget(ballon.internX, ballon.internY, 50,50, 'assets/MainScreen/ballon.png');
                this.aLeBallon = true;
                PionsBRWidget.unPionADejaEteChoisiPourAvoirLeBallon = true;
                PionsBRWidget.pionChoisiPourAvoirLeBallonAuDebut = this.idp;
                this.ballon.addTo('#mainScreen');
            }
            else {
                this.ballon = null;
                this.aLeBallon = false;
            }
        }
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

        if (this.src === 'assets/MainScreen/pionB.png') {
            //S'il est prêt d'un but
            if ((this.isNextToBut(this.place)) && (this.aLeBallon)) {
                console.log("next to buts");
                PionsBRWidget.changeCages("bleu");
            }
        }
        else {
            if ((this.isNextToBut(this.place)) && (this.aLeBallon)) {
                console.log("next to buts");
                PionsBRWidget.changeCages("rouge");
            }
        }

    }

    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
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

    displayVoisins(){
        for (var i = 0; i < this.nbVoisins; i++) {
            this.voisins[i]._domElem.attr('src', 'assets/MainScreen/bscircle.png');
            this.voisins[i].src = 'assets/MainScreen/bscircle.png';
        }
    }

    onTouchCreation(tuioTouch) {
        if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
            BallonWidget.currentPion = this;
            if (this.src === 'assets/MainScreen/pionB.png'){
                console.log("bleuuu");
                if (PionsBRWidget.teamBleueJoue){
                    console.log("team bleu joue");
                //    console.log(tuioTouch.x + "  " + tuioTouch.y + " : " + this.internX + "  " + this.internY);
                    super.onTouchCreation(tuioTouch);
                  /*  if (this.aLeBallon) {
                        this.ballon.bougeParPion = true;
                        this.ballon.onTouchCreation(tuioTouch);
                    }*/
                    this.displayVoisins();
                }
            }
            else {
                console.log("rouuuge");
                if (PionsBRWidget.teamRougeJoue){
                    console.log("team rouge joue");
                  //  console.log(tuioTouch.x + "  " + tuioTouch.y + " : " + this.internX + "  " + this.internY + "ballon : " + this.ballon.internX + "  " + this.ballon.internY);
                    super.onTouchCreation(tuioTouch);
                   /* if (this.aLeBallon) {
                        this.ballon.bougeParPion = true;
                        this.ballon.onTouchCreation(tuioTouch);
                    }*/
                    //    }
                   this.displayVoisins();
                }
            }

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
        console.log("ON REPLACE LE BALLON");
        if (this.src === 'assets/MainScreen/pionB.png') {
            console.log("bleu");
            this.ballon._domElem.css('left', `${this.internX + this.width + 5}px`);
            this.ballon.internX = this.internX + this.width + 5;
            this.ballon.mx = this.ballon.internX;
        }
        else {
            console.log("rouge");
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
        pionVoisin.ballon = null;
        this.replaceBallon();
    }

    deselectVoisins(moi){
        for (var j = 0; j < moi.nbVoisins; j++){
            moi.voisins[j]._domElem.attr('src', 'assets/MainScreen/pionN.png');
            moi.voisins[j].src = 'assets/MainScreen/pionN.png';
        }
    }

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

    static changeCages(couleur){
        const img = document.createElement("img");
        img.src ='assets/MainScreen/cages1.jpg';
        const cname = "switchCages1";
        img.backgroundImage = 'assets/MainScreen/cages1.jpg';
        img.style.position = "absolute";
        img.style.width = "107px";
        img.style.height = "295px";
        img.style.zIndex = "400";
        img.className = cname;

        const img2 = document.createElement("img");
        img2.src = 'assets/MainScreen/cages2.jpg';
        const cname2 = "switchCage2";
        img2.backgroundImage = 'assets/MainScreen/cages2.jpg';
        img2.style.position = "absolute";

        img2.style.width = "107px";
        img2.style.height = "295px";
        img2.style.zIndex = "400";
        img2.className = cname2;

        const img3 = document.createElement("img");
        img3.src = 'assets/MainScreen/cages4.jpg';
        const cname3 = "switchCage3";
        img3.backgroundImage = 'assets/MainScreen/cages4.jpg';
        img3.style.position = "absolute";
        img3.style.width = "107px";
        img3.style.height = "295px";
        img3.style.zIndex = "400";
        img3.className = cname3;

        if (couleur === "bleu"){
            console.log("on est bleuuuus");
            img.style.left = "1793px";
            img.style.top = "392px";

            img2.style.left = "1793px";
            img2.style.top = "392px";

            img3.style.left = "1793px";
            img3.style.top = "392px";
        }
        else {
            console.log("on est rouuuuges");
            img.style.left = "20px";
            img.style.top = "392px";

            img2.style.left = "20px";
            img2.style.top = "392px";

            img3.style.left = "20px";
            img3.style.top = "392px";
        }

        console.log("près du but (dans changeCages)");
        $('#mainScreen').append(img2, img);
    }

    static estDansLaSurfaceBleue(pion){
        return pion.place < 28;
    }

    static estDansLaSurfaceRouge(pion){
        return pion.place > 27;
    }

    static sontDansLaMemeSurfaceDeJeu(pA,pB) {
        return ((PionsBRWidget.estDansLaSurfaceBleue(pA) && PionsBRWidget.estDansLaSurfaceBleue(pB)) || (PionsBRWidget.estDansLaSurfaceRouge(pA) && PionsBRWidget.estDansLaSurfaceRouge(pB)));
    }

    onTouchDeletion(tuioTouchId) {
        let deplace = false;
          if(this.aEteTouche){
              PionsWidget.setPionsTouches(this.idp, 0);
              this._domElem.css('width', `${this.width}px`);
              this._domElem.css('height', `${this.height}px`);
              this.aEteTouche = false;
          }
         // return super.onTouchDeletion(tuioTouchId);
        super.onTouchDeletion(tuioTouchId);
        if (this.aLeBallon) this.ballon.onTouchDeletion(tuioTouchId);
        if (typeof (this._lastTouchesValues[tuioTouchId]) !== 'undefined') {
            //On remet les voisins normaux
            for (var j = 0; j < PionsWidget.nbPionsBR; j++){
                this.deselectVoisins(PionsWidget.listePionsBR[j]);
            }
            let nbV = this.nbVoisins;
            const intX = this.internX;
            const intY = this.internY;
            const vois = this.voisins;
            for (var i = 0; i < nbV; i++) {
                //Si le pion est relaché près d'un de ses voisins
                if ((intX <= vois[i].internX + 40 - 14.5) &&
                    (intX >= vois[i].internX - 40 - 14.5) &&
                    (intY <= vois[i].internY + 40 - 14.5) &&
                    (intY >= vois[i].internY - 40 - 14.5)){

                    //Si le voisin n'est pas un pion mais une case
                    if (PionsBRWidget.voisIsNotPawn(vois[i])){
                        //On remet les voisins normaux
                        this.deselectVoisins(this);

                        //Changement coordonnées de ce pion qui prend les coordonnées de son voisin
                        PionsBRWidget.goOnVoisin(this, this.voisins[i]);

                        //Changement coordonnées du ballon si le pion le possède
                        if (this.aLeBallon){
                            console.log("IL A LE BALLON");
                            this.replaceBallon();
                        }
                        nbV = i;
                        deplace = true;
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

                            deplace = true;
                        }
                        else {
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
                    if ((this.aLeBallon)&&(PionsBRWidget.coequipierLePlusLoin(this) !== this)&&(PionsBRWidget.sontDansLaMemeSurfaceDeJeu(PionsBRWidget.coequipierLePlusLoin(this), this))){
                        PionsBRWidget.coequipierLePlusLoin(this).takeBallon(this);
                    }
                    console.log("touché 2 fois : " + this.nbTouched);
                }
                //Sinon
                else {
                    //On remet les voisins normaux
                    for (var j = 0; j < PionsWidget.nbPionsBR; j++){
                        this.deselectVoisins(PionsWidget.listePionsBR[j]);
                    }
                    if (PionsBRWidget.firstButtonClicked != null) PionsBRWidget.firstButtonClicked.nbTouched = 0;
                    PionsBRWidget.firstButtonClicked = this;
                    this.nbTouched++;
                }
            }
            else {
                //Si c'est un pion bleu qui est touché
                if (this.src === 'assets/MainScreen/pionB.png'){
                    //S'il est prêt d'un but
                   /* if ((this.isNextToBut(this.place))&&(this.aLeBallon)){
                        console.log("next to buts");
                        PionsBRWidget.changeCages("bleu");
                    }
                    else {
                        console.log("not près du but");
                    }*/
                    this.pawnTouched("blue");
                }
                //Si c'est un pion rouge qui est touché
                else {
                    //S'il est prêt d'un but
                  /*  if ((this.isNextToBut(this.place))&&(this.aLeBallon)){
                        PionsBRWidget.changeCages("rouge");
                    }*/
                    this.pawnTouched("red");
                }
            }
        }
        else {}

    }



    moveTo(x, y, angle = null) {
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
