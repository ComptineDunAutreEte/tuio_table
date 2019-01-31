/*eslint-disable*/

import FirstScreen from '../FirstScreen/FirstScreen';
import FormationScreen from '../FormationScreen/FormationScreen';
import MainScreen from '../MainScreen/MainScreen';

import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import WaitingScreen from '../WaitingScreen/WaitingScreen';

const io = require('socket.io-client');             // SALE: chercher a mettre cette constante dans index pour quelle ne soit appellee que une fois
const separator = ",";

class Lifecycle {

    contructor() {
        // constants to save from a screen to another ?
    }

    start() {
        this.loadFirstScreen();
        // this.loadWaitingScreen();
    }

    formationChosen(RED_TEAM, BLUE_TEAM) {
        const message = "" + RED_TEAM + separator + BLUE_TEAM;
        const channel = "table"; // TOBE REDIFINED
        this.sendMessage(message,channel)
        this.finishedFormationScreen();
    }

    pawnMoved(){
        const message = "startQuestions"
        const channel = "table"; // TOBE DEFINED
        this.sendMessage(message,channel);
        this.clearScreen();
        this.loadWaitingScreen();
    }


    // finishing functions
    finishedFirstscreen() {
        console.log("first screen DONE. Transition to next screen");
        this.clearScreen(this);
        this.loadFormationScreen();
    }

    finishedFormationScreen() {
        console.log("FormationScreen DONE. transition to next screen")
        this.clearScreen();
        this.loadMainScreen();
    }

    /* Screens inflaters */
    loadFormationScreen() {
        const formationScreen = new FormationScreen(this);
        formationScreen.buildFormation();
    }

    loadFirstScreen() {
        const firstScreen = new FirstScreen(this);
        firstScreen.populate("app");
    }

    loadMainScreen() {
        const mainScreen = new MainScreen(WINDOW_WIDTH, WINDOW_HEIGHT,this);
        mainScreen.populate("app");
    }

    loadWaitingScreen() {
        const waitScreen = new WaitingScreen();
        waitScreen.populate("app");
        this.waitForResponse('table');
    }

    /* server communication functions */
    sendMessage(msg, channel) {
        console.log("je notifiiieee le serveeeer : " + msg);
        const socketIOUrl = 'http://localhost:4000';
        const socketServer = io.connect(socketIOUrl);

        socketServer.emit(channel, msg);

        socketServer.on('table', (msg) => {
            console.log(msg);
        });

        socketServer.on('response', (msg) => {
            console.log(msg);
        });
    }

    waitForResponse(channel){
        const socketIOUrl = 'http://localhost:4000';
        const socketServer = io.connect(socketIOUrl);
        socketServer.on(channel, (msg) => {
           console.log(msg);
           this.loadMainScreen();
        });
    }

    /* MISC */
    clearScreen(t) {
        const root = document.getElementById("app");
        while (root.firstChild) {
            root.className = "container-fluid d-flex h-100";
            root.removeChild(root.firstChild);
        }
    }

    test(a) {
        console.log("life cycle reached !\n first arg : " + a)
    }

} export default Lifecycle;