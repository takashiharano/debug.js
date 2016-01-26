window.onload = function() {
	// set the init param if you want to change the log settings.
	//Debug.init("debug", 20, false);
	debug("window.onload");
	window.setInterval(printDateTime, 1000);
}

document.onkeydown = function(e) {
	debug("KeyDown: keyCode = " + e.keyCode);
}

document.onmousemove = function(e){
	if (!e) {
		e = window.event;
	}

	var mouse_x = e.clientX;
	var mouse_y = e.clientY;

	debug("mouseMoved: x=" + mouse_x + ", y=" + mouse_y);
};

document.onclick = function(e) {
	debug("click count: " + event.detail);
}

function printDateTime() {
	debug(new Date());
}
