"use-strict";

    const playBtn = document.getElementById('action-knap');
    const videoOverlay = document.getElementById('scanner-container');
    const scannerVideo = document.getElementById('scanner-video');
    const startScreen = document.getElementById('forside-ui');

    const sellectSound = new Audio("media/audio/sellect.mp3");
    const hospitalSound = new Audio("media/audio/hospital.mp3");

    // Find alle knapper med klassen 'front-btns'
    const frontButtons = document.querySelectorAll('.front-btns');

    // Tilføj klik-lyd til hver knap
    frontButtons.forEach(button => {
        button.addEventListener('click', function() {
            sellectSound.currentTime = 0; // Spol lyden tilbage, hvis den allerede spiller
            sellectSound.play();
        });
    });

    window.onload = function (){
      hospitalSound.currentTime = 0;
      hospitalSound.play();
    }


    playBtn.addEventListener('click', () => {
      videoOverlay.style.display = 'flex';
      startScreen.style.display = 'none';
      scannerVideo.play();
    });

    scannerVideo.addEventListener('ended', () => {
      window.location.href = 'intro-video.html'; // Udskift med din mål-side
    });