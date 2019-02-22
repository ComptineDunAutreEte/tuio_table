/*eslint-disable*/

import PionsBRWidget from "../MainScreen/PionsBRWidget";

class playingSequence {

    constructor(sequence, obs) {
        this.questionResults = sequence; // tableau envoyé par lutthy : 0 = plus rapide
        this.indexInResults = 0;
        this.nbOfActions = sequence.length;
        this.observer = obs;
        console.error(this.questionResults[0]);
    }

    start() {
        console.log("starting playing sequence : ");
        this.indexInResults = 0;
        console.log(this);
        this.playTurn();
    }

    playTurn() {
        console.log("starting turn");
        if (this.indexInResults >= this.nbOfActions) {
            this.endOfSequence();
        } else {
            //const teamToPlay = "red";
            const teamToPlay = this.questionResults[this.indexInResults];
            console.log("team to play = " + teamToPlay);
            if (teamToPlay === "red") {
                PionsBRWidget.teamRougeJoue = true;
                PionsBRWidget.teamBleueJoue = false;
            }
            else if (teamToPlay === "blue") {
                PionsBRWidget.teamBleueJoue = true;
                PionsBRWidget.teamRougeJoue = false;
            }
            else if (!teamToPlay) {
                PionsBRWidget.teamBleueJoue = false;
                PionsBRWidget.teamRougeJoue = false;
            }
            try {
                this.observer.actualScreen.startOfTurn(teamToPlay);
                this.indexInResults++;
            } catch {
                console.log("you are not on the main screen");
            }
        }
    }

    endOfSequence(){
        // envoyer au server qu'il faut envoyer une nouvelle question
        this.observer.sendMessage("endOfSequence", 'request-question');
        this.questionResults = [];
        this.indexInResults = 0;
    }

} export default playingSequence;
