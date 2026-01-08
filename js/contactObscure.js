const emailDisplay = document.querySelector("#emailJumble");

const getRandomChars = (len) => {
    // generated this way to customize the characters that are chosen - not just the numbers+hex set
    // doesn't really need to be "secure" because this is just for visuals.
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?#$%&<>*"
    let str = ""

    for(let i = 0; i < len; ++i) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;
}

//wait for given ms
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//store info about email chars
let displayCycling = {val: true, running: false}

let cycleRandomChars = async () => {

    console.log("cycling!");
    //tell it we're running, incase multiple are running at once
    displayCycling.running = true;

    //setup
    let delay = 15; //in ms
    const currDisplay = emailDisplay.textContent;
    let newDisplay = "";

    //check mouse and set newDisplay correctly
    if(emailDisplay.classList.contains("mouseOver")) {
        const protectedEmail = "SSgPeAaMsPtRoOnT0E4C@TgImOaNiSlP.AcMoPm0";
        //construct the real email out of a spam protected one
        const doubleLen = protectedEmail.length;
        for(let i = 0; i < doubleLen; i+= 2) {
            newDisplay = newDisplay.concat(protectedEmail.charAt(i));
        }
        delay = 30;
        displayCycling.val = false; //stop future cycles
    }
    else {
        newDisplay = getRandomChars(10).concat("@").concat(getRandomChars(5)).concat(".com");
    }

    //setup replacement process
    let visited = []
    for(let len = 0; len < newDisplay.length; ++len) {
        visited[len] = len;
    }

    //now replace
    while(visited.length > 0) {
        const randomIndex = Math.floor(Math.random() * visited.length);
        const randomNumber = visited[randomIndex];
        visited.splice(randomIndex, 1);
        emailDisplay.textContent = 
            emailDisplay.textContent.substring(0, randomNumber)
            .concat(newDisplay.charAt(randomNumber))
            .concat(emailDisplay.textContent.substring(randomNumber+1));

        await sleep(delay);
        delay += Math.floor(Math.random() * 5) * Math.random() < 0.5 ? -1 : 1;
    }

    //let it loop
    displayCycling.running = false;
}


const repeatFunctionUntilFalse = async (flag, fn) => {
    while(flag.val) {
        console.log(flag);
        if(flag.running) {
            return;
        }
        await fn();
    }
}

const mouseOverDetect = (e) => {
    e.target.classList.add("mouseOver");

}

const mouseOutDetect = (e) => {
    e.target.classList.remove("mouseOver");
}



emailDisplay.addEventListener('mouseover', mouseOverDetect);
emailDisplay.addEventListener('mouseout', (e) => {
    mouseOutDetect(e);
    displayCycling.val = true;
    repeatFunctionUntilFalse(displayCycling, cycleRandomChars);
});

repeatFunctionUntilFalse(displayCycling, cycleRandomChars);