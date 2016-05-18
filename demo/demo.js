window.onload = function() {
 
//in the absence of this initialization, debug.js works in default configuration.
//  var options = {
//    'buffSize': 10,
//    'width': 500,
//    'errorColor': '#d44',
//    'warnColor': '#ed0',
//    'infoColor': '#fff',
//    'debugColor': '#8cf',
//    'verboseColor': '#ccc',
//    'specialColor': '#fff',
//    'timeColor': '#0f0',
//    'systemInfoColor': '#ddd',
//    'showLineNums': true,
//    'showTimeStamp': true,
//    'showClock': true,
//    'showClearButton': true,
//    'showCloseButton': true,
//    'showWinSize': true,
//    'showMousePosition': true,
//    'enableStopWatch': true
//  };
//  Debug.init(null, options);

// If you want to output the logs to a designated area, pass the element id to 1st argument.
//  Debug.init('test1', options); 

  log('Here is the output example!');
  log('The window\'s load event fired.');

  setInterval('printTime()', 30000);
}

document.onkeydown = function(e) {
  log('KeyDown: keyCode = ' + e.keyCode);
}

document.onmousemove = function(e) {
  //log('mouseMoved: x=' + e.clientX + ', y=' + e.clientY);
};

document.onclick = function(e) {
  //log('click count: ' + event.detail);
}

function printTime() {
  var dt = DebugJS.getTime();
  var tm = dt.hh + ':' + dt.mi + ':' + dt.ss;
  log.d('The time is ' + tm);
}
