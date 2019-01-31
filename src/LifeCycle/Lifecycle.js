/*eslint-disable*/

import FirstScreen from '../FirstScreen/FirstScreen';
import MainScreen from '../MainScreen/MainScreen'
import FormationScreen from '../FormationScreen/FormationScreen'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';

class Lifecycle {

    contructor() {
        // constants to save from a screen to another ?
    }

    start() {
        console.log("starting")
        this.loadFirstScreen();
    }

    finishedFirstscreen() {
        console.log("first screen DONE. Transition to next screen");
        this.clearScreen(this);
        this.loadFormationScreen();
    }

    finishedSecondScreen() {
        console.log("FormationScreen DONE. transition to next screen")
    }

    /* Screens inflaters */
    loadFormationScreen() {
        $('#app').append('<div id="example-container"> </div>');
        const formationScreen = new FormationScreen();
        formationScreen.buildFormation();
    }

    loadFirstScreen() {
        const firstScreen = new FirstScreen(this);
        firstScreen.populate("app");
    }

    loadMainScreen() {
        const mainScreen = new MainScreen(WINDOW_WIDTH, WINDOW_HEIGHT);
        mainScreen.populate("app");
    }

    /* server communication functions */
    sendMessage(msg, channel) {

    }

    clearScreen(t) {
        const root = document.getElementById("app");
        while (root.firstChild) {
            root.className = "container-fluid d-flex h-100";
            root.removeChild(root.firstChild);
        }
    }

} export default Lifecycle;