/* eslint-disable */

import PionsWidget from "./PionsWidget";


class PionsBRWidget extends PionsWidget {

    constructor(place, idp, x, y, width, height, imgSrc) {
        super(idp, x, y, width, height, imgSrc);
        this.place = place;
        this.voisins = PionsWidget.getListePionsN()[this.place].voisins;
        this.nbVoisins = PionsWidget.getListePionsN()[this.place].nbVoisins;
        PionsWidget.listePionsBR.push(this);
        PionsWidget.nbPionsBR++;
    }

    onTouchCreation(tuioTouch) {
        if (this.src === 'assets/MainScreen/pionB.png' || this.src === 'assets/MainScreen/pionR.png') {
            if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
                super.onTouchCreation(tuioTouch);
                console.log(this.voisins);
                for (var i = 0; i < this.nbVoisins; i++){
                    this.voisins[i]._domElem.attr('src', 'assets/MainScreen/bscircle.png');
                    this.voisins[i].src = 'assets/MainScreen/bscircle.png';
                }

            }
            // console.log("LES VOISINS : " + this.voisins);
        }
    }


}

export default PionsBRWidget;
