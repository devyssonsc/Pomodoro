const worker = new Worker('js/worker.js');

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
const btSetTimes = document.querySelector("#set-times-button")
const modalDefinition = document.querySelector("#modal-definition");
const modalRestover = document.querySelector("#modal-restover");
const modalFocusover = document.querySelector("#modal-focusover");
const modalSetTimes = document.querySelector("#modal-set-times");
const btCloseDefinition = document.querySelector("#close-definition");
const btCloseFocusover = document.querySelector("#close-focusover");
const btCloseRestover = document.querySelector("#close-restover");
const btCloseSetTimes = document.querySelector("#close-set-times");

const btDecreaseFocus = document.querySelector("#btDecreaseFocus");
const btDecreaseRest = document.querySelector("#btDecreaseRest");
const btAddFocus = document.querySelector("#btAddFocus");
const btAddRest = document.querySelector("#btAddRest");
const setMinFocus = document.querySelector("#setMinFocus");
const setMinRest = document.querySelector("#setMinRest");

const btSubmit = document.querySelector("#submit");

let alarmMuted = false;

let isFocusMode = modeTitle.innerText.toLowerCase() == "foco" ? true : false;

let minFocus = 25;
let minRest = 5;

let minTotal = minFocus;

setMinFocus.value = minFocus;
setMinRest.value = minRest;

let progressWidth = 0;

const iconPlayPause = btPlayPause.children[0];

let minutes = Number(remainingMinutes.innerText.slice(0, -1));
let seconds = Number(remainingSeconds.innerText.slice(0, -1));

let data = {minutes: minutes, seconds: seconds, clicked: "play"};

btPlayPause.addEventListener("click", () => {
    min = Number(remainingMinutes.innerText.slice(0, -1));
    sec = Number(remainingSeconds.innerText.slice(0, -1));

    data = {postMin: min, postSec: sec, clicked: "play"};

    if(iconPlayPause.className.includes("play")){
        data.clicked = "play";
        worker.postMessage(data);
        worker.onmessage = function(event){
            postMin = event.data.postMin;
            postSec = event.data.postSec;

            if(postMin <= 0 && postSec <= 0){
                data.clicked = "pause";
                console.log(data);
                worker.postMessage(data);
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
            
            countTime(postMin, postSec);
        }

        iconPlayPause.className = "bi bi-pause-fill";
        iconPlayPause.style.left = "7%";
        btPlayPause.addEventListener("mouseover", () => {btPlayPause.children[0].style.left = "7%"});
        btPlayPause.addEventListener("mouseout", () => {btPlayPause.children[0].style.left = "10%"});
    } else if(iconPlayPause.className.includes("pause")){
        data.clicked = "pause";
        worker.postMessage(data);
        iconPlayPause.className = "bi bi-play-fill";
        iconPlayPause.style.left = "15%";
        btPlayPause.addEventListener("mouseover", () => {btPlayPause.children[0].style.left = "10%"});
        btPlayPause.addEventListener("mouseout", () => {btPlayPause.children[0].style.left = "15%"});
    }
})

btSwitchMode.addEventListener("click", () => {
    data.clicked = "pause";
    worker.postMessage(data);
    switchMode();
})

btReset.addEventListener("click", () => {
    data.clicked = "pause";
    worker.postMessage(data);
    btMute.children[0].className = "bi bi-bell";
    btMute.previousElementSibling.innerText = "Mute";
    alarmMuted = false;
    modeTitle.innerText = "Foco";
    remainingMinutes.innerText = minFocus + "m";
    remainingSeconds.innerText = "00s";
    isFocusMode = true;
    progressTime.children[0].innerText = "0:00";
    progressTime.children[1].innerText = minTotal + ":00";
    imgFocus.classList.remove("img-oculta");
    imgRest.classList.add("img-oculta");
    progressWidth = 0;
    progress.style.width = "0%";
    iconPlayPause.className = "bi bi-play-fill";
    iconPlayPause.style.left = "15%";
    btPlayPause.addEventListener("mouseover", () => {btPlayPause.children[0].style.left = "10%"});
    btPlayPause.addEventListener("mouseout", () => {btPlayPause.children[0].style.left = "15%"});
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

btSetTimes.addEventListener("click", () => {
    modalSetTimes.showModal();
    modalSetTimes.style.opacity = "1";
});

btCloseSetTimes.addEventListener("click", (e) => {
    e.preventDefault();
    modalSetTimes.style.opacity = "0";
    setTimeout(() => {
        modalSetTimes.close();
    }, 90);
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
        modalSetTimes.style.opacity = "0";
    }
});


btDecreaseFocus.addEventListener("click", () => {
      setMinFocus.value = Number(setMinFocus.value) - 1
})
  
btAddFocus.addEventListener("click", () => {
      setMinFocus.value = Number(setMinFocus.value) + 1
})
  
btDecreaseRest.addEventListener("click", () => {
      setMinRest.value = Number(setMinRest.value) - 1
})
  
btAddRest.addEventListener("click", () => {
      setMinRest.value = Number(setMinRest.value) + 1
})


btSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    minFocus = Number(setMinFocus.value);
    console.log(minFocus);
    minRest = Number(setMinRest.value);
    console.log(minRest);
    minTotal = minFocus;
    console.log(minTotal);

    modalSetTimes.style.opacity = "0";
    setTimeout(() => {
        modalSetTimes.close();
    }, 90);

    remainingMinutes.innerText = minFocus + "m";
    progressTime.children[1].innerText = minTotal + ":00";

    btReset.dispatchEvent(new Event("click"));
})


function countTime(minutes, seconds) {
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
    data.clicked = "pause";
    worker.postMessage(data);
    progressWidth = 0;
    progress.style.width = "0%";

    if(isFocusMode){
        modeTitle.innerText = "Descanso";
        remainingMinutes.innerText = minRest + "m";
        remainingSeconds.innerText = "00s";
        isFocusMode = false;
        progressTime.children[0].innerText = "0:00";
        progressTime.children[1].innerText = `${minRest}:00`;

        imgRest.classList.remove("img-oculta");
        imgFocus.classList.add("img-oculta");

        minTotal = minRest;
    } else{
        modeTitle.innerText = "Foco";
        remainingMinutes.innerText = minFocus + "m";
        remainingSeconds.innerText = "00s";
        isFocusMode = true;
        progressTime.children[0].innerText = "0:00";
        progressTime.children[1].innerText = `${minFocus}:00`;

        imgFocus.classList.remove("img-oculta");
        imgRest.classList.add("img-oculta");
        
        minTotal = minFocus;
    }

    iconPlayPause.className = "bi bi-play-fill";
    iconPlayPause.style.left = "15%";
    btPlayPause.addEventListener("mouseover", () => {btPlayPause.children[0].style.left = "10%"});
    btPlayPause.addEventListener("mouseout", () => {btPlayPause.children[0].style.left = "15%"});
}