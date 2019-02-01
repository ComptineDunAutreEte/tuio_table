/**
 * @author Christian Brel <ch.brel@gmail.com>
 * @author Vincent Forquet
 * @author Nicolas Forget
 */

// Import JQuery
import $ from 'jquery/dist/jquery.min';


// Import TUIOManager
import TUIOManager from 'tuiomanager/core/TUIOManager';
import client from './client';
// import ButtonWidget from './ButtonWidget';
// import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
/* * TUIOManager starter * */
const tuioManager = new TUIOManager();
tuioManager.start();

/* * App Code * */

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
}

const buildApp = () => {
    // $('#app').append('<div id="example-container"> </div>');


    // $('#app').load('src/questionnaire/connect.html');
    // console.log(client);
    client.send('login', '');
    client.getSocket().on('start-question-collectif', (message) => {
        toQuestionnaireView();
    });

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

$(window).ready(() => {
    buildApp();
});