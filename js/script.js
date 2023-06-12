const btMute = document.querySelector("#mute");
const modeTitle = document.querySelector("#mode-title");
const imgFocus = document.querySelector("#img-focus");
const imgRest = document.querySelector("#img-rest");
const remainingMinutes = document.querySelector("#minutes");
const remainingSeconds = document.querySelector("#seconds")
const progress = document.querySelector(".progress");
const progressTime = document.querySelector(".progress-time");
const btSwitchMode = document.querySelector("#switch-mode");
const btPlayPause = document.querySelector("#play-pause");
const btReset = document.querySelector("#reset");
const alarm = document.querySelector("audio");

let startClock;

let alarmMuted = false;

let isFocusMode = modeTitle.innerText.toLowerCase() == "focus" ? true : false;
let minTotal = 25;

let progressWidth = 0;

const iconPause = btPlayPause.children[0];

btPlayPause.addEventListener("click", () => {
    startClock = setInterval(countTime, 50);

    iconPause.className = "bi bi-pause-fill";
    iconPause.style.left = "7%";
    btPlayPause.addEventListener("mouseover", () => {btPlayPause.children[0].style.left = "7%"});
    btPlayPause.addEventListener("mouseout", () => {btPlayPause.children[0].style.left = "12%"});

    if(minutes <= 0 && seconds <= 0){
        clearInterval(startClock);
    }
})

btSwitchMode.addEventListener("click", () => {
    switchMode();
})

btMute.addEventListener("click", () => {
    if(!alarmMuted){
        btMute.children[0].className = "bi bi-bell-slash";
        btMute.previousElementSibling.innerText = "Unmute";
        alarmMuted = true;
    } else{
        btMute.children[0].className = "bi bi-bell";
        btMute.previousElementSibling.innerText = "Mute";
        alarmMuted = false;
    }
})

function countTime() {
    let minutes = Number(remainingMinutes.innerText.slice(0, -1));
    let seconds = Number(remainingSeconds.innerText.slice(0, -1));
    
    if(minutes <= 0 && seconds <= 0){
        if(!alarmMuted){
            alarm.currentTime = 2;
            alarm.play();
        }
        switchMode();
        return;
    }

    if(seconds > 0){
        seconds--; 
    } else if(seconds <= 0){
        seconds = 59
        minutes--
    }

    if(seconds < 10){
        remainingSeconds.innerText = "0" + seconds + "s";
    } else{
        remainingSeconds.innerText = seconds + "s";
    }
    remainingMinutes.innerText = minutes + "m";

    countProgressTime(minutes, seconds);
}

function countProgressTime(minutes, seconds) {
    let min = seconds == 0 ? (minTotal - minutes) + 1 : minTotal - minutes;
    let sec = seconds > 0 ? 60 - seconds : seconds;

    if(sec < 10){
        progressTime.children[0].innerText = min-1 + ":0" + sec;
    } else{
        progressTime.children[0].innerText = min-1 + ":" + sec;
    }

    progressBar();
}

function progressBar() {
    const fullTime = Number(progressTime.children[1].innerText.slice(0, -3));
    const parcels = 100 / (fullTime * 60);
    progressWidth += parcels;

    if(progressWidth <= 100){
        progress.style.width = progressWidth + "%";
    }
}

function switchMode() {
    clearInterval(startClock);
    progress.style.width = "0%";

    if(isFocusMode){
        modeTitle.innerText = "Rest";
        remainingMinutes.innerText = "5m";
        remainingSeconds.innerText = "00s";
        isFocusMode = false;
        progressTime.children[0].innerText = "0:00";
        progressTime.children[1].innerText = "5:00";

        imgRest.classList.remove("img-oculta");
        imgFocus.classList.add("img-oculta");

        minTotal = 5;
    } else{
        modeTitle.innerText = "Focus";
        remainingMinutes.innerText = "25m";
        remainingSeconds.innerText = "00s";
        isFocusMode = true;
        progressTime.children[0].innerText = "0:00";
        progressTime.children[1].innerText = "25:00";

        imgFocus.classList.remove("img-oculta");
        imgRest.classList.add("img-oculta");
        
        minTotal = 25;
    }

    iconPause.className = "bi bi-play-fill";
    btPlayPause.addEventListener("mouseover", () => {btPlayPause.children[0].style.left = "10%"});
    btPlayPause.addEventListener("mouseout", () => {btPlayPause.children[0].style.left = "15%"});
}

