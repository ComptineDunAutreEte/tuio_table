/*eslint-disable*/

import FirstScreen from '../FirstScreen/FirstScreen';
import MainScreen from '../MainScreen/MainScreen'
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
        console.log("first screen DONE. Transition to second screen");
        this.clearScreen(this);
        this.loadMainScreen();
    }

    finishedSecondScreen() {

    }

    /* Screens inflaters */
    buildSecondScreen() {
        $('#app').append('<div id="example-container"> </div>');
        buildFormation();
    };
    
    loadFirstScreen() {
        const firstScreen = new FirstScreen(this);
        firstScreen.populate("app");
    }
    
    loadMainScreen(){
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