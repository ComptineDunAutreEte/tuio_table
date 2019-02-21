/*eslint-disable*/
import $ from 'jquery/dist/jquery.min';
import FirstScreen from '../FirstScreen/FirstScreen';
import FormationScreen from '../FormationScreen/FormationScreen';
import MainScreen from '../MainScreen/MainScreen';
import BallonWidget from '../MainScreen/BallonWidget';

import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import WaitingScreen from '../WaitingScreen/WaitingScreen';
import client from '../client';
import playingSequence from '../PlayingSequence/playingSequence';
import FormationWidget from "../FormationScreen/FormationWidget";
import TerrainWidget from "../MainScreen/TerrainWidget";
import PionsWidget from "../MainScreen/PionsWidget";
import ScoreScreen from "../ScoreScreen/ScoreScreen";


// Import JQuery


//const io = require('socket.io-client'); // SALE: chercher a mettre cette constante dans index pour quelle ne soit appellee que une fois
const separator = ",";
var done = [false, false];
var pause_time = 0;
var question_type = 'PAR_';

function enableMessage() {
    const videoTop = $("#videoTop");
    const videoBot = $("#videoBot");

    const paneBot = $("#paneBot");
    const paneTop = $("#paneTop");
    paneBot.empty();
    paneTop.empty();

    paneTop.append('<p class="marginText rotate180" id="textTop">Team B \n Indice: Regardez bien la position des jouers</p>');
    paneBot.append('<p id="textBot">Team A\n Indice: Regardez bien la position des jouers</p>');

    document.querySelector('#butTop').innerHTML = 'Regarder votre tablette';
    document.querySelector('#butBot').innerHTML = 'Regarder votre tablette';
    //console.log(video);
    videoTop.off('timeupdate', myScript);
    videoBot.off('timeupdate', myScript2);
    if (question_type === 'PAR_') {
        client.send('ready-question', '');
    } else {
        client.send('ready-screen-par', '');
    }

}

function myScript() {
    const video = document.querySelector('#videoTop');

    //console.log('myScript');
    if (video.currentTime >= pause_time) {
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
    const duration = document.querySelector('#durationBot');

    var minutes = parseInt(video.currentTime / 60, 10);
    var seconds = parseInt(video.currentTime % 60);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    duration.innerText = '0' + minutes + ":" + seconds;
    //console.log(duration);
    // console.log(video);
    if (video.currentTime >= pause_time) {
        document.querySelector('#butBot').innerHTML = 'Pause';
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
        this.valuesSaved = null;
    }

    start() {
        this.initConnexion();
        this.loadScoreScreen();
        //this.loadFirstScreen();
    }

    static deleteWidgets() {
        for (var i = 0; i < FormationWidget.listeAEffacer.length; i++) {
            FormationWidget.listeAEffacer[i].delete();
        }
        for (var j = 0; j < TerrainWidget.listeAEffacer.length; j++) {
            TerrainWidget.listeAEffacer[j].delete();
        }
        for (var k = 0; k < PionsWidget.listeAEffacer.length; k++) {
            PionsWidget.listeAEffacer[k].delete();
        }
        for (var l = 0; l < BallonWidget.listeAEffacer.length; l++) {
            BallonWidget.listeAEffacer[l].delete();
        }
        FormationWidget.listeAEffacer = [];
        TerrainWidget.listeAEffacer = [];
        PionsWidget.listeAEffacer = [];
        BallonWidget.listeAEffacer = [];
    }

    formationChosen(RED_TEAM, BLUE_TEAM) {
        const message = "" + RED_TEAM + separator + BLUE_TEAM;
        const channel = "table"; // TOBE REDIFINED
        //  this.sendMessage(message, channel);
        this.finishedFormationScreen();
    }

    sauvegardeTerrain(valuesSaved) {
        this.valuesSaved = valuesSaved;
    }



    pawnMoved(str, valuesSaved) {
        console.log("is used by pions");
        this.sauvegardeTerrain(valuesSaved);
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
        const mainScreen = new MainScreen(WINDOW_WIDTH, WINDOW_HEIGHT, this, this.valuesSaved, this.startingTeam);
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
        done = [false, false];
        pause_time = 5;
        question_type = 'SEQ_';
        client.send('question-collectif-seq', '');
        $('#app').load('src/questionnaire/questionnaire.html', () => {
            //console.log('load question');
            const videoTop = $("#videoTop");
            const videoBot = $("#videoBot");
            //console.log(video);
            videoTop.on('timeupdate', myScript);
            videoBot.on('timeupdate', myScript2);
        });
    }

    loadQuestionScreen_par() {
        done = [false, false];
        pause_time = 24;
        question_type = 'PAR_';
        client.send('question-collectif-par', '');
        $('#app').load('src/questionnaire/questionnaire_par.html', () => {
            //console.log('load question');

            const paneBot = $("#paneBot");
            const paneTop = $("#paneTop");

            paneTop.append('<p class="marginText rotate180" id="textTop">Team B</p>');
            paneBot.append('<p id="textBot">Team A</p>');

            const videoTop = $("#videoTop");
            const videoBot = $("#videoBot");
            //console.log(video);
            videoTop.on('timeupdate', myScript);
            videoBot.on('timeupdate', myScript2);
        });
    }

    loadScoreScreen(){
        this.clearScreen();
        const tab = ["zeub1", "zeub2","zeub3"];
        const scoreScreen = new ScoreScreen(tab);
        scoreScreen.populate();
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
            client.getSocket().emit('indivQuestionTest', { data: true });
            this.loadMainScreen();
            const tabOfTeamSequence = this.getTeamSequence(msg.data);
            this.playingSequence = new playingSequence(tabOfTeamSequence, this);
            this.playingSequence.start();
        });

        client.getSocket().on('startTeam', (msg) => {
            console.log(msg.data);
            this.startingTeam = msg.data.team;
        });

        client.getSocket().on('start-of-new-question', (msg) => {
            if (msg.data === 1) {
                this.loadWaitingScreen();
            }
            // gerer les autres questions
        });
    }

    sendMessage(data, channel) {
        client.send(channel, data);
    }

    /* ==========  MISC  ==========*/
    firstTurn() {
        this.playingSequence = new playingSequence([this.startingTeam], this);
        this.playingSequence.start();
    }

    getTeamSequence(tab) {
        let res = [];
        for (let i = 0; i < tab.length; i++) {
            res.push(tab[i].team);
        }
        console.log(res);
        return res;
    }
    clearScreen() {
       // Lifecycle.deleteWidgets();
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
