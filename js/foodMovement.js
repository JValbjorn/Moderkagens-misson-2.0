"use strict";

const plopSound = new Audio("media/audio/pop.mp3"); /* sætter lyden op til senere brug*/

/* alle mad-ikonerne bliver her puttet ind i et object-array */
const madIkoner = [
  { src: "media/img/food-items/blueberry.png", type: "good" },
  { src: "media/img/food-items/banana.png", type: "good" },
  { src: "media/img/food-items/avcado.png", type: "good" },
  { src: "media/img/food-items/carrot.png", type: "good" },
  { src: "media/img/food-items/fried-egg.png", type: "good" },
  { src: "media/img/food-items/salmon.png", type: "good" },
  { src: "media/img/food-items/strawberry.png", type: "good" },
  { src: "media/img/food-items/water.png", type: "good" },
  { src: "media/img/food-items/blue-donut.png", type: "bad" },
      // Fjernet alkohol
  { src: "media/img/food-items/fries.png", type: "bad" },
  { src: "media/img/food-items/pizza.png", type: "bad" },
  { src: "media/img/food-items/pink-donut.png", type: "bad" },
  { src: "media/img/food-items/lakrids.png", type: "bad" },
  { src: "media/img/food-items/ginger.png", type: "bad" },
  { src: "media/img/food-items/coffee.png", type: "bad" },
];


function generateFoodIcon() {
  if (gamePaused) {
    return;
  } //I popUpInfoWindow.js erklæres gamepaused for "false", når man klikker "det erforstået/okay"
  // og følgeende kode nedenunder herfra eksekveres


  //tager antallet af objecter i object-array'et og randomiser
  const ikonData = madIkoner[Math.floor(Math.random() * madIkoner.length)]; 

  // Her tæller vi hvor mange gange hver type er blevet vist
  if (generatedCount[ikonData.type] !== undefined) {
    generatedCount[ikonData.type]++;
    saveGeneratedCount();
    // updateScoreDisplay(); 
  }

  const img = document.createElement("img"); //vi laver et midlertidigt html-element
  img.src = ikonData.src; //vi sætter det lig med billederne fra object-array'et ovenover
  img.classList.add("food-icon"); //giver dem class'en .food-icon
  img.dataset.type = ikonData.type; //tilføjer "type"-værdien ("good" eller "bad")

  
  img.addEventListener("animationend", (e) => {
    if (e.animationName === "curveDown") {
      img.remove(); //sletter det midlertidige html-element igen, når curvedown animationen når 100%
    }
  });

  img.addEventListener("click", () => {
    // afspiller lyden
    plopSound.currentTime = 0;
    plopSound.play();


    //window.event = event; //prøver at linke til event i point-counter...I guess?
    addPoint();
    goodLom();
    badLom();
    img.remove();
  });

  document.querySelector(".blodbane-left").appendChild(img);
  //sørger for at at de nye genererede html-elementer kommer efter hinanden
  //den første der bliver lavet, er den første der bliver vist
}

let spawnInterval;
//sætter intervallet for hvor ofte, der skal genereres et billeder til at være 1sek 
function startFoodMovement() {
  spawnInterval = setInterval(generateFoodIcon, 1000); 
}
