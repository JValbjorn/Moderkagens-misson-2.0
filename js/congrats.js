"use strict";


// sørger for html'en er indlæst før funktionerne inden i kaldes
//henter de to local storages
window.addEventListener('DOMContentLoaded', function () {
   loadPointsFromLocalStorage();
    loadGeneratedCount();



//aktivere de fire funktioner, der beregner procenttallet
    goodLom();
    badLom();
    wasteLom();
    virusLom();
});

//funktionen samler de tre (ud af de fire) procenttal fra ...Lom()'erne
//herefter findes gennemsnittet og via if-statements vurderes hvilken html-side man skal videre til
function endings(){
    console.log("Du har trykket på KNAPPEN!");
    let samletScore = 0;
    let gennemsnit = 0;


//setTimeout sørger for at vente 100 milisekeunder, før alt det inde i den eksikveres
    setTimeout(() => {
        samletScore = gfProcent + virusProcent + wasteProcent;
        gennemsnit = samletScore / 3;

        console.log("gennemsnittet er", gennemsnit);
        console.log("Samlet score:", samletScore);

        if (gennemsnit > 90) {
            window.location.href = 'game-end1.html';
        } 
        else if (gennemsnit <= 90 && gennemsnit > 69) {
            window.location.href = 'game-end2.html';
        } 
        else if (gennemsnit <= 69 || isNaN(gennemsnit)) {
            window.location.href = 'game-end3.html';
        }
    }, 100); // Vent lidt for at sikre alle funktioner er færdige
}

