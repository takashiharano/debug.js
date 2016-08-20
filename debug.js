/*!
 * debug.js
 * Copyright 2016 Takashi Harano
 * Released under the MIT license
 * http://debugjs.net/
 */
var DebugJS = function() {
  this.v = '201608201646';

  this.DEFAULT_OPTIONS = {
    'visible': false,
    'visibleKey': 113,
    'lines': 18,
    'bufsize': 100,
    'width': 500,
    'zoom': 1,
    'position': 'se',
    'posAdjX': 20,
    'posAdjY': 20,
    'fontSize': 12,
    'fontFamily': 'Consolas, monospace',
    'fontColor': '#fff',
    'logColorE': '#e55',
    'logColorW': '#fe0',
    'logColorI': '#8ff',
    'logColorD': '#ccc',
    'logColorS': '#fff',
    'clockColor': '#8f0',
    'timerColor': '#8ff',
    'sysInfoColor': '#ddd',
    'btnColor': '#6cf',
    'btnHoverColor': '#8ef',
    'promptColor': '#0cf',
    'bgColor': '0,0,0',
    'bgOpacity': '0.7',
    'border': 'solid 1px #888',
    'showLineNums': true,
    'showTimeStamp': true,
    'resizable': true,
    'togglableShowHide': true,
    'useClock': true,
    'useClearButton': true,
    'useSuspendLogButton': true,
    'usePinButton': true,
    'useWindowControlButton': true,
    'useStopWatch': true,
    'useWindowSizeInfo': true,
    'useMouseStatusInfo': true,
    'useKeyStatusInfo': true,
    'useLed': true,
    'useScreenMeasure': true,
    'useElementInspection': true,
    'useTextChecker': true,
    'useScriptEditor': true,
    'useCommandLine': true,
    'disableAllFeatures': false,
    'target': null
  };

  this.DEFAULT_ELM_ID = '_debug_';
  this.id = null;
  this.bodyEl = null;
  this.styleEl = null;
  this.debugWindow = null;
  this.windowBody = null;
  this.headPanel = null;
  this.infoPanel = null;
  this.clockPanel = null;
  this.measureBtnPanel = null;
  this.measureBox = null;
  this.elmInspectionBtnPanel = null;
  this.elmInspectionPanel = null;
  this.prevElm = null;
  this.prevElmStyle = {};
  this.textCheckerBtnPanel = null;
  this.textCheckerPanel = null;
  this.textCheck = null;
  this.textCheckFontSizeRange = null;
  this.textCheckFontSizeInput = null;
  this.textCheckFontWeightRange = null;
  this.textCheckFontWeightLabel = null;
  this.textCheckerInputFgRGB = null;
  this.textCheckerRangeFgR = null;
  this.textCheckerRangeFgG = null;
  this.textCheckerRangeFgB = null;
  this.textCheckerLabelFgR = null;
  this.textCheckerLabelFgG = null;
  this.textCheckerLabelFgB = null;
  this.textCheckerInputBgRGB = null;
  this.textCheckerRangeBgR = null;
  this.textCheckerRangeBgG = null;
  this.textCheckerRangeBgB = null;
  this.textCheckerLabelBgR = null;
  this.textCheckerLabelBgG = null;
  this.textCheckerLabelBgB = null;
  this.scriptBtnPanel = null;
  this.scriptPanel = null;
  this.scriptEditor = null;
  this.scriptBuf = '';
  this.swBtnPanel = null;
  this.swPanel = null;
  this.swStartTime = 0;
  this.swElapsedTime = 0;
  this.swElapsedTimeDisp = '00:00:00.000';
  this.clrBtnPanel = null;
  this.suspendLogBtnPanel = null;
  this.pinBtnPanel = null;
  this.winCtrlBtnPanel = null;
  this.closeBtnPanel = null;
  this.mousePositionPanel = null;
  this.mousePos = 'x=-,y=-';
  this.mouseClickPanel = null;
  this.mouseClickL = DebugJS.COLOR_INACTIVE;
  this.mouseClickC = DebugJS.COLOR_INACTIVE;
  this.mouseClickR = DebugJS.COLOR_INACTIVE;
  this.screenSizePanel = null;
  this.windowSizePanel = null;
  this.clientSizePanel = null;
  this.bodySizePanel = null;
  this.scrollPosPanel = null;
  this.scrollPosX = 0;
  this.scrollPosY = 0;
  this.keyDownPanel = null;
  this.keyPressPanel = null;
  this.keyUpPanel = null;
  this.keyDownCode = DebugJS.KEY_STATUS_DEFAULT;
  this.keyPressCode = DebugJS.KEY_STATUS_DEFAULT;
  this.keyUpCode = DebugJS.KEY_STATUS_DEFAULT;
  this.ledPanel = null;
  this.led = 0;
  this.mainPanel = null;
  this.msgPanel = null;
  this.msgPanelScrollX = 0;
  this.msgPanelScrollY = 0;
  this.cmdPanel = null;
  this.cmdLine = null;
  this.cmdHistoryBuf = null;
  this.CMD_HISTORY_MAX = 10;
  this.cmdHistoryIdx = self.CMD_HISTORY_MAX;
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
  this.initWidth = 0;
  this.initHeight = 0;
  this.resizeOrgWidth = 0;
  this.resizeOrgHeight = 0;
  this.orgOffsetTop = 0;
  this.orgOffsetLeft = 0;
  this.clickedPosX = 0;
  this.clickedPosY = 0;
  this.prevOffsetTop = 0;
  this.prevOffsetLeft = 0;
  this.savedFunc = null;
  this.status = 0;
  this.msgBuf = new DebugJS.RingBuffer(this.DEFAULT_OPTIONS.bufsize);
  this.CMD_TBL = [
    {'cmd': 'cls', 'fnc': this.cmdCls, 'desc': 'Clear log message.'},
    {'cmd': 'elements', 'fnc': this.cmdElements, 'desc': 'Count elements by tag name.'},
    {'cmd': 'exit', 'fnc': this.cmdExit, 'desc': 'Close the debug window and clear all status.'},
    {'cmd': 'get', 'fnc': this.cmdGet, 'desc': 'Send an HTTP request by GET method.', 'usage': 'get &lt;url&gt;'},
    {'cmd': 'help', 'fnc': this.cmdHelp, 'desc': 'Displays available command list.'},
    {'cmd': 'history', 'fnc': this.cmdHistory, 'desc': 'Displays command history.'},
    {'cmd': 'json', 'fnc': this.cmdJson, 'desc': 'Parse one-line JSON.', 'usage': 'json [-p] &lt;one-line json&gt;'},
    {'cmd': 'jquery', 'fnc': this.cmdJquery, 'desc': 'Displays what version of jQuery is loaded.'},
    {'cmd': 'p', 'fnc': this.cmdP, 'desc': 'Print JavaScript Objects.', 'usage': 'p &lt;object&gt;'},
    {'cmd': 'post', 'fnc': this.cmdPost, 'desc': 'Send an HTTP request by POST method.', 'usage': 'post &lt;url&gt;'},
    {'cmd': 'random', 'fnc': this.cmdRandom, 'desc': 'Generate a rondom number / string.', 'usage': 'random [-d|-s] [min] [max]'},
    {'cmd': 'rgb', 'fnc': this.cmdRGB, 'desc': 'Convert RGB color values between HEX and DEC.', 'usage': 'rgb &lt;color value&gt;(#<span style="color:' + DebugJS.COLOR_R + '">R</span><span style="color:' + DebugJS.COLOR_G + '">G</span><span style="color:' + DebugJS.COLOR_B + '">B</span> or <span style="color:' + DebugJS.COLOR_R + '">R</span> <span style="color:' + DebugJS.COLOR_G + '">G</span> <span style="color:' + DebugJS.COLOR_B + '">B</span>)'},
    {'cmd': 'time', 'fnc': this.cmdTime, 'desc': 'Time test.', 'usage': 'time &lt;start/split/end/list&gt; [&lt;timer name&gt;]'},
    {'cmd': 'v', 'fnc': this.cmdV, 'desc': 'Displays version info.'}
  ];
  this.options = null;
  this.setupDefaultOptions();
};
DebugJS.ENABLE = true;
DebugJS.CATCH_ALL_ERRORS = true;
DebugJS.UNIFY_CONSOLE = false;

DebugJS.STATE_INITIALIZED = 0x1;
DebugJS.STATE_VISIBLE = 0x2;
DebugJS.STATE_DYNAMIC = 0x4;
DebugJS.STATE_SHOW_CLOCK = 0x8;
DebugJS.STATE_STOPWATCH_RUNNING = 0x10;
DebugJS.STATE_DRAGGABLE = 0x20;
DebugJS.STATE_DRAGGING = 0x40;
DebugJS.STATE_RESIZABLE = 0x100;
DebugJS.STATE_RESIZING = 0x200;
DebugJS.STATE_RESIZING_N = 0x400;
DebugJS.STATE_RESIZING_E = 0x800;
DebugJS.STATE_RESIZING_S = 0x1000;
DebugJS.STATE_RESIZING_W = 0x2000;
DebugJS.STATE_RESIZING_ALL = DebugJS.STATE_RESIZING | DebugJS.STATE_RESIZING_N | DebugJS.STATE_RESIZING_E | DebugJS.STATE_RESIZING_S | DebugJS.STATE_RESIZING_W;
DebugJS.STATE_WINDOW_SIZE_EXPANDED = 0x4000;
DebugJS.STATE_MEASURE = 0x10000;
DebugJS.STATE_MEASURING = 0x20000;
DebugJS.STATE_ELEMENT_INSPECTING = 0x40000;
DebugJS.STATE_TEXT_CHECKING = 0x80000;
DebugJS.STATE_SCRIPT = 0x100000;
DebugJS.STATE_LOG_SUSPENDING = 0x800000;
DebugJS.STATE_AUTO_POSITION_ADJUST = 0x1000000;

DebugJS.LOG_TYPE_STANDARD = 0;
DebugJS.LOG_TYPE_ERROR = 1;
DebugJS.LOG_TYPE_WARNING = 2;
DebugJS.LOG_TYPE_INFO = 3;
DebugJS.LOG_TYPE_DEBUG = 4;
DebugJS.LOG_TYPE_SYSTEM = 5;
DebugJS.LOG_TYPE_MULTILINE = 6;
DebugJS.DEBUG_WIN_MIN_W = 292;
DebugJS.DEBUG_WIN_MIN_H = 155;
DebugJS.WINDOW_SHADOW = 10;
DebugJS.WINDOW_BORDER = 1;
DebugJS.WINDOW_PADDING = 1;
DebugJS.WINDOW_ADJUST = ((DebugJS.WINDOW_BORDER * 2) + (DebugJS.WINDOW_PADDING * 2));
DebugJS.OVERLAY_HALF_HEIGHT = 72; //%
DebugJS.CMD_LINE_PADDING = 3;
DebugJS.COLOR_ACTIVE = '#fff';
DebugJS.COLOR_INACTIVE = '#999';
DebugJS.MEASURE_BUTTON_COLOR = '#6cf';
DebugJS.DOM_BUTTON_COLOR = '#f66';
DebugJS.TXT_BUTTON_COLOR = '#ff0';
DebugJS.JS_BUTTON_COLOR = '#6df';
DebugJS.PIN_BUTTON_COLOR = '#fa0';
DebugJS.LOG_SUSPEND_BUTTON_COLOR = '#d00';
DebugJS.COLOR_R = '#f66';
DebugJS.COLOR_G = '#6f6';
DebugJS.COLOR_B = '#6bf';
DebugJS.KEY_STATUS_DEFAULT = '- <span style="color:' + DebugJS.COLOR_INACTIVE + ';">SCA</span>';
DebugJS.WDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
DebugJS.DEFAULT_TIMER_NAME = 'timer0';
DebugJS.IND_BIT_7 = 0x80;
DebugJS.IND_BIT_6 = 0x40;
DebugJS.IND_BIT_5 = 0x20;
DebugJS.IND_BIT_4 = 0x10;
DebugJS.IND_BIT_3 = 0x8;
DebugJS.IND_BIT_2 = 0x4;
DebugJS.IND_BIT_1 = 0x2;
DebugJS.IND_BIT_0 = 0x1;
DebugJS.IND_BIT_7_COLOR = '#ddd';
DebugJS.IND_BIT_6_COLOR = '#f0f';
DebugJS.IND_BIT_5_COLOR = '#f66';
DebugJS.IND_BIT_4_COLOR = '#f80';
DebugJS.IND_BIT_3_COLOR = '#ee0';
DebugJS.IND_BIT_2_COLOR = '#6f6';
DebugJS.IND_BIT_1_COLOR = '#0ff';
DebugJS.IND_BIT_0_COLOR = '#4cf';
DebugJS.IND_COLOR_INACTIVE = '#777';
DebugJS.RANDOM_TYPE_NUM = '-d';
DebugJS.RANDOM_TYPE_STR = '-s';
DebugJS.FEATURES = [
  'togglableShowHide',
  'useClock',
  'useClearButton',
  'useSuspendLogButton',
  'usePinButton',
  'useWindowControlButton',
  'useStopWatch',
  'useWindowSizeInfo',
  'useMouseStatusInfo',
  'useKeyStatusInfo',
  'useLed',
  'useScreenMeasure',
  'useElementInspection',
  'useTextChecker',
  'useScriptEditor',
  'useCommandLine'
];

dbg = function() {};
dbg.el = null;

DebugJS.prototype = {
  init: function(options) {
    if (!DebugJS.ENABLE) {return false;}
    var self = Debug;
    self.bodyEl = document.body;
    if (!self.bodyEl) {return false;}

    if (self.status & DebugJS.STATE_DYNAMIC) {
      if (self.debugWindow != null) {
        for (var i = self.debugWindow.childNodes.length - 1; i >= 0; i--) {
          self.debugWindow.removeChild(self.debugWindow.childNodes[i]);
        }
        self.bodyEl.removeChild(self.debugWindow);
      }
    }

    self.status = 0;

    self.setupDefaultOptions();
    if (options) {
      for (var key1 in options) {
        for (var key2 in self.options) {
          if (key1 == key2) {
            self.options[key1] = options[key1];
            if ((key1 == 'disableAllFeatures') && (options[key1])) {
              self.disableAllFeatures();
            }
            break;
          }
        }
      }
    }
    if (self.options.zoom != 1.0) {
      self.options.fontSize = self.options.fontSize * self.options.zoom;
      self.options.width = self.options.width * self.options.zoom;
    }

    self.initStatus(self.options);

    // Debug Window
    if (self.options.target == null) {
      self.id = self.DEFAULT_ELM_ID;
      self.debugWindow = document.createElement('div');
      self.debugWindow.id = self.id;
      self.bodyEl.appendChild(self.debugWindow);
    } else {
      self.id = options.target;
      self.debugWindow = document.getElementById(self.id);
    }

    // Buffer
    if ((!self.msgBuf) || ((self.msgBuf) && (self.msgBuf.getSize() != self.options.bufsize))) {
      self.msgBuf = new DebugJS.RingBuffer(self.options.bufsize);
    }

    self.createPanels();

    // Resize
    if (self.status & DebugJS.STATE_RESIZABLE) {
      if (self.status & DebugJS.STATE_DYNAMIC) {
        self.resizeN = document.createElement('div');
        self.resizeN.className = self.id + '-resize-side';
        self.resizeN.style.top = '-3px';
        self.resizeN.style.left = '0';
        self.resizeN.style.width = '100%';
        self.resizeN.style.height = '6px';
        self.resizeN.style.cursor = 'ns-resize';
        self.resizeN.onmousedown = function(e) {
          var self = Debug;
          if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
          self.startResize(e);
          self.status |= DebugJS.STATE_RESIZING_N;
          self.bodyEl.style.cursor = 'ns-resize';
        };
        self.debugWindow.appendChild(self.resizeN);
      }

      self.resizeE = document.createElement('div');
      self.resizeE.className = self.id + '-resize-side';
      self.resizeE.style.top = '0';
      self.resizeE.style.right = '-3px';
      self.resizeE.style.width = '6px';
      self.resizeE.style.height = '100%';
      self.resizeE.style.cursor = 'ew-resize';
      self.resizeE.onmousedown = function(e) {
        var self = Debug;
        if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
        self.startResize(e);
        self.status |= DebugJS.STATE_RESIZING_E;
        self.bodyEl.style.cursor = 'ew-resize';
      };
      self.debugWindow.appendChild(self.resizeE);

      self.resizeS = document.createElement('div');
      self.resizeS.className = self.id + '-resize-side';
      self.resizeS.style.bottom = '-3px';
      self.resizeS.style.left = '0';
      self.resizeS.style.width = '100%';
      self.resizeS.style.height = '6px';
      self.resizeS.style.cursor = 'ns-resize';
      self.resizeS.onmousedown = function(e) {
        var self = Debug;
        if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
        self.startResize(e);
        self.status |= DebugJS.STATE_RESIZING_S;
        self.bodyEl.style.cursor = 'ns-resize';
      };
      self.debugWindow.appendChild(self.resizeS);

      if (self.status & DebugJS.STATE_DYNAMIC) {
        self.resizeW = document.createElement('div');
        self.resizeW.className = self.id + '-resize-side';
        self.resizeW.style.top = '0';
        self.resizeW.style.left = '-3px';
        self.resizeW.style.width = '6px';
        self.resizeW.style.height = '100%';
        self.resizeW.style.cursor = 'ew-resize';
        self.resizeW.onmousedown = function(e) {
          var self = Debug;
          if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
          self.startResize(e);
          self.status |= DebugJS.STATE_RESIZING_W;
          self.bodyEl.style.cursor = 'ew-resize';
        };
        self.debugWindow.appendChild(self.resizeW);

        self.resizeNW = document.createElement('div');
        self.resizeNW.className = self.id + '-resize-corner';
        self.resizeNW.style.top = '-3px';
        self.resizeNW.style.left = '-3px';
        self.resizeNW.style.cursor = 'nwse-resize';
        self.resizeNW.onmousedown = function(e) {
          var self = Debug;
          if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
          self.startResize(e);
          self.status |= DebugJS.STATE_RESIZING_N | DebugJS.STATE_RESIZING_W;
          self.bodyEl.style.cursor = 'nwse-resize';
        };
        self.debugWindow.appendChild(self.resizeNW);

        self.resizeNE = document.createElement('div');
        self.resizeNE.className = self.id + '-resize-corner';
        self.resizeNE.style.top = '-3px';
        self.resizeNE.style.right = '-3px';
        self.resizeNE.style.cursor = 'nesw-resize';
        self.resizeNE.onmousedown = function(e) {
          var self = Debug;
          if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
          self.startResize(e);
          self.status |= DebugJS.STATE_RESIZING_N | DebugJS.STATE_RESIZING_E;
          self.bodyEl.style.cursor = 'nesw-resize';
        };
        self.debugWindow.appendChild(self.resizeNE);
      }

      self.resizeSE = document.createElement('div');
      self.resizeSE.className = self.id + '-resize-corner';
      self.resizeSE.style.bottom = '-3px';
      self.resizeSE.style.right = '-3px';
      self.resizeSE.style.cursor = 'nwse-resize';
      self.resizeSE.onmousedown = function(e) {
        var self = Debug;
        if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
        self.startResize(e);
        self.status |= DebugJS.STATE_RESIZING_S | DebugJS.STATE_RESIZING_E;
        self.bodyEl.style.cursor = 'nwse-resize';
      };
      self.debugWindow.appendChild(self.resizeSE);

      if (self.status & DebugJS.STATE_DYNAMIC) {
        self.resizeSW = document.createElement('div');
        self.resizeSW.className = self.id + '-resize-corner';
        self.resizeSW.style.bottom = '-3px';
        self.resizeSW.style.left = '-3px';
        self.resizeSW.style.cursor = 'nesw-resize';
        self.resizeSW.onmousedown = function(e) {
          var self = Debug;
          if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
          self.startResize(e);
          self.status |= DebugJS.STATE_RESIZING_S | DebugJS.STATE_RESIZING_W;
          self.bodyEl.style.cursor = 'nesw-resize';
        };
        self.debugWindow.appendChild(self.resizeSW);
      }
    }

    var styles = {};
    styles['#' + self.id] = {
      'letter-spacing': '0'
    };

    styles['#' + self.id + ' td'] = {
      'width': 'initial',
      'padding': '0 3px',
      'border': 'initial',
      'background': 'initial',
      'color': self.options.fontColor,
      'font-size': self.options.fontSize + 'px',
      'font-family': self.options.fontFamily
    };

    styles['#' + self.id + ' pre'] = {
      'margin': '0',
      'color': self.options.fontColor,
      'font-family': self.options.fontFamily,
      'white-space': 'pre-wrap',
      'word-break': 'break-all',
      'overflow': 'visible'
    };

    styles['.' + self.id + '-btn'] = {
      'color': self.options.btnColor,
      'text-decoration': 'none'
    };

    styles['.' + self.id + '-btn:hover'] = {
      'color': self.options.btnHoverColor,
      'text-decoration': 'none',
      'text-shadow': '0 0 3px',
      'cursor': 'pointer'
    };

    styles['.' + self.id + '-sys-info'] = {
      'display': 'inline-block',
      'margin-right': '10px',
      'color': self.options.sysInfoColor
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

    var overlayPanelBorder = 1;
    var overlayPanelPadding = 2;
    styles['.' + self.id + '-overlay-panel'] = {
      'position': 'absolute',
      'top': (self.options.fontSize + DebugJS.WINDOW_ADJUST) + 'px',
      'left': '1px',
      'width': 'calc(100% - ' + (DebugJS.WINDOW_SHADOW + DebugJS.WINDOW_ADJUST - ((overlayPanelPadding * 2) + (overlayPanelBorder * 2))) + 'px)',
      'height': 'calc(100% - ' + ((self.options.fontSize + DebugJS.WINDOW_ADJUST) + DebugJS.WINDOW_SHADOW + self.options.fontSize + 10 - (overlayPanelPadding * 2)) + 'px)',
      'padding': overlayPanelPadding + 'px',
      'border': 'solid ' + overlayPanelBorder + 'px #333',
      'background': 'rgba(0,0,0,0.6)',
      'overflow': 'auto'
    };

    styles['.' + self.id + '-overlay-panel-half'] = {
      'position': 'relative',
      'top': '1px',
      'left': '1px',
      'width': 'calc(100% - ' + (DebugJS.WINDOW_SHADOW + 2) + 'px)',
      'height': 'calc(' + DebugJS.OVERLAY_HALF_HEIGHT + '% - ' + DebugJS.WINDOW_SHADOW + 'px)',
      'padding': '4px',
      'border': 'solid 1px #333',
      'background': 'rgba(0,0,0,0.7)'
    };

    styles['.' + self.id + '-txt-text'] = {
      'border': 'none !important',
      'border-bottom': 'solid 1px #888 !important',
      'border-radius': '0 !important',
      'outline': 'none !important',
      'background': 'transparent !important',
      'color': self.options.fontColor + ' !important',
      'font-size': self.options.fontSize + 'px !important',
      'font-family': self.options.fontFamily + ' !important'
    };

    styles['.' + self.id + '-txt-range'] = {
      'width': (256 * self.options.zoom) + 'px',
      'height': (15 * self.options.zoom) + 'px',
      'padding': '0'
    };

    self.applyStyles(styles);

    self.debugWindow.style.display = 'block';
    self.debugWindow.style.position = 'relative';
    self.debugWindow.style.padding = DebugJS.WINDOW_BORDER + 'px';
    self.debugWindow.style.lineHeight = '1em';
    self.debugWindow.style.boxSizing = 'content-box';
    self.debugWindow.style.border = self.options.border;
    self.debugWindow.style.background = 'rgba(' + self.options.bgColor + ',' + self.options.bgOpacity + ')';
    self.debugWindow.style.color = self.options.fontColor;
    self.debugWindow.style.fontSize = self.options.fontSize + 'px',
    self.debugWindow.style.fontFamily = self.options.fontFamily;

    self.initDebugWindow();
    self.setupEventHandler();

    if (self.status & DebugJS.STATE_DYNAMIC) {
      self.debugWindow.style.position = 'fixed';
      self.debugWindow.style.zIndex = 0x7fffffff;
      self.debugWindow.style.width = self.options.width + 'px';
      self.debugWindow.style.boxShadow = DebugJS.WINDOW_SHADOW + 'px ' + DebugJS.WINDOW_SHADOW + 'px 10px rgba(0,0,0,.3)';

      self.setupMove();

      // move to initial window position
      self.initWidth = self.debugWindow.offsetWidth;
      self.initHeight = self.debugWindow.offsetHeight;
      self.resetDebugWindow();

      if (!(self.status & DebugJS.STATE_VISIBLE)) {
        self.debugWindow.style.display = 'none';
      }
    } else {
      self.initWidth = self.debugWindow.offsetWidth - DebugJS.WINDOW_ADJUST;
      self.initHeight = self.debugWindow.offsetHeight - DebugJS.WINDOW_ADJUST;
    }
    self.status |= DebugJS.STATE_INITIALIZED;
    self.printMessage();
    return true;
  },

  setupDefaultOptions: function() {
    this.options = {};
    for (var key in this.DEFAULT_OPTIONS) {
      this.options[key] = this.DEFAULT_OPTIONS[key];
    }
  },

  setupEventHandler: function() {
    var self = Debug;

    if (!self.isAllFeaturesDisabled()) {
      window.addEventListener('keydown', self.keyhandler, true);
    }

    if ((self.status & DebugJS.STATE_DRAGGABLE) || (self.status & DebugJS.STATE_RESIZABLE) || (self.options.useMouseStatusInfo) || (self.options.useScreenMeasure)) {
      window.addEventListener('mousedown', self.mousedownHandler, true);
      window.addEventListener('mousemove', self.mousemoveHandler, true);
      window.addEventListener('mouseup', self.mouseupHandler, true);
    }

    if (self.options.useWindowSizeInfo) {
      window.addEventListener('resize', self.windowResizeHandler, true);
      self.windowResizeHandler();

      window.addEventListener('scroll', self.scrollHandler, true);
      self.scrollHandler();
    }

    if (self.options.useKeyStatusInfo) {
      window.addEventListener('keydown', self.keyDownHandler, true);
      self.updateKeyDownPanel();

      window.addEventListener('keypress', self.keyPressHandler, true);
      self.updateKeyPressPanel();

      window.addEventListener('keyup', self.keyUpHandler, true);
      self.updateKeyUpPanel();
    }
  },

  initStatus: function(options) {
    var self = Debug;
    if (self.options.target == null) {
      self.status |= DebugJS.STATE_DYNAMIC;
      self.status |= DebugJS.STATE_DRAGGABLE;
    }
    if ((self.options.visible) || (self.options.target != null)) {
      self.status |= DebugJS.STATE_VISIBLE;
    }
    if (self.options.resizable) self.status |= DebugJS.STATE_RESIZABLE;
    if (self.options.useClock) self.status |= DebugJS.STATE_SHOW_CLOCK;
  },

  disableAllFeatures: function() {
    var self = Debug;
    var len = DebugJS.FEATURES.length;
    for (var i = 0; i < len; i++) {
      self.options[DebugJS.FEATURES[i]] = false;
    }
  },

  isAllFeaturesDisabled: function() {
    var self = Debug;
    var len = DebugJS.FEATURES.length;
    for (var i = 0; i < len; i++) {
      if (self.options[DebugJS.FEATURES[i]]) return false;
    }
    return true;
  },

  createPanels: function() {
    var self = Debug;
    // Window Body
    self.windowBody = document.createElement('div');
    self.debugWindow.appendChild(self.windowBody);
    if (self.status & DebugJS.STATE_DRAGGABLE) self.windowBody.style.cursor = 'default';

    if (!self.isAllFeaturesDisabled()) {
      // Head Panel
      self.headPanel = document.createElement('div');
      self.headPanel.style.padding = '2px';
      self.windowBody.appendChild(self.headPanel);

      // Info Panel
      self.infoPanel = document.createElement('div');
      self.infoPanel.style.padding = '0 2px 4px 2px';
      self.windowBody.appendChild(self.infoPanel);
    }

    // Main
    self.mainPanel = document.createElement('div');
    self.mainPanel.style.height = self.options.lines + '.1em';
    self.windowBody.appendChild(self.mainPanel);

    // Log
    self.msgPanel = document.createElement('div');
    self.msgPanel.style.position = 'relative';
    self.msgPanel.style.width = '100%';
    self.msgPanel.style.height = '100%';
    self.msgPanel.style.padding = '0';
    self.msgPanel.style.overflow = 'auto';
    self.mainPanel.appendChild(self.msgPanel);

    if (self.isAllFeaturesDisabled()) {
      return;
    }

    // CLR Button
    if (self.options.useClearButton) {
      self.clrBtnPanel = document.createElement('span');
      self.clrBtnPanel.className = this.id + '-btn';
      self.clrBtnPanel.style.marginRight = '4px';
      self.clrBtnPanel.onclick = new Function('Debug.clearMessage();');
      self.clrBtnPanel.innerText = '[CLR]';
      self.headPanel.appendChild(self.clrBtnPanel);
    }

    // Clock
    if (self.options.useClock) {
      self.clockPanel = document.createElement('span');
      self.clockPanel.style.marginRight = '2px';
      self.clockPanel.style.color = self.options.clockColor;
      self.clockPanel.style.fontSize = self.options.fontSize + 'px';
      self.headPanel.appendChild(self.clockPanel);
    }

    // -- R to L
    // X Button
    if (self.options.togglableShowHide) {
      self.closeBtnPanel = document.createElement('span');
      self.closeBtnPanel.className = this.id + '-btn';
      self.closeBtnPanel.style.float = 'right';
      self.closeBtnPanel.style.marginRight = '2px';
      self.closeBtnPanel.style.color = '#888';
      self.closeBtnPanel.style.fontSize = (22 * self.options.zoom) + 'px';
      self.closeBtnPanel.onmouseover = new Function('this.style.color=\'#d88\';');
      self.closeBtnPanel.onmouseout = new Function('this.style.color=\'#888\';');
      self.closeBtnPanel.onclick = new Function('Debug.closeDebugWindow();');
      self.closeBtnPanel.innerText = '×';
      self.headPanel.appendChild(self.closeBtnPanel);
    }

    // Window Control Button
    if ((self.status & DebugJS.STATE_DYNAMIC) && (self.status & DebugJS.STATE_RESIZABLE) && (self.options.useWindowControlButton)) {
      self.winCtrlBtnPanel = document.createElement('span');
      self.headPanel.appendChild(self.winCtrlBtnPanel);
    }

    // Pin Button
    if ((self.status & DebugJS.STATE_DYNAMIC) && (self.options.usePinButton)) {
      self.pinBtnPanel = document.createElement('span');
      self.pinBtnPanel.className = this.id + '-btn';
      self.pinBtnPanel.style.float = 'right';
      self.pinBtnPanel.style.marginRight = '4px';
      self.pinBtnPanel.innerText = '📌';
      self.pinBtnPanel.onclick = new Function('Debug.toggleDraggable();');
      self.pinBtnPanel.onmouseover = new Function('Debug.pinBtnPanel.style.color=DebugJS.PIN_BUTTON_COLOR;');
      self.pinBtnPanel.onmouseout = new Function('Debug.pinBtnPanel.style.color=(Debug.status & DebugJS.STATE_DRAGGABLE) ? DebugJS.COLOR_INACTIVE : DebugJS.PIN_BUTTON_COLOR;');
      self.headPanel.appendChild(self.pinBtnPanel);
    }

    // Suspend Log Button
    if (self.options.useSuspendLogButton) {
      self.suspendLogBtnPanel = document.createElement('span');
      self.suspendLogBtnPanel.className = this.id + '-btn';
      self.suspendLogBtnPanel.style.float = 'right';
      self.suspendLogBtnPanel.style.marginRight = '4px';
      self.suspendLogBtnPanel.innerText = '🚫';
      self.suspendLogBtnPanel.onclick = new Function('Debug.toggleLogSuspend();');
      self.suspendLogBtnPanel.onmouseover = new Function('Debug.suspendLogBtnPanel.style.color=DebugJS.LOG_SUSPEND_BUTTON_COLOR;');
      self.suspendLogBtnPanel.onmouseout = new Function('Debug.suspendLogBtnPanel.style.color=(Debug.status & DebugJS.STATE_LOG_SUSPENDING) ? DebugJS.LOG_SUSPEND_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;');
      self.headPanel.appendChild(self.suspendLogBtnPanel);
    }

    // Stopwatch
    if (self.options.useStopWatch) {
      self.swPanel = document.createElement('span');
      self.swPanel.style.float = 'right';
      self.swPanel.style.marginRight = '8px';
      self.headPanel.appendChild(self.swPanel);

      self.swBtnPanel = document.createElement('span');
      self.swBtnPanel.style.float = 'right';
      self.swBtnPanel.style.marginRight = '4px';
      self.headPanel.appendChild(self.swBtnPanel);
    }

    // Script Button
    if (self.options.useScriptEditor) {
      self.scriptBtnPanel = document.createElement('span');
      self.scriptBtnPanel.className = this.id + '-btn';
      self.scriptBtnPanel.style.float = 'right';
      self.scriptBtnPanel.style.marginRight = '4px';
      self.scriptBtnPanel.innerText = 'JS';
      self.scriptBtnPanel.onclick = new Function('Debug.toggleScriptMode();');
      self.scriptBtnPanel.onmouseover = new Function('Debug.scriptBtnPanel.style.color=DebugJS.JS_BUTTON_COLOR;');
      self.scriptBtnPanel.onmouseout = new Function('Debug.scriptBtnPanel.style.color=(Debug.status & DebugJS.STATE_SCRIPT) ? DebugJS.JS_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;');
      self.headPanel.appendChild(self.scriptBtnPanel);
    }

    // Text Check Button
    if (self.options.useTextChecker) {
      self.textCheckerBtnPanel = document.createElement('span');
      self.textCheckerBtnPanel.className = this.id + '-btn';
      self.textCheckerBtnPanel.style.float = 'right';
      self.textCheckerBtnPanel.style.marginRight = '4px';
      self.textCheckerBtnPanel.innerText = 'TXT';
      self.textCheckerBtnPanel.onclick = new Function('Debug.toggleTextCheckerMode();');
      self.textCheckerBtnPanel.onmouseover = new Function('Debug.textCheckerBtnPanel.style.color=DebugJS.TXT_BUTTON_COLOR;');
      self.textCheckerBtnPanel.onmouseout = new Function('Debug.textCheckerBtnPanel.style.color=(Debug.status & DebugJS.STATE_TEXT_CHECKING) ? DebugJS.TXT_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;');
      self.headPanel.appendChild(self.textCheckerBtnPanel);
    }

    // Element Inspection Button
    if (self.options.useElementInspection) {
      self.elmInspectionBtnPanel = document.createElement('span');
      self.elmInspectionBtnPanel.className = this.id + '-btn';
      self.elmInspectionBtnPanel.style.float = 'right';
      self.elmInspectionBtnPanel.style.marginRight = '4px';
      self.elmInspectionBtnPanel.innerText = 'DOM';
      self.elmInspectionBtnPanel.onclick = new Function('Debug.toggleElmInspectionMode();');
      self.elmInspectionBtnPanel.onmouseover = new Function('Debug.elmInspectionBtnPanel.style.color=DebugJS.DOM_BUTTON_COLOR;');
      self.elmInspectionBtnPanel.onmouseout = new Function('Debug.elmInspectionBtnPanel.style.color=(Debug.status & DebugJS.STATE_ELEMENT_INSPECTING) ? DebugJS.DOM_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;');
      self.headPanel.appendChild(self.elmInspectionBtnPanel);
    }

    // Screen Measure Button
    if (self.options.useScreenMeasure) {
      self.measureBtnPanel = document.createElement('span');
      self.measureBtnPanel.className = this.id + '-btn';
      self.measureBtnPanel.style.display = 'inline-block';
      self.measureBtnPanel.style.float = 'right';
      self.measureBtnPanel.style.marginTop = '1px';
      self.measureBtnPanel.style.marginRight = '6px';
      self.measureBtnPanel.style.width = (12 * self.options.zoom) + 'px';
      self.measureBtnPanel.style.height = (8 * self.options.zoom) + 'px';
      self.measureBtnPanel.innerText = ' ';
      self.measureBtnPanel.onclick = new Function('Debug.toggleMeasureMode();');
      self.measureBtnPanel.onmouseover = new Function('Debug.measureBtnPanel.style.borderColor=\'' + DebugJS.MEASURE_BUTTON_COLOR + '\';');
      self.measureBtnPanel.onmouseout = new Function('Debug.measureBtnPanel.style.borderColor=(Debug.status & DebugJS.STATE_MEASURE) ? DebugJS.MEASURE_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;');
      self.headPanel.appendChild(self.measureBtnPanel);
    }
    // -- R to L

    // LED
    if (self.options.useLed) {
      self.ledPanel = document.createElement('span');
      self.ledPanel.className = this.id + '-sys-info';
      self.ledPanel.style.float = 'right';
      self.ledPanel.style.marginRight = '4px';
      self.infoPanel.appendChild(self.ledPanel);
    }

    // Window Size
    if (self.options.useWindowSizeInfo) {
      self.screenSizePanel = document.createElement('span');
      self.screenSizePanel.className = this.id + '-sys-info';
      self.infoPanel.appendChild(self.screenSizePanel);

      self.windowSizePanel = document.createElement('span');
      self.windowSizePanel.className = this.id + '-sys-info';
      self.infoPanel.appendChild(self.windowSizePanel);

      self.clientSizePanel = document.createElement('span');
      self.clientSizePanel.className = this.id + '-sys-info';
      self.infoPanel.appendChild(self.clientSizePanel);

      self.bodySizePanel = document.createElement('span');
      self.bodySizePanel.className = this.id + '-sys-info';
      self.infoPanel.appendChild(self.bodySizePanel);

      self.scrollPosPanel = document.createElement('span');
      self.scrollPosPanel.className = this.id + '-sys-info';
      self.infoPanel.appendChild(self.scrollPosPanel);
    }

    // Mouse Status
    if (self.options.useMouseStatusInfo) {
      self.mousePositionPanel = document.createElement('span');
      self.mousePositionPanel.className = this.id + '-sys-info';
      self.infoPanel.appendChild(self.mousePositionPanel);

      self.mouseClickPanel = document.createElement('span');
      self.mouseClickPanel.className = this.id + '-sys-info';
      self.infoPanel.appendChild(self.mouseClickPanel);
    }

    if ((self.options.useWindowSizeInfo) || (self.options.useMouseStatusInfo)) {
      self.infoPanel.appendChild(document.createElement('br'));
    }

    // Key Status
    if (self.options.useKeyStatusInfo) {
      self.keyDownPanel = document.createElement('span');
      self.keyDownPanel.className = this.id + '-sys-info';
      self.infoPanel.appendChild(self.keyDownPanel);

      self.keyPressPanel = document.createElement('span');
      self.keyPressPanel.className = this.id + '-sys-info';
      self.infoPanel.appendChild(self.keyPressPanel);

      self.keyUpPanel = document.createElement('span');
      self.keyUpPanel.className = this.id + '-sys-info';
      self.infoPanel.appendChild(self.keyUpPanel);
    }

    // Command Line
    if (self.options.useCommandLine) {
      self.cmdPanel = document.createElement('div');
      self.cmdPanel.style.padding = DebugJS.CMD_LINE_PADDING + 'px';
      self.windowBody.appendChild(self.cmdPanel);
      self.cmdPanel.innerHTML = '<span style="color:' + self.options.promptColor + ';">$</span>';
      self.cmdLine = document.createElement('input');
      self.cmdLine.style.setProperty('width', 'calc(100% - ' + self.options.fontSize + 'px)', 'important');
      self.cmdLine.style.setProperty('margin-left', '2px', 'important');
      self.cmdLine.style.setProperty('padding', '1px', 'important');
      self.cmdLine.style.setProperty('border', '0', 'important');
      self.cmdLine.style.setProperty('border-bottom', 'solid 1px #888', 'important');
      self.cmdLine.style.setProperty('border-radius', '0', 'important');
      self.cmdLine.style.setProperty('outline', 'none', 'important');
      self.cmdLine.style.setProperty('background', 'transparent', 'important');
      self.cmdLine.style.setProperty('color', self.options.fontColor, 'important');
      self.cmdLine.style.setProperty('font-size', self.options.fontSize + 'px', 'important');
      self.cmdLine.style.setProperty('font-family', self.options.fontFamily, 'important');
      self.cmdPanel.appendChild(self.cmdLine);
      self.cmdHistoryBuf = new DebugJS.RingBuffer(10);
    }
  },

  initDebugWindow: function() {
    var self = Debug;
    if (self.isAllFeaturesDisabled()) {
      return;
    }

    if (self.status & DebugJS.STATE_SHOW_CLOCK) {
      self.updateClockPanel();
    }

    if (self.options.useScreenMeasure) {
      self.updateMeasureBtnPanel();
    }

    if (self.options.useElementInspection) {
      self.updateElmInspectionBtnPanel();
    }

    if (self.options.useTextChecker) {
      self.updateTextCheckerBtnPanel();
    }

    if (self.options.useScriptEditor) {
      self.updateScriptBtnPanel();
    }

    if (self.options.useStopWatch) {
      self.updateSwBtnPanel();
      self.updateSwPanel();
    }

    if ((self.status & DebugJS.STATE_DYNAMIC) && (self.options.usePinButton)) {
      self.updatePinBtnPanel();
    }

    if (self.options.useSuspendLogButton) {
      self.updateSuspendLogBtnPanel();
    }

    if ((self.status & DebugJS.STATE_RESIZABLE) && (self.options.useWindowControlButton)) {
      self.updateWinCtrlBtnPanel();
    }

    if (self.options.useMouseStatusInfo) {
      self.updateMousePositionPanel();
      self.updateMouseClickPanel();
    }

    if (self.options.showElement) {
      self.updateElementPanel();
    }

    if (self.options.useWindowSizeInfo) {
      self.updateScreenSizePanel();
      self.updateWindowSizePanel();
      self.updateClientSizePanel();
      self.updateBodySizePanel();
      self.updateScrollPosPanel();
    }

    if (self.options.useLed) {
      self.updateLedPanel();
    }
  },

  setWindowPosition: function(pos, dbgWinWidth, dbgWinHeight) {
    var self = Debug;
    switch (pos) {
      case 'se':
        self.debugWindow.style.top = (document.documentElement.clientHeight - dbgWinHeight - self.options.posAdjY) + 'px';
        self.debugWindow.style.left = (document.documentElement.clientWidth - dbgWinWidth - self.options.posAdjX) + 'px';
        break;
      case 'ne':
        self.debugWindow.style.top = self.options.posAdjY + 'px';
        self.debugWindow.style.left = (document.documentElement.clientWidth - dbgWinWidth - self.options.posAdjX) + 'px';
        break;
      case 'c':
        self.debugWindow.style.top = ((document.documentElement.clientHeight / 2) - (dbgWinHeight / 2)) + 'px';
        self.debugWindow.style.left = ((document.documentElement.clientWidth / 2) - (dbgWinWidth / 2)) + 'px';
        break;
      case 'sw':
        self.debugWindow.style.top = (document.documentElement.clientHeight - dbgWinHeight - self.options.posAdjY) + 'px';
        self.debugWindow.style.left = self.options.posAdjX + 'px';
        break;
      case 'n':
        self.debugWindow.style.top = self.options.posAdjY + 'px';
        self.debugWindow.style.left = ((document.documentElement.clientWidth / 2) - (dbgWinWidth / 2)) + 'px';
        break;
      case 'e':
        self.debugWindow.style.top = ((document.documentElement.clientHeight / 2) - (dbgWinHeight / 2)) + 'px';
        self.debugWindow.style.left = (document.documentElement.clientWidth - dbgWinWidth - self.options.posAdjX) + 'px';
        break;
      case 's':
        self.debugWindow.style.top = (document.documentElement.clientHeight - dbgWinHeight - self.options.posAdjY) + 'px';
        self.debugWindow.style.left = ((document.documentElement.clientWidth / 2) - (dbgWinWidth / 2)) + 'px';
        break;
      case 'w':
        self.debugWindow.style.top = ((document.documentElement.clientHeight / 2) - (dbgWinHeight / 2)) + 'px';
        self.debugWindow.style.left = self.options.posAdjX + 'px';
        break;
      default:
        self.debugWindow.style.top = self.options.posAdjY + 'px';
        self.debugWindow.style.left = self.options.posAdjX + 'px';
        break;
    }
  },

  // Update Clock
  updateClockPanel: function() {
    var self = Debug;
    var dt = DebugJS.getCurrentDateTime();
    var t = dt.yyyy + '-' + dt.mm + '-' + dt.dd + '(' + DebugJS.WDAYS[dt.wday] + ') ' + dt.hh + ':' + dt.mi + ':' + dt.ss;
    //t += (dt.ms < 500) ? ' ' : '.';
    self.clockPanel.innerText = t;
    if (self.status & DebugJS.STATE_SHOW_CLOCK) {
      setTimeout(self.updateClockPanel, 500);
    }
  },

  // Update Screen Size
  updateScreenSizePanel: function() {
    this.screenSizePanel.innerText = 'SCR:' + 'w=' + screen.width + ',h=' + screen.height;
  },

  // Update Window Size
  updateWindowSizePanel: function() {
    this.windowSizePanel.innerText = 'WIN:w=' + window.outerWidth + ',h=' + window.outerHeight;
  },

  // Update Client Size
  updateClientSizePanel: function() {
    this.clientSizePanel.innerText = 'CLI:w=' + document.documentElement.clientWidth + ',h=' + document.documentElement.clientHeight;
  },

  // Update Body Size
  updateBodySizePanel: function() {
    this.bodySizePanel.innerText = 'BODY:w=' + this.bodyEl.clientWidth + ',h=' + document.body.clientHeight;
  },

  // Update Scroll Position
  updateScrollPosPanel: function() {
    this.scrollPosPanel.innerText = 'SCROLL:x=' + this.scrollPosX + ',y=' + this.scrollPosY;
  },

  // Update Mouse Position
  updateMousePositionPanel: function() {
    this.mousePositionPanel.innerText = 'POS:' + this.mousePos;
  },

  // Update Mouse Click
  updateMouseClickPanel: function() {
    var mouseClick = '<span style="color:' + this.mouseClickL + ';">L</span><span style="color:' + this.mouseClickC + ';">C</span><span style="color:' + this.mouseClickR + ';">R</span>';
    this.mouseClickPanel.innerHTML = 'CLICK:' + mouseClick;
  },

  // Update key Down
  updateKeyDownPanel: function() {
    this.keyDownPanel.innerHTML = 'Key Down:' + this.keyDownCode;
  },

  // Update key Press
  updateKeyPressPanel: function() {
    this.keyPressPanel.innerHTML = 'Press:' + this.keyPressCode;
  },

  // Update key Up
  updateKeyUpPanel: function() {
    this.keyUpPanel.innerHTML = 'Up:' + this.keyUpCode;
  },

  // Update LED
  updateLedPanel: function() {
    var self = Debug;
    var bit7Color = (self.led & DebugJS.IND_BIT_7) ? DebugJS.IND_BIT_7_COLOR : DebugJS.IND_COLOR_INACTIVE;
    var bit6Color = (self.led & DebugJS.IND_BIT_6) ? DebugJS.IND_BIT_6_COLOR : DebugJS.IND_COLOR_INACTIVE;
    var bit5Color = (self.led & DebugJS.IND_BIT_5) ? DebugJS.IND_BIT_5_COLOR : DebugJS.IND_COLOR_INACTIVE;
    var bit4Color = (self.led & DebugJS.IND_BIT_4) ? DebugJS.IND_BIT_4_COLOR : DebugJS.IND_COLOR_INACTIVE;
    var bit3Color = (self.led & DebugJS.IND_BIT_3) ? DebugJS.IND_BIT_3_COLOR : DebugJS.IND_COLOR_INACTIVE;
    var bit2Color = (self.led & DebugJS.IND_BIT_2) ? DebugJS.IND_BIT_2_COLOR : DebugJS.IND_COLOR_INACTIVE;
    var bit1Color = (self.led & DebugJS.IND_BIT_1) ? DebugJS.IND_BIT_1_COLOR : DebugJS.IND_COLOR_INACTIVE;
    var bit0Color = (self.led & DebugJS.IND_BIT_0) ? DebugJS.IND_BIT_0_COLOR : DebugJS.IND_COLOR_INACTIVE;
    var led = '' +
    '<span style="color:' + bit7Color + ';margin-right:2px;">●</span>' +
    '<span style="color:' + bit6Color + ';margin-right:2px;">●</span>' +
    '<span style="color:' + bit5Color + ';margin-right:2px;">●</span>' +
    '<span style="color:' + bit4Color + ';margin-right:2px;">●</span>' +
    '<span style="color:' + bit3Color + ';margin-right:2px;">●</span>' +
    '<span style="color:' + bit2Color + ';margin-right:2px;">●</span>' +
    '<span style="color:' + bit1Color + ';margin-right:2px;">●</span>' +
    '<span style="color:' + bit0Color + ';">●</span>';
    self.ledPanel.innerHTML = led;
  },

  // Update Measure Button
  updateMeasureBtnPanel: function() {
    var self = Debug;
    self.measureBtnPanel.style.border = 'solid 1px ' + ((self.status & DebugJS.STATE_MEASURE) ? DebugJS.MEASURE_BUTTON_COLOR : DebugJS.COLOR_INACTIVE);
  },

  // Update Element Inspection Button
  updateElmInspectionBtnPanel: function() {
    var self = Debug;
    self.elmInspectionBtnPanel.style.color = (self.status & DebugJS.STATE_ELEMENT_INSPECTING) ? DebugJS.DOM_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update Text Checker Button
  updateTextCheckerBtnPanel: function() {
    var self = Debug;
    self.textCheckerBtnPanel.style.color = (self.status & DebugJS.STATE_TEXT_CHECKING) ? DebugJS.TXT_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update Script Button
  updateScriptBtnPanel: function() {
    var self = Debug;
    self.scriptBtnPanel.style.color = (self.status & DebugJS.STATE_SCRIPT) ? DebugJS.JS_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update Stop Watch Button
  updateSwBtnPanel: function() {
    var self = Debug;
    var btn = (self.status & DebugJS.STATE_STOPWATCH_RUNNING) ? '||' : '>>';
    var btns = '<span class="' + this.id + '-btn" onclick="Debug.resetStopWatch();">🔃</span>' +
    '<span class="' + this.id + '-btn" onclick="Debug.startStopStopWatch();">' + btn + '</span>';
    self.swBtnPanel.innerHTML = btns;
  },

  // Update Stop Watch
  updateSwPanel: function() {
    var self = Debug;
    self.updateStopWatch();
    self.swPanel.innerText = self.swElapsedTimeDisp;
    if (self.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      setTimeout(self.updateSwPanel, 21);
    }
  },

  // Update Suspend Log Button
  updateSuspendLogBtnPanel: function() {
    var self = Debug;
    self.suspendLogBtnPanel.style.color = (self.status & DebugJS.STATE_LOG_SUSPENDING) ? DebugJS.LOG_SUSPEND_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update Pin Button
  updatePinBtnPanel: function() {
    var self = Debug;
    self.pinBtnPanel.style.color = (self.status & DebugJS.STATE_DRAGGABLE) ? DebugJS.COLOR_INACTIVE : DebugJS.PIN_BUTTON_COLOR;
  },

  // Window Control Button
  updateWinCtrlBtnPanel: function() {
    var self = Debug;
    if (!self.winCtrlBtnPanel) return;
    var fn = 'Debug.expandDebugWindow()';
    var btn = '□';
    if (self.status & DebugJS.STATE_WINDOW_SIZE_EXPANDED) {
      fn = 'Debug.restoreDebugWindow()';
      btn = '❐';
    }
    var b = '<span class="' + self.id + '-btn" style="float:right;margin-right:3px;font-size:' + (16 * self.options.zoom) + 'px;color:#888;" onclick="' + fn + ';Debug.updateWinCtrlBtnPanel();" onmouseover="this.style.color=\'#ddd\';" onmouseout="this.style.color=\'#888\';">' + btn + '</span>' +
    '<span class="' + self.id + '-btn" style="float:right;margin-right:2px;font-size:' + (16 * self.options.zoom) + 'px;color:#888;" onclick="Debug.resetDebugWindow();Debug.updateWinCtrlBtnPanel();" onmouseover="this.style.color=\'#ddd\';" onmouseout="this.style.color=\'#888\';">－</span>';
    self.winCtrlBtnPanel.innerHTML = b;
  },

  // Log Output
  printMessage: function() {
    var self = Debug;
    var msg = '<pre style="padding:0 3px;">' + self.getLog() + '</pre>';
    self.msgPanel.innerHTML = msg;
    self.msgPanel.scrollTop = self.msgPanel.scrollHeight;
  },

  clearMessage: function() {
    var self = Debug;
    self.msgBuf.clear();
    self.printMessage();
  },

  applyStyles: function(styles) {
    var self = Debug;
    if (self.styleEl != null) {
      document.head.removeChild(self.styleEl);
    }
    self.styleEl = document.createElement('style');
    document.head.appendChild(self.styleEl);
    self.styleEl.appendChild(document.createTextNode(''));
    var s = self.styleEl.sheet;
    for (var selector in styles) {
      var props = styles[selector];
      var propStr = '';
      for (var propName in props) {
        var propVal = props[propName];
        var propImportant = '';
        if (propVal[1] === true) {
          propVal = propVal[0];
          propImportant = ' !important';
        }
        propStr += propName + ':' + propVal + propImportant + ';\n';
      }
      s.insertRule(selector + '{' + propStr + '}', s.cssRules.length);
    }
  },

  setupMove: function() {
    var self = Debug;
    self.windowBody.onmousedown = self.startWindowMove;
  },

  startWindowMove: function(e) {
    var self = Debug;
    if ((!(self.status & DebugJS.STATE_DRAGGABLE)) || (e.button != 0) || self.isMoveExemptedElement(e.target)) {
      return;
    }
    self.status &= ~DebugJS.STATE_AUTO_POSITION_ADJUST;
    self.status |= DebugJS.STATE_DRAGGING;
    Debug.windowBody.style.cursor = 'move';
    self.prevOffsetTop = e.clientY - self.debugWindow.offsetTop;
    self.prevOffsetLeft = e.clientX - self.debugWindow.offsetLeft;
    if (!document.all) {
       window.getSelection().removeAllRanges();
    }
  },

  isMoveExemptedElement: function(el) {
    var self = Debug;
    if (el.nodeName == 'INPUT') return true;
    if (el.nodeName == 'TEXTAREA') return true;
    if (el == self.clrBtnPanel) return true;
    if (el == self.measureBtnPanel) return true;
    if (el == self.elmInspectionBtnPanel) return true;
    if (el == self.textCheckerBtnPanel) return true;
    if (el == self.scriptBtnPanel) return true;
    if (el == self.swBtnPanel.childNodes[0]) return true;
    if (el == self.swBtnPanel.childNodes[1]) return true;
    if (el == self.suspendLogBtnPanel) return true;
    if (el == self.pinBtnPanel) return true;
    if (el == self.winCtrlBtnPanel.childNodes[0]) return true;
    if (el == self.winCtrlBtnPanel.childNodes[1]) return true;
    if (el == self.closeBtnPanel) return true;
    return false;
  },

  windowMove: function(e) {
    var self = Debug;
    if (!(self.status & DebugJS.STATE_DRAGGING)) return;
    self.debugWindow.style.top = e.clientY - self.prevOffsetTop + 'px';
    self.debugWindow.style.left = e.clientX - self.prevOffsetLeft + 'px';
  },

  storeSizeAndPos: function() {
    var self = Debug;
    var shadow = (self.status & DebugJS.STATE_DYNAMIC) ? (DebugJS.WINDOW_SHADOW / 2) : 0;
    self.orgOffsetTop = self.debugWindow.offsetTop;
    self.orgOffsetLeft = self.debugWindow.offsetLeft;
    self.resizeOrgWidth = (self.debugWindow.offsetWidth + DebugJS.WINDOW_BORDER - shadow);
    self.resizeOrgHeight = (self.debugWindow.offsetHeight + DebugJS.WINDOW_BORDER - shadow);
  },

  startResize: function(e) {
    if (e.button != 0) return;
    var self = Debug;
    self.status |= DebugJS.STATE_RESIZING;
    self.clickedPosX = e.clientX;
    self.clickedPosY = e.clientY;
    self.storeSizeAndPos();
    self.status &= ~DebugJS.STATE_WINDOW_SIZE_EXPANDED;
    self.updateWinCtrlBtnPanel();
  },

  resize: function(e) {
    var self = Debug;
    var currentX = e.clientX;
    var currentY = e.clientY;
    var moveX, moveY, t, l, w, h;

    if (!(self.status & DebugJS.STATE_DYNAMIC)) {
      if (currentX > document.documentElement.clientWidth) {
        currentX = document.documentElement.clientWidth;
      }
    }

    if (self.status & DebugJS.STATE_RESIZING_N) {
      moveY = self.clickedPosY - currentY;
      h = self.resizeOrgHeight + moveY;
      if (h < DebugJS.DEBUG_WIN_MIN_H) {
        h = DebugJS.DEBUG_WIN_MIN_H;
      } else {
        t = self.orgOffsetTop - moveY;
        self.debugWindow.style.top = t + 'px';
      }
      self.debugWindow.style.height = h + 'px';
    }

    if (self.status & DebugJS.STATE_RESIZING_W) {
      moveX = self.clickedPosX - currentX;
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
      moveX = currentX - self.clickedPosX;
      w = self.resizeOrgWidth + moveX;
      if (w < DebugJS.DEBUG_WIN_MIN_W) w = DebugJS.DEBUG_WIN_MIN_W;
      self.debugWindow.style.width = w + 'px';
    }

    if (self.status & DebugJS.STATE_RESIZING_S) {
      moveY = currentY - self.clickedPosY;
      h = self.resizeOrgHeight + moveY;
      if (self.initHeight < DebugJS.DEBUG_WIN_MIN_H) {
        if (h < self.initHeight) {
          h = self.initHeight;
        }
      } else if (h < DebugJS.DEBUG_WIN_MIN_H) {
        h = DebugJS.DEBUG_WIN_MIN_H;
      }
      self.debugWindow.style.height = h + 'px';
    }

    self.resizeMainHeight();
  },

  endResize: function() {
    var self = Debug;
    self.status &= ~DebugJS.STATE_RESIZING_ALL;
    self.bodyEl.style.cursor = 'auto';
  },

  resizeMainHeight: function() {
    var self = Debug;
    var headPanelH = (self.headPanel) ? self.headPanel.offsetHeight : 0;
    var infoPanelH = (self.infoPanel) ? self.infoPanel.offsetHeight : 0;
    var cmdPanelH = (self.cmdPanel) ? self.cmdPanel.offsetHeight : 0;
    var mainPanelHeight = self.debugWindow.offsetHeight - headPanelH - infoPanelH - cmdPanelH - DebugJS.WINDOW_ADJUST;
    self.mainPanel.style.height = mainPanelHeight + 'px';
  },

  toggleLogSuspend: function() {
    var self = Debug;
    if (self.status & DebugJS.STATE_LOG_SUSPENDING) {
      self.status &= ~DebugJS.STATE_LOG_SUSPENDING;
    } else {
      self.status |= DebugJS.STATE_LOG_SUSPENDING;
    }
    self.updateSuspendLogBtnPanel();
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
    self.updateMeasureBtnPanel();
  },

  disableMeasureMode: function() {
    var self = Debug;
    self.stopMeasure();
    self.status &= ~DebugJS.STATE_MEASURE;
    DebugJS.log.s('Screen Measure OFF.');
    self.updateMeasureBtnPanel();
  },

  toggleDraggable: function() {
    var self = Debug;
    if (Debug.status & DebugJS.STATE_DRAGGABLE) {
      self.disableDraggable();
    } else {
      self.enableDraggable();
    }
  },

  enableDraggable: function() {
    Debug.status |= DebugJS.STATE_DRAGGABLE;
    Debug.windowBody.style.cursor = 'default';
    Debug.updatePinBtnPanel();
  },

  disableDraggable: function() {
    Debug.status &= ~DebugJS.STATE_DRAGGABLE;
    Debug.windowBody.style.cursor = 'auto';
    Debug.updatePinBtnPanel();
  },

  startStopStopWatch: function() {
    var self = Debug;
    if (self.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      self.stopStopWatch();
    } else {
      self.startStopWatch();
    }
  },

  startStopWatch: function() {
    var self = Debug;
    self.status |= DebugJS.STATE_STOPWATCH_RUNNING;
    self.swStartTime = (new Date()).getTime() - self.swElapsedTime;
    self.updateStopWatch();
    self.updateSwPanel();
    self.updateSwBtnPanel();
  },

  stopStopWatch: function() {
    var self = Debug;
    self.status &= ~DebugJS.STATE_STOPWATCH_RUNNING;
    self.updateSwBtnPanel();
  },

  updateStopWatch: function() {
    if (!(Debug.status & DebugJS.STATE_STOPWATCH_RUNNING)) return;
    var self = Debug;
    var swCurrentTime = (new Date()).getTime();
    self.swElapsedTime = swCurrentTime - self.swStartTime;
    self.swElapsedTimeDisp = DebugJS.getTimerStr(self.swElapsedTime);
  },

  resetStopWatch: function() {
    var self = Debug;
    self.swStartTime = (new Date()).getTime();
    self.swElapsedTime = 0;
    self.swElapsedTimeDisp = DebugJS.getTimerStr(self.swElapsedTime);
    self.updateSwPanel();
  },

  getLog: function() {
    var self = Debug;
    var buf = self.msgBuf.getAll();
    var cnt = self.msgBuf.count();
    var len = buf.length;
    var lineCnt = cnt - len;
    var logs = '';
    for (var i = 0; i < len; i++) {
      lineCnt++;
      if (buf[i] == undefined) break;
      var line = '';
      var lineNum;
      if ((self.options.showLineNums) && (buf[i].type != DebugJS.LOG_TYPE_MULTILINE)) {
        var diffDigits = DebugJS.digits(cnt) - DebugJS.digits(lineCnt);
        var lineNumPadding = '';
        for (var j = 0; j < diffDigits; j++) {
          lineNumPadding = lineNumPadding + '0';
        }
        lineNum = lineNumPadding + lineCnt;
        line += lineNum + ': ';
      }
      var msg = (((self.options.showTimeStamp) && (buf[i].type != DebugJS.LOG_TYPE_MULTILINE)) ? (buf[i].time + ' ' + buf[i].msg) : buf[i].msg);
      switch (buf[i].type) {
        case DebugJS.LOG_TYPE_ERROR:
          line += '<span style="color:' + self.options.logColorE + '">' + msg + '</span>';
          break;
        case DebugJS.LOG_TYPE_WARNING:
          line += '<span style="color:' + self.options.logColorW + '">' + msg + '</span>';
          break;
        case DebugJS.LOG_TYPE_INFO:
          line += '<span style="color:' + self.options.logColorI + '">' + msg + '</span>';
          break;
        case DebugJS.LOG_TYPE_DEBUG:
          line += '<span style="color:' + self.options.logColorD + '">' + msg + '</span>';
          break;
        case DebugJS.LOG_TYPE_SYSTEM:
          line += '<span style="color:' + self.options.logColorS + ';text-shadow:0 0 3px;">' + msg + '</span>';
          break;
        case DebugJS.LOG_TYPE_MULTILINE:
          line += '<span style="display:inline-block;margin:' + Math.round(self.options.fontSize * 0.5) + 'px 0;">' + msg + '</span>';
          break;
        default:
          line += msg;
          break;
      }
      logs += line + '\n';
    }
    return logs;
  },

  collapseMessagePanel: function() {
    var self = Debug;
    self.msgPanel.style.height = (100 - DebugJS.OVERLAY_HALF_HEIGHT) + '%';
    self.msgPanel.scrollTop = self.msgPanel.scrollHeight;
  },

  expandMessagePanel: function() {
    var self = Debug;
    self.msgPanel.style.height = '100%';
  },

  keyhandler: function(e) {
    var self = Debug;
    switch (e.keyCode) {
      case 13: // Enter
        if (document.activeElement == self.cmdLine) {
          self.execCmd();
        }
        break;

      case 27: // ESC
        if (self.status & DebugJS.STATE_MEASURE) {
          self.disableMeasureMode();
          return;
        }
        if (self.status & DebugJS.STATE_ELEMENT_INSPECTING) {
          self.disableElmInspection();
          return;
        }
        if (self.status & DebugJS.STATE_TEXT_CHECKING) {
          self.disableTextChecker();
          return;
        }
        if (self.status & DebugJS.STATE_SCRIPT) {
          self.disableScriptEditor();
          return;
        }
        if (self.status & DebugJS.STATE_RESIZING) {
          self.endResize();
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
            self.cmdLine.value = self.cmdTmp;
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

      case self.options.visibleKey:
        if (self.status & DebugJS.STATE_VISIBLE) {
          self.closeDebugWindow();
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
    self.keyDownCode = e.keyCode + ' ' + metaKey;
    self.updateKeyDownPanel();

    self.keyPressCode = DebugJS.KEY_STATUS_DEFAULT;
    self.updateKeyPressPanel();

    self.keyUpCode = DebugJS.KEY_STATUS_DEFAULT;
    self.updateKeyUpPanel();
  },

  keyPressHandler: function(e) {
    var self = Debug;
    var metaKey = DebugJS.checkMetaKey(e);
    self.keyPressCode = e.keyCode + '(' + String.fromCharCode(e.keyCode) + ')' + metaKey;
    self.updateKeyPressPanel();
  },

  keyUpHandler: function(e) {
    var self = Debug;
    var metaKey = DebugJS.checkMetaKey(e);
    self.keyUpCode = e.keyCode + ' ' + metaKey;
    self.updateKeyUpPanel();
  },

  windowResizeHandler: function() {
    var self = Debug;
    self.updateWindowSizePanel();
    self.updateClientSizePanel();
    self.updateBodySizePanel();
    if ((self.status & DebugJS.STATE_VISIBLE) && (self.status & DebugJS.STATE_AUTO_POSITION_ADJUST)) {
      var sizePos = self.getSelfSizePos();
      self.setWindowPosition(self.options.position, sizePos.width, sizePos.height);
    }
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
    self.updateScrollPosPanel();
  },

  mousedownHandler: function(e) {
    var self = Debug;
    var posX = e.clientX;
    var posY = e.clientY;
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
        if (self.status & DebugJS.STATE_ELEMENT_INSPECTING) {
          dbg.el = document.elementFromPoint(posX, posY);
          DebugJS.log.s('dbg.el has been updated.');
        }
        break;
      default:
        break;
    }
    if (self.options.useMouseStatusInfo) {
      self.updateMouseClickPanel();
    }
  },

  mousemoveHandler: function(e) {
    var self = Debug;
    if (self.options.useMouseStatusInfo) {
      self.mousePos = 'x=' + e.clientX + ',y=' + e.clientY;
      self.updateMousePositionPanel();
    }
    if (self.status & DebugJS.STATE_DRAGGING) self.windowMove(e);
    if (self.status & DebugJS.STATE_RESIZING) self.resize(e);
    if (self.status & DebugJS.STATE_MEASURING) self.measure(e);
    if (self.status & DebugJS.STATE_ELEMENT_INSPECTING) self.inspectElement(e);
  },

  mouseupHandler: function(e) {
    var self = Debug;
    switch (e.button) {
      case 0:
        self.mouseClickL = DebugJS.COLOR_INACTIVE;
        if (self.status & DebugJS.STATE_MEASURING) {
          self.stopMeasure();
        }
        if (self.status & DebugJS.STATE_DRAGGABLE) {
          self.status &= ~DebugJS.STATE_DRAGGING;
          Debug.windowBody.style.cursor = 'default';
        }
        if (self.status & DebugJS.STATE_RESIZING) {
          self.endResize();
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
    if (self.options.useMouseStatusInfo) {
      self.updateMouseClickPanel();
    }
  },

  expandDebugWindow: function() {
    var self = Debug;
    self.storeSizeAndPos();
    var cw = document.documentElement.clientWidth;
    var ch = document.documentElement.clientHeight;
    var w = 900;
    var h = 600;
    var t = ch / 2 - h / 2;
    var l = cw / 2 - w / 2;
    if (w > cw) {w = cw; l = 0;}
    if (h > ch) {h = ch; t = 0;}
    self.debugWindow.style.top = t + 'px';
    self.debugWindow.style.left = l + 'px';
    self.debugWindow.style.width = w + 'px';
    self.debugWindow.style.height = h + 'px';
    self.resizeMainHeight();
    self.status |= DebugJS.STATE_WINDOW_SIZE_EXPANDED;
  },

  restoreDebugWindow: function() {
    var self = Debug;
    self.debugWindow.style.width = self.resizeOrgWidth + 'px';
    self.debugWindow.style.height = self.resizeOrgHeight + 'px';
    self.debugWindow.style.top = self.orgOffsetTop + 'px';
    self.debugWindow.style.left = self.orgOffsetLeft + 'px';
    self.resizeMainHeight();
    self.msgPanel.scrollTop = self.msgPanel.scrollHeight;
    self.status &= ~DebugJS.STATE_WINDOW_SIZE_EXPANDED;
  },

  resetDebugWindow: function() {
    var self = Debug;
    self.debugWindow.style.width = (self.initWidth - (DebugJS.WINDOW_SHADOW / 2) + DebugJS.WINDOW_BORDER) + 'px';
    self.debugWindow.style.height = (self.initHeight - (DebugJS.WINDOW_SHADOW / 2) + DebugJS.WINDOW_BORDER) + 'px';
    self.setWindowPosition(self.options.position, self.initWidth, self.initHeight);
    self.resizeMainHeight();
    self.msgPanel.scrollTop = self.msgPanel.scrollHeight;
    self.status &= ~DebugJS.STATE_WINDOW_SIZE_EXPANDED;
    if (self.status & DebugJS.STATE_DRAGGABLE) {
      self.status |= DebugJS.STATE_AUTO_POSITION_ADJUST;
    }
  },

  showDebugWindow: function() {
    var self = Debug;
    self.debugWindow.style.display = 'block';
    self.status |= DebugJS.STATE_VISIBLE;
    self.msgPanel.scrollTop = self.msgPanelScrollY;
    self.msgPanel.scrollLeft = self.msgPanelScrollX;
    var sizePos = self.getSelfSizePos();
    if ((self.status & DebugJS.STATE_AUTO_POSITION_ADJUST) ||
       ((self.status & DebugJS.STATE_DYNAMIC) && ((sizePos.winX1 > document.documentElement.clientWidth) || (sizePos.winY1 > document.documentElement.clientHeight)))) {
      self.setWindowPosition(self.options.position, sizePos.width, sizePos.height);
    }
  },

  hideDebugWindow: function() {
    var self = Debug;
    if (!self.options.togglableShowHide) return;
    self.msgPanelScrollX = self.msgPanel.scrollLeft;
    self.msgPanelScrollY = self.msgPanel.scrollTop;
    self.status &= ~DebugJS.STATE_DRAGGING;
    self.debugWindow.style.display = 'none';
    self.status &= ~DebugJS.STATE_VISIBLE;
  },

  closeDebugWindow: function() {
    var self = Debug;
    if (self.status & DebugJS.STATE_MEASURE) {
      self.disableMeasureMode();
    }
    if (self.status & DebugJS.STATE_ELEMENT_INSPECTING) {
      self.disableElmInspection();
    }
    self.hideDebugWindow();
  },

  startMeasure: function(e) {
    var self = Debug;
    var posX = e.clientX;
    var posY = e.clientY;
    if (self.isOnDebugWindow(posX, posY)) return;

    self.status |= DebugJS.STATE_MEASURING;
    self.clickedPosX = posX;
    self.clickedPosY = posY;

    if (self.measureBox == null) {
      self.measureBox = document.createElement('div');
      self.measureBox.style.position = 'fixed';
      self.measureBox.style.zIndex = 0x7fffffff;
      self.measureBox.style.top = self.clickedPosY + 'px';
      self.measureBox.style.left = self.clickedPosX + 'px';
      self.measureBox.style.width = '0px';
      self.measureBox.style.height = '0px';
      self.measureBox.style.border = 'dotted 1px #333';
      self.measureBox.style.background = 'rgba(0,0,0,0.1)';
      self.bodyEl.appendChild(self.measureBox);
    }
    self.savedFunc = self.bodyEl.onselectstart;
    self.bodyEl.onselectstart = function() {return false;};
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
      self.measureBox.style.top = e.clientY + 'px';
      moveY *= -1;
    }
    self.measureBox.style.width = moveX + 'px';
    self.measureBox.style.height = moveY + 'px';

    var w = 210;
    var h = 40;
    var sizeY = (moveY / 2) - (h / 2);
    var sizeX = (moveX / 2) - (w / 2);
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
    var size = '<span style="font-family:' + self.options.fontFamily + ';font-size:32px;color:#fff;background:rgba(0,0,0,0.7);padding:1px 3px;white-space:pre;position:relative;top:' + sizeY + 'px;left:' + sizeX + 'px;">W=' + moveX + ' H=' + moveY + '</span>';
    var origin = '<span style="font-family:' + self.options.fontFamily + ';font-size:12px;color:#fff;background:rgba(0,0,0,0.3);white-space:pre;position:absolute;' + originY + ':1px;' + originX + ':1px;padding:1px;">x=' + self.clickedPosX + ',y=' + self.clickedPosY + '</span>';
    var endPoint = '';
    //endPoint = '<span style="font-family:' + self.options.fontFamily + ';font-size:12px;color:#fff;background:rgba(0,0,0,0.3);white-space:pre;position:absolute;' + endPointY + ':1px;' + endPointX + ':1px;padding:1px;">x=' + e.clientX + ',y=' + e.clientY + '</span>';
    self.measureBox.innerHTML = origin + size + endPoint;
  },

  stopMeasure: function() {
    var self = Debug;
    if (self.measureBox != null) {
      self.bodyEl.removeChild(self.measureBox);
      self.measureBox = null;
    }
    self.bodyEl.onselectstart = self.savedFunc;
    self.status &= ~DebugJS.STATE_MEASURING;
  },

  toggleElmInspectionMode: function() {
    var self = Debug;
    if (self.status & DebugJS.STATE_ELEMENT_INSPECTING) {
      self.disableElmInspection();
    } else {
      self.enableElmInspection();
    }
  },

  enableElmInspection: function() {
    var self = Debug;
    self.status |= DebugJS.STATE_ELEMENT_INSPECTING;

    if (self.elmInspectionPanel == null) {
      self.elmInspectionPanel = document.createElement('div');
      self.elmInspectionPanel.className = self.id + '-overlay-panel';
      self.mainPanel.appendChild(self.elmInspectionPanel);
    }

    self.updateElmInspectionBtnPanel();
    self.bodyEl.style.cursor = 'zoom-in';
  },

  disableElmInspection: function() {
    var self = Debug;
    self.stopElmInspection();
    self.updateElmInspectionBtnPanel();
    self.bodyEl.style.cursor = 'auto';
  },

  stopElmInspection: function() {
    var self = Debug;
    if (self.prevElm) {
      self.prevElm.style.border = self.prevElmStyle.border;
      self.prevElm.style.opacity = self.prevElmStyle.opacity;
      self.prevElm = null;
      self.prevElmStyle = {};
    }
    if (self.elmInspectionPanel != null) {
      self.mainPanel.removeChild(self.elmInspectionPanel);
      self.elmInspectionPanel = null;
    }
    self.status &= ~DebugJS.STATE_ELEMENT_INSPECTING;
  },

  inspectElement: function(e) {
    var self = Debug;
    var posX = e.clientX;
    var posY = e.clientY;
    if (self.isOnDebugWindow(posX, posY)) return;
    var el = document.elementFromPoint(posX, posY);
    var style = window.getComputedStyle(el);
    var rect = el.getBoundingClientRect();
    var MAX_LEN = 50;

    var text = el.innerText;
    txt = text.replace(/(\r?\n|\r)/g, ' ').replace(/\t/g, ' ').replace(/\s{2,}/g, '').substr(0, MAX_LEN).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (text.length > MAX_LEN) {txt += '<span style="color:#888">...</span>';}

    var backgroundColor = style.backgroundColor;
    var bgColor16 = '';
    if (backgroundColor != 'transparent') {
      var bgColor10 = backgroundColor.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
      var bgColor16conv = DebugJS.convRGB10to16(bgColor10);
      bgColor16 = '#' + bgColor16conv.r + bgColor16conv.g + bgColor16conv.b;
    }

    var color = style.color;
    var color10 = color.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
    var color16 = DebugJS.convRGB10to16(color10);

    var src = (el.src ? el.src : '');
    if (src.length > MAX_LEN) {
      var src1 = src.substr(0, (MAX_LEN / 2));
      var src2 = src.slice(-(MAX_LEN / 2));
      src = src1 + '<span style="color:#888">...</span>' + src2;
    }

    var dom = '<pre style="font-family:' + self.options.fontFamily + ';font-size:' + self.options.fontSize + 'px;color:#fff;"> ' +
    '<span style="color:' + DebugJS.DOM_BUTTON_COLOR + '">&lt;ELEMENT INFO&gt;</span>' +
    '<span style="float:right;margin-right:4px;">(Total: ' + document.getElementsByTagName('*').length + ')</span>\n' +
    '<span style="color:#8f0;">#text</span> ' + txt + '\n' +
    '------------------------------------------------------------\n' +
    'tag      : &lt;' + el.tagName + (el.type ? ' type="' + el.type + '"' : '') + '&gt;\n' +
    'id       : ' + el.id + '\n' +
    'class    : ' + el.className + '\n' +
    'display  : ' + style.display + ' / z-index = ' + style.zIndex + '\n' +
    'position : ' + style.position + ' / float = ' + style.float + ' / clear = ' + style.clear + '\n' +
    'size     : width = ' + el.clientWidth + 'px / height = ' + el.clientHeight + 'px\n' +
    'margin   : ' + style.marginTop + ' ' + style.marginRight + ' ' + style.marginBottom + ' ' + style.marginLeft + '\n' +
    'padding  : ' + style.paddingTop + ' ' + style.paddingRight + ' ' + style.paddingBottom + ' ' + style.paddingLeft + '\n' +
    'font     : size = ' + style.fontSize + '  family = ' + style.fontFamily + '\n' +
    'color    : ' + color + ' #' + color16.r + color16.g + color16.b + ' <span style="background:' + color + ';width:6px;height:12px;display:inline-block;"> </span>\n' +
    'bg-color : ' + backgroundColor + ' ' + bgColor16 + ' <span style="background:' + backgroundColor + ';width:6px;height:12px;display:inline-block;"> </span>\n' +
    'location : top = ' + Math.round(rect.top + window.pageYOffset) + 'px (' + style.top + ') / left = ' + Math.round(rect.left + window.pageXOffset) + 'px (' + style.left + ')\n' +
    'overflow : ' + el.style.overflow + '\n' +
    'name     : ' + (el.name ? el.name : '') + '\n' +
    'value    : ' + (el.value ? el.value : '') + '\n' +
    'src      : ' + src + '\n' +
    '------------------------------------------------------------\n' +
    'onclick      : ' + self.getEventHandlerString(el.onclick) + '\n' +
    'ondblclick   : ' + self.getEventHandlerString(el.ondblclick) + '\n' +
    'onmousedown  : ' + self.getEventHandlerString(el.onmousedown) + '\n' +
    'onmouseup    : ' + self.getEventHandlerString(el.onmouseup) + '\n' +
    'onmouseover  : ' + self.getEventHandlerString(el.onmouseover) + '\n' +
    'onmouseout   : ' + self.getEventHandlerString(el.onmouseout) + '\n' +
    'onmousemove  : ' + self.getEventHandlerString(el.onmousemove) + '\n' +
    'oncontextmenu: ' + self.getEventHandlerString(el.oncontextmenu) + '\n' +
    '\n' +
    'onkeydown    : ' + self.getEventHandlerString(el.onkeydown) + '\n' +
    'onkeypress   : ' + self.getEventHandlerString(el.onkeypress) + '\n' +
    'onkeyup      : ' + self.getEventHandlerString(el.onkeyup) + '\n' +
    '\n' +
    'onfocus      : ' + self.getEventHandlerString(el.onfocus) + '\n' +
    'onblur       : ' + self.getEventHandlerString(el.onblur) + '\n' +
    'onchange     : ' + self.getEventHandlerString(el.onchange) + '\n' +
    'oninput      : ' + self.getEventHandlerString(el.oninput) + '\n' +
    'onselect     : ' + self.getEventHandlerString(el.onselect) + '\n' +
    'onsubmit     : ' + self.getEventHandlerString(el.onsubmit) + '\n' +
    '\n' +
    'onscroll     : ' + self.getEventHandlerString(el.onscroll) + '\n' +
    '------------------------------------------------------------\n';

    for (data in el.dataset) {
      dom += 'data-' + data + ': ' + el.dataset[data] + '\n';
    }

    dom += '</pre>';
    self.elmInspectionPanel.innerHTML = dom;

    if (el != self.prevElm) {
      if (self.prevElm) {
        self.prevElm.style.border = self.prevElmStyle.border;
        self.prevElm.style.opacity = self.prevElmStyle.opacity;
      }
      self.prevElmStyle.border = el.style.border;
      self.prevElmStyle.opacity = el.style.opacity;
      el.style.border = 'solid 1px #f00';
      el.style.opacity = 0.7;
      self.prevElm = el;
    }
  },

  getEventHandlerString: function(handler) {
    return (handler ? handler.toString().replace(/\n/g, '').replace(/[^.]{1,}\{/, '').replace(/\}$/, '').replace(/^\s{1,}/, '') : '<span style="color:#aaa;">null</span>');
  },

  toggleTextCheckerMode: function() {
    var self = Debug;
    if (self.status & DebugJS.STATE_TEXT_CHECKING) {
      self.disableTextChecker();
    } else {
      self.enableTextChecker();
    }
  },

  enableTextChecker: function() {
    var self = Debug;
    self.status |= DebugJS.STATE_TEXT_CHECKING;

    if (self.textCheckerPanel == null) {
      var defaultFontSize = Math.round(16 * self.options.zoom);
      var defaultFgRGB16 = '000';
      var defaultBgRGB16 = 'fff';
      var panelPadding = 2;
      self.textCheckerPanel = document.createElement('div');
      self.textCheckerPanel.className = self.id + '-overlay-panel';
      self.mainPanel.appendChild(self.textCheckerPanel);

      var txtPadding = 4;
      var fontFamily = 'sans-serif';
      self.textCheck = document.createElement('input');
      self.textCheck.style.setProperty('width', 'calc(100% - ' + ((txtPadding + panelPadding) * 2) + 'px)', 'important');
      self.textCheck.style.setProperty('min-height', (20 * self.options.zoom) + 'px', 'important');
      self.textCheck.style.setProperty('margin-bottom', '8px', 'important');
      self.textCheck.style.setProperty('padding', txtPadding + 'px', 'important');
      self.textCheck.style.setProperty('border', '0', 'important');
      self.textCheck.style.setProperty('border-radius', '0', 'important');
      self.textCheck.style.setProperty('outline', 'none', 'important');
      self.textCheck.style.setProperty('font-size', defaultFontSize + 'px', 'important');
      self.textCheck.style.setProperty('font-family', fontFamily, 'important');
      self.textCheck.value = 'ABCDEFG.abcdefg 12345-67890_!?';
      self.textCheckerPanel.appendChild(self.textCheck);

      self.textCheckCtrl = document.createElement('div');
      self.textCheckerPanel.appendChild(self.textCheckCtrl);
      var html = 'font-size: <input type="range" min="0" max="128" step="1" id="' + self.id + '-fontsize-range" class="' + self.id + '-txt-range" oninput="Debug.onChangeFontSize(true);" onchange="Debug.onChangeFontSize(true);">' +
      '<input value="' + defaultFontSize + '" id="' + self.id + '-font-size" class="' + self.id + '-txt-text" style="width:30px;text-align:right;" oninput="Debug.onChangeFontSizeTxt()">px' +
      '<br>' +
      'font-family: <input value="' + fontFamily + '" class="' + self.id + '-txt-text" style="width:110px;" oninput="Debug.onChangeFontFamily(this)">&nbsp;&nbsp;' +
      'font-weight: <input type="range" min="100" max="900" step="100" value="400" id="' + self.id + '-fontweight-range" class="' + self.id + '-txt-range" style="width:80px;" oninput="Debug.onChangeFontWeight();" onchange="Debug.onChangeFontWeight();"><span id="' + self.id + '-font-weight"></span> ' +
      '<table>' +
      '<tr><td colspan="2">FG #<input id="' + self.id + '-fg-rgb" class="' + self.id + '-txt-text" value="' + defaultFgRGB16 + '" style="width:80px;" oninput="Debug.onChangeFgRGB()"></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_R + '">R</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + self.id + '-fg-range-r" class="' + self.id + '-txt-range" oninput="Debug.onChangeFgColor(true);" onchange="Debug.onChangeFgColor(true);"></td><td><span id="' + self.id + '-fg-r"></span></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_G + '">G</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + self.id + '-fg-range-g" class="' + self.id + '-txt-range" oninput="Debug.onChangeFgColor(true);" onchange="Debug.onChangeFgColor(true);"></td><td><span id="' + self.id + '-fg-g"></span></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_B + '">B</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + self.id + '-fg-range-b" class="' + self.id + '-txt-range" oninput="Debug.onChangeFgColor(true);" onchange="Debug.onChangeFgColor(true);"></td><td><span id="' + self.id + '-fg-b"></span></td></tr>' +
      '<tr><td colspan="2">BG #<input id="' + self.id + '-bg-rgb" class="' + self.id + '-txt-text" value="' + defaultBgRGB16 + '" style="width:80px;" oninput="Debug.onChangeBgRGB()"></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_R + '">R</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + self.id + '-bg-range-r" class="' + self.id + '-txt-range" oninput="Debug.onChangeBgColor(true);" onchange="Debug.onChangeBgColor(true);"></td><td><span id="' + self.id + '-bg-r"></span></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_G + '">G</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + self.id + '-bg-range-g" class="' + self.id + '-txt-range" oninput="Debug.onChangeBgColor(true);" onchange="Debug.onChangeBgColor(true);"></td><td><span id="' + self.id + '-bg-g"></span></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_B + '">B</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + self.id + '-bg-range-b" class="' + self.id + '-txt-range" oninput="Debug.onChangeBgColor(true);" onchange="Debug.onChangeBgColor(true);"></td><td><span id="' + self.id + '-bg-b"></span></td></tr>' +
      '</tbale>';
      self.textCheckCtrl.innerHTML = html;

      self.textCheckFontSizeRange = document.getElementById(self.id + '-fontsize-range');
      self.textCheckFontSizeInput = document.getElementById(self.id + '-font-size');
      self.textCheckFontWeightRange = document.getElementById(self.id + '-fontweight-range');
      self.textCheckFontWeightLabel = document.getElementById(self.id + '-font-weight');
      self.textCheckerInputFgRGB = document.getElementById(self.id + '-fg-rgb');
      self.textCheckerRangeFgR = document.getElementById(self.id + '-fg-range-r');
      self.textCheckerRangeFgG = document.getElementById(self.id + '-fg-range-g');
      self.textCheckerRangeFgB = document.getElementById(self.id + '-fg-range-b');
      self.textCheckerLabelFgR = document.getElementById(self.id + '-fg-r');
      self.textCheckerLabelFgG = document.getElementById(self.id + '-fg-g');
      self.textCheckerLabelFgB = document.getElementById(self.id + '-fg-b');
      self.textCheckerInputBgRGB = document.getElementById(self.id + '-bg-rgb');
      self.textCheckerRangeBgR = document.getElementById(self.id + '-bg-range-r');
      self.textCheckerRangeBgG = document.getElementById(self.id + '-bg-range-g');
      self.textCheckerRangeBgB = document.getElementById(self.id + '-bg-range-b');
      self.textCheckerLabelBgR = document.getElementById(self.id + '-bg-r');
      self.textCheckerLabelBgG = document.getElementById(self.id + '-bg-g');
      self.textCheckerLabelBgB = document.getElementById(self.id + '-bg-b');

      self.onChangeFontSizeTxt();
      self.onChangeFontWeight();
      self.onChangeFgRGB();
      self.onChangeBgRGB();
    } else {
      self.mainPanel.appendChild(self.textCheckerPanel);
    }

    self.updateTextCheckerBtnPanel();
  },

  onChangeFgRGB: function() {
    var self = Debug;
    var rgb16 = '#' + self.textCheckerInputFgRGB.value;
    var rgb10 = DebugJS.convRGB16to10(rgb16);
    self.textCheckerRangeFgR.value = rgb10.r;
    self.textCheckerRangeFgG.value = rgb10.g;
    self.textCheckerRangeFgB.value = rgb10.b;
    self.onChangeFgColor(null);
    self.textCheck.style.setProperty('color', rgb16, 'important');
  },

  onChangeBgRGB: function() {
    var self = Debug;
    var rgb16 = '#' + self.textCheckerInputBgRGB.value;
    var rgb10 = DebugJS.convRGB16to10(rgb16);
    self.textCheckerRangeBgR.value = rgb10.r;
    self.textCheckerRangeBgG.value = rgb10.g;
    self.textCheckerRangeBgB.value = rgb10.b;
    self.onChangeBgColor(null);
    self.textCheck.style.setProperty('background', rgb16, 'important');
  },

  onChangeFgColor: function(callFromRange) {
    var self = Debug;
    var fgR = self.textCheckerRangeFgR.value;
    var fgG = self.textCheckerRangeFgG.value;
    var fgB = self.textCheckerRangeFgB.value;
    var rgb16 = DebugJS.convRGB10to16(fgR + ' ' + fgG + ' ' + fgB);
    self.textCheckerLabelFgR.innerText = fgR;
    self.textCheckerLabelFgG.innerText = fgG;
    self.textCheckerLabelFgB.innerText = fgB;
    if (callFromRange) {
      self.textCheckerInputFgRGB.value = rgb16.r + rgb16.g + rgb16.b;
      self.textCheck.style.setProperty('color', 'rgb(' + fgR + ',' + fgG + ',' + fgB + ')', 'important');
    }
  },

  onChangeBgColor: function(callFromRange) {
    var self = Debug;
    var bgR = self.textCheckerRangeBgR.value;
    var bgG = self.textCheckerRangeBgG.value;
    var bgB = self.textCheckerRangeBgB.value;
    var rgb16 = DebugJS.convRGB10to16(bgR + ' ' + bgG + ' ' + bgB);
    self.textCheckerLabelBgR.innerText = bgR;
    self.textCheckerLabelBgG.innerText = bgG;
    self.textCheckerLabelBgB.innerText = bgB;
    if (callFromRange) {
      self.textCheckerInputBgRGB.value = rgb16.r + rgb16.g + rgb16.b;
      self.textCheck.style.setProperty('background', 'rgb(' + bgR + ',' + bgG + ',' + bgB + ')', 'important');
    }
  },

  onChangeFontSizeTxt: function() {
    var self = Debug;
    var fontSize = self.textCheckFontSizeInput.value;
    self.textCheckFontSizeRange.value = fontSize;
    self.onChangeFontSize(null);
    self.textCheck.style.setProperty('font-size', fontSize + 'px', 'important');
  },

  onChangeFontSize: function(callFromRange) {
    var self = Debug;
    var fontSize;
    fontSize = self.textCheckFontSizeRange.value;
    if (callFromRange) {
      self.textCheckFontSizeInput.value = fontSize;
      self.textCheck.style.setProperty('font-size', fontSize + 'px', 'important');
    }
  },

  onChangeFontWeight: function() {
    var self = Debug;
    var fontWeight = self.textCheckFontWeightRange.value;
    self.textCheck.style.setProperty('font-weight', fontWeight, 'important');
    if (fontWeight == 400) {
      fontWeight += '(normal)';
    } else if (fontWeight == 700) {
      fontWeight += '(bold)';
    }
    self.textCheckFontWeightLabel.innerText = fontWeight;
  },

  onChangeFontFamily: function(font) {
    var self = Debug;
    var fontFamily = font.value;
    self.textCheck.style.setProperty('font-family', fontFamily, 'important');
  },

  disableTextChecker: function() {
    var self = Debug;
    if (self.textCheckerPanel != null) {
      self.mainPanel.removeChild(self.textCheckerPanel);
    }
    self.status &= ~DebugJS.STATE_TEXT_CHECKING;
    self.updateTextCheckerBtnPanel();
  },

  toggleScriptMode: function() {
    var self = Debug;
    if (self.status & DebugJS.STATE_SCRIPT) {
      self.disableScriptEditor();
    } else {
      self.enableScriptEditor();
    }
  },

  enableScriptEditor: function() {
    var self = Debug;
    self.status |= DebugJS.STATE_SCRIPT;
    if (self.scriptPanel == null) {
      var code1 = 'time.start();\\nfor (var i = 0; i < 1000000; i++) {\\n\\n}\\ntime.end();\\n';
      var code2 = 'var i = 0;\\nledTest();\\nfunction ledTest() {\\n  dbg.setLed(i);\\n  if (i < 255) {\\n    dbg.call(ledTest, 500);\\n  } else {\\n    dbg.ledAllOff();\\n  }\\n  i++;\\n}\\n';

      self.scriptPanel = document.createElement('div');
      self.scriptPanel.className = self.id + '-overlay-panel-half';
      var html = '<div class="' + self.id + '-btn" style="position:relative;top:-2px;float:right;font-size:' + (22 * self.options.zoom) + 'px;color:#888;" onclick="Debug.disableScriptEditor();" onmouseover="this.style.color=\'#d88\';" onmouseout="this.style.color=\'#888\';">×</div>' +
      '<span style="color:#ccc;">Script Editor</span>' +
      '<span class="' + self.id + '-btn" style="float:right;" onclick="Debug.execScript();">[EXEC]</span>' +
      '<span class="' + self.id + '-btn" style="margin-left:4px;" onclick="Debug.insertSnippet(\'' + code1 + '\')">[CODE1]</span>' +
      '<span class="' + self.id + '-btn" style="margin-left:4px;" onclick="Debug.insertSnippet(\'' + code2 + '\')">[CODE2]</span>' +
      '<span class="' + self.id + '-btn" style="margin-left:4px;" onclick="Debug.insertSnippet(null)">[CLR]</span>';
      self.scriptPanel.innerHTML = html;
      self.collapseMessagePanel();
      self.mainPanel.appendChild(self.scriptPanel);

      self.scriptEditor = document.createElement('textarea');
      self.scriptEditor.style.width = 'calc(100% - 5px)';
      self.scriptEditor.style.height = 'calc(100% - ' + (self.options.fontSize + 7) + 'px)';
      self.scriptEditor.style.marginTop = '2px';
      self.scriptEditor.style.boxSizing = 'content-box';
      self.scriptEditor.style.padding = '2px';
      self.scriptEditor.style.border = 'solid 1px #1883d7';
      self.scriptEditor.style.borderRadius = '0';
      self.scriptEditor.style.outline = 'none';
      self.scriptEditor.style.background = 'transparent';
      self.scriptEditor.style.color = '#fff';
      self.scriptEditor.style.fontSize = self.options.fontSize + 'px';
      self.scriptEditor.style.fontFamily = self.options.fontFamily;
      self.scriptEditor.style.resize = 'none';
      self.scriptEditor.onblur = new Function('Debug.saveScriptBuf();');
      self.scriptEditor.value = self.scriptBuf;
      self.scriptPanel.appendChild(self.scriptEditor);
    }
    self.updateScriptBtnPanel();
    self.scriptEditor.focus();
  },

  insertSnippet: function(code) {
    var self = Debug;
    var editor = self.scriptEditor;
    if (code == null) {
      editor.value = '';
      editor.focus();
    } else {
      var buf = editor.value;
      var posCursole = editor.selectionStart;
      var leftBuf = buf.substr(0, posCursole);
      var rightBuf = buf.substr(posCursole, buf.length);
      buf = leftBuf + code + rightBuf;
      self.scriptEditor.focus();
      self.scriptEditor.value = buf;
      editor.selectionStart = editor.selectionEnd = posCursole + code.length;
    }
  },

  saveScriptBuf: function() {
    var self = Debug;
    self.scriptBuf = self.scriptEditor.value;
  },

  execScript: function() {
    var self = Debug;
    try {
      DebugJS.log(eval(self.scriptBuf));
    } catch (e) {
      DebugJS.log.e(e);
    }
  },

  disableScriptEditor: function() {
    var self = Debug;
    self.stopScript();
    self.updateScriptBtnPanel();
  },

  stopScript: function() {
    var self = Debug;
    if (self.scriptPanel != null) {
      self.mainPanel.removeChild(self.scriptPanel);
      self.scriptPanel = null;
      self.expandMessagePanel();
    }
    self.status &= ~DebugJS.STATE_SCRIPT;
  },

  isOnDebugWindow: function(x, y) {
    var self = Debug;
    var sizePos = self.getSelfSizePos();
    if (((x >= sizePos.winX1) && (x <= sizePos.winX2)) && ((y >= sizePos.winY1) && (y <= sizePos.winY2))) {
      return true;
    }
    return false;
  },

  getSelfSizePos: function() {
    var self = Debug;
    var rect = self.debugWindow.getBoundingClientRect();
    var resizeBoxSize = 6;
    var sizePos = {};
    sizePos.width = self.debugWindow.clientWidth;
    sizePos.height = self.debugWindow.clientHeight;
    sizePos.winX1 = rect.left - resizeBoxSize / 2;
    sizePos.winY1 = rect.top - resizeBoxSize / 2;
    sizePos.winX2 = sizePos.winX1 + self.debugWindow.clientWidth + resizeBoxSize + DebugJS.WINDOW_BORDER;
    sizePos.winY2 = sizePos.winY1 + self.debugWindow.clientHeight + resizeBoxSize + DebugJS.WINDOW_BORDER;
    return sizePos;
  },

  turnLed: function(pos, active) {
    var self = Debug;
    var bit = 0;
    switch (pos) {
      case 0:
        bit = DebugJS.IND_BIT_0;
        break;
      case 1:
        bit = DebugJS.IND_BIT_1;
        break;
      case 2:
        bit = DebugJS.IND_BIT_2;
        break;
      case 3:
        bit = DebugJS.IND_BIT_3;
        break;
      case 4:
        bit = DebugJS.IND_BIT_4;
        break;
      case 5:
        bit = DebugJS.IND_BIT_5;
        break;
      case 6:
        bit = DebugJS.IND_BIT_6;
        break;
      case 7:
        bit = DebugJS.IND_BIT_7;
        break;
      default:
        break;
    }
    if (active) {
      self.led |= bit;
    } else {
      self.led &= ~bit;
    }
    self.updateLedPanel();
  },

  execCmd: function() {
    var self = Debug;
    var cl = self.cmdLine.value;
    if (cl != '') {
      self.cmdHistoryBuf.add(cl);
    }
    self.cmdHistoryIdx = (self.cmdHistoryBuf.count() < self.CMD_HISTORY_MAX) ? self.cmdHistoryBuf.count() : self.CMD_HISTORY_MAX;
    self.cmdLine.value = '';
    DebugJS.log.s(cl);
    self._execCmd(cl);
  },

  _execCmd: function(cl) {
    var self = Debug;
    wkCL = cl.replace(/\s{2,}/g, ' ');
    var cmds = wkCL.match(/([^\s]{1,})\s(.*)/);
    var cmd = wkCL, args = '';
    if (cmds != null) {
      cmd = cmds[1];
      args = cmds[2];
    }
    var found = false;
    for (var i = 0, len = self.CMD_TBL.length; i < len; i++) {
      if (cmd == self.CMD_TBL[i].cmd) {
        found = true;
        self.CMD_TBL[i].fnc(args, self.CMD_TBL[i]);
        break;
      }
    }
    if (!found) {found = self.cmdRadixConv(cl);}
    if (!found) {found = self.cmdTimeCalc(cl);}
    if ((!found) && (cl.match(/^http/))) {
      DebugJS.httpRequest(cl, 'GET');
      found = true;
    }
    if (!found) {
      try {
        DebugJS.log(eval(cl));
      } catch (e) {
        DebugJS.log.e(e);
      }
    }
  },

  cmdCls: function(args, tbl) {
    var self = Debug;
    self.clearMessage();
  },

  cmdElements: function(args, tbl) {
    DebugJS.countElements(args, true);
  },

  cmdExit: function(args, tbl) {
    var self = Debug;
    if (self.status & DebugJS.STATE_SCRIPT) {
      self.disableScriptEditor();
      self.scriptBuf = '';
    }
    if (self.status & DebugJS.STATE_TEXT_CHECKING) {
      self.disableTextChecker();
    }
    if (self.options.useSuspendLogButton) {
      self.status &= ~DebugJS.STATE_LOG_SUSPENDING;
      self.updateSuspendLogBtnPanel();
    }
    if ((self.status & DebugJS.STATE_DYNAMIC) && (self.options.usePinButton)) {
      self.enableDraggable();
    }
    if (self.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      self.stopStopWatch();
    }
    self.resetStopWatch();
    self.closeDebugWindow();
    self.clearMessage();
  },

  cmdGet: function(args, tbl) {
    if (args == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.httpRequest(args, 'GET');
    }
  },

  cmdHelp: function(args, tbl) {
    var self = Debug;
    var str = 'Available Commands:\n<table>';
    for (var i = 0, len = self.CMD_TBL.length; i < len; i++) {
      str += '<tr><td>' + self.CMD_TBL[i].cmd + '</td><td>' + self.CMD_TBL[i].desc + '</td></tr>';
    }
    str += '</table>';
    DebugJS.log.mlt(str);
  },

  cmdHistory: function(args, tbl) {
    var self = Debug;
    var buf = self.cmdHistoryBuf.getAll();
    var str = '';
    for (var i = 0, len = (buf.length - 1); i < len; i++) {
      str += buf[i] + '\n';
    }
    DebugJS.log.mlt(str);
  },

  cmdJson: function(args, tbl) {
    if (args == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.execCmdJson(args);
    }
  },

  cmdJquery: function(args, tbl) {
    if (typeof jQuery == 'undefined') {
      DebugJS.log.w('jQuery is not loaded.');
    } else {
      DebugJS.log('jQuery v' + jQuery.fn.jquery);
    }
  },

  cmdP: function(args, tbl) {
    if (args == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.execCmdP(args);
    }
  },

  cmdPost: function(args, tbl) {
    if (args == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.httpRequest(args, 'POST');
    }
  },

  cmdRandom: function(args, tbl) {
    var a = args.split(' ');
    if (a == null) {
      DebugJS.printUsage(tbl.usage);
    } else {
      var type = a[0] || DebugJS.RANDOM_TYPE_NUM;
      var min, max;

      if (!a[0]) {
        type = DebugJS.RANDOM_TYPE_NUM;
      } else {
        if ((a[0] == DebugJS.RANDOM_TYPE_NUM) || (a[0] == DebugJS.RANDOM_TYPE_STR)) {
          type = a[0];
          min = a[1];
          max = a[2];
        } else if (a[0].match(/[0-9]{1,}/)) {
          type = DebugJS.RANDOM_TYPE_NUM;
          min = a[0];
          max = a[1];
        } else {
          DebugJS.printUsage(tbl.usage);
        }
      }

      var random = DebugJS.getRandom(type, min, max);
      DebugJS.log(random);
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

  cmdTimeCalc: function(args) {
    var self = Debug;
    if (!args.match(/[\d :\.\+]{1,}/)) {
      return false;
    }
    var arg = args.replace(/\s/g, '');
    var op;
    if (arg.indexOf('-') >= 0) {
      op = '-';
    } else if (arg.indexOf('+') >= 0) {
      op = '+';
    }
    var vals = arg.split(op);
    if (vals.length < 2) {
      return false;
    }
    var timeL = self.convertTimeJson(vals[0]);
    var timeR = self.convertTimeJson(vals[1]);
    if ((timeL == null) || (timeR == null)) {
      return false;
    }
    var ret;
    if (op == '-') {
      ret = self.subTime(timeL, timeR);
    } else if (op == '+') {
      ret = self.addTime(timeL, timeR);
    }

    log('<span style="color:' + self.options.timerColor + ';">' + ret + '</span>');
    return true;
  },

  subTime: function(tL, tR) {
    var hh, mm, ss, ms;
    var c = false;
    if (tL.msec >= tR.msec) {
      ms = tL.msec - tR.msec;
    } else {
      ms = 1000 - tR.msec + tL.msec;
      c = true;
    }
    if (tL.sec > tR.sec) {
      ss = tL.sec - tR.sec;
      if (c) {
        ss -= 1;
      }
      c = false;
    } else if (tL.sec == tR.sec) {
      ss = 0;
      if (c) {
        ss -= 1;
        if (ss == -1) {
          ss = 59;
        }
      }
    } else {
      ss = 60 - tR.sec + tL.sec;
      if (c) {
        ss -= 1;
      }
      c = true;
    }

    if (tL.min > tR.min) {
      mm = tL.min - tR.min;
      if (c) {
        mm -= 1;
      }
      c = false;
    } else if (tL.min == tR.min) {
      mm = 0;
      if (c) {
        mm -= 1;
        if (mm == -1) {
          mm = 59;
        }
      }
    } else {
      mm = 60 - tR.min + tL.min;
      if (c) {
        mm -= 1;
      }
      c = true;
    }

    if (tL.hour > tR.hour) {
      hh = tL.hour - tR.hour;
      if (c) {
        hh -= 1;
      }
      c = false;
    } else if (tL.hour == tR.hour) {
      hh = 0;
      if (c) {
        hh -= 1;
        if (hh == -1) {
          hh = 23;
        }
      }
    } else {
      hh = 24 - tR.hour + tL.hour;
      if (c) {
        hh -= 1;
      }
      c = true;
    }

    var ret = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2) + ':' + ('0' + ss).slice(-2) + '.' + ('00' + ms).slice(-3);
    return ret;
  },

  addTime: function(tL, tR) {
    var hh, mm, ss, ms;
    var c = false;
    ms = tR.msec + tL.msec;
    if (ms >= 1000) {
      ms -= 1000;
      c = true;
    }

    ss = tL.sec + tR.sec;
    if (c) {
      ss++;
    }
    if (ss >= 60) {
      ss -= 60;
      c = true;
    } else {
      c = false;
    }

    mm = tL.min + tR.min;
    if (c) {
      mm++;
    }
    if (mm >= 60) {
      mm -= 60;
      c = true;
    } else {
      c = false;
    }

    hh = tL.hour + tR.hour;
    if (c) {
      hh++;
    }
    if (hh >= 24) {
      hh -= 24;
      c = true;
    } else {
      c = false;
    }

    var ret = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2) + ':' + ('0' + ss).slice(-2) + '.' + ('00' + ms).slice(-3);
    return ret;
  },

  convertTimeJson: function(t) {
    var hour = min = sec = msec = 0;
    var s;
    var times = t.split(':');
    if (times.length == 3) {
      hour = times[0] | 0;
      min = times[1] | 0;
      s = times[2];
    } else if (times.length == 2) {
      hour = times[0] | 0;
      min = times[1] | 0;
      s = '0';
    } else {
      return null;
    }
    var ss = s.split('.');
    if (ss.length == 2) {
      sec = ss[0] | 0;
      msec = ((ss[1] + '00').substr(0, 3)) | 0;
    } else {
      sec = ss | 0;
    }
    if ((min >= 60) || (sec >= 60)) {
      return null;
    }
    var time = {'hour': hour, 'min': min, 'sec': sec, 'msec': msec};
    return time;
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
    } else {
      var a = args.match(/([^\s]{1,})\s{0,}(.*)/);
      if (a == null) {
        DebugJS.printUsage(tbl.usage);
      } else {
        if (a[2] == '') a[2] = DebugJS.DEFAULT_TIMER_NAME;
        switch (a[1]) {
          case 'start':
            DebugJS.timeStart(a[2]);
            break;
          case 'split':
            DebugJS.timeSplit(a[2], false);
            break;
          case 'end':
            DebugJS.timeEnd(a[2]);
            break;
          case 'list':
            DebugJS.timeList();
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
    DebugJS.log(self.v);
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
  },

  getSize: function() {
    return this.buffer.length;
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
};

DebugJS.getCurrentDateTime = function() {
  return DebugJS.getDateTime(new Date());
};

DebugJS.time = function() {
  var d = DebugJS.getCurrentDateTime();
  var t = d.hh + ':' + d.mi + ':' + d.ss + '.' + d.ms;
  return t;
};

DebugJS.getTimerStr = function(timeMs) {
  var wkPassedTimeSec = Math.floor(timeMs / 1000);
  var passedHour;
  if (wkPassedTimeSec >= 3600) {
    passedHour = Math.floor(wkPassedTimeSec / 3600);
    wkPassedTimeSec = (wkPassedTimeSec - (passedHour * 3600));
  } else {
    passedHour = 0;
  }

  var passedMin;
  if (wkPassedTimeSec >= 60) {
    passedMin = Math.floor(wkPassedTimeSec / 60);
    wkPassedTimeSec = (wkPassedTimeSec - (passedMin * 60));
  } else {
    passedMin = 0;
  }

  var passedSec = wkPassedTimeSec;
  var passedMsec = ('00' + timeMs).slice(-3);

  if (passedHour < 10) passedHour = '0' + passedHour;
  if (passedMin < 10) passedMin = '0' + passedMin;
  if (passedSec < 10) passedSec = '0' + passedSec;

  var retStr = passedHour + ':' + passedMin + ':' + passedSec + '.' + passedMsec;
  return retStr;
};

DebugJS.checkMetaKey = function(e) {
  var shift = e.shiftKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var ctrl = e.ctrlKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var alt = e.altKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var metaKey = '<span style="color:' + shift + ';">S</span><span style="color:' + ctrl + ';">C</span><span style="color:' + alt + ';">A</span>';
  return metaKey;
};

DebugJS.execCmdP = function(args) {
  var objs = args.split(' ');
  for (var i = 0, len = objs.length; i < len; i++) {
    if (objs[i] == '') continue;
    var cmd = 'DebugJS.buf="' + objs[i] + ' = ";DebugJS.buf+=DebugJS.objDump(' + objs[i] + ');DebugJS.log.mlt(DebugJS.buf);';
    try {
      eval(cmd);
    } catch (e) {
      DebugJS.log.e(e);
    }
  }
};

DebugJS.INDENT_SP = ' ';
DebugJS.OBJDMP_MAX = 1000;
DebugJS.objDump = function(obj, toJson) {
  var arg = {'lv': 0, 'cnt': 0, 'dump': ''};
  if (typeof obj === 'function') {
    arg.dump += '<span style="color:#4c4;">function</span>()\n';
  }
  var ret = DebugJS._objDump(obj, arg, toJson);
  if (ret.cnt >= DebugJS.OBJDMP_MAX) {
    log.w('The object is too large. (>=' + ret.cnt + ')');
  }
  ret.dump = ret.dump.replace(/: {2,}\{/g, ': {');
  ret.dump = ret.dump.replace(/\[\n {2,}\]/g, '\[\]');
  return ret.dump;
};

DebugJS._objDump = function(obj, arg, toJson) {
  if (arg.cnt >= DebugJS.OBJDMP_MAX) {
    if ((typeof obj !== 'function') || (Object.keys(obj).length > 0)) {
      arg.dump += '<span style="color:#aaa;">...</span>'; arg.cnt++;
    }
    return arg;
  }
  var indent = '';
  for (var i = 0; i < arg.lv; i++) {
    indent += DebugJS.INDENT_SP;
  }
  if (obj instanceof Array) {
    arg.cnt++;
    if (toJson) {
      arg.dump += '[\n';
      indent += DebugJS.INDENT_SP;
    } else {
      arg.dump += '<span style="color:#c08;">[Array][' + obj.length + ']</span>';
    }
    var s = 0;
    for (var i in obj) {
      if (s > 0) {
        if (toJson) {
          arg.dump += ',\n';
        }
      }
      arg.lv++; indent += DebugJS.INDENT_SP;
      if (!toJson) {
        arg.dump += '\n' + indent + '[' + i + '] ';
      }
      arg = DebugJS._objDump(obj[i], arg, toJson);
      arg.lv--; indent = indent.replace(DebugJS.INDENT_SP, '');
      s++;
    }
    if (toJson) {
      indent = indent.replace(DebugJS.INDENT_SP, '');
      if (s > 0) {
        arg.dump += '\n';
      }
      arg.dump += indent + ']';
    }
  } else if (obj instanceof Object) {
    arg.cnt++;
    if (typeof obj !== 'function') {
      if (toJson) {
        arg.dump += indent;
      } else {
        arg.dump += '<span style="color:#49f;">[Object]</span> ';
      }
      arg.dump += '{\n';
    }
    indent += DebugJS.INDENT_SP;
    var s = 0;
    for (var key in obj) {
      if (s > 0) {
        if (toJson) {
          arg.dump += ',';
        }
        arg.dump += '\n';
      }
      if (typeof obj[key] === 'function') {
        arg.dump += indent + '<span style="color:#4c4;">function</span> ' + key + '()'; arg.cnt++;
        if (Object.keys(obj[key]).length > 0) {
          arg.dump += ' {\n';
        }
      } else if (Object.prototype.toString.call(obj[key]) === '[object Date]') {
        arg.dump += indent;
        if (toJson) {arg.dump += '"';}
        arg.dump += key;
        if (toJson) {arg.dump += '"';}
        arg.dump += ': <span style="color:#f80;">[Date]</span> ' + obj[key];
        s++;
        continue;
      } else {
        arg.dump += indent;
        if (toJson) {arg.dump += '"';}
        arg.dump += key;
        if (toJson) {arg.dump += '"';}
        arg.dump += ': ';
      }
      arg.lv++;
      arg = DebugJS._objDump(obj[key], arg, toJson);
      arg.lv--;
      if (typeof obj[key] === 'function') {
        if (Object.keys(obj[key]).length > 0) {
          arg.dump += '\n' + indent + '}';
        }
      }
      s++;
    }
    indent = indent.replace(DebugJS.INDENT_SP, '');
    if (typeof obj !== 'function') {
      arg.dump += '\n' + indent + '}';
    }
  } else if (obj === null) {
    arg.dump += '<span style="color:#ccc;">null</span>'; arg.cnt++;
  } else if (obj === undefined) {
    arg.dump += '<span style="color:#ccc;">undefined</span>'; arg.cnt++;
  } else if (typeof obj === 'string') {
    var str = obj.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    arg.dump += '"' + str + '"'; arg.cnt++;
  } else {
    arg.dump += obj; arg.cnt++;
  }
  return arg;
};

DebugJS.countElements = function(selector, showDetail) {
  if (!selector) {selector = '*';}
  var cnt = {};
  var element = null;
  var elmList = [];
  var total = 0;
  switch (selector.charAt(0)) {
    case '#':
      element = document.getElementById(selector.substr(1));
      break;
    case '.':
      elmList = document.getElementsByClassName(selector.substr(1));
      break;
    default:
      elmList = document.getElementsByTagName(selector);
      break;
  }

  if (element) {
    DebugJS.getChildElements(element, elmList);
  }

  if (elmList) {
    for (var i = 0, len = elmList.length; i < len; i++) {
      if (!cnt[elmList[i].tagName]) {
        cnt[elmList[i].tagName] = 1;
      } else {
        cnt[elmList[i].tagName]++;
      }
      total++;
    }
  }

  if (showDetail) {
    var l = '<table>';
    for (var key in cnt) {
      l += '<tr><td>' + key + '</td><td style="text-align:right;">' + cnt[key] + '</td></tr>';
    }
    l += '<tr><td>Total</td><td style="text-align:right;">' + total + '</td></tr></table>';
    DebugJS.log.mlt(l);
  }
  return total;
};

DebugJS.getChildElements = function(el, list) {
  if (!el.tagName) {return;}
  list.push(el);
  var children = el.childNodes;
  if (children) {
    var len = children.length;
    for (var i = 0; i < len; i++) {
      DebugJS.getChildElements(children[i], list);
    }
  }
};

DebugJS.execCmdJson = function(json) {
  var flg = true;
  if (json.substr(0, 2) == '-p') {
    json = json.substr(3);
    flg = false;
  }
  try {
    var j = JSON.parse(json);
    var jsn = DebugJS.objDump(j, flg);
    DebugJS.log.mlt(jsn);
  } catch (e) {
    DebugJS.log.e('JSON format error.');
  }
};

DebugJS.digits = function(x) {
  var digit = 0;
  while (x != 0) {
    x = (x / 10) << 0; digit++;
  }
  return digit;
};

DebugJS.printUsage = function(m) {
  DebugJS.log('Usage: ' + m);
};

DebugJS.convRGB = function(v) {
  var ret;
  if (v.indexOf('#') == 0) {
    ret = DebugJS.convRGB16to10(v);
  } else {
    ret = DebugJS.convRGB10to16(v);
  }
  DebugJS.log(ret.rgb);
};

DebugJS.convRGB16to10 = function(rgb16) {
  var self = Debug;
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
    return '<span style="color:' + Debug.options.logColorE + '">invalid value.</span>';
  }
  r10 = parseInt(r16, 16);
  g10 = parseInt(g16, 16);
  b10 = parseInt(b16, 16);
  var rgb10 = '<span style="vertical-align:top;display:inline-block;height:1em;"><span style="background:rgb(' + r10 + ',' + g10 + ',' + b10 + ');width:' + (8 * self.options.zoom) + 'px;height:' + (8 * self.options.zoom) + 'px;margin-top:2px;display:inline-block;"> </span></span> <span style="color:' + DebugJS.COLOR_R + '">' + r10 + '</span> <span style="color:' + DebugJS.COLOR_G + '">' + g10 + '</span> <span style="color:' + DebugJS.COLOR_B + '">' + b10 + '</span>';
  var rgb = {'r': r10, 'g': g10, 'b': b10, 'rgb': rgb10};
  return rgb;
};

DebugJS.convRGB10to16 = function(rgb10) {
  var self = Debug;
  rgb10 = rgb10.replace(/\s{2,}/g, ' ');
  var rgb10s = rgb10.split(' ', 3);
  if ((rgb10s.length != 3) || ((rgb10s[0] < 0) || (rgb10s[0] > 255)) || ((rgb10s[1] < 0) || (rgb10s[1] > 255)) || ((rgb10s[2] < 0) || (rgb10s[2] > 255))) {
    return '<span style="color:' + Debug.options.logColorE + '">invalid value.</span>';
  }
  var r16 = ('0' + parseInt(rgb10s[0]).toString(16)).slice(-2);
  var g16 = ('0' + parseInt(rgb10s[1]).toString(16)).slice(-2);
  var b16 = ('0' + parseInt(rgb10s[2]).toString(16)).slice(-2);
  if ((r16.charAt(0) == r16.charAt(1)) && (g16.charAt(0) == g16.charAt(1)) && (b16.charAt(0) == b16.charAt(1))) {
    r16 = r16.substring(0, 1);
    g16 = g16.substring(0, 1);
    b16 = b16.substring(0, 1);
  }
  var rgb16 = '<span style="vertical-align:top;display:inline-block;height:1em;"><span style="background:#' + r16 + g16 + b16 + ';width:' + (8 * self.options.zoom) + 'px;height:' + (8 * self.options.zoom) + 'px;margin-top:2px;display:inline-block;"> </span></span> #<span style="color:' + DebugJS.COLOR_R + '">' + r16 + '</span><span style="color:' + DebugJS.COLOR_G + '">' + g16 + '</span><span style="color:' + DebugJS.COLOR_B + '">' + b16 + '</span>';
  var rgb = {'r': r16, 'g': g16, 'b': b16, 'rgb': rgb16};
  return rgb;
};

DebugJS.convHEX = function(v16) {
  var v10 = parseInt(v16, 16).toString(10);
  var v2 = parseInt(v16, 16).toString(2);
  var res = 'HEX ' + v16 + '\n' +
  'DEC ' + DebugJS.formatDec(v10) + '\n' +
  'BIN ' + DebugJS.formatBin(v2) + '\n';
  DebugJS.log.mlt(res);
};

DebugJS.convDEC = function(v10) {
  var v2 = parseInt(v10).toString(2);
  var v16 = parseInt(v10).toString(16);
  var res = 'DEC ' + DebugJS.formatDec(v10) + '\n' +
  'HEX ' + v16 + '<br>' +
  'BIN ' + DebugJS.formatBin(v2) + '\n';
  DebugJS.log.mlt(res);
};

DebugJS.convBIN = function(v2) {
  var v10 = parseInt(v2, 2).toString(10);
  var v16 = parseInt(v2, 2).toString(16);
  var res = 'BIN ' + DebugJS.formatBin(v2) + '\n' +
  'DEC ' + DebugJS.formatDec(v10) + '\n' +
  'HEX ' + v16 + '\n';
  DebugJS.log.mlt(res);
};

DebugJS.formatBin = function(v2) {
  var len = v2.length;
  var bin = '';
  for (var i = 0; i < len; i++) {
    if ((i != 0) && ((len - i) % 4 == 0)) {
      bin += ' ';
    }
    bin += v2.charAt(i);
  }
  return bin;
};

DebugJS.formatDec = function(v10) {
  var len = v10.length;
  var dec = '';
  for (var i = 0; i < len; i++) {
    if ((i != 0) && ((len - i) % 3 == 0)) {
      dec += ',';
    }
    dec += v10.charAt(i);
  }
  return dec;
};

DebugJS.timeStart = function(timerName, msg) {
  var self = Debug;
  var _timerName = timerName;

  if ((timerName === undefined) || (timerName === null)) {
    _timerName = DebugJS.DEFAULT_TIMER_NAME;
  }

  self.timers[_timerName] = {};
  self.timers[_timerName].start = (new Date());

  if ((msg === null) || ((timerName === null) && (msg === undefined))) {
    return;
  }

  var str;
  if (msg === undefined) {
    str = _timerName + ': timer started';
  } else {
    str = msg.replace(/%n/g, _timerName).replace(/%t/g, '<span style="color:' + self.options.timerColor + ';">00:00:00.000</span>');
  }

  DebugJS.log(str);
};

DebugJS.timeSplit = function(timerName, isEnd, msg) {
  var now = new Date();
  var self = Debug;
  var _timerName = timerName;

  if ((timerName === undefined) || (timerName === null)) {
    _timerName = DebugJS.DEFAULT_TIMER_NAME;
  }

  if (!self.timers[_timerName]) {
    DebugJS.log.w(_timerName + ': timer undefined');
    return null;
  }

  var prevSplit = self.timers[_timerName].split;
  var t = DebugJS.getElapsedTimeStr(self.timers[_timerName].start, now);
  var dt = '<span style="color:' + self.options.timerColor + ';">' + t + '</span>';

  if (isEnd) {
    delete self.timers[_timerName];
  } else {
    self.timers[_timerName].split = now;
  }

  if ((msg === null) || ((timerName === null) && (msg === undefined))) {
    return t;
  }

  var dtLap = '';
  if (prevSplit) {
    var tLap = DebugJS.getElapsedTimeStr(prevSplit, now);
    dtLap = '<span style="color:' + self.options.timerColor + ';">' + tLap + '</span>';
  } else {
    if (!isEnd) {
      dtLap = dt;
    }
  }

  var str;
  if (msg === undefined) {
    str = _timerName + ': ' + dt;
    if (dtLap != '') {
      str += ' (⊿' + dtLap + ')';
    }
  } else {
    str = msg.replace(/%n/g, _timerName).replace(/%lt/g, dtLap).replace(/%t/g, dt);
  }

  DebugJS.log(str);
  return t;
};

DebugJS.timeEnd = function(timerName, msg) {
  return DebugJS.timeSplit(timerName, true, msg);
};

DebugJS.timeLog = function(timerName, msg) {
  var now = new Date();
  var self = Debug;

  if (timerName === null) {
    timerName = DebugJS.DEFAULT_TIMER_NAME;
  }

  if (!self.timers[timerName]) {
    DebugJS.log.w(timerName + ': timer undefined');
    return;
  }

  var t = DebugJS.getElapsedTimeStr(self.timers[timerName].start, now);
  var dt = '<span style="color:' + self.options.timerColor + ';">' + t + '</span>';

  var dtLap = '';
  if (self.timers[timerName].split) {
    var tLap = DebugJS.getElapsedTimeStr(self.timers[timerName].split, now);
    dtLap = '<span style="color:' + self.options.timerColor + ';">' + tLap + '</span>';
  }

  var str = dt + ' ' + msg.replace(/%n/g, timerName).replace(/%lt/g, dtLap).replace(/%t/g, dt);
  DebugJS.log(str);
  return;
};

DebugJS.timeCheck = function(timerName, now) {
  var self = Debug;
  if (timerName === undefined) timerName = DebugJS.DEFAULT_TIMER_NAME;
  if (!self.timers[timerName]) return null;
  var t = DebugJS.getElapsedTimeStr(self.timers[timerName].start, now);
  return t;
};

DebugJS.timeList = function() {
  var self = Debug;
  var now = new Date();
  var l;
  if (Object.keys(Debug.timers).length == 0) {
    l = '<span style="color:#ccc;">no timers</span>';
  } else {
    l = '<table>';
    for (var key in Debug.timers) {
      l += '<tr><td>' + key + '</td><td><span style="color:' + self.options.timerColor + ';">' + DebugJS.timeCheck(key, now) + '</font></td></tr>';
    }
    l += '</table>';
  }
  DebugJS.log.mlt(l);
};

DebugJS.getElapsedTimeStr = function(t1, t2) {
  var delta = t2.getTime() - t1.getTime();
  var elapsed = DebugJS.getTimerStr(delta);
  return elapsed;
};

DebugJS.getRandom = function(type, min, max) {
  if (min !== undefined) {
    min |= 0;
    if (max) {
      max |= 0;
    } else {
      if (type == DebugJS.RANDOM_TYPE_NUM) {
        max = min;
        min = 0;
      } else if (type == DebugJS.RANDOM_TYPE_STR) {
        max = min;
      }
    }
    if (min > max) {
      var wk = min; min = max; max = wk;
    }
  } else {
    if (type == DebugJS.RANDOM_TYPE_NUM) {
      min = 0;
      max = 0x7fffffff;
    } else if (type == DebugJS.RANDOM_TYPE_STR) {
      min = 1;
      max = DebugJS.RANDOM_STRING_DEFAULT_MAX_LEN;
    }
  }
  var random;
  switch (type) {
    case DebugJS.RANDOM_TYPE_NUM:
      random = DebugJS.getRandomNumber(min, max);
      break;
    case DebugJS.RANDOM_TYPE_STR:
      random = DebugJS.getRandomString(min, max);
      break;
    default:
      break;
  }
  return random;
};

DebugJS.getRandomNumber = function(min, max) {
  var minDigit = (min + '').length;
  var maxDigit = (max + '').length;
  var digit = Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit;
  var randMin = (digit == 1) ? 0 : Math.pow(10, (digit - 1));
  var randMax = Math.pow(10, digit) - 1;
  if (min < randMin) min = randMin;
  if (max > randMax) max = randMax;
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
};

DebugJS.getRandomCharater = function() {
  var ch = String.fromCharCode(DebugJS.getRandomNumber(0x20, 0x7e));
  return ch;
};

DebugJS.RANDOM_STRING_DEFAULT_MAX_LEN = 10;
DebugJS.RANDOM_STRING_MAX_LEN = 1024;
DebugJS.getRandomString = function(min, max) {
  if (min > DebugJS.RANDOM_STRING_MAX_LEN) min = DebugJS.RANDOM_STRING_MAX_LEN;
  if (max > DebugJS.RANDOM_STRING_MAX_LEN) max = DebugJS.RANDOM_STRING_MAX_LEN;
  var len = DebugJS.getRandomNumber(min, max);
  var str = '';
  for (var i = 0; i < len; i++) {
    var ch;
    var retry = true;
    while (retry) {
      ch = DebugJS.getRandomCharater();
      if ((!(ch.match(/[!-/:-@[-`{-~]/))) && (!(((i == 0) || (i == (len - 1))) && (ch == ' ')))) {
        retry = false;
      }
    }
    str += ch;
  }
  return str;
};

DebugJS.httpRequest = function(url, method) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        DebugJS.log.e('cannot load: ' + xhr.status + ' ' + xhr.statusText);
      }
      var head = xhr.getAllResponseHeaders();
      var txt = xhr.responseText.replace(/</g, '&lt;');
      txt = txt.replace(/>/g, '&gt;');
      if (head || txt) {
        var res = '<span style="color:#5ff">' + head + '</span>' + txt;
        DebugJS.log.mlt(res);
      }
    }
  };
  xhr.send(null);
};

DebugJS.log = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_STANDARD);
};

DebugJS.log.e = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_ERROR);
};

DebugJS.log.w = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_WARNING);
};

DebugJS.log.i = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_INFO);
};

DebugJS.log.d = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_DEBUG);
};

DebugJS.log.s = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_SYSTEM);
};

DebugJS.log.p = function(o) {
  var m = '\n' + DebugJS.objDump(o);
  DebugJS.log.out(m, DebugJS.LOG_TYPE_STANDARD);
};

DebugJS.log.mlt = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_MULTILINE);
};

DebugJS.log.out = function(msg, type) {
  if (msg != null) {
    var data = {'type': type, 'time': DebugJS.time(), 'msg': msg};
    Debug.msgBuf.add(data);
  }
  if (!(Debug.status & DebugJS.STATE_INITIALIZED)) {
    if (!DebugJS.init()) {return;}
  }
  Debug.printMessage();
};

DebugJS.init = function() {
  if (!(Debug.status & DebugJS.STATE_INITIALIZED)) {
    return Debug.init(null, null);
  } else {
    return true;
  }
};
// ---- ---- ---- ---- ---- ---- ---- ----
var log = function(m) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log(m);
};

log.e = function(m) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.e(m);
};

log.w = function(m) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.w(m);
};

log.i = function(m) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.i(m);
};

log.d = function(m) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.d(m);
};

log.s = function(m) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.s(m);
};

log.t = function(n, m) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.timeLog(n, m);
};

log.p = function(o) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.p(o);
};

log.stack = function() {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  var err = new Error();
  DebugJS.log(err.stack);
};

log.clear = function() {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  Debug.clearMessage();
};

// ---- ---- ---- ---- ---- ---- ---- ----
var time = function() {};
time.start = function(timerName, msg) {
  DebugJS.timeStart(timerName, msg);
};

time.split = function(timerName, msg) {
  var t = DebugJS.timeSplit(timerName, false, msg);
  if ((msg === null) || ((timerName === null) && (msg === undefined))) {
    return t;
  }
  return;
};

time.end = function(timerName, msg) {
  var t = DebugJS.timeEnd(timerName, msg);
  if ((msg === null) || ((timerName === null) && (msg === undefined))) {
    return t;
  }
  return;
};

time.check = function(timerName) {
  var now = new Date();
  return DebugJS.timeCheck(timerName, now);
};

// ---- ---- ---- ---- ---- ---- ---- ----
dbg.init = function(options) {
  Debug.init(options);
};

dbg.countElements = function(selector, showDetail) {
  return DebugJS.countElements(selector, showDetail);
};

dbg.call = function(fnc, delay) {
  if (delay === undefined) delay = 0;
  return setTimeout(fnc, delay);
};

dbg.exec = function(cmd) {
  if (Debug.status & DebugJS.STATE_LOG_SUSPENDING) return;
  Debug._execCmd(cmd);
};

dbg.setLed = function(val) {
  Debug.led = val;
  Debug.updateLedPanel();
};

dbg.ledOn = function(pos) {
  Debug.turnLed(pos, true);
};

dbg.ledOff = function(pos) {
  Debug.turnLed(pos, false);
};

dbg.ledAllOn = function() {
  Debug.led = 0xff;
  Debug.updateLedPanel();
};

dbg.ledAllOff = function() {
  Debug.led = 0;
  Debug.updateLedPanel();
};

dbg.random = function(min, max) {
  return DebugJS.getRandom(DebugJS.RANDOM_TYPE_NUM, min, max);
};

dbg.randomString = function(min, max) {
  return DebugJS.getRandom(DebugJS.RANDOM_TYPE_STR, min, max);
};
// ---- ---- ---- ---- ---- ---- ---- ----
var Debug = new DebugJS();
if (DebugJS.ENABLE) {
  window.addEventListener('load', DebugJS.init, true);
  if (DebugJS.CATCH_ALL_ERRORS) {
    window.onerror = function(msg, file, line, col, err) {
      DebugJS.log.e(msg + ' ' + file + '(' + line + ':' + col + ')');
    };
  }
  if (DebugJS.UNIFY_CONSOLE) {
    console.log = function(x) {log(x);};
    console.info = function(x) {log.i(x);};
    console.warn = function(x) {log.w(x);};
    console.error = function(x) {log.e(x);};
    console.time = function(x) {time.start(x);};
    console.timeEnd = function(x) {time.end(x);};
  }
} else {
  log = function(x) {};
  log.e = function(x) {};
  log.w = function(x) {};
  log.i = function(x) {};
  log.d = function(x) {};
  log.s = function(x) {};
  log.t = function(x, xx) {};
  log.p = function(x) {};
  log.stack = function() {};
  log.clear = function() {};
  time.start = function(x, xx) {};
  time.split = function(x, xx) {};
  time.end = function(x, xx) {};
  time.check = function(x) {};
  dbg.init = function(x) {};
  dbg.countElements = function(x, xx) {};
  dbg.call = function(x, xx) {};
  dbg.exec = function(x) {};
  dbg.setLed = function(x) {};
  dbg.ledOn = function(x) {};
  dbg.ledOff = function(x) {};
  dbg.ledAllOn = function() {};
  dbg.ledAllOff = function() {};
  dbg.random = function(min, max) {};
  dbg.randomString = function(min, max) {};
}
