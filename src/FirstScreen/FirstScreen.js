/* eslint-disable */

class FirstScreen {
    constructor(obs) {
        this.playerCount = 0;
        this.difficultyLevel = 1; // 1-3 => facile difficile
        this.id = "firstScreen"
        this.containerID = "app";
        this.containerClass = "container-fluid d-flex h-100";
        this.observer = obs;
    }

    populate(id) {
        const pid = "#" + id;
        const str = '<div id="' + this.id + '" class="container align-self-center align-items-center w-100 h-100"> </div>';
        $(pid).append(str);
        /*
        this.createPlayerCountCOL(this.id);
        this.createConfirmBtn(this.id);
        this.createDifficultyLevelCOL(this.id);
        */
        this.createDivs(this.id);
        document.getElementById(this.containerID).className = this.containerClass + " " + "firstScreenBackground";
    }

    /** populate function **/
    createDivs(parentID) {
        const pid = "#" + parentID;
        const topRowID = "topRow";
        const middleRowID = "midRow"
        const botRowID = "botRow";
        const mainColID = "mainCol";
        // main COL
        $(pid).append('<div id="' + mainColID + '" class="col h-100 w-100 align-items-center"> </div>');
        $(pid).append('<button id="add_mock" class="testButton">Add mocked player<button>');
        // Top row
        $("#" + mainColID).append('<div id="' + topRowID + '" class="row justify-content-center pb-5 topRow"> </div>');

        //$("#" + topRowID ).append();
        $("#" + topRowID).append('<div id="topDeck" class="card-deck"> </div>');

        // middle row
        $("#" + mainColID).append('<div id="' + middleRowID + '" class="row justify-content-center mt-10"> </div>');
        this.createConfirmBtn(middleRowID);

        // Bottom row
        $("#" + mainColID).append('<div id="' + botRowID + '" class="row justify-content-center pt-5 botRow"> </div>');
        //$("#" + botRowID ).append();
        $("#" + botRowID).append('<div id="botDeck" class="card-deck"> </div>');

        this.initMockAddButton();

    }

    setPulsating(id, bool) {
        const btn = document.getElementById(id);
        if (bool) {
            btn.className = "btn btn-info btn-circle btn-xxl pulse-button middleScreen";
        } else {
            btn.className = "btn btn-info btn-circle btn-xxl middleScreen";
        }
    }

    createDifficultyLevelStepper() { }

    initMockAddButton() {
        console.log("init mock")
        const botRowID = "botDeck";

        //$("#" + botRowID ).append();
        const addCard = () => {
            if (this.playerCount < 6) {

                if (this.playerCount % 2 == 0) {
                    this.setPulsating("confirmFirstScreenBtn", false);
                    this.addPlayerCard("topDeck", "down", "toto");
                    this.playerCount++;
                } else {
                    this.setPulsating("confirmFirstScreenBtn", true);
                    this.addPlayerCard(botRowID, "up", "zeuby");
                    this.playerCount++;
                }
            }

        }
        document.getElementById("add_mock").onclick = addCard;

    }

    addPlayerCard(whereID, towards, nem) {
        const pid = "#" + whereID;
        let animationClass, team;
        if (towards === "up") {
            animationClass = "slideUp";
            team = "redTeam";
        } else {
            animationClass = "slideDown";
            team = "blueTeam";
        }
        $(pid).append('<div class="card h-100 w-30 ' + animationClass + '"><div class="card-body ' + team + '"><h4 class="card-title">Player</h4>\
        <p class="card-text">' + nem + '</p></div></div>');
    }

    createPlayerCountCOL(parentID) {
        const pid = parentID;
        // contenu
        $("#" + pid).append('<div id="nPlayersHalf" class="col"> </div>');
        $('#nPlayersHalf').append('<div class="row justify-content-center" id="playerCountHalfRow"> </div>');

        const btnsIDs = ['2playersBtn', '4playersBtn', '6playersBtn'];
        const btnsTexts = ['2 players', '4 players', '6 players'];
        const colors = ["secondary", "secondary", "secondary"];
        this.createRadioBtnGroup(btnsIDs, btnsTexts, colors, 'playerCountHalfRow');

        for (let i = 0; i < btnsIDs.length; i++) {
            document.getElementById(btnsIDs[i]).onclick = () => {
                this.setPlayerCount((i + 1) * 2);
            }
        }
    }

    createDifficultyLevelCOL(parentID) {
        const pid = "#" + parentID;
        // contenu
        $(pid).append('<div id="difficultyHalf" class="col"> </div>');
        $('#difficultyHalf').append('<div class="row justify-content-center" id="diffHalfRow"> </div>');

        const btnsIDs = ['easyBtn', 'mediumBtn', 'hardBtn'];
        const btnsTexts = ['facile', 'moyen', 'difficile'];
        const colors = ["success", "warning", "danger"];
        this.createRadioBtnGroup(btnsIDs, btnsTexts, colors, 'diffHalfRow');

        for (let i = 0; i < btnsIDs.length; i++) {
            document.getElementById(btnsIDs[i]).onclick = () => {
                this.setDifficultyLevel(i + 1);
            }
        }
    }

    createRadioBtnGroup(ids, texts, colors, parentID) {
        const pid = "#" + parentID;
        const selfIDstr = parentID + "radioGroup";
        const selfID = "#" + selfIDstr;
        const selfstring = '<div id="' + selfIDstr + '" class="btn-group-lg btn-group-toggle" data-toggle="buttons"></div>'
        $(pid).append(selfstring);
        for (let i = 0; i < ids.length; i++) {
            $(selfID).append('<label id="' + ids[i] + '" class="btn btn-' + colors[i] + '"> \
            <input type="radio" name="options" autocomplete="off" checked>' + texts[i] + '</label>');
        }
    }

    createConfirmBtn(parentID) {
        const pid = "#" + parentID;
        const btnID = "confirmFirstScreenBtn";
        const that = this;

        $(pid).append('<button id="' + btnID + '" type="button" class="btn btn-info btn-circle btn-xxl middleScreen"><i class="fa fa-check"></i></button>');
        document.getElementById(btnID).onclick = () => {
            if (that.playerCount %2 === 0){
                that.notifyServer(that);
                that.observer.finishedFirstscreen();
            }else {
                that.addCard;
            }

        };
        /*
        const message = this.playerCount + "," + this.difficultyLevel;
        console.log("should be : " + message)
        */
    }

    notifyServer(that) {
        const message = that.playerCount + "," + that.difficultyLevel;
        that.observer.sendMessage(message, 'loginTable');
    }

    // getters and setters
    setPlayerCount(i) {
        this.playerCount = i;
    }

    getPlayerCount() {
        return this.playerCount;
    }

    setDifficultyLevel(i) {
        this.difficultyLevel = i;
    }

    getDifficultyLevel() {
        return this.difficultyLevel;
    }

} export default FirstScreen;
