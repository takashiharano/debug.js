/*!
 * debug.js
 *
 * Copyright 2016 Takashi Harano
 * Released under the MIT license
 * https://github.com/takashiharano/debug.js
 *
 * Date: 2016-05-18T21:18+09:00
 */
function DebugJS() {
  this.ENABLE = true;
  this.DEFAULT_SHOW = true;

  this.DEFAULT_OPTIONS = {
    'buffSize': 20,
    'width': 500,
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
    'showWinSize': true,
    'showMousePosition': true,
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
  this.debugWindow = null;
  this.infoArea = null;
  this.clrBtnArea = null;
  this.clockArea = null;
  this.swBtnArea = null;
  this.swArea = null;
  this.mousePositionArea = null;
  this.windowSizeArea = null;
  this.closeBtnArea = null;
  this.blankArea = null;
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
DebugJS.STATE_DYNAMIC = 0x2;
DebugJS.STATE_SHOW_CLOCK = 0x4;
DebugJS.STATE_STOPWATCH_RUNNING = 0x8;
DebugJS.STATE_INITIALIZED = 0x80000000;
DebugJS.status = 0;

DebugJS.WDAYS = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');

DebugJS.time = function() {
  var dt = DebugJS.getTime();
  var tm = dt.hh + ':' + dt.mi + ':' + dt.ss + '.' + dt.ms;
  return tm;
}

DebugJS.swStartTime = 0;
DebugJS.swElapsedTime = 0;
DebugJS.elapsedTime = '00:00:00.000';

DebugJS.startStopStopWatch = function() {
  if (DebugJS.status & DebugJS.STATE_STOPWATCH_RUNNING) {
    // stop
    DebugJS.status &= ~DebugJS.STATE_STOPWATCH_RUNNING;
    Debug.updateSwBtnArea();
  } else {
    // start
    DebugJS.status |= DebugJS.STATE_STOPWATCH_RUNNING;
    DebugJS.swStartTime = (new Date()).getTime() - DebugJS.swElapsedTime;
    DebugJS.updateStopWatch();
    Debug.updateSwArea();
    Debug.updateSwBtnArea();
  }
}

DebugJS.updateStopWatch = function() {
  if (!(DebugJS.status & DebugJS.STATE_STOPWATCH_RUNNING)) return;
  var swCurrentTime = (new Date()).getTime();
  DebugJS.swElapsedTime = swCurrentTime - DebugJS.swStartTime;
  DebugJS.elapsedTime = DebugJS.getPassedTimeStr(DebugJS.swElapsedTime);
}

DebugJS.resetStopwatch = function() {
  DebugJS.swStartTime = (new Date()).getTime();

  DebugJS.elapsedTime = DebugJS.getPassedTimeStr(0);
  DebugJS.swElapsedTime = 0;

  Debug.updateSwArea();
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
  retStr += '.' + passedMsec;

  return retStr;
}

DebugJS.winSize = '';
DebugJS.getWindowSize = function() {
  var sW = document.documentElement.clientWidth;
  var sH = document.documentElement.clientHeight;
  DebugJS.winSize = "w=" + sW + "/h=" + sH;
}
DebugJS.resizeHandler = function() {
  DebugJS.getWindowSize();
  Debug.updateWindowSizeArea();
}

DebugJS.mousePos = 'x=-/y=-';
DebugJS.getMousePosition = function(e) {
  var posX = e.clientX;
  var posY = e.clientY;
  DebugJS.mousePos = "x=" + posX + "/y=" + posY;
}
DebugJS.mousemoveHandler = function(e) {
  DebugJS.getMousePosition(e);
  Debug.updateMousePositionArea();
}

DebugJS.prototype = {
  init:  function(elmId, options) {
    if(!this.ENABLE){return;}

    if (elmId == null) {
      this.id = this.DEFAULT_ELM_ID;
      DebugJS.status |= DebugJS.STATE_DYNAMIC;
    } else {
      this.id = elmId;
      this.debugWindow = document.getElementById(this.id);
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

    if (this.debugWindow == null) {
      var div = document.createElement('div');
      div.id = this.id;
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(div);
      this.debugWindow = div;
    }

    this.infoArea = document.createElement('div');
    this.debugWindow.appendChild(this.infoArea);
    this.initInfoArea();

    if (this.options.showClearButton) {
      this.clrBtnArea = document.createElement('span');
      this.infoArea.appendChild(this.clrBtnArea);
    }

    if (this.options.showClock) {
      this.clockArea = document.createElement('span');
      this.infoArea.appendChild(this.clockArea);
    }

    if (this.options.showMousePosition) {
      this.mousePositionArea = document.createElement('span');
      this.infoArea.appendChild(this.mousePositionArea);
    }

    if (this.options.showWinSize) {
      this.windowSizeArea = document.createElement('span');
      this.infoArea.appendChild(this.windowSizeArea);
    }

    if (this.options.enableStopWatch) {
      this.swBtnArea = document.createElement('span');
      this.infoArea.appendChild(this.swBtnArea);

      this.swArea = document.createElement('span');
      this.infoArea.appendChild(this.swArea);
    }

    if (this.options.showCloseButton) {
      this.closeBtnArea = document.createElement('span');
      this.infoArea.appendChild(this.closeBtnArea);
    }

    this.blankArea = document.createElement('div');
    this.debugWindow.appendChild(this.blankArea);
    this.initBlankArea();

    this.msgArea = document.createElement('div');
    this.debugWindow.appendChild(this.msgArea);

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

    if (DebugJS.status & DebugJS.STATE_DYNAMIC) {
      this.setupMove();

      var wkStyle = styles['#' + this.id];
      wkStyle.position = 'fixed';
      wkStyle.width = this.options.width + 'px';
      wkStyle.top = (document.documentElement.clientHeight - 280) + 'px';
      wkStyle.left = (document.documentElement.clientWidth - this.options.width - 20) + 'px';
      wkStyle.background = 'rgba(0,0,0,0.7)';
      wkStyle['box-shadow'] = '10px 10px 10px rgba(0,0,0,.3)';
      wkStyle['z-index'] = 0x7fffffff;
      if (!(DebugJS.status & DebugJS.STATE_SHOW)) {
        wkStyle.display = 'none';
      }
    }

    this.applyStyles(styles);

    this.clearMessage();

    if (this.options.showCloseButton) {
      this.setupKeyHandler();
    }

    if (this.options.showWinSize) {
      DebugJS.getWindowSize();
      window.addEventListener('resize', DebugJS.resizeHandler, true);
    }

    if (this.options.showMousePosition) {
      window.addEventListener('mousemove', DebugJS.mousemoveHandler, true);
    }
  },

  isInitialized: function() {
    if (this.debugWindow == null) {
      return false;
    } else {
      return true;
    }
  },

  isWindowInitialized: function() {
    if (DebugJS.status & DebugJS.STATE_INITIALIZED) {
      return true;
    } else {
      return false;
    }
  },

  initDebugWindow: function() {
    if (this.options.showClearButton) {
      this.initClrBtnArea();
    }

    if (this.options.showClock) {
      DebugJS.status |= DebugJS.STATE_SHOW_CLOCK;
      this.updateClockArea();
    }

    if (this.options.showMousePosition) {
      this.updateMousePositionArea();
    }

    if (this.options.showWinSize) {
      this.updateWindowSizeArea();
    }

    if (this.options.enableStopWatch) {
      this.updateSwBtnArea();
      this.updateSwArea();
    }

    if (this.options.showCloseButton) {
      this.initCloseBtnArea();
    }

    this.printMessage();

    DebugJS.status |= DebugJS.STATE_INITIALIZED;
  },

  // Init Info Area
 initInfoArea: function() {
    this.infoArea.innerHTML = '<div style="padding:1px 2px 0px 2px;background:rgba(0,68,118,0);"></div>';
  },

  // Update Clear Button
  initClrBtnArea: function() {
    this.clrBtnArea.innerHTML = '<span style="margin-right:2px;"><a href="" onclick="Debug.clearMessage();return false;">[CLR]</a></span>';
  },

  // Update Clock
  updateClockArea: function() {
    var dt = DebugJS.getTime();
    var tm = dt.yyyy + '-' + dt.mm + '-' + dt.dd + '(' + DebugJS.WDAYS[dt.wday] + ') ' + dt.hh + ':' + dt.mi + ':' + dt.ss;
    var msg = '<span style=";font-size:12px;margin-right:4px;color:' + Debug.options.timeColor + ';text-shadow:0 0 3px ' + Debug.options.timeColor + ';">' + tm + '</span>';
    this.clockArea.innerHTML = msg;

    if (DebugJS.status & DebugJS.STATE_SHOW_CLOCK) {
      setTimeout('Debug.updateClockArea()', 500);
    }
  },

  // Update Mouse Position
  updateMousePositionArea: function() {
    this.mousePositionArea.innerHTML = '<span style="margin-right:4px;color:' + Debug.options.systemInfoColor + ';">' + DebugJS.mousePos + '</span>';
  },

  // Update Window Size
  updateWindowSizeArea: function() {
    this.windowSizeArea.innerHTML = '<span style="margin-right:4px;color:' + Debug.options.systemInfoColor + ';">' + DebugJS.winSize + '</span>';
  },

  // Update Stop Watch Button
  updateSwBtnArea: function() {
    var msg = '<span><a href="" onclick="DebugJS.resetStopwatch();return false;">🔃</a>';
    msg += '<a href="" onclick="DebugJS.startStopStopWatch();return false;">';
    if (DebugJS.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      msg += '||';
    } else {
      msg += '>>';
    }
    msg += '</a></span>';
    this.swBtnArea.innerHTML = msg;
  },

  // Update Stop Watch
  updateSwArea: function() {
    DebugJS.updateStopWatch();
    var msg = DebugJS.elapsedTime;
    this.swArea.innerHTML = msg;

    if (DebugJS.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      setTimeout('Debug.updateSwArea()', 50);
    }
  },

  // Close Button
  initCloseBtnArea: function() {
    this.closeBtnArea.innerHTML = '<span style="float:right;margin-right:2px;font-size:22px;"><a href="" onclick="Debug.hideDebugWindow();return false;" style="color:#888;">×</a></span>'
  },

  // Blank Area
 initBlankArea: function() {
    this.blankArea.innerHTML = '<div style="height:4px;"></div>';
  },

  printMessage: function() {
    var buf = this.msgBuff.getAll();
    var msg = '';

    // Log Area
    msg += '<div style="position:relative;padding:0 .3em .3em .3em;">';
    msg += '<table style="border-spacing:0;">';
    for (var i = 0; i < buf.length; i++) {
      msg += buf[i];
    }
    msg += '</table>';
    msg += '</div>';

    this.msgArea.innerHTML = msg;
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
    var el = this.debugWindow;
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
    window.addEventListener('keydown', this.keyhandler, true);
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

  if (!Debug.isWindowInitialized()) {
    Debug.initDebugWindow();
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
