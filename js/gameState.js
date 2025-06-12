let gamePaused = true; //Bestemmer om spillet er i gang eller ej. Den bliver erklæret "false" i popUpInfoWindow.js

// Funktionen ryder spillet for spil-elementerne, sætter gamePaused til true og resætter tiden
//Funktionen bliver kaldt når timeren er løbet ud
function finishGameState() {
  
  gamePaused = true; //Bliver erklæret true
  tid = startTid; //resætter tiden til 45 sekunder(startTid)
  usedPositions = []; //(re-)sætter postioner for food-/virus-/waste-elementer til at være null/ingenting

  
  const wasteContainer = document.getElementById("waste-container");
  if (wasteContainer) {
    wasteContainer.innerHTML = ""; //laver ikonerne om til en tom tekst-streng/null/ingenting
  }

  const virusContainer = document.getElementById("virus-container");
  if (virusContainer) {
    virusContainer.innerHTML = ""; //laver ikonerne om til en tom tekst-streng/null/ingenting
  }

  const foodContainer = document.querySelector(".blodbane-left");
  if (foodContainer) {
    foodContainer.innerHTML = ""; //laver ikonerne om til en tom tekst-streng/null/ingenting
  }
}
