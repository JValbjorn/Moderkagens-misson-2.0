"use strict";

//denne funktion åbner og lukker confirm pop-uppen eller sender brugeren til index.html
document.addEventListener("DOMContentLoaded", () => {
    const homeButton = document.querySelector(".home");
    const confirmPopup = document.getElementById("confirm-box");
    const exitBtn = document.getElementById("exit");
    const stayBtn = document.getElementById("stay");
  
    //tjekker om elementerne findes
    if (!homeButton) {
      console.warn("Home button not found!");
      return;
    }
  
    //åbner pop-up
    homeButton.onclick = () => {
      console.log("Home button clicked");
      confirmPopup.style.display = "block";
    };
  
    //sender brugeren til index.html
    exitBtn.onclick = () => {
      console.log("Exit button clicked");
      window.location.href = "index.html";
    };
  
    //lukker pop-uppen
    stayBtn.onclick = () => {
      console.log("Stay button clicked");
      confirmPopup.style.display = "none";
    };
  
    //lukker pop-up ved klik udenfor pop-uppen
    window.onclick = (event) => {
      if (event.target === confirmPopup) {
        confirmPopup.style.display = "none";
      }
    };
  });





  