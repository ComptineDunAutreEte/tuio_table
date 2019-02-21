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

        BallonWidget.listeAEffacer.push(this);
    }

    getId(){
        return this.idf;
    }

    onTouchCreation(tuioTouch) {
<<<<<<< HEAD
      /*  console.log("coucou tuioTouch du ballon");
        if (this.bougeParPion) {
            super.onTouchCreation(tuioTouch);
            this.bougeParPion = false;
        }*/
     /* if (BallonWidget.currentPion.src === 'assets/MainScreen/pionB.png'){
          if (this.isTouched(tuioTouch.x + 105, tuioTouch.y + 20)) {
              console.log("oui on m'a déplacé c'est tellement cool !");
              super.onTouchCreation(tuioTouch);
          }
          else if (BallonWidget.currentPion.ballon === this){
              console.log("oui on m'a déplacé c'est tellement cool !");
              super.onTouchCreation(tuioTouch);
          }
      }
      else {
          console.log("Trop cool, je suis attaché à un ballon rouge ! Allez les rouuuuges");
          if (this.isTouched(tuioTouch.x - 40, tuioTouch.y + 20)) {
              console.log("oui on m'a déplacé c'est tellement cool !");
              super.onTouchCreation(tuioTouch);
          }
          else if (BallonWidget.currentPion.ballon === this){
              console.log("oui on m'a déplacé c'est tellement cool !");
              super.onTouchCreation(tuioTouch);
          }
          else {
              console.log("bouhouhouh, je ne suis pas touché");
          }
      }*/

=======
        if (this.bougeParPion) {
            super.onTouchCreation(tuioTouch);
            this.bougeParPion = false;
        }
>>>>>>> parent of ec47212... sauvegarde état jeu
    }

    onTouchUpdate(tuioTouch) {
        super.onTouchUpdate(tuioTouch);
        if (this.bougeParPion){
            this.bougeParPion = false;
        }
    }

    onTouchDeletion(tuioTouchId) {
        if (typeof (this._lastTouchesValues[tuioTouchId]) !== 'undefined') {
            super.onTouchDeletion(tuioTouchId);
        }
        if (this.bougeParPion) {
            this.bougeParPion = false;
        }
    }

    delete(){
        this.deleteWidget();
    }

    get domElem() { return this._domElem; }
}
BallonWidget.listeAEffacer = [];
export default BallonWidget;
