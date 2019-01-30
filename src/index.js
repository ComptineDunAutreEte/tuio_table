/* eslint-disable */

// Import JQuery
import $ from 'jquery/dist/jquery.min';

// Import TUIOManager
import TUIOManager from 'tuiomanager/core/TUIOManager';
import ButtonWidget from './ButtonWidget';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import buildMenu from './menu';
/* * TUIOManager starter * */
const tuioManager = new TUIOManager();
tuioManager.start();

/* * App Code * */

const buildApp = () => {
    const button = new ButtonWidget(0, 0, 100, 100, 'assets/example-health/candies.png');
    button.addTo('#app');
};

$(window).ready(() => {
    buildApp();
});