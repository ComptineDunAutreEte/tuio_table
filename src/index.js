/* eslint-disable */

// Import JQuery
import $ from 'jquery/dist/jquery.min';

// Import TUIOManager
import TUIOManager from 'tuiomanager/core/TUIOManager';
import ButtonWidget from './ButtonWidget';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import buildMenu from './menu';

import FirstScreen from './FirstScreen/FirstScreen'
/* * TUIOManager starter * */
const tuioManager = new TUIOManager();
tuioManager.start();

/* * App Code * */

/* test of button widget */
const buildApp = () => {
    const button = new ButtonWidget(0, 0, 100, 100, 'assets/example-health/candies.png');
    button.addTo('#app');
};

function loadFirstScreen() {
    console.log("loading First Screen...");
    const firstScreen = new FirstScreen();
    firstScreen.populate("app");
    console.log("finished loading First Screen.");
}

$(window).ready(() => {
    console.log("Document well loaded");
    loadFirstScreen();
})