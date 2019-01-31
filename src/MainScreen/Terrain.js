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
        this.setPions();
        this.attachObserverToPawns(observer);
        /*   this.pionsEquipeR = this.createPionsR();
           this.pionsEquipeB = this.createPionsB();*/
    }

    createPions() {
        let t = {};
        let inc = 2;
        let mx = 0;
        let my = 0;
        let mt = 0;
        for (var i = 0; i < 40; i++) {
            if (i % 5 == 0) {
                if (inc == 2) inc = 1;
                else inc = 2;
                mx = i;
                my = i * 38;
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

    setPions() {
        let inc = 2;
        let mx = 0;
        let my = 0;
        let mt = 0;
        for (var i = 0; i < 40; i++) {
            if (i % 5 == 0) {
                if (inc == 2) inc = 1;
                else inc = 2;
                mx = i;
                my = i * 38;
            }
            /*   if (inc == 2){
                   mt = 85;
               }
               else {
                   mt = 0;
               } */
               this.pions.push(new Pions(220 + i + my, 200 + (i - mx) * 150 - mt, "none"))
        }
        for (var j = 0; j < 36; j++) {
            console.log(PionsWidget.getPionsTouches()[j]);
        }
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
