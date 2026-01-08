const displayText = document.querySelector("#whatAmI");
const options = [
    "A Developer",
    "A Designer",
    "A Producer",
    "An Artist"
];
const typingDelay = 50;
const typingHold = 5000;
const deleteDelay = 30;

//wait for given ms
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const mainDisplayLoop = (repetition) => {

    let rep = repetition % options.length;

    let iAmStr = options[rep];

    //do typing effect
    displayText.textContent = "";

    for(let i = 0; i < iAmStr.length; ++i) {
        displayText.textContent = iAmStr.substring(0, i);
        sleep(typingDelay);
    }
    
    sleep(typingHold);

    //do deleting effect
    for(let i = iAmStr.length-1; i >= 0; --i) {
        displayText.textContent = iAmStr.substring(0, i);
        sleep(deleteDelay);
    }

    //loop next option
    mainDisplayLoop(rep + 1);
}


mainDisplayLoop(1);