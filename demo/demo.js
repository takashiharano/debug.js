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

  log('<span style="color:#0f0;">Here is the output example!</span>');
  log('The window\'s load event fired.');
}

document.onkeydown = function(e) {
//  Debug.setStyle("color", "#0f0");
  log('KeyDown: keyCode = ' + e.keyCode);
  log.e('error');
  log.w('warn');
  log.i('info');
  log.d('debug');
}

document.onmousemove = function(e) {
//  log('mouseMoved: x=' + e.clientX + ', y=' + e.clientY);
};

document.onclick = function(e) {
  log('click count: ' + event.detail);
}
