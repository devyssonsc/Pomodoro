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
const btDefinition = document.querySelector("#definition-button");
const modalDefinition = document.querySelector("#modal-definition");
const modalRestover = document.querySelector("#modal-restover");
const modalFocusover = document.querySelector("#modal-focusover");
const btCloseDefinition = document.querySelector("#close-definition");
const btCloseFocusover = document.querySelector("#close-focusover");
const btCloseRestover = document.querySelector("#close-restover");

let startClock;

let alarmMuted = false;

let isFocusMode = modeTitle.innerText.toLowerCase() == "foco" ? true : false;
let minTotal = 25;

let progressWidth = 0;

const iconPlayPause = btPlayPause.children[0];

btPlayPause.addEventListener("click", () => {
    if(iconPlayPause.className.includes("play")){
        startClock = setInterval(countTime, 50);
        iconPlayPause.className = "bi bi-pause-fill";
        iconPlayPause.style.left = "7%";
        btPlayPause.addEventListener("mouseover", () => {btPlayPause.children[0].style.left = "7%"});
        btPlayPause.addEventListener("mouseout", () => {btPlayPause.children[0].style.left = "10%"});
    } else if(iconPlayPause.className.includes("pause")){
        clearInterval(startClock)
        iconPlayPause.className = "bi bi-play-fill";
        iconPlayPause.style.left = "15%";
        btPlayPause.addEventListener("mouseover", () => {btPlayPause.children[0].style.left = "10%"});
        btPlayPause.addEventListener("mouseout", () => {btPlayPause.children[0].style.left = "15%"});
    }
})

btSwitchMode.addEventListener("click", () => {
    switchMode();
})

btReset.addEventListener("click", () => {
    clearInterval(startClock);
    btMute.children[0].className = "bi bi-bell";
    btMute.previousElementSibling.innerText = "Mute";
    alarmMuted = false;
    modeTitle.innerText = "Foco";
    remainingMinutes.innerText = "25m";
    remainingSeconds.innerText = "00s";
    isFocusMode = true;
    progressTime.children[0].innerText = "0:00";
    progressTime.children[1].innerText = "25:00";
    imgFocus.classList.remove("img-oculta");
    imgRest.classList.add("img-oculta");
    minTotal = 25;
    progressWidth = 0;
    progress.style.width = "0%";
})

btMute.addEventListener("click", () => {
    if(!alarmMuted){
        btMute.children[0].className = "bi bi-bell-slash";
        btMute.previousElementSibling.innerText = "Desmutar";
        alarmMuted = true;
    } else{
        btMute.children[0].className = "bi bi-bell";
        btMute.previousElementSibling.innerText = "Mutar";
        alarmMuted = false;
    }
})

btDefinition.addEventListener("click", () => {
    modalDefinition.showModal();
    modalDefinition.style.opacity = "1";
});

btCloseDefinition.addEventListener("click", () => {
    modalDefinition.style.opacity = "0";
    setTimeout(() => {
        modalDefinition.close();
    }, 90);
})

btCloseFocusover.addEventListener("click", () => {
    modalFocusover.style.opacity = "0";
    setTimeout(() => {
        modalFocusover.close();
    }, 90);
})

btCloseRestover.addEventListener("click", () => {
    modalRestover.style.opacity = "0";
    setTimeout(() => {
        modalRestover.close();
    }, 90);
})

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" || event.keyCode === 27) {
        modalDefinition.style.opacity = "0";
        modalRestover.style.opacity = "0";
        modalFocusover.style.opacity = "0";
    }
  });



function countTime() {
    let minutes = Number(remainingMinutes.innerText.slice(0, -1));
    let seconds = Number(remainingSeconds.innerText.slice(0, -1));
    
    if(minutes <= 0 && seconds <= 0){
        if(isFocusMode){
            modalFocusover.showModal();
            modalFocusover.style.opacity = "1";
        } else{
            modalRestover.showModal();
            modalRestover.style.opacity = "1";
        }

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
    progressBar();
}

function countProgressTime(minutes, seconds) {
    let min = seconds == 0 ? (minTotal - minutes) + 1 : minTotal - minutes;
    let sec = seconds > 0 ? 60 - seconds : seconds;

    if(sec < 10){
        progressTime.children[0].innerText = min-1 + ":0" + sec;
    } else{
        progressTime.children[0].innerText = min-1 + ":" + sec;
    }

}

function progressBar() {
    const fullTime = Number(progressTime.children[1].innerText.slice(0, -3));
    const parcels = 100 / (fullTime * 60);
    progressWidth += parcels;

    if(progressWidth <= 100){
        progress.style.width = progressWidth + "%";
    } else{
        progressWidth -= 100;
    }
}

function switchMode() {
    clearInterval(startClock);
    progressWidth = 0;
    progress.style.width = "0%";

    if(isFocusMode){
        modeTitle.innerText = "Descanso";
        remainingMinutes.innerText = "5m";
        remainingSeconds.innerText = "00s";
        isFocusMode = false;
        progressTime.children[0].innerText = "0:00";
        progressTime.children[1].innerText = "5:00";

        imgRest.classList.remove("img-oculta");
        imgFocus.classList.add("img-oculta");

        minTotal = 5;
    } else{
        modeTitle.innerText = "Foco";
        remainingMinutes.innerText = "25m";
        remainingSeconds.innerText = "00s";
        isFocusMode = true;
        progressTime.children[0].innerText = "0:00";
        progressTime.children[1].innerText = "25:00";

        imgFocus.classList.remove("img-oculta");
        imgRest.classList.add("img-oculta");
        
        minTotal = 25;
    }

    iconPlayPause.className = "bi bi-play-fill";
    iconPlayPause.style.left = "15%";
    btPlayPause.addEventListener("mouseover", () => {btPlayPause.children[0].style.left = "10%"});
    btPlayPause.addEventListener("mouseout", () => {btPlayPause.children[0].style.left = "15%"});
}