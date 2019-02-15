/*eslint-disable*/
import $ from 'jquery/dist/jquery.min';
import FirstScreen from '../FirstScreen/FirstScreen';
import FormationScreen from '../FormationScreen/FormationScreen';
import MainScreen from '../MainScreen/MainScreen';

import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import WaitingScreen from '../WaitingScreen/WaitingScreen';
import client from '../client';
import playingSequence from '../PlayingSequence/playingSequence';

// Import JQuery


//const io = require('socket.io-client'); // SALE: chercher a mettre cette constante dans index pour quelle ne soit appellee que une fois
const separator = ",";
let done = [false, false];

function enableMessage() {
    document.getElementById('messageT').style.visibility = 'visible';
    document.getElementById('messageB').style.visibility = 'visible';
    const videoTop = $("#videoTop");
    const videoBot = $("#videoBot");
    //console.log(video);
    videoTop.off('timeupdate', myScript);
    videoBot.off('timeupdate', myScript2);
    client.send('ready-screen-par', '');
}

function myScript() {
    const video = document.querySelector('#videoTop');
    //console.log(video);
    //console.log('myScript');
    if (video.currentTime >= 5) {
        // console.log('Je suis Dedans');
        video.pause();
        done[0] = true;
        // console.log(done);
        if (done[0] && done[1]) {
            enableMessage();
        }
    }
}

function myScript2() {
    const video = document.querySelector('#videoBot');
    // console.log(video);
    if (video.currentTime >= 5) {
        video.pause();
        done[1] = true;
        // console.log(done);
        if (done[0] && done[1]) {
            enableMessage();
        }
    }
}

function script(id) {
    const video = document.querySelector(id);
    console.log(video);
    if (video.currentTime >= 5) {
        video.pause();
        done++;
        //done += 1;
        console.log(done);
        if (done === 3) {
            enableMessage();
        }
    }
}


class Lifecycle {

    contructor() {
        // constants to save from a screen to another ?
        this.containerID = "app";
        this.containerClass = "container-fluid d-flex h-100";
        this.actualScreen = "";
        this.playingSequence = "";
        this.startingTeam = "";
    }

    start() {
        this.initConnexion();
        this.loadFirstScreen();
    }

    formationChosen(RED_TEAM, BLUE_TEAM) {
        const message = "" + RED_TEAM + separator + BLUE_TEAM;
        const channel = "table"; // TOBE REDIFINED
        //  this.sendMessage(message, channel);
        this.finishedFormationScreen();
    }

    pawnMoved(str) {
        console.log("pawnMoved " + str);
        this.playingSequence.playTurn();

        /* DEMO / MOCK code
        const message = "startQuestions";
        const channel = "table"; // TOBE DEFINED
        if (str === "collectif") {
            this.loadQuestionScreen();
        } else if (str === "indiv") {
            this.loadWaitingScreen();
        }
        */
    }


    /* ==========  finishing functions  ========== */
    finishedFirstscreen() {
        console.log("first screen DONE. Transition to next screen");
        this.clearScreen();
        this.loadFormationScreen();
    }

    finishedFormationScreen() {
        console.log("FormationScreen DONE. transition to next screen");
        this.clearScreen();
        this.loadMainScreen();
        this.firstTurn();
    }

    /* ==========  Screens inflaters  ========== */
    loadFormationScreen() {
        this.clearScreen();
        $('#app').className = this.containerClass;
        const formationScreen = new FormationScreen(this);
        this.formationScreen = formationScreen;
        formationScreen.buildFormation();
    }

    loadFirstScreen() {
        this.clearScreen();
        const firstScreen = new FirstScreen(this);
        this.actualScreen = firstScreen;
        $('#app').className = this.containerClass;
        firstScreen.populate("app");
    }

    loadMainScreen(teamToplay) {
        this.clearScreen();
        $('#app').className = this.containerClass;
        const mainScreen = new MainScreen(WINDOW_WIDTH, WINDOW_HEIGHT, this);
        this.actualScreen = mainScreen;
        mainScreen.populate("app");
        // mainScreen.startOfTurn(teamToplay);
    }

    loadWaitingScreen() {
        this.clearScreen();
        const waitScreen = new WaitingScreen();
        this.actualScreen = waitScreen;
        waitScreen.populate("app");
        client.send("indivQuestion", "ready");
        client.getSocket().on("waitingScreen", (msg) => {
            console.log(msg);
            if (msg.data === "blue") {
                this.loadMainScreen("blue");
            } else {
                this.loadMainScreen("red");
            }
        });
    }

    loadQuestionScreen() {
        client.send('question-collectif-seq', '');
        $('#app').load('src/questionnaire/questionnaire.html', () => {
            //console.log('load question');
            const videoTop = $("#videoTop");
            const videoBot = $("#videoBot");
            //console.log(video);
            videoTop.on('timeupdate', myScript);
            videoBot.on('timeupdate', myScript2);
        });
        /*$('#videoTop').ready(() => {

            if (video !== null) {

            }
        });*/
        /* $('videoBot').ready(() => {
             const video = document.querySelector('#videoBot');
             if (video !== null) {
                 video.addEventListener('timeupdate', myScript2);
             }
             // .ontimeupdate = () => myScript(document.querySelector('#videoTop'));
         });*/
    }

    /* ==========  server communication functions  ========== */
    initConnexion() {
        client.getSocket().on('table', (msg) => {
            console.log(msg);
        });

        client.getSocket().on('back-to-video', (msg) => {
            console.log('back-to-video');
            document.getElementById('messageT').style.visibility = 'hidden';
            document.getElementById('messageB').style.visibility = 'hidden';
        });
        client.getSocket().on('start-question-collectif', (message) => {
            console.log(message);
            // toQuestionnaireView();
        });
        client.getSocket().on('indivQuestion', (msg) => {
            console.log(msg);
            //that.loadMainScreen();
        });
        client.getSocket().on('returningPlayer', (msg) => {
            this.actualScreen.addPlayerCard(msg.data.team, msg.data.pseudo);
            if (this.actualScreen.playerCount % 2 === 0) {
                this.actualScreen.setPulsating("confirmFirstScreenBtn", true);
            } else {
                this.actualScreen.setPulsating("confirmFirstScreenBtn", false);
            }
        });
        client.getSocket().on('listen-user-login', (msg) => {
            console.log(msg.data);
            this.actualScreen.addPlayerCard(msg.data.team, msg.data.pseudo);
        });

        client.getSocket().on('returningPlayer', (msg) => {
            console.log(msg.data);
        });

        client.getSocket().on('indivQuestionResponse', (msg) => {
            console.error("play order");
            console.error(msg.data);
            client.getSocket().emit('indivQuestionTest', {data : true});
            this.loadMainScreen();
            const tabOfTeamSequence = this.getTeamSequence(msg.data);
            this.playingSequence = new playingSequence(tabOfTeamSequence, this)
            this.playingSequence.start();
        });

        client.getSocket().on('startTeam', (msg) => {
            console.log(msg.data);
            this.startingTeam = msg.data;
        });

        client.getSocket().on('start-of-new-question',(msg)=>{
            if (msg.data === 1){
                this.loadWaitingScreen();
            }
            // gerer les autres questions
        });
    }

    sendMessage(data, channel) {
        client.send(channel, data);
    }

    /* ==========  MISC  ==========*/
    firstTurn(){
        this.playingSequence = new playingSequence([this.startingTeam],this);
        this.playingSequence.start();
    }

    getTeamSequence(tab) {
        let res = []
        for (let i = 0; i < tab.length; i++) {
            res.push(tab[i].team);
        }
        console.log(res);
        return res;
    }
    clearScreen() {
        const root = document.getElementById("app");
        while (root.firstChild) {
            root.className = "container-fluid d-flex h-100";
            root.removeChild(root.firstChild);
        }
    }

    test(a) {
        console.log("life cycle reached !\n first arg : " + a);
    }
}
export default Lifecycle;