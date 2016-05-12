window.onload = function() {
 
//in the absence of this initialization, debug.js works in default configuration.
//  var options = {
//    'buffSize': 10,
//    'width': 500,
//    'top': 25,
//    'right': 30,
//    'errorColor': '#d44',
//    'warnColor': '#ed0',
//    'infoColor': '#fff',
//    'debugColor': '#8cf',
//    'verboseColor': '#ccc',
//    'specialColor': '#fff',
//    'timeColor': '#0f0',
//    'showLineNums': true,
//    'showTimeStamp': false,
//    'showClock': false,
//    'showClearButton': true,
//    'showCloseButton': false
//  };
//  Debug.init(null, options);

// If you want to output the logs to a designated area, pass the element id to 1st argument.
// Debug.init('test1', options); 

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
