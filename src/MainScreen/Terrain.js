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
        this.createPions();
        this.observer = observer;
        console.log(this.observer);
        this.attachObserverToPawns(observer);
        /*   this.pionsEquipeR = this.createPionsR();
           this.pionsEquipeB = this.createPionsB();*/
    }
    createPions() {
        let t = [];
        let pionsB = [];
        let pionsR = [];
     //   pionsB = [2,4,8,10,12/*,30,32, 36,38,40*/];
       // pionsR = [/*15,17,19,23,25,*/ 43, 45, 47,51,53];
        if (FormationWidget.formationBChoisie.getId() === "1"){
            pionsB = [2,4,8,10,12/*,30,32, 36,38,40*/];
        }
        else if (FormationWidget.formationBChoisie.getId()=== "2"){
            pionsB = [2,3,4,5,10/*,30,32, 36,38,40*/];
        }
        else if (FormationWidget.formationBChoisie.getId() === "3"){
            pionsB = [1,5,9,10,11/*,30,32, 36,38,40*/];
       }
        if (FormationWidget.formationRChoisie.getId() === "1"){
            pionsR = [/*15,17,19,23,25,*/ 43, 45, 47,51,53];
      }
        else if (FormationWidget.formationRChoisie.getId() === "2"){
            pionsR = [/*15,17,19,23,25,*/ 45, 50, 51,52,53];
        }
        else if (FormationWidget.formationRChoisie.getId() === "3"){
            pionsR = [/*15,17,19,23,25,*/ 44, 45, 46,50,54];
        }
        let inc = 2;
        let mx = 0;
        let my = 0;
        let mt = 0;
        for (var i = 0; i < 56; i++) {
            if (i % 7 == 0) {
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
            new Pions(0, i, 200 + i + my, 100 + (i - mx) * 130 - mt, "none");

            /*   if (inc == 2){
                   mt = 85;
               }
               else {
                   mt = 0;
               } */
        }
        var id = 0;
        for (var j = 0; j < 56; j++){
            if (j % 7 == 0) {
                if (inc == 2) inc = 1;
                else inc = 2;
                mx = j;
                my = j * 29;
            }
            if (pionsB.includes(j)) {
                new Pions(j, id, 200 + j + my - 14.5, 100 + (j - mx) * 130 - mt - 14.5, "bleu");
                id++;
            } else if (pionsR.includes(j)) {
                new Pions(j, id, 200 + j + my - 14.5, 100 + (j - mx) * 130 - mt - 14.5, "rouge");
                id++;
            }
        }
       /* for (var j = 0; j < 36; j++) {
            console.log(PionsWidget.getPionsTouches()[j]);
        }*/
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
        for (let i = 0; i < PionsWidget.listePionsBR.length; i++) {
            const temp = PionsWidget.listePionsBR[i];
            temp["observer"] = obs;
        }
    }


}

export default Terrain;
