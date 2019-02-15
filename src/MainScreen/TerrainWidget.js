/* eslint-disable */

import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';


class TerrainWidget extends ElementWidget {

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
    }

    changeSrc(src){
        this.src = src;
    }

    onTouchCreation(tuioTouch) {
      /*  super.onTouchCreation(tuioTouch);
        if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
        }*/
    }

    onTouchUpdate(tuioTouch) {

    }

    get domElem() { return this._domElem; }
}

export default TerrainWidget;
