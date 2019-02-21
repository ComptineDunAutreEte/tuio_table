/*eslint-disable*/
import FormationWidget from "../FormationScreen/FormationWidget";
import Pions from "./Pions";
import PionsWidget from "./PionsWidget";
import TerrainWidget from "./TerrainWidget";

class Terrain {
    constructor(x, y, width, height, div, observer, valuesSaved, startingTeam, premiereCreation) {
        this.div = div;
        this.widget = new TerrainWidget(x, y, width, height, 'assets/mainScreen.png');
        this.widget.addTo(div);
        PionsWidget.startingTeam = startingTeam;

        /* modified */
        this.observer = observer;
        this.valuesSaved = valuesSaved;
        this.premiereCreation = premiereCreation;
        console.log("premiere creation constructeur terrain : " + premiereCreation + "   " + this.premiereCreation);
        this.createPions();
        this.attachObserverToPawns(observer);
    }
    createPions() {
        let t = [];
        let pionsB = [];
        let pionsR = [];

        //Définition des formations
        if (FormationWidget.formationBChoisie.getId() === "1"){
            pionsB = [2,4,8,10,12];
        }
        else if (FormationWidget.formationBChoisie.getId()=== "2"){
            pionsB = [1,2,4,5,10];
        }
        else if (FormationWidget.formationBChoisie.getId() === "3"){
            pionsB = [1,5,9,10,11];
       }
        if (FormationWidget.formationRChoisie.getId() === "1"){
            pionsR = [43, 45, 47,51,53];
      }
        else if (FormationWidget.formationRChoisie.getId() === "2"){
            pionsR = [45, 50, 51,53,54];
        }
        else if (FormationWidget.formationRChoisie.getId() === "3"){
            pionsR = [44, 45, 46,50,54];
        }
        let inc = 2;
        let mx = 0;
        let my = 0;
        let mt = 0;
        for (var i = 0; i < 56; i++) {
            //Il n'y a que 7 pions sur une colonne
            if (i % 7 == 0) {
                if (inc == 2) inc = 1;
                else inc = 2;
                //On réinitialise le mx parce qu'on veut que le pion se replace en haut
                mx = i;
                //On décale le pion de 27 encore vers la droite
                my = i * 27;
            }
            //Création des cases
            new Pions(0, i, 220 + i + my, 100 + (i - mx) * 130 - mt, "none", null, true);
        }
        console.log("premiere creation terrain : " + this.premiereCreation);
        if (this.premiereCreation){
            var id = 0;
            for (var j = 0; j < 56; j++){
                if (j % 7 == 0) {
                    if (inc == 2) inc = 1;
                    else inc = 2;
                    mx = j;
                    my = j * 27;
                }
                if (pionsB.includes(j)) {
                    new Pions(j, id, 220 + j + my - 14.5, 100 + (j - mx) * 130 - mt - 14.5, "bleu",null, this.premiereCreation);
                    id++;
                } else if (pionsR.includes(j)) {
                    new Pions(j, id, 220 + j + my - 14.5, 100 + (j - mx) * 130 - mt - 14.5, "rouge",null, this.premiereCreation);
                    id++;
                }
            }
        }
        else {
            new Pions(null, null, null, null, null, this.valuesSaved, this.premiereCreation);
        }
        return t;

    }

    attachObserverToPawns(obs) {
        for (let i = 0; i < PionsWidget.listePionsBR.length; i++) {
            const temp = PionsWidget.listePionsBR[i];
            temp["observer"] = obs;
        }
    }


}

export default Terrain;
