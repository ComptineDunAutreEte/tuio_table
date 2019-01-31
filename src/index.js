/* eslint-disable */

// Import JQuery
import $ from 'jquery/dist/jquery.min';

// Import TUIOManager
import TUIOManager from 'tuiomanager/core/TUIOManager';
import ButtonWidget from './Widgets/ButtonWidget';
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
    const firstScreen = new FirstScreen();
    firstScreen.populate("app");
}

$(window).ready(() => {
    console.log("Document well loaded");
    loadFirstScreen();
})