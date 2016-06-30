/*!
 * debug.js
 * Copyright 2016 Takashi Harano
 * Released under the MIT license
 * http://debugjs.net/
 */
var DebugJS = function() {
  this.v = '201607010000';

  this.DEFAULT_OPTIONS = {
    'visible': true,
    'dispLine': 18,
    'buffSize': 100,
    'width': 500,
    'position': 'se',
    'posAdjX': 20,
    'posAdjY': 20,
    'resizable': true,
    'errorColor': '#d44',
    'warnColor': '#ed0',
    'infoColor': '#eff',
    'debugColor': '#8cf',
    'verboseColor': '#ccc',
    'specialColor': '#fff',
    'clockColor': '#0f0',
    'systemInfoColor': '#ddd',
    'bgColor': '0,0,0',
    'bgOpacity': '0.7',
    'showLineNums': true,
    'showTimeStamp': true,
    'showClock': true,
    'showClearButton': true,
    'showSuspendLogButton': true,
    'showCloseButton': true,
    'showWindowSize': true,
    'showMouseStatus': true,
    'showKeyStatus': true,
    'showElement': false,
    'enableStopWatch': true,
    'enableScreenMeasure': true,
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
  this.bodyElm = null;
  this.debugWindow = null;
  this.infoArea = null;
  this.clockArea = null;
  this.measureBtnArea = null;
  this.measureBox = null;
  this.swBtnArea = null;
  this.swArea = null;
  this.swStartTime = 0;
  this.swElapsedTime = 0;
  this.swElapsedTimeDisp = '00:00:00.000';
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
  this.scrollPosX = 0;
  this.scrollPosY = 0;
  this.keyDownArea = null;
  this.keyPressArea = null;
  this.keyUpArea = null;
  this.keyDownCode = DebugJS.KEY_STATUS_DEFAULT;
  this.keyPressCode = DebugJS.KEY_STATUS_DEFAULT;
  this.keyUpCode = DebugJS.KEY_STATUS_DEFAULT;
  this.elmArea = null;
  this.domElement = '';
  this.msgArea = null;
  this.msgAreaId = null;
  this.msgAreaScrollX = 0;
  this.msgAreaScrollY = 0;
  this.msgBuf = null;
  this.cmdArea = null;
  this.cmdLineId = null;
  this.cmdLine = null;
  this.cmdHistoryBuf = null;
  this.cmdHistoryMax = 10;
  this.cmdHistoryIdx = self.cmdHistoryMax;
  this.cmdTmp = '';
  this.timers = {};
  this.resizeN = null;
  this.resizeE = null;
  this.resizeS = null;
  this.resizeW = null;
  this.resizeNW = null;
  this.resizeNE = null;
  this.resizeSE = null;
  this.resizeSW = null;
  this.resizeOrgWidth = 0;
  this.resizeOrgHeight = 0;
  this.clickedPosX = 0;
  this.clickedPosY = 0;
  this.orgOffsetTop = 0;
  this.orgOffsetLeft = 0;
  this.savedFunc = null;
  this.status = 0;

  this.CMD_TBL = [
    {'cmd': 'cls', 'fnc': this.cmdCls},
    {'cmd': 'exit', 'fnc': this.cmdExit},
    {'cmd': 'help', 'fnc': this.cmdHelp},
    {'cmd': 'history', 'fnc': this.cmdHistory},
    {'cmd': 'p', 'fnc': this.cmdP, 'usage': 'p &lt;object&gt;'},
    {'cmd': 'rgb', 'fnc': this.cmdRGB, 'usage': 'rgb &lt;color value(#RGB or R G B)&gt;'},
    {'cmd': 'time', 'fnc': this.cmdTime, 'usage': 'time &lt;start/end&gt; &lt;timer name&gt;'},
    {'cmd': 'v', 'fnc': this.cmdV}
  ];
}
DebugJS.ENABLE = true;
DebugJS.CATCH_ALL_ERRORS = true;
DebugJS.UNIFY_CONSOLE = false;

DebugJS.STATE_VISIBLE = 0x1;
DebugJS.STATE_DYNAMIC = 0x2;
DebugJS.STATE_SHOW_CLOCK = 0x4;
DebugJS.STATE_STOPWATCH_RUNNING = 0x8;
DebugJS.STATE_DRAGGABLE = 0x10;
DebugJS.STATE_DRAGGING = 0x20;
DebugJS.STATE_RESIZABLE = 0x100;
DebugJS.STATE_RESIZING = 0x200;
DebugJS.STATE_RESIZING_N = 0x400;
DebugJS.STATE_RESIZING_E = 0x800;
DebugJS.STATE_RESIZING_S = 0x1000;
DebugJS.STATE_RESIZING_W = 0x2000;
DebugJS.STATE_RESIZING_ALL = DebugJS.STATE_RESIZING | DebugJS.STATE_RESIZING_N | DebugJS.STATE_RESIZING_E | DebugJS.STATE_RESIZING_S | DebugJS.STATE_RESIZING_W;
DebugJS.STATE_MEASURE = 0x10000;
DebugJS.STATE_MEASURING = 0x20000;
DebugJS.STATE_LOG_SUSPENDING = 0x40000;
DebugJS.STATE_INITIALIZED = 0x80000000;

DebugJS.DEBUG_WIN_MIN_W = 280;
DebugJS.DEBUG_WIN_MIN_H = 155;
DebugJS.COLOR_ACTIVE = '#fff';
DebugJS.COLOR_INACTIVE = '#888';
DebugJS.KEY_STATUS_DEFAULT =  '- <span style="color:' + DebugJS.COLOR_INACTIVE + ';">SCA</span>';
DebugJS.WDAYS = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');

DebugJS.prototype = {
  init:  function(options) {
    if(!DebugJS.ENABLE){return;}
    var self = Debug;
    self.options = self.DEFAULT_OPTIONS;
    if (options) {
      for (var key in options) {
        for (var key1 in self.options) {
          if (key == key1) {
            self.options[key] = options[key];
            break;
          }
        }
      }
    }

    if (self.options.target == null) {
      self.id = self.DEFAULT_ELM_ID;
      self.status |= DebugJS.STATE_DYNAMIC;
      self.status |= DebugJS.STATE_DRAGGABLE;
    } else {
      self.id = options.target;
      self.debugWindow = document.getElementById(self.id);
    }
    self.msgAreaId = self.id + '-msg';
    self.cmdLineId = self.id + '-cmd';

    if (self.options.visible) self.status |= DebugJS.STATE_VISIBLE;
    if ((self.status & DebugJS.STATE_DYNAMIC) && (self.options.resizable)) self.status |= DebugJS.STATE_RESIZABLE;

    self.bodyElm = document.getElementsByTagName('body')[0];

    // Create a window
    if (self.debugWindow == null) {
      self.debugWindow = document.createElement('div');
      self.debugWindow.id = self.id;
      self.bodyElm.appendChild(self.debugWindow);
    }

    // Info Area
    self.infoArea = document.createElement('div');
    self.debugWindow.appendChild(self.infoArea);
    self.infoArea.innerHTML = '<div style="padding:1px 2px 0px 2px;background:rgba(24,131,215,0);"></div>';
    if (self.status & DebugJS.STATE_DRAGGABLE) self.infoArea.style.cursor = 'default';

    // CLR Button
    if (self.options.showClearButton) {
      self.clrBtnArea = document.createElement('span');
      self.infoArea.appendChild(self.clrBtnArea);
    }

    // Clock
    if (self.options.showClock) {
      self.clockArea = document.createElement('span');
      self.infoArea.appendChild(self.clockArea);
    }

    // -- R to L
    // X Button
    if (self.options.showCloseButton) {
      self.closeBtnArea = document.createElement('span');
      self.infoArea.appendChild(self.closeBtnArea);
    }

    // Pin Button
    if (self.status & DebugJS.STATE_DYNAMIC) {
      self.pinBtnArea = document.createElement('span');
      self.infoArea.appendChild(self.pinBtnArea);
    }

    // Suspend Log Button
    if (self.options.showSuspendLogButton) {
      self.suspendLogBtnArea = document.createElement('span');
      self.infoArea.appendChild(self.suspendLogBtnArea);
    }

    // Stopwatch
    if (self.options.enableStopWatch) {
      self.swArea = document.createElement('span');
      self.infoArea.appendChild(self.swArea);

      self.swBtnArea = document.createElement('span');
      self.infoArea.appendChild(self.swBtnArea);
    }

    // Screen Measure Button
    if (self.options.enableScreenMeasure) {
      self.measureBtnArea = document.createElement('span');
      self.infoArea.appendChild(self.measureBtnArea);
    }
    // -- R to L

    if ((self.options.showClock) || (self.options.showCloseButton) || (self.options.showClearButton) || (self.options.enableStopWatch)) {
      self.infoArea.appendChild(document.createElement('br'));
    }

    // Window Size
    if (self.options.showWindowSize) {
      self.screenSizeArea = document.createElement('span');
      self.infoArea.appendChild(self.screenSizeArea);

      self.windowSizeArea = document.createElement('span');
      self.infoArea.appendChild(self.windowSizeArea);

      self.clientSizeArea = document.createElement('span');
      self.infoArea.appendChild(self.clientSizeArea);

      self.bodySizeArea = document.createElement('span');
      self.infoArea.appendChild(self.bodySizeArea);

      self.scrollPosArea = document.createElement('span');
      self.infoArea.appendChild(self.scrollPosArea);
    }

    // Mouse Status
    if (self.options.showMouseStatus) {
      self.mousePositionArea = document.createElement('span');
      self.infoArea.appendChild(self.mousePositionArea);

      self.mouseClickArea = document.createElement('span');
      self.infoArea.appendChild(self.mouseClickArea);
    }

    // DOM Element
    if (self.options.showElement) {
      self.elmArea = document.createElement('span');
      self.infoArea.appendChild(self.elmArea);
    }

    if ((self.options.showWindowSize) || (self.options.showMouseStatus) || (self.options.showElement)) {
      self.infoArea.appendChild(document.createElement('br'));
    }

    // Key Status
    if (self.options.showKeyStatus) {
      self.keyDownArea = document.createElement('span');
      self.infoArea.appendChild(self.keyDownArea);

      self.keyPressArea = document.createElement('span');
      self.infoArea.appendChild(self.keyPressArea);

      self.keyUpArea = document.createElement('span');
      self.infoArea.appendChild(self.keyUpArea);
    }

    // Log
    self.msgArea = document.createElement('div');
    self.debugWindow.appendChild(self.msgArea);
    self.msgArea.style.height = self.options.dispLine + '.2em';
    if (self.status & DebugJS.STATE_DRAGGABLE) self.msgArea.style.cursor = 'default';

    // Command Line
    if (self.options.enableCommandLine) {
      self.cmdArea = document.createElement('div');
      self.debugWindow.appendChild(self.cmdArea);
      self.initCmdArea();
    }

    // Resize
    if (self.status & DebugJS.STATE_RESIZABLE) {
      self.resizeN = document.createElement('div');
      self.resizeN.innerHTML = '<div class="' + self.id  + '-resize-side" style="top:-3px;left:0;width:100%;height:6px;cursor:ns-resize">';
      self.debugWindow.appendChild(self.resizeN);

      self.resizeE = document.createElement('div');
      self.resizeE.innerHTML = '<div class="' + self.id  + '-resize-side" style="top:0px;right:-3px;width:6px;height:100%;cursor:ew-resize">';
      self.debugWindow.appendChild(self.resizeE);

      self.resizeS = document.createElement('div');
      self.resizeS.innerHTML = '<div class="' + self.id  + '-resize-side" style="bottom:-3px;left:0;width:100%;height:6px;cursor:ns-resize">';
      self.debugWindow.appendChild(self.resizeS);

      self.resizeW = document.createElement('div');
      self.resizeW.innerHTML = '<div class="' + self.id  + '-resize-side" style="top:0px;left:-3px;width:6px;height:100%;cursor:ew-resize">';
      self.debugWindow.appendChild(self.resizeW);

      self.resizeNW = document.createElement('div');
      self.resizeNW.innerHTML = '<div class="' + self.id  + '-resize-corner" style="top:-3px;left:-3px;cursor:nwse-resize">';
      self.debugWindow.appendChild(self.resizeNW);

      self.resizeNE = document.createElement('div');
      self.resizeNE.innerHTML = '<div class="' + self.id  + '-resize-corner" style="top:-3px;right:-3px;cursor:nesw-resize">';
      self.debugWindow.appendChild(self.resizeNE);

      self.resizeSE = document.createElement('div');
      self.resizeSE.innerHTML = '<div class="' + self.id  + '-resize-corner" style="bottom:-3px;right:-3px;cursor:nwse-resize">';
      self.debugWindow.appendChild(self.resizeSE);

      self.resizeSW = document.createElement('div');
      self.resizeSW.innerHTML = '<div class="' + self.id  + '-resize-corner" style="bottom:-3px;left:-3px;cursor:nesw-resize">';
      self.debugWindow.appendChild(self.resizeSW);

      self.setupResize();
    }

    self.msgBuf = new DebugJS.RingBuffer(self.options.buffSize);

    var styles = {};
    styles['#' + self.id] = self.STYLE;

    styles['#' + self.id + ' td'] = {
      'font-size': self.STYLE['font-size'],
      'font-family': self.STYLE['font-family'],
      'color': self.STYLE['color'],
      'background': 'initial',
      'width': 'initial',
      'border': 'initial',
      'padding': '0 3px'
    };

    styles['#' + self.id + ' pre'] = {
      'white-space': 'pre-wrap',
      'word-break': 'break-all', 
      'font-size': self.STYLE['font-size'],
      'font-family': self.STYLE['font-family'],
      'color': self.STYLE['color'],
      'margin': '0',
      'overflow': 'visible'
    };

    styles['.' + self.id + '-btn'] = {
      'color': '#6cf',
      'text-decoration': 'none'
    };

    styles['.' + self.id + '-btn:hover'] = {
      'color': '#fff',
      'text-decoration': 'none',
      'text-shadow': '0 0 3px',
      'cursor': 'pointer'
    };

    styles['.' + self.id + '-sys-info'] = {
      'margin-left': '1px',
      'color': self.options.systemInfoColor,
      'display': 'inline-block'
    };

    styles['.' + self.id + '-resize-corner'] = {
      'position': 'absolute',
      'width': '6px',
      'height': '6px',
      'background': 'rgba(0,0,0,0)'
    };

    styles['.' + self.id + '-resize-side'] = {
      'position': 'absolute',
      'background': 'rgba(0,0,0,0)'
    };

    if (self.status & DebugJS.STATE_DYNAMIC) {
      self.setupMove();

      var wkStyle = styles['#' + self.id];
      wkStyle.position = 'fixed';
      wkStyle.width = self.options.width + 'px';
      wkStyle.background = 'rgba(' + self.options.bgColor + ',' + self.options.bgOpacity + ')';
      wkStyle['box-shadow'] = '10px 10px 10px rgba(0,0,0,.3)';
      wkStyle['z-index'] = 0x7fffffff;

      // adjust the window position
      var dbgWinHeight = 273;
      if (self.options.enableCommandLine) {
        dbgWinHeight = 294;
      }
      switch (self.options.position) {
        case 'se':
          wkStyle.top = (document.documentElement.clientHeight - dbgWinHeight - self.options.posAdjY) + 'px';
          wkStyle.left = (document.documentElement.clientWidth - self.options.width - self.options.posAdjX) + 'px';
          break;
        case 'ne':
          wkStyle.top = self.options.posAdjY + 'px';
          wkStyle.left = (document.documentElement.clientWidth - self.options.width - self.options.posAdjX) + 'px';
          break;
        case 'c':
          wkStyle.top = ((document.documentElement.clientHeight / 2) - (dbgWinHeight / 2)) + 'px';
          wkStyle.left = ((document.documentElement.clientWidth / 2) - (self.options.width / 2)) + 'px';
          break;
        case 'sw':
          wkStyle.top = (document.documentElement.clientHeight - dbgWinHeight - self.options.posAdjY) + 'px';
          wkStyle.left = self.options.posAdjX + 'px';
          break;
        default:
          wkStyle.top = self.options.posAdjY + 'px';
          wkStyle.left = self.options.posAdjX + 'px';
          break;
      }

      if (!(self.status & DebugJS.STATE_VISIBLE)) {
        wkStyle.display = 'none';
      }
    }

    self.applyStyles(styles);
    self.clearMessage();
    self.setupEventHandler();
  },

  setupEventHandler: function() {
    var self = Debug;
    window.addEventListener('keydown', self.keyhandler, true);

    if (self.options.showWindowSize) {
      window.addEventListener('resize', self.resizeHandler, true);
      self.resizeHandler();

      window.addEventListener('scroll', self.scrollHandler, true);
      self.scrollHandler();
    }

    if ((self.options.showMouseStatus) || (self.options.enableScreenMeasure)) {
      window.addEventListener('mousemove', self.mousemoveHandler, true);
      window.addEventListener('mousedown', self.mousedownHandler, true);
      window.addEventListener('mouseup', self.mouseupHandler, true);
    }

    if (self.options.showKeyStatus) {
      window.addEventListener('keydown', self.keyDownHandler, true);
      self.updateKeyDownArea();

      window.addEventListener('keypress', self.keyPressHandler, true);
      self.updateKeyPressArea();

      window.addEventListener('keyup', self.keyUpHandler, true);
      self.updateKeyUpArea();
    }
  },

  isInitialized: function() {
    if (Debug.debugWindow == null) {
      return false;
    } else {
      return true;
    }
  },

  isWindowInitialized: function() {
    if (Debug.status & DebugJS.STATE_INITIALIZED) {
      return true;
    } else {
      return false;
    }
  },

  initDebugWindow: function() {
    var self = Debug;
    if (self.options.showClock) {
      self.status |= DebugJS.STATE_SHOW_CLOCK;
      self.updateClockArea();
    }

    if (self.options.enableScreenMeasure) {
      self.updateMeasureBtnArea();
    }

    if (self.options.enableStopWatch) {
      self.updateSwBtnArea();
      self.updateSwArea();
    }

    if (self.options.showClearButton) {
      self.initClrBtnArea();
    }

    if (self.status & DebugJS.STATE_DYNAMIC) {
      self.updatePinBtnArea();
    }

    if (self.options.showSuspendLogButton) {
      self.updateSuspendLogBtnArea();
    }

    if (self.options.showCloseButton) {
      self.initCloseBtnArea();
    }

    if (self.options.showMouseStatus) {
      self.updateMousePositionArea();
      self.updateMouseClickArea();
    }

    if (self.options.showElement) {
      self.updateElementArea();
    }

    if (self.options.showWindowSize) {
      self.initScreenSizeArea();
      self.updateWindowSizeArea();
      self.updateClientSizeArea();
      self.updateBodySizeArea();
      self.updateScrollPosArea();
    }

    self.printMessage();
    self.status |= DebugJS.STATE_INITIALIZED;
  },

  // Init Clear Button
  initClrBtnArea: function() {
    this.clrBtnArea.innerHTML = '<span class="' + this.id + '-btn" style="margin-right:4px;" onclick="Debug.clearMessage();">[CLR]</span>';
  },

  // Update Clock
  updateClockArea: function() {
    var dt = DebugJS.getCurrentDateTime();
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
    this.scrollPosArea.innerHTML = '<span class="' + this.id + '-sys-info" style="margin-right:10px;">SCROLL:x=' + this.scrollPosX + ',y=' + this.scrollPosY + '</span>';
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

  // Update DOM Element
  updateElementArea: function() {
    this.elmArea.innerHTML = '<span class="' + this.id + '-sys-info" style="margin-right:10px;">DOM:' + this.domElement + '</span>';
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

  // Update Measure Button
  updateMeasureBtnArea: function() {
    var self = Debug;
    var c = (this.status & DebugJS.STATE_MEASURE) ? '#0f0' : '#888';
    self.measureBtnArea.innerHTML = '<span class="' + self.id + '-btn" style="display:inline-block;float:right;margin-right:4px;width:8px;height:8px;margin-top:2px;background:' + c + ';" onclick="Debug.toggleMeasureMode();"> </span>';
  },

  // Update Stop Watch Button
  updateSwBtnArea: function() {
    var self = Debug;
    var msg = '<span style="float:right;margin-right:4px;"><span class="' + this.id + '-btn" onclick="Debug.resetStopwatch();">🔃</span>';
    msg += '<span class="' + this.id + '-btn" onclick="Debug.startStopStopWatch();">';
    if (self.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      msg += '||';
    } else {
      msg += '>>';
    }
    msg += '</span></span>';
    self.swBtnArea.innerHTML = msg;
  },

  // Update Stop Watch
  updateSwArea: function() {
    var self = Debug;
    self.updateStopWatch();
    var msg = '<span style="float:right;margin-right:10px;">' + this.swElapsedTimeDisp + '</span>';
    self.swArea.innerHTML = msg;

    if (self.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      setTimeout('Debug.updateSwArea()', 50);
    }
  },

  // Update Suspend Log Button
  updateSuspendLogBtnArea: function() {
    var self = Debug;
    var c = (self.status & DebugJS.STATE_LOG_SUSPENDING) ? '#d00' : '#888';
    self.suspendLogBtnArea.innerHTML = '<span class="' + self.id + '-btn" style="float:right;margin-right:4px;color:' + c + '" onclick="Debug.toggleLogSuspend();">🚫</span>';
  },

  // Update Pin Button
  updatePinBtnArea: function() {
    var self = Debug;
    var c = (self.status & DebugJS.STATE_DRAGGABLE) ? '#888' : '#dd0';
    self.pinBtnArea.innerHTML = '<span class="' + self.id + '-btn" style="float:right;margin-right:4px;color:' + c + '" onclick="Debug.toggleDraggable();">📌</span>';
  },

  // Close Button
  initCloseBtnArea: function() {
    var self = Debug;
    self.closeBtnArea.innerHTML = '<span class="' + self.id + '-btn" style="float:right;margin-right:2px;font-size:22px;color:#888;" onclick="Debug.hideDebugWindow();" onmouseover="this.style.color=\'#d88\';" onmouseout="this.style.color=\'#888\';">×</span>'
  },

  // Command-line Area
 initCmdArea: function() {
    var self = Debug;
    self.cmdArea.innerHTML = '<div style="padding:3px;margin-top:3px;"><span style="color:#0cf;">$</span><input style="width:calc(100% - 12px) !important;margin-left:2px;font-family:Consolas !important;font-size:12px !important;color:#fff !important;background:transparent !important;border:0;border-bottom:solid 1px #888;border-radius:0 !important;outline:none;" id="' + self.cmdLineId + '"></input></div>';
    self.cmdLine = document.getElementById(self.cmdLineId);
    self.cmdHistoryBuf = new DebugJS.RingBuffer(10);
  },

  // Log Output
  printMessage: function() {
    var self = Debug;
    var buf = self.getLog();
    var msg = '';

    // Log Area
    msg += '<div style="position:relative;padding:4px 0;height:100%;overflow:auto;" id="' + self.msgAreaId + '">';
    msg += '<table style="border-spacing:0;">';
    for (var i = 0; i < buf.length; i++) {
      msg += buf[i];
    }
    msg += '</table>';
    msg += '</div>';

    self.msgArea.innerHTML = msg;
    self.msgArea.children[self.msgAreaId].scrollTop = self.msgArea.children[self.msgAreaId].scrollHeight;
  },

  clearMessage: function() {
    var self = Debug;
    self.msgBuf.clear();
    self.printMessage();
  },

  setStyle: function(prop, val) {
    var self = Debug;
    var styles = {};
    var style = {};
    style[prop] = val;
    styles['#' + self.id] = style;
    self.applyStyles(styles);
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
    var self = Debug;
    self.infoArea.onmousedown = self.startWindowMove;
    self.msgArea.onmousedown = self.startWindowMove;
  },

  startWindowMove: function(e) {
    var self= Debug;
    if ((!(self.status & DebugJS.STATE_DRAGGABLE)) || (e.target.nodeName == 'INPUT')) return;
    self.status |= DebugJS.STATE_DRAGGING;
    e = (e) || window.event;
    self.orgOffsetTop = e.clientY - self.debugWindow.offsetTop;
    self.orgOffsetLeft = e.clientX - self.debugWindow.offsetLeft;
    if (!document.all) {
       window.getSelection().removeAllRanges();
    }
  },

  windowMove: function(e) {
    var self= Debug;
    if (!(self.status & DebugJS.STATE_DRAGGING)) return;
    e = (e) || window.event;
    self.debugWindow.style.top = e.clientY - self.orgOffsetTop + 'px';
    self.debugWindow.style.left = e.clientX - self.orgOffsetLeft + 'px';
  },

  setupResize: function() {
    var self = Debug;

    self.resizeN.onmousedown = function(e) {
      var self= Debug;
      if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
      self.startResize(e);
      self.status |= DebugJS.STATE_RESIZING_N;
      self.bodyElm.style.cursor = 'ns-resize';
    }

    self.resizeE.onmousedown = function(e) {
      var self= Debug;
      if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
      self.startResize(e);
      self.status |= DebugJS.STATE_RESIZING_E;
      self.bodyElm.style.cursor = 'ew-resize';
    }

    self.resizeS.onmousedown = function(e) {
      var self= Debug;
      if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
      self.startResize(e);
      self.status |= DebugJS.STATE_RESIZING_S;
      self.bodyElm.style.cursor = 'ns-resize';
    }

    self.resizeW.onmousedown = function(e) {
      var self= Debug;
      if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
      self.startResize(e);
      self.status |= DebugJS.STATE_RESIZING_W;
      self.bodyElm.style.cursor = 'ew-resize';
    }

    self.resizeNW.onmousedown = function(e) {
      var self= Debug;
      if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
      self.startResize(e);
      self.status |= DebugJS.STATE_RESIZING_N | DebugJS.STATE_RESIZING_W;
      self.bodyElm.style.cursor = 'nwse-resize';
    }

    self.resizeNE.onmousedown = function(e) {
      var self= Debug;
      if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
      self.startResize(e);
      self.status |= DebugJS.STATE_RESIZING_N | DebugJS.STATE_RESIZING_E;
      self.bodyElm.style.cursor = 'nesw-resize';
    }

    self.resizeSE.onmousedown = function(e) {
      var self= Debug;
      if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
      self.startResize(e);
      self.status |= DebugJS.STATE_RESIZING_S | DebugJS.STATE_RESIZING_E;
      self.bodyElm.style.cursor = 'nwse-resize';
    }

    self.resizeSW.onmousedown = function(e) {
      var self= Debug;
      if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
      self.startResize(e);
      self.status |= DebugJS.STATE_RESIZING_S | DebugJS.STATE_RESIZING_W;
      self.bodyElm.style.cursor = 'nesw-resize';
    }
  },

  startResize: function(e) {
    var self= Debug;
    e = (e) || window.event;
    self.status |= DebugJS.STATE_RESIZING;
    self.clickedPosX = e.clientX;
    self.clickedPosY = e.clientY;
    self.orgOffsetTop = self.debugWindow.offsetTop;
    self.orgOffsetLeft = self.debugWindow.offsetLeft;
    self.resizeOrgWidth = self.debugWindow.offsetWidth;
    self.resizeOrgHeight = self.debugWindow.offsetHeight;
  },

  resize: function(e) {
    var self= Debug;
    var moveX, moveY, t, l, w, h;
    e = (e) || window.event;

    if (self.status & DebugJS.STATE_RESIZING_N) {
      moveY = self.clickedPosY - e.clientY;
      h = self.resizeOrgHeight + moveY;
      if (h < DebugJS.DEBUG_WIN_MIN_H) {
        h = DebugJS.DEBUG_WIN_MIN_H;
      } else {
        t = self.orgOffsetTop - moveY;
        self.debugWindow.style.top = t + 'px';
      }
      self.debugWindow.style.height = h + 'px';
      self.resizeMsgHeight();
    }

    if (self.status & DebugJS.STATE_RESIZING_W) {
      moveX = self.clickedPosX - e.clientX;
      w = self.resizeOrgWidth + moveX;
      if (w < DebugJS.DEBUG_WIN_MIN_W) {
        w = DebugJS.DEBUG_WIN_MIN_W;
      } else {
        l = self.orgOffsetLeft - moveX;
        self.debugWindow.style.left = l + 'px';
      }
      self.debugWindow.style.width = w + 'px';
    }

    if (self.status & DebugJS.STATE_RESIZING_E) {
      moveX = e.clientX - self.clickedPosX;
      w = self.resizeOrgWidth + moveX;
      if (w < DebugJS.DEBUG_WIN_MIN_W) w = DebugJS.DEBUG_WIN_MIN_W;
      self.debugWindow.style.width = w + 'px';
    }

    if (self.status & DebugJS.STATE_RESIZING_S) {
      moveY = e.clientY - self.clickedPosY;
      h = self.resizeOrgHeight + moveY;
      if (h < DebugJS.DEBUG_WIN_MIN_H) h = DebugJS.DEBUG_WIN_MIN_H;
      self.debugWindow.style.height = h + 'px';
      self.resizeMsgHeight();
    }
  },

  resizeMsgHeight: function() {
    var self= Debug;
    var adj = 5;
    var msgAreaHeight = self.debugWindow.offsetHeight - self.infoArea.offsetHeight - self.cmdArea.offsetHeight - adj;
    self.msgArea.style.height = msgAreaHeight + 'px';
  },

  toggleLogSuspend: function() {
    var self = Debug;
    if (self.status & DebugJS.STATE_LOG_SUSPENDING) {
      self.status &= ~DebugJS.STATE_LOG_SUSPENDING;
    } else {
      self.status |= DebugJS.STATE_LOG_SUSPENDING;
    }
    self.updateSuspendLogBtnArea();
  },

  toggleMeasureMode: function() {
    var self = Debug;
    if (self.status & DebugJS.STATE_MEASURE) {
      self.disableMeasureMode();
    } else {
      self.enableMeasureMode();
    }
  },

  enableMeasureMode: function() {
    var self = Debug;
    DebugJS.log.s('Screen Measure ON.');
    self.status |= DebugJS.STATE_MEASURE;
    self.updateMeasureBtnArea();
  },

  disableMeasureMode: function() {
    var self = Debug;
    self.stopMeasure();
    self.status &= ~DebugJS.STATE_MEASURE;
    DebugJS.log.s('Screen Measure OFF.');
    self.updateMeasureBtnArea();
  },

  toggleDraggable: function() {
    if (Debug.status & DebugJS.STATE_DRAGGABLE) {
      Debug.status &= ~DebugJS.STATE_DRAGGABLE;
      Debug.infoArea.style.cursor = 'auto';
      Debug.msgArea.style.cursor = 'auto';
    } else {
      Debug.status |= DebugJS.STATE_DRAGGABLE;
      Debug.infoArea.style.cursor = 'default';
      Debug.msgArea.style.cursor = 'default';
    }
    Debug.updatePinBtnArea();
  },

  startStopStopWatch: function() {
    if (Debug.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      // stop
      Debug.status &= ~DebugJS.STATE_STOPWATCH_RUNNING;
      Debug.updateSwBtnArea();
    } else {
      // start
      Debug.status |= DebugJS.STATE_STOPWATCH_RUNNING;
      Debug.swStartTime = (new Date()).getTime() - Debug.swElapsedTime;
      Debug.updateStopWatch();
      Debug.updateSwArea();
      Debug.updateSwBtnArea();
    }
  },

  updateStopWatch: function() {
    if (!(Debug.status & DebugJS.STATE_STOPWATCH_RUNNING)) return;
    var self = Debug;
    var swCurrentTime = (new Date()).getTime();
    self.swElapsedTime = swCurrentTime - self.swStartTime;
    self.swElapsedTimeDisp = DebugJS.getTimerStr(self.swElapsedTime);
  },

  resetStopwatch: function() {
    var self = Debug;
    self.swStartTime = (new Date()).getTime();
    self.swElapsedTimeDisp = DebugJS.getTimerStr(0);
    self.swElapsedTime = 0;
    self.updateSwArea();
  },

  getLog: function() {
    var self = Debug;
    var allBuf = self.msgBuf.getAll();
    var bufCnt = self.msgBuf.count();
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
    var self = Debug;
    switch (e.keyCode) {
      case 13: // Enter
        self.execCmd();
        break;

      case 27: // ESC
        if (self.status & DebugJS.STATE_MEASURE) {
          self.disableMeasureMode();
          return;
        }
        if (self.status & DebugJS.STATE_DRAGGING) {
          self.status &= ~DebugJS.STATE_DRAGGING;
        } else {
          self.hideDebugWindow();
        }
        break;

      case 38: // Up
        if (document.activeElement == self.cmdLine) {
          var cmds = self.cmdHistoryBuf.getAll();
          if (cmds.length == 0) return;
          if (cmds.length < self.cmdHistoryIdx) {
            self.cmdHistoryIdx = cmds.length;
          }
          if (self.cmdHistoryIdx == cmds.length) {
            self.cmdTmp = self.cmdLine.value;
          }
          if (self.cmdHistoryIdx > 0) {
            self.cmdHistoryIdx--;
          }
          self.cmdLine.value = cmds[self.cmdHistoryIdx];
        }
        break;

      case 40: // Down
        if (document.activeElement == self.cmdLine) {
          var cmds = self.cmdHistoryBuf.getAll();
          if (cmds.length == 0) return;
          if (self.cmdHistoryIdx < cmds.length) {
            self.cmdHistoryIdx++;
          }
          if (self.cmdHistoryIdx == cmds.length) {
            self.cmdLine.value =  self.cmdTmp;
          } else {
            self.cmdLine.value = cmds[self.cmdHistoryIdx];
          }
        }
        break;

      case 112: // F1
        if (self.status & DebugJS.STATE_DYNAMIC) {
          self.debugWindow.style.top = 0;
          self.debugWindow.style.left = 0;
          self.status &= ~DebugJS.STATE_DRAGGING;
        }
        break;

      case 113: // F2
        if (self.status & DebugJS.STATE_VISIBLE) {
          if (self.status & DebugJS.STATE_MEASURE) {
            self.disableMeasureMode();
          }
          self.hideDebugWindow();
        } else {
          self.showDebugWindow();
        }
        break;

      default:
        break;
    }
  },

  keyDownHandler: function(e) {
    var self = Debug;
    var metaKey = DebugJS.checkMetaKey(e);
    self.keyDownCode = e.keyCode + metaKey;
    self.updateKeyDownArea();
  
    self.keyPressCode = DebugJS.KEY_STATUS_DEFAULT;
    self.updateKeyPressArea();
  
    self.keyUpCode = DebugJS.KEY_STATUS_DEFAULT;
    self.updateKeyUpArea();
  },

  keyPressHandler: function(e) {
    var self = Debug;
    var metaKey = DebugJS.checkMetaKey(e);
    self.keyPressCode = e.keyCode + metaKey;
    self.updateKeyPressArea();
  },

  keyUpHandler: function(e) {
    var self = Debug;
    var metaKey = DebugJS.checkMetaKey(e);
    self.keyUpCode = e.keyCode + metaKey;
    self.updateKeyUpArea();
  },

  resizeHandler: function() {
    var self = Debug;
    self.updateWindowSizeArea();
    self.updateClientSizeArea();
    self.updateBodySizeArea();
  },

  scrollHandler: function() {
    var self = Debug;
    if (window.scrollX === undefined) {
      self.scrollPosX = document.documentElement.scrollLeft;
      self.scrollPosY = document.documentElement.scrollTop;
    } else {
      self.scrollPosX = window.scrollX;
      self.scrollPosY = window.scrollY;
    }
    self.updateScrollPosArea();
  },

  mousedownHandler: function(e) {
    var self = Debug;
    switch (e.button) {
      case 0:
        self.mouseClickL = DebugJS.COLOR_ACTIVE;
        if (self.status & DebugJS.STATE_MEASURE) {
          self.startMeasure(e);
        }
        break;
      case 1:
        self.mouseClickC = DebugJS.COLOR_ACTIVE;
        break;
      case 2:
        self.mouseClickR = DebugJS.COLOR_ACTIVE;
        break;
      default:
        break;
    }
    if (self.options.showMouseStatus) {
      self.updateMouseClickArea();
    }
  },

  mousemoveHandler: function(e) {
    var self = Debug;
    if (self.options.showMouseStatus) {
      self.mousePos = 'x=' + e.clientX + ',y=' + e.clientY;
      self.updateMousePositionArea();
    }

    if (self.options.showElement) {
      var elm = document.elementFromPoint(e.clientX, e.clientY);
      self.domElement = '&lt;' + elm.nodeName + '&gt;';
      self.updateElementArea();
    }

    if (self.status & DebugJS.STATE_DRAGGING) self.windowMove(e);
    if (self.status & DebugJS.STATE_RESIZING) self.resize(e);
    if (self.status & DebugJS.STATE_MEASURING) self.measure(e);
  },

  mouseupHandler: function(e) {
    var self = Debug;
    switch (e.button) {
      case 0:
        self.mouseClickL = DebugJS.COLOR_INACTIVE;
        if (self.status & DebugJS.STATE_MEASURING) {
          self.stopMeasure();
        }
        self.status &= ~DebugJS.STATE_DRAGGING;

        if (self.status & DebugJS.STATE_RESIZING) {
          self.status &= ~DebugJS.STATE_RESIZING_ALL;
          self.bodyElm.style.cursor = 'auto';
        }
        break;
      case 1:
        self.mouseClickC = DebugJS.COLOR_INACTIVE;
        break;
      case 2:
        self.mouseClickR = DebugJS.COLOR_INACTIVE;
        break;
      default:
        break;
    }
    if (self.options.showMouseStatus) {
      self.updateMouseClickArea();
    }
  },

  hideDebugWindow: function() {
    var self = Debug;
    if (!self.options.showCloseButton) return;
    self.msgAreaScrollX = self.msgArea.children[self.msgAreaId].scrollLeft;
    self.msgAreaScrollY = self.msgArea.children[self.msgAreaId].scrollTop;
    self.status &= ~DebugJS.STATE_DRAGGING;
    var styles = {};
    styles['#' + self.id] = {'display': 'none'};
    self.applyStyles(styles);
    self.status &= ~DebugJS.STATE_VISIBLE;
  },

  startMeasure: function(e) {
    var self = Debug;
    var rect = self.debugWindow.getBoundingClientRect();
    var resizeBoxSize = 3;
    var winX1 = rect.left;
    var winY1 = rect.top;
    var winX2 = winX1 + self.debugWindow.clientWidth + resizeBoxSize;
    var winY2 = winY1 + self.debugWindow.clientHeight + resizeBoxSize;

    if (((e.clientX >= winX1) && (e.clientX <= winX2)) && ((e.clientY >= winY1) && (e.clientY <= winY2))) {
      return;
    }

    self.status |= DebugJS.STATE_MEASURING;
    self.clickedPosX = e.clientX;
    self.clickedPosY = e.clientY;

    if (self.measureBox == null) {
      self.measureBox = document.createElement('div');
      self.measureBox.id = self.id + '-mbox';
      self.bodyElm.appendChild(self.measureBox);
      var styles = {};
      styles['#' + self.id + '-mbox'] = {'position': 'fixed'}
      wkStyle = styles['#' + self.id + '-mbox'];
      wkStyle['top'] = self.clickedPosY + 'px';
      wkStyle['left'] = self.clickedPosX + 'px';
      wkStyle['width'] = '0px';
      wkStyle['height'] = '0px';
      wkStyle['border'] = 'dotted 1px #333';
      wkStyle['background'] = 'rgba(0,0,0,0.1)';
      wkStyle['z-index'] = 0x7fffffff;
      self.applyStyles(styles);
    }
    self.savedFunc = self.bodyElm.onselectstart;
    self.bodyElm.onselectstart = function() {return false;};
  },

  measure: function(e) {
    var self = Debug;
    var moveX = e.clientX - self.clickedPosX;
    var moveY = e.clientY - self.clickedPosY;

    if (moveX < 0) {
      self.measureBox.style.left = e.clientX + 'px';
      moveX *= -1;
    }
    if (moveY < 0) {
      self.measureBox.style.top = e.clientY+ 'px';
      moveY *= -1;
    }
    self.measureBox.style.width = moveX + 'px';
    self.measureBox.style.height = moveY + 'px';

    var w = 210;
    var h = 40;
    var sizeY = (moveY / 2) - (h /2);
    var sizeX = (moveX / 2) - (w /2);
    var originY = 'top';
    var originX = 'left';
    if (moveX < w) {
      sizeX = 0;
      if ((moveY < h) || (moveY > self.clickedPosY)) {
        if (self.clickedPosY < h) {
          sizeY = moveY;
        } else {
          sizeY = h * (-1);
        }
      } else {
        sizeY = h * (-1);
      }
    }

    var endPointY = 'bottom';
    var endPointX = 'right';
    if (e.clientX < self.clickedPosX) {
      originX = 'right';
      endPointX = 'left';
    }
    if (e.clientY < self.clickedPosY) {
      originY = 'bottom';
      endPointY = 'top';
    }
    var size = '<span style="font-family:Consolas;font-size:32px;color:#fff;background:rgba(0,0,0,0.7);padding:1px 3px;white-space:pre;position:relative;top:' + sizeY + 'px;left:' + sizeX + 'px;">W=' + moveX + ' H=' + moveY + '</span>';
    var origin = '<span style="font-family:Consolas;font-size:12px;color:#fff;background:rgba(0,0,0,0.3);white-space:pre;position:absolute;' + originY + ':1px;' + originX + ':1px;padding:1px;">x=' + self.clickedPosX + ',y=' + self.clickedPosY + '</span>';
    //var endPoint = '<span style="font-family:Consolas;font-size:12px;color:#fff;background:rgba(0,0,0,0.3);white-space:pre;position:absolute;' + endPointY + ':1px;' + endPointX + ':1px;padding:1px;">x=' + e.clientX + ',y=' + e.clientY + '</span>';
    var endPoint = '';
    self.measureBox.innerHTML = origin + size + endPoint;
  },

  stopMeasure: function() {
    var self = Debug;
    if (self.measureBox != null) {
      self.bodyElm.removeChild(self.measureBox);
      self.measureBox = null;
    }
    self.bodyElm.onselectstart = self.savedFunc;
    self.status &= ~DebugJS.STATE_MEASURING;
  },

  showDebugWindow: function() {
    var self = Debug;
    var styles = {};
    styles['#' + self.id] = {'display': 'block'};
    self.applyStyles(styles);
    self.status |= DebugJS.STATE_VISIBLE;
    self.msgArea.children[self.msgAreaId].scrollTop = self.msgAreaScrollY;
    self.msgArea.children[self.msgAreaId].scrollLeft = self.msgAreaScrollX;
  },

  execCmd: function() {
    var self = Debug;
    if (document.activeElement != self.cmdLine) {
      return;
    }
    var cl = self.cmdLine.value;
    if (cl != '') {
      self.cmdHistoryBuf.add(cl);
    }
    self.cmdHistoryIdx = (self.cmdHistoryBuf.count() < self.cmdHistoryMax) ? self.cmdHistoryBuf.count() : self.cmdHistoryMax;
    self.cmdLine.value = '';
    DebugJS.log.s(cl);
    wkCL = cl.replace(/\s{2,}/g, ' ');
    var cmds = wkCL.match(/([^\s]{1,})\s(.*)/);
    var cmd = wkCL, args = '';
    if (cmds != null) {
      cmd = cmds[1];
      args = cmds[2]
    }
    var found = false;
    for (var i=0; i<self.CMD_TBL.length; i++) {
      if (cmd == self.CMD_TBL[i].cmd) {
        found = true;
        self.CMD_TBL[i].fnc(args, self.CMD_TBL[i]);
        break;
      }
    }

    if (!found) {
      found = self.cmdRadixConv(cl);
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
    var self = Debug;
    self.clearMessage();
  },

  cmdExit: function(args, tbl) {
    var self = Debug;
    self.clearMessage();
    self.hideDebugWindow();
  },

  cmdHelp: function(args, tbl) {
    var str = 'Available Commands:<br>';
    str += 'cls      Clear log message.<br>';
    str += 'exit     Close the debug window.<br>';
    str += 'p        Print object.<br>';
    str += 'help     Displays available command list.<br>';
    str += 'history  Displays command history.<br>';
    str += 'rgb      Convert RGB color values between HEX and DEC.<br>';
    str += 'time     Time test.<br>';
    str += 'v        Displays version info.<br>';
    DebugJS.log(str);
  },

  cmdHistory: function(args, tbl) {
    var self = Debug;
    var buf = self.cmdHistoryBuf.getAll();
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

  cmdRadixConv: function(val) {
    if (val.match(/^\-{0,1}[0-9]+$/)) {
      DebugJS.convDEC(val);
      return true;
    } else if (val.match(/^\-{0,1}0x[0-9A-Fa-f]+$/)) {
      DebugJS.convHEX(val.substr(2));
      return true;
    } else if (val.match(/^\-{0,1}0b[0-1]+$/)) {
      DebugJS.convBIN(val.substr(2));
      return true;
    } else {
      return false;
    }
  },

  cmdRGB: function(args, tbl) {
    if (args == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.convRGB(args);
    }
  },

  cmdTime: function(args, tbl) {
    if (args == '') {
      DebugJS.printUsage(tbl.usage);
    } else if (args == 'list') {
      DebugJS.timeList();
    } else {
      var a = args.match(/([^\s]{1,})\s(.*)/);
      if (a == null) {
        DebugJS.printUsage(tbl.usage);
      } else {
        switch (a[1]) {
          case 'start':
            DebugJS.timeStart(a[2]);
            break;
          case 'end':
            DebugJS.timeEnd(a[2]);
            break;
          default:
            DebugJS.printUsage(tbl.usage);
            break;
        }
      }
    }
  },

  cmdV: function(args, tbl) {
    var self = Debug;
    DebugJS.log('ver.' + self.v);
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

DebugJS.getDateTime = function(dt) {
  var yyyy = dt.getFullYear();
  var mm = dt.getMonth() + 1;
  var dd = dt.getDate();
  var hh = dt.getHours();
  var mi = dt.getMinutes();
  var ss = dt.getSeconds();
  var ms = dt.getMilliseconds();
  var wd = dt.getDay();

  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;
  if (hh < 10) hh = '0' + hh;
  if (mi < 10) mi = '0' + mi;
  if (ss < 10) ss = '0' + ss;
  if (ms < 10) {ms = '00' + ms;}
  else if (ms < 100) {ms = '0' + ms;}

  var dateTime = {'yyyy': yyyy, 'mm': mm, 'dd': dd, 'hh': hh, 'mi': mi, 'ss': ss, 'ms': ms, 'wday': wd};
  return dateTime;
}

DebugJS.getCurrentDateTime = function() {
  return DebugJS.getDateTime(new Date());
}

DebugJS.time = function() {
  var d = DebugJS.getCurrentDateTime();
  var t = d.hh + ':' + d.mi + ':' + d.ss + '.' + d.ms;
  return t;
}

DebugJS.getTimerStr = function(swPassedTimeMsec) {
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
  if (passedSec < 10) passedSec = '0' + passedSec;
  if (passedMsec < 10) passedMsec = '00' + passedMsec;
  else if (passedMsec < 100) passedMsec = '0' + passedMsec;

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

DebugJS.OBJDUMP_MAX = 1000;
DebugJS.objDump = function(obj) {
  var arg = {'lv': 0, 'cnt': 0, 'dump': ''};
  if (typeof obj === 'function') {
    arg.dump += '<span style="color:#4c4;">function()</span><br>';
  }
  var ret = DebugJS._objDump(obj, arg);
  if (ret.cnt >= DebugJS.OBJDUMP_MAX) {
    log.w('The object is too large. (' + ret.cnt + ')');
  }
  return ret.dump;
}

DebugJS._objDump = function(obj, arg) {
  if (arg.cnt >= DebugJS.OBJDUMP_MAX) {
    if ((typeof obj !== 'function') || (Object.keys(obj).length > 0)) {
      arg.dump += '<span style="color:#aaa;">...</span><br>'; arg.cnt++;
    }
    return arg;
  }
  var indent = '';
  for (var i=0; i<arg.lv; i++) {
    indent += ' ';
  }
  if (obj instanceof Array) {
    arg.dump += '<span style="color:#c08;">[Array]</span><br>'; arg.cnt++;
    for (var i in obj) {
      arg.lv++; indent += ' ';
      arg.dump += indent + '[' + i + '] ';
      arg = DebugJS._objDump(obj[i], arg);
      arg.lv--; indent = indent.replace(' ', '');
    }
  } else if (obj instanceof Object) {
    arg.cnt++;
    if (typeof obj !== 'function') {
      arg.dump += '<span style="color:#79f;">[Object]</span> {<br>';
    }
    indent += ' ';
    for (var key in obj) {
      if (typeof obj[key] === 'function') {
        arg.dump += indent + '<span style="color:#4c4;">function</span> ' + key + '()'; arg.cnt++;
        if (Object.keys(obj[key]).length > 0) {
          arg.dump += ' {';
        }
        arg.dump += '<br>';
      } else {
        arg.dump += indent + key + ': ';
      }
      arg.lv++;
      arg = DebugJS._objDump(obj[key], arg);
      arg.lv--;
      if (typeof obj[key] === 'function') {
        if (Object.keys(obj[key]).length > 0) {
          arg.dump += indent + '}<br>';
        }
      }
    }
    indent = indent.replace(' ', '');
    if (typeof obj !== 'function') {
      arg.dump += indent + '}<br>';
    }
  } else if (obj === null) {
    arg.dump += '<span style="color:#ccc;">null</span>' + '<br>'; arg.cnt++;
  } else if (obj === undefined) {
    arg.dump += '<span style="color:#ccc;">undefined</span>' + '<br>'; arg.cnt++;
  } else if (typeof obj === 'string') {
    var str = obj.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    arg.dump += '"' + str + '"<br>'; arg.cnt++;
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

DebugJS.convHEX = function(v16) {
  var v10 = parseInt(v16, 16).toString(10);
  var v2 = parseInt(v16, 16).toString(2);
  var res = '<br>';
  res += 'HEX ' + v16 + '<br>';
  res += 'DEC ' + v10 + '<br>';
  res += 'BIN ' + v2 + '<br>';
  DebugJS.log(res);
}

DebugJS.convDEC = function(v10) {
  var v2 = parseInt(v10).toString(2);
  var v16 = parseInt(v10).toString(16);
  var res = '<br>';
  res += 'DEC ' + v10 + '<br>';
  res += 'HEX ' + v16 + '<br>';
  res += 'BIN ' + v2 + '<br>';
  DebugJS.log(res);
}

DebugJS.convBIN = function(v2) {
  var v10 = parseInt(v2, 2).toString(10);
  var v16 = parseInt(v2, 2).toString(16);
  var res = '<br>';
  res += 'BIN ' + v2 + '<br>';
  res += 'DEC ' + v10 + '<br>';
  res += 'HEX ' + v16 + '<br>';
  DebugJS.log(res);
}

DebugJS.timeStart = function(timerName) {
  Debug.timers[timerName] = {};
  Debug.timers[timerName].start = (new Date());
  DebugJS.log(timerName + ': timer started');
}

DebugJS.timeEnd = function(timerName) {
  if (!Debug.timers[timerName]) {
    DebugJS.log.w(timerName + ': timer undefined');
    return;
  }
  Debug.timers[timerName].end = new Date();
  var delta = Debug.timers[timerName].end.getTime() - Debug.timers[timerName].start.getTime();
  var elapsed = DebugJS.getTimerStr(delta);
  DebugJS.log(timerName + ': ' + elapsed);
}

DebugJS.timeList = function() {
  var l = 'Time List:<br>';
  if (Object.keys(Debug.timers).length == 0) {
    l += '<span style="color:#ccc;">no timers</span>';
  } else {
    for (var key in Debug.timers) {
      l += key + '<br>';
    }
  }
  DebugJS.log(l);
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
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  var err = new Error();
  DebugJS.log(err.stack);
}

timeStart = function(timerName) {
  DebugJS.timeStart(timerName);
}

timeEnd = function(timerName) {
  DebugJS.timeEnd(timerName);
}

var Debug = new DebugJS();

if(DebugJS.CATCH_ALL_ERRORS){window.onerror=function (msg,file,line,col,err){log.e(msg+' '+file+'('+line+':'+col+')');};}

if(DebugJS.UNIFY_CONSOLE){
console.log=function(x){log(x);}
console.info=function(x){log.i(x);}
console.warn=function(x){log.w(x);}
console.error=function(x){log.e(x);}
console.time=function(x){timeStart(x);}
console.timeEnd=function(x){timeEnd(x);}
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
timeStart=function(x){};
timeEnd=function(x){};
}
