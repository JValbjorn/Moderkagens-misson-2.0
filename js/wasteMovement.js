"use strict";

const popSound = new Audio("media/audio/pop2.mp3"); // Sætter lyden op til senere brug 
const wasteContainer = document.getElementById("waste-container");

/* alle waste-ikonerne bliver her puttet ind i et object-array */
const wasteIcons = [
  { src: "media/img/affaldsstoffer/waste-orange.png", type: "waste" },
  { src: "media/img/affaldsstoffer/waste-pink.png", type: "waste" },
  { src: "media/img/affaldsstoffer/waste-yellow.png", type: "waste" },
];

/* Indstiller de forskellige positioner, hvor ikonerne kan spawne */
//x-aksen henad mod venstre og y-aksen er fra top til bund
const wasteSpawnPositions = [
  { x: 160, y: 1200 },
  { x: 300, y: 1140 },
  { x: 500, y: 1100 },
  { x: 650, y: 1133 },
  { x: 800, y: 1250 },
];

let usedPositions = [];

// I denne function spawner et waste-ikon på en tilfældig, ledig position.
// Når ikonet klikkes, gives der point, lyden afspilles, og ikonet animeres ud af skærmen.
// Sørger for at positioner ikke genbruges, før de er ledige igen.
function spawnWasteIcon() {
  if (gamePaused) {
    return;
  }

  const availablePositions = wasteSpawnPositions.filter(
    (pos) => !usedPositions.includes(pos) //laver et nyt array, hvor kriteriet er at 'pos' ikke må være lig med usedPosition(pos)
  );
  if (availablePositions.length === 0) return; //hvis der ikke er flere ledige pladser stopper funktionen

  const pos =
    availablePositions[Math.floor(Math.random() * availablePositions.length)]; 
  usedPositions.push(pos); //tilføjer nyt element i usedPosition-array'et


//tager antallet af objecter i object-array'et og randomiser
  const randomWaste = wasteIcons[Math.floor(Math.random() * wasteIcons.length)]; //

  //Triers local addpoint og local storage bavl
  if (generatedCount[randomWaste.type] !== undefined) {
    generatedCount[randomWaste.type]++;
    saveGeneratedCount();
    // updateScoreDisplay(); 
  }

  const icon = document.createElement("img"); //vi laver et midlertidigt html-element
  icon.src = randomWaste.src; //vi sætter det lig med billederne fra object-array'et ovenover
  icon.classList.add("waste-icon"); //giver dem class'en .waste-icon
  icon.dataset.type = randomWaste.type; //tilføjer "type"-værdien ("waste")

  //Position for de(t) ny(e) generet html-element
  icon.style.position = "absolute";
  icon.style.left = `${pos.x}px`;
  icon.style.top = `${pos.y}px`;
  icon.style.cursor = "pointer";

  icon.addEventListener("click", () => {
    popSound.currentTime = 0;
    popSound.play();

    //window.event = event; //prøver at linke til event i point-counter...I guess?
    addPoint();

    wasteLom();

    icon.remove(); //det midlertidige html-elementer bliver fjernet
    usedPositions = usedPositions.filter((p) => p !== pos); //fjerner position fra array'et usedPosition, dermed gør den ledig

    const newPos = {
      x: window.innerWidth - 300, // den nye position over i højre blodbane
      y: window.innerHeight - 800,
    };

    //Laver et nyt midlertidigt html-element
    const exitIcon = document.createElement("img");
    exitIcon.src = randomWaste.src;
    exitIcon.classList.add("waste-icon");

    //Giver en anden position og en animation
    exitIcon.style.position = "absolute";
    exitIcon.style.left = `${newPos.x}px`;
    exitIcon.style.top = `${newPos.y}px`;
    exitIcon.style.pointerEvents = "none";
    exitIcon.style.animation = "slideOut 2s ease-out forwards";

    wasteContainer.appendChild(exitIcon); //rækkefølge(first come, first served)

    setTimeout(() => {
      exitIcon.remove();
    }, 2000); //efter to sekunder fjernes elementet fra exitIcon
    //så det vil give mening at animationen ud af skærmen er færdig før 2 sekunder
  });

  wasteContainer.appendChild(icon); //rækkefølge(first come, first served)
}

let wasteInterval;

function startWasteSpawn() {
  wasteInterval = setInterval(spawnWasteIcon, 3000); //spawner affaldsstofferne hver tredje sekund
}
