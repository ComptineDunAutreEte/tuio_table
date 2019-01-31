/* eslint-disable */
const io = require('socket.io-client');             // SALE: chercher a mettre cette constante dans index pour quelle ne soit appellee que une fois

class FirstScreen {
    constructor() {
        this.playerCount = 2;
        this.difficultyLevel = 1; // 1-3 => facile difficile
        this.id = "firstScreen"
        this.containerID = "app";
        this.containerClass = "container-fluid d-flex h-100";
    }

    populate(id) {
        const pid = "#" + id;
        const str = '<div id="firstScreen" class="row align-self-center align-items-center w-100"> </div>';
        $(pid).append(str);
        this.createPlayerCountCOL(this.id);
        this.createConfirmBtn(this.id);
        this.createDifficultyLevelCOL(this.id);
        document.getElementById(this.containerID).className = this.containerClass + " " + "firstScreenBackground";
    }

    /** populate function **/
    createPlayerCountCOL(parentID) {
        const pid = "#" + parentID;
        // contenu
        $(pid).append('<div id="nPlayersHalf" class="col"> </div>');
        $('#nPlayersHalf').append('<div class="row justify-content-center" id="playerCountHalfRow"> </div>');

        const btnsIDs = ['2playersBtn', '4playersBtn', '6playersBtn'];
        const btnsTexts = ['2 players', '4 players', '6 players'];
        const colors = ["secondary", "secondary", "secondary"];
        this.createRadioBtnGroup(btnsIDs, btnsTexts, colors, 'playerCountHalfRow');

        for(let i = 0; i < btnsIDs.length; i++){
            document.getElementById(btnsIDs[i]).onclick = () => {
                this.setPlayerCount((i+1) *2);
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

        for(let i = 0; i < btnsIDs.length; i++){
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
        $(pid).append('<button id="' + btnID + '" type="button" class="btn btn-info btn-circle btn-xxl"><i class="fa fa-check"></i></button>');
        document.getElementById(btnID).onclick = () => { that.notifyServer(that) };
        /*
        const message = this.playerCount + "," + this.difficultyLevel;
        console.log("should be : " + message)
        */
    }

    notifyServer(that) {
        console.log("je notifiiieee");
        const socketIOUrl = 'http://localhost:4000';
        const socketServer = io.connect(socketIOUrl);

        const message = that.getPlayerCount() + "," + that.getDifficultyLevel();
        
        console.log("sent : " + message)
        socketServer.emit('loginTable', message);
        console.log('table-out');
        socketServer.on('table', (msg) => {
            console.log(msg);
        });

        socketServer.on('response', (msg) => {
            console.log(msg);
        });
    }

    // getters and setters
    setPlayerCount(i) {
        // add verification ?
        this.playerCount = i;
    }

    getPlayerCount() {
        return this.playerCount;
    }

    setDifficultyLevel(i) {
        // add verification ?
        this.difficultyLevel = i;
    }

    getDifficultyLevel() {
        return this.difficultyLevel;
    }


} export default FirstScreen;