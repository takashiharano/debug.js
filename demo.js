window.onload = function() {
	var debug = new Debug("log", 10, true);
	log("document ready.");
	window.setInterval(printDateTime, 1000);
}

document.onkeydown = function (event) {
	log("KeyDown: keyCode = " + event.keyCode);
	return true;
}

function printDateTime() {
	log(new Date());
}
