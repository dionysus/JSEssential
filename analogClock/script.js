const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

var date = new Date();
	let hr = date.getHours();
	let min = date.getMinutes();
	let sec = date.getSeconds();
	console.log(hr + " : " + min + " : " + sec);

	function getRot(num, max) {
		return num * (360 / max);
	}

	// degree of arm rotation
	let secPos = getRot(sec, 60);
	let minPos = getRot(min, 60) + secPos / 60;
	let hrPos = getRot(hr, 12) + minPos / 12;

function runClock(){

	hrPos = hrPos + (3/360);
	minPos = minPos + (6/60);
	secPos = secPos + 6;

	// assign rotation of arm
	HOURHAND.style.transform = "rotate(" + hrPos + "deg)";
	MINUTEHAND.style.transform = "rotate(" + minPos + "deg)";
	SECONDHAND.style.transform = "rotate(" + secPos + "deg)";

}

var interval = setInterval(runClock, 1000);
