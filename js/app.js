
const app = {
    init: function() {
        console.log('Module App chargé!');
        page.lobby();
    },   
}

//When the DOM content is loaded js modules are launched
document.addEventListener('DOMContentLoaded', app.init);