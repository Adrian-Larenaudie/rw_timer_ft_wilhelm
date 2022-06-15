const timer = {
    
    run: function(a, b, c, d) {
        //On cible la balise dans laquelle les valeurs dynamiques vont s'afficher.
        const timerDisplay = document.querySelector(".timer");
        //J'utilise un setTimout dans lequel une fonction anonyme est joué automatiquement (pas besoin de l'appeler)
        setTimeout(() => {
            //si d est supérieur à 0 et que clicked est différent de true: 
            if (d > 0 && clicked != true) {
                //On décrémente d de 1
                d--;
                //On actualise notre affichage dynamiquement avec la nouvelle valeur de d.
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`;
                //La fonction timer est jouée à nouveau.
                this.run(a, b, c, d);

            } else if (d == 0 && c > 0 && clicked != true) {
                c--;
                d = 9;
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`;
                this.run(a, b, c, d);
            } else if (d == 0 && b > 0 && clicked != true) {
                b--;
                c = 5;
                d = 9;
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`;
                this.run(a, b, c, d);
            } else if (b == 0 && a > 0 && clicked != true) {
                a--;
                b = 9;
                c = 5;
                d = 9;
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`;
                this.run(a, b, c, d);

                //Lorsque l'utilisateur click sur pause on entre dans cette condition
            } else if (clicked === true) {

                //On affiche les valeurs de nos variables
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`;
                //On retourne les valeurs de a, b, c et d dans nos variables i, f, g, et h.
                return page.i = a, page.f = b, page.g = c, page.h = d;

            //Lorsque toutes les valeurs sont égale à zéro on concidère que la minuterie est terminée
            } else if (a == 0 && b == 0 && c == 0 && d == 0) {
                //La fonction wilhelm est jouée
                song.endingSong();
                //L'affichage change, la fonction end() de l'objet page permet cela.
                page.end();
            }
            //Le setTimout est paramétré pour être joué au bout de 1 seconde.
        }, 1000)
    },
}