/*!
 * debug.js
 *
 * Copyright 2016 Takashi Harano
 * Released under the MIT license
 * https://github.com/takashiharano/debug.js
 *
 * Date: 2016-05-15T14:20+09:00
 */
function DebugJS() {
  this.ENABLE = true;
  this.DEFAULT_SHOW = true;

  this.DEFAULT_OPTIONS = {
    'buffSize': 20,
    'width': 500,
    'top': 25,
    'right': 30,
    'errorColor': '#d44',
    'warnColor': '#ed0',
    'infoColor': '#fff',
    'debugColor': '#8cf',
    'verboseColor': '#ccc',
    'specialColor': '#fff',
    'timeColor': '#0f0',
    'showLineNums': true,
    'showTimeStamp': true,
    'showClock': true,
    'showClearButton': true,
    'showCloseButton': true,
    'enableStopWatch': true
  };

  this.DEFAULT_STYLE = {
    'position': 'relative',
    'padding': '0',
    'line-height': '1em',
    'border': 'solid 1px #888',
    'font-family': 'Consolas',
    'font-size': '12px',
    'color': '#fff',
    'background': '#111',
    'display': 'block'
  };

  this.id = null;
  this.msgArea = null;
  this.options = null;
  this.DEFAULT_ELM_ID = '_debug_';
}

DebugJS.getTime = function() {
  var nowDate = new Date();
  var mm = nowDate.getMonth() + 1;
  var dd = nowDate.getDate();
  var hh = nowDate.getHours();
  var mi = nowDate.getMinutes();
  var ss = nowDate.getSeconds();
  var ms = nowDate.getMilliseconds();

  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;
  if (hh < 10) hh = '0' + hh;
  if (mi < 10) mi = '0' + mi;
  if (ss < 10) ss = '0' + ss;
  if (ms < 10) {ms = '00' + ms;}
  else if (ms < 100) {ms = '0' + ms;}

  var dateTime = {
    'yyyy': nowDate.getFullYear(),
    'mm': mm,
    'dd': dd,
    'hh': hh,
    'mi': mi,
    'ss': ss,
    'ms': ms,
    'wday': nowDate.getDay()
  }

  return dateTime;
}

DebugJS.STATE_SHOW = 0x1;
DebugJS.STATE_AUTO = 0x2;
DebugJS.STATE_SHOW_CLOCK = 0x4;
DebugJS.STATE_STOP_WATCH_RUNNING = 0x8;
DebugJS.STATE_AUTO_REFRESH = 0x40000000;
DebugJS.STATE_PRINT_LOG = 0x80000000;
DebugJS.status = 0;

DebugJS.WDAYS = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');

DebugJS.time = function() {
  var dt = DebugJS.getTime();
  var tm = dt.hh + ':' + dt.mi + ':' + dt.ss + '.' + dt.ms;
  return tm;
}

DebugJS.UPDATE_INTERVAL_NORMAL = 1000;
DebugJS.UPDATE_INTERVAL_STOPWATCH = 500;
DebugJS.updateInterval = DebugJS.UPDATE_INTERVAL_NORMAL;

DebugJS.swStartTime = 0;
DebugJS.swElapsedTime = 0;
DebugJS.elapsedTime = '00:00:00 ';
DebugJS.dot = '&nbsp;';

DebugJS.startStopStopWatch = function() {
  if (DebugJS.status & DebugJS.STATE_STOP_WATCH_RUNNING) {
    // stop
    DebugJS.status &= ~DebugJS.STATE_STOP_WATCH_RUNNING;
    DebugJS.updateInterval = DebugJS.UPDATE_INTERVAL_NORMAL;
  } else {
    // start
    DebugJS.status |= DebugJS.STATE_STOP_WATCH_RUNNING;
    DebugJS.updateInterval = DebugJS.UPDATE_INTERVAL_STOPWATCH;
    DebugJS.swStartTime = (new Date()).getTime() - DebugJS.swElapsedTime;
    DebugJS.updateStopWatch();
  }
}

DebugJS.updateStopWatch = function() {
  if (!(DebugJS.status & DebugJS.STATE_STOP_WATCH_RUNNING)) return;
  var swCurrentTime = (new Date()).getTime();
  DebugJS.swElapsedTime = swCurrentTime - DebugJS.swStartTime;
  DebugJS.elapsedTime = DebugJS.getPassedTimeStr(DebugJS.swElapsedTime);
  if (DebugJS.dot == '&nbsp;') {
    DebugJS.dot = '.';
  } else {
    DebugJS.dot = '&nbsp;';
  }
  DebugJS.elapsedTime += DebugJS.dot;
}

DebugJS.resetStopwatch = function() {
  DebugJS.swStartTime = (new Date()).getTime();

  DebugJS.elapsedTime = DebugJS.getPassedTimeStr(0) + '&nbsp;';
  DebugJS.swElapsedTime = 0;
}

DebugJS.getPassedTimeStr = function(swPassedTimeMsec) {
  var passedHour;
  var passedMin;
  var passedSec;
  var passedMsec;

  var passedTimeSec = Math.floor((swPassedTimeMsec) / 1000);
  var wkPassedTimeSec = passedTimeSec;

  passedSec = wkPassedTimeSec;

  if (wkPassedTimeSec >= 3600) {
    passedHour = Math.floor((wkPassedTimeSec / 3600));
    wkPassedTimeSec = (wkPassedTimeSec - (passedHour * 3600));
  } else {
    passedHour = 0;
  }

  if (wkPassedTimeSec >= 60) {
    passedMin  = Math.floor((wkPassedTimeSec / 60));
    wkPassedTimeSec = (wkPassedTimeSec - (passedMin * 60));
  } else {
    passedMin = 0;
  }

  passedSec = wkPassedTimeSec;
  passedMsec = Math.floor(swPassedTimeMsec & 999);

  if (passedHour < 10) passedHour = '0' + passedHour;
  if (passedMin < 10) passedMin = '0' + passedMin;
  if (passedSec< 10) passedSec = '0' + passedSec;
  if (passedMsec< 10) {passedMsec = '00' + passedMsec;}
  else if (passedMsec< 100) passedMsec = '0' + passedMsec;

  var retStr = passedHour;
  retStr += ':' + passedMin;
  retStr += ':' + passedSec;
//  retStr += '.' + passedMsec;

  return retStr;
}

DebugJS.prototype = {
  init:  function(elmId, options) {
    if(!this.ENABLE){return;}

    if (elmId == null) {
      this.id = this.DEFAULT_ELM_ID;
      DebugJS.status |= DebugJS.STATE_AUTO;
    } else {
      this.id = elmId;
      this.msgArea = document.getElementById(this.id);
    }

    if (this.DEFAULT_SHOW) {
      DebugJS.status |= DebugJS.STATE_SHOW;
    } else {
      DebugJS.status &= ~DebugJS.STATE_SHOW;
    }

    if (options == null) {
      this.options = this.DEFAULT_OPTIONS;
    } else {
      this.options = options;
    }

    if (this.options.showClock) {
      DebugJS.status |= DebugJS.STATE_SHOW_CLOCK;
    }

    if (this.msgArea == null) {
      var div = document.createElement('div');
      div.id = this.id;
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(div);
      this.msgArea = div;
    }

    this.msgBuff = new RingBuffer(this.options.buffSize);

    var styles = {};
    styles['#' + this.id] = this.DEFAULT_STYLE;

    styles['#' + this.id + ' td'] = {
      'font-size': this.DEFAULT_STYLE['font-size'],
      'font-family': this.DEFAULT_STYLE['font-family'],
      'color': this.DEFAULT_STYLE['color'],
      'background': 'initial',
      'width': 'initial',
      'border': 'initial',
      'padding': '0 3px'
    };

    styles['#' + this.id + ' pre'] = {
      'white-space': 'pre-wrap',
      'word-break': 'break-all', 
      'font-size': this.DEFAULT_STYLE['font-size'],
      'font-family': this.DEFAULT_STYLE['font-family'],
      'color': this.DEFAULT_STYLE['color'],
      'margin': '0'
    };

    styles['#' + this.id + ' a'] = {
      'color': '#00bfff',
      'text-decoration': 'none'
    };

    styles['#' + this.id + ' a:hover'] = {
      'color': '#fff',
      'text-decoration': 'none'
    };

    if (DebugJS.status & DebugJS.STATE_AUTO) {
      var wkStyle = styles['#' + this.id];
      wkStyle.position = 'fixed';
      wkStyle.width = this.options.width + 'px';
      wkStyle.top = this.options.top  + 'px';
      wkStyle.left = (window.innerWidth - this.options.width - this.options.right) + 'px';
      wkStyle.background = 'rgba(0,0,0,0.7)';
      wkStyle['box-shadow'] = '10px 10px 10px rgba(0,0,0,.3)';
      wkStyle['z-index'] = 0x7fffffff;
      if (!(DebugJS.status & DebugJS.STATE_SHOW)) {
        wkStyle.display = 'none';
      }
    }

    this.applyStyles(styles);

    this.clearMessage();

    if (DebugJS.status & DebugJS.STATE_AUTO) {
      this.setupMove();
      this.setupKeyHandler();
    }
  },

  isInitialized: function() {
    if (this.msgArea == null) {
      return false;
    } else {
      return true;
    }
  },

  printMessage: function() {
    DebugJS.status |= DebugJS.STATE_PRINT_LOG;
    this._printMessage();
    DebugJS.status &= ~DebugJS.STATE_PRINT_LOG;
  },

  _printMessage: function() {
    var buf = this.msgBuff.getAll();
    var msg = '';
    msg += '<div style="padding:2px 2px 5px 2px;background:rgba(0,68,118,0);">';
    if (this.options.showClearButton) {
      msg += '<a href="" onclick="Debug.clearMessage();return false;">[clear]</a>';
    }

    if (DebugJS.status & DebugJS.STATE_SHOW_CLOCK) {
      var dt = DebugJS.getTime();
      var tm = dt.yyyy + '-' + dt.mm + '-' + dt.dd + '(' + DebugJS.WDAYS[dt.wday] + ') ' + dt.hh + ':' + dt.mi + ':' + dt.ss;
      msg += '<span style="margin-left:10px;font-size:14px;color:' + Debug.options.timeColor + ';text-shadow:0 0 3px ' + Debug.options.timeColor + ';">' + tm + '</span>';
    }

    if (this.options.enableStopWatch) {
      DebugJS.updateStopWatch();
      msg += '<span style="margin-left:15px;"><a href="" onclick="DebugJS.startStopStopWatch();return false;">';
      if (DebugJS.status & DebugJS.STATE_STOP_WATCH_RUNNING) {
        msg += '■';
      } else {
        msg += '▶';
      }
      msg += '</a> ' + DebugJS.elapsedTime + ' <a href="" onclick="DebugJS.resetStopwatch();return false;">🔃</a></span>';
    }

    if ((DebugJS.status & DebugJS.STATE_AUTO) && this.options.showCloseButton) {
      msg += '<span style="float:right;margin-right:2px;font-size:22px;"><a href="" onclick="Debug.hideDebugWindow();return false;" style="color:#888;text-decoration:none;">×</a></span>';
    }
    msg += '</div>';

    msg += '<div style="position:relative;padding:0 .3em .3em .3em;">';
    msg += '<table style="border-spacing:0;">';
    for (var i = 0; i < buf.length; i++) {
      msg += buf[i];
    }
    msg += '</table>';
    msg += '</div>';
    this.msgArea.innerHTML = msg;

    if (!(DebugJS.status & DebugJS.STATE_AUTO_REFRESH)) {
      if ((DebugJS.status & DebugJS.STATE_SHOW_CLOCK) || (DebugJS.status & DebugJS.STATE_STOP_WATCH_RUNNING)) {
        setTimeout('Debug._printMessage()', DebugJS.updateInterval);
        DebugJS.status |= DebugJS.STATE_AUTO_REFRESH;
      }
    } else {
      if (!(DebugJS.status & DebugJS.STATE_PRINT_LOG)) {
        setTimeout('Debug._printMessage()', DebugJS.updateInterval);
      }
    }
  },

  clearMessage: function() {
    this.msgBuff.clear();
    this.printMessage();
  },

  setStyle: function(prop, val) {
    var selector = '#' + this.id;
    var styles = {};
    var style = {};
    style[prop] = val;
    styles[selector] = style;
    this.applyStyles(styles);
  },

  applyStyles: function(styles) {
    var styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    styleEl.appendChild(document.createTextNode(''));
    var s = styleEl.sheet;
    for (var selector in styles) {
      var props = styles[selector];
      var propStr = '';
      for (var propName in props) {
        var propVal = props[propName];
        var propImportant = '';
        if (propVal[1] === true) {
          propVal = propVal[0];
          propImportant = ' !important'
        }
        propStr += propName + ':' + propVal + propImportant + ';\n';
      }
      s.insertRule(selector + '{' + propStr + '}', s.cssRules.length);
    }
  },

  setupMove: function() {
    var el = this.msgArea;
    var dragging;
    var clickOffsetTop;
    var clickOffsetLeft;

    el.onmousedown = function(evt) {
      dragging = true;
      evt = (evt) || window.event;
      clickOffsetTop = evt.clientY - el.offsetTop;
      clickOffsetLeft = evt.clientX - el.offsetLeft;
      if (!document.all) {
         window.getSelection().removeAllRanges();
      }
    }
    el.onmouseup = function() {
      dragging = false;
    }
    el.onmousemove = function(evt) {
      evt = (evt) || window.event;
      if (dragging){
        el.style.top = evt.clientY - clickOffsetTop + 'px';
        el.style.left = evt.clientX - clickOffsetLeft + 'px';
      }
    }
  },

  setupKeyHandler: function() {
    window.addEventListener('keydown', this.keyhandler, false);
  },

  keyhandler: function(e) {
    if (e.keyCode == 113) { // F2
      if (DebugJS.status & DebugJS.STATE_SHOW) {
        Debug.hideDebugWindow();
      } else {
        Debug.showDebugWindow();
      }
    } else if (e.keyCode == 27) { // ESC
      Debug.hideDebugWindow();
    }
  },

  hideDebugWindow: function() {
    var selector = '#' + Debug.id;
    var styles = {};
    styles[selector] = {'display': 'none'};
    Debug.applyStyles(styles);
    DebugJS.status &= ~DebugJS.STATE_SHOW;
  },

  showDebugWindow: function() {
    var selector = '#' + Debug.id;
    var styles = {};
    styles[selector] = {'display': 'block'};
    Debug.applyStyles(styles);
    DebugJS.status |= DebugJS.STATE_SHOW;
  }
};

var RingBuffer = function(bufferSize) {
  if (bufferSize == undefined) {
    bufferSize = 0;
  }
  this.buffer = new Array(bufferSize);
  this.count = 0;
};

RingBuffer.prototype = {
  add: function(data) {
    var lastIndex = (this.count % this.buffer.length);
    this.buffer[lastIndex] = data;
    this.count++;
    return;
  },

  get: function(index) {
    if (this.buffer.length < this.count) {
      index += this.count;
    }
    index %= this.buffer.length;
    return this.buffer[index];
  },

  getAll: function() {
    var allBuff = [];
    var bufCnt = this.count;
    var bufLen = this.buffer.length;
    var line = '';
    var lineNum = '';
    var lineNumPadding = '';
    var msg = '';
    var pos = 0;
    var cnt;

    var maxCnt = bufLen;
    if (bufCnt > this.buffer.length) {
      pos = (bufCnt % this.buffer.length);
      maxCnt = bufCnt;
    }

    for (var i = 0; i < bufLen; i++) {
      line = '<tr style="vertical-align:top;">';

      if (pos >= bufLen) {
        pos = 0;
      }

      if (bufCnt < bufLen) {
        cnt = i;
      } else {
        cnt = bufCnt - bufLen + i;
      }
      cnt++; //start at 1

      if (Debug.options.showLineNums) {
        var diffDigits = this.digits(maxCnt) - this.digits(cnt);
        lineNumPadding = '';
        for (var j = 0; j < diffDigits; j++) {
          lineNumPadding = lineNumPadding + '0';
        }
        lineNum = lineNumPadding + cnt + ':';
        line += '<td style="padding-right:3px; word-break:normal;">' + lineNum + '</td>';
      }

      if (this.buffer[pos] == undefined) {
        msg = '';
      } else {
        msg = this.buffer[pos];
      }

      line += '<td><pre>' + msg + '</pre></td>';
      line += '</tr>';

      allBuff[i] = line;
      pos++;
    }

    return allBuff;
  },

  clear: function() {
    this.buffer = new Array(this.buffer.length);
    this.count = 0;
    return;
  },

  digits: function(x) {
    var digit = 0;
    while (x != 0) {
      x = (x / 10) << 0;
      digit++;
    }
    return digit;
  }
};

var Debug = new DebugJS();

var log = function(msg) {
  if(!Debug.ENABLE){return;}
  var m = log.init(msg);
  var styleS = '';
  var styleE = '';
  log.out(m, styleS, styleE);
}

log.e = function(msg) {
  if(!Debug.ENABLE){return;}
  var m = log.init(msg);
  var styleS = '<span style="color:' + Debug.options.errorColor + ';">';
  var styleE = '</span>';
  log.out(m, styleS, styleE);
}

log.w = function(msg) {
  if(!Debug.ENABLE){return;}
  var m = log.init(msg);
  var styleS = '<span style="color:' + Debug.options.warnColor + ';">';
  var styleE = '</span>';
  log.out(m, styleS, styleE);
}

log.i = function(msg) {
  if(!Debug.ENABLE){return;}
  var m = log.init(msg);
  var styleS = '<span style="color:' + Debug.options.infoColor + ';">';
  var styleE = '</span>';
  log.out(m, styleS, styleE);
}

log.d = function(msg) {
  if(!Debug.ENABLE){return;}
  var m = log.init(msg);
  var styleS = '<span style="color:' + Debug.options.debugColor + ';">';
  var styleE = '</span>';
  log.out(m, styleS, styleE);
}

log.v = function(msg) {
  if(!Debug.ENABLE){return;}
  var m = log.init(msg);
  var styleS = '<span style="color:' + Debug.options.verboseColor + ';">';
  var styleE = '</span>';
  log.out(m, styleS, styleE);
}

log.s = function(msg) {
  if(!Debug.ENABLE){return;}
  var m = log.init(msg);
  var styleS = '<span style="color:' + Debug.options.specialColor + ';text-shadow:0 0 3px ' + Debug.options.specialColor + ';">';
  var styleE = '</span>';
  log.out(m, styleS, styleE);
}

log.init = function(msg) {
  if (!Debug.isInitialized()) {
    Debug.init(null, null);
  }
  return msg;
}

log.out = function(msg, styleStart, styleEnd) {
  if (msg != null) {
    var t = '';
    if (Debug.options.showTimeStamp) {
      t = DebugJS.time() + ' ';
    }
    var m = styleStart + t + msg + styleEnd;
    Debug.msgBuff.add(m);
  }
  Debug.printMessage();
}
