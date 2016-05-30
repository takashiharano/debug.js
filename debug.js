/*!
 * debug.js
 * Copyright 2016 Takashi Harano
 * Released under the MIT license
 * https://github.com/takashiharano/debug.js
 */
function DebugJS() {
  this.v = '201605310017';
  this.ENABLE = true;

  this.DEFAULT_SHOW = true;

  this.DEFAULT_OPTIONS = {
    'buffSize': 18,
    'width': 500,
    'position': 'right-bottom', // left-top, left-bottom, center, right-top, right-bottom
    'posAdjX': 20,
    'posAdjY': 20,
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

  this.STYLE = {
    'position': 'relative',
    'padding': '1px',
    'line-height': '1em',
    'border': 'solid 1px #888',
    'font-family': 'Consolas',
    'font-size': '12px',
    'color': '#fff',
    'background': '#111',
    'display': 'block',
    'box-sizing': 'content-box'
  };

  this.id = null;
  this.msgAreaId = null;
  this.cmdLineId = null;
  this.debugWindow = null;
  this.infoArea = null;
  this.clockArea = null;
  this.swBtnArea = null;
  this.swArea = null;
  this.clrBtnArea = null;
  this.pinBtnArea = null;
  this.closeBtnArea = null;
  this.mousePositionArea = null;
  this.mouseClickArea = null;
  this.screenSizeArea = null;
  this.clientSizeArea = null;
  this.bodySizeArea = null;
  this.scrollPosArea = null;
  this.keyDownArea = null;
  this.keyPressArea = null;
  this.keyUpArea = null;
  this.msgArea = null;
  this.cmdArea = null;
  this.cmdLine = null;
  this.options = null;
  this.DEFAULT_ELM_ID = '_debug_';
  this.cmdHistory = null;
  this.cmdHistoryMax = 10;
  this.cmdHistoryIdx = this.cmdHistoryMax;
  this.cmdTmp = '';
}

DebugJS.COLOR_ACTIVE = '#fff';
DebugJS.COLOR_INACTIVE = '#888';

DebugJS.STATE_SHOW = 0x1;
DebugJS.STATE_DYNAMIC = 0x2;
DebugJS.STATE_SHOW_CLOCK = 0x4;
DebugJS.STATE_STOPWATCH_RUNNING = 0x8;
DebugJS.STATE_DRAGGABLE = 0x10;
DebugJS.STATE_DRAGGING = 0x20;
DebugJS.STATE_INITIALIZED = 0x80000000;
DebugJS.status = 0;

DebugJS.WDAYS = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');

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
  var passedTimeSec = Math.floor((swPassedTimeMsec) / 1000);
  var wkPassedTimeSec = passedTimeSec;

  var passedHour;
  var passedMin;
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

  var passedSec = wkPassedTimeSec;
  var passedMsec = Math.floor(swPassedTimeMsec & 999);

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

DebugJS.resizeHandler = function() {
  Debug.updateWindowSizeArea();
  Debug.updateClientSizeArea();
  Debug.updateBodySizeArea();
}

DebugJS.scrollPos = '';
DebugJS.scrollHandler = function() {
  var x = 0;
  var y = 0;
  if (window.scrollX === undefined) {
    x = document.documentElement.scrollLeft;
    y = document.documentElement.scrollTop;
  } else {
    x = window.scrollX;
    y = window.scrollY;
  }
  DebugJS.scrollPos = 'x=' + x + ',y=' + y;
  Debug.updateScrollPosArea();
}

DebugJS.mousePos = 'x=-,y=-';
DebugJS.mousemoveHandler = function(e) {
  var posX = e.clientX;
  var posY = e.clientY;
  DebugJS.mousePos = 'x=' + posX + ',y=' + posY;
  Debug.updateMousePositionArea();
}

DebugJS.mouseClickL = DebugJS.COLOR_INACTIVE;
DebugJS.mouseClickC = DebugJS.COLOR_INACTIVE;
DebugJS.mouseClickR = DebugJS.COLOR_INACTIVE;
DebugJS.mouseClick;
DebugJS.mousedownHandler = function(e) {
  switch (e.button) {
    case 0:
      DebugJS.mouseClickL = DebugJS.COLOR_ACTIVE;
      break;
    case 1:
      DebugJS.mouseClickC = DebugJS.COLOR_ACTIVE;
      break;
    case 2:
      DebugJS.mouseClickR = DebugJS.COLOR_ACTIVE;
      break;
    default:
      break;
  }
  Debug.updateMouseClickArea();
}

DebugJS.mouseupHandler = function(e) {
  switch (e.button) {
    case 0:
      DebugJS.mouseClickL = DebugJS.COLOR_INACTIVE;
      break;
    case 1:
      DebugJS.mouseClickC = DebugJS.COLOR_INACTIVE;
      break;
    case 2:
      DebugJS.mouseClickR = DebugJS.COLOR_INACTIVE;
      break;
    default:
      break;
  }
  Debug.updateMouseClickArea();
}

DebugJS.keyStatusDefault =  '- <span style="color:' + DebugJS.COLOR_INACTIVE + ';">SCA</span>';
DebugJS.keyDownCode = DebugJS.keyStatusDefault;
DebugJS.keyDownHandler = function(e) {
  var metaKey = DebugJS.checkMetaKey(e);
  DebugJS.keyDownCode = e.keyCode + metaKey;
  Debug.updateKeyDownArea();

  DebugJS.keyPressCode = DebugJS.keyStatusDefault;
  Debug.updateKeyPressArea();

  DebugJS.keyUpCode = DebugJS.keyStatusDefault;
  Debug.updateKeyUpArea();
}

DebugJS.keyPressCode = DebugJS.keyStatusDefault;
DebugJS.keyPressHandler = function(e) {
  var metaKey = DebugJS.checkMetaKey(e);
  DebugJS.keyPressCode = e.keyCode + metaKey;
  Debug.updateKeyPressArea();
}

DebugJS.keyUpCode = DebugJS.keyStatusDefault;
DebugJS.keyUpHandler = function(e) {
  var metaKey = DebugJS.checkMetaKey(e);
  DebugJS.keyUpCode = e.keyCode + metaKey;
  Debug.updateKeyUpArea();
}

DebugJS.checkMetaKey = function(e) {
  var shift = e.shiftKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var ctrl = e.ctrlKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var alt = e.altKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var metaKey = ' <span style="color:' + shift + ';">S</span><span style="color:' + ctrl + ';">C</span><span style="color:' + alt + ';">A</span>';
  return metaKey;
}

DebugJS.execCmdP = function(cmd) {
  var v = cmd.replace('p ', '');
  var command = 'DebugJS.buf="<br>' + v + ' = ";DebugJS.buf+=DebugJS.objDump(' + v + ');log(DebugJS.buf);';
  eval(command);
}

DebugJS.OBJDUMP_MAX = 100;
DebugJS.objDump = function(obj) {
  var arg = {
    'lv': 0,
    'cnt': 0,
    'dump': ''
  };
  var ret = DebugJS._objDump(obj, arg);
  if (ret.cnt >= DebugJS.OBJDUMP_MAX) {
    log.w('The object is too large. (' + ret.cnt + ')');
  }
  return ret.dump;
}

DebugJS._objDump = function(obj, arg) {
  if (arg.cnt >= DebugJS.OBJDUMP_MAX) {
    arg.dump += '<span style="color:#aaa;">...</span><br>'; arg.cnt++;
    return arg;
  }
  var indent = '';
  for (var i=0; i<arg.lv; i++) {
    indent += ' ';
  }

  if (obj instanceof Array) {
    arg.dump += '<span style="color:#c08;">[Array]</span><br>'; arg.cnt++;
    for (var i in obj) {
      arg.lv++;
      arg.dump += indent + '[' + i + '] ';
      arg = DebugJS._objDump(obj[i], arg);
      arg.lv--;
    }
  } else if (obj instanceof Object) {
    arg.dump += '<span style="color:#88f;">[Object]</span> {<br>'; arg.cnt++;
    indent += ' ';
    for (var key in obj) {
      arg.dump += indent + key + ': ';
      arg.lv++;
      arg = DebugJS._objDump(obj[key], arg);
      arg.lv--;
    }
    indent = indent.replace(' ', '');
    arg.dump += indent + '}<br>';
  } else if (obj === null) {
    arg.dump += '<span style="color:#ccc;">null</span>' + '<br>'; arg.cnt++;
  } else if (obj === undefined) {
    arg.dump += '<span style="color:#ccc;">undefined</span>' + '<br>'; arg.cnt++;
  } else if (typeof obj ==='string') {
    arg.dump += '"' + obj + '"<br>'; arg.cnt++;
  } else {
    arg.dump += obj + '<br>'; arg.cnt++;
  }
  return arg;
}

DebugJS.prototype = {
  init:  function(elmId, options) {
    if(!Debug.ENABLE){return;}
    if (elmId == null) {
      this.id = this.DEFAULT_ELM_ID;
      DebugJS.status |= DebugJS.STATE_DYNAMIC;
      DebugJS.status |= DebugJS.STATE_DRAGGABLE;
    } else {
      this.id = elmId;
      this.debugWindow = document.getElementById(this.id);
    }
    this.msgAreaId = this.id + '-msg';
    this.cmdLineId = this.id + '-cmd';

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

    // Create a window
    if (this.debugWindow == null) {
      var div = document.createElement('div');
      div.id = this.id;
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(div);
      this.debugWindow = div;
    }

    // Info Area
    this.infoArea = document.createElement('div');
    this.debugWindow.appendChild(this.infoArea);
    this.initInfoArea();

    // Clock
    if (this.options.showClock) {
      this.clockArea = document.createElement('span');
      this.infoArea.appendChild(this.clockArea);
    }

    // -- R to L
    // X Button
    if (this.options.showCloseButton) {
      this.closeBtnArea = document.createElement('span');
      this.infoArea.appendChild(this.closeBtnArea);
    }

    // Pin Button
    if (DebugJS.status & DebugJS.STATE_DYNAMIC) {
      this.pinBtnArea = document.createElement('span');
      this.infoArea.appendChild(this.pinBtnArea);
    }

    // CLR Button
    if (this.options.showClearButton) {
      this.clrBtnArea = document.createElement('span');
      this.infoArea.appendChild(this.clrBtnArea);
    }

    // Stopwatch
    if (this.options.enableStopWatch) {
      this.swArea = document.createElement('span');
      this.infoArea.appendChild(this.swArea);

      this.swBtnArea = document.createElement('span');
      this.infoArea.appendChild(this.swBtnArea);
    }
    // -- R to L

    if ((this.options.showClock) || (this.options.showCloseButton) || (this.options.showClearButton) || (this.options.enableStopWatch)) {
      this.infoArea.appendChild(document.createElement('br'));
    }

    // Window Size
    if (this.options.showWindowSize) {
      this.screenSizeArea = document.createElement('span');
      this.infoArea.appendChild(this.screenSizeArea);

      this.windowSizeArea = document.createElement('span');
      this.infoArea.appendChild(this.windowSizeArea);

      this.clientSizeArea = document.createElement('span');
      this.infoArea.appendChild(this.clientSizeArea);

      this.bodySizeArea = document.createElement('span');
      this.infoArea.appendChild(this.bodySizeArea);

      this.scrollPosArea = document.createElement('span');
      this.infoArea.appendChild(this.scrollPosArea);
    }

    // Mouse Status
    if (this.options.showMouseStatus) {
      this.mousePositionArea = document.createElement('span');
      this.infoArea.appendChild(this.mousePositionArea);

      this.mouseClickArea = document.createElement('span');
      this.infoArea.appendChild(this.mouseClickArea);
    }

    if ((this.options.showWindowSize) || (this.options.showMouseStatus)) {
      this.infoArea.appendChild(document.createElement('br'));
    }

    // Key Status
    if (this.options.showKeyStatus) {
      this.keyDownArea = document.createElement('span');
      this.infoArea.appendChild(this.keyDownArea);

      this.keyPressArea = document.createElement('span');
      this.infoArea.appendChild(this.keyPressArea);

      this.keyUpArea = document.createElement('span');
      this.infoArea.appendChild(this.keyUpArea);
    }

    // Log
    this.msgArea = document.createElement('div');
    this.debugWindow.appendChild(this.msgArea);

    // Command Line
    if (this.options.enableCommandLine) {
      this.cmdArea = document.createElement('div');
      this.debugWindow.appendChild(this.cmdArea);
      this.initCmdArea();
    }

    this.msgBuff = new DebugJS.RingBuffer(this.options.buffSize);

    var styles = {};
    styles['#' + this.id] = this.STYLE;

    styles['#' + this.id + ' td'] = {
      'font-size': this.STYLE['font-size'],
      'font-family': this.STYLE['font-family'],
      'color': this.STYLE['color'],
      'background': 'initial',
      'width': 'initial',
      'border': 'initial',
      'padding': '0 3px'
    };

    styles['#' + this.id + ' pre'] = {
      'white-space': 'pre-wrap',
      'word-break': 'break-all', 
      'font-size': this.STYLE['font-size'],
      'font-family': this.STYLE['font-family'],
      'color': this.STYLE['color'],
      'margin': '0',
      'overflow': 'visible'
    };

    styles['#' + this.id + ' .btn'] = {
      'color': '#0cf',
      'text-decoration': 'none'
    };

    styles['#' + this.id + ' .btn:hover'] = {
      'color': '#fff',
      'text-decoration': 'none',
      'text-shadow': '0 0 3px',
      'cursor': 'pointer'
    };

    styles['.' + this.id + '-sys-info'] = {
      'margin-left': '1px',
      'color': Debug.options.systemInfoColor,
      'display': 'inline-block'
    };

    if (DebugJS.status & DebugJS.STATE_DYNAMIC) {
      this.setupMove();

      var wkStyle = styles['#' + this.id];
      wkStyle.position = 'fixed';
      wkStyle.width = this.options.width + 'px';
      wkStyle.background = 'rgba(0,0,0,0.7)';
      wkStyle['box-shadow'] = '10px 10px 10px rgba(0,0,0,.3)';
      wkStyle['z-index'] = 0x7fffffff;

      // adjust the window position
      var dbgWinHeight = 273;
      if (this.options.enableCommandLine) {
        dbgWinHeight = 294;
      }
      switch (this.options.position) {
        case 'right-bottom':
          wkStyle.top = (document.documentElement.clientHeight - dbgWinHeight - this.options.posAdjY) + 'px';
          wkStyle.left = (document.documentElement.clientWidth - this.options.width - this.options.posAdjX) + 'px';
          break;
        case 'right-top':
          wkStyle.top = this.options.posAdjY + 'px';
          wkStyle.left = (document.documentElement.clientWidth - this.options.width - this.options.posAdjX) + 'px';
          break;
        case 'center':
          wkStyle.top = ((document.documentElement.clientHeight / 2) - (dbgWinHeight / 2)) + this.options.posAdjY + 'px';
          wkStyle.left = ((document.documentElement.clientWidth / 2) - (this.options.width / 2)) + this.options.posAdjX + 'px';
          break;
        case 'left-bottom':
          wkStyle.top = (document.documentElement.clientHeight - dbgWinHeight - this.options.posAdjY) + 'px';
          wkStyle.left = this.options.posAdjX + 'px';
          break;
        default:
          wkStyle.top = this.options.posAdjY + 'px';
          wkStyle.left = this.options.posAdjX + 'px';
          break;
      }

      if (!(DebugJS.status & DebugJS.STATE_SHOW)) {
        wkStyle.display = 'none';
      }
    }

    this.applyStyles(styles);
    this.clearMessage();
    this.setupKeyHandler();

    if (this.options.showWindowSize) {
      window.addEventListener('resize', DebugJS.resizeHandler, true);
      DebugJS.resizeHandler();

      window.addEventListener('scroll', DebugJS.scrollHandler, true);
      DebugJS.scrollHandler();
    }

    if (this.options.showMouseStatus) {
      window.addEventListener('mousemove', DebugJS.mousemoveHandler, true);
      window.addEventListener('mousedown', DebugJS.mousedownHandler, true);
      window.addEventListener('mouseup', DebugJS.mouseupHandler, true);
    }

    if (this.options.showKeyStatus) {
      window.addEventListener('keydown', DebugJS.keyDownHandler, true);
      Debug.updateKeyDownArea();

      window.addEventListener('keypress', DebugJS.keyPressHandler, true);
      Debug.updateKeyPressArea();

      window.addEventListener('keyup', DebugJS.keyUpHandler, true);
      Debug.updateKeyUpArea();
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
    if (this.options.showClock) {
      DebugJS.status |= DebugJS.STATE_SHOW_CLOCK;
      this.updateClockArea();
    }

    if (this.options.enableStopWatch) {
      this.updateSwBtnArea();
      this.updateSwArea();
    }

    if (this.options.showClearButton) {
      this.initClrBtnArea();
    }

    if (DebugJS.status & DebugJS.STATE_DYNAMIC) {
      this.updatePinBtnArea();
    }

    if (this.options.showCloseButton) {
      this.initCloseBtnArea();
    }

    if (this.options.showMouseStatus) {
      this.updateMousePositionArea();
      this.updateMouseClickArea();
    }

    if (this.options.showWindowSize) {
      this.initScreenSizeArea();
      this.updateWindowSizeArea();
      this.updateClientSizeArea();
      this.updateBodySizeArea();
      this.updateScrollPosArea();
    }

    this.printMessage();

    DebugJS.status |= DebugJS.STATE_INITIALIZED;
  },

  // Init Info Area
 initInfoArea: function() {
    this.infoArea.innerHTML = '<div style="padding:1px 2px 0px 2px;background:rgba(0,68,118,0);"></div>';
  },

  // Update Clock
  updateClockArea: function() {
    var dt = DebugJS.getTime();
    var tm = dt.yyyy + '-' + dt.mm + '-' + dt.dd + '(' + DebugJS.WDAYS[dt.wday] + ') ' + dt.hh + ':' + dt.mi + ':' + dt.ss;
    var msg = '<span style=";font-size:12px;color:' + Debug.options.timeColor + ';margin-right:10px;">' + tm + '</span>';
    this.clockArea.innerHTML = msg;

    if (DebugJS.status & DebugJS.STATE_SHOW_CLOCK) {
      setTimeout('Debug.updateClockArea()', 500);
    }
  },

  // Init Screen Size
  initScreenSizeArea: function() {
    this.screenSizeArea.innerHTML = '<span class="' + this.id + '-sys-info" style="margin-right:10px;">SCR:' + 'w=' + screen.width + ',h=' + screen.height + '</span>';
  },

  // Update Window Size
  updateWindowSizeArea: function() {
    this.windowSizeArea.innerHTML = '<span class="' + this.id + '-sys-info" style="margin-right:10px;">WIN:w=' + window.outerWidth + ',h=' + window.outerHeight + '</span>';
  },

  // Update Client Size
  updateClientSizeArea: function() {
    this.clientSizeArea.innerHTML = '<span class="' + this.id + '-sys-info" style="margin-right:10px;">CLI:w=' + document.documentElement.clientWidth + ',h=' + document.documentElement.clientHeight + '</span>';
  },

  // Update Body Size
  updateBodySizeArea: function() {
    this.bodySizeArea.innerHTML = '<span class="' + this.id + '-sys-info" style="margin-right:10px;">BODY:w=' + document.body.clientWidth + ',h=' + document.body.clientHeight + '</span>';
  },

  // Update Scroll Position
  updateScrollPosArea: function() {
    this.scrollPosArea.innerHTML = '<span class="' + this.id + '-sys-info" style="margin-right:10px;">SCROLL:' + DebugJS.scrollPos + '</span>';
  },

  // Update Mouse Position
  updateMousePositionArea: function() {
    this.mousePositionArea.innerHTML = '<span class="' + this.id + '-sys-info" style="margin-right:10px;">POS:' + DebugJS.mousePos + '</span>';
  },

  // Update Mouse Click
  updateMouseClickArea: function() {
    DebugJS.mouseClick = '<span style="color:' + DebugJS.mouseClickL + ';">L</span><span style="color:' + DebugJS.mouseClickC + ';">C</span><span style="color:' + DebugJS.mouseClickR + ';">R</span>';
    this.mouseClickArea.innerHTML = '<span class="' + this.id + '-sys-info" style="margin-right:10px;">CLICK:' + DebugJS.mouseClick + '</span>';
  },

  // Update key Down
  updateKeyDownArea: function() {
    this.keyDownArea.innerHTML = '<span class="' + this.id + '-sys-info">Key Down:' + DebugJS.keyDownCode + '&nbsp;</span>';
  },

  // Update key Press
  updateKeyPressArea: function() {
    this.keyPressArea.innerHTML = '<span class="' + this.id + '-sys-info">Press:' + DebugJS.keyPressCode + '&nbsp;</span>';
  },

  // Update key Up
  updateKeyUpArea: function() {
    this.keyUpArea.innerHTML = '<span class="' + this.id + '-sys-info" style="margin-right:10px;">Up:' + DebugJS.keyUpCode + '&nbsp;</span>';
  },

  // Update Stop Watch Button
  updateSwBtnArea: function() {
    var msg = '<span style="float:right;margin-right:4px;"><span class="btn" onclick="DebugJS.resetStopwatch();">🔃</span>';
    msg += '<span class="btn" onclick="DebugJS.startStopStopWatch();">';
    if (DebugJS.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      msg += '||';
    } else {
      msg += '>>';
    }
    msg += '</span></span>';
    this.swBtnArea.innerHTML = msg;
  },

  // Update Stop Watch
  updateSwArea: function() {
    DebugJS.updateStopWatch();
    var msg = '<span style="float:right;margin-right:10px;">' + DebugJS.elapsedTime + '</span>';
    this.swArea.innerHTML = msg;

    if (DebugJS.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      setTimeout('Debug.updateSwArea()', 50);
    }
  },

  // Update Clear Button
  initClrBtnArea: function() {
    this.clrBtnArea.innerHTML = '<span class="btn" style="float:right;margin-right:4px;" onclick="Debug.clearMessage();">[CLR]</span>';
  },

  // Update Pin Button
  updatePinBtnArea: function() {
    var c = '#dd0';
    if (DebugJS.status & DebugJS.STATE_DRAGGABLE) {
       c = '#888';
    }
    this.pinBtnArea.innerHTML = '<span class="btn" style="float:right;margin-right:4px;color:' + c + '" onclick="Debug.toggleDraggable();">📌</span>';
  },

  // Close Button
  initCloseBtnArea: function() {
    this.closeBtnArea.innerHTML = '<span class="btn" style="float:right;margin-right:2px;font-size:22px;color:#888;" onclick="Debug.hideDebugWindow();" onmouseover="this.style.color=\'#d88\'" onmouseout="this.style.color=\'#888\'">×</span>'
  },

  // Command-line Area
 initCmdArea: function() {
    this.cmdArea.innerHTML = '<div style="padding:0 3px 3px 3px;"><span style="color:#0cf;margin-right:2px;">$</span><input style="width:97% !important;font-family:Consolas !important;font-size:12px !important;color:#fff !important;background:transparent !important;border:0;border-bottom:solid 1px #888;border-radius:0 !important;outline:none;" id="' + Debug.cmdLineId + '"></input></div>';
    this.cmdLine = document.getElementById(Debug.cmdLineId);
    this.cmdHistory = new DebugJS.RingBuffer(10);
  },

  // Log Output
  printMessage: function() {
    var buf = this.msgBuff.getLog();
    var msg = '';

    // Log Area
    msg += '<div style="position:relative;padding:4px 0;height:' + this.options.buffSize + 'em;overflow:auto;" id="' + this.msgAreaId + '">';
    msg += '<table style="border-spacing:0;">';
    for (var i = 0; i < buf.length; i++) {
      msg += buf[i];
    }
    msg += '</table>';
    msg += '</div>';

    this.msgArea.innerHTML = msg;
    this.msgArea.children[this.msgAreaId].scrollTop = this.msgArea.children[this.msgAreaId].scrollHeight;
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
    var clickOffsetTop;
    var clickOffsetLeft;

    el.onmousedown = function(e) {
      if ((!(DebugJS.status & DebugJS.STATE_DRAGGABLE)) || (document.activeElement == Debug.cmdLine)) return;
      DebugJS.status |= DebugJS.STATE_DRAGGING;
      e = (e) || window.event;
      clickOffsetTop = e.clientY - el.offsetTop;
      clickOffsetLeft = e.clientX - el.offsetLeft;
      if (!document.all) {
         window.getSelection().removeAllRanges();
      }
    }
    el.onmouseup = function(e) {
      DebugJS.status &= ~DebugJS.STATE_DRAGGING;
    }
    el.onmousemove = function(e) {
      if (!(DebugJS.status & DebugJS.STATE_DRAGGING)) return;
      e = (e) || window.event;
      el.style.top = e.clientY - clickOffsetTop + 'px';
      el.style.left = e.clientX - clickOffsetLeft + 'px';
    }
  },

  toggleDraggable: function() {
    if (DebugJS.status & DebugJS.STATE_DRAGGABLE) {
      DebugJS.status &= ~DebugJS.STATE_DRAGGABLE;
    } else {
      DebugJS.status |= DebugJS.STATE_DRAGGABLE;
    }
    Debug.updatePinBtnArea();
  },

  setupKeyHandler: function() {
    window.addEventListener('keydown', this.keyhandler, true);
  },

  keyhandler: function(e) {
    switch (e.keyCode) {
      case 13: // Enter
        Debug.execCmd();
        break;

      case 27: // ESC
        Debug.hideDebugWindow();
        break;

      case 38: // ↑
        if (document.activeElement == Debug.cmdLine) {
          var cmds = Debug.cmdHistory.getAll();
          if (cmds.length == 0) return;
          if (cmds.length < Debug.cmdHistoryIdx) {
            Debug.cmdHistoryIdx = cmds.length;
          }
          if (Debug.cmdHistoryIdx == cmds.length) {
            Debug.cmdTmp = Debug.cmdLine.value;
          }
          if (Debug.cmdHistoryIdx > 0) {
            Debug.cmdHistoryIdx--;
          }
          Debug.cmdLine.value = cmds[Debug.cmdHistoryIdx];
        }
        break;

      case 40: // ↓
        if (document.activeElement == Debug.cmdLine) {
          var cmds = Debug.cmdHistory.getAll();
          if (cmds.length == 0) return;
          if (Debug.cmdHistoryIdx < cmds.length) {
            Debug.cmdHistoryIdx++;
          }
          if (Debug.cmdHistoryIdx == cmds.length) {
            Debug.cmdLine.value =  Debug.cmdTmp;
          } else {
            Debug.cmdLine.value = cmds[Debug.cmdHistoryIdx];
          }
        }
        break;

      case 112: // F1
        if (DebugJS.status & DebugJS.STATE_DYNAMIC) {
          Debug.debugWindow.style.top = 0;
          Debug.debugWindow.style.left = 0;
          DebugJS.status &= ~DebugJS.STATE_DRAGGING;
        }
        break;

      case 113: // F2
        if (DebugJS.status & DebugJS.STATE_SHOW) {
          Debug.hideDebugWindow();
        } else {
          Debug.showDebugWindow();
        }
        break;

      default:
        break;
    }
  },

  hideDebugWindow: function() {
    if (!this.options.showCloseButton) return;
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
  },

  execCmd: function() {
    if (document.activeElement != Debug.cmdLine) {
      return;
    }

    var cmd = Debug.cmdLine.value;
    if (cmd != '') {
      Debug.cmdHistory.add(cmd);
    }
    Debug.cmdHistoryIdx = (Debug.cmdHistory.count() < Debug.cmdHistoryMax) ? Debug.cmdHistory.count() : Debug.cmdHistoryMax;
    Debug.cmdLine.value = '';
    log.s(cmd);

    if (cmd.indexOf("p ") == 0) {
      DebugJS.execCmdP(cmd);
      return;
    }

    if (cmd.indexOf("rgb ") == 0) {
      DebugJS.convRGB(cmd);
      return;
    }

    switch (cmd) {
      case 'p':
        log('Usage: p &lt;object&gt;');
        break;
      case 'rgb':
        log('Usage: rgb &lt;color value(#RGB or R G B)&gt;');
        break;
      case 'v':
        log('ver.' + Debug.v);
        break;
      case 'cls':
        Debug.clearMessage();
        break;
      case 'exit':
      case 'quit':
      case '\\q':
        Debug.clearMessage();
        Debug.hideDebugWindow();
        break;
      case 'help':
        DebugJS.printHelp();
        break;
      default:
        try {
          log(eval(cmd));
        } catch (e) {
          log.e(e);
        }
        break;
    }
  }
};

DebugJS.RingBuffer = function(len) {
  if (len == undefined) {
    len = 0;
  }
  this.buffer = new Array(len);
  this.cnt = 0;
};

DebugJS.RingBuffer.prototype = {
  add: function(data) {
    var newIdx = (this.cnt % this.buffer.length);
    this.buffer[newIdx] = data;
    this.cnt++;
    return;
  },

  set: function(index, data) {
    this.buffer[index] = data;
    return;
  },

  get: function(index) {
    if (this.buffer.length < this.cnt) {
      index += this.cnt;
    }
    index %= this.buffer.length;
    return this.buffer[index];
  },

  getAll: function() {
    var allBuff = [];
    var bufLen = this.buffer.length;
    var pos = 0;

    if (this.cnt > bufLen) {
      pos = (this.cnt % bufLen);
    }

    for (var i = 0; i < bufLen; i++) {
      if (pos >= bufLen) {
        pos = 0;
      }
      if (this.buffer[pos] == undefined) {
        break;
      } else {
        allBuff[i] = this.buffer[pos];
        pos++;
      }
    }

    return allBuff;
  },

  getLog: function() {
    var allBuff = [];
    var bufCnt = this.cnt;
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

      if (this.buffer[pos] == undefined) {
        break;
      } else {
        msg = this.buffer[pos];
      }

      if (Debug.options.showLineNums) {
        var diffDigits = this.digits(maxCnt) - this.digits(cnt);
        lineNumPadding = '';
        for (var j = 0; j < diffDigits; j++) {
          lineNumPadding = lineNumPadding + '0';
        }
        lineNum = lineNumPadding + cnt + ':';
        line += '<td style="padding-right:3px; word-break:normal;">' + lineNum + '</td>';
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
    this.cnt = 0;
    return;
  },

  count: function() {
    return this.cnt;
  },

  lastIndex: function() {
    var lastIdx = (this.cnt - 1) % this.buffer.length;
    return lastIdx;
  },

  digits: function(x) {
    var digit = 0;
    while (x != 0) {
      x = (x / 10) << 0; digit++;
    }
    return digit;
  }
};

DebugJS.printHelp = function() {
  var h = '<br>';
  h += 'p     Print object.<br>';
  h += 'rgb   Convert RGB color values between HEX and DEC.<br>';
  h += 'cls   Clear log message.<br>';
  h += 'v     Displays version info.<br>';
  h += 'exit  Close the debug window.<br>';
  log(h);
}

DebugJS.COLOR_R = '#f66';
DebugJS.COLOR_G = '#6f6';
DebugJS.COLOR_B = '#6bf';
DebugJS.convRGB = function(cmd) {
  var v = cmd.replace('rgb ', '');
  var rgb;
  v = v.replace(/^\s+/g, '');
  if (v.indexOf("#") == 0) {
    rgb = DebugJS.convRGB16to10(v);
  } else {
    rgb = DebugJS.convRGB10to16(v);
  }
  log(rgb);
}

DebugJS.convRGB16to10 = function(rgb16) {
  var r16, g16, b16, r10, g10, b10;
  if (rgb16.length == 7) {
    r16 = rgb16.substr(1, 2);
    g16 = rgb16.substr(3, 2);
    b16 = rgb16.substr(5, 2);
  } else if (rgb16.length == 4) {
    r16 = rgb16.substr(1, 1);
    g16 = rgb16.substr(2, 1);
    b16 = rgb16.substr(3, 1);
    r16 += r16;
    g16 += g16;
    b16 += b16;
  } else {
    return '<span style="color:' + Debug.options.errorColor + '">invalid value.</span>';
  }
  r10 = parseInt(r16, 16);
  g10 = parseInt(g16, 16);
  b10 = parseInt(b16, 16);
  var rgb10 = 'RGB = <span style="color:' + DebugJS.COLOR_R + '">' + r10 + '</span> <span style="color:' + DebugJS.COLOR_G + '">' + g10 + '</span> <span style="color:' + DebugJS.COLOR_B + '">' + b10 + '</span>';
  return rgb10;
}

DebugJS.convRGB10to16 = function(rgb10) {
  rgb10 = rgb10.replace(/\s{2,}/g, ' ');
  var rgb10s = rgb10.split(' ', 3);
  if ((rgb10s.length != 3) || ((rgb10s[0] < 0) || (rgb10s[0] > 255)) || ((rgb10s[1] < 0) || (rgb10s[1] > 255)) || ((rgb10s[2] < 0) || (rgb10s[2] > 255))) {
    return '<span style="color:' + Debug.options.errorColor + '">invalid value.</span>';
  }
  var r16 = ('0' + parseInt(rgb10s[0]).toString(16)).slice(-2);
  var g16 = ('0' + parseInt(rgb10s[1]).toString(16)).slice(-2);
  var b16 = ('0' + parseInt(rgb10s[2]).toString(16)).slice(-2);
  if ((r16.charAt(0) == r16.charAt(1)) && (g16.charAt(0) == g16.charAt(1)) && (b16.charAt(0) == b16.charAt(1))) {
    r16 = r16.substring(0, 1);
    g16 = g16.substring(0, 1);
    b16 = b16.substring(0, 1);
  }
  var rgb16 = 'RGB = #<span style="color:' + DebugJS.COLOR_R + '">' + r16 + '</span><span style="color:' + DebugJS.COLOR_G + '">' + g16 + '</span><span style="color:' + DebugJS.COLOR_B + '">' + b16 + '</span>';
  return rgb16;
}

var Debug = new DebugJS();

var log = function(msg) {
  var m = log.init(msg);
  log.out(m, '', '');
}

log.e = function(msg) {
  var m = log.init(msg);
  var styleS = '<span style="color:' + Debug.options.errorColor + ';">';
  var styleE = '</span>';
  log.out(m, styleS, styleE);
}

log.w = function(msg) {
  var m = log.init(msg);
  var styleS = '<span style="color:' + Debug.options.warnColor + ';">';
  var styleE = '</span>';
  log.out(m, styleS, styleE);
}

log.i = function(msg) {
  var m = log.init(msg);
  var styleS = '<span style="color:' + Debug.options.infoColor + ';">';
  var styleE = '</span>';
  log.out(m, styleS, styleE);
}

log.d = function(msg) {
  var m = log.init(msg);
  var styleS = '<span style="color:' + Debug.options.debugColor + ';">';
  var styleE = '</span>';
  log.out(m, styleS, styleE);
}

log.v = function(msg) {
  var m = log.init(msg);
  var styleS = '<span style="color:' + Debug.options.verboseColor + ';">';
  var styleE = '</span>';
  log.out(m, styleS, styleE);
}

log.s = function(msg) {
  var m = log.init(msg);
  var styleS = '<span style="color:' + Debug.options.specialColor + ';text-shadow:0 0 3px;">';
  var styleE = '</span>';
  log.out(m, styleS, styleE);
}

// for object dump
log.p = function(o) {
  var m = log.init(o);
  var m = '<br>' + DebugJS.objDump(m);
  log.out(m, '', '');
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

if(!Debug.ENABLE){
log=function(x){};
log.e=function(x){};
log.w=function(x){};
log.i=function(x){};
log.d=function(x){};
log.v=function(x){};
log.s=function(x){};
log.p=function(x){};
log.init=function(x){};
log.out=function(x){};
}
