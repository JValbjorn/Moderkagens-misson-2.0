"use strict";

const startTid = 45; // 45 sekunder
let tid = startTid;
let timerInterval;

const countdownEl = document.querySelector(".timer"); // Henter <p class="timer">

let countdownInterval;

function startCountdown() {
  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  // const minutter = Math.floor(tid / 60);
  let sekunder = tid % 60;

  sekunder = sekunder < 10 ? "0" + sekunder : sekunder;

  countdownEl.textContent = `${sekunder}`; // tidligere${minutter}:${sekunder}
  tid--;

  if (tid < 0) {
    clearInterval(countdownInterval);
    countdownEl.textContent = "0"; //"0:00"
    finishGameState();
    if (stage < 3) {
      const redirectUrl = countdownEl.dataset.redirect || "default-page.html";
      window.location.href = redirectUrl;
    } else {
      const congrats = document.getElementById("congrats");
      if (congrats) {
        congrats.style.display = "block"; // This makes the popup visible
      }
    }
  }
}

function showMessage(msg) {
  alert(msg);
}

function disableKeyboard() {
  document.onkeydown = function () {
    return false;
  };
}
