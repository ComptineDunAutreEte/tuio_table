/*eslint-disable*/
import FormationWidget from "../FormationScreen/FormationWidget";
import Pions from "./Pions";
import PionsWidget from "./PionsWidget";
import TerrainWidget from "./TerrainWidget";

class Terrain {
    constructor(x, y, width, height, div, observer) {
        this.div = div;
        this.widget = new TerrainWidget(x, y, width, height, 'assets/MainScreen/terrain1.png');
        this.widget.addTo(div);
        // this.pions = this.createPions();
        /* before */

        /* modified */
        this.pions = [];
        this.observer = observer;
        this.createPions();
        this.attachObserverToPawns(observer);
        /*   this.pionsEquipeR = this.createPionsR();
           this.pionsEquipeB = this.createPionsB();*/
    }
    createPions(){
        let t = [];
        let pionsB = [1,3,5,9,11/*,30,32, 36,38,40*/];
        let pionsR = [/*15,17,19,23,25,*/ 44, 46, 50,52,54];
        let inc = 2;
        let mx = 0;
        let my = 0;
        let mt = 0;
        for (var i = 0; i < 56; i++){
            if (i % 7 == 0){
                if (inc == 2) inc = 1;
                else inc = 2;
                mx = i;
                my = i * 29;
            }
         /*   if (inc == 2){
                mt = 85;
            }
            else {
                mt = 0;
            } */
             if (pionsB.includes(i)){
                 t[i] = new Pions(-1, 200 + i + my,100 + (i-mx) * 130 - mt,"bleu");
             }
             else if (pionsR.includes(i)){
                 t[i] = new Pions(-1, 200 + i + my,100 + (i-mx) * 130 - mt,"rouge");
             }
             else {
                 t[i] = new Pions(-1, 200 + i + my, 100 + (i - mx) * 130 - mt, "none");
             }
            /*   if (inc == 2){
                   mt = 85;
               }
               else {
                   mt = 0;
               } */
        }
        for (var j = 0; j < 36; j++) {
            console.log(PionsWidget.getPionsTouches()[j]);
        }
        return t;

    }

    /*  createPionsR(){
          let t = {};
          let xlist = {}
          for (var i = 0; i < 10; i++){
              t[i] = new Pions(i ,i * 90,"rouge");
          }
          return t;
      }
      createPionsB(){
          let t = {};
          for (var i = 0; i < 10; i++){
              t[i] = new Pions((i * 70) + 1,(i * 70)  +1,"bleu");
          }
          return t;
      }*/

    attachObserverToPawns(obs) {
        for (let i = 0; i < this.pions.length; i++) {
            const temp = this.pions[i].widget;
            temp["observer"] = obs;
        }
    }


}

export default Terrain;
