/*eslint-disable*/

// Import JQuery
import $ from 'jquery/dist/jquery.min';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import MainScreen from './MainScreen/MainScreen';


// Import TUIOManager
import TUIOManager from 'tuiomanager/core/TUIOManager';
import client from './client';
// import ButtonWidget from './ButtonWidget';
// import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
/* import ButtonWidget from './Widgets/ButtonWidget';
import Lifecycle from './LifeCycle/Lifecycle';
import FormationWidget from './FormationScreen/FormationWidget';
import FormationBWidget from './FormationScreen/FormationBWidget';
import FormationRWidget from './FormationScreen/FormationRWidget'; */
import Lifecycle from './LifeCycle/Lifecycle';
import FirstScreen from './FirstScreen/FirstScreen';
/* * TUIOManager starter * */
const tuioManager = new TUIOManager();
tuioManager.start();

function loadFirstScreen() {
    const firstScreen = new FirstScreen(manager);
    firstScreen.populate("app");
}

/*
function toQuestionnaireView() {
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
}*/

const buildApp = () => {
    // $('#app').append('<div id="example-container"> </div>');


    // $('#app').load('src/questionnaire/connect.html');
    // console.log(client)

    // vidT.addEventListener('timeupdate', () => pause(vidT));

    // while (!document.querySelector("videoBot")) {
    // await new Promise(r => setTimeout(r, 500));
    // }
    /* const vidB = document.getElementById('#videoBot');

    console.log(' hellooooo', vidB);

    function pause() {
        if (vidB.currentTime >= 5) {
            console.log('ici');
            vidB.pause();
        }
    }

    vidB.addEventListener('timeupdate', pause); */

    // const button = new ButtonWidget(100, 150, 110, 110, 0, 1, 'assets/example-health/candies.png', 'B3', 'C9', '38');
    // button.addTo('#app');
    // const puz = new ImageElementWidget(50, 200, 200, 200, 0, 2, 'assets/example-puzzle/1.png', 'B3', 'C9', '38');
    // puz.addTo('#example-container');
};

function loadMainScreen() {
    const mainScreen = new MainScreen(WINDOW_WIDTH, WINDOW_HEIGHT);
    mainScreen.populate("app");
}

function comeAlive() {
    const manager = new Lifecycle();
    manager.start();
}

$('document').ready(() => {
    console.log("Document well loaded");
    comeAlive();
    //loadFirstScreen();
    //buildFormation();
});