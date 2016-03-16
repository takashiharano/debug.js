window.onload = function() {
 
//in the absence of this initialization, debug.js works in default configuration.
//  var options = {
//    'buffSize': 25,
//    'width': 500,
//    'showLineNums': true,
//    'showClearButton': true,
//    'defaultShow': true,
//  };
//  Debug.init(null, options); 

  log.s('Here is the output example!');
  log('The window\'s load event fired.');
}

document.onkeydown = function(e) {
//  Debug.setStyle("color", "#0f0");
  log('KeyDown: keyCode = ' + e.keyCode);
  log.e('error log');
  log.w('warn log');
  log.i('info log');
  log.d('debug log');
  log.v('verbose log');
  log.s('special log');
}

document.onmousemove = function(e) {
  log('mouseMoved: x=' + e.clientX + ', y=' + e.clientY);
};

document.onclick = function(e) {
  log('click count: ' + event.detail);
}
