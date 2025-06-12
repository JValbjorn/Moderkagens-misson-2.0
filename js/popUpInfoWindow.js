"use strict"

const popUp = document.getElementById("pop-up");
const span = document.getElementById("close");
let stage = 1;

// Event listener åbner pop-up vinduet når DOM/siden er indlæst
window.addEventListener("DOMContentLoaded", () => {
    popUp.style.display = "block";
});

//sørger for at spilfunktioner begynner når man trykker start
span.onclick = () => {
    startGame();
};

//denne funktion starter spillet, timer, lukker pop-up vinduet og tæller stage
function startGame() {
    popUp.style.display = "none";
    stage = +popUp.dataset.stage //stage bliver plusset med datasettets.stage
    gamePaused = false;
    startCountdown();
    startFoodMovement();

    if (stage > 1) {
        startWasteSpawn();
    }

    if (stage > 2) {
        startVirusSpawn();
    }
}
