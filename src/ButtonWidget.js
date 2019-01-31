/*eslint-disable*/
import $ from 'jquery/dist/jquery.min';

// import TUIOWidget from 'tuiomanager/core/TUIOWidget';
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
    constructor(x, y, width, height, rotation, scale, imgSrc) {
        super(x, y, width, height, rotation, scale);
        if (new.target === ElementWidget) {
            throw new TypeError('ElementWidget is an abstract class. It cannot be instanciated');
        }


        this._lastTouchesValues = {};
        this._lastTagsValues = {};

        this._domElem = $('<img>');
        this._domElem.attr('src', imgSrc);
        this._domElem.css('width', `${width}px`);
        this._domElem.css('height', `${height}px`);
        this._domElem.css('position', 'absolute');
        this._domElem.css('left', `${x}px`);
        this._domElem.css('top', `${y}px`);
    }
}

export default ButtonWidget;
