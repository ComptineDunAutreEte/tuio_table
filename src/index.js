/*eslint-disable*/

/**
 * @author Christian Brel <ch.brel@gmail.com>
 * @author Vincent Forquet
 * @author Nicolas Forget
 */

// Import JQuery
import $ from 'jquery/dist/jquery.min';

// Import TUIOManager
import TUIOManager from 'tuiomanager/core/TUIOManager';
import ButtonWidget from './Widgets/ButtonWidget';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import buildMenu from './menu';

import FirstScreen from './FirstScreen/FirstScreen';
/* * TUIOManager starter * */
const tuioManager = new TUIOManager();
tuioManager.start();

/* * App Code * */

/* test of button widget */
const buildApp = () => {
    // $('#app').append('<div id="example-container"> </div>');
    $('document').ready(() => {

    });
    // $('#app').load('src/test.html');
    const button = new ButtonWidget(100, 150, 900, 900, 'assets/example-health/candies.png');
    button.addTo('#app');
};

function loadFirstScreen() {
    const firstScreen = new FirstScreen();
    firstScreen.populate("app");
}

$(window).ready(() => {
    buildApp();
    console.log("Document well loaded");
    //loadFirstScreen();
});
