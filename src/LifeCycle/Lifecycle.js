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
import TutoScreen from "../TutoScreen/TutoScreen";
import PionsBRWidget from "../MainScreen/PionsBRWidget";

// Import JQuery


//const io = require('socket.io-client'); // SALE: chercher a mettre cette constante dans index pour quelle ne soit appellee que une fois
const separator = ",";
var done = [false, false]; //reset

var end = [false, false]; //reset
var pause_time = 0;
var question_type = 'PAR_';
// var videoTop = null;
// var videoBot = null;
var terminer_ = [false, false]; //reset

function theEnd() {
    client.send('ask-result', '');
}

function endTop() {
    end[0] = true;
    if (end[0] && end[1]) {
        console.log("theEndTop");
        theEnd();
    }
    console.log("theEndTopOut");
}

function endBot() {
    end[1] = true;
    if (end[0] && end[1]) {
        console.log("theEndBot");
        theEnd();
    }
    console.log("theEndBotOut");
}

function terminerTop() {
    console.log("termine");
    terminer_[1] = true;
    if (terminer_[0] && terminer_[1]) {
        console.log("terminer for real");
        client.send("terminer", '');
    }
    $('#butTop').text("OK");
}

function terminerBot() {
    console.log("termine");
    terminer_[0] = true;
    if (terminer_[0] && terminer_[1]) {
        console.log("terminer for real");
        client.send("terminer", '');
    }
    $('#butBot').text("OK");
}

function enableMessage() {
    const videoTop = $("#videoTop");
    const videoBot = $("#videoBot");

    const paneBot = $("#paneBot");
    const paneTop = $("#paneTop");
    paneBot.empty();
    paneTop.empty();

    paneBot.append('<div id="alertBot" class="auto msg"><img class="auto photo" src="assets/tablette.jpg" alt="monimage"></div>');
    paneTop.append('<div id="alertTop" class="auto msg"><img class="auto photo" src="assets/tablette.jpg" alt="monimage"></div>');

    //document.querySelector('#butTop').innerHTML = 'Regarder votre tablette';
    //document.querySelector('#butBot').innerHTML = 'Regarder votre tablette';
    //console.log(video);
    videoTop.off('timeupdate', myScript);
    videoBot.off('timeupdate', myScript2);

    videoTop.on('timeupdate', timeUpdateTop);
    videoBot.on('timeupdate', timeUpdateBot);

    $("#butBot").prop("onclick", null).off("click");
    $("#butTop").prop("onclick", null).off("click");

    if (question_type === 'PAR_') {
        client.send('ready-question', '');
    } else {
        client.send('ready-screen-par', '');
    }

}

function playT() {
    const vidT = document.getElementById('videoTop');
    vidT.play();
    $("#butTop").text("||");
}

function playB() {
    const vidB = document.getElementById('videoBot');
    vidB.play();
    $("#butBot").text("||");

} //vidB.addEventListener('timeupdate', pause);}

function timeUpdateTop() {
    const video = document.querySelector('#videoTop');
    const duration = document.querySelector('#durationTop');

    var minutes = parseInt(video.currentTime / 60, 10);
    var seconds = parseInt(video.currentTime % 60);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    duration.innerText = '0' + minutes + ":" + seconds;
}

function timeUpdateBot() {
    const video = document.querySelector('#videoBot');
    const duration = document.querySelector('#durationBot');
    //console.log(video.currentTime);
    var minutes = parseInt(video.currentTime / 60, 10);
    var seconds = parseInt(video.currentTime % 60);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    duration.innerText = '0' + minutes + ":" + seconds;
}

function myScript() {
    const video = document.querySelector('#videoTop');
    /* const duration = document.querySelector('#durationTop');

    var minutes = parseInt(video.currentTime / 60, 10);
    var seconds = parseInt(video.currentTime % 60);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    duration.innerText = '0' + minutes + ":" + seconds; */

    //console.log('myScript');

    timeUpdateTop();
    if (video.currentTime >= pause_time) {
        document.querySelector('#butTop').innerHTML = 'Pause';
        //console.log('Je suis Dedans');
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
    /*const duration = document.querySelector('#durationBot');

    var minutes = parseInt(video.currentTime / 60, 10);
    var seconds = parseInt(video.currentTime % 60);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    duration.innerText = '0' + minutes + ":" + seconds;*/
    //console.log(duration);
    // console.log(video);
    timeUpdateBot();
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
    }

    start() {
        this.startingTeam = "";
        this.premierAppel = true;
        this.initConnexion();
        this.loadFirstScreen();
        //this.loadQuestionScreen_par();
    }

    static deleteWidgets() {
        /*  for (var i = 0; i < FormationWidget.listeAEffacer.length; i++) {
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
          }*/
        FormationWidget.listeAEffacer = [];
        TerrainWidget.listeAEffacer = [];
        PionsWidget.listeAEffacer = [];
        BallonWidget.listeAEffacer = [];
        PionsWidget.listePionsBR = [];
        PionsWidget.listePionsN = [];
        PionsWidget.nbPionsBR = 0;
        PionsWidget.nbPionsN = 0;
    }

    formationChosen(RED_TEAM, BLUE_TEAM) {
        const message = "" + RED_TEAM + separator + BLUE_TEAM;
        const channel = "table"; // TOBE REDIFINED
        //  this.sendMessage(message, channel);
        this.finishedFormationScreen();
    }



    pawnMoved(str) {
        this.playingSequence.playTurn();
        //this.loadMainScreen();
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
        this.clearScreen();
        this.loadFormationScreen();
    }

    finishedFormationScreen() {
        this.clearScreen();
        this.loadTuto();
    }

    finishedTutoScreen() {
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
        console.log("premier appel : " + this.premierAppel);
        // this.startingTeam = "red";
        //this.startingTeam = "red";
        const mainScreen = new MainScreen(WINDOW_WIDTH, WINDOW_HEIGHT, this, PionsWidget.valuesSaved, this.startingTeam, this.premierAppel);
        this.premierAppel = false;
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
        /*done = [false, false];
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
        });*/
    }

    loadQuestionScreen_par() {
        done = [false, false];
        pause_time = 24;
        question_type = 'PAR_';

        var done = [false, false]; //reset

        end = [false, false]; //reset
        var videoTop = null;
        var videoBot = null;
        terminer_ = [false, false]; //reset
        //client.send('question-collectif-par', '');
        $('#app').load('src/questionnaire/questionnaire_par.html', () => {
            //console.log('load question');


            const paneBot = $("#paneBot");
            const paneTop = $("#paneTop");

            paneBot.append('<p ><br><br>Observez bien la vidéo</p>');
            paneTop.append('<p ><br><br>Observez bien la vidéo</p>');

            // paneBot.append('<div id="alertBot" class="auto msg"><img class="auto photo" src="assets/tablette.jpg" alt="monimage"></div>');
            // paneTop.append('<div id="alertTop" class="auto msg"><img class="auto photo" src="assets/tablette.jpg" alt="monimage"></div>');
            // paneBot.append('<p id="textBot">Team A</p>');

            videoTop = $("#videoTop");
            videoBot = $("#videoBot");
            //console.log(video);
            videoTop.on('timeupdate', myScript);
            videoBot.on('timeupdate', myScript2);

            $("#butBot").on("click", () => playB());
            $("#butTop").on("click", () => playT());
        });
    }

    loadScoreScreen(tab) {
        this.clearScreen();
        const scoreScreen = new ScoreScreen(tab);
        scoreScreen.populate();
    }

    loadTuto() {
        this.clearScreen();
        const tuto = new TutoScreen(this);
        tuto.populate();
    }

    /* ==========  server communication functions  ========== */
    initConnexion() {
        client.getSocket().on('table', (msg) => {
            console.log(msg);
        });

        client.getSocket().on('start-question', (msg) => {
            this.loadQuestionScreen_par();
        });
        client.getSocket().on('result', (msg) => {
            console.log('result');
            $('#app').load('src/questionnaire/result.html', () => {

                for (let q of msg.data.good_answers) {
                    $('#paneBot').append('<div class="pane"><p>' + q + '</p></div>');
                    $('#paneTop').append('<div class="pane"><p>' + q + '</p></div>');
                }
                $('#butBot').click(() => terminerBot());
                $('#butTop').click(() => terminerTop());
            });
        });

        client.getSocket().on('terminer', (msg) => {
            this.loadMainScreen('rouge');
            const tabOfTeamSequence = this.getLongQSequence(msg.data);
            this.playingSequence = new playingSequence(tabOfTeamSequence, this);
            this.playingSequence.start();
        });

        client.getSocket().on('all-answered', (msg) => {
            console.log('all-answered');
            const paneBot = $("#paneBot");
            const paneTop = $("#paneTop");
            paneBot.empty();
            paneTop.empty();

            paneBot.append('<p ><br><br>Observez bien la vidéo</p>');
            paneTop.append('<p ><br><br>Observez bien la vidéo</p>');

            $("#butBot").text("Continuer");
            $("#butTop").text("Continuer");
            $("#butBot").on("click", () => playB());
            $("#butTop").on("click", () => playT());
            $('#videoTop').on('ended', endTop);
            $('#videoBot').on('ended', endBot);
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
            const tabOfTeamSequence = this.getTeamSequence(msg.data);
            this.loadScoreScreen(tabOfTeamSequence);
            setTimeout(() => {
                this.loadMainScreen();
                this.playingSequence = new playingSequence(tabOfTeamSequence, this);
                this.playingSequence.start();
            }, 11000);

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

    getLongQSequence(tab) {
        // [pts equipe bleue, pt equipe rouge]
        let res;
        if (tab[0] < tab [1]){
            res = ["B", "B", "B"];
        }
        else {
            res = ["A", "A", "A"];
        }
        console.error(res);
        return res;
    }

    clearScreen() {
        Lifecycle.deleteWidgets();
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
