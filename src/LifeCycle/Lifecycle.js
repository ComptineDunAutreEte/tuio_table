/*eslint-disable*/

import FirstScreen from '../FirstScreen/FirstScreen';
import FormationScreen from '../FormationScreen/FormationScreen';
import MainScreen from '../MainScreen/MainScreen';

import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import WaitingScreen from '../WaitingScreen/WaitingScreen';
import client from '../client';

// Import JQuery
import $ from 'jquery/dist/jquery.min';

const io = require('socket.io-client'); // SALE: chercher a mettre cette constante dans index pour quelle ne soit appellee que une fois
const separator = ",";
let done = 0;

function enableMessage() {
    document.getElementById('messageT').style.visibility = 'visible';
    document.getElementById('messageB').style.visibility = 'visible';
    client.send('video-resume-question-collectif', '');
}

function myScript() {
    const video = document.querySelector('#videoTop');
    // console.log(video);
    if (video.currentTime >= 5) {
        video.pause();
        done += 1;
        // console.log(done);
        if (done === 3) {
            enableMessage();
        }
    }
}

function myScript2() {
    const video = document.querySelector('#videoBot');
    // console.log(video);
    if (video.currentTime >= 5) {
        video.pause();
        done += 1;
        // console.log(done);
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
    }

    start() {
        this.initConnexion();
        this.loadFirstScreen();
        // this.loadMainScreen();
        // this.loadWaitingScreen();
    }

    formationChosen(RED_TEAM, BLUE_TEAM) {
        const message = "" + RED_TEAM + separator + BLUE_TEAM;
        const channel = "table"; // TOBE REDIFINED
        this.sendMessage(message, channel);
        this.finishedFormationScreen();
    }

    pawnMoved(str) {
        const message = "startQuestions";
        const channel = "table"; // TOBE DEFINED
        this.sendMessage(message, channel);
        this.clearScreen();
        // this.loadWaitingScreen();
        if (str === "collectif"){
            this.loadQuestionScreen();
        } else if (str === "indiv") {
            this.loadWaitingScreen();
        }
    }


    // finishing functions
    finishedFirstscreen() {
        console.log("first screen DONE. Transition to next screen");
        this.clearScreen();
        this.loadFormationScreen();
    }

    finishedFormationScreen() {
        console.log("FormationScreen DONE. transition to next screen");
        this.clearScreen();
        this.loadMainScreen();
    }

    /* Screens inflaters */
    loadFormationScreen() {
        this.clearScreen();
        $('#app').className =this.containerClass;
        const formationScreen = new FormationScreen(this);
        this.formationScreen = formationScreen;
        formationScreen.buildFormation();
    }

    loadFirstScreen() {
        this.clearScreen();
        const firstScreen = new FirstScreen(this);
        this.actualScreen = firstScreen;
        $('#app').className =this.containerClass;
        firstScreen.populate("app");
    }

    loadMainScreen() {
        this.clearScreen();
        $('#app').className =this.containerClass;
        const mainScreen = new MainScreen(WINDOW_WIDTH, WINDOW_HEIGHT, this);
        this.actualScreen = mainScreen;
        mainScreen.populate("app");
       // $('#app').addEventListener('click',that.loadMainScreen());
    }

    loadWaitingScreen() {
        const waitScreen = new WaitingScreen();
        this.actualScreen = waitScreen;
        waitScreen.populate("app");
        client.send("indivQuestion", "ready");
        client.getSocket().on("indivQuestion", (msg) => {
            console.log(msg);
        })
        //this.waitForResponse('indivQestion');
    }

    loadQuestionScreen() {
        this.actualScreen = "";
        console.log("loading question sceen");
        $('#app').load('src/questionnaire/questionnaire.html');
        $('#videoTop').ready(() => {
            const video = document.querySelector('#videoTop');
            video.addEventListener('timeupdate', myScript);
            // .ontimeupdate = () => myScript(document.querySelector('#videoTop'));
        });
        $('#videoBot').ready(() => {
            const video = document.querySelector('#videoBot');
            video.addEventListener('timeupdate', myScript2);
            // .ontimeupdate = () => myScript(document.querySelector('#videoTop'));
        });
    }

    /* server communication functions */
    initConnexion() {
        client.getSocket().on('table', (msg) => {
            console.log(msg);
        });
        client.getSocket().on('response', (msg) => {
            console.log(msg);
        });
        client.getSocket().on('start-question-collectif', (message) => {
            console.log(message);
            // toQuestionnaireView();
        });
        client.getSocket().on('indivQuestion', (msg) =>{
            console.log(msg);
           // that.loadMainScreen();
        });
        client.getSocket().on('returningPlayer', (msg) => {
            this.actualScreen.addPlayerCard(msg.data.team,msg.data.pseudo);
            if (this.actualScreen.playerCount %2 === 0){
                this.actualScreen.setPulsating("confirmFirstScreenBtn", true);
            }else {
                this.actualScreen.setPulsating("confirmFirstScreenBtn", false);
            }
        });
        client.getSocket().on('returningScores', (msg) => {
            console.log(msg.data);
        });

        client.send('login', 'login');
    }

    sendMessage(data, channel) {
        client.send(channel, data);
        /*console.log("je notifiiieee le serveeeer : " + msg);
        const socketIOUrl = 'http://localhost:4000';
        const socketServer = io.connect(socketIOUrl);

        socketServer.emit(channel, msg);

        socketServer.on('table', (msg) => {
            console.log(msg);
        });

        socketServer.on('response', (msg) => {
            console.log(msg);
        });*/
    }

    waitForResponse(channel) {
        const socketIOUrl = 'http://localhost:4000';
        const socketServer = io.connect(socketIOUrl);
        socketServer.on(channel, (msg) => {
            console.log(msg);
            this.loadMainScreen();
        });
    }

    /* MISC */
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
