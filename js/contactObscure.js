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

    displayCycling.running = true;

    //setup
    let delay = 15; //in ms
    console.log(emailDisplay.textContent);


}


const repeatFunctionUntilFalse = async (flag, fn) => {
    while(flag.val) {
        if(flag.running) {
            return;
        }
        await fn();
    }
}


repeatFunctionUntilFalse(displayCycling, cycleRandomChars);