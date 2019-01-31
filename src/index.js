/*eslint-disable*/

// Import JQuery
import $ from 'jquery/dist/jquery.min';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import MainScreen from './MainScreen/MainScreen';

// Import TUIOManager
import TUIOManager from 'tuiomanager/core/TUIOManager';
import ButtonWidget from './Widgets/ButtonWidget';
import Lifecycle from './LifeCycle/Lifecycle'
import FormationWidget from './FormationScreen/FormationWidget';
import FormationBWidget from './FormationScreen/FormationBWidget';
import FormationRWidget from './FormationScreen/FormationRWidget';
import FirstScreen from './FirstScreen/FirstScreen';
/* * TUIOManager starter * */
const tuioManager = new TUIOManager();
tuioManager.start();

let widgets = [];
function RemoveWidgets() {
    $('#example-container').empty();
    for (let i = 0; i < widgets.length; i += 1) {
        widgets[i].deleteWidget();
    }
    widgets = [];
}

function buildFormation() {

    console.log(WINDOW_HEIGHT);
    console.log(WINDOW_WIDTH);
    const theader = 0.1 * WINDOW_HEIGHT;
    const tspace = 0.01 * WINDOW_WIDTH;
    const tok = 0.2 * WINDOW_WIDTH;
    const largeur = (WINDOW_WIDTH - tspace * 2 - tok) / 3;
    const hauteur = (WINDOW_HEIGHT - 2 * theader) / 2;
    const xR1 = 0;
    const xR2 = largeur + tspace;
    const xR3 = largeur * 2 + tspace * 2;
    const yR = 2 * theader + hauteur;
    const xB1 = largeur * 2 + 2 * tspace + tok;
    const xB2 = largeur + tspace + tok;
    const xB3 = tok;
    const yB = 0;
    const xOkR = largeur * 3 + 2 * tspace + tok / 4;
    const xOkB = 0 + tok / 4;
    const yOkR = yR + tok / 4;
    const yOkB = yB + tok / 4;

    const form1R = new FormationRWidget("formation 1", xR1, yR, largeur, hauteur, 'assets/Formation/form1R.PNG');
    form1R.addTo('#example-container');
    const form2R = new FormationRWidget("formation 2", xR2, yR, largeur, hauteur,'assets/Formation/form2R.PNG');
    form2R.addTo('#example-container');
    const form3R = new FormationRWidget("formation 3", xR3, yR, largeur, hauteur,'assets/Formation/form3R.PNG');
    form3R.addTo('#example-container');
    const form1B = new FormationBWidget("formation 1", xB1, yB, largeur, hauteur,'assets/Formation/form1B.PNG');
    form1B.addTo('#example-container');
    const form2B = new FormationBWidget("formation 2", xB2, yB, largeur, hauteur, 'assets/Formation/form2B.PNG');
    form2B.addTo('#example-container');
    const form3B = new FormationBWidget("formation 3", xB3, yB, largeur, hauteur,  'assets/Formation/form3B.PNG');
    form3B.addTo('#example-container');
    const okR = new FormationWidget("OkR", xOkR, yOkR, tok / 2, tok / 2,  'assets/Formation/okR.PNG');
    okR.addTo('#example-container');
    const okB = new FormationWidget("OkB", xOkB, yOkB, tok / 2, tok / 2, 'assets/Formation/okB.PNG');
    okB.addTo('#example-container');

}

function loadFirstScreen() {
    const firstScreen = new FirstScreen(manager);
    firstScreen.populate("app");
}

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
    comeAlive()
    //loadFirstScreen();
    //buildFormation();
   //loadMainScreen();
});
