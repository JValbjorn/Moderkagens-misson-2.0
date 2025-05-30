"use strict";

function addPoint() {
    // Get the type from the clicked item's dataset
    const clickedElement = event.target;
    const productType = clickedElement.dataset.type;
    let point = scoreArray.find(micro => micro.type === productType);
    
    if (point) {
        point.quantity++; //antal tæller

        point.total = point.quantity * point.worth; //eventuel beregner
        
        savePointsToLocalStorage();
        updateUIFromCart();
        updateScoreDisplay();
    }
    //console.logs er bare for at tjekke om vi når til dette sted i scriptet,
    // og om de har en værdi eller om de er "undefined"
    console.log("tilføjet 1 point af typen", productType);
    
    console.log(point);
}


