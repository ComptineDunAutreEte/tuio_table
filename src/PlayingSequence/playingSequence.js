/*eslint-disable*/

class playingSequence {

    constructor(sequence, obs){
        this.questionResults = sequence; // tableau envoyé par lutthy : 0 = plus rapide
        this.indexInResults = 0;
        this.nbOfActions = sequence.length;
        this.observer = obs;
    }

    start(){
        console.log("starting playing sequence : ");
        this.indexInResults = 0;
        console.log(this);
        this.playTurn();
    }

    playTurn(){
        console.log("start of next turn : " + this.questionResults);
        if (this.indexInResults >= this.nbOfActions){
            this.endOfSequence();
        } else {
            const teamToPlay = this.questionResults[this.indexInResults].team;
            console.log("team to play = " );
            console.log(teamToPlay);
            try{
                this.observer.actualScreen.startOfTurn(teamToPlay);
                this.indexInResults ++;
            }catch {
                console.log("you are not on the main screen");
            }
        }
    }

    endOfSequence(){
        // envoyer au server qu'il faut envoyer une nouvelle question
        // decider ici le type de question etc
        console.log("end of this playing sequence");
        this.observer.sendMessage("sendNextQuestion",'indivQuestion');
    }

} export default playingSequence;