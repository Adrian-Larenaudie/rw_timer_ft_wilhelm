/* Page object contains all methods to manage main display */
const page = {
    //Need 9 properties to work
    //displayer property is the DOM element that will recieve the displaying content
    displayer: document.getElementById("displayer"),
    //Properties to define seconds and minutes values
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    //To avoid desynchronization during the pause, setting of mirror properties
    i: 0,
    f: 0,
    g: 0,
    h: 0,

    //lobby method to display the main content
    lobby: function() {
        page.displayer.innerHTML = `
        <canvas id="sun"></canvas>
        <div class="buttons">
            <div id="top1" class="button">▲</div>
            <div id="top2" class="button">▲</div>
            <div class="button invisible">:</div>
            <div id="top3" class="button">▲</div>
            <div id="top4" class="button">▲</div>
        </div>       
        <div class="timer">
            <div class="timer__time">${this.a}</div>
            <div class="timer__time">${this.b}</div>
            <div class="timer__time">:</div>
            <div class="timer__time">${this.c}</div>
            <div class="timer__time">${this.d}</div>
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
        //add click event on buttons to manage timer values 
        utils.handleEventArrows();
        //add click event on start button and manage it
        utils.handleStartButton();
        //display of the sun
        sun.displaySun();
    },

    //running method is the current display when timer is running
    running: function() {
        //we dynamically display the values ​​of our properties
        page.displayer.innerHTML = `
        <canvas id="sun"></canvas>
        <div class="timer">${this.a}${this.b}:${this.c}${this.d}</div>
        <div class="buttonArea">
            <div id="pause" class="launchButton">Stop</div>
            <div id="reset" class="launchButton">Reset</div>
        </div>
        `
        //add click event on reset and stop buttons and manage them
        utils.handleResetButton()
        utils.handlePauseButton()
        //display of the sun
        sun.displaySun();
    },

    //end method is the current display when timer is over
    end: function() {
        page.displayer.innerHTML = `
        <canvas id="sun"></canvas>
        <div class="timer">00:00</div>
        <div class="buttonArea">
            <div id="stopWilhelm" class="launchButton">Stop</div>
        </div>
        `
        //add a click event on stop button and manage it
        utils.handleStopButton()
        sun.displaySun();
    },
}
