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
        this.observer.sendMessage("endOfSequence",'request-question');
        this.questionResults = [];
        this.indexInResults = 0;
        // au serveur de decider quel est le type de question suivant
        // au lifecycle d'attendre les ordres du server 
    }

} export default playingSequence;