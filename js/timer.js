//Création d'une variable nommée displayer pour stocker l'élément html qui afichera le contenu de la page.
const displayer = document.getElementById("displayer")

//Stockage des valeurs du minuteur par défaut dans plusieurs variables. 
//Ces variables servirons à afficher dynamiquement le temps du minuteur lorsqu'il sera actif.
//On concidère que:
//"a" définit le chiffre des dizaines pour les minutes,
//"b" définit le chiffre des unités pour les minutes,
//"c" définit le chiffre des dizaines pour les secondes,
//"d" définit le chiffre des unités pour les secondes.
let a = 0,
    b = 0,
    c = 0,
    d = 0

//Création de variables pour le Stockage retroactif des valeurs de la minuterie si l'utilisateur utilise la pause:
//Ceci dans le but d'éviter une désynchronisation des valeurs à la reprise du minuteur.
let i = 0,
    f = 0,
    g = 0,
    h = 0

//Création d'une variable nommée clicked qui permet de savoir si l'utilisateur a cliqué sur le bouton pause.
let clicked = false

//Création d'un objet nommé page, qui contient plusieurs fonctions:
//Ces fonctions permettent l'affichage courant de la page et n'ont besoin d'aucun paramètres.
const page = {

    //lobby est l'affichage par défaut lorsqu'on arrive sur l'application.
    lobby: function() {
        //Plusieurs boutons permettent à l'utilisateur de paramétrer et démarrer son minuteur.
        //Les valeurs par défaut des variables a, b, c, d sont affichées.
        displayer.innerHTML = `
        <canvas id="sun"></canvas>
        <div class="buttons">
            <div id="top1" class="button">▲</div>
            <div id="top2" class="button">▲</div>
            <div class="button invisible">:</div>
            <div id="top3" class="button">▲</div>
            <div id="top4" class="button">▲</div>
        </div>       
        <div class="timer">
            <div class="timer__time">${a}</div>
            <div class="timer__time">${b}</div>
            <div class="timer__time">:</div>
            <div class="timer__time">${c}</div>
            <div class="timer__time">${d}</div>
        </div>
        <div class="buttons">
            <div id="bot1" class="button">▼</div>
            <div id="bot2" class="button">▼</div>
            <div class="button invisible">:</div>
            <div id="bot3" class="button">▼</div>
            <div id="bot4" class="button">▼</div>
        </div>
        <div class="buttonArea">
            <div id="start" class="launchButton">Start</div>
        </div>
        `
            //Voir l'objet utils pour le fonctionnemant de ces fonctions.
        utils.handleEventArrows();
        utils.handleStartButton();
        sun.displaySun();
    },

    //running est la page affichée lorsque le minuteur est lançé.
    running: function() {

        //Les valeurs des variables a, b, c et d sont affichées dynamiquement.
        //Un bouton reset et pause permettent à l'utilisateur d'intéragir avec le minuteur.
        displayer.innerHTML = `
        <canvas id="sun"></canvas>
        <div class="timer">${a}${b}:${c}${d}</div>
        <div class="buttonArea">
            <div id="pause" class="launchButton">Stop</div>
            <div id="reset" class="launchButton">Reset</div>
        </div>
        `
            //Voir l'objet utils pour le fonctionnemant de ces fonctions.
        utils.handleResetButton()
        utils.handlePauseButton()
        sun.displaySun();
    },

    //end est la page affichée lorsque le minuteur est terminé.
    end: function() {
        //J'affiche le timer avec les valeurs à 0.
        //Un bouton stop permet à l'utilisateur de stoper l'alarme déclenchée en fin de minuterie
        //et de revenir sur la page lobby.
        displayer.innerHTML = `
        <canvas id="sun"></canvas>
        <div class="timer">00:00</div>
        <div class="buttonArea">
            <div id="stopWilhelm" class="launchButton">Stop</div>
        </div>
        `
            //Voir l'objet utils pour le fonctionnemant de ces fonctions.
        utils.handleStopButton()
        sun.displaySun();
    },
}

//Création d'un objet nommé utils, il contient plusieurs fonctions:
//Ces fonctions permettent toutes les actions non relatives à l'affichage direct des pages.
const utils = {

    //Cette fonction permet à l'utilisateur de paramétrer le temps du minuteur.
    handleEventArrows: function() {

        //Stockage des boutons dans une variable nommée buttons. 
        const buttons = document.querySelectorAll(".button")

        //Pour chaque bouton un évènement click est adossé.
        buttons.forEach(arrow => arrow.addEventListener("click", (e) => {

            //Structure conditionnelle de type switch.
            //Dans le cas ou l'utilisateur click sur un bouton la valeur relative de ce dernier change.
            //Cela permet d'une part: d'afficher à l'utilisateur le temps qu'il souhaite paramétrer,
            //d'autre part: de stocker ce temps pour l'utiliser lors du lancement de la minuterie.
            switch (e.target.id) {

                //Exemple pour le 1er cas:
                //Si le bouton cliqué possède l'id "top1" et que la variable "a" est infèrieur à 6, 
                //la valeur de "a" augmente de 1, sinon si "a" est égal à 6, la valeur de "a" devient 0. 
                case "top1":
                    if (a < 6) { a++ } else if (a == 6) { a = 0 }
                    break
                case "top2":
                    if (b < 9) { b++ } else if (b == 9) { b = 0 }
                    break
                case "top3":
                    if (c < 6) { c++ } else if (c == 6) { c = 0 }
                    break
                case "top4":
                    if (d < 9) { d++ } else if (d == 9) { d = 0 }
                    break
                case "bot1":
                    if (a > 0) { a-- } else if (a == 0) { a = 6 }
                    break
                case "bot2":
                    if (b > 0) { b-- } else if (b == 0) { b = 9 }
                    break
                case "bot3":
                    if (c > 0) { c-- } else if (c == 0) { c = 6 }
                    break
                case "bot4":
                    if (d > 0) { d-- } else if (d == 0) { d = 9 }
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
            if (a > 0 || b > 0 || c > 0 || d > 0) {
                clicked = false

                //On affiche la page running puis la fonction timer est lancée:
                //Elle prend les valeurs que l'utilisateur à paramétrées,
                //ces valeurs sont stockées dans les variable a, b, c et d 
                page.running()
                utils.timer(a, b, c, d)
            }
        })
    },

    //Cette fonction permet à l'utilisateur de faire une pause lorsque la minuterie est lancée
    //sans perdre le temps qu'il reste à écouler.
    handlePauseButton: function() {
        //Ajout d'un évènement click sur le bouton ayant l'id pause.
        pause.addEventListener("click", (e) => {

            //Le bouton pause a deux mode soit il affiche pause soit il affiche reprendre:
            //si il affiche pause:
            if (e.target.textContent == "Stop") {
                //On concidère que clicked est vrai
                clicked = true
                    //et son affichage devient reprendre
                e.target.textContent = "Continue"

                //sinon si il affiche reprendre:
            } else if (e.target.textContent == "Continue") {
                //On concidère que clicked est faux
                clicked = false
                    //et son affichage devient pause.
                e.target.textContent = "Stop"
                    //On rejout la fonction timer() avec les valeurs qu'on a stocké lors de la pause.
                this.timer(i, f, g, h)
            }
        })
    },
    handleResetButton: function() {
        reset.addEventListener("click", () => {
            clicked = true
            a = 0, b = 0, c = 0, d = 0
            page.lobby()
        })
    },
    handleStopButton: function() {
        stopWilhelm.addEventListener("click", () => {
            page.lobby()
        })
    },

    //Cette fonction permet de faire défiler la minuterie:
    //Elle prend 4 valeurs numériques en paramètre, ces valeur correspondent à la logique de déclaration des 
    //variables a, b, c et d vu plus haut.
    timer: function(a, b, c, d) {

        //On cible la balise dans laquelle les valeurs dynamiques vont s'afficher.
        const timerDisplay = document.querySelector(".timer")

        //J'utilise un setTimout dans lequel une fonction anonyme est joué automatiquement (pas besoin de l'appeler)
        setTimeout(() => {
            //si d est supérieur à 0 et que clicked est différent de true: 
            if (d > 0 && clicked != true) {

                //On décrémente d de 1
                d--

                //On actualise notre affichage dynamiquement avec la nouvelle valeur de d.
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`

                //La fonction timer est jouée à nouveau.
                this.timer(a, b, c, d)
            } else if (d == 0 && c > 0 && clicked != true) {
                c--
                d = 9
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`
                this.timer(a, b, c, d)
            } else if (d == 0 && b > 0 && clicked != true) {
                b--
                c = 5
                d = 9
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`
                this.timer(a, b, c, d)
            } else if (b == 0 && a > 0 && clicked != true) {
                a--
                b = 9
                c = 5
                d = 9
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`
                this.timer(a, b, c, d)

                //Lorsque l'utilisateur click sur pause on entre dans cette condition
            } else if (clicked === true) {

                //On affiche les valeurs de nos variables
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`

                //On retourne les valeurs de a, b, c et d dans nos variables i, f, g, et h.
                return i = a, f = b, g = c, h = d

                //Lorsque toutes les valeurs sont égale à zéro on concidère que la minuterie est terminée
            } else if (a == 0 && b == 0 && c == 0 && d == 0) {

                //La fonction wilhelm est jouée
                this.wilhelm(true)
                    //L'affichage change, la fonction end() de l'objet page permet cela.
                page.end()
            }

            //Le setTimout est paramétré pour être joué au bout de 1 seconde.
        }, 1000)
    },

    //Cette fonction permet de jouer un son.
    wilhelm: function() {

        //Création d'une constante de type Audio()
        const audio = new Audio()

        //Ajout d'une source à notre constante audio
        audio.src = "son/CriWilhelm.mp3"

        //La fonction audioPlaying est jouée.
        this.audioPlaying(audio)

    },

    //Cette fonction permet de jouer en continu un son passé en paramètre.
    audioPlaying: function(audio) {
        //J'utilise un setTimout dans lequel une fonction anonyme est jouée automatiquement (pas besoin de l'appeler)
        setTimeout(() => {

            //Le try catch permet de récupérer l'erreur "stopWilhelm is undefined" retournée en console
            try {

                //On adosse un évènement click à la balise ayant pour id stopWilhelm 
                stopWilhelm.addEventListener("click", () => {

                    //Si l'utilisateur click sur la balise le son n'est plus joué.
                    clearTimeout()
                })

                //Sinon:
                //Le son passé en paramètre est joué grâce à la méthode JavaScript play().
                audio.play()

                //audioPlaying() est jouée à nouveau.
                this.audioPlaying(audio)

            }

            //Le message renvoyé en console lors de l'erreur.
            catch (error) {
                console.log("stopWilhelm is not defined anymore");
            }
            //Le son est paramètré pour être joué toutes les secondes.               
        }, 1000)
    },
}

//La fonction lobby() de l'objet page est joué pour lancer l'affichage du contenu principal.
page.lobby()