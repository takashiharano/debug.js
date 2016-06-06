/*!
 * debug.js
 * Copyright 2016 Takashi Harano
 * Released under the MIT license
 * http://debugjs.net/
 */
var DebugJS = function() {
  this.v = '201606062159';

  this.DEFAULT_OPTIONS = {
    'visible': true,
    'dispLine': 18,
    'buffSize': 100,
    'width': 500,
    'position': 'right-bottom',
    'posAdjX': 20,
    'posAdjY': 20,
    'errorColor': '#d44',
    'warnColor': '#ed0',
    'infoColor': '#eff',
    'debugColor': '#8cf',
    'verboseColor': '#ccc',
    'specialColor': '#fff',
    'clockColor': '#0f0',
    'systemInfoColor': '#ddd',
    'showLineNums': true,
    'showTimeStamp': true,
    'showClock': true,
    'showClearButton': true,
    'showSuspendLogButton': true,
    'showCloseButton': true,
    'showWindowSize': true,
    'showMouseStatus': true,
    'showKeyStatus': true,
    'enableStopWatch': true,
    'enableCommandLine': true,
    'target': null
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

  this.DEFAULT_ELM_ID = '_debug_';
  this.options = null;
  this.id = null;
  this.debugWindow = null;
  this.infoArea = null;
  this.clockArea = null;
  this.swBtnArea = null;
  this.swArea = null;
  this.swStartTime = 0;
  this.swElapsedTime = 0;
  this.elapsedTime = '00:00:00.000';
  this.clrBtnArea = null;
  this.suspendLogBtnArea = null;
  this.pinBtnArea = null;
  this.closeBtnArea = null;
  this.mousePositionArea = null;
  this.mousePos = 'x=-,y=-';
  this.mouseClickArea = null;
  this.mouseClickL = DebugJS.COLOR_INACTIVE;
  this.mouseClickC = DebugJS.COLOR_INACTIVE;
  this.mouseClickR = DebugJS.COLOR_INACTIVE;
  this.screenSizeArea = null;
  this.clientSizeArea = null;
  this.bodySizeArea = null;
  this.scrollPosArea = null;
  this.scrollPos = '';
  this.keyDownArea = null;
  this.keyPressArea = null;
  this.keyUpArea = null;
  this.keyDownCode = DebugJS.KEY_STATUS_DEFAULT;
  this.keyPressCode = DebugJS.KEY_STATUS_DEFAULT;
  this.keyUpCode = DebugJS.KEY_STATUS_DEFAULT;
  this.msgAreaId = null;
  this.msgArea = null;
  this.msgBuf = null;
  this.cmdArea = null;
  this.cmdLineId = null;
  this.cmdLine = null;
  this.cmdHistoryBuf = null;
  this.cmdHistoryMax = 10;
  this.cmdHistoryIdx = this.cmdHistoryMax;
  this.cmdTmp = '';
  this.status = 0;

  this.CMD_TBL = [
    {'cmd': 'cls', 'fnc': this.cmdCls},
    {'cmd': 'exit', 'fnc': this.cmdExit},
    {'cmd': 'help', 'fnc': this.cmdHelp},
    {'cmd': 'history', 'fnc': this.cmdHistory},
    {'cmd': 'p', 'fnc': this.cmdP, 'usage': 'p &lt;object&gt;'},
    {'cmd': 'rgb', 'fnc': this.cmdRGB, 'usage': 'rgb &lt;color value(#RGB or R G B)&gt;'},
    {'cmd': 'v', 'fnc': this.cmdV}
  ];
}
DebugJS.ENABLE = true;
DebugJS.UNIFY_CONSOLE = false;

DebugJS.STATE_VISIBLE = 0x1;
DebugJS.STATE_DYNAMIC = 0x2;
DebugJS.STATE_SHOW_CLOCK = 0x4;
DebugJS.STATE_STOPWATCH_RUNNING = 0x8;
DebugJS.STATE_DRAGGABLE = 0x10;
DebugJS.STATE_DRAGGING = 0x20;
DebugJS.STATE_LOG_SUSPENDING = 0x40;
DebugJS.STATE_INITIALIZED = 0x80000000;

DebugJS.COLOR_ACTIVE = '#fff';
DebugJS.COLOR_INACTIVE = '#888';
DebugJS.KEY_STATUS_DEFAULT =  '- <span style="color:' + DebugJS.COLOR_INACTIVE + ';">SCA</span>';
DebugJS.WDAYS = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');

DebugJS.prototype = {
  init:  function(options) {
    if(!DebugJS.ENABLE){return;}
    this.options = this.DEFAULT_OPTIONS;
    if (options) {
      for (var key in this.options) {
        for (var k in options) {
          if (key == k) {
            this.options[key] = options[key];
            break;
          }
        }
      }
    }

    if (this.options.target == null) {
      this.id = this.DEFAULT_ELM_ID;
      this.status |= DebugJS.STATE_DYNAMIC;
      this.status |= DebugJS.STATE_DRAGGABLE;
    } else {
      this.id = options.target;
      this.debugWindow = document.getElementById(this.id);
    }
    this.msgAreaId = this.id + '-msg';
    this.cmdLineId = this.id + '-cmd';

    if (this.options.visible) {
      this.status |= DebugJS.STATE_VISIBLE;
    } else {
      this.status &= ~DebugJS.STATE_VISIBLE;
    }

    // Create a window
    if (this.debugWindow == null) {
      this.debugWindow = document.createElement('div');
      this.debugWindow.id = this.id;
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(this.debugWindow);
    }

    // Info Area
    this.infoArea = document.createElement('div');
    this.debugWindow.appendChild(this.infoArea);
    this.infoArea.style.cursor = 'default';
    this.initInfoArea();

    // CLR Button
    if (this.options.showClearButton) {
      this.clrBtnArea = document.createElement('span');
      this.infoArea.appendChild(this.clrBtnArea);
    }

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
    if (this.status & DebugJS.STATE_DYNAMIC) {
      this.pinBtnArea = document.createElement('span');
      this.infoArea.appendChild(this.pinBtnArea);
    }

    // Suspend Log Button
    if (this.options.showSuspendLogButton) {
      this.suspendLogBtnArea = document.createElement('span');
      this.infoArea.appendChild(this.suspendLogBtnArea);
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
    this.msgArea.style.cursor = 'default';

    // Command Line
    if (this.options.enableCommandLine) {
      this.cmdArea = document.createElement('div');
      this.debugWindow.appendChild(this.cmdArea);
      this.initCmdArea();
    }

    this.msgBuf = new DebugJS.RingBuffer(this.options.buffSize);

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

    styles['.' + this.id + '-btn'] = {
      'color': '#6cf',
      'text-decoration': 'none'
    };

    styles['.' + this.id + '-btn:hover'] = {
      'color': '#fff',
      'text-decoration': 'none',
      'text-shadow': '0 0 3px',
      'cursor': 'pointer'
    };

    styles['.' + this.id + '-sys-info'] = {
      'margin-left': '1px',
      'color': this.options.systemInfoColor,
      'display': 'inline-block'
    };

    if (this.status & DebugJS.STATE_DYNAMIC) {
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
          wkStyle.top = ((document.documentElement.clientHeight / 2) - (dbgWinHeight / 2)) + 'px';
          wkStyle.left = ((document.documentElement.clientWidth / 2) - (this.options.width / 2)) + 'px';
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

      if (!(this.status & DebugJS.STATE_VISIBLE)) {
        wkStyle.display = 'none';
      }
    }

    this.applyStyles(styles);
    this.clearMessage();
    this.setupEventHandler();
  },

  setupEventHandler: function() {
    window.addEventListener('keydown', this.keyhandler, true);

    if (this.options.showWindowSize) {
      window.addEventListener('resize', this.resizeHandler, true);
      this.resizeHandler();

      window.addEventListener('scroll', this.scrollHandler, true);
      this.scrollHandler();
    }

    if (this.options.showMouseStatus) {
      window.addEventListener('mousemove', this.mousemoveHandler, true);
      window.addEventListener('mousedown', this.mousedownHandler, true);
      window.addEventListener('mouseup', this.mouseupHandler, true);
    }

    if (this.options.showKeyStatus) {
      window.addEventListener('keydown', this.keyDownHandler, true);
      this.updateKeyDownArea();

      window.addEventListener('keypress', this.keyPressHandler, true);
      this.updateKeyPressArea();

      window.addEventListener('keyup', this.keyUpHandler, true);
      this.updateKeyUpArea();
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
    if (this.status & DebugJS.STATE_INITIALIZED) {
      return true;
    } else {
      return false;
    }
  },

  initDebugWindow: function() {
    if (this.options.showClock) {
      this.status |= DebugJS.STATE_SHOW_CLOCK;
      this.updateClockArea();
    }

    if (this.options.enableStopWatch) {
      this.updateSwBtnArea();
      this.updateSwArea();
    }

    if (this.options.showClearButton) {
      this.initClrBtnArea();
    }

    if (this.status & DebugJS.STATE_DYNAMIC) {
      this.updatePinBtnArea();
    }

    if (this.options.showSuspendLogButton) {
      this.updateSuspendLogBtnArea();
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
    this.status |= DebugJS.STATE_INITIALIZED;
  },

  // Init Info Area
 initInfoArea: function() {
    this.infoArea.innerHTML = '<div style="padding:1px 2px 0px 2px;background:rgba(0,68,118,0);"></div>';
  },

  // Init Clear Button
  initClrBtnArea: function() {
    this.clrBtnArea.innerHTML = '<span class="' + this.id + '-btn" style="margin-right:4px;" onclick="Debug.clearMessage();">[CLR]</span>';
  },

  // Update Clock
  updateClockArea: function() {
    var dt = DebugJS.getTime();
    var tm = dt.yyyy + '-' + dt.mm + '-' + dt.dd + '(' + DebugJS.WDAYS[dt.wday] + ') ' + dt.hh + ':' + dt.mi + ':' + dt.ss;
    var msg = '<span style=";font-size:12px;color:' + this.options.clockColor + ';margin-right:10px;">' + tm + '</span>';
    this.clockArea.innerHTML = msg;

    if (this.status & DebugJS.STATE_SHOW_CLOCK) {
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
    this.scrollPosArea.innerHTML = '<span class="' + this.id + '-sys-info" style="margin-right:10px;">SCROLL:' + this.scrollPos + '</span>';
  },

  // Update Mouse Position
  updateMousePositionArea: function() {
    this.mousePositionArea.innerHTML = '<span class="' + this.id + '-sys-info" style="margin-right:10px;">POS:' + this.mousePos + '</span>';
  },

  // Update Mouse Click
  updateMouseClickArea: function() {
    var mouseClick = '<span style="color:' + this.mouseClickL + ';">L</span><span style="color:' + this.mouseClickC + ';">C</span><span style="color:' + this.mouseClickR + ';">R</span>';
    this.mouseClickArea.innerHTML = '<span class="' + this.id + '-sys-info" style="margin-right:10px;">CLICK:' + mouseClick + '</span>';
  },

  // Update key Down
  updateKeyDownArea: function() {
    this.keyDownArea.innerHTML = '<span class="' + this.id + '-sys-info">Key Down:' + this.keyDownCode + '&nbsp;</span>';
  },

  // Update key Press
  updateKeyPressArea: function() {
    this.keyPressArea.innerHTML = '<span class="' + this.id + '-sys-info">Press:' + this.keyPressCode + '&nbsp;</span>';
  },

  // Update key Up
  updateKeyUpArea: function() {
    this.keyUpArea.innerHTML = '<span class="' + this.id + '-sys-info" style="margin-right:10px;">Up:' + this.keyUpCode + '&nbsp;</span>';
  },

  // Update Stop Watch Button
  updateSwBtnArea: function() {
    var msg = '<span style="float:right;margin-right:4px;"><span class="' + this.id + '-btn" onclick="Debug.resetStopwatch();">🔃</span>';
    msg += '<span class="' + this.id + '-btn" onclick="Debug.startStopStopWatch();">';
    if (this.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      msg += '||';
    } else {
      msg += '>>';
    }
    msg += '</span></span>';
    this.swBtnArea.innerHTML = msg;
  },

  // Update Stop Watch
  updateSwArea: function() {
    this.updateStopWatch();
    var msg = '<span style="float:right;margin-right:10px;">' + this.elapsedTime + '</span>';
    this.swArea.innerHTML = msg;

    if (this.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      setTimeout('Debug.updateSwArea()', 50);
    }
  },

  // Update Suspend Log Button
  updateSuspendLogBtnArea: function() {
    var c = (this.status & DebugJS.STATE_LOG_SUSPENDING) ? '#d00' : '#888';
    this.suspendLogBtnArea.innerHTML = '<span class="' + this.id + '-btn" style="float:right;margin-right:4px;color:' + c + '" onclick="Debug.toggleLogSuspend();">🚫</span>';
  },

  // Update Pin Button
  updatePinBtnArea: function() {
    var c = (this.status & DebugJS.STATE_DRAGGABLE) ? '#888' : '#dd0';
    this.pinBtnArea.innerHTML = '<span class="' + this.id + '-btn" style="float:right;margin-right:4px;color:' + c + '" onclick="Debug.toggleDraggable();">📌</span>';
  },

  // Close Button
  initCloseBtnArea: function() {
    this.closeBtnArea.innerHTML = '<span class="' + this.id + '-btn" style="float:right;margin-right:2px;font-size:22px;color:#888;" onclick="Debug.hideDebugWindow();" onmouseover="this.style.color=\'#d88\';" onmouseout="this.style.color=\'#888\';">×</span>'
  },

  // Command-line Area
 initCmdArea: function() {
    this.cmdArea.innerHTML = '<div style="padding:0 3px 3px 3px;"><span style="color:#0cf;margin-right:2px;">$</span><input style="width:97% !important;font-family:Consolas !important;font-size:12px !important;color:#fff !important;background:transparent !important;border:0;border-bottom:solid 1px #888;border-radius:0 !important;outline:none;" id="' + this.cmdLineId + '"></input></div>';
    this.cmdLine = document.getElementById(this.cmdLineId);
    this.cmdHistoryBuf = new DebugJS.RingBuffer(10);
  },

  // Log Output
  printMessage: function() {
    var buf = this.getLog();
    var msg = '';

    // Log Area
    msg += '<div style="position:relative;padding:4px 0;height:' + this.options.dispLine + '.2em;overflow:auto;" id="' + this.msgAreaId + '">';
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
    this.msgBuf.clear();
    this.printMessage();
  },

  setStyle: function(prop, val) {
    var styles = {};
    var style = {};
    style[prop] = val;
    styles['#' + this.id] = style;
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
      if ((!(Debug.status & DebugJS.STATE_DRAGGABLE)) || (document.activeElement == Debug.cmdLine)) return;
      Debug.status |= DebugJS.STATE_DRAGGING;
      e = (e) || window.event;
      clickOffsetTop = e.clientY - el.offsetTop;
      clickOffsetLeft = e.clientX - el.offsetLeft;
      if (!document.all) {
         window.getSelection().removeAllRanges();
      }
    }
    el.onmouseup = function(e) {
      Debug.status &= ~DebugJS.STATE_DRAGGING;
    }
    el.onmousemove = function(e) {
      if (!(Debug.status & DebugJS.STATE_DRAGGING)) return;
      e = (e) || window.event;
      el.style.top = e.clientY - clickOffsetTop + 'px';
      el.style.left = e.clientX - clickOffsetLeft + 'px';
    }
  },

  toggleLogSuspend: function() {
    if (this.status & DebugJS.STATE_LOG_SUSPENDING) {
      this.status &= ~DebugJS.STATE_LOG_SUSPENDING;
    } else {
      this.status |= DebugJS.STATE_LOG_SUSPENDING;
    }
    this.updateSuspendLogBtnArea();
  },

  toggleDraggable: function() {
    if (this.status & DebugJS.STATE_DRAGGABLE) {
      this.status &= ~DebugJS.STATE_DRAGGABLE;
      this.infoArea.style.cursor = 'auto';
      this.msgArea.style.cursor = 'auto';
    } else {
      this.status |= DebugJS.STATE_DRAGGABLE;
      this.infoArea.style.cursor = 'default';
      this.msgArea.style.cursor = 'default';
    }
    this.updatePinBtnArea();
  },

  startStopStopWatch: function() {
    if (this.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      // stop
      this.status &= ~DebugJS.STATE_STOPWATCH_RUNNING;
      this.updateSwBtnArea();
    } else {
      // start
      this.status |= DebugJS.STATE_STOPWATCH_RUNNING;
      this.swStartTime = (new Date()).getTime() - this.swElapsedTime;
      this.updateStopWatch();
      this.updateSwArea();
      this.updateSwBtnArea();
    }
  },

  updateStopWatch: function() {
    if (!(this.status & DebugJS.STATE_STOPWATCH_RUNNING)) return;
    var swCurrentTime = (new Date()).getTime();
    this.swElapsedTime = swCurrentTime - this.swStartTime;
    this.elapsedTime = DebugJS.getPassedTimeStr(this.swElapsedTime);
  },

  resetStopwatch: function() {
    this.swStartTime = (new Date()).getTime();
    this.elapsedTime = DebugJS.getPassedTimeStr(0);
    this.swElapsedTime = 0;
    this.updateSwArea();
  },

  getLog: function() {
    var allBuf = this.msgBuf.getAll();
    var bufCnt = this.msgBuf.count();
    var bufLen = allBuf.length;
    var buf = [];
    for (var i = 0; i < bufLen; i++) {
      var lineCnt = bufCnt - bufLen + i + 1;
      var line = '<tr style="vertical-align:top;">';
      if (allBuf[i] == undefined) {
        break;
      }
      var lineNum = '';
      if (Debug.options.showLineNums) {
        var diffDigits = DebugJS.digits(bufCnt) - DebugJS.digits(lineCnt);
        var lineNumPadding = '';
        for (var j = 0; j < diffDigits; j++) {
          lineNumPadding = lineNumPadding + '0';
        }
        lineNum = lineNumPadding + lineCnt + ':';
        line += '<td style="padding-right:3px;word-break:normal;">' + lineNum + '</td>';
      }
      line += '<td><pre>' + allBuf[i] + '</pre></td>';
      line += '</tr>';
      buf[i] = line;
    }
    return buf;
  },

  keyhandler: function(e) {
    switch (e.keyCode) {
      case 13: // Enter
        Debug.execCmd();
        break;

      case 27: // ESC
        if (Debug.status & DebugJS.STATE_DRAGGING) {
          Debug.status &= ~DebugJS.STATE_DRAGGING;
        } else {
          Debug.hideDebugWindow();
        }
        break;

      case 38: // Up
        if (document.activeElement == Debug.cmdLine) {
          var cmds = Debug.cmdHistoryBuf.getAll();
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

      case 40: // Down
        if (document.activeElement == Debug.cmdLine) {
          var cmds = Debug.cmdHistoryBuf.getAll();
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
        if (Debug.status & DebugJS.STATE_DYNAMIC) {
          Debug.debugWindow.style.top = 0;
          Debug.debugWindow.style.left = 0;
          Debug.status &= ~DebugJS.STATE_DRAGGING;
        }
        break;

      case 113: // F2
        if (Debug.status & DebugJS.STATE_VISIBLE) {
          Debug.hideDebugWindow();
        } else {
          Debug.showDebugWindow();
        }
        break;

      default:
        break;
    }
  },

  keyDownHandler: function(e) {
    var metaKey = DebugJS.checkMetaKey(e);
    Debug.keyDownCode = e.keyCode + metaKey;
    Debug.updateKeyDownArea();
  
    Debug.keyPressCode = DebugJS.KEY_STATUS_DEFAULT;
    Debug.updateKeyPressArea();
  
    Debug.keyUpCode = DebugJS.KEY_STATUS_DEFAULT;
    Debug.updateKeyUpArea();
  },

  keyPressHandler: function(e) {
    var metaKey = DebugJS.checkMetaKey(e);
    Debug.keyPressCode = e.keyCode + metaKey;
    Debug.updateKeyPressArea();
  },

  keyUpHandler: function(e) {
    var metaKey = DebugJS.checkMetaKey(e);
    Debug.keyUpCode = e.keyCode + metaKey;
    Debug.updateKeyUpArea();
  },

  resizeHandler: function() {
    Debug.updateWindowSizeArea();
    Debug.updateClientSizeArea();
    Debug.updateBodySizeArea();
  },

  scrollHandler: function() {
    var x, y;
    if (window.scrollX === undefined) {
      x = document.documentElement.scrollLeft;
      y = document.documentElement.scrollTop;
    } else {
      x = window.scrollX;
      y = window.scrollY;
    }
    Debug.scrollPos = 'x=' + x + ',y=' + y;
    Debug.updateScrollPosArea();
  },

  mousemoveHandler: function(e) {
    Debug.mousePos = 'x=' + e.clientX + ',y=' + e.clientY;
    Debug.updateMousePositionArea();
  },

  mousedownHandler: function(e) {
    switch (e.button) {
      case 0:
        Debug.mouseClickL = DebugJS.COLOR_ACTIVE;
        break;
      case 1:
        Debug.mouseClickC = DebugJS.COLOR_ACTIVE;
        break;
      case 2:
        Debug.mouseClickR = DebugJS.COLOR_ACTIVE;
        break;
      default:
        break;
    }
    Debug.updateMouseClickArea();
  },

  mouseupHandler: function(e) {
    switch (e.button) {
      case 0:
        Debug.mouseClickL = DebugJS.COLOR_INACTIVE;
        break;
      case 1:
        Debug.mouseClickC = DebugJS.COLOR_INACTIVE;
        break;
      case 2:
        Debug.mouseClickR = DebugJS.COLOR_INACTIVE;
        break;
      default:
        break;
    }
    Debug.updateMouseClickArea();
  },

  hideDebugWindow: function() {
    if (!this.options.showCloseButton) return;
    this.status &= ~DebugJS.STATE_DRAGGING;
    var styles = {};
    styles['#' + this.id] = {'display': 'none'};
    this.applyStyles(styles);
    this.status &= ~DebugJS.STATE_VISIBLE;
  },

  showDebugWindow: function() {
    var styles = {};
    styles['#' + this.id] = {'display': 'block'};
    this.applyStyles(styles);
    this.status |= DebugJS.STATE_VISIBLE;
  },

  execCmd: function() {
    if (document.activeElement != this.cmdLine) {
      return;
    }
    var cl = this.cmdLine.value;
    if (cl != '') {
      this.cmdHistoryBuf.add(cl);
    }
    this.cmdHistoryIdx = (this.cmdHistoryBuf.count() < this.cmdHistoryMax) ? this.cmdHistoryBuf.count() : this.cmdHistoryMax;
    this.cmdLine.value = '';
    log.s(cl);
    wkCL = cl.replace(/\s{2,}/g, ' ');
    var cmds = wkCL.match(/([^\s]{1,})\s(.*)/);
    var cmd = wkCL, args = '';
    if (cmds != null) {
      cmd = cmds[1];
      args = cmds[2]
    }
    var found = false;
    for (var i=0; i<this.CMD_TBL.length; i++) {
      if (cmd == this.CMD_TBL[i].cmd) {
        found = true;
        this.CMD_TBL[i].fnc(args, this.CMD_TBL[i]);
        break;
      }
    }

    if (!found) {
      try {
        DebugJS.log(eval(cl));
      } catch (e) {
        log.e(e)
      }
    }
  },

  cmdCls: function(args, tbl) {
    Debug.clearMessage();  
  },

  cmdExit: function(args, tbl) {
    Debug.clearMessage();
    Debug.hideDebugWindow();
  },

  cmdHelp: function(args, tbl) {
    var str = 'Available Commands:<br>';
    str += 'cls      Clear log message.<br>';
    str += 'exit     Close the debug window.<br>';
    str += 'p        Print object.<br>';
    str += 'help     Displays available command list.<br>';
    str += 'history  Displays command history.<br>';
    str += 'rgb      Convert RGB color values between HEX and DEC.<br>';
    str += 'v        Displays version info.<br>';
    DebugJS.log(str);
  },

  cmdHistory: function(args, tbl) {
    var buf = Debug.cmdHistoryBuf.getAll();
    var str = 'Command History:<br>';
    for (var i=0; i< (buf.length - 1); i++) {
      str += buf[i] + '<br>';
    }
    DebugJS.log(str);
  },

  cmdP: function(args, tbl) {
    if (args == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.execCmdP(args);
    }
  },

  cmdRGB: function(args, tbl) {
    if (args == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.convRGB(args);
    }
  },

  cmdV: function(args, tbl) {
    DebugJS.log('ver.' + Debug.v);
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
    var allBuf = [];
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
        allBuf[i] = this.buffer[pos];
        pos++;
      }
    }

    return allBuf;
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
  }
};

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

  var dateTime = {'yyyy': nowDate.getFullYear(), 'mm': mm, 'dd': dd, 'hh': hh, 'mi': mi, 'ss': ss, 'ms': ms, 'wday': nowDate.getDay()};
  return dateTime;
}

DebugJS.time = function() {
  var dt = DebugJS.getTime();
  var tm = dt.hh + ':' + dt.mi + ':' + dt.ss + '.' + dt.ms;
  return tm;
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

  var retStr = passedHour + ':' + passedMin + ':' + passedSec + '.' + passedMsec;
  return retStr;
}

DebugJS.checkMetaKey = function(e) {
  var shift = e.shiftKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var ctrl = e.ctrlKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var alt = e.altKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var metaKey = ' <span style="color:' + shift + ';">S</span><span style="color:' + ctrl + ';">C</span><span style="color:' + alt + ';">A</span>';
  return metaKey;
}

DebugJS.execCmdP = function(args) {
  var objs = args.split(' ');
  for (var i=0; i<objs.length; i++) {
    if (objs[i] == '') continue;
    var command = 'DebugJS.buf="<br>' + objs[i] + ' = ";DebugJS.buf+=DebugJS.objDump(' + objs[i] + ');DebugJS.log(DebugJS.buf);';
    try {
      eval(command);
    } catch (e) {
      DebugJS.log.e(e);
    }
  }
}

DebugJS.OBJDUMP_MAX = 100;
DebugJS.objDump = function(obj) {
  var arg = {'lv': 0, 'cnt': 0, 'dump': ''};
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
    arg.cnt++;
    if (typeof obj === 'function') {
      arg.dump += '<span style="color:#8c8;">[Function]</span><br>';
    } else {
      arg.dump += '<span style="color:#88f;">[Object]</span> {<br>';
    }
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
  } else if (typeof obj === 'string') {
    arg.dump += '"' + obj + '"<br>'; arg.cnt++;
  } else {
    arg.dump += obj + '<br>'; arg.cnt++;
  }
  return arg;
}

DebugJS.digits = function(x) {
  var digit = 0;
  while (x != 0) {
    x = (x / 10) << 0; digit++;
  }
  return digit;
}

DebugJS.printUsage = function(m) {
  DebugJS.log('Usage: ' + m);
}

DebugJS.COLOR_R = '#f66';
DebugJS.COLOR_G = '#6f6';
DebugJS.COLOR_B = '#6bf';
DebugJS.convRGB = function(v) {
  var rgb;
  if (v.indexOf("#") == 0) {
    rgb = DebugJS.convRGB16to10(v);
  } else {
    rgb = DebugJS.convRGB10to16(v);
  }
  DebugJS.log(rgb);
}

DebugJS.convRGB16to10 = function(rgb16) {
  var r16, g16, b16, r10, g10, b10;
  rgb16 = rgb16.replace(/\s/g, '');
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
  var rgb10 = '<span style="vertical-align:middle;display:inline-block;"><span style="background:rgb(' + r10 + ',' + g10 + ',' + b10 + ');width:8px;height:8px;margin-top:2px;display:inline-block;"> </span></span> <span style="color:' + DebugJS.COLOR_R + '">' + r10 + '</span> <span style="color:' + DebugJS.COLOR_G + '">' + g10 + '</span> <span style="color:' + DebugJS.COLOR_B + '">' + b10 + '</span>';
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
  var rgb16 = '<span style="vertical-align:middle;display:inline-block;"><span style="background:#' + r16 + g16 + b16 + ';width:8px;height:8px;margin-top:2px;display:inline-block;"> </span></span> #<span style="color:' + DebugJS.COLOR_R + '">' + r16 + '</span><span style="color:' + DebugJS.COLOR_G + '">' + g16 + '</span><span style="color:' + DebugJS.COLOR_B + '">' + b16 + '</span>';
  return rgb16;
}

DebugJS.log = function(m) {
  m = DebugJS.log.init(m);
  DebugJS.log.out(m, null);
}

DebugJS.log.e = function(m) {
  m = DebugJS.log.init(m);
  var style = 'color:' + Debug.options.errorColor + ';';
  DebugJS.log.out(m, style);
}

DebugJS.log.w = function(m) {
  m = DebugJS.log.init(m);
  var style = 'color:' + Debug.options.warnColor + ';';
  DebugJS.log.out(m, style);
}

DebugJS.log.i = function(m) {
  m = DebugJS.log.init(m);
  var style = 'color:' + Debug.options.infoColor + ';';
  DebugJS.log.out(m, style);
}

DebugJS.log.d = function(m) {
  m = DebugJS.log.init(m);
  var style = 'color:' + Debug.options.debugColor + ';';
  DebugJS.log.out(m, style);
}

DebugJS.log.v = function(m) {
  m = DebugJS.log.init(m);
  var style = 'color:' + Debug.options.verboseColor + ';';
  DebugJS.log.out(m, style);
}

DebugJS.log.s = function(m) {
  m = DebugJS.log.init(m);
  var style = 'color:' + Debug.options.specialColor + ';text-shadow:0 0 3px;';
  DebugJS.log.out(m, style);
}

DebugJS.log.p = function(o) {
  var m = DebugJS.log.init(null);
  var m = '<br>' + DebugJS.objDump(o);
  DebugJS.log.out(m, null);
}

DebugJS.log.init = function(m) {
  if (!Debug.isInitialized()) {
    Debug.init(null, null);
  }
  if (!Debug.isWindowInitialized()) {
    Debug.initDebugWindow();
  }
  return m;
}

DebugJS.log.out = function(m, style) {
  if (m != null) {
    var t = '';
    if (Debug.options.showTimeStamp) {
      t = DebugJS.time() + ' ';
    }
    if (style != null) {
      style = ' style="' + style + '"';
    }
    m = '<span' + style + '>' + t + m + '</span>';
    Debug.msgBuf.add(m);
  }
  Debug.printMessage();
}

var log = function(m) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log(m);
}

log.e = function(m) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.e(m);
}

log.w = function(m) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.w(m);
}

log.i = function(m) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.i(m);
}

log.d = function(m) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.d(m);
}

log.v = function(m) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.v(m);
}

log.s = function(m) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.s(m);
}

log.p = function(o) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.p(o);
}

log.stk = function() {
  var err = new Error();
  DebugJS.log(err.stack);
}

var Debug = new DebugJS();

if(DebugJS.UNIFY_CONSOLE){
console.log=function(x){log(x);}
console.info=function(x){log.i(x);}
console.warn=function(x){log.w(x);}
console.error=function(x){log.e(x);}
}

if(!DebugJS.ENABLE){
log=function(x){};
log.e=function(x){};
log.w=function(x){};
log.i=function(x){};
log.d=function(x){};
log.v=function(x){};
log.s=function(x){};
log.p=function(x){};
log.stk=function(){};
}
