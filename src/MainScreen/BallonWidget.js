/* eslint-disable */

import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';


class BallonWidget extends ElementWidget {

    constructor(x, y, width, height, imgSrc) {
        super(x, y, width, height, 0, 1);
        if (new.target === ElementWidget) {
            throw new TypeError('ElementWidget is an abstract class. It cannot be instanciated');
        }
        this.bougeParPion = false;
        this.src = imgSrc;
        this._domElem = $('<img>');
        this._domElem.attr('src', imgSrc);
        this._domElem.css('width', `${this.width}px`);
        this._domElem.css('height', `${this.height}px`);
        this._domElem.css('position', 'absolute');
        this._domElem.css('z-index', `${this.zIndex}`);
        this._domElem.css('left', `${x}px`);
        this._domElem.css('top', `${y}px`);


        this.mx = x;
        this.my = y;
    }

    getId(){
        return this.idf;
    }

    onTouchCreation(tuioTouch) {
        if (this.bougeParPion) {
            super.onTouchCreation(tuioTouch);
            this.bougeParPion = false;
        }
    }

    onTouchUpdate(tuioTouch) {
        if (this.bougeParPion){
            super.onTouchUpdate(tuioTouch);
            this.bougeParPion = false;
        }
    }

    onTouchDeletion(tuioTouchId) {
        if (this.bougeParPion) {
            super.onTouchDeletion(tuioTouchId);
            this.bougeParPion = false;
        }
    }

    get domElem() { return this._domElem; }
}

export default BallonWidget;
