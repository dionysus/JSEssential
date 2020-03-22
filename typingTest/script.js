const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
	if (time <= 9) {
		time = "0" + time;
	}
	return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer(){
	let currentTime = leadingZero(timer[0]) + 
		":" + leadingZero(timer[1]) + 
		":" + leadingZero(timer[2]);

	theTimer.innerHTML = currentTime;
	timer[3]++;

	timer[0] = Math.floor((timer[3]/100) / 60);
	timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
	timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellcheck() {
	let textEntered = testArea.value;
	let originTextMatch = originText.substring(0, textEntered.length);

	// done!
	if (textEntered == originText) { // text is finished!
		testWrapper.style.borderColor = "green";

		// stop the timer
		clearInterval(interval);

	} else  {
		if (textEntered == originTextMatch){ // text is correct so far
			testWrapper.style.borderColor = "blue";
		} else { // text has errors
			testWrapper.style.borderColor = "orange";
		}
	}

	console.log(textEntered);
}

// Start the timer:
function startTimer() {
	let textEnteredLength = testArea.value.length;

	if (textEnteredLength === 0 && !timerRunning){
		interval = setInterval(runTimer, 10); // every 1/1000 seconds
		timerRunning = true;
	}
	console.log(textEnteredLength);
}

// Reset everything:
function reset () {
	
	// Reset Timer
	clearInterval(interval);
	interval = null;
	timerRunning = false;
	timer = [0, 0, 0, 0];

	// Reset text
	testArea.value = "";
	theTimer.innerHTML = "00:00:00";
	testWrapper.style.borderColor = "grey";

	console.log("Reset Button has been pressed!");
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", startTimer, false);
testArea.addEventListener("keyup", spellcheck, false);
resetButton.addEventListener("click", reset, false);