/* eslint-disable */

class ScoreScreen {
    // modal contenant deux decks de carte pour afficher les highscores
    constructor(pid, scores) {
        this.pid = pid;
        this.scores = scores;
    }

    populate() {
        // idem que les joueurs
        const PID = '#' + this.pid;
        const body = this.buildModal();
        const topDeck = this.buildCardTop();
        const botDeck = this.buildCardBot();

        // topDeck.appendTo(body);
        // botDeck.appendTo(body);
        $(PID).append(body)
    }

    buildModal() {
        return '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">\
        Launch demo modal\
      </button>\
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle">\
            <div class="modal-dialog modal-dialog-centered" role="document">\
                <div class="modal-content">\
                    <div class="modal-body">\
                        <p>zeuby</p>\
                    </div>\
                </div>\
            </div>\
        </div>\
        '
    }

    buildCardBot() {

    }

    buildCardTop() {

    }

} export default ScoreScreen;