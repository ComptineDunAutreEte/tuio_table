/*eslint-disable*/
import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import FormationWidget from '../Widgets/FormationWidget'

class FormationScreen {
    constructor() {
        this.widgets = [];
    }

    RemoveWidgets() {
        $('#app').empty();
        for (let i = 0; i < this.widgets.length; i += 1) {
            this.widgets[i].deleteWidget();
        }
        this.widgets = [];
    }

    buildFormation() {
        this.RemoveWidgets();

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

        const form1R = new FormationWidget(xR1, yR, largeur, hauteur, 'assets/Formation/form1R.PNG');
        form1R.addTo('#app');
        const form2R = new FormationWidget(xR2, yR, largeur, hauteur, 'assets/Formation/form2R.PNG');
        form2R.addTo('#app');
        const form3R = new FormationWidget(xR3, yR, largeur, hauteur, 'assets/Formation/form3R.PNG');
        form3R.addTo('#app');
        const form1B = new FormationWidget(xB1, yB, largeur, hauteur, 'assets/Formation/form1B.PNG');
        form1B.addTo('#app');
        const form2B = new FormationWidget(xB2, yB, largeur, hauteur, 'assets/Formation/form2B.PNG');
        form2B.addTo('#app');
        const form3B = new FormationWidget(xB3, yB, largeur, hauteur, 'assets/Formation/form3B.PNG');
        form3B.addTo('#app');
        const okR = new FormationWidget(xOkR, yOkR, tok / 2, tok / 2, 'assets/Formation/okR.PNG');
        okR.addTo('#app');
        const okB = new FormationWidget(xOkB, yOkB, tok / 2, tok / 2, 'assets/Formation/okB.PNG');
        okB.addTo('#app');

        /*  if (okR.isTouched()){
              console.log("il a etet t");
          }
    
            tuioManager.handleUpdate(okR); */
    }

} export default FormationScreen;
