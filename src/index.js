/*eslint-disable*/

// Import JQuery
import $ from 'jquery/dist/jquery.min';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import MainScreen from './MainScreen/MainScreen';

// Import TUIOManager
import TUIOManager from 'tuiomanager/core/TUIOManager';
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
});
