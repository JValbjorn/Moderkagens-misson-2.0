"use strict";

    document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('intro-video');
    const videoContainer = document.getElementById('video-container');

    const sellectSound = new Audio("media/audio/sellect.mp3");
    const underwaterSound = new Audio("media/audio/underwater-ambience.mp3");

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
      underwaterSound.currentTime = 0;
      underwaterSound.volume = 0.3; // Value from 0.0 (silent) to 1.0 (full volume)
      underwaterSound.play();
    }

    
            
    // When video ends, remove the video container and show main content
    video.addEventListener('ended', function() {
        videoContainer.style.display = 'none';
        
        window.location.href = 'game1-food.html'; // Udskift med din mål-side
    });
            
 
    }); 
    
    