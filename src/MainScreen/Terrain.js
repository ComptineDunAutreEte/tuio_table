/*eslint-disable*/
import FormationWidget from "../FormationScreen/FormationWidget";
import Pions from "./Pions";

class Terrain{
    constructor(x, y, width, height, div){
        this.div = div;
        this.widget = new FormationWidget(x,y,width, height, 'assets/MainScreen/terrain1.png');
        this.widget.addTo(div);
        this.pions = this.createPions();
     /*   this.pionsEquipeR = this.createPionsR();
        this.pionsEquipeB = this.createPionsB();*/
    }

    createPions(){
        let t = {};
        let mx = 0;
        let my = 0
        for (var i = 0; i < 35; i++){
            if (i % 5 == 0){
                mx = i;
                my = i * 40;
            }
            t[i] = new Pions(280 + i + my,200 + (i-mx) * 150,"none");
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


}

export default Terrain;
