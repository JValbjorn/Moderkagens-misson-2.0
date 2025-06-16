"use strict";

    document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('intro-video');
    const videoContainer = document.getElementById('video-container');

    const sellectSound = new Audio("media/audio/sellect.mp3"); //bliver ikke brugt, kopieret fra sacnnerVideo
    const underwaterSound = new Audio("media/audio/underwater-ambience.mp3");

    // Find alle knapper med klassen 'front-btns'
    const frontButtons = document.querySelectorAll('.front-btns'); //bliver ikke brugt, kopieret fra sacnnerVideo

    // Tilføj klik-lyd til hver knap, useless
    frontButtons.forEach(button => {
        button.addEventListener('click', function() {
            sellectSound.currentTime = 0; // Spol lyden tilbage, hvis den allerede spiller
            sellectSound.play();
        });
    });

     window.onload = function (){
      underwaterSound.currentTime = 0;
      underwaterSound.volume = 0.3; // Value from 0.0 (silent) to 1.0 (full volume)
      underwaterSound.play();
    }

    
            
    // Når videoen er slut bliver man sendt over til en anden html-side
    video.addEventListener('ended', function() {
        videoContainer.style.display = 'none';
        
        window.location.href = 'game1-food.html'; // den anden html-side
    });
            
 
    }); 
    
    