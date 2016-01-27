window.onload = function() {
	Debug.init('debug', 20, true);
	debug('The window\'s load event fired.');
}

document.onkeydown = function(e) {
	debug('KeyDown: keyCode = ' + e.keyCode);
}

document.onmousemove = function(e) {
	debug('mouseMoved: x=' + e.clientX + ', y=' + e.clientY);
};

document.onclick = function(e) {
	debug('click count: ' + event.detail);
}
