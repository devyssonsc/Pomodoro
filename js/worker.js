let startClock;
self.onmessage = function(event){
    const data = event.data;

    let postMin = data.postMin;
    let postSec = data.postSec;

    if(data.clicked == "play"){
        startClock = setInterval(function() {
        if(postSec > 0){
            postSec--; 
        } else if(postSec <= 0){
            postSec = 59
            postMin--
        }
        self.postMessage({postMin, postSec});
        }, 10);
    }else if(data.clicked == "pause"){
        clearInterval(startClock);
    }
}