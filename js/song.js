const song = {
    
    //Cette fonction permet de jouer un son.
    wilhelm: function() {
        //Création d'une constante de type Audio()
        const audio = new Audio()
        //Ajout d'une source à notre constante audio
        audio.src = "song/CriWilhelm.mp3"
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