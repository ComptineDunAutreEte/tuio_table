/* eslint-disable */

import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';


class ButtonWidget extends ElementWidget {
    /**
     * ImageWidget constructor.
     *
     * @constructor
     * @param {number} x - ImageWidget's upperleft coin abscissa.
     * @param {number} y - ImageWidget's upperleft coin ordinate.
     * @param {number} width - ImageWidget's width.
     * @param {number} height - ImageWidget's height.
     */
    constructor(x, y, width, height, imgSrc) {
        super(x, y, width, height, 0, 1);
        if (new.target === ElementWidget) {
            throw new TypeError('ElementWidget is an abstract class. It cannot be instanciated');
        }


        this._lastTouchesValues = {};
        this._lastTagsValues = {};

        this._domElem = $('<input>');
        this._domElem.css('width', `${width}px`);
        this._domElem.css('height', `${height}px`);
        this._domElem.css('position', 'absolute');
        this._domElem.css('left', `${x}px`);
        this._domElem.css('top', `${y}px`);

        this._domElem.attr('type',"button");
        this._domElem.attr('value', "+");
    }

    onTouchCreation(tuioTouch) {
        super.onTouchCreation(tuioTouch);
        if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
            console.log(" je suis toucheeyyyy");
        }
    }
    get domElem() { return this._domElem; }
}

export default ButtonWidget;
