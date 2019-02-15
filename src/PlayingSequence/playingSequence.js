/*eslint-disable*/

class playingSequence {

    constructor(sequence, obs){
        this.questionResults = sequence; // tableau envoyé par lutthy : 0 = plus rapide
        this.indexInResults = 0;
        this.nbOfActions = 3;
        this.observer = obs;
    }

    start(){
        console.log("starting playing sequence")
        this.indexInResults = 0;
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
                console.log("wrong screen bruh")
            }
        }
    }

    endOfSequence(){
        // envoyer au server qu'il faut envoyer une nouvelle question
        // decider ici le type de question etc
        console.log("end of this playing sequence");
    }

} export default playingSequence;