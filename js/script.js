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

let minTotal = 25;
const isFocusMode = modeTitle.innerText.toLowerCase() == "focus" ? true : false;

let minutes = Number(remainingMinutes.innerText.slice(0, -1));
let seconds = Number(remainingSeconds.innerText.slice(0, -1));

btPlayPause.addEventListener("click", () => {
    setInterval(countTime, 300);
    setInterval(countProgressTime, 300);

    const iconPause = btPlayPause.children[0]
    iconPause.className = "bi bi-pause-fill";
    btPlayPause.children[0].style.left = "11%"
    btPlayPause.children[0].style.marginLeft = "-2px"
    btPlayPause.addEventListener("mouseover", () => {btPlayPause.children[0].style.left = "7%"})
    btPlayPause.addEventListener("mouseout", () => {btPlayPause.children[0].style.left = "12%",
                                                    btPlayPause.children[0].style.marginLeft = "0"})
})

function countTime() {
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
}

function countProgressTime() {
    let min = seconds == 0 ? (minTotal - minutes) + 1 : minTotal - minutes;
    let sec = seconds > 0 ? 60 - seconds : seconds;

    if(sec < 10){
        progressTime.children[0].innerText = min-1 + ":0" + sec;
    } else{
        progressTime.children[0].innerText = min-1 + ":" + sec;
    }
}

