const btMute = document.querySelector("#mute");
const modeTitle = document.querySelector("#mode-title");
const imgFocus = document.querySelector("#img-focus");
const imgRest = document.querySelector("#img-rest");
const remainingMinutes = document.querySelector("#minutes");
const remainingSeconds = document.querySelector("#seconds")
const progressTime = document.querySelector("#progress-time");
const progress = document.querySelector("#progress");
const btSwitchMode = document.querySelector("#switch-mode");
const btPlayPause = document.querySelector("#play-pause");
const btReset = document.querySelector("#reset");


const isFocusMode = modeTitle.innerText.toLowerCase() == "focus" ? true : false;

let minutes = Number(remainingMinutes.innerText.slice(0, -1));
let seconds = Number(remainingSeconds.innerText.slice(0, -1));

btPlayPause.addEventListener("click", () => {
    setInterval(countTime, 200);

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

    if(minutes < 10){
        remainingMinutes.innerText = "0" + minutes + "m";
    } else{
        remainingMinutes.innerText = minutes + "m";
    }
}