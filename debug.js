/*!
 * debug.js
 * Copyright 2016 Takashi Harano
 * Released under the MIT license
 * https://debugjs.net/
 */
var DebugJS = DebugJS || function() {
  this.v = '201612052028';

  this.DEFAULT_OPTIONS = {
    'visible': false,
    'keyAssign': {
      'key': 113,
      'alt': false,
      'ctrl': false,
      'shift': false
    },
    'popupOnError': {
      'scriptError': true,
      'loadError': true,
      'errorLog': false
    },
    'lines': 17,
    'bufsize': 300,
    'width': 500,
    'zoom': 1,
    'position': 'se',
    'posAdjX': 20,
    'posAdjY': 20,
    'fontSize': 12,
    'fontFamily': 'Consolas, monospace',
    'fontColor': '#fff',
    'logColorD': '#ccc',
    'logColorI': '#9ef',
    'logColorW': '#fe0',
    'logColorE': '#f66',
    'logColorS': '#fff',
    'clockColor': '#8f0',
    'timerColor': '#9ef',
    'sysInfoColor': '#ddd',
    'btnColor': '#6cf',
    'btnHoverColor': '#8ef',
    'promptColor': '#0cf',
    'promptColorE': '#f45',
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
    'useMsgDisplay': true,
    'msgDisplayPos': 'right',
    'msgDisplayBackground': 'rgba(0,0,0,0.2)',
    'useScreenMeasure': true,
    'useSystemInfo': true,
    'useHtmlSrc': true,
    'useElementInfo': true,
    'useTools': true,
    'useScriptEditor': true,
    'useLogFilter': true,
    'useCommandLine': true,
    'saveCmdHistory': true,
    'cmdHistoryMax': 100,
    'kioskMode': false,
    'disableAllCommands': false,
    'disableAllFeatures': false,
    'target': null
  };
  this.DEFAULT_ELM_ID = '_debug_';
  this.id = null;
  this.bodyEl = null;
  this.styleEl = null;
  this.dbgWin = null;
  this.windowBody = null;
  this.headPanel = null;
  this.infoPanel = null;
  this.clockPanel = null;
  this.clockUpdateInterval = DebugJS.UPDATE_INTERVAL_L;
  this.measureBtn = null;
  this.measureBox = null;
  this.sysInfoBtn = null;
  this.sysInfoPanel = null;
  this.htmlSrcBtn = null;
  this.htmlSrcPanel = null;
  this.htmlSrcHeaderPanel = null;
  this.htmlSrcUpdateInputLabel = null;
  this.htmlSrcUpdateInputLabel2 = null;
  this.htmlSrcUpdateInput = null;
  this.htmlSrcBodyPanel = null;
  this.htmlSrcUpdateInterval = 0;
  this.htmlSrcUpdateTimerId = 0;
  this.elmInfoBtn = null;
  this.elmInfoPanel = null;
  this.elmInfoHeaderPanel = null;
  this.elmPrevBtn = null;
  this.elmTitle = null;
  this.elmNextBtn = null;
  this.elmSelectBtn = null;
  this.elmHighlightBtn = null;
  this.elmUpdateBtn = null;
  this.elmExportBtn = null;
  this.elmUpdateInputLabel = null;
  this.elmUpdateInputLabel2 = null;
  this.elmUpdateInput = null;
  this.elmNumPanel = null;
  this.elmInfoBodyPanel = null;
  this.elmInfoStatus = DebugJS.ELMINFO_STATE_SELECT | DebugJS.ELMINFO_STATE_HIGHLIGHT;
  this.elmUpdateInterval = 0;
  this.elmUpdateTimerId = 0;
  this.elmInfoShowHideStatus = {'text': false, 'allStyles': false, 'elBorder': false, 'htmlSrc': false};
  this.targetElm = null;
  this.toolsBtn = null;
  this.toolsPanel = null;
  this.toolsHeaderPanel = null;
  this.toolsBodyPanel = null;
  this.textCheckerBtn = null;
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
  this.fileLoaderBtn = null;
  this.fileLoaderPanel = null;
  this.fileInput = null;
  this.fileLoaderLabelB64 = null;
  this.fileLoaderRadioB64 = null;
  this.fileLoaderLabelBin = null;
  this.fileLoaderRadioBin = null;
  this.filePreviewWrapper = null;
  this.filePreview = null;
  this.fileLoaderFooter = null;
  this.fileLoadProgressBar = null;
  this.fileLoadProgress = null;
  this.fileLoadCancelBtn = null;
  this.fileLoadFormat = DebugJS.FILE_LOAD_FORMAT_BASE64;
  this.fileLoaderFile = null;
  this.fileReader = null;
  this.scriptBtn = null;
  this.scriptPanel = null;
  this.scriptEditor = null;
  this.scriptBuf = '';
  this.htmlPreviewerBtn = null;
  this.htmlPreviewerBasePanel = null;
  this.htmlPreviewerPrevPanel = null;
  this.htmlPreviewEditorPanel = null;
  this.htmlPreviewEditor = null;
  this.htmlPreviewBuf = '';
  this.memoBtn = null;
  this.memoBasePanel = null;
  this.memoEditorPanel = null;
  this.memoEditor = null;
  this.swBtnPanel = null;
  this.swPanel = null;
  this.swStartTime = 0;
  this.swElapsedTime = 0;
  this.swElapsedTimeDisp = '00:00:00.000';
  this.clearBtn = null;
  this.suspendLogBtn = null;
  this.pinBtn = null;
  this.winCtrlBtnPanel = null;
  this.closeBtn = null;
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
  this.msgPanel = null;
  this.msgString = '';
  this.mainPanel = null;
  this.overlayBasePanel = null;
  this.overlayPanels = [];
  this.logHeaderPanel = null;
  this.filterBtnAll = null;
  this.filterBtnStd = null;
  this.filterBtnDbg = null;
  this.filterBtnInf = null;
  this.filterBtnWrn = null;
  this.filterBtnErr = null;
  this.filterInputLabel = null;
  this.filterInput = null;
  this.filterText = '';
  this.logPanel = null;
  this.logPanelHeightAdjust = '';
  this.cmdPanel = null;
  this.cmdLine = null;
  this.cmdHistoryBuf = null;
  this.CMD_HISTORY_MAX = this.DEFAULT_OPTIONS.cmdHistoryMax;
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
  this.windowExpandHeight = DebugJS.DEBUG_WIN_EXPAND_H * this.DEFAULT_OPTIONS.zoom;
  this.windowExpandCnt = 0;
  this.clickedPosX = 0;
  this.clickedPosY = 0;
  this.prevOffsetTop = 0;
  this.prevOffsetLeft = 0;
  this.savedFunc = null;
  this.computedFontSize = this.DEFAULT_OPTIONS.fontSize;
  this.computedWidth = this.DEFAULT_OPTIONS.width;
  this.computedMinWidth = DebugJS.DEBUG_WIN_MIN_W;
  this.computedMinHeight = DebugJS.DEBUG_WIN_MIN_H;
  this.status = 0;
  this.logFilter = DebugJS.LOG_FILTER_ALL;
  this.toolsActiveFunction = DebugJS.TOOLS_ACTIVE_FUNC_NONE;
  this.msgBuf = new DebugJS.RingBuffer(this.DEFAULT_OPTIONS.bufsize);
  this.INT_CMD_TBL = [
    {'cmd': 'base64', 'fnc': this.cmdBase64, 'desc': 'Encodes/Decodes Base64 string', 'usage': 'base64 [-e|-d] string'},
    {'cmd': 'cls', 'fnc': this.cmdCls, 'desc': 'Clear log message.', 'attr': DebugJS.CMD_ATTR_SYSTEM},
    {'cmd': 'elements', 'fnc': this.cmdElements, 'desc': 'Count elements by #id / .className / tagName', 'usage': 'elements [#id|.className|tagName]'},
    {'cmd': 'execute', 'fnc': this.cmdExecute, 'desc': 'Execute the edited JavaScript code'},
    {'cmd': 'exit', 'fnc': this.cmdExit, 'desc': 'Close the debug window and clear all status', 'attr': DebugJS.CMD_ATTR_SYSTEM},
    {'cmd': 'get', 'fnc': this.cmdGet, 'desc': 'Send an HTTP request by GET method', 'usage': 'get URL'},
    {'cmd': 'help', 'fnc': this.cmdHelp, 'desc': 'Displays available command list', 'attr': DebugJS.CMD_ATTR_SYSTEM},
    {'cmd': 'history', 'fnc': this.cmdHistory, 'desc': 'Displays command history', 'usage': 'history [-c]', 'attr': DebugJS.CMD_ATTR_SYSTEM},
    {'cmd': 'json', 'fnc': this.cmdJson, 'desc': 'Parse one-line JSON', 'usage': 'json [-p] one-line-json'},
    {'cmd': 'jquery', 'fnc': this.cmdJquery, 'desc': 'Displays what version of jQuery is loaded'},
    {'cmd': 'keys', 'fnc': this.cmdKeys, 'desc': 'Displays all enumerable property keys of an object', 'usage': 'keys object'},
    {'cmd': 'laptime', 'fnc': this.cmdLaptime, 'desc': 'Lap time test'},
    {'cmd': 'led', 'fnc': this.cmdLed, 'desc': 'Set a bit pattern to the indicator', 'usage': 'led bit-pattern'},
    {'cmd': 'msg', 'fnc': this.cmdMsg, 'desc': 'Set a string to the message display', 'usage': 'msg message'},
    {'cmd': 'p', 'fnc': this.cmdP, 'desc': 'Print JavaScript Objects', 'usage': 'p object'},
    {'cmd': 'pos', 'fnc': this.cmdPos, 'desc': 'Set the debugger window position', 'usage': 'pos n|ne|e|se|s|sw|w|nw|c', 'attr': DebugJS.CMD_ATTR_DYNAMIC},
    {'cmd': 'post', 'fnc': this.cmdPost, 'desc': 'Send an HTTP request by POST method', 'usage': 'post URL'},
    {'cmd': 'prop', 'fnc': this.cmdProp, 'desc': 'Displays a property value', 'usage': 'prop property-name'},
    {'cmd': 'props', 'fnc': this.cmdProps, 'desc': 'Displays property list'},
    {'cmd': 'random', 'fnc': this.cmdRandom, 'desc': 'Generate a rondom number/string', 'usage': 'random [-d|-s] [min] [max]'},
    {'cmd': 'rgb', 'fnc': this.cmdRGB, 'desc': 'Convert RGB color values between HEX and DEC', 'usage': 'rgb color-value (#<span style="color:' + DebugJS.COLOR_R + '">R</span><span style="color:' + DebugJS.COLOR_G + '">G</span><span style="color:' + DebugJS.COLOR_B + '">B</span> | <span style="color:' + DebugJS.COLOR_R + '">R</span> <span style="color:' + DebugJS.COLOR_G + '">G</span> <span style="color:' + DebugJS.COLOR_B + '">B</span>)'},
    {'cmd': 'self', 'fnc': this.cmdSelf, 'attr': DebugJS.CMD_ATTR_HIDDEN},
    {'cmd': 'set', 'fnc': this.cmdSet, 'desc': 'Set a property value', 'usage': 'set property-name value'},
    {'cmd': 'stopwatch', 'fnc': this.cmdStopwatch, 'desc': 'Manipulate the stopwatch', 'usage': 'stopwatch start|stop|reset'},
    {'cmd': 'time', 'fnc': this.cmdTime, 'desc': 'Manipulate the timer', 'usage': 'time start|split|end|list [timer-name]'},
    {'cmd': 'unicode', 'fnc': this.cmdUnicode, 'desc': 'Displays unicode code point / Decodes unicode string', 'usage': 'unicode [-e|-d] string|codePoint(s)'},
    {'cmd': 'v', 'fnc': this.cmdV, 'desc': 'Displays version info', 'attr': DebugJS.CMD_ATTR_SYSTEM},
    {'cmd': 'win', 'fnc': this.cmdWin, 'desc': 'Set the debugger window size', 'usage': 'win min|normal|max|full|expand|restore|reset', 'attr': DebugJS.CMD_ATTR_DYNAMIC},
    {'cmd': 'zoom', 'fnc': this.cmdZoom, 'desc': 'Zoom the debugger window', 'usage': 'zoom ratio', 'attr': DebugJS.CMD_ATTR_DYNAMIC}
  ];
  this.intCmdTblLen = this.INT_CMD_TBL.length;
  this.CMD_TBL = [];
  this.options = null;
  this.errStatus = DebugJS.ERR_STATE_NONE;
  this.properties = {
    'esc': {'value': 'enable', 'restriction': /^enable$|^disable$/},
    'dumplimit': {'value': 1000, 'restriction': /^[0-9]+$/}
  };
  this.setupDefaultOptions();
};
DebugJS.ENABLE = true;
DebugJS.CATCH_ALL_ERRORS = true;
DebugJS.UNIFY_CONSOLE = false;

DebugJS.INIT_CAUSE_NONE = 0;
DebugJS.INIT_CAUSE_ZOOM = 1;
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
DebugJS.STATE_WINDOW_SIZE_EXPANDED = 0x10000;
DebugJS.STATE_WINDOW_SIZE_FULL_W = 0x20000;
DebugJS.STATE_WINDOW_SIZE_FULL_H = 0x40000;
DebugJS.STATE_WINDOW_SIZE_FULL_WH = DebugJS.STATE_WINDOW_SIZE_FULL_W | DebugJS.STATE_WINDOW_SIZE_FULL_H;
DebugJS.STATE_MEASURE = 0x100000;
DebugJS.STATE_MEASURING = 0x200000;
DebugJS.STATE_SYSTEM_INFO = 0x400000;
DebugJS.STATE_ELEMENT_INSPECTING = 0x800000;
DebugJS.STATE_TOOLS = 0x1000000;
DebugJS.STATE_SCRIPT = 0x2000000;
DebugJS.STATE_HTML_SRC = 0x4000000;
DebugJS.STATE_LOG_SUSPENDING = 0x8000000;
DebugJS.STATE_AUTO_POSITION_ADJUST = 0x10000000;
DebugJS.STATE_NEED_TO_SCROLL = 0x20000000;
DebugJS.STATE_STOPWATCH_LAPTIME = 0x40000000;
DebugJS.LOG_FILTER_STD = 0x1;
DebugJS.LOG_FILTER_DBG = 0x2;
DebugJS.LOG_FILTER_INF = 0x4;
DebugJS.LOG_FILTER_WRN = 0x8;
DebugJS.LOG_FILTER_ERR = 0x10;
DebugJS.LOG_FILTER_ALL = DebugJS.LOG_FILTER_STD | DebugJS.LOG_FILTER_DBG | DebugJS.LOG_FILTER_INF | DebugJS.LOG_FILTER_WRN | DebugJS.LOG_FILTER_ERR;
DebugJS.LOG_TYPE_STD = 0x1;
DebugJS.LOG_TYPE_DBG = 0x2;
DebugJS.LOG_TYPE_INF = 0x4;
DebugJS.LOG_TYPE_WRN = 0x8;
DebugJS.LOG_TYPE_ERR = 0x10;
DebugJS.LOG_TYPE_SYS = 0x20;
DebugJS.LOG_TYPE_MLT = 0x40;
DebugJS.ELMINFO_STATE_SELECT = 0x1;
DebugJS.ELMINFO_STATE_HIGHLIGHT = 0x2;
DebugJS.ERR_STATE_NONE = 0;
DebugJS.ERR_STATE_SCRIPT = 0x1;
DebugJS.ERR_STATE_LOAD = 0x2;
DebugJS.ERR_STATE_LOG = 0x4;
DebugJS.TOOLS_ACTIVE_FUNC_NONE = 0x0;
DebugJS.TOOLS_ACTIVE_FUNC_TEXT = 0x1;
DebugJS.TOOLS_ACTIVE_FUNC_FILE = 0x2;
DebugJS.TOOLS_ACTIVE_FUNC_HTML = 0x4;
DebugJS.TOOLS_ACTIVE_FUNC_MEMO = 0x8;
DebugJS.FILE_LOAD_FORMAT_BASE64 = 0;
DebugJS.FILE_LOAD_FORMAT_BIN = 1;
DebugJS.CMD_ATTR_SYSTEM = 0x1;
DebugJS.CMD_ATTR_HIDDEN = 0x2;
DebugJS.CMD_ATTR_DYNAMIC = 0x4;
DebugJS.CMD_ECHO_MAX_LEN = 256;
DebugJS.DEBUG_WIN_MIN_W = 292;
DebugJS.DEBUG_WIN_MIN_H = 155;
DebugJS.DEBUG_WIN_EXPAND_W = 960;
DebugJS.DEBUG_WIN_EXPAND_H = 640;
DebugJS.DEBUG_WIN_POS_NONE = -9999;
DebugJS.WINDOW_SHADOW = 10;
DebugJS.WINDOW_BORDER = 1;
DebugJS.WINDOW_PADDING = 1;
DebugJS.WINDOW_ADJUST = ((DebugJS.WINDOW_BORDER * 2) + (DebugJS.WINDOW_PADDING * 2));
DebugJS.OVERLAY_PANEL_HEIGHT = 77; //%
DebugJS.CMD_LINE_PADDING = 3;
DebugJS.COLOR_ACTIVE = '#fff';
DebugJS.TOOLS_COLOR_ACTIVE = '#6cf';
DebugJS.TOOLS_COLOR_INACTIVE = '#ccc';
DebugJS.COLOR_INACTIVE = '#999';
DebugJS.MEASURE_BUTTON_COLOR = '#6cf';
DebugJS.SYS_BUTTON_COLOR = '#3af';
DebugJS.HTML_BUTTON_COLOR = '#8f8';
DebugJS.DOM_BUTTON_COLOR = '#f63';
DebugJS.TOOLS_BUTTON_COLOR = '#ff0';
DebugJS.JS_BUTTON_COLOR = '#6df';
DebugJS.PIN_BUTTON_COLOR = '#fa0';
DebugJS.LOG_SUSPEND_BUTTON_COLOR = '#d00';
DebugJS.COLOR_R = '#f66';
DebugJS.COLOR_G = '#6f6';
DebugJS.COLOR_B = '#6bf';
DebugJS.KEY_STATUS_DEFAULT = '- <span style="color:' + DebugJS.COLOR_INACTIVE + ';">SCA</span>';
DebugJS.WDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
DebugJS.UPDATE_INTERVAL_H = 21;
DebugJS.UPDATE_INTERVAL_L = 500;
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
DebugJS.ITEM_NAME_COLOR = '#8f0';
DebugJS.KEYWORD_COLOR = '#2f6';
DebugJS.RANDOM_TYPE_NUM = '-d';
DebugJS.RANDOM_TYPE_STR = '-s';
DebugJS.OMIT_LAST = 0;
DebugJS.OMIT_MID = 1;
DebugJS.OMIT_FIRST = 2;
DebugJS.FORMAT_BIN_DIGITS_THRESHOLD = 5;
DebugJS.SYS_INFO_FULL_OVERLAY = true;
DebugJS.HTML_SRC_FULL_OVERLAY = false;
DebugJS.ELM_INFO_FULL_OVERLAY = false;
DebugJS.ELM_HIGHLISGHT_CLASS_SUFFIX = '-elhl';
DebugJS.LS_AVAILABLE = false;
DebugJS._AVAILABLE = false;
DebugJS.SNIPPET = [
'time.start();\nfor (var i = 0; i < 1000000; i++) {\n\n}\ntime.end();\n\'done\';\n',
'',
'// LED DEMO\nvar speed = 500;  // ms\nvar i = 0;\nledTest();\nfunction ledTest() {\n  // Turn on the LED\n  dbg.led(i);\n\n  var i16 = DebugJS.convRadixDECtoHEX(i);\n  i16 = DebugJS.formatHex(i16, true, true);\n  dbg.msg(\'LED = \' + i + \' (\' + i16 + \')\');\n  if (i <= 255) {\n    dbg.call(ledTest, speed);\n  } else {\n    dbg.led.all(false);\n    dbg.msg.clear();\n  }\n  i++;\n}\n\'LED DEMO\';\n',
'// ASCII characters\nvar str = \'\';\nfor (var i = 0x20; i <= 0x7e; i++) {\n  if ((i % 0x10) == 0) {\n    str += \'\\n\';\n  }\n  str += String.fromCharCode(i);\n}\nstr;\n',
'// logging performance check\nvar i = 0;\nvar loop = 1000;\ndbg.msg(\'loop = \' + loop);\ntime.start(\'total\');\ntest();\nfunction test() {\n  time.start();\n  time.end();\n  i++;\n  if (i == loop ) {\n    dbg.msg.clear();\n    time.end(\'total\');\n  } else {\n    if (i % 100 == 0) {\n      dbg.msg(\'i = \' + i + \' / \' + time.check(\'total\'));\n    }\n    dbg.call(test);\n  }\n}\n'
];
DebugJS.HTML_SNIPPET = [
'<div style="width:100%; height:100%; background:#fff; color:#000;">\n\n</div>\n',
'<div style="width:100%; height:100%; background:#000; color:#fff;">\n\n</div>\n',
'',
'',
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
  'useMsgDisplay',
  'useScreenMeasure',
  'useSystemInfo',
  'useElementInfo',
  'useHtmlSrc',
  'useTools',
  'useScriptEditor',
  'useLogFilter',
  'useCommandLine'
];

DebugJS.prototype = {
  init: function(options, restoreOption) {
    if (!DebugJS.ENABLE) {return false;}
    var self = DebugJS.self;
    var keepStatus = (((restoreOption != null) && (restoreOption.cause == DebugJS.INIT_CAUSE_ZOOM)) ? true : false);
    self.bodyEl = document.body;

    if (self.status & DebugJS.STATE_DYNAMIC) {
      if (self.dbgWin != null) {
        for (var i = self.dbgWin.childNodes.length - 1; i >= 0; i--) {
          self.dbgWin.removeChild(self.dbgWin.childNodes[i]);
        }
        self.bodyEl.removeChild(self.dbgWin);
      }
    }

    if (!keepStatus) {
      self.status = 0;
    }

    if ((this.options == null) || ((options != null) && (!keepStatus))) {
      self.setupDefaultOptions();
    }
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

    self.computedMinWidth = DebugJS.DEBUG_WIN_MIN_W * self.options.zoom;
    self.computedMinHeight = DebugJS.DEBUG_WIN_MIN_H * self.options.zoom;
    self.computedFontSize = Math.round(self.options.fontSize * self.options.zoom);
    self.computedWidth = Math.round(self.options.width * self.options.zoom);

    if (!self.bodyEl) {
      return false;
    }

    self.initStatus(self.options);
    self.initCommandTable();

    // Debug Window
    if (self.options.target == null) {
      self.id = self.DEFAULT_ELM_ID;
      self.dbgWin = document.createElement('div');
      self.dbgWin.id = self.id;
      self.dbgWin.style.position = 'fixed';
      self.dbgWin.style.zIndex = 0x7fffffff;
      self.dbgWin.style.width = self.computedWidth + 'px';
      self.dbgWin.style.boxShadow = DebugJS.WINDOW_SHADOW + 'px ' + DebugJS.WINDOW_SHADOW + 'px 10px rgba(0,0,0,.3)';
      self.bodyEl.appendChild(self.dbgWin);

      if (self.options.kioskMode) {
        self.setupKioskMode();
      }
    } else {
      self.id = self.options.target;
      self.dbgWin = document.getElementById(self.id);
      self.dbgWin.style.position = 'relative';
    }
    self.dbgWin.style.display = 'block';
    self.dbgWin.style.padding = DebugJS.WINDOW_BORDER + 'px';
    self.dbgWin.style.lineHeight = '1em';
    self.dbgWin.style.boxSizing = 'content-box';
    self.dbgWin.style.border = self.options.border;
    self.dbgWin.style.background = 'rgba(' + self.options.bgColor + ',' + self.options.bgOpacity + ')';
    self.dbgWin.style.color = self.options.fontColor;
    self.dbgWin.style.fontSize = self.computedFontSize + 'px',
    self.dbgWin.style.fontFamily = self.options.fontFamily;

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
        self.dbgWin.appendChild(self.resizeN);
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
      self.dbgWin.appendChild(self.resizeE);

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
      self.dbgWin.appendChild(self.resizeS);

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
        self.dbgWin.appendChild(self.resizeW);

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
        self.dbgWin.appendChild(self.resizeNW);

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
        self.dbgWin.appendChild(self.resizeNE);
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
      self.dbgWin.appendChild(self.resizeSE);

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
        self.dbgWin.appendChild(self.resizeSW);
      }
    }

    // style settings
    var styles = {};
    if (DebugJS.getBrowserType().name == 'Firefox') {
      styles['#' + self.id] = {
        'letter-spacing': '-0.35px !important'
      };
    } else {
      styles['#' + self.id] = {
        'letter-spacing': '0 !important'
      };
    }

    styles['#' + self.id + ' td'] = {
      'width': 'initial',
      'padding': '0 3px',
      'border': 'initial',
      'background': 'initial',
      'color': self.options.fontColor,
      'font-size': self.computedFontSize + 'px',
      'font-family': self.options.fontFamily
    };

    styles['#' + self.id + ' pre'] = {
      'margin': '0 !important',
      'color': self.options.fontColor + ' !important',
      'font-size': self.computedFontSize + 'px !important',
      'font-family': self.options.fontFamily + ' !important',
      'white-space': 'pre-wrap !important',
      'word-break': 'break-all !important',
      'overflow': 'visible !important',
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

    styles['.' + self.id + '-btn-disabled'] = {
      'opacity': 0.5
    };

    styles['.' + self.id + '-btn-disabled:hover'] = {
      'color': self.options.btnColor,
      'text-shadow': 'none',
      'cursor': 'auto'
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
      'color': self.options.fontColor + ' !important',
      'font-size': self.computedFontSize + 'px !important',
      'font-family': self.options.fontFamily + ' !important'
    };

    styles['.' + self.id + '-overlay-panel-full'] = {
      'position': 'absolute',
      'top': (self.computedFontSize + DebugJS.WINDOW_ADJUST) + 'px',
      'left': '1px',
      'width': 'calc(100% - ' + (DebugJS.WINDOW_SHADOW + DebugJS.WINDOW_ADJUST - ((overlayPanelPadding * 2) + (overlayPanelBorder * 2))) + 'px)',
      'height': 'calc(100% - ' + ((self.computedFontSize + DebugJS.WINDOW_ADJUST) + DebugJS.WINDOW_SHADOW + self.computedFontSize + 10 - (overlayPanelPadding * 2)) + 'px)',
      'padding': overlayPanelPadding + 'px',
      'border': 'solid ' + overlayPanelBorder + 'px #333',
      'background': 'rgba(0,0,0,0.5)',
      'overflow': 'auto'
    };

    styles['.' + self.id + '-tools'] = {
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'width': '100%',
      'height': '100%'
    };

    styles['.' + self.id + '-separator'] = {
      'height': (self.computedFontSize * 0.5) + 'px'
    };

    styles['.' + self.id + '-unavailable'] = {
      'color': '#ccc'
    };

    styles['.' + self.id + '-showhide-button'] = {
      'color': '#0a0',
      'font-size': (self.computedFontSize * 0.8) + 'px'
    };

    styles['.' + self.id + '-showhide-button:hover'] = {
      'cursor': 'pointer'
    };

    styles['.' + self.id + '-txt-text'] = {
      'border': 'none !important',
      'border-bottom': 'solid 1px #888 !important',
      'border-radius': '0 !important',
      'outline': 'none !important',
      'box-shadow': 'none !important',
      'background': 'transparent !important',
      'color': self.options.fontColor + ' !important',
      'font-size': self.computedFontSize + 'px !important',
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
      'font-size': self.computedFontSize + 'px !important',
      'line-height': '1em !important',
    };

    styles['.' + self.id + '-loading'] = {
      'opacity': '1.0 !important'
    };

    styles['#' + self.id + ' label'] = {
      'display': 'inline',
      'margin': '0',
      'line-height': '1em',
      'color': self.options.fontColor,
      'font-size': self.computedFontSize + 'px',
      'font-weight': 'normal',
      'font-family': self.options.fontFamily
    };

    styles['#' + self.id + ' input[type="radio"]'] = {
      'margin': '0 3px'
    };

    styles['.' + self.id + '-editor'] = {
      'width': 'calc(100% - 6px) !important',
      'height': 'calc(100% - ' + (self.computedFontSize + 10) + 'px) !important',
      'margin': '2px 0 0 0 !important',
      'box-sizing': 'content-box !important',
      'padding': '2px !important',
      'border': 'solid 1px #1883d7 !important',
      'border-radius': '0 !important',
      'outline': 'none !important',
      'background': 'transparent !important',
      'color': '#fff !important',
      'font-size': self.computedFontSize + 'px !important',
      'font-family': self.options.fontFamily + ' !important',
      'overflow': 'auto !important',
      'resize': 'none !important'
    };

    styles['.' + self.id + '-txt-hl'] = {
      'background': 'rgba(192,192,192,0.5) !important'
    };

    styles['.' + self.id + DebugJS.ELM_HIGHLISGHT_CLASS_SUFFIX] = {
      'outline': 'solid 1px #f00 !important',
      'opacity': '0.7 !important'
    };

    self.applyStyles(styles);
    self.initDebugWindow();
    self.setupEventHandler();

    if (self.status & DebugJS.STATE_DYNAMIC) {
      if (self.options.kioskMode) {
        self.cmdLine.focus();
      } else {
        self.setupMove();

        // move to initial window position
        self.initWidth = self.dbgWin.offsetWidth;
        self.initHeight = self.dbgWin.offsetHeight;
        self.resetDebugWindowSizePos();
        self.updateWinCtrlBtnPanel();

        if ((restoreOption != null) && (restoreOption.cause == DebugJS.INIT_CAUSE_ZOOM)) {
          if (self.cmdLine) {
            self.cmdLine.focus();
          }
        }

        if (!(self.status & DebugJS.STATE_VISIBLE)) {
          self.dbgWin.style.display = 'none';
        }
      }
    } else {
      self.initWidth = self.dbgWin.offsetWidth - DebugJS.WINDOW_ADJUST;
      self.initHeight = self.dbgWin.offsetHeight - DebugJS.WINDOW_ADJUST;
    }
    self.windowExpandHeight = DebugJS.DEBUG_WIN_EXPAND_H * self.options.zoom;
    self.initExtention();
    if ((restoreOption != null) && (restoreOption.cause == DebugJS.INIT_CAUSE_ZOOM)) {
      self.resetStylesOnZoom();
      self.reopenFeatures(restoreOption.status);
    }
    self.status |= DebugJS.STATE_INITIALIZED;
    self.printLogMessage();

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
      window.addEventListener('keydown', self.keyHandler, true);
    }

    if ((self.status & DebugJS.STATE_DRAGGABLE) || (self.status & DebugJS.STATE_RESIZABLE) || (self.options.useMouseStatusInfo) || (self.options.useScreenMeasure)) {
      window.addEventListener('mousedown', self.onMouseDown, true);
      window.addEventListener('mousemove', self.onMouseMove, true);
      window.addEventListener('mouseup', self.onMouseUp, true);
    }

    if (self.options.useWindowSizeInfo) {
      window.addEventListener('resize', self.onResize, true);
      self.onResize();

      window.addEventListener('scroll', self.onScroll, true);
      self.onScroll();
    }

    if (self.options.useKeyStatusInfo) {
      window.addEventListener('keydown', self.onKeyDown, true);
      self.updateKeyDownPanel();

      window.addEventListener('keypress', self.onKeyPress, true);
      self.updateKeyPressPanel();

      window.addEventListener('keyup', self.onKeyUp, true);
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
    } else if (self.errStatus) {
      if (((self.options.popupOnError.scriptError) && (self.errStatus & DebugJS.ERR_STATE_SCRIPT)) ||
          ((self.options.popupOnError.loadError) && (self.errStatus & DebugJS.ERR_STATE_LOAD)) ||
          ((self.options.popupOnError.errorLog) && (self.errStatus & DebugJS.ERR_STATE_LOG))) {
        self.status |= DebugJS.STATE_VISIBLE;
        self.errStatus = DebugJS.ERR_STATE_NONE;
      }
    }
    if (self.options.resizable) self.status |= DebugJS.STATE_RESIZABLE;
    if (self.options.useClock) self.status |= DebugJS.STATE_SHOW_CLOCK;
  },

  setupKioskMode: function() {
    var self = DebugJS.self;
    self.dbgWin.style.top = 0;
    self.dbgWin.style.left = 0;
    self.status |= DebugJS.STATE_WINDOW_SIZE_FULL_WH;
    self.dbgWin.style.width = document.documentElement.clientWidth + 'px';
    self.dbgWin.style.height = document.documentElement.clientHeight + 'px';

    self.options.togglableShowHide = false;
    self.options.usePinButton = false;
    self.options.useWindowControlButton = false;
    self.options.useScreenMeasure = false;
    self.options.useHtmlSrc = false;
    self.options.useElementInfo = false;

    self.status |= DebugJS.STATE_VISIBLE;
    self.status &= ~DebugJS.STATE_RESIZABLE;
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
    self.dbgWin.appendChild(self.windowBody);
    if (self.status & DebugJS.STATE_DRAGGABLE) {
      self.windowBody.style.cursor = 'default';
    }

    if (!self.isAllFeaturesDisabled()) {
      // Head Panel
      self.headPanel = document.createElement('div');
      self.headPanel.style.padding = '2px';
      self.windowBody.appendChild(self.headPanel);

      // Info Panel
      self.infoPanel = document.createElement('div');
      self.infoPanel.style.padding = '0 2px 1px 2px';
      self.windowBody.appendChild(self.infoPanel);
    }

    // Main
    self.mainPanel = document.createElement('div');
    if (self.options.useLogFilter) {
      self.mainPanel.style.height = (self.options.lines + 1) + '.1em';
    } else {
      self.mainPanel.style.height = self.options.lines + '.1em';
    }
    self.mainPanel.style.clear = 'both';
    self.windowBody.appendChild(self.mainPanel);

    // Log Header Panel
    if (self.options.useLogFilter) {
      self.logHeaderPanel = document.createElement('div');
      self.logHeaderPanel.style.position = 'relative';
      self.logHeaderPanel.style.height = self.computedFontSize + 'px';
      self.logHeaderPanel.style.marginBottom = '2px';
      self.mainPanel.appendChild(self.logHeaderPanel);
    }

    // CLR Button
    if (self.options.useClearButton) {
      self.clearBtn = document.createElement('span');
      self.clearBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.clearBtn.onclick = DebugJS.self.clearMessage;
      self.clearBtn.innerText = '[CLR]';
      self.headPanel.appendChild(self.clearBtn);
    }

    // Log Filter
    if (self.options.useLogFilter) {
      self.createLogFilter();
    }

    // Log
    if (self.options.useLogFilter) {
      self.logPanelHeightAdjust = ' - 1em';
    } else {
      self.logPanelHeightAdjust = '';
    }
    self.logPanel = document.createElement('div');
    self.logPanel.style.width = '100%';
    self.logPanel.style.height = 'calc(100%' + self.logPanelHeightAdjust + ')';
    self.logPanel.style.padding = '0';
    self.logPanel.style.overflow = 'auto';
    self.mainPanel.appendChild(self.logPanel);

    if (self.isAllFeaturesDisabled()) {
      return;
    }

    // Clock
    if (self.options.useClock) {
      self.clockPanel = document.createElement('span');
      self.clockPanel.style.marginLeft = '2px';
      self.clockPanel.style.color = self.options.clockColor;
      self.clockPanel.style.fontSize = self.computedFontSize + 'px';
      self.headPanel.appendChild(self.clockPanel);
      self.clockUpdateInterval = DebugJS.UPDATE_INTERVAL_L;
    }

    // -- R to L
    // X Button
    if (self.options.togglableShowHide) {
      self.closeBtn = document.createElement('span');
      self.closeBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.closeBtn.style.float = 'right';
      self.closeBtn.style.position = 'relative';
      self.closeBtn.style.top = '-1px';
      self.closeBtn.style.marginRight = '2px';
      self.closeBtn.style.color = '#888';
      self.closeBtn.style.fontSize = (18 * self.options.zoom) + 'px';
      self.closeBtn.onmouseover = new Function('this.style.color=\'#d88\';');
      self.closeBtn.onmouseout = new Function('this.style.color=\'#888\';');
      self.closeBtn.onclick = new Function('DebugJS.self.closeDebugWindow();');
      self.closeBtn.innerText = 'x';
      self.headPanel.appendChild(self.closeBtn);
    }

    // Window Control Button
    if ((self.status & DebugJS.STATE_DYNAMIC) &&
        (self.status & DebugJS.STATE_RESIZABLE) &&
        (self.options.useWindowControlButton)) {
      self.winCtrlBtnPanel = document.createElement('span');
      self.headPanel.appendChild(self.winCtrlBtnPanel);
    }

    // Pin Button
    if ((self.status & DebugJS.STATE_DYNAMIC) && (self.options.usePinButton)) {
      self.pinBtn = self.createHeaderButton('pinBtn', '&#x1F4CC;', '2px', (11 * self.options.zoom) + 'px', DebugJS.self.toggleDraggable, 'DebugJS.STATE_DRAGGABLE', 'DebugJS.PIN_BUTTON_COLOR', true);
    }

    // Suspend Log Button
    if (self.options.useSuspendLogButton) {
      self.suspendLogBtn = self.createHeaderButton('suspendLogBtn', '&#x1F6AB;', '4px', (11 * self.options.zoom) + 'px', DebugJS.self.toggleLogSuspend, 'DebugJS.STATE_LOG_SUSPENDING', 'DebugJS.LOG_SUSPEND_BUTTON_COLOR', false);
    }

    // Stopwatch
    if (self.options.useStopWatch) {
      self.swPanel = document.createElement('span');
      self.swPanel.style.float = 'right';
      self.swPanel.style.marginLeft = '3px';
      self.headPanel.appendChild(self.swPanel);

      self.swBtnPanel = document.createElement('span');
      self.swBtnPanel.style.float = 'right';
      self.swBtnPanel.style.marginLeft = '4px';
      self.headPanel.appendChild(self.swBtnPanel);
    }

    // Tools Button
    if (self.options.useTools) {
      self.toolsBtn = self.createHeaderButton('toolsBtn', 'TL', '2px', null, DebugJS.self.toggleToolsMode, 'DebugJS.STATE_TOOLS', 'DebugJS.TOOLS_BUTTON_COLOR', false);
    }

    // Script Button
    if (self.options.useScriptEditor) {
      self.scriptBtn = self.createHeaderButton('scriptBtn', 'JS', '2px', null, DebugJS.self.toggleScriptMode, 'DebugJS.STATE_SCRIPT', 'DebugJS.JS_BUTTON_COLOR', false);
    }

    // Element Info Button
    if (self.options.useElementInfo) {
      self.elmInfoBtn = self.createHeaderButton('elmInfoBtn', 'DOM', '3px', null, DebugJS.self.toggleElmInfoMode, 'DebugJS.STATE_ELEMENT_INSPECTING', 'DebugJS.DOM_BUTTON_COLOR', false);
    }

    // HTML Src Button
    if (self.options.useHtmlSrc) {
      self.htmlSrcBtn = self.createHeaderButton('htmlSrcBtn', 'HTM', '3px', null, DebugJS.self.toggleHtmlSrcMode, 'DebugJS.STATE_HTML_SRC', 'DebugJS.HTML_BUTTON_COLOR', false);
    }

    // System Info Button
    if (self.options.useSystemInfo) {
      self.sysInfoBtn = self.createHeaderButton('sysInfoBtn', 'SYS', '3px', null, DebugJS.self.toggleSystemInfoMode, 'DebugJS.STATE_SYSTEM_INFO', 'DebugJS.SYS_BUTTON_COLOR', false);
    }

    // Screen Measure Button
    if (self.options.useScreenMeasure) {
      self.measureBtn = document.createElement('span');
      self.measureBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.measureBtn.style.display = 'inline-block';
      self.measureBtn.style.float = 'right';
      self.measureBtn.style.marginTop = ((self.options.zoom <= 1) ? 1 : (2 * self.options.zoom)) + 'px';
      self.measureBtn.style.marginLeft = '3px';
      self.measureBtn.style.width = (10 * self.options.zoom) + 'px';
      self.measureBtn.style.height = (7 * self.options.zoom) + 'px';
      self.measureBtn.innerText = ' ';
      self.measureBtn.onclick = DebugJS.self.toggleMeasureMode;
      self.measureBtn.onmouseover = new Function('DebugJS.self.measureBtn.style.borderColor=\'' + DebugJS.MEASURE_BUTTON_COLOR + '\';');
      self.measureBtn.onmouseout = new Function('DebugJS.self.measureBtn.style.borderColor=(DebugJS.self.status & DebugJS.STATE_MEASURE) ? DebugJS.MEASURE_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;');
      self.headPanel.appendChild(self.measureBtn);
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

    // Message Display
    if (self.options.useMsgDisplay) {
      self.msgPanel = document.createElement('span');
      self.msgPanel.className = this.id + '-sys-info';
      self.msgPanel.style.float = self.options.msgDisplayPos;
      self.msgPanel.style.marginRight = '3px';
      self.msgPanel.style.border = '0';
      self.msgPanel.style.padding = '0 1px';
      self.msgPanel.style.background = self.options.msgDisplayBackground;
      self.msgPanel.style.color = self.options.fontColor;
      self.msgPanel.style.whiteSpace = 'pre-wrap';
      self.msgPanel.style.wordBreak = 'break-all';
      self.msgPanel.style.overflow = 'hidden';
      self.msgPanel.style.textOverflow = 'ellipsis';
      self.infoPanel.appendChild(self.msgPanel);
    }

    // Command Line
    if (self.options.useCommandLine) {
      self.cmdPanel = document.createElement('div');
      self.cmdPanel.style.padding = DebugJS.CMD_LINE_PADDING + 'px';
      self.windowBody.appendChild(self.cmdPanel);
      self.cmdPanel.innerHTML = '<span style="color:' + self.options.promptColor + ';">$</span>';
      self.cmdLine = document.createElement('input');
      self.cmdLine.style.setProperty('width', 'calc(100% - ' + self.computedFontSize + 'px)', 'important');
      self.cmdLine.style.setProperty('margin-left', '2px', 'important');
      self.cmdLine.style.setProperty('padding', '1px', 'important');
      self.cmdLine.style.setProperty('border', '0', 'important');
      self.cmdLine.style.setProperty('border-bottom', 'solid 1px #888', 'important');
      self.cmdLine.style.setProperty('border-radius', '0', 'important');
      self.cmdLine.style.setProperty('outline', 'none', 'important');
      self.cmdLine.style.setProperty('box-shadow', 'none', 'important');
      self.cmdLine.style.setProperty('background', 'transparent', 'important');
      self.cmdLine.style.setProperty('color', self.options.fontColor, 'important');
      self.cmdLine.style.setProperty('font-size', self.computedFontSize + 'px', 'important');
      self.cmdLine.style.setProperty('font-family', self.options.fontFamily, 'important');
      self.cmdPanel.appendChild(self.cmdLine);
      self.initHistory();
    }
  },

  initDebugWindow: function() {
    var self = DebugJS.self;
    if (self.isAllFeaturesDisabled()) return;
    if (self.options.useLogFilter) self.updateLogFilterButtons();
    if (self.status & DebugJS.STATE_SHOW_CLOCK) self.updateClockPanel();
    if (self.options.useScreenMeasure) self.updateMeasureBtn();
    if (self.options.useSystemInfo) self.updateSysInfoBtn();
    if (self.options.useElementInfo) self.updateElmInfoBtn();
    if (self.options.useHtmlSrc) self.updateHtmlSrcBtn();
    if (self.options.useTools) self.updateToolsBtn();
    if (self.options.useScriptEditor) self.updateScriptBtn();
    if (self.options.useStopWatch) {
      self.updateSwBtnPanel();
      self.updateSwPanel();
    }
    if ((self.status & DebugJS.STATE_DYNAMIC) && (self.options.usePinButton)) {
      self.updatePinBtn();
    }
    if (self.options.useSuspendLogButton) self.updateSuspendLogBtn();
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
    if (self.options.useLed) self.updateLedPanel();
    if (self.options.useMsgDisplay) self.updateMsgPanel();
  },

  createHeaderButton: function(btnobj, label, marginLeft, fontSize, handler, status, activeColor, reverse) {
    var self = DebugJS.self;
    var btn = document.createElement('span');
    btn.className = this.id + '-btn ' + this.id + '-nomove';
    btn.style.float = 'right';
    btn.style.marginLeft = marginLeft;
    if (fontSize) btn.style.fontSize = fontSize;
    btn.innerHTML = label;
    btn.onclick = handler;
    btn.onmouseover = new Function('DebugJS.self.' + btnobj + '.style.color=' + activeColor + ';');
    if (reverse) {
      btn.onmouseout = new Function('DebugJS.self.' + btnobj + '.style.color=(DebugJS.self.status & ' + status + ') ? DebugJS.COLOR_INACTIVE : ' + activeColor + ';');
    } else {
      btn.onmouseout = new Function('DebugJS.self.' + btnobj + '.style.color=(DebugJS.self.status & ' + status + ') ? ' + activeColor + ' : DebugJS.COLOR_INACTIVE;');
    }
    self.headPanel.appendChild(btn);
    return btn;
  },

  createTextInput: function(width, textAlign, color, value, inputHandler) {
    var self = DebugJS.self;
    var textInput = document.createElement('input');
    textInput.className = self.id + '-txt-text';
    textInput.style.setProperty('width', width, 'important');
    textInput.style.setProperty('margin', '0', 'important');
    textInput.style.setProperty('padding', '0', 'important');
    if (textAlign) textInput.style.setProperty('text-align', textAlign, 'important');
    textInput.style.setProperty('color', color, 'important');
    textInput.value = value;
    textInput.oninput = inputHandler;
    return textInput;
  },

  createLogFilter: function() {
    var self = DebugJS.self;
    self.filterBtnAll = self.createLogFilterButton('ALL', 'DebugJS.LOG_FILTER_ALL', 'filterBtnAll', 'DebugJS.self.options.btnColor');
    self.filterBtnStd = self.createLogFilterButton('STD', 'DebugJS.LOG_FILTER_STD', 'filterBtnStd', 'DebugJS.self.options.fontColor');
    self.filterBtnDbg = self.createLogFilterButton('DBG', 'DebugJS.LOG_FILTER_DBG', 'filterBtnDbg', 'DebugJS.self.options.logColorD');
    self.filterBtnInf = self.createLogFilterButton('INF', 'DebugJS.LOG_FILTER_INF', 'filterBtnInf', 'DebugJS.self.options.logColorI');
    self.filterBtnWrn = self.createLogFilterButton('WRN', 'DebugJS.LOG_FILTER_WRN', 'filterBtnWrn', 'DebugJS.self.options.logColorW');
    self.filterBtnErr = self.createLogFilterButton('ERR', 'DebugJS.LOG_FILTER_ERR', 'filterBtnErr', 'DebugJS.self.options.logColorE');

    self.filterInputLabel = document.createElement('span');
    self.filterInputLabel.style.marginLeft = '4px';
    self.filterInputLabel.style.color = self.options.sysInfoColor;
    self.filterInputLabel.innerText = 'Filter:';
    self.logHeaderPanel.appendChild(self.filterInputLabel);

    var filterWidth = 'calc(100% - 23em)';
    self.filterInput = self.createTextInput(filterWidth, null, self.options.sysInfoColor, self.filterText, DebugJS.self.onchangeLogFilter);
    self.filterInput.style.setProperty('position', 'relative', 'important');
    self.filterInput.style.setProperty('top', '-2px', 'important');
    self.filterInput.style.setProperty('margin-left', '2px', 'important');
    self.logHeaderPanel.appendChild(self.filterInput);
  },

  createLogFilterButton: function(label, filter, btnobj, color) {
    var self = DebugJS.self;
    btn = document.createElement('span');
    btn.className = this.id + '-btn ' + this.id + '-nomove';
    btn.style.marginLeft = '2px';
    btn.innerText = '[' + label + ']';
    btn.onclick = new Function('DebugJS.self.toggleLogFilter(' + filter + ');');
    btn.onmouseover = new Function('DebugJS.self.' + btnobj + '.style.color=' + color + ';');
    btn.onmouseout = DebugJS.self.updateLogFilterButtons;
    self.logHeaderPanel.appendChild(btn);
    return btn;
  },

  resetStylesOnZoom: function() {
    var self = DebugJS.self;
    if (self.toolsPanel != null) {
      self.toolsHeaderPanel.style.height = self.computedFontSize + 'px';
      self.toolsBodyPanel.style.height = 'calc(100% - ' + self.computedFontSize + 'px)';
    }
    if (self.fileLoaderPanel != null) {
      self.fileInput.style.setProperty('width', 'calc(100% - ' + (self.computedFontSize * 12) + 'px)', 'important');
      self.fileInput.style.setProperty('min-height', (20 * self.options.zoom) + 'px', 'important');
      self.fileInput.style.setProperty('font-size', self.computedFontSize + 'px', 'important');
      self.filePreviewWrapper.style.setProperty('height', 'calc(100% - ' + ((self.computedFontSize * 4) + 10) + 'px)', 'important');
      self.filePreviewWrapper.style.setProperty('font-size', self.computedFontSize + 'px', 'important');
      self.filePreview.style.setProperty('font-size', self.computedFontSize + 'px', 'important');
      self.fileLoaderFooter.style.height = (self.computedFontSize + 3) + 'px';
      self.fileLoadProgressBar.style.width = 'calc(100% - ' + (self.computedFontSize * 5) + 'px)';
      self.fileLoadProgress.style.fontSize = (self.computedFontSize * 0.8) + 'px';
    }
  },

  reopenFeatures: function(status) {
    var self = DebugJS.self;
    if (status & DebugJS.STATE_MEASURE) {
      self.enableMeasureMode(true);
    }
    if (status & DebugJS.STATE_SYSTEM_INFO) {
      self.enableSystemInfo();
    }
    if (status & DebugJS.STATE_HTML_SRC) {
      self.enableHtmlSrc();
    }
    if (status & DebugJS.STATE_ELEMENT_INSPECTING) {
      self.enableElmInfo();
    }
    if (status & DebugJS.STATE_SCRIPT) {
      self.enableScriptEditor();
    }
    if (status & DebugJS.STATE_TOOLS) {
      self.enableTools();
    }
  },

  initCommandTable: function() {
    var self = DebugJS.self;
    self.CMD_TBL = [];
    for (var i = 0; i < self.INT_CMD_TBL.length; i++) {
      if (self.options.disableAllCommands) {
        if (self.INT_CMD_TBL[i].attr & DebugJS.CMD_ATTR_SYSTEM) {
          self.CMD_TBL.push(self.INT_CMD_TBL[i]);
        }
      } else {
        if (!(!(self.status & DebugJS.STATE_DYNAMIC) && (self.INT_CMD_TBL[i].attr & DebugJS.CMD_ATTR_DYNAMIC))) {
          self.CMD_TBL.push(self.INT_CMD_TBL[i]);
        }
      }
    }
    self.intCmdTblLen = self.CMD_TBL.length;
  },

  setWindowPosition: function(pos, dbgWinWidth, dbgWinHeight) {
    var self = DebugJS.self;
    switch (pos) {
      case 'se':
        self.dbgWin.style.top = (document.documentElement.clientHeight - dbgWinHeight - self.options.posAdjY) + 'px';
        self.dbgWin.style.left = (document.documentElement.clientWidth - dbgWinWidth - self.options.posAdjX) + 'px';
        break;
      case 'ne':
        self.dbgWin.style.top = self.options.posAdjY + 'px';
        self.dbgWin.style.left = (document.documentElement.clientWidth - dbgWinWidth - self.options.posAdjX) + 'px';
        break;
      case 'c':
        self.dbgWin.style.top = ((document.documentElement.clientHeight / 2) - (dbgWinHeight / 2)) + 'px';
        self.dbgWin.style.left = ((document.documentElement.clientWidth / 2) - (dbgWinWidth / 2)) + 'px';
        break;
      case 'sw':
        self.dbgWin.style.top = (document.documentElement.clientHeight - dbgWinHeight - self.options.posAdjY) + 'px';
        self.dbgWin.style.left = self.options.posAdjX + 'px';
        break;
      case 'n':
        self.dbgWin.style.top = self.options.posAdjY + 'px';
        self.dbgWin.style.left = ((document.documentElement.clientWidth / 2) - (dbgWinWidth / 2)) + 'px';
        break;
      case 'e':
        self.dbgWin.style.top = ((document.documentElement.clientHeight / 2) - (dbgWinHeight / 2)) + 'px';
        self.dbgWin.style.left = (document.documentElement.clientWidth - dbgWinWidth - self.options.posAdjX) + 'px';
        break;
      case 's':
        self.dbgWin.style.top = (document.documentElement.clientHeight - dbgWinHeight - self.options.posAdjY) + 'px';
        self.dbgWin.style.left = ((document.documentElement.clientWidth / 2) - (dbgWinWidth / 2)) + 'px';
        break;
      case 'w':
        self.dbgWin.style.top = ((document.documentElement.clientHeight / 2) - (dbgWinHeight / 2)) + 'px';
        self.dbgWin.style.left = self.options.posAdjX + 'px';
        break;
      default:
        self.dbgWin.style.top = self.options.posAdjY + 'px';
        self.dbgWin.style.left = self.options.posAdjX + 'px';
        break;
    }
  },

  // Update Clock
  updateClockPanel: function() {
    var self = DebugJS.self;
    var dt = DebugJS.getCurrentDateTime();
    var t = dt.yyyy + '-' + dt.mm + '-' + dt.dd + '(' + DebugJS.WDAYS[dt.wday] + ') ' + dt.hh + ':' + dt.mi + ':' + dt.ss;
    //t += (dt.sss < 500) ? ' ' : '.';
    self.clockPanel.innerText = t;
    if (self.status & DebugJS.STATE_SHOW_CLOCK) {
      setTimeout(self.updateClockPanel, self.clockUpdateInterval);
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
      var LED = '&#x25CF;';
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
      '<span style="' + bit7Color + 'margin-right:2px;">' + LED + '</span>' +
      '<span style="' + bit6Color + 'margin-right:2px;">' + LED + '</span>' +
      '<span style="' + bit5Color + 'margin-right:2px;">' + LED + '</span>' +
      '<span style="' + bit4Color + 'margin-right:2px;">' + LED + '</span>' +
      '<span style="' + bit3Color + 'margin-right:2px;">' + LED + '</span>' +
      '<span style="' + bit2Color + 'margin-right:2px;">' + LED + '</span>' +
      '<span style="' + bit1Color + 'margin-right:2px;">' + LED + '</span>' +
      '<span style="' + bit0Color + '">' + LED + '</span>';
      self.ledPanel.innerHTML = led;
    }
  },

  // Update Message Display
  updateMsgPanel: function() {
    var self = DebugJS.self;
    var message = self.msgString;
    if (self.msgPanel) {
      var html = '<pre>' + message + '</pre>';
      self.msgPanel.innerHTML = html;
      if (message == '') {
        self.msgPanel.style.opacity = 0;
      } else {
        self.msgPanel.style.opacity = 1;
      }
    }
  },

  // Update Measure Button
  updateMeasureBtn: function() {
    var self = DebugJS.self;
    self.measureBtn.style.border = 'solid 1px ' + ((self.status & DebugJS.STATE_MEASURE) ? DebugJS.MEASURE_BUTTON_COLOR : DebugJS.COLOR_INACTIVE);
  },

  // Update System Info Button
  updateSysInfoBtn: function() {
    var self = DebugJS.self;
    self.sysInfoBtn.style.color = (self.status & DebugJS.STATE_SYSTEM_INFO) ? DebugJS.SYS_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update Element Info Button
  updateElmInfoBtn: function() {
    var self = DebugJS.self;
    self.elmInfoBtn.style.color = (self.status & DebugJS.STATE_ELEMENT_INSPECTING) ? DebugJS.DOM_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update HTML Src Button
  updateHtmlSrcBtn: function() {
    var self = DebugJS.self;
    self.htmlSrcBtn.style.color = (self.status & DebugJS.STATE_HTML_SRC) ? DebugJS.HTML_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update Tools Button
  updateToolsBtn: function() {
    var self = DebugJS.self;
    self.toolsBtn.style.color = (self.status & DebugJS.STATE_TOOLS) ? DebugJS.TOOLS_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update Script Button
  updateScriptBtn: function() {
    var self = DebugJS.self;
    self.scriptBtn.style.color = (self.status & DebugJS.STATE_SCRIPT) ? DebugJS.JS_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update Stop Watch Button
  updateSwBtnPanel: function() {
    var self = DebugJS.self;
    var btn = (self.status & DebugJS.STATE_STOPWATCH_RUNNING) ? '||' : '>>';
    var btns = '<span class="' + this.id + '-btn ' + this.id + '-nomove" style="margin-right:2px;" onclick="DebugJS.self.resetStopWatch();">0</span>' +
    '<span class="' + this.id + '-btn ' + this.id + '-nomove" onclick="DebugJS.self.startStopStopWatch();">' + btn + '</span>';
    self.swBtnPanel.innerHTML = btns;
  },

  // Update Stop Watch
  updateSwPanel: function() {
    var self = DebugJS.self;
    self.updateStopWatch();
    if (self.status & DebugJS.STATE_STOPWATCH_LAPTIME) {
      self.swPanel.innerHTML = '<span style="color:' + self.options.timerColor + ';">' + self.swElapsedTimeDisp + '</span>';
    } else {
      self.swPanel.innerHTML = self.swElapsedTimeDisp;
    }
    if (self.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      setTimeout(self.updateSwPanel, DebugJS.UPDATE_INTERVAL_H);
    }
  },

  // Update Suspend Log Button
  updateSuspendLogBtn: function() {
    var self = DebugJS.self;
    self.suspendLogBtn.style.color = (self.status & DebugJS.STATE_LOG_SUSPENDING) ? DebugJS.LOG_SUSPEND_BUTTON_COLOR : DebugJS.COLOR_INACTIVE;
  },

  // Update Pin Button
  updatePinBtn: function() {
    var self = DebugJS.self;
    self.pinBtn.style.color = (self.status & DebugJS.STATE_DRAGGABLE) ? DebugJS.COLOR_INACTIVE : DebugJS.PIN_BUTTON_COLOR;
  },

  // Window Control Button
  updateWinCtrlBtnPanel: function() {
    var self = DebugJS.self;
    if (!self.winCtrlBtnPanel) return;
    var fn = 'DebugJS.self.expandDebugWindow(true)';
    var btn = '&#x25A1;';
    if ((self.status & DebugJS.STATE_WINDOW_SIZE_EXPANDED) || (self.status & DebugJS.STATE_WINDOW_SIZE_FULL_W) || (self.status & DebugJS.STATE_WINDOW_SIZE_FULL_H)) {
      fn = 'DebugJS.self.restoreDebugWindow()';
      btn = '&#x2750;';
    }
    var b = '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="float:right;position:relative;top:-1px;margin-right:3px;font-size:' + (16 * self.options.zoom) + 'px;color:#888;" onclick="' + fn + ';DebugJS.self.updateWinCtrlBtnPanel();" onmouseover="this.style.color=\'#ddd\';" onmouseout="this.style.color=\'#888\';">' + btn + '</span>' +
    '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="float:right;position:relative;top:-2px;margin-right:1px;font-size:' + (30 * self.options.zoom) + 'px;color:#888;" onclick="DebugJS.self.resetDebugWindowSizePos();DebugJS.self.updateWinCtrlBtnPanel();" onmouseover="this.style.color=\'#ddd\';" onmouseout="this.style.color=\'#888\';">-</span>';
    self.winCtrlBtnPanel.innerHTML = b;
  },

  // Log Output
  printLogMessage: function() {
    var self = DebugJS.self;
    var msg = self.getLogMsgs();
    var html = '<pre style="padding:0 3px;">' + msg + '</pre>';
    self.logPanel.innerHTML = html;
    self.logPanel.scrollTop = self.logPanel.scrollHeight;
    if (!(self.status & DebugJS.STATE_VISIBLE)) {
      self.status |= DebugJS.STATE_NEED_TO_SCROLL;
    }
  },

  clearMessage: function() {
    var self = DebugJS.self;
    self.msgBuf.clear();
    self.printLogMessage();
  },

  toggleLogFilter: function(filter) {
    var self = DebugJS.self;
    if (filter == DebugJS.LOG_FILTER_ALL) {
      if (self.logFilter == DebugJS.LOG_FILTER_ALL) {
        self.logFilter = 0;
      } else {
        self.logFilter = DebugJS.LOG_FILTER_ALL;
      }
    } else {
      if (self.logFilter == DebugJS.LOG_FILTER_ALL) {
        self.logFilter = filter;
      } else {
        if (self.logFilter & filter) {
          self.logFilter &= ~filter;
        } else {
          self.logFilter |= filter;
        }
      }
    }
    self.updateLogFilterButtons();
    self.printLogMessage();
  },

  updateLogFilterButtons: function() {
    var self = DebugJS.self;
    self.filterBtnAll.style.color = (self.logFilter == DebugJS.LOG_FILTER_ALL) ? DebugJS.self.options.btnColor : DebugJS.COLOR_INACTIVE;
    self.filterBtnStd.style.color = (self.logFilter & DebugJS.LOG_FILTER_STD) ? DebugJS.self.options.fontColor : DebugJS.COLOR_INACTIVE;
    self.filterBtnDbg.style.color = (self.logFilter & DebugJS.LOG_FILTER_DBG) ? DebugJS.self.options.logColorD : DebugJS.COLOR_INACTIVE;
    self.filterBtnInf.style.color = (self.logFilter & DebugJS.LOG_FILTER_INF) ? DebugJS.self.options.logColorI : DebugJS.COLOR_INACTIVE;
    self.filterBtnWrn.style.color = (self.logFilter & DebugJS.LOG_FILTER_WRN) ? DebugJS.self.options.logColorW : DebugJS.COLOR_INACTIVE;
    self.filterBtnErr.style.color = (self.logFilter & DebugJS.LOG_FILTER_ERR) ? DebugJS.self.options.logColorE : DebugJS.COLOR_INACTIVE;
  },

  onchangeLogFilter: function() {
    var self = DebugJS.self;
    self.filterText = self.filterInput.value;
    self.printLogMessage();
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
    self.prevOffsetTop = e.clientY - self.dbgWin.offsetTop;
    self.prevOffsetLeft = e.clientX - self.dbgWin.offsetLeft;
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
    self.dbgWin.style.top = e.clientY - self.prevOffsetTop + 'px';
    self.dbgWin.style.left = e.clientX - self.prevOffsetLeft + 'px';
  },

  endMove: function() {
    var self = DebugJS.self;
    self.status &= ~DebugJS.STATE_DRAGGING;
    self.windowBody.style.cursor = 'default';
  },

  startResize: function(e) {
    if (e.button != 0) return;
    var self = DebugJS.self;
    self.status |= DebugJS.STATE_RESIZING;
    self.clickedPosX = e.clientX;
    self.clickedPosY = e.clientY;
    self.saveSizeAndPos();
    self.status &= ~DebugJS.STATE_WINDOW_SIZE_EXPANDED;
    self.status &= ~DebugJS.STATE_WINDOW_SIZE_FULL_WH;
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
      if (h < self.computedMinHeight) {
        h = self.computedMinHeight;
      } else {
        t = self.orgSizePos.t - moveY;
        self.dbgWin.style.top = t + 'px';
      }
      self.dbgWin.style.height = h + 'px';
      if (self.logPanel.scrollTop != 0) {
        self.logPanel.scrollTop = self.logPanel.scrollHeight;
      }
    }

    if (self.status & DebugJS.STATE_RESIZING_W) {
      moveX = self.clickedPosX - currentX;
      w = self.orgSizePos.w + moveX;
      if (w < self.computedMinWidth) {
        w = self.computedMinWidth;
      } else {
        l = self.orgSizePos.l - moveX;
        self.dbgWin.style.left = l + 'px';
      }
      self.dbgWin.style.width = w + 'px';
    }

    if (self.status & DebugJS.STATE_RESIZING_E) {
      moveX = currentX - self.clickedPosX;
      w = self.orgSizePos.w + moveX;
      if (w < self.computedMinWidth) w = self.computedMinWidth;
      self.dbgWin.style.width = w + 'px';
    }

    if (self.status & DebugJS.STATE_RESIZING_S) {
      moveY = currentY - self.clickedPosY;
      h = self.orgSizePos.h + moveY;
      if (self.initHeight < self.computedMinHeight) {
        if (h < self.initHeight) {
          h = self.initHeight;
        }
      } else if (h < self.computedMinHeight) {
        h = self.computedMinHeight;
      }
      self.dbgWin.style.height = h + 'px';
      if (self.logPanel.scrollTop != 0) {
        self.logPanel.scrollTop = self.logPanel.scrollHeight;
      }
    }

    self.resizeMainHeight();
    self.resizeImgPreview();
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
    var mainPanelHeight = self.dbgWin.offsetHeight - headPanelH - infoPanelH - cmdPanelH - DebugJS.WINDOW_ADJUST;
    self.mainPanel.style.height = mainPanelHeight + 'px';
  },

  toggleLogSuspend: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_LOG_SUSPENDING) {
      self.status &= ~DebugJS.STATE_LOG_SUSPENDING;
    } else {
      self.status |= DebugJS.STATE_LOG_SUSPENDING;
    }
    self.updateSuspendLogBtn();
  },

  toggleMeasureMode: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_MEASURE) {
      self.disableMeasureMode();
    } else {
      self.enableMeasureMode();
    }
  },

  enableMeasureMode: function(silent) {
    var self = DebugJS.self;
    if (!silent) DebugJS.log.s('Screen Measure ON.');
    self.status |= DebugJS.STATE_MEASURE;
    self.updateMeasureBtn();
  },

  disableMeasureMode: function(silent) {
    var self = DebugJS.self;
    self.stopMeasure();
    self.status &= ~DebugJS.STATE_MEASURE;
    if (!silent) DebugJS.log.s('Screen Measure OFF.');
    self.updateMeasureBtn();
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
    self.updatePinBtn();
  },

  disableDraggable: function() {
    var self = DebugJS.self;
    self.status &= ~DebugJS.STATE_DRAGGABLE;
    self.windowBody.style.cursor = 'auto';
    self.updatePinBtn();
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
    if (self.status & DebugJS.STATE_STOPWATCH_LAPTIME) {
      self.status &= ~DebugJS.STATE_STOPWATCH_LAPTIME;
      self.resetStopWatch();
    }
    self.updateSwBtnPanel();
  },

  resetStopWatch: function() {
    var self = DebugJS.self;
    self.swStartTime = (new Date()).getTime();
    self.swElapsedTime = 0;
    self.swElapsedTimeDisp = DebugJS.getTimerStr(self.swElapsedTime);
    self.updateSwPanel();
  },

  updateStopWatch: function() {
    if (!(DebugJS.self.status & DebugJS.STATE_STOPWATCH_RUNNING)) return;
    var self = DebugJS.self;
    var swCurrentTime = (new Date()).getTime();
    self.swElapsedTime = swCurrentTime - self.swStartTime;
    self.swElapsedTimeDisp = DebugJS.getTimerStr(self.swElapsedTime);
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
      var data = buf[i];
      if (data == undefined) break;
      var msg = data.msg;
      var filter = self.filterText;
      if (filter != '') {
        try {
          var pos = msg.indexOf(filter);
          if (pos != -1) {
            var key = msg.substr(pos, filter.length);
            var hl = '<span class="' + self.id + '-txt-hl">' + key + '</span>';
            msg = msg.replace(key, hl, 'ig');
          } else {
            continue;
          }
        } catch (e) {}
      }
      var line = '';
      var lineNum = '';
      if ((self.options.showLineNums) && (data.type != DebugJS.LOG_TYPE_MLT)) {
        var diffDigits = DebugJS.digits(cnt) - DebugJS.digits(lineCnt);
        var lineNumPadding = '';
        for (var j = 0; j < diffDigits; j++) {
          lineNumPadding = lineNumPadding + '0';
        }
        lineNum = lineNumPadding + lineCnt + ': ';
      }
      var m = (((self.options.showTimeStamp) && (data.type != DebugJS.LOG_TYPE_MLT)) ? (data.time + ' ' + msg) : msg);
      switch (data.type) {
        case DebugJS.LOG_TYPE_ERR:
          if (self.logFilter & DebugJS.LOG_FILTER_ERR) line += lineNum + '<span style="color:' + self.options.logColorE + '">' + m + '</span>\n';
          break;
        case DebugJS.LOG_TYPE_WRN:
          if (self.logFilter & DebugJS.LOG_FILTER_WRN) line += lineNum + '<span style="color:' + self.options.logColorW + '">' + m + '</span>\n';
          break;
        case DebugJS.LOG_TYPE_INF:
          if (self.logFilter & DebugJS.LOG_FILTER_INF) line += lineNum + '<span style="color:' + self.options.logColorI + '">' + m + '</span>\n';
          break;
        case DebugJS.LOG_TYPE_DBG:
          if (self.logFilter & DebugJS.LOG_FILTER_DBG) line += lineNum + '<span style="color:' + self.options.logColorD + '">' + m + '</span>\n';
          break;
        case DebugJS.LOG_TYPE_SYS:
          if (self.logFilter & DebugJS.LOG_FILTER_STD) line += lineNum + '<span style="color:' + self.options.logColorS + ';text-shadow:0 0 3px;">' + m + '</span>\n';
          break;
        case DebugJS.LOG_TYPE_MLT:
          if (self.logFilter & DebugJS.LOG_FILTER_STD) line += lineNum + '<span style="display:inline-block;margin:' + Math.round(self.computedFontSize * 0.5) + 'px 0;">' + m + '</span>\n';
          break;
        default:
          if (self.logFilter & DebugJS.LOG_FILTER_STD) line += lineNum + m + '\n';
          break;
      }
      logs += line;
    }
    return logs;
  },

  collapseLogPanel: function() {
    var self = DebugJS.self;
    self.logPanel.style.height = 'calc(' + (100 - DebugJS.OVERLAY_PANEL_HEIGHT) + '%' + self.logPanelHeightAdjust + ')';
    self.logPanel.scrollTop = self.logPanel.scrollHeight;
  },

  expandLogPanel: function() {
    var self = DebugJS.self;
    self.logPanel.style.height = 'calc(100%' + self.logPanelHeightAdjust + ')';
  },

  closeFeatures: function() {
    var self = DebugJS.self;
    if ((self.status & DebugJS.STATE_DRAGGING) || (self.status & DebugJS.STATE_RESIZING)) {
      self.status &= ~DebugJS.STATE_DRAGGING;
      self.endResize();
    }
    if (self.status & DebugJS.STATE_MEASURE) {
      self.disableMeasureMode(true);
    }
    if (self.status & DebugJS.STATE_ELEMENT_INSPECTING) {
      self.disableElmInfo();
    }
    if (self.status & DebugJS.STATE_TOOLS) {
      self.disableTools();
    }
    if (self.status & DebugJS.STATE_SCRIPT) {
      self.disableScriptEditor();
    }
    if (self.status & DebugJS.STATE_HTML_SRC) {
      self.disableHtmlSrc();
    }
    if (self.status & DebugJS.STATE_SYSTEM_INFO) {
      self.disableSystemInfo();
    }
  },

  keyHandler: function(e) {
    var self = DebugJS.self;
    switch (e.keyCode) {
      case 9: // Tab
        if ((self.status & DebugJS.STATE_TOOLS) && (DebugJS.self.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FUNC_FILE)) {
          self.switchFileScreen();
        }
        break;

      case 13: // Enter
        if (document.activeElement == self.cmdLine) {
          self.execCmd();
        }
        break;

      case 27: // ESC
        if (self.properties.esc.value == 'disable') {
          break;
        }
        if ((self.status & DebugJS.STATE_DRAGGING) || (self.status & DebugJS.STATE_RESIZING)) {
          self.status &= ~DebugJS.STATE_DRAGGING;
          self.endResize();
          break;
        }
        if (self.status & DebugJS.STATE_MEASURE) {
          self.disableMeasureMode();
          break;
        }
        if (self.status & DebugJS.STATE_HTML_SRC) {
          self.disableHtmlSrc();
          break;
        }
        if (self.status & DebugJS.STATE_ELEMENT_INSPECTING) {
          self.disableElmInfo();
          break;
        }
        if (self.status & DebugJS.STATE_TOOLS) {
          self.disableTools();
          break;
        }
        if (self.status & DebugJS.STATE_SCRIPT) {
          self.disableScriptEditor();
          break;
        }
        if (self.status & DebugJS.STATE_SYSTEM_INFO) {
          self.disableSystemInfo();
          break;
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
          e.preventDefault();
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

      case 67: // C
        if ((e.ctrlKey) && (document.activeElement == self.cmdLine)) {
          DebugJS.log.s(self.cmdLine.value + '^C');
          self.cmdLine.value = '';
        }
        break;

      case 112: // F1
        if (self.status & DebugJS.STATE_DYNAMIC) {
          self.dbgWin.style.top = 0;
          self.dbgWin.style.left = 0;
          self.status &= ~DebugJS.STATE_DRAGGING;
        }
        break;

      case self.options.keyAssign.key:
        if ((e.altKey == self.options.keyAssign.alt) &&
            (e.ctrlKey == self.options.keyAssign.ctrl) &&
            (e.shiftKey == self.options.keyAssign.shift)) {
          if ((self.status & DebugJS.STATE_DYNAMIC) && (self.isOutOfWindow())) {
            self.resetToOriginalPosition();
          } else if (self.status & DebugJS.STATE_VISIBLE) {
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

  onKeyDown: function(e) {
    var self = DebugJS.self;
    var metaKey = DebugJS.checkMetaKey(e);
    self.keyDownCode = e.keyCode + ' ' + metaKey;
    self.updateKeyDownPanel();

    self.keyPressCode = DebugJS.KEY_STATUS_DEFAULT;
    self.updateKeyPressPanel();

    self.keyUpCode = DebugJS.KEY_STATUS_DEFAULT;
    self.updateKeyUpPanel();
  },

  onKeyPress: function(e) {
    var self = DebugJS.self;
    var metaKey = DebugJS.checkMetaKey(e);
    self.keyPressCode = e.keyCode + '(' + String.fromCharCode(e.keyCode) + ')' + metaKey;
    self.updateKeyPressPanel();
  },

  onKeyUp: function(e) {
    var self = DebugJS.self;
    var metaKey = DebugJS.checkMetaKey(e);
    self.keyUpCode = e.keyCode + ' ' + metaKey;
    self.updateKeyUpPanel();
  },

  onResize: function() {
    var self = DebugJS.self;
    self.updateWindowSizePanel();
    self.updateClientSizePanel();
    self.updateBodySizePanel();
    if (self.status & DebugJS.STATE_VISIBLE) {
      if (self.status & DebugJS.STATE_AUTO_POSITION_ADJUST) {
        var sizePos = self.getSelfSizePos();
        self.setWindowPosition(self.options.position, sizePos.w, sizePos.h);
      } else {
        self.adjustWindowMax();
      }
    }
  },

  onScroll: function() {
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

  onMouseDown: function(e) {
    var self = DebugJS.self;
    var posX = e.clientX;
    var posY = e.clientY;
    switch (e.button) {
      case 0:
        self.mouseClickL = DebugJS.COLOR_ACTIVE;
        if (self.status & DebugJS.STATE_MEASURE) {
          self.startMeasure(e);
        }
        if (self.status & DebugJS.STATE_STOPWATCH_LAPTIME) {
          DebugJS.log('<span style="color:' + self.options.timerColor + ';">' + self.swElapsedTimeDisp + '</span>');
          self.resetStopWatch();
        }
        break;
      case 1:
        self.mouseClickC = DebugJS.COLOR_ACTIVE;
        break;
      case 2:
        self.mouseClickR = DebugJS.COLOR_ACTIVE;
        if (self.status & DebugJS.STATE_ELEMENT_INSPECTING) {
          if (self.isOnDebugWindow(posX, posY)) {
            if ((DebugJS.el) && (DebugJS.el != self.targetElm)) {
              self.showElementInfo(DebugJS.el);
              self.updateTargetElm(DebugJS.el);
            }
          } else {
            var pointedElm = document.elementFromPoint(posX, posY);
            self.captureElm(pointedElm);
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

  onMouseMove: function(e) {
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

  onMouseUp: function(e) {
    var self = DebugJS.self;
    switch (e.button) {
      case 0:
        self.mouseClickL = DebugJS.COLOR_INACTIVE;
        if (self.status & DebugJS.STATE_MEASURING) {
          self.stopMeasure();
        }
        if (self.status & DebugJS.STATE_DRAGGABLE) {
          self.endMove();
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

  expandDebugWindow: function(auto) {
    var self = DebugJS.self;
    var sizePos = self.getSelfSizePos();
    self.saveSizeAndPos();
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;
    var expandThresholdW = document.documentElement.clientWidth * 0.6;
    var expandThresholdH = document.documentElement.clientHeight * 0.6;
    var w = 0;
    var h = 0;
    var t = 0;
    var l = 0;

    if (auto) {
      if ((DebugJS.DEBUG_WIN_EXPAND_W > clientWidth) || (sizePos.w > expandThresholdW)) {
        w = clientWidth;
        self.status |= DebugJS.STATE_WINDOW_SIZE_FULL_W;
        if ((DebugJS.DEBUG_WIN_EXPAND_H > clientHeight) || (sizePos.h > expandThresholdH)) {
          h = clientHeight;
          self.status |= DebugJS.STATE_WINDOW_SIZE_FULL_H;
        } else {
          t = DebugJS.DEBUG_WIN_POS_NONE;
        }
      } else {
        if ((DebugJS.DEBUG_WIN_EXPAND_H > clientHeight) || (sizePos.h > expandThresholdH)) {
          h = clientHeight;
          self.status |= DebugJS.STATE_WINDOW_SIZE_FULL_H;
          if ((DebugJS.DEBUG_WIN_EXPAND_W < clientWidth) && (sizePos.w < expandThresholdW)) {
            l = DebugJS.DEBUG_WIN_POS_NONE;
          }
        } else {
          w = DebugJS.DEBUG_WIN_EXPAND_W;
          h = DebugJS.DEBUG_WIN_EXPAND_H;
          l = clientWidth / 2 - w / 2;
          t = clientHeight / 2 - h / 2;
        }
      }
    } else {
      w = ((DebugJS.DEBUG_WIN_EXPAND_W > clientWidth) ? clientWidth : DebugJS.DEBUG_WIN_EXPAND_W);
      h = ((DebugJS.DEBUG_WIN_EXPAND_H > clientHeight) ? clientHeight : DebugJS.DEBUG_WIN_EXPAND_H);
      l = clientWidth / 2 - w / 2;
      t = clientHeight / 2 - h / 2;
    }

    if ((auto) && (sizePos.w >= DebugJS.DEBUG_WIN_EXPAND_W) && (sizePos.h >= DebugJS.DEBUG_WIN_EXPAND_H)) {
      self.setDebugWindowFull();
    } else {
      self.setDebugWindowPos(t, l);
      self.setDebugWindowSize(w, h);
      self.status |= DebugJS.STATE_WINDOW_SIZE_EXPANDED;
    }
  },

  setDebugWindowFull: function() {
    var self = DebugJS.self;
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var t = 0;
    var l = 0;
    self.setDebugWindowPos(t, l);
    self.setDebugWindowSize(w, h);
    self.status |= DebugJS.STATE_WINDOW_SIZE_FULL_WH;
    self.status |= DebugJS.STATE_WINDOW_SIZE_EXPANDED;
  },

  setDebugWindowPos: function(t, l) {
    var self = DebugJS.self;
    if (t > DebugJS.DEBUG_WIN_POS_NONE) self.dbgWin.style.top = t + 'px';
    if (l > DebugJS.DEBUG_WIN_POS_NONE) self.dbgWin.style.left = l + 'px';
  },

  setDebugWindowSize: function(w, h) {
    var self = DebugJS.self;
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;
    if (w > 0) self.dbgWin.style.width = w + 'px';
    if (h > 0) self.dbgWin.style.height = h + 'px';
    self.resizeMainHeight();
    self.resizeImgPreview();
    self.status &= ~DebugJS.STATE_AUTO_POSITION_ADJUST;
  },

  adjustWindowMax: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_WINDOW_SIZE_FULL_W) {
      self.dbgWin.style.width = document.documentElement.clientWidth + 'px';
    }
    if (self.status & DebugJS.STATE_WINDOW_SIZE_FULL_H) {
      self.dbgWin.style.height = document.documentElement.clientHeight + 'px';
    }
    self.resizeMainHeight();
    self.resizeImgPreview();
  },

  saveSizeAndPos: function() {
    var self = DebugJS.self;
    self.saveSize();
    self.savePos();
  },

  saveSize: function() {
    var self = DebugJS.self;
    var shadow = (self.status & DebugJS.STATE_DYNAMIC) ? (DebugJS.WINDOW_SHADOW / 2) : 0;
    self.orgSizePos.w = (self.dbgWin.offsetWidth + DebugJS.WINDOW_BORDER - shadow);
    self.orgSizePos.h = (self.dbgWin.offsetHeight + DebugJS.WINDOW_BORDER - shadow);
  },

  savePos: function() {
    var self = DebugJS.self;
    self.orgSizePos.t = self.dbgWin.offsetTop;
    self.orgSizePos.l = self.dbgWin.offsetLeft;
  },

  savePosNone: function() {
    var self = DebugJS.self;
    self.orgSizePos.t = DebugJS.DEBUG_WIN_POS_NONE;
    self.orgSizePos.l = DebugJS.DEBUG_WIN_POS_NONE;
  },

  restoreDebugWindow: function() {
    var self = DebugJS.self;
    var w = self.orgSizePos.w;
    var h = self.orgSizePos.h;
    var t = self.orgSizePos.t;
    var l = self.orgSizePos.l;
    self.setDebugWindowSize(w, h);
    self.setDebugWindowPos(t, l);
    self.logPanel.scrollTop = self.logPanel.scrollHeight;
    self.status &= ~DebugJS.STATE_WINDOW_SIZE_EXPANDED;
    self.status &= ~DebugJS.STATE_WINDOW_SIZE_FULL_WH;
  },

  resetDebugWindowSizePos: function() {
    var self = DebugJS.self;
    var w = (self.initWidth - (DebugJS.WINDOW_SHADOW / 2) + DebugJS.WINDOW_BORDER);
    var h = (self.initHeight - (DebugJS.WINDOW_SHADOW / 2) + DebugJS.WINDOW_BORDER);
    self.setWindowPosition(self.options.position, self.initWidth, self.initHeight);
    self.setDebugWindowSize(w, h);
    self.logPanel.scrollTop = self.logPanel.scrollHeight;
    self.saveExpandModeOrgSizeAndPos();
    self.status &= ~DebugJS.STATE_WINDOW_SIZE_EXPANDED;
    self.status &= ~DebugJS.STATE_WINDOW_SIZE_FULL_WH;
    if (self.status & DebugJS.STATE_DRAGGABLE) {
      self.status |= DebugJS.STATE_AUTO_POSITION_ADJUST;
    }
  },

  isOutOfWindow: function() {
    var self = DebugJS.self;
    var ret = false;
    var sizePos = self.getSelfSizePos();
    if ((sizePos.x1 > document.documentElement.clientWidth) ||
        (sizePos.y1 > document.documentElement.clientHeight) ||
        (sizePos.x2 < 0) ||
        (sizePos.y2 < 0)) {
      ret = true;
    }
    return ret;
  },

  resetToOriginalPosition: function() {
    var self = DebugJS.self;
    var sizePos = self.getSelfSizePos();
    self.setWindowPosition(self.options.position, sizePos.w, sizePos.h);
    if (self.status & DebugJS.STATE_DRAGGABLE) {
      self.status |= DebugJS.STATE_AUTO_POSITION_ADJUST;
    }
  },

  showDebugWindow: function() {
    var self = DebugJS.self;
    self.dbgWin.style.display = 'block';
    self.status |= DebugJS.STATE_VISIBLE;
    var sizePos = self.getSelfSizePos();
    if ((self.status & DebugJS.STATE_AUTO_POSITION_ADJUST) ||
       ((self.status & DebugJS.STATE_DYNAMIC) && (self.isOutOfWindow()))) {
      self.setWindowPosition(self.options.position, sizePos.w, sizePos.h);
    } else {
      self.adjustWindowMax();
    }
    if (self.status & DebugJS.STATE_NEED_TO_SCROLL) {
      self.logPanel.scrollTop = self.logPanel.scrollHeight;
      self.status &= ~DebugJS.STATE_NEED_TO_SCROLL;
    }
  },

  showDebugWindowOnError: function() {
    var self = DebugJS.self;
    if ((self.errStatus) && !(self.status & DebugJS.STATE_VISIBLE)) {
      if (self.dbgWin) {
        if (((self.options.popupOnError.scriptError) && (self.errStatus & DebugJS.ERR_STATE_SCRIPT)) ||
            ((self.options.popupOnError.loadError) && (self.errStatus & DebugJS.ERR_STATE_LOAD)) ||
            ((self.options.popupOnError.errorLog) && (self.errStatus & DebugJS.ERR_STATE_LOG))) {
          self.showDebugWindow();
          self.errStatus = DebugJS.ERR_STATE_NONE;
        }
      }
    }
  },

  hideDebugWindow: function() {
    var self = DebugJS.self;
    if (!self.options.togglableShowHide) return;
    self.errStatus = DebugJS.ERR_STATE_NONE;
    self.status &= ~DebugJS.STATE_DRAGGING;
    self.dbgWin.style.display = 'none';
    self.status &= ~DebugJS.STATE_VISIBLE;
  },

  closeDebugWindow: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_MEASURE) {
      self.disableMeasureMode();
    }
    if (self.status & DebugJS.STATE_ELEMENT_INSPECTING) {
      self.disableElmInfo();
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
    var currentPosX = e.clientX;
    var currentPosY = e.clientY;
    var deltaX = currentPosX - self.clickedPosX;
    var deltaY = currentPosY - self.clickedPosY;
    var clientWidth = document.documentElement.clientWidth;

    if (deltaX < 0) {
      self.measureBox.style.left = currentPosX + 'px';
      deltaX *= -1;
    }
    if (deltaY < 0) {
      self.measureBox.style.top = currentPosY + 'px';
      deltaY *= -1;
    }
    self.measureBox.style.width = deltaX + 'px';
    self.measureBox.style.height = deltaY + 'px';

    var sizeLabelW = 210;
    var sizeLabelH = 40;
    var sizeLabelY = (deltaY / 2) - (sizeLabelH / 2);
    var sizeLabelX = (deltaX / 2) - (sizeLabelW / 2);
    var originY = 'top';
    var originX = 'left';
    if (deltaX < sizeLabelW) {
      sizeLabelX = 0;
      if ((deltaY < sizeLabelH) || (deltaY > self.clickedPosY)) {
        if (self.clickedPosY < sizeLabelH) {
          sizeLabelY = deltaY;
        } else {
          sizeLabelY = sizeLabelH * (-1);
        }
      } else {
        sizeLabelY = sizeLabelH * (-1);
      }
    }

    if (currentPosY < sizeLabelH) {
      if (self.clickedPosY > sizeLabelH) {
        sizeLabelY = (deltaY / 2) - (sizeLabelH / 2);
      }
    }

    if (((self.clickedPosX + sizeLabelW) > clientWidth) && ((currentPosX + sizeLabelW) > clientWidth)) {
      sizeLabelX = (sizeLabelW - (clientWidth - self.clickedPosX)) * (-1);
    }

    var endPointY = 'bottom';
    var endPointX = 'right';
    if (currentPosX < self.clickedPosX) {
      originX = 'right';
      endPointX = 'left';
    }
    if (currentPosY < self.clickedPosY) {
      originY = 'bottom';
      endPointY = 'top';
    }
    var size = '<span style="font-family:' + self.options.fontFamily + ';font-size:32px;color:#fff;background:rgba(0,0,0,0.7);padding:1px 3px;white-space:pre;position:relative;top:' + sizeLabelY + 'px;left:' + sizeLabelX + 'px;">W=' + deltaX + ' H=' + deltaY + '</span>';
    var origin = '<span style="font-family:' + self.options.fontFamily + ';font-size:12px;color:#fff;background:rgba(0,0,0,0.3);white-space:pre;position:absolute;' + originY + ':1px;' + originX + ':1px;padding:1px;">x=' + self.clickedPosX + ',y=' + self.clickedPosY + '</span>';
    var endPoint = '';
    //endPoint = '<span style="font-family:' + self.options.fontFamily + ';font-size:12px;color:#fff;background:rgba(0,0,0,0.3);white-space:pre;position:absolute;' + endPointY + ':1px;' + endPointX + ':1px;padding:1px;">x=' + currentPosX + ',y=' + currentPosY + '</span>';
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
      self.sysInfoPanel.innerHTML = '<span style="color:' + DebugJS.SYS_BUTTON_COLOR + '">&lt;SYSTEM INFO&gt;</span>';
      if (DebugJS.SYS_INFO_FULL_OVERLAY) {
        self.sysInfoPanel.className = self.id + '-overlay-panel-full';
        self.addOverlayPanelFull(self.sysInfoPanel);
      } else {
        self.sysInfoPanel.className = self.id + '-overlay-panel';
        self.addOverlayPanel(self.sysInfoPanel);
        self.expandHightIfNeeded(self.windowExpandHeight);
      }

      self.sysTimePanel = document.createElement('div');
      self.sysTimePanel.style.marginRight = '4px';
      self.sysTimePanel.color = '#fff';
      self.sysInfoPanel.appendChild(self.sysTimePanel);
      self.updateSystemTime();

      self.sysInfoPanelBody = document.createElement('div');
      self.sysInfoPanelBody.style.top = self.computedFontSize;
      self.sysInfoPanel.appendChild(self.sysInfoPanelBody);
    }
    self.updateSysInfoBtn();
    self.showSystemInfo();
    self.clockUpdateInterval = DebugJS.UPDATE_INTERVAL_H;
  },

  updateSystemTime: function() {
    var self = DebugJS.self;
    if (!(self.status & DebugJS.STATE_SYSTEM_INFO)) {
      return;
    }
    var UPDATE_INTERVAL = DebugJS.UPDATE_INTERVAL_H;
    var sysTime = (new Date()).getTime();
    var sysTimeBin = DebugJS.formatBin(parseInt(sysTime).toString(2), false, true);

    var html = '<pre>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">SYSTEM TIME</span> : ' + sysTime + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">         BIN</span>  ' + sysTimeBin +
    '</pre>';
    self.sysTimePanel.innerHTML = html;
    setTimeout(self.updateSystemTime, UPDATE_INTERVAL);
  },

  disableSystemInfo: function() {
    var self = DebugJS.self;
    if (self.sysInfoPanel != null) {
      if (DebugJS.SYS_INFO_FULL_OVERLAY) {
        self.removeOverlayPanelFull(self.sysInfoPanel);
      } else {
        self.removeOverlayPanel(self.sysInfoPanel);
        self.resetExpandedHeightIfNeeded();
      }
      self.sysInfoPanel = null;
    }
    self.status &= ~DebugJS.STATE_SYSTEM_INFO;
    self.updateSysInfoBtn();
    self.clockUpdateInterval = DebugJS.UPDATE_INTERVAL_L;
  },

  showSystemInfo: function(e) {
    var self = DebugJS.self;
    var INDENT = '                  ';
    var screenSize = 'w=' + screen.width + ' x h=' + screen.height;
    var languages = self.getLanguages(INDENT);
    var browser = DebugJS.getBrowserType();
    var jq = '<span class="' + self.id + '-unavailable">not loaded</span>';
    if (typeof jQuery != 'undefined') {
      jq = 'v' + jQuery.fn.jquery;
    }

    var metaTags = document.getElementsByTagName('meta');
    var charset;
    for (var i = 0; i < metaTags.length; i++) {
      charset = metaTags[i].getAttribute('charset');
      if (charset) {
        break;
      } else {
        charset = metaTags[i].getAttribute('content');
        if (charset) {
          var content = charset.match(/charset=(.*)/);
          if (content != null) {
            charset = content[1];
            break;
          }
        }
      }
    }
    if (charset == null) charset = '';

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

    var html = '<pre>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">SCREEN SIZE</span> : ' + screenSize + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">Browser</span>     : ' + DebugJS.browserColoring(browser.name) + ' ' + browser.version + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">navigator.</span>\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> userAgent</span>  : ' + navUserAgent + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> language</span>       : ' + DebugJS.setStyleIfObjNotAvailable(navigator.language) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> browserLanguage</span>: ' + DebugJS.setStyleIfObjNotAvailable(navigator.browserLanguage) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> userLanguage</span>   : ' + DebugJS.setStyleIfObjNotAvailable(navigator.userLanguage) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> languages</span>      : ' + languages + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">charset</span>: ' + charset + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">jQuery</span> : ' + jq + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">css</span>    : ' + loadedStyles + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">script</span> : ' + loadedScripts + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">navigator.</span>\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> appCodeName</span>  : ' + DebugJS.setStyleIfObjNotAvailable(navigator.appCodeName) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> appName</span>      : ' + DebugJS.setStyleIfObjNotAvailable(navigator.appName) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> appVersion</span>   : ' + navAppVersion + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> buildID</span>      : ' + DebugJS.setStyleIfObjNotAvailable(navigator.buildID) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> product </span>     : ' + DebugJS.setStyleIfObjNotAvailable(navigator.product) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> productSub</span>   : ' + DebugJS.setStyleIfObjNotAvailable(navigator.productSub) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> vendor</span>       : ' + DebugJS.setStyleIfObjNotAvailable(navigator.vendor) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> platform</span>     : ' + DebugJS.setStyleIfObjNotAvailable(navigator.platform) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> oscpu</span>        : ' + DebugJS.setStyleIfObjNotAvailable(navigator.oscpu) + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">window.</span>\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onload</span>       : ' + winOnload + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onunload</span>     : ' + winOnunload + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onclick</span>      : ' + winOnclick + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onmousedown</span>  : ' + winOnmousedown + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onmousemove</span>  : ' + winOnmousemove + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onmouseup</span>    : ' + winOnmouseup + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onkeydown</span>    : ' + winOnkeydown + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onkeypress</span>   : ' + winOnkeypress + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onkeyup</span>      : ' + winOnkeyup + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onresize</span>     : ' + winOnresize + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onscroll</span>     : ' + winOnscroll + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onselect</span>     : ' + winOnselect + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onselectstart</span>: ' + winOnselectstart + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> oncontextmenu</span>: ' + winOncontextmenu + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onerror</span>      : ' + winOnerror + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">document.</span>\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onclick</span>      : ' + docOnclick + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onmousedown</span>  : ' + docOnmousedown + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onmousemove</span>  : ' + docOnmousemove + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onmouseup</span>    : ' + docOnmouseup + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onkeydown</span>    : ' + docOnkeydown + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onkeypress</span>   : ' + docOnkeypress + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onkeyup</span>      : ' + docOnkeyup + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onselectstart</span>: ' + docOnselectstart + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> oncontextmenu</span>: ' + docOncontextmenu + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> location</span>  : ' + self.createFoldingText(document.location, 'docLocation' + i, DebugJS.OMIT_MID) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> baseURI</span>   : ' + self.createFoldingText(document.baseURI, 'docBaseURL' + i, DebugJS.OMIT_MID) + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">cookieEnabled</span>: ' + navigator.cookieEnabled + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">Cookie</span>: ' + self.createFoldingText(document.cookie, 'cookie', DebugJS.OMIT_MID) + '\n' +
    '<div class="' + self.id + '-separator"></div>' +
    '</pre>';
    self.sysInfoPanelBody.innerHTML = html;
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
      languages = DebugJS.setStyleIfObjNotAvailable(navLanguages);
    }
    return languages;
  },

  showHideByName: function(name) {
    var self = DebugJS.self;
    var button = document.getElementById(self.id + '-' + name + '__button');
    var partialBody = document.getElementById(self.id + '-' + name + '__partial-body');
    var body = document.getElementById(self.id + '-' + name + '__body');
    if ((body) && ((!body.style.display) || (body.style.display == 'none'))) {
      button.innerHTML = '&#x25bc;';
      partialBody.style.display = 'none';
      body.style.display = 'block';
      if (self.elmInfoShowHideStatus[name] != undefined) {
        self.elmInfoShowHideStatus[name] = true;
      }
    } else {
      button.innerHTML = '&#x25b6;';
      partialBody.style.display = 'inline';
      body.style.display = 'none';
      if (self.elmInfoShowHideStatus[name] != undefined) {
        self.elmInfoShowHideStatus[name] = false;
      }
    }
  },

  createFoldingText: function(obj, name, omitpart, lineMaxLen, style, show) {
    var self = DebugJS.self;
    var DEFAULT_MAX_LEN = 50;
    var foldingText;

    if (lineMaxLen == undefined) lineMaxLen = DEFAULT_MAX_LEN;
    if (!style) style = 'color:#aaa';

    if (!obj) {
      foldingText = '<span class="' + self.id + '-unavailable">' + obj + '</span>';
    } else {
      var btn = '&#x25b6;';
      var partDisplay = 'inline';
      var bodyDisplay = 'none';
      if (show) {
        btn = '&#x25bc;';
        partDisplay = 'none';
        bodyDisplay = 'block';
      }
      foldingText = obj + '';
      if ((foldingText.indexOf('\n') >= 1) || (foldingText.length > lineMaxLen)) {
        partial = DebugJS.trimDownText2(foldingText, lineMaxLen, omitpart, style);
        foldingText = '<span class="' + self.id + '-showhide-button ' + this.id + '-nomove" id="' + self.id + '-' + name + '__button" onclick="DebugJS.self.showHideByName(\'' + name + '\')">' + btn + '</span> ' +
        '<span id="' + self.id + '-' + name + '__partial-body" style="display:' + partDisplay + '">' + partial + '</span>' +
        '<div style="display:' + bodyDisplay + ';" id="' + self.id + '-' + name + '__body">' + obj + '</div>';
      } else {
        foldingText = obj;
      }
    }
    return foldingText;
  },

  toggleElmInfoMode: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_ELEMENT_INSPECTING) {
      self.disableElmInfo();
    } else {
      self.enableElmInfo();
    }
  },

  enableElmInfo: function() {
    var self = DebugJS.self;
    self.status |= DebugJS.STATE_ELEMENT_INSPECTING;
    if (self.elmInfoPanel == null) {
      self.elmInfoPanel = document.createElement('div');
      if (DebugJS.ELM_INFO_FULL_OVERLAY) {
        self.elmInfoPanel.className = self.id + '-overlay-panel-full';
        self.addOverlayPanelFull(self.elmInfoPanel);
      } else {
        self.elmInfoPanel.className = self.id + '-overlay-panel';
        self.addOverlayPanel(self.elmInfoPanel);
        self.expandHightIfNeeded(self.windowExpandHeight);
      }

      self.elmInfoHeaderPanel = document.createElement('div');
      self.elmInfoPanel.appendChild(self.elmInfoHeaderPanel);

      self.elmPrevBtn = document.createElement('span');
      self.elmPrevBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.elmPrevBtn.style.color = DebugJS.COLOR_INACTIVE;
      self.elmPrevBtn.onclick = DebugJS.self.showPrevElem;
      self.elmPrevBtn.innerText = '<<';
      self.elmInfoHeaderPanel.appendChild(self.elmPrevBtn);

      self.elmTitle = document.createElement('span');
      self.elmTitle.style.marginLeft = '4px';
      self.elmTitle.style.marginRight = '4px';
      self.elmTitle.style.color = DebugJS.DOM_BUTTON_COLOR;
      self.elmTitle.innerText = 'ELEMENT INFO';
      self.elmInfoHeaderPanel.appendChild(self.elmTitle);

      self.elmNextBtn = document.createElement('span');
      self.elmNextBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.elmNextBtn.style.color = DebugJS.COLOR_INACTIVE;
      self.elmNextBtn.onclick = DebugJS.self.showNextElem;
      self.elmNextBtn.innerText = '>>';
      self.elmInfoHeaderPanel.appendChild(self.elmNextBtn);

      self.elmSelectBtn = document.createElement('span');
      self.elmSelectBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.elmSelectBtn.style.marginLeft = '8px';
      self.elmSelectBtn.style.marginRight = '4px';
      self.elmSelectBtn.onclick = DebugJS.self.toggleElmSelectMode;
      self.elmSelectBtn.innerText = 'SELECT';
      self.elmInfoHeaderPanel.appendChild(self.elmSelectBtn);

      self.elmHighlightBtn = document.createElement('span');
      self.elmHighlightBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.elmHighlightBtn.style.marginLeft = '4px';
      self.elmHighlightBtn.style.marginRight = '4px';
      self.elmHighlightBtn.onclick = DebugJS.self.toggleElmHighlightMode;
      self.elmHighlightBtn.innerText = 'HIGHLIGHT';
      self.elmInfoHeaderPanel.appendChild(self.elmHighlightBtn);

      self.elmUpdateBtn = document.createElement('span');
      self.elmUpdateBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.elmUpdateBtn.style.marginLeft = '4px';
      self.elmUpdateBtn.style.color = DebugJS.COLOR_INACTIVE;
      self.elmUpdateBtn.onclick = DebugJS.self.updateElementInfo;
      self.elmUpdateBtn.innerText = 'UPDATE';
      self.elmInfoHeaderPanel.appendChild(self.elmUpdateBtn);

      var UPDATE_COLOR = '#ccc';
      self.elmUpdateInputLabel = document.createElement('span');
      self.elmUpdateInputLabel.style.marginRight = '0px';
      self.elmUpdateInputLabel.style.color = UPDATE_COLOR;
      self.elmUpdateInputLabel.innerText = ':';
      self.elmInfoHeaderPanel.appendChild(self.elmUpdateInputLabel);

      self.elmUpdateInput = self.createTextInput('30px', 'right', UPDATE_COLOR, self.elmUpdateInterval, DebugJS.self.onchangeElmUpdateInterval);
      self.elmInfoHeaderPanel.appendChild(self.elmUpdateInput);

      self.elmUpdateInputLabel2 = document.createElement('span');
      self.elmUpdateInputLabel2.style.marginLeft = '2px';
      self.elmUpdateInputLabel2.style.color = UPDATE_COLOR;
      self.elmUpdateInputLabel2.innerText = 'ms';
      self.elmInfoHeaderPanel.appendChild(self.elmUpdateInputLabel2);

      self.elmNumPanel = document.createElement('span');
      self.elmNumPanel.style.float = 'right';
      self.elmNumPanel.style.marginRight = '4px';
      self.elmInfoHeaderPanel.appendChild(self.elmNumPanel);
      self.updateElementInfoInterval();

      self.elmExportBtn = document.createElement('span');
      self.elmExportBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.elmExportBtn.style.float = 'right';
      self.elmExportBtn.style.marginRight = '4px';
      self.elmExportBtn.style.color = DebugJS.COLOR_INACTIVE;
      self.elmExportBtn.onclick = DebugJS.self.exportTargetElm;
      self.elmExportBtn.innerText = 'EXPORT';
      self.elmInfoHeaderPanel.appendChild(self.elmExportBtn);

      self.elmInfoBodyPanel = document.createElement('div');
      self.elmInfoBodyPanel.style.height = 'calc(100% - 1.3em)';
      self.elmInfoBodyPanel.style.overflow = 'auto';
      self.elmInfoPanel.appendChild(self.elmInfoBodyPanel);
    }
    self.updateElmInfoBtn();
    self.updateElmSelectBtn();
    self.updateElmHighlightBtn();
  },

  disableElmInfo: function() {
    var self = DebugJS.self;
    if (self.targetElm) {
      DebugJS.removeClass(self.targetElm, self.id + DebugJS.ELM_HIGHLISGHT_CLASS_SUFFIX);
      self.targetElm = null;
    }
    if (self.elmInfoPanel != null) {
      if (DebugJS.ELM_INFO_FULL_OVERLAY) {
        self.removeOverlayPanelFull(self.elmInfoPanel);
      } else {
        self.removeOverlayPanel(self.elmInfoPanel);
        self.resetExpandedHeightIfNeeded();
      }
      self.elmInfoPanel = null;
      self.elmInfoBodyPanel = null;
      self.elmNumPanel = null;
    }
    self.updateTargetElm(null);
    self.status &= ~DebugJS.STATE_ELEMENT_INSPECTING;
    self.updateElmInfoBtn();
  },

  inspectElement: function(e) {
    var self = DebugJS.self;
    if (!(self.elmInfoStatus & DebugJS.ELMINFO_STATE_SELECT)) {
      return;
    }
    var posX = e.clientX;
    var posY = e.clientY;
    if (self.isOnDebugWindow(posX, posY)) return;
    var el = document.elementFromPoint(posX, posY);
    if (el != self.targetElm) {
      self.showElementInfo(el);
      self.updateTargetElm(el);
    }
  },

  showElementInfo: function(el) {
    if (!el) return;
    var self = DebugJS.self;
    var OMIT_STYLE = 'color:#888';
    var OMIT_STYLE2 = 'color:#666';
    var html = '<pre>';
    if (el && el.tagName) {
      DebugJS.dom = el;
      var computedStyle = window.getComputedStyle(el);
      var rect = el.getBoundingClientRect();
      var MAX_LEN = 50;
      var text = '';
      if ((el.tagName != 'HTML') && (el.tagName != 'BODY')) {
        if (el.tagName == 'META') {
          text = DebugJS.escapeTag(el.outerHTML);
        } else {
          text = DebugJS.escapeTag(el.innerText);
        }
      }
      var txt = self.createFoldingText(text, 'text', DebugJS.OMIT_LAST, MAX_LEN, OMIT_STYLE, self.elmInfoShowHideStatus['text']);
      var className = el.className;
      className = className.replace(self.id + DebugJS.ELM_HIGHLISGHT_CLASS_SUFFIX, '<span style="' + OMIT_STYLE2 + '">' + self.id + DebugJS.ELM_HIGHLISGHT_CLASS_SUFFIX + '</span>');

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

      var borderColorT16 = '';
      var borderColorT = computedStyle.borderTopColor;
      if (borderColorT) {
        var borderColorT10 = borderColorT.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
        var borderColorT16cnv = DebugJS.convRGB10to16(borderColorT10);
        borderColorT16 = '#' + borderColorT16cnv.r + borderColorT16cnv.g + borderColorT16cnv.b;
      }

      var borderColorL16 = '';
      var borderColorL = computedStyle.borderLeftColor;
      if (borderColorL) {
        var borderColorL10 = borderColorL.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
        var borderColorL16cnv = DebugJS.convRGB10to16(borderColorL10);
        borderColorL16 = '#' + borderColorL16cnv.r + borderColorL16cnv.g + borderColorL16cnv.b;
      }

      var borderColorR16 = '';
      var borderColorR = computedStyle.borderRightColor;
      if (borderColorR) {
        var borderColorR10 = borderColorR.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
        var borderColorR16cnv = DebugJS.convRGB10to16(borderColorR10);
        borderColorR16 = '#' + borderColorR16cnv.r + borderColorR16cnv.g + borderColorR16cnv.b;
      }

      var borderColorB16 = '';
      var borderColorB = computedStyle.borderBottomColor;
      if (borderColorB) {
        var borderColorB10 = borderColorB.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
        var borderColorB16cnv = DebugJS.convRGB10to16(borderColorB10);
        borderColorB16 = '#' + borderColorB16cnv.r + borderColorB16cnv.g + borderColorB16cnv.b;
      }

      var borderT = 'top    = ' + computedStyle.borderTopWidth + ' ' + computedStyle.borderTopStyle + ' ' + computedStyle.borderTopColor + ' ' + borderColorT16 + ' <span style="background:' + borderColorT + ';width:6px;height:12px;display:inline-block;"> </span>';
      var borderLRB = '            left   = ' + computedStyle.borderLeftWidth + ' ' + computedStyle.borderLeftStyle + ' ' + computedStyle.borderLeftColor + ' ' + borderColorL16 + ' <span style="background:' + borderColorL + ';width:6px;height:12px;display:inline-block;"> </span>\n' +
      '            right  = ' + computedStyle.borderRightWidth + ' ' + computedStyle.borderRightStyle + ' ' + computedStyle.borderRightColor + ' ' + borderColorR16 + ' <span style="background:' + borderColorR + ';width:6px;height:12px;display:inline-block;"> </span>\n' +
      '            bottom = ' + computedStyle.borderBottomWidth + ' ' + computedStyle.borderBottomStyle + ' ' + computedStyle.borderBottomColor + ' ' + borderColorB16 + ' <span style="background:' + borderColorB + ';width:6px;height:12px;display:inline-block;"> </span>';

      var allStyles = '';
      var LEADING_INDENT = '           ';
      var MIN_KEY_LEN = 20;
      for (var key in computedStyle) {
        if (!(key.match(/^\d.*/))) {
          if (typeof computedStyle[key] != 'function') {
            var indent = '';
            if (key.length < MIN_KEY_LEN) {
              for (var i = 0; i < (MIN_KEY_LEN - key.length); i++) {
                indent += ' ';
              }
            }
            allStyles += ' ' + key + indent + ': ' + computedStyle[key] + '\n';
          }
        }
      }
      allStylesFolding = self.createFoldingText(allStyles, 'allStyles', DebugJS.OMIT_LAST, 0, OMIT_STYLE, self.elmInfoShowHideStatus['allStyles']);

      html += '<span style="color:#8f0;display:inline-block;height:14px;">#text</span> ' + txt + '\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'object    : ' + Object.prototype.toString.call(el) + '\n' +
      'tag       : &lt;' + el.tagName + (el.type ? ' type="' + el.type + '"' : '') + '&gt;\n' +
      'id        : ' + el.id + '\n' +
      'class     : ' + className + '\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'display   : ' + computedStyle.display + '\n' +
      'position  : ' + computedStyle.position + '\n' +
      'z-index   : ' + computedStyle.zIndex + '\n' +
      'float     : ' + computedStyle.cssFloat + ' / clear: ' + computedStyle.clear + '\n' +
      'size      : W:' + el.clientWidth + ' x H:' + el.clientHeight + ' px\n' +
      'margin    : ' + computedStyle.marginTop + ' ' + computedStyle.marginRight + ' ' + computedStyle.marginBottom + ' ' + computedStyle.marginLeft + '\n' +
      'padding   : ' + computedStyle.paddingTop + ' ' + computedStyle.paddingRight + ' ' + computedStyle.paddingBottom + ' ' + computedStyle.paddingLeft + '\n' +
      'border    : ' + borderT + ' ' + self.createFoldingText(borderLRB, 'elBorder', DebugJS.OMIT_LAST, 0, OMIT_STYLE, self.elmInfoShowHideStatus['elBorder']) +
      '<div class="' + self.id + '-separator"></div>' +
      'font      : size   = ' + computedStyle.fontSize + '\n' +
      '            family = ' + computedStyle.fontFamily + '\n' +
      '            weight = ' + computedStyle.fontWeight + '\n' +
      '            style  = ' + computedStyle.fontStyle + '\n' +
      'color     : ' + color + ' ' + color16 + ' <span style="background:' + color + ';width:6px;height:12px;display:inline-block;"> </span>\n' +
      'bg-color  : ' + backgroundColor + ' ' + bgColor16 + ' <span style="background:' + backgroundColor + ';width:6px;height:12px;display:inline-block;"> </span>\n' +
      'opacity   : ' + computedStyle.opacity + '\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'location  : top    = ' + Math.round(rect.top + window.pageYOffset) + 'px (' + computedStyle.top + ')\n' +
      '            left   = ' + Math.round(rect.left + window.pageXOffset) + 'px (' + computedStyle.left + ')\n' +
      '            right  = ' + Math.round(rect.right + window.pageXOffset) + 'px (' + computedStyle.right + ')\n' +
      '            bottom = ' + Math.round(rect.bottom + window.pageYOffset) + 'px (' + computedStyle.bottom + ')\n' +
      'overflow  : ' + computedStyle.overflow + '\n' +
      'scroll    : top = ' + el.scrollTop + ' / left = ' + el.scrollLeft + '\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'All Styles: getComputedStyle() ' + allStylesFolding + '\n' +
      '<div class="' + self.id + '-separator"></div>' +
      'name      : ' + (el.name ? el.name : '') + '\n' +
      'value     : ' + (el.value ? self.createFoldingText(el.value, 'elValue', DebugJS.OMIT_LAST, MAX_LEN, OMIT_STYLE) : '') + '\n' +
      'tabIndex  : ' + el.tabIndex + '\n' +
      'accessKey : ' + el.accessKey + '\n' +
      'disabled  : ' + DebugJS.setStyleIfObjNotAvailable(el.disabled, true) + '\n' +
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

      for (var data in el.dataset) {
        html += 'data-' + data + ': ' + el.dataset[data] + '\n';
      }

      var htmlSrc = el.outerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      htmlSrc = self.createFoldingText(htmlSrc, 'htmlSrc', DebugJS.OMIT_LAST, 0, OMIT_STYLE, self.elmInfoShowHideStatus['htmlSrc']);
      html += 'outerHTML: ' + htmlSrc;
    }
    html += '</pre>';
    self.elmInfoBodyPanel.innerHTML = html;

    self.showAllElmNum();
  },

  showPrevElem: function() {
    var self = DebugJS.self;
    if (!self.targetElm) return;
    var el = self.targetElm.previousElementSibling;
    if ((el != null) && (el.id == self.id)) {
      el = self.targetElm.previousElementSibling;
    }
    if (el == null) {
      el = self.targetElm.parentNode;
    } else {
      if (el.childElementCount > 0) {
        var lastChild = el.lastElementChild;
        while (lastChild.childElementCount > 0) {
          lastChild = lastChild.lastElementChild;
        }
        el = lastChild;
      }
    }

    if (el) {
      if (!(el instanceof HTMLDocument)) {
        self.showElementInfo(el);
        self.updateTargetElm(el);
      }
    }
  },

  showNextElem: function() {
    var self = DebugJS.self;
    if (!self.targetElm) return;
    var el = self.targetElm.firstElementChild;
    if ((el == null) || ((el != null) && (el.id == self.id))) {
      el = self.targetElm.nextElementSibling;
      if (el == null) {
        var parentNode = self.targetElm.parentNode;
        if (parentNode) {
          do {
            el = parentNode.nextElementSibling;
            if ((el != null) && (el.id != self.id)) {
              break;
            }
            parentNode = parentNode.parentNode;
          } while ((parentNode != null) && (parentNode.tagName != 'HTML'));
        }
      }
    }

    if (el) {
      self.showElementInfo(el);
      self.updateTargetElm(el);
    }
  },

  updateTargetElm: function(el) {
    var self = DebugJS.self;
    if (self.elmInfoStatus & DebugJS.ELMINFO_STATE_HIGHLIGHT) {
      self.highlightElement(self.targetElm, el);
    }
    if (el) {
      self.targetElm = el;
      self.elmPrevBtn.style.color = self.options.btnColor;
      self.elmNextBtn.style.color = self.options.btnColor;
      self.elmUpdateBtn.style.color = self.options.btnColor;
      self.elmExportBtn.style.color = self.options.btnColor;
    }
  },

  highlightElement: function(removeTarget, setTarget) {
    var self = DebugJS.self;
    if (removeTarget) {
      DebugJS.removeClass(removeTarget, self.id + DebugJS.ELM_HIGHLISGHT_CLASS_SUFFIX);
    }
    if (setTarget) {
      DebugJS.addClass(setTarget, self.id + DebugJS.ELM_HIGHLISGHT_CLASS_SUFFIX);
    }
  },

  updateElementInfo: function() {
    var self = DebugJS.self;
    self.showAllElmNum();
    self.showElementInfo(self.targetElm);
  },

  showAllElmNum: function() {
    var self = DebugJS.self;
    self.elmNumPanel.innerHTML = '(All: ' + document.getElementsByTagName('*').length + ')';
  },

  onchangeElmUpdateInterval: function() {
    var self = DebugJS.self;
    var interval = self.elmUpdateInput.value;
    if (interval == '') {
      interval = 0;
    }
    if (isFinite(interval)) {
      self.elmUpdateInterval = interval;
      clearTimeout(self.elmUpdateTimerId);
      self.elmUpdateTimerId = setTimeout(self.updateElementInfoInterval, self.elmUpdateInterval);
    }
  },

  updateElementInfoInterval: function() {
    var self = DebugJS.self;
    if (!(self.status & DebugJS.STATE_ELEMENT_INSPECTING)) {
      return;
    }
    self.updateElementInfo();
    if (self.elmUpdateInterval > 0) {
      self.elmUpdateTimerId = setTimeout(self.updateElementInfoInterval, self.elmUpdateInterval);
    }
  },

  toggleElmSelectMode: function() {
    var self = DebugJS.self;
    if (self.elmInfoStatus & DebugJS.ELMINFO_STATE_SELECT) {
      self.elmInfoStatus &= ~DebugJS.ELMINFO_STATE_SELECT;
    } else {
      self.elmInfoStatus |= DebugJS.ELMINFO_STATE_SELECT;
    }
    self.updateElmSelectBtn();
  },

  updateElmSelectBtn: function() {
    var self = DebugJS.self;
    self.elmSelectBtn.style.color = (self.elmInfoStatus & DebugJS.ELMINFO_STATE_SELECT) ? self.options.btnColor : DebugJS.COLOR_INACTIVE;
  },

  toggleElmHighlightMode: function() {
    var self = DebugJS.self;
    if (self.elmInfoStatus & DebugJS.ELMINFO_STATE_HIGHLIGHT) {
      self.elmInfoStatus &= ~DebugJS.ELMINFO_STATE_HIGHLIGHT;
      self.highlightElement(self.targetElm, null);
    } else {
      self.elmInfoStatus |= DebugJS.ELMINFO_STATE_HIGHLIGHT;
      self.highlightElement(null, self.targetElm);
    }
    self.updateElmHighlightBtn();
  },

  updateElmHighlightBtn: function() {
    var self = DebugJS.self;
    self.elmHighlightBtn.style.color = (self.elmInfoStatus & DebugJS.ELMINFO_STATE_HIGHLIGHT) ? self.options.btnColor : DebugJS.COLOR_INACTIVE;
  },

  exportTargetElm: function() {
    if (DebugJS.self.targetElm) {
      DebugJS.self.captureElm(DebugJS.self.targetElm);
    }
  },

  captureElm: function(elm) {
    DebugJS.el = elm;
    if (DebugJS._AVAILABLE) _ = DebugJS.el;
    DebugJS.log.s('&lt;' + DebugJS.el.tagName + '&gt; object has been exported to <span style="color:' + DebugJS.KEYWORD_COLOR + '">' + ((dbg == DebugJS) ? 'dbg' : 'DebugJS') + '.el</span>' + (DebugJS._AVAILABLE ? ', <span style="color:' + DebugJS.KEYWORD_COLOR + '">_</span>' : ''));
  },

  getEventHandlerString: function(handler, name) {
    var self = DebugJS.self;
    var MAX_LEN = 300;
    str = (handler ? handler.toString().replace(/\n/g, '').replace(/[^.]{1,}\{/, '').replace(/\}$/, '').replace(/^\s{1,}/, '') : '<span style="color:#aaa;">null</span>');
    str = self.createFoldingText(str, name, DebugJS.OMIT_LAST, MAX_LEN, 'color:#888');
    return str;
  },

  toggleHtmlSrcMode: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_HTML_SRC) {
      self.disableHtmlSrc();
    } else {
      self.enableHtmlSrc();
    }
  },

  enableHtmlSrc: function() {
    var self = DebugJS.self;
    self.status |= DebugJS.STATE_HTML_SRC;
    if (self.htmlSrcPanel == null) {
      self.htmlSrcPanel = document.createElement('div');
      if (DebugJS.HTML_SRC_FULL_OVERLAY) {
        self.htmlSrcPanel.className = self.id + '-overlay-panel-full';
        self.addOverlayPanelFull(self.htmlSrcPanel);
      } else {
        self.htmlSrcPanel.className = self.id + '-overlay-panel';
        self.addOverlayPanel(self.htmlSrcPanel);
      }
      self.expandHightIfNeeded(self.windowExpandHeight);

      self.htmlSrcHeaderPanel = document.createElement('div');
      self.htmlSrcPanel.appendChild(self.htmlSrcHeaderPanel);

      self.htmlSrcTitle = document.createElement('span');
      self.htmlSrcTitle.style.color = DebugJS.HTML_BUTTON_COLOR;
      self.htmlSrcTitle.innerText = 'HTML SOURCE';
      self.htmlSrcHeaderPanel.appendChild(self.htmlSrcTitle);

      var UPDATE_COLOR = '#fff';
      self.htmlSrcUpdateInputLabel2 = document.createElement('span');
      self.htmlSrcUpdateInputLabel2.style.float = 'right';
      self.htmlSrcUpdateInputLabel2.style.marginLeft = '2px';
      self.htmlSrcUpdateInputLabel2.style.color = UPDATE_COLOR;
      self.htmlSrcUpdateInputLabel2.innerText = 'ms';
      self.htmlSrcHeaderPanel.appendChild(self.htmlSrcUpdateInputLabel2);

      self.htmlSrcUpdateInput = self.createTextInput('50px', 'right', UPDATE_COLOR, self.htmlSrcUpdateInterval, DebugJS.self.onchangeHtmlSrcUpdateInterval);
      self.htmlSrcUpdateInput.style.float = 'right';
      self.htmlSrcHeaderPanel.appendChild(self.htmlSrcUpdateInput);

      self.htmlSrcUpdateInputLabel = document.createElement('span');
      self.htmlSrcUpdateInputLabel.style.float = 'right';
      self.htmlSrcUpdateInputLabel.style.color = UPDATE_COLOR;
      self.htmlSrcUpdateInputLabel.innerText = ':';
      self.htmlSrcHeaderPanel.appendChild(self.htmlSrcUpdateInputLabel);

      self.htmlSrcUpdateBtn = document.createElement('span');
      self.htmlSrcUpdateBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.htmlSrcUpdateBtn.style.float = 'right';
      self.htmlSrcUpdateBtn.style.marginLeft = '4px';
      self.htmlSrcUpdateBtn.style.color = self.options.btnColor;
      self.htmlSrcUpdateBtn.onclick = DebugJS.self.showHtmlSrc;
      self.htmlSrcUpdateBtn.innerText = 'UPDATE';
      self.htmlSrcHeaderPanel.appendChild(self.htmlSrcUpdateBtn);

      self.htmlSrcBodyPanel = document.createElement('div');
      self.htmlSrcBodyPanel.style.width = '100%';
      self.htmlSrcBodyPanel.style.height = 'calc(100% - 1.3em)';
      self.htmlSrcBodyPanel.style.overflow = 'auto';
      self.htmlSrcPanel.appendChild(self.htmlSrcBodyPanel);

      self.htmlSrcBody = document.createElement('pre');
      self.htmlSrcBodyPanel.appendChild(self.htmlSrcBody);
    }
    self.updateHtmlSrcBtn();
    self.showHtmlSrc();
  },

  disableHtmlSrc: function() {
    var self = DebugJS.self;
    if (self.htmlSrcPanel != null) {
      if (DebugJS.HTML_SRC_FULL_OVERLAY) {
        self.removeOverlayPanelFull(self.htmlSrcPanel);
      } else {
        self.removeOverlayPanel(self.htmlSrcPanel);
      }
      self.resetExpandedHeightIfNeeded();
      self.htmlSrcPanel = null;
    }
    self.status &= ~DebugJS.STATE_HTML_SRC;
    self.updateHtmlSrcBtn();
  },

  showHtmlSrc: function() {
    var self = DebugJS.self;
    self.htmlSrcBodyPanel.removeChild(self.htmlSrcBody);
    var html = document.getElementsByTagName('html')[0].outerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    self.htmlSrcBodyPanel.appendChild(self.htmlSrcBody);
    self.htmlSrcBody.innerHTML = html;
  },

  onchangeHtmlSrcUpdateInterval: function() {
    var self = DebugJS.self;
    var interval = self.htmlSrcUpdateInput.value;
    if (interval == '') {
      interval = 0;
    }
    if (isFinite(interval)) {
      self.htmlSrcUpdateInterval = interval;
      clearTimeout(self.htmlSrcUpdateTimerId);
      self.htmlSrcUpdateTimerId = setTimeout(self.updateHtmlSrcInterval, self.htmlSrcUpdateInterval);
    }
  },

  updateHtmlSrcInterval: function() {
    var self = DebugJS.self;
    if (!(self.status & DebugJS.STATE_HTML_SRC)) {
      return;
    }
    self.showHtmlSrc();
    if (self.htmlSrcUpdateInterval > 0) {
      self.elmUpdateTimerId = setTimeout(self.updateHtmlSrcInterval, self.htmlSrcUpdateInterval);
    }
  },

  toggleToolsMode: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_TOOLS) {
      self.disableTools();
    } else {
      self.enableTools();
    }
  },

  enableTools: function() {
    var self = DebugJS.self;
    self.status |= DebugJS.STATE_TOOLS;

    if (self.toolsPanel == null) {
      var defaultFontSize = self.computedFontSize;
      self.toolsPanel = document.createElement('div');
      self.toolsPanel.className = self.id + '-overlay-panel-full';

      self.toolsHeaderPanel = document.createElement('div');
      self.toolsHeaderPanel.style.position = 'relative';
      self.toolsHeaderPanel.style.height = self.computedFontSize + 'px';
      self.toolsPanel.appendChild(self.toolsHeaderPanel);

      self.toolsBodyPanel = document.createElement('div');
      self.toolsBodyPanel.style.position = 'relative';
      self.toolsBodyPanel.style.height = 'calc(100% - ' + self.computedFontSize + 'px)';
      self.toolsPanel.appendChild(self.toolsBodyPanel);

      self.textCheckerBtn = document.createElement('span');
      self.textCheckerBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.textCheckerBtn.style.marginRight = '4px';
      self.textCheckerBtn.innerText = '<TEXT>';
      self.textCheckerBtn.onclick = new Function('DebugJS.self.switchToolsFunction(DebugJS.TOOLS_ACTIVE_FUNC_TEXT);');
      self.textCheckerBtn.onmouseover = new Function('DebugJS.self.textCheckerBtn.style.color=DebugJS.TOOLS_COLOR_ACTIVE;');
      self.textCheckerBtn.onmouseout = new Function('DebugJS.self.textCheckerBtn.style.color=(DebugJS.self.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FUNC_TEXT) ? DebugJS.TOOLS_COLOR_ACTIVE : DebugJS.TOOLS_COLOR_INACTIVE;');
      self.toolsHeaderPanel.appendChild(self.textCheckerBtn);

      self.fileLoaderBtn = document.createElement('span');
      self.fileLoaderBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.fileLoaderBtn.style.marginRight = '4px';
      self.fileLoaderBtn.innerText = '<FILE>';
      self.fileLoaderBtn.onclick = new Function('DebugJS.self.switchToolsFunction(DebugJS.TOOLS_ACTIVE_FUNC_FILE);');
      self.fileLoaderBtn.onmouseover = new Function('DebugJS.self.fileLoaderBtn.style.color=DebugJS.TOOLS_COLOR_ACTIVE;');
      self.fileLoaderBtn.onmouseout = new Function('DebugJS.self.fileLoaderBtn.style.color=(DebugJS.self.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FUNC_FILE) ? DebugJS.TOOLS_COLOR_ACTIVE : DebugJS.TOOLS_COLOR_INACTIVE;');
      self.toolsHeaderPanel.appendChild(self.fileLoaderBtn);

      self.htmlPreviewerBtn = document.createElement('span');
      self.htmlPreviewerBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.htmlPreviewerBtn.style.marginRight = '4px';
      self.htmlPreviewerBtn.innerText = '<HTML>';
      self.htmlPreviewerBtn.onclick = new Function('DebugJS.self.switchToolsFunction(DebugJS.TOOLS_ACTIVE_FUNC_HTML);');
      self.htmlPreviewerBtn.onmouseover = new Function('DebugJS.self.htmlPreviewerBtn.style.color=DebugJS.TOOLS_COLOR_ACTIVE;');
      self.htmlPreviewerBtn.onmouseout = new Function('DebugJS.self.htmlPreviewerBtn.style.color=(DebugJS.self.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FUNC_HTML) ? DebugJS.TOOLS_COLOR_ACTIVE : DebugJS.TOOLS_COLOR_INACTIVE;');
      self.toolsHeaderPanel.appendChild(self.htmlPreviewerBtn);

      self.memoBtn = document.createElement('span');
      self.memoBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.memoBtn.style.marginRight = '4px';
      self.memoBtn.innerText = '<MEMO>';
      self.memoBtn.onclick = new Function('DebugJS.self.switchToolsFunction(DebugJS.TOOLS_ACTIVE_FUNC_MEMO);');
      self.memoBtn.onmouseover = new Function('DebugJS.self.memoBtn.style.color=DebugJS.TOOLS_COLOR_ACTIVE;');
      self.memoBtn.onmouseout = new Function('DebugJS.self.memoBtn.style.color=(DebugJS.self.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FUNC_MEMO) ? DebugJS.TOOLS_COLOR_ACTIVE : DebugJS.TOOLS_COLOR_INACTIVE;');
      self.toolsHeaderPanel.appendChild(self.memoBtn);

      self.addOverlayPanelFull(self.toolsPanel);
      self.switchToolsFunction(DebugJS.TOOLS_ACTIVE_FUNC_TEXT);
    } else {
      self.addOverlayPanelFull(self.toolsPanel);
      self.resizeImgPreview();
    }
    self.updateToolsButtons();
    self.updateToolsBtn();
  },

  disableTools: function() {
    var self = DebugJS.self;
    if (self.toolsPanel != null) {
      self.removeOverlayPanelFull(self.toolsPanel);
    }
    self.status &= ~DebugJS.STATE_TOOLS;
    self.updateToolsBtn();
  },

  updateToolsButtons: function() {
    var self = DebugJS.self;
    self.textCheckerBtn.style.color = (self.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FUNC_TEXT) ? DebugJS.TOOLS_COLOR_ACTIVE : DebugJS.TOOLS_COLOR_INACTIVE;
    self.fileLoaderBtn.style.color = (self.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FUNC_FILE) ? DebugJS.TOOLS_COLOR_ACTIVE : DebugJS.TOOLS_COLOR_INACTIVE;
    self.htmlPreviewerBtn.style.color = (self.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FUNC_HTML) ? DebugJS.TOOLS_COLOR_ACTIVE : DebugJS.TOOLS_COLOR_INACTIVE;
    self.memoBtn.style.color = (self.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FUNC_MEMO) ? DebugJS.TOOLS_COLOR_ACTIVE : DebugJS.TOOLS_COLOR_INACTIVE;
  },

  switchToolsFunction: function(kind) {
    var self = DebugJS.self;
    if (DebugJS.self.toolsActiveFunction == kind) {
      return;
    }
    if (kind & DebugJS.TOOLS_ACTIVE_FUNC_TEXT) {
      self.enableTextChecker();
    } else {
      self.disableTextChecker();
    }
    if (kind & DebugJS.TOOLS_ACTIVE_FUNC_FILE) {
      self.enableFileLoader();
    } else {
      self.disableFileLoader();
    }
    if (kind & DebugJS.TOOLS_ACTIVE_FUNC_HTML) {
      self.enableHtmlEditor();
    } else {
      self.disableHtmlEditor();
    }
    if (kind & DebugJS.TOOLS_ACTIVE_FUNC_MEMO) {
      self.enableMemoEditor();
    } else {
      self.disableMemoEditor();
    }
    self.toolsActiveFunction = kind;
    self.updateToolsButtons();
  },

  enableTextChecker: function() {
    var self = DebugJS.self;
    if (self.textCheckerPanel == null) {
      var defaultFontSize = self.computedFontSize;
      var defaultFontFamily = 'Consolas';
      var defaultFontWeight = 400;
      var defaultFgRGB16 = 'fff';
      var defaultBgRGB16 = '000';
      var panelPadding = 2;
      self.textCheckerPanel = document.createElement('div');
      self.textCheckerPanel.className = self.id + '-tools';
      self.toolsBodyPanel.appendChild(self.textCheckerPanel);

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
      self.toolsBodyPanel.appendChild(self.textCheckerPanel);
    }
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
    if ((self.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FUNC_TEXT) && (self.textCheckerPanel != null)) {
      self.toolsBodyPanel.removeChild(self.textCheckerPanel);
    }
  },

  enableFileLoader: function() {
    var self = DebugJS.self;
    if (self.fileLoaderPanel == null) {
      self.fileLoaderPanel = document.createElement('div');
      self.fileLoaderPanel.className = self.id + '-tools';
      self.toolsBodyPanel.appendChild(self.fileLoaderPanel);

      self.fileInput = document.createElement('input');
      self.fileInput.type = 'file';
      self.fileInput.style.setProperty('width', 'calc(100% - ' + (self.computedFontSize * 12) + 'px)', 'important');
      self.fileInput.style.setProperty('min-height', (20 * self.options.zoom) + 'px', 'important');
      self.fileInput.style.setProperty('margin-bottom', '4px', 'important');
      self.fileInput.style.setProperty('padding', '1px', 'important');
      self.fileInput.style.setProperty('border', '0', 'important');
      self.fileInput.style.setProperty('border-radius', '0', 'important');
      self.fileInput.style.setProperty('outline', 'none', 'important');
      self.fileInput.style.setProperty('font-size', self.computedFontSize + 'px', 'important');
      self.fileInput.style.setProperty('font-family', self.options.fontFamily + 'px', 'important');
      self.fileInput.addEventListener('change', self.handleFileSelect, false);
      self.fileLoaderPanel.appendChild(self.fileInput);

      self.fileLoaderLabelB64 = document.createElement('label');
      self.fileLoaderLabelB64.innerText = 'Base64';
      self.fileLoaderLabelB64.style.marginLeft = '10px';
      self.fileLoaderPanel.appendChild(self.fileLoaderLabelB64);
      self.fileLoaderRadioB64 = document.createElement('input');
      self.fileLoaderRadioB64.type = 'radio';
      self.fileLoaderRadioB64.name = this.id + '-load-type';
      self.fileLoaderRadioB64.value = 'base64';
      self.fileLoaderRadioB64.checked = true;
      self.fileLoaderRadioB64.onchange = self.loadFile;
      self.fileLoaderLabelB64.appendChild(self.fileLoaderRadioB64);

      self.fileLoaderLabelBin = document.createElement('label');
      self.fileLoaderLabelBin.innerText = 'Binary';
      self.fileLoaderLabelBin.style.marginLeft = '10px';
      self.fileLoaderPanel.appendChild(self.fileLoaderLabelBin);
      self.fileLoaderRadioBin = document.createElement('input');
      self.fileLoaderRadioBin.type = 'radio';
      self.fileLoaderRadioBin.name = this.id + '-load-type';
      self.fileLoaderRadioBin.value = 'binary';
      self.fileLoaderRadioBin.onchange = self.loadFile;
      self.fileLoaderLabelBin.appendChild(self.fileLoaderRadioBin);

      self.filePreviewWrapper = document.createElement('div');
      self.filePreviewWrapper.style.setProperty('width', 'calc(100% - ' + (DebugJS.WINDOW_ADJUST + 2) + 'px)', 'important');
      self.filePreviewWrapper.style.setProperty('height', 'calc(100% - ' + ((self.computedFontSize * 4) + 10) + 'px)', 'important');
      self.filePreviewWrapper.style.setProperty('margin-bottom', '4px', 'important');
      self.filePreviewWrapper.style.setProperty('padding', '2px', 'important');
      self.filePreviewWrapper.style.setProperty('border', '1px dotted #ccc', 'important');
      self.filePreviewWrapper.style.setProperty('font-size', self.computedFontSize + 'px', 'important');
      self.filePreviewWrapper.style.setProperty('font-family', self.options.fontFamily + 'px', 'important');
      self.filePreviewWrapper.style.setProperty('overflow', 'auto', 'important');
      self.filePreviewWrapper.addEventListener('dragover', self.handleDragOver, false);
      self.filePreviewWrapper.addEventListener('drop', self.handleFileDrop, false);
      self.fileLoaderPanel.appendChild(self.filePreviewWrapper);

      self.filePreview = document.createElement('pre');
      self.filePreview.style.setProperty('background', 'transparent', 'important');
      self.filePreview.style.setProperty('color', self.options.fontColor, 'important');
      self.filePreview.style.setProperty('font-size', self.computedFontSize + 'px', 'important');
      self.filePreview.style.setProperty('font-family', self.options.fontFamily + 'px', 'important');
      self.filePreviewWrapper.appendChild(self.filePreview);
      self.filePreview.innerText = 'Drop a file here';

      self.fileLoaderFooter = document.createElement('div');
      self.fileLoaderFooter.style.width = 'calc(100% - ' + (DebugJS.WINDOW_ADJUST + DebugJS.WINDOW_SHADOW) + 'px)';
      self.fileLoaderFooter.style.height = (self.computedFontSize + 3) + 'px';
      self.fileLoaderFooter.style.opacity = 0;
      self.fileLoaderFooter.style.transition = 'opacity 0.5s linear';
      self.fileLoaderPanel.appendChild(self.fileLoaderFooter);

      self.fileLoadProgressBar = document.createElement('div');
      self.fileLoadProgressBar.style.display = 'inline-block';
      self.fileLoadProgressBar.style.width = 'calc(100% - ' + (self.computedFontSize * 5) + 'px)';
      self.fileLoadProgressBar.style.height = 'auto';
      self.fileLoadProgressBar.style.padding = 0;
      self.fileLoadProgressBar.style.border = '1px solid #ccc';
      self.fileLoaderFooter.appendChild(self.fileLoadProgressBar);

      self.fileLoadProgress = document.createElement('div');
      self.fileLoadProgress.style.width = 'calc(100% - ' + (DebugJS.WINDOW_BORDER * 2) + 'px)';
      self.fileLoadProgress.style.height = 'auto';
      self.fileLoadProgress.style.padding = '1px';
      self.fileLoadProgress.style.border = 'none';
      self.fileLoadProgress.style.background = '#00f';
      self.fileLoadProgress.style.fontSize = (self.computedFontSize * 0.8) + 'px';
      self.fileLoadProgress.style.fontFamily = self.options.fontFamily + 'px';
      self.fileLoadProgress.innerText = '0%';
      self.fileLoadProgressBar.appendChild(self.fileLoadProgress);

      self.fileLoadCancelBtn = document.createElement('span');
      self.fileLoadCancelBtn.className = this.id + '-btn ' + this.id + '-nomove';
      self.fileLoadCancelBtn.style.position = 'relative';
      self.fileLoadCancelBtn.style.top = '2px';
      self.fileLoadCancelBtn.style.float = 'right';
      self.fileLoadCancelBtn.onclick = DebugJS.self.cancelLoadFile;
      self.fileLoadCancelBtn.innerText = '[CANCEL]';
      self.fileLoaderFooter.appendChild(self.fileLoadCancelBtn);
    } else {
      self.toolsBodyPanel.appendChild(self.fileLoaderPanel);
    }
  },

  disableFileLoader: function() {
    var self = DebugJS.self;
    if ((self.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FUNC_FILE) && (self.fileLoaderPanel != null)) {
      self.toolsBodyPanel.removeChild(self.fileLoaderPanel);
    }
  },

  handleFileSelect: function(e) {
    var self = DebugJS.self;
    self.fileLoaderFile = e.target.files[0];
    self.loadFile();
  },

  handleDragOver: function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  },

  handleFileDrop: function(e) {
    var self = DebugJS.self;
    e.stopPropagation();
    e.preventDefault();
    self.fileLoaderFile = e.dataTransfer.files[0];
    self.loadFile();
  },

  loadFile: function() {
    var self = DebugJS.self;
    var file = self.fileLoaderFile;
    if (!file) {
      return;
    }

    self.fileLoadProgress.style.width = '0%';
    self.fileLoadProgress.textContent = '0%';

    self.fileReader = new FileReader();
    self.fileReader.onerror = self.fileLoadErrorHandler;
    self.fileReader.onprogress = self.updateFileLoadProgress;
    self.fileReader.onabort = self.onAbortLoadFile;
    self.fileReader.onloadstart = self.onFileLoadStart;
    self.fileReader.onload = (function(theFile) {
      return function(e) {
        self.onFileLoadCompleted(theFile, e);
      };
    })(file);

    if (self.fileLoaderRadioB64.checked) {
      self.fileLoadFormat = DebugJS.FILE_LOAD_FORMAT_BASE64;
      self.fileReader.readAsDataURL(file);
    } else {
      self.fileLoadFormat = DebugJS.FILE_LOAD_FORMAT_BIN;
      self.fileReader.readAsArrayBuffer(file);
    }
  },

  cancelLoadFile: function() {
    var self = DebugJS.self;
    if (self.fileReader) {
      self.fileReader.abort();
    }
  },

  onAbortLoadFile: function(e) {
    var self = DebugJS.self;
    self.updateFilePreview('File read cancelled.');
    setTimeout(self.fileLoadFinalize, 1000);
  },

  fileLoadErrorHandler: function(e) {
    var self = DebugJS.self;
    switch (e.target.error.code) {
      case e.target.error.NOT_FOUND_ERR:
        self.updateFilePreview('NOT_FOUND_ERR');
        break;
      case e.target.error.NOT_READABLE_ERR:
        self.updateFilePreview('NOT_READABLE_ERR');
        break;
      case e.target.error.ABORT_ERR:
        self.updateFilePreview('ABORT_ERR');
        break;
      default:
        self.updateFilePreview('FILE_READ_ERROR');
        break;
    }
  },

  updateFileLoadProgress: function(e) {
    if (e.lengthComputable) {
      var self = DebugJS.self;
      var total = e.total;
      var loaded = e.loaded;
      var percentLoaded = (total == 0) ? 100 : Math.round((loaded / total) * 100);
      self.fileLoadProgress.style.width = 'calc(' + percentLoaded + '% - ' + (DebugJS.WINDOW_BORDER * 2) + 'px)';
      self.fileLoadProgress.textContent = percentLoaded + '%';
      self.updateFilePreview('LOADING...\n' + DebugJS.formatDec(loaded) + ' / ' + DebugJS.formatDec(total) + ' bytes');
    }
  },

  onFileLoadStart: function(e) {
    var self = DebugJS.self;
    DebugJS.addClass(self.fileLoaderFooter, self.id + '-loading');
    self.updateFilePreview('LOADING...');
  },

  onFileLoadCompleted: function(file, e) {
    var PREVIEW_SIZE_MAX = 5 * 1024 * 1024;
    var self = DebugJS.self;
    var content = (self.fileReader.result == null) ? '' : self.fileReader.result;
    var dt = DebugJS.getDateTime(file.lastModifiedDate);
    var fileDate = dt.yyyy + '-' + dt.mm + '-' + dt.dd + '(' + DebugJS.WDAYS[dt.wday] + ') ' + dt.hh + ':' + dt.mi + ':' + dt.ss + '.' + dt.sss;
    var contentPreview = '';

    if (file.size > 0) {
      if (self.fileLoadFormat == DebugJS.FILE_LOAD_FORMAT_BASE64) {
        contentPreview = self.getContentPreview(file, content);
      } else {
        contentPreview = '\n' + self.getHexDump(file, content);
      }
    }

    var html = 'file    : ' + file.name + '\n' +
    'type    : ' + file.type + '\n' +
    'size    : ' + DebugJS.formatDec(file.size) + ' byte' + ((file.size >= 2) ? 's' : '') + '\n' +
    'modified: ' + fileDate + '\n' +
    contentPreview + '\n';
    if (self.fileLoadFormat == DebugJS.FILE_LOAD_FORMAT_BASE64) {
      if (file.size <= PREVIEW_SIZE_MAX) {
        html += content;
      } else {
        html += '<span style="color:' + self.options.logColorW + '">The file size exceeds the limit allowed.</span>';
      }
    }
    self.updateFilePreview(html);

    setTimeout(self.fileLoadFinalize, 1000);
  },

  getContentPreview: function(file, contentBase64) {
    var self = DebugJS.self;
    var contentPreview = '';
    if (file.type.match(/image\//)) {
      var selfSizePos = self.getSelfSizePos();
      contentPreview = '<img src="' + contentBase64 + '" id="' + self.id + '-img-preview" style="max-width:' + (selfSizePos.w - 32) + 'px;max-height:' + (selfSizePos.h - (self.computedFontSize * 13) - 8) + 'px;">\n';
    } else if (file.type.match(/text\//)) {
      var contents = contentBase64.split(',');
      var decodedContent = DebugJS.decodeBase64(contents[1]);
      decodedContent = DebugJS.escapeTag(decodedContent);
      contentPreview = '<span style="color:#0f0">' + decodedContent + '</span>\n';
    }
    return contentPreview;
  },

  resizeImgPreview: function() {
    var self = DebugJS.self;
    if ((!(self.status & DebugJS.STATE_TOOLS)) ||
        (!(DebugJS.self.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FUNC_FILE)) ||
        (!(self.fileLoadFormat == DebugJS.FILE_LOAD_FORMAT_BASE64))) {
      return;
    }
    var imgPreview = document.getElementById(self.id + '-img-preview');
    if (imgPreview == null) return;
    var selfSizePos = self.getSelfSizePos();
    var maxW = (selfSizePos.w - 32);
    if (maxW < 100) maxW = 100;
    var maxH = (selfSizePos.h - (self.computedFontSize * 13) - 8);
    if (maxH < 100) maxH = 100;
    imgPreview.style.maxWidth = maxW + 'px';
    imgPreview.style.maxHeight = maxH + 'px';
  },

  getHexDump: function(file, contentArray) {
    var MAX_LEN = 102400;
    var self = DebugJS.self;
    var buf = new Uint8Array(contentArray);
    var len = ((buf.length > MAX_LEN) ? MAX_LEN : buf.length);
    if (len % 0x10 != 0) {
      len = (((len / 0x10) + 1) | 0) * 0x10;
    }
    var hexDump = '<pre style="white-space:pre !important"><span style="background:#0f0;color:#000;">Address    +0 +1 +2 +3 +4 +5 +6 +7  +8 +9 +A +B +C +D +E +F  ASCII           </span>\n00000000 : ';
    for (var i = 0; i < len; i++) {
      var hex = ((buf[i] == undefined) ? '  ' : ('0' + buf[i].toString(16)).slice(-2).toUpperCase());
      hexDump += hex;
      if ((i + 1) % 0x10 == 0) {
        hexDump += '  ';
        for (var j = ((i + 1) - 0x10); j <= i; j++) {
          if (j <= len) {
            var code = buf[j];
            if (code == undefined) {
              break;
            } else if ((code >= 0x20) && (code <= 0x7E)) {
              switch (code) {
                case 0x22:
                  hexDump += '&quot;';
                  break;
                case 0x26:
                  hexDump += '&amp;';
                  break;
                case 0x3C:
                  hexDump += '&lt;';
                  break;
                case 0x3E:
                  hexDump += '&gt;';
                  break;
                default:
                  hexDump += String.fromCharCode(code);
                  break;
              }
            } else {
              hexDump += ' ';
            }
          }
        }
        if ((i + 1) < len) {
          hexDump += '\n';
          var addr = ('0000000' + (i + 1).toString(16)).slice(-8).toUpperCase();
          hexDump += addr + ' : ';
        }
      } else if ((i + 1) % 8 == 0) {
        hexDump += '  ';
      } else {
        hexDump += ' ';
      }
    }
    if (buf.length > MAX_LEN) {
      hexDump += '\n<span style="color:#ccc;">...</span>';
    }
    hexDump += '</pre>';
    return hexDump;
  },

  updateFilePreview: function(html) {
    var self = DebugJS.self;
    self.filePreview.innerHTML = html;
    self.filePreviewWrapper.scrollTop = 0;
  },

  fileLoadFinalize: function() {
    var self = DebugJS.self;
    DebugJS.removeClass(self.fileLoaderFooter, self.id + '-loading');
  },

  switchFileScreen: function() {
    var self = DebugJS.self;
    if (self.fileLoaderRadioB64.checked) {
      self.fileLoaderRadioBin.checked = true;
    } else {
      self.fileLoaderRadioB64.checked = true;
    }
    self.loadFile();
  },

  enableHtmlEditor: function() {
    var self = DebugJS.self;
    if (self.htmlPreviewerBasePanel == null) {
      self.htmlPreviewerBasePanel = document.createElement('div');
      self.htmlPreviewerBasePanel.className = self.id + '-tools';
      self.toolsBodyPanel.appendChild(self.htmlPreviewerBasePanel);

      self.htmlPreviewerPrevPanel = document.createElement('div');
      self.htmlPreviewerPrevPanel.style.height = '50%';
      self.htmlPreviewerPrevPanel.innerHTML = 'HTML PREVIEWER';
      self.htmlPreviewerBasePanel.appendChild(self.htmlPreviewerPrevPanel);

      self.htmlPreviewEditorPanel = document.createElement('div');
      var html = '<span style="color:#ccc;">HTML Editor</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="float:right;margin-right:4px;" onclick="DebugJS.self.drawHtml();DebugJS.self.htmlPreviewEditor.focus();">[DRAW]</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertHtmlSnippet()">[CLR]</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:8px;" onclick="DebugJS.self.insertHtmlSnippet(0)">&lt;CODE1&gt;</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertHtmlSnippet(1)">&lt;CODE2&gt;</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertHtmlSnippet(2)">&lt;CODE3&gt;</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertHtmlSnippet(3)">&lt;CODE4&gt;</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertHtmlSnippet(4)">&lt;CODE5&gt;</span>';
      self.htmlPreviewEditorPanel.innerHTML = html;
      self.htmlPreviewerBasePanel.appendChild(self.htmlPreviewEditorPanel);

      self.htmlPreviewEditor = document.createElement('textarea');
      self.htmlPreviewEditor.className = self.id + '-editor';
      self.htmlPreviewEditor.style.setProperty('height', 'calc(50% - ' + (self.computedFontSize + 10) + 'px)', 'important');
      self.htmlPreviewEditor.onblur = DebugJS.self.saveHtmlBuf;
      self.htmlPreviewEditor.value = self.htmlPreviewBuf;
      self.htmlPreviewerBasePanel.appendChild(self.htmlPreviewEditor);
    } else {
      self.toolsBodyPanel.appendChild(self.htmlPreviewerBasePanel);
    }
    self.htmlPreviewEditor.focus();
  },

  insertHtmlSnippet: function(n) {
    var self = DebugJS.self;
    var editor = self.htmlPreviewEditor;
    if (n == undefined) {
      editor.value = '';
      editor.focus();
    } else {
      var code = DebugJS.HTML_SNIPPET[n];
      var buf = editor.value;
      var posCursole = editor.selectionStart;
      var leftBuf = buf.substr(0, posCursole);
      var rightBuf = buf.substr(posCursole, buf.length);
      buf = leftBuf + code + rightBuf;
      self.htmlPreviewEditor.focus();
      self.htmlPreviewEditor.value = buf;
      editor.selectionStart = editor.selectionEnd = posCursole + code.length;
    }
  },

  saveHtmlBuf: function() {
    var self = DebugJS.self;
    self.htmlPreviewBuf = self.htmlPreviewEditor.value;
  },

  drawHtml: function() {
    var self = DebugJS.self;
    self.htmlPreviewerPrevPanel.innerHTML = self.htmlPreviewBuf;
  },

  disableHtmlEditor: function() {
    var self = DebugJS.self;
    if ((self.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FUNC_HTML) && (self.htmlPreviewerBasePanel != null)) {
      self.toolsBodyPanel.removeChild(self.htmlPreviewerBasePanel);
    }
  },

  enableMemoEditor: function() {
    var self = DebugJS.self;
    if (self.memoBasePanel == null) {
      self.memoBasePanel = document.createElement('div');
      self.memoBasePanel.className = self.id + '-tools';
      self.toolsBodyPanel.appendChild(self.memoBasePanel);

      self.memoEditorPanel = document.createElement('div');
      var html = '<span style="color:#ccc;">Memo</span>';
      if (DebugJS.LS_AVAILABLE) {
        html += '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="float:right;margin-right:4px;" onclick="DebugJS.self.saveMemo();DebugJS.self.memoEditor.focus();">[SAVE]</span>';
      } else {
        html += '<span class="' + self.id + '-btn ' + self.id + '-nomove ' + this.id + '-btn-disabled" style="float:right;margin-right:4px;">[SAVE]</span>' +
        '<span style="float:right;margin-right:4px;color:#caa">Save function (localStorage) is not available.</span>';
      }
      self.memoEditorPanel.innerHTML = html;
      self.memoBasePanel.appendChild(self.memoEditorPanel);

      self.memoEditor = document.createElement('textarea');
      self.memoEditor.className = self.id + '-editor';
      self.memoEditor.style.setProperty('height', 'calc(100% - ' + (self.computedFontSize + 10) + 'px)', 'important');
      self.memoBasePanel.appendChild(self.memoEditor);

      if (DebugJS.LS_AVAILABLE) {
        self.loadMemo();
      }
    } else {
      self.toolsBodyPanel.appendChild(self.memoBasePanel);
    }
    self.memoEditor.focus();
  },

  loadMemo: function() {
    var self = DebugJS.self;
    var memo = localStorage.getItem('DebugJS-memo');
    if (memo == null) {
      memo = '';
    }
    self.memoEditor.value = memo;
  },

  saveMemo: function() {
    var self = DebugJS.self;
    var memo = self.memoEditor.value;
    if (memo != '') {
      localStorage.setItem('DebugJS-memo', self.memoEditor.value);
    } else {
      localStorage.removeItem('DebugJS-memo');
    }
    DebugJS.log.s('Saved.');
  },

  disableMemoEditor: function() {
    var self = DebugJS.self;
    if ((self.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FUNC_MEMO) &&
        (self.memoBasePanel != null)) {
      self.toolsBodyPanel.removeChild(self.memoBasePanel);
    }
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
      var html = '<div class="' + self.id + '-btn ' + this.id + '-nomove" ' +
      'style="position:relative;top:-1px;float:right;' +
      'font-size:' + (18 * self.options.zoom) + 'px;color:#888;" ' +
      'onclick="DebugJS.self.disableScriptEditor();" ' +
      'onmouseover="this.style.color=\'#d88\';" ' +
      'onmouseout="this.style.color=\'#888\';">x</div>' +
      '<span style="color:#ccc;">Script Editor</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="float:right;margin-right:4px;" onclick="DebugJS.self.execScript();">[EXEC]</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertSnippet()">[CLR]</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:8px;" onclick="DebugJS.self.insertSnippet(0)">{CODE1}</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertSnippet(1)">{CODE2}</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertSnippet(2)">{CODE3}</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertSnippet(3)">{CODE4}</span>' +
      '<span class="' + self.id + '-btn ' + this.id + '-nomove" style="margin-left:4px;" onclick="DebugJS.self.insertSnippet(4)">{CODE5}</span>';
      self.scriptPanel.innerHTML = html;
      self.addOverlayPanel(self.scriptPanel);

      self.scriptEditor = document.createElement('textarea');
      self.scriptEditor.className = self.id + '-editor';
      self.scriptEditor.onblur = DebugJS.self.saveScriptBuf;
      self.scriptEditor.value = self.scriptBuf;
      self.scriptPanel.appendChild(self.scriptEditor);
    }
    self.updateScriptBtn();
    self.scriptEditor.focus();
  },

  addOverlayPanel: function(panel) {
    var self = DebugJS.self;
    if (self.overlayBasePanel == null) {
      self.collapseLogPanel();
      self.overlayBasePanel = document.createElement('div');
      self.overlayBasePanel.className = self.id + '-overlay-base-panel';
      //self.mainPanel.insertBefore(self.overlayBasePanel, self.logPanel); //bottom position
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
        self.expandLogPanel();
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
      DebugJS.log.res(ret);
    } catch (e) {
      DebugJS.log.e(e);
    }
  },

  disableScriptEditor: function() {
    var self = DebugJS.self;
    self.stopScript();
    self.updateScriptBtn();
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
    if (((x >= sizePos.x1) && (x <= sizePos.x2)) && ((y >= sizePos.y1) && (y <= sizePos.y2))) {
      return true;
    }
    return false;
  },

  getSelfSizePos: function() {
    var self = DebugJS.self;
    var rect = self.dbgWin.getBoundingClientRect();
    var resizeBoxSize = 6;
    var sizePos = {};
    sizePos.w = self.dbgWin.clientWidth;
    sizePos.h = self.dbgWin.clientHeight;
    sizePos.x1 = rect.left - resizeBoxSize / 2;
    sizePos.y1 = rect.top - resizeBoxSize / 2;
    sizePos.x2 = sizePos.x1 + self.dbgWin.clientWidth + resizeBoxSize + DebugJS.WINDOW_BORDER;
    sizePos.y2 = sizePos.y1 + self.dbgWin.clientHeight + resizeBoxSize + DebugJS.WINDOW_BORDER;
    return sizePos;
  },

  setSelfSizeW: function(w) {
    var self = DebugJS.self;
    self.dbgWin.style.width = w + 'px';
    self.resizeMainHeight();
    self.resizeImgPreview();
  },

  setSelfSizeH: function(h) {
    var self = DebugJS.self;
    self.dbgWin.style.height = h + 'px';
    self.resizeMainHeight();
    self.resizeImgPreview();
  },

  expandHight: function(height) {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_DYNAMIC) {

      self.saveExpandModeOrgSizeAndPos();
      var sizePos = self.getSelfSizePos();
      if (sizePos.h >= height) {
        return;
      } else if (document.documentElement.clientHeight <= height) {
        height = document.documentElement.clientHeight;
      }
      self.setSelfSizeH(height);
      sizePos = self.getSelfSizePos();
      if (self.status & DebugJS.STATE_AUTO_POSITION_ADJUST) {
        self.setWindowPosition(self.options.position, sizePos.w, sizePos.h);
      } else {
        if (sizePos.y2 > document.documentElement.clientHeight) {
          if (document.documentElement.clientHeight < (height + self.options.posAdjY)) {
            self.dbgWin.style.top = 0;
          } else {
            self.dbgWin.style.top = (document.documentElement.clientHeight - height - self.options.posAdjY) + 'px';
          }
        }
      }
    }
  },

  expandHightIfNeeded: function(height) {
    var self = DebugJS.self;
    if (self.windowExpandCnt == 0) {
      self.expandHight(height);
    }
    self.windowExpandCnt++;
  },

  resetExpandedHeight: function() {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_DYNAMIC) {
      self.dbgWin.style.width = self.expandModeOrg.w + 'px';
      self.dbgWin.style.height = self.expandModeOrg.h + 'px';
      self.resizeMainHeight();
      self.resizeImgPreview();
      self.logPanel.scrollTop = self.logPanel.scrollHeight;
      if (self.status & DebugJS.STATE_AUTO_POSITION_ADJUST) {
        var sizePos = self.getSelfSizePos();
        self.setWindowPosition(self.options.position, sizePos.w, sizePos.h);
      }
    }
  },

  resetExpandedHeightIfNeeded: function() {
    var self = DebugJS.self;
    self.windowExpandCnt--;
    if (self.windowExpandCnt == 0) {
      self.resetExpandedHeight();
    }
  },

  saveExpandModeOrgSizeAndPos: function() {
    var self = DebugJS.self;
    var shadow = (self.status & DebugJS.STATE_DYNAMIC) ? (DebugJS.WINDOW_SHADOW / 2) : 0;
    self.expandModeOrg.w = (self.dbgWin.offsetWidth + DebugJS.WINDOW_BORDER - shadow);
    self.expandModeOrg.h = (self.dbgWin.offsetHeight + DebugJS.WINDOW_BORDER - shadow);
    self.expandModeOrg.t = self.dbgWin.offsetTop;
    self.expandModeOrg.l = self.dbgWin.offsetLeft;
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

  setMsg: function(msg) {
    var self = DebugJS.self;
    self.msgString = msg;
    self.updateMsgPanel();
  },

  execCmd: function() {
    var self = DebugJS.self;
    var cl = self.cmdLine.value;
    self.cmdLine.value = '';
    if (cl == '') {
      DebugJS.log('');
    } else {
      if (cl.substr(0, 2) == '!!') {
        var event = self.getLastHistory();
        if (event == '') {
          DebugJS.log.w('!!: event not found');
          return;
        }
        cl = event + cl.substr(2);
      } else if (cl.substr(0, 1) == '!') {
        var str = cl.substr(1).match(/(\d*)(.*)/);
        var num = str[1];
        var arg = str[2];
        if (num != '') {
          var event = self.getHistory((num | 0) - 1);
          if (event == '') {
            DebugJS.log.w('!' + num + ': event not found');
            return;
          }
          cl = event + arg;
        } else if (arg != '') {
          cl = '!' + arg;
        }
      }
      self.saveHistory(cl);
      self._execCmd(cl, true);
    }
  },

  _execCmd: function(str, echo) {
    if (echo) {
      var echoStr = str;
      echoStr = DebugJS.escapeTag(echoStr);
      echoStr = DebugJS.trimDownText(echoStr, DebugJS.CMD_ECHO_MAX_LEN, 'color:#aaa;');
      DebugJS.log.s(echoStr);
    }
    var self = DebugJS.self;
    var cmd, arg;
    var cmds = self.splitCmdLineInTwo(str);
    cmd = cmds[0];
    arg = cmds[1];

    var found = false;
    for (var i = 0, len = self.CMD_TBL.length; i < len; i++) {
      if (cmd == self.CMD_TBL[i].cmd) {
        found = true;
        self.CMD_TBL[i].fnc(arg, self.CMD_TBL[i]);
        break;
      }
    }

    if (self.options.disableAllCommands) {
      return;
    }

    if ((!found) && (str.match(/^http/))) {
      this.cmdGet(str);
      return;
    }

    if (!found) {
      found = self.cmdRadixConv(str);
    }

    if (!found) {
      found = self.cmdTimeCalc(str);
    }

    if ((!found) && (str.match(/^U\+/i))) {
      this.cmdUnicode('-d ' + str);
      return;
    }

    if (!found) {
      self.execCode(str);
    }
  },

  splitCmdLineInTwo: function(str) {
    var res = [];
    var strs = str.match(/([^\s]{1,})\s(.*)/);
    if (strs == null) {
      res[0] = DebugJS.omitLeadingWhiteSpace(str);
      res[1] = '';
    } else {
      res[0] = strs[1];
      res[1] = strs[2];
    }
    return res;
  },

  cmdBase64: function(arg, tbl) {
    var self = DebugJS.self;
    self.execDecodeAndEncode(arg, tbl, DebugJS.decodeBase64, DebugJS.encodeBase64);
  },

  cmdCls: function(arg, tbl) {
    var self = DebugJS.self;
    self.clearMessage();
  },

  cmdElements: function(arg, tbl) {
    arg = DebugJS.omitLeadingWhiteSpace(arg);
    arg = DebugJS.omitTrailingWhiteSpace(arg);
    if ((arg == '-h') || (arg == '--help')) {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.countElements(arg, true);
    }
  },

  cmdExecute: function(arg, tbl) {
    var self = DebugJS.self;
    self.execScript();
  },

  cmdExit: function(arg, tbl) {
    var self = DebugJS.self;
    self.closeFeatures();
    if (self.options.useSuspendLogButton) {
      self.status &= ~DebugJS.STATE_LOG_SUSPENDING;
      self.updateSuspendLogBtn();
    }
    if (self.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      self.stopStopWatch();
    }
    self.resetStopWatch();
    self.setLed(0);
    self.setMsg('');
    if (self.status & DebugJS.STATE_DYNAMIC) {
      if (self.options.usePinButton) {
        self.enableDraggable();
      }
      if (!self.options.kioskMode) {
        self.resetDebugWindowSizePos();
        self.updateWinCtrlBtnPanel();
      }
    }
    self.scriptBuf = '';
    self.filterText = '';
    if (self.filterInput) self.filterInput.value = '';
    self.closeDebugWindow();
    self.clearMessage();
    self.logFilter = DebugJS.LOG_FILTER_ALL;
    self.updateLogFilterButtons();
  },

  cmdGet: function(arg, tbl) {
    var self = DebugJS.self;
    self.httpRequest(arg, tbl, 'GET');
  },

  cmdHelp: function(arg, tbl) {
    var self = DebugJS.self;
    var str = 'Available Commands:\n<table>';
    for (var i = 0, len = self.CMD_TBL.length; i < len; i++) {
      if (!(self.CMD_TBL[i].attr & DebugJS.CMD_ATTR_HIDDEN)) {
        if (i == self.intCmdTblLen) {
          str += '<tr><td colspan="2">---- ---- ---- ---- ---- ---- ---- ----</td></tr>';
        }
        str += '<tr><td>' + self.CMD_TBL[i].cmd + '</td><td>' + self.CMD_TBL[i].desc + '</td></tr>';
      }
    }
    str += '</table>';
    DebugJS.log.mlt(str);
  },

  cmdHistory: function(arg, tbl) {
    var self = DebugJS.self;
    var arg = DebugJS.omitLeadingAndTrailingWhiteSpace(arg);
    switch (arg) {
      case '':
        self.showHistory();
        break;
      case '-c':
        self.clearHistory();
        break;
      default:
        DebugJS.printUsage(tbl.usage);
        break;
    }
  },

  initHistory: function() {
    var self = DebugJS.self;
    if (self.cmdHistoryBuf == null) {
      self.CMD_HISTORY_MAX = self.options.cmdHistoryMax;
      self.cmdHistoryBuf = new DebugJS.RingBuffer(self.CMD_HISTORY_MAX);
    }
    if ((self.options.saveCmdHistory) && (DebugJS.LS_AVAILABLE)) {
      self.loadHistory();
    }
  },

  showHistory: function() {
    var self = DebugJS.self;
    var buf = self.cmdHistoryBuf.getAll();
    var str = '<table>';
    for (var i = 0, len = buf.length; i < len; i++) {
      var cmd = buf[i];
      cmd = DebugJS.escapeTag(cmd);
      cmd = DebugJS.trimDownText(cmd, DebugJS.CMD_ECHO_MAX_LEN, 'color:#aaa;');
      str += '<tr><td style="vertical-align:top;text-align:right;white-space:nowrap;">' + (i + 1) + '</td><td>' + cmd + '</td></tr>';
    }
    str += '</table>';
    DebugJS.log.mlt(str);
  },

  saveHistory: function(cmd) {
    var self = DebugJS.self;
    self.cmdHistoryBuf.add(cmd);
    self.cmdHistoryIdx = (self.cmdHistoryBuf.count() < self.CMD_HISTORY_MAX) ? self.cmdHistoryBuf.count() : self.CMD_HISTORY_MAX;
    if ((self.options.saveCmdHistory) && (DebugJS.LS_AVAILABLE)) {
      var buf = self.cmdHistoryBuf.getAll();
      var cmds = '';
      for (var i = 0, len = buf.length; i < len; i++) {
        cmds += buf[i] + '\n';
      }
      localStorage.setItem('DebugJS-history', cmds);
    }
  },

  loadHistory: function() {
    var self = DebugJS.self;
    if ((self.options.saveCmdHistory) && (DebugJS.LS_AVAILABLE)) {
      var buf = localStorage.getItem('DebugJS-history');
      if (buf != null) {
        var cmds = buf.split('\n');
        for (var i = 0, len = (cmds.length - 1); i < len; i++) {
          self.cmdHistoryBuf.add(cmds[i]);
          self.cmdHistoryIdx = (self.cmdHistoryBuf.count() < self.CMD_HISTORY_MAX) ? self.cmdHistoryBuf.count() : self.CMD_HISTORY_MAX;
        }
      }
    }
  },

  getHistory: function(idx) {
    var self = DebugJS.self;
    var cmds = self.cmdHistoryBuf.getAll();
    var cmd = cmds[idx];
    return ((cmd == undefined) ? '' : cmd);
  },

  getLastHistory: function() {
    var self = DebugJS.self;
    var cmds = self.cmdHistoryBuf.getAll();
    var cmd = cmds[cmds.length - 1];
    return ((cmd == undefined) ? '' : cmd);
  },

  clearHistory: function() {
    var self = DebugJS.self;
    self.cmdHistoryBuf.clear();
    if (DebugJS.LS_AVAILABLE) {
      localStorage.removeItem('DebugJS-history');
    }
  },

  cmdJson: function(arg, tbl) {
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      var json = DebugJS.omitLeadingWhiteSpace(arg);
      var flg = true;
      if (json.substr(0, 1) == '-') {
        var opt = json.match(/^-(.[^\s]*)\s/);
        if ((opt != null) && (opt[1] == 'p')) {
          json = json.substr(3);
          flg = false;
        } else {
          DebugJS.printUsage(tbl.usage);
          return;
        }
      }
      DebugJS.execCmdJson(json, flg);
    }
  },

  cmdJquery: function(arg, tbl) {
    if (typeof jQuery == 'undefined') {
      DebugJS.log.w('jQuery is not loaded.');
    } else {
      DebugJS.log('jQuery v' + jQuery.fn.jquery);
    }
  },

  cmdKeys: function(arg, tbl) {
    arg = arg.replace(/\s{2,}/g, ' ');
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      var args = arg.split(' ');
      for (var i = 0, len = args.length; i < len; i++) {
        if (args[i] == '') continue;
        var cmd = 'DebugJS.buf="' + args[i] + ' = ";DebugJS.buf+=DebugJS.getKeysStr(' + args[i] + ');DebugJS.log.mlt(DebugJS.buf);';
        try {
          eval(cmd);
        } catch (e) {
          DebugJS.log.e(e);
        }
      }
    }
  },

  cmdLaptime: function(arg, tbl) {
    var self = DebugJS.self;
    if (self.status & DebugJS.STATE_STOPWATCH_LAPTIME) {
      self.stopStopWatch();
    } else {
      if (self.status & DebugJS.STATE_STOPWATCH_RUNNING) {
        self.stopStopWatch();
        self.resetStopWatch();
      }
      self.status |= DebugJS.STATE_STOPWATCH_LAPTIME;
      self.startStopWatch();
    }
  },

  cmdLed: function(arg, tbl) {
    var self = DebugJS.self;
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      self.setLed(arg);
    }
  },

  cmdMsg: function(arg, tbl) {
    var self = DebugJS.self;
    self.setMsg(arg);
  },

  cmdP: function(arg, tbl) {
    arg = arg.replace(/\s{2,}/g, ' ');
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.execCmdP(arg);
    }
  },

  cmdPos: function(arg, tbl) {
    var self = DebugJS.self;
    arg = arg.replace(/\s{2,}/g, ' ');
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      var a = arg.match(/([^\s]{1,})\s{0,}(.*)/);
      if (a == null) {
        DebugJS.printUsage(tbl.usage);
      } else {
        var pos = a[1];
        switch (pos) {
          case 'n':
          case 'ne':
          case 'e':
          case 'se':
          case 's':
          case 'sw':
          case 'w':
          case 'nw':
          case 'c':
            var sizePos = self.getSelfSizePos();
            self.setWindowPosition(pos, sizePos.w, sizePos.h);
            break;
          default:
            DebugJS.printUsage(tbl.usage);
            break;
        }
      }
    }
  },

  cmdPost: function(arg, tbl) {
    var self = DebugJS.self;
    self.httpRequest(arg, tbl, 'POST');
  },

  cmdProp: function(arg, tbl) {
    var self = DebugJS.self;
    arg = DebugJS.omitLeadingWhiteSpace(arg);
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      var name = arg;
      if (self.properties[name] != undefined) {
        DebugJS.log.res(self.properties[name].value);
      } else {
        DebugJS.log.e(name + ' is invalid property name.');
      }
    }
  },

  cmdProps: function(arg, tbl) {
    var self = DebugJS.self;
    var str = 'Available properties:\n<table>';
    for (var key in self.properties) {
      str += '<tr><td>' + key + '</td><td>' + self.properties[key].value + '</td></tr>';
    }
    str += '</table>';
    DebugJS.log.mlt(str);
  },

  cmdRandom: function(arg, tbl) {
    arg = arg.replace(/\s{2,}/g, ' ');
    var args = arg.split(' ');
    if (args == null) {
      DebugJS.printUsage(tbl.usage);
    } else {
      var type = args[0] || DebugJS.RANDOM_TYPE_NUM;
      var min, max;

      if (!args[0]) {
        type = DebugJS.RANDOM_TYPE_NUM;
      } else {
        if ((args[0] == DebugJS.RANDOM_TYPE_NUM) || (args[0] == DebugJS.RANDOM_TYPE_STR)) {
          type = args[0];
          min = args[1];
          max = args[2];
        } else if (args[0].match(/[0-9]{1,}/)) {
          type = DebugJS.RANDOM_TYPE_NUM;
          min = args[0];
          max = args[1];
        } else {
          DebugJS.printUsage(tbl.usage);
        }
      }

      var random = DebugJS.getRandom(type, min, max);
      DebugJS.log(random);
    }
  },

  cmdRadixConv: function(val) {
    val = DebugJS.omitLeadingWhiteSpace(val);
    val = DebugJS.omitTrailingWhiteSpace(val);
    if (val.match(/^\-{0,1}[0-9]+$/)) {
      DebugJS.convRadixFromDEC(val);
      return true;
    } else if (val.match(/^\-{0,1}0x[0-9A-Fa-f]+$/)) {
      DebugJS.convRadixFromHEX(val.substr(2));
      return true;
    } else if (val.match(/^\-{0,1}0b[0-1]+$/)) {
      DebugJS.convRadixFromBIN(val.substr(2));
      return true;
    } else {
      return false;
    }
  },

  cmdRGB: function(arg, tbl) {
    arg = DebugJS.omitLeadingWhiteSpace(arg);
    arg = DebugJS.omitTrailingWhiteSpace(arg);
    arg = arg.replace(/\s{2,}/g, ' ');
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.convRGB(arg);
    }
  },

  cmdSelf: function(arg, tbl) {
    var self = DebugJS.self;
    var sizePos = self.getSelfSizePos();
    var str = 'width : ' + sizePos.w + '\n' +
    'height: ' + sizePos.h + '\n' +
    'posX1 : ' + sizePos.x1 + '\n' +
    'posY1 : ' + sizePos.y1 + '\n' +
    'posX2 : ' + sizePos.x2 + '\n' +
    'posY2 : ' + sizePos.y2 + '\n';
    DebugJS.log.mlt(str);
  },

  cmdSet: function(arg, tbl) {
    var self = DebugJS.self;
    arg = DebugJS.omitLeadingWhiteSpace(arg);
    var args = arg.match(/([^\s]{1,})\s(.*)/);
    if (args == null) {
      DebugJS.printUsage(tbl.usage);
    } else {
      var name = args[1];
      var value = args[2];
      if (self.properties[name] != undefined) {
        if (self.properties[name].restriction != undefined) {
          if (!value.match(self.properties[name].restriction)) {
            DebugJS.log.e(value + ' is invalid.');
            return;
          }
        }
        self.properties[name].value = value;
        DebugJS.log.res(value);
      } else {
        DebugJS.log.e(name + ' is invalid property name.');
      }
    }
  },

  cmdTimeCalc: function(arg) {
    var self = DebugJS.self;
    arg = arg.replace(/\s{2,}/g, ' ');
    if (!arg.match(/[\d :\.\+]{1,}/)) {
      return false;
    }
    var arg = arg.replace(/\s/g, '');
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
    DebugJS.log.res(ret);
    return true;
  },

  cmdTime: function(arg, tbl) {
    arg = arg.replace(/\s{2,}/g, ' ');
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      var a = arg.match(/([^\s]{1,})\s{0,}(.*)/);
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

  cmdStopwatch: function(arg, tbl) {
    var self = DebugJS.self;
    arg = arg.replace(/\s{2,}/g, ' ');
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      var a = arg.match(/([^\s]{1,})\s{0,}(.*)/);
      if (a == null) {
        DebugJS.printUsage(tbl.usage);
      } else {
        switch (a[1]) {
          case 'start':
            self.startStopWatch();
            break;
          case 'stop':
            self.stopStopWatch();
            break;
          case 'reset':
            self.resetStopWatch();
            break;
          default:
            DebugJS.printUsage(tbl.usage);
            break;
        }
      }
    }
  },

  cmdUnicode: function(arg, tbl) {
    var self = DebugJS.self;
    self.execDecodeAndEncode(arg, tbl, DebugJS.decodeUnicode, DebugJS.encodeUnicode);
  },

  cmdV: function(arg, tbl) {
    var self = DebugJS.self;
    DebugJS.log(self.v);
  },

  cmdWin: function(arg, tbl) {
    var self = DebugJS.self;
    arg = arg.replace(/\s{2,}/g, ' ');
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      var a = arg.match(/([^\s]{1,})\s{0,}(.*)/);
      if (a == null) {
        DebugJS.printUsage(tbl.usage);
      } else {
        switch (a[1]) {
          case 'min':
          case 'normal':
          case 'max':
          case 'full':
          case 'expand':
          case 'restore':
          case 'reset':
            self.setWindowSize(a[1]);
            break;
          default:
            DebugJS.printUsage(tbl.usage);
            break;
        }
      }
    }
  },

  setWindowSize: function(opt) {
    var self = DebugJS.self;
    switch (opt) {
      case 'min':
        self.status &= ~DebugJS.STATE_WINDOW_SIZE_FULL_WH;
        self.saveSize();
        self.savePosNone();
        self.setDebugWindowSize(self.computedMinWidth, self.computedMinHeight);
        self.logPanel.scrollTop = self.logPanel.scrollHeight;
        self.status |= DebugJS.STATE_WINDOW_SIZE_EXPANDED;
        self.updateWinCtrlBtnPanel();
        break;
      case 'normal':
        var w = (self.initWidth - (DebugJS.WINDOW_SHADOW / 2) + DebugJS.WINDOW_BORDER);
        var h = (self.initHeight - (DebugJS.WINDOW_SHADOW / 2) + DebugJS.WINDOW_BORDER);
        self.setDebugWindowSize(w, h);
        self.status &= ~DebugJS.STATE_WINDOW_SIZE_EXPANDED;
        self.status &= ~DebugJS.STATE_WINDOW_SIZE_FULL_WH;
        self.updateWinCtrlBtnPanel();
        self.logPanel.scrollTop = self.logPanel.scrollHeight;
        break;
      case 'max':
        self.expandDebugWindow(false);
        self.updateWinCtrlBtnPanel();
        break;
      case 'full':
        self.saveSizeAndPos();
        self.setDebugWindowFull();
        self.updateWinCtrlBtnPanel();
        break;
      case 'expand':
        self.expandDebugWindow(true);
        self.updateWinCtrlBtnPanel();
        break;
      case 'restore':
        if ((self.status & DebugJS.STATE_WINDOW_SIZE_EXPANDED) || (self.status & DebugJS.STATE_WINDOW_SIZE_FULL_W) || (self.status & DebugJS.STATE_WINDOW_SIZE_FULL_H)) {
          self.restoreDebugWindow();
          self.updateWinCtrlBtnPanel();
        }
        break;
      case 'reset':
        self.resetDebugWindowSizePos();
        self.updateWinCtrlBtnPanel();
        break;
      default:
       break;
    }
  },

  cmdZoom: function(arg, tbl) {
    var self = DebugJS.self;
    arg = arg.replace(/\s{2,}/g, ' ');
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      var a = arg.match(/([^\s]{1,})\s{0,}(.*)/);
      if (a == null) {
        DebugJS.printUsage(tbl.usage);
      } else {
        var zoom = a[1];
        if (zoom != self.options.zoom) {
          var restoreOption = {
            'cause': DebugJS.INIT_CAUSE_ZOOM,
            'status': self.status
          };
          self.closeFeatures();
          self.setWindowSize('normal');
          self.init({'zoom': zoom}, restoreOption);
        }
      }
    }
  },

  execDecodeAndEncode: function(arg, tbl, decodeFunc, encodeFunc) {
    var arg1 = DebugJS.omitLeadingWhiteSpace(arg);
    var args = arg1.match(/(-d|-e)?\s(.*)/);
    var argNoWhiteSpace = DebugJS.omitAllWhiteSpace(arg);
    if ((argNoWhiteSpace == '') || (((argNoWhiteSpace == '-d') || (argNoWhiteSpace == '-e')) && (args == null))) {
      DebugJS.printUsage(tbl.usage);
    } else {
      try {
        var result;
        if (args == null) {
          result = encodeFunc(arg);
        } else if (args[1] == '-d') {
          result = decodeFunc(args[2]);
          result = DebugJS.encloseStringIfNeeded(result);
        } else if (args[1] == '-e') {
          result = encodeFunc(args[2]);
        } else {
          result = encodeFunc(arg);
        }
        DebugJS.log.res(result);
      } catch (e) {
        DebugJS.log.e(e);
      }
    }
  },

  httpRequest: function(arg, tbl, method) {
    var self = DebugJS.self;
    var argNoWhiteSpace = DebugJS.omitAllWhiteSpace(arg);
    if (argNoWhiteSpace == '') {
      DebugJS.printUsage(tbl.usage);
    }
    args = self.splitCmdLineInTwo(arg);
    var url = args[0];
    var data = args[1];
    data = DebugJS.encodeURIString(data);
    DebugJS.doHttpRequest(url, method, data);
  },

  initExtention: function() {
    var self = DebugJS.self;
    if (DebugJS.x.CMD_TBL) {
      for (var i = 0; i < DebugJS.x.CMD_TBL.length; i++) {
        self.CMD_TBL.push(DebugJS.x.CMD_TBL[i]);
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
  },

  set: function(index, data) {
    this.buffer[index] = data;
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

DebugJS.omitAllWhiteSpace = function(str) {
  return str.replace(/\s/g, '');
};

DebugJS.omitLeadingWhiteSpace = function(str) {
  return str.replace(/^\s{1,}/, '');
};

DebugJS.omitTrailingWhiteSpace = function(str) {
  return str.replace(/\s+$/, '');
};

DebugJS.omitLeadingAndTrailingWhiteSpace = function(str) {
  str = str.replace(/^\s{1,}/, '');
  str = str.replace(/\s+$/, '');
  return str;
};

DebugJS.encloseString = function(str) {
  return '<span style="color:#0ff;">"</span>' + str + '<span style="color:#0ff;">"</span>';
};

DebugJS.encloseStringIfNeeded = function(str) {
  str += '';
  if ((str.match(/^\s|^&#x3000/)) || (str.match(/\s$|&#x3000$/))) {
    str = DebugJS.encloseString(str);
  }
  return str;
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

  var dateTime = {'yyyy': yyyy, 'mm': mm, 'dd': dd, 'hh': hh, 'mi': mi, 'ss': ss, 'sss': ms, 'wday': wd};
  return dateTime;
};

DebugJS.getCurrentDateTime = function() {
  return DebugJS.getDateTime(new Date());
};

DebugJS.getLogTime = function() {
  var d = DebugJS.getCurrentDateTime();
  var t = d.hh + ':' + d.mi + ':' + d.ss + '.' + d.sss;
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

DebugJS.execCmdP = function(arg) {
  var args = arg.split(' ');
  var opt = args[0].match(/-l(\d+)/);
  var start = 0;
  var levelLimit = 0;
  var noMaxLimit = false;
  if (opt != null) {
    start = 1;
    levelLimit = opt[1];
  } else {
    if (args[0] == '-a') {
      start = 1;
      noMaxLimit = true;
    }
  }
  for (var i = start, len = args.length; i < len; i++) {
    if (args[i] == '') continue;
    var cmd = 'DebugJS.buf="' + args[i] + ' = ";DebugJS.buf+=DebugJS.objDump(' + args[i] + ', false, ' + levelLimit + ', ' + noMaxLimit + ');DebugJS.log.mlt(DebugJS.buf);';
    try {
      eval(cmd);
    } catch (e) {
      DebugJS.log.e(e);
    }
  }
};

DebugJS.INDENT_SP = ' ';
DebugJS.objDump = function(obj, toJson, levelLimit, noMaxLimit) {
  if (levelLimit == undefined) {
    levelLimit = 0;
  }
  var arg = {'lv': 0, 'cnt': 0, 'dump': ''};
  if (typeof obj === 'function') {
    arg.dump += '<span style="color:#4c4;">function</span>()\n';
  }
  var ret = DebugJS._objDump(obj, arg, toJson, levelLimit, noMaxLimit);
  if ((!noMaxLimit) && (ret.cnt >= DebugJS.self.properties.dumplimit.value)) {
    DebugJS.log.w('The object is too large. (>=' + ret.cnt + ')');
  }
  ret.dump = ret.dump.replace(/: {2,}\{/g, ': {');
  ret.dump = ret.dump.replace(/\[\n {2,}\]/g, '\[\]');
  return ret.dump;
};

DebugJS._objDump = function(obj, arg, toJson, levelLimit, noMaxLimit) {
  try {
    if ((levelLimit >= 1) && (arg.lv > levelLimit)) {
      return arg;
    }
    if ((!noMaxLimit) && (arg.cnt >= DebugJS.self.properties.dumplimit.value)) {
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
        arg.dump += '[';
        if (obj.length > 0) {
          arg.dump += '\n';
        }
        indent += DebugJS.INDENT_SP;
      } else {
        arg.dump += '<span style="color:#c08;">[Array][' + obj.length + ']</span>';
      }
      if ((levelLimit == 0) || ((levelLimit >= 1) && (arg.lv < levelLimit))) {
        var sibling = 0;
        for (var i in obj) {
          if (sibling > 0) {
            if (toJson) {
              arg.dump += ',\n';
            }
          }
          arg.lv++; indent += DebugJS.INDENT_SP;
          if (!toJson) {
            arg.dump += '\n' + indent + '[' + i + '] ';
          }
          arg = DebugJS._objDump(obj[i], arg, toJson, levelLimit, noMaxLimit);
          arg.lv--; indent = indent.replace(DebugJS.INDENT_SP, '');
          sibling++;
        }
        if (toJson) {
          indent = indent.replace(DebugJS.INDENT_SP, '');
          if (sibling > 0) {
            arg.dump += '\n';
          }
          if (obj.length > 0) {
            arg.dump += indent;
          }
          arg.dump += ']';
        }
      }
    } else if (obj instanceof Object) {
      arg.cnt++;
      if (typeof obj !== 'function') {
        if (toJson) {
          arg.dump += indent;
        } else {
          arg.dump += '<span style="color:#49f;">[Object]</span> ';
        }
        if ((levelLimit == 0) || ((levelLimit >= 1) && (arg.lv < levelLimit))) {
          arg.dump += '{\n';
        }
      }

      if ((levelLimit == 0) || ((levelLimit >= 1) && (arg.lv < levelLimit))) {
        indent += DebugJS.INDENT_SP;
        var sibling = 0;
        for (var key in obj) {
          if (sibling > 0) {
            if (toJson) {
              arg.dump += ',';
            }
            arg.dump += '\n';
          }

          if (typeof obj[key] === 'function') {
            arg.dump += indent + '<span style="color:#4c4;">function</span>';
            if (obj[key].toString().match(/\[native code\]/)) {
              arg.dump += ' [native]';
            }
            arg.dump += ' ' + key + '()';
            arg.cnt++;
            if ((levelLimit == 0) || ((levelLimit >= 1) && ((arg.lv + 1) < levelLimit))) {
              if (Object.keys(obj[key]).length > 0) {
                arg.dump += ' {\n';
              }
            }
          } else if (Object.prototype.toString.call(obj[key]) === '[object Date]') {
            arg.dump += indent;
            if (toJson) {arg.dump += '"';}
            arg.dump += key;
            if (toJson) {arg.dump += '"';}
            var dt = DebugJS.getDateTime(obj[key]);
            var date = dt.yyyy + '-' + dt.mm + '-' + dt.dd + '(' + DebugJS.WDAYS[dt.wday] + ') ' + dt.hh + ':' + dt.mi + ':' + dt.ss + '.' + dt.sss;
            arg.dump += ': <span style="color:#f80;">[Date]</span> ' + date;
            sibling++;
            continue;
          } else if (obj[key] instanceof ArrayBuffer) {
            arg.dump += indent;
            if (toJson) {arg.dump += '"';}
            arg.dump += key;
            if (toJson) {arg.dump += '"';}
            arg.dump += ': <span style="color:#d4c;">[ArrayBuffer]</span> (byteLength = ' + obj[key].byteLength + ')';
            sibling++;
            continue;
          } else {
            arg.dump += indent;
            if (toJson) {arg.dump += '"';}
            arg.dump += key;
            if (toJson) {arg.dump += '"';}
            arg.dump += ': ';
          }
          arg.lv++;
          arg = DebugJS._objDump(obj[key], arg, toJson, levelLimit, noMaxLimit);
          arg.lv--;
          if (typeof obj[key] === 'function') {
            if ((levelLimit == 0) || ((levelLimit >= 1) && ((arg.lv + 1) < levelLimit))) {
              if (Object.keys(obj[key]).length > 0) {
                arg.dump += '\n' + indent + '}';
              }
            }
          }
          sibling++;
        }
        indent = indent.replace(DebugJS.INDENT_SP, '');
        if (typeof obj !== 'function') {
          arg.dump += '\n' + indent + '}';
        }
      }
    } else if (obj === null) {
      if (toJson) {
        arg.dump += 'null';
      } else {
        arg.dump += '<span style="color:#ccc;">null</span>';
      }
      arg.cnt++;
    } else if (obj === undefined) {
      if (toJson) {
        arg.dump += 'undefined';
      } else {
        arg.dump += '<span style="color:#ccc;">undefined</span>';
      }
      arg.cnt++;
    } else if (typeof obj === 'string') {
      var str = obj.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      arg.dump += '"' + str + '"'; arg.cnt++;
    } else {
      arg.dump += obj; arg.cnt++;
    }
  } catch (e) {
    arg.dump += '<span style="color:#f66;">parse error: ' + e + '</span>'; arg.cnt++;
  }
  return arg;
};

DebugJS.getKeys = function(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
};

DebugJS.getKeysStr = function(obj) {
  var keys = '';
  for (var key in obj) {
    keys += key + '\n';
  }
  return keys;
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

DebugJS.execCmdJson = function(json, flg) {
  try {
    var j = JSON.parse(json);
    var levelLimit = 0;
    var jsn = DebugJS.objDump(j, flg, levelLimit);
    DebugJS.log.mlt(jsn);
  } catch (e) {
    DebugJS.log.e('JSON format error.');
    var detail = DebugJS.checkJson(json);
    DebugJS.log.e(detail);
  }
};

DebugJS.checkJson = function(json) {
  var self = DebugJS.self;
  json = DebugJS.omitLeadingAndTrailingWhiteSpace(json);
  var wkJson = json.split('\\');
  var cnt = 0;
  var result = '';
  for (var i = 0; i < wkJson.length; i++) {
    if (wkJson[i] == '') {
      cnt++;
    } else {
      if (i == 0) {
        result += wkJson[i];
        continue;
      }
      if (cnt >= 1) {
        result += '\\';
        for (var j = 0; j < (cnt - 1); j++) {
          result += '\\';
        }
        if (cnt % 2 == 0) {
          result += '<span class="' + self.id + '-txt-hl">\\</span>';
        } else {
          result += '\\';
        }
        result += wkJson[i];
        cnt = 0;
      } else {
        if (wkJson[i].match(/^n|^r|^t|^b|^"/)) {
          result += '\\' + wkJson[i];
        } else {
          result += '<span class="' + self.id + '-txt-hl">\\</span>' + wkJson[i];
        }
      }
    }
  }
  result = result.replace(/\t/g, '<span class="' + self.id + '-txt-hl">\\t</span>');
  result = result.replace(/\r\n/g, '<span class="' + self.id + '-txt-hl">\\r\\n</span>');
  result = result.replace(/([^\\])\r/g, '$1<span class="' + self.id + '-txt-hl">\\r</span>');
  result = result.replace(/([^\\])\n/g, '$1<span class="' + self.id + '-txt-hl">\\n</span>');
  if (!result.match(/^{/)) {
    result = '<span class="' + self.id + '-txt-hl"> </span>' + result;
  }
  result = result.replace(/}([^}]+)$/, '}<span class="' + self.id + '-txt-hl">$1</span>');
  if (!result.match(/}$/)) {
    result = result + '<span class="' + self.id + '-txt-hl"> </span>';
  }
  return result;
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

DebugJS.convRadixFromHEX = function(v16) {
  var v10 = parseInt(v16, 16).toString(10);
  var v2 = parseInt(v16, 16).toString(2);
  hex = DebugJS.formatHex(v16, false, true);
  if (hex.length >= 2) {
    hex = '0x' + hex;
  }
  var res = 'HEX ' + hex + '\n' +
  'DEC ' + DebugJS.formatDec(v10) + '\n' +
  'BIN ' + DebugJS.formatBin(v2, true, true, DebugJS.FORMAT_BIN_DIGITS_THRESHOLD) + '\n';
  DebugJS.log.mlt(res);
};

DebugJS.convRadixFromDEC = function(v10) {
  var v2 = parseInt(v10).toString(2);
  var v16 = parseInt(v10).toString(16);
  hex = DebugJS.formatHex(v16, false, true);
  if (hex.length >= 2) {
    hex = '0x' + hex;
  }
  var res = 'DEC ' + DebugJS.formatDec(v10) + '\n' +
  'HEX ' + hex + '<br>' +
  'BIN ' + DebugJS.formatBin(v2, true, true, DebugJS.FORMAT_BIN_DIGITS_THRESHOLD) + '\n';
  DebugJS.log.mlt(res);
};

DebugJS.convRadixFromBIN = function(v2) {
  var v10 = parseInt(v2, 2).toString(10);
  var v16 = parseInt(v2, 2).toString(16);
  hex = DebugJS.formatHex(v16, false, true);
  if (hex.length >= 2) {
    hex = '0x' + hex;
  }
  var res = 'BIN ' + DebugJS.formatBin(v2, true, true, DebugJS.FORMAT_BIN_DIGITS_THRESHOLD) + '\n' +
  'DEC ' + DebugJS.formatDec(v10) + '\n' +
  'HEX ' + hex + '\n';
  DebugJS.log.mlt(res);
};

DebugJS.convRadixDECtoHEX = function(v10, upper) {
  var v16 = parseInt(v10).toString(16);
  if (upper) {
    v16 = v16.toUpperCase();
  }
  return v16;
};

DebugJS.formatBin = function(v2, grouping, digits, n) {
  var len = v2.length;
  var bin = '';
  if (grouping) {
    for (var i = 0; i < len; i++) {
      if ((i != 0) && ((len - i) % 4 == 0)) {
        bin += ' ';
      }
      bin += v2.charAt(i);
    }
  } else {
    bin = v2;
  }
  if (digits) {
    if (!n) n = 0;
    if (len >= n) {
      bin += ' (' + len + ' bits)';
    }
  }
  return bin;
};

DebugJS.formatDec = function(v10) {
  v10 += '';
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

DebugJS.formatHex = function(v16, prefix, upper) {
  var hex = v16;
  if (upper) {
    hex = v16.toUpperCase();
  }
  if (prefix) {
    hex = '0x' + hex;
  }
  return hex;
};

DebugJS.encodeBase64 = function(str) {
  var encoded = '';
  try {
    encoded = btoa(str);
  } catch (e) {
    encoded = btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  return encoded;
};

DebugJS.decodeBase64 = function(str) {
  var decoded = '';
  try {
    decoded = decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    decoded = atob(str);
  }
  return decoded;
};

DebugJS.decodeUnicode = function(arg) {
  var str = '';
  var args = arg.split(' ');
  for (var i = 0, len = args.length; i < len; i++) {
    if (args[i] == '') continue;
    var codePoint = args[i].replace(/^U\+/i, '');
    if (codePoint == '20') {
      str += ' ';
    } else {
      str += '&#x' + codePoint;
    }
  }
  return str;
};

DebugJS.encodeUnicode = function(str) {
  var code = '';
  for (var i = 0, len = str.length; i < len; i++) {
    var point = str.charCodeAt(i);
    if (i > 0) {
      code += ' ';
    }
    code += 'U+' + DebugJS.convRadixDECtoHEX(point, true);
  }
  return code;
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

DebugJS.timeLog = function(msg, timerName) {
  var now = new Date();
  var self = DebugJS.self;

  if (!timerName) {
    timerName = DebugJS.DEFAULT_TIMER_NAME;
  }

  var t;
  if (self.timers[timerName]) {
    t = DebugJS.getElapsedTimeStr(self.timers[timerName].start, now);
  } else {
    self.timers[timerName] = {};
    self.timers[timerName].start = (new Date());
    t = '00:00:00.000';
  }

  var dt = '<span style="color:' + self.options.timerColor + ';">' + t + '</span>';

  var dtLap = '';
  if (self.timers[timerName].split) {
    var tLap = DebugJS.getElapsedTimeStr(self.timers[timerName].split, now);
    dtLap = '<span style="color:' + self.options.timerColor + ';">' + tLap + '</span>';
  }

  var str = dt + ' ' + msg.replace(/%n/g, timerName).replace(/%lt/g, dtLap).replace(/%t/g, dt);
  DebugJS.log(str);
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

DebugJS.doHttpRequest = function(url, method, data, async, cache, user, password) {
  if ((data == undefined) || (data == '')) data = null;
  if (async == undefined) async = false;
  if (user == undefined) user = '';
  if (password == undefined) password = '';
  if (method == 'GET') {
    if ((data != null) && (data != '')) {
      if (url.match(/\?/)) {
        url += '&' + data;
      } else {
        url += '?' + data;
      }
    }
  }

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      DebugJS.onHttpRequestDone(xhr);
    }
  };

  var req = 'Sending a ' + method + ' request.\n' +
  'URL : ' + url + '\n' +
  'Body: ' + ((data == null) ? '<span style="color:#ccc;">null</span>' : data);
  DebugJS.log(req);

  try {
    xhr.open(method, url, async, user, password);
    if (!cache) {
      xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT');
    }

    //var userAgent = 'Mozilla/5.0 (' + navigator.platform + ') DebugJS/1.0';
    //xhr.setRequestHeader('User-Agent', userAgent);

    xhr.send(data);
  } catch (e) {
    DebugJS.log.e(e);
    var baseURI = document.baseURI;
    var regexp = new RegExp('^' + baseURI + '(.*?)');
    if (!url.match(regexp)) {
      DebugJS.log.w('Cross-Origin Request\nsource : ' + baseURI + '\nrequest: ' + url);
    }
  }
};

DebugJS.onHttpRequestDone = function(xhr) {
  var statusMsg = xhr.status + ' ' + xhr.statusText;
  if (xhr.status == 0) {
    DebugJS.log.e('cannot load: ' + statusMsg);
  } else if ((xhr.status >= 300) && (xhr.status <= 399)) {
    DebugJS.log.w(statusMsg);
  } else if ((xhr.status >= 400) && (xhr.status <= 599)) {
    DebugJS.log.e(statusMsg);
  } else {
    DebugJS.log(statusMsg);
  }
  var head = xhr.getAllResponseHeaders();
  var txt = xhr.responseText.replace(/</g, '&lt;');
  txt = txt.replace(/>/g, '&gt;');
  if (head || txt) {
    var res = '<span style="color:#5ff">' + head + '</span>' + txt;
    DebugJS.log.mlt(res);
  }
};

DebugJS.encodeURIString = function(data) {
  var encData = encodeURIComponent(data);
  encData = encData.replace(/%20/g, '+');
  encData = encData.replace(/%3D/gi, '=');
  encData = encData.replace(/%26/g, '&');
  return encData;
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

DebugJS.trimDownText = function(text, maxLen, style) {
  var snip = '...';
  if (style) {
    snip = '<span style="' + style + '">' + snip + '</span>';
  }
  var str = text;
  if (text.length > maxLen) {
    str = DebugJS.substr(str, maxLen) + snip;
  }
  return str;
};

DebugJS.trimDownText2 = function(text, maxLen, omitpart, style) {
  var snip = '...';
  if (style) {
    snip = '<span style="' + style + '">' + snip + '</span>';
  }
  var str = text.replace(/(\r?\n|\r)/g, ' ').replace(/\t/g, ' ').replace(/\s{2,}/g, ' ');
  if (text.length > maxLen) {
    switch (omitpart) {
      case DebugJS.OMIT_FIRST:
        str = DebugJS.substr(str, (maxLen * (-1)));
        str = snip + DebugJS.escapeTag(str);
        break;
      case DebugJS.OMIT_MID:
        var firstLen = maxLen / 2;
        var latterLen = firstLen;
        if ((maxLen % 2) != 0) {
          firstLen = Math.floor(firstLen);
          latterLen = firstLen + 1;
        }
        var firstText = DebugJS.substr(str, firstLen);
        var latterText = DebugJS.substr(str, (latterLen * (-1)));
        str = DebugJS.escapeTag(firstText) + snip + DebugJS.escapeTag(latterText);
        break;
      default:
        str = DebugJS.substr(str, maxLen);
        str = DebugJS.escapeTag(str) + snip;
        break;
    }
  }
  return str;
};

DebugJS.setStyleIfObjNotAvailable = function(obj, exceptFalse) {
  var self = DebugJS.self;
  var text = obj;
  if ((exceptFalse && ((obj == undefined) || (obj == null))) || ((!exceptFalse) && (obj !== 0) && (!obj))) {
    text = '<span class="' + self.id + '-unavailable">' + obj + '</span>';
  }
  return text;
};

DebugJS.escapeTag = function(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

DebugJS.addClass = function(el, className) {
  if (el.className == '') {
    el.className = className;
  } else {
    el.className += ' ' + className;
  }
};

DebugJS.removeClass = function(el, className) {
  var orgClassName = el.className;
  var regexp = new RegExp('\\s*' + className, 'g');
  var newClassName = orgClassName.replace(regexp, '');
  newClassName = newClassName.replace(/\s+$/, '');
  newClassName = newClassName.replace(/^\s+/, '');
  el.className = newClassName;
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

DebugJS.export = function(o) {
  DebugJS.obj = o;
  if (DebugJS._AVAILABLE) _ = DebugJS.obj;
  DebugJS.log.s('An object has been exported to <span style="color:' + DebugJS.KEYWORD_COLOR + '">' + ((dbg == DebugJS) ? 'dbg' : 'DebugJS') + '.obj</span>' + (DebugJS._AVAILABLE ? ', <span style="color:' + DebugJS.KEYWORD_COLOR + '">_</span>' : ''));
};

DebugJS.onLoad = function() {
  if (!window._) DebugJS._AVAILABLE = true;
  if (typeof window.localStorage != 'undefined') {
    DebugJS.LS_AVAILABLE = true;
  }
  DebugJS._init();
};

DebugJS.onError = function(e) {
  var self = DebugJS.self;
  var msg;
  self.errStatus |= DebugJS.ERR_STATE_SCRIPT;
  if ((e.error) && (e.error.stack)) {
    msg = e.error.stack;
  } else {
    if ((e.message == undefined) && (e.filename == undefined)) {
      if ((e.target) && (e.target.outerHTML)) {
        self.errStatus |= DebugJS.ERR_STATE_LOAD;
        self.errStatus &= ~DebugJS.ERR_STATE_SCRIPT;
        msg = 'LOAD_ERROR: ' + (e.target.outerHTML).replace(/</g, '&lt;').replace(/>/g, '&gt;');
      } else {
        msg = 'UNKNOWN_ERROR';
      }
    } else {
      msg = e.message + ' ' + e.filename + '(' + e.lineno + ':' + e.colno + ')';
    }
  }
  DebugJS.log.e(msg);
  self.showDebugWindowOnError();
};

DebugJS.log = function(m) {
  if (m instanceof Object) {
    DebugJS.log.p(m, 0);
  } else {
    DebugJS.log.out(m, DebugJS.LOG_TYPE_STD);
  }
};

DebugJS.log.e = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_ERR);
};

DebugJS.log.w = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_WRN);
};

DebugJS.log.i = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_INF);
};

DebugJS.log.d = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_DBG);
};

DebugJS.log.s = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_SYS);
};

DebugJS.log.p = function(o, l, m) {
  var str = (m ? m : '') + '\n' + DebugJS.objDump(o, false, l, false);
  DebugJS.log.out(str, DebugJS.LOG_TYPE_STD);
};

DebugJS.log.res = function(m) {
  var self = DebugJS.self;
  m = DebugJS.setStyleIfObjNotAvailable(m);
  m = DebugJS.encloseStringIfNeeded(m);
  var msg = '<span style="color:' + self.options.promptColor + ';">&gt;</span> ' + m;
  DebugJS.log(msg);
};

DebugJS.log.res.err = function(m) {
  var self = DebugJS.self;
  m = DebugJS.setStyleIfObjNotAvailable(m);
  m = DebugJS.encloseStringIfNeeded(m);
  var msg = '<span style="color:' + self.options.promptColorE + ';">&gt;</span> ' + m;
  DebugJS.log(msg);
};

DebugJS.log.mlt = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_MLT);
};

DebugJS.log.out = function(msg, type) {
  if (msg != null) {
    var data = {'type': type, 'time': DebugJS.getLogTime(), 'msg': msg};
    DebugJS.self.msgBuf.add(data);
  }
  if (!(DebugJS.self.status & DebugJS.STATE_INITIALIZED)) {
    if (!DebugJS._init()) {return;}
  }
  DebugJS.self.printLogMessage();
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

DebugJS.msg = function(val) {
  DebugJS.self.setMsg(val);
};

DebugJS.msg.clear = function() {
  DebugJS.self.setMsg('');
};

DebugJS.random = function(min, max) {
  return DebugJS.getRandom(DebugJS.RANDOM_TYPE_NUM, min, max);
};

DebugJS.random.string = function(min, max) {
  return DebugJS.getRandom(DebugJS.RANDOM_TYPE_STR, min, max);
};

DebugJS._init = function() {
  if (!(DebugJS.self.status & DebugJS.STATE_INITIALIZED)) {
    return DebugJS.self.init(null, null);
  } else {
    return true;
  }
};

DebugJS.init = function(options) {
  DebugJS.self.init(options, null);
};
// ---- ---- ---- ---- ---- ---- ---- ----
var log = function(m) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log(m);
};

log.e = function(m) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  var self = DebugJS.self;
  DebugJS.log.e(m);
  self.errStatus |= DebugJS.ERR_STATE_LOG;
  self.showDebugWindowOnError();
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

log.t = function(m, n) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.timeLog(m, n);
};

log.p = function(o, l, m) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.p(o, l, m);
};

log.res = function(m) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.res(m);
};

log.res.err = function(m) {
  if (DebugJS.self.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.res.err(m);
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
DebugJS.x = DebugJS.x || {};
DebugJS.self = DebugJS.self || new DebugJS();
if (DebugJS.ENABLE) {
  DebugJS.el = null;
  DebugJS.obj = null;
  window.addEventListener('load', DebugJS.onLoad, true);
  if (DebugJS.CATCH_ALL_ERRORS) {
    window.addEventListener('error', DebugJS.onError, true);
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
  log.p = function(x, xx, xxx) {};
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
