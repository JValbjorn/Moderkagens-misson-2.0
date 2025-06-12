"use strict";

const hitSound = new Audio("media/audio/plop.mp3");
const damageSound = new Audio("media/audio/dmg3.mp3");

const virusContainer = document.getElementById("virus-container");

/* alle waste-ikonerne bliver her puttet ind i et object-array */
const virusIkoner = [
  { src: "media/img/virus/herpes.png", type: "virus" },
  { src: "media/img/virus/estreptococo.png", type: "virus" },
  { src: "media/img/virus/papiloma.png", type: "virus" },
];
// Definerer hvor viraerne skal ende/ramme babyen 
const virusSpawnPositions = [
  { x: 330, y: 1170 },
  { x: 500, y: 1150 },
  { x: 600, y: 1170 },
];

// Rrigger en damage flash effect
function triggerDamageFlash() {
  
  const flashElement = document.createElement("div");
  flashElement.style.position = "fixed";
  flashElement.style.top = 0;
  flashElement.style.left = 0;
  flashElement.style.width = "100%";
  flashElement.style.height = "100%";
  flashElement.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
  flashElement.style.zIndex = 9999;
  flashElement.style.pointerEvents = "none"; 

  document.body.appendChild(flashElement);

  
  flashElement.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 300,
    easing: "ease-out",
  });

  
  setTimeout(() => {
    flashElement.remove();
  }, 300);
} 

// function der spawner virus
function spawnVirusIcon() {

  if (gamePaused) {
    return;
  }
  
  // vælger et random virusikon fra arra'et og spawner denne 
  const ikonData = virusIkoner[Math.floor(Math.random() * virusIkoner.length)];

  //Triers local addpoint og local storage bavl
  if (generatedCount[ikonData.type] !== undefined) {
    generatedCount[ikonData.type]++;
    saveGeneratedCount();
    updateScoreDisplay(); 
  }
  //
  const spawn =
    virusSpawnPositions[Math.floor(Math.random() * virusSpawnPositions.length)];

  
  const img = document.createElement("img");
  img.src = ikonData.src;
  img.classList.add("virus-icon");
  img.style.position = "absolute";
  img.style.left = spawn.x + "px"; //genbruger x-værdien
  img.style.top = "-100px"; // Starter oppe og uden for skærmen
  img.dataset.hit = "false"; //Boolean som vi skal bruge i
  img.dataset.type = ikonData.type; //local storage, identificering af type

  
  img.addEventListener("click", function () {
    hitSound.currentTime = 0;
    hitSound.play();
    
    img.remove();
    addPoint();
    virusLom();
    
  });

  
  virusContainer.appendChild(img);

  //Animere viraerne fra 100px udenfor skærmen og ned til de tidligere bestemte y-kordinater.
  //Animationen sker over 4 sekunder
  const animation = img.animate([{ top: "-100px" }, { top: spawn.y + "px" }], {
    duration: 4000,
    fill: "forwards",
  });

  
  animation.onfinish = () => {
    
    if (img.parentNode === virusContainer && img.dataset.hit === "false") {
      img.dataset.hit = "true"; // Mark as hit
      damageSound.currentTime = 0;
      damageSound.play();

      // Trigger et damage flash
      triggerDamageFlash();

      // Fader virusen væk
      img.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 800,
        fill: "forwards",
      });

      // Fjerner virusen efter animationen
      setTimeout(() => {
        img.remove();
      }, 800);
    }
  };
}



let virusInterval; 

function startVirusSpawn() {
  virusInterval = setInterval(spawnVirusIcon, 2000);
}

