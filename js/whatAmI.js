const displayText = document.querySelector("#whatAmI");
const cursorDisplay = document.querySelector("#whatAmICursor");
const options = [
    "A Developer",
    "A Designer",
    "A Producer",
    "An Artist"
];
const typingDelay = 60;
const typingHold = 4500;
const deleteDelay = 50;
const blinkSpeed = 700;
let typing = false;
let cursorState = false;


//wait for given ms
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const mainDisplayLoop = async (repetition) => {

    let rep = repetition % options.length;

    let iAmStr = options[rep];

    //do typing effect
    displayText.textContent = "";
    typing = true;
    showOrHideCursor();

    for(let i = 0; i <= iAmStr.length; ++i) {
        displayText.textContent = iAmStr.substring(0, i);
        await sleep(typingDelay * (1 + Math.random() * .4));
    }
    
    typing = false;
    showOrHideCursor();
    await sleep(typingHold);
    typing = true;
    showOrHideCursor();

    //do deleting effect
    for(let i = iAmStr.length-1; i >= 0; --i) {
        displayText.textContent = iAmStr.substring(0, i);
        await sleep(deleteDelay * (1 + Math.random() * .4));
    }

    typing = false;
    showOrHideCursor();
    await sleep(typingHold * .3);

    //loop next option
    mainDisplayLoop(rep + 1);
}

const blinkCursor = async () => {

    while(true) {
        showOrHideCursor();

        await sleep(blinkSpeed);

        cursorState = !cursorState;
    }
}

const showOrHideCursor = (show) => {
    cursorDisplay.textContent = (cursorState || typing) ? "|" : "";
}

mainDisplayLoop(0);
blinkCursor();