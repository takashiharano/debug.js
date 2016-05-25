var a = {
  'key1': 'val1',
  'key2': '123',
  'key3': 123,
  'key4': {
    'keyA': 'A',
    'keyB': {
      'keyB1': 'b1',
      'keyB2': 'b2'
    },
    'keyC': 'C'
   },
   'key5': null,
   'key6': undefined,
   'key7': true,
   'key8': [
     {
       'aaa': 111,
       'bbb': 'test1'
     },
     {
       'aaa': 222,
       'bbb': 'test2'
     }
   ]
};

var b = ['1', '2', '3'];
var c = 1;
var d = "string";
var e = false;
var f = undefined;
var g = null;

var h = [
  {
    'key1': 'AAA',
    'key2': 'BBB'
  },
  {
    'key1': 'CCC',
    'key2': 'DDD'
  },
  {
    'key1': 'EEE',
    'key2': 'FFF'
  }
];


window.onload = function() {
//in the absence of this initialization, debug.js works in default configuration.
  var options = {
    'buffSize': 18,
    'width': 500,
    'position': 'center', // left-top, left-bottom, center, right-top, right-bottom
    'posAdjX': 0,
    'posAdjY': 0,
    'errorColor': '#d44',
    'warnColor': '#ed0',
    'infoColor': '#fff',
    'debugColor': '#8cf',
    'verboseColor': '#ccc',
    'specialColor': '#fff',
    'timeColor': '#0f0',
    'systemInfoColor': '#ddd',
    'showLineNums': true,
    'showTimeStamp': true,
    'showClock': true,
    'showClearButton': true,
    'showCloseButton': true,
    'showWindowSize': true,
    'showMouseStatus': true,
    'showKeyStatus': true,
    'enableStopWatch': true,
    'enableCommandLine': true
  };
  Debug.init(null, options);

// If you want to output the logs to a designated area, pass the element id to 1st argument.
//  Debug.init('test1', options);
//  Debug.init('test1', null);

  log('Here is the output example!');
  log('The window\'s load event fired.');

  //setInterval('printTime()', 30000);
}

document.onkeydown = function(e) {
  //log('KeyDown: keyCode = ' + e.keyCode);
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
