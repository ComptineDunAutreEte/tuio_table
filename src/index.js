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
import ButtonWidget from './ButtonWidget';
// import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
/* * TUIOManager starter * */
const tuioManager = new TUIOManager();
tuioManager.start();

/* * App Code * */

const buildApp = () => {
    // $('#app').append('<div id="example-container"> </div>');
    $('document').ready(() => {

    });
    // $('#app').load('src/test.html');
    const button = new ButtonWidget(100, 150, 900, 900, 0, 1, 'assets/example-health/candies.png');
    button.addTo('#app');
    // const puz = new ImageElementWidget(50, 200, 200, 200, 0, 2, 'assets/example-puzzle/1.png', 'B3', 'C9', '38');
    // puz.addTo('#example-container');
};

$(window).ready(() => {
    buildApp();
});
