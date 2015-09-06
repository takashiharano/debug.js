var count = 0;

$(document).ready(function() {
	var debug = new Debug("log", 10);
	log("document ready.");
	window.setInterval(printDateTime, 1000);
});

function printDateTime() {
	log(count + ": " + new Date());
	count++;
}

$(window).keydown(function(event) {
	log("KeyDown: keyCode = " + event.keyCode);
	return true;
});
