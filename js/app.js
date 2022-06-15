
const app = {
    init: function() {
        grid.display();
        page.lobby();
    },   
}

//When the DOM content is loaded js modules are launched
document.addEventListener('DOMContentLoaded', app.init);