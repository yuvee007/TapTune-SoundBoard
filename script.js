// Flags
let isMuted = false;

// Elements
const volumeSlider = document.querySelector(".volume-slider");
const volumeNumber = document.querySelector(".volume-number");
const muteButton = document.querySelector(".mute-button");
const allSoundCards = document.querySelectorAll(".sound-card");

// Sound URLs
const soundUrls = {
    dog: "Sounds/Dog-Barking.mp3",
    cheer: "Sounds/Crowd-Cheer-and-Applaud.mp3",
    pop: "Sounds/Pop-Sound-Effect.mp3",
    laugh: "Sounds/Meme-Laugh.mp3",
    wow: "Sounds/Wow-Sound-Effect.mp3",
    bell: "Sounds/Bell-Ding.mp3",
    drum: "Sounds/Drum-Roll.mp3",
    horn: "Sounds/Air-Horn.mp3",
    success: "Sounds/Success-Victory-Fanfare.mp3"
};

// Create Audio Objects
const sounds = {};
for (let soundName in soundUrls) {
    sounds[soundName] = new Audio(soundUrls[soundName]);
    sounds[soundName].volume = 0.5;
}

// Play Sound Function
function playSound(soundName) {
    if (isMuted) {
        return;
    }

    const sound = sounds[soundName];
    sound.currentTime = 0;
    sound.play();

// Add playing animation
    const card = document.querySelector(`[data-sound="${soundName}"]`);
    card.classList.add("playing");
    setTimeout(function() {
        card.classList.remove("playing");
    }, 400);
}

// Click Event for Sound Cards
allSoundCards.forEach(function(card) {
    card.addEventListener("click", function() {
        const soundName = card.getAttribute("data-sound");
        console.log("Clicked:", soundName);
        playSound(soundName);
    });
});

// Volume Slider
volumeSlider.addEventListener("input", function() {
    const volume = volumeSlider.value / 100;
    volumeNumber.textContent = volumeSlider.value + "%";
            
    for (let soundName in sounds) {
        sounds[soundName].volume = volume;
    }
});

// Mute Button
muteButton.addEventListener("click", function() {
    if (isMuted == false) {
        isMuted = true;
        muteButton.classList.add("muted");
        muteButton.querySelector("span").textContent = "Unmute";
    } else {
        isMuted = false;
        muteButton.classList.remove("muted");
        muteButton.querySelector("span").textContent = "Mute All";
    }
});
