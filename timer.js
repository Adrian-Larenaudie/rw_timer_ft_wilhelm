const displayer = document.getElementById("displayer")
let a = 0, b = 0, c = 0, d = 0
let i = 0, f = 0, g = 0, h = 0
let clicked = false
const page = {
    lobby : function(){
        displayer.innerHTML = `
        <div class="buttons">
            <div id="top1" class="button">▲</div>
            <div id="top2" class="button">▲</div>
            <div class="button invisible">::</div>
            <div id="top3" class="button">▲</div>
            <div id="top4" class="button">▲</div>
        </div>
        <div class="timer">${a}${b}:${c}${d}</div>
        <div class="buttons">
            <div id="bot1" class="button">▼</div>
            <div id="bot2" class="button">▼</div>
            <div class="button invisible">::</div>
            <div id="bot3" class="button">▼</div>
            <div id="bot4" class="button">▼</div>
        </div>
        <div class="buttonArea">
            <div id="start" class="launchButton">Démarrer</div>
        </div>
        `
        utils.handleEventArrows()
        utils.handleStartButton()
    },
    running : function(){
        displayer.innerHTML = `
        <div class="timer">${a}${b}:${c}${d}</div>
        <div class="buttonArea">
            <div id="pause" class="launchButton">Pause</div>
            <div id="reset" class="launchButton">Réinitialiser</div>
        </div>
        `
        utils.handleResetButton()  
        utils.handlePauseButton()   
    },
    end : function(){
        displayer.innerHTML = `
        <div class="timer">00:00</div>
        <div class="buttonArea">
            <div id="stopWilhelm" class="launchButton">Stop</div>
        </div>
        `
        utils.handleStopButton()
    },
}

const utils = {
    handleEventArrows : function(){
        let buttons = document.querySelectorAll(".button")
        buttons.forEach(arrow => arrow.addEventListener("click", (e)=>{
            switch (e.target.id) {
                case "top1": if(a<6){a++}else if(a == 6){a = 0}break
                case "top2": if(b<9){b++}else if(b == 9){b = 0} break
                case "top3": if(c<6){c++}else if(c == 6){c = 0} break
                case "top4": if(d<9){d++}else if(d == 9){d = 0} break
                case "bot1": if(a>0){a--}else if(a == 0){a = 6} break
                case "bot2": if(b>0){b--}else if(b == 0){b = 9} break
                case "bot3": if(c>0){c--}else if(c == 0){c = 6} break
                case "bot4": if(d>0){d--}else if(d == 0){d = 9} break
            }
            page.lobby()
        }))
    },
    handleStartButton : function(){
        start.addEventListener("click", ()=>{
            if(a > 0 || b > 0 || c > 0 || d > 0){
                clicked = false
                page.running()
                utils.timer(a, b, c, d) 
            }
        })
    },
    handlePauseButton : function(){
        pause.addEventListener("click", (e)=>{
            if(e.target.textContent == "Pause"){
                clicked = true
                e.target.textContent = "Reprendre"
            }else if(e.target.textContent == "Reprendre"){
                clicked = false
                e.target.textContent = "Pause"
                this.timer(i, f, g, h)
            }          
        })
    },
    handleResetButton : function(){
        reset.addEventListener("click", ()=>{
            clicked = true
            a = 0, b = 0, c = 0, d = 0
            page.lobby()
        })
    },
    handleStopButton : function(){
        stopWilhelm.addEventListener("click", ()=>{
            page.lobby()
        })
    },
    timer : function(a, b, c, d){
        const timerDisplay = document.querySelector(".timer")
        setTimeout(() => {
            if(d > 0 && clicked != true){
                d--
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`
                this.timer(a, b, c, d) 
            }else if(d == 0 && c > 0 && clicked != true){
                c--
                d = 9
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`
                this.timer(a, b, c, d) 
            }else if(d == 0 && b > 0 && clicked != true){
                b--
                c = 5
                d = 9
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`
                this.timer(a, b, c, d)
            }else if(b == 0 && a > 0 && clicked != true){
                a--
                b = 9
                c = 5
                d = 9
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`
                this.timer(a, b, c, d)
            }else if(clicked === true){
                timerDisplay.innerHTML = `${a}${b}:${c}${d}`
                return i = a, f = b, g = c, h = d           
            }else if(a == 0 && b == 0 && c == 0 && d == 0){
                this.wilhelm(true)
                page.end()
            }
        },1000)
    },
    wilhelm : function(){
        const audio = new Audio()
        audio.src = "son/CriWilhelm.mp3"
        this.audioPlaying(audio)
        
    },
    audioPlaying : function(audio){
        setTimeout(()=>{
            try{
                stopWilhelm.addEventListener("click", ()=>{
                    clearTimeout()
                })
                audio.play()
                this.audioPlaying(audio) 
            } catch(error){
                console.log("stopWilhelm is not defined anymore");
            }                  
    },1000)
    },       
}
page.lobby()
