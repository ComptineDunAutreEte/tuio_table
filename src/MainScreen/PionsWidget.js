/* eslint-disable */

import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';
import Pions from "./Pions";


class PionsWidget extends ElementWidget {

    constructor(x, y, width, height, imgSrc) {
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
        for (var i = 0; i < PionsWidget.nbPions; i++){
            PionsWidget.setPionsTouches(i, 0);
        }
        PionsWidget.listPions.push(this);
        this.idp = PionsWidget.nbPions;
        PionsWidget.nbPions++;
    }

    static getListePions(){
        return PionsWidget.listPions;
    }
    static getPionsTouches(){
        return PionsWidget.pionsTouches;
    }

    static setPionsTouches(id, val){
        PionsWidget.pionsTouches[id] = val;
    }

    getSrc(){
        return this.src;
    }

    changeSrc(src){
        this.src = src;
    }

    onTouchCreation(tuioTouch) {
        super.onTouchCreation(tuioTouch);
        if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
            console.log(" pion toucheeyyyy");
            for (var i = 0; i < PionsWidget.nbPions; i++){
                if (PionsWidget.getPionsTouches()[i] == 1){
                    PionsWidget.setPionsTouches(i, 0);
                   // PionsWidget.getListePions()[i].src = 'assets/MainScreen/pionN.png';
                }
            }
            PionsWidget.setPionsTouches(this.idp, 1);
            // PionsWidget.getListePions()[i].src = 'assets/MainScreen/pionB.png';
            console.log(PionsWidget.pionsTouches);

        }
    }

    onTouchUpdate(tuioTouch) {

    }

    get domElem() { return this._domElem; }
}
PionsWidget.nbPions = 0;
PionsWidget.listPions = [];
PionsWidget.pionsTouches = [];

export default PionsWidget;
