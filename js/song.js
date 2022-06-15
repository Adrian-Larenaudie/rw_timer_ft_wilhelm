const song = {
    
    //Cette fonction permet de jouer un son.
    endingSong: function() {
        //Création d'une constante de type Audio()
        const audio = new Audio()
        //Ajout d'une source à notre constante audio
        audio.src = "song/emerald.mp3"
        //La fonction audioPlaying est jouée.
        this.audioPlaying(audio)
        audio.pause()
    },

    //Cette fonction permet de jouer en continu un son passé en paramètre.
    audioPlaying: function(audio) {
        //J'utilise un setTimout dans lequel une fonction anonyme est jouée automatiquement
        setTimeout(() => {
            //Le try catch permet de récupérer l'erreur "stopWilhelm is undefined" retournée en console
            try {
                //On adosse un évènement click à la balise ayant pour id stopWilhelm 
                stopPlaying.addEventListener("click", () => {
                    //Si l'utilisateur click sur la balise le son n'est plus joué.
                    clearTimeout()
                    audio.pause()
                })
                //Sinon:
                //Le son passé en paramètre est joué grâce à la méthode JavaScript play().
                audio.play()
                //audioPlaying() est jouée à nouveau.
                this.audioPlaying(audio)
            }
            //Le message renvoyé en console lors de l'erreur.
            catch (error) {
                console.log("stopSong");
            }
            //Le son est paramètré pour être joué toutes les secondes.               
        }, 1000)
    },

    /* esater egg façon discord ;) */
    wilhelm: function() {
        const audio = new Audio();
        audio.src = "song/CriWilhelm.mp3";
        audio.play();
    },

    counter: 0,

    easterEgg: function() {
        document.getElementById('sun').addEventListener('click', (event) => {
            this.counter++;
            console.log(this.counter);
            if(this.counter === 15) {
                this.wilhelm();
                this.counter = 0;
            }
        })
    },
}