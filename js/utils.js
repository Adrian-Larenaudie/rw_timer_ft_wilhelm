//Création d'un objet nommé utils, il contient plusieurs fonctions:
//Ces fonctions permettent toutes les actions non relatives à l'affichage direct des pages.
const utils = {

    //Cette fonction permet à l'utilisateur de paramétrer le temps du minuteur.
    handleEventArrows: function() {
        //Stockage des boutons dans une variable nommée buttons. 
        const buttons = document.querySelectorAll(".button")
        //Pour chaque bouton un évènement click est adossé.
        buttons.forEach(arrow => arrow.addEventListener("click", (event) => {
            //Structure conditionnelle de type switch.
            //Dans le cas ou l'utilisateur click sur un bouton la valeur relative de ce dernier change.
            //Cela permet d'une part: d'afficher à l'utilisateur le temps qu'il souhaite paramétrer,
            //d'autre part: de stocker ce temps pour l'utiliser lors du lancement de la minuterie.
            switch (event.target.id) {
                //Exemple pour le 1er cas:
                //Si le bouton cliqué possède l'id "top1" et que la variable "a" est infèrieur à 6, 
                //la valeur de "a" augmente de 1, sinon si "a" est égal à 6, la valeur de "a" devient 0. 
                case "top1":
                    if (page.a < 6) { page.a++ } else if (page.a == 6) { page.a = 0 }
                    break
                case "top2":
                    if (page.b < 9) { page.b++ } else if (page.b == 9) { page.b = 0 }
                    break
                case "top3":
                    if (page.c < 5) { page.c++ } else if (page.c == 5) { page.c = 0 }
                    break
                case "top4":
                    if (page.d < 9) { page.d++ } else if (page.d == 9) { page.d = 0 }
                    break
                case "bot1":
                    if (page.a > 0) { page.a-- } else if (page.a == 0) { page.a = 6 }
                    break
                case "bot2":
                    if (page.b > 0) { page.b-- } else if (page.b == 0) { page.b = 9 }
                    break
                case "bot3":
                    if (page.c > 0) { page.c-- } else if (page.c == 0) { page.c = 5 }
                    break
                case "bot4":
                    if (page.d > 0) { page.d-- } else if (page.d == 0) { page.d = 9 }
                    break
            }
            //On actualise la page pour afficher les modifications en jouant la fonction lobby() de l'objet page.
            page.lobby()
        }))
    },

    //Cette fonction permet le lancement de minuteur.
    handleStartButton: function() {
        //Un évènement click est adossé au bouton qui possède l'id start.
        start.addEventListener("click", () => {
            //La fonction est jouée seulement si l'utilisateur à paramétré un tps supérieur à la valeur par défaut.
            if (page.a > 0 || page.b > 0 || page.c > 0 || page.d > 0) {
                clicked = false
                //On affiche la page running puis la fonction timer est lancée:
                //Elle prend les valeurs que l'utilisateur à paramétrées,
                //ces valeurs sont stockées dans les variable a, b, c et d 
                page.running();
                timer.run(page.a, page.b, page.c, page.d);
            }
        })
    },

    pauseButton: function() {
        pause.addEventListener("click", utils.handlePauseButton);
    },

    handlePauseButton: function(event) {
        console.log(event);
        pause.style.cursor = 'default';
        if (event.target.textContent == "Pause") {
            //On concidère que clicked est vrai
            clicked = true;
            //et son affichage devient reprendre
            event.target.textContent = "Continue";
        //sinon si il affiche reprendre:
        } else if (event.target.textContent == "Continue") {
            //On concidère que clicked est faux
            clicked = false;
            //et son affichage devient pause.
            event.target.textContent = "Pause";
            //On rejout la fonction timer() avec les valeurs qu'on a stocké lors de la pause.
            timer.run(page.i, page.f, page.g, page.h);
        }
        utils.removePauseButtonEvent();
    },

    removePauseButtonEvent: function() {
        pause.removeEventListener('click', utils.handlePauseButton);
        utils.pauseButton();
    },

    handleResetButton: function() {
        reset.addEventListener("click", () => {
            clicked = true;
            page.a = 0, page.b = 0, page.c = 0, page.d = 0;
            page.lobby();
        })
    },

    handleStopButton: function() {
        stopWilhelm.addEventListener("click", () => {
            page.lobby();
        })
    },
}