/*!
 * debug.js
 * Copyright 2016 Takashi Harano
 * Released under the MIT license
 * https://debugjs.net/
 */
var DebugJS = function() {
  this.v = '201609031500';

  this.DEFAULT_OPTIONS = {
    'visible': false,
    'keyAssign': {
      'key': 113,
      'alt': false,
      'ctrl': false,
      'shift': false
    },
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
    'logColorI': '#9ef',
    'logColorD': '#ccc',
    'logColorS': '#fff',
    'clockColor': '#8f0',
    'timerColor': '#9ef',
    'sysInfoColor': '#ddd',
    'btnColor': '#6cf',
    'btnHoverColor': '#8ef',
    'promptColor': '#0cf',
    'bgColor': '0,0,0',
    'bgOpacity': '0.65',
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
    'useSystemInfo': true,
    'useElementInfo': true,
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
  this.sysInfoBtnPanel = null;
  this.sysInfoPanel = null;
  this.elmInspectionBtnPanel = null;
  this.elmInspectionPanel = null;
  this.elmInspectionPanelBody = null;
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
  this.overlayBasePanel = null;
  this.overlayPanels = [];
  this.msgPanel = null;
  this.msgPanelScrollX = 0;
  this.msgPanelScrollY = 0;
  this.cmdPanel = null;
  this.cmdLine = null;
  this.cmdHistoryBuf = null;
  this.CMD_HISTORY_MAX = 20;
  this.cmdHistoryIdx = this.CMD_HISTORY_MAX;
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
  this.orgSizePos = {'w': 0, 'h': 0, 't': 0, 'l': 0};
  this.expandModeOrg = {'w': 0, 'h': 0, 't': 0, 'l': 0};
  this.clickedPosX = 0;
  this.clickedPosY = 0;
  this.prevOffsetTop = 0;
  this.prevOffsetLeft = 0;
  this.savedFunc = null;
  this.status = 0;
  this.msgBuf = new DebugJS.RingBuffer(this.DEFAULT_OPTIONS.bufsize);
  this.CMD_TBL = [
    {'cmd': 'cls', 'fnc': this.cmdCls, 'desc': 'Clear log message.'},
    {'cmd': 'elements', 'fnc': this.cmdElements, 'desc': 'Count elements by #id / .className / tagName', 'usage': 'elements [#id|.className|tagName]'},
    {'cmd': 'execute', 'fnc': this.cmdExecute, 'desc': 'Execute the edited JavaScript code'},
    {'cmd': 'exit', 'fnc': this.cmdExit, 'desc': 'Close the debug window and clear all status'},
    {'cmd': 'get', 'fnc': this.cmdGet, 'desc': 'Send an HTTP request by GET method', 'usage': 'get URL'},
    {'cmd': 'help', 'fnc': this.cmdHelp, 'desc': 'Displays available command list'},
    {'cmd': 'history', 'fnc': this.cmdHistory, 'desc': 'Displays command history'},
    {'cmd': 'json', 'fnc': this.cmdJson, 'desc': 'Parse one-line JSON', 'usage': 'json [-p] one-line-json'},
    {'cmd': 'jquery', 'fnc': this.cmdJquery, 'desc': 'Displays what version of jQuery is loaded'},
    {'cmd': 'led', 'fnc': this.cmdLed, 'desc': 'Set a bit pattern to the indicator', 'usage': 'led bit-pattern'},
    {'cmd': 'p', 'fnc': this.cmdP, 'desc': 'Print JavaScript Objects', 'usage': 'p object'},
    {'cmd': 'post', 'fnc': this.cmdPost, 'desc': 'Send an HTTP request by POST method', 'usage': 'post URL'},
    {'cmd': 'random', 'fnc': this.cmdRandom, 'desc': 'Generate a rondom number/string', 'usage': 'random [-d|-s] [min] [max]'},
    {'cmd': 'rgb', 'fnc': this.cmdRGB, 'desc': 'Convert RGB color values between HEX and DEC', 'usage': 'rgb color-value (#<span style="color:' + DebugJS.COLOR_R + '">R</span><span style="color:' + DebugJS.COLOR_G + '">G</span><span style="color:' + DebugJS.COLOR_B + '">B</span> | <span style="color:' + DebugJS.COLOR_R + '">R</span> <span style="color:' + DebugJS.COLOR_G + '">G</span> <span style="color:' + DebugJS.COLOR_B + '">B</span>)'},
    {'cmd': 'self', 'fnc': this.cmdSelf, 'hidden': true},
    {'cmd': 'time', 'fnc': this.cmdTime, 'desc': 'Manipulate the timer', 'usage': 'time start|split|end|list [timer-name]'},
    {'cmd': 'v', 'fnc': this.cmdV, 'desc': 'Displays version info'}
  ];
  this.cmdTblLen = this.CMD_TBL.length;
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
DebugJS.STATE_SYSTEM_INFO = 0x40000;
DebugJS.STATE_ELEMENT_INSPECTING = 0x80000;
DebugJS.STATE_TEXT_CHECKING = 0x100000;
DebugJS.STATE_SCRIPT = 0x200000;
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
DebugJS.DEBUG_WIN_EXPAND_W = 960;
DebugJS.DEBUG_WIN_EXPAND_H = 640;
DebugJS.WINDOW_SHADOW = 10;
DebugJS.WINDOW_BORDER = 1;
DebugJS.WINDOW_PADDING = 1;
DebugJS.WINDOW_ADJUST = ((DebugJS.WINDOW_BORDER * 2) + (DebugJS.WINDOW_PADDING * 2));
DebugJS.OVERLAY_PANEL_HEIGHT = 83; //%
DebugJS.CMD_LINE_PADDING = 3;
DebugJS.COLOR_ACTIVE = '#fff';
DebugJS.COLOR_INACTIVE = '#999';
DebugJS.MEASURE_BUTTON_COLOR = '#6cf';
DebugJS.SYS_BUTTON_COLOR = '#3af';
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
DebugJS.KEYWORD_COLOR = '#2f6';
DebugJS.RANDOM_TYPE_NUM = '-d';
DebugJS.RANDOM_TYPE_STR = '-s';
DebugJS.OMIT_LAST = 0;
DebugJS.OMIT_MID = 1;
DebugJS.OMIT_FIRST = 2;
DebugJS.SNIPPET = [
'time.start();\nfor (var i = 0; i < 1000000; i++) {\n\n}\ntime.end();\n\'done\';\n',
'var i = 0;\nledTest();\nfunction ledTest() {\n  dbg.led(i);\n  if (i < 255) {\n    dbg.call(ledTest, 500);\n  } else {\n    dbg.led.all(false);\n  }\n  i++;\n}\n\'LED DEMO\';\n',
'var str = \'\';\nfor (var i = 0x20; i <= 0x7e; i++) {\n  if ((i % 0x10) == 0) {\n    str += \'\\n\';\n  }\n  str += String.fromCharCode(i);\n}\nstr;\n',
'// performance check\nvar i = 0;\ntime.start(\'total\');\ntest();\nfunction test() {\ntime.start();\ntime.end();\n  i++;\n  if (i == 1000) {\n    time.end(\'total\');\n  } else {\n    dbg.call(test);\n  }\n}\n',
'<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title></title>\n<link rel="stylesheet" href="style.css" />\n<script src="script.js"></script>\n<style>\n</style>\n<script>\n</script>\n</head>\n<body>\nhello\n</body>\n</html>\n'
];
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
  'useSystemInfo',
  'useElementInfo',
  'useTextChecker',
  'useScriptEditor',
  'useCommandLine'
];

DebugJS.prototype = {
  init: function(options) {
    if (!DebugJS.ENABLE) {return false;}
    var self = DebugJS.self;
    self.bodyEl = document.body;
    if (!self.bodyEl) {
      return false;
    }

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
          var self = DebugJS.self;
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
        var self = DebugJS.self;
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
        var self = DebugJS.self;
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
          var self = DebugJS.self;
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
          var self = DebugJS.self;
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
          var self = DebugJS.self;
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
        var self = DebugJS.self;
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
          var self = DebugJS.self;
          if (!(self.status & DebugJS.STATE_RESIZABLE)) return;
          self.startResize(e);
          self.status |= DebugJS.STATE_RESIZING_S | DebugJS.STATE_RESIZING_W;
          self.bodyEl.style.cursor = 'nesw-resize';
        };
        self.debugWindow.appendChild(self.resizeSW);
      }
    }

    // style settings
    var styles = {};
    if (DebugJS.getBrowserType().name == 'Firefox') {
      styles['#' + self.id] = {
        'letter-spacing': '-0.35px',
      };
    } else {
      styles['#' + self.id] = {
        'letter-spacing': '0',
      };
    }

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

    styles['.' + self.id + '-overlay-base-panel'] = {
      'position': 'relative',
      'top': '0',
      'left': '0',
      'width': 'calc(100% - 2px)',
      'height': DebugJS.OVERLAY_PANEL_HEIGHT + '%'
    };

    var overlayPanelBorder = 1;
    var overlayPanelPadding = 2;
    styles['.' + self.id + '-overlay-panel'] = {
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'width': 'calc(100% - ' + ((overlayPanelPadding) * 2) + 'px)',
      'height': 'calc(100% - ' + ((overlayPanelPadding) * 2) + 'px)',
      'padding': overlayPanelPadding + 'px',
      'border': 'solid ' + overlayPanelBorder + 'px #333',
      'background': 'rgba(0,0,0,0.5)',
      'overflow': 'auto'
    };

    styles['.' + self.id + '-overlay-panel pre'] = {
      'padding': '0 1px',
      'color': self.options.fontColor,
      'font-size': self.options.fontSize + 'px',
      'font-family': self.options.fontFamily
    };

    styles['.' + self.id + '-overlay-panel-full'] = {
      'position': 'absolute',
      'top': (self.options.fontSize + DebugJS.WINDOW_ADJUST) + 'px',
      'left': '1px',
      'width': 'calc(100% - ' + (DebugJS.WINDOW_SHADOW + DebugJS.WINDOW_ADJUST - ((overlayPanelPadding * 2) + (overlayPanelBorder * 2))) + 'px)',
      'height': 'calc(100% - ' + ((self.options.fontSize + DebugJS.WINDOW_ADJUST) + DebugJS.WINDOW_SHADOW + self.options.fontSize + 10 - (overlayPanelPadding * 2)) + 'px)',
      'padding': overlayPanelPadding + 'px',
      'border': 'solid ' + overlayPanelBorder + 'px #333',
      'background': 'rgba(0,0,0,0.5)',
      'overflow': 'auto'
    };

    styles['.' + self.id + '-separator'] = {
      'height': (self.options.fontSize * 0.5) + 'px'
    };

    styles['.' + self.id + '-unavailable'] = {
      'color': '#ccc'
    };

    styles['.' + self.id + '-showhide-button'] = {
      'color': '#0a0',
      'font-size': (self.options.fontSize * 0.8) + 'px'
    };

    styles['.' + self.id + '-showhide-button:hover'] = {
      'cursor': 'pointer'
    };

    styles['.' + self.id + '-showhide-body'] = {
      'display': 'none'
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
      'padding': '0 !important',
      'border': 'none !important',
      'outline': 'none !important',
      'box-shadow': 'none !important'
    };

    styles['.' + self.id + '-txt-tbl td'] = {
      'font-size': self.options.fontSize + 'px !important',
      'line-height': '1em !important',
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
      self.resetDebugWindowSizePos();

      if (!(self.status & DebugJS.STATE_VISIBLE)) {
        self.debugWindow.style.display = 'none';
      }
    } else {
      self.initWidth = self.debugWindow.offsetWidth - DebugJS.WINDOW_ADJUST;
      self.initHeight = self.debugWindow.offsetHeight - DebugJS.WINDOW_ADJUST;
    }
    self.initExtention();
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
    var self = DebugJS.self;

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
    var self = DebugJS.self;
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
    var self = DebugJS.self;
    var len = DebugJS.FEATURES.length;
    for (var i = 0; i < len; i++) {
      self.options[DebugJS.FEATURES[i]] = false;
    }
  },

  isAllFeaturesDisabled: function() {
    var self = DebugJS.self;
    var len = DebugJS.FEATURES.length;
    for (var i = 0; i < len; i++) {
      if (self.options[DebugJS.FEATURES[i]]) return false;
    }
    return true;
  },

  createPanels: function() {
    var self = DebugJS.self;
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
      self.clrBtnPanel.className = this.id + '-btn ' + this.id + '-nomove';
      self.clrBtnPanel.style.marginRight = '3px';
      self.clrBtnPanel.onclick = new Function('DebugJS.self.clearMessage();');
      self.clrBtnPanel.innerText = '[CLR]';
      self.headPanel.appendChild(self.clrBtnPanel);
    }

    // Clock
    if (self.options.useClock) {
      self.clockPanel = document.createElement('span');
      self.clockPanel.style.color = self.options.clockColor;
      self.clockPanel.style.fontSize = self.options.fontSize + 'px';
      self.headPanel.appendChild(self.clockPanel);
    }

    // -- R to L
    // X Button
    if (self.options.togglableShowHide) {
      self.closeBtnPanel = document.createElement('span');
      self.closeBtnPanel.className = this.id + '-btn ' + this.id + '-nomove';
      self.closeBtnPanel.style.float = 'right';
      self.closeBtnPanel.style.marginRight = '2px';
      self.closeBtnPanel.style.color = '#888';
      self.closeBtnPanel.style.fontSize = (22 * self.options.zoom) + 'px';
      self.closeBtnPanel.onmouseover = new Function('this.style.color=\'#d88\';');
      self.closeBtnPanel.onmouseout = new Function('this.style.color=\'#888\';');
      self.closeBtnPanel.onclick = new Function('DebugJS.self.closeDebugWindow();');
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
      self.pinBtnPanel.className = this.id + '-btn ' + this.id + '-nomove';
      self.pinBtnPanel.style.float = 'right';
      self.pinBtnPanel.style.marginRight = '4px';
      self.pinBtnPanel.innerText = '📌';
      self.pinBtnPanel.onclick = new Function('DebugJS.self.toggleDraggable();');
      self.pinBtnPanel.onmouseover = new Function('DebugJS.self.pinBtnPanel.style.color=DebugJS.PIN_BUTTON_COLOR;');
      self.pinBtnPanel.onmouseout = new Function('DebugJS.self.pinBtnPanel.style.color=(DebugJS.self.status & DebugJS.STATE_DRAGGABLE) ? DebugJS.COLOR_INACTIVE : DebugJS.PIN_BUTTON_COLOR;');
      self.headPanel.appendChild(self.pinBtnPanel);
    }

    // Suspend Log Button
    if (self.options.useSuspendLogButton) {
      self.suspendLogBtnPanel = document.createElement('span');
      self.suspendLogBtnPanel.className = this.id + '-btn ' + this.id + '-nomove';
      self.suspendLogBtnPanel.style.float = 'right';
      self.suspendLogBtnPanel.style.marginRight = '4px';
      self.suspendLogBtnPanel.innerText = '🚫';
      self.suspendLogBtnPanel.onclick = new Function('DebugJS.self.toggleLogSuspend();');
      self.suspendLogBtnPanel.onmouseover = new Function('DebugJS.self.suspendLogBtnPanel.style.color=DebugJS.LOG_SUSPEND_BUTTON_COLOR;');
      self.suspendLogBtnPanel.onmouseout = new Function('DebugJS.self.suspendLogBtnPanel.style.color=(DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) ? DebugJS.LOG_SUSPEND_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;');
      self.headPanel.appendChild(self.suspendLogBtnPanel);
    }

    // Stopwatch
    if (self.options.useStopWatch) {
      self.swPanel = document.createElement('span');
      self.swPanel.style.float = 'right';
      self.swPanel.style.marginRight = '6px';
      self.headPanel.appendChild(self.swPanel);

      self.swBtnPanel = document.createElement('span');
      self.swBtnPanel.style.float = 'right';
      self.swBtnPanel.style.marginRight = '3px';
      self.headPanel.appendChild(self.swBtnPanel);
    }

    // Script Button
    if (self.options.useScriptEditor) {
      self.scriptBtnPanel = document.createElement('span');
      self.scriptBtnPanel.className = this.id + '-btn ' + this.id + '-nomove';
      self.scriptBtnPanel.style.float = 'right';
      self.scriptBtnPanel.style.marginRight = '4px';
      self.scriptBtnPanel.innerText = 'JS';
      self.scriptBtnPanel.onclick = new Function('DebugJS.self.toggleScriptMode();');
      self.scriptBtnPanel.onmouseover = new Function('DebugJS.self.scriptBtnPanel.style.color=DebugJS.JS_BUTTON_COLOR;');
      self.scriptBtnPanel.onmouseout = new Function('DebugJS.self.scriptBtnPanel.style.color=(DebugJS.self.status & DebugJS.STATE_SCRIPT) ? DebugJS.JS_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;');
      self.headPanel.appendChild(self.scriptBtnPanel);
    }

    // Text Check Button
    if (self.options.useTextChecker) {
      self.textCheckerBtnPanel = document.createElement('span');
      self.textCheckerBtnPanel.className = this.id + '-btn ' + this.id + '-nomove';
      self.textCheckerBtnPanel.style.float = 'right';
      self.textCheckerBtnPanel.style.marginRight = '3px';
      self.textCheckerBtnPanel.innerText = 'TXT';
      self.textCheckerBtnPanel.onclick = new Function('DebugJS.self.toggleTextCheckerMode();');
      self.textCheckerBtnPanel.onmouseover = new Function('DebugJS.self.textCheckerBtnPanel.style.color=DebugJS.TXT_BUTTON_COLOR;');
      self.textCheckerBtnPanel.onmouseout = new Function('DebugJS.self.textCheckerBtnPanel.style.color=(DebugJS.self.status & DebugJS.STATE_TEXT_CHECKING) ? DebugJS.TXT_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;');
      self.headPanel.appendChild(self.textCheckerBtnPanel);
    }

    // Element Inspection Button
    if (self.options.useElementInfo) {
      self.elmInspectionBtnPanel = document.createElement('span');
      self.elmInspectionBtnPanel.className = this.id + '-btn ' + this.id + '-nomove';
      self.elmInspectionBtnPanel.style.float = 'right';
      self.elmInspectionBtnPanel.style.marginRight = '3px';
      self.elmInspectionBtnPanel.innerText = 'DOM';
      self.elmInspectionBtnPanel.onclick = new Function('DebugJS.self.toggleElmInspectionMode();');
      self.elmInspectionBtnPanel.onmouseover = new Function('DebugJS.self.elmInspectionBtnPanel.style.color=DebugJS.DOM_BUTTON_COLOR;');
      self.elmInspectionBtnPanel.onmouseout = new Function('DebugJS.self.elmInspectionBtnPanel.style.color=(DebugJS.self.status & DebugJS.STATE_ELEMENT_INSPECTING) ? DebugJS.DOM_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;');
      self.headPanel.appendChild(self.elmInspectionBtnPanel);
    }

    // System Info Button
    if (self.options.useSystemInfo) {
      self.sysInfoBtnPanel = document.createElement('span');
      self.sysInfoBtnPanel.className = this.id + '-btn ' + this.id + '-nomove';
      self.sysInfoBtnPanel.style.float = 'right';
      self.sysInfoBtnPanel.style.marginRight = '3px';
      self.sysInfoBtnPanel.innerText = 'SYS';
      self.sysInfoBtnPanel.onclick = new Function('DebugJS.self.toggleSystemInfoMode();');
      self.sysInfoBtnPanel.onmouseover = new Function('DebugJS.self.sysInfoBtnPanel.style.color=DebugJS.SYS_BUTTON_COLOR;');
      self.sysInfoBtnPanel.onmouseout = new Function('DebugJS.self.sysInfoBtnPanel.style.color=(DebugJS.self.status & DebugJS.STATE_SYSTEM_INFO) ? DebugJS.SYS_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;');
      self.headPanel.appendChild(self.sysInfoBtnPanel);
    }

    // Screen Measure Button
    if (self.options.useScreenMeasure) {
      self.measureBtnPanel = document.createElement('span');
      self.measureBtnPanel.className = this.id + '-btn ' + this.id + '-nomove';
      self.measureBtnPanel.style.display = 'inline-block';
      self.measureBtnPanel.style.float = 'right';
      self.measureBtnPanel.style.marginTop = '1px';
      self.measureBtnPanel.style.marginRight = '6px';
      self.measureBtnPanel.style.width = (10 * self.options.zoom) + 'px';
      self.measureBtnPanel.style.height = (7 * self.options.zoom) + 'px';
      self.measureBtnPanel.innerText = ' ';
      self.measureBtnPanel.onclick = new Function('DebugJS.self.toggleMeasureMode();');
      self.measureBtnPanel.onmouseover = new Function('DebugJS.self.measureBtnPanel.style.borderColor=\'' + DebugJS.MEASURE_BUTTON_COLOR + '\';');
      self.measureBtnPanel.onmouseout = new Function('DebugJS.self.measureBtnPanel.style.borderColor=(DebugJS.self.status & DebugJS.STATE_MEASURE) ? DebugJS.MEASURE_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;');
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
      self.cmdLine.style.setProperty('box-shadow', 'none', 'important');
      self.cmdLine.style.setProperty('background', 'transparent', 'important');
      self.cmdLine.style.setProperty('color', self.options.fontColor, 'important');
      self.cmdLine.style.setProperty('font-size', self.options.fontSize + 'px', 'important');
      self.cmdLine.style.setProperty('font-family', self.options.fontFamily, 'important');
      self.cmdPanel.appendChild(self.cmdLine);
      self.cmdHistoryBuf = new DebugJS.RingBuffer(self.CMD_HISTORY_MAX);
    }
  },

  initDebugWindow: function() {
    var self = DebugJS.self;
    if (self.isAllFeaturesDisabled()) {
      return;
    }

    if (self.status & DebugJS.STATE_SHOW_CLOCK) {
      self.updateClockPanel();
    }

    if (self.options.useScreenMeasure) {
      self.updateMeasureBtnPanel();
    }

    if (self.options.useSystemInfo) {
      self.updateSysInfoBtnPanel();
    }

    if (self.options.useElementInfo) {
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

    if (self.options.useWindowSizeInfo) {
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
    var self = DebugJS.self;
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
    var self = DebugJS.self;
    var dt = DebugJS.getCurrentDateTime();
    var t = dt.yyyy + '-' + dt.mm + '-' + dt.dd + '(' + DebugJS.WDAYS[dt.wday] + ') ' + dt.hh + ':' + dt.mi + ':' + dt.ss;
    //t += (dt.ms < 500) ? ' ' : '.';
    self.clockPanel.innerText = t;
    if (self.status & DebugJS.STATE_SHOW_CLOCK) {
      setTimeout(self.updateClockPanel, 500);
    }
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
    var self = DebugJS.self;
    if (self.ledPanel) {
      var SHADOW = 'text-shadow:0 0 5px;';
      var bit7Color = (self.led & DebugJS.IND_BIT_7) ? 'color:' + DebugJS.IND_BIT_7_COLOR + ';' + SHADOW : 'color:' + DebugJS.IND_COLOR_INACTIVE + ';';
      var bit6Color = (self.led & DebugJS.IND_BIT_6) ? 'color:' + DebugJS.IND_BIT_6_COLOR + ';' + SHADOW : 'color:' + DebugJS.IND_COLOR_INACTIVE + ';';
      var bit5Color = (self.led & DebugJS.IND_BIT_5) ? 'color:' + DebugJS.IND_BIT_5_COLOR + ';' + SHADOW : 'color:' + DebugJS.IND_COLOR_INACTIVE + ';';
      var bit4Color = (self.led & DebugJS.IND_BIT_4) ? 'color:' + DebugJS.IND_BIT_4_COLOR + ';' + SHADOW : 'color:' + DebugJS.IND_COLOR_INACTIVE + ';';
      var bit3Color = (self.led & DebugJS.IND_BIT_3) ? 'color:' + DebugJS.IND_BIT_3_COLOR + ';' + SHADOW : 'color:' + DebugJS.IND_COLOR_INACTIVE + ';';
      var bit2Color = (self.led & DebugJS.IND_BIT_2) ? 'color:' + DebugJS.IND_BIT_2_COLOR + ';' + SHADOW : 'color:' + DebugJS.IND_COLOR_INACTIVE + ';';
      var bit1Color = (self.led & DebugJS.IND_BIT_1) ? 'color:' + DebugJS.IND_BIT_1_COLOR + ';' + SHADOW : 'color:' + DebugJS.IND_COLOR_INACTIVE + ';';
      var bit0Color = (self.led & DebugJS.IND_BIT_0) ? 'color:' + DebugJS.IND_BIT_0_COLOR + ';' + SHADOW : 'color:' + DebugJS.IND_COLOR_INACTIVE + ';';
      var led = '' +
      '<span style="' + bit7Color + 'margin-right:2px;">●</span>' +
      '<span style="' + bit6Color + 'margin-right:2px;">●</span>' +
      '<span style="' + bit5Color + 'margin-right:2px;">●</span>' +
      '<span style="' + bit4Color + 'margin-right:2px;">●</span>' +
      '<span style="' + bit3Color + 'margin-right:2px;">●</span>' +
      '<span style="' + bit2Color + 'margin-right:2px;">●</span>' +
      '<span style="' + bit1Color + 'margin-right:2px;">●</span>' +
      '<span style="' + bit0Color + '">●</span>';
      self.ledPanel.innerHTML = led;
    }
  },

  // Update Measure Button
  updateMeasureBtnPanel: function() {
    var self = DebugJS.self;
    self.measureBtnPanel.style.border = 'solid 1px ' + ((self.status & DebugJS.STATE_MEASURE) ? DebugJS.MEASURE_BUTTON_COLOR : DebugJS.COLOR_INACTIVE);
  },

  // Update System Info Button
  updateSysInfoBtnPanel: function() {
    var self = DebugJS.self;
    self.sysInfoBtnPanel.style.color = (self.status & DebugJS.STATE_SYSTEM_INFO) ? DebugJS.SYS_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update Element Inspection Button
  updateElmInspectionBtnPanel: function() {
    var self = DebugJS.self;
    self.elmInspectionBtnPanel.style.color = (self.status & DebugJS.STATE_ELEMENT_INSPECTING) ? DebugJS.DOM_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update Text Checker Button
  updateTextCheckerBtnPanel: function() {
    var self = DebugJS.self;
    self.textCheckerBtnPanel.style.color = (self.status & DebugJS.STATE_TEXT_CHECKING) ? DebugJS.TXT_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update Script Button
  updateScriptBtnPanel: function() {
    var self = DebugJS.self;
    self.scriptBtnPanel.style.color = (self.status & DebugJS.STATE_SCRIPT) ? DebugJS.JS_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update Stop Watch Button
  updateSwBtnPanel: function() {
    var self = DebugJS.self;
    var btn = (self.status & DebugJS.STATE_STOPWATCH_RUNNING) ? '||' : '>>';
    var btns = '<span class="' + this.id + '-btn ' + this.id + '-nomove" onclick="DebugJS.self.resetStopWatch();">🔃</span>' +
    '<span class="' + this.id + '-btn ' + this.id + '-nomove" onclick="DebugJS.self.startStopStopWatch();">' + btn + '</span>';
    self.swBtnPanel.innerHTML = btns;
  },

  // Update Stop Watch
  updateSwPanel: function() {
    var self = DebugJS.self;
    self.updateStopWatch();
    self.swPanel.innerText = self.swElapsedTimeDisp;
    if (self.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      setTimeout(self.updateSwPanel, 21);
    }
  },

  // Update Suspend Log Button
  updateSuspendLogBtnPanel: function() {
    var self = DebugJS.self;
    self.suspendLogBtnPanel.style.color = (self.status & DebugJS.STATE_LOG_SUSPENDING) ? DebugJS.LOG_SUSPEND_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update Pin Button
  updatePinBtnPanel: function() {
    var self = DebugJS.self;
    self.pinBtnPanel.style.color = (self.status & DebugJS.STATE_DRAGGABLE) ? DebugJS.COLOR_INACTIVE : DebugJS.PIN_BUTTON_COLOR;
  },

  // Window Control Button
  updateWinCtrlBtnPanel: function() {
    var self = DebugJS.self;
    if (!self.winCtrlBtnPanel) return;
    var fn = 'DebugJS.self.expandDebugWindow()';
    var btn = '□';
    if (self.status & DebugJS.STATE_WINDOW_SIZE_EXPANDED) {
      fn = 'DebugJS.self.restoreDebugWindow()';
      btn = '❐';
    }
    var b = '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="float:right;margin-right:3px;font-size:' + (16 * self.options.zoom) + 'px;color:#888;" onclick="' + fn + ';DebugJS.self.updateWinCtrlBtnPanel();" onmouseover="this.style.color=\'#ddd\';" onmouseout="this.style.color=\'#888\';">' + btn + '</span>' +
    '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="float:right;margin-right:2px;font-size:' + (16 * self.options.zoom) + 'px;color:#888;" onclick="DebugJS.self.resetDebugWindowSizePos();DebugJS.self.updateWinCtrlBtnPanel();" onmouseover="this.style.color=\'#ddd\';" onmouseout="this.style.color=\'#888\';">－</span>';
    self.winCtrlBtnPanel.innerHTML = b;
  },

  // Log Output
  printMessage: function() {
    var self = DebugJS.self;
    var msg = '<pre style="padding:0 3px;">' + self.getLogMsgs() + '</pre>';
    self.msgPanel.innerHTML = msg;
    self.msgPanel.scrollTop = self.msgPanel.scrollHeight;
  },

  clearMessage: function() {
    var self = DebugJS.self;
    self.msgBuf.clear();
    self.printMessage();
  },

  applyStyles: function(styles) {
    var self = DebugJS.self;
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
    var self = DebugJS.self;
    self.windowBody.onmousedown = self.startMove;
  },

  startMove: function(e) {
    var self = DebugJS.self;
    if ((!(self.status & DebugJS.STATE_DRAGGABLE)) || (e.button != 0) || self.isMoveExemptedElement(e.target)) {
      return;
    }
    self.status &= ~DebugJS.STATE_AUTO_POSITION_ADJUST;
    self.status |= DebugJS.STATE_DRAGGING;
    self.windowBody.style.cursor = 'move';
    self.prevOffsetTop = e.clientY - self.debugWindow.offsetTop;
    self.prevOffsetLeft = e.clientX - self.debugWindow.offsetLeft;
    if (!document.all) {
       window.getSelection().removeAllRanges();
    }
  },

  isMoveExemptedElement: function(el) {
    var self = DebugJS.self;
    if (el.nodeName == 'INPUT') return true;
    if (el.nodeName == 'TEXTAREA') return true;
    if (DebugJS.hasClass(el, this.id + '-nomove')) return true;
    return false;
  },

  doMove: function(e) {
    var self = DebugJS.self;
    if (!(self.status & DebugJS.STATE_DRAGGING)) return;
    self.debugWindow.style.top = e.clientY - self.prevOffsetTop + 'px';
    self.debugWindow.style.left = e.clientX - self.prevOffsetLeft + 'px';
  },

  saveSizeAndPos: function() {
    var self = DebugJS.self;
    var shadow = (self.status & DebugJS.STATE_DYNAMIC) ? (DebugJS.WINDOW_SHADOW / 2) : 0;
    self.orgSizePos.w = (self.debugWindow.offsetWidth + DebugJS.WINDOW_BORDER - shadow);
    self.orgSizePos.h = (self.debugWindow.offsetHeight + DebugJS.WINDOW_BORDER - shadow);
    self.orgSizePos.t = self.debugWindow.offsetTop;
    self.orgSizePos.l = self.debugWindow.offsetLeft;
  },

  startResize: function(e) {
    if (e.button != 0) return;
    var self = DebugJS.self;
    self.status |= DebugJS.STATE_RESIZING;
    self.clickedPosX = e.clientX;
    self.clickedPosY = e.clientY;
    self.saveSizeAndPos();
    self.status &= ~DebugJS.STATE_WINDOW_SIZE_EXPANDED;
    self.updateWinCtrlBtnPanel();
  },

  doResize: function(e) {
    var self = DebugJS.self;
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
      h = self.orgSizePos.h + moveY;
      if (h < DebugJS.DEBUG_WIN_MIN_H) {
        h = DebugJS.DEBUG_WIN_MIN_H;
      } else {
        t = self.orgSizePos.t - moveY;
        self.debugWindow.style.top = t + 'px';
      }
      self.debugWindow.style.height = h + 'px';
    }

    if (self.status & DebugJS.STATE_RESIZING_W) {
      moveX = self.clickedPosX - currentX;
      w = self.orgSizePos.w + moveX;
      if (w < DebugJS.DEBUG_WIN_MIN_W) {
        w = DebugJS.DEBUG_WIN_MIN_W;
      } else {
        l = self.orgSizePos.l - moveX;
        self.debugWindow.style.left = l + 'px';
      }
      self.debugWindow.style.width = w + 'px';
    }

    if (self.status & DebugJS.STATE_RESIZING_E) {
      moveX = currentX - self.clickedPosX;
      w = self.orgSizePos.w + moveX;
      if (w < DebugJS.DEBUG_WIN_MIN_W) w = DebugJS.DEBUG_WIN_MIN_W;
      self.debugWindow.style.width = w + 'px';
    }

    if (self.status & DebugJS.STATE_RESIZING_S) {
      moveY = currentY - self.clickedPosY;
      h = self.orgSizePos.h + moveY;
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
    var self = DebugJS.self;
    self.status &= ~DebugJS.STATE_RESIZING_ALL;
    self.bodyEl.style.cursor = 'auto';
  },

  resizeMainHeight: function() {
    var self = DebugJS.self;
    var headPanelH = (self.headPanel) ? self.headPanel.offsetHeight : 0;
    var infoPanelH = (self.infoPanel) ? self.infoPanel.offsetHeight : 0;
    var cmdPanelH = (self.cmdPanel) ? self.cmdPanel.offsetHeight : 0;
    var mainPanelHeight = self.debugWindow.offsetHeight - headPanelH - infoPanelH - cmdPanelH - DebugJS.WINDOW_ADJUST;
    self.mainPanel.style.height = mainPanelHeight + 'px';
  },

  toggleLogSuspend: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_LOG_SUSPENDING) {
      self.status &= ~DebugJS.STATE_LOG_SUSPENDING;
    } else {
      self.status |= DebugJS.STATE_LOG_SUSPENDING;
    }
    self.updateSuspendLogBtnPanel();
  },

  toggleMeasureMode: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_MEASURE) {
      self.disableMeasureMode();
    } else {
      self.enableMeasureMode();
    }
  },

  enableMeasureMode: function() {
    var self = DebugJS.self;
    DebugJS.log.s('Screen Measure ON.');
    self.status |= DebugJS.STATE_MEASURE;
    self.updateMeasureBtnPanel();
  },

  disableMeasureMode: function() {
    var self = DebugJS.self;
    self.stopMeasure();
    self.status &= ~DebugJS.STATE_MEASURE;
    DebugJS.log.s('Screen Measure OFF.');
    self.updateMeasureBtnPanel();
  },

  toggleDraggable: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_DRAGGABLE) {
      self.disableDraggable();
    } else {
      self.enableDraggable();
    }
  },

  enableDraggable: function() {
    var self = DebugJS.self;
    self.status |= DebugJS.STATE_DRAGGABLE;
    self.windowBody.style.cursor = 'default';
    self.updatePinBtnPanel();
  },

  disableDraggable: function() {
    var self = DebugJS.self;
    self.status &= ~DebugJS.STATE_DRAGGABLE;
    self.windowBody.style.cursor = 'auto';
    self.updatePinBtnPanel();
  },

  startStopStopWatch: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      self.stopStopWatch();
    } else {
      self.startStopWatch();
    }
  },

  startStopWatch: function() {
    var self = DebugJS.self;
    self.status |= DebugJS.STATE_STOPWATCH_RUNNING;
    self.swStartTime = (new Date()).getTime() - self.swElapsedTime;
    self.updateStopWatch();
    self.updateSwPanel();
    self.updateSwBtnPanel();
  },

  stopStopWatch: function() {
    var self = DebugJS.self;
    self.status &= ~DebugJS.STATE_STOPWATCH_RUNNING;
    self.updateSwBtnPanel();
  },

  updateStopWatch: function() {
    if (!(DebugJS.self.status & DebugJS.STATE_STOPWATCH_RUNNING)) return;
    var self = DebugJS.self;
    var swCurrentTime = (new Date()).getTime();
    self.swElapsedTime = swCurrentTime - self.swStartTime;
    self.swElapsedTimeDisp = DebugJS.getTimerStr(self.swElapsedTime);
  },

  resetStopWatch: function() {
    var self = DebugJS.self;
    self.swStartTime = (new Date()).getTime();
    self.swElapsedTime = 0;
    self.swElapsedTimeDisp = DebugJS.getTimerStr(self.swElapsedTime);
    self.updateSwPanel();
  },

  getLogMsgs: function() {
    var self = DebugJS.self;
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
    var self = DebugJS.self;
    self.msgPanel.style.height = (100 - DebugJS.OVERLAY_PANEL_HEIGHT) + '%';
    self.msgPanel.scrollTop = self.msgPanel.scrollHeight;
  },

  expandMessagePanel: function() {
    var self = DebugJS.self;
    self.msgPanel.style.height = '100%';
  },

  keyhandler: function(e) {
    var self = DebugJS.self;
    switch (e.keyCode) {
      case 13: // Enter
        if (document.activeElement == self.cmdLine) {
          self.execCmd();
        }
        break;

      case 27: // ESC
        if ((self.status & DebugJS.STATE_DRAGGING) || (self.status & DebugJS.STATE_RESIZING)) {
          self.status &= ~DebugJS.STATE_DRAGGING;
          self.endResize();
          return;
        }
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
        if (self.status & DebugJS.STATE_SYSTEM_INFO) {
          self.disableSystemInfo();
          return;
        }
        self.hideDebugWindow();
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

      case self.options.keyAssign.key:
        if ((e.altKey == self.options.keyAssign.alt) &&
            (e.ctrlKey == self.options.keyAssign.ctrl) &&
            (e.shiftKey == self.options.keyAssign.shift)) {
          if (self.status & DebugJS.STATE_VISIBLE) {
            self.closeDebugWindow();
          } else {
            self.showDebugWindow();
          }
        }
        break;

      default:
        break;
    }
  },

  keyDownHandler: function(e) {
    var self = DebugJS.self;
    var metaKey = DebugJS.checkMetaKey(e);
    self.keyDownCode = e.keyCode + ' ' + metaKey;
    self.updateKeyDownPanel();

    self.keyPressCode = DebugJS.KEY_STATUS_DEFAULT;
    self.updateKeyPressPanel();

    self.keyUpCode = DebugJS.KEY_STATUS_DEFAULT;
    self.updateKeyUpPanel();
  },

  keyPressHandler: function(e) {
    var self = DebugJS.self;
    var metaKey = DebugJS.checkMetaKey(e);
    self.keyPressCode = e.keyCode + '(' + String.fromCharCode(e.keyCode) + ')' + metaKey;
    self.updateKeyPressPanel();
  },

  keyUpHandler: function(e) {
    var self = DebugJS.self;
    var metaKey = DebugJS.checkMetaKey(e);
    self.keyUpCode = e.keyCode + ' ' + metaKey;
    self.updateKeyUpPanel();
  },

  windowResizeHandler: function() {
    var self = DebugJS.self;
    self.updateWindowSizePanel();
    self.updateClientSizePanel();
    self.updateBodySizePanel();
    if ((self.status & DebugJS.STATE_VISIBLE) && (self.status & DebugJS.STATE_AUTO_POSITION_ADJUST)) {
      var sizePos = self.getSelfSizePos();
      self.setWindowPosition(self.options.position, sizePos.width, sizePos.height);
    }
  },

  scrollHandler: function() {
    var self = DebugJS.self;
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
    var self = DebugJS.self;
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
          if (self.isOnDebugWindow(posX, posY)) {
            if ((DebugJS.el) && (DebugJS.el != self.prevElm)) {
              self.showElementInfo(DebugJS.el);
              self.updatePrevElm(DebugJS.el);
            }
          } else {
            DebugJS.el = document.elementFromPoint(posX, posY);
            DebugJS.log.s('The element &lt;' + DebugJS.el.tagName + '&gt; has been captured into <span style="color:' + DebugJS.KEYWORD_COLOR + '">' + ((dbg == DebugJS) ? 'dbg' : 'DebugJS') + '.el</span>');
          }
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
    var self = DebugJS.self;
    if (self.options.useMouseStatusInfo) {
      self.mousePos = 'x=' + e.clientX + ',y=' + e.clientY;
      self.updateMousePositionPanel();
    }
    if (self.status & DebugJS.STATE_DRAGGING) self.doMove(e);
    if (self.status & DebugJS.STATE_RESIZING) self.doResize(e);
    if (self.status & DebugJS.STATE_MEASURING) self.doMeasure(e);
    if (self.status & DebugJS.STATE_ELEMENT_INSPECTING) self.inspectElement(e);
  },

  mouseupHandler: function(e) {
    var self = DebugJS.self;
    switch (e.button) {
      case 0:
        self.mouseClickL = DebugJS.COLOR_INACTIVE;
        if (self.status & DebugJS.STATE_MEASURING) {
          self.stopMeasure();
        }
        if (self.status & DebugJS.STATE_DRAGGABLE) {
          self.status &= ~DebugJS.STATE_DRAGGING;
          self.windowBody.style.cursor = 'default';
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
    var self = DebugJS.self;
    self.saveSizeAndPos();
    var cw = document.documentElement.clientWidth;
    var ch = document.documentElement.clientHeight;
    var w = DebugJS.DEBUG_WIN_EXPAND_W;
    var h = DebugJS.DEBUG_WIN_EXPAND_H;
    var t = ch / 2 - h / 2;
    var l = cw / 2 - w / 2;
    if (w > cw) {w = cw; l = 0;}
    if (h > ch) {h = ch; t = 0;}
    self.debugWindow.style.top = t + 'px';
    self.debugWindow.style.left = l + 'px';
    self.debugWindow.style.width = w + 'px';
    self.debugWindow.style.height = h + 'px';
    self.resizeMainHeight();
    self.status &= ~DebugJS.STATE_AUTO_POSITION_ADJUST;
    self.status |= DebugJS.STATE_WINDOW_SIZE_EXPANDED;
  },

  restoreDebugWindow: function() {
    var self = DebugJS.self;
    self.debugWindow.style.width = self.orgSizePos.w + 'px';
    self.debugWindow.style.height = self.orgSizePos.h + 'px';
    self.debugWindow.style.top = self.orgSizePos.t + 'px';
    self.debugWindow.style.left = self.orgSizePos.l + 'px';
    self.resizeMainHeight();
    self.msgPanel.scrollTop = self.msgPanel.scrollHeight;
    self.status &= ~DebugJS.STATE_WINDOW_SIZE_EXPANDED;
  },

  resetDebugWindowSizePos: function() {
    var self = DebugJS.self;
    self.debugWindow.style.width = (self.initWidth - (DebugJS.WINDOW_SHADOW / 2) + DebugJS.WINDOW_BORDER) + 'px';
    self.debugWindow.style.height = (self.initHeight - (DebugJS.WINDOW_SHADOW / 2) + DebugJS.WINDOW_BORDER) + 'px';
    self.setWindowPosition(self.options.position, self.initWidth, self.initHeight);
    self.resizeMainHeight();
    self.msgPanel.scrollTop = self.msgPanel.scrollHeight;
    self.saveExpandModeOrgSizeAndPos();
    self.status &= ~DebugJS.STATE_WINDOW_SIZE_EXPANDED;
    if (self.status & DebugJS.STATE_DRAGGABLE) {
      self.status |= DebugJS.STATE_AUTO_POSITION_ADJUST;
    }
  },

  showDebugWindow: function() {
    var self = DebugJS.self;
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
    var self = DebugJS.self;
    if (!self.options.togglableShowHide) return;
    self.msgPanelScrollX = self.msgPanel.scrollLeft;
    self.msgPanelScrollY = self.msgPanel.scrollTop;
    self.status &= ~DebugJS.STATE_DRAGGING;
    self.debugWindow.style.display = 'none';
    self.status &= ~DebugJS.STATE_VISIBLE;
  },

  closeDebugWindow: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_MEASURE) {
      self.disableMeasureMode();
    }
    if (self.status & DebugJS.STATE_ELEMENT_INSPECTING) {
      self.disableElmInspection();
    }
    self.hideDebugWindow();
  },

  startMeasure: function(e) {
    var self = DebugJS.self;
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
    self.savedFunc = document.onselectstart;
    document.onselectstart = function() {return false;};
  },

  doMeasure: function(e) {
    var self = DebugJS.self;
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
    var self = DebugJS.self;
    if (self.measureBox != null) {
      self.bodyEl.removeChild(self.measureBox);
      self.measureBox = null;
    }
    document.onselectstart = self.savedFunc;
    self.status &= ~DebugJS.STATE_MEASURING;
  },

  toggleSystemInfoMode: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_SYSTEM_INFO) {
      self.disableSystemInfo();
    } else {
      self.enableSystemInfo();
    }
  },

  enableSystemInfo: function() {
    var self = DebugJS.self;
    self.status |= DebugJS.STATE_SYSTEM_INFO;
    if (self.sysInfoPanel == null) {
      self.sysInfoPanel = document.createElement('div');
      self.sysInfoPanel.className = self.id + '-overlay-panel-full';
      self.addOverlayPanelFull(self.sysInfoPanel);
    }
    self.updateSysInfoBtnPanel();
    self.showSystemInfo();
  },

  disableSystemInfo: function() {
    var self = DebugJS.self;
    if (self.sysInfoPanel != null) {
      self.removeOverlayPanelFull(self.sysInfoPanel);
      self.sysInfoPanel = null;
    }
    self.status &= ~DebugJS.STATE_SYSTEM_INFO;
    self.updateSysInfoBtnPanel();
  },

  showSystemInfo: function(e) {
    var self = DebugJS.self;
    var ITEM_NAME_COLOR = '#8f0';

    var INDENT = '              ';
    var screenSize = 'w=' + screen.width + ' x h=' + screen.height;
    var languages = self.getLanguages(INDENT);
    var browser = DebugJS.getBrowserType();
    var jq = '<span class="' + self.id + '-unavailable">not loaded</span>';
    if (typeof jQuery != 'undefined') {
      jq = 'v' + jQuery.fn.jquery;
    }

    var INDENT = '         ';
    var links = document.getElementsByTagName('link');
    var loadedStyles = '<span class="' + self.id + '-unavailable">not loaded</span>';
    for (var i = 0; i < links.length; i++) {
      if (links[i].rel == 'stylesheet') {
        if (i == 0) {
          loadedStyles = self.createFoldingText(links[i].href, 'linkHref' + i, DebugJS.OMIT_MID);
        } else {
          loadedStyles += '\n' + INDENT + self.createFoldingText(links[i].href, 'linkHref' + i, DebugJS.OMIT_MID);
        }
      }
    }

    var scripts = document.getElementsByTagName('script');
    var loadedScripts = '<span class="' + self.id + '-unavailable">not loaded</span>';
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src) {
        if (i == 0) {
          loadedScripts = self.createFoldingText(scripts[i].src, 'scriptSrc' + i, DebugJS.OMIT_MID);
        } else {
          loadedScripts += '\n' + INDENT + self.createFoldingText(scripts[i].src, 'scriptSrc' + i, DebugJS.OMIT_MID);
        }
      }
    }

    var navUserAgent = self.createFoldingText(navigator.userAgent, 'navUserAgent', DebugJS.OMIT_LAST);
    var navAppVersion = self.createFoldingText(navigator.appVersion, 'navAppVersion', DebugJS.OMIT_LAST);
    var winOnload = self.createFoldingText(window.onload, 'winOnload', DebugJS.OMIT_LAST);
    var winOnunload = self.createFoldingText(window.onunload, 'winOnunload', DebugJS.OMIT_LAST);
    var winOnclick = self.createFoldingText(window.onclick, 'winOnclick', DebugJS.OMIT_LAST);
    var winOnmousedown = self.createFoldingText(window.onmousedown, 'winOnmousedown', DebugJS.OMIT_LAST);
    var winOnmousemove = self.createFoldingText(window.onmousemove, 'winOnmousemove', DebugJS.OMIT_LAST);
    var winOnmouseup = self.createFoldingText(window.onmousedown, 'winOnmouseup', DebugJS.OMIT_LAST);
    var winOnkeydown = self.createFoldingText(window.onkeydown, 'winOnkeydown', DebugJS.OMIT_LAST);
    var winOnkeypress = self.createFoldingText(window.onkeypress, 'winOnkeypress', DebugJS.OMIT_LAST);
    var winOnkeyup = self.createFoldingText(window.onkeyup, 'winOnkeyup', DebugJS.OMIT_LAST);
    var winOncontextmenu = self.createFoldingText(window.oncontextmenu, 'winOncontextmenu', DebugJS.OMIT_LAST);
    var winOnresize = self.createFoldingText(window.oncontextmenu, 'winOnresize', DebugJS.OMIT_LAST);
    var winOnscroll = self.createFoldingText(window.oncontextmenu, 'winOnscroll', DebugJS.OMIT_LAST);
    var winOnselect = self.createFoldingText(window.oncontextmenu, 'winOnselect', DebugJS.OMIT_LAST);
    var winOnselectstart = self.createFoldingText(window.oncontextmenu, 'winOnselectstart', DebugJS.OMIT_LAST);
    var winOnerror = self.createFoldingText(window.onerror, 'winOnerror', DebugJS.OMIT_LAST);
    var docOnclick = self.createFoldingText(document.onclick, 'documentOnclick', DebugJS.OMIT_LAST);
    var docOnmousedown = self.createFoldingText(document.onmousedown, 'documentOnmousedown', DebugJS.OMIT_LAST);
    var docOnmousemove = self.createFoldingText(document.onmousemove, 'documentOnmousemove', DebugJS.OMIT_LAST);
    var docOnmouseup = self.createFoldingText(document.onmousedown, 'documentOnmouseup', DebugJS.OMIT_LAST);
    var docOnkeydown = self.createFoldingText(document.onkeydown, 'documentOnkeydown', DebugJS.OMIT_LAST);
    var docOnkeypress = self.createFoldingText(document.onkeypress, 'documentOnkeypress', DebugJS.OMIT_LAST);
    var docOnkeyup = self.createFoldingText(document.onkeyup, 'documentOnkeyup', DebugJS.OMIT_LAST);
    var docOnselectstart = self.createFoldingText(document.onselectstart, 'documentOnselectstart', DebugJS.OMIT_LAST);
    var docOncontextmenu = self.createFoldingText(document.oncontextmenu, 'documentOncontextmenu', DebugJS.OMIT_LAST);

    var htmlSrc = document.getElementsByTagName('html')[0].outerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    htmlSrc = self.createFoldingText(htmlSrc, 'htmlSrc', DebugJS.OMIT_LAST, 0);

    var html = '<pre>' +
    '<span style="color:' + DebugJS.SYS_BUTTON_COLOR + '">&lt;SYSTEM INFO&gt;</span>\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + ITEM_NAME_COLOR + '">SCREEN SIZE</span> : ' + screenSize + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '">Browser</span>     : ' + DebugJS.browserColoring(browser.name) + ' ' + browser.version + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '">User Agent</span>  : ' + navUserAgent + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '">Language</span>    : ' + self.decorateIfObjIsUnavailable(navigator.language) + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '">  browser</span>   : ' + self.decorateIfObjIsUnavailable(navigator.browserLanguage) + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '">  user</span>      : ' + self.decorateIfObjIsUnavailable(navigator.userLanguage) + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '">  Languages</span> : ' + languages + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + ITEM_NAME_COLOR + '">jQuery</span> : ' + jq + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + ITEM_NAME_COLOR + '">css</span>    : ' + loadedStyles + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + ITEM_NAME_COLOR + '">script</span> : ' + loadedScripts + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + ITEM_NAME_COLOR + '">navigator.</span>\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> appCodeName</span>  : ' + self.decorateIfObjIsUnavailable(navigator.appCodeName) + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> appName</span>      : ' + self.decorateIfObjIsUnavailable(navigator.appName) + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> appVersion</span>   : ' + navAppVersion + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> buildID</span>      : ' + self.decorateIfObjIsUnavailable(navigator.buildID) + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> product </span>     : ' + self.decorateIfObjIsUnavailable(navigator.product) + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> productSub</span>   : ' + self.decorateIfObjIsUnavailable(navigator.productSub) + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> vendor</span>       : ' + self.decorateIfObjIsUnavailable(navigator.vendor) + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> platform</span>     : ' + self.decorateIfObjIsUnavailable(navigator.platform) + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> oscpu</span>        : ' + self.decorateIfObjIsUnavailable(navigator.oscpu) + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + ITEM_NAME_COLOR + '">window.</span>\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onload</span>       : ' + winOnload + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onunload</span>     : ' + winOnunload + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onclick</span>      : ' + winOnclick + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onmousedown</span>  : ' + winOnmousedown + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onmousemove</span>  : ' + winOnmousemove + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onmouseup</span>    : ' + winOnmouseup + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onkeydown</span>    : ' + winOnkeydown + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onkeypress</span>   : ' + winOnkeypress + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onkeyup</span>      : ' + winOnkeyup + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onresize</span>     : ' + winOnresize + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onscroll</span>     : ' + winOnscroll + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onselect</span>     : ' + winOnselect + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onselectstart</span>: ' + winOnselectstart + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> oncontextmenu</span>: ' + winOncontextmenu + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onerror</span>      : ' + winOnerror + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + ITEM_NAME_COLOR + '">document.</span>\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onclick</span>      : ' + docOnclick + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onmousedown</span>  : ' + docOnmousedown + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onmousemove</span>  : ' + docOnmousemove + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onmouseup</span>    : ' + docOnmouseup + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onkeydown</span>    : ' + docOnkeydown + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onkeypress</span>   : ' + docOnkeypress + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onkeyup</span>      : ' + docOnkeyup + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> onselectstart</span>: ' + docOnselectstart + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '"> oncontextmenu</span>: ' + docOncontextmenu + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + ITEM_NAME_COLOR + '">cookieEnabled</span>: ' + navigator.cookieEnabled + '\n' +
    '<span style="color:' + ITEM_NAME_COLOR + '">Cookie</span>: ' + self.createFoldingText(document.cookie, 'cookie', DebugJS.OMIT_MID) + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + ITEM_NAME_COLOR + '">HTML</span>: ' + htmlSrc +
    '</pre>';
    self.sysInfoPanel.innerHTML = html;
  },

  getLanguages: function(indent) {
    var self = DebugJS.self;
    var languages;
    var navLanguages = navigator.languages;
    if (navLanguages) {
      for (var i = 0; i < navLanguages.length; i++) {
        if (i == 0) {
          languages = '[' + i + '] ' + navLanguages[i];
        } else {
          languages += '\n' + indent + '[' + i + '] ' + navLanguages[i];
        }
      }
    } else {
      languages = self.decorateIfObjIsUnavailable(navLanguages);
    }
    return languages;
  },

  showHideByName: function(name) {
    var self = DebugJS.self;
    var button = document.getElementById(self.id + '-' + name + '__button');
    var partialBody = document.getElementById(self.id + '-' + name + '__partial-body');
    var body = document.getElementById(self.id + '-' + name + '__body');
    if ((body) && ((!body.style.display) || (body.style.display == 'none'))) {
      button.innerText = '▼';
      partialBody.style.display = 'none';
      body.style.display = 'block';
    } else {
      button.innerText = '▶';
      partialBody.style.display = 'inline';
      body.style.display = 'none';
    }
  },

  createFoldingText: function(obj, name, omit, lineMaxLen, style) {
    var self = DebugJS.self;
    var DEFAULT_MAX_LEN = 50;
    var foldingText;

    if (lineMaxLen == undefined) lineMaxLen = DEFAULT_MAX_LEN;
    if (!style) style = 'color:#aaa';

    if (!obj) {
      foldingText = '<span class="' + self.id + '-unavailable">' + obj + '</span>';
    } else {
      foldingText = obj + '';
      if ((foldingText.indexOf('\n') >= 1) || (foldingText.length > lineMaxLen)) {
        partial = self.trimDownText(foldingText, lineMaxLen, omit, style);
        foldingText = '<span class="' + self.id + '-showhide-button ' + this.id + '-nomove" id="' + self.id + '-' + name + '__button" onclick="DebugJS.self.showHideByName(\'' + name + '\')">▶</span> ' +
        '<span id="' + self.id + '-' + name + '__partial-body">' + partial + '</span>' +
        '<div class="' + self.id + '-showhide-body" id="' + self.id + '-' + name + '__body">' + obj + '</div>';
      } else {
        foldingText = obj;
      }
    }
    return foldingText;
  },

  trimDownText: function(text, maxLen, omit, style) {
    var snip = '...';
    if (style) {
      snip = '<span style="' + style + '">...</span>';
    }
    var shortText = text.replace(/(\r?\n|\r)/g, ' ').replace(/\t/g, ' ').replace(/\s{2,}/g, '');
    if (text.length > maxLen) {
      switch (omit) {
        case DebugJS.OMIT_FIRST:
          shortText = DebugJS.substr(shortText, (maxLen * (-1)));
          shortText = snip + DebugJS.tagEscape(shortText);
          break;
        case DebugJS.OMIT_MID:
          var firstLen = maxLen / 2;
          var latterLen = firstLen;
          if ((maxLen % 2) != 0) {
            firstLen = Math.floor(firstLen);
            latterLen = firstLen + 1;
          }
          var firstText = DebugJS.substr(shortText, firstLen);
          var latterText = DebugJS.substr(shortText, (latterLen * (-1)));
          shortText = DebugJS.tagEscape(firstText) + snip + DebugJS.tagEscape(latterText);
          break;
        default:
          shortText = DebugJS.substr(shortText, maxLen);
          shortText = DebugJS.tagEscape(shortText) + snip;
          break;
      }
    }
    return shortText;
  },

  decorateIfObjIsUnavailable: function(obj) {
    var self = DebugJS.self;
    var text = obj;
    if (!obj) {
      text = '<span class="' + self.id + '-unavailable">' + obj + '</span>';
    }
    return text;
  },

  toggleElmInspectionMode: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_ELEMENT_INSPECTING) {
      self.disableElmInspection();
    } else {
      self.enableElmInspection();
    }
  },

  enableElmInspection: function() {
    var self = DebugJS.self;
    var windowExpandHeight = DebugJS.DEBUG_WIN_EXPAND_H * self.options.zoom;
    self.status |= DebugJS.STATE_ELEMENT_INSPECTING;
    if (self.elmInspectionPanel == null) {
      self.elmInspectionPanel = document.createElement('div');
      self.elmInspectionPanel.className = self.id + '-overlay-panel';
      self.elmInspectionPanel.innerHTML = '<span style="color:' + DebugJS.DOM_BUTTON_COLOR + '">&lt;ELEMENT INFO&gt;</span>';
      self.addOverlayPanel(self.elmInspectionPanel);

      self.elmNumPanel = document.createElement('span');
      self.elmNumPanel.style.float = 'right';
      self.elmNumPanel.style.marginRight = '4px';
      self.elmNumPanel.color = '#fff';
      self.elmInspectionPanel.appendChild(self.elmNumPanel);
      self.updateElementInfo();

      self.elmInspectionPanelBody = document.createElement('div');
      self.elmInspectionPanelBody.style.position = 'relative';
      self.elmInspectionPanelBody.style.top = self.options.fontSize;
      self.elmInspectionPanel.appendChild(self.elmInspectionPanelBody);

      self.expandHight(windowExpandHeight);
    }
    self.updateElmInspectionBtnPanel();
    self.bodyEl.style.cursor = 'zoom-in';
  },

  disableElmInspection: function() {
    var self = DebugJS.self;
    if (self.prevElm) {
      self.prevElm.style.border = self.prevElmStyle.border;
      self.prevElm.style.opacity = self.prevElmStyle.opacity;
      self.prevElm = null;
      self.prevElmStyle = {};
    }
    if (self.elmInspectionPanel != null) {
      self.removeOverlayPanel(self.elmInspectionPanel);
      self.elmInspectionPanel = null;
      self.elmInspectionPanelBody = null;
      self.elmNumPanel = null;
    }
    self.updatePrevElm(null);
    self.status &= ~DebugJS.STATE_ELEMENT_INSPECTING;
    self.updateElmInspectionBtnPanel();
    self.bodyEl.style.cursor = 'auto';
    self.resetExpandedHeight();
  },

  inspectElement: function(e) {
    var self = DebugJS.self;
    var posX = e.clientX;
    var posY = e.clientY;
    if (self.isOnDebugWindow(posX, posY)) return;
    var el = document.elementFromPoint(posX, posY);
    if (el != self.prevElm) {
      self.showElementInfo(el);
      self.updatePrevElm(el);
    }
  },

  showElementInfo: function(el) {
    var self = DebugJS.self;
    var OMIT_STYLE = 'color:#888';
    var html = '<pre>';
    if (el) {
      var computedStyle = window.getComputedStyle(el);
      var rect = el.getBoundingClientRect();
      var MAX_LEN = 50;
      var text = el.innerText;
      var txt = self.createFoldingText(text, 'text', DebugJS.OMIT_LAST, MAX_LEN, OMIT_STYLE);
      var href = (el.href ? self.createFoldingText(el.href, 'elHref', DebugJS.OMIT_MID, MAX_LEN, OMIT_STYLE) : '');
      var src = (el.src ? self.createFoldingText(el.src, 'elSrc', DebugJS.OMIT_MID, MAX_LEN, OMIT_STYLE) : '');

      var backgroundColor = computedStyle.backgroundColor;
      var bgColor16 = '';
      if (backgroundColor != 'transparent') {
        var bgColor10 = backgroundColor.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
        var bgColor16cnv = DebugJS.convRGB10to16(bgColor10);
        bgColor16 = '#' + bgColor16cnv.r + bgColor16cnv.g + bgColor16cnv.b;
      }

      var color = computedStyle.color;
      var color10 = color.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
      var color16cnv = DebugJS.convRGB10to16(color10);
      var color16 = '#' + color16cnv.r + color16cnv.g + color16cnv.b;

      var borderColor16 = '';
      var borderColor = computedStyle.borderColor;
      if (borderColor) {
        var borderColor10 = borderColor.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
        var borderColor16cnv = DebugJS.convRGB10to16(borderColor10);
        borderColor16 = '#' + borderColor16cnv.r + borderColor16cnv.g + borderColor16cnv.b;
      }

      var allStyles = '';
      var LEADING_INDENT = '           ';
      var MIN_KEY_LEN = 20;
      for (key in computedStyle) {
        if (!(key.match(/^\d.*/))) {
          if (typeof computedStyle[key] != 'function') {
            var indent = '';
            if (key.length < MIN_KEY_LEN) {
              for (var i = 0; i < (MIN_KEY_LEN - key.length); i++) {
                indent += ' ';
              }
            }
            allStyles += key + indent + ': ' + computedStyle[key] + '\n';
          }
        }
      }
      allStylesFolding = self.createFoldingText(allStyles, 'allStyles', DebugJS.OMIT_LAST, 0, OMIT_STYLE);

      html += '<span style="color:#8f0;display:inline-block;height:14px;">#text</span> ' + txt + '\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'tag       : &lt;' + el.tagName + (el.type ? ' type="' + el.type + '"' : '') + '&gt;\n' +
      'id        : ' + el.id + '\n' +
      'class     : ' + el.className + '\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'display   : ' + computedStyle.display + '\n' +
      'position  : ' + computedStyle.position + '\n' +
      'z-index   : ' + computedStyle.zIndex + '\n' +
      'float     : ' + computedStyle.float + ' / clear: ' + computedStyle.clear + '\n' +
      'size      : W:' + el.clientWidth + ' x H:' + el.clientHeight + ' px\n' +
      'margin    : ' + computedStyle.marginTop + ' ' + computedStyle.marginRight + ' ' + computedStyle.marginBottom + ' ' + computedStyle.marginLeft + '\n' +
      'padding   : ' + computedStyle.paddingTop + ' ' + computedStyle.paddingRight + ' ' + computedStyle.paddingBottom + ' ' + computedStyle.paddingLeft + '\n' +
      'border    : ' + computedStyle.border + ' ' + borderColor16 + ' <span style="background:' + borderColor + ';width:6px;height:12px;display:inline-block;"> </span>\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'font      : size   = ' + computedStyle.fontSize + '\n' +
      '            family = ' + computedStyle.fontFamily + '\n' +
      '            weight = ' + computedStyle.fontWeight + '\n' +
      '            style  = ' + computedStyle.fontStyle + '\n' +
      'color     : ' + color + color16 + ' <span style="background:' + color + ';width:6px;height:12px;display:inline-block;"> </span>\n' +
      'bg-color  : ' + backgroundColor + ' ' + bgColor16 + ' <span style="background:' + backgroundColor + ';width:6px;height:12px;display:inline-block;"> </span>\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'location  : top    = ' + Math.round(rect.top + window.pageYOffset) + 'px (' + computedStyle.top + ')\n' +
      '            left   = ' + Math.round(rect.left + window.pageXOffset) + 'px (' + computedStyle.left + ')\n' +
      '            right  = ' + Math.round(rect.right + window.pageXOffset) + 'px (' + computedStyle.right + ')\n' +
      '            bottom = ' + Math.round(rect.bottom + window.pageYOffset) + 'px (' + computedStyle.bottom + ')\n' +
      'overflow  : ' + computedStyle.overflow + '\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'all styles: ' + allStylesFolding + '\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'name      : ' + (el.name ? el.name : '') + '\n' +
      'value     : ' + (el.value ? self.createFoldingText(el.value, 'elValue', DebugJS.OMIT_LAST, MAX_LEN, OMIT_STYLE) : '') + '\n' +
      'tabIndex  : ' + el.tabIndex + '\n' +
      'accessKey : ' + el.accessKey + '\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'href      : ' + href + '\n' +
      'src       : ' + src + '\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'onclick      : ' + self.getEventHandlerString(el.onclick, 'elOnclick') + '\n' +
      'ondblclick   : ' + self.getEventHandlerString(el.ondblclick, 'elOnDblClick') + '\n' +
      'onmousedown  : ' + self.getEventHandlerString(el.onmousedown, 'elOnMouseDown') + '\n' +
      'onmouseup    : ' + self.getEventHandlerString(el.onmouseup, 'elOnMouseUp') + '\n' +
      'onmouseover  : ' + self.getEventHandlerString(el.onmouseover, 'elOnMouseOver') + '\n' +
      'onmouseout   : ' + self.getEventHandlerString(el.onmouseout, 'elOnMouseOut') + '\n' +
      'onmousemove  : ' + self.getEventHandlerString(el.onmousemove, 'elOnMouseMove') + '\n' +
      'oncontextmenu: ' + self.getEventHandlerString(el.oncontextmenu, 'elOnContextmenu') + '\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'onkeydown    : ' + self.getEventHandlerString(el.onkeydown, 'elOnKeyDown') + '\n' +
      'onkeypress   : ' + self.getEventHandlerString(el.onkeypress, 'elOnKeyPress') + '\n' +
      'onkeyup      : ' + self.getEventHandlerString(el.onkeyup, 'elOnKeyUp') + '\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'onfocus      : ' + self.getEventHandlerString(el.onfocus, 'elOnFocus') + '\n' +
      'onblur       : ' + self.getEventHandlerString(el.onblur, 'elOnBlur') + '\n' +
      'onchange     : ' + self.getEventHandlerString(el.onchange, 'elOnChange') + '\n' +
      'oninput      : ' + self.getEventHandlerString(el.oninput, 'elOnInput') + '\n' +
      'onselect     : ' + self.getEventHandlerString(el.onselect, 'elOnSelect') + '\n' +
      'onselectstart: ' + self.getEventHandlerString(el.onselectstart, 'elOnSelectStart') + '\n' +
      'onsubmit     : ' + self.getEventHandlerString(el.onsubmit, 'elOnSubmit') + '\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'onscroll     : ' + self.getEventHandlerString(el.onscroll, 'elOnScroll') + '\n' +
      '<div class="' + self.id + '-separator"></div>';

      for (data in el.dataset) {
        html += 'data-' + data + ': ' + el.dataset[data] + '\n';
      }
    }
    html += '</pre>';
    self.elmInspectionPanelBody.innerHTML = html;
  },

  updatePrevElm: function(el) {
    var self = DebugJS.self;
    if (self.prevElm) {
      self.prevElm.style.border = self.prevElmStyle.border;
      self.prevElm.style.opacity = self.prevElmStyle.opacity;
    }
    if (el) {
      self.prevElmStyle.border = el.style.border;
      self.prevElmStyle.opacity = el.style.opacity;
      el.style.border = 'solid 1px #f00';
      el.style.opacity = 0.7;
      self.prevElm = el;
    }
  },

  updateElementInfo: function() {
    var self = DebugJS.self;
    if (!(self.status & DebugJS.STATE_ELEMENT_INSPECTING)) {
      return;
    }
    var UPDATE_INTERVAL = 250;
    self.elmNumPanel.innerText = '(Total: ' + document.getElementsByTagName('*').length + ')';
    setTimeout(self.updateElementInfo, UPDATE_INTERVAL);
  },

  getEventHandlerString: function(handler, name) {
    var self = DebugJS.self;
    var MAX_LEN = 300;
    str = (handler ? handler.toString().replace(/\n/g, '').replace(/[^.]{1,}\{/, '').replace(/\}$/, '').replace(/^\s{1,}/, '') : '<span style="color:#aaa;">null</span>');
    str = self.createFoldingText(str, name, DebugJS.OMIT_LAST, MAX_LEN, 'color:#888');
    return str;
  },

  toggleTextCheckerMode: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_TEXT_CHECKING) {
      self.disableTextChecker();
    } else {
      self.enableTextChecker();
    }
  },

  enableTextChecker: function() {
    var self = DebugJS.self;
    self.status |= DebugJS.STATE_TEXT_CHECKING;

    if (self.textCheckerPanel == null) {
      var defaultFontSize = Math.round(12 * self.options.zoom);
      var defaultFontFamily = 'Consolas';
      var defaultFontWeight = 400;
      var defaultFgRGB16 = '000';
      var defaultBgRGB16 = 'fff';
      var panelPadding = 2;
      self.textCheckerPanel = document.createElement('div');
      self.textCheckerPanel.className = self.id + '-overlay-panel-full';
      self.addOverlayPanelFull(self.textCheckerPanel);

      var txtPadding = 4;
      self.textCheck = document.createElement('input');
      self.textCheck.style.setProperty('width', 'calc(100% - ' + ((txtPadding + panelPadding) * 2) + 'px)', 'important');
      self.textCheck.style.setProperty('min-height', (20 * self.options.zoom) + 'px', 'important');
      self.textCheck.style.setProperty('margin-bottom', '8px', 'important');
      self.textCheck.style.setProperty('padding', txtPadding + 'px', 'important');
      self.textCheck.style.setProperty('border', '0', 'important');
      self.textCheck.style.setProperty('border-radius', '0', 'important');
      self.textCheck.style.setProperty('outline', 'none', 'important');
      self.textCheck.style.setProperty('font-size', defaultFontSize + 'px', 'important');
      self.textCheck.style.setProperty('font-family', defaultFontFamily, 'important');
      self.textCheck.value = 'ABCDEFG.abcdefg 12345-67890_!?';
      self.textCheckerPanel.appendChild(self.textCheck);

      self.textCheckCtrl = document.createElement('div');
      self.textCheckerPanel.appendChild(self.textCheckCtrl);
      var html = 'font-size: <input type="range" min="0" max="128" step="1" id="' + self.id + '-fontsize-range" class="' + self.id + '-txt-range" oninput="DebugJS.self.onChangeFontSize(true);" onchange="DebugJS.self.onChangeFontSize(true);">' +
      '<input value="' + defaultFontSize + '" id="' + self.id + '-font-size" class="' + self.id + '-txt-text" style="width:30px;text-align:right;" oninput="DebugJS.self.onChangeFontSizeTxt()">px' +
      '<br>' +
      'font-family: <input value="' + defaultFontFamily + '" class="' + self.id + '-txt-text" style="width:110px;" oninput="DebugJS.self.onChangeFontFamily(this)">&nbsp;&nbsp;' +
      'font-weight: <input type="range" min="100" max="900" step="100" value="' + defaultFontWeight + '" id="' + self.id + '-fontweight-range" class="' + self.id + '-txt-range" style="width:80px;" oninput="DebugJS.self.onChangeFontWeight();" onchange="DebugJS.self.onChangeFontWeight();"><span id="' + self.id + '-font-weight"></span> ' +
      '<table class="' + self.id + '-txt-tbl">' +
      '<tr><td colspan="2">FG #<input id="' + self.id + '-fg-rgb" class="' + self.id + '-txt-text" value="' + defaultFgRGB16 + '" style="width:80px;" oninput="DebugJS.self.onChangeFgRGB()"></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_R + '">R</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + self.id + '-fg-range-r" class="' + self.id + '-txt-range" oninput="DebugJS.self.onChangeFgColor(true);" onchange="DebugJS.self.onChangeFgColor(true);"></td><td><span id="' + self.id + '-fg-r"></span></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_G + '">G</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + self.id + '-fg-range-g" class="' + self.id + '-txt-range" oninput="DebugJS.self.onChangeFgColor(true);" onchange="DebugJS.self.onChangeFgColor(true);"></td><td><span id="' + self.id + '-fg-g"></span></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_B + '">B</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + self.id + '-fg-range-b" class="' + self.id + '-txt-range" oninput="DebugJS.self.onChangeFgColor(true);" onchange="DebugJS.self.onChangeFgColor(true);"></td><td><span id="' + self.id + '-fg-b"></span></td></tr>' +
      '<tr><td colspan="2">BG #<input id="' + self.id + '-bg-rgb" class="' + self.id + '-txt-text" value="' + defaultBgRGB16 + '" style="width:80px;" oninput="DebugJS.self.onChangeBgRGB()"></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_R + '">R</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + self.id + '-bg-range-r" class="' + self.id + '-txt-range" oninput="DebugJS.self.onChangeBgColor(true);" onchange="DebugJS.self.onChangeBgColor(true);"></td><td><span id="' + self.id + '-bg-r"></span></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_G + '">G</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + self.id + '-bg-range-g" class="' + self.id + '-txt-range" oninput="DebugJS.self.onChangeBgColor(true);" onchange="DebugJS.self.onChangeBgColor(true);"></td><td><span id="' + self.id + '-bg-g"></span></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_B + '">B</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + self.id + '-bg-range-b" class="' + self.id + '-txt-range" oninput="DebugJS.self.onChangeBgColor(true);" onchange="DebugJS.self.onChangeBgColor(true);"></td><td><span id="' + self.id + '-bg-b"></span></td></tr>' +
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
      self.addOverlayPanelFull(self.textCheckerPanel);
    }

    self.updateTextCheckerBtnPanel();
  },

  onChangeFgRGB: function() {
    var self = DebugJS.self;
    var rgb16 = '#' + self.textCheckerInputFgRGB.value;
    var rgb10 = DebugJS.convRGB16to10(rgb16);
    self.textCheckerRangeFgR.value = rgb10.r;
    self.textCheckerRangeFgG.value = rgb10.g;
    self.textCheckerRangeFgB.value = rgb10.b;
    self.onChangeFgColor(null);
    self.textCheck.style.setProperty('color', rgb16, 'important');
  },

  onChangeBgRGB: function() {
    var self = DebugJS.self;
    var rgb16 = '#' + self.textCheckerInputBgRGB.value;
    var rgb10 = DebugJS.convRGB16to10(rgb16);
    self.textCheckerRangeBgR.value = rgb10.r;
    self.textCheckerRangeBgG.value = rgb10.g;
    self.textCheckerRangeBgB.value = rgb10.b;
    self.onChangeBgColor(null);
    self.textCheck.style.setProperty('background', rgb16, 'important');
  },

  onChangeFgColor: function(callFromRange) {
    var self = DebugJS.self;
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
    var self = DebugJS.self;
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
    var self = DebugJS.self;
    var fontSize = self.textCheckFontSizeInput.value;
    self.textCheckFontSizeRange.value = fontSize;
    self.onChangeFontSize(null);
    self.textCheck.style.setProperty('font-size', fontSize + 'px', 'important');
  },

  onChangeFontSize: function(callFromRange) {
    var self = DebugJS.self;
    var fontSize;
    fontSize = self.textCheckFontSizeRange.value;
    if (callFromRange) {
      self.textCheckFontSizeInput.value = fontSize;
      self.textCheck.style.setProperty('font-size', fontSize + 'px', 'important');
    }
  },

  onChangeFontWeight: function() {
    var self = DebugJS.self;
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
    var self = DebugJS.self;
    var fontFamily = font.value;
    self.textCheck.style.setProperty('font-family', fontFamily, 'important');
  },

  disableTextChecker: function() {
    var self = DebugJS.self;
    if (self.textCheckerPanel != null) {
      self.removeOverlayPanelFull(self.textCheckerPanel);
    }
    self.status &= ~DebugJS.STATE_TEXT_CHECKING;
    self.updateTextCheckerBtnPanel();
  },

  toggleScriptMode: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_SCRIPT) {
      self.disableScriptEditor();
    } else {
      self.enableScriptEditor();
    }
  },

  enableScriptEditor: function() {
    var self = DebugJS.self;
    self.status |= DebugJS.STATE_SCRIPT;
    if (self.scriptPanel == null) {
      self.scriptPanel = document.createElement('div');
      self.scriptPanel.className = self.id + '-overlay-panel';
      var html = '<div class="' + self.id + '-btn ' + this.id + '-nomove" style="position:relative;top:-2px;float:right;font-size:' + (22 * self.options.zoom) + 'px;color:#888;" onclick="DebugJS.self.disableScriptEditor();" onmouseover="this.style.color=\'#d88\';" onmouseout="this.style.color=\'#888\';">×</div>' +
      '<span style="color:#ccc;">Script Editor</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="float:right;margin-right:4px;" onclick="DebugJS.self.execScript();">[EXEC]</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertSnippet()">[CLR]</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:8px;" onclick="DebugJS.self.insertSnippet(0)">&lt;CODE1&gt;</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertSnippet(1)">&lt;CODE2&gt;</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertSnippet(2)">&lt;CODE3&gt;</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertSnippet(3)">&lt;CODE4&gt;</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertSnippet(4)">&lt;CODE5&gt;</span>';
      self.scriptPanel.innerHTML = html;
      self.addOverlayPanel(self.scriptPanel);

      self.scriptEditor = document.createElement('textarea');
      self.scriptEditor.style.setProperty('width', 'calc(100% - 6px)', 'important');
      self.scriptEditor.style.setProperty('height', 'calc(100% - ' + (self.options.fontSize + 10) + 'px)', 'important');
      self.scriptEditor.style.setProperty('margin', '2px 0 0 0', 'important');
      self.scriptEditor.style.setProperty('box-sizing', 'content-box', 'important');
      self.scriptEditor.style.setProperty('padding', '2px', 'important');
      self.scriptEditor.style.setProperty('border', 'solid 1px #1883d7', 'important');
      self.scriptEditor.style.setProperty('border-radius', '0', 'important');
      self.scriptEditor.style.setProperty('outline', 'none', 'important');
      self.scriptEditor.style.setProperty('background', 'transparent', 'important');
      self.scriptEditor.style.setProperty('color', '#fff', 'important');
      self.scriptEditor.style.setProperty('font-size', self.options.fontSize + 'px', 'important');
      self.scriptEditor.style.setProperty('font-family', self.options.fontFamily, 'important');
      self.scriptEditor.style.setProperty('overflow', 'auto', 'important');
      self.scriptEditor.style.setProperty('resize', 'none', 'important');
      self.scriptEditor.onblur = new Function('DebugJS.self.saveScriptBuf();');
      self.scriptEditor.value = self.scriptBuf;
      self.scriptPanel.appendChild(self.scriptEditor);
    }
    self.updateScriptBtnPanel();
    self.scriptEditor.focus();
  },

  addOverlayPanel: function(panel) {
    var self = DebugJS.self;
    if (self.overlayBasePanel == null) {
      self.collapseMessagePanel();
      self.overlayBasePanel = document.createElement('div');
      self.overlayBasePanel.className = self.id + '-overlay-base-panel';
      //self.mainPanel.insertBefore(self.overlayBasePanel, self.msgPanel); //bottom position
      self.mainPanel.appendChild(self.overlayBasePanel);
    }
    self.overlayBasePanel.appendChild(panel);
    self.overlayPanels.push(panel);
  },

  removeOverlayPanel: function(panel) {
    var self = DebugJS.self;
    if (self.overlayBasePanel != null) {
      for (var i = 0; i < self.overlayPanels.length; i++) {
        if (self.overlayPanels[i] == panel) {
          self.overlayPanels.splice(i, 1);
          self.overlayBasePanel.removeChild(panel);
          break;
        }
      }
      if (self.overlayPanels.length == 0) {
        self.mainPanel.removeChild(self.overlayBasePanel);
        self.overlayBasePanel = null;
        self.expandMessagePanel();
      }
    }
  },

  addOverlayPanelFull: function(panel) {
    var self = DebugJS.self;
    self.mainPanel.appendChild(panel);
  },

  removeOverlayPanelFull: function(panel) {
    var self = DebugJS.self;
    self.mainPanel.removeChild(panel);
  },

  insertSnippet: function(n) {
    var self = DebugJS.self;
    var editor = self.scriptEditor;
    if (n == undefined) {
      editor.value = '';
      editor.focus();
    } else {
      var code = DebugJS.SNIPPET[n];
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
    var self = DebugJS.self;
    self.scriptBuf = self.scriptEditor.value;
  },

  execScript: function() {
    var self = DebugJS.self;
    self.execCode(self.scriptBuf);
  },

  execCode: function(code) {
    if (code == '') return;
    var self = DebugJS.self;
    try {
      var ret = eval(code);
      self.printResult(ret);
    } catch (e) {
      DebugJS.log.e(e);
    }
  },

  printResult: function(result) {
    var self = DebugJS.self;
    var msg = '<span style="color:' + self.options.promptColor + ';">&gt;</span> ' + self.decorateIfObjIsUnavailable(result);
    DebugJS.log(msg);
  },

  disableScriptEditor: function() {
    var self = DebugJS.self;
    self.stopScript();
    self.updateScriptBtnPanel();
  },

  stopScript: function() {
    var self = DebugJS.self;
    if (self.scriptPanel != null) {
      self.removeOverlayPanel(self.scriptPanel);
      self.scriptPanel = null;
    }
    self.status &= ~DebugJS.STATE_SCRIPT;
  },

  isOnDebugWindow: function(x, y) {
    var self = DebugJS.self;
    var sizePos = self.getSelfSizePos();
    if (((x >= sizePos.winX1) && (x <= sizePos.winX2)) && ((y >= sizePos.winY1) && (y <= sizePos.winY2))) {
      return true;
    }
    return false;
  },

  getSelfSizePos: function() {
    var self = DebugJS.self;
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

  setSelfSizeW: function(w) {
    var self = DebugJS.self;
    self.debugWindow.style.width = w + 'px';
    self.resizeMainHeight();
  },

  setSelfSizeH: function(h) {
    var self = DebugJS.self;
    self.debugWindow.style.height = h + 'px';
    self.resizeMainHeight();
  },

  expandHight: function(h) {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_DYNAMIC) {
      self.saveExpandModeOrgSizeAndPos();
      var sizePos = self.getSelfSizePos();
      if (sizePos.height >= h) {
        return;
      } else if (document.documentElement.clientHeight <= h) {
        h = document.documentElement.clientHeight;
      }
      self.setSelfSizeH(h);
      sizePos = self.getSelfSizePos();
      if (self.status & DebugJS.STATE_AUTO_POSITION_ADJUST) {
        self.setWindowPosition(self.options.position, sizePos.width, sizePos.height);
      } else {
        if (sizePos.winY2 > document.documentElement.clientHeight) {
          if (document.documentElement.clientHeight < (h + self.options.posAdjY)) {
            self.debugWindow.style.top = 0;
          } else {
            self.debugWindow.style.top = (document.documentElement.clientHeight - h - self.options.posAdjY) + 'px';
          }
        }
      }
    }
  },

  resetExpandedHeight: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_DYNAMIC) {
      self.debugWindow.style.width = self.expandModeOrg.w + 'px';
      self.debugWindow.style.height = self.expandModeOrg.h + 'px';
      self.resizeMainHeight();
      self.msgPanel.scrollTop = self.msgPanel.scrollHeight;
      if (self.status & DebugJS.STATE_AUTO_POSITION_ADJUST) {
        var sizePos = self.getSelfSizePos();
        self.setWindowPosition(self.options.position, sizePos.width, sizePos.height);
      }
    }
  },

  saveExpandModeOrgSizeAndPos: function() {
    var self = DebugJS.self;
    var shadow = (self.status & DebugJS.STATE_DYNAMIC) ? (DebugJS.WINDOW_SHADOW / 2) : 0;
    self.expandModeOrg.w = (self.debugWindow.offsetWidth + DebugJS.WINDOW_BORDER - shadow);
    self.expandModeOrg.h = (self.debugWindow.offsetHeight + DebugJS.WINDOW_BORDER - shadow);
    self.expandModeOrg.t = self.debugWindow.offsetTop;
    self.expandModeOrg.l = self.debugWindow.offsetLeft;
  },

  turnLed: function(pos, active) {
    var self = DebugJS.self;
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

  setLed: function(val) {
    var self = DebugJS.self;
    self.led = val;
    self.updateLedPanel();
  },

  execCmd: function() {
    var self = DebugJS.self;
    var cl = self.cmdLine.value;
    self.cmdLine.value = '';
    if (cl == '') {
      DebugJS.log('');
    } else {
      self.cmdHistoryBuf.add(cl);
      self.cmdHistoryIdx = (self.cmdHistoryBuf.count() < self.CMD_HISTORY_MAX) ? self.cmdHistoryBuf.count() : self.CMD_HISTORY_MAX;
      self._execCmd(cl, true);
    }
  },

  _execCmd: function(cl, echo) {
    if (echo) DebugJS.log.s(cl);
    var self = DebugJS.self;
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
    if ((!found) && (cl.match(/^http/))) {
      DebugJS.httpRequest(cl, 'GET');
      found = true;
    }
    if (!found) {found = self.cmdTimeCalc(cl);}
    if (!found) {
      self.execCode(cl);
    }
  },

  cmdCls: function(args, tbl) {
    var self = DebugJS.self;
    self.clearMessage();
  },

  cmdElements: function(args, tbl) {
    if ((args == '-h') || (args == '--help')) {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.countElements(args, true);
    }
  },

  cmdExecute: function(args, tbl) {
    var self = DebugJS.self;
    self.execScript();
  },

  cmdExit: function(args, tbl) {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_SYSTEM_INFO) {
      self.disableSystemInfo();
    }
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
    if (self.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      self.stopStopWatch();
    }
    self.setLed(0);
    self.resetStopWatch();
    if (self.status & DebugJS.STATE_DYNAMIC) {
      if (self.options.usePinButton) {
        self.enableDraggable();
      }
      self.resetDebugWindowSizePos();
    }
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
    var self = DebugJS.self;
    var str = 'Available Commands:\n<table>';
    for (var i = 0, len = self.CMD_TBL.length; i < len; i++) {
      if (!self.CMD_TBL[i].hidden) {
        if (i == self.cmdTblLen) {
          str += '<tr><td colspan="2">--- extension command ---</td></tr>';
        }
        str += '<tr><td>' + self.CMD_TBL[i].cmd + '</td><td>' + self.CMD_TBL[i].desc + '</td></tr>';
      }
    }
    str += '</table>';
    DebugJS.log.mlt(str);
  },

  cmdHistory: function(args, tbl) {
    var self = DebugJS.self;
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

  cmdLed: function(args, tbl) {
    var self = DebugJS.self;
    if (args == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      self.setLed(args);
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

  cmdSelf: function(args, tbl) {
    var self = DebugJS.self;
    var sp = self.getSelfSizePos();
    var str = 'width : ' + sp.width + '\n' +
    'height: ' + sp.height + '\n' +
    'winX1 : ' + sp.winX1 + '\n' +
    'winY1 : ' + sp.winY1 + '\n' +
    'winX2 : ' + sp.winX2 + '\n' +
    'winY2 : ' + sp.winY2 + '\n';
    DebugJS.log.mlt(str);
  },

  cmdTimeCalc: function(args) {
    var self = DebugJS.self;
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
    var timeL = DebugJS.convertTimeJson(vals[0]);
    var timeR = DebugJS.convertTimeJson(vals[1]);
    if ((timeL == null) || (timeR == null)) {
      return false;
    }
    var ret;
    if (op == '-') {
      ret = DebugJS.subTime(timeL, timeR);
    } else if (op == '+') {
      ret = DebugJS.addTime(timeL, timeR);
    }
    self.printResult(ret);
    return true;
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
    var self = DebugJS.self;
    DebugJS.log(self.v);
  },

  initExtention: function() {
    var self = DebugJS.self;
    if (self.CMD_TBL.length == self.cmdTblLen) {
      if (DebugJS.x.CMD_TBL) {
        for (var i = 0; i < DebugJS.x.CMD_TBL.length; i++) {
          self.CMD_TBL.push(DebugJS.x.CMD_TBL[i]);
        }
      }
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

DebugJS.getLogTime = function() {
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
    DebugJS.log.w('The object is too large. (>=' + ret.cnt + ')');
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
    var str = obj.replace(/</g, '&lt;').replace(/>/g, '&gt;');
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


DebugJS.hasClass = function(el, name) {
  var className = el.className;
  var names = className.split(' ');
  for (var i = 0; i < names.length; i++) {
    if (names[i] == name) {
      return true;
    }
  }
  return false;
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
  var self = DebugJS.self;
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
    return '<span style="color:' + self.options.logColorE + '">invalid value.</span>';
  }
  r10 = parseInt(r16, 16);
  g10 = parseInt(g16, 16);
  b10 = parseInt(b16, 16);
  var rgb10 = '<span style="vertical-align:top;display:inline-block;height:1em;"><span style="background:rgb(' + r10 + ',' + g10 + ',' + b10 + ');width:' + (8 * self.options.zoom) + 'px;height:' + (8 * self.options.zoom) + 'px;margin-top:2px;display:inline-block;"> </span></span> <span style="color:' + DebugJS.COLOR_R + '">' + r10 + '</span> <span style="color:' + DebugJS.COLOR_G + '">' + g10 + '</span> <span style="color:' + DebugJS.COLOR_B + '">' + b10 + '</span>';
  var rgb = {'r': r10, 'g': g10, 'b': b10, 'rgb': rgb10};
  return rgb;
};

DebugJS.convRGB10to16 = function(rgb10) {
  var self = DebugJS.self;
  rgb10 = rgb10.replace(/\s{2,}/g, ' ');
  var rgb10s = rgb10.split(' ', 3);
  if ((rgb10s.length != 3) || ((rgb10s[0] < 0) || (rgb10s[0] > 255)) || ((rgb10s[1] < 0) || (rgb10s[1] > 255)) || ((rgb10s[2] < 0) || (rgb10s[2] > 255))) {
    return '<span style="color:' + self.options.logColorE + '">invalid value.</span>';
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
  var res = 'HEX ' + DebugJS.formatHex(v16) + '\n' +
  'DEC ' + DebugJS.formatDec(v10) + '\n' +
  'BIN ' + DebugJS.formatBin(v2) + '\n';
  DebugJS.log.mlt(res);
};

DebugJS.convDEC = function(v10) {
  var v2 = parseInt(v10).toString(2);
  var v16 = parseInt(v10).toString(16);
  var res = 'DEC ' + DebugJS.formatDec(v10) + '\n' +
  'HEX ' + DebugJS.formatHex(v16) + '<br>' +
  'BIN ' + DebugJS.formatBin(v2) + '\n';
  DebugJS.log.mlt(res);
};

DebugJS.convBIN = function(v2) {
  var v10 = parseInt(v2, 2).toString(10);
  var v16 = parseInt(v2, 2).toString(16);
  var res = 'BIN ' + DebugJS.formatBin(v2) + '\n' +
  'DEC ' + DebugJS.formatDec(v10) + '\n' +
  'HEX ' + DebugJS.formatHex(v16) + '\n';
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
  if (len >= 9) {
    bin += ' (' + len + ' bits)';
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

DebugJS.formatHex = function(v16) {
  var hex = v16.toUpperCase();
  if (v16.length >= 2) {
    hex = '0x' + hex;
  }
  return hex;
};


DebugJS.convertTimeJson = function(t) {
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
};

DebugJS.subTime = function(tL, tR) {
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

  var days = 0;
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
        days = -1;
        hh = 23;
      }
    }
  } else {
    hh = tL.hour - tR.hour;
    if (c) {
      hh -= 1;
    }
    days = Math.floor(hh / 24);
    hh -= (24 * days);
    c = true;
  }

  var excess = '';
  if (days < 0) {
    excess = ' (' + days + ' Day' + ((days <= -2) ? 's' : '') + ')';
  }
  var ret = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2) + ':' + ('0' + ss).slice(-2) + '.' + ('00' + ms).slice(-3) + excess;
  return ret;
};

DebugJS.addTime = function(tL, tR) {
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

  var days = 0;
  hh = tL.hour + tR.hour;
  if (c) {
    hh++;
  }
  if (hh >= 24) {
    days = Math.floor(hh / 24);
    hh -= (24 * days);
    c = true;
  } else {
    c = false;
  }

  var excess = '';
  if (days > 0) {
    excess = ' (+' + days + ' Day' + ((days >= 2) ? 's' : '') + ')';
  }
  var ret = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2) + ':' + ('0' + ss).slice(-2) + '.' + ('00' + ms).slice(-3) + excess;
  return ret;
};

DebugJS.timeStart = function(timerName, msg) {
  var self = DebugJS.self;
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
  var self = DebugJS.self;
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
  var self = DebugJS.self;

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
  var self = DebugJS.self;
  if (timerName === undefined) timerName = DebugJS.DEFAULT_TIMER_NAME;
  if (!self.timers[timerName]) return null;
  var t = DebugJS.getElapsedTimeStr(self.timers[timerName].start, now);
  return t;
};

DebugJS.timeList = function() {
  var self = DebugJS.self;
  var now = new Date();
  var l;
  if (Object.keys(self.timers).length == 0) {
    l = '<span style="color:#ccc;">no timers</span>';
  } else {
    l = '<table>';
    for (var key in self.timers) {
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

DebugJS.getBrowserType = function() {
  var ua = navigator.userAgent;
  var ver;
  var browser = {'name': '', 'version': ''};
  if (ua.indexOf('Edge') >= 1) {
    browser.name = 'Edge';
    ver = ua.match(/Edge\/(.*)/);
    if (ver) {
      browser.version = ver[1];
    }
    return browser;
  }

  if (ua.indexOf('OPR/') >= 1) {
    browser.name = 'Opera';
    ver = ua.match(/OPR\/(.*)/);
    if (ver) {
      browser.version = ver[1];
    }
    return browser;
  }

  if (ua.indexOf('Chrome') >= 1) {
    browser.name = 'Chrome';
    ver = ua.match(/Chrome\/(.*)\s/);
    if (ver) {
      browser.version = ver[1];
    }
    return browser;
  }

  if (ua.indexOf('Firefox') >= 1) {
    browser.name = 'Firefox';
    ver = ua.match(/Firefox\/(.*)/);
    if (ver) {
      browser.version = ver[1];
    }
    return browser;
  }

  if (ua.indexOf('Trident/7.') >= 1) {
    browser.name = 'IE11';
    return browser;
  }

  if (ua.indexOf('Trident/6.') >= 1) {
    browser.name = 'IE10';
    return browser;
  }

  if (ua.indexOf('Trident/5.') >= 1) {
    browser.name = 'IE9';
    return browser;
  }

  if (ua.indexOf('Trident/4.') >= 1) {
    browser.name = 'IE8';
    return browser;
  }

  if ((ua.indexOf('Safari/') >= 1) && (ua.indexOf('Version/') >= 1)) {
    browser.name = 'Safari';
    ver = ua.match(/Version\/(.*)\sSafari/);
    if (ver) {
      browser.version = ver[1];
    }
    return browser;
  }

  return browser;
};

DebugJS.browserColoring = function(name) {
  var str = name;
  switch (name) {
    case 'Chrome':
      str = '<span style="color:#f44;">Ch</span><span style="color:#ff0;">ro</span><span style="color:#4f4;">m</span><span style="color:#6cf;">e</span>';
      break;
    case 'Edge':
      str = '<span style="color:#0af;">' + name + '</span>';
      break;
    case 'Firefox':
      str = '<span style="color:#e57f25;">' + name + '</span>';
      break;
    case 'Opera':
      str = '<span style="color:#f44;">' + name + '</span>';
      break;
    case 'IE11':
    case 'IE10':
    case 'IE9':
    case 'IE8':
      str = '<span style="color:#61d5f8;">' + name + '</span>';
      break;
    case 'Safari':
      str = '<span style="color:#86c8e8;">Safa</span><span style="color:#dd5651;">r</span><span style="color:#ececec;">i</span>';
      break;
    default:
      break;
  }
  return str;
};

DebugJS.substr = function(text, len) {
  var textLen = text.length;
  var count = 0;
  var str = '';
  if (len >= 0) {
    for (var i = 0; i < textLen; i++) {
      var x = encodeURIComponent(text.charAt(i));
      if (x.length <= 3) {
        count++;
      } else {
        count += 2;
      }
      if (count > len) {
        break;
      }
      str += text.charAt(i);
    }
  } else {
    len *= (-1);
    var i;
    for (i = (textLen - 1); i >= 0; i--) {
      var x = encodeURIComponent(text.charAt(i));
      if (x.length <= 3) {
        count++;
      } else {
        count += 2;
      }
      if (count >= len) {
        break;
      }
    }
    str = text.substr(i);
  }
  return str;
};

DebugJS.tagEscape = function(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

DebugJS.loadHandler = function() {
  DebugJS._init();
};

DebugJS.errorHandler = function(e) {
  var msg;
  if ((e.error) && (e.error.stack)) {
    msg = e.error.stack;
  } else {
    if ((e.message == undefined) && (e.filename == undefined)) {
      if ((e.target) && (e.target.outerHTML)) {
        msg = 'LOAD_ERROR: ' + (e.target.outerHTML).replace(/</g, '&lt;').replace(/>/g, '&gt;');
      } else {
        msg = 'UNKNOWN_ERROR';
      }
    } else {
      msg = e.message + ' ' + e.filename + '(' + e.lineno + ':' + e.colno + ')';
    }
  }
  DebugJS.log.e(msg);
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

DebugJS.log.p = function(o, m) {
  var str = (m ? m : '') + '\n' + DebugJS.objDump(o);
  DebugJS.log.out(str, DebugJS.LOG_TYPE_STANDARD);
};

DebugJS.log.mlt = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_MULTILINE);
};

DebugJS.log.out = function(msg, type) {
  if (msg != null) {
    var data = {'type': type, 'time': DebugJS.getLogTime(), 'msg': msg};
    DebugJS.self.msgBuf.add(data);
  }
  if (!(DebugJS.self.status & DebugJS.STATE_INITIALIZED)) {
    if (!DebugJS._init()) {return;}
  }
  DebugJS.self.printMessage();
};

DebugJS.time = {};
DebugJS.time.start = function(timerName, msg) {
  DebugJS.timeStart(timerName, msg);
};

DebugJS.time.split = function(timerName, msg) {
  var t = DebugJS.timeSplit(timerName, false, msg);
  if ((msg === null) || ((timerName === null) && (msg === undefined))) {
    return t;
  }
  return;
};

DebugJS.time.end = function(timerName, msg) {
  var t = DebugJS.timeEnd(timerName, msg);
  if ((msg === null) || ((timerName === null) && (msg === undefined))) {
    return t;
  }
  return;
};

DebugJS.time.check = function(timerName) {
  var now = new Date();
  return DebugJS.timeCheck(timerName, now);
};


DebugJS.call = function(fnc, delay) {
  if (delay === undefined) delay = 0;
  return setTimeout(fnc, delay);
};

DebugJS.exec = function(cmd, echo) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.self._execCmd(cmd, echo);
};

DebugJS.led = function(val) {
  DebugJS.self.setLed(val);
};

DebugJS.led.on = function(pos) {
  DebugJS.self.turnLed(pos, true);
};

DebugJS.led.off = function(pos) {
  DebugJS.self.turnLed(pos, false);
};

DebugJS.led.all = function(flg) {
  if (flg) {
    DebugJS.self.setLed(0xff);
  } else {
    DebugJS.self.setLed(0);
  }
};

DebugJS.random = function(min, max) {
  return DebugJS.getRandom(DebugJS.RANDOM_TYPE_NUM, min, max);
};

DebugJS.random.string = function(min, max) {
  return DebugJS.getRandom(DebugJS.RANDOM_TYPE_STR, min, max);
};

DebugJS._init = function() {
  if (!(DebugJS.self.status & DebugJS.STATE_INITIALIZED)) {
    return DebugJS.self.init(null);
  } else {
    return true;
  }
};

DebugJS.init = function(options) {
  DebugJS.self.init(options);
};
// ---- ---- ---- ---- ---- ---- ---- ----
var log = function(m) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log(m);
};

log.e = function(m) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.e(m);
};

log.w = function(m) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.w(m);
};

log.i = function(m) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.i(m);
};

log.d = function(m) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.d(m);
};

log.s = function(m) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.s(m);
};

log.t = function(n, m) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.timeLog(n, m);
};

log.p = function(o, m) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.p(o, m);
};

log.stack = function() {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  var err = new Error();
  DebugJS.log(err.stack);
};

log.clear = function() {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.self.clearMessage();
};
// ---- ---- ---- ---- ---- ---- ---- ----
var dbg = dbg || DebugJS;
var time = time || DebugJS.time;
DebugJS.x = {};
DebugJS.self = new DebugJS();
if (DebugJS.ENABLE) {
  DebugJS.el = null;
  window.addEventListener('load', DebugJS.loadHandler, true);
  if (DebugJS.CATCH_ALL_ERRORS) {
    window.addEventListener('error', DebugJS.errorHandler, true);
  }
  if (DebugJS.UNIFY_CONSOLE) {
    console.log = function(x) {log(x);};
    console.info = function(x) {log.i(x);};
    console.warn = function(x) {log.w(x);};
    console.error = function(x) {log.e(x);};
    console.time = function(x) {time.start(x);};
    console.timeEnd = function(x) {time.end(x);};
  }
  window._ = window._ || DebugJS;
} else {
  log = function(x) {};
  log.e = function(x) {};
  log.w = function(x) {};
  log.i = function(x) {};
  log.d = function(x) {};
  log.s = function(x) {};
  log.t = function(x, xx) {};
  log.p = function(x, xx) {};
  log.stack = function() {};
  log.clear = function() {};
  DebugJS.time.start = function(x, xx) {};
  DebugJS.time.split = function(x, xx) {};
  DebugJS.time.end = function(x, xx) {};
  DebugJS.time.check = function(x) {};
  DebugJS.init = function(x) {};
  DebugJS.countElements = function(x, xx) {};
  DebugJS.call = function(x, xx) {};
  DebugJS.exec = function(x, xx) {};
  DebugJS.led = function(x) {};
  DebugJS.led.on = function(x) {};
  DebugJS.led.off = function(x) {};
  DebugJS.led.all = function(x) {};
  DebugJS.random = function(min, max) {};
  DebugJS.random.string = function(min, max) {};
}
