"use strict";

//object-array
let scoreArray = [
    { type: "good", quantity: 0, worth: 10, total: 0 },
    { type: "bad", quantity: 0, worth: 5, total: 0 },
    { type: "waste", quantity: 0, worth: 10, total: 0 },
    { type: "virus", quantity: 0, worth: 10, total: 0 }
]

// Gemmer scoreArray i localStorage
function savePointsToLocalStorage() {
    localStorage.setItem('pointSystem', JSON.stringify(scoreArray));
}

// Henter scoreArray fra localStorage ved sideindlæsning
function loadPointsFromLocalStorage() {
    const storedPoints = localStorage.getItem('pointSystem');
    if (storedPoints) {
        scoreArray = JSON.parse(storedPoints); // Konverterer string til array
        // updateUIFromCart(); //kalde funktionen updateUIFromCart()
    }
}

// Opdaterer UI med kurvens data

function updateUIFromCart() {
    scoreArray.forEach(micro => {
        let antalIndi = document.getElementById(micro.type);
        // let vaerdIndi = document.getElementById(micro.type + "-total");

        if (antalIndi && vaerdIndi) {
            antalIndi.value = micro.quantity;
            vaerdIndi.value = micro.total; // Rettelse: Bruger bajer.total
        }
    });
   
    console.log("updateUI");
}
//laver en array. Denne array skal bruges til at holde overblik over
//  hvor mange af hver slags der er blevet genereret 
let generatedCount = {
    good: 0,
    bad: 0,
    waste: 0,
    virus: 0
};

//gemmer array'et i local storage
function saveGeneratedCount() {
    localStorage.setItem("generatedCount", JSON.stringify(generatedCount));
}

//henter array'et i local storage
function loadGeneratedCount() {
    const stored = localStorage.getItem("generatedCount");
    if (stored) {
        generatedCount = JSON.parse(stored);
    }
}


//gør dataerne til en type de andre funktioner kan bruge
function updateScoreDisplay() {
    scoreArray.forEach(item => {
        const type = item.type;
        const clicked = item.quantity;
        const shown = generatedCount[type] || 0;


        //Dette bruges ikke længere, da vi har tilføjet progrssions cirkler
        // const el = document.getElementById(`score-${type}`);
        // if (el) {
            
        //     el.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${clicked} / ${shown}`;
        // }
        // console.log(`${type.charAt(0).toUpperCase() + type.slice(1)}: ${clicked} / ${shown}`);
    });
}

//nulstiller antallet og totalen(total='quantity'*'value',som vi ikke bruger alligevel)
//i scoreArray
function resetPointSystem() {
    scoreArray.forEach(micro => {
        micro.quantity = 0;
        micro.total = 0;

        Object.keys(generatedCount).forEach(type => {
            generatedCount[type] = 0; //nulstiller array'et generatedCount
        });
        saveGeneratedCount();
        // updateScoreDisplay();
        
    }); 
    console.log("PointSystem reset");
    savePointsToLocalStorage();
    // updateUIFromCart();
}


// Loader data fra localStorage ved opstart
window.addEventListener('DOMContentLoaded', function () {
    loadPointsFromLocalStorage();
    loadGeneratedCount();
    
   
});

//finder ud af hvilken html-side du er på
//hvis du er på 'game1-food.html, eksikveres "resetPointSystem()"
const urhere = window.location.pathname;
    const pageName = urhere.substring(urhere.lastIndexOf('/') + 1);

 const resetCondition = 'game1-food.html';
    
    if (resetCondition.includes(pageName)) {
        console.log('Auto-reset page detected:', pageName);
        resetPointSystem();
    }