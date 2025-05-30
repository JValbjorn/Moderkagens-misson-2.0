let gamePaused = true; 

// Funktionen ryder spillet for spil-elementerne når at gamePaused er true
function finishGameState() {
  
  gamePaused = true;
  tid = startTid;
  usedPositions = [];

  
  const wasteContainer = document.getElementById("waste-container");
  if (wasteContainer) {
    wasteContainer.innerHTML = "";
  }

  const virusContainer = document.getElementById("virus-container");
  if (virusContainer) {
    virusContainer.innerHTML = ""; 
  }

  const foodContainer = document.querySelector(".blodbane-left");
  if (foodContainer) {
    foodContainer.innerHTML = "";
  }
}
