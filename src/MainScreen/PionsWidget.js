/* eslint-disable */

import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';


class PionsWidget extends ElementWidget {

    constructor(idp, x, y, width, height, imgSrc) {
        //Choses communes
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
        if (PionsWidget.nbPionsN === 56) {for (var i = 0; i < PionsWidget.nbPionsN; i++) {PionsWidget.listePionsN[i].updateVoisins();}}
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

    static getListePionsN() {
        return PionsWidget.listePionsN;
    }

    static setPionsTouches(id, val) {
        PionsWidget.pionsTouches[id] = val;
    }

    onTouchCreation(tuioTouch) {
        if (this.src === 'assets/MainScreen/pionB.png' || this.src === 'assets/MainScreen/pionR.png') {
            super.onTouchCreation(tuioTouch);
        }
    }

    onTouchDeletion(tuioTouchId){
        if (this.src === 'assets/MainScreen/pionB.png' || this.src === 'assets/MainScreen/pionR.png') {
            super.onTouchDeletion(tuioTouchId);
        }
    }

    static saveValues(){
        const valuesToSave = [];
        const places = [];
        const ballon = [];
        const src = [];
        for (var i = 0; i < PionsWidget.nbPionsBR; i++){
            places.push(PionsWidget.listePionsBR[i].place);
            ballon.push(PionsWidget.listePionsBR[i].ballon);
            src.push(PionsWidget.listePionsBR[i].src);
        }
        valuesToSave.push(places);
        valuesToSave.push(ballon);
        valuesToSave.push(src);
        return valuesToSave;
    }

    /* FOR DEMO CODE */
    pawnTouched(type) {
        if (type === "blue"){
            this.observer.pawnMoved("indiv", PionsWidget.saveValues());
        } else if (type === "red"){
            this.observer.pawnMoved("collectif", PionsWidget.saveValues());
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
