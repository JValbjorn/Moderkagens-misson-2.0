"use strict";
//Disse fire er sat uden for funktioner, så de kan hentes fra andre features
let gfProcent = 0;
let bfProcent = 0;
let wasteProcent = 0;
let virusProcent = 0;


//De fire ...Lom'er leder efter korresponderende object-type i scoreArray
//bagefter reduces object'et til en enkelt værdi, som vi vælger skal være værdien fra 'quantity'
function goodLom(){
    let gf = scoreArray.filter(produkt =>produkt.type.includes("good"));
    let gftal = gf.reduce((sum, ele) => sum + ele.quantity, 0);

//her leder arrayet 'generatedCount'(ikke object-array) efter en 'key' med korresponderende navn   
//bagefter hentes dens værdi (den har kun én)
    let gfT = Object.keys(generatedCount)
        .filter(key => key === "good")
        .reduce((sum, key) => sum + generatedCount[key], 0);


//finder procent og kalder på progressions-cirkel-funktionen og påvirker den med 'type=good'
     gfProcent = gftal / gfT *100;
    console.log(gfProcent);
    updateCircularProgress("good", gfProcent);

}


function badLom(){
    let bf = scoreArray.filter(produkt =>produkt.type.includes("bad"));
    let bftal = bf.reduce((sum, ele) => sum + ele.quantity, 0);

    let bfT = Object.keys(generatedCount)
        .filter(key => key === "bad")
        .reduce((sum, key) => sum + generatedCount[key], 0);

     bfProcent = bftal / bfT *100;
    console.log(bfProcent);
    updateCircularProgress("bad", bfProcent);
}

function wasteLom(){
    let waste =scoreArray.filter(produkt =>produkt.type.includes("waste"));
    let wastetal = waste.reduce((sum, ele) => sum + ele.quantity, 0);
    // let limit = 15;
    // let wasteProcent = wastetal / limit*100;
    let wasteT = Object.keys(generatedCount)
        .filter(key => key === "waste")
        .reduce((sum, key) => sum + generatedCount[key], 0);

     wasteProcent = wastetal / wasteT *100;
    console.log(wasteProcent);
    updateCircularProgress("waste", wasteProcent);
}

function virusLom(){
    let virus = scoreArray.filter(produkt =>produkt.type.includes("virus"));
    let virustal = virus.reduce((sum, ele) => sum + ele.quantity, 0);

    let virusT = Object.keys(generatedCount)
        .filter(key => key === "virus")
        .reduce((sum, key) => sum + generatedCount[key], 0);

     virusProcent = virustal / virusT *100;
    console.log(virusProcent);
    updateCircularProgress("virus", virusProcent);

}



//Først findes cirklen hvis type har aktiveret funktionen "good, waste og virus"
//if-statements stopper hele processen, hvis '!...' ("fandt ikke") opstår

function updateCircularProgress(type, procent) {
    const wrapper = document.querySelector(`.circle-progress[data-type="${type}"]`);
    if (!wrapper) return;

    //circle (aka .progress) er selve den visuelle cirkel
    //text (aka .percentage) er procenttallet, der skal vises inde i cirklen
    const circle = wrapper.querySelector(".progress");
    const text = wrapper.querySelector(".percentage");

    if (!circle || !text) return;

    //udregning for hvor "hel" progressionen
    procent = Math.min(100, Math.max(0, procent));

    const radius = 15.9155; // et tal som vi bestemmer. Afgører hvor stor cirklen er per default. Svarer til "<path> d=...</path>
    const circumference = 2 * Math.PI * radius; //ligningen for en hel cirkel

    const offset = circumference * (1 - procent / 100); //lignen for den farvede del

    circle.style.strokeDasharray = `${circumference}`; //tegner ringen via svg-egenskaber
    circle.style.strokeDashoffset = `${offset}`; //tegner progrssionen via svg-egenskaber

    text.textContent = `${Math.round(procent)}%`; //udskriver procenttallet
}


// Redundant kode. Ført over stil scores.js
//
// window.addEventListener('DOMContentLoaded', function () {
//     loadPointsFromLocalStorage();
//     loadGeneratedCount();

//     // Opdater cirkler direkte baseret på localStorage
//     goodLom();
//     wasteLom();
//     virusLom();
// });

