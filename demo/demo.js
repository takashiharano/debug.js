window.onload = function() {
	// set the init param if you want to change the log settings.
	//Debug.init("log", 20, false);
	log("window.onload");
	window.setInterval(printDateTime, 1000);
}

document.onkeydown = function(e) {
	log("KeyDown: keyCode = " + e.keyCode);
}

document.onmousemove = function(e){
	if (!e) {
		e = window.event;
	}

	var mouse_x = e.clientX;
	var mouse_y = e.clientY;

	log("mouseMoved: x=" + mouse_x + ", y=" + mouse_y);
};

document.onclick = function(e) {
	log("click count: " + event.detail);
}

function printDateTime() {
	log(new Date());
}
