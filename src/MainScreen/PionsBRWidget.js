/* eslint-disable */

import PionsWidget from "./PionsWidget";
import BallonWidget from "./BallonWidget";


class PionsBRWidget extends PionsWidget {

    constructor(place, idp, x, y, width, height, imgSrc) {
        super(idp, x, y, width, height, imgSrc);
        this.place = place;
        if (!PionsBRWidget.unPionADejaEteChoisiPourAvoirLeBallon){
            PionsBRWidget.pionChoisiPourAvoirLeBallonAuDebut = PionsBRWidget.getRandomInt();
            PionsBRWidget.unPionADejaEteChoisiPourAvoirLeBallon = true;
        }
        if (PionsBRWidget.pionChoisiPourAvoirLeBallonAuDebut === this.idp) {this.aLeBallon = true; this.ballon = new BallonWidget(this.x - 20, this.y, 100,100, 'assets/MainScreen/ballon.png');  /*this.ballon.addTo('#mainScreen');*/}
        else {this.aLeBallon = false;}
        this.voisins = PionsWidget.getListePionsN()[this.place].voisins;
        this.nbVoisins = PionsWidget.getListePionsN()[this.place].nbVoisins;
        PionsWidget.listePionsBR.push(this);
        PionsWidget.nbPionsBR++;
    }

    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    onTouchCreation(tuioTouch) {
        super.onTouchCreation(tuioTouch);
        if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
            for (var i = 0; i < this.nbVoisins; i++){
                this.voisins[i]._domElem.attr('src', 'assets/MainScreen/bscircle.png');
                this.voisins[i].src = 'assets/MainScreen/bscircle.png';
            }

        }
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
        if (typeof (this._lastTouchesValues[tuioTouchId]) !== 'undefined') {
            console.log("COUCOUCOU");
            let nbV = this.nbVoisins;
            const intX = this.internX;
            const intY = this.internY;
            const vois = this.voisins;
            for (var i = 0; i < nbV; i++) {
                if ((intX <= vois[i].internX + 20 - 14.5) &&
                    (intX >= vois[i].internX - 20 - 14.5) &&
                    (intY <= vois[i].internY + 20 - 14.5) &&
                    (intY >= vois[i].internY - 20 - 14.5)) {
                    console.log("TAILLE VOISIN : " + this.voisins[i].nbVoisins);
                    for (var j = 0; j < this.nbVoisins; j++){
                        this.voisins[j]._domElem.attr('src', 'assets/MainScreen/bcircle.png');
                        this.voisins[j].src = 'assets/MainScreen/bcircle.png';
                    }
                    this._domElem.css('left', `${this.voisins[i].internX - 14.5}px`);
                    this._domElem.css('top', `${this.voisins[i].internY - 14.5}px`);
                    this.internX = this.voisins[i].internX - 14.5;
                    this.internY = this.voisins[i].internY - 14.5;
                    this.mx = this.internX;
                    this.my = this.internY;
                    this.nbVoisins = this.voisins[i].nbVoisins;
                    this.voisins = this.voisins[i].voisins;
                    console.log(this.voisins);
                    console.log(this.nbVoisins);
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
            }
            for (var k = 0; k < this.nbVoisins; k++){
                this.voisins[k]._domElem.attr('src', 'assets/MainScreen/bcircle.png');
                this.voisins[k].src = 'assets/MainScreen/bcircle.png';
            }
        }
        else {console.log("eruicvjdilj");}
    }


}
PionsBRWidget.unPionADejaEteChoisiPourAvoirLeBallon = false;
PionsBRWidget.pionChoisiPourAvoirLeBallonAuDebut = 0;

export default PionsBRWidget;
