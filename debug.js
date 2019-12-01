/*!
 * debug.js
 * Copyright 2015 Takashi Harano
 * Released under the MIT license
 * https://debugjs.net/
 */
var DebugJS = DebugJS || function() {
  this.v = '201912012100';

  this.DEFAULT_OPTIONS = {
    visible: false,
    keyAssign: {
      key: 113,
      shift: undefined,
      ctrl: undefined,
      alt: undefined,
      meta: undefined
    },
    focusOnShow: false,
    autoPopup: {
      scriptError: true,
      loadError: true,
      error: true,
      fatal: true
    },
    lines: 18,
    bufsize: 300,
    width: 543,
    zoom: 1,
    position: 'se',
    adjX: 20,
    adjY: 20,
    fontSize: 12,
    fontFamily: 'Consolas, Monaco, Menlo, monospace, sans-serif',
    fontColor: '#fff',
    logColorV: '#99bcc8',
    logColorD: '#ccc',
    logColorI: '#9ef',
    logColorW: '#eee000',
    logColorE: '#f88',
    logColorF: '#f80',
    logColorS: '#fff',
    clockColor: '#8f0',
    timerColor: '#9ef',
    timerColorExpr: '#fcc',
    sysInfoColor: '#ddd',
    btnColor: '#6cf',
    btnHoverColor: '#8ef',
    promptColor: '#0cf',
    promptColorE: '#f45',
    background: 'rgba(0,0,0,0.65)',
    border: 'solid 1px #888',
    borderRadius: '0',
    opacity: '1',
    showLineNums: true,
    showTimeStamp: true,
    resizable: true,
    togglableShowHide: true,
    useClock: true,
    useClearButton: true,
    useSuspendLogButton: true,
    usePinButton: true,
    useWinCtrlButton: true,
    useStopwatch: true,
    useDeviceInfo: true,
    useLed: true,
    useMsgDisplay: true,
    msgDisplayBackground: 'rgba(0,0,0,0.2)',
    useScreenMeasure: true,
    useSystemInfo: true,
    useHtmlSrc: true,
    useElementInfo: true,
    useTools: true,
    useJsEditor: true,
    useLogFilter: true,
    useCommandLine: true,
    cmdHistoryMax: 100,
    timerLineColor: '#0cf',
    disableAllCommands: false,
    disableAllFeatures: false,
    mode: '',
    lockCode: null,
    elmId: null
  };
  this.DFLT_ELM_ID = '_debug_';
  this.id = null;
  this.bodyEl = null;
  this.cursor = '';
  this.styleEl = null;
  this.win = null;
  this.winBody = null;
  this.headPanel = null;
  this.infoPanel = null;
  this.clockLabel = null;
  this.clockTmId = 0;
  this.clockUpdIntHCnt = 0;
  this.clockUpdInt = DebugJS.UPDATE_INTERVAL_L;
  this.measBtn = null;
  this.measBox = null;
  this.sysInfoBtn = null;
  this.sysInfoPanel = null;
  this.htmlSrcBtn = null;
  this.htmlSrcPanel = null;
  this.htmlSrcHdrPanel = null;
  this.htmlSrcUpdInpLbl = null;
  this.htmlSrcUpdInpLbl2 = null;
  this.htmlSrcUpdBtn = null;
  this.htmlSrcUpdInput = null;
  this.htmlSrcBodyPanel = null;
  this.htmlSrcUpdInterval = 0;
  this.htmlSrcUpdTimerId = 0;
  this.elmInfoBtn = null;
  this.elmInfoPanel = null;
  this.elmInfoHdrPanel = null;
  this.elmPrevBtn = null;
  this.elmTitle = null;
  this.elmNextBtn = null;
  this.elmSelectBtn = null;
  this.elmHighlightBtn = null;
  this.elmUpdBtn = null;
  this.elmCapBtn = null;
  this.elmDelBtn = null;
  this.elmUpdInput = null;
  this.elmNumPanel = null;
  this.elmInfoBodyPanel = null;
  this.elmInfoStatus = DebugJS.ELMINFO_ST_SELECT | DebugJS.ELMINFO_ST_HIGHLIGHT;
  this.elmUpdInterval = 0;
  this.elmUpdTimerId = 0;
  this.elmInfofoldingSt = {text: false, allStyles: false, elBorder: false, elValue: false, elSrc: false, htmlSrc: false};
  this.tgtEl = null;
  this.toolsBtn = null;
  this.toolsPanel = null;
  this.toolsHdrPanel = null;
  this.toolsBodyPanel = null;
  this.timerBtn = null;
  this.timerBasePanel = null;
  this.timerClockSubPanel = null;
  this.timerClockLabel = null;
  this.timerClockSSS = false;
  this.clockSSSbtn = null;
  this.timerSwCuSubPanel = null;
  this.timerSwCuLabel = null;
  this.timerSwCdSubPanel = null;
  this.timerSwCdLabel = null;
  this.timerSwCdInpSubPanel = null;
  this.timerSwCdInput = null;
  this.timerExpTime = 0;
  this.timerSwTimeCd = 0;
  this.timerSwTimeCdContinue = false;
  this.timerStartStopBtnCu = null;
  this.timerSplitBtnCu = null;
  this.timerStartStopBtnCd = null;
  this.timerSplitBtnCd = null;
  this.timer0CntBtnCd1 = null;
  this.timer0CntBtnCd2 = null;
  this.timerStartStopBtnCdInp = null;
  this.txtChkBtn = null;
  this.txtChkPanel = null;
  this.txtChkTxt = null;
  this.txtChkFontSizeRange = null;
  this.txtChkFontSizeInput = null;
  this.txtChkFontSizeUnitInput = null;
  this.txtChkFontWeightRange = null;
  this.txtChkFontWeightLabel = null;
  this.txtChkInputFgRGB = null;
  this.txtChkRangeFgR = null;
  this.txtChkRangeFgG = null;
  this.txtChkRangeFgB = null;
  this.txtChkLabelFgR = null;
  this.txtChkLabelFgG = null;
  this.txtChkLabelFgB = null;
  this.txtChkInputBgRGB = null;
  this.txtChkRangeBgR = null;
  this.txtChkRangeBgG = null;
  this.txtChkRangeBgB = null;
  this.txtChkLabelBgR = null;
  this.txtChkLabelBgG = null;
  this.txtChkLabelBgB = null;
  this.txtChkTargetEl = null;
  this.txtChkItalic = false;
  this.fileVwrMode = 'b64';
  this.fileVwrBtn = null;
  this.fileVwrPanel = null;
  this.fileInput = null;
  this.fileVwrLabelB64 = null;
  this.fileVwrRadioB64 = null;
  this.fileVwrLabelBin = null;
  this.fileVwrRadioBin = null;
  this.fileCopyBtn = null;
  this.fileClrBtn = null;
  this.fileVwrFooter = null;
  this.fileLoadProgBar = null;
  this.fileLoadProg = null;
  this.fileLoadCancelBtn = null;
  this.filePreviewWrapper = null;
  this.filePreview = null;
  this.fileVwrDtUrlWrp = null;
  this.fileVwrDtUrlScheme = null;
  this.fileVwrDtTxtArea = null;
  this.fileVwrDecMode = 'b64';
  this.fileVwrDecModeBtn = null;
  this.fileVwrRet = null;
  this.fileVwrBSB64n = null;
  this.fileVwrBSB64nL = null;
  this.fileVwrB64Btn = null;
  this.fileVwrBsbBtn = null;
  this.fileVwrDataSrcType = null;
  this.fileVwrFile = null;
  this.fileVwrFileInfo = null;
  this.fileVwrBinInfo = null;
  this.fileVwrCtt = null;
  this.fileVwrDataSrc = null;
  this.fileVwrByteArray = null;
  this.fileVwrBinViewOpt = {mode: 'hex', addr: true, space: true, ascii: true};
  this.fileVwrSysCb = null;
  this.fileReader = null;
  this.decMode = 'b64';
  this.jsBtn = null;
  this.jsPanel = null;
  this.jsEditor = null;
  this.jsBuf = '';
  this.htmlPrevBtn = null;
  this.htmlPrevBasePanel = null;
  this.htmlPrevPrevPanel = null;
  this.htmlPrevEditorPanel = null;
  this.htmlPrevEditor = null;
  this.htmlPrevBuf = '';
  this.batBtn = null;
  this.batBasePanel = null;
  this.batEditorPanel = null;
  this.batTextEditor = null;
  this.batTxtSt = null;
  this.batRunBtn = null;
  this.batStopBtn = null;
  this.batResumeBtn = null;
  this.batStartTxt = null;
  this.batEndTxt = null;
  this.batArgTxt = null;
  this.batCurPc = null;
  this.batTotalLine = null;
  this.batNestLv = null;
  this.swBtnPanel = null;
  this.swLabel = null;
  this.clearBtn = null;
  this.wdBtn = null;
  this.suspendLogBtn = null;
  this.preserveLogBtn = null;
  this.pinBtn = null;
  this.clpBtn = null;
  this.winCtrlBtnPanel = null;
  this.closeBtn = null;
  this.mousePosLabel = null;
  this.mousePos = {x: '-', y: '-'};
  this.mouseClickLabel = null;
  this.mouseClick0 = DebugJS.COLOR_INACT;
  this.mouseClick1 = DebugJS.COLOR_INACT;
  this.mouseClick2 = DebugJS.COLOR_INACT;
  this.winSizeLabel = null;
  this.clientSizeLabel = null;
  this.bodySizeLabel = null;
  this.pixelRatioLabel = null;
  this.scrollPosLabel = null;
  this.scrollPosX = 0;
  this.scrollPosY = 0;
  this.keyLabelDw = null;
  this.keyLabelPr = null;
  this.keyLabelUp = null;
  this.keyCodeDw = DebugJS.KEY_ST_DFLT;
  this.keyCodePr = DebugJS.KEY_ST_DFLT;
  this.keyCodeUp = DebugJS.KEY_ST_DFLT;
  this.ledPanel = null;
  this.led = 0;
  this.msgLabel = null;
  this.msgStr = '';
  this.mainPanel = null;
  this.overlayBasePanel = null;
  this.overlayPanels = [];
  this.logHdrPanel = null;
  this.fltrBtnAll = null;
  this.fltrBtnStd = null;
  this.fltrBtnVrb = null;
  this.fltrBtnDbg = null;
  this.fltrBtnInf = null;
  this.fltrBtnWrn = null;
  this.fltrBtnErr = null;
  this.fltrBtnFtl = null;
  this.dtBtn = null;
  this.fltrInputLabel = null;
  this.fltrInput = null;
  this.fltrText = '';
  this.fltr = false;
  this.fltrBtn = null;
  this.fltrCase = false;
  this.fltrCaseBtn = null;
  this.fltrTxtHtml = true;
  this.fltrTxtHtmlBtn = null;
  this.logPanel = null;
  this.logPanelHeightAdjust = '';
  this.cmdPanel = null;
  this.cmdLine = null;
  this.preventErrCb = false;
  this.cmdHistoryBuf = null;
  this.CMD_HISTORY_MAX = this.DEFAULT_OPTIONS.cmdHistoryMax;
  this.cmdHistoryIdx = this.CMD_HISTORY_MAX;
  this.cmdTmp = '';
  this.cmdEchoFlg = true;
  this.cmdDelayData = {tmid: 0, cmd: null};
  this.cmdListeners = [];
  this.timers = {};
  this.initWidth = 0;
  this.initHeight = 0;
  this.orgSizePos = {w: 0, h: 0, t: 0, l: 0};
  this.orgSizePos2 = {w: 0, h: 0, t: 0, l: 0, zm: 1};
  this.expandModeOrg = {w: 0, h: 0, t: 0, l: 0};
  this.winExpandHeight = DebugJS.DBGWIN_EXPAND_H2 * this.DEFAULT_OPTIONS.zoom;
  this.winExpandCnt = 0;
  this.clickedPosX = 0;
  this.clickedPosY = 0;
  this.ptOfstY = 0;
  this.ptOfstX = 0;
  this.savedFunc = null;
  this.computedFontSize = this.DEFAULT_OPTIONS.fontSize;
  this.computedWidth = this.DEFAULT_OPTIONS.width;
  this.computedMinW = DebugJS.DBGWIN_MIN_W;
  this.computedMinH = DebugJS.DBGWIN_MIN_H;
  this.featStack = [];
  this.featStackBak = [];
  this.status = 0;
  this.uiStatus = 0;
  this.zoom = this.DEFAULT_OPTIONS.zoom;
  this.toolStatus = 0;
  this.toolTimerMode = DebugJS.TOOL_TMR_MODE_CLOCK;
  this.sizeStatus = 0;
  this.dndCmd = null;
  this.dndArg = null;
  this.dndRM = false;
  this.ptDnTm = 0;
  this.ptOpTm = 0;
  this.logDt = 0;
  this.logFilter = DebugJS.LOG_FLTR_ALL;
  this.toolsActvFnc = DebugJS.TOOLS_DFLT_ACTIVE_FNC;
  this.logBuf = new DebugJS.RingBuffer(this.DEFAULT_OPTIONS.bufsize);
  this.INT_CMD_TBL = [
    {cmd: 'arr2set', fn: this.cmdArr2Set, desc: 'Convert Array to Set', help: 'arr2set [-j] [-s] [-sort] Array'},
    {cmd: 'alias', fn: this.cmdAlias, desc: 'Define or display aliases', help: 'alias [name=[\'command\']]'},
    {cmd: 'base64', fn: this.cmdBase64, desc: 'Encodes/Decodes Base64', help: 'base64 [-e|-d] str'},
    {cmd: 'bat', fn: this.cmdBat, desc: 'Manipulate BAT Script', help: 'bat run [-s s] [-e e] [-arg arg]|pause|stop|list|status|pc|symbols|clear|exec b64-encoded-bat|set key val'},
    {cmd: 'bsb64', fn: this.cmdBSB64, desc: 'Encodes/Decodes BSB64 reversible encryption string', help: 'bsb64 -e|-d [-n &lt;n&gt] str'},
    {cmd: 'char', fn: this.cmdChar, desc: 'Print Unicode characters that consists of consecutive code points', help: 'char ch1 [ch2]'},
    {cmd: 'close', fn: this.cmdClose, desc: 'Close a function', help: 'close [measure|sys|html|dom|js|tool|ext]'},
    {cmd: 'clock', fn: this.cmdClock, desc: 'Open clock mode', help: 'clock [-sss] [-full]'},
    {cmd: 'cls', fn: this.cmdCls, desc: 'Clear log message', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'condwait', fn: this.cmdCondWait, desc: 'Suspends processing of batch file until condition key is set', help: 'condwait set -key key | pause [-timeout ms|1d2h3m4s500] | init'},
    {cmd: 'cookie', fn: this.cmdCookie, desc: 'Manipulate cookie', help: 'cookie keys|get|set|delete [key|-a] [val]'},
    {cmd: 'copy', fn: this.cmdCopy, desc: 'Copy to clipboard', help: 'copy "str"'},
    {cmd: 'date', fn: this.cmdDate, desc: 'Convert ms <--> Date-Time', help: 'date [ms|YYYY/MM/DD HH:MI:SS.sss] [+|-0000]'},
    {cmd: 'dbgwin', fn: this.cmdDbgWin, desc: 'Control the debug window', help: 'dbgwin show|hide|pos|size|opacity|status|lock'},
    {cmd: 'delay', fn: this.cmdDelay, desc: 'Delay command execution', help: 'delay [-c] ms|YYYYMMDDTHHMISS|1d2h3m4s500 command'},
    {cmd: 'dnd', fn: this.cmdDnd, desc: 'Drag and drop operation', help: 'dnd [-c|-r] COMMAND ARG'},
    {cmd: 'echo', fn: this.cmdEcho, desc: 'Display the ARGs on the log window'},
    {cmd: 'elements', fn: this.cmdElements, desc: 'Count elements by #id / .className / tagName', help: 'elements [#id|.className|tagName]'},
    {cmd: 'event', fn: this.cmdEvent, desc: 'Manipulate an event', help: 'event create|set|dispatch|clear type|prop value'},
    {cmd: 'exit', fn: this.cmdExit, desc: 'Close the debug window and clear all status', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'help', fn: this.cmdHelp, desc: 'Displays available command list', help: 'help command', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'history', fn: this.cmdHistory, desc: 'Displays command history', help: 'history [-c] [-d offset]', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'http', fn: this.cmdHttp, desc: 'Send an HTTP request', help: 'http [method] [-u user:pass] url [data]'},
    {cmd: 'inject', fn: this.cmdInject, desc: 'Inject a given code into a given function', help: 'inject funcname code'},
    {cmd: 'js', fn: this.cmdJs, desc: 'Operate JavaScript code in JS Editor', help: 'js exec'},
    {cmd: 'json', fn: this.cmdJson, desc: 'Parse one-line JSON', help: 'json [-l&lt;n&gt;] [-p] one-line-json'},
    {cmd: 'keypress', fn: this.cmdKeyPress, desc: 'Dispatch a key event to active element', help: 'keypress keycode [-shift] [-ctrl] [-alt] [-meta]'},
    {cmd: 'keys', fn: this.cmdKeys, desc: 'Displays all enumerable property keys of an object', help: 'keys object'},
    {cmd: 'kiosk', fn: this.cmdKiosk, desc: 'Make the debugger window go full screen', help: 'kiosk [zoom]'},
    {cmd: 'laptime', fn: this.cmdLaptime, desc: 'Lap time test'},
    {cmd: 'led', fn: this.cmdLed, desc: 'Set a bit pattern to the indicator', help: 'led bit-pattern'},
    {cmd: 'len', fn: this.cmdLen, desc: 'Count the length of the given arg', help: 'len [-b] "str"|Array'},
    {cmd: 'loadjs', fn: this.cmdLoadJs, desc: 'Load a JavaScript file', help: 'loadjs file-path'},
    {cmd: 'log', fn: this.cmdLog, desc: 'Manipulate log output', help: 'log bufsize|copy|date|dump|filter|html|load|preserve|suspend|lv'},
    {cmd: 'msg', fn: this.cmdMsg, desc: 'Set a string to the message display', help: 'msg message'},
    {cmd: 'nexttime', fn: this.cmdNextTime, desc: 'Returns next time from given args', help: 'nexttime T0000|T1200|...|1d2h3m4s|ms'},
    {cmd: 'now', fn: this.cmdNow, desc: 'Returns the number of milliseconds elapsed since Jan 1, 1970 00:00:00 UTC'},
    {cmd: 'open', fn: this.cmdOpen, desc: 'Launch a function', help: 'open [measure|sys|html|dom|js|tool|ext] [timer|text|file|html|bat]|[idx] [clock|sw1|sw2]|[b64|bin]'},
    {cmd: 'p', fn: this.cmdP, desc: 'Print JavaScript Objects', help: 'p [-l&lt;n&gt;] [-json] object'},
    {cmd: 'pause', fn: this.cmdPause, desc: 'Suspends processing of batch file', help: 'pause [-key key] [-timeout ms|1d2h3m4s500]'},
    {cmd: 'pin', fn: this.cmdPin, desc: 'Fix the window in its position', help: 'pin on|off'},
    {cmd: 'point', fn: this.cmdPoint, desc: 'Show the pointer to the specified coordinate', help: 'point [+|-]x [+|-]y|click|cclick|rclick|dblclick|contextmenu|mousedown|mouseup|keydown|keypress|keyup|focus|blur|change|show|hide|getelement|getprop|setprop|verify|init|#id|.class [idx]|tagName [idx]|center|mouse|move|drag|text|selectoption|value|scroll|hint|cursor src [w] [h]|ch [n]'},
    {cmd: 'prop', fn: this.cmdProp, desc: 'Displays a property value', help: 'prop property-name'},
    {cmd: 'props', fn: this.cmdProps, desc: 'Displays property list', help: 'props [-reset]'},
    {cmd: 'random', fn: this.cmdRandom, desc: 'Generate a random number/string', help: 'random [-n|-s] [min[d]] [max]'},
    {cmd: 'resume', fn: this.cmdResume, desc: 'Resume a suspended batch process', help: 'resume [-key key]'},
    {cmd: 'rgb', fn: this.cmdRGB, desc: 'Convert RGB color values between HEX and DEC', help: 'rgb values (#<span style="color:' + DebugJS.COLOR_R + '">R</span><span style="color:' + DebugJS.COLOR_G + '">G</span><span style="color:' + DebugJS.COLOR_B + '">B</span> | <span style="color:' + DebugJS.COLOR_R + '">R</span> <span style="color:' + DebugJS.COLOR_G + '">G</span> <span style="color:' + DebugJS.COLOR_B + '">B</span>)'},
    {cmd: 'rot', fn: this.cmdROT, desc: 'Encodes/Decodes ROTx', help: 'rot 5|13|47 -e|-d -i "&lt;str&gt;" [-n &lt;n&gt]'},
    {cmd: 'scrollto', fn: this.cmdScrollTo, desc: 'Set scroll position', help: '\nscrollto log top|px|bottom [+|-]px(x)|left|center|right|current\nscrollto window [+|-]px(y)|top|middle|bottom|current [-speed speed(ms)] [-step step(px)]'},
    {cmd: 'select', fn: this.cmdSelect, desc: 'Select an option of select element', help: 'select selectors get|set text|texts|value|values val'},
    {cmd: 'set', fn: this.cmdSet, desc: 'Set a property value', help: 'set property-name value'},
    {cmd: 'setattr', fn: this.cmdSetAttr, desc: 'Set the value of an attribute on the specified element', help: 'setattr selector [idx] name value'},
    {cmd: 'sleep', fn: this.cmdSleep, desc: 'Causes the currently executing thread to sleep', help: 'sleep ms'},
    {cmd: 'stack', fn: this.cmdStack, desc: 'Inject print stack trace code into a given function', help: 'stack funcname'},
    {cmd: 'stopwatch', fn: this.cmdStopwatch, desc: 'Manipulate the stopwatch', help: 'stopwatch [sw0|sw1|sw2] start|stop|reset|split|end|val'},
    {cmd: 'strp', fn: this.cmdStrp, desc: 'String permutation', help: 'strp "CHARS" INDEX|"STR"'},
    {cmd: 'sw', fn: this.cmdSw, desc: 'Launch the stopwatch in the full-screen mode'},
    {cmd: 'test', fn: this.cmdTest, desc: 'Manage unit test', help: 'test init|set|count|result|last|ttlresult|status|verify got-val method expected-val|fin'},
    {cmd: 'text', fn: this.cmdText, desc: 'Set text value into an element', help: 'text selector "data" [-speed speed(ms)] [-start seqStartPos] [-end seqEndPos]'},
    {cmd: 'timediff', fn: this.cmdTimeDiff, desc: 'Time duration calculator', help: '\ntimediff ms|HH:MI:SS.sss|"DateStr" ms|HH:MI:SS.sss|"DateStr"\nDateStr: YYYY-MM-DD HH:MI:SS.sss|YYYYMMDDTHHMISS.sss'},
    {cmd: 'timer', fn: this.cmdTimer, desc: 'Manipulate the timer', help: 'timer start|split|stop|list [timer-name]'},
    {cmd: 'timestr', fn: this.cmdTimeStr, desc: 'String <--> millis', help: 'timestr ms|sec.ms'},
    {cmd: 'unalias', fn: this.cmdUnAlias, desc: 'Remove each NAME from the list of defined aliases', help: 'unalias [-a] name [name ...]'},
    {cmd: 'unicode', fn: this.cmdUnicode, desc: 'Displays Unicode code point / Decodes unicode string', help: 'unicode [-e|-d] str|codePoint(s)'},
    {cmd: 'uri', fn: this.cmdUri, desc: 'Encodes/Decodes a URI component', help: 'uri [-e|-d] str'},
    {cmd: 'utf8', fn: this.cmdUtf8, desc: 'Dump UTF-8 byte sequence', help: 'utf8 "str"'},
    {cmd: 'v', fn: this.cmdV, desc: 'Displays version info', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'vals', fn: this.cmdVals, desc: 'Displays variable list'},
    {cmd: 'watchdog', fn: this.cmdWatchdog, desc: 'Start/Stop watchdog timer', help: 'watchdog [start|stop] [time(ms)]'},
    {cmd: 'win', fn: this.cmdWin, desc: 'Set the debugger window size/pos', help: 'win normal|expand|full|restore|reset', attr: DebugJS.CMD_ATTR_DYNAMIC | DebugJS.CMD_ATTR_NO_KIOSK},
    {cmd: 'xlscol', fn: this.cmdXlsCol, desc: 'Excel column number <--> reference', help: 'xlscol REF [+|-| ] [REF]'},
    {cmd: 'zoom', fn: this.cmdZoom, desc: 'Zoom the debugger window', help: 'zoom ratio', attr: DebugJS.CMD_ATTR_DYNAMIC},
    {cmd: 'call', fn: this.cmdCall, attr: DebugJS.CMD_ATTR_SYSTEM | DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'goto', fn: this.cmdGoto, attr: DebugJS.CMD_ATTR_SYSTEM | DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'jump', fn: this.cmdJump, attr: DebugJS.CMD_ATTR_SYSTEM | DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'quit', fn: this.cmdQuit, attr: DebugJS.CMD_ATTR_SYSTEM | DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'return', fn: this.cmdReturn, attr: DebugJS.CMD_ATTR_SYSTEM | DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'wait', fn: this.cmdNop, attr: DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'nop', fn: this.cmdNop, attr: DebugJS.CMD_ATTR_HIDDEN}
  ];
  this.DND_FN_TBL = {
    set: DebugJS.dndSet,
    sort: DebugJS.dndSort
  },
  this.CMD_TBL = [];
  this.EXT_CMD_TBL = [];
  this.CMD_ALIAS = {b64: 'base64'};
  this.CMDVALS = {};
  this.opt = null;
  this.errStatus = DebugJS.ERR_ST_NONE;
  this.PROPS_RESTRICTION = {
    batcont: /^on$|^off$/,
    batstop: /^[^|][a-z|]+[^|]$/,
    esc: /^enable$|^disable$/,
    dumplimit: /^[0-9]+$/,
    dumpvallen: /^[0-9]+$/,
    prevlimit: /^[0-9]+$/,
    hexdumplimit: /^[0-9]+$/,
    hexdumplastrows: /^[0-9]+$/,
    indent: /^[0-9]+$/,
    radix: /^[^|][a-z|]+[^|]$/,
    pointspeed: /^[0-9]+$/,
    pointstep: /^[0-9]+$/,
    pointmsgsize: /.*/,
    scrollspeed: /^[0-9]+$/,
    scrollstep: /^[0-9]+$/,
    textspeed: /^[0-9-]+$/,
    textstep: /^[0-9-]+$/,
    testvallimit: /^[0-9-]+$/,
    wait: /^[0-9]+$/,
    timer: /.*/,
    wdt: /^[0-9]+$/,
    mousemovesim: /^true$|^false$/,
    consolelog: /^native$|^me$/
  };
  this.PROPS_DFLT_VALS = {
    batcont: 'off',
    batstop: 'error',
    esc: 'enable',
    dumplimit: 1000,
    dumpvallen: 4096,
    prevlimit: 5 * 1024 * 1024,
    hexdumplimit: 1048576,
    hexdumplastrows: 16,
    indent: 1,
    radix: 'bin|dec|hex',
    pointspeed: DebugJS.point.move.speed,
    pointstep: DebugJS.point.move.step,
    pointmsgsize: '"12px"',
    scrollspeed: DebugJS.scrollWinTo.data.speed,
    scrollstep: DebugJS.scrollWinTo.data.step,
    textspeed: 30,
    textstep: 1,
    testvallimit: 4096,
    wait: 500,
    timer: '00:03:00.000',
    wdt: 500,
    mousemovesim: 'false',
    consolelog: 'native'
  };
  this.PROPS_CB = {
    batcont: this.setPropBatContCb,
    indent: this.setPropIndentCb,
    pointmsgsize: this.setPropPointMsgSizeCb,
    timer: this.setPropTimerCb,
    consolelog: this.setPropConsoleLogCb
  };
  this.props = {};
  this.extBtn = null;
  this.extBtnLabel = 'EXT';
  this.extPanel = null;
  this.extHdrPanel = null;
  this.extBodyPanel = null;
  this.extActivePanel = null;
  this.extPanels = [];
  this.extActPnlIdx = -1;
  this.evtListener = {
    batstart: [],
    batstop: [],
    ctrlc: [],
    drop: [],
    error: [],
    fileloaded: [],
    stopwatch: [],
    unlock: [],
    watchdog: []
  };
  this.unlockCode = null;
  this.setupDefaultOptions();
  DebugJS.copyProp(this.PROPS_DFLT_VALS, this.props);
};
DebugJS.DFLT_UNIT = 32;
DebugJS.INIT_CAUSE_ZOOM = 1;
DebugJS.ST_INITIALIZED = 1;
DebugJS.ST_LOG_PRESERVED = 1 << 1;
DebugJS.ST_BAT_RUNNING = 1 << 2;
DebugJS.ST_BAT_CONT = 1 << 3;
DebugJS.ST_BAT_PAUSE = 1 << 4;
DebugJS.ST_BAT_PAUSE_CMD = 1 << 5;
DebugJS.ST_BAT_PAUSE_CMD_KEY = 1 << 6;
DebugJS.ST_BAT_BP = 1 << 7;
DebugJS.ST_STOPWATCH_RUNNING = 1 << 8;
DebugJS.ST_STOPWATCH_LAPTIME = 1 << 9;
DebugJS.ST_STOPWATCH_END = 1 << 10;
DebugJS.ST_LOG_SUSPEND = 1 << 11;
DebugJS.ST_MEASURE = 1 << 12;
DebugJS.ST_MEASURING = 1 << 13;
DebugJS.ST_SYS_INFO = 1 << 14;
DebugJS.ST_HTML_SRC = 1 << 15;
DebugJS.ST_ELM_INFO = 1 << 16;
DebugJS.ST_ELM_EDIT = 1 << 17;
DebugJS.ST_JS = 1 << 18;
DebugJS.ST_TOOLS = 1 << 19;
DebugJS.ST_EXT_PANEL = 1 << 20;
DebugJS.ST_WD = 1 << 21;
DebugJS.ST_NO_HIST = 1 << 22;
DebugJS.ST_CLP = 1 << 23;
DebugJS.ST_CLOCK_FULL = 1 << 24;
DebugJS.ST_SW = 1 << 25;
DebugJS.ST_KIOSK = 1 << 26;
DebugJS.UI_ST_VISIBLE = 1;
DebugJS.UI_ST_DYNAMIC = 1 << 1;
DebugJS.UI_ST_SHOW_CLOCK = 1 << 2;
DebugJS.UI_ST_DRAGGABLE = 1 << 3;
DebugJS.UI_ST_DRAGGING = 1 << 4;
DebugJS.UI_ST_RESIZABLE = 1 << 5;
DebugJS.UI_ST_RESIZING = 1 << 6;
DebugJS.UI_ST_RESIZING_N = 1 << 7;
DebugJS.UI_ST_RESIZING_E = 1 << 8;
DebugJS.UI_ST_RESIZING_S = 1 << 9;
DebugJS.UI_ST_RESIZING_W = 1 << 10;
DebugJS.UI_ST_RESIZING_ALL = DebugJS.UI_ST_RESIZING | DebugJS.UI_ST_RESIZING_N | DebugJS.UI_ST_RESIZING_E | DebugJS.UI_ST_RESIZING_S | DebugJS.UI_ST_RESIZING_W;
DebugJS.UI_ST_POS_AUTO_ADJ = 1 << 11;
DebugJS.UI_ST_LOG_SCROLL = 1 << 12;
DebugJS.UI_ST_PROTECTED = 1 << 13;
DebugJS.TOOL_ST_SW_CU_RUNNING = 1;
DebugJS.TOOL_ST_SW_CU_END = 1 << 1;
DebugJS.TOOL_ST_SW_CD_RUNNING = 1 << 2;
DebugJS.TOOL_ST_SW_CD_PAUSED = 1 << 3;
DebugJS.TOOL_ST_SW_CD_EXPIRED = 1 << 4;
DebugJS.TOOL_ST_SW_CD_END = 1 << 5;
DebugJS.TOOL_TMR_MODE_CLOCK = 0;
DebugJS.TOOL_TMR_MODE_SW_CU = 1;
DebugJS.TOOL_TMR_MODE_SW_CD = 2;
DebugJS.TOOL_TMR_BTN_COLOR = '#eee';
DebugJS.LOG_FLTR_LOG = 0x1;
DebugJS.LOG_FLTR_VRB = 0x2;
DebugJS.LOG_FLTR_DBG = 0x4;
DebugJS.LOG_FLTR_INF = 0x8;
DebugJS.LOG_FLTR_WRN = 0x10;
DebugJS.LOG_FLTR_ERR = 0x20;
DebugJS.LOG_FLTR_FTL = 0x40;
DebugJS.LOG_FLTR_ALL = DebugJS.LOG_FLTR_LOG | DebugJS.LOG_FLTR_DBG | DebugJS.LOG_FLTR_INF | DebugJS.LOG_FLTR_WRN | DebugJS.LOG_FLTR_ERR | DebugJS.LOG_FLTR_FTL;
DebugJS.LOG_TYPE_LOG = 0x1;
DebugJS.LOG_TYPE_VRB = 0x2;
DebugJS.LOG_TYPE_DBG = 0x4;
DebugJS.LOG_TYPE_INF = 0x8;
DebugJS.LOG_TYPE_WRN = 0x10;
DebugJS.LOG_TYPE_ERR = 0x20;
DebugJS.LOG_TYPE_FTL = 0x40;
DebugJS.LOG_TYPE_SYS = 0x80;
DebugJS.LOG_TYPE_MLT = 0x100;
DebugJS.LOG_TYPE_RES = 0x200;
DebugJS.LOG_TYPE_ERES = 0x400;
DebugJS.ELMINFO_ST_SELECT = 0x1;
DebugJS.ELMINFO_ST_HIGHLIGHT = 0x2;
DebugJS.ERR_ST_NONE = 0;
DebugJS.ERR_ST_SCRIPT = 0x1;
DebugJS.ERR_ST_LOAD = 0x2;
DebugJS.ERR_ST_LOG = 0x4;
DebugJS.ERR_ST_LOG_F = 0x8;
DebugJS.TOOLS_FNC_TIMER = 0x1;
DebugJS.TOOLS_FNC_TEXT = 0x2;
DebugJS.TOOLS_FNC_HTML = 0x4;
DebugJS.TOOLS_FNC_FILE = 0x8;
DebugJS.TOOLS_FNC_BAT = 0x10;
DebugJS.TOOLS_DFLT_ACTIVE_FNC = DebugJS.TOOLS_FNC_TIMER;
DebugJS.CMD_ATTR_SYSTEM = 0x1;
DebugJS.CMD_ATTR_HIDDEN = 0x2;
DebugJS.CMD_ATTR_DYNAMIC = 0x4;
DebugJS.CMD_ATTR_NO_KIOSK = 0x8;
DebugJS.CMD_ATTR_DISABLED = 0x10;
DebugJS.CMD_ECHO_MAX_LEN = 256;
DebugJS.DBGWIN_MIN_W = 292;
DebugJS.DBGWIN_MIN_H = 155;
DebugJS.DBGWIN_EXPAND_W = 850;
DebugJS.DBGWIN_EXPAND_H = 580;
DebugJS.DBGWIN_EXPAND_H2 = 640;
DebugJS.SIZE_ST_NORMAL = 0;
DebugJS.SIZE_ST_EXPANDED = 1;
DebugJS.SIZE_ST_FULL_W = 2;
DebugJS.SIZE_ST_FULL_H = 3;
DebugJS.SIZE_ST_FULL_WH = 4;
DebugJS.DBGWIN_POS_NONE = -9999;
DebugJS.WIN_SHADOW = 10;
DebugJS.WIN_BORDER = 1;
DebugJS.WIN_PADDING = 1;
DebugJS.WIN_ADJUST = ((DebugJS.WIN_BORDER * 2) + (DebugJS.WIN_PADDING * 2));
DebugJS.OVERLAY_PANEL_HEIGHT = 77;
DebugJS.CMD_LINE_PADDING = 3;
DebugJS.COLOR_ACTIVE = '#fff';
DebugJS.SBPNL_COLOR_ACTIVE = '#6cf';
DebugJS.SBPNL_COLOR_INACT = '#ccc';
DebugJS.COLOR_INACT = '#999';
DebugJS.MEAS_BTN_COLOR = '#6cf';
DebugJS.SYS_BTN_COLOR = '#3cf';
DebugJS.HTML_BTN_COLOR = '#8f8';
DebugJS.DOM_BTN_COLOR = '#f63';
DebugJS.JS_BTN_COLOR = '#6df';
DebugJS.TOOLS_BTN_COLOR = '#ff0';
DebugJS.EXT_BTN_COLOR = '#f8f';
DebugJS.LOG_PRESERVE_BTN_COLOR = '#0f0';
DebugJS.LOG_SUSPEND_BTN_COLOR = '#f66';
DebugJS.PIN_BTN_COLOR = '#fa0';
DebugJS.CLP_BTN_COLOR = '#eee';
DebugJS.FLT_BTN_COLOR = '#eee';
DebugJS.COLOR_R = '#f66';
DebugJS.COLOR_G = '#6f6';
DebugJS.COLOR_B = '#6bf';
DebugJS.KEY_ST_DFLT = '- <span style="color:' + DebugJS.COLOR_INACT + '">CSAM</span>';
DebugJS.WDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
DebugJS.WDAYS_COLOR = ['f74', 'fff', 'fff', 'fff', 'fff', 'fff', '8fd'];
DebugJS.UPDATE_INTERVAL_H = 21;
DebugJS.UPDATE_INTERVAL_L = 500;
DebugJS.DFLT_TMR_NM = 'timer0';
DebugJS.TMR_NM_SW_0 = 'sw0';
DebugJS.TMR_NM_SW_CU = 'sw1';
DebugJS.TMR_NM_SW_CD = 'sw2';
DebugJS.LED_BIT = [0x1, 0x2, 0x4, 0x8, 0x10, 0x20, 0x40, 0x80];
DebugJS.LED_COLOR = ['#4cf', '#0ff', '#6f6', '#ee0', '#f80', '#f66', '#f0f', '#ddd'];
DebugJS.LED_COLOR_INACT = '#777';
DebugJS.ITEM_NM_COLOR = '#cff';
DebugJS.KEYWRD_COLOR = '#0ff';
DebugJS.RND_TYPE_NUM = '-n';
DebugJS.RND_TYPE_STR = '-s';
DebugJS.ELM_HL_CLASS_SUFFIX = '-elhl';
DebugJS.EXPANDBTN = '&gt;';
DebugJS.CLOSEBTN = 'v';
DebugJS.OMIT_LAST = 0;
DebugJS.OMIT_MID = 1;
DebugJS.OMIT_FIRST = 2;
DebugJS.DISP_BIN_DIGITS_THR = 5;
DebugJS.TIME_RST_STR = '00:00:00.000';
DebugJS.EXIT_SUCCESS = 0;
DebugJS.EXIT_FAILURE = 1;
DebugJS.EXIT_SIG = 128;
DebugJS.EXIT_CLEARED = -1;
DebugJS.SIGINT = 2;
DebugJS.SIGTERM = 15;
DebugJS.BAT_HEAD = '#!BAT!';
DebugJS.BAT_HEAD_B64 = 'IyFCQVQh';
DebugJS.BAT_TKN_JS = '!__JS__!';
DebugJS.BAT_TKN_TXT = '!__TEXT__!';
DebugJS.BAT_TKN_IF = 'IF';
DebugJS.BAT_TKN_ELIF = 'ELSE IF';
DebugJS.BAT_TKN_ELSE = 'ELSE';
DebugJS.BAT_TKN_LOOP = 'LOOP';
DebugJS.BAT_TKN_BREAK = 'BREAK';
DebugJS.BAT_TKN_CONTINUE = 'CONTINUE';
DebugJS.BAT_TKN_BLOCK_START = '(';
DebugJS.BAT_TKN_BLOCK_END = ')';
DebugJS.BAT_TKN_LABEL = ':';
DebugJS.BAT_TKN_FNC = 'FUNCTION';
DebugJS.BAT_TKN_RET = 'return';
DebugJS.RE_ELIF = new RegExp('^\\' + DebugJS.BAT_TKN_BLOCK_END + '\\s?' + DebugJS.BAT_TKN_ELIF + '\\s?\\' + DebugJS.BAT_TKN_BLOCK_START + '?.+');
DebugJS.RE_ELSE = DebugJS.BAT_TKN_BLOCK_END + DebugJS.BAT_TKN_ELSE + DebugJS.BAT_TKN_BLOCK_START;
DebugJS.CHR_LED = '&#x25CF;';
DebugJS.CHR_DELTA = '&#x22BF;';
DebugJS.CHR_CRLF = '&#x21b5;';
DebugJS.CHR_LF = '&#x2193;';
DebugJS.CHR_CR = '&#x2190;';
DebugJS.CHR_CRLF_S = '<span style="color:#0cf" class="dbg-cc">' + DebugJS.CHR_CRLF + '</span>';
DebugJS.CHR_LF_S = '<span style="color:#0f0" class="dbg-cc">' + DebugJS.CHR_LF + '</span>';
DebugJS.CHR_CR_S = '<span style="color:#f00" class="dbg-cc">' + DebugJS.CHR_CR + '</span>';
DebugJS.EOF = '<span style="color:#08f" class="dbg-cc">[EOF]</span>';
DebugJS.CHR_WIN_FULL = '&#x25A1;';
DebugJS.CHR_WIN_RST = '&#x2750;';
DebugJS.LOG_HEAD = '[LOG]';
DebugJS.LOG_BOUNDARY_BUF = '-- ORIGINAL LOG BUFFER --';
DebugJS.SYS_INFO_FULL_OVERLAY = true;
DebugJS.HTML_SRC_FULL_OVERLAY = true;
DebugJS.HTML_SRC_EXPAND_H = false;
DebugJS.ELM_INFO_FULL_OVERLAY = false;
DebugJS.LS_AVAILABLE = false;
DebugJS.SS_AVAILABLE = false;
DebugJS.G_EL_AVAILABLE = false;
DebugJS.JS_SNIPPET = [
'dbg.time.s();\nfor (var i = 0; i < 1000000; i++) {\n\n}\ndbg.time.e();\n\'done\';',
'',
'',
'',
'// Logging performance check\nvar n = 1000;\nvar i = 0;\ndbg.time.s(\'total\');\ntest();\nfunction test() {\n  dbg.time.s();\n  dbg.time.e();\n  i++;\n  if (i == n) {\n    dbg.msg.clear();\n    dbg.time.e(\'total\');\n  } else {\n    if (i % 100 == 0) {\n      dbg.msg(\'i = \' + i + \' / \' + dbg.time.check(\'total\'));\n    }\n    setTimeout(test, 0);\n  }\n}'
];
DebugJS.HTML_SNIPPET = [
'<div style="width:100%; height:100%; background:#fff; color:#000;">\n\n</div>\n',
'<button onclick=""></button>',
'<video src="" controls autoplay>',
'',
'<!DOCTYPE html>\n<html>\n<head>\n<meta http-equiv="X-UA-Compatible" content="IE=edge">\n<meta charset="utf-8">\n<meta name="robots" content="none">\n<meta name="referrer" content="no-referrer">\n<meta name="referrer" content="never">\n<title></title>\n<link rel="stylesheet" href="style.css" />\n<script src="script.js"></script>\n<style>\n</style>\n<script>\nonReady = function() {\n};\nwindow.addEventListener(\'DOMContentLoaded\', onReady, true);\n</script>\n</head>\n<body>\n\n</body>\n</html>\n'
];
DebugJS.FEATURES = [
  'togglableShowHide',
  'useClock',
  'useClearButton',
  'useSuspendLogButton',
  'usePinButton',
  'useWinCtrlButton',
  'useStopwatch',
  'useDeviceInfo',
  'useLed',
  'useMsgDisplay',
  'useScreenMeasure',
  'useSystemInfo',
  'useElementInfo',
  'useHtmlSrc',
  'useTools',
  'useJsEditor',
  'useLogFilter',
  'useCommandLine'
];
DebugJS.TZ = {'pst': '-8', 'pdt': '-7', 'mst': '-7', 'mdt': '-6', 'cst': '-6', 'cdt': '-5', 'est': '-5', 'edt': '-4', 'utc': '+0', 'cet': '+1', 'cest': '+2', 'ist': '+0530', 'ctt': '+8', 'jst': '+9'};
DebugJS.fn = function() {};
DebugJS.rdy = false;
DebugJS.prototype = {
  init: function(opt, rstrOpt) {
    if (!DebugJS.ENABLE) return false;
    var ctx = DebugJS.ctx;
    var keepStatus = ((rstrOpt && (rstrOpt.cause == DebugJS.INIT_CAUSE_ZOOM)) ? true : false);
    ctx.bodyEl = document.body;
    ctx.finalizeFeatures(ctx);
    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      if (ctx.win) {
        for (var i = ctx.win.childNodes.length - 1; i >= 0; i--) {
          ctx.win.removeChild(ctx.win.childNodes[i]);
        }
        ctx.bodyEl.removeChild(ctx.win);
        ctx.timerBasePanel = null;
        ctx.win = null;
      }
    }
    if (!keepStatus) {
      var preserveStatus = DebugJS.ST_LOG_PRESERVED | DebugJS.ST_STOPWATCH_RUNNING | DebugJS.ST_WD | DebugJS.ST_BAT_RUNNING | DebugJS.ST_BAT_CONT | DebugJS.ST_BAT_PAUSE | DebugJS.ST_BAT_PAUSE_CMD | DebugJS.ST_BAT_PAUSE_CMD_KEY;
      ctx.status &= preserveStatus;
      ctx.uiStatus = 0;
      ctx.startLogScrolling();
    }
    if ((ctx.opt == null) || ((opt != null) && (!keepStatus)) || (opt === undefined)) {
      ctx.setupDefaultOptions();
    }
    if (opt) {
      for (var key1 in opt) {
        for (var key2 in ctx.opt) {
          if (key1 == key2) {
            ctx.opt[key1] = opt[key1];
            if ((key1 == 'disableAllFeatures') && (opt[key1])) {
              ctx.disableAllFeatures(ctx);
            }
            break;
          }
        }
      }
      ctx.zoom = opt.zoom ? opt.zoom : ctx.DEFAULT_OPTIONS.zoom;
    }
    if (ctx.logBuf.size() != ctx.opt.bufsize) {
      if (!(ctx.status & DebugJS.ST_LOG_PRESERVED) ||
          ((ctx.status & DebugJS.ST_LOG_PRESERVED) && (ctx.logBuf.size() < ctx.opt.bufsize))) {
        ctx.initBuf(ctx, ctx.opt.bufsize);
      }
    }
    if (ctx.opt.mode == 'noui') {
      ctx.rmvEventHandlers(ctx);
      ctx.init = DebugJS.fn;
      DebugJS.init = DebugJS.fn;
      ctx.status |= DebugJS.ST_INITIALIZED;
      DebugJS.onDbgRdy();
      return false;
    }
    if (!ctx.bodyEl) return false;
    ctx.initUi(ctx, rstrOpt);
    ctx.initCmdTbl(ctx);
    ctx.status |= DebugJS.ST_INITIALIZED;
    ctx.initExtension(ctx);
    ctx.printLogs();
    ctx.showDbgWinOnError(ctx);
    DebugJS.onDbgRdy();
    return true;
  },
  initUi: function(ctx, rstrOpt) {
    ctx.initUiStatus(ctx, ctx.opt, rstrOpt);
    ctx.computedMinW = DebugJS.DBGWIN_MIN_W * ctx.zoom;
    ctx.computedMinH = DebugJS.DBGWIN_MIN_H * ctx.zoom;
    ctx.computedFontSize = Math.round(ctx.opt.fontSize * ctx.zoom);
    ctx.computedWidth = Math.round(ctx.opt.width * ctx.zoom);
    if (ctx.opt.elmId == null) {
      ctx.id = ctx.DFLT_ELM_ID;
      ctx.win = document.createElement('div');
      ctx.win.id = ctx.id;
      ctx.win.style.position = 'fixed';
      ctx.win.style.zIndex = 0x7fffffff;
      ctx.win.style.width = ctx.computedWidth + 'px';
      ctx.win.style.boxShadow = DebugJS.WIN_SHADOW + 'px ' + DebugJS.WIN_SHADOW + 'px 10px rgba(0,0,0,.3)';
      ctx.bodyEl.appendChild(ctx.win);
      if (ctx.opt.mode == 'kiosk') {
        ctx.setupKioskMode(ctx);
      }
    } else {
      ctx.id = ctx.opt.elmId;
      ctx.win = document.getElementById(ctx.id);
      ctx.win.style.position = 'relative';
    }
    ctx.win.style.display = 'block';
    ctx.win.style.padding = DebugJS.WIN_BORDER + 'px';
    ctx.win.style.lineHeight = '1em';
    ctx.win.style.boxSizing = 'content-box';
    ctx.win.style.border = ctx.opt.border;
    ctx.win.style.borderRadius = ctx.opt.borderRadius;
    ctx.win.style.background = ctx.opt.background;
    ctx.win.style.color = ctx.opt.fontColor;
    ctx.win.style.fontSize = ctx.computedFontSize + 'px',
    ctx.win.style.opacity = ctx.opt.opacity;
    ctx.createPanels(ctx);
    if (ctx.uiStatus & DebugJS.UI_ST_RESIZABLE) {
      ctx.initResize(ctx);
    }
    ctx.initStyles(ctx);
    ctx.initDbgWin(ctx);
    ctx.setupEventHandler(ctx);
    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      if (ctx.opt.mode == 'kiosk') {
        ctx.focusCmdLine();
      } else {
        ctx.setupMove(ctx);
        ctx.initWidth = ctx.win.offsetWidth;
        ctx.initHeight = ctx.win.offsetHeight;
        ctx.resetDbgWinSizePos();
        if ((rstrOpt != null) && (rstrOpt.cause == DebugJS.INIT_CAUSE_ZOOM)) {
          ctx.focusCmdLine();
        }
        if (!(ctx.uiStatus & DebugJS.UI_ST_VISIBLE) || (ctx.uiStatus & DebugJS.UI_ST_PROTECTED)) {
          ctx.win.style.display = 'none';
        }
      }
    } else {
      ctx.initWidth = ctx.win.offsetWidth - DebugJS.WIN_ADJUST;
      ctx.initHeight = ctx.win.offsetHeight - DebugJS.WIN_ADJUST;
    }
    ctx.winExpandHeight = DebugJS.DBGWIN_EXPAND_H2 * ctx.zoom;
    if ((rstrOpt != null) && (rstrOpt.cause == DebugJS.INIT_CAUSE_ZOOM)) {
      ctx.resetStylesOnZoom(ctx);
      ctx.reopenFeatures(ctx);
      ctx.restoreDbgWinSize(ctx, rstrOpt.sizeStatus);
    }
    if ((ctx.uiStatus & DebugJS.UI_ST_VISIBLE) && (ctx.uiStatus & DebugJS.UI_ST_SHOW_CLOCK)) {
      ctx.startUdtClock(ctx);
    }
  },
  initStyles: function(ctx) {
    var opt = ctx.opt;
    var fontSize = ctx.computedFontSize + 'px';
    var ltsp = '0';
    if (DebugJS.getBrowserType().name == 'Firefox') {
      ltsp = '-0.35px';
    }
    var styles = {};
    styles['#' + ctx.id] = {
      'text-align': 'left !important',
      'letter-spacing': ltsp + ' !important'
    };
    styles['#' + ctx.id + ' *'] = {
      'box-sizing': 'content-box !important',
      'color': opt.fontColor,
      'font-size': fontSize + ' !important',
      'font-family': opt.fontFamily + ' !important'
    };
    styles['#' + ctx.id + ' input, textarea'] = {
      'letter-spacing': ltsp + ' !important'
    };
    styles['#' + ctx.id + ' td'] = {
      'width': 'auto !important',
      'padding': '0 3px !important',
      'border': 'none !important',
      'background': 'none !important',
      'color': opt.fontColor + ' !important',
      'font-size': fontSize + ' !important'
    };
    styles['#' + ctx.id + ' pre'] = {
      'width': 'auto !important',
      'height': 'auto !important',
      'margin': '0 !important',
      'padding': '0 !important',
      'line-height': '1em !important',
      'border': 'none !important',
      'border-radius': '0 !important',
      'background': 'none !important',
      'color': opt.fontColor + ' !important',
      'font-size': fontSize + ' !important',
      'white-space': 'pre-wrap !important',
      'word-break': 'break-all !important',
      'overflow': 'visible !important'
    };
    styles['.dbg-btn'] = {
      'color': opt.btnColor + ' !important'
    };
    styles['.dbg-btn:hover'] = {
      'text-shadow': '0 0 3px',
      'cursor': 'pointer'
    };
    styles['.dbg-btn-red'] = {
      'color': '#a88 !important'
    };
    styles['.dbg-btn-wh'] = {
      'color': '#fff !important'
    };
    styles['.dbg-sys-info'] = {
      'display': 'inline-block',
      'margin-right': '10px',
      'color': opt.sysInfoColor + ' !important'
    };
    styles['.dbg-resize-corner'] = {
      'position': 'absolute',
      'width': '6px',
      'height': '6px',
      'background': 'rgba(0,0,0,0)'
    };
    styles['.dbg-resize-side'] = {
      'position': 'absolute',
      'background': 'rgba(0,0,0,0)'
    };
    styles['.dbg-overlay-base-panel'] = {
      'position': 'relative',
      'top': '0',
      'left': '0',
      'width': 'calc(100% - 2px)',
      'height': DebugJS.OVERLAY_PANEL_HEIGHT + '%'
    };
    var overlayPanelBorder = 1;
    var overlayPanelPadding = 2;
    styles['.dbg-overlay-panel'] = {
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
    styles['.dbg-overlay-panel pre'] = {
      'padding': '0 1px !important',
      'color': opt.fontColor + ' !important',
      'font-size': fontSize + ' !important'
    };
    styles['.dbg-overlay-panel-full'] = {
      'position': 'absolute',
      'top': (ctx.computedFontSize + DebugJS.WIN_ADJUST) + 'px',
      'left': '1px',
      'width': 'calc(100% - ' + (DebugJS.WIN_SHADOW + DebugJS.WIN_ADJUST - ((overlayPanelPadding * 2) + (overlayPanelBorder * 2))) + 'px)',
      'height': 'calc(100% - ' + ((ctx.computedFontSize + DebugJS.WIN_ADJUST) + DebugJS.WIN_SHADOW + ctx.computedFontSize + 10 - (overlayPanelPadding * 2)) + 'px)',
      'padding': overlayPanelPadding + 'px',
      'border': 'solid ' + overlayPanelBorder + 'px #333',
      'background': 'rgba(0,0,0,0.5)',
      'overflow': 'auto'
    };
    styles['.dbg-sbpnl'] = {
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'width': '100%',
      'height': '100%'
    };
    styles['.dbg-sep'] = {
      'height': (ctx.computedFontSize * 0.5) + 'px'
    };
    styles['.dbg-na'] = {
      'color': '#ccc !important'
    };
    styles['.dbg-showhide-btn'] = {
      'color': '#0a0 !important',
      'font-size': fontSize + ' !important',
      'font-weight': 'bold'
    };
    styles['.dbg-showhide-btn:hover'] = {
      'cursor': 'pointer'
    };
    styles['.dbg-cmdtd'] = {
      'vertical-align': 'top !important',
      'white-space': 'nowrap !important'
    };
    styles['.dbg-txt-range'] = {
      'display': 'inline-block !important',
      'width': (256 * ctx.zoom) + 'px !important',
      'height': (15 * ctx.zoom) + 'px !important',
      'padding': '0 !important',
      'border': 'none !important',
      'outline': 'none !important',
      'box-shadow': 'none !important'
    };
    styles['.dbg-txt-tbl td'] = {
      'font-size': fontSize + ' !important',
      'line-height': '1em !important'
    };
    styles['.dbg-loading'] = {
      'opacity': '1.0 !important'
    };
    styles['#' + ctx.id + ' label'] = {
      'display': 'inline !important',
      'margin': '0 !important',
      'line-height': '1em !important',
      'color': opt.fontColor + ' !important',
      'font-size': fontSize + ' !important',
      'font-weight': 'normal !important'
    };
    styles['#' + ctx.id + ' input[type="radio"]'] = {
      'margin': '0 3px !important',
      'width': 13 * ctx.zoom + 'px !important',
      'height': 13 * ctx.zoom + 'px !important'
    };
    styles['.dbg-editor'] = {
      'width': 'calc(100% - 6px) !important',
      'height': 'calc(100% - ' + (ctx.computedFontSize + 10) + 'px) !important',
      'margin': '2px 0 0 0 !important',
      'padding': '2px !important',
      'border': 'solid 1px #1883d7 !important',
      'border-radius': '0 !important',
      'outline': 'none !important',
      'background': 'transparent !important',
      'color': '#fff !important',
      'font-size': fontSize + ' !important',
      'overflow': 'auto !important',
      'resize': 'none !important'
    };
    styles['.dbg-cookiekey'] = {
      'width': '10em !important'
    };
    styles['.dbg-cookieval'] = {
      'width': 'calc(100% - 15em) !important'
    };
    styles['.dbg-strg'] = {
      'display': 'inline-block !important',
      'width': 'calc(100% - 1em) !important',
      'height': '8em !important',
      'margin': '2px 0 0 .5em !important'
    };
    styles['.dbg-strgkey'] = {
      'width': 'calc(100% - 10em) !important',
      'margin': '0 !important'
    };
    styles['.dbg-txt-hl'] = {
      'background': 'rgba(192,192,192,0.5) !important'
    };
    styles['.' + ctx.id + DebugJS.ELM_HL_CLASS_SUFFIX] = {
      'outline': 'solid 1px #f00 !important',
      'opacity': '0.7 !important'
    };
    styles['.dbg-timer-inp'] = {
      'width': '1.1em !important',
      'height': '1em !important',
      'border': 'none !important',
      'outline': 'none !important',
      'margin': '0 !important',
      'padding': '0 !important',
      'text-align': 'center !important',
      'vartical-align': 'middle !important',
      'background': 'transparent !important',
      'color': '#fff !important'
    };
    styles['.dbg-hint'] = {
      'position': 'fixed !important',
      'display': 'inline-block !important',
      'max-width': 'calc(100vw - 35px) !important',
      'max-height': 'calc(100vh - 35px) !important',
      'overflow': 'auto !important',
      'padding': '4px 8px !important',
      'box-sizing': 'content-box !important',
      'z-index': 0x7ffffffe + ' !important',
      'box-shadow': '8px 8px 10px rgba(0,0,0,.3) !important',
      'border-radius': '3px !important',
      'background': 'rgba(0,0,0,0.65) !important'
    };
    styles['.dbg-txtbox'] = {
      'border': 'none !important',
      'border-bottom': 'solid 1px #888 !important',
      'border-radius': '0 !important',
      'outline': 'none !important',
      'box-shadow': 'none !important',
      'background': 'transparent !important',
      'color': opt.fontColor + ' !important',
      'font-size': fontSize + ' !important'
    };
    styles['.dbg-resbox.box'] = {
      'display': 'inline-block !important',
      'min-width': 'calc(100% - 18px) !important',
      'height': '1.5em !important',
      'margin-top': '4px !important'
    };
    styles['.dbg-resbox'] = {
      'padding': '5px !important',
      'color': '#fff !important',
      'font-size': fontSize + ' !important',
      'font-family': 'Consolas !important',
      'overflow': 'auto !important',
      'cursor': 'text !important',
      'resize': 'none !important'
    };
    styles['.dbg-resbox.ok'] = {
      'border': '1px solid #2c6cb8 !important',
      'background': 'linear-gradient(rgba(8,8,16,0.6),rgba(0,0,68,0.6)) !important'
    };
    styles['.dbg-resbox.err'] = {
      'border': '1px solid #c00 !important',
      'background': 'linear-gradient(rgba(16,8,8,0.6),rgba(68,0,0,0.6)) !important'
    };
    ctx.applyStyles(ctx, styles);
  },
  initBuf: function(ctx, newSize) {
    var buf = ctx.logBuf.getAll();
    var oldSize = buf.length;
    if (oldSize == newSize) return;
    var i = ((oldSize > newSize) ? (oldSize - newSize) : 0);
    ctx.logBuf = new DebugJS.RingBuffer(newSize);
    for (; i < oldSize; i++) {
      ctx.logBuf.add(buf[i]);
    }
  },

  createResizeSideArea: function(cursor, state, width, height) {
    var ctx = DebugJS.ctx;
    var el = document.createElement('div');
    el.className = 'dbg-resize-side';
    el.style.width = width;
    el.style.height = height;
    el.style.cursor = cursor;
    el.onmousedown = function(e) {
      if (!(ctx.uiStatus & DebugJS.UI_ST_RESIZABLE)) return;
      ctx.startResize(ctx, e);
      ctx.uiStatus |= state;
      ctx.cursor = ctx.bodyEl.style.cursor;
      ctx.bodyEl.style.cursor = cursor;
    };
    return el;
  },
  createResizeCornerArea: function(cursor, state) {
    var ctx = DebugJS.ctx;
    var el = document.createElement('div');
    el.className = 'dbg-resize-corner';
    el.style.cursor = cursor;
    el.onmousedown = function(e) {
      if (!(ctx.uiStatus & DebugJS.UI_ST_RESIZABLE)) return;
      ctx.startResize(ctx, e);
      ctx.uiStatus |= state;
      ctx.cursor = ctx.bodyEl.style.cursor;
      ctx.bodyEl.style.cursor = cursor;
    };
    return el;
  },

  setupDefaultOptions: function() {
    this.opt = {};
    DebugJS.copyProp(this.DEFAULT_OPTIONS, this.opt);
  },

  setupEventHandler: function(ctx) {
    if (!ctx.isAllFeaturesDisabled(ctx)) {
      window.addEventListener('keydown', ctx.keyHandler, true);
    }
    if ((ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) ||
        (ctx.uiStatus & DebugJS.UI_ST_RESIZABLE) ||
        (ctx.opt.useDeviceInfo) || (ctx.opt.useScreenMeasure)) {
      window.addEventListener('mousedown', ctx.onMouseDown, true);
      window.addEventListener('mousemove', ctx.onMouseMove, true);
      window.addEventListener('mouseup', ctx.onMouseUp, true);
      window.addEventListener('touchstart', ctx.onTouchStart, true);
      window.addEventListener('touchmove', ctx.onTouchMove, true);
      window.addEventListener('touchend', ctx.onTouchEnd, true);
    }
    if (ctx.opt.useDeviceInfo) {
      window.addEventListener('resize', ctx.onResize, true);
      ctx.onResize();
      window.addEventListener('scroll', ctx.onScroll, true);
      ctx.onScroll();
    }
    window.addEventListener('keydown', ctx.onKeyDown, true);
    window.addEventListener('keypress', ctx.onKeyPress, true);
    window.addEventListener('keyup', ctx.onKeyUp, true);
    if (ctx.opt.useDeviceInfo) {
      ctx.updateKeyDownLabel();
      ctx.updateKeyPressLabel();
      ctx.updateKeyUpLabel();
    }
  },

  rmvEventHandlers: function(ctx) {
    window.removeEventListener('keydown', ctx.keyHandler, true);
    window.removeEventListener('mousedown', ctx.onMouseDown, true);
    window.removeEventListener('mousemove', ctx.onMouseMove, true);
    window.removeEventListener('mouseup', ctx.onMouseUp, true);
    window.removeEventListener('resize', ctx.onResize, true);
    window.removeEventListener('scroll', ctx.onScroll, true);
    window.removeEventListener('keydown', ctx.onKeyDown, true);
    window.removeEventListener('keypress', ctx.onKeyPress, true);
    window.removeEventListener('keyup', ctx.onKeyUp, true);
    window.removeEventListener('touchstart', ctx.onTouchStart, true);
    window.removeEventListener('touchmove', ctx.onTouchMove, true);
    window.removeEventListener('touchend', ctx.onTouchEnd, true);
  },

  initUiStatus: function(ctx, opt, rstrOpt) {
    if (ctx.opt.elmId == null) {
      ctx.uiStatus |= DebugJS.UI_ST_DYNAMIC;
      ctx.uiStatus |= DebugJS.UI_ST_DRAGGABLE;
      if ((ctx.opt.lockCode != null) && !rstrOpt) {
        ctx.uiStatus |= DebugJS.UI_ST_PROTECTED;
      }
    }
    if (ctx.opt.visible || (ctx.opt.elmId != null)) {
      ctx.uiStatus |= DebugJS.UI_ST_VISIBLE;
    } else if (ctx.errStatus) {
      var ap = ctx.opt.autoPopup;
      if (((ap.scriptError) && (ctx.errStatus & DebugJS.ERR_ST_SCRIPT)) ||
          ((ap.loadError) && (ctx.errStatus & DebugJS.ERR_ST_LOAD)) ||
          ((ap.errorLog) && (ctx.errStatus & DebugJS.ERR_ST_LOG)) ||
          ((ap.fatal) && (ctx.errStatus & DebugJS.ERR_ST_LOG_F))) {
        ctx.uiStatus |= DebugJS.UI_ST_VISIBLE;
        ctx.errStatus = DebugJS.ERR_ST_NONE;
      }
    }
    if (ctx.opt.resizable) ctx.uiStatus |= DebugJS.UI_ST_RESIZABLE;
    if (ctx.opt.useClock) ctx.uiStatus |= DebugJS.UI_ST_SHOW_CLOCK;
  },

  setupKioskMode: function(ctx) {
    ctx.sizeStatus = DebugJS.SIZE_ST_FULL_WH;
    ctx.win.style.top = 0;
    ctx.win.style.left = 0;
    ctx.win.style.width = document.documentElement.clientWidth + 'px';
    ctx.win.style.height = document.documentElement.clientHeight + 'px';
    ctx.opt.togglableShowHide = false;
    ctx.opt.usePinButton = false;
    ctx.opt.useWinCtrlButton = false;
    ctx.opt.useScreenMeasure = false;
    ctx.opt.useHtmlSrc = false;
    ctx.opt.useElementInfo = false;
    ctx.uiStatus |= DebugJS.UI_ST_VISIBLE;
    ctx.uiStatus &= ~DebugJS.UI_ST_RESIZABLE;
  },

  disableAllFeatures: function(ctx) {
    for (var i = 0; i < DebugJS.FEATURES.length; i++) {
      ctx.opt[DebugJS.FEATURES[i]] = false;
    }
  },

  isAllFeaturesDisabled: function(ctx) {
    for (var i = 0; i < DebugJS.FEATURES.length; i++) {
      if (ctx.opt[DebugJS.FEATURES[i]]) return false;
    }
    return true;
  },

  createPanels: function(ctx) {
    var opt = ctx.opt;
    var setStyle = DebugJS.setStyle;
    var fontSize = ctx.computedFontSize + 'px';

    ctx.winBody = document.createElement('div');
    ctx.win.appendChild(ctx.winBody);
    if (ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) {
      ctx.winBody.style.cursor = 'default';
    }

    if (!ctx.isAllFeaturesDisabled(ctx)) {
      ctx.headPanel = document.createElement('div');
      ctx.headPanel.style.padding = '2px';
      ctx.winBody.appendChild(ctx.headPanel);

      ctx.infoPanel = document.createElement('div');
      ctx.infoPanel.style.padding = '0 2px 1px 2px';
      ctx.winBody.appendChild(ctx.infoPanel);
    }

    ctx.mainPanel = document.createElement('div');
    if (opt.useLogFilter) {
      ctx.mainPanel.style.height = (opt.lines + 1) + '.1em';
    } else {
      ctx.mainPanel.style.height = opt.lines + '.1em';
    }
    ctx.mainPanel.style.clear = 'both';
    ctx.winBody.appendChild(ctx.mainPanel);

    if (opt.useLogFilter) {
      ctx.logHdrPanel = document.createElement('div');
      ctx.logHdrPanel.style.position = 'relative';
      ctx.logHdrPanel.style.height = fontSize;
      ctx.logHdrPanel.style.marginBottom = '2px';
      ctx.mainPanel.appendChild(ctx.logHdrPanel);
    }

    if (opt.useClearButton) {
      ctx.clearBtn = DebugJS.ui.addBtn(ctx.headPanel, '[CLR]', ctx.onClr);
    }

    if (opt.useLogFilter) ctx.createLogFilter(ctx);

    if (opt.useLogFilter) {
      ctx.logPanelHeightAdjust = ' - 1em';
    } else {
      ctx.logPanelHeightAdjust = '';
    }
    ctx.logPanel = document.createElement('div');
    ctx.logPanel.style.width = '100%';
    ctx.logPanel.style.height = 'calc(100%' + ctx.logPanelHeightAdjust + ')';
    ctx.logPanel.style.padding = '0';
    ctx.logPanel.style.overflow = 'auto';
    ctx.logPanel.addEventListener('scroll', ctx.onLogScroll, true);
    ctx.enableDnDFileLoad(ctx.logPanel, ctx.onDropOnLogPanel);
    ctx.mainPanel.appendChild(ctx.logPanel);

    if (ctx.isAllFeaturesDisabled(ctx)) return;

    if (opt.useClock) {
      ctx.clockLabel = document.createElement('span');
      ctx.clockLabel.style.marginLeft = '2px';
      setStyle(ctx.clockLabel, 'color', opt.clockColor);
      setStyle(ctx.clockLabel, 'font-size', fontSize);
      ctx.headPanel.appendChild(ctx.clockLabel);
      ctx.setIntervalL(ctx);
    }

    if (opt.togglableShowHide) {
      ctx.closeBtn = DebugJS.ui.addBtn(ctx.headPanel, 'x', DebugJS.hide);
      ctx.closeBtn.style.float = 'right';
      ctx.closeBtn.style.position = 'relative';
      ctx.closeBtn.style.top = '-1px';
      ctx.closeBtn.style.marginRight = '2px';
      setStyle(ctx.closeBtn, 'color', '#888');
      setStyle(ctx.closeBtn, 'font-size', (18 * ctx.zoom) + 'px');
      ctx.closeBtn.onmouseover = new Function('DebugJS.setStyle(this, \'color\', \'#d88\');');
      ctx.closeBtn.onmouseout = new Function('DebugJS.setStyle(this, \'color\', \'#888\');');
    }

    if ((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) && (ctx.uiStatus & DebugJS.UI_ST_RESIZABLE) && opt.useWinCtrlButton) {
      ctx.winCtrlBtnPanel = document.createElement('span');
      ctx.headPanel.appendChild(ctx.winCtrlBtnPanel);
    }

    if (opt.useCommandLine) {
      ctx.clpBtn = ctx.createHdrBtn('clpBtn', 'C', 3, fontSize, ctx.toggleClp, 'status', 'ST_CLP', 'CLP_BTN_COLOR', false, 'Copy the command result to clipboard');
    }

    if ((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) && opt.usePinButton) {
      ctx.pinBtn = ctx.createHdrBtn('pinBtn', 'P', 3, fontSize, ctx.toggleDraggable, 'uiStatus', 'UI_ST_DRAGGABLE', 'PIN_BTN_COLOR', true, 'Fix the window in its position');
    }

    if (opt.useSuspendLogButton) {
      ctx.suspendLogBtn = ctx.createHdrBtn('suspendLogBtn', '/', 3, fontSize, ctx.toggleLogSuspend, 'status', 'ST_LOG_SUSPEND', 'LOG_SUSPEND_BTN_COLOR', false, 'Suspend log');
    }

    if (DebugJS.LS_AVAILABLE) {
      ctx.preserveLogBtn = ctx.createHdrBtn('preserveLogBtn', '*', 5, fontSize, ctx.toggleLogPreserve, 'status', 'ST_LOG_PRESERVED', 'LOG_PRESERVE_BTN_COLOR', false, 'Preserve log');
    }

    if (opt.useStopwatch) {
      ctx.swLabel = document.createElement('span');
      ctx.swLabel.style.float = 'right';
      ctx.swLabel.style.marginLeft = '3px';
      setStyle(ctx.swLabel, 'color', opt.fontColor);
      ctx.headPanel.appendChild(ctx.swLabel);

      ctx.swBtnPanel = document.createElement('span');
      ctx.swBtnPanel.style.float = 'right';
      ctx.swBtnPanel.style.marginLeft = '4px';
      ctx.headPanel.appendChild(ctx.swBtnPanel);
    }

    ctx.extBtn = ctx.createHdrBtn('extBtn', ctx.extBtnLabel, 2, null, ctx.toggleExtPanel, 'status', 'ST_EXT_PANEL', 'EXT_BTN_COLOR', false);
    DebugJS.showExtBtn(false);

    if (opt.useTools) {
      ctx.toolsBtn = ctx.createHdrBtn('toolsBtn', 'TOOL', 2, null, ctx.toggleTools, 'status', 'ST_TOOLS', 'TOOLS_BTN_COLOR', false);
    }
    if (opt.useJsEditor) {
      ctx.jsBtn = ctx.createHdrBtn('jsBtn', 'JS', 2, null, ctx.toggleJs, 'status', 'ST_JS', 'JS_BTN_COLOR', false);
    }
    if (opt.useElementInfo) {
      ctx.elmInfoBtn = ctx.createHdrBtn('elmInfoBtn', 'DOM', 3, null, ctx.toggleElmInfo, 'status', 'ST_ELM_INFO', 'DOM_BTN_COLOR', false);
    }
    if (opt.useHtmlSrc) {
      ctx.htmlSrcBtn = ctx.createHdrBtn('htmlSrcBtn', 'HTM', 3, null, ctx.toggleHtmlSrc, 'status', 'ST_HTML_SRC', 'HTML_BTN_COLOR', false);
    }
    if (opt.useSystemInfo) {
      ctx.sysInfoBtn = ctx.createHdrBtn('sysInfoBtn', 'SYS', 3, null, ctx.toggleSystemInfo, 'status', 'ST_SYS_INFO', 'SYS_BTN_COLOR', false);
    }

    if (opt.useScreenMeasure) {
      var measBtn = document.createElement('span');
      measBtn.className = 'dbg-btn dbg-nomove';
      measBtn.style.display = 'inline-block';
      measBtn.style.float = 'right';
      measBtn.style.marginTop = ((ctx.zoom <= 1) ? 1 : (2 * ctx.zoom)) + 'px';
      measBtn.style.marginLeft = '3px';
      measBtn.style.width = (10 * ctx.zoom) + 'px';
      measBtn.style.height = (7 * ctx.zoom) + 'px';
      measBtn.innerText = ' ';
      measBtn.onclick = ctx.toggleMeasure;
      measBtn.onmouseover = new Function('DebugJS.ctx.measBtn.style.borderColor=\'' + DebugJS.MEAS_BTN_COLOR + '\';');
      measBtn.onmouseout = new Function('DebugJS.ctx.measBtn.style.borderColor=(DebugJS.ctx.status & DebugJS.ST_MEASURE) ? DebugJS.MEAS_BTN_COLOR : DebugJS.COLOR_INACT;');
      ctx.headPanel.appendChild(measBtn);
      ctx.measBtn = measBtn;
    }

    if (opt.useLed) {
      ctx.ledPanel = document.createElement('span');
      ctx.ledPanel.className = 'dbg-sys-info';
      ctx.ledPanel.style.float = 'right';
      ctx.ledPanel.style.marginRight = '4px';
      ctx.infoPanel.appendChild(ctx.ledPanel);
    }

    if (opt.useDeviceInfo) {
      ctx.winSizeLabel = ctx.createSysInfoLabel();
      ctx.clientSizeLabel = ctx.createSysInfoLabel();
      ctx.bodySizeLabel = ctx.createSysInfoLabel();
      ctx.pixelRatioLabel = ctx.createSysInfoLabel();
      ctx.scrollPosLabel = ctx.createSysInfoLabel();
      ctx.mousePosLabel = ctx.createSysInfoLabel();
      ctx.mouseClickLabel = ctx.createSysInfoLabel();
      ctx.infoPanel.appendChild(document.createElement('br'));
      ctx.keyLabelDw = ctx.createSysInfoLabel();
      ctx.keyLabelPr = ctx.createSysInfoLabel();
      ctx.keyLabelUp = ctx.createSysInfoLabel();
    }

    if (opt.useMsgDisplay) {
      var msgLabel = ctx.createSysInfoLabel();
      msgLabel.style.float = 'right';
      msgLabel.style.position = 'absolute';
      msgLabel.style.marginRight = '0';
      msgLabel.style.right = '5px';
      msgLabel.style.border = '0';
      msgLabel.style.padding = '0 1px';
      msgLabel.style.background = opt.msgDisplayBackground;
      setStyle(msgLabel, 'color', opt.fontColor);
      msgLabel.style.whiteSpace = 'pre-wrap';
      msgLabel.style.wordBreak = 'break-all';
      msgLabel.style.overflow = 'hidden';
      msgLabel.style.textOverflow = 'ellipsis';
      ctx.msgLabel = msgLabel;
    }

    if (opt.useCommandLine) {
      ctx.cmdPanel = document.createElement('div');
      ctx.cmdPanel.style.padding = DebugJS.CMD_LINE_PADDING + 'px';
      ctx.winBody.appendChild(ctx.cmdPanel);
      ctx.cmdPanel.innerHTML = '<span style="color:' + opt.promptColor + ' !important">$</span>';
      var style = {
        'min-height': fontSize,
        'width': 'calc(100% - ' + fontSize + ')',
        'margin': '0 0 0 2px',
        'border': '0',
        'border-bottom': 'solid 1px #888',
        'border-radius': '0',
        'outline': 'none',
        'box-shadow': 'none',
        'padding': '1px',
        'background': 'transparent',
        'color': opt.fontColor,
        'font-size': fontSize
      };
      ctx.cmdLine = DebugJS.ui.addElement(ctx.cmdPanel, 'input', style);
      ctx.cmdLine.spellcheck = false;
      ctx.initHistory(ctx);
    }
  },

  initResize: function(ctx) {
    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      var resizeN = ctx.createResizeSideArea('ns-resize', DebugJS.UI_ST_RESIZING_N, '100%', '6px');
      resizeN.style.top = '-3px';
      resizeN.style.left = '0';
      ctx.win.appendChild(resizeN);
    }

    var resizeE = ctx.createResizeSideArea('ew-resize', DebugJS.UI_ST_RESIZING_E, '6px', '100%');
    resizeE.style.top = '0';
    resizeE.style.right = '-3px';
    ctx.win.appendChild(resizeE);

    var resizeS = ctx.createResizeSideArea('ns-resize', DebugJS.UI_ST_RESIZING_S, '100%', '6px');
    resizeS.style.bottom = '-3px';
    resizeS.style.left = '0';
    ctx.win.appendChild(resizeS);

    var resizeSE = ctx.createResizeCornerArea('nwse-resize', DebugJS.UI_ST_RESIZING_S | DebugJS.UI_ST_RESIZING_E);
    resizeSE.style.bottom = '-3px';
    resizeSE.style.right = '-3px';
    ctx.win.appendChild(resizeSE);

    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      var resizeW = ctx.createResizeSideArea('ew-resize', DebugJS.UI_ST_RESIZING_W, '6px', '100%');
      resizeW.style.top = '0';
      resizeW.style.left = '-3px';
      ctx.win.appendChild(resizeW);

      var resizeNW = ctx.createResizeCornerArea('nwse-resize', DebugJS.UI_ST_RESIZING_N | DebugJS.UI_ST_RESIZING_W);
      resizeNW.style.top = '-3px';
      resizeNW.style.left = '-3px';
      ctx.win.appendChild(resizeNW);

      var resizeNE = ctx.createResizeCornerArea('nesw-resize', DebugJS.UI_ST_RESIZING_N | DebugJS.UI_ST_RESIZING_E);
      resizeNE.style.top = '-3px';
      resizeNE.style.right = '-3px';
      ctx.win.appendChild(resizeNE);

      var resizeSW = ctx.createResizeCornerArea('nesw-resize', DebugJS.UI_ST_RESIZING_S | DebugJS.UI_ST_RESIZING_W);
      resizeSW.style.bottom = '-3px';
      resizeSW.style.left = '-3px';
      ctx.win.appendChild(resizeSW);

      ctx.winBody.ondblclick = ctx.onDbgWinDblClick;
    }
  },

  initDbgWin: function(ctx) {
    var opt = ctx.opt;
    if (ctx.isAllFeaturesDisabled(ctx)) return;
    if (opt.useLogFilter) ctx.updateLogFilterBtns();
    if (opt.useScreenMeasure) ctx.updateMeasBtn(ctx);
    if (opt.useSystemInfo) ctx.updateSysInfoBtn(ctx);
    if (opt.useElementInfo) ctx.updateElmInfoBtn(ctx);
    if (opt.useHtmlSrc) ctx.updateHtmlSrcBtn(ctx);
    if (opt.useJsEditor) ctx.updateJsBtn(ctx);
    if (opt.useTools) ctx.updateToolsBtn(ctx);
    if (ctx.extPanel) ctx.updateExtBtn(ctx);
    if (opt.useStopwatch) {
      ctx.updateSwBtnPanel(ctx);
      ctx.updateSwLabel();
    }
    if ((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) && opt.usePinButton) {
      ctx.updatePinBtn(ctx);
    }
    if (ctx.preserveLogBtn) ctx.updatePreserveLogBtn(ctx);
    if (opt.useSuspendLogButton) ctx.updateSuspendLogBtn(ctx);
    if ((ctx.uiStatus & DebugJS.UI_ST_RESIZABLE) && opt.useWinCtrlButton) {
      ctx.updateWinCtrlBtnPanel();
    }
    if (opt.useDeviceInfo) {
      ctx.updateMousePosLabel();
      ctx.updateMouseClickLabel();
      ctx.updateWindowSizeLabel();
      ctx.updateClientSizeLabel();
      ctx.updateBodySizeLabel();
      ctx.updateScrollPosLabel();
    }
    if (opt.useLed) ctx.updateLedPanel();
    if (opt.useMsgDisplay) ctx.updateMsgLabel();
  },

  createHdrBtn: function(btnObj, label, marginLeft, fontSize, handler, status, state, actvColor, reverse, title) {
    var ctx = DebugJS.ctx;
    var btn = DebugJS.ui.addBtn(ctx.headPanel, label, handler);
    btn.style.float = 'right';
    btn.style.marginLeft = (marginLeft * ctx.zoom) + 'px';
    if (fontSize) DebugJS.setStyle(btn, 'font-size', fontSize);
    DebugJS.setStyle(btn, 'color', DebugJS.COLOR_INACT);
    btn.onmouseover = new Function('DebugJS.setStyle(DebugJS.ctx.' + btnObj + ', \'color\', DebugJS.' + actvColor + ');');
    var fnSfx = (reverse ? 'DebugJS.COLOR_INACT : DebugJS.' + actvColor + ');' : 'DebugJS.' + actvColor + ' : DebugJS.COLOR_INACT);');
    btn.onmouseout = new Function('DebugJS.setStyle(DebugJS.ctx.' + btnObj + ', \'color\', (DebugJS.ctx.' + status + ' & DebugJS.' + state + ') ? ' + fnSfx);
    if (title) btn.title = title;
    return btn;
  },

  createSysInfoLabel: function() {
    var el = DebugJS.ui.addElement(DebugJS.ctx.infoPanel, 'span');
    el.className = 'dbg-sys-info';
    return el;
  },

  createLogFilter: function(ctx) {
    if (ctx.opt.showTimeStamp) ctx.dtBtn = ctx.createLogFltBtn2(ctx, '(DATE)', 'dtBtn', ctx.logDt, 'logDt', ctx.toggleLogDt);
    ctx.fltrBtnAll = ctx.createLogFltBtn('ALL', 'ALL', 'fltrBtnAll', 'btnColor');
    ctx.fltrBtnStd = ctx.createLogFltBtn('L', 'LOG', 'fltrBtnStd', 'fontColor');
    ctx.fltrBtnVrb = ctx.createLogFltBtn('V', 'VRB', 'fltrBtnVrb', 'logColorV');
    ctx.fltrBtnDbg = ctx.createLogFltBtn('D', 'DBG', 'fltrBtnDbg', 'logColorD');
    ctx.fltrBtnInf = ctx.createLogFltBtn('I', 'INF', 'fltrBtnInf', 'logColorI');
    ctx.fltrBtnWrn = ctx.createLogFltBtn('W', 'WRN', 'fltrBtnWrn', 'logColorW');
    ctx.fltrBtnErr = ctx.createLogFltBtn('E', 'ERR', 'fltrBtnErr', 'logColorE');
    ctx.fltrBtnFtl = ctx.createLogFltBtn('F', 'FTL', 'fltrBtnFtl', 'logColorF');

    var style = {
      'margin-left': '4px',
      'color': ctx.opt.sysInfoColor
    };
    ctx.fltrInputLabel = DebugJS.ui.addElement(ctx.logHdrPanel, 'span', style, true);
    ctx.fltrInputLabel.innerText = 'Search:';

    var fltrW = 'calc(100% - 31em)';
    ctx.fltrInput = DebugJS.ui.addTextInput(ctx.logHdrPanel, fltrW, null, ctx.opt.sysInfoColor, ctx.fltrText, DebugJS.ctx.onchangeLogFilter);
    ctx.fltrInput.spellcheck = false;
    DebugJS.setStyle(ctx.fltrInput, 'position', 'relative');
    DebugJS.setStyle(ctx.fltrInput, 'top', '-2px');
    DebugJS.setStyle(ctx.fltrInput, 'margin-left', '2px');

    ctx.fltrBtn = ctx.createLogFltBtn2(ctx, 'FL', 'fltrBtn', ctx.fltr, 'fltr', ctx.toggleFilter);
    ctx.fltrCaseBtn = ctx.createLogFltBtn2(ctx, 'Aa', 'fltrCaseBtn', ctx.fltrCase, 'fltrCase', ctx.toggleFilterCase);
    ctx.fltrTxtHtmlBtn = ctx.createLogFltBtn2(ctx, '</>', 'fltrTxtHtmlBtn', ctx.fltrTxtHtml, 'fltrTxtHtml', ctx.toggleFilterTxtHtml);
  },

  createLogFltBtn: function(lbl, type, btnObj, color) {
    var ctx = DebugJS.ctx;
    var fn = new Function('DebugJS.ctx.toggleLogFilter(DebugJS.LOG_FLTR_' + type + ');');
    var btn = DebugJS.ui.addBtn(ctx.logHdrPanel, '[' + lbl + ']', fn);
    btn.style.marginLeft = '2px';
    btn.onmouseover = new Function('DebugJS.setStyle(DebugJS.ctx.' + btnObj + ', \'color\', DebugJS.ctx.opt.' + color + ');');
    btn.onmouseout = ctx.updateLogFilterBtns;
    return btn;
  },

  createLogFltBtn2: function(ctx, label, btnNm, flg, flgNm, fn) {
    var btn = DebugJS.ui.addBtn(ctx.logHdrPanel, label, fn);
    btn.style.marginLeft = '2px';
    DebugJS.setStyle(btn, 'color', (flg) ? DebugJS.FLT_BTN_COLOR : DebugJS.COLOR_INACT);
    btn.onmouseover = new Function('DebugJS.setStyle(DebugJS.ctx.' + btnNm + ', \'color\', DebugJS.FLT_BTN_COLOR);');
    btn.onmouseout = new Function('DebugJS.setStyle(DebugJS.ctx.' + btnNm + ', \'color\', (DebugJS.ctx.' + flgNm + ') ? DebugJS.FLT_BTN_COLOR : DebugJS.COLOR_INACT);');
    return btn;
  },

  setLogFilter: function(ctx, s, cs, fl) {
    ctx.fltrInput.value = s;
    ctx.setFilterCase(ctx, cs);
    ctx.setFilter(ctx, fl);
    ctx.onchangeLogFilter();
  },

  initCmdTbl: function(ctx) {
    ctx.CMD_TBL = [];
    for (var i = 0; i < ctx.INT_CMD_TBL.length; i++) {
      if (ctx.opt.disableAllCommands) {
        if (ctx.INT_CMD_TBL[i].attr & DebugJS.CMD_ATTR_SYSTEM) {
          ctx.CMD_TBL.push(ctx.INT_CMD_TBL[i]);
        }
      } else {
        if (!(!(ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) && (ctx.INT_CMD_TBL[i].attr & DebugJS.CMD_ATTR_DYNAMIC)) &&
            (!((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) && (ctx.opt.mode == 'kiosk') &&
             (ctx.INT_CMD_TBL[i].attr & DebugJS.CMD_ATTR_NO_KIOSK)))) {
          ctx.CMD_TBL.push(ctx.INT_CMD_TBL[i]);
        }
      }
    }
  },

  resetStylesOnZoom: function(ctx) {
    var setStyle = DebugJS.setStyle;
    var fontSize = ctx.computedFontSize + 'px';
    if (ctx.toolsPanel) {
      ctx.toolsHdrPanel.style.height = fontSize;
      ctx.toolsBodyPanel.style.height = 'calc(100% - ' + ctx.computedFontSize + 'px)';
    }
    if (ctx.fileVwrPanel) {
      setStyle(ctx.fileInput, 'width', 'calc(100% - ' + (ctx.computedFontSize * 12) + 'px)');
      setStyle(ctx.fileInput, 'min-height', (20 * ctx.zoom) + 'px');
      setStyle(ctx.fileInput, 'font-size', fontSize);
      setStyle(ctx.filePreviewWrapper, 'height', 'calc(100% - ' + ((ctx.computedFontSize * 4) + 10) + 'px)');
      setStyle(ctx.filePreviewWrapper, 'font-size', fontSize);
      setStyle(ctx.filePreview, 'font-size', fontSize);
      ctx.fileVwrFooter.style.height = (ctx.computedFontSize + 3) + 'px';
      ctx.fileLoadProgBar.style.width = 'calc(100% - ' + (ctx.computedFontSize * 5) + 'px)';
      setStyle(ctx.fileLoadProg, 'font-size', (ctx.computedFontSize * 0.8) + 'px');
    }
    if (ctx.extPanel) {
      ctx.extHdrPanel.style.height = fontSize;
      ctx.extBodyPanel.style.height = 'calc(100% - ' + ctx.computedFontSize + 'px)';
    }
  },

  reopenFeatures: function(ctx) {
    while (true) {
      var f = ctx.featStackBak.shift();
      if (f == undefined) break;
      ctx.openFeature(ctx, f, undefined, true);
    }
  },

  restoreDbgWinSize: function(ctx, sizeStatus) {
    if (sizeStatus == DebugJS.SIZE_ST_FULL_WH) {
      ctx.setWinSize('full');
    } else if (sizeStatus == DebugJS.SIZE_ST_EXPANDED) {
      ctx._expandDbgWin(ctx);
    }
  },

  setWinPos: function(pos, dbgWinW, dbgWinH) {
    var opt = DebugJS.ctx.opt;
    var top = opt.adjY;
    var left = opt.adjX;
    var clW = document.documentElement.clientWidth;
    var clH = document.documentElement.clientHeight;
    if (clW > window.outerWidth) clW = window.outerWidth;
    if (clH > window.outerHeight) clH = window.outerHeight;
    switch (pos) {
      case 'se':
        top = clH - dbgWinH - opt.adjY;
        left = clW - dbgWinW - opt.adjX;
        break;
      case 'ne':
        top = opt.adjY;
        left = clW - dbgWinW - opt.adjX;
        break;
      case 'c':
        top = (clH / 2) - (dbgWinH / 2);
        left = (clW / 2) - (dbgWinW / 2);
        break;
      case 'sw':
        top = clH - dbgWinH - opt.adjY;
        left = opt.adjX;
        break;
      case 'n':
        top = opt.adjY;
        left = (clW / 2) - (dbgWinW / 2);
        break;
      case 'e':
        top = (clH / 2) - (dbgWinH / 2);
        left = clW - dbgWinW - opt.adjX;
        break;
      case 's':
        top = clH - dbgWinH - opt.adjY;
        left = (clW / 2) - (dbgWinW / 2);
        break;
      case 'w':
        top = (clH / 2) - (dbgWinH / 2);
        left = opt.adjX;
    }
    DebugJS.ctx.win.style.top = top + 'px';
    DebugJS.ctx.win.style.left = left + 'px';
  },

  updateClockLabel: function() {
    var ctx = DebugJS.ctx;
    var dt = DebugJS.getDateTime();
    var t = dt.yyyy + '-' + dt.mm + '-' + dt.dd + ' ' + DebugJS.WDAYS[dt.wday] + ' ' + dt.hh + ':' + dt.mi + ':' + dt.ss;
    ctx.clockLabel.innerText = t;
    ctx.clockTmId = setTimeout(ctx.updateClockLabel, ctx.clockUpdInt);
  },
  startUdtClock: function(ctx) {
    ctx.stopUdtClock(ctx);
    ctx.updateClockLabel();
  },
  stopUdtClock: function(ctx) {
    if (ctx.clockTmId > 0) {
      clearTimeout(ctx.clockTmId);
      ctx.clockTmId = 0;
    }
  },

  updateWindowSizeLabel: function() {
    try {
      var ctx = DebugJS.ctx;
      var w = window.outerWidth;
      var h = window.outerHeight;
      ctx.winSizeLabel.innerText = 'WIN:w=' + w + ',h=' + h;
      if (ctx.status & DebugJS.ST_SYS_INFO) {
        DebugJS.writeHTML(ctx.id + '-sys-win-w', w);
        DebugJS.writeHTML(ctx.id + '-sys-win-h', h);
        DebugJS.writeHTML(ctx.id + '-sys-scn-x', window.screenX);
        DebugJS.writeHTML(ctx.id + '-sys-scn-y', window.screenY);
      }
    } catch (e) {}
  },

  updateClientSizeLabel: function() {
    var ctx = DebugJS.ctx;
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    ctx.clientSizeLabel.innerText = 'CLI:w=' + w + ',h=' + h;
    if (ctx.status & DebugJS.ST_SYS_INFO) {
      DebugJS.writeHTML(ctx.id + '-sys-cli-w', w);
      DebugJS.writeHTML(ctx.id + '-sys-cli-h', h);
    }
  },

  updateBodySizeLabel: function() {
    var ctx = DebugJS.ctx;
    var w = this.bodyEl.clientWidth;
    var h = this.bodyEl.clientHeight;
    ctx.bodySizeLabel.innerText = 'BODY:w=' + w + ',h=' + h;
    if (ctx.status & DebugJS.ST_SYS_INFO) {
      DebugJS.writeHTML(ctx.id + '-sys-body-w', w);
      DebugJS.writeHTML(ctx.id + '-sys-body-h', h);
    }
    ctx.pixelRatioLabel.innerText = DebugJS.getWinZoomRatio();
  },

  updateScrollPosLabel: function() {
    this.scrollPosLabel.innerText = 'SCROLL:x=' + this.scrollPosX + ',y=' + this.scrollPosY;
  },

  updateMousePosLabel: function() {
    this.mousePosLabel.innerText = 'POS:x=' + this.mousePos.x + ',y=' + this.mousePos.y;
  },

  updateMouseClickLabel: function() {
    var s = '<span style="color:' + this.mouseClick0 + ' !important;margin-right:2px;">0</span>' +
    '<span style="color:' + this.mouseClick1 + ' !important;margin-right:2px;">1</span>' +
    '<span style="color:' + this.mouseClick2 + ' !important">2</span>';
    this.mouseClickLabel.innerHTML = 'CLICK:' + s;
  },

  updateKeyDownLabel: function() {
    this.keyLabelDw.innerHTML = 'Key Down:' + this.keyCodeDw;
  },
  updateKeyPressLabel: function() {
    this.keyLabelPr.innerHTML = 'Press:' + this.keyCodePr;
  },
  updateKeyUpLabel: function() {
    this.keyLabelUp.innerHTML = 'Up:' + this.keyCodeUp;
  },

  updateLedPanel: function() {
    if (!DebugJS.ctx.ledPanel) return;
    var SHADOW = 'text-shadow:0 0 5px;';
    var led = '';
    for (var i = 7; i >= 0; i--) {
      var color = (DebugJS.ctx.led & DebugJS.LED_BIT[i]) ? 'color:' + DebugJS.LED_COLOR[i] + ' !important;' + SHADOW : 'color:' + DebugJS.LED_COLOR_INACT + ' !important;';
      var margin = (i == 0 ? '' : 'margin-right:2px');
      led += '<span style="' + color + margin + '">' + DebugJS.CHR_LED + '</span>';
    }
    DebugJS.ctx.ledPanel.innerHTML = led;
  },

  updateMsgLabel: function() {
    var ctx = DebugJS.ctx;
    var s = ctx.msgStr;
    if (ctx.msgLabel) {
      ctx.msgLabel.innerHTML = '<pre>' + s + '</pre>';
      var o = (s == '' ? 0 : 1);
      ctx.msgLabel.style.opacity = o;
    }
  },

  updateMeasBtn: function(ctx) {
    ctx.measBtn.style.border = 'solid ' + ctx.zoom + 'px ' + ((ctx.status & DebugJS.ST_MEASURE) ? DebugJS.MEAS_BTN_COLOR : DebugJS.COLOR_INACT);
  },

  updateSysInfoBtn: function(ctx) {
    ctx.updateBtnActive(ctx.sysInfoBtn, DebugJS.ST_SYS_INFO, DebugJS.SYS_BTN_COLOR);
  },

  updateElmInfoBtn: function(ctx) {
    ctx.updateBtnActive(ctx.elmInfoBtn, DebugJS.ST_ELM_INFO, DebugJS.DOM_BTN_COLOR);
  },

  updateHtmlSrcBtn: function(ctx) {
    ctx.updateBtnActive(ctx.htmlSrcBtn, DebugJS.ST_HTML_SRC, DebugJS.HTML_BTN_COLOR);
  },

  updateJsBtn: function(ctx) {
    ctx.updateBtnActive(ctx.jsBtn, DebugJS.ST_JS, DebugJS.JS_BTN_COLOR);
  },

  updateToolsBtn: function(ctx) {
    ctx.updateBtnActive(ctx.toolsBtn, DebugJS.ST_TOOLS, DebugJS.TOOLS_BTN_COLOR);
  },

  updateExtBtn: function(ctx) {
    ctx.updateBtnActive(ctx.extBtn, DebugJS.ST_EXT_PANEL, DebugJS.EXT_BTN_COLOR);
  },

  updateSwBtnPanel: function(ctx) {
    if (!ctx.swBtnPanel) return;
    var lbl = (ctx.status & DebugJS.ST_STOPWATCH_RUNNING) ? '||' : '>>';
    var margin = (2 * ctx.zoom) + 'px';
    var btns = DebugJS.ui.createBtnHtml('0', 'DebugJS.ctx.resetStopwatch();', 'margin-right:' + margin) + DebugJS.ui.createBtnHtml(lbl, 'DebugJS.ctx.startStopStopwatch();', 'margin-right:' + margin);
    ctx.swBtnPanel.innerHTML = btns;
  },

  updatePreserveLogBtn: function(ctx) {
    ctx.updateBtnActive(ctx.preserveLogBtn, DebugJS.ST_LOG_PRESERVED, DebugJS.LOG_PRESERVE_BTN_COLOR);
  },

  updateSuspendLogBtn: function(ctx) {
    ctx.updateBtnActive(ctx.suspendLogBtn, DebugJS.ST_LOG_SUSPEND, DebugJS.LOG_SUSPEND_BTN_COLOR);
  },

  updatePinBtn: function(ctx) {
    if (ctx.pinBtn) DebugJS.setStyle(ctx.pinBtn, 'color', (ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) ? DebugJS.COLOR_INACT : DebugJS.PIN_BTN_COLOR);
  },

  updateClpBtn: function(ctx) {
    if (ctx.clpBtn) DebugJS.setStyle(ctx.clpBtn, 'color', (ctx.status & DebugJS.ST_CLP) ? DebugJS.CLP_BTN_COLOR : DebugJS.COLOR_INACT);
  },

  updateBtnActive: function(btn, st, actvColor) {
    if (btn) DebugJS.setStyle(btn, 'color', (DebugJS.ctx.status & st) ? actvColor : DebugJS.COLOR_INACT);
  },

  updateWinCtrlBtnPanel: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.winCtrlBtnPanel) return;
    var fn = 'DebugJS.ctx.expandDbgWin(\'full\');';
    var btn = DebugJS.CHR_WIN_FULL;
    if (ctx.sizeStatus == DebugJS.SIZE_ST_FULL_WH) {
      fn = 'DebugJS.ctx.restoreDbgWin();';
      btn = DebugJS.CHR_WIN_RST;
    }
    fn += 'DebugJS.ctx.updateWinCtrlBtnPanel();DebugJS.ctx.focusCmdLine();';
    var b = '<span class="dbg-btn dbg-nomove" style="float:right;position:relative;top:-1px;margin-right:' + (3 * ctx.zoom) + 'px;font-size:' + (16 * ctx.zoom) + 'px !important;color:#888 !important" onclick="' + fn + '" onmouseover="DebugJS.setStyle(this, \'color\', \'#ddd\');" onmouseout="DebugJS.setStyle(this, \'color\', \'#888\');">' + btn + '</span>' +
    '<span class="dbg-btn dbg-nomove" style="float:right;position:relative;top:-2px;margin-left:' + 2 * ctx.zoom + 'px;margin-right:' + ctx.zoom + 'px;font-size:' + (30 * ctx.zoom) + 'px !important;color:#888 !important" onclick="DebugJS.ctx.resetDbgWinSizePos();DebugJS.ctx.focusCmdLine();" onmouseover="DebugJS.setStyle(this, \'color\', \'#ddd\');" onmouseout="DebugJS.setStyle(this, \'color\', \'#888\');">-</span>';
    ctx.winCtrlBtnPanel.innerHTML = b;
  },

  printLogs: function() {
    var ctx = DebugJS.ctx;
    ctx._printLogs(ctx);
    if (ctx.uiStatus & DebugJS.UI_ST_LOG_SCROLL) ctx.scrollLogBtm(ctx);
  },
  _printLogs: function(ctx) {
    if (!ctx.win) return;
    var opt = ctx.opt;
    var buf = ctx.logBuf.getAll();
    var cnt = ctx.logBuf.count();
    var len = buf.length;
    var lineCnt = cnt - len;
    var filter = ctx.fltrText;
    var fltCase = ctx.fltrCase;
    if (!fltCase) filter = filter.toLowerCase();
    var logs = '';
    for (var i = 0; i < len; i++) {
      lineCnt++;
      var data = buf[i];
      var msg = (ctx.fltrTxtHtml ? data.msg : DebugJS.escHtml(data.msg));
      var style = '';
      switch (data.type) {
        case DebugJS.LOG_TYPE_DBG:
          if (!(ctx.logFilter & DebugJS.LOG_FLTR_DBG)) continue;
          style = 'color:' + opt.logColorD;
          break;
        case DebugJS.LOG_TYPE_INF:
          if (!(ctx.logFilter & DebugJS.LOG_FLTR_INF)) continue;
          style = 'color:' + opt.logColorI;
          break;
        case DebugJS.LOG_TYPE_ERR:
          if (!(ctx.logFilter & DebugJS.LOG_FLTR_ERR)) continue;
          style = 'color:' + opt.logColorE;
          break;
        case DebugJS.LOG_TYPE_FTL:
          if (!(ctx.logFilter & DebugJS.LOG_FLTR_FTL)) continue;
          style = 'color:' + opt.logColorF;
          break;
        case DebugJS.LOG_TYPE_WRN:
          if (!(ctx.logFilter & DebugJS.LOG_TYPE_WRN)) continue;
          style = 'color:' + opt.logColorW;
          break;
        case DebugJS.LOG_TYPE_VRB:
          if (!(ctx.logFilter & DebugJS.LOG_TYPE_VRB)) continue;
          style = 'color:' + opt.logColorV;
          break;
        case DebugJS.LOG_TYPE_SYS:
          if (!(ctx.logFilter & DebugJS.LOG_FLTR_LOG)) continue;
          style = 'color:' + opt.logColorS + ';text-shadow:0 0 3px';
          break;
        case DebugJS.LOG_TYPE_MLT:
          if (!(ctx.logFilter & DebugJS.LOG_FLTR_LOG)) continue;
          style = 'display:inline-block;width:100%;margin:' + Math.round(ctx.computedFontSize * 0.5) + 'px 0';
          break;
        default:
          if (!(ctx.logFilter & DebugJS.LOG_FLTR_LOG)) continue;
      }
      if (filter != '') {
        try {
          var pos = (fltCase ? msg.indexOf(filter) : msg.toLowerCase().indexOf(filter));
          if (pos != -1) {
            var key = msg.substr(pos, filter.length);
            var hl = '<span class="dbg-txt-hl">' + key + '</span>';
            msg = msg.replace(key, hl, 'ig');
          } else if (ctx.fltr) {
            continue;
          }
        } catch (e) {}
      }
      var lineNum = '';
      if (opt.showLineNums && (data.type != DebugJS.LOG_TYPE_MLT)) {
        var diff = DebugJS.digits(cnt) - DebugJS.digits(lineCnt);
        var pdng = '';
        for (var j = 0; j < diff; j++) {
          pdng += '0';
        }
        lineNum = pdng + lineCnt + ': ';
      }
      var color = '';
      if ((data.type == DebugJS.LOG_TYPE_RES) || (data.type == DebugJS.LOG_TYPE_ERES)) {
        msg = DebugJS.quoteStrIfNeeded(DebugJS.setStyleIfObjNA(msg));
        if (data.type == DebugJS.LOG_TYPE_RES) {
          color = opt.promptColor;
        } else {
          color = opt.promptColorE;
        }
        msg = '<span style=color:' + color + '>&gt;</span> ' + msg;
      }
      var m = msg;
      if (data.type != DebugJS.LOG_TYPE_MLT) {
        if (opt.showTimeStamp) {
          var tmfn = (ctx.logDt ? DebugJS.getDateTimeStr : DebugJS.getTimeStr);
          m = tmfn(data.time) + ' ' + msg;
        }
      }
      if (style) {
        logs += lineNum + '<span style="' + style + '">' + m + '</span>\n';
      } else {
        logs += lineNum + m + '\n';
      }
    }
    ctx.logPanel.innerHTML = '<pre style="padding:0 3px !important">' + logs + '</pre>';
  },
  onLogScroll: function() {
    var ctx = DebugJS.ctx;
    var rect = ctx.logPanel.getBoundingClientRect();
    var h = rect.height;
    var d = ctx.logPanel.scrollHeight - ctx.logPanel.scrollTop;
    if ((d - 17 <= h) && (h <= d + 17)) {
      ctx.startLogScrolling();
    } else {
      ctx.stopLogScrolling();
    }
  },
  scrollLogBtm: function(ctx) {
    if (ctx.logPanel) ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
  },
  startLogScrolling: function() {
    DebugJS.ctx.uiStatus |= DebugJS.UI_ST_LOG_SCROLL;
  },
  stopLogScrolling: function() {
    DebugJS.ctx.uiStatus &= ~DebugJS.UI_ST_LOG_SCROLL;
  },
  onClr: function() {
    DebugJS.ctx.clearLog();
    DebugJS.ctx.focusCmdLine();
  },
  clearLog: function() {
    DebugJS.ctx.logBuf.clear();
    DebugJS.ctx.printLogs();
  },

  toggleLogDt: function() {
    DebugJS.ctx.setLogDt(DebugJS.ctx, DebugJS.ctx.logDt ? 0 : 1);
  },
  setLogDt: function(ctx, f) {
    ctx.logDt = f;
    ctx.updateBtnActive(ctx.dtBtn, ctx.logDt, DebugJS.COLOR_ACTIVE);
    ctx.printLogs();
  },

  toggleLogFilter: function(fltr) {
    var ctx = DebugJS.ctx;
    if (fltr == DebugJS.LOG_FLTR_ALL) {
      if ((ctx.logFilter & ~DebugJS.LOG_FLTR_VRB) == DebugJS.LOG_FLTR_ALL) {
        ctx.logFilter = 0;
      } else {
        ctx.logFilter |= fltr;
      }
    } else if (fltr == DebugJS.LOG_FLTR_VRB) {
      if (ctx.logFilter & DebugJS.LOG_FLTR_VRB) {
        ctx.logFilter &= ~fltr;
      } else {
        ctx.logFilter |= fltr;
      }
    } else {
      if ((ctx.logFilter & ~DebugJS.LOG_FLTR_VRB) == DebugJS.LOG_FLTR_ALL) {
        ctx.logFilter = fltr;
      } else {
        if (ctx.logFilter & fltr) {
          ctx.logFilter &= ~fltr;
        } else {
          ctx.logFilter |= fltr;
        }
      }
    }
    ctx.updateLogFilterBtns();
    ctx.printLogs();
    if (fltr == DebugJS.LOG_FLTR_ALL) ctx.scrollLogBtm(ctx);
  },

  updateLogFilterBtns: function() {
    var ctx = DebugJS.ctx;
    var opt = ctx.opt;
    var fltr = ctx.logFilter;
    var setStyle = DebugJS.setStyle;
    setStyle(ctx.fltrBtnAll, 'color', ((fltr & ~DebugJS.LOG_FLTR_VRB) == DebugJS.LOG_FLTR_ALL) ? opt.btnColor : DebugJS.COLOR_INACT);
    setStyle(ctx.fltrBtnStd, 'color', (fltr & DebugJS.LOG_FLTR_LOG) ? opt.fontColor : DebugJS.COLOR_INACT);
    setStyle(ctx.fltrBtnFtl, 'color', (fltr & DebugJS.LOG_FLTR_FTL) ? opt.logColorF : DebugJS.COLOR_INACT);
    setStyle(ctx.fltrBtnErr, 'color', (fltr & DebugJS.LOG_FLTR_ERR) ? opt.logColorE : DebugJS.COLOR_INACT);
    setStyle(ctx.fltrBtnWrn, 'color', (fltr & DebugJS.LOG_FLTR_WRN) ? opt.logColorW : DebugJS.COLOR_INACT);
    setStyle(ctx.fltrBtnInf, 'color', (fltr & DebugJS.LOG_FLTR_INF) ? opt.logColorI : DebugJS.COLOR_INACT);
    setStyle(ctx.fltrBtnDbg, 'color', (fltr & DebugJS.LOG_FLTR_DBG) ? opt.logColorD : DebugJS.COLOR_INACT);
    setStyle(ctx.fltrBtnVrb, 'color', (fltr & DebugJS.LOG_FLTR_VRB) ? opt.logColorV : DebugJS.COLOR_INACT);
  },

  onchangeLogFilter: function() {
    DebugJS.ctx.fltrText = DebugJS.ctx.fltrInput.value;
    DebugJS.ctx.printLogs();
  },
  toggleFilter: function() {
    DebugJS.ctx.setFilter(DebugJS.ctx, (DebugJS.ctx.fltr ? false : true));
  },
  setFilter: function(ctx, f) {
    ctx.fltr = f;
    DebugJS.setStyle(ctx.fltrBtn, 'color', (DebugJS.ctx.fltr) ? DebugJS.FLT_BTN_COLOR : DebugJS.COLOR_INACT);
    ctx.onchangeLogFilter();
  },

  toggleFilterCase: function() {
    DebugJS.ctx.setFilterCase(DebugJS.ctx, (DebugJS.ctx.fltrCase ? false : true));
  },
  setFilterCase: function(ctx, f) {
    ctx.fltrCase = f;
    DebugJS.setStyle(ctx.fltrCaseBtn, 'color', (DebugJS.ctx.fltrCase) ? DebugJS.FLT_BTN_COLOR : DebugJS.COLOR_INACT);
    ctx.onchangeLogFilter();
  },

  toggleFilterTxtHtml: function() {
    DebugJS.ctx.setFilterTxtHtml(DebugJS.ctx, (DebugJS.ctx.fltrTxtHtml ? false : true));
  },
  setFilterTxtHtml: function(ctx, f) {
    ctx.fltrTxtHtml = f;
    DebugJS.setStyle(ctx.fltrTxtHtmlBtn, 'color', (ctx.fltrTxtHtml ? DebugJS.FLT_BTN_COLOR : DebugJS.COLOR_INACT));
    ctx.onchangeLogFilter();
  },

  applyStyles: function(ctx, styles) {
    if (ctx.styleEl) document.head.removeChild(ctx.styleEl);
    ctx.styleEl = document.createElement('style');
    document.head.appendChild(ctx.styleEl);
    ctx.styleEl.appendChild(document.createTextNode(''));
    var s = ctx.styleEl.sheet;
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

  setIntervalL: function(ctx) {
    if (ctx.clockUpdIntHCnt > 0) {
      ctx.clockUpdIntHCnt--;
    }
    if (ctx.clockUpdIntHCnt == 0) {
      ctx.clockUpdInt = DebugJS.UPDATE_INTERVAL_L;
    }
  },
  setIntervalH: function(ctx) {
    ctx.clockUpdIntHCnt++;
    ctx.clockUpdInt = DebugJS.UPDATE_INTERVAL_H;
  },

  setupMove: function(ctx) {
    ctx.winBody.addEventListener('mousedown', ctx.onDbgWinMouseDown, {passive: true});
    ctx.winBody.addEventListener('touchstart', ctx.onDbgWinTouchStart, true);
  },

  onDbgWinMouseDown: function(e) {
    var ctx = DebugJS.ctx;
    var x = e.clientX;
    var y = e.clientY;
    var el = e.target;
    if (e.button != 0) return;
    if ((!(ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE)) || !ctx.isMovable(ctx, el, x, y)) {
      return;
    }
    ctx.startMove(ctx, x, y);
  },
  onDbgWinTouchStart: function(e) {
    var ctx = DebugJS.ctx;
    var e0 = e.changedTouches[0];
    var x = e0.clientX;
    var y = e0.clientY;
    var el = e.target;
    if ((!(ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE)) || !ctx.isMovable(ctx, el, x, y)) {
      return;
    }
    var t = ctx.ptDnTm;
    ctx.ptDnTm = DebugJS.now();
    if ((ctx.ptDnTm - t) < 300) {
      ctx.onDbgWinDblClick(e);
    } else {
      ctx.startMove(ctx, x, y);
    }
    e.preventDefault();
  },
  startMove: function(ctx, x, y) {
    ctx.uiStatus |= DebugJS.UI_ST_DRAGGING;
    ctx.ptOpTm = DebugJS.now();
    ctx.winBody.style.cursor = 'move';
    ctx.disableTextSelect(ctx);
    ctx.ptOfstY = y - ctx.win.offsetTop;
    ctx.ptOfstX = x - ctx.win.offsetLeft;
    if (!document.all) {
      window.getSelection().removeAllRanges();
    }
  },

  moveDbgWin: function(ctx, x, y) {
    if (!(ctx.uiStatus & DebugJS.UI_ST_DRAGGING)) return;
    ctx.ptOpTm = DebugJS.now();
    ctx.uiStatus &= ~DebugJS.UI_ST_POS_AUTO_ADJ;
    ctx.win.style.top = y - ctx.ptOfstY + 'px';
    ctx.win.style.left = x - ctx.ptOfstX + 'px';
  },

  endMove: function(ctx) {
    ctx.uiStatus &= ~DebugJS.UI_ST_DRAGGING;
    ctx.enableTextSelect(ctx);
    ctx.winBody.style.cursor = 'default';
  },

  isMovable: function(ctx, el, x, y) {
    if (el.nodeName == 'INPUT') return false;
    if (el.nodeName == 'TEXTAREA') return false;
    if (DebugJS.hasClass(el, 'dbg-nomove')) return false;
    var ua = DebugJS.getBrowserType();
    if ((ua.family == 'IE') || (ua.name == 'Firefox')) {
      if ((el == ctx.logPanel) ||
          (el == ctx.sysInfoPanel) ||
          (el == ctx.elmInfoBodyPanel) ||
          (el == ctx.htmlSrcBodyPanel) ||
          (el == ctx.filePreviewWrapper) ||
          (el == ctx.toolsPanel) ||
          (el == ctx.extPanel) ||
          (el == ctx.extBodyPanel)) {
        var scrollBarWH = 17;
        var rect = el.getBoundingClientRect();
        var scrollL = rect.left + rect.width - scrollBarWH;
        var scrollR = rect.left + rect.width;
        var scrollT = rect.top + rect.height - scrollBarWH;
        var scrollB = rect.top + rect.height;
        if (((x >= scrollL) && (x <= scrollR)) || ((y >= scrollT) && (y <= scrollB))) {
          return false;
        }
      }
    }
    return true;
  },

  startResize: function(ctx, e) {
    if (e.button != 0) return;
    ctx.uiStatus |= DebugJS.UI_ST_RESIZING;
    ctx.clickedPosX = e.clientX;
    ctx.clickedPosY = e.clientY;
    ctx.saveSizeAndPos(ctx);
    ctx.sizeStatus = DebugJS.SIZE_ST_NORMAL;
    ctx.updateWinCtrlBtnPanel();
    ctx.disableTextSelect(ctx);
  },

  resizeDbgWin: function(ctx, x, y) {
    var currentX = x;
    var currentY = y;
    var mvX, mvY, t, l, w, h;
    var clW = document.documentElement.clientWidth;
    var clH = document.documentElement.clientHeight;

    if (currentX > clW) {
      currentX = clW;
    } else if (currentX < 0) {
      currentX = 0;
    }

    if (currentY > clH) {
      currentY = clH;
    } else if (currentY < 0) {
      currentY = 0;
    }

    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING_N) {
      mvY = ctx.clickedPosY - currentY;
      h = ctx.orgSizePos.h + mvY;
      if (h < ctx.computedMinH) {
        h = ctx.computedMinH;
      } else {
        t = ctx.orgSizePos.t - mvY;
        ctx.win.style.top = t + 'px';
      }
      ctx.win.style.height = h + 'px';
      if (ctx.logPanel.scrollTop != 0) {
        ctx.scrollLogBtm(ctx);
      }
    }

    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING_W) {
      mvX = ctx.clickedPosX - currentX;
      w = ctx.orgSizePos.w + mvX;
      if (w < ctx.computedMinW) {
        w = ctx.computedMinW;
      } else {
        l = ctx.orgSizePos.l - mvX;
        ctx.win.style.left = l + 'px';
      }
      ctx.win.style.width = w + 'px';
    }

    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING_E) {
      mvX = currentX - ctx.clickedPosX;
      w = ctx.orgSizePos.w + mvX;
      if (w < ctx.computedMinW) w = ctx.computedMinW;
      ctx.win.style.width = w + 'px';
    }

    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING_S) {
      mvY = currentY - ctx.clickedPosY;
      h = ctx.orgSizePos.h + mvY;
      if (ctx.initHeight < ctx.computedMinH) {
        if (h < ctx.initHeight) {
          h = ctx.initHeight;
        }
      } else if (h < ctx.computedMinH) {
        h = ctx.computedMinH;
      }
      ctx.win.style.height = h + 'px';
      if (ctx.logPanel.scrollTop != 0) {
        ctx.scrollLogBtm(ctx);
      }
    }

    ctx.adjLayout();
  },

  endResize: function(ctx) {
    ctx.uiStatus &= ~DebugJS.UI_ST_RESIZING_ALL;
    ctx.bodyEl.style.cursor = ctx.cursor;
    ctx.enableTextSelect(ctx);
  },

  resizeMainHeight: function() {
    var ctx = DebugJS.ctx;
    var headPanelH = (ctx.headPanel) ? ctx.headPanel.offsetHeight : 0;
    var infoPanelH = (ctx.infoPanel) ? ctx.infoPanel.offsetHeight : 0;
    var cmdPanelH = (ctx.cmdPanel) ? ctx.cmdPanel.offsetHeight : 0;
    var mainPanelHeight = ctx.win.offsetHeight - headPanelH - infoPanelH - cmdPanelH - DebugJS.WIN_ADJUST;
    ctx.mainPanel.style.height = mainPanelHeight + 'px';
  },

  adjLayout: function() {
    DebugJS.ctx.resizeMainHeight();
    DebugJS.ctx.resizeImgPreview();
  },

  disableTextSelect: function(ctx) {
    ctx.savedFunc = document.onselectstart;
    document.onselectstart = function() {return false;};
  },
  enableTextSelect: function(ctx) {
    document.onselectstart = ctx.savedFunc;
  },

  toggleLogSuspend: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_LOG_SUSPEND) {
      ctx.resumeLog();
    } else {
      ctx.suspendLog();
    }
  },
  suspendLog: function() {
    var ctx = DebugJS.ctx;
    ctx.status |= DebugJS.ST_LOG_SUSPEND;
    ctx.updateSuspendLogBtn(ctx);
  },
  resumeLog: function() {
    var ctx = DebugJS.ctx;
    ctx.status &= ~DebugJS.ST_LOG_SUSPEND;
    ctx.updateSuspendLogBtn(ctx);
  },

  toggleLogPreserve: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_LOG_PRESERVED) {
      ctx.setLogPreserve(ctx, false);
    } else {
      ctx.setLogPreserve(ctx, true);
    }
  },
  setLogPreserve: function(ctx, f) {
    var b = DebugJS.ST_LOG_PRESERVED;
    if (f) {
      ctx.status |= b;
    } else {
      ctx.status &= ~b;
    }
    ctx.updatePreserveLogBtn(ctx);
  },

  toggleMeasure: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_MEASURE) {
      ctx.closeScreenMeasure(ctx);
    } else {
      ctx.openScreenMeasure(ctx);
    }
  },
  openScreenMeasure: function(ctx, q) {
    if (!q) DebugJS._log.s('Screen Measure ON');
    ctx.status |= DebugJS.ST_MEASURE;
    ctx.featStack.push(DebugJS.ST_MEASURE);
    ctx.cursor = ctx.bodyEl.style.cursor;
    ctx.bodyEl.style.cursor = 'default';
    ctx.updateMeasBtn(ctx);
  },
  closeScreenMeasure: function(ctx, q) {
    ctx.stopMeasure(ctx);
    ctx.bodyEl.style.cursor = ctx.cursor;
    ctx.status &= ~DebugJS.ST_MEASURE;
    DebugJS.arr.del(ctx.featStack, DebugJS.ST_MEASURE);
    if (!q) DebugJS._log.s('Screen Measure OFF');
    ctx.updateMeasBtn(ctx);
  },

  toggleDraggable: function() {
    var ctx = DebugJS.ctx;
    if (ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) {
      ctx.disableDraggable(ctx);
    } else {
      ctx.enableDraggable(ctx);
    }
  },
  enableDraggable: function(ctx) {
    ctx.uiStatus |= DebugJS.UI_ST_DRAGGABLE;
    ctx.winBody.style.cursor = 'default';
    ctx.updatePinBtn(ctx);
  },
  disableDraggable: function(ctx) {
    ctx.uiStatus &= ~DebugJS.UI_ST_DRAGGABLE;
    ctx.winBody.style.cursor = 'auto';
    ctx.updatePinBtn(ctx);
  },

  enableResize: function(ctx) {
    ctx.uiStatus |= DebugJS.UI_ST_RESIZABLE;
  },
  disableResize: function(ctx) {
    ctx.uiStatus &= ~DebugJS.UI_ST_RESIZABLE;
  },

  toggleClp: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_CLP) {
      ctx.disableClp(ctx);
    } else {
      ctx.enableClp(ctx);
    }
  },
  enableClp: function(ctx) {
    ctx.status |= DebugJS.ST_CLP;
    ctx.updateClpBtn(ctx);
  },
  disableClp: function(ctx) {
    ctx.status &= ~DebugJS.ST_CLP;
    ctx.updateClpBtn(ctx);
  },

  startStopStopwatch: function() {
    if (DebugJS.ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
      DebugJS.ctx.stopStopwatch();
    } else {
      DebugJS.ctx.startStopwatch();
    }
  },
  startStopwatch: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_STOPWATCH_END) ctx.resetStopwatch();
    ctx.status |= DebugJS.ST_STOPWATCH_RUNNING;
    DebugJS.time.restart(DebugJS.TMR_NM_SW_0);
    ctx.updateSwLabel();
    ctx.updateSwBtnPanel(ctx);
    DebugJS.callEvtListeners('stopwatch', 0, 'start');
  },
  stopStopwatch: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
      ctx.status &= ~DebugJS.ST_STOPWATCH_RUNNING;
      if (ctx.status & DebugJS.ST_STOPWATCH_LAPTIME) {
        ctx.status &= ~DebugJS.ST_STOPWATCH_LAPTIME;
        ctx.resetStopwatch();
      }
      DebugJS.time.pause(DebugJS.TMR_NM_SW_0);
      DebugJS.callEvtListeners('stopwatch', 0, 'stop');
    }
    ctx.updateSwLabel();
    ctx.updateSwBtnPanel(ctx);
  },
  resetStopwatch: function() {
    DebugJS.ctx.status &= ~DebugJS.ST_STOPWATCH_END;
    DebugJS.time.reset(DebugJS.TMR_NM_SW_0);
    DebugJS.ctx.updateSwLabel();
    DebugJS.callEvtListeners('stopwatch', 0, 'reset');
  },
  splitStopwatch: function() {
    if (DebugJS.ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
      DebugJS.time._split(DebugJS.TMR_NM_SW_0);
    }
  },
  endStopwatch: function() {
    DebugJS.ctx.status |= DebugJS.ST_STOPWATCH_END;
    DebugJS.ctx.stopStopwatch();
  },
  updateSwLabel: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
      DebugJS.time.updateCount(DebugJS.TMR_NM_SW_0);
    }
    var str = DebugJS.getTmrStr(DebugJS.time.getCount(DebugJS.TMR_NM_SW_0));
    if (ctx.swLabel) {
      if (ctx.status & DebugJS.ST_STOPWATCH_LAPTIME) {
        str = '<span style="color:' + ctx.opt.timerColor + ' !important">' + str + '</span>';
      } else if (ctx.status & DebugJS.ST_STOPWATCH_END) {
        var now = DebugJS.getDateTime();
        if (now.sss > 500) {
          str = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        }
      }
      ctx.swLabel.innerHTML = str;
    }
    if ((ctx.status & DebugJS.ST_STOPWATCH_RUNNING) || (ctx.status & DebugJS.ST_STOPWATCH_END)) {
      setTimeout(ctx.updateSwLabel, DebugJS.UPDATE_INTERVAL_H);
    }
  },

  collapseLogPanel: function(ctx) {
    ctx.logPanel.style.height = 'calc(' + (100 - DebugJS.OVERLAY_PANEL_HEIGHT) + '%' + ctx.logPanelHeightAdjust + ')';
    ctx.scrollLogBtm(ctx);
  },
  expandLogPanel: function(ctx) {
    ctx.logPanel.style.height = 'calc(100%' + ctx.logPanelHeightAdjust + ')';
  },

  openFeature: function(ctx, f, subfnc, opt) {
    ctx.closeFeature(ctx, f);
    switch (f) {
      case DebugJS.ST_MEASURE:
        ctx.openScreenMeasure(ctx, opt);
        return true;
      case DebugJS.ST_SYS_INFO:
        ctx.openSystemInfo(ctx);
        return true;
      case DebugJS.ST_HTML_SRC:
        ctx.openHtmlSrc(ctx);
        return true;
      case DebugJS.ST_ELM_INFO:
        ctx.openElmInfo(ctx);
        return true;
      case DebugJS.ST_JS:
        ctx.openJsEditor(ctx);
        return true;
      case DebugJS.ST_TOOLS:
        var kind;
        var param;
        switch (subfnc) {
          case 'timer':
            kind = DebugJS.TOOLS_FNC_TIMER;
            if (opt == 'clock') {
              param = DebugJS.TOOL_TMR_MODE_CLOCK;
            } else if (opt == 'sw1') {
              param = DebugJS.TOOL_TMR_MODE_SW_CU;
            } else if (opt == 'sw2') {
              param = DebugJS.TOOL_TMR_MODE_SW_CD;
            }
            break;
          case 'text':
            kind = DebugJS.TOOLS_FNC_TEXT;
            break;
          case 'html':
            kind = DebugJS.TOOLS_FNC_HTML;
            break;
          case 'file':
            kind = DebugJS.TOOLS_FNC_FILE;
            param = (opt ? opt : ctx.fileVwrMode);
            break;
          case 'bat':
            kind = DebugJS.TOOLS_FNC_BAT;
            break;
          case undefined:
            kind = ctx.toolsActvFnc;
            break;
          default:
            return false;
        }
        ctx.openTools(ctx);
        ctx.switchToolsFunction(kind, param);
        return true;
      case DebugJS.ST_EXT_PANEL:
        if (ctx.extPanels.length == 0) {
          DebugJS._log('No extension panels');
          return false;
        }
        try {
          var id = eval(subfnc);
        } catch (e) {
          DebugJS._log.e('No such panel: ' + subfnc);
          return false;
        }
        var idx = id;
        if (typeof id == 'string') idx = DebugJS.x.pnl.getIdx(id);
        if (idx == undefined) idx = ctx.extActPnlIdx;
        if (idx < 0) idx = 0;
        var p = DebugJS.x.pnl.getPanel(idx);
        if (!p || p.hidden) {
          DebugJS._log.e('No such panel: ' + subfnc);
          return false;
        }
        if (!(ctx.status & DebugJS.ST_EXT_PANEL)) {
          ctx.openExtPanel(ctx);
        }
        ctx.switchExtPanel(idx);
        return true;
    }
    return false;
  },

  closeFeature: function(ctx, f) {
    switch (f) {
      case DebugJS.ST_MEASURE:
        ctx.closeScreenMeasure(ctx);
        break;
      case DebugJS.ST_SYS_INFO:
        ctx.closeSystemInfo(ctx);
        break;
      case DebugJS.ST_HTML_SRC:
        ctx.closeHtmlSrc(ctx);
        break;
      case DebugJS.ST_ELM_INFO:
        ctx.closeElmInfo(ctx);
        break;
      case DebugJS.ST_JS:
        ctx.closeJsEditor();
        break;
      case DebugJS.ST_TOOLS:
        ctx.closeTools(ctx);
        break;
      case DebugJS.ST_EXT_PANEL:
        ctx.closeExtPanel(ctx);
        break;
      default:
        return false;
    }
    return true;
  },

  closeTopFeature: function(ctx) {
    var f = ctx.featStack.pop();
    return ctx.closeFeature(ctx, f);
  },

  finalizeFeatures: function(ctx) {
    if ((ctx.uiStatus & DebugJS.UI_ST_DRAGGING) || (ctx.uiStatus & DebugJS.UI_ST_RESIZING)) {
      ctx.uiStatus &= ~DebugJS.UI_ST_DRAGGING;
      ctx.endResize(ctx);
    }
    ctx.closeAllFeatures(ctx, true);
  },

  closeAllFeatures: function(ctx, q) {
    var st = ctx.status;
    if (st & DebugJS.ST_MEASURE) ctx.closeScreenMeasure(ctx, q);
    if (st & DebugJS.ST_SYS_INFO) ctx.closeSystemInfo(ctx);
    if (st & DebugJS.ST_HTML_SRC) ctx.closeHtmlSrc(ctx);
    if (st & DebugJS.ST_ELM_INFO) ctx.closeElmInfo(ctx);
    if (st & DebugJS.ST_JS) ctx.closeJsEditor();
    if (st & DebugJS.ST_TOOLS) ctx.closeTools(ctx);
    if (st & DebugJS.ST_EXT_PANEL) ctx.closeExtPanel(ctx);
  },

  launchFnc: function(ctx, fn, subfn, opt) {
    var a = {
      measure: DebugJS.ST_MEASURE,
      sys: DebugJS.ST_SYS_INFO,
      html: DebugJS.ST_HTML_SRC,
      dom: DebugJS.ST_ELM_INFO,
      js: DebugJS.ST_JS,
      tool: DebugJS.ST_TOOLS,
      ext: DebugJS.ST_EXT_PANEL
    };
    var f = (a[fn] === undefined ? 0 : a[fn]);
    return ctx.openFeature(ctx, f, subfn, opt);
  },

  keyHandler: function(e) {
    var ctx = DebugJS.ctx;
    var opt = ctx.opt;
    var cmds;
    if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD) {
      DebugJS.bat._resume('cmd');
    }
    switch (e.keyCode) {
      case 9: // Tab
        if ((ctx.status & DebugJS.ST_TOOLS) && (ctx.toolsActvFnc & DebugJS.TOOLS_FNC_FILE)) {
          if (e.shiftKey) {
            if (ctx.fileVwrMode == 'b64') ctx.toggleShowHideCC();
          } else {
            ctx.switchFileScreen();
          }
          e.preventDefault();
        }
        break;

      case 13: // Enter
        if (DebugJS.cmd.hasFocus()) {
          ctx.startLogScrolling();
          ctx.preventErrCb = true;
          ctx.execCmd(ctx);
          ctx.preventErrCb = false;
          e.preventDefault();
          if (ctx.status & DebugJS.ST_CLP) ctx.focusCmdLine();
        }
        break;

      case 18: // Alt
        ctx.disableDraggable(ctx);
        break;

      case 27: // ESC
        if (ctx.props.esc == 'disable') break;
        if (ctx.uiStatus & DebugJS.UI_ST_DRAGGING) {
          ctx.endMove(ctx);
          break;
        }
        if (ctx.uiStatus & DebugJS.UI_ST_RESIZING) {
          ctx.endResize(ctx);
          break;
        }
        if ((DebugJS.ctx.status & DebugJS.ST_SW) && DebugJS.isTmrMode()) {
          DebugJS.cmd.toggleFocus();
          break;
        } else if (DebugJS.ctx.status & DebugJS.ST_KIOSK) {
          if (DebugJS.isTmrMode()) {
            DebugJS.cmd.toggleFocus();
          } else {
            DebugJS.cmd.focus();
          }
          break;
        }
        if (ctx.closeTopFeature(ctx)) break;
        ctx.hideDbgWin(ctx);
        break;

      case 38: // Up
        if (DebugJS.cmd.hasFocus()) {
          cmds = ctx.cmdHistoryBuf.getAll();
          if (cmds.length == 0) return;
          if (cmds.length < ctx.cmdHistoryIdx) {
            ctx.cmdHistoryIdx = cmds.length;
          }
          if (ctx.cmdHistoryIdx == cmds.length) {
            ctx.cmdTmp = ctx.cmdLine.value;
          }
          if (ctx.cmdHistoryIdx > 0) {
            ctx.cmdHistoryIdx--;
          }
          ctx.cmdLine.value = cmds[ctx.cmdHistoryIdx];
          e.preventDefault();
        }
        break;

      case 40: // Dn
        if (DebugJS.cmd.hasFocus()) {
          cmds = ctx.cmdHistoryBuf.getAll();
          if (cmds.length == 0) return;
          if (ctx.cmdHistoryIdx < cmds.length) {
            ctx.cmdHistoryIdx++;
          }
          if (ctx.cmdHistoryIdx == cmds.length) {
            ctx.cmdLine.value = ctx.cmdTmp;
          } else {
            ctx.cmdLine.value = cmds[ctx.cmdHistoryIdx];
          }
        }
        break;

      case 67: // C
        if (e.ctrlKey && DebugJS.cmd.hasFocus()) {
          if ((ctx.cmdLine.selectionEnd - ctx.cmdLine.selectionStart) == 0) {
            if (ctx.status & DebugJS.ST_BAT_RUNNING) {
              DebugJS.bat.stop(DebugJS.EXIT_SIG + DebugJS.SIGINT);
            }
            ctx.startLogScrolling();
            ctx._cmdDelayCancel(ctx);
            DebugJS.point.move.stop();
            DebugJS.point.drag.stop();
            DebugJS.scrollWinTo.stop();
            DebugJS.setText.stop();
            DebugJS._log.s(ctx.cmdLine.value + '^C');
            ctx.cmdLine.value = '';
            DebugJS.callEvtListeners('ctrlc');
          }
        }
        break;

      case 112: // F1
        if (e.ctrlKey && (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC)) {
          ctx.win.style.top = 0;
          ctx.win.style.left = 0;
          ctx.uiStatus &= ~DebugJS.UI_ST_DRAGGING;
        }
        break;

      case opt.keyAssign.key:
        if (((opt.keyAssign.ctrl == undefined) || (e.ctrlKey == opt.keyAssign.ctrl)) &&
            ((opt.keyAssign.shift == undefined) || (e.shiftKey == opt.keyAssign.shift)) &&
            ((opt.keyAssign.alt == undefined) || (e.altKey == opt.keyAssign.alt)) &&
            ((opt.keyAssign.meta == undefined) || (e.metaKey == opt.keyAssign.meta))) {
          if ((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) && (ctx.isOutOfWin(ctx))) {
            ctx.resetWinToOrgPos(ctx);
          } else if (ctx.uiStatus & DebugJS.UI_ST_VISIBLE) {
            ctx.closeDbgWin();
          } else {
            ctx.showDbgWin();
            if (opt.focusOnShow) ctx.focusCmdLine();
          }
        }
    }
    if ((ctx.status & DebugJS.ST_TOOLS) && (ctx.toolsActvFnc & DebugJS.TOOLS_FNC_TIMER)) {
      ctx.handleTimerKey(e);
    }
  },
  onKeyDown: function(e) {
    var ctx = DebugJS.ctx;
    if (ctx.opt.useDeviceInfo) {
      ctx.updateStatusInfoOnKeyDown(ctx, e);
    }
    if (ctx.uiStatus & DebugJS.UI_ST_PROTECTED) {
      ctx.procOnProtectedD(ctx, e);
    }
  },
  onKeyPress: function(e) {
    var ctx = DebugJS.ctx;
    if (ctx.opt.useDeviceInfo) {
      ctx.updateStatusInfoOnKeyPress(ctx, e);
    }
    if (ctx.uiStatus & DebugJS.UI_ST_PROTECTED) {
      ctx.procOnProtectedP(ctx, e);
    }
  },
  onKeyUp: function(e) {
    var ctx = DebugJS.ctx;
    if (ctx.opt.useDeviceInfo) {
      ctx.updateStatusInfoOnKeyUp(ctx, e);
    }
    if (e.keyCode == 18) {
      ctx.enableDraggable(ctx);
    }
  },

  procOnProtectedD: function(ctx, e) {
    switch (e.keyCode) {
      case 17:
        if (ctx.unlockCode == null) {
          ctx.unlockCode = '';
        } else if (ctx.unlockCode == ctx.opt.lockCode) {
          ctx.uiStatus &= ~DebugJS.UI_ST_PROTECTED;
          ctx.unlockCode = null;
          DebugJS.callEvtListeners('unlock');
        }
        break;
      case 27:
        ctx.unlockCode = null;
    }
  },
  procOnProtectedP: function(ctx, e) {
    if (ctx.unlockCode == null) return;
    var ch = DebugJS.key2ch(e.key);
    if (DebugJS.isTypographic(ch)) {
      ctx.unlockCode += ch;
    }
  },

  updateStatusInfoOnKeyDown: function(ctx, e) {
    var modKey = DebugJS.checkModKey(e);
    ctx.keyCodeDw = e.keyCode + '(' + e.key + ') ' + modKey;
    ctx.updateKeyDownLabel();
    ctx.keyCodePr = DebugJS.KEY_ST_DFLT;
    ctx.updateKeyPressLabel();
    ctx.keyCodeUp = DebugJS.KEY_ST_DFLT;
    ctx.updateKeyUpLabel();
    ctx.resizeMainHeight();
  },

  updateStatusInfoOnKeyPress: function(ctx, e) {
    var modKey = DebugJS.checkModKey(e);
    ctx.keyCodePr = e.keyCode + '(' + e.key + ') ' + modKey;
    ctx.updateKeyPressLabel();
    ctx.resizeMainHeight();
  },

  updateStatusInfoOnKeyUp: function(ctx, e) {
    var modKey = DebugJS.checkModKey(e);
    ctx.keyCodeUp = e.keyCode + '(' + e.key + ') ' + modKey;
    ctx.updateKeyUpLabel();
    ctx.resizeMainHeight();
  },

  onResize: function() {
    var ctx = DebugJS.ctx;
    ctx.updateWindowSizeLabel();
    ctx.updateClientSizeLabel();
    ctx.updateBodySizeLabel();
    if (ctx.uiStatus & DebugJS.UI_ST_VISIBLE) {
      if (ctx.uiStatus & DebugJS.UI_ST_POS_AUTO_ADJ) {
        ctx.adjustDbgWinPos(ctx);
      } else {
        ctx.adjustWinMax(ctx);
      }
      ctx.resizeMainHeight();
    }
  },

  onScroll: function() {
    var ctx = DebugJS.ctx;
    if (window.scrollX === undefined) {
      ctx.scrollPosX = document.documentElement.scrollLeft;
      ctx.scrollPosY = document.documentElement.scrollTop;
    } else {
      ctx.scrollPosX = window.scrollX;
      ctx.scrollPosY = window.scrollY;
    }
    ctx.updateScrollPosLabel();
    if (ctx.status & DebugJS.ST_SYS_INFO) {
      ctx.updateSysInfoScrollPosLabel(ctx);
    }
    ctx.resizeMainHeight();
  },

  updateSysInfoScrollPosLabel: function(ctx) {
    DebugJS.writeHTML(ctx.id + '-sys-scroll-x', DebugJS.setStyleIfObjNA(window.scrollX));
    DebugJS.writeHTML(ctx.id + '-sys-scroll-y', DebugJS.setStyleIfObjNA(window.scrollY));
    DebugJS.writeHTML(ctx.id + '-sys-pgoffset-x', window.pageXOffset);
    DebugJS.writeHTML(ctx.id + '-sys-pgoffset-y', window.pageYOffset);
    DebugJS.writeHTML(ctx.id + '-sys-cli-scroll-x', document.documentElement.scrollLeft);
    DebugJS.writeHTML(ctx.id + '-sys-cli-scroll-y', document.documentElement.scrollTop);
  },

  onMouseDown: function(e) {
    var ctx = DebugJS.ctx;
    var posX = e.clientX;
    var posY = e.clientY;
    switch (e.button) {
      case 0:
        ctx.mouseClick0 = DebugJS.COLOR_ACTIVE;
        if (ctx.status & DebugJS.ST_MEASURE) {
          ctx.startMeasure(ctx, posX, posY);
        }
        if (ctx.status & DebugJS.ST_STOPWATCH_LAPTIME) {
          DebugJS._log('<span style="color:' + ctx.opt.timerColor + '">' + DebugJS.getTmrStr(DebugJS.time.getCount(DebugJS.TMR_NM_SW_0)) + '</span>');
          ctx.resetStopwatch();
        }
        if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD) {
          DebugJS.bat._resume('cmd');
        }
        break;
      case 1:
        ctx.mouseClick1 = DebugJS.COLOR_ACTIVE;
        break;
      case 2:
        ctx.mouseClick2 = DebugJS.COLOR_ACTIVE;
        if (ctx.status & DebugJS.ST_ELM_INFO) {
          if (ctx.isOnDbgWin(posX, posY)) {
            if (DebugJS.el && (DebugJS.el != ctx.tgtEl)) {
              ctx.showElementInfo(DebugJS.el);
              ctx.updateTargetElm(DebugJS.el);
            }
          } else {
            var pointedElm = document.elementFromPoint(posX, posY);
            ctx.captureElm(pointedElm);
          }
        }
    }
    if (ctx.opt.useDeviceInfo) {
      ctx.updateMouseClickLabel();
    }
  },
  onTouchStart: function(e) {
    var x = e.changedTouches[0].clientX;
    var y = e.changedTouches[0].clientY;
    if (DebugJS.ctx.status & DebugJS.ST_MEASURE) {
      DebugJS.ctx.startMeasure(DebugJS.ctx, x, y);
      e.preventDefault();
    }
  },

  onMouseMove: function(e) {
    DebugJS.ctx._onPointerMove(DebugJS.ctx, e);
  },
  onTouchMove: function(e) {
    e.preventDefault();
    DebugJS.ctx._onPointerMove(DebugJS.ctx, e.changedTouches[0]);
  },
  _onPointerMove: function(ctx, e) {
    var x = e.clientX;
    var y = e.clientY;
    if (ctx.opt.useDeviceInfo) {
      ctx.mousePos.x = x;
      ctx.mousePos.y = y;
      ctx.updateMousePosLabel();
    }
    if (ctx.uiStatus & DebugJS.UI_ST_DRAGGING) ctx.moveDbgWin(ctx, x, y);
    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING) ctx.resizeDbgWin(ctx, x, y);
    if (ctx.status & DebugJS.ST_MEASURING) ctx.doMeasure(ctx, x, y);
    if (ctx.status & DebugJS.ST_ELM_INFO) ctx.inspectElement(x, y);
    var ptr = DebugJS.point.getPtr();
    if (ptr.drg) DebugJS.point.move(x, y, 0, 0);
    ctx.resizeMainHeight();
  },

  onMouseUp: function(e) {
    var ctx = DebugJS.ctx;
    switch (e.button) {
      case 0:
        ctx.mouseClick0 = DebugJS.COLOR_INACT;
        ctx._onPointerUp(ctx, e);
        break;
      case 1:
        ctx.mouseClick1 = DebugJS.COLOR_INACT;
        break;
      case 2:
        ctx.mouseClick2 = DebugJS.COLOR_INACT;
    }
    if (ctx.opt.useDeviceInfo) {
      ctx.updateMouseClickLabel();
    }
  },
  onTouchEnd: function(e) {
    DebugJS.ctx._onPointerUp(DebugJS.ctx, e);
  },
  _onPointerUp: function(ctx, e) {
    var el = e.target;
    if (ctx.status & DebugJS.ST_MEASURING) {
      ctx.stopMeasure(ctx);
    }
    if (ctx.uiStatus & DebugJS.UI_ST_DRAGGING) {
      ctx.endMove(ctx);
      if ((el != ctx.extActivePanel) && (!DebugJS.isDescendant(el, ctx.extActivePanel))) {
        if ((DebugJS.now() - ctx.ptOpTm) < 300) {
          ctx.focusCmdLine();
        }
      }
    }
    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING) {
      ctx.endResize(ctx);
      ctx.focusCmdLine();
    }
    var ptr = DebugJS.point.getPtr();
    if (ptr.drg) DebugJS.point.endDragging();
  },

  onDbgWinDblClick: function(e) {
    var ctx = DebugJS.ctx;
    var x = e.clientX;
    var y = e.clientY;
    if (!ctx.isMovable(ctx, e.target, x, y) || !(ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE)) {
      return;
    }
    if (ctx.sizeStatus != DebugJS.SIZE_ST_NORMAL) {
      ctx.setWinSize('restore');
    } else {
      ctx.expandDbgWin('expand');
    }
    ctx.focusCmdLine();
  },

  expandDbgWin: function(mode) {
    var ctx = DebugJS.ctx;
    var sp = ctx.getSelfSizePos();
    var border = DebugJS.WIN_BORDER * 2;
    if ((mode == 'expand') && (sp.w == DebugJS.DBGWIN_EXPAND_W + border) && (sp.h == DebugJS.DBGWIN_EXPAND_H + border)) {
      return;
    }
    ctx.saveSizeAndPos(ctx);
    switch (mode) {
      case 'full':
        ctx.setDbgWinFull(ctx);
        break;
      case 'expand':
        if ((sp.w < DebugJS.DBGWIN_EXPAND_W) && (sp.h < DebugJS.DBGWIN_EXPAND_H)) {
          ctx._expandDbgWin(ctx);
        } else {
          ctx._expandDbgWinAuto(ctx, sp);
        }
        break;
      default:
        ctx._expandDbgWinAuto(ctx, sp);
    }
    ctx.updateWinCtrlBtnPanel();
  },

  _expandDbgWin: function(ctx) {
    var sp = ctx.getSelfSizePos();
    var clW = document.documentElement.clientWidth;
    var clH = document.documentElement.clientHeight;
    var expThrW = clW * 0.6;
    var expThrH = clH * 0.6;
    if ((sp.w > expThrW) || (sp.h > expThrH)) {
      ctx.setDbgWinFull(ctx);
      return;
    }
    var l = sp.x1 + 3;
    var t = sp.y1 + 3;
    var w = DebugJS.DBGWIN_EXPAND_W;
    var h = DebugJS.DBGWIN_EXPAND_H;
    if (sp.x1 - 1 > (clW - sp.x2)) {
      l = (sp.x1 - (DebugJS.DBGWIN_EXPAND_W - sp.w)) + 1;
    }
    if (sp.y1 > (clH - sp.y2)) {
      t = (sp.y1 - (DebugJS.DBGWIN_EXPAND_H - sp.h)) + 1;
    }
    if (l < 0) l = 0;
    if (clH < DebugJS.DBGWIN_EXPAND_H) {
      t = clH - DebugJS.DBGWIN_EXPAND_H;
    }
    ctx.saveSizeAndPos(ctx);
    ctx.setDbgWinPos(t, l);
    ctx.setDbgWinSize(w, h);
    ctx.sizeStatus = DebugJS.SIZE_ST_EXPANDED;
    ctx.updateWinCtrlBtnPanel();
  },

  _expandDbgWinAuto: function(ctx, sp) {
    if ((sp.w >= DebugJS.DBGWIN_EXPAND_W) && (sp.h >= DebugJS.DBGWIN_EXPAND_H)) {
      ctx.setDbgWinFull(ctx);
      return;
    }
    var clW = document.documentElement.clientWidth;
    var clH = document.documentElement.clientHeight;
    var expThrW = clW * 0.6;
    var expThrH = clH * 0.6;
    var w = 0, h = 0, t = 0, l = 0;

    if ((DebugJS.DBGWIN_EXPAND_W > clW) || (sp.w > expThrW)) {
      w = clW;
      ctx.sizeStatus = DebugJS.SIZE_ST_FULL_W;
      if ((DebugJS.DBGWIN_EXPAND_H > clH) || (sp.h > expThrH)) {
        h = clH;
      } else {
        t = DebugJS.DBGWIN_POS_NONE;
      }
    } else {
      if ((DebugJS.DBGWIN_EXPAND_H > clH) || (sp.h > expThrH)) {
        h = clH;
        if ((DebugJS.DBGWIN_EXPAND_W < clW) && (sp.w < expThrW)) {
          l = DebugJS.DBGWIN_POS_NONE;
        }
      } else {
        ctx.setDbgWinFull(ctx);
        return;
      }
    }

    ctx.setDbgWinPos(t, l);
    ctx.setDbgWinSize(w, h);
    ctx.uiStatus &= ~DebugJS.UI_ST_POS_AUTO_ADJ;
    if ((w == clW) && (h == clH)) {
      ctx.sizeStatus = DebugJS.SIZE_ST_FULL_WH;
    } else if (w == clW) {
      ctx.sizeStatus = DebugJS.SIZE_ST_FULL_W;
    } else if (h == clH) {
      ctx.sizeStatus = DebugJS.SIZE_ST_FULL_H;
    }
  },

  setDbgWinFull: function(ctx) {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var t = 0, l = 0;
    ctx.setDbgWinPos(t, l);
    ctx.setDbgWinSize(w, h);
    ctx.uiStatus &= ~DebugJS.UI_ST_POS_AUTO_ADJ;
    ctx.sizeStatus = DebugJS.SIZE_ST_FULL_WH;
    ctx.disableDraggable(ctx);
    ctx.disableResize(ctx);
  },

  setDbgWinPos: function(t, l) {
    if (t > DebugJS.DBGWIN_POS_NONE) DebugJS.ctx.win.style.top = t + 'px';
    if (l > DebugJS.DBGWIN_POS_NONE) DebugJS.ctx.win.style.left = l + 'px';
  },

  setDbgWinSize: function(w, h) {
    var ctx = DebugJS.ctx;
    if (w > 0) ctx.win.style.width = w + 'px';
    if (h > 0) ctx.win.style.height = h + 'px';
    ctx.adjLayout();
  },

  adjustDbgWinPos: function(ctx) {
    var sp = ctx.getSelfSizePos();
    ctx.setWinPos(ctx.opt.position, sp.w, sp.h);
  },

  adjustWinMax: function(ctx) {
    if ((ctx.sizeStatus == DebugJS.SIZE_ST_FULL_W) || (ctx.sizeStatus == DebugJS.SIZE_ST_FULL_WH)) {
      ctx.win.style.width = document.documentElement.clientWidth + 'px';
    }
    if ((ctx.sizeStatus == DebugJS.SIZE_ST_FULL_H) || (ctx.sizeStatus == DebugJS.SIZE_ST_FULL_WH)) {
      ctx.win.style.height = document.documentElement.clientHeight + 'px';
    }
    ctx.adjLayout();
  },

  saveSizeAndPos: function(ctx, o) {
    if (!o) o = ctx.orgSizePos;
    ctx.saveSize(ctx, o);
    ctx.savePos(ctx, o);
  },
  saveSize: function(ctx, o) {
    if (!o) o = ctx.orgSizePos;
    var shadow = (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) ? (DebugJS.WIN_SHADOW / 2) : 0;
    o.w = (ctx.win.offsetWidth + DebugJS.WIN_BORDER - shadow);
    o.h = (ctx.win.offsetHeight + DebugJS.WIN_BORDER - shadow);
  },
  savePos: function(ctx, o) {
    if (!o) o = ctx.orgSizePos;
    o.t = ctx.win.offsetTop;
    o.l = ctx.win.offsetLeft;
  },
  savePosNone: function(ctx) {
    ctx.orgSizePos.t = DebugJS.DBGWIN_POS_NONE;
    ctx.orgSizePos.l = DebugJS.DBGWIN_POS_NONE;
  },

  restoreDbgWin: function(org) {
    var ctx = DebugJS.ctx;
    if (!org) org = ctx.orgSizePos;
    var w = org.w;
    var h = org.h;
    var t = org.t;
    var l = org.l;
    if (ctx.sizeStatus == DebugJS.SIZE_ST_FULL_WH) {
      ctx.enableDraggable(ctx);
      ctx.enableResize(ctx);
    } else {
      var thold = 10;
      var sp = ctx.getSelfSizePos();
      var orgY2 = t + h;
      var orgX2 = l + w;
      if (((Math.abs(sp.x1 - l) > thold) && (Math.abs(sp.x2 - orgX2) > thold)) ||
          ((Math.abs(sp.y1 - t) > thold) && (Math.abs(sp.y2 - orgY2) > thold))) {
        var clW = document.documentElement.clientWidth;
        var clH = document.documentElement.clientHeight;
        var mL = (sp.x1 < 0 ? 0 : sp.x1);
        var mT = (sp.y1 < 0 ? 0 : sp.y1);
        var mR = clW - sp.x2;
        var mB = clH - sp.y2;
        if (mR < 0) mR = 0;
        if (mB < 0) mB = 0;
        t = sp.y1 + 3;
        l = sp.x1 + 3;
        if (mT > mB) {
          t = sp.y2 - h;
          if ((t > clH) || (t + h > clH)) {
            t = clH - h;
          }
          t -= 6;
        }
        if (mL > mR) {
          l = sp.x2 - w;
          if ((l > clW) || (l + w > clW)) {
            l = clW - w;
          }
          l -= 6;
        }
        if (l < 0) l = 0;
        if (t < 0) t = 0;
      }
    }
    ctx.setDbgWinSize(w, h);
    ctx.setDbgWinPos(t, l);
    ctx.scrollLogBtm(ctx);
    ctx.sizeStatus = DebugJS.SIZE_ST_NORMAL;
    if (ctx.uiStatus & DebugJS.UI_ST_POS_AUTO_ADJ) {
      ctx.adjustDbgWinPos(ctx);
    }
  },

  resetDbgWinSizePos: function() {
    var ctx = DebugJS.ctx;
    var w = (ctx.initWidth - (DebugJS.WIN_SHADOW / 2) + DebugJS.WIN_BORDER);
    var h = (ctx.initHeight - (DebugJS.WIN_SHADOW / 2) + DebugJS.WIN_BORDER);
    if (ctx.sizeStatus == DebugJS.SIZE_ST_FULL_WH) {
      ctx.enableDraggable(ctx);
      ctx.enableResize(ctx);
    }
    ctx.setWinPos(ctx.opt.position, ctx.initWidth, ctx.initHeight);
    ctx.setDbgWinSize(w, h);
    ctx.scrollLogBtm(ctx);
    ctx.saveExpandModeOrgSizeAndPos(ctx);
    ctx.sizeStatus = DebugJS.SIZE_ST_NORMAL;
    if (ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) {
      ctx.uiStatus |= DebugJS.UI_ST_POS_AUTO_ADJ;
      ctx.adjustDbgWinPos(ctx);
    }
    ctx.updateWinCtrlBtnPanel();
  },

  isOutOfWin: function(ctx) {
    var sp = ctx.getSelfSizePos();
    if ((sp.x1 > document.documentElement.clientWidth) ||
        (sp.y1 > document.documentElement.clientHeight) ||
        (sp.x2 < 0) || (sp.y2 < 0)) {
      return true;
    }
    return false;
  },

  resetWinToOrgPos: function(ctx) {
    var sp = ctx.getSelfSizePos();
    ctx.setWinPos(ctx.opt.position, sp.w, sp.h);
    if (ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) {
      ctx.uiStatus |= DebugJS.UI_ST_POS_AUTO_ADJ;
    }
  },

  showDbgWin: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.win == null) || (ctx.uiStatus & DebugJS.UI_ST_PROTECTED)) return;
    ctx.win.style.display = 'block';
    ctx.uiStatus |= DebugJS.UI_ST_VISIBLE;
    if ((ctx.uiStatus & DebugJS.UI_ST_POS_AUTO_ADJ) ||
       ((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) && (ctx.isOutOfWin(ctx)))) {
      ctx.uiStatus |= DebugJS.UI_ST_POS_AUTO_ADJ;
      ctx.adjustDbgWinPos(ctx);
    } else {
      ctx.adjustWinMax(ctx);
    }
    if (ctx.uiStatus & DebugJS.UI_ST_LOG_SCROLL) {
      ctx.scrollLogBtm(ctx);
    }
    ctx.resizeMainHeight();
    if (ctx.uiStatus & DebugJS.UI_ST_SHOW_CLOCK) {
      ctx.startUdtClock(ctx);
    }
  },

  showDbgWinOnError: function(ctx) {
    if ((ctx.status & DebugJS.ST_INITIALIZED) && !(ctx.uiStatus & DebugJS.UI_ST_VISIBLE)) {
      var ap = ctx.opt.autoPopup;
      if ((ctx.errStatus &&
           (((ap.scriptError) && (ctx.errStatus & DebugJS.ERR_ST_SCRIPT)) ||
           ((ap.loadError) && (ctx.errStatus & DebugJS.ERR_ST_LOAD)) ||
           ((ap.errorLog) && (ctx.errStatus & DebugJS.ERR_ST_LOG)) ||
           ((ap.fatal) && (ctx.errStatus & DebugJS.ERR_ST_LOG_F)))) ||
          ((ctx.status & DebugJS.ST_BAT_RUNNING) && (DebugJS.bat.hasBatStopCond('error')) && (DebugJS.bat.ctrl.stopReq))) {
        ctx.showDbgWin();
        ctx.errStatus = DebugJS.ERR_ST_NONE;
      }
    }
  },

  hideDbgWin: function(ctx) {
    if (!ctx.opt.togglableShowHide || !ctx.win) return;
    ctx.stopUdtClock(ctx);
    ctx.errStatus = DebugJS.ERR_ST_NONE;
    ctx.uiStatus &= ~DebugJS.UI_ST_DRAGGING;
    ctx.uiStatus &= ~DebugJS.UI_ST_VISIBLE;
    ctx.win.style.display = 'none';
  },

  closeDbgWin: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_MEASURE) {
      ctx.closeScreenMeasure(ctx);
    }
    if (ctx.status & DebugJS.ST_ELM_INFO) {
      ctx.closeElmInfo(ctx);
    }
    ctx.hideDbgWin(ctx);
  },

  lockDbgWin: function(ctx) {
    ctx.uiStatus |= DebugJS.UI_ST_PROTECTED;
    ctx.closeDbgWin();
  },

  focusCmdLine: function() {
    if (DebugJS.ctx.cmdLine) DebugJS.ctx.cmdLine.focus();
  },
  blurCmdLine: function() {
    if (DebugJS.ctx.cmdLine) DebugJS.ctx.cmdLine.blur();
  },

  startMeasure: function(ctx, x, y) {
    if (ctx.isOnDbgWin(x, y)) return;
    ctx.status |= DebugJS.ST_MEASURING;
    ctx.clickedPosX = x;
    ctx.clickedPosY = y;
    if (ctx.measBox == null) {
      var el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.zIndex = 0x7fffffff;
      el.style.top = y + 'px';
      el.style.left = x + 'px';
      el.style.width = '0px';
      el.style.height = '0px';
      el.style.border = 'dotted 1px #333';
      el.style.background = 'rgba(0,0,0,0.1)';
      ctx.measBox = el;
      ctx.bodyEl.appendChild(el);
    }
    ctx.disableTextSelect(ctx);
  },

  doMeasure: function(ctx, posX, posY) {
    var deltaX = posX - ctx.clickedPosX;
    var deltaY = posY - ctx.clickedPosY;
    var clW = document.documentElement.clientWidth;
    if (deltaX < 0) {
      ctx.measBox.style.left = posX + 'px';
      deltaX *= -1;
    }
    if (deltaY < 0) {
      ctx.measBox.style.top = posY + 'px';
      deltaY *= -1;
    }
    ctx.measBox.style.width = deltaX + 'px';
    ctx.measBox.style.height = deltaY + 'px';
    var sizeLabelW = 210;
    var sizeLabelH = 40;
    var sizeLabelY = (deltaY / 2) - (sizeLabelH / 2);
    var sizeLabelX = (deltaX / 2) - (sizeLabelW / 2);
    var originY = 'top';
    var originX = 'left';
    if (deltaX < sizeLabelW) {
      sizeLabelX = 0;
      if ((deltaY < sizeLabelH) || (deltaY > ctx.clickedPosY)) {
        if (ctx.clickedPosY < sizeLabelH) {
          sizeLabelY = deltaY;
        } else {
          sizeLabelY = sizeLabelH * (-1);
        }
      } else {
        sizeLabelY = sizeLabelH * (-1);
      }
    }
    if (posY < sizeLabelH) {
      if (ctx.clickedPosY > sizeLabelH) {
        sizeLabelY = (deltaY / 2) - (sizeLabelH / 2);
      }
    }
    if (((ctx.clickedPosX + sizeLabelW) > clW) && ((posX + sizeLabelW) > clW)) {
      sizeLabelX = (sizeLabelW - (clW - ctx.clickedPosX)) * (-1);
    }
    if (posX < ctx.clickedPosX) originX = 'right';
    if (posY < ctx.clickedPosY) originY = 'bottom';
    var size = '<span style="font-family:' + ctx.opt.fontFamily + ';font-size:32px;color:#fff;background:rgba(0,0,0,0.7);padding:1px 3px;white-space:pre;position:relative;top:' + sizeLabelY + 'px;left:' + sizeLabelX + 'px">W=' + (deltaX | 0) + ' H=' + (deltaY | 0) + '</span>';
    var origin = '<span style="font-family:' + ctx.opt.fontFamily + ';font-size:12px;color:#fff;background:rgba(0,0,0,0.3);white-space:pre;position:absolute;' + originY + ':1px;' + originX + ':1px;padding:1px">x=' + ctx.clickedPosX + ',y=' + ctx.clickedPosY + '</span>';
    ctx.measBox.innerHTML = origin + size;
  },

  stopMeasure: function(ctx) {
    if (ctx.measBox) {
      ctx.bodyEl.removeChild(ctx.measBox);
      ctx.measBox = null;
    }
    ctx.enableTextSelect(ctx);
    ctx.status &= ~DebugJS.ST_MEASURING;
  },

  addOverlayPanel: function(ctx, panel) {
    if (ctx.overlayBasePanel == null) {
      ctx.collapseLogPanel(ctx);
      ctx.overlayBasePanel = document.createElement('div');
      ctx.overlayBasePanel.className = 'dbg-overlay-base-panel';
      ctx.mainPanel.appendChild(ctx.overlayBasePanel);
      //ctx.mainPanel.insertBefore(ctx.overlayBasePanel, ctx.logPanel); // to bottom
    }
    ctx.overlayBasePanel.appendChild(panel);
    ctx.overlayPanels.push(panel);
  },
  removeOverlayPanel: function(ctx, panel) {
    if (ctx.overlayBasePanel) {
      for (var i = 0; i < ctx.overlayPanels.length; i++) {
        if (ctx.overlayPanels[i] == panel) {
          ctx.overlayPanels.splice(i, 1);
          ctx.overlayBasePanel.removeChild(panel);
          break;
        }
      }
      if (ctx.overlayPanels.length == 0) {
        ctx.mainPanel.removeChild(ctx.overlayBasePanel);
        ctx.overlayBasePanel = null;
        ctx.expandLogPanel(ctx);
      }
    }
  },

  addOverlayPanelFull: function(panel) {
    DebugJS.ctx.mainPanel.appendChild(panel);
  },
  removeOverlayPanelFull: function(panel) {
    if (panel.parentNode) {
      DebugJS.ctx.mainPanel.removeChild(panel);
    }
  },

  toggleSystemInfo: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_SYS_INFO) {
      ctx.closeSystemInfo(ctx);
    } else {
      ctx.openSystemInfo(ctx);
    }
  },
  openSystemInfo: function(ctx) {
    ctx.status |= DebugJS.ST_SYS_INFO;
    ctx.featStack.push(DebugJS.ST_SYS_INFO);
    if (!ctx.sysInfoPanel) ctx.createSysInfoPanel(ctx);
    ctx.updateSysInfoBtn(ctx);
    ctx.showSystemInfo();
    ctx.setIntervalH(ctx);
  },
  createSysInfoPanel: function(ctx) {
    ctx.sysInfoPanel = document.createElement('div');
    ctx.sysInfoPanel.innerHTML = '<span style="color:' + DebugJS.SYS_BTN_COLOR + '">&lt;SYSTEM INFO&gt;</span><span style="float:right">v' + ctx.v + '</span>';
    if (DebugJS.SYS_INFO_FULL_OVERLAY) {
      ctx.sysInfoPanel.className = 'dbg-overlay-panel-full';
      ctx.addOverlayPanelFull(ctx.sysInfoPanel);
    } else {
      ctx.sysInfoPanel.className = 'dbg-overlay-panel';
      ctx.addOverlayPanel(ctx, ctx.sysInfoPanel);
      ctx.expandHightIfNeeded(ctx);
    }
    ctx.sysTimePanel = document.createElement('div');
    ctx.sysTimePanel.style.marginRight = '4px';
    ctx.sysTimePanel.color = '#fff';
    ctx.sysInfoPanel.appendChild(ctx.sysTimePanel);
    ctx.sysInfoPanelBody = document.createElement('div');
    ctx.sysInfoPanelBody.style.top = ctx.computedFontSize;
    ctx.sysInfoPanel.appendChild(ctx.sysInfoPanelBody);
    ctx.updateSystemTime();
  },
  updateSystemTime: function() {
    if (!(DebugJS.ctx.status & DebugJS.ST_SYS_INFO)) return;
    var time = DebugJS.now();
    var timeBin = DebugJS.formatBin(time.toString(2), false, 1);
    var span = '<span style="color:' + DebugJS.ITEM_NM_COLOR + '">';
    var html = '<pre>' + span + 'SYSTEM TIME</span> : ' + DebugJS.getDateTimeStr(time, true) + '\n' +
    span + '         RAW</span>  (new Date()).getTime() = ' + time + '\n' +
    span + '         BIN</span>  ' + timeBin + '\n</pre>';
    DebugJS.ctx.sysTimePanel.innerHTML = html;
    setTimeout(DebugJS.ctx.updateSystemTime, DebugJS.UPDATE_INTERVAL_H);
  },
  closeSystemInfo: function(ctx) {
    if (ctx.sysInfoPanel) {
      if (DebugJS.SYS_INFO_FULL_OVERLAY) {
        ctx.removeOverlayPanelFull(ctx.sysInfoPanel);
      } else {
        ctx.removeOverlayPanel(ctx, ctx.sysInfoPanel);
        ctx.resetExpandedHeightIfNeeded(ctx);
      }
      ctx.sysInfoPanel = null;
    }
    ctx.status &= ~DebugJS.ST_SYS_INFO;
    DebugJS.arr.del(ctx.featStack, DebugJS.ST_SYS_INFO);
    ctx.updateSysInfoBtn(ctx);
    ctx.setIntervalL(ctx);
  },
  showSystemInfo: function() {
    var ctx = DebugJS.ctx;
    var INDENT = '                  ';
    var OMIT_MID = DebugJS.OMIT_MID;
    var OMIT_LAST = DebugJS.OMIT_LAST;
    var addPropSep = DebugJS.addPropSep;
    var addSysInfo = DebugJS.addSysInfo;
    var addSysInfoProp = DebugJS.addSysInfoProp;
    var addSysInfoPropH = DebugJS.addSysInfoPropH;
    var setStyleIfObjNA = DebugJS.setStyleIfObjNA;
    var foldingTxt = ctx.createFoldingText;
    var offset = (new Date()).getTimezoneOffset();
    var screenSize = 'width=' + screen.width + ' x height=' + screen.height;
    var screenInfo = screenSize + ' (colorDepth=' + screen.colorDepth + ')';
    var languages = DebugJS.getLanguages(INDENT);
    var browser = DebugJS.getBrowserType();
    var jq = '<span class="dbg-na">not loaded</span>';
    if (typeof jQuery != 'undefined') jq = 'v' + jQuery.fn.jquery;

    var metaTags = document.getElementsByTagName('meta');
    var charset;
    for (var i = 0; i < metaTags.length; i++) {
      charset = metaTags[i].getAttribute('charset');
      if (charset) {
        break;
      } else {
        var cnt = metaTags[i].getAttribute('content');
        if (cnt) {
          var cntval = cnt.match(/charset=(.*)/);
          if (cntval != null) {
            charset = cntval[1];
            break;
          }
        }
      }
    }
    if (!charset) charset = '';

    INDENT = '         ';
    var links = document.getElementsByTagName('link');
    var loadedStyles = '<span class="dbg-na">not loaded</span>';
    for (i = 0; i < links.length; i++) {
      if (links[i].rel == 'stylesheet') {
        if (i == 0) {
          loadedStyles = foldingTxt(links[i].href, 'linkHref' + i, OMIT_MID);
        } else {
          loadedStyles += '\n' + INDENT + foldingTxt(links[i].href, 'linkHref' + i, OMIT_MID);
        }
      }
    }

    var scripts = document.getElementsByTagName('script');
    var loadedScripts = '<span class="dbg-na">not loaded</span>';
    for (i = 0; i < scripts.length; i++) {
      if (scripts[i].src) {
        if (i == 0) {
          loadedScripts = foldingTxt(scripts[i].src, 'scriptSrc' + i, OMIT_MID);
        } else {
          loadedScripts += '\n' + INDENT + foldingTxt(scripts[i].src, 'scriptSrc' + i, OMIT_MID);
        }
      }
    }

    var navUserAgent = foldingTxt(navigator.userAgent, 'navUserAgent', OMIT_LAST);
    var navAppVersion = foldingTxt(navigator.appVersion, 'navAppVersion', OMIT_LAST);
    var winOnload = foldingTxt(window.onload, 'winOnload', OMIT_LAST);
    var winOnunload = foldingTxt(window.onunload, 'winOnunload', OMIT_LAST);
    var winOnclick = foldingTxt(window.onclick, 'winOnclick', OMIT_LAST);
    var winOnmousedown = foldingTxt(window.onmousedown, 'winOnmousedown', OMIT_LAST);
    var winOnmousemove = foldingTxt(window.onmousemove, 'winOnmousemove', OMIT_LAST);
    var winOnmouseup = foldingTxt(window.onmousedown, 'winOnmouseup', OMIT_LAST);
    var winOnkeydown = foldingTxt(window.onkeydown, 'winOnkeydown', OMIT_LAST);
    var winOnkeypress = foldingTxt(window.onkeypress, 'winOnkeypress', OMIT_LAST);
    var winOnkeyup = foldingTxt(window.onkeyup, 'winOnkeyup', OMIT_LAST);
    var winOncontextmenu = foldingTxt(window.oncontextmenu, 'winOncontextmenu', OMIT_LAST);
    var winOnresize = foldingTxt(window.oncontextmenu, 'winOnresize', OMIT_LAST);
    var winOnscroll = foldingTxt(window.oncontextmenu, 'winOnscroll', OMIT_LAST);
    var winOnselect = foldingTxt(window.oncontextmenu, 'winOnselect', OMIT_LAST);
    var winOnselectstart = foldingTxt(window.oncontextmenu, 'winOnselectstart', OMIT_LAST);
    try {
      var winOnerror = foldingTxt(window.onerror, 'winOnerror', OMIT_LAST);
    } catch (e) {
      winOnerror = e;
    }
    var docOnclick = foldingTxt(document.onclick, 'documentOnclick', OMIT_LAST);
    var docOnmousedown = foldingTxt(document.onmousedown, 'documentOnmousedown', OMIT_LAST);
    var docOnmousemove = foldingTxt(document.onmousemove, 'documentOnmousemove', OMIT_LAST);
    var docOnmouseup = foldingTxt(document.onmousedown, 'documentOnmouseup', OMIT_LAST);
    var docOnkeydown = foldingTxt(document.onkeydown, 'documentOnkeydown', OMIT_LAST);
    var docOnkeypress = foldingTxt(document.onkeypress, 'documentOnkeypress', OMIT_LAST);
    var docOnkeyup = foldingTxt(document.onkeyup, 'documentOnkeyup', OMIT_LAST);
    var docOnselectstart = foldingTxt(document.onselectstart, 'documentOnselectstart', OMIT_LAST);
    var docOncontextmenu = foldingTxt(document.oncontextmenu, 'documentOncontextmenu', OMIT_LAST);

    var html = '<pre>';
    html += '              getTimezoneOffset() = ' + offset + ' (UTC' + DebugJS.getTimeOffsetStr(offset, true) + ')\n';
    html += addSysInfo('screen.     ', screenInfo);
    html += addSysInfo('Browser     ', DebugJS.browserColoring(browser.name) + ' ' + browser.version);
    html += addPropSep();
    html += addSysInfoPropH('navigator');
    html += addSysInfoProp('userAgent  ', navUserAgent);
    html += addSysInfoProp('language       ', setStyleIfObjNA(navigator.language));
    html += addSysInfoProp('browserLanguage', setStyleIfObjNA(navigator.browserLanguage));
    html += addSysInfoProp('userLanguage   ', setStyleIfObjNA(navigator.userLanguage));
    html += addSysInfoProp('languages      ', languages);
    html += addPropSep();
    html += addSysInfo('charset', charset);
    html += addPropSep();
    html += addSysInfo('css    ', loadedStyles);
    html += addPropSep();
    html += addSysInfo('script ', loadedScripts);
    html += addPropSep();
    html += addSysInfo('jQuery ', jq);
    html += addPropSep();
    html += addSysInfoPropH('window');
    html += addSysInfoPropH(' location');
    html += addSysInfoProp(' href    ', foldingTxt(window.location, 'docLocation', OMIT_MID));
    html += addSysInfoProp(' origin  ', foldingTxt(window.location.origin, 'origin', OMIT_MID));
    html += addSysInfoProp(' protocol', window.location.protocol);
    html += addSysInfoProp(' host    ', foldingTxt(window.location.host, 'host', OMIT_MID));
    html += addSysInfoProp(' port    ', window.location.port);
    html += addSysInfoProp(' pathname', foldingTxt(window.location.pathname, 'pathname', OMIT_MID));
    html += addSysInfoProp(' search  ', foldingTxt(window.location.search, 'search', OMIT_MID));
    html += addSysInfoProp(' hash    ', foldingTxt(window.location.hash, 'hash', OMIT_MID));
    html += addSysInfoProp('devicePixelRatio', window.devicePixelRatio, 'sys-win-h');
    html += addSysInfoProp('outerWidth   ', window.outerWidth, 'sys-win-w');
    html += addSysInfoProp('outerHeight  ', window.outerHeight, 'sys-win-h');
    html += addSysInfoProp('screenX      ', window.screenX, 'sys-scn-x');
    html += addSysInfoProp('screenY      ', window.screenY, 'sys-scn-y');
    html += addSysInfoProp('pageXOffset  ', window.pageXOffset, 'sys-pgoffset-x');
    html += addSysInfoProp('pageYOffset  ', window.pageYOffset, 'sys-pgoffset-y');
    html += addSysInfoProp('scrollX      ', setStyleIfObjNA(window.scrollX), 'sys-scroll-x');
    html += addSysInfoProp('scrollY      ', setStyleIfObjNA(window.scrollY), 'sys-scroll-y');
    html += addSysInfoProp('onload       ', winOnload);
    html += addSysInfoProp('onunload     ', winOnunload);
    html += addSysInfoProp('onclick      ', winOnclick);
    html += addSysInfoProp('onmousedown  ', winOnmousedown);
    html += addSysInfoProp('onmousemove  ', winOnmousemove);
    html += addSysInfoProp('onmouseup    ', winOnmouseup);
    html += addSysInfoProp('onkeydown    ', winOnkeydown);
    html += addSysInfoProp('onkeypress   ', winOnkeypress);
    html += addSysInfoProp('onkeyup      ', winOnkeyup);
    html += addSysInfoProp('onresize     ', winOnresize);
    html += addSysInfoProp('onscroll     ', winOnscroll);
    html += addSysInfoProp('onselect     ', winOnselect);
    html += addSysInfoProp('onselectstart', winOnselectstart);
    html += addSysInfoProp('oncontextmenu', winOncontextmenu);
    html += addSysInfoProp('onerror      ', winOnerror);
    html += addPropSep();
    html += addSysInfoPropH('navigator');
    html += addSysInfoProp('appCodeName  ', setStyleIfObjNA(navigator.appCodeName));
    html += addSysInfoProp('appName      ', setStyleIfObjNA(navigator.appName));
    html += addSysInfoProp('appVersion   ', navAppVersion);
    html += addSysInfoProp('buildID      ', setStyleIfObjNA(navigator.buildID));
    html += addSysInfoProp('product      ', setStyleIfObjNA(navigator.product));
    html += addSysInfoProp('productSub   ', setStyleIfObjNA(navigator.productSub));
    html += addSysInfoProp('vendor       ', setStyleIfObjNA(navigator.vendor));
    html += addSysInfoProp('platform     ', setStyleIfObjNA(navigator.platform));
    html += addSysInfoProp('oscpu        ', setStyleIfObjNA(navigator.oscpu));
    html += addSysInfoProp('cookieEnabled', navigator.cookieEnabled);
    html += addPropSep();
    html += addSysInfoPropH('document');
    html += addSysInfoPropH(' body');
    html += addSysInfoProp(' clientWidth ', document.body.clientWidth, 'sys-body-w');
    html += addSysInfoProp(' clientHeight', document.body.clientHeight, 'sys-body-h');
    html += addSysInfoPropH(' documentElement');
    html += addSysInfoProp(' clientWidth ', document.documentElement.clientWidth, 'sys-cli-w');
    html += addSysInfoProp(' clientHeight', document.documentElement.clientHeight, 'sys-cli-h');
    html += addSysInfoProp(' scrollLeft  ', document.documentElement.scrollLeft, 'sys-cli-scroll-x');
    html += addSysInfoProp(' scrollTop   ', document.documentElement.scrollTop, 'sys-cli-scroll-y');
    html += addSysInfoProp('onclick      ', docOnclick);
    html += addSysInfoProp('onmousedown  ', docOnmousedown);
    html += addSysInfoProp('onmousemove  ', docOnmousemove);
    html += addSysInfoProp('onmouseup    ', docOnmouseup);
    html += addSysInfoProp('onkeydown    ', docOnkeydown);
    html += addSysInfoProp('onkeypress   ', docOnkeypress);
    html += addSysInfoProp('onkeyup      ', docOnkeyup);
    html += addSysInfoProp('onselectstart', docOnselectstart);
    html += addSysInfoProp('oncontextmenu', docOncontextmenu);
    html += addSysInfoProp('baseURI ', foldingTxt(document.baseURI, 'docBaseURL', OMIT_MID));
    html += addSysInfoProp('referrer', foldingTxt(document.referrer, 'docRef', OMIT_MID));
    html += addSysInfoProp('cookie  ', '<span id="' + ctx.id + '-sys-cookie"></span>');
    html += '<span id="' + ctx.id + '-sys-cookies"></span>';
    html += ' <input id="' + ctx.id + '-cookiekey" class="dbg-txtbox dbg-cookiekey">=<input id="' + ctx.id + '-cookieval" class="dbg-txtbox dbg-cookieval"> <span class="dbg-btn" onclick="DebugJS.ctx.setCookie();">Set</span>';
    html += addPropSep();
    html += addSysInfoPropH('localStorage');
    if (DebugJS.LS_AVAILABLE) {
      html += ' <span class="dbg-btn" onclick="DebugJS.ctx.clearLocalStrage();">clear()</span>\n<span id="' + ctx.id + '-sys-ls"></span>\n';
      html += DebugJS.ctx.createStorageEditor(ctx, 0);
    } else {
      html += ' <span class="dbg-na">undefined</span>';
    }
    html += addPropSep();
    html += addSysInfoPropH('sessionStorage');
    if (DebugJS.SS_AVAILABLE) {
      html += ' <span class="dbg-btn" onclick="DebugJS.ctx.clearSessionStrage();">clear()</span>\n<span id="' + ctx.id + '-sys-ss"></span>\n';
      html += DebugJS.ctx.createStorageEditor(ctx, 1);
    } else {
      html += ' <span class="dbg-na">undefined</span>';
    }
    html += addPropSep();
    html += '\n</pre>';
    ctx.sysInfoPanelBody.innerHTML = html;
    ctx.updateCookieInfo();
    if (DebugJS.LS_AVAILABLE) ctx.updateStrageInfo(0);
    if (DebugJS.SS_AVAILABLE) ctx.updateStrageInfo(1);
  },
  updateCookieInfo: function() {
    var ctx = DebugJS.ctx;
    var ks = DebugJS.cookie.getKeys();
    var html = '';
    if (DebugJS.LS_AVAILABLE) {
      for (var i = 0; i < ks.length; i++) {
        var k = ks[i];
        html += '  ' + '<span class="dbg-btn dbg-btn-wh" onclick="DebugJS.ctx.setCookieEdit(\'' + k + '\');">' + (k == '' ? ' ' : k) + '</span>' +
        ' <span class="dbg-btn dbg-btn-red" onclick="DebugJS.ctx.delCookie(\'' + k + '\');">x</span>\n';
      }
    }
    DebugJS.writeHTML(ctx.id + '-sys-cookie', ctx.createFoldingText(document.cookie, 'cookie', DebugJS.OMIT_MID));
    DebugJS.writeHTML(ctx.id + '-sys-cookies', html);
  },
  setCookieEdit: function(k) {
    DebugJS.setVal(DebugJS.ctx.id + '-cookiekey', k);
    DebugJS.setVal(DebugJS.ctx.id + '-cookieval', DebugJS.cookie.get(k));
  },
  setCookie: function() {
    var k = DebugJS.getVal(DebugJS.ctx.id + '-cookiekey');
    var v = DebugJS.getVal(DebugJS.ctx.id + '-cookieval');
    DebugJS.cookie.set(k, v);
    DebugJS.ctx.updateCookieInfo();
  },
  delCookie: function(k) {
    DebugJS.cookie.delete(k);
    DebugJS.ctx.updateCookieInfo();
  },
  clearLocalStrage: function() {
    localStorage.clear();
    DebugJS.ctx.updateStrageInfo(0);
  },
  removeLocalStrage: function(k) {
    localStorage.removeItem(k);
    DebugJS.ctx.updateStrageInfo(0);
  },
  clearSessionStrage: function() {
    sessionStorage.clear();
    DebugJS.ctx.updateStrageInfo(1);
  },
  removeSessionStrage: function(k) {
    sessionStorage.removeItem(k);
    DebugJS.ctx.updateStrageInfo(1);
  },
  updateStrageInfo: function(type) {
    var ctx = DebugJS.ctx;
    var strg, nm, rmvFn, id;
    if (type == 0) {
      strg = localStorage;
      nm = 'localStorage';
      rmvFn = 'removeLocalStrage';
      id = 'ls';
    } else {
      strg = sessionStorage;
      nm = 'sessionStorage';
      rmvFn = 'removeSessionStrage';
      id = 'ss';
    }
    var html = ' <span style="color:' + DebugJS.ITEM_NM_COLOR + '">length</span> = ' + strg.length + '\n' + ' <span style="color:' + DebugJS.ITEM_NM_COLOR + '">key</span>';
    if (DebugJS.LS_AVAILABLE) {
      for (var i = 0; i < strg.length; i++) {
        var key = strg.key(i);
        if (i != 0) html += '\n    ';
        var getCode = nm + '.getItem(\'' + key + '\')';
        var rmvCode = nm + '.removeItem(\'' + key + '\')';
        html += '(' + i + ') = ' + '<span class="dbg-btn dbg-btn-wh" onclick="DebugJS.ctx.setStrgEdit(' + type + ', ' + getCode + ', \'' + key + '\');" title="' + getCode + '">' + (key == '' ? ' ' : key) + '</span>' +
        ' <span class="dbg-btn dbg-btn-red" onclick="DebugJS.ctx.' + rmvFn + '(\'' + key + '\');" title="' + rmvCode + '">x</span>';
      }
    }
    DebugJS.writeHTML(ctx.id + '-sys-' + id, html);
  },
  createStorageEditor: function(ctx, type) {
    return '<textarea id="' + ctx.id + '-strg' + type + '" class="dbg-editor dbg-strg" spellcheck="false"></textarea>\n' +
    ' <span class="dbg-btn" onclick="DebugJS.ctx.setStrg(' + type + ');">setItem</span>(\'<input id="' + ctx.id + '-strgkey' + type + '" class="dbg-txtbox dbg-strgkey">\', v);';
  },
  setStrgEdit: function(type, v, k) {
    DebugJS.setVal(DebugJS.ctx.id + '-strg' + type, v);
    DebugJS.setVal(DebugJS.ctx.id + '-strgkey' + type, k);
  },
  setStrg: function(type) {
    var v = DebugJS.getVal(DebugJS.ctx.id + '-strg' + type);
    var k = DebugJS.getVal(DebugJS.ctx.id + '-strgkey' + type);
    var strg = localStorage;
    if (type == 1) strg = sessionStorage;
    strg.setItem(k, v);
    DebugJS.ctx.updateStrageInfo(type);
  },

  showHideByName: function(name) {
    var ctx = DebugJS.ctx;
    var btn = document.getElementById(ctx.id + '-' + name + '__button');
    var prtBdy = document.getElementById(ctx.id + '-' + name + '__prt-body');
    var body = document.getElementById(ctx.id + '-' + name + '__body');
    if ((body) && ((!body.style.display) || (body.style.display == 'none'))) {
      btn.innerHTML = DebugJS.CLOSEBTN;
      prtBdy.style.display = 'none';
      body.style.display = 'block';
      if (ctx.elmInfofoldingSt[name] != undefined) {
        ctx.elmInfofoldingSt[name] = true;
      }
    } else {
      btn.innerHTML = DebugJS.EXPANDBTN;
      prtBdy.style.display = 'inline';
      body.style.display = 'none';
      if (ctx.elmInfofoldingSt[name] != undefined) {
        ctx.elmInfofoldingSt[name] = false;
      }
    }
  },

  createFoldingText: function(obj, name, omitpart, lineMaxLen, style, show) {
    var ctx = DebugJS.ctx;
    var DFLT_MAX_LEN = 50;
    var txt;
    if ((lineMaxLen == undefined) || (lineMaxLen < 0)) lineMaxLen = DFLT_MAX_LEN;
    if (!style) style = 'color:#aaa';
    if (!obj) {
      txt = '<span class="dbg-na">' + obj + '</span>';
    } else {
      var btn = DebugJS.EXPANDBTN;
      var partDisp = 'inline';
      var bodyDisp = 'none';
      if (show) {
        btn = DebugJS.CLOSEBTN;
        partDisp = 'none';
        bodyDisp = 'block';
      }
      txt = obj + '';
      if ((txt.indexOf('\n') >= 1) || (txt.length > lineMaxLen)) {
        var partial = DebugJS.trimDownText2(txt, lineMaxLen, omitpart, style);
        txt = '<span class="dbg-showhide-btn dbg-nomove" id="' + ctx.id + '-' + name + '__button" onclick="DebugJS.ctx.showHideByName(\'' + name + '\')">' + btn + '</span> ' +
        '<span id="' + ctx.id + '-' + name + '__prt-body" style="display:' + partDisp + '">' + partial + '</span>' +
        '<div style="display:' + bodyDisp + '" id="' + ctx.id + '-' + name + '__body">' + obj + '</div>';
      } else {
        txt = obj;
      }
    }
    return txt;
  },

  toggleElmInfo: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_ELM_INFO) {
      ctx.closeElmInfo(ctx);
    } else {
      ctx.openElmInfo(ctx);
    }
  },
  openElmInfo: function(ctx) {
    ctx.status |= DebugJS.ST_ELM_INFO;
    ctx.featStack.push(DebugJS.ST_ELM_INFO);
    if (!ctx.elmInfoPanel) ctx.createElmInfoPanel(ctx);
    ctx.updateElmInfoBtn(ctx);
    ctx.updateElmSelectBtn();
    ctx.updateElmHighlightBtn();
  },
  createElmInfoPanel: function(ctx) {
    ctx.elmInfoPanel = document.createElement('div');
    if (DebugJS.ELM_INFO_FULL_OVERLAY) {
      ctx.elmInfoPanel.className = 'dbg-overlay-panel-full';
      ctx.addOverlayPanelFull(ctx.elmInfoPanel);
    } else {
      ctx.elmInfoPanel.className = 'dbg-overlay-panel';
      ctx.addOverlayPanel(ctx, ctx.elmInfoPanel);
      ctx.expandHightIfNeeded(ctx);
    }

    ctx.elmInfoHdrPanel = document.createElement('div');
    ctx.elmInfoPanel.appendChild(ctx.elmInfoHdrPanel);

    ctx.elmPrevBtn = ctx.createElmInfoHeadBtn('<<', ctx.showPrevElem);
    ctx.enablePrevElBtn(ctx, false);

    ctx.elmTitle = document.createElement('span');
    ctx.elmTitle.style.marginLeft = '4px';
    ctx.elmTitle.style.marginRight = '4px';
    DebugJS.setStyle(ctx.elmTitle, 'color', DebugJS.DOM_BTN_COLOR);
    ctx.elmTitle.innerText = 'ELEMENT INFO';
    ctx.elmInfoHdrPanel.appendChild(ctx.elmTitle);

    ctx.elmNextBtn = ctx.createElmInfoHeadBtn('>>', ctx.showNextElem);
    ctx.enableNextElBtn(ctx, false);

    ctx.elmSelectBtn = ctx.createElmInfoHeadBtn('SELECT', ctx.toggleElmSelectMode);
    ctx.elmSelectBtn.style.marginLeft = '8px';
    ctx.elmSelectBtn.style.marginRight = '4px';

    ctx.elmHighlightBtn = ctx.createElmInfoHeadBtn('HIGHLIGHT', ctx.toggleElmHlMode);
    ctx.elmHighlightBtn.style.marginLeft = '4px';
    ctx.elmHighlightBtn.style.marginRight = '4px';

    ctx.elmUpdBtn = ctx.createElmInfoHeadBtn('UPDATE', ctx.updateElementInfo);
    ctx.elmUpdBtn.style.marginLeft = '4px';
    DebugJS.setStyle(ctx.elmUpdBtn, 'color', DebugJS.COLOR_INACT);

    var UPDATE_COLOR = '#ccc';
    var label1 = DebugJS.ui.addLabel(ctx.elmInfoHdrPanel, ':');
    label1.style.marginRight = '0px';
    DebugJS.setStyle(label1, 'color', UPDATE_COLOR);
    ctx.elmUpdInput = DebugJS.ui.addTextInput(ctx.elmInfoHdrPanel, '30px', 'right', UPDATE_COLOR, ctx.elmUpdInterval, ctx.onchangeElmUpdInterval);
    var label2 = DebugJS.ui.addLabel(ctx.elmInfoHdrPanel, 'ms');
    label2.style.marginLeft = '2px';
    DebugJS.setStyle(label2, 'color', UPDATE_COLOR);

    ctx.elmNumPanel = document.createElement('span');
    ctx.elmNumPanel.style.float = 'right';
    ctx.elmNumPanel.style.marginRight = '4px';
    ctx.elmInfoHdrPanel.appendChild(ctx.elmNumPanel);

    ctx.elmDelBtn = ctx.createElmInfoHeadBtn('DEL', ctx.delTargetElm);
    ctx.elmDelBtn.style.float = 'right';
    ctx.elmDelBtn.style.marginRight = '4px';
    DebugJS.setStyle(ctx.elmDelBtn, 'color', DebugJS.COLOR_INACT);

    ctx.elmCapBtn = ctx.createElmInfoHeadBtn('CAPTURE', ctx.exportTargetElm);
    ctx.elmCapBtn.style.float = 'right';
    ctx.elmCapBtn.style.marginRight = '4px';
    DebugJS.setStyle(ctx.elmCapBtn, 'color', DebugJS.COLOR_INACT);

    ctx.elmInfoBodyPanel = document.createElement('div');
    ctx.elmInfoBodyPanel.style.width = '100%';
    ctx.elmInfoBodyPanel.style.height = 'calc(100% - 1.3em)';
    ctx.elmInfoBodyPanel.style.overflow = 'auto';
    ctx.elmInfoPanel.appendChild(ctx.elmInfoBodyPanel);

    ctx.updateElmInfoInterval();
  },
  createElmInfoHeadBtn: function(label, handler) {
    return DebugJS.ui.addBtn(DebugJS.ctx.elmInfoHdrPanel, label, handler);
  },
  closeElmInfo: function(ctx) {
    if (ctx.tgtEl) {
      if (typeof ctx.tgtEl.className == 'string') {
        DebugJS.removeClass(ctx.tgtEl, ctx.id + DebugJS.ELM_HL_CLASS_SUFFIX);
      }
      ctx.tgtEl = null;
    }
    if (ctx.elmInfoPanel) {
      if (DebugJS.ELM_INFO_FULL_OVERLAY) {
        ctx.removeOverlayPanelFull(ctx.elmInfoPanel);
      } else {
        ctx.removeOverlayPanel(ctx, ctx.elmInfoPanel);
        ctx.resetExpandedHeightIfNeeded(ctx);
      }
      ctx.elmInfoPanel = null;
      ctx.elmInfoBodyPanel = null;
      ctx.elmNumPanel = null;
    }
    ctx.updateTargetElm(null);
    ctx.status &= ~DebugJS.ST_ELM_INFO;
    DebugJS.arr.del(ctx.featStack, DebugJS.ST_ELM_INFO);
    ctx.updateElmInfoBtn(ctx);
  },
  inspectElement: function(x, y) {
    var ctx = DebugJS.ctx;
    if (!(ctx.elmInfoStatus & DebugJS.ELMINFO_ST_SELECT) || ctx.isOnDbgWin(x, y)) return;
    var el = document.elementFromPoint(x, y);
    if (el != ctx.tgtEl) {
      ctx.showElementInfo(el);
      ctx.updateTargetElm(el);
    }
  },
  showElementInfo: function(el) {
    var ctx = DebugJS.ctx;
    var html = '<pre>';
    if (el && el.tagName) {
      html += ctx.getElmInfo(ctx, el);
    }
    html += '</pre>';
    ctx.elmInfoBodyPanel.innerHTML = html;
    ctx.showAllElmNum();
  },
  getElmInfo: function(ctx, el) {
    var OMIT_MID = DebugJS.OMIT_MID;
    var OMIT_LAST = DebugJS.OMIT_LAST;
    var OMIT_STYLE = 'color:#888';
    var OMIT_STYLE2 = 'color:#666';
    DebugJS.dom = el;
    var addPropSep = DebugJS.addPropSep;
    var setStyleIfObjNA = DebugJS.setStyleIfObjNA;
    var evtHndl = ctx.getEvtHandlerStr;
    var foldingTxt = ctx.createFoldingText;
    var foldingSt = ctx.elmInfofoldingSt;
    var cStyle = window.getComputedStyle(el);
    var rect = el.getBoundingClientRect();
    var rectT = Math.round(rect.top);
    var rectL = Math.round(rect.left);
    var rectR = Math.round(rect.right);
    var rectB = Math.round(rect.bottom);
    var MAX_LEN = 50;
    var text = '';
    if ((el.tagName != 'HTML') && (el.tagName != 'BODY')) {
      if (el.tagName == 'META') {
        text = DebugJS.escHtml(el.outerHTML);
      } else {
        if (el.innerText != undefined) {
          text = DebugJS.escHtml(el.innerText);
        }
      }
    }
    var txt = foldingTxt(text, 'text', OMIT_LAST, MAX_LEN, OMIT_STYLE, foldingSt.text);
    var className = el.className + '';
    className = className.replace(ctx.id + DebugJS.ELM_HL_CLASS_SUFFIX, '<span style="' + OMIT_STYLE2 + '">' + ctx.id + DebugJS.ELM_HL_CLASS_SUFFIX + '</span>');
    var href = (el.href ? foldingTxt(el.href, 'elHref', OMIT_MID, MAX_LEN, OMIT_STYLE) : setStyleIfObjNA(el.href));
    var src = (el.src ? foldingTxt(el.src, 'elSrc', OMIT_MID, MAX_LEN, OMIT_STYLE, foldingSt.elSrc) : setStyleIfObjNA(el.src));
    var backgroundColor = cStyle.backgroundColor;
    var bgColor16 = DebugJS.getElmHexColor(backgroundColor);
    var color = cStyle.color;
    var color16 = DebugJS.getElmHexColor(color);
    var borderColorT = cStyle.borderTopColor;
    var borderColorT16 = DebugJS.getElmHexColor(borderColorT);
    var borderColorR = cStyle.borderRightColor;
    var borderColorR16 = DebugJS.getElmHexColor(borderColorR);
    var borderColorB = cStyle.borderBottomColor;
    var borderColorB16 = DebugJS.getElmHexColor(borderColorB);
    var borderColorL = cStyle.borderLeftColor;
    var borderColorL16 = DebugJS.getElmHexColor(borderColorL);
    var borderT = 'top   : ' + cStyle.borderTopWidth + ' ' + cStyle.borderTopStyle + ' ' + borderColorT + ' ' + borderColorT16 + ' ' + DebugJS.getColorBlock(borderColorT);
    var borderRBL = '            right : ' + cStyle.borderRightWidth + ' ' + cStyle.borderRightStyle + ' ' + borderColorR + ' ' + borderColorR16 + ' ' + DebugJS.getColorBlock(borderColorR) + '\n' +
    '            bottom: ' + cStyle.borderBottomWidth + ' ' + cStyle.borderBottomStyle + ' ' + borderColorR + ' ' + borderColorB16 + ' ' + DebugJS.getColorBlock(borderColorB) + '\n' +
    '            left  : ' + cStyle.borderLeftWidth + ' ' + cStyle.borderLeftStyle + ' ' + borderColorL + ' ' + borderColorL16 + ' ' + DebugJS.getColorBlock(borderColorL);
    var allStyles = '';
    var MIN_KEY_LEN = 20;
    for (var k in cStyle) {
      if (!k.match(/^\d.*/)) {
        if (typeof cStyle[k] != 'function') {
          var indent = '';
          if (k.length < MIN_KEY_LEN) {
            for (var i = 0; i < (MIN_KEY_LEN - k.length); i++) {
              indent += ' ';
            }
          }
          allStyles += ' ' + k + indent + ': ' + cStyle[k] + '\n';
        }
      }
    }
    var allStylesFolding = foldingTxt(allStyles, 'allStyles', OMIT_LAST, 0, OMIT_STYLE, foldingSt.allStyles);
    var name = (el.name == undefined) ? setStyleIfObjNA(el.name) : DebugJS.escHtml(el.name);
    var val = (el.value == undefined) ? setStyleIfObjNA(el.value) : DebugJS.escSpclCh(el.value);
    var alt = (el.alt == undefined) ? setStyleIfObjNA(el.alt) : DebugJS.escSpclCh(el.alt);
    var title = (el.title == undefined) ? setStyleIfObjNA(el.title) : DebugJS.escSpclCh(el.title);

    var html = '<span style="color:#8f0;display:inline-block;height:14px">#text</span> ' + txt + '\n' +
    addPropSep() +
    'id        : ' + el.id + '\n' +
    'className : ' + className + '\n' +
    addPropSep() +
    'object    : ' + Object.prototype.toString.call(el) + '\n' +
    'tagName   : ' + el.tagName + '\n' +
    'type      : ' + setStyleIfObjNA(el.type) + '\n' +
    addPropSep() +
    'display   : ' + cStyle.display + '\n' +
    'position  : ' + cStyle.position + '\n' +
    'z-index   : ' + cStyle.zIndex + '\n' +
    'float     : ' + cStyle.cssFloat + ' / clear: ' + cStyle.clear + '\n' +
    'size      : W:' + ((rectR - rectL) + 1) + ' x H:' + ((rectB - rectT) + 1) + ' px\n' +
    'margin    : ' + cStyle.marginTop + ' ' + cStyle.marginRight + ' ' + cStyle.marginBottom + ' ' + cStyle.marginLeft + '\n' +
    'border    : ' + borderT + ' ' + foldingTxt(borderRBL, 'elBorder', OMIT_LAST, 0, OMIT_STYLE, foldingSt.elBorder) + '\n' +
    'padding   : ' + cStyle.paddingTop + ' ' + cStyle.paddingRight + ' ' + cStyle.paddingBottom + ' ' + cStyle.paddingLeft + '\n' +
    'lineHeight: ' + cStyle.lineHeight + '\n' +
    addPropSep() +
    'location  : <span style="color:#aaa">winOffset + pageOffset = pos (computedStyle)</span>\n' +
    '            top   : ' + rectT + ' + ' + window.pageYOffset + ' = ' + Math.round(rect.top + window.pageYOffset) + ' px (' + cStyle.top + ')\n' +
    '            left  : ' + rectL + ' + ' + window.pageXOffset + ' = ' + Math.round(rect.left + window.pageXOffset) + ' px (' + cStyle.left + ')\n' +
    '            right : ' + rectR + ' + ' + window.pageXOffset + ' = ' + Math.round(rect.right + window.pageXOffset) + ' px (' + cStyle.right + ')\n' +
    '            bottom: ' + rectB + ' + ' + window.pageYOffset + ' = ' + Math.round(rect.bottom + window.pageYOffset) + ' px (' + cStyle.bottom + ')\n' +
    'scroll    : top = ' + el.scrollTop + ' / left = ' + el.scrollLeft + '\n' +
    'overflow  : ' + cStyle.overflow + '\n' +
    'opacity   : ' + cStyle.opacity + '\n' +
    addPropSep() +
    'bg-color  : ' + backgroundColor + ' ' + bgColor16 + ' ' + DebugJS.getColorBlock(backgroundColor) + '\n' +
    'bg-image  : ' + foldingTxt(cStyle.backgroundImage, 'bgimg', OMIT_LAST, -1, OMIT_STYLE) + '\n' +
    'color     : ' + color + ' ' + color16 + ' ' + DebugJS.getColorBlock(color) + '\n' +
    'font      : -size  : ' + cStyle.fontSize + '\n' +
    '            -family: ' + cStyle.fontFamily + '\n' +
    '            -weight: ' + cStyle.fontWeight + '\n' +
    '            -style : ' + cStyle.fontStyle + '\n' +
    addPropSep() +
    'All Styles: window.getComputedStyle(element) ' + allStylesFolding + '\n' +
    addPropSep() +
    'action    : ' + setStyleIfObjNA(el.action) + '\n' +
    'method    : ' + setStyleIfObjNA(el.method) + '\n' +
    'name      : ' + name + '\n' +
    'value     : ' + foldingTxt(val, 'elValue', OMIT_LAST, MAX_LEN, OMIT_STYLE, foldingSt.elValue) + '\n' +
    'disabled  : ' + setStyleIfObjNA(el.disabled, true) + '\n' +
    'readOnly  : ' + setStyleIfObjNA(el.readOnly, true) + '\n' +
    'hidden    : ' + el.hidden + '\n' +
    'tabIndex  : ' + el.tabIndex + '\n' +
    'accessKey : ' + el.accessKey + '\n' +
    'maxLength : ' + setStyleIfObjNA(el.maxLength) + '\n' +
    'checked   : ' + setStyleIfObjNA(el.checked, true) + '\n' +
    'htmlFor   : ' + setStyleIfObjNA(el.htmlFor) + '\n' +
    'selectedIndex: ' + setStyleIfObjNA(el.selectedIndex) + '\n' +
    'contentEditable: ' + el.contentEditable + '\n' +
    'alt       : ' + foldingTxt(alt, 'elAlt', OMIT_LAST, MAX_LEN, OMIT_STYLE) + '\n' +
    'title     : ' + foldingTxt(title, 'elTitle', OMIT_LAST, MAX_LEN, OMIT_STYLE) + '\n' +

    addPropSep() +
    'href      : ' + href + '\n' +
    'src       : ' + src + '\n' +
    addPropSep() +
    'onclick      : ' + evtHndl(el.onclick, 'elOnclick') + '\n' +
    'ondblclick   : ' + evtHndl(el.ondblclick, 'elOnDblClick') + '\n' +
    'onmousedown  : ' + evtHndl(el.onmousedown, 'elOnMouseDown') + '\n' +
    'onmouseup    : ' + evtHndl(el.onmouseup, 'elOnMouseUp') + '\n' +
    'onmouseover  : ' + evtHndl(el.onmouseover, 'elOnMouseOver') + '\n' +
    'onmouseout   : ' + evtHndl(el.onmouseout, 'elOnMouseOut') + '\n' +
    'onmousemove  : ' + evtHndl(el.onmousemove, 'elOnMouseMove') + '\n' +
    'oncontextmenu: ' + evtHndl(el.oncontextmenu, 'elOnContextmenu') + '\n' +
    addPropSep() +
    'onkeydown    : ' + evtHndl(el.onkeydown, 'elOnKeyDown') + '\n' +
    'onkeypress   : ' + evtHndl(el.onkeypress, 'elOnKeyPress') + '\n' +
    'onkeyup      : ' + evtHndl(el.onkeyup, 'elOnKeyUp') + '\n' +
    addPropSep() +
    'onfocus      : ' + evtHndl(el.onfocus, 'elOnFocus') + '\n' +
    'onblur       : ' + evtHndl(el.onblur, 'elOnBlur') + '\n' +
    'onchange     : ' + evtHndl(el.onchange, 'elOnChange') + '\n' +
    'oninput      : ' + evtHndl(el.oninput, 'elOnInput') + '\n' +
    'onselect     : ' + evtHndl(el.onselect, 'elOnSelect') + '\n' +
    'onselectstart: ' + evtHndl(el.onselectstart, 'elOnSelectStart') + '\n' +
    'onsubmit     : ' + evtHndl(el.onsubmit, 'elOnSubmit') + '\n' +
    addPropSep() +
    'onscroll     : ' + evtHndl(el.onscroll, 'elOnScroll') + '\n' +
    addPropSep() +
    'dataset (data-*):\n';
    if (el.dataset) {
      html += '{' + ((Object.keys(el.dataset).length > 0) ? '\n' : '');
      for (var data in el.dataset) {
        html += ' ' + data + ': ' + el.dataset[data] + '\n';
      }
      html += '}';
    } else {
      html += '<span style="color:#aaa">' + el.dataset + '</span>';
    }
    var htmlSrc = (el.outerHTML ? el.outerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;') : setStyleIfObjNA(el.outerHTML));
    htmlSrc = foldingTxt(htmlSrc, 'htmlSrc', OMIT_LAST, 0, OMIT_STYLE, foldingSt.htmlSrc);
    html += addPropSep() + 'outerHTML: ' + htmlSrc;
    return html;
  },
  showPrevElem: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.tgtEl) return;
    var el = ctx.getPrevElm(ctx, ctx.tgtEl);
    if (el) {
      ctx.showElementInfo(el);
      ctx.updateTargetElm(el);
    }
  },
  showNextElem: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.tgtEl) return;
    var el = ctx.getNextElm(ctx, ctx.tgtEl);
    if (el) {
      ctx.showElementInfo(el);
      ctx.updateTargetElm(el);
    }
  },
  getPrevElm: function(ctx, tgtElm) {
    var el = tgtElm.previousElementSibling;
    if (el && (el.id == ctx.id)) {
      el = tgtElm.previousElementSibling;
    }
    if (el) {
      if (el.childElementCount > 0) {
        var lastChild = el.lastElementChild;
        while (lastChild.childElementCount > 0) {
          lastChild = lastChild.lastElementChild;
        }
        el = lastChild;
      }
    } else {
      el = tgtElm.parentNode;
    }
    if (el instanceof HTMLDocument) el = null;
    return el;
  },
  getNextElm: function(ctx, tgtElm) {
    var el = tgtElm.firstElementChild;
    if ((el == null) || ((el != null) && (el.id == ctx.id))) {
      el = tgtElm.nextElementSibling;
      if (el == null) {
        var parent = tgtElm.parentNode;
        if (parent) {
          do {
            el = parent.nextElementSibling;
            if (el && (el.id != ctx.id)) {
              break;
            }
            parent = parent.parentNode;
          } while ((parent != null) && (parent.tagName != 'HTML'));
        }
      }
    }
    return el;
  },
  updateTargetElm: function(el) {
    var ctx = DebugJS.ctx;
    if (ctx.elmInfoStatus & DebugJS.ELMINFO_ST_HIGHLIGHT) {
      ctx.hlElm(ctx.tgtEl, el);
    }
    if (el) {
      ctx.tgtEl = el;
      ctx.enablePrevElBtn(ctx, (ctx.getPrevElm(ctx, el) ? true : false));
      ctx.enableNextElBtn(ctx, (ctx.getNextElm(ctx, el) ? true : false));
      DebugJS.setStyle(ctx.elmUpdBtn, 'color', ctx.opt.btnColor);
      DebugJS.setStyle(ctx.elmCapBtn, 'color', ctx.opt.btnColor);
      DebugJS.setStyle(ctx.elmDelBtn, 'color', '#a88');
    }
  },
  hlElm: function(removeTarget, setTarget) {
    if (removeTarget && (typeof removeTarget.className == 'string')) {
      DebugJS.removeClass(removeTarget, DebugJS.ctx.id + DebugJS.ELM_HL_CLASS_SUFFIX);
    }
    if (setTarget && (typeof setTarget.className == 'string')) {
      DebugJS.addClass(setTarget, DebugJS.ctx.id + DebugJS.ELM_HL_CLASS_SUFFIX);
    }
  },
  enablePrevElBtn: function(ctx, f) {
    DebugJS.setStyle(ctx.elmPrevBtn, 'color', (f ? ctx.opt.btnColor : DebugJS.COLOR_INACT));
  },
  enableNextElBtn: function(ctx, f) {
    DebugJS.setStyle(ctx.elmNextBtn, 'color', (f ? ctx.opt.btnColor : DebugJS.COLOR_INACT));
  },
  updateElementInfo: function() {
    DebugJS.ctx.showAllElmNum();
    DebugJS.ctx.showElementInfo(DebugJS.ctx.tgtEl);
  },
  showAllElmNum: function() {
    DebugJS.ctx.elmNumPanel.innerHTML = '(All: ' + document.getElementsByTagName('*').length + ')';
  },
  onchangeElmUpdInterval: function() {
    var ctx = DebugJS.ctx;
    var v = ctx.elmUpdInput.value;
    if (v == '') v = 0;
    if (isFinite(v)) {
      ctx.elmUpdInterval = v;
      clearTimeout(ctx.elmUpdTimerId);
      ctx.elmUpdTimerId = setTimeout(ctx.updateElmInfoInterval, v);
    }
  },
  updateElmInfoInterval: function() {
    var ctx = DebugJS.ctx;
    if (!(ctx.status & DebugJS.ST_ELM_INFO)) return;
    ctx.updateElementInfo();
    if (ctx.elmUpdInterval > 0) {
      ctx.elmUpdTimerId = setTimeout(ctx.updateElmInfoInterval, ctx.elmUpdInterval);
    }
  },
  toggleElmSelectMode: function() {
    var ctx = DebugJS.ctx;
    var b = DebugJS.ELMINFO_ST_SELECT;
    if (ctx.elmInfoStatus & b) {
      ctx.elmInfoStatus &= ~b;
    } else {
      ctx.elmInfoStatus |= b;
    }
    ctx.updateElmSelectBtn();
  },
  updateElmSelectBtn: function() {
    DebugJS.setStyle(DebugJS.ctx.elmSelectBtn, 'color', (DebugJS.ctx.elmInfoStatus & DebugJS.ELMINFO_ST_SELECT) ? DebugJS.ctx.opt.btnColor : DebugJS.COLOR_INACT);
  },
  toggleElmHlMode: function() {
    var ctx = DebugJS.ctx;
    var b = DebugJS.ELMINFO_ST_HIGHLIGHT;
    if (ctx.elmInfoStatus & b) {
      ctx.elmInfoStatus &= ~b;
      ctx.hlElm(ctx.tgtEl, null);
    } else {
      ctx.elmInfoStatus |= b;
      ctx.hlElm(null, ctx.tgtEl);
    }
    ctx.updateElmHighlightBtn();
  },
  updateElmHighlightBtn: function() {
    DebugJS.setStyle(DebugJS.ctx.elmHighlightBtn, 'color', (DebugJS.ctx.elmInfoStatus & DebugJS.ELMINFO_ST_HIGHLIGHT) ? DebugJS.ctx.opt.btnColor : DebugJS.COLOR_INACT);
  },
  exportTargetElm: function() {
    if (DebugJS.ctx.tgtEl) DebugJS.ctx.captureElm(DebugJS.ctx.tgtEl);
  },
  captureElm: function(elm) {
    DebugJS.el = elm;
    if (DebugJS.G_EL_AVAILABLE) window.el = elm;
    if (DebugJS.ctx.status & DebugJS.ST_ELM_EDIT) {
      DebugJS.ctx.updateEditable(DebugJS.ctx, elm);
    }
    DebugJS._log.s('&lt;' + elm.tagName + '&gt; object has been exported to <span style="color:' + DebugJS.KEYWRD_COLOR + '">' + (DebugJS.G_EL_AVAILABLE ? 'el' : ((dbg == DebugJS) ? 'dbg' : 'DebugJS') + '.el') + '</span>');
  },
  delTargetElm: function() {
    var e = DebugJS.ctx.tgtEl;
    if (e) {
      var p = e.parentNode;
      if (p) {
        p.removeChild(e);
        DebugJS.ctx.showElementInfo(p);
        DebugJS.ctx.updateTargetElm(p);
      }
    }
  },
  updateEditable: function(ctx, el) {
    if ((ctx.txtChkTargetEl) && (ctx.txtChkTargetEl.contentEditableBak)) {
      ctx.txtChkTargetEl.contentEditable = ctx.txtChkTargetEl.contentEditableBak;
    }
    ctx.txtChkTargetEl = el;
    ctx.txtChkTargetEl.contentEditableBak = el.contentEditable;
    ctx.txtChkTargetEl.contentEditable = true;
  },
  getEvtHandlerStr: function(handler, name) {
    var MAX_LEN = 300;
    var s = '';
    if (handler) {
      s = handler.toString();
      s = s.replace(/\n/g, '');
      s = s.replace(/[^.]{1,}\{/, '');
      s = s.replace(/\}$/, '');
      s = s.replace(/^\s{1,}/, '');
    } else {
      s = '<span style="color:#aaa">null</span>';
    }
    s = DebugJS.ctx.createFoldingText(s, name, DebugJS.OMIT_LAST, MAX_LEN, 'color:#888');
    return s;
  },

  toggleHtmlSrc: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_HTML_SRC) {
      ctx.closeHtmlSrc(ctx);
    } else {
      ctx.openHtmlSrc(ctx);
    }
  },
  openHtmlSrc: function(ctx) {
    ctx.status |= DebugJS.ST_HTML_SRC;
    ctx.featStack.push(DebugJS.ST_HTML_SRC);
    if (!ctx.htmlSrcPanel) ctx.createHtmlSrcPanel(ctx);
    ctx.updateHtmlSrcBtn(ctx);
    ctx.showHtmlSrc();
  },
  createHtmlSrcPanel: function(ctx) {
    ctx.htmlSrcPanel = document.createElement('div');
    if (DebugJS.HTML_SRC_FULL_OVERLAY) {
      ctx.htmlSrcPanel.className = 'dbg-overlay-panel-full';
      ctx.addOverlayPanelFull(ctx.htmlSrcPanel);
    } else {
      ctx.htmlSrcPanel.className = 'dbg-overlay-panel';
      ctx.addOverlayPanel(ctx, ctx.htmlSrcPanel);
    }
    if (DebugJS.HTML_SRC_EXPAND_H) ctx.expandHightIfNeeded(ctx);
    ctx.htmlSrcHdrPanel = document.createElement('div');
    ctx.htmlSrcPanel.appendChild(ctx.htmlSrcHdrPanel);

    ctx.htmlSrcTitle = document.createElement('span');
    DebugJS.setStyle(ctx.htmlSrcTitle, 'color', DebugJS.HTML_BTN_COLOR);
    ctx.htmlSrcTitle.innerText = 'HTML SOURCE';
    ctx.htmlSrcHdrPanel.appendChild(ctx.htmlSrcTitle);

    var UPDATE_COLOR = '#fff';
    ctx.htmlSrcUpdInpLbl2 = document.createElement('span');
    ctx.htmlSrcUpdInpLbl2.style.float = 'right';
    ctx.htmlSrcUpdInpLbl2.style.marginLeft = '2px';
    DebugJS.setStyle(ctx.htmlSrcUpdInpLbl2, 'color', UPDATE_COLOR);
    ctx.htmlSrcUpdInpLbl2.innerText = 'ms';
    ctx.htmlSrcHdrPanel.appendChild(ctx.htmlSrcUpdInpLbl2);

    ctx.htmlSrcUpdInput = DebugJS.ui.addTextInput(ctx.htmlSrcHdrPanel, '50px', 'right', UPDATE_COLOR, ctx.htmlSrcUpdInterval, ctx.onchangeHtmlSrcUpdInterval);
    ctx.htmlSrcUpdInput.style.float = 'right';

    ctx.htmlSrcUpdInpLbl = document.createElement('span');
    ctx.htmlSrcUpdInpLbl.style.float = 'right';
    DebugJS.setStyle(ctx.htmlSrcUpdInpLbl, 'color', UPDATE_COLOR);
    ctx.htmlSrcUpdInpLbl.innerText = ':';
    ctx.htmlSrcHdrPanel.appendChild(ctx.htmlSrcUpdInpLbl);

    ctx.htmlSrcUpdBtn = DebugJS.ui.addBtn(ctx.htmlSrcHdrPanel, 'UPDATE', ctx.showHtmlSrc);
    ctx.htmlSrcUpdBtn.style.float = 'right';
    ctx.htmlSrcUpdBtn.style.marginLeft = '4px';
    DebugJS.setStyle(ctx.htmlSrcUpdBtn, 'color', ctx.opt.btnColor);

    ctx.htmlSrcBodyPanel = document.createElement('div');
    ctx.htmlSrcBodyPanel.style.width = '100%';
    ctx.htmlSrcBodyPanel.style.height = 'calc(100% - 1.3em)';
    ctx.htmlSrcBodyPanel.style.overflow = 'auto';
    ctx.htmlSrcPanel.appendChild(ctx.htmlSrcBodyPanel);

    ctx.htmlSrcBody = document.createElement('pre');
    ctx.htmlSrcBodyPanel.appendChild(ctx.htmlSrcBody);
  },
  closeHtmlSrc: function(ctx) {
    if (ctx.htmlSrcPanel) {
      if (DebugJS.HTML_SRC_FULL_OVERLAY) {
        ctx.removeOverlayPanelFull(ctx.htmlSrcPanel);
      } else {
        ctx.removeOverlayPanel(ctx, ctx.htmlSrcPanel);
      }
      if (DebugJS.HTML_SRC_EXPAND_H) ctx.resetExpandedHeightIfNeeded(ctx);
      ctx.htmlSrcPanel = null;
    }
    ctx.status &= ~DebugJS.ST_HTML_SRC;
    DebugJS.arr.del(ctx.featStack, DebugJS.ST_HTML_SRC);
    ctx.updateHtmlSrcBtn(ctx);
  },
  showHtmlSrc: function() {
    var ctx = DebugJS.ctx;
    ctx.htmlSrcBodyPanel.removeChild(ctx.htmlSrcBody);
    var html = document.getElementsByTagName('html')[0].outerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    ctx.htmlSrcBodyPanel.appendChild(ctx.htmlSrcBody);
    ctx.htmlSrcBody.innerHTML = html;
  },
  onchangeHtmlSrcUpdInterval: function() {
    var ctx = DebugJS.ctx;
    var interval = ctx.htmlSrcUpdInput.value;
    if (interval == '') interval = 0;
    if (isFinite(interval)) {
      ctx.htmlSrcUpdInterval = interval;
      clearTimeout(ctx.htmlSrcUpdTimerId);
      ctx.htmlSrcUpdTimerId = setTimeout(ctx.updateHtmlSrcInterval, ctx.htmlSrcUpdInterval);
    }
  },
  updateHtmlSrcInterval: function() {
    var ctx = DebugJS.ctx;
    if (!(ctx.status & DebugJS.ST_HTML_SRC)) return;
    ctx.showHtmlSrc();
    if (ctx.htmlSrcUpdInterval > 0) {
      ctx.elmUpdTimerId = setTimeout(ctx.updateHtmlSrcInterval, ctx.htmlSrcUpdInterval);
    }
  },

  toggleJs: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_JS) {
      ctx.closeJsEditor();
    } else {
      ctx.openJsEditor(ctx);
    }
  },
  openJsEditor: function(ctx) {
    ctx.status |= DebugJS.ST_JS;
    ctx.featStack.push(DebugJS.ST_JS);
    if (!ctx.jsPanel) ctx.createJsPanel(ctx);
    ctx.updateJsBtn(ctx);
    ctx.jsEditor.focus();
  },
  createJsPanel: function(ctx) {
    ctx.jsPanel = document.createElement('div');
    ctx.jsPanel.className = 'dbg-overlay-panel';
    var html = '<div class="dbg-btn dbg-nomove" ' +
    'style="position:relative;top:-1px;float:right;' +
    'font-size:' + (18 * ctx.zoom) + 'px;color:#888 !important" ' +
    'onclick="DebugJS.ctx.closeJsEditor();" ' +
    'onmouseover="DebugJS.setStyle(this, \'color\', \'#d88\');" ' +
    'onmouseout="DebugJS.setStyle(this, \'color\', \'#888\');">x</div>' +
    '<span style="color:#ccc">JS Editor</span>' +
    DebugJS.ui.createBtnHtml('[EXEC]', 'DebugJS.ctx.execJavaScript();', 'float:right;margin-right:4px') +
    DebugJS.ui.createBtnHtml('[CLR]', 'DebugJS.ctx.insertJsSnippet();', 'margin-left:4px;margin-right:4px');
    for (var i = 0; i < 5; i++) {
      html += ctx.createJsSnippetBtn(ctx, i);
    }
    ctx.jsPanel.innerHTML = html;
    ctx.addOverlayPanel(ctx, ctx.jsPanel);
    ctx.jsEditor = document.createElement('textarea');
    ctx.jsEditor.className = 'dbg-editor';
    ctx.jsEditor.spellcheck = false;
    ctx.jsEditor.onblur = ctx.saveJsBuf;
    ctx.jsEditor.value = ctx.jsBuf;
    ctx.enableDnDFileLoad(ctx.jsEditor, ctx.onDropOnJS);
    ctx.jsPanel.appendChild(ctx.jsEditor);
  },
  createJsSnippetBtn: function(ctx, i) {
    return DebugJS.ui.createBtnHtml('{CODE' + (i + 1) + '}', 'DebugJS.ctx.insertJsSnippet(' + i + ');', 'margin-left:4px');
  },
  insertJsSnippet: function(n) {
    var editor = DebugJS.ctx.jsEditor;
    if (n == undefined) {
      editor.value = '';
      editor.focus();
    } else {
      var code = DebugJS.JS_SNIPPET[n];
      var buf = editor.value;
      var posCursor = editor.selectionStart;
      var bufL = buf.substr(0, posCursor);
      var bufR = buf.substr(posCursor, buf.length);
      buf = bufL + code + bufR;
      DebugJS.ctx.jsEditor.focus();
      DebugJS.ctx.jsEditor.value = buf;
      editor.selectionStart = editor.selectionEnd = posCursor + code.length;
    }
  },
  saveJsBuf: function() {
    DebugJS.ctx.jsBuf = DebugJS.ctx.jsEditor.value;
  },
  execJavaScript: function() {
    DebugJS.ctx.execCode(DebugJS.ctx.jsBuf, true);
  },
  execCode: function(code, echo) {
    if (code == '') return;
    try {
      var r = eval(code);
      var res = r;
      if (typeof r == 'string') {
        res = DebugJS.quoteStr(r);
      }
      if (echo) DebugJS._log.res(res);
    } catch (e) {
      DebugJS._log.e(e);
    }
    return r;
  },
  closeJsEditor: function() {
    var ctx = DebugJS.ctx;
    if (ctx.jsPanel) {
      ctx.removeOverlayPanel(ctx, ctx.jsPanel);
      ctx.jsPanel = null;
    }
    ctx.status &= ~DebugJS.ST_JS;
    DebugJS.arr.del(ctx.featStack, DebugJS.ST_JS);
    ctx.updateJsBtn(ctx);
  },

  toggleTools: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_TOOLS) {
      ctx.closeTools(ctx);
    } else {
      ctx.openTools(ctx);
    }
  },
  openTools: function(ctx) {
    ctx.status |= DebugJS.ST_TOOLS;
    ctx.featStack.push(DebugJS.ST_TOOLS);
    if (!ctx.toolsPanel) ctx.createToolsPanel(ctx);
    ctx.addOverlayPanelFull(ctx.toolsPanel);
    ctx.resizeImgPreview();
    ctx.switchToolsFunction(ctx.toolsActvFnc);
    ctx.updateToolsBtns();
    ctx.updateToolsBtn(ctx);
  },
  isAvailableTools: function(ctx) {
    return (ctx.win && ctx.opt.useTools);
  },
  createToolsPanel: function(ctx) {
    var p = ctx.createSubBasePanel(ctx);
    ctx.toolsPanel = p.base;
    ctx.toolsHdrPanel = p.head;
    ctx.toolsBodyPanel = p.body;
    ctx.timerBtn = ctx.createToolsHdrBtn('TIMER', 'TOOLS_FNC_TIMER', 'timerBtn');
    ctx.txtChkBtn = ctx.createToolsHdrBtn('TEXT', 'TOOLS_FNC_TEXT', 'txtChkBtn');
    ctx.htmlPrevBtn = ctx.createToolsHdrBtn('HTML', 'TOOLS_FNC_HTML', 'htmlPrevBtn');
    ctx.fileVwrBtn = ctx.createToolsHdrBtn('FILE', 'TOOLS_FNC_FILE', 'fileVwrBtn');
    ctx.batBtn = ctx.createToolsHdrBtn('BAT', 'TOOLS_FNC_BAT', 'batBtn');
  },
  createToolsHdrBtn: function(label, state, btnObj) {
    var fn = new Function('DebugJS.ctx.switchToolsFunction(DebugJS.' + state + ');');
    var btn = DebugJS.ui.addBtn(DebugJS.ctx.toolsHdrPanel, '<' + label + '>', fn);
    btn.style.marginRight = '4px';
    btn.onmouseover = new Function('DebugJS.setStyle(DebugJS.ctx.' + btnObj + ', \'color\', DebugJS.SBPNL_COLOR_ACTIVE);');
    btn.onmouseout = new Function('DebugJS.setStyle(DebugJS.ctx.' + btnObj + ', \'color\', (DebugJS.ctx.toolsActvFnc & DebugJS.' + state + ') ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACT);');
    return btn;
  },
  closeTools: function(ctx) {
    if (ctx.toolsPanel) {
      ctx.removeOverlayPanelFull(ctx.toolsPanel);
      ctx.switchToolsFunction(0);
    }
    ctx.status &= ~DebugJS.ST_TOOLS;
    DebugJS.arr.del(ctx.featStack, DebugJS.ST_TOOLS);
    ctx.updateToolsBtn(ctx);
  },
  updateToolsBtns: function() {
    var ctx = DebugJS.ctx;
    var f = ctx.toolsActvFnc;
    DebugJS.setStyle(ctx.timerBtn, 'color', (f & DebugJS.TOOLS_FNC_TIMER) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACT);
    DebugJS.setStyle(ctx.txtChkBtn, 'color', (f & DebugJS.TOOLS_FNC_TEXT) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACT);
    DebugJS.setStyle(ctx.htmlPrevBtn, 'color', (f & DebugJS.TOOLS_FNC_HTML) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACT);
    DebugJS.setStyle(ctx.fileVwrBtn, 'color', (f & DebugJS.TOOLS_FNC_FILE) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACT);
    DebugJS.setStyle(ctx.batBtn, 'color', (f & DebugJS.TOOLS_FNC_BAT) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACT);
  },
  switchToolsFunction: function(kind, param) {
    var ctx = DebugJS.ctx;
    if (kind & DebugJS.TOOLS_FNC_TIMER) {
      ctx.openTimer(param);
    } else {
      ctx.closeTimer();
    }
    if (kind & DebugJS.TOOLS_FNC_TEXT) {
      ctx.openTextChecker();
    } else {
      ctx.closeTextChecker();
    }
    if (kind & DebugJS.TOOLS_FNC_HTML) {
      ctx.openHtmlEditor();
    } else {
      ctx.closeHtmlEditor();
    }
    if (kind & DebugJS.TOOLS_FNC_FILE) {
      ctx.openFileLoader(param);
    } else {
      ctx.closeFileLoader();
    }
    if (kind & DebugJS.TOOLS_FNC_BAT) {
      ctx.openBatEditor();
    } else {
      ctx.closeBatEditor();
    }
    if (kind) ctx.toolsActvFnc = kind;
    ctx.updateToolsBtns();
  },
  removeToolFuncPanel: function(ctx, panel) {
    if (panel.parentNode) {
      ctx.toolsBodyPanel.removeChild(panel);
    }
  },

  openTimer: function(mode) {
    var ctx = DebugJS.ctx;
    if (!ctx.timerBasePanel) {
      ctx.createTimerBasePanel(ctx);
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.timerBasePanel);
    }
    ctx.setIntervalH(ctx);
    if ((mode != undefined) && (mode !== '')) {
      ctx.switchTimerMode(mode);
    } else {
      switch (ctx.toolTimerMode) {
        case DebugJS.TOOL_TMR_MODE_CLOCK:
          ctx.updateTimerClock();
          break;
        case DebugJS.TOOL_TMR_MODE_SW_CU:
          ctx.updateTimerStopwatchCu();
          break;
        case DebugJS.TOOL_TMR_MODE_SW_CD:
          ctx.updateTimerStopwatchCd();
      }
    }
  },
  createTimerBasePanel: function(ctx) {
    var baseFontSize = ctx.computedFontSize;
    var fontSize = baseFontSize * 6.5;
    ctx.timerBasePanel = DebugJS.addSubPanel(ctx.toolsBodyPanel);
    ctx.timerBasePanel.style.position = 'absolute';
    ctx.timerBasePanel.style.height = baseFontSize * 21 + 'px';
    ctx.timerBasePanel.style.top = '0';
    ctx.timerBasePanel.style.bottom = '0';
    ctx.timerBasePanel.style.margin = 'auto';
    DebugJS.setStyle(ctx.timerBasePanel, 'font-size', fontSize + 'px');
    ctx.timerBasePanel.style.lineHeight = '1em';
    ctx.timerBasePanel.style.textAlign = 'center';
    ctx.toolsBodyPanel.appendChild(ctx.timerBasePanel);
    ctx.createTimerClockSubPanel();
    ctx.createTimerStopwatchCuSubPanel();
    ctx.createTimerStopwatchCdSubPanel();
    ctx.createTimerStopwatchCdInpSubPanel();
    ctx.switchTimerMode(ctx.toolTimerMode);
  },
  createTimerClockSubPanel: function() {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize;
    var btnFontSize = fontSize * 3;
    ctx.timerClockSubPanel = document.createElement('div');

    var marginB = 20 * ctx.zoom;
    ctx.timerClockLabel = document.createElement('div');
    ctx.timerClockLabel.style.marginBottom = marginB + 'px';
    ctx.timerClockSubPanel.appendChild(ctx.timerClockLabel);

    var btns = document.createElement('div');
    btns.style.borderTop = 'solid 2px ' + ctx.opt.timerLineColor;
    btns.style.paddingTop = fontSize + 'px';
    btns.style.lineHeight = btnFontSize + 'px';
    ctx.timerClockSubPanel.appendChild(btns);

    ctx.createTimerBtn(btns, 'MODE', ctx.toggleTimerMode, false, btnFontSize);
    ctx.createTimerBtn(btns, 'RESET', null, true, btnFontSize);
    ctx.createTimerBtn(btns, '>>', null, true, btnFontSize);
    ctx.createTimerBtn(btns, 'SPLIT', null, true, btnFontSize);
    ctx.clockSSSbtn = ctx.createTimerBtn(btns, 'sss', ctx.toggleSSS, false, (fontSize * 1.5));
    ctx.updateSSS(ctx);
  },
  toggleSSS: function() {
    var ctx = DebugJS.ctx;
    ctx.timerClockSSS = (ctx.timerClockSSS ? false : true);
    ctx.updateSSS(ctx);
  },
  updateSSS: function(ctx) {
    var color = (ctx.timerClockSSS ? DebugJS.TOOL_TMR_BTN_COLOR : '#888');
    DebugJS.setStyle(ctx.clockSSSbtn, 'color', color);
  },
  createTimerStopwatchSubPanel: function(ctx, handlers) {
    var panel = {
      basePanel: null, stopWatchLabel: null, btns: null, startStopBtn: null, splitBtn: null
    };
    var fontSize = ctx.computedFontSize;
    var btnFontSize = fontSize * 3;
    panel.basePanel = document.createElement('div');

    var marginT = 40 * ctx.zoom;
    var marginB = 39 * ctx.zoom;
    panel.stopWatchLabel = document.createElement('div');
    panel.stopWatchLabel.style.margin = marginT + 'px 0 ' + marginB + 'px 0';
    panel.basePanel.appendChild(panel.stopWatchLabel);

    var btns = document.createElement('div');
    btns.style.borderTop = 'solid 2px ' + ctx.opt.timerLineColor;
    btns.style.paddingTop = fontSize + 'px';
    btns.style.lineHeight = btnFontSize + 'px';
    panel.basePanel.appendChild(btns);

    ctx.createTimerBtn(btns, 'MODE', ctx.toggleTimerMode, false, btnFontSize);
    ctx.createTimerBtn(btns, 'RESET', handlers.reset, false, btnFontSize);
    panel.startStopBtn = ctx.createTimerBtn(btns, '>>', handlers.startStop, false, btnFontSize);
    panel.splitBtn = ctx.createTimerBtn(btns, 'SPLIT', handlers.split, false, btnFontSize);

    panel.btns = btns;
    return panel;
  },
  createTimerStopwatchCuSubPanel: function() {
    var ctx = DebugJS.ctx;
    var handlers = {
      reset: ctx.resetTimerStopwatchCu,
      startStop: ctx.startStopTimerStopwatchCu,
      split: ctx.splitTimerStopwatchCu
    };
    var panel = ctx.createTimerStopwatchSubPanel(ctx, handlers);
    ctx.timerSwCuSubPanel = panel.basePanel;
    ctx.timerSwCuLabel = panel.stopWatchLabel;
    ctx.timerStartStopBtnCu = panel.startStopBtn;
    ctx.timerSplitBtnCu = panel.splitBtn;
  },
  createTimerStopwatchCdSubPanel: function() {
    var ctx = DebugJS.ctx;
    var handlers = {
      reset: ctx.resetTimerStopwatchCd,
      startStop: ctx.startStopTimerStopwatchCd,
      split: ctx.splitTimerStopwatchCd
    };
    var panel = ctx.createTimerStopwatchSubPanel(ctx, handlers);
    ctx.timerSwCdSubPanel = panel.basePanel;
    ctx.timerSwCdLabel = panel.stopWatchLabel;
    ctx.timerStartStopBtnCd = panel.startStopBtn;
    ctx.timerSplitBtnCd = panel.splitBtn;
    ctx.timer0CntBtnCd1 = ctx.createTimerBtn(panel.btns, '0=>', ctx.toggle0ContinueTimerStopwatchCd, false, (ctx.computedFontSize * 1.5));
    ctx.update0ContinueBtnTimerStopwatchCd();
  },
  createTimerStopwatchCdInpSubPanel: function() {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize;
    var baseFontSize = fontSize * 6.5;
    var btnFontSize = fontSize * 3;
    var msFontSize = baseFontSize * 0.65;
    var basePanel = document.createElement('div');

    var timerUpBtns = document.createElement('div');
    timerUpBtns.style.margin = '0 0 -' + fontSize * 0.8 + 'px 0';
    timerUpBtns.style.lineHeight = btnFontSize + 'px';
    basePanel.appendChild(timerUpBtns);
    ctx.createTimerUpDwnBtn(true, 'hh', timerUpBtns, btnFontSize, 3);
    ctx.createTimerUpDwnBtn(true, 'mi', timerUpBtns, btnFontSize, 3);
    ctx.createTimerUpDwnBtn(true, 'ss', timerUpBtns, btnFontSize, 2.5);
    ctx.createTimerUpDwnBtn(true, 'sss', timerUpBtns, btnFontSize, 0);

    ctx.timerSwCdInput = document.createElement('div');
    ctx.timerSwCdInput.style.margin = '0';
    ctx.timerSwCdInput.style.lineHeight = baseFontSize + 'px';
    basePanel.appendChild(ctx.timerSwCdInput);
    ctx.timerTxtHH = ctx.createTimerInput(ctx.timerSwCdInput, DebugJS.timestr2struct(ctx.props.timer).hh, baseFontSize);
    ctx.createTimerInputLabel(ctx.timerSwCdInput, ':', baseFontSize);
    ctx.timerTxtMI = ctx.createTimerInput(ctx.timerSwCdInput, DebugJS.timestr2struct(ctx.props.timer).mi, baseFontSize);
    ctx.createTimerInputLabel(ctx.timerSwCdInput, ':', baseFontSize);
    ctx.timerTxtSS = ctx.createTimerInput(ctx.timerSwCdInput, DebugJS.timestr2struct(ctx.props.timer).ss, baseFontSize);
    ctx.createTimerInputLabel(ctx.timerSwCdInput, '.', msFontSize);
    ctx.timerTxtSSS = ctx.createTimerInput(ctx.timerSwCdInput, DebugJS.timestr2struct(ctx.props.timer).sss, msFontSize, '2em');

    var timerDwnBtns = document.createElement('div');
    var marginT = fontSize * 2;
    var marginB = fontSize * 1.2;
    timerDwnBtns.style.margin = '-' + marginT + 'px 0 ' + marginB + 'px 0';
    timerDwnBtns.style.lineHeight = btnFontSize + 'px';
    ctx.createTimerUpDwnBtn(false, 'hh', timerDwnBtns, btnFontSize, 3);
    ctx.createTimerUpDwnBtn(false, 'mi', timerDwnBtns, btnFontSize, 3);
    ctx.createTimerUpDwnBtn(false, 'ss', timerDwnBtns, btnFontSize, 2.5);
    ctx.createTimerUpDwnBtn(false, 'sss', timerDwnBtns, btnFontSize, 0);
    basePanel.appendChild(timerDwnBtns);

    var btns = document.createElement('div');
    btns.style.borderTop = 'solid 2px ' + ctx.opt.timerLineColor;
    btns.style.paddingTop = fontSize + 'px';
    btns.style.lineHeight = btnFontSize + 'px';
    ctx.createTimerBtn(btns, 'MODE', ctx.toggleTimerMode, false, btnFontSize);
    ctx.createTimerBtn(btns, 'RESET', ctx.resetTimerStopwatchCd, false, btnFontSize);
    ctx.timerStartStopBtnCdInp = ctx.createTimerBtn(btns, '>>', ctx.startStopTimerStopwatchCd, false, btnFontSize);
    ctx.createTimerBtn(btns, 'SPLIT', null, true, btnFontSize);
    ctx.timer0CntBtnCd2 = ctx.createTimerBtn(btns, '0=>', ctx.toggle0ContinueTimerStopwatchCd, false, (fontSize * 1.5));
    basePanel.appendChild(btns);

    ctx.timerSwCdInpSubPanel = basePanel;
  },
  createTimerInput: function(base, val, fontSize, width) {
    var ctx = DebugJS.ctx;
    var el = document.createElement('input');
    el.className = 'dbg-timer-inp';
    DebugJS.setStyle(el, 'margin-top', '-' + fontSize * 0.5 + 'px');
    DebugJS.setStyle(el, 'font-size', fontSize + 'px');
    if (width) DebugJS.setStyle(el, 'width', width);
    el.value = val;
    el.oninput = ctx.updatePropTimer;
    base.appendChild(el);
    return el;
  },
  createTimerInputLabel: function(base, label, fontSize) {
    var el = document.createElement('span');
    el.innerText = label;
    DebugJS.setStyle(el, 'font-size', fontSize + 'px');
    base.appendChild(el);
  },
  createTimerBtn: function(base, label, handler, disabled, fontSize) {
    var btn = DebugJS.ui.addBtn(base, label, handler);
    btn.style.marginRight = '0.5em';
    DebugJS.setStyle(btn, 'color', (disabled ? '#888' : DebugJS.TOOL_TMR_BTN_COLOR));
    if (fontSize) DebugJS.setStyle(btn, 'font-size', fontSize + 'px');
    return btn;
  },
  createTimerUpDwnBtn: function(up, part, area, fontSize, margin) {
    var lbl = (up ? '+' : '-');
    var fn = new Function('DebugJS.ctx.timerUpDwn(\'' + part + '\', ' + up + ')');
    var btn = DebugJS.ui.addBtn(area, lbl, fn);
    btn.style.marginRight = margin + 'em';
    DebugJS.setStyle(btn, 'color', DebugJS.TOOL_TMR_BTN_COLOR);
    DebugJS.setStyle(btn, 'font-size', fontSize + 'px');
    return btn;
  },
  timerUpDwn: function(part, up) {
    var val = DebugJS.ctx.calcExpireTimeInp();
    var ms = {'hh': 3600000, 'mi': 60000, 'ss': 1000, 'sss': 1};
    var v = (ms[part] === undefined ? 0 : ms[part]);
    if (up) {
      val += v;
    } else {
      if (val >= v) val -= v;
    }
    DebugJS.ctx.updateExpireTimeInp(val);
    DebugJS.ctx.drawStopwatchCd();
  },
  updatePropTimer: function() {
    var ctx = DebugJS.ctx;
    ctx.props.timer = ctx.timerTxtHH.value + ':' + ctx.timerTxtMI.value + ':' + ctx.timerTxtSS.value + '.' + ctx.timerTxtSSS.value;
  },
  calcExpireTimeInp: function() {
    var ctx = DebugJS.ctx;
    var h = (ctx.timerTxtHH.value | 0) * 3600000;
    var m = (ctx.timerTxtMI.value | 0) * 60000;
    var s = (ctx.timerTxtSS.value | 0) * 1000;
    var ms = (ctx.timerTxtSSS.value | 0);
    return h + m + s + ms;
  },
  updateExpireTimeInp: function(v) {
    var ctx = DebugJS.ctx;
    var tm = DebugJS.ms2struct(v, true);
    ctx.timerTxtHH.value = tm.hh;
    ctx.timerTxtMI.value = tm.mi;
    ctx.timerTxtSS.value = tm.ss;
    ctx.timerTxtSSS.value = tm.sss;
    ctx.updatePropTimer();
  },
  toggleTimerMode: function(e, rv) {
    var a = [DebugJS.TOOL_TMR_MODE_CLOCK, DebugJS.TOOL_TMR_MODE_SW_CU, DebugJS.TOOL_TMR_MODE_SW_CD];
    var f = rv ? DebugJS.arr.prev : DebugJS.arr.next;
    var nextMode = f(a, DebugJS.ctx.toolTimerMode);
    DebugJS.ctx.switchTimerMode(nextMode);
  },
  switchTimerMode: function(mode) {
    if (mode == DebugJS.TOOL_TMR_MODE_SW_CU) {
      DebugJS.ctx.switchTimerModeStopwatchCu();
    } else if (mode == DebugJS.TOOL_TMR_MODE_SW_CD) {
      DebugJS.ctx.switchTimerModeStopwatchCd();
    } else {
      DebugJS.ctx.switchTimerModeClock();
    }
  },
  switchTimerModeClock: function() {
    var ctx = DebugJS.ctx;
    ctx.replaceTimerSubPanel(ctx.timerClockSubPanel);
    ctx.toolTimerMode = DebugJS.TOOL_TMR_MODE_CLOCK;
    ctx.updateTimerClock();
  },
  switchTimerModeStopwatchCu: function() {
    var ctx = DebugJS.ctx;
    ctx.toolTimerMode = DebugJS.TOOL_TMR_MODE_SW_CU;
    ctx.replaceTimerSubPanel(ctx.timerSwCuSubPanel);
    ctx.drawStopwatchCu();
    ctx.updateTimerStopwatchCu();
    ctx.updateTimerSwBtnsCu();
  },
  switchTimerModeStopwatchCd: function() {
    var ctx = DebugJS.ctx;
    ctx.toolTimerMode = DebugJS.TOOL_TMR_MODE_SW_CD;
    if ((ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) ||
        (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_PAUSED) ||
        (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_END)) {
      ctx.replaceTimerSubPanel(ctx.timerSwCdSubPanel);
      ctx.drawStopwatchCd();
      ctx.updateTimerStopwatchCd();
    } else {
      ctx.replaceTimerSubPanel(ctx.timerSwCdInpSubPanel);
    }
    ctx.updateTimerSwBtnsCd();
  },
  replaceTimerSubPanel: function(panel) {
    var ctx = DebugJS.ctx;
    for (var i = ctx.timerBasePanel.childNodes.length - 1; i >= 0; i--) {
      ctx.timerBasePanel.removeChild(ctx.timerBasePanel.childNodes[i]);
    }
    ctx.timerBasePanel.appendChild(panel);
  },
  updateTimerClock: function() {
    var ctx = DebugJS.ctx;
    if ((!(ctx.status & DebugJS.ST_TOOLS)) || (ctx.toolTimerMode != DebugJS.TOOL_TMR_MODE_CLOCK)) return;
    var tm = DebugJS.getDateTime();
    ctx.timerClockLabel.innerHTML = ctx.createClockStr(tm);
    setTimeout(ctx.updateTimerClock, ctx.clockUpdInt);
  },
  createClockStr: function(tm) {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize * 8;
    var dtFontSize = fontSize * 0.45;
    var ssFontSize = fontSize * 0.65;
    var msFontSize = fontSize * 0.45;
    var marginT = 20 * ctx.zoom;
    var marginB = 10 * ctx.zoom;
    var dot = '.';
    if (tm.sss > 500) dot = '&nbsp;';
    var date = tm.yyyy + '-' + tm.mm + '-' + tm.dd + ' <span style="color:#' + DebugJS.WDAYS_COLOR[tm.wday] + ' !important;font-size:' + dtFontSize + 'px !important">' + DebugJS.WDAYS[tm.wday] + '</span>';
    var time = tm.hh + ':' + tm.mi + '<span style="margin-left:' + (ssFontSize / 5) + 'px;color:' + ctx.opt.fontColor + ' !important;font-size:' + ssFontSize + 'px !important">' + tm.ss + dot + '</span>';
    if (ctx.timerClockSSS) {
      time += '<span style="font-size:' + msFontSize + 'px !important">' + tm.sss + '</span>';
      marginB -= 16 * ctx.zoom;
    }
    var s = '<div style="color:' + ctx.opt.fontColor + ' !important;font-size:' + dtFontSize + 'px !important">' + date + '</div>' +
    '<div style="color:' + ctx.opt.fontColor + ' !important;font-size:' + fontSize + 'px !important;margin:-' + marginT + 'px 0 ' + marginB + 'px 0">' + time + '</div>';
    return s;
  },
  startStopTimerStopwatchCu: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_END) {
      ctx.resetTimerStopwatchCu();
    }
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_RUNNING) {
      ctx.stopTimerStopwatchCu();
    } else {
      ctx.startTimerStopwatchCu();
    }
  },
  startStopTimerStopwatchCd: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) {
      ctx.stopTimerStopwatchCd();
    } else {
      ctx.startTimerStopwatchCd();
    }
  },
  startTimerStopwatchCu: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_END) {
      ctx.resetTimerStopwatchCu();
    }
    ctx.toolStatus |= DebugJS.TOOL_ST_SW_CU_RUNNING;
    DebugJS.time.restart(DebugJS.TMR_NM_SW_CU);
    ctx.updateTimerStopwatchCu();
    ctx.updateTimerSwBtnsCu();
    DebugJS.callEvtListeners('stopwatch', 1, 'start');
  },
  stopTimerStopwatchCu: function() {
    var ctx = DebugJS.ctx;
    ctx.updateTimerStopwatchCu();
    DebugJS.time.pause(DebugJS.TMR_NM_SW_CU);
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CU_RUNNING;
    ctx.drawStopwatchCu();
    ctx.updateTimerSwBtnsCu();
    DebugJS.callEvtListeners('stopwatch', 1, 'stop');
  },
  endTimerStopwatchCu: function() {
    var ctx = DebugJS.ctx;
    ctx.updateTimerStopwatchCu();
    ctx.toolStatus |= DebugJS.TOOL_ST_SW_CU_END;
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CU_RUNNING;
    ctx.updateTimerStopwatchCu();
    ctx.updateTimerSwBtnsCu();
  },
  splitTimerStopwatchCu: function() {
    if (DebugJS.ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_RUNNING) {
      DebugJS.time._split(DebugJS.TMR_NM_SW_CU);
    }
  },
  resetTimerStopwatchCu: function() {
    var ctx = DebugJS.ctx;
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CU_END;
    DebugJS.time.reset(DebugJS.TMR_NM_SW_CU);
    ctx.drawStopwatchCu();
    ctx.updateTimerSwBtnsCu();
    DebugJS.callEvtListeners('stopwatch', 1, 'reset');
  },
  updateTimerStopwatchCu: function() {
    var ctx = DebugJS.ctx;
    if ((!(ctx.status & DebugJS.ST_TOOLS)) ||
        (ctx.toolTimerMode != DebugJS.TOOL_TMR_MODE_SW_CU) ||
        ((!(ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_RUNNING)) &&
        (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_END)))) return;
    if (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_END)) {
      DebugJS.time.updateCount(DebugJS.TMR_NM_SW_CU);
    }
    ctx.drawStopwatchCu();
    setTimeout(ctx.updateTimerStopwatchCu, DebugJS.UPDATE_INTERVAL_H);
  },
  drawStopwatchCu: function() {
    var tm = DebugJS.ms2struct(DebugJS.time.getCount(DebugJS.TMR_NM_SW_CU), true);
    DebugJS.ctx.timerSwCuLabel.innerHTML = DebugJS.ctx.createTimeStrCu(tm);
  },
  updateTimerSwBtnsCu: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.timerStartStopBtnCu) return;
    var btn = (ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_RUNNING) ? '||' : '>>';
    ctx.timerStartStopBtnCu.innerText = btn;
    ctx.updateTimerLapBtnCu();
  },
  updateTimerLapBtnCu: function() {
    var ctx = DebugJS.ctx;
    var color = '#888';
    var fn = null;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_RUNNING) {
      color = DebugJS.TOOL_TMR_BTN_COLOR;
      fn = ctx.splitTimerStopwatchCu;
    }
    DebugJS.setStyle(ctx.timerSplitBtnCu, 'color', color);
    ctx.timerSplitBtnCu.onclick = fn;
  },
  toggle0ContinueTimerStopwatchCd: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_EXPIRED) return;
    ctx.timerSwTimeCdContinue = (ctx.timerSwTimeCdContinue ? false : true);
    ctx.update0ContinueBtnTimerStopwatchCd();
  },
  update0ContinueBtnTimerStopwatchCd: function() {
    var ctx = DebugJS.ctx;
    var color = DebugJS.TOOL_TMR_BTN_COLOR;
    if (ctx.timerSwTimeCdContinue) {
      if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_EXPIRED) {
        color = ctx.opt.timerColorExpr;
      }
    } else {
      color = '#888';
    }
    if (ctx.timer0CntBtnCd1) DebugJS.setStyle(ctx.timer0CntBtnCd1, 'color', color);
    if (ctx.timer0CntBtnCd2) DebugJS.setStyle(ctx.timer0CntBtnCd2, 'color', color);
  },
  startTimerStopwatchCd: function() {
    var ctx = DebugJS.ctx;
    var now = DebugJS.now();
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_END) {
      ctx.resetTimerStopwatchCd();
    }
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_PAUSED) {
      ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CD_PAUSED;
      if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_EXPIRED) {
        ctx.timerExpTime = now - ctx.timerSwTimeCd;
      } else {
        ctx.timerExpTime = now + ctx.timerSwTimeCd;
      }
    } else {
      var expire = ctx.calcExpireTimeInp();
      ctx.timerExpTime = now + expire;
      ctx.replaceTimerSubPanel(ctx.timerSwCdSubPanel);
    }
    ctx.toolStatus |= DebugJS.TOOL_ST_SW_CD_RUNNING;
    ctx.updateTimerStopwatchCd();
    ctx.updateTimerSwBtnsCd();
    DebugJS.callEvtListeners('stopwatch', 2, 'start');
  },
  stopTimerStopwatchCd: function() {
    var ctx = DebugJS.ctx;
    ctx.updateTimerStopwatchCd();
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CD_RUNNING;
    ctx.toolStatus |= DebugJS.TOOL_ST_SW_CD_PAUSED;
    if (ctx.status & DebugJS.ST_TOOLS) ctx.drawStopwatchCd();
    ctx.updateTimerSwBtnsCd();
    DebugJS.callEvtListeners('stopwatch', 2, 'stop');
  },
  splitTimerStopwatchCd: function() {
    var ctx = DebugJS.ctx;
    var color = '#fff';
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_EXPIRED) {
      color = ctx.opt.timerColorExpr;
    }
    var t = DebugJS.TMR_NM_SW_CD + ': ' + '<span style="color:' + color + '">' + DebugJS.getTmrStr(ctx.timerSwTimeCd) + '</span>';
    DebugJS._log(t);
  },
  endTimerStopwatchCd: function(ctx) {
    ctx._endTimerStopwatchCd(ctx);
    ctx.updateTimerStopwatchCd();
  },
  _endTimerStopwatchCd: function(ctx) {
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CD_RUNNING;
    ctx.toolStatus |= DebugJS.TOOL_ST_SW_CD_END;
    ctx.updateTimerSwBtnsCd();
  },
  resetTimerStopwatchCd: function() {
    var ctx = DebugJS.ctx;
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CD_PAUSED;
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CD_EXPIRED;
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CD_END;
    var expire = ctx.calcExpireTimeInp();
    ctx.timerExpTime = DebugJS.now() + expire;
    ctx.timerSwTimeCd = expire;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) {
      ctx.updateTimerStopwatchCd();
    } else {
      ctx.replaceTimerSubPanel(ctx.timerSwCdInpSubPanel);
    }
    ctx.updateTimerSwBtnsCd();
    DebugJS.callEvtListeners('stopwatch', 2, 'reset');
  },
  updateTimerStopwatchCd: function() {
    var ctx = DebugJS.ctx;
    if ((!(ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING)) &&
        (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_END))) return;
    ctx._updateTimerStopwatchCd(ctx);
    if (ctx.status & DebugJS.ST_TOOLS) {
      ctx.drawStopwatchCd();
      setTimeout(ctx.updateTimerStopwatchCd, DebugJS.UPDATE_INTERVAL_H);
    }
  },
  _updateTimerStopwatchCd: function(ctx) {
    var t = ctx.timerSwTimeCd;
    if (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING)) {
      return t;
    }
    var now = DebugJS.now();
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_EXPIRED) {
      if (ctx.timerSwTimeCdContinue) {
        t = now - ctx.timerExpTime;
      }
    } else if (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_END)) {
      t = ctx.timerExpTime - now;
    }
    if (t < 0) {
      DebugJS.callEvtListeners('stopwatch', 2, 'timesup');
      ctx.toolStatus |= DebugJS.TOOL_ST_SW_CD_EXPIRED;
      ctx.update0ContinueBtnTimerStopwatchCd();
      if (ctx.timerSwTimeCdContinue) {
        t *= -1;
      } else {
        ctx._endTimerStopwatchCd(ctx);
        t = 0;
      }
    }
    ctx.timerSwTimeCd = t;
    return ((ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_EXPIRED) ? (t * (-1)) : t);
  },
  drawStopwatchCd: function() {
    var tm = DebugJS.ms2struct(DebugJS.ctx.timerSwTimeCd, true);
    DebugJS.ctx.timerSwCdLabel.innerHTML = DebugJS.ctx.createTimeStrCd(tm);
  },
  updateTimerSwBtnsCd: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.timerStartStopBtnCd) return;
    var btn = (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) ? '||' : '>>';
    ctx.timerStartStopBtnCd.innerText = btn;
    ctx.timerStartStopBtnCdInp.innerText = btn;
    ctx.updateTimerLapBtnCd();
    ctx.update0ContinueBtnTimerStopwatchCd();
  },
  updateTimerLapBtnCd: function() {
    var ctx = DebugJS.ctx;
    var color = '#888';
    var fn = null;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) {
      color = DebugJS.TOOL_TMR_BTN_COLOR;
      fn = ctx.splitTimerStopwatchCd;
    }
    DebugJS.setStyle(ctx.timerSplitBtnCd, 'color', color);
    ctx.timerSplitBtnCd.onclick = fn;
  },
  createTimeStrCu: function(tm) {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize * 7;
    var msFontSize = fontSize * 0.65;
    var str;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_END) {
      var now = DebugJS.getDateTime();
      if (now.sss > 500) {
        str = '&nbsp;<span style="font-size:' + msFontSize + 'px !important">' + '&nbsp;</span>';
      } else {
        str = tm.hh + ':' + tm.mi + ':' + tm.ss + '<span style="color:' + ctx.opt.fontColor + ' !important;font-size:' + msFontSize + 'px !important">.' + tm.sss + '</span>';
      }
    } else {
      var dot = (((ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_RUNNING) && (tm.sss > 500)) ? '&nbsp;' : '.');
      str = tm.hh + ':' + tm.mi + ':' + tm.ss + '<span style="color:' + ctx.opt.fontColor + ' !important;font-size:' + msFontSize + 'px !important">' + dot + tm.sss + '</span>';
    }
    return '<div style="color:' + ctx.opt.fontColor + ' !important;font-size:' + fontSize + 'px !important">' + str + '</div>';
  },
  createTimeStrCd: function(tm) {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize * 7;
    var msFontSize = fontSize * 0.65;
    var color = ctx.opt.fontColor;
    var str;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_END) {
      var now = DebugJS.getDateTime();
      if (now.sss > 500) {
        str = '&nbsp;<span style="font-size:' + msFontSize + 'px !important">' + '&nbsp;</span>';
      } else {
        str = tm.hh + ':' + tm.mi + ':' + tm.ss + '<span style="color:' + color + ' !important;font-size:' + msFontSize + 'px !important">.' + tm.sss + '</span>';
      }
    } else {
      var dot;
      var styleS = '';
      var styleE = '';
      if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_EXPIRED) {
        color = ctx.opt.timerColorExpr;
        dot = (((ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) && (tm.sss > 500)) ? '&nbsp;' : '.');
        styleS = '<span style="color:' + color + ' !important;font-size:' + fontSize + 'px !important">';
        styleE = '</span>';
      } else {
        dot = (((ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) && (tm.sss < 500)) ? '&nbsp;' : '.');
      }
      str = styleS + tm.hh + ':' + tm.mi + ':' + tm.ss + '<span style="color:' + color + ' !important;font-size:' + msFontSize + 'px !important">' + dot + tm.sss + '</span>' + styleE;
    }
    return '<div style="color:' + color + ' !important;font-size:' + fontSize + 'px !important">' + str + '</div>';
  },
  closeTimer: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActvFnc & DebugJS.TOOLS_FNC_TIMER) && (ctx.timerBasePanel)) {
      ctx.removeToolFuncPanel(ctx, ctx.timerBasePanel);
      ctx.setIntervalL(ctx);
    }
  },
  handleTimerKey: function(e) {
    var ctx = DebugJS.ctx;
    if ((ctx.sizeStatus != DebugJS.SIZE_ST_FULL_WH) || DebugJS.cmd.hasFocus()) return;
    if ((e.keyCode == 13) || (e.keyCode == 32)) {
      if (ctx.toolTimerMode == DebugJS.TOOL_TMR_MODE_SW_CU) {
        ctx.startStopTimerStopwatchCu();
      } else if (ctx.toolTimerMode == DebugJS.TOOL_TMR_MODE_SW_CD) {
        ctx.startStopTimerStopwatchCd();
      }
    } else if (e.keyCode == 8) {
      if (!DebugJS.isFocusInput()) {
        if (ctx.toolTimerMode == DebugJS.TOOL_TMR_MODE_SW_CU) {
          ctx.resetTimerStopwatchCu();
        } else if (ctx.toolTimerMode == DebugJS.TOOL_TMR_MODE_SW_CD) {
          ctx.resetTimerStopwatchCd();
        }
        e.preventDefault();
      }
    } else if (e.keyCode == 9) {
      if (!DebugJS.isFocusInput()) {
        ctx.toggleTimerMode(null, e.shiftKey);
        e.preventDefault();
      }
    } else if (e.keyCode == 16) {
      if (ctx.toolTimerMode == DebugJS.TOOL_TMR_MODE_SW_CU) {
        if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CU_RUNNING) {
          ctx.splitTimerStopwatchCu();
        }
      } else if (ctx.toolTimerMode == DebugJS.TOOL_TMR_MODE_SW_CD) {
        if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RUNNING) {
          ctx.splitTimerStopwatchCd();
        }
      }
    } else if ((e.keyCode == 48) || (e.keyCode == 96)) {
      if (ctx.toolTimerMode == DebugJS.TOOL_TMR_MODE_SW_CD) {
        if (!DebugJS.isFocusInput()) {
          ctx.toggle0ContinueTimerStopwatchCd();
        }
      }
    } else if (e.keyCode == 83) {
      ctx.toggleSSS();
    }
  },

  openTextChecker: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.txtChkPanel) {
      ctx.createTxtChkPanel(ctx);
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.txtChkPanel);
    }
  },
  createTxtChkPanel: function(ctx) {
    var dfltFontSize = ctx.computedFontSize;
    var dfltFontFamily = 'Consolas';
    var dfltFontWeight = 400;
    var dfltFgRGB16 = 'fff';
    var dfltBgRGB16 = '000';
    var panelPadding = 2;
    ctx.txtChkPanel = DebugJS.addSubPanel(ctx.toolsBodyPanel);
    var txtPadding = 4;

    var style = {
      'width': 'calc(100% - ' + ((txtPadding + panelPadding) * 2) + 'px)',
      'min-height': (20 * ctx.zoom) + 'px',
      'margin-bottom': '8px',
      'padding': txtPadding + 'px',
      'border': '0',
      'border-radius': '0',
      'outline': 'none',
      'font-size': dfltFontSize + 'px',
      'font-family': dfltFontFamily
    };
    ctx.txtChkTxt = DebugJS.ui.addElement(ctx.txtChkPanel, 'input', style);
    ctx.txtChkTxt.value = 'ABCDEFG.abcdefg 12345-67890_!?';
    ctx.txtChkTxt.spellcheck = false;
    ctx.txtChkTargetEl = ctx.txtChkTxt;

    var html = 'font-size: <input type="range" min="0" max="128" step="1" id="' + ctx.id + '-fontsize-range" class="dbg-txt-range" oninput="DebugJS.ctx.onChangeFontSize(true);" onchange="DebugJS.ctx.onChangeFontSize(true);">' +
    '<input value="' + dfltFontSize + '" id="' + ctx.id + '-font-size" class="dbg-txtbox" style="width:30px;text-align:right" oninput="DebugJS.ctx.onChangeFontSizeTxt()">' +
    '<input value="px" id="' + ctx.id + '-font-size-unit" class="dbg-txtbox" style="width:20px;" oninput="DebugJS.ctx.onChangeFontSizeTxt()">' +
    '<span class="dbg-btn dbg-nomove" style="margin-left:5px;color:' + DebugJS.COLOR_INACT + ' !important;font-style:italic;" onmouseover="DebugJS.setStyle(this, \'color\', \'' + ctx.opt.btnColor + '\');" onmouseout="DebugJS.ctx.updateTxtItalicBtn(this);" onclick="DebugJS.ctx.toggleTxtItalic(this);"> I </span>' +
    '<span class="dbg-btn dbg-nomove" style="margin-left:5px;color:' + DebugJS.COLOR_INACT + ' !important;" onmouseover="DebugJS.setStyle(this, \'color\', \'' + ctx.opt.btnColor + '\');" onmouseout="DebugJS.ctx.updateElBtn(this);" onclick="DebugJS.ctx.toggleElmEditable(this);">(el)</span>' +
    '<br>' +
    'font-family: <input value="' + dfltFontFamily + '" class="dbg-txtbox" style="width:110px" oninput="DebugJS.ctx.onChangeFontFamily(this)">&nbsp;&nbsp;' +
    'font-weight: <input type="range" min="100" max="900" step="100" value="' + dfltFontWeight + '" id="' + ctx.id + '-fontweight-range" class="dbg-txt-range" style="width:80px !important" oninput="DebugJS.ctx.onChangeFontWeight();" onchange="DebugJS.ctx.onChangeFontWeight();"><span id="' + ctx.id + '-font-weight"></span> ' +
    '<table class="dbg-txt-tbl">' +
    '<tr><td colspan="2">FG #<input id="' + ctx.id + '-fg-rgb" class="dbg-txtbox" value="' + dfltFgRGB16 + '" style="width:80px" oninput="DebugJS.ctx.onChangeFgRGB()"></td></tr>' +
    '<tr><td><span style="color:' + DebugJS.COLOR_R + '">R</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-fg-range-r" class="dbg-txt-range" oninput="DebugJS.ctx.onChangeFgColor(true);" onchange="DebugJS.ctx.onChangeFgColor(true);"></td><td><span id="' + ctx.id + '-fg-r"></span></td></tr>' +
    '<tr><td><span style="color:' + DebugJS.COLOR_G + '">G</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-fg-range-g" class="dbg-txt-range" oninput="DebugJS.ctx.onChangeFgColor(true);" onchange="DebugJS.ctx.onChangeFgColor(true);"></td><td><span id="' + ctx.id + '-fg-g"></span></td></tr>' +
    '<tr><td><span style="color:' + DebugJS.COLOR_B + '">B</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-fg-range-b" class="dbg-txt-range" oninput="DebugJS.ctx.onChangeFgColor(true);" onchange="DebugJS.ctx.onChangeFgColor(true);"></td><td><span id="' + ctx.id + '-fg-b"></span></td></tr>' +
    '<tr><td colspan="2">BG #<input id="' + ctx.id + '-bg-rgb" class="dbg-txtbox" value="' + dfltBgRGB16 + '" style="width:80px" oninput="DebugJS.ctx.onChangeBgRGB()"></td></tr>' +
    '<tr><td><span style="color:' + DebugJS.COLOR_R + '">R</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-bg-range-r" class="dbg-txt-range" oninput="DebugJS.ctx.onChangeBgColor(true);" onchange="DebugJS.ctx.onChangeBgColor(true);"></td><td><span id="' + ctx.id + '-bg-r"></span></td></tr>' +
    '<tr><td><span style="color:' + DebugJS.COLOR_G + '">G</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-bg-range-g" class="dbg-txt-range" oninput="DebugJS.ctx.onChangeBgColor(true);" onchange="DebugJS.ctx.onChangeBgColor(true);"></td><td><span id="' + ctx.id + '-bg-g"></span></td></tr>' +
    '<tr><td><span style="color:' + DebugJS.COLOR_B + '">B</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-bg-range-b" class="dbg-txt-range" oninput="DebugJS.ctx.onChangeBgColor(true);" onchange="DebugJS.ctx.onChangeBgColor(true);"></td><td><span id="' + ctx.id + '-bg-b"></span></td></tr>' +
    '</tbale>';
    ctx.txtChkCtrl = DebugJS.ui.addElement(ctx.txtChkPanel, 'div');
    ctx.txtChkCtrl.innerHTML = html;

    ctx.txtChkFontSizeRange = document.getElementById(ctx.id + '-fontsize-range');
    ctx.txtChkFontSizeInput = document.getElementById(ctx.id + '-font-size');
    ctx.txtChkFontSizeUnitInput = document.getElementById(ctx.id + '-font-size-unit');
    ctx.txtChkFontWeightRange = document.getElementById(ctx.id + '-fontweight-range');
    ctx.txtChkFontWeightLabel = document.getElementById(ctx.id + '-font-weight');
    ctx.txtChkInputFgRGB = document.getElementById(ctx.id + '-fg-rgb');
    ctx.txtChkRangeFgR = document.getElementById(ctx.id + '-fg-range-r');
    ctx.txtChkRangeFgG = document.getElementById(ctx.id + '-fg-range-g');
    ctx.txtChkRangeFgB = document.getElementById(ctx.id + '-fg-range-b');
    ctx.txtChkLabelFgR = document.getElementById(ctx.id + '-fg-r');
    ctx.txtChkLabelFgG = document.getElementById(ctx.id + '-fg-g');
    ctx.txtChkLabelFgB = document.getElementById(ctx.id + '-fg-b');
    ctx.txtChkInputBgRGB = document.getElementById(ctx.id + '-bg-rgb');
    ctx.txtChkRangeBgR = document.getElementById(ctx.id + '-bg-range-r');
    ctx.txtChkRangeBgG = document.getElementById(ctx.id + '-bg-range-g');
    ctx.txtChkRangeBgB = document.getElementById(ctx.id + '-bg-range-b');
    ctx.txtChkLabelBgR = document.getElementById(ctx.id + '-bg-r');
    ctx.txtChkLabelBgG = document.getElementById(ctx.id + '-bg-g');
    ctx.txtChkLabelBgB = document.getElementById(ctx.id + '-bg-b');

    ctx.onChangeFontSizeTxt();
    ctx.onChangeFontWeight();
    ctx.onChangeFgRGB();
    ctx.onChangeBgRGB();
  },
  toggleTxtItalic: function(btn) {
    var ctx = DebugJS.ctx;
    var style = '';
    if (ctx.txtChkItalic) {
      ctx.txtChkItalic = false;
    } else {
      ctx.txtChkItalic = true;
      style = 'italic';
    }
    DebugJS.setStyle(ctx.txtChkTargetEl, 'font-style', style);
    ctx.updateTxtItalicBtn(btn);
  },
  updateTxtItalicBtn: function(btn) {
    var c = (DebugJS.ctx.txtChkItalic ? DebugJS.ctx.opt.btnColor : DebugJS.COLOR_INACT);
    DebugJS.setStyle(btn, 'color', c);
  },
  toggleElmEditable: function(btn) {
    var ctx = DebugJS.ctx;
    var b = DebugJS.ST_ELM_EDIT;
    if (ctx.status & b) {
      ctx.status &= ~b;
      ctx.updateEditable(ctx, ctx.txtChkTxt);
    } else {
      ctx.status |= b;
      if (DebugJS.el) {
        ctx.updateEditable(ctx, DebugJS.el);
      }
    }
    ctx.updateElBtn(btn);
  },
  updateElBtn: function(btn) {
    var c = (DebugJS.ctx.status & DebugJS.ST_ELM_EDIT ? DebugJS.ctx.opt.btnColor : DebugJS.COLOR_INACT);
    DebugJS.setStyle(btn, 'color', c);
  },
  onChangeFgRGB: function() {
    var ctx = DebugJS.ctx;
    var rgb16 = '#' + ctx.txtChkInputFgRGB.value;
    var rgb10 = DebugJS.convRGB16to10(rgb16);
    ctx.txtChkRangeFgR.value = rgb10.r;
    ctx.txtChkRangeFgG.value = rgb10.g;
    ctx.txtChkRangeFgB.value = rgb10.b;
    ctx.onChangeFgColor(null);
    DebugJS.setStyle(ctx.txtChkTargetEl, 'color', rgb16);
  },
  onChangeBgRGB: function() {
    var ctx = DebugJS.ctx;
    var rgb16 = '#' + ctx.txtChkInputBgRGB.value;
    var rgb10 = DebugJS.convRGB16to10(rgb16);
    ctx.txtChkRangeBgR.value = rgb10.r;
    ctx.txtChkRangeBgG.value = rgb10.g;
    ctx.txtChkRangeBgB.value = rgb10.b;
    ctx.onChangeBgColor(null);
    DebugJS.setStyle(ctx.txtChkTargetEl, 'background', rgb16);
  },
  onChangeFgColor: function(callFromRange) {
    var ctx = DebugJS.ctx;
    var fgR = ctx.txtChkRangeFgR.value;
    var fgG = ctx.txtChkRangeFgG.value;
    var fgB = ctx.txtChkRangeFgB.value;
    var rgb16 = DebugJS.convRGB10to16(fgR + ' ' + fgG + ' ' + fgB);
    ctx.txtChkLabelFgR.innerText = fgR;
    ctx.txtChkLabelFgG.innerText = fgG;
    ctx.txtChkLabelFgB.innerText = fgB;
    if (callFromRange) {
      ctx.txtChkInputFgRGB.value = rgb16.r + rgb16.g + rgb16.b;
      DebugJS.setStyle(ctx.txtChkTargetEl, 'color', 'rgb(' + fgR + ',' + fgG + ',' + fgB + ')');
    }
  },
  onChangeBgColor: function(callFromRange) {
    var ctx = DebugJS.ctx;
    var bgR = ctx.txtChkRangeBgR.value;
    var bgG = ctx.txtChkRangeBgG.value;
    var bgB = ctx.txtChkRangeBgB.value;
    var rgb16 = DebugJS.convRGB10to16(bgR + ' ' + bgG + ' ' + bgB);
    ctx.txtChkLabelBgR.innerText = bgR;
    ctx.txtChkLabelBgG.innerText = bgG;
    ctx.txtChkLabelBgB.innerText = bgB;
    if (callFromRange) {
      ctx.txtChkInputBgRGB.value = rgb16.r + rgb16.g + rgb16.b;
      DebugJS.setStyle(ctx.txtChkTargetEl, 'background', 'rgb(' + bgR + ',' + bgG + ',' + bgB + ')');
    }
  },
  onChangeFontSizeTxt: function() {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.txtChkFontSizeInput.value;
    var unit = ctx.txtChkFontSizeUnitInput.value;
    ctx.txtChkFontSizeRange.value = fontSize;
    ctx.onChangeFontSize(null);
    DebugJS.setStyle(ctx.txtChkTargetEl, 'font-size', fontSize + unit);
  },
  onChangeFontSize: function(callFromRange) {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.txtChkFontSizeRange.value;
    var unit = ctx.txtChkFontSizeUnitInput.value;
    if (callFromRange) {
      ctx.txtChkFontSizeInput.value = fontSize;
      DebugJS.setStyle(ctx.txtChkTargetEl, 'font-size', fontSize + unit);
    }
  },
  onChangeFontWeight: function() {
    var fontWeight = DebugJS.ctx.txtChkFontWeightRange.value;
    DebugJS.setStyle(DebugJS.ctx.txtChkTargetEl, 'font-weight', fontWeight);
    if (fontWeight == 400) {
      fontWeight += '(normal)';
    } else if (fontWeight == 700) {
      fontWeight += '(bold)';
    }
    DebugJS.ctx.txtChkFontWeightLabel.innerText = fontWeight;
  },
  onChangeFontFamily: function(font) {
    DebugJS.setStyle(DebugJS.ctx.txtChkTargetEl, 'font-family', font.value);
  },
  closeTextChecker: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActvFnc & DebugJS.TOOLS_FNC_TEXT) && (ctx.txtChkPanel)) {
      ctx.removeToolFuncPanel(ctx, ctx.txtChkPanel);
    }
  },

  openFileLoader: function(fmt) {
    var ctx = DebugJS.ctx;
    if (!ctx.fileVwrPanel) {
      ctx.createFileVwrPanel(ctx);
      ctx.clearFile();
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.fileVwrPanel);
    }
    if (fmt && (ctx.fileVwrMode != fmt)) {
      ctx.switchFileScreen();
    }
  },
  createFileVwrPanel: function(ctx) {
    var fontSize = ctx.computedFontSize + 'px';
    ctx.fileVwrPanel = DebugJS.addSubPanel(ctx.toolsBodyPanel);

    var style = {
      'width': 'calc(100% - ' + (ctx.computedFontSize * 19) + 'px)',
      'min-height': (20 * ctx.zoom) + 'px',
      'margin': '0 0 4px 0',
      'padding': '1px',
      'border': '0',
      'border-radius': '0',
      'outline': 'none',
      'font-size': fontSize
    };
    ctx.fileInput = DebugJS.ui.addElement(ctx.fileVwrPanel, 'input', style);
    ctx.fileInput.type = 'file';
    ctx.fileInput.addEventListener('change', ctx.onFileSelected);

    style = {'margin-left': (ctx.computedFontSize * 0.8) + 'px'};
    ctx.fileVwrRadioB64 = DebugJS.ui.addElement(ctx.fileVwrPanel, 'input', style, true);
    ctx.fileVwrRadioB64.type = 'radio';
    ctx.fileVwrRadioB64.id = ctx.id + '-load-type-b64';
    ctx.fileVwrRadioB64.name = ctx.id + '-load-type';
    ctx.fileVwrRadioB64.value = 'base64';
    ctx.fileVwrRadioB64.checked = true;
    ctx.fileVwrRadioB64.onchange = ctx.openViewerB64;

    ctx.fileVwrLabelB64 = DebugJS.ui.addElement(ctx.fileVwrPanel, 'label');
    ctx.fileVwrLabelB64.htmlFor = ctx.id + '-load-type-b64';
    ctx.fileVwrLabelB64.innerText = 'Base64';

    style = {'margin-left': (ctx.computedFontSize * 0.8) + 'px'};
    ctx.fileVwrRadioBin = DebugJS.ui.addElement(ctx.fileVwrPanel, 'input', style, true);
    ctx.fileVwrRadioBin.type = 'radio';
    ctx.fileVwrRadioBin.id = ctx.id + '-load-type-bin';
    ctx.fileVwrRadioBin.name = ctx.id + '-load-type';
    ctx.fileVwrRadioBin.value = 'binary';
    ctx.fileVwrRadioBin.onchange = ctx.openViewerBin;

    ctx.fileVwrLabelBin = DebugJS.ui.addElement(ctx.fileVwrPanel, 'label');
    ctx.fileVwrLabelBin.htmlFor = ctx.id + '-load-type-bin';
    ctx.fileVwrLabelBin.innerText = 'Binary';

    ctx.fileCopyBtn = DebugJS.ui.addBtn(ctx.fileVwrPanel, 'Copy', ctx.copyFileCtt, {color: DebugJS.COLOR_INACT});
    ctx.fileCopyBtn.style.marginLeft = (ctx.computedFontSize * 0.8) + 'px';
    ctx.enableFileCopyBtn(ctx, false);

    ctx.fileClrBtn = DebugJS.ui.addBtn(ctx.fileVwrPanel, 'Clear', ctx.clearFile);
    ctx.fileClrBtn.style.marginLeft = (ctx.computedFontSize * 0.8) + 'px';

    style = {
      'width': 'calc(100% - ' + (DebugJS.WIN_ADJUST + 2) + 'px)',
      'height': 'calc(100% - ' + ((ctx.computedFontSize * 4) + 10) + 'px)',
      'margin-bottom': '4px',
      'padding': '2px',
      'border': '1px dotted #ccc',
      'font-size': fontSize,
      'overflow': 'auto'
    };
    ctx.filePreviewWrapper = DebugJS.ui.addElement(ctx.fileVwrPanel, 'div', style);
    ctx.enableDnDFileLoad(ctx.filePreviewWrapper, ctx.onDropOnFileVwr);

    style = {
      'min-height': 'calc(50% + 10px)',
      'background': 'transparent',
      'color': ctx.opt.fontColor,
      'font-size': fontSize
    };
    ctx.filePreview = DebugJS.ui.addElement(ctx.filePreviewWrapper, 'pre', style);

    style = {
      'width': 'calc(100% - ' + (DebugJS.WIN_ADJUST + DebugJS.WIN_SHADOW) + 'px)',
      'height': (ctx.computedFontSize + 3) + 'px',
      'opacity': '0',
      'transition': 'opacity 0.5s linear'
    };
    ctx.fileVwrFooter = DebugJS.ui.addElement(ctx.fileVwrPanel, 'div', style, true);

    style = {
      'display': 'inline-block',
      'width': 'calc(100% - ' + (ctx.computedFontSize * 5) + 'px)',
      'height': 'auto',
      'padding': 0,
      'border': '1px solid #ccc'
    };
    ctx.fileLoadProgBar = DebugJS.ui.addElement(ctx.fileVwrFooter, 'div', style, true);

    style = {
      'width': 'calc(100% - ' + (DebugJS.WIN_BORDER * 2) + 'px)',
      'height': 'auto',
      'padding': '1px',
      'border': 'none',
      'background': '#00f',
      'font-size': (ctx.computedFontSize * 0.8) + 'px',
      'font-family': ctx.opt.fontFamily + 'px'
    };
    ctx.fileLoadProg = DebugJS.ui.addElement(ctx.fileLoadProgBar, 'div', style, true);
    ctx.fileLoadProg.innerText = '0%';

    ctx.fileLoadCancelBtn = DebugJS.ui.addBtn(ctx.fileVwrFooter, '[CANCEL]', ctx.cancelLoadFile);
    ctx.fileLoadCancelBtn.style.position = 'relative';
    ctx.fileLoadCancelBtn.style.top = '2px';
    ctx.fileLoadCancelBtn.style.float = 'right';

    style = {height: 'calc(50% - ' + (ctx.computedFontSize + ctx.computedFontSize * 0.5) + 'px)'};
    ctx.fileVwrDtUrlWrp = DebugJS.ui.addElement(ctx.filePreviewWrapper, 'div', style);
    ctx.fileVwrDtUrlScheme = DebugJS.ui.addTextInput(ctx.fileVwrDtUrlWrp, 'calc(100% - 31em)', null, ctx.opt.fontColor, '', null);
    var b = DebugJS.ui.addBtn(ctx.fileVwrDtUrlWrp, '[text]', ctx.setDtSchmTxt);
    b.style.marginLeft = (ctx.computedFontSize * 0.2) + 'px';
    b = DebugJS.ui.addBtn(ctx.fileVwrDtUrlWrp, '[image]', ctx.setDtSchmImg);
    b.style.marginLeft = (ctx.computedFontSize * 0.2) + 'px';

    b = DebugJS.ui.addElement(ctx.fileVwrDtUrlWrp, 'span');
    b.innerText = 'RET=';
    b.style.marginLeft = (ctx.computedFontSize * 0.4) + 'px';
    b.style.color = '#ccc';

    ctx.fileVwrRet = DebugJS.ui.addTextInput(ctx.fileVwrDtUrlWrp, '1.5em', 'right', '#ccc', '0', null);
    ctx.fileVwrRet.style.marginLeft = (ctx.computedFontSize * 0.2) + 'px';

    ctx.addFileVwrBtn(ctx, 'Decode', 8, ctx.decodeFileVwrData);
    ctx.fileVwrDecModeBtn = ctx.addFileVwrBtn(ctx, '[B64]', (ctx.computedFontSize * 0.5), ctx.toggleDecMode);
    ctx.fileVwrBSB64n = DebugJS.ui.addTextInput(ctx.fileVwrDtUrlWrp, '1em', 'center', '#ccc', '1', null);
    ctx.fileVwrBSB64n.style.float = 'right';
    ctx.fileVwrBSB64n.style.marginRight = (ctx.computedFontSize * 0.5) + 'px';
    ctx.fileVwrBSB64nL = DebugJS.ui.addElement(ctx.fileVwrDtUrlWrp, 'span', {float: 'right'}, true);
    ctx.fileVwrBSB64nL.innerText = 'n=';
    ctx.fileVwrBsbBtn = ctx.addFileVwrBtn(ctx, '<BSB64>', (ctx.computedFontSize * 0.2), ctx.setModeBSB64);
    ctx.fileVwrB64Btn = ctx.addFileVwrBtn(ctx, '<Base64>', (ctx.computedFontSize * 0.2), ctx.setModeB64);

    style = {height: 'calc(100% - ' + (ctx.computedFontSize + ctx.computedFontSize * 0.5) + 'px)'};
    ctx.fileVwrDtTxtArea = DebugJS.ui.addElement(ctx.fileVwrDtUrlWrp, 'textarea', style);
    ctx.fileVwrDtTxtArea.className = 'dbg-editor';
    ctx.fileVwrDtTxtArea.spellcheck = false;
    ctx.enableDnDFileLoad(ctx.fileVwrDtTxtArea, ctx.onDropOnFileVwrTxtArea);
    ctx.setModeB64();
  },
  addFileVwrBtn: function(ctx, lbl, mgn, fn) {
    var b = DebugJS.ui.addBtn(ctx.fileVwrDtUrlWrp, lbl, fn);
    b.style.float = 'right';
    b.style.marginRight = mgn + 'px';
    return b;
  },
  closeFileLoader: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActvFnc & DebugJS.TOOLS_FNC_FILE) && (ctx.fileVwrPanel)) {
      ctx.removeToolFuncPanel(ctx, ctx.fileVwrPanel);
    }
  },
  enableDnDFileLoad: function(tgt, cb) {
    tgt.addEventListener('dragover', DebugJS.file.onDragOver, false);
    tgt.addEventListener('drop', cb, false);
  },
  onFileSelected: function(e) {
    if (e.target.files.length > 0) {
      DebugJS.ctx.clearFile();
      DebugJS.ctx.loadFile(e.target.files[0], DebugJS.ctx.fileVwrMode);
    }
  },
  handleDroppedFile: function(ctx, e, fmt, cb) {
    ctx.clearFile();
    try {
      if (e.dataTransfer.files) {
        if (e.dataTransfer.files.length > 0) {
          ctx.fileVwrSysCb = cb;
          ctx.loadFile(e.dataTransfer.files[0], fmt);
        } else {
          DebugJS._log.w('handleDroppedFile() e.dataTransfer.files.length == 0');
          if (cb) cb(ctx, false, null, null);
        }
      }
    } catch (e) {DebugJS._log.e('handleDroppedFile() ' + e);}
  },
  onDrop: function(e) {
    e.stopPropagation();
    e.preventDefault();
  },
  onDropOnFileVwr: function(e) {
    var ctx = DebugJS.ctx;
    ctx.onDrop(e);
    ctx.preventErrCb = true;
    try {
      var d = e.dataTransfer.getData('text');
      if (d) {
        var s = DebugJS.delAllNL(d.trim());
        if (DebugJS.isDataURL(s)) {
          ctx.decodeDataURL(ctx, s);
        } else if (DebugJS.isBase64(s)) {
          var tp = DebugJS.Base64.getMimeType(s);
          var mime = (tp.type == '' ? 'text/plain' : tp.type + '/' + tp.subtype);
          ctx.decodeDataURL(ctx, 'data:' + mime + ';base64,' + s);
        }
      } else {
        ctx.handleDroppedFile(ctx, e, ctx.fileVwrMode, null);
      }
    } catch (e) {DebugJS._log.e(e);}
    ctx.preventErrCb = false;
  },
  onDropOnFileVwrTxtArea: function(e) {
    var ctx = DebugJS.ctx;
    ctx.onDrop(e);
    ctx.preventErrCb = true;
    try {
      var d = e.dataTransfer.getData('text');
      if (d) {
        ctx.fileVwrDtTxtArea.value = d;
      } else {
        ctx.handleDroppedFile(ctx, e, ctx.fileVwrMode, null);
      }
    } catch (e) {DebugJS._log.e(e);}
    ctx.preventErrCb = false;
  },
  onDropOnLogPanel: function(e) {
    var ctx = DebugJS.ctx;
    ctx.onDrop(e);
    ctx.preventErrCb = true;
    try {
      if (!DebugJS.callEvtListeners('drop', e)) return;
      var d = e.dataTransfer.getData('text');
      if (d) {
        ctx.onTxtDrop(ctx, d);
      } else {
        ctx.openFeature(ctx, DebugJS.ST_TOOLS, 'file', 'b64');
        ctx.handleDroppedFile(ctx, e, 'b64', ctx.onFileLoadedAuto);
      }
    } catch (e) {DebugJS._log.e(e);}
    ctx.preventErrCb = false;
  },
  onTxtDrop: function(ctx, t) {
    var r;
    if (ctx.dndCmd) {
      r = ctx.execDndCmd(ctx, t);
    } else if (DebugJS.isBat(t)) {
      ctx.openBat(ctx, t);
    } else {
      var s = DebugJS.delAllNL(t.trim());
      if (DebugJS.isDataURL(s)) {
        ctx.decodeDataURL(ctx, s);
      } else if (DebugJS.isUnixTm(s.trim())) {
        r = ctx.cmdDate(s, null, true);
      } else {
        if (ctx.decB64(ctx, s)) return;
        r = ctx.fmtJson(ctx, t);
      }
    }
    if (r != undefined) DebugJS.cp2cb(r);
  },
  fmtJson: function(ctx, t) {
    var a = DebugJS.crlf2lf(t).split('\n');
    var s = '';
    for (var i = 0; i < a.length; i++) {
      var pos = DebugJS.getJsonPos(a[i]);
      if (pos.open != -1) {
        if (s) s += '\n\n';
        s += '<span style="color:#0ff">------------------------------------------------------------</span>\n';
        var o = ctx._fmtJson(ctx, a[i], pos);
        if (o.e) {
          s += DebugJS.trimEchoStr(o.j) + '\n<span style="color:' + ctx.opt.logColorE + '">' + o.e + '</span>';
        } else {
          s += DebugJS.escHtml(o.r);
        }
      }
    }
    if (s) {
      DebugJS._log('');
      DebugJS._log.mlt(s);
      ctx.scrollLogBtm(ctx);
    }
    var r = DebugJS.html2text(s);
    r = DebugJS.crlf2lf(r);
    r = r.substr(61);
    return r;
  },
  _fmtJson: function(ctx, t, pos) {
    if (pos.open == -1) return '';
    var j = t.substr(pos.open, pos.close - (pos.open - 1));
    var o = {j: j, r: '', e: null};
    try {
      o.r = DebugJS.formatJSON(j);
    } catch (e) {
      o.e = e;
    }
    return o;
  },
  decB64: function(ctx, s) {
    if (!DebugJS.isBase64(s)) return 0;
    if (DebugJS.isB64Bat(s)) {
      var b = DebugJS.decodeB64(s);
      if (b) {
        ctx.openBat(ctx, b);
        return 1;
      } else {
        return 0;
      }
    }
    var tp = DebugJS.Base64.getMimeType(s);
    var mime = (tp.type == '' ? 'text/plain' : tp.type + '/' + tp.subtype);
    if (tp || (s.length > 102400)) {
      ctx.decodeDataURL(ctx, 'data:' + mime + ';base64,' + s);
      return 1;
    }
    ctx._execCmd('base64 -d ' + s, true, false, true);
    ctx.scrollLogBtm(ctx);
    return 1;
  },
  openBat: function(ctx, s) {
    ctx.openFeature(ctx, DebugJS.ST_TOOLS);
    ctx.onBatLoaded(ctx, null, s);
  },
  onFileLoadedAuto: function(ctx, file, ctt) {
    var r;
    if (!file) return;
    if (DebugJS.wBOM(ctt)) ctt = ctt.substr(1);
    if (ctx.dndCmd) {
      r = ctx.execDndCmd(ctx, ctt);
      ctx.closeTools(ctx);
      if (r != undefined) DebugJS.cp2cb(r);
      return;
    }
    if (DebugJS.isBat(ctt) || DebugJS.isB64Bat(ctt)) {
      ctx.onBatLoaded(ctx, file, ctt);
    } else if (file.name.match(/\.js$/)) {
      ctx.onJsLoaded(ctx, file, ctt);
    } else if (file.name.match(/\.json$/)) {
      ctx.closeTools(ctx);
      DebugJS._log('');
      r = DebugJS._cmdJson(DebugJS.delAllNL(ctt), true);
      DebugJS.cp2cb(r);
    }
  },
  _onDropOnFeat: function(ctx, e, fn) {
    ctx.onDrop(e);
    var d = e.dataTransfer.getData('text');
    if (d) {
      fn(ctx, null, d);
    } else {
      ctx.openFeature(ctx, DebugJS.ST_TOOLS, 'file', 'b64');
      ctx.handleDroppedFile(ctx, e, 'b64', fn);
    }
  },
  onDropOnBat: function(e) {
    DebugJS.ctx._onDropOnFeat(DebugJS.ctx, e, DebugJS.ctx.onBatLoaded);
  },
  onBatLoaded: function(ctx, file, ctt) {
    DebugJS.bat.set(ctt);
    ctx.switchToolsFunction(DebugJS.TOOLS_FNC_BAT);
  },
  onDropOnJS: function(e) {
    DebugJS.ctx._onDropOnFeat(DebugJS.ctx, e, DebugJS.ctx.onJsLoaded);
  },
  onJsLoaded: function(ctx, file, cnt) {
    ctx.closeTools(ctx);
    ctx.openFeature(ctx, DebugJS.ST_JS);
    ctx.jsEditor.value = ctx.jsBuf = cnt;
  },
  loadFile: function(file, fmt) {
    var ctx = DebugJS.ctx;
    ctx.fileVwrDataSrcType = 'file';
    ctx.fileVwrFile = file;
    if (!file) return;
    if ((file.size == 0) && (file.type == '')) {
      var html = ctx.getFileInfo(ctx, file);
      ctx.updateFilePreview(html);
      return;
    }
    ctx.fileLoadProg.style.width = '0%';
    ctx.fileLoadProg.textContent = '0%';
    var fr = new FileReader();
    fr.onloadstart = ctx.onFileLoadStart;
    fr.onprogress = ctx.onFileLoadProg;
    fr.onload = ctx.onFileLoaded;
    fr.onabort = ctx.onAbortLoadFile;
    fr.onerror = ctx.onFileLoadError;
    fr.file = file;
    ctx.fileReader = fr;
    if (fmt == 'bin') {
      fr.readAsArrayBuffer(file);
    } else {
      fr.readAsDataURL(file);
    }
  },
  cancelLoadFile: function() {
    if (DebugJS.ctx.fileReader) DebugJS.ctx.fileReader.abort();
  },
  onFileLoadStart: function() {
    DebugJS.addClass(DebugJS.ctx.fileVwrFooter, 'dbg-loading');
    DebugJS.ctx.updateFilePreview('LOADING...');
  },
  onFileLoadProg: function(e) {
    if (e.lengthComputable) {
      var total = e.total;
      var loaded = e.loaded;
      var pct = (total == 0) ? 100 : Math.round((loaded / total) * 100);
      DebugJS.ctx.fileLoadProg.style.width = 'calc(' + pct + '% - ' + (DebugJS.WIN_BORDER * 2) + 'px)';
      DebugJS.ctx.fileLoadProg.textContent = pct + '%';
      DebugJS.ctx.updateFilePreview('LOADING...\n' + DebugJS.formatDec(loaded) + ' / ' + DebugJS.formatDec(total) + ' bytes');
    }
  },
  onFileLoaded: function() {
    var ctx = DebugJS.ctx;
    var file = ctx.fileReader.file;
    var content = '';
    try {
      if (ctx.fileReader.result != null) content = ctx.fileReader.result;
    } catch (e) {
      DebugJS._log.e('onFileLoaded: ' + e);
    }
    if (ctx.fileVwrMode == 'bin') {
      ctx.onFileLoadedBin(ctx, file, content);
    } else {
      ctx.onFileLoadedB64(ctx, file, content);
    }
    setTimeout(ctx.fileLoadFinalize, 1000);
    var isB64 = (ctx.fileVwrMode == 'b64');
    DebugJS.callEvtListeners('fileloaded', file, content, isB64);
    ctx.fileVwrSysCb = null;
    DebugJS.file.finalize();
  },
  onAbortLoadFile: function() {
    DebugJS.ctx.fileVwrSysCb = null;
    DebugJS.file.finalize();
    DebugJS.ctx.updateFilePreview('File read cancelled.');
    setTimeout(DebugJS.ctx.fileLoadFinalize, 1000);
  },
  onFileLoadError: function(e) {
    DebugJS.ctx.fileVwrSysCb = null;
    DebugJS.file.finalize();
    var te = e.target.error;
    var err;
    switch (te.code) {
      case te.NOT_FOUND_ERR:
        err = 'NOT_FOUND_ERR';
        break;
      case te.SECURITY_ERR:
        err = 'SECURITY_ERR';
        break;
      case te.NOT_READABLE_ERR:
        err = 'NOT_READABLE_ERR';
        break;
      case te.ABORT_ERR:
        err = 'ABORT_ERR';
        break;
      default:
        err = 'FILE_READ_ERROR (' + te.code + ')';
    }
    DebugJS.ctx.updateFilePreview(err);
  },
  openViewerB64: function() {
    var ctx = DebugJS.ctx;
    ctx.fileVwrMode = 'b64';
    ctx.filePreviewWrapper.appendChild(ctx.fileVwrDtUrlWrp);
    var dtSrc = ctx.dataSrcType();
    switch (dtSrc) {
      case 'file':
        if (ctx.fileVwrByteArray) {
          ctx.viewBinAsB64(ctx);
        } else {
          ctx.loadFile(ctx.fileVwrFile, 'b64');
        }
        break;
      case 'b64':
        ctx.showB64Preview(ctx, null, ctx.fileVwrDataSrc.scheme, ctx.fileVwrDataSrc.data);
        break;
      case 'bin':
      case 'hex':
        ctx.viewBinAsB64(ctx);
    }
  },
  openViewerBin: function() {
    var ctx = DebugJS.ctx;
    ctx.fileVwrMode = 'bin';
    if (DebugJS.isChild(ctx.filePreviewWrapper, ctx.fileVwrDtUrlWrp)) {
      ctx.filePreviewWrapper.removeChild(ctx.fileVwrDtUrlWrp);
    }
    var dtSrc = ctx.dataSrcType();
    switch (dtSrc) {
      case 'file':
        if (ctx.fileVwrDataSrc) {
          ctx.decodeB64dataAsB(ctx.fileVwrDataSrc.data);
        } else {
          ctx.loadFile(ctx.fileVwrFile, 'bin');
        }
        break;
      case 'b64':
      case 'bin':
      case 'hex':
        ctx.decodeB64dataAsB(ctx.fileVwrDataSrc.data);
        break;
      default:
        ctx.updateFilePreview('');
    }
  },
  decodeFileVwrData: function() {
    var ctx = DebugJS.ctx;
    var mode = ctx.fileVwrDecMode;
    var scheme = ctx.fileVwrDtUrlScheme.value;
    var data = ctx.fileVwrDtTxtArea.value;
    ctx.clearFile();
    if (mode != 'txt') {
      data = DebugJS.delAllNL(DebugJS.delAllSP(data));
    }
    if ((mode == 'b64') && (data.match(/,/))) {
      var w = data.split(',');
      scheme = w[0] + ',';
      data = w[1];
    }
    ctx.fileVwrDataSrc = {scheme: scheme, data: data};
    ctx.setDataUrl(ctx, scheme, data);
    if (ctx.decMode == 'bsb64') {
      ctx.decodeFileVwrDataBSB64(ctx, data, mode, scheme);
    } else {
      ctx.decodeFileVwrDataB64(ctx, data, mode, scheme);
    }
  },
  decodeFileVwrDataB64: function(ctx, src, mode, scheme) {
    var data;
    switch (mode) {
      case 'bin':
        ctx.fileVwrDataSrcType = 'bin';
        data = ctx.decodeBin(ctx, src);
        break;
      case 'hex':
        ctx.fileVwrDataSrcType = 'hex';
        data = ctx.decodeHex(ctx, src);
        break;
      case 'txt':
        data = DebugJS.encodeBase64(src);
        ctx.fileVwrDtTxtArea.value = ctx.fileVwrDataSrc.data = data;
        ctx.fileVwrDataSrcType = 'b64';
        ctx.showB64Preview(ctx, null, scheme, data);
        break;
      default:
        ctx.fileVwrDataSrcType = 'b64';
        data = ctx.showB64Preview(ctx, null, scheme, src);
    }
    return data;
  },
  decodeFileVwrDataBSB64: function(ctx, src, mode, scheme) {
    var r, data;
    var n = ctx.fileVwrBSB64n.value;
    switch (mode) {
      case 'txt':
        var nl = ctx.fileVwrRet.value | 0;
        r = DebugJS.encodeBSB64(src, n);
        r = ctx.fileVwrDtTxtArea.value = DebugJS.retTxtByN(r, nl);
        data = src;
        break;
      default:
        r = DebugJS.decodeBSB64(src, n);
        data = ctx.getTextPreview(r);
        ctx.fileVwrDataSrcType = 'b64';
    }
    ctx.showFilePreview(ctx, null, scheme, data);
    return r;
  },
  decodeBin: function(ctx, bin) {
    ctx.fileVwrByteArray = DebugJS.str2binArr(bin, 8, '0b');
    ctx.viewBinAsB64(ctx);
  },
  decodeHex: function(ctx, hex) {
    ctx.fileVwrByteArray = DebugJS.str2binArr(hex, 2, '0x');
    ctx.viewBinAsB64(ctx);
  },
  decodeB64dataAsB: function(b64) {
    var a = DebugJS.Base64.decode(b64);
    DebugJS.ctx.fileVwrByteArray = a;
    DebugJS.ctx.showBinDump(DebugJS.ctx, a);
  },
  viewBinAsB64: function(ctx) {
    var file = ctx.fileVwrFile;
    var scheme;
    if (file) {
      scheme = 'data:' + file.type + ';base64';
    } else {
      scheme = ctx.fileVwrDataSrc.scheme;
    }
    var lm = ctx.props.prevlimit;
    if (file && (file.size > lm)) {
      ctx.showFileSizeExceeds(ctx, file, lm);
    } else {
      var data = DebugJS.Base64.encode(ctx.fileVwrByteArray);
      ctx.fileVwrDataSrc = {scheme: scheme, data: data};
      ctx.setDataUrl(ctx, scheme, data);
      ctx.showB64Preview(ctx, file, scheme, data);
    }
  },
  onFileLoadedB64: function(ctx, file, dturl) {
    if (file) {
      var LIMIT = ctx.props.prevlimit;
      if (file.size > LIMIT) {
        ctx.showFileSizeExceeds(ctx, file, LIMIT);
        return;
      } else if (file.size == 0) {
        ctx.updateFilePreview(ctx.getFileInfo(ctx, file));
        return;
      }
    }
    var b64cnt = DebugJS.splitDataUrl(dturl);
    ctx.fileVwrDataSrc = b64cnt;
    DebugJS.file.onLoaded(file, dturl);
    ctx.setDataUrl(ctx, b64cnt.scheme, b64cnt.data);
    ctx.showB64Preview(ctx, file, b64cnt.scheme, b64cnt.data);
    var cType = DebugJS.getContentType(null, file, b64cnt.data);
    if (cType == 'text') {
       var decoded = DebugJS.decodeB64(b64cnt.data);
      if (ctx.fileVwrSysCb) {
        ctx.fileVwrSysCb(ctx, file, decoded);
      } else {
        if (ctx.decMode == 'bsb64') {
          ctx.decodeFileVwrData();
        }
      }
    }
  },
  onFileLoadedBin: function(ctx, file, content) {
    var buf = new Uint8Array(content);
    ctx.fileVwrByteArray = buf;
    DebugJS.file.onLoaded(file, buf);
    ctx.showBinDump(ctx, buf);
  },
  switchFileScreen: function() {
    var ctx = DebugJS.ctx;
    if (ctx.fileVwrMode == 'b64') {
      ctx.fileVwrRadioBin.checked = true;
      ctx.openViewerBin();
    } else {
      ctx.fileVwrRadioB64.checked = true;
      ctx.openViewerB64();
    }
  },
  toggleDecMode: function() {
    var ctx = DebugJS.ctx;
    var a = (ctx.decMode == 'bsb64' ? ['b64', 'txt'] : ['b64', 'hex', 'bin', 'txt']);
    var mode = DebugJS.arr.next(a, ctx.fileVwrDecMode);
    ctx.setDecMode(ctx, mode);
  },
  setDecMode: function(ctx, mode) {
    ctx.fileVwrDecMode = mode;
    ctx.fileVwrDecModeBtn.innerText = '[' + mode.toUpperCase() + ']';
  },
  toggleBinMode: function() {
    var ctx = DebugJS.ctx;
    var a = ['hex', 'bin', 'dec'];
    var opt = ctx.fileVwrBinViewOpt;
    opt.mode = DebugJS.arr.next(a, opt.mode);
    ctx.showBinDump(ctx, ctx.fileVwrByteArray);
  },
  toggleShowAddr: function() {
    DebugJS.ctx.toggleBinVwrOpt(DebugJS.ctx, 'addr');
  },
  toggleShowSpace: function() {
    DebugJS.ctx.toggleBinVwrOpt(DebugJS.ctx, 'space');
  },
  toggleShowAscii: function() {
    DebugJS.ctx.toggleBinVwrOpt(DebugJS.ctx, 'ascii');
  },
  toggleBinVwrOpt: function(ctx, key) {
    var opt = ctx.fileVwrBinViewOpt;
    opt[key] = (opt[key] ? false : true);
    var buf = ctx.fileVwrByteArray;
    ctx._showBinDump(ctx, buf, opt);
  },
  showBinDump: function(ctx, buf) {
    var opt = ctx.fileVwrBinViewOpt;
    ctx._showBinDump(ctx, buf, opt);
  },
  _showBinDump: function(ctx, buf, opt) {
    var file = ctx.fileVwrFile;
    var fInfo = ctx.fileVwrFileInfo;
    if (fInfo == null) {
      fInfo = (file ? DebugJS.getFileInfo(file) : '');
      ctx.fileVwrFileInfo = fInfo;
    }
    var bInfo = ctx.fileVwrBinInfo;
    if (bInfo == null) {
      bInfo = DebugJS.getBinInfo(buf);
      ctx.fileVwrBinInfo = bInfo;
    }
    var cttInfo = DebugJS.createCttInfo(fInfo, bInfo);
    var bin = ctx.getBinDump(buf, opt.mode, opt.addr, opt.space, opt.ascii);
    var html = cttInfo + bin;
    ctx.updateFilePreview(html);
  },
  showB64Preview: function(ctx, file, scheme, b64) {
    if (file) {
      var LIMIT = ctx.props.prevlimit;
      if (file.size > LIMIT) {
        ctx.showFileSizeExceeds(ctx, file, LIMIT);
        return;
      } else if (file.size == 0) {
        ctx.updateFilePreview('');
        return;
      }
    }
    var data;
    var cType = DebugJS.getContentType(scheme, file, b64);
    if (cType == 'image') {
      data = ctx.getImgPreview(ctx, scheme, b64);
    } else {
      var decoded = DebugJS.decodeB64(b64);
      data = ctx.getTextPreview(decoded);
    }
    ctx.showFilePreview(ctx, file, scheme, data);
    return data;
  },
  showFilePreview: function(ctx, file, scheme, data) {
    var html = '';
    if (file) html += ctx.getFileInfo(ctx, file);
    html += data;
    ctx.updateFilePreview(html);
  },
  setDataUrl: function(ctx, scheme, data) {
    scheme = scheme.replace(/,$/, '');
    ctx.fileVwrDtUrlScheme.value = scheme + ',';
    var n = ctx.fileVwrRet.value | 0;
    ctx.fileVwrDtTxtArea.value = DebugJS.retTxtByN(data, n);
  },
  getFileInfo: function(ctx, file) {
    var fInfo = ctx.fileVwrFileInfo;
    if (fInfo == null) {
      fInfo = (file ? DebugJS.getFileInfo(file) : '');
      ctx.fileVwrFileInfo = fInfo;
    }
    return DebugJS.createCttInfo(fInfo);
  },
  showFileSizeExceeds: function(ctx, file, lm) {
    var s = ctx.getFileInfo(ctx, file) + '<span style="color:' + ctx.opt.logColorW + '">The file size exceeds the limit allowed. (limit=' + lm + ')</span>';
    ctx.updateFilePreview(s);
  },
  getTextPreview: function(decoded) {
    DebugJS.ctx.fileVwrCtt = decoded;
    DebugJS.ctx.enableFileCopyBtn(DebugJS.ctx, true);
    if (decoded.length == 0) return '';
    var txt = DebugJS.escHtml(decoded);
    txt = txt.replace(/\r\n/g, DebugJS.CHR_CRLF_S + '\n');
    txt = txt.replace(/([^>])\n/g, '$1' + DebugJS.CHR_LF_S + '\n');
    txt = txt.replace(/\r/g, DebugJS.CHR_CR_S + '\n');
    return (txt + DebugJS.EOF + '\n');
  },
  toggleShowHideCC: function() {
    var el = document.getElementsByClassName('dbg-cc');
    for (var i = 0; i < el.length; i++) {
      DebugJS.toggleElShowHide(el[i]);
    }
  },
  getImgPreview: function(ctx, scheme, data) {
    var ctxSizePos = ctx.getSelfSizePos();
    var img = DebugJS.buildDataUrl(scheme, data);
    DebugJS.ctx.fileVwrCtt = img;
    DebugJS.ctx.enableFileCopyBtn(DebugJS.ctx, true);
    return '<img src="' + img + '" id="' + ctx.id + '-img-preview" style="max-width:' + (ctxSizePos.w - 32) + 'px;max-height:' + (ctxSizePos.h - (ctx.computedFontSize * 13) - 8) + 'px">\n';
  },
  resizeImgPreview: function() {
    var ctx = DebugJS.ctx;
    if ((!(ctx.status & DebugJS.ST_TOOLS)) ||
        (!(ctx.toolsActvFnc & DebugJS.TOOLS_FNC_FILE)) ||
        (!(ctx.fileVwrMode == 'b64'))) {
      return;
    }
    var imgPreview = document.getElementById(ctx.id + '-img-preview');
    if (imgPreview == null) return;
    var ctxSizePos = ctx.getSelfSizePos();
    var maxW = (ctxSizePos.w - 32);
    if (maxW < 100) maxW = 100;
    var maxH = (ctxSizePos.h - (ctx.computedFontSize * 13) - 8);
    if (maxH < 100) maxH = 100;
    imgPreview.style.maxWidth = maxW + 'px';
    imgPreview.style.maxHeight = maxH + 'px';
  },
  getBinDump: function(buf, mode, showAddr, showSp, showAscii) {
    if (buf == null) return '';
    var ctx = DebugJS.ctx;
    var lm = ctx.props.hexdumplimit | 0;
    var lastRows = ctx.props.hexdumplastrows | 0;
    var lastLen = 0x10 * lastRows;
    var bLen = buf.length;
    if (lm == 0) lm = bLen;
    var len = ((bLen > lm) ? lm : bLen);
    if (len % 0x10 != 0) {
      len = (((len / 0x10) + 1) | 0) * 0x10;
    }
    var hd = '<span style="background:#0cf;color:#000">';
    if (showAddr) {
      hd += 'Address    ';
    }
    if (mode == 'bin') {
      if (showSp) {
        hd += '+0       +1       +2       +3       +4       +5       +6       +7        +8       +9       +A       +B       +C       +D       +E       +F      ';
      } else {
        hd += '+0      +1      +2      +3      +4      +5      +6      +7      +8      +9      +A      +B      +C      +D      +E      +F      ';
      }
    } else if (mode == 'dec') {
      if (showSp) {
        hd += ' +0  +1  +2  +3  +4  +5  +6  +7   +8  +9  +A  +B  +C  +D  +E  +F';
      } else {
        hd += ' +0 +1 +2 +3 +4 +5 +6 +7 +8 +9 +A +B +C +D +E +F';
      }
    } else {
      if (showSp) {
        hd += '+0 +1 +2 +3 +4 +5 +6 +7  +8 +9 +A +B +C +D +E +F';
      } else {
        hd += '+0+1+2+3+4+5+6+7+8+9+A+B+C+D+E+F';
      }
    }
    if (showAscii) {
      hd += '  ASCII           ';
    }
    hd += '</span>\n';
    var dmp = '';
    if (showAddr || showAscii) {
      dmp += hd;hd = '';
    }
    if (showAddr) {
      dmp += DebugJS.dumpAddr(0);
    }
    for (var i = 0; i < len; i++) {
      dmp += ctx.getDump(mode, i, buf, len, showSp, showAddr, showAscii);
    }
    if (bLen > lm) {
      if (bLen - lm > (0x10 * lastRows)) {
        dmp += '\n<span style="color:#ccc">...</span>';
      }
      if (lastRows > 0) {
        var rem = (bLen % 0x10);
        var start = (rem == 0 ? (bLen - lastLen) : ((bLen - rem) - (0x10 * (lastRows - 1))));
        if (start < len) {
          rem = ((len - start) % 0x10);
          start = len + rem;
        }
        var end = bLen + (rem == 0 ? 0 : (0x10 - rem));
        dmp += '\n';
        if (showAddr) {
          dmp += DebugJS.dumpAddr(start);
        }
        for (i = start; i < end; i++) {
          dmp += ctx.getDump(mode, i, buf, end, showSp, showAddr, showAscii);
        }
      }
    }
    dmp += '\n';
    ctx.fileVwrCtt = DebugJS.html2text(dmp);
    ctx.enableFileCopyBtn(ctx, true);
    var html = '<pre style="white-space:pre !important">';
    html += DebugJS.ui.createBtnHtml('[' + mode.toUpperCase() + ']', 'DebugJS.ctx.toggleBinMode()') + ' ';
    html += DebugJS.ui.createBtnHtml('[ADDR]', 'DebugJS.ctx.toggleShowAddr()', (showAddr ? '' : 'color:' + DebugJS.COLOR_INACT)) + ' ';
    html += DebugJS.ui.createBtnHtml('[SP]', 'DebugJS.ctx.toggleShowSpace()', (showSp ? '' : 'color:' + DebugJS.COLOR_INACT)) + ' ';
    html += DebugJS.ui.createBtnHtml('[ASCII]', 'DebugJS.ctx.toggleShowAscii()', (showAscii ? '' : 'color:' + DebugJS.COLOR_INACT));
    html += '\n' + hd + dmp + '</pre>';
    return html;
  },
  getDump: function(mode, i, buf, len, showSp, showAddr, showAscii) {
    var b;
    if (mode == 'bin') {
      b = DebugJS.dumpBin(i, buf);
    } else if (mode == 'dec') {
      b = DebugJS.dumpDec(i, buf);
    } else {
      b = DebugJS.dumpHex(i, buf);
    }
    if ((i + 1) % 0x10 == 0) {
      if (showAscii) {
        b += '  ' + DebugJS.dumpAscii(((i + 1) - 0x10), buf);
      }
      if ((i + 1) < len) {
        b += '\n';
        if (showAddr) {
          b += DebugJS.dumpAddr(i + 1);
        }
      }
    } else if (showSp) {
      if ((i + 1) % 8 == 0) {
        b += '  ';
      } else {
        b += ' ';
      }
    }
    return b;
  },
  updateFilePreview: function(s) {
    DebugJS.ctx.filePreview.innerHTML = s + '\n';
    DebugJS.ctx.filePreviewWrapper.scrollTop = 0;
  },
  fileLoadFinalize: function() {
    DebugJS.removeClass(DebugJS.ctx.fileVwrFooter, 'dbg-loading');
  },
  copyFileCtt: function() {
    if (!DebugJS.ctx.fileCopyBtn.disabled) {
      DebugJS.copy2clpbd(DebugJS.ctx.fileVwrCtt);
    }
  },
  clearFile: function() {
    var ctx = DebugJS.ctx;
    ctx.fileVwrDataSrcType = null;
    ctx.fileVwrFile = null;
    ctx.fileVwrFileInfo = null;
    ctx.fileVwrBinInfo = null;
    ctx.fileVwrDataSrc = null;
    ctx.fileVwrByteArray = null;
    ctx.fileReader = null;
    ctx.fileVwrCtt = null;
    ctx.enableFileCopyBtn(ctx, false);
    if (ctx.fileVwrPanel) {
      ctx.filePreview.innerText = 'Drop a file here';
      ctx.setDtSchmTxt();
      ctx.fileVwrDtTxtArea.value = '';
    }
  },
  enableFileCopyBtn: function(ctx, f) {
    if (ctx.fileCopyBtn) {
      ctx.fileCopyBtn.disabled = !f;
      DebugJS.setStyle(ctx.fileCopyBtn, 'color', (f ? '' : DebugJS.COLOR_INACT));
    }
  },
  dataSrcType: function() {
    return DebugJS.ctx.fileVwrDataSrcType;
  },
  setDtSchm: function(type) {
    DebugJS.ctx.fileVwrDtUrlScheme.value = 'data:' + type + ';base64,';
  },
  setDtSchmTxt: function() {
    DebugJS.ctx.setDtSchm('text/plain');
  },
  setDtSchmImg: function() {
    DebugJS.ctx.setDtSchm('image/jpeg');
  },
  decodeDataURL: function(ctx, s) {
    ctx.clearFile();
    ctx.openFeature(ctx, DebugJS.ST_TOOLS, 'file', 'b64');
    ctx.openViewerB64();
    var d = DebugJS.splitDataUrl(s);
    ctx.setDataUrl(ctx, d.scheme, d.data);
    ctx.setDecMode(ctx, 'b64');
    ctx.decodeFileVwrData();
  },
  setModeB64: function() {
    var ctx = DebugJS.ctx;
    ctx.decMode = 'b64';
    DebugJS.setStyle(ctx.fileVwrBsbBtn, 'color', DebugJS.COLOR_INACT);
    DebugJS.setStyle(ctx.fileVwrB64Btn, 'color', '');
    DebugJS.setStyle(ctx.fileVwrBSB64nL, 'color', '#888');
    DebugJS.setStyle(ctx.fileVwrBSB64n, 'color', '#888');
    ctx.fileVwrRadioB64.disabled = false;
    ctx.fileVwrRadioBin.disabled = false;
    DebugJS.setStyle(ctx.fileVwrLabelB64, 'color', '#fff');
    DebugJS.setStyle(ctx.fileVwrLabelBin, 'color', '#fff');
  },
  setModeBSB64: function() {
    var ctx = DebugJS.ctx;
    ctx.decMode = 'bsb64';
    DebugJS.setStyle(ctx.fileVwrB64Btn, 'color', DebugJS.COLOR_INACT);
    DebugJS.setStyle(ctx.fileVwrBsbBtn, 'color', '');
    var m = ctx.fileVwrDecMode;
    if ((m == 'hex') || (m == 'bin')) {
      ctx.setDecMode(ctx, 'b64');
    }
    DebugJS.setStyle(ctx.fileVwrBSB64nL, 'color', '#ccc');
    DebugJS.setStyle(ctx.fileVwrBSB64n, 'color', '#ccc');
    ctx.fileVwrRadioB64.disabled = true;
    ctx.fileVwrRadioBin.disabled = true;
    DebugJS.setStyle(ctx.fileVwrLabelB64, 'color', '#888');
    DebugJS.setStyle(ctx.fileVwrLabelBin, 'color', '#888');
  },

  openHtmlEditor: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.htmlPrevBasePanel) {
      ctx.createHtmlPrevBasePanel(ctx);
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.htmlPrevBasePanel);
    }
    ctx.htmlPrevEditor.focus();
  },
  createHtmlPrevBasePanel: function(ctx) {
    ctx.htmlPrevBasePanel = DebugJS.addSubPanel(ctx.toolsBodyPanel);

    var style = {height: '50%'};
    ctx.htmlPrevPrevPanel = DebugJS.ui.addElement(ctx.htmlPrevBasePanel, 'div', style, true);
    ctx.htmlPrevPrevPanel.innerHTML = 'HTML PREVIEWER';

    var html = '<span style="color:#ccc">HTML Editor</span>' +
    DebugJS.ui.createBtnHtml('[DRAW]', 'DebugJS.ctx.drawHtml();DebugJS.ctx.htmlPrevEditor.focus();', 'float:right;margin-right:4px') +
    DebugJS.ui.createBtnHtml('[CLR]', 'DebugJS.ctx.insertHtmlSnippet();', 'margin-left:4px;margin-right:4px');
    for (var i = 0; i < 5; i++) {
      html += ctx.createHtmlSnippetBtn(ctx, i);
    }
    ctx.htmlPrevEditorPanel = DebugJS.ui.addElement(ctx.htmlPrevBasePanel, 'div');
    ctx.htmlPrevEditorPanel.innerHTML = html;

    style = {height: 'calc(50% - ' + (ctx.computedFontSize + 10) + 'px)'};
    ctx.htmlPrevEditor = DebugJS.ui.addElement(ctx.htmlPrevBasePanel, 'textarea', style);
    ctx.htmlPrevEditor.className = 'dbg-editor';
    ctx.htmlPrevEditor.spellcheck = false;
    ctx.htmlPrevEditor.onblur = ctx.saveHtmlBuf;
    ctx.htmlPrevEditor.value = ctx.htmlPrevBuf;
  },
  createHtmlSnippetBtn: function(ctx, i) {
    return DebugJS.ui.createBtnHtml('&lt;CODE' + (i + 1) + '&gt;', 'DebugJS.ctx.insertHtmlSnippet(' + i + ');', 'margin-left:4px');
  },
  insertHtmlSnippet: function(n) {
    var editor = DebugJS.ctx.htmlPrevEditor;
    if (n == undefined) {
      editor.value = '';
      editor.focus();
    } else {
      var code = DebugJS.HTML_SNIPPET[n];
      var buf = editor.value;
      var posCursor = editor.selectionStart;
      var bufL = buf.substr(0, posCursor);
      var bufR = buf.substr(posCursor, buf.length);
      buf = bufL + code + bufR;
      DebugJS.ctx.htmlPrevEditor.focus();
      DebugJS.ctx.htmlPrevEditor.value = buf;
      editor.selectionStart = editor.selectionEnd = posCursor + code.length;
    }
  },
  saveHtmlBuf: function() {
    DebugJS.ctx.htmlPrevBuf = DebugJS.ctx.htmlPrevEditor.value;
  },
  drawHtml: function() {
    DebugJS.ctx.htmlPrevPrevPanel.innerHTML = DebugJS.ctx.htmlPrevBuf;
  },
  closeHtmlEditor: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActvFnc & DebugJS.TOOLS_FNC_HTML) && (ctx.htmlPrevBasePanel)) {
      ctx.removeToolFuncPanel(ctx, ctx.htmlPrevBasePanel);
    }
  },

  openBatEditor: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.batBasePanel) {
      ctx.createBatBasePanel(ctx);
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.batBasePanel);
    }
    ctx.batTextEditor.focus();
  },
  createBatBasePanel: function(ctx) {
    var basePanel = DebugJS.addSubPanel(ctx.toolsBodyPanel);
    ctx.batResumeBtn = DebugJS.ui.addBtn(basePanel, '[RESUME]', null);
    ctx.batResumeBtn.style.float = 'right';
    ctx.batRunBtn = DebugJS.ui.addBtn(basePanel, '[ RUN ]', ctx.startPauseBat);
    ctx.batStopBtn = DebugJS.ui.addBtn(basePanel, '[STOP]', DebugJS.bat.terminate);
    DebugJS.ui.addLabel(basePanel, ' FROM:');
    ctx.batStartTxt = DebugJS.ui.addTextInput(basePanel, '45px', 'left', ctx.opt.fontColor, '', null);
    DebugJS.ui.addLabel(basePanel, ' TO:');
    ctx.batEndTxt = DebugJS.ui.addTextInput(basePanel, '45px', 'left', ctx.opt.fontColor, '', null);
    DebugJS.ui.addLabel(basePanel, ' Arg:');
    ctx.batArgTxt = DebugJS.ui.addTextInput(basePanel, '80px', 'left', ctx.opt.fontColor, '', null);
    DebugJS.ui.addLabel(basePanel, ' L:');
    ctx.batCurPc = DebugJS.ui.addLabel(basePanel, '0');
    DebugJS.ui.addLabel(basePanel, '/').style.color = '#ccc';
    ctx.batTotalLine = DebugJS.ui.addLabel(basePanel, DebugJS.bat.cmds.length);
    DebugJS.ui.addLabel(basePanel, ' N:');
    ctx.batNestLv = DebugJS.ui.addLabel(basePanel, '0');
    var style = {'height': 'calc(100% - ' + (ctx.computedFontSize * 3) + 'px)'};
    ctx.batTextEditor = DebugJS.ui.addElement(basePanel, 'textarea', style);
    ctx.batTextEditor.className = 'dbg-editor';
    ctx.batTextEditor.spellcheck = false;
    var ev = ['input', 'change', 'keydown', 'keyup', 'click'];
    for (var i = 0; i < ev.length; i++) {
      ctx.batTextEditor.addEventListener(ev[i], ctx.onBatInput);
    }
    ctx.enableDnDFileLoad(ctx.batTextEditor, ctx.onDropOnBat);
    ctx.batTxtSt = DebugJS.ui.addLabel(basePanel, '', {color: '#ccc'});
    ctx.batBasePanel = basePanel;
    ctx.setBatTxt(ctx);
    ctx.setBatArgTxt(ctx);
    ctx.updateCurPc();
    ctx.updateBatNestLv();
    ctx.updateBatRunBtn();
    ctx.updateBatResumeBtn();
    ctx.onBatInput();
  },
  startPauseBat: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_BAT_RUNNING) {
      if (ctx.status & DebugJS.ST_BAT_PAUSE) {
        DebugJS.bat._resume();
      } else {
        DebugJS.bat.pause();
      }
    } else {
      ctx.runBat(ctx);
    }
  },
  runBat: function(ctx) {
    var bat = DebugJS.bat;
    bat.store(ctx.batTextEditor.value);
    var a = ctx.batArgTxt.value;
    try {
      bat.setExecArg(eval(a));
    } catch (e) {
      DebugJS._log.e('BAT ARG ERROR (' + e + ')');return;
    }
    var s = ctx.batStartTxt.value;
    var e = ctx.batEndTxt.value;
    if (s == '') s = undefined;
    if (e == '') e = undefined;
    bat.run(s, e);
  },
  updateBatRunBtn: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.batRunBtn) return;
    var label = ' RUN ';
    var color = '#0f0';
    if (ctx.status & DebugJS.ST_BAT_RUNNING) {
      if (!(ctx.status & DebugJS.ST_BAT_PAUSE)) {
        label = 'PAUSE';
        color = '#ff0';
      }
      DebugJS.setStyle(ctx.batStopBtn, 'color', '#f66');
    } else {
      DebugJS.setStyle(ctx.batStopBtn, 'color', '#a99');
    }
    ctx.batRunBtn.innerText = '[' + label + ']';
    DebugJS.setStyle(ctx.batRunBtn, 'color', color);
  },
  updateBatResumeBtn: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.batResumeBtn) return;
    var color = DebugJS.COLOR_INACT;
    var fn = null;
    if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD_KEY) {
      color = ctx.opt.btnColor;
      fn = ctx.batResume;
    } else if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD) {
      color = ctx.opt.btnColor;
    }
    DebugJS.setStyle(ctx.batResumeBtn, 'color', color);
    ctx.batResumeBtn.onclick = fn;
  },
  batResume: function() {
    DebugJS.bat._resume('cmd-key');
  },
  setBatTxt: function(ctx) {
    var b = '';
    var cmds = DebugJS.bat.cmds;
    for (var i = 0; i < cmds.length; i++) {
      b += cmds[i] + '\n';
    }
    if (ctx.batTextEditor) {
      ctx.batTextEditor.value = b;
      ctx.onBatInput();
    }
  },
  setBatArgTxt: function(ctx) {
    if (ctx.batArgTxt) {
      var a = DebugJS.bat.ctrl.execArg;
      if ((typeof a == 'string') && (a != '')) {a = '"' + a + '"';}
      ctx.batArgTxt.value = a + '';
    }
  },
  updateCurPc: function(b) {
    var pc = DebugJS.bat.ctrl.pc;
    var df = DebugJS.digits(DebugJS.bat.cmds.length) - DebugJS.digits(pc);
    var pdng = '';
    for (var i = 0; i < df; i++) {
      pdng += '0';
    }
    if (DebugJS.ctx.batCurPc) {
      DebugJS.ctx.batCurPc.innerText = pdng + pc;
      DebugJS.ctx.batCurPc.style.color = (b ? '#f66' : '');
    }
  },
  updateTotalLine: function() {
    if (DebugJS.ctx.batTotalLine) {
      DebugJS.ctx.batTotalLine.innerText = DebugJS.bat.cmds.length;
    }
  },
  updateBatNestLv: function() {
    if (DebugJS.ctx.batNestLv) {
      DebugJS.ctx.batNestLv.innerText = DebugJS.bat.nestLv();
    }
  },
  closeBatEditor: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActvFnc & DebugJS.TOOLS_FNC_BAT) && (ctx.batBasePanel)) {
      ctx.removeToolFuncPanel(ctx, ctx.batBasePanel);
    }
  },
  onBatInput: function() {
    if (!DebugJS.ctx.batTxtSt) return;
    var edt = DebugJS.ctx.batTextEditor;
    var txt = edt.value;
    var len = txt.length;
    var lenB = DebugJS.lenB(txt);
    var lfCnt = (txt.match(/\n/g) || []).length;
    var lenWoLf = len - lfCnt;
    var st = edt.selectionStart;
    var ed = edt.selectionEnd;
    var sl = ed - st;
    var ch = txt.substr(st, 1);
    var cd = DebugJS.getCodePoint(ch);
    var cd16 = DebugJS.getUnicodePoints(ch, true);
    var cp = '';
    if (cd) cp = (cd == 10 ? 'LF' : ch) + ':' + cd16 + '(' + cd + ')';
    var slct = (sl ? 'Selected=' + sl : '');
    DebugJS.ctx.batTxtSt.innerHTML = 'LEN=' + lenWoLf + ' (w/RET=' + len + ') ' + lenB + ' bytes ' + cp + ' ' + slct;
  },

  toggleExtPanel: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_EXT_PANEL) {
      ctx.closeExtPanel(ctx);
    } else {
      ctx.openExtPanel(ctx);
    }
  },

  openExtPanel: function(ctx) {
    ctx.status |= DebugJS.ST_EXT_PANEL;
    ctx.featStack.push(DebugJS.ST_EXT_PANEL);
    ctx.addOverlayPanelFull(ctx.extPanel);
    var actIdx = ctx.extActPnlIdx;
    if (actIdx == -1) {
      actIdx = ctx.nextVisibleExtPanelIdx(ctx, actIdx);
      ctx.switchExtPanel(actIdx);
    } else {
      var p = ctx.extPanels[actIdx];
      ctx.onExtPanelActive(ctx, p);
    }
    ctx.updateExtBtns(ctx);
    ctx.updateExtBtn(ctx);
  },

  createExtHdrBtn: function(ctx, label, idx) {
    var MAX_LEN = 20;
    label = DebugJS.trimDownText(label, MAX_LEN);
    var fn = new Function('DebugJS.ctx.switchExtPanel(' + idx + ');');
    var btn = DebugJS.ui.addBtn(ctx.extHdrPanel, '<' + label + '>', fn);
    btn.style.marginRight = '4px';
    DebugJS.setStyle(btn, 'color', DebugJS.SBPNL_COLOR_INACT);
    btn.onmouseover = new Function('DebugJS.setStyle(DebugJS.ctx.extPanels[' + idx + '].btn, \'color\', DebugJS.SBPNL_COLOR_ACTIVE);');
    btn.onmouseout = new Function('DebugJS.setStyle(DebugJS.ctx.extPanels[' + idx + '].btn, \'color\', (DebugJS.ctx.extActPnlIdx == ' + idx + ') ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACT);');
    return btn;
  },

  closeExtPanel: function(ctx) {
    if ((ctx.extPanel) && (ctx.extPanel.parentNode)) {
      var p = ctx.extPanels[ctx.extActPnlIdx];
      ctx.onExtPanelInActive(ctx, p);
      ctx.removeOverlayPanelFull(ctx.extPanel);
    }
    ctx.status &= ~DebugJS.ST_EXT_PANEL;
    DebugJS.arr.del(ctx.featStack, DebugJS.ST_EXT_PANEL);
    ctx.updateExtBtn(ctx);
  },

  switchExtPanel: function(idx) {
    var ctx = DebugJS.ctx;
    if (ctx.extActPnlIdx == idx) return;
    if (ctx.extActPnlIdx != -1) {
      var p2 = ctx.extPanels[ctx.extActPnlIdx];
      if (p2) {
        if (ctx.status & DebugJS.ST_EXT_PANEL) {
          ctx.onExtPanelInActive(ctx, p2);
        }
        ctx.extBodyPanel.removeChild(p2.base);
      }
    }
    var p1 = ctx.extPanels[idx];
    if (p1) {
      ctx.extBodyPanel.appendChild(p1.base);
      if (ctx.status & DebugJS.ST_EXT_PANEL) {
        ctx.onExtPanelActive(ctx, p1);
      }
    }
    ctx.extActPnlIdx = idx;
    ctx.updateExtBtns(ctx);
  },

  onExtPanelActive: function(ctx, p) {
    ctx.extActivePanel = p.panel;
    if (p.onActive) p.onActive(p.panel);
  },

  onExtPanelInActive: function(ctx, p) {
    ctx.extActivePanel = null;
    if (p && p.onInActive) p.onInActive(p.panel);
  },

  prevVisibleExtPanelIdx: function(ctx, idx) {
    var a = DebugJS.ctx.extPanels;
    if (idx > 0) {
      for (var i = idx - 1; i >= 0; i--) {
        if ((a[i] != null) && !a[i].hidden) return i;
      }
    }
    return -1;
  },

  nextVisibleExtPanelIdx: function(ctx, idx) {
    var a = DebugJS.ctx.extPanels;
    for (var i = idx + 1; i < a.length; i++) {
      if ((a[i] != null) && !a[i].hidden) return i;
    }
    return -1;
  },

  updateExtBtns: function(ctx) {
    var pnls = ctx.extPanels;
    for (var i = 0; i < pnls.length; i++) {
      var p = pnls[i];
      if (p != null) {
        DebugJS.setStyle(p.btn, 'color', (ctx.extActPnlIdx == i) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACT);
      }
    }
  },

  createSubBasePanel: function(ctx) {
    var base = document.createElement('div');
    base.className = 'dbg-overlay-panel-full';

    var head = document.createElement('div');
    head.style.position = 'relative';
    head.style.height = ctx.computedFontSize + 'px';
    base.appendChild(head);

    var body = document.createElement('div');
    body.style.position = 'relative';
    body.style.height = 'calc(100% - ' + ctx.computedFontSize + 'px)';
    base.appendChild(body);

    return {base: base, head: head, body: body};
  },

  isOnDbgWin: function(x, y) {
    var sp = DebugJS.ctx.getSelfSizePos();
    return (((x >= sp.x1) && (x <= sp.x2)) && ((y >= sp.y1) && (y <= sp.y2)));
  },

  getSelfSizePos: function() {
    var ctx = DebugJS.ctx;
    var rect = ctx.win.getBoundingClientRect();
    var resizeBoxSize = 6;
    var sp = {};
    sp.w = ctx.win.clientWidth;
    sp.h = ctx.win.clientHeight;
    sp.x1 = rect.left - resizeBoxSize / 2;
    sp.y1 = rect.top - resizeBoxSize / 2;
    sp.x2 = sp.x1 + ctx.win.clientWidth + resizeBoxSize + DebugJS.WIN_BORDER;
    sp.y2 = sp.y1 + ctx.win.clientHeight + resizeBoxSize + DebugJS.WIN_BORDER;
    return sp;
  },

  setSelfSizeW: function(ctx, w) {
    ctx.win.style.width = w + 'px';
    ctx.adjLayout();
  },

  setSelfSizeH: function(ctx, h) {
    ctx.win.style.height = h + 'px';
    ctx.adjLayout();
  },

  expandHight: function(ctx, height) {
    if (!(ctx.uiStatus & DebugJS.UI_ST_DYNAMIC)) return;
    ctx.saveExpandModeOrgSizeAndPos(ctx);
    var clH = document.documentElement.clientHeight;
    var sp = ctx.getSelfSizePos();
    if (sp.h >= height) {
      return;
    } else if (clH <= height) {
      height = clH;
    }
    ctx.setSelfSizeH(ctx, height);
    sp = ctx.getSelfSizePos();
    if (ctx.uiStatus & DebugJS.UI_ST_POS_AUTO_ADJ) {
      ctx.adjustDbgWinPos(ctx);
    } else {
      if (sp.y2 > clH) {
        if (clH < (height + ctx.opt.adjY)) {
          ctx.win.style.top = 0;
        } else {
          var top = clH - height - ctx.opt.adjY;
          ctx.win.style.top = top + 'px';
        }
      }
    }
  },

  expandHightIfNeeded: function(ctx) {
    if (ctx.winExpandCnt == 0) ctx.expandHight(ctx, ctx.winExpandHeight);
    ctx.winExpandCnt++;
  },

  resetExpandedHeight: function(ctx) {
    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      ctx.win.style.width = ctx.expandModeOrg.w + 'px';
      ctx.win.style.height = ctx.expandModeOrg.h + 'px';
      ctx.adjLayout();
      ctx.scrollLogBtm(ctx);
      if (ctx.uiStatus & DebugJS.UI_ST_POS_AUTO_ADJ) {
        ctx.adjustDbgWinPos(ctx);
      }
    }
  },

  resetExpandedHeightIfNeeded: function(ctx) {
    ctx.winExpandCnt--;
    if (ctx.winExpandCnt == 0) ctx.resetExpandedHeight(ctx);
  },

  saveExpandModeOrgSizeAndPos: function(ctx) {
    var shadow = (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) ? (DebugJS.WIN_SHADOW / 2) : 0;
    var o = ctx.expandModeOrg;
    var w = ctx.win;
    o.w = (w.offsetWidth + DebugJS.WIN_BORDER - shadow);
    o.h = (w.offsetHeight + DebugJS.WIN_BORDER - shadow);
    o.t = w.offsetTop;
    o.l = w.offsetLeft;
  },

  turnLed: function(pos, actv) {
    var b = DebugJS.LED_BIT[pos];
    if (actv) {
      DebugJS.ctx.led |= b;
    } else {
      DebugJS.ctx.led &= ~b;
    }
    DebugJS.ctx.updateLedPanel();
  },

  setLed: function(v) {
    try {
      DebugJS.ctx.led = eval(v);
      DebugJS.ctx.updateLedPanel();
    } catch (e) {
      DebugJS._log.e('Invalid value');
    }
  },

  setMsg: function(m) {
    DebugJS.ctx.msgStr = m;
    DebugJS.ctx.updateMsgLabel();
  },

  execCmd: function(ctx) {
    var cl = ctx.cmdLine.value;
    ctx.cmdLine.value = '';
    if (cl == '') {
      if (DebugJS.callListeners(ctx.cmdListeners, cl)) {
        DebugJS._log('');
      }
      return;
    }
    if (cl.substr(0, 2) == '!!') {
      var ev = ctx.getLastHistory();
      if (ev == '') {
        DebugJS._log.w('!!: event not found');
        return;
      }
      cl = ev + cl.substr(2);
    } else if (cl.substr(0, 1) == '!') {
      var s = cl.substr(1).match(/(\d*)(.*)/);
      var num = s[1];
      var arg = s[2];
      if (num != '') {
        ev = ctx.getHistory((num | 0) - 1);
        if (ev == '') {
          DebugJS._log.w('!' + num + ': event not found');
          return;
        }
        cl = ev + arg;
      } else if (arg != '') {
        cl = '!' + arg;
      }
    }
    ctx._execCmd(cl, ctx.cmdEchoFlg, false, true);
  },
  _execCmd: function(str, echo, recho, sv) {
    var ctx = DebugJS.ctx;
    var plain = (!ctx.cmdLine || (ctx.cmdLine.type == 'text'));
    if (sv && plain && !(ctx.status & DebugJS.ST_NO_HIST)) ctx.saveHistory(ctx, str);
    var setValName = null;
    var cl = str;
    if (str.match(/^\s*@/)) {
      echo = false;
      cl = str.substr(str.indexOf('@') + 1);
    }
    if (cl.match(/^\s*#/)) {
      DebugJS._log(cl.substr(cl.indexOf('#') + 1));
      return;
    }
    if (echo && plain) {
      var echoStr = str;
      echoStr = DebugJS.escHtml(echoStr);
      echoStr = DebugJS.trimEchoStr(echoStr);
      DebugJS._log.s(echoStr);
    }
    if (!DebugJS.callListeners(ctx.cmdListeners, str)) return;
    var cmds = DebugJS.splitCmdLineInTwo(cl);
    var cmd = cmds[0];
    var valName = DebugJS.getCmdValName(cmd, '\\$', true);
    if (valName != null) {
      var vStartPos = cl.indexOf(valName);
      var restCmd = cl.substr(vStartPos + valName.length + 1);
      if (restCmd.match(/^\s*=/)) {
        setValName = valName;
        cl = restCmd.substr(restCmd.indexOf('=') + 1);
      }
    }
    var ret;
    echo = echo || recho;
    cmds = DebugJS.splitCmdLineInTwo(cl);
    if (cmds[0] == 'code') {
      ret = ctx.execCode(cmds[1], echo);
    } else {
      cl = DebugJS.replaceCmdVals(cl);
      ret = ctx.__execCmd(ctx, cl, echo);
    }
    if (setValName != null) {
      DebugJS.setCmdVal(setValName, ret);
    }
    DebugJS.cp2cb(ret);
    return ret;
  },
  __execCmd: function(ctx, cmdline, echo, aliased) {
    cmdline = DebugJS.escCtrlCh(cmdline);
    var cmds = DebugJS.splitCmdLineInTwo(cmdline);
    var cmd = cmds[0];
    var arg = cmds[1];
    if (!aliased) {
      for (var key in ctx.CMD_ALIAS) {
        if (cmd == key) {
          var cl = cmdline.replace(new RegExp(cmd), ctx.CMD_ALIAS[key]);
          return ctx.__execCmd(ctx, cl, echo, true);
        }
      }
    }

    for (var i = 0; i < ctx.CMD_TBL.length; i++) {
      if (cmd == ctx.CMD_TBL[i].cmd) {
        return ctx.CMD_TBL[i].fn(arg, ctx.CMD_TBL[i], echo);
      }
    }

    if (ctx.opt.disableAllCommands) return;

    for (i = 0; i < ctx.EXT_CMD_TBL.length; i++) {
      var extcmd = ctx.EXT_CMD_TBL[i];
      if (cmd == extcmd.cmd) {
        if (extcmd.fn) {
          return extcmd.fn(arg, extcmd, echo);
        } else {
          DebugJS._log.e('Function not found: ' + extcmd.cmd);
          return;
        }
      }
    }

    if (cmdline.match(/^\s*http/)) {
      return DebugJS.ctx.doHttpRequest('GET', cmdline, echo);
    }

    var ret = ctx.cmdRadixConv(cmdline, echo);
    if (ret) return cmd | 0;

    ret = ctx.cmdTimeCalc(cmdline, echo);
    if (ret != null) return ret;

    ret = ctx.cmdDateCalc(cmdline, echo);
    if (ret != null) return ret;

    ret = ctx.cmdDateDiff(cmdline, echo);
    if (!isNaN(ret)) return ret;

    ret = ctx.cmdDateConv(cmdline, echo);
    if (ret != null) return ret;

    var cmdln = cmdline.trim();
    if (DebugJS.isUnixTm(cmdln)) {
      return ctx.cmdDate(cmdline, null, echo);
    }

    if (DebugJS.isSTN(cmdln)) {
      return DebugJS.cmdTZedNow(cmdln, echo);
    }

    if (cmdline.match(/^\s*U\+/i)) {
      return ctx.cmdUnicode('-d ' + cmdline, null, echo);
    }

    return ctx.execCode(cmdline, echo);
  },

  cmdArr2Set: function(arg, tbl, echo) {
    var p = arg.indexOf('[');
    if (p == -1) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var s = DebugJS.hasOpt(arg, 's');
    var j = DebugJS.hasOpt(arg, 'j');
    var sort = DebugJS.hasOpt(arg, 'sort');
    var v = arg.substr(p);
    try {
      var a = eval(v);
      var r = DebugJS.arr.toSet(a, s);
      if (sort) r.sort();
      if (echo) DebugJS._log.p(r, 0, '', j);
    } catch (e) {
      DebugJS._log.e(e);
    }
    return r;
  },

  cmdAlias: function(arg) {
    var ctx = DebugJS.ctx;
    if (DebugJS.countArgs(arg) == 0) {
      var lst = DebugJS.getKeys(ctx.CMD_ALIAS);
      return ctx._cmdAliasList(ctx, lst);
    }
    var p = arg.indexOf('=');
    if (p == -1) {
      return ctx._cmdAliasList(ctx, DebugJS.splitCmdLine(arg));
    }
    var al = arg.substr(0, p).trim();
    var v = arg.substring(p + 1, arg.length).trim();
    var c = DebugJS.getQuotedStr(v);
    if (c == null) {
      c = DebugJS.splitArgs(v)[0];
    }
    ctx.CMD_ALIAS[al] = c;
  },
  _cmdAliasList: function(ctx, lst) {
    var s = '';
    for (var i = 0; i < lst.length; i++) {
      if (i > 0) s += '\n';
      s += ctx._cmdAliasDisp(ctx, lst[i]);
    }
    DebugJS._log.mlt(s);
  },
  _cmdAliasDisp: function(ctx, al) {
    var s = 'alias ' + al;
    var c = ctx.CMD_ALIAS[al];
    if (c == undefined) {
      s += ': not found';
    } else {
      s += "='" + c + "'";
    }
    return s;
  },

  cmdBase64: function(arg, tbl, echo) {
    var iIdx = 0;
    if (DebugJS.hasOpt(arg, 'd') || DebugJS.hasOpt(arg, 'e')) iIdx++;
    return DebugJS.ctx.execEncAndDec(arg, tbl, echo, true, DebugJS.encodeB64, DebugJS.decodeB64, iIdx);
  },

  cmdBat: function(arg, tbl, echo) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    var bat = DebugJS.bat;
    var ret, s, ag;
    switch (a[0]) {
      case 'run':
        if ((ctx.status & DebugJS.ST_BAT_RUNNING) && (ctx.status & DebugJS.ST_BAT_PAUSE)) {
          bat._resume();
        } else {
          if (ctx.batTextEditor) bat.store(ctx.batTextEditor.value);
          s = DebugJS.getOptVal(arg, 's');
          var e = DebugJS.getOptVal(arg, 'e');
          ag = DebugJS.getOptVal(arg, 'arg');
          if ((s == null) && (e == null) && (a[1] != '-arg')) {
            s = a[1];
            if ((s != undefined) && (!isNaN(s))) {
              return bat.exec1(s);
            }
          }
          if (ag == null) ag = undefined;
          bat.run(s, e, ag);
        }
        break;
      case 'symbols':
        var t = a[1];
        if ((t != 'label') && (t != 'function')) {
          DebugJS.printUsage('bat symbols label|function "pattern"');
          return;
        }
        var p = DebugJS.getArgsFrom(arg, 2);
        try {
          p = eval(p);
        } catch (e) {
          DebugJS._log.e('bat symbols: ' + e);return;
        }
        ret = bat.getSymbols(t, p);
        if (echo) DebugJS._log.p(ret);
        return ret;
      case 'list':
        if (bat.cmds.length == 0) {
          DebugJS._log('No batch script');
          break;
        }
        s = bat.list(a[1], a[2]);
        DebugJS._log.mlt(s);
        break;
      case 'status':
        var key = a[1];
        if (key == undefined) {
          var st = '\n';
          if (bat.cmds.length == 0) {
            st += 'No batch script';
          } else {
            st += DebugJS.bat.status();
            st += '\nNest Lv: ' + bat.nestLv();
          }
          DebugJS._log.p(bat.ctrl, 0, st, false);
        } else {
          ret = bat.ctrl[key];
          DebugJS._log(ret);
        }
        return ret;
      case 'pc':
        DebugJS._log.res(bat.ctrl.pc);
        return bat.ctrl.pc;
      case 'pause':
      case 'clear':
        bat[a[0]]();
        break;
      case 'set':
        ctx._cmdBatSet(DebugJS.getArgsFrom(arg, 1), echo);
        break;
      case 'stop':
        bat.terminate();
        break;
      case 'exec':
        if (a[1] != undefined) {
          var b = DebugJS.decodeB64(a[1], true);
          if (b != '') {
            ag = DebugJS.getArgsFrom(arg, 2);
            try {
              bat(b, eval(ag));
            } catch (e) {
              DebugJS._log.e('BAT ERROR: Illegal argument (' + e + ')');
            }
          } else {
            DebugJS._log.e('BAT ERROR: script must be encoded in Base64.');
          }
          break;
        }
      default:
        DebugJS.printUsage(tbl.help);
    }
  },
  _cmdBatSet: function(arg, echo) {
    var a = DebugJS.splitCmdLine(arg);
    var k = a[0];
    var v = a[1];
    if (!v) {DebugJS.printUsage('bat set break|delay val'); return;}
    switch (k) {
      case 'b':
      case 'break':
        DebugJS.bat.ctrl.breakP = v;
        break;
      case 'delay':
        if (DebugJS.isTmStr(v)) v = DebugJS.str2ms(v);
        DebugJS.bat.ctrl[k] = v;
        break;
      case 'pc':
        DebugJS.bat.setPc(v);
        break;
      default:
        DebugJS.printUsage('bat set b|break|delay|pc val');
        return;
    }
    if (echo) DebugJS._log.res(v);
  },

  cmdBSB64: function(arg, tbl, echo) {
    var iIdx = 0;
    if (DebugJS.hasOpt(arg, 'd') || DebugJS.hasOpt(arg, 'e')) iIdx++;
    var n = DebugJS.getOptVal(arg, 'n');
    if (n == null) {
       n = 1;
    } else {
      iIdx += 2;
    }
    return DebugJS.ctx.execEncAndDec(arg, tbl, echo, true, DebugJS.encodeBSB64, DebugJS.decodeBSB64, iIdx, n | 0);
  },

  cmdCall: function(arg) {
    if (DebugJS.bat.isCmdExecutable()) {
      DebugJS.ctx._cmdJump(DebugJS.ctx, arg, true, 'func');
    }
  },

  cmdChar: function(arg, tbl, echo) {
    if ((arg.length > 2) && arg.substr(1, 1).match(/　/)) {
      arg = arg.substr(0, 1) + ' ' + arg.substr(2);
    }
    var a = DebugJS.splitArgs(arg);
    var c1 = a[0];
    var c2 = a[1];
    if (!c1) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var s = DebugJS.str(c1, c2);
    if (echo) DebugJS._log(DebugJS.quoteStrIfNeeded(s));
    return s;
  },

  cmdClose: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var fn = DebugJS.splitArgs(arg)[0];
    if (fn == 'all') {
      ctx.closeAllFeatures(ctx);
      return;
    }
    var d = {
      'measure': DebugJS.ST_MEASURE,
      'sys': DebugJS.ST_SYS_INFO,
      'html': DebugJS.ST_HTML_SRC,
      'dom': DebugJS.ST_ELM_INFO,
      'js': DebugJS.ST_JS,
      'tool': DebugJS.ST_TOOLS,
      'ext': DebugJS.ST_EXT_PANEL
    };
    if (d[fn]) {
      ctx.closeFeature(ctx, d[fn]);
    } else {
      DebugJS.printUsage(tbl.help);
    }
  },

  cmdClock: function(arg) {
    var ctx = DebugJS.ctx;
    if (DebugJS.hasOpt(arg, 'full')) {
      ctx.status |= DebugJS.ST_CLOCK_FULL;
      ctx.kiosk(ctx, 2);
      ctx.clearLog();
    }
    ctx.launchFnc(ctx, 'tool', 'timer', 'clock');
    ctx.timerClockSSS = DebugJS.hasOpt(arg, 'sss');
    ctx.updateSSS(ctx);
  },
  _cmdClockQ: function(ctx) {
    ctx.closeTools(ctx);
    ctx.kioskQ(ctx);
    ctx.status &= ~DebugJS.ST_CLOCK_FULL;
  },

  cmdCls: function() {
    DebugJS.ctx.clearLog();
  },

  cmdCondWait: function(arg, tbl) {
    var bat = DebugJS.bat;
    var op = DebugJS.splitCmdLine(arg)[0];
    switch (op) {
      case 'init':
        bat._initCond();
        break;
      case 'set':
        var key = DebugJS.getOptVal(arg, 'key');
        bat.ctrl.condKey = (key ? DebugJS.delAllSP(key) : key);
        break;
      case 'pause':
        if (bat.ctrl.condKey) {
          var to = DebugJS.getOptVal(arg, 'timeout');
          var q = DebugJS.hasOpt(arg, 'q');
          DebugJS.ctx._cmdPause('key', bat.ctrl.condKey, to, q);
        }
        break;
      default:
        DebugJS.printUsage(tbl.help);
    }
  },

  cmdCookie: function(arg, tbl, echo) {
    var cookie = DebugJS.cookie;
    var a = DebugJS.splitCmdLine(arg);
    var op = a[0];
    try {
      var k = eval(a[1]);
      var v = eval(a[2]);
    } catch (e) {
      DebugJS._log.e(e);return;
    }
    var r;
    switch (op) {
      case 'keys':
        r = cookie.getKeys();
        if (echo) DebugJS._log.p(r);
        return r;
      case 'get':
        if (DebugJS.hasOpt(arg, 'a')) {
          r = cookie.getAll();
          if (echo) DebugJS._log.res(document.cookie);
        } else {
          r = cookie.get(k);
          if (r == undefined) {
            DebugJS._log('No such key');
          } else {
            if (echo) DebugJS._log.res(r);
          }
        }
        return r;
      case 'set':
        cookie.set(k, v);
        if (echo) DebugJS._log.res(k + '=' + v);
        return;
      case 'delete':
        if (DebugJS.hasOpt(arg, 'a')) {
          DebugJS.cookie.deleteAll();
        } else {
          cookie.delete(k);
        }
        if (echo) DebugJS._log.res('Deleted');
        return;
    }
    DebugJS.printUsage(tbl.help);
  },

  cmdCopy: function(arg, tbl) {
    if (arg == '') {
      DebugJS.printUsage(tbl.help);
      return;
    }
    try {
      var s = eval(arg) + '';
      DebugJS.copy2clpbd(s);
    } catch (e) {
      DebugJS._log.e(e);
    }
  },

  cmdDate: function(arg, tbl) {
    var val = arg;
    var iso = false;
    var idx = DebugJS.indexOfOptVal(arg, '-iso');
    if (idx >= 0) {
      iso = true;
      val = arg.substr(idx);
    }
    var d = DebugJS.date(val, iso);
    if (d == null) {
      DebugJS.printUsage(tbl.help);
    } else {
      if (!DebugJS.hasOpt(arg, 'q')) DebugJS._log.res(d);
    }
    return d;
  },
  cmdDateConv: function(arg, echo) {
    var d = arg.trim();
    var v = d;
    var tz = d.match(/ [+-]\d{1,4}$/);
    if (tz) {
      var idx = d.indexOf(tz);
      d = d.substr(0, idx);
      tz = tz[0].trim();
    } else {
      tz = DebugJS.getLocalTimeOffsetStr();
    }
    if (!(DebugJS.isDateFormat(d) || DebugJS.isDateTimeFormat(d) || DebugJS.isDateTimeFormatIso(d) || (d == 'today'))) {
      return null;
    }
    if (d == 'today') v = DebugJS.today('/');
    var r = DebugJS.date(v);
    if (r != null) {
      if (echo) DebugJS._log.res(r);
    }
    return r;
  },
  cmdDateCalc: function(arg, echo) {
    var ret = null;
    arg = arg.trim();
    if (!DebugJS.isBasicDateFormat(arg, true) && !DebugJS.isDateFormat(arg, true) && !DebugJS.startsWith(arg, 'today')) {
      return ret;
    }
    arg = DebugJS.delAllSP(arg);
    var sp = arg.charAt(4);
    if ((sp != '-') && (sp != '/')) sp = '-';
    arg = arg.replace(/(\d{4})-(\d{1,})-(\d{1,})/g, '$1/$2/$3');
    var op;
    if (arg.indexOf('+') >= 0) {
      op = '+';
    } else if (arg.indexOf('-') >= 0) {
      op = '-';
    }
    var v = arg.split(op);
    if (v.length < 2) return ret;
    var d1 = DebugJS.ctx._cmdFmtDate(v[0]);
    if (!DebugJS.isDateFormat(d1)) return ret;
    var d2 = v[1];
    var t1 = DebugJS.getDateTime(d1).time;
    var t2 = (d2 | 0) * 86400000;
    var t;
    if (op == '-') {
      t = t1 - t2;
    } else {
      t = t1 + t2;
    }
    var d = DebugJS.getDateTime(t);
    if (isNaN(d.time)) return ret;
    ret = DebugJS.getDateStr(d, sp);
    if (echo) DebugJS._log.res(ret);
    return ret;
  },
  cmdDateDiff: function(arg, echo) {
    var ret = NaN;
    var a = DebugJS.splitArgs(arg);
    if (a.length < 2) return ret;
    var d1 = DebugJS.ctx._cmdFmtDate(a[0]);
    var d2 = DebugJS.ctx._cmdFmtDate(a[1]);
    if (!DebugJS.isDateFormat(d1) || !DebugJS.isDateFormat(d2)) return ret;
    d1 = d1.replace(/-/g, '/');
    d2 = d2.replace(/-/g, '/');
    ret = DebugJS.diffDate(d1, d2);
    if (echo && !isNaN(ret)) DebugJS._log.res(ret);
    return ret;
  },
  _cmdFmtDate: function(d) {
    if ((d.length == 8) && !isNaN(d)) {
      d = DebugJS.num2date(d);
    } else if (d == 'today') {
      d = DebugJS.today('/');
    }
    return d;
  },

  cmdDbgWin: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    switch (a[0]) {
      case 'hide':
        ctx.closeDbgWin();
        break;
      case 'show':
        ctx.showDbgWin();
        break;
      case 'opacity':
        var v = a[1];
        if ((v <= 1) && (v >= 0.1)) {
          DebugJS.opacity(v);
        } else {
          DebugJS.printUsage('dbgwin opacity 0.1-1');
        }
        break;
      case 'pos':
        ctx._cmdDbgWinPos(ctx, a[1], a[2]);
        break;
      case 'size':
        ctx._cmdDbgWinSize(ctx, a[1], a[2]);
        break;
      case 'status':
        ctx._cmdDbgWinStatus(ctx);
        break;
      case 'lock':
        ctx._cmdDbgWinLock(ctx, a[1]);
        break;
      default:
        DebugJS.printUsage(tbl.help);
    }
  },
  _cmdDbgWinPos: function(ctx, x, y) {
    if (!(ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) || (ctx.opt.mode == 'kiosk')) {
      return;
    }
    var sp;
    switch (x) {
      case 'n':
      case 'ne':
      case 'e':
      case 'se':
      case 's':
      case 'sw':
      case 'w':
      case 'nw':
      case 'c':
        sp = ctx.getSelfSizePos();
        ctx.setWinPos(x, sp.w, sp.h);
        break;
      default:
        if (isNaN(x) || isNaN(y)) {
          sp = ctx.getSelfSizePos();
          DebugJS._log('x=' + (sp.x1 + 3) + ' y=' + (sp.y1 + 3));
          DebugJS.printUsage('dbgwin pos n|ne|e|se|s|sw|w|nw|c|x y');
          break;
        }
        x |= 0; y |= 0;
        DebugJS.ctx.setDbgWinPos(y, x);
    }
  },
  _cmdDbgWinSize: function(ctx, w, h) {
    if (!(ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) || (ctx.opt.mode == 'kiosk')) {
      return;
    }
    if (isNaN(w) || isNaN(h)) {
      var sp = ctx.getSelfSizePos();
      DebugJS._log('w=' + (sp.w) + ' h=' + (sp.h));
      DebugJS.printUsage('dbgwin size W H');
      return;
    }
    w |= 0; h |= 0;
    if (w < ctx.computedMinW) w = ctx.computedMinW;
    if (h < ctx.computedMinH) h = ctx.computedMinH;
    ctx.setDbgWinSize(w, h);
  },
  _cmdDbgWinStatus: function(ctx) {
    var sp = ctx.getSelfSizePos();
    var s = 'width : ' + sp.w + '\nheight: ' + sp.h + '\n' +
    'posX1 : ' + sp.x1 + '\nposY1 : ' + sp.y1 + '\n' +
    'posX2 : ' + sp.x2 + '\nposY2 : ' + sp.y2 + '\n';
    DebugJS._log.mlt(s);
  },
  _cmdDbgWinLock: function(ctx, c) {
    if ((ctx.opt.lockCode == null) && (c == undefined)) {
      DebugJS.printUsage('dbgwin lock [code]');
      return;
    }
    if (c != undefined) ctx.opt.lockCode = c;
    ctx.lockDbgWin(ctx);
  },
  kiosk: function(ctx, z) {
    ctx.saveSizeAndPos(ctx, ctx.orgSizePos2);
    ctx.expandDbgWin('full');
    ctx.orgSizePos2.zm = ctx.zoom;
    DebugJS.zoom(z);
  },
  kioskQ: function(ctx) {
    DebugJS.zoom(ctx.orgSizePos2.zm);
    ctx.restoreDbgWin(ctx.orgSizePos2);
    ctx.updateWinCtrlBtnPanel();
  },

  cmdDelay: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var d = DebugJS.splitArgs(arg)[0];
    if (d == '-c') {
      ctx._cmdDelayCancel(ctx);
      return;
    } else if (d.match(/\|/)) {
      d = DebugJS.calcNextTime(d).t;
      d = DebugJS.calcTargetTime(d);
    } else if (DebugJS.isTimeFormat(d)) {
      d = DebugJS.calcTargetTime(d);
    } else if (DebugJS.isTmStr(d)) {
      d = DebugJS.str2ms(d);
    } else if ((d == '') || isNaN(d)) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var c = DebugJS.getArgsFrom(arg, 1);
    ctx.cmdDelayData.cmd = c;
    ctx._cmdDelayCancel(ctx);
    ctx.cmdDelayData.tmid = setTimeout(ctx._cmdDelayExec, d | 0);
  },
  _cmdDelayExec: function() {
    var ctx = DebugJS.ctx;
    ctx.cmdDelayData.tmid = 0;
    var c = ctx.cmdDelayData.cmd;
    if (c == '') {
      DebugJS._log(c);
    } else {
      ctx._execCmd(c, false, ctx.cmdEchoFlg);
    }
    ctx.cmdDelayData.cmd = null;
  },
  _cmdDelayCancel: function(ctx) {
    if (ctx.cmdDelayData.tmid > 0) {
      clearTimeout(ctx.cmdDelayData.tmid);
      ctx.cmdDelayData.tmid = 0;
      DebugJS._log('command delay execution has been canceled.');
    }
  },

  cmdDnd: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var a0 = DebugJS.getArgVal(arg, 0);
    if (a0 == '-c') {
      if (ctx.dndCmd) DebugJS._log('Canceled.');
      DebugJS.dndFnFin();
      return;
    }
    var a = DebugJS.splitCmdLineInTwo(arg);
    var rm = false;
    if (a0 == '-r') {
      rm = true;
      a = DebugJS.splitCmdLineInTwo(a[1]);
    }
    var cmd = a[0];
    if (ctx.DND_FN_TBL[cmd]) {
      ctx.dndArg = a[1];
      ctx.dndCmd = cmd;
      ctx.dndRM = rm;
      DebugJS._log('Drop a file or text here.' + (rm ? ' (Resident mode)' : ''));
    } else {
      DebugJS.printUsage(tbl.help);
      var h = 'Available Commands:\n';
      for (var k in ctx.DND_FN_TBL) {
        h += k + '\n';
      }
      DebugJS._log.mlt(h);
    }
  },
  execDndCmd: function(ctx, s) {
    var r = ctx.DND_FN_TBL[ctx.dndCmd](s);
    if (!ctx.dndRM) {
      DebugJS.dndFnFin();
    }
    return r;
  },

  cmdEcho: function(arg) {
    var a = DebugJS.splitArgs(arg)[0];
    if (a == '') {
      DebugJS._log(DebugJS.ctx.cmdEchoFlg ? 'on' : 'off');return;
    } else if (a == 'off') {
      DebugJS.ctx.cmdEchoFlg = false;return;
    } else if (a == 'on') {
      DebugJS.ctx.cmdEchoFlg = true;return;
    }
    arg = DebugJS.decodeEsc(arg);
    try {
      var s = eval(arg) + '';
      DebugJS._log(s);
    } catch (e) {
      DebugJS._log.e(e);
    }
  },

  cmdElements: function(arg, tbl) {
    arg = arg.trim();
    if ((arg == '-h') || (arg == '--help')) {
      DebugJS.printUsage(tbl.help);
    } else {
      return DebugJS.countElements(arg, true);
    }
  },

  cmdEvent: function(arg, tbl) {
    var a = DebugJS.splitCmdLine(arg);
    var op = a[0];
    switch (op) {
      case 'create':
        if (a[1]) {
          DebugJS.event.create(a[1]);
          return;
        }
        break;
      case 'set':
        if (a[1]) {
          try {
            DebugJS.event.set(a[1], eval(a[2]));
          } catch (e) {
            DebugJS._log.e(e);
          }
          return;
        }
        break;
      case 'dispatch':
        var tgt = a[1];
        if (tgt) {
          if (tgt.charAt(0) == '(') {
            tgt = tgt.substr(1, tgt.length - 2);
          }
          DebugJS.event.dispatch(tgt, a[2]);
          return;
        }
        break;
      case 'clear':
        DebugJS.event.clear();
        return;
    }
    DebugJS.printUsage(tbl.help);
  },

  cmdExit: function() {
    var ctx = DebugJS.ctx;
    DebugJS.bat.exit();
    ctx._cmdDelayCancel(ctx);
    ctx.CMDVALS = {};
    ctx.finalizeFeatures(ctx);
    ctx.toolsActvFnc = DebugJS.TOOLS_DFLT_ACTIVE_FNC;
    if (ctx.opt.useSuspendLogButton) {
      ctx.status &= ~DebugJS.ST_LOG_SUSPEND;
      ctx.updateSuspendLogBtn(ctx);
    }
    if (ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
      ctx.stopStopwatch();
    }
    ctx.resetStopwatch();
    if (ctx.timerBasePanel) {
      ctx.stopTimerStopwatchCu();
      ctx.resetTimerStopwatchCu();
      ctx.stopTimerStopwatchCd();
      ctx.resetTimerStopwatchCd();
      ctx.switchTimerModeClock();
    }
    ctx.setLed(0);
    ctx.setMsg('');
    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      if (ctx.opt.usePinButton) {
        ctx.enableDraggable(ctx);
      }
      if (ctx.opt.mode != 'kiosk') {
        ctx.resetDbgWinSizePos();
      }
    }
    ctx.jsBuf = '';
    ctx.fltrText = '';
    if (ctx.fltrInput) ctx.fltrInput.value = '';
    ctx.closeDbgWin();
    ctx.clearLog();
    ctx.logFilter = DebugJS.LOG_FLTR_ALL;
    ctx.updateLogFilterBtns();
  },

  cmdGoto: function(arg) {
    if (DebugJS.bat.isCmdExecutable()) {
      DebugJS.ctx._cmdJump(DebugJS.ctx, arg, false, 'label');
    }
  },

  cmdHelp: function(arg) {
    var ctx = DebugJS.ctx;
    var a = arg.trim();
    var t1 = ctx.CMD_TBL;
    var t2 = ctx.EXT_CMD_TBL;
    if (ctx._cmdHelp(t1, a)) return;
    if (ctx._cmdHelp(t2, a)) return;
    var s = 'Available Commands:\n<table>' + ctx._cmdHelpTbl(t1);
    if (!ctx.opt.disableAllCommands) {
      if (t2.length > 0) {
        s += '<tr><td colspan="2">' + '---- ---- ---- ---- ---- ---- ---- ----</td></tr>';
      }
      s += ctx._cmdHelpTbl(t2);
    }
    s += '</table>';
    DebugJS._log.mlt(s);
  },
  _cmdHelp: function(tbl, c) {
    for (var i = 0; i < tbl.length; i++) {
      var t = tbl[i];
      if ((t.cmd == c) && !(t.attr & DebugJS.CMD_ATTR_HIDDEN) && !(t.attr & DebugJS.CMD_ATTR_DISABLED)) {
        if (t.help) {
          DebugJS.printUsage(t.help);
        } else {
          DebugJS._log('No help message for this command');
        }
        return true;
      }
    }
    return false;
  },
  _cmdHelpTbl: function(tbl) {
    var s = '';
    for (var i = 0; i < tbl.length; i++) {
      if (!(tbl[i].attr & DebugJS.CMD_ATTR_HIDDEN)) {
        var style1 = '';
        var style2 = '';
        if (tbl[i].attr & DebugJS.CMD_ATTR_DISABLED) {
          style1 = '<span style="color:#aaa">';
          style2 = '</span>';
        }
        s += '<tr><td class="dbg-cmdtd">' + style1 + tbl[i].cmd + style2 + '</td><td>' + style1 + tbl[i].desc + style2 + '</td></tr>';
      }
    }
    return s;
  },

  radixCmd: function(arg, tbl) {
    var args = DebugJS.splitArgs(arg);
    if (args[0] == '') {
      DebugJS.printUsage(tbl.help);
      return null;
    }
    var argLen = args.length;
    var digit = 0;
    var exp = args[0];
    var expLen;
    if (argLen == 2) {
      digit = args[1];
    } else if (argLen >= 3) {
      if (args[0].match(/^\(/)) {
        if (args[argLen - 2].match(/\)$/)) {
          digit = args[argLen - 1];
          expLen = argLen - 1;
        } else if (args[argLen - 1].match(/\)$/)) {
          expLen = argLen;
        } else {
          DebugJS._log.e('Invalid value');
          return null;
        }
        exp = '';
        for (var i = 0; i < expLen; i++) {
          exp += ((i >= 1) ? ' ' : '') + args[i];
        }
      } else {
        DebugJS._log.e('Invalid value');
        return null;
      }
    }
    var data = {exp: exp, digit: (digit | 0)};
    return data;
  },

  cmdHistory: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    try {
      if (DebugJS.countArgs(arg) == 0) {
        ctx.showHistory();
      } else if (DebugJS.hasOpt(arg, 'c')) {
        ctx.clearHistory();
      } else {
        var d = DebugJS.getOptVal(arg, 'd');
        if (d != null) {
          ctx.delHistory(ctx, d | 0);
        } else {
          DebugJS.printUsage(tbl.help);
        }
      }
    } catch (e) {
      DebugJS._log.e(e);
    }
  },
  initHistory: function(ctx) {
    if (ctx.cmdHistoryBuf == null) {
      ctx.CMD_HISTORY_MAX = ctx.opt.cmdHistoryMax;
      ctx.cmdHistoryBuf = new DebugJS.RingBuffer(ctx.CMD_HISTORY_MAX);
    }
    if (DebugJS.LS_AVAILABLE) ctx.loadHistory(ctx);
  },
  showHistory: function() {
    var bf = DebugJS.ctx.cmdHistoryBuf.getAll();
    var s = '<table>';
    for (var i = 0; i < bf.length; i++) {
      var cmd = bf[i];
      cmd = DebugJS.escHtml(cmd);
      cmd = DebugJS.trimEchoStr(cmd);
      s += '<tr><td class="dbg-cmdtd" style="text-align:right">' + (i + 1) + '</td><td>' + cmd + '</td></tr>';
    }
    s += '</table>';
    DebugJS._log.mlt(s);
  },
  saveHistory: function(ctx, cmd) {
    if (!ctx.cmdHistoryBuf) return;
    ctx.cmdHistoryBuf.add(cmd);
    ctx.cmdHistoryIdx = (ctx.cmdHistoryBuf.count() < ctx.CMD_HISTORY_MAX) ? ctx.cmdHistoryBuf.count() : ctx.CMD_HISTORY_MAX;
    if (DebugJS.LS_AVAILABLE) {
      var bf = ctx.cmdHistoryBuf.getAll();
      var cmds = '';
      for (var i = 0; i < bf.length; i++) {
        cmds += bf[i] + '\n';
      }
      localStorage.setItem('DebugJS-history', cmds);
    }
  },
  loadHistory: function(ctx) {
    if (DebugJS.LS_AVAILABLE) {
      var bf = localStorage.getItem('DebugJS-history');
      if (bf != null) {
        var cmds = bf.split('\n');
        for (var i = 0; i < (cmds.length - 1); i++) {
          ctx.cmdHistoryBuf.add(cmds[i]);
          ctx.cmdHistoryIdx = (ctx.cmdHistoryBuf.count() < ctx.CMD_HISTORY_MAX) ? ctx.cmdHistoryBuf.count() : ctx.CMD_HISTORY_MAX;
        }
      }
    }
  },
  getHistory: function(idx) {
    var cmds = DebugJS.ctx.cmdHistoryBuf.getAll();
    var c = cmds[idx];
    return ((c == undefined) ? '' : c);
  },
  getLastHistory: function() {
    var cmds = DebugJS.ctx.cmdHistoryBuf.getAll();
    var c = cmds[cmds.length - 1];
    return ((c == undefined) ? '' : c);
  },
  delHistory: function(ctx, idx) {
    var cmds = ctx.cmdHistoryBuf.getAll();
    ctx.clearHistory();
    for (var i = 0; i < cmds.length; i++) {
      if (cmds.length < ctx.opt.cmdHistoryMax) {
        if (i != (idx - 1)) {
          ctx.saveHistory(ctx, cmds[i]);
        }
      } else if (cmds.length >= ctx.opt.cmdHistoryMax) {
        if (i != (idx - 2)) {
          ctx.saveHistory(ctx, cmds[i]);
        }
      }
    }
  },
  clearHistory: function() {
    DebugJS.ctx.cmdHistoryBuf.clear();
    if (DebugJS.LS_AVAILABLE) localStorage.removeItem('DebugJS-history');
  },

  cmdHttp: function(arg, tbl, echo) {
    var a = DebugJS.splitCmdLineInTwo(arg);
    var method = a[0];
    var data = a[1];
    if (method == '') {
      DebugJS.printUsage(tbl.help);
      return;
    } else if (method.match(/^\s*http/)) {
      method = 'GET';
      data = arg;
    }
    return DebugJS.ctx.doHttpRequest(method, data, echo);
  },

  cmdInject: function(arg, tbl) {
    var a = DebugJS.splitCmdLine(arg);
    var f = a[0].trim();
    var c = a[1];
    if (f && c) {
      try {
        c = eval(c);
        DebugJS.inject(f, c);
      } catch (e) {
        DebugJS._log.e(e);
      }
    } else {
      DebugJS.printUsage(tbl.help);
    }
  },

  cmdJs: function(arg, tbl) {
    var a = DebugJS.splitArgs(arg);
    if (a[0] == 'exec') {
      DebugJS.ctx.execJavaScript();
    } else {
      DebugJS.printUsage(tbl.help);
    }
  },

  cmdJson: function(arg, tbl) {
    if (arg == '') {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var json = DebugJS.delLeadingSP(arg);
    var lv = 0;
    var jFlg = true;
    if (json.charAt(0) == '-') {
      var opt = json.match(/-p\s/);
      if (opt != null) jFlg = false;
      opt = json.match(/-l(\d+)/);
      if (opt) lv = opt[1];
      json = json.match(/(\{.*)/);
      if (json) {
        json = json[1];
      }
    }
    if (json) {
      return DebugJS._cmdJson(json, jFlg, lv);
    } else {
      DebugJS.printUsage(tbl.help);
    }
  },

  cmdJump: function(arg) {
    if (DebugJS.bat.isCmdExecutable()) {
      DebugJS.ctx._cmdJump(DebugJS.ctx, arg, true, 'label');
    }
  },
  _cmdJump: function(ctx, arg, lnk, type) {
    var bat = DebugJS.bat;
    var ctrl = bat.ctrl;
    var fnArg;
    var a = DebugJS.splitCmdLineInTwo(arg);
    var lbl = a[0];
    if (lbl.match(/^".+?"$/)) {
      try {
        lbl = eval(lbl);
      } catch (e) {
        DebugJS._log.e('L' + ctrl.pc + ': Illegal argument (' + lbl + ')');
        return;
      }
    }
    var tbl = (type == 'func' ? bat.fncs : bat.labels);
    var idx = tbl[lbl];
    if (idx == undefined) {
      DebugJS._log.e('L' + ctrl.pc + ': No such ' + type + ' (' + lbl + ')');
      return;
    }
    if (lnk) {
      try {
        fnArg = eval(a[1]);
      } catch (e) {
        DebugJS._log.e('L' + ctrl.pc + ': Illegal argument (' + e + ')');
        return;
      }
      delete ctx.CMDVALS['%RET%'];
      var fnCtx = {
        lr: ctrl.pc,
        fnArg: ctrl.fnArg,
        block: ctrl.block,
        label: ctrl.label,
        fnnm: ctrl.fnnm
      };
      ctrl.stack.push(fnCtx);
      ctrl.fnArg = fnArg;
      ctx.CMDVALS['%ARG%'] = fnArg;
      ctrl.lr = ctrl.pc;
    }
    ctrl.startPc = 0;
    ctrl.block = [];
    if (type == 'func') {
      bat.setFnNm(lbl);
    } else {
      bat.setLabel(lbl);
    }
    ctrl.pc = idx + 1;
    ctx.updateCurPc();
  },

  cmdKeyPress: function(arg, tbl) {
    var keyCode = DebugJS.splitArgs(arg)[0];
    if ((keyCode == '') || isNaN(keyCode)) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var s = (DebugJS.getOptVal(arg, 'shift') == null ? false : true);
    var c = (DebugJS.getOptVal(arg, 'ctrl') == null ? false : true);
    var a = (DebugJS.getOptVal(arg, 'alt') == null ? false : true);
    var m = (DebugJS.getOptVal(arg, 'meta') == null ? false : true);
    var opt = {keyCode: keyCode | 0, shift: s, ctrl: c, alt: a, meta: m};
    DebugJS.keyPress(opt);
  },

  cmdKeys: function(arg, tbl) {
    arg = DebugJS.unifySP(arg);
    if (arg == '') {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var ags = arg.split(' ');
    for (var i = 0; i < ags.length; i++) {
      if (ags[i] == '') continue;
      var cmd = 'DebugJS.tmp="' + ags[i] + ' = ";DebugJS.tmp+=DebugJS.getKeysStr(' + ags[i] + ');DebugJS._log.mlt(DebugJS.tmp);';
      try {
        eval(cmd);
      } catch (e) {
        DebugJS._log.e(e);
      }
    }
  },

  cmdKiosk: function(arg) {
    DebugJS.kiosk(parseFloat(arg));
  },
  _cmdKioskQ: function(ctx) {
    ctx.kioskQ(ctx);
    ctx.status &= ~DebugJS.ST_KIOSK;
  },

  cmdLaptime: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_STOPWATCH_LAPTIME) {
      ctx.stopStopwatch();
    } else {
      if (ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
        ctx.stopStopwatch();
        ctx.resetStopwatch();
      }
      ctx.status |= DebugJS.ST_STOPWATCH_LAPTIME;
      ctx.startStopwatch();
    }
  },

  cmdLed: function(arg, tbl) {
    if (arg == '') {
      var v = DebugJS.ctx.led;
      var h = DebugJS.formatHex(DebugJS.toHex(v), true, true);
      DebugJS._log.res(v + '(' + h + ')');
      DebugJS.printUsage(tbl.help);
    } else {
      DebugJS.ctx.setLed(arg);
    }
    return DebugJS.ctx.led;
  },

  cmdLen: function(arg, tbl, echo) {
    if (!arg) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var _n;
    try {
      var _a = eval(DebugJS.getNonOptVals(arg)[0]);
      if (DebugJS.hasOpt(arg, 'b') && (typeof _a == 'string')) {
        _n = DebugJS.lenB(_a);
      } else {
        _n = _a.length;
      }
    } catch (e) {
      DebugJS._log.e(e);return;
    }
    if (echo) {
      if (_n == undefined) {
        DebugJS._log.res.err('uncountable');
      } else {
        DebugJS._log.res(_n);
      }
    }
    return _n;
  },

  cmdLoadJs: function(arg, tbl) {
    var f = arg.trim();
    if (f) {
      var s = document.createElement('script');
      s.src = f;
      document.body.appendChild(s);
    } else {
      DebugJS.printUsage(tbl.help);
    }
  },

  cmdLog: function(arg, tbl, echo) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    var fn = {
      bufsize: ctx._cmdLogBufsize,
      copy: ctx._cmdLogCopy,
      date: ctx._cmdLogDate,
      dump: ctx._cmdLogDump,
      filter: ctx._cmdLogFilter,
      html: ctx._cmdLogHtml,
      load: ctx._cmdLogLoad,
      preserve: ctx._cmdLogPreserve,
      suspend: ctx._cmdLogSuspend,
      lv: ctx._cmdLogLv
    };
    if (fn[a[0]]) {return fn[a[0]](ctx, arg, echo);}
    DebugJS.printUsage(tbl.help);
  },
  _cmdLogBufsize: function(ctx, arg) {
    var n = DebugJS.splitArgs(arg)[1] | 0;
    if (n > 0) {
      ctx.initBuf(ctx, n);
    } else {
      n = ctx.logBuf.size();
      DebugJS._log.res(n);
      DebugJS.printUsage('log bufsize [size]');
    }
    return n;
  },
  _cmdLogCopy: function() {
    var s = DebugJS.html2text(DebugJS.dumpLog('text', false, true));
    DebugJS.copy2clpbd(s);
  },
  _cmdLogDate: function(ctx, arg) {
    var op = DebugJS.splitArgs(arg)[1];
    if (op == 'on') {
      ctx.setLogDt(ctx, 1);
    } else if (op == 'off') {
      ctx.setLogDt(ctx, 0);
    } else {
      DebugJS.printUsage('log date on|off');
    }
    ctx.printLogs();
    return ctx.logDt;
  },
  _cmdLogDump: function(ctx, arg) {
    arg = DebugJS.splitCmdLineInTwo(arg)[1];
    var f = (arg.trim() == '-b64' ? true : false);
    var l = DebugJS.dumpLog('json', f);
    DebugJS._log.res(l);
  },
  _cmdLogFilter: function(ctx, arg) {
    var a = DebugJS.getArgsFrom(arg, 1);
    var s = DebugJS.getOptVal(a, 'case');
    if (!s) s = DebugJS.getOptVal(a, 'fl');
    if (!s) s = DebugJS.getOptVal(a, '')[0];
    if (s == '') {
      DebugJS.printUsage('log filter [-case] [-fl] "string"');
      return;
    }
    try {
      s = eval(s);
    } catch (e) {
      DebugJS._log.e(e);return;
    }
    ctx.setLogFilter(ctx, s, DebugJS.hasOpt(arg, 'case'), DebugJS.hasOpt(arg, 'fl'));
  },
  _cmdLogHtml: function(ctx, arg) {
    var op = DebugJS.splitArgs(arg)[1];
    if (op == 'on') {
      ctx.setFilterTxtHtml(ctx, true);
    } else if (op == 'off') {
      ctx.setFilterTxtHtml(ctx, false);
    } else {
      DebugJS.printUsage('log html on|off');
    }
    return ctx.fltrTxtHtml;
  },
  _cmdLogLoad: function(ctx, arg) {
    arg = DebugJS.splitCmdLineInTwo(arg)[1];
    var data = DebugJS.getOptVal(arg, 'b64');
    if (DebugJS.countArgs(arg) == 0) {
      DebugJS.printUsage('log load [-b64] Log-Buf-JSON');
    } else {
      try {
        if (data == null) {
          DebugJS.loadLog(arg);
        } else {
          DebugJS.loadLog(data, true);
        }
        ctx.printLogs();
      } catch (e) {
        DebugJS._log.e(e);
      }
    }
  },
  _cmdLogPreserve: function(ctx, arg, echo) {
    var op = DebugJS.splitArgs(arg)[1];
    if (op == 'on') {
      ctx.setLogPreserve(ctx, true);
    } else if (op == 'off') {
      ctx.setLogPreserve(ctx, false);
    } else {
      if (echo) {
        var st = ((ctx.status & DebugJS.ST_LOG_PRESERVED) ? 'on' : 'off');
        DebugJS._log.res(st);
        DebugJS.printUsage('log preserve on|off');
      }
    }
    return ((ctx.status & DebugJS.ST_LOG_PRESERVED) ? true : false);
  },
  _cmdLogSuspend: function(ctx, arg) {
    var op = DebugJS.splitArgs(arg)[1];
    if (op == 'on') {
      DebugJS.ctx.suspendLog();
    } else if (op == 'off') {
      DebugJS.ctx.resumeLog();
    } else {
      DebugJS.printUsage('log suspend on|off');
    }
    return ((ctx.status & DebugJS.ST_LOG_SUSPEND) ? true : false);
  },
  _cmdLogLv: function(ctx, arg) {
    var a = DebugJS.delAllSP(DebugJS.getArgsFrom(arg, 1));
    var lv = a.split('|');
    if (lv[0] == '') {
      DebugJS.printUsage('log lv LOG|VRB|DBG|INF|WRN|ERR|FTL|ALL|NONE');
      return;
    }
    var FLT = {
      LOG: DebugJS.LOG_FLTR_LOG,
      VRB: DebugJS.LOG_FLTR_VRB,
      DBG: DebugJS.LOG_FLTR_DBG,
      INF: DebugJS.LOG_FLTR_INF,
      WRN: DebugJS.LOG_FLTR_WRN,
      ERR: DebugJS.LOG_FLTR_ERR,
      FTL: DebugJS.LOG_FLTR_FTL,
      ALL: DebugJS.LOG_FLTR_ALL
    };
    ctx.logFilter = 0;
    for (var i = 0; i < lv.length; i++) {
      var f = FLT[lv[i]];
      if (f != undefined) ctx.logFilter |= f;
    }
    ctx.updateLogFilterBtns();
    ctx.printLogs();
  },

  cmdMsg: function(arg, tbl) {
    var m = ((DebugJS.hasOpt(arg, 'c') || (arg.trim() == '')) ? '""' : arg);
    try {
      DebugJS.ctx.setMsg(eval(m));
    } catch (e) {
      DebugJS._log.e(e);
      DebugJS.printUsage(tbl.help);
    }
  },

  cmdNextTime: function(arg, tbl) {
    var t, ms, dt;
    var v = arg;
    var p = true;
    var idx = DebugJS.indexOfOptVal(arg, '-q');
    if (idx >= 0) {
      p = false;
      v = arg.substr(idx);
    }
    v = v.trim();
    if ((v.match(/^T.{4,6}/))) {
      t = DebugJS.calcNextTime(v);
    } else if (ms = DebugJS.parseToMillis(v)) {
      dt = DebugJS.getDateTime(DebugJS.now() + ms);
      t = {time: dt.time, t: 'T' + dt.hh + dt.mi + dt.ss};
    } else if (DebugJS.isNum(v)) {
      dt = DebugJS.getDateTime(DebugJS.now() + (v | 0));
      t = {time: dt.time, t: 'T' + dt.hh + dt.mi + dt.ss};
    } else {
      DebugJS.printUsage(tbl.help);
      return '';
    }
    if (p) {
      DebugJS.log.res(DebugJS.getDateTimeStr(t.time, true));
    }
    return t.t;
  },

  cmdNow: function(arg, tbl, echo) {
    var t = DebugJS.now();
    if (echo) DebugJS._log.res(t);
    return t;
  },

  cmdOpen: function(arg, tbl) {
    var a = DebugJS.splitArgs(arg);
    var fn = a[0];
    var subfn = a[1];
    var opt = a[2];
    if ((fn == '') || (!DebugJS.ctx.launchFnc(DebugJS.ctx, fn, subfn, opt))) {
      DebugJS.printUsage(tbl.help);
    }
  },

  cmdP: function(arg, tbl) {
    return DebugJS._cmdP(arg, tbl);
  },

  cmdPause: function(arg, tbl) {
    var op = '';
    if (DebugJS.hasOpt(arg, 'key')) op = 'key';
    var key = DebugJS.getOptVal(arg, 'key');
    var to = DebugJS.getOptVal(arg, 'timeout');
    var q = DebugJS.hasOpt(arg, 'q');
    if (!DebugJS.ctx._cmdPause(op, key, to, q)) {
      DebugJS.printUsage(tbl.help);
    }
  },
  _cmdPause: function(op, key, tout, q) {
    var ctx = DebugJS.ctx;
    var bat = DebugJS.bat;
    if (tout) {
      if (DebugJS.isTmStr(tout)) {
        tout = DebugJS.str2ms(tout);
      } else if (DebugJS.isTimeFormat(tout)) {
        tout = DebugJS.calcNextTime(tout).time - DebugJS.now();
      }
    }
    tout |= 0;
    ctx.CMDVALS['%RESUMED_KEY%'] = null;
    if (op == '') {
      ctx.status |= DebugJS.ST_BAT_PAUSE_CMD;
      if (!q) DebugJS._log('Click or press any key to continue...');
    } else if (op == 'key') {
        if (key == undefined) key = '';
        bat.ctrl.pauseKey = key;
        if (!q) DebugJS._log('Type "resume" or "resume -key' + ((key == '') ? '' : ' ' + key) + '" to continue...' + ((tout > 0) ? ' (timeout=' + tout + ')' : ''));
        ctx.status |= DebugJS.ST_BAT_PAUSE_CMD_KEY;
    } else {
      return false;
    }
    if (tout > 0) {
      bat.ctrl.pauseTimeout = DebugJS.now() + tout;
      bat.ctrl.pauseTmId = setTimeout(bat.onPauseTimeout, tout);
    }
    ctx.updateBatResumeBtn();
    return true;
  },

  cmdPin: function(arg, tbl) {
    var op = DebugJS.splitArgs(arg)[0];
    if ((op != 'on') && (op != 'off')) {
      DebugJS.printUsage(tbl.help);
    } else {
      DebugJS.pin(op == 'on');
    }
    return ((DebugJS.ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) ? false : true);
  },

  cmdPoint: function(arg, tbl, echo) {
    var ctx = DebugJS.ctx;
    var args = DebugJS.splitCmdLine(arg);
    var point = DebugJS.point;
    var ret;
    var op = args[0];
    var alignX = DebugJS.getOptVal(arg, 'alignX');
    var alignY = DebugJS.getOptVal(arg, 'alignY');
    if (op == 'init') {
      point.init(DebugJS.hasOpt(arg, 'a'));
    } else if (op == 'move') {
      ctx._cmdPointMove(ctx, arg, tbl, args);
    } else if (op == 'label') {
      ctx._cmdPointLabel(args, alignX, alignY);
    } else if (op == 'scroll') {
      ctx._cmdPointScroll(args);
    } else if (op == 'selectoption') {
      ret = ctx._cmdPointSelectOpt(ctx, args);
    } else if (op == 'getelement') {
      ret = point.getElementFromCurrentPos();
    } else if (op == 'getprop') {
      ret = point.getProp(args[1]);
    } else if (op == 'setprop') {
      point.setProp(args[1], DebugJS.getArgsFrom(arg, 2), echo);
    } else if (op == 'text') {
      ctx._cmdPointText(arg);
    } else if (op == 'verify') {
      ret = ctx._cmdPointVerify(arg);
    } else if (op == 'event') {
      ret = point.event(DebugJS.getArgsFrom(arg, 1));
    } else if (op == 'cursor') {
      ctx._cmdPointCursor(args, tbl);
    } else if (op == 'show') {
      point.show();
    } else if (op == 'hide') {
      point.hide();
    } else if (op == 'hint') {
      ctx._cmdPointHint(ctx, arg, point, args[1]);
    } else if (op == 'drag') {
      point.drag(DebugJS.getArgsFrom(arg, 1));
    } else if ((op == 'click') || (op == 'cclick') || (op == 'rclick') || (op == 'dblclick')) {
      var speed = DebugJS.getOptVal(arg, 'speed');
      point.simpleEvent(op, speed);
    } else if ((op == 'blur') || (op == 'change') || (op == 'contextmenu') || (op == 'focus') || (op == 'mousedown') || (op == 'mouseup')) {
      point.simpleEvent(op, args[1]);
    } else if ((op == 'keydown') || (op == 'keypress') || (op == 'keyup')) {
      if (args[1] != undefined) {
        point.keyevt(args);
      } else {
        DebugJS.printUsage('point keydown|keypress|keyup -keyCode n -code c -key k [-s] [-c] [-a] [-m]');
      }
    } else if (op == 'ch') {
      ctx._cmdPointCh(args[1], echo);
    } else {
      ctx._cmdPointJmp(ctx, arg, tbl, args);
    }
    return ret;
  },
  _cmdPointJmp: function(ctx, arg, tbl, args) {
    var ptr = DebugJS.point.getPtr();
    var x, y;
    if (args[0] == '') {
      DebugJS._log('x=' + ptr.x + ', y=' + ptr.y + ' w=' + ptr.w + ', h=' + ptr.h + ', ch=' + DebugJS.point.ch);
      DebugJS.printUsage(tbl.help);
      return;
    }
    var p = ctx._cmdPointCalcPos(ctx, args[0], args[1]);
    if (p) {
      DebugJS.point(p.x, p.y);
    } else if (isNaN(args[0])) {
      var tgt = args[0];
      var idx = args[1];
      if (tgt.charAt(0) == '(') {
        tgt = tgt.substr(1, tgt.length - 2);
      }
      var alignX = DebugJS.getOptVal(arg, 'alignX');
      var alignY = DebugJS.getOptVal(arg, 'alignY');
      DebugJS.pointBySelector(tgt, idx, alignX, alignY);
    } else {
      x = args[0];
      y = args[1];
      DebugJS.point(x, y);
    }
  },
  _cmdPointMove: function(ctx, arg, tbl, args) {
    var point = DebugJS.point;
    var tgt = args[1];
    if (tgt == undefined) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var idx;
    var speed = DebugJS.getOptVal(arg, 'speed');
    var step = DebugJS.getOptVal(arg, 'step');
    var alignX = DebugJS.getOptVal(arg, 'alignX');
    var alignY = DebugJS.getOptVal(arg, 'alignY');
    var p = ctx._cmdPointCalcPos(ctx, args[1], args[2]);
    if (p) {
      point.move(p.x, p.y, speed, step);
    } else if (tgt == 'label') {
      var label = args[2];
      idx = args[3] | 0;
      try {
        label = eval(label);
      } catch (e) {
        DebugJS._log.e(e);return;
      }
      point.moveToLabel(label, idx, speed, step, alignX, alignY);
    } else if (isNaN(tgt)) {
      idx = args[2];
      if (tgt.charAt(0) == '(') {
        tgt = tgt.substr(1, tgt.length - 2);
      }
      point.moveToSelector(tgt, idx, speed, step, alignX, alignY);
    } else {
      var x = args[1];
      var y = args[2];
      point.move(x, y, speed, step);
    }
  },
  _cmdPointCalcPos: function(ctx, a1, a2) {
    var x = a1;
    var y = a2;
    if (a1 == 'mouse') {
      x = ctx.mousePos.x;
      y = ctx.mousePos.y;
    } else if (a1 == 'center') {
      var p = DebugJS.getScreenCenter();
      x = p.x;
      if (a2 == undefined) y = p.y;
    } else if (a1 == 'left') {
      x = 0;
      if (a2 == undefined) y = '+0';
    } else if (a1 == 'right') {
      x = document.documentElement.clientWidth;
      if (a2 == undefined) y = '+0';
    }
    if (a2 == 'top') {
      y = 0;
    } else if (a2 == 'middle') {
      y = DebugJS.getScreenCenter().y;
    } else if (a2 == 'bottom') {
      y = document.documentElement.clientHeight;
    }
    if ((x == a1) && (y == a2)) {
      return null;
    }
    return {x: x, y: y};
  },
  _cmdPointHint: function(ctx, arg, point, op) {
    var a = DebugJS.getArgsFrom(arg, 2);
    if (op == 'msg') {
      if (!a) {
        DebugJS.printUsage('point hint msg "str"');
      } else {
        point.hint(a, 0, 0);
      }
    } else if (op == 'msgseq') {
      ctx._cmdPointHintMsgSeq(ctx, arg, point);
    } else if (op == 'hide') {
      point.hint.hide();
    } else if (op == 'show') {
      point.hint.show();
    } else if (op == 'clear') {
      point.hint.clear();
    } else {
      DebugJS.printUsage('point hint msg|msgseq "str"|show|hide|clear');
    }
  },
  _cmdPointHintMsgSeq: function(ctx, arg, point) {
    var a = DebugJS.splitCmdLine(arg);
    var m = a[2];
    var speed = DebugJS.getOptVal(arg, 'speed');
    var step = DebugJS.getOptVal(arg, 'step');
    var start = DebugJS.getOptVal(arg, 'start');
    var end = DebugJS.getOptVal(arg, 'end');
    if (speed == null) speed = ctx.props.textspeed;
    if (step == null) step = ctx.props.textstep;
    if (!m) {
      DebugJS.printUsage('point hint msgseq "str"');
    } else {
      point.hint(m, speed, step, start, end);
    }
  },
  _cmdPointCursor: function(args, tbl) {
    var src = args[1];
    var w = args[2];
    var h = args[3];
    if (src == undefined) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    if (src == 'default') src = '';
    DebugJS.point.cursor(src, w, h);
  },
  _cmdPointText: function(arg) {
    var el = DebugJS.point.getElementFromCurrentPos();
    if (!el || !DebugJS.isTxtInp(el)) {
      DebugJS._log.e('Pointed area is not an input element (' + (el ? el.nodeName : 'null') + ')');
      return;
    }
    var txt = DebugJS.getArgVal(arg, 1);
    var speed = DebugJS.getOptVal(arg, 'speed');
    var step = DebugJS.getOptVal(arg, 'step');
    var start = DebugJS.getOptVal(arg, 'start');
    var end = DebugJS.getOptVal(arg, 'end');
    try {
      DebugJS.setText(el, txt, speed, step, start, end);
    } catch (e) {
      DebugJS._log.e(e);
    }
  },
  _cmdPointSelectOpt: function(ctx, args) {
    var ret;
    var el = DebugJS.point.getElementFromCurrentPos();
    if (el && (el.nodeName == 'SELECT')) {
      var method = args[1];
      var type = args[2];
      if (((method == 'get') || (method == 'set')) &&
          ((type == 'text') || (type == 'texts') || (type == 'value') || (type == 'values'))) {
        var val = args[3];
        ret = ctx._cmdSelect(el, method, type, val);
      } else {
        DebugJS._log.e('Usage: point selectoption get|set text|texts|value|values val');
      }
    } else {
      DebugJS._log.e('Pointed area is not a select element (' + (el ? el.nodeName : 'null') + ')');
    }
    return ret;
  },
  _cmdPointLabel: function(args, alignX, alignY) {
    var label = args[1];
    try {
      label = eval(label);
    } catch (e) {
      DebugJS._log.e(e);return;
    }
    var idx = args[2] | 0;
    DebugJS.pointByLabel(label, idx, alignX, alignY);
  },
  _cmdPointScroll: function(args) {
    var x = args[1];
    var y = args[2];
    var el = DebugJS.point.getElementFromCurrentPos();
    if (el) {
      DebugJS.scrollElTo(el, x, y);
    } else {
      DebugJS._log.e('Failed to get element');
    }
  },
  _cmdPointVerify: function(arg) {
    var a = DebugJS.splitCmdLine(arg);
    var prop = a[1];
    var method = a[2];
    var exp = DebugJS.getArgsFrom(arg, 3);
    var label = DebugJS.getOptVal(a, 'label');
    if (label != null) {
      prop = a[3];
      method = a[4];
      exp = DebugJS.getArgsFrom(arg, 5);
    }
    return DebugJS.point.verify(prop, method, exp, label);
  },
  _cmdPointCh: function(ch, echo) {
    var point = DebugJS.point;
    if (ch == undefined) {
      if (echo) DebugJS._log('ch=' + point.ch);
      return point.ch;
    }
    try {
      ch = eval(ch) | 0;
      point.ch = ch;
    } catch (e) {
      DebugJS._log.e(e);
    }
    return point.ch;
  },

  cmdProp: function(arg, tbl) {
    arg = DebugJS.delLeadingSP(arg);
    if (arg == '') {
      DebugJS.printUsage(tbl.help);
    } else {
      var v = DebugJS.ctx.props[arg];
      if (v != undefined) {
        DebugJS._log.res(v);
        return v;
      } else {
        DebugJS._log.e(arg + ' is invalid property name.');
      }
    }
  },

  cmdProps: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    if (a[0] == '-reset') {
      DebugJS.copyProp(ctx.PROPS_DFLT_VALS, ctx.props);
      DebugJS._log('debug properties have been reset.');
      return;
    } else if (a[0] != '') {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var s = 'Available properties:\n<table>';
    for (var k in ctx.props) {
      s += '<tr><td>' + k + '</td><td>' + ctx.props[k] + '</td></tr>';
    }
    s += '</table>';
    DebugJS._log.mlt(s);
  },

  cmdQuit: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_CLOCK_FULL) ctx._cmdClockQ(ctx);
    if (ctx.status & DebugJS.ST_SW) {
      ctx._cmdSwQ(ctx);
    } else if (ctx.status & DebugJS.ST_KIOSK) {
      ctx._cmdKioskQ(ctx);
    } else if (ctx.dndCmd) {
      DebugJS.dndFnFin();
    }
  },

  cmdRandom: function(arg, tbl, echo) {
    var a = DebugJS.getNonOptVals(arg);
    var min = a[0];
    var max = a[1];
    var o = DebugJS.get1stOpt(arg);
    var r;
    if (o && ((o != 'n') && (o != 's'))) {
      DebugJS.printUsage(tbl.help);
      return;
    } else if (o == 's') {
      r = DebugJS.getRandomS(min, max);
    } else if (min && min.match(/^\d+d$/)) {
      var d = min.replace(/d/, '') | 0;
      r = DebugJS.getRndNums(d);
    } else {
      r = DebugJS.getRandomN(min, max);
    }
    if (echo) DebugJS._log.res(r);
    return r;
  },

  cmdRadixConv: function(v, echo) {
    v = v.trim();
    var rdx = DebugJS.checkRadix(v);
    if ((rdx == 10) || (rdx == 16) || (rdx == 2)) {
      DebugJS.ctx._cmdRadixConv(v, echo);
      return true;
    } else {
      return false;
    }
  },
  _cmdRadixConv: function(v, echo) {
    if (!echo) return;
    var rdx = DebugJS.checkRadix(v);
    if (rdx == 10) {
      v = v.replace(/,/g, '');
      DebugJS.convRadixFromDEC(v);
    } else if (rdx == 16) {
      DebugJS.convRadixFromHEX(v.substr(2));
    } else if (rdx == 2) {
      DebugJS.convRadixFromBIN(v.substr(2));
    }
  },

  cmdResume: function(arg, tbl) {
    var k = DebugJS.getOptVal(arg, 'key');
    if (arg == '') {
      DebugJS.bat._resume('cmd-key');
    } else if (k != null) {
      DebugJS.bat.resume(k);
    } else {
      DebugJS.printUsage(tbl.help);
    }
  },

  cmdReturn: function(arg) {
    DebugJS.bat.ret(arg);
  },

  cmdRGB: function(arg, tbl) {
    arg = DebugJS.unifySP(arg.trim());
    if (arg == '') {
      DebugJS.printUsage(tbl.help);
    } else {
      return DebugJS.convRGB(arg);
    }
  },

  cmdROT: function(arg, tbl, echo) {
    var x = DebugJS.splitArgs(arg)[0];
    var a = DebugJS.getArgsFrom(arg, 1);
    var fnE, fnD;
    switch (x) {
      case '5':
        fnE = DebugJS.encodeROT5;
        fnD = DebugJS.decodeROT5;
        break;
      case '13':
        fnE = DebugJS.encodeROT13;
        fnD = DebugJS.decodeROT13;
        break;
      case '47':
        fnE = DebugJS.encodeROT47;
        fnD = DebugJS.decodeROT47;
        break;
      default:
        DebugJS.printUsage(tbl.help);
        return;
    }
    var iIdx = 0;
    if (DebugJS.hasOpt(a, 'd') || DebugJS.hasOpt(a, 'e')) {
      iIdx++;
    }
    var n = DebugJS.getOptVal(a, 'n');
    if (n == null) {
      n = x | 0;
    } else {
      n = n.replace(/\(|\)/g, '') | 0;
      iIdx += 2;
    }
    return DebugJS.ctx.execEncAndDec(a, tbl, echo, true, fnE, fnD, iIdx, n);
  },

  cmdScrollTo: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    var tgt = a[0];
    if (tgt == '') {
      DebugJS.printUsage(tbl.help);
    } else if (tgt == 'log') {
      var pos = a[1];
      ctx._cmdScrollToLog(ctx, tbl, pos);
    } else if (tgt == 'window') {
      ctx._cmdScrollToWin(ctx, arg, tbl);
    } else {
      var x = a[1];
      var y = a[2];
      DebugJS.scrollElTo(tgt, x, y);
    }
  },
  _cmdScrollToLog: function(ctx, tbl, pos) {
    if (pos == 'top') {
      pos = 0;
    } else if (pos == 'bottom') {
      pos = ctx.logPanel.scrollHeight;
    }
    if ((pos === '') || isNaN(pos)) {
      DebugJS.printUsage(tbl.help);
    } else {
      ctx.logPanel.scrollTop = pos;
    }
  },
  _cmdScrollToWin: function(ctx, arg, tbl) {
    var a = DebugJS.getOptVal(arg, '');
    var posX = a[1];
    var posY = a[2];
    var speed = DebugJS.getOptVal(arg, 'speed');
    var step = DebugJS.getOptVal(arg, 'step');
    if (posX == undefined) {
      posX = DebugJS.splitCmdLine(arg)[1];
      if (posX == undefined) {
        DebugJS.printUsage(tbl.help);
        return;
      }
    }
    if (speed == undefined) speed = ctx.props.scrollspeed;
    if (step == undefined) step = ctx.props.scrollstep;
    if (isNaN(posX)) {
      var slct = a[1];
      var idx = a[2];
      var ps = DebugJS.getElPosSize(slct, idx);
      if (ps) {
        var adjX = DebugJS.getOptVal(arg, 'adjX');
        var adjY = DebugJS.getOptVal(arg, 'adjY');
        try {
          if (adjX) ps.x += eval(adjX);
          if (adjY) ps.y += eval(adjY);
        } catch (e) {
          DebugJS.log.e('scollto window: ' + e);
        }
        DebugJS.scrollWinToTarget(ps, speed, step, null, null, true);
        return;
      }
    }
    if (posY == undefined) {
      posY = DebugJS.splitCmdLine(arg)[2];
      if (posY == undefined) {
        DebugJS.printUsage(tbl.help);
        return;
      }
    }
    var y = ctx._cmdScrollWinGetY(posY);
    if (y == undefined) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var x = ctx._cmdScrollWinGetX(posX);
    if (x == undefined) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    if ((speed == '0') || (step == '0')) {
      window.scroll(x, y);
    } else {
      DebugJS.scrollWinTo(x, y, speed, step);
    }
  },
  _cmdScrollWinGetX: function(posX) {
    var x;
    var scrollX = (window.scrollX != undefined ? window.scrollX : window.pageXOffset);
    if (posX == 'left') {
      x = 0;
    } else if (posX == 'center') {
      x = document.body.clientWidth / 2;
    } else if (posX == 'right') {
      x = document.body.clientWidth;
    } else if (posX == 'current') {
      x = scrollX;
    } else if (posX.charAt(0) == '+') {
      x = scrollX + (posX.substr(1) | 0);
    } else if (posX.charAt(0) == '-') {
      x = scrollX - (posX.substr(1) | 0);
    } else if ((posX == '') || isNaN(posX)) {
      x = undefined;
    } else {
      x = posX;
    }
    return x;
  },
  _cmdScrollWinGetY: function(posY) {
    var y;
    var scrollY = (window.scrollY != undefined ? window.scrollY : window.pageYOffset);
    if (posY == 'top') {
      y = 0;
    } else if (posY == 'middle') {
      y = (document.body.clientHeight - document.documentElement.clientHeight) / 2;
    } else if (posY == 'bottom') {
      y = document.body.clientHeight;
    } else if (posY == 'current') {
      y = scrollY;
    } else if (posY.charAt(0) == '+') {
      y = scrollY + (posY.substr(1) | 0);
    } else if (posY.charAt(0) == '-') {
      y = scrollY - (posY.substr(1) | 0);
    } else if ((posY == '') || isNaN(posY)) {
      y = undefined;
    } else {
      y = posY;
    }
    return y;
  },

  cmdSelect: function(arg, tbl) {
    var a = DebugJS.splitCmdLine(arg);
    var sel = a[0];
    var method = a[1];
    var type = a[2];
    var val = a[3];
    if ((sel != '') &&
        (((method == 'set') && (a.length >= 4)) || ((method == 'get') && (a.length >= 3))) &&
        ((type == 'text') || (type == 'texts') || (type == 'value') || (type == 'values'))) {
      return DebugJS.ctx._cmdSelect(sel, method, type, val);
    }
    DebugJS.printUsage(tbl.help);
  },
  _cmdSelect: function(sel, method, type, val) {
    try {
      val = eval(val) + '';
      var r = DebugJS.selectOption(sel, method, type, val);
      if (method == 'get') {
        if ((type == 'values') || (type == 'texts')) {
          DebugJS._log.p(r);
        } else {
          DebugJS._log.res(r);
        }
      }
      return r;
    } catch (e) {
      DebugJS._log.e(e);
    }
  },

  cmdSet: function(arg, tbl, echo) {
    var a = DebugJS.splitCmdLine(arg);
    var nm = a[0];
    var v = ((a[1] == undefined) ? '' : a[1]);
    if ((nm == '') || (v == '')) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    DebugJS.ctx._cmdSet(DebugJS.ctx, nm, v, echo);
  },
  _cmdSet: function(ctx, nm, val, echo) {
    var props = ctx.props;
    if (!props[nm]) {
      DebugJS._log.e(nm + ' is invalid property name.');
      return;
    }
    var restriction = ctx.PROPS_RESTRICTION[nm];
    if (restriction) {
      if (!(val + '').match(restriction)) {
        DebugJS._log.e(val + ' is invalid. (' + restriction + ')');
        return;
      }
    }
    var r;
    if (ctx.PROPS_CB[nm]) {
      r = ctx.PROPS_CB[nm](ctx, val);
      if (r != undefined) props[nm] = r;
    }
    props[nm] = (r === undefined ? val : r);
    if (echo) DebugJS._log.res(props[nm]);
  },
  setPropBatContCb: function(ctx, v) {
    var b = DebugJS.ST_BAT_CONT;
    if (DebugJS.bat.isRunning()) {
      if (v == 'on') {
        ctx.status |= b;
      } else {
        ctx.status &= ~b;
      }
    }
  },
  setPropIndentCb: function(ctx, v) {
    DebugJS.INDENT_SP = DebugJS.repeatCh(' ', v);
  },
  setPropPointMsgSizeCb: function(ctx, v) {
    var s;
    try {
      s = eval(v);
    } catch (e) {
      DebugJS._log.e(e);
      return ctx.props.pointmsgsize;
    }
    ctx.props.pointmsgsize = s;
    var area = DebugJS.point.hint.getArea();
    var el = area.pre;
    if (el) DebugJS.setStyle(el, 'font-size', s);
  },
  setPropTimerCb: function(ctx, v) {
    var tm = DebugJS.timestr2struct(v);
    if (ctx.timerSwCdInput) {
      ctx.timerTxtHH.value = tm.hh;
      ctx.timerTxtMI.value = tm.mi;
      ctx.timerTxtSS.value = tm.ss;
      ctx.timerTxtSSS.value = tm.sss;
    }
    return DebugJS.getTimeStr(tm);
  },
  setPropConsoleLogCb: function(ctx, v) {
    DebugJS.setConsoleLogOut((v == 'me'));
  },

  cmdSetAttr: function(arg, tbl) {
    var a = DebugJS.splitArgs(arg);
    var sel = a[0];
    var idx = 0;
    var nm = a[1];
    var vl = a[2];
    if (a[3] != undefined) {
      idx = a[1];
      nm = a[2];
      vl = a[3];
    }
    if ((sel == '') || (nm == undefined) || (vl == undefined)) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var el = DebugJS.getElement(sel, idx);
    if (!el) {
      DebugJS._log.e('Element not found: ' + sel);
      return;
    }
    el.setAttribute(nm, vl);
  },

  cmdSleep: function(arg, tbl) {
    var ms = DebugJS.splitArgs(arg)[0];
    if ((ms == '') || isNaN(ms)) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    DebugJS.sleep(ms);
  },

  cmdTimeCalc: function(arg, echo) {
    var ret = null;
    arg = DebugJS.unifySP(arg.trim());
    if (!arg.match(/^\d{1,}:{1}\d{2}/)) {
      return ret;
    }
    arg = DebugJS.delAllSP(arg);
    var op;
    if (arg.indexOf('-') >= 0) {
      op = '-';
    } else if (arg.indexOf('+') >= 0) {
      op = '+';
    }
    var vals = arg.split(op);
    if (vals.length < 2) {
      return ret;
    }
    var timeL = DebugJS.tmStr2ms(vals[0]);
    var timeR = DebugJS.tmStr2ms(vals[1]);
    if ((timeL == null) || (timeR == null)) {
      ret = 'Invalid time format';
      DebugJS._log.e(ret);
      return ret;
    }
    var byTheDay = (vals[2] == undefined);
    if (op == '-') {
      ret = DebugJS.subTime(timeL, timeR, byTheDay);
    } else {
      ret = DebugJS.addTime(timeL, timeR, byTheDay);
    }
    if (echo) DebugJS._log.res(ret);
    return ret;
  },

  cmdTest: function(arg, tbl) {
    var args = DebugJS.splitCmdLine(arg, 4);
    var op = args[0];
    var test = DebugJS.test;
    var st;
    switch (op) {
      case 'init':
        var nm = DebugJS.getOptVal(arg, 'name');
        try {
          nm = eval(nm);
          test.init(nm);
          DebugJS._log('Test has been initialized.' + (nm == undefined ? '' : ' (' + nm + ')'));
        } catch (e) {
          DebugJS._log.e(e);
        }
        break;
      case 'set':
        DebugJS.ctx._cmdTestSet(arg);
        break;
      case 'count':
        var c = test.data.cnt;
        if (args[1] != '-d') c = test.getSumCount();
        DebugJS._log(test.getCountStr(c));
        break;
      case 'last':
        st = test.getLastResult();
        DebugJS._log(test.getStyledStStr(st));
        return st;
      case 'result':
        DebugJS._log(test.result());
        break;
      case 'ttlresult':
        st = test.getTotalResult();
        DebugJS._log(test.getStyledStStr(st));
        return st;
      case 'status':
        DebugJS._log.p(test.getStatus(), 0, null, false);
        break;
      case 'verify':
        return DebugJS.ctx._CmdTestVerify(arg);
      case 'fin':
        test.fin();
        DebugJS._log('Test completed.');
        break;
      default:
        DebugJS.printUsage(tbl.help);
    }
  },
  _cmdTestSet: function(arg) {
    var test = DebugJS.test;
    var args = DebugJS.splitCmdLine(arg, 3);
    var tgt = args[1];
    var fn;
    switch (tgt) {
      case 'name':
        fn = test.setName;
        break;
      case 'desc':
        fn = test.setDesc;
        break;
      case 'id':
        fn = test.setId;
        break;
      case 'comment':
        fn = test.setCmnt;
        break;
      case 'result':
        DebugJS.ctx._cmdTestSetRslt(DebugJS.getArgsFrom(arg, 2));
        return;
      case 'seq':
        fn = test.setSeq;
        break;
      default:
        DebugJS.printUsage('test set name|desc|id|comment|result|seq val');
        return;
    }
    try {
      var v = eval(args[2]);
      if (v == undefined) v = '';
      fn(v + '');
    } catch (e) {
      DebugJS._log.e(e);
    }
  },
  _CmdTestVerify: function(arg) {
    var a = DebugJS.splitCmdLine(arg);
    var got = a[1];
    var method = a[2];
    var exp = DebugJS.getArgsFrom(arg, 3);
    var label = DebugJS.getOptVal(a, 'label');
    if (label != null) {
      got = a[3];
      method = a[4];
      exp = DebugJS.getArgsFrom(arg, 5);
    }
    return DebugJS.test.verify(got, method, exp, true, label);
  },
  _cmdTestSetRslt: function(a) {
    var st = DebugJS.getArgVal(a, 0);
    var label = DebugJS.getOptVal(a, 'label');
    var info = DebugJS.getOptVal(a, 'info');
    try {
      var inf = eval(info);
    } catch (e) {
      DebugJS._log.e('Illegal info opt: ' + info);return;
    }
    DebugJS.test.setResult(st, label, inf);
  },

  cmdText: function(arg, tbl) {
    var a = DebugJS.splitCmdLine(arg);
    var slctr = a[0];
    var txt = a[1];
    if (txt == undefined) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var speed = DebugJS.getOptVal(arg, 'speed');
    var step = DebugJS.getOptVal(arg, 'step');
    var start = DebugJS.getOptVal(arg, 'start');
    var end = DebugJS.getOptVal(arg, 'end');
    DebugJS.setText(slctr, txt, speed, step, start, end);
  },

  cmdTimeDiff: function(arg, tbl, echo) {
    var a = DebugJS.splitCmdLine(arg);
    var t1 = a[0];
    var t2 = a[1];
    var s1, s2;
    if ((t1 == '') || (t2 == undefined)) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    try {
      if (DebugJS.isUnixTm(t1)) {
        s1 = DebugJS.parseInt(DebugJS.float2ms(t1));
      } else if (DebugJS.isTimeStr(t1)) {
        s1 = DebugJS.getTimeStampOfDay(t1);
        s2 = DebugJS.getTimeStampOfDay(t2);
      } else {
        s1 = eval(t1);
      }
      if (s2 == undefined) {
        if (DebugJS.isUnixTm(t2)) {
          s2 = DebugJS.parseInt(DebugJS.float2ms(t2));
        } else {
          s2 = eval(t2);
        }
      }
      var s = DebugJS.getTimeDurationStr(s1, s2).replace('-', '');
      if (echo) DebugJS._log.res(s);
      return s;
    } catch (e) {
      DebugJS.printUsage(tbl.help);
    }
  },

  cmdTimer: function(arg, tbl) {
    var a = DebugJS.splitArgs(arg);
    var op = a[0];
    var nm = a[1];
    if (nm == undefined) nm = DebugJS.DFLT_TMR_NM;
    switch (op) {
      case 'start':
        DebugJS.time.start(nm);
        break;
      case 'split':
        DebugJS.time._split(nm, false);
        break;
      case 'stop':
        DebugJS.time.end(nm);
        break;
      case 'list':
        DebugJS.time.list();
        break;
      default:
        DebugJS.printUsage(tbl.help);
    }
  },

  cmdTimeStr: function(arg, tbl, echo) {
    if (DebugJS.countArgs(arg) == 0) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var t = arg;
    var s;
    if (DebugJS.isTmStr(t)) {
      s = DebugJS.str2ms(t);
    } else {
      if (DebugJS.isUnixTm(t)) {
        t = DebugJS.float2ms(t);
      }
      t = DebugJS.parseInt(t);
      s = DebugJS.getTimeDurationStr(t);
    }
    if (echo) DebugJS._log.res(s);
    return s;
  },

  cmdStack: function(arg, tbl) {
    var f = arg.trim();
    if (f) {
      DebugJS.stk(f);
    } else {
      DebugJS.printUsage(tbl.help);
    }
  },

  cmdStopwatch: function(arg, tbl) {
    var a = DebugJS.splitArgs(arg);
    var n = 0;
    var op = a[0];
    if (a[0].substr(0, 2) == 'sw') {
      n = a[0].charAt(2) | 0;
      op = a[1];
    }
    var r = -1;
    if ((n == 0) || (n == 1)) {
      r = DebugJS.ctx._cmdStopwatch(op, n);
    } else if (n == 2) {
      r = DebugJS.ctx._cmdStopwatch2(DebugJS.ctx, op);
    }
    if (r == -1) DebugJS.printUsage(tbl.help);
    return r;
  },
  _cmdStopwatch: function(op, n) {
    var stopwatch = DebugJS.stopwatch;
    switch (op) {
      case 'start':
        stopwatch.start(n);
        break;
      case 'stop':
        stopwatch.stop(n);
        break;
      case 'reset':
        stopwatch.reset(n);
        break;
      case 'split':
        stopwatch.split(n);
        break;
      case 'end':
        stopwatch.end(n);
        break;
      case 'val':
        break;
      default:
        return -1;
    }
    var elps = stopwatch.val(n);
    if (op == 'val') DebugJS._log('sw' + n + ': ' + DebugJS.getTmrStr(elps));
    return elps;
  },
  _cmdStopwatch2: function(ctx, op) {
    if (!ctx.isAvailableTools(ctx)) return false;
    switch (op) {
      case 'start':
        DebugJS.stopwatch(2);
        ctx.startTimerStopwatchCd();
        break;
      case 'stop':
        DebugJS.stopwatch(2);
        ctx.stopTimerStopwatchCd();
        break;
      case 'reset':
        DebugJS.stopwatch(2);
        ctx.resetTimerStopwatchCd();
        break;
      case 'split':
        ctx.splitTimerStopwatchCd();
        break;
      case 'end':
        DebugJS.stopwatch(2);
        ctx.endTimerStopwatchCd(ctx);
        break;
      case 'val':
        break;
      default:
        return -1;
    }
    var t = ctx._updateTimerStopwatchCd(ctx);
    if (op == 'val') {
      DebugJS._log(DebugJS.TMR_NM_SW_CD + ': ' + (t < 0 ? '-' : '') + DebugJS.getTmrStr(t));
    }
    return t;
  },

  cmdStrp: function(arg, tbl, echo) {
    var a = DebugJS.splitCmdLine(arg);
    try {
      var t = eval(a[0]).split('');
      var p = eval(a[1]);
    } catch (e) {
      DebugJS.printUsage(tbl.help);return;
    }
    if (!t || (p == undefined)) {
      DebugJS.printUsage(tbl.help);return;
    }
    var f = (typeof p == 'string') ? DebugJS.pIndex : DebugJS.strp;
    var r = f(t, p);
    if (echo) DebugJS._log.res(r);
    return r;
  },

  cmdSw: function() {
    var ctx = DebugJS.ctx;
    ctx.status |= DebugJS.ST_SW;
    if (!(ctx.status & DebugJS.ST_KIOSK)) ctx.kiosk(ctx, 2);
    ctx.launchFnc(ctx, 'tool', 'timer', (ctx.toolTimerMode == DebugJS.TOOL_TMR_MODE_CLOCK) ? 'sw1' : undefined);
    ctx.clearLog();
    setTimeout(ctx.blurCmdLine, 0);
  },
  _cmdSwQ: function(ctx) {
    ctx.closeTools(ctx);
    ctx._cmdKioskQ(ctx);
    ctx.status &= ~DebugJS.ST_SW;
  },

  cmdUnAlias: function(arg, tbl) {
    var nm = DebugJS.splitArgs(arg);
    if (nm[0] == '') {
      DebugJS.printUsage(tbl.help);
      return;
    }
    if (nm[0] == '-a') {
      DebugJS.ctx.CMD_ALIAS = {};
      return;
    }
    var map = DebugJS.ctx.CMD_ALIAS;
    for (var i = 0; i < nm.length; i++) {
      if (map[nm[i]] == undefined) {
        DebugJS._log(nm[i] + ': not found');
      } else {
        delete map[nm[i]];
      }
    }
  },

  cmdUnicode: function(arg, tbl, echo) {
    var iIdx = 0;
    if (DebugJS.hasOpt(arg, 'd') || DebugJS.hasOpt(arg, 'e')) iIdx++;
    return DebugJS.ctx.execEncAndDec(arg, tbl, echo, false, DebugJS.getUnicodePoints, DebugJS.decodeUnicode, iIdx);
  },

  cmdUri: function(arg, tbl, echo) {
    var iIdx = 0;
    if (DebugJS.hasOpt(arg, 'd') || DebugJS.hasOpt(arg, 'e')) iIdx++;
    return DebugJS.ctx.execEncAndDec(arg, tbl, echo, true, DebugJS.encodeUri, DebugJS.decodeUri, iIdx);
  },

  cmdUtf8: function(arg, tbl, echo) {
    try {
      var s = eval(arg);
      if (typeof s == 'string') {
        var bf = DebugJS.UTF8.toByte(s);
        if (echo) DebugJS.ctx._dumpByteSeq(s, bf.length);
        return bf;
      } else {
        DebugJS.printUsage(tbl.help);
      }
    } catch (e) {
      DebugJS._log.e(e);
      DebugJS.printUsage(tbl.help);
    }
  },
  _dumpByteSeq: function(str, len) {
    var s = '';
    var cnt = 0;
    for (var i = 0; i < str.length; i++) {
      var ch = str.charAt(i);
      var a = DebugJS.UTF8.toByte(ch);
      for (var j = 0; j < a.length; j++) {
        var v = a[j];
        s += '[' + DebugJS.strPadding(cnt, ' ', DebugJS.digits(len), 'L') + '] ';
        s += DebugJS.strPadding(v, ' ', 3, 'L') + '  ';
        s += DebugJS.toHex(v, true, true, 2) + '  ';
        s += DebugJS.toBin(v);
        if (j == 0) {
          var d = DebugJS.getCodePoint(ch);
          var rf = '&amp;#' + d + ';';
          s += '  ' + DebugJS.getUnicodePoints(ch);
          s += '  ' + DebugJS.strPadding(rf, ' ', 12, 'L');
          s += '  ' + DebugJS.hlCtrlCh(ch, true);
        }
        s += '\n';
        cnt++;
      }
    }
    DebugJS._log.mlt(s);
  },

  cmdV: function() {
    DebugJS._log(DebugJS.ctx.v);
    return DebugJS.ctx.v;
  },

  cmdVals: function(arg) {
    var ctx = DebugJS.ctx;
    var o = DebugJS.getOptVal(arg, 'c');
    var f = (o == null ? ctx._cmdVals : ctx._cmdValsC);
    f(ctx);
  },
  _cmdVals: function(ctx) {
    var v = '';
    for (var k in ctx.CMDVALS) {
      v += '<tr><td class="dbg-cmdtd">' + k + '</td><td>' + DebugJS.objDump(ctx.CMDVALS[k], false) + '</td></tr>';
    }
    if (v == '') {
      DebugJS._log('no variables');
    } else {
      v = '<table>' + v + '</table>';
      DebugJS._log.mlt(v);
    }
  },
  _cmdValsC: function(ctx) {
    for (var n in ctx.CMDVALS) {
      if (!DebugJS.isSysVal(n)) delete ctx.CMDVALS[n];
    }
  },

  cmdWatchdog: function(arg, tbl) {
    var a = DebugJS.splitArgs(arg);
    var op = a[0];
    var time = a[1];
    switch (op) {
      case 'start':
        DebugJS.wd.start(time);
        break;
      case 'stop':
        DebugJS.wd.stop();
        break;
      default:
        if (DebugJS.ctx.status & DebugJS.ST_WD) {
          DebugJS._log('Running ' + DebugJS.ctx.props.wdt + 'ms: ' + DebugJS.wd.cnt);
        } else {
          DebugJS._log('Not Running');
        }
        DebugJS.printUsage(tbl.help);
    }
  },

  cmdWin: function(arg, tbl) {
    var size = arg.trim();
    switch (size) {
      case 'normal':
      case 'full':
      case 'expand':
      case 'restore':
      case 'reset':
        DebugJS.ctx.setWinSize(size);
        break;
      default:
        DebugJS.printUsage(tbl.help);
    }
  },

  setWinSize: function(opt) {
    var ctx = DebugJS.ctx;
    switch (opt) {
      case 'normal':
        var w = (ctx.initWidth - (DebugJS.WIN_SHADOW / 2) + DebugJS.WIN_BORDER);
        var h = (ctx.initHeight - (DebugJS.WIN_SHADOW / 2) + DebugJS.WIN_BORDER);
        ctx.setDbgWinSize(w, h);
        ctx.sizeStatus = DebugJS.SIZE_ST_NORMAL;
        ctx.updateWinCtrlBtnPanel();
        ctx.scrollLogBtm(ctx);
        break;
      case 'restore':
        if (ctx.sizeStatus != DebugJS.SIZE_ST_NORMAL) {
          ctx.restoreDbgWin();
          ctx.updateWinCtrlBtnPanel();
        }
        break;
      case 'reset':
        ctx.resetDbgWinSizePos();
        break;
      case 'full':
      case 'expand':
        ctx.expandDbgWin(opt);
        ctx.updateWinCtrlBtnPanel();
    }
  },

  cmdXlsCol: function(arg, tbl, echo) {
    if (!arg) {
      DebugJS.printUsage(tbl.help);return;
    }
    arg = arg.trim();
    var op;
    if (arg.indexOf('+') >= 0) {
      op = '+';
    } else if (arg.indexOf('-') >= 0) {
      op = '-';
    } else if (arg.indexOf(' ') >= 0) {
      op = ' ';
    }
    var v = arg.split(op);
    var a = v[0];
    var b = v[1];
    var r = DebugJS.xlsCol(a);
    if (isNaN(a)) {
      if (op == '+') {
        r = DebugJS.xlsCol(r + (b | 0));
      } else if (op == '-') {
        r = DebugJS.xlsCol(r - (b | 0));
      } else if (op == ' ') {
        var c = DebugJS.xlsCol(b);
        r = c - r;
        r = (r < 0 ? (r * (-1)) : r) + 1;
      }
    }
    if (echo) DebugJS._log.res(r);
    return r;
  },

  cmdZoom: function(arg, tbl) {
    var n = arg.trim();
    var zm = DebugJS.ctx.zoom;
    if (n == '') {
      DebugJS._log('ratio=' + zm);
      DebugJS.printUsage(tbl.help);
      return zm;
    } else if (n != zm) {
      DebugJS.zoom(n);
    }
    return n;
  },

  cmdNop: function() {},

  execEncAndDec: function(arg, tbl, echo, esc, encFnc, decFnc, iIdx, a1) {
    if (DebugJS.countArgs(arg) == 0) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var fn = encFnc;
    if (DebugJS.hasOpt(arg, 'd')) {
      fn = decFnc;
    } else if (DebugJS.hasOpt(arg, 'e')) {
      fn = encFnc;
    }
    var i = DebugJS.getOptVal(arg, 'i');
    try {
      if (i == null) {
        i = DebugJS.getArgsFrom(arg, iIdx);
      } else {
        i = eval(i);
      }
      var ret = fn(i, a1);
      var r = (esc ? DebugJS.escHtml(ret) : ret);
      if (echo) DebugJS._log.res(DebugJS.quoteStrIfNeeded(r));
      return ret;
    } catch (e) {
      DebugJS._log.e(e);
    }
  },

  doHttpRequest: function(method, arg, echo) {
    var a = DebugJS.splitCmdLineInTwo(arg);
    var url = a[0];
    var data = a[1];
    var user = '';
    var pass = '';
    var headers = {};
    if (url == '-u') {
      var parts = DebugJS.splitCmdLineInTwo(data);
      var auth = parts[0];
      var auths = auth.split(':');
      if (auths.length > 1) {
        user = auths[0];
        pass = auths[1];
        parts = DebugJS.splitCmdLineInTwo(parts[1]);
        url = parts[0];
        data = parts[1];
        var c = DebugJS.encodeB64(user + ':' + pass);
        headers['Authorization'] = 'Basic ' + c;
      }
    }
    data = DebugJS.encodeURIString(data);
    method = method.toUpperCase();
    var req = 'Sending a request.\n' + method + ' ' + url + '\n' +
    'Body: ' + ((data == '') ? '<span style="color:#ccc">null</span>' : data);
    if (user || pass) {
      req += '\nuser: ' + user + ':' + (pass ? '*' : '');
    }
    if (echo) DebugJS._log(req);
    var request = {
      url: url,
      method: method,
      data: data,
      async: false,
      cache: false,
      user: user,
      pass: pass,
      headers: headers,
      withCredentials: true
    };
    var r;
    DebugJS.http.echo = echo;
    try {
      r = DebugJS.http(request, DebugJS.onHttpReqDone);
    } catch (e) {
      DebugJS._log.e(e);
      var baseURI = document.baseURI;
      var reg = new RegExp('^' + baseURI + '(.*?)');
      if (!url.match(reg)) {
        DebugJS._log.w('Cross-Origin Request\nsource : ' + baseURI + '\nrequest: ' + url);
      }
    }
    return r;
  },

  initExtension: function(ctx) {
    ctx.initExtPanel(ctx);
  },
  initExtPanel: function(ctx) {
    if (ctx.extPanel == null) {
      var bp = ctx.createSubBasePanel(ctx);
      ctx.extPanel = bp.base;
      ctx.extHdrPanel = bp.head;
      ctx.extBodyPanel = bp.body;
      ctx.extBodyPanel.style.overflow = 'auto';
    }
    var pnls = ctx.extPanels;
    if (pnls.length > 0) {
      if (DebugJS.x.pnl.len()) DebugJS.showExtBtn(true);
      for (var i = 0; i < pnls.length; i++) {
        var p = pnls[i];
        if (p) {
          if (p.base == null) ctx.createExtPanel(ctx, p, i);
          DebugJS.x.pnl.addFileLdr(p);
        }
      }
      ctx.redrawExtPanelBtn(ctx);
    }
  },
  redrawExtPanelBtn: function(ctx) {
    for (var i = ctx.extHdrPanel.childNodes.length - 1; i >= 0; i--) {
      ctx.extHdrPanel.removeChild(ctx.extHdrPanel.childNodes[i]);
    }
    var pnls = ctx.extPanels;
    if (pnls.length > 0) {
      for (i = 0; i < pnls.length; i++) {
        var p = pnls[i];
        if ((p != null) && !p.hidden) {
          ctx.extHdrPanel.appendChild(p.btn);
        }
      }
    } else {
      DebugJS.showExtBtn(false);
    }
  },
  createExtPanel: function(ctx, p, idx) {
    p.base = document.createElement('div');
    p.base.className = 'dbg-sbpnl';
    p.btn = ctx.createExtHdrBtn(ctx, p.name, idx);
    if (p.panel) {
      p.base.appendChild(p.panel);
    } else {
      p.panel = p.base;
    }
    if (p.onCreate) p.onCreate(p.panel);
  },

  existsCmd: function(cmd, tbl) {
    for (var i = 0; i < tbl.length; i++) {
      if (tbl[i].cmd == cmd) return true;
    }
    return false;
  }
};

DebugJS.addSubPanel = function(base) {
  var el = DebugJS.ui.addElement(base, 'div');
  el.className = 'dbg-sbpnl';
  return el;
};

DebugJS.addPropSep = function() {
  return '<div class="dbg-sep"></div>';
};
DebugJS.addSysInfoPropH = function(k) {
  return DebugJS.addSysInfo(k + '.');
};
DebugJS.addSysInfoProp = function(k, v, id) {
  var s = '<span style="color:' + DebugJS.ITEM_NM_COLOR + '"> ' + k + '</span>: ';
  if (id == undefined) {
    s += v;
  } else {
    s += '<span' + (id == undefined ? '' : ' id="' + DebugJS.ctx.id + '-' + id + '"') + '>' + v + '</span>';
  }
  s += '\n';
  return s;
};
DebugJS.addSysInfo = function(k, v) {
  return '<span style="color:' + DebugJS.ITEM_NM_COLOR + '">' + k + '</span>' + (v == undefined ? '' : ': ' + v) + '\n';
};

DebugJS.getColorBlock = function(color) {
  var w = DebugJS.ctx.computedFontSize / 2;
  var h = DebugJS.ctx.computedFontSize;
  return '<span style="background:' + color + ';width:' + w + 'px;height:' + h + 'px;display:inline-block"> </span>';
};

DebugJS.getElmHexColor = function(color) {
  var hex = '';
  if (color && (color != 'transparent')) {
    var c10 = color.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
    var c16 = DebugJS.convRGB10to16(c10);
    hex = '#' + c16.r + c16.g + c16.b;
  }
  return hex;
};

DebugJS.RingBuffer = function(len) {
  this.buffer = new Array(len);
  this.len = len;
  this.cnt = 0;
};
DebugJS.RingBuffer.prototype = {
  add: function(data) {
    var idx = this.cnt % this.len;
    this.buffer[idx] = data;
    this.cnt++;
  },
  set: function(idx, data) {
    this.buffer[idx] = data;
  },
  get: function(idx) {
    if (this.len < this.cnt) {
      idx += this.cnt;
    }
    idx %= this.len;
    return this.buffer[idx];
  },
  getAll: function() {
    var buf = [];
    var len = this.len;
    var pos = 0;
    if (this.cnt > len) {
      pos = (this.cnt % len);
    }
    for (var i = 0; i < len; i++) {
      if (pos >= len) {
        pos = 0;
      }
      if (this.buffer[pos] == undefined) {
        break;
      } else {
        buf[i] = this.buffer[pos];
        pos++;
      }
    }
    return buf;
  },
  clear: function() {
    this.buffer = new Array(this.len);
    this.cnt = 0;
  },
  count: function() {
    return this.cnt;
  },
  size: function() {
    return this.len;
  },
  lastIndex: function() {
    return ((this.cnt - 1) % this.len);
  }
};

DebugJS.TextBuffer = function(s) {
  this.b = (s == undefined ? '' : s + '\n');
};
DebugJS.TextBuffer.prototype = {
  add: function(s) {
    this.b += s + '\n';
  },
  toString: function() {
    return this.b;
  }
};

DebugJS.getCmdValName = function(v, pfix, head) {
  var m = pfix + '\\{(.+?)\\}';
  if (head) m = '^' + m;
  var re = new RegExp(m);
  var r = re.exec(v);
  if (r == null) return null;
  var idx = r.index;
  if ((idx > 0) && ((v.charAt(idx - 1) == '\\'))) {
    return null;
  }
  return r[1];
};
DebugJS.replaceCmdVals = function(s) {
  s = DebugJS._replaceCmdVals(s, true);
  s = DebugJS._replaceCmdVals(s);
  return s;
};
DebugJS._replaceCmdVals = function(s, il) {
  var prevN;
  var pfix = (il ? '%' : '\\$');
  while (true) {
    var name = DebugJS.getCmdValName(s, pfix);
    if (name == null) return s;
    if (name == prevN) {
      DebugJS._log.e('(bug) replaceCmdVals(): ' + name);
      return s;
    }
    prevN = name;
    var reNm = name;
    if (name == '?') reNm = '\\?';
    var re = new RegExp(pfix + '\\{' + reNm + '\\}', 'g');
    var r;
    if (il) {
      r = DebugJS.ctx.CMDVALS[name] + '';
    } else {
      r = 'DebugJS.ctx.CMDVALS[\'' + name + '\']';
    }
    s = s.replace(re, r);
  }
};

// " 1  2 3  4 " -> [0]="1" [1]="2" [2]="3" [3]="4"
DebugJS.splitArgs = function(arg) {
  return DebugJS.unifySP(arg.trim()).split(' ');
};
// ' 1 "abc" "d ef"  "g\"hi" 2 ("jkl" + 3) 4 '
// -> [0]=1 [1]="abc" [2]="d ef" [3]="g\"hi" [4]=2 [5]=("jkl" + 3) [6]=4
DebugJS.splitCmdLine = function(arg, limit) {
  var args = [];
  var start = 0;
  var len = 0;
  var srch = true;
  var quoted = null;
  var paren = 0;
  var ch = '';
  var str = '';
  limit = (limit == undefined ? 0 : limit);
  for (var i = 0; i < arg.length; i++) {
    len++;
    ch = arg.charAt(i);
    switch (ch) {
      case ' ':
        if (srch || quoted || (paren > 0)) {
          continue;
        } else {
          srch = true;
          str = arg.substr(start, len);
          args.push(str);
          if (args.length + 1 == limit) {
            if (i < arg.length - 1) {
              start = i + 1;
              len = arg.length - start;
              str = arg.substr(start, len);
              args.push(str);
              i = arg.length;
            }
          }
        }
        break;
      case '(':
        if (srch) {
          start = i;
          len = 0;
          srch = false;
        }
        if (!quoted) {
          paren++;
        }
        break;
      case ')':
        if (srch) {
          start = i;
          len = 0;
          srch = false;
        } else if (paren > 0) {
          if ((i > 0) && (arg.charAt(i - 1) == '\\')) {
            continue;
          }
          paren--;
        }
        break;
      case '"':
      case "'":
        if (paren > 0) {
          continue;
        } else if (srch) {
          start = i;
          len = 0;
          srch = false;
          quoted = ch;
        } else if (ch == quoted) {
          if ((i > 0) && (arg.charAt(i - 1) == '\\')) {
            continue;
          }
          quoted = null;
        }
        break;
      default:
        if (srch) {
          start = i;
          len = 0;
          srch = false;
        }
    }
  }
  len++;
  if (!srch) {
    str = arg.substr(start, len);
    args.push(str);
  }
  if (args.length == 0) {
    args = [''];
  }
  return args;
};
// " 1  2 3  4 " -> [0]="1" [1]=" 2 3  4 "
DebugJS.splitCmdLineInTwo = function(s) {
  var r = [];
  s = DebugJS.delLeadingSP(s);
  var two = DebugJS.splitCmdLine(s);
  if (two.length == 1) {
    r[0] = two[0];
    r[1] = '';
  } else {
    r[0] = two[0];
    r[1] = s.substr(two[0].length + 1);
  }
  return r;
};
// " 1  2  3  4 " (2)-> " 3  4 "
DebugJS.getArgsFrom = function(s, n) {
  var r = s;
  for (var i = 0; i < n; i++) {
    r = DebugJS.splitCmdLineInTwo(r)[1];
  }
  return r;
};
DebugJS.countArgs = function(a) {
  var b = DebugJS.splitCmdLine(a);
  var c = b.length;
  if (b[0] == '') c = 0;
  return c;
};
DebugJS.getArgVal = function(a, idx) {
  return DebugJS.splitCmdLine(a)[idx];
};
DebugJS.getOptVal = function(args, opt) {
  var v = DebugJS.getOptVals(args);
  return (v[opt] == undefined ? null : v[opt]);
};
DebugJS.getOptVals = function(args) {
  var i, k, v;
  var o = {'': []};
  if (typeof args == 'string') {
    args = DebugJS.splitCmdLine(args);
  }
  for (i = 0; i < args.length; i++) {
    if ((args[i].charAt(0) == '-') && ((k = args[i].substring(1)) != '')) {
      if ((args[i + 1] != undefined) && (args[i + 1].charAt(0) != '-')) {
        i++;
        v = args[i];
      } else {
        v = '';
      }
      o[k] = v;
    } else {
      o[''].push(args[i]);
    }
  }
  return o;
};
DebugJS.hasOpt = function(arg, opt) {
  var b = false;
  var v = DebugJS.getOptVal(arg, opt);
  if (opt == '') {
    if (v.length > 0) b = true;
  } else {
    if (v != null) b = true;
  }
  return b;
};
DebugJS.indexOfOptVal = function(a, o) {
  var r = -1;
  var i = a.indexOf(o);
  if (i >= 0) {
    r = i + o.length + 1;
  }
  return r;
};
DebugJS.countOpts = function(args) {
  var i = 0;
  var o = DebugJS.getOptVals(args);
  for (var k in o) {
    if (k) i++;
  }
  return i;
};
DebugJS.get1stOpt = function(args) {
  var o = DebugJS.getOptVals(args);
  for (var k in o) {
    if (k) return k;
  }
  return null;
};
DebugJS.getNonOptVals = function(args, all) {
  var a = DebugJS.splitCmdLine(args);
  var v = [];
  if (a[0] == '') return v;
  var pv = '';
  for (var i = 0; i < a.length; i++) {
    if (a[i].charAt(0) != '-') {
      if (all || (pv.charAt(0) != '-')) {
        v.push(a[i]);
      }
    }
    pv = a[i];
  }
  return v;
};
DebugJS.getQuotedStr = function(str) {
  var r = null;
  var start = 0;
  var len = 0;
  var srch = true;
  var quoted = null;
  var ch = '';
  for (var i = 0; i < str.length; i++) {
    len++;
    ch = str.charAt(i);
    if ((ch == '"') || (ch == "'")) {
      if (srch) {
        start = i;
        len = 0;
        srch = false;
        quoted = ch;
      } else if (ch == quoted) {
        if ((i > 0) && (str.charAt(i - 1) == '\\')) {
          continue;
        }
        r = str.substr(start + 1, len - 1);
        break;
      }
    }
  }
  return r;
};

DebugJS.getJsonPos = function(s) {
  var pos = {
    open: -1,
    close: -1
  };
  var closeCh = '';
  for (var i = 0; i < s.length; i++) {
    if (pos.open == -1) {
      if (s[i] == '{') {
        pos.open = i;
        closeCh = '}';
      } else if (s[i] == '[') {
        pos.open = i;
        closeCh = ']';
      }
    } else {
      if (s[i] == closeCh) {
        pos.close = i;
      }
    }
  }
  return pos;
};

DebugJS.encodeEsc = function(s) {
  return s.replace(/\\/g, '\\\\');
};
DebugJS.decodeEsc = function(s) {
  return s.replace(/\\\\/g, '\\');
};

DebugJS.isNumeric = function(ch) {
  var c = ch.charCodeAt();
  return ((c >= 0x30) && (c <= 0x39));
};
DebugJS.isAlphabetic = function(ch) {
  var c = ch.charCodeAt();
  return (((c >= 0x41) && (c <= 0x5A)) || ((c >= 0x61) && (c <= 0x7A)));
};
DebugJS.isUpperCase = function(ch) {
  var c = ch.charCodeAt();
  return ((c >= 0x41) && (c <= 0x5A));
};
DebugJS.isLowerCase = function(ch) {
  var c = ch.charCodeAt();
  return ((c >= 0x61) && (c <= 0x7A));
};
DebugJS.isPunctuation = function(ch) {
  var c = ch.charCodeAt();
  if (((c >= 0x20) && (c <= 0x2F)) || ((c >= 0x3A) && (c <= 0x40)) ||
      ((c >= 0x5B) && (c <= 0x60)) || ((c >= 0x7B) && (c <= 0x7E))) {
    return true;
  }
  return false;
};
DebugJS.isNumAlpha = function(ch) {
  return (DebugJS.isNumeric(ch) || DebugJS.isAlphabetic(ch));
};
DebugJS.isTypographic = function(ch) {
  return (DebugJS.isNumAlpha(ch) || DebugJS.isPunctuation(ch));
};
DebugJS.isNum = function(s) {
  return (s.match(/^\d+$/) ? true : false);
};
DebugJS.wBOM = function(s) {
 return s.charCodeAt(0) == 65279;
};

DebugJS.getContentType = function(mime, file, dturlData) {
  var t = '';
  var ext = ['bat', 'csv', 'ini', 'java', 'js', 'json', 'log', 'md'];
  var re = '';
  for (var i = 0; i < ext.length; i++) {
    if (i > 0) {re += '|';} re += '.' + ext[i] + '$';
  }
  if (mime) {
    if (mime.match(/image\//)) {
      t = 'image';
    } else if (mime.match(/text\//)) {
      t = 'text';
    }
  } else if (file) {
    if (file.type.match(/image\//)) {
      t = 'image';
    } else if ((file.type.match(/text\//)) || ((new RegExp(re)).test(file.name)) || (DebugJS.Base64.getMimeType(dturlData).subtype == 'xml')) {
      t = 'text';
    }
  }
  return t;
};

DebugJS.KEYCH = {
  Spacebar: ' ',
  Enter: '\n',
  Add: '+',
  Subtract: '-',
  Multiply: '*',
  Divide: '/',
  Del: '.'
};
DebugJS.key2ch = function(k) {
  return (DebugJS.KEYCH[k] == undefined ? k : DebugJS.KEYCH[k]);
};
DebugJS.unifySP = function(s) {
  return s.replace(/\s{2,}/g, ' ');
};
DebugJS.delAllSP = function(s) {
  return s.replace(/\s/g, '');
};
DebugJS.delLeadingSP = function(s) {
  return s.replace(/^\s{1,}/, '');
};
DebugJS.delTrailingSP = function(s) {
  return s.replace(/\s+$/, '');
};
DebugJS.delAllNL = function(s) {
  return s.replace(/\r/g, '').replace(/\n/g, '');
};
DebugJS.quoteStr = function(s) {
  return '<span style="color:#0ff">"</span>' + s + '<span style="color:#0ff">"</span>';
};
DebugJS.quoteStrIfNeeded = function(s) {
  s += '';
  if (s.match(/^\s|^&#x3000/) || s.match(/\s$|&#x3000$/)) {
    s = DebugJS.quoteStr(s);
  }
  return s;
};
DebugJS.escEncString = function(s) {
  s = DebugJS.escHtml(s);
  s = DebugJS.quoteStr(s);
  return s;
};
DebugJS.retTxtByN = function(s, n) {
  if (n == 0) return s;
  var r = '';
  for (var i = 0; i < s.length; i += n) {
    r += s.substr(i, n) + '\n';
  }
  return r;
};

DebugJS.styleVal = function(v) {
  var s = v;
  if (typeof s == 'string') {
    s = DebugJS.quoteStr(DebugJS.escHtml(s));
  } else {
    s = DebugJS.setStyleIfObjNA(s);
  }
  return s;
};

DebugJS.getDateTime = function(dt) {
  if ((dt == undefined) || (dt === '')) {
    dt = new Date();
  } else if (!(dt instanceof Date)) {
    dt = new Date(dt);
  }
  var time = dt.getTime();
  var offset = dt.getTimezoneOffset();
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
  var dateTime = {time: time, offset: offset, yyyy: yyyy, mm: mm, dd: dd, hh: hh, mi: mi, ss: ss, sss: ms, wday: wd};
  return dateTime;
};
DebugJS.getDateTimeIso = function(s) {
  var p = s.split('T');
  var d = p[0];
  var t = p[1];
  var yyyy = d.substr(0, 4);
  var mm = d.substr(4, 2);
  var dd = d.substr(6, 2);
  var hh = (t.substr(0, 2) + '00').substr(0, 2);
  var mi = (t.substr(2, 2) + '00').substr(0, 2);
  var ss = (t.substr(4, 2) + '00').substr(0, 2);
  var sss = (t.substr(7, 3) + '000').substr(0, 3);
  var dt = new Date(yyyy, (mm | 0) - 1, dd, hh, mi, ss, sss);
  return DebugJS.getDateTime(dt);
};
DebugJS.getDateTimeEx = function(s) {
  if (DebugJS.isDateTimeFormatIso(s)) {
    return DebugJS.getDateTimeIso(s);
  }
  if (typeof s == 'string') {
    s = s.replace(/-/g, '/');
    var dec = s.split('.');
    if (dec.length > 0) s = dec[0];
    s = (new Date(s)).getTime();
    if (dec.length > 0) s += (dec[1] | 0);
  }
  return DebugJS.getDateTime(s);
};
DebugJS.now = function() {
  return (new Date()).getTime();
};
DebugJS.date = function(val, iso) {
  val = (val + '').trim();
  var showTS = true;
  var dt;
  var ts = val;
  var tz = DebugJS.getLocalTimeOffsetStr();
  var idx = val.lastIndexOf(' ');
  if (val == '') {
    ts = DebugJS.now();
  } else if (ts.charAt(ts.length - 1) == 'Z') {
    ts = ts.substr(0, ts.length - 1);
    tz = '+0000';
  } else if (idx > 0) {
    var _tz = val.substr(idx + 1);
    if (DebugJS.isTZOffsetStr(_tz)) {
      ts = val.substr(0, idx);
      tz = _tz;
    }
    showTS = isNaN(ts);
  } else if (DebugJS.isTZOffsetStr(val)) {
    tz = val;
    ts = DebugJS.now();
  } else if (!isNaN(ts)) {
    showTS = false;
  }
  if (isNaN(ts)) {
    if (DebugJS.isDateTimeFormatIso(ts)) {
      dt = DebugJS.getDateTimeIso(ts);
    } else {
      ts = ts.replace(/(\d{4})-(\d{1,})-(\d{1,})/g, '$1/$2/$3');
      dt = DebugJS.getDateTime(ts);
    }
    var loc = DebugJS.jsTzOffset2ms(dt.offset);
    var tgt = DebugJS.tzOffset2ms(tz);
    var df = loc - tgt;
    ts = dt.time + df;
  }
  return DebugJS._date(ts, tz, iso, showTS);
};
DebugJS._date = function(ts, tz, iso, showTS) {
  var s = DebugJS.int2DateStr(ts, tz, iso);
  if (showTS) s += ' (' + ts + ')';
  return s;
};
DebugJS.int2DateStr = function(val, tz, iso) {
  tz = DebugJS.toFullTz(tz);
  val += '';
  if (DebugJS.isUnixTm(val)) {
    val = DebugJS.float2ms(val);
  }
  val = DebugJS.parseInt(val);
  var dt = new Date(val);
  var s = DebugJS.getTZedDateTimeStr(dt, tz, iso);
  s += (iso ? tz : ' ' + DebugJS.toClocklikeStr(tz));
  return s;
};
DebugJS.float2ms = function(t) {
  var v = t.split('.');
  return v[0] + (v[1] + '000').substr(0, 3);
};
DebugJS.diffDate = function(d1, d2) {
  var dt1 = DebugJS.getDateTime(d1);
  var dt2 = DebugJS.getDateTime(d2);
  return (dt2.time - dt1.time) / 86400000;
};
DebugJS.isDateFormat = function(s, p) {
  if (s == null) return false;
  var r = '^\\d{4}[-/]\\d{1,2}[-/]\\d{1,2}';
  return DebugJS._isDTFmt(s, p, r);
};
DebugJS.isBasicDateFormat = function(s, p) {
  if (s == null) return false;
  var r = '^\\d{4}[0-1][0-9][0-3][0-9]';
  return DebugJS._isDTFmt(s, p, r);
};
DebugJS.isDateTimeFormat = function(s, p) {
  if (s == null) return false;
  var r = '^\\d{4}[-/]\\d{1,2}[-/]\\d{1,2} {1,}\\d{1,2}:\\d{2}:?\\d{0,2}.?\\d{0,3}';
  return DebugJS._isDTFmt(s, p, r);
};
DebugJS.isDateTimeFormatIso = function(s, p) {
  if (typeof s != 'string') return false;
  var r = '^\\d{8}T\\d{0,6}.?\\d{0,3}';
  return DebugJS._isDTFmt(s, p, r);
};
DebugJS._isDTFmt = function(s, p, r) {
  if (!p) r += '$';
  return (s.match(new RegExp(r)) ? true : false);
};
DebugJS.isTimeFormat = function(s) {
  return ((s.match(/^\d{8}T\d{4,6}$/)) || (s.match(/^T[\d*]{4,6}$/))) ? true : false;
};
DebugJS.num2date = function(s) {
  var d = null;
  if (DebugJS.isBasicDateFormat(s)) {
    d = s.substr(0, 4) + '/' + s.substr(4, 2) + '/' + s.substr(6, 2);
  }
  return d;
};
DebugJS.today = function(s) {
  return DebugJS.getDateStr(DebugJS.getDateTime(), (s === undefined ? '-' : s));
};
DebugJS.getDateTimeStr = function(t, w, iso) {
  var d = DebugJS.getDateTime(t);
  if (iso) return d.yyyy + d.mm + d.dd + 'T' + d.hh + d.mi + d.ss + '.' + d.sss;
  return d.yyyy + '-' + d.mm + '-' + d.dd + (w ? ' ' + DebugJS.WDAYS[d.wday] : '') + ' ' + d.hh + ':' + d.mi + ':' + d.ss + '.' + d.sss;
};
DebugJS.getDateStr = function(d, s) {
  return d.yyyy + s + d.mm + s + d.dd;
};
DebugJS.getTimeStr = function(d) {
  if (!isNaN(d)) d = DebugJS.getDateTime(d);
  return d.hh + ':' + d.mi + ':' + d.ss + '.' + d.sss;
};
DebugJS.getTmrStr = function(ms) {
  var t = DebugJS.ms2struct(ms, true);
  return t.hh + ':' + t.mi + ':' + t.ss + '.' + t.sss;
};
DebugJS.ms2struct = function(ms, fmt) {
  var wk = ms;
  var sign = false;
  if (ms < 0) {
    sign = true;
    wk *= (-1);
  }
  var d = (wk / 86400000) | 0;
  var hh = 0;
  if (wk >= 3600000) {
    hh = (wk / 3600000) | 0;
    wk -= (hh * 3600000);
  }
  var mi = 0;
  if (wk >= 60000) {
    mi = (wk / 60000) | 0;
    wk -= (mi * 60000);
  }
  var ss = (wk / 1000) | 0;
  var sss = wk - (ss * 1000);
  var tm = {
    sign: sign,
    d: d,
    hr: hh - d * 24,
    hh: hh,
    mi: mi,
    ss: ss,
    sss: sss
  };
  if (fmt) {
    if (tm.hh < 10) tm.hh = '0' + tm.hh;
    if (tm.mi < 10) tm.mi = '0' + tm.mi;
    if (tm.ss < 10) tm.ss = '0' + tm.ss;
    if (tm.sss < 10) {
      tm.sss = '00' + tm.sss;
    } else if (tm.sss < 100) {
      tm.sss = '0' + tm.sss;
    }
  }
  return tm;
};
DebugJS.timestr2struct = function(str) {
  var wk = str.split(':');
  var h = wk[0];
  var mi = (wk[1] == undefined ? '' : wk[1]);
  var s = (wk[2] == undefined ? '' : wk[2]);
  var ss = s.split('.')[0];
  var sss = s.split('.')[1];
  if (sss == undefined) sss = '';
  mi = DebugJS.nan2zero(mi);
  ss = DebugJS.nan2zero(ss);
  sss = DebugJS.nan2zero(sss);
  var st = {
    hh: DebugJS.nan2zero(h),
    mi: ('00' + mi).slice(-2),
    ss: ('00' + ss).slice(-2),
    sss: ('000' + sss).slice(-3)
  };
  return st;
};
DebugJS.getTimeOffsetStr = function(v, e) {
  var s = '-';
  if (v <= 0) {
    v *= (-1);
    s = '+';
  }
  var h = (v / 60) | 0;
  var m = v - h * 60;
  var str = s + ('0' + h).slice(-2) + ('0' + m).slice(-2);
  if (e) str = DebugJS.toClocklikeStr(str);
  return str;
};
DebugJS.getLocalTimeOffsetStr = function() {
  return DebugJS.getTimeOffsetStr(new Date().getTimezoneOffset());
};
DebugJS.getTimeDurationStr = function(t1, t2) {
  if (isNaN(t1)) t1 = DebugJS.getDateTimeEx(t1).time;
  var ms = t1;
  if (t2 != undefined) {
    if (isNaN(t2)) t2 = DebugJS.getDateTimeEx(t2).time;
    ms = t2 - t1;
  }
  var t = DebugJS.ms2struct(ms);
  var s = (t.sign ? '-' : '');
  if (t.d) s += t.d + 'd ';
  if (t.d || t.hr) s += t.hr + 'h ';
  if (t.d || t.hr || t.mi) s += t.mi + 'm ';
  if (t.d || t.hr || t.mi || t.ss) {
    s += t.ss + 's';
    if (t.sss) s += ' ' + t.sss + 'ms';
  } else {
    if (t.sss) {
      s += '0.' + ('00' + t.sss).slice(-3).replace(/0+$/, '');
    } else {
      s += '0';
    }
    s += 's';
  }
  return s;
};
DebugJS.getTimeStampOfDay = function(t, d) {
  if (!d) d = DebugJS.getDateTime();
  if (t.indexOf(':') == 1) t = '0' + t;
  t = t.replace(/:/g, '').replace(/\./g, '');
  var hh = t.substr(0, 2);
  var mi = t.substr(2, 2);
  var ss = t.substr(4, 2);
  var sss = t.substr(6, 3);
  if (ss == '') ss = '00';
  if (sss == '') sss = '000';
  return DebugJS.getTime(d.yyyy, d.mm, d.dd, hh, mi, ss, sss);
};
DebugJS.calcTargetTime = function(tgt) {
  var yyyy, mm, dd, t1;
  var now = DebugJS.getDateTime();
  var dt = tgt.split('T');
  var date = dt[0];
  var t = dt[1];
  if (t.match(/\*/)) {
    return DebugJS.calcNextTime2(now, tgt).time - now.time;
  }
  var hh = t.substr(0, 2);
  var mi = t.substr(2, 2);
  var ss = t.substr(4, 2);
  if (ss == '') ss = '00';
  if (date == '') {
    yyyy = now.yyyy;
    mm = now.mm;
    dd = now.dd;
    tgt = DebugJS.getDateTime(now.yyyy + '/' + now.mm + '/' + now.dd + ' ' + hh + ':' + mi + ':' + ss);
    if (now.time > tgt.time) {
      t1 = tgt.time + 86400000;
    } else {
      t1 = tgt.time;
    }
  } else {
    yyyy = date.substr(0, 4);
    mm = date.substr(4, 2);
    dd = date.substr(6, 2);
    var sd = yyyy + '/' + mm + '/' + dd + ' ' + hh + ':' + mi + ':' + ss;
    t1 = (new Date(sd)).getTime();
  }
  return (t1 - now.time);
};
DebugJS.calcNextTime = function(times) {
  var now = DebugJS.getDateTime();
  var ts = times.split('|');
  ts.sort();
  var ret = {t: ts[0]};
  if (ts[0].match(/\*/)) return DebugJS.calcNextTime2(now, ts[0]);
  for (var i = 0; i < ts.length; i++) {
    var t = ts[i];
    t = t.replace(/T/, '');
    var tgt = DebugJS.getTimeStampOfDay(t, now);
    if (i == 0) ret.time = tgt;
    if (now.time <= tgt) {
      ret.t = ts[i];
      ret.time = tgt;
      return ret;
    }
  }
  ret.t = ts[0];
  ret.time += 86400000;
  return ret;
};
DebugJS.calcNextTime2 = function(now, t) {
  var h = t.substr(1, 2), m = t.substr(3, 2), s = t.substr(5, 2);
  var hh = ((h == '**') ? now.hh : h);
  var mi = m;
  if (m == '**') {
    mi = ((hh == now.hh) ? now.mi : 0);
  }
  var ss = s;
  if (s == '') {
    ss = 0;
  } else if (s == '**') {
    ss = (((hh == now.hh) && (mi == now.mi)) ? now.ss : 0);
  }
  hh |= 0;mi |= 0;ss |= 0;
  var d = DebugJS.getTime(now.yyyy, now.mm, now.dd, hh, mi, ss);
  var cf = 1;
  if (d < now.time) {
    if (s == '**') {
      ss++;
      if (ss < 60) {
        cf = 0;
      } else {
        ss = 0;
        cf = 1;
      }
    }
    if ((m == '**') && (cf)) {
      mi++;
      if (mi < 60) {
        cf = 0;
      } else {
        mi = 0;
        cf = 1;
      }
    }
    if ((h == '**') && (cf)) {
      hh++;
      if (hh < 24) {
        cf = 0;
      } else {
        hh = 0;
        cf = 1;
      }
    }
    d = DebugJS.getTime(now.yyyy, now.mm, (now.dd | 0) + cf, hh, mi, ss);
    if (d < now.time) {
      cf = 1;
      if (s == '**') ss = 0;
      if (m == '**') mi = 0;
      if (h == '**') {
        if (s == '**') {
          hh++;
          if (hh < 24) {
            cf = 0;
          } else {
            hh = 0;
            cf = 1;
          }
        } else {
          hh = 0;
        }
      }
      d = DebugJS.getTime(now.yyyy, now.mm, (now.dd | 0) + cf, hh, mi, ss);
    }
  }
  var ret = {
    t: 'T' + ('0' + hh).slice(-2) + ('0' + mi).slice(-2) + (s == '' ? '' : ('0' + ss).slice(-2)),
    time: d
  };
  return ret;
};
DebugJS.getTime = function(y, m, d, h, mi, s, ms) {
  y |= 0;
  m |= 0;
  d |= 0;
  h |= 0;
  mi |= 0;
  s |= 0;
  m |= 0;
  return (new Date(y, m - 1, d, h, mi, s, ms)).getTime();
};
DebugJS.parseToMillis = function(v) {
  var d = 0, h = 0, m = 0, s = 0;
  var a = v.split('d');
  if (a.length > 1) {
    d = a[0];
    v = a[1];
  } else {
    v = a[0];
  }
  a = v.split('h');
  if (a.length > 1) {
    h = a[0];
    v = a[1];
  } else {
    v = a[0];
  }
  a = v.split('m');
  if (a.length > 1) {
    m = a[0];
    v = a[1];
  } else {
    v = a[0];
  }
  a = v.split('s');
  if (a.length > 1) {
    s = a[0];
  }
  return (d * 86400000 + h * 3600000 + m * 60000 + s * 1000) | 0;
};

DebugJS.nan2zero = function(v) {
  return (isNaN(v) ? 0 : v);
};

DebugJS.checkModKey = function(e) {
  var ctrl = e.ctrlKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACT;
  var shift = e.shiftKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACT;
  var alt = e.altKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACT;
  var meta = e.metaKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACT;
  var metaKey = '<span style="color:' + ctrl + '">C</span><span style="color:' + shift + '">S</span><span style="color:' + alt + '">A</span><span style="color:' + meta + '">M</span>';
  return metaKey;
};

DebugJS._cmdP = function(_arg, _tbl) {
  var _obj;
  var _jsn = false;
  var _dmpLmt = DebugJS.ctx.props.dumplimit;
  var _vlLen = DebugJS.ctx.props.dumpvallen;
  var _lvLmt = 0;
  var _opt = DebugJS.getOptVals(_arg);
  for (var _k in _opt) {
    if ((_k == '') && (_opt[_k].length > 0)) {
      _obj = _opt[_k][0];
    }
    var _lv = _k.match(/l(\d+)/);
    if (_lv != null) {
      _lvLmt = _lv[1];
      if (!_obj) _obj = _opt[_k];
    }
    if (_k == 'json') {
      _jsn = true;
      if (!_obj) _obj = _opt[_k];
    }
    if (_k == 'a') {
      _dmpLmt = _vlLen = 0;
      if (!_obj) _obj = _opt[_k];
    }
  }
  if (!_obj) {
    DebugJS.printUsage(_tbl.help);
    return;
  }
  var _cl = 'DebugJS._$=DebugJS.objDump(' + _obj + ', ' + _jsn + ', ' + _lvLmt + ', ' + _dmpLmt + ', ' + _vlLen + ');';
  try {
    eval(_cl);
    DebugJS._log.mlt(DebugJS._$);
    return DebugJS.html2text(DebugJS._$);
  } catch (e) {
    DebugJS._log.e(e);
  }
};

DebugJS.INDENT_SP = ' ';
DebugJS.objDump = function(obj, toJson, levelLimit, limit, valLenLimit) {
  if (levelLimit == undefined) levelLimit = 0;
  if (limit == undefined) limit = DebugJS.ctx.props.dumplimit;
  if (valLenLimit == undefined) valLenLimit = 0;
  var arg = {lv: 0, cnt: 0, dump: ''};
  if (typeof obj == 'function') {
    arg.dump += (toJson ? 'function' : '<span style="color:#4c4">function</span>') + '()\n';
  }
  var ret = DebugJS._objDump(obj, arg, toJson, levelLimit, limit, valLenLimit);
  if ((limit > 0) && (ret.cnt > limit)) {
    DebugJS._log.w('The object is too large. (>=' + ret.cnt + ')');
  }
  ret.dump = ret.dump.replace(/: {2,}\{/g, ': {');
  ret.dump = ret.dump.replace(/\[\n {2,}\]/g, '[]');
  return ret.dump;
};
DebugJS._objDump = function(obj, arg, toJson, levelLimit, limit, valLenLimit) {
  var SNIP = (toJson ? '...' : '<span style="color:#aaa">...</span>');
  var sibling = 0;
  var dt, date;
  try {
    if ((levelLimit > 0) && (arg.lv > levelLimit)) return arg;
    if ((limit > 0) && (arg.cnt > limit)) {
      if ((typeof obj != 'function') || (Object.keys(obj).length > 0)) {
        arg.dump += SNIP; arg.cnt++;
      }
      return arg;
    }
    var indent = '';
    for (var i = 0; i < arg.lv; i++) {
      indent += DebugJS.INDENT_SP;
    }
    if ((obj instanceof Array) || (obj instanceof Set)) {
      arg.cnt++;
      var len = ((obj instanceof Set) ? obj.size : obj.length);
      if (toJson) {
        arg.dump += '[';
        if (len > 0) {
          arg.dump += '\n';
        }
      } else {
        if (obj instanceof Set) {
          arg.dump += '<span style="color:#6cf">[Set][' + len + ']</span>';
        } else {
          arg.dump += '<span style="color:#d69">[Array][' + len + ']</span>';
        }
      }
      if ((levelLimit == 0) || ((levelLimit >= 1) && (arg.lv < levelLimit))) {
        var avil = true;
        for (i = 0; i < len; i++) {
          arg.lv++; indent += DebugJS.INDENT_SP;
          var v = obj[i];
          if (obj instanceof Set) {
            try {
              var it = obj.entries();
              for (var j = 0; j <= i; j++) {
                v = it.next().value[0];
              }
            } catch (e) {avil = false;}
          }
          if (toJson) {
            if (sibling > 0) {
              arg.dump += ',\n';
            }
            if ((typeof v == 'number') || (typeof v == 'string') || (typeof v == 'boolean') || (v instanceof Array)) {
              arg.dump += indent;
            }
          } else {
            arg.dump += '\n' + indent + '[' + i + '] ';
          }
          if (avil) {
            arg = DebugJS._objDump(v, arg, toJson, levelLimit, limit, valLenLimit);
          } else {
            arg.dump += 'N/A';
          }
          arg.lv--; indent = indent.replace(DebugJS.INDENT_SP, '');
          sibling++;
        }
      }
      if (toJson) {
        if (sibling > 0) {
          arg.dump += '\n';
        }
        if (len > 0) {
          if ((levelLimit >= 1) && (arg.lv >= levelLimit)) {
            arg.dump += indent + DebugJS.INDENT_SP + SNIP + '\n';
          }
          arg.dump += indent;
        }
        arg.dump += ']';
      }
    } else if (obj instanceof Object) {
      arg.cnt++;
      if (DebugJS.isObj(obj)) {
        if (toJson) {
          arg.dump += indent;
        } else {
          arg.dump += '<span style="color:#49f">[Object]</span> ';
        }
        if (toJson || (levelLimit == 0) || ((levelLimit >= 1) && (arg.lv < levelLimit))) {
          arg.dump += '{\n';
        }
      }
      if ((levelLimit == 0) || ((levelLimit >= 1) && (arg.lv < levelLimit))) {
        indent += DebugJS.INDENT_SP;
        for (var key in obj) {
          if (sibling > 0) {
            if (toJson) {
              arg.dump += ',';
            }
            arg.dump += '\n';
          }
          if (typeof obj[key] == 'function') {
            arg.dump += indent + (toJson ? 'function' : '<span style="color:#4c4">function</span>');
            if (obj[key].toString().match(/\[native code\]/)) {
              arg.dump += ' [native]';
            }
            arg.dump += ' ' + DebugJS.escHtml(key) + '()';
            arg.cnt++;
            if ((levelLimit == 0) || ((levelLimit >= 1) && ((arg.lv + 1) < levelLimit))) {
              if (Object.keys(obj[key]).length > 0) {
                arg.dump += ' {\n';
              }
            }
          } else if (Object.prototype.toString.call(obj[key]) == '[object Date]') {
            arg.dump += indent;
            if (toJson) {arg.dump += '"';}
            arg.dump += (toJson ? key : DebugJS.escHtml(key));
            if (toJson) {arg.dump += '"';}
            dt = DebugJS.getDateTime(obj[key]);
            date = dt.yyyy + '-' + dt.mm + '-' + dt.dd + ' ' + DebugJS.WDAYS[dt.wday] + ' ' + dt.hh + ':' + dt.mi + ':' + dt.ss + '.' + dt.sss + ' (' + obj[key].getTime() + ')';
            arg.dump += ': ';
            if (toJson) {
              arg.dump += '"' + obj[key].toISOString() + '"';
            } else {
              arg.dump += '<span style="color:#f80">[Date]</span> ' + date;
            }
            sibling++;
            continue;
          } else if ((window.ArrayBuffer) && (obj[key] instanceof ArrayBuffer)) {
            arg = DebugJS._objDmp1(arg, key, toJson, indent, '<span style="color:#d69">[ArrayBuffer]</span> (byteLength = ' + obj[key].byteLength + ')');
            sibling++;
            continue;
          } else if (Object.prototype.toString.call(obj[key]) == '[object RegExp]') {
            arg = DebugJS._objDmp1(arg, key, toJson, indent, '<span style="color:#4ee">[RegExp]</span> ' + obj[key].toString());
            sibling++;
            continue;
          } else {
            arg.dump += indent;
            if (toJson) {arg.dump += '"';}
            arg.dump += (toJson ? key : DebugJS.escHtml(key));
            if (toJson) {arg.dump += '"';}
            arg.dump += ': ';
          }
          var hasChildren = false;
          for (var _key in obj[key]) {
            hasChildren = true;
            break;
          }
          if ((typeof obj[key] != 'function') || hasChildren) {
            arg.lv++;
            arg = DebugJS._objDump(obj[key], arg, toJson, levelLimit, limit, valLenLimit);
            arg.lv--;
          }
          if (typeof obj[key] == 'function') {
            if ((levelLimit == 0) || ((levelLimit >= 1) && ((arg.lv + 1) < levelLimit))) {
              if (Object.keys(obj[key]).length > 0) {
                arg.dump += '\n' + indent + '}';
              }
            }
          }
          sibling++;
        }
        var empty = false;
        if (sibling == 0) {
          if (typeof obj == 'function') {
            arg.dump += '<span style="color:#4c4">function</span>()';
            if (obj.toString().match(/\[native code\]/)) {
              arg.dump += ' [native]';
            }
          } else if (Object.prototype.toString.call(obj) == '[object Date]') {
            dt = DebugJS.getDateTime(obj);
            date = dt.yyyy + '-' + dt.mm + '-' + dt.dd + ' ' + DebugJS.WDAYS[dt.wday] + ' ' + dt.hh + ':' + dt.mi + ':' + dt.ss + '.' + dt.sss + ' (' + obj.getTime() + ')';
            if (toJson) {
              arg.dump += '"' + obj.toISOString() + '"';
            } else {
              arg.dump += '<span style="color:#f80">[Date]</span> ' + date;
            }
          } else if (window.ArrayBuffer && (obj instanceof ArrayBuffer)) {
            arg = DebugJS._objDmp0(arg, toJson, '<span style="color:#d69">[ArrayBuffer]</span> (byteLength = ' + obj.byteLength + ')');
          } else if (Object.prototype.toString.call(obj) == '[object RegExp]') {
            arg = DebugJS._objDmp0(arg, toJson, '<span style="color:#4ee">[RegExp]</span> ' + obj.toString());
          } else {
            empty = true;
            arg.dump = arg.dump.replace(/\n$/, '');
            arg.dump += '}';
          }
          arg.cnt++;
        }
        indent = indent.replace(DebugJS.INDENT_SP, '');
        if (DebugJS.isObj(obj) && !empty) {
          arg.dump += '\n' + indent + '}';
        }
      }
      if ((toJson) && (levelLimit >= 1) && (arg.lv >= levelLimit)) {
        arg.dump += indent + DebugJS.INDENT_SP + SNIP + '\n' + indent + '}';
      }
    } else if (obj === null) {
      if (toJson) {
        arg.dump += 'null';
      } else {
        arg.dump += '<span style="color:#ccc">null</span>';
      }
      arg.cnt++;
    } else if (obj === undefined) {
      if (toJson) {
        arg.dump += 'undefined';
      } else {
        arg.dump += '<span style="color:#ccc">undefined</span>';
      }
      arg.cnt++;
    } else if (typeof obj == 'string') {
      var str;
      if ((valLenLimit > 0) && (obj.length > valLenLimit)) {
        str = obj.substr(0, valLenLimit);
        if (toJson) {
          str += '...';
        } else {
          str = DebugJS.escHtml(str) + SNIP;
        }
      } else {
        str = (toJson ? obj : DebugJS.escHtml(obj));
      }
      str = str.replace(/\\/g, '\\\\');
      if (toJson) {
        str = str.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
      } else {
        str = DebugJS.hlCtrlCh(str);
      }
      arg.dump += (toJson ? '"' + str.replace(/"/g, '\\"') + '"' : DebugJS.quoteStr(str));
      arg.cnt++;
    } else {
      arg.dump += obj; arg.cnt++;
    }
  } catch (e) {
    arg.dump += '<span style="color:#f66">parse error: ' + e + '</span>'; arg.cnt++;
  }
  return arg;
};
DebugJS.isObj = function(o) {
  var t = Object.prototype.toString.call(o);
  return ((typeof o != 'function') &&
  (t != '[object Date]') && (t != '[object RegExp]') &&
  ((window.ArrayBuffer) && !(o instanceof ArrayBuffer)));
};
DebugJS._objDmp0 = function(arg, toJson, v) {
  if (toJson) {
    arg.dump += '{}';
  } else {
    arg.dump += v;
  }
  return arg;
};
DebugJS._objDmp1 = function(arg, key, toJson, indent, v) {
  arg.dump += indent;
  if (toJson) {arg.dump += '"';}
  arg.dump += (toJson ? key : DebugJS.escHtml(key));
  if (toJson) {arg.dump += '"';}
  arg.dump += ': ';
  if (toJson) {
    arg.dump += '{}';
  } else {
    arg.dump += v;
  }
  return arg;
};

DebugJS.getKeys = function(o) {
  var keys = [];
  for (var k in o) {
    keys.push(k);
  }
  return keys;
};
DebugJS.getKeysStr = function(o) {
  var keys = '';
  for (var k in o) {
    keys += k + '\n';
  }
  return keys;
};

DebugJS.getVal = function(id) {
  var el = document.getElementById(id);
  if (el) return el.value;
  return null;
};
DebugJS.setVal = function(id, v) {
  var el = document.getElementById(id);
  if (el) el.value = v;
};
DebugJS.writeHTML = function(id, s) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = s;
};
DebugJS.isFocusInput = function() {
  return DebugJS.isTxtInp(document.activeElement);
};
DebugJS.countElements = function(selector, showDetail) {
  if (!selector) selector = '*';
  var cnt = {};
  var el = null;
  var els = [];
  var total = 0;
  if (selector.charAt(0) == '#') {
    el = document.getElementById(selector.substr(1));
  } else {
    if (selector.charAt(0) == '(') {
      selector = selector.substr(1, selector.length - 2);
    }
    els = document.querySelectorAll(selector);
  }
  if (el) {
    DebugJS.getChildElements(el, els);
  }
  if (els) {
    for (var i = 0; i < els.length; i++) {
      if (!cnt[els[i].tagName]) {
        cnt[els[i].tagName] = 1;
      } else {
        cnt[els[i].tagName]++;
      }
      total++;
    }
  }
  if (showDetail) {
    var l = '<table>';
    for (var k in cnt) {
      l += '<tr><td>' + k + '</td><td style="text-align:right">' + cnt[k] + '</td></tr>';
    }
    l += '<tr><td>Total</td><td style="text-align:right">' + total + '</td></tr></table>';
    DebugJS._log.mlt(l);
  }
  return total;
};
DebugJS.getChildElements = function(el, list) {
  if (!el.tagName) return;
  list.push(el);
  var children = el.childNodes;
  if (children) {
    for (var i = 0; i < children.length; i++) {
      DebugJS.getChildElements(children[i], list);
    }
  }
};
DebugJS.isDescendant = function(el, t) {
  if (el) {
    var p = el.parentNode;
    while (p) {
      if (p == t) {
        return true;
      }
      p = p.parentNode;
    }
  }
  return false;
};
DebugJS.isChild = function(p, el) {
  if (el) {
    var c = p.childNodes;
    for (var i = 0; i < c.length; i++) {
      if (c[i] == el) return true;
    }
  }
  return false;
};

DebugJS.getHTML = function(b64) {
  var ctx = DebugJS.ctx;
  var el = document.getElementsByTagName('html').item(0);
  var cmdActive = false;
  if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
    cmdActive = DebugJS.cmd.hasFocus();
    ctx.bodyEl.removeChild(ctx.win);
  }
  var html = el.outerHTML;
  if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
    ctx.bodyEl.appendChild(ctx.win);
    ctx.scrollLogBtm(ctx);
    if (cmdActive) ctx.focusCmdLine();
  }
  if (b64) html = DebugJS.encodeB64(html);
  return html;
};

DebugJS.formatJSON = function(s) {
  return DebugJS.fmtJSON(s, true, 0, 0, 0);
};
DebugJS.fmtJSON = function(s, f, lv, lmt, vlen) {
  if (s) s = s.replace(/\\r\\n|\\r|\\n$/g, '');
  var j = JSON.parse(s);
  return DebugJS.objDump(j, f, lv, lmt, vlen);
};
DebugJS._cmdJson = function(s, f, lv) {
  var p = DebugJS.ctx.props;
  try {
    var j = DebugJS.fmtJSON(s, f, lv, p.dumplimit, p.dumpvallen);
    if (f) j = DebugJS.escHtml(j);
    DebugJS._log.mlt(j);
  } catch (e) {
    j = 'JSON format error: ' + DebugJS.hlJsonErr(s);
    DebugJS._log.e(j);
  }
  return DebugJS.html2text(j);
};
DebugJS.hlJsonErr = function(json) {
  var jsn = json.trim().split('\\');
  var cnt = 0;
  var res = '';
  for (var i = 0; i < jsn.length; i++) {
    var chnk = jsn[i];
    if (chnk == '') {
      cnt++;
    } else {
      if (i == 0) {
        res += chnk;
        continue;
      }
      if (cnt >= 1) {
        res += '\\';
        for (var j = 0; j < (cnt - 1); j++) {
          res += '\\';
        }
        if (cnt % 2 == 0) {
          res += '<span class="dbg-txt-hl">\\</span>';
        } else {
          res += '\\';
        }
        res += chnk;
        cnt = 0;
      } else {
        if (chnk.match(/^n|^r|^t|^b|^"/)) {
          res += '\\' + chnk;
        } else {
          res += '<span class="dbg-txt-hl">\\</span>' + chnk;
        }
      }
    }
  }
  res = res.replace(/\t/g, '<span class="dbg-txt-hl">\\t</span>');
  res = res.replace(/\r\n/g, '<span class="dbg-txt-hl">\\r\\n</span>');
  res = res.replace(/([^\\])\r/g, '$1<span class="dbg-txt-hl">\\r</span>');
  res = res.replace(/([^\\])\n/g, '$1<span class="dbg-txt-hl">\\n</span>');
  if (!res.match(/^\{/)) {
    res = '<span class="dbg-txt-hl"> </span>' + res;
  }
  res = res.replace(/\}([^}]+)$/, '}<span class="dbg-txt-hl">$1</span>');
  if (!res.match(/\}$/)) {
    res = res + '<span class="dbg-txt-hl"> </span>';
  }
  return res;
};
DebugJS.fromJSON = function(j, r) {
  return JSON.parse(j, r);
};
DebugJS.toJSON = function(o, r, s) {
  return JSON.stringify(o, r, s);
};
DebugJS.obj2json = function(o) {
  return DebugJS.objDump(o, true, 0, 0, 0);
};

DebugJS.loadobj = function(k) {
  if (DebugJS.LS_AVAILABLE) {
    return JSON.parse(localStorage.getItem(k));
  }
  return null;
};
DebugJS.saveobj = function(k, o) {
  if (DebugJS.LS_AVAILABLE) localStorage.setItem(k, JSON.stringify(o));
};
DebugJS.clearobj = function(k) {
  if (DebugJS.LS_AVAILABLE) localStorage.removeItem(k);
};

DebugJS.digits = function(x) {
  var d = 0;
  if (x == 0) {
    d = 1;
  } else {
    while (x != 0) {
      x = (x / 10) | 0; d++;
    }
  }
  return d;
};

DebugJS.parseInt = function(v) {
  var rdx = DebugJS.checkRadix(v);
  if (rdx == 10) {
    return parseInt(v, 10);
  } else if (rdx == 16) {
    return parseInt(v, 16);
  } else if (rdx == 2) {
    v = v.substr(2);
    return parseInt(v, 2);
  }
  return 0;
};

DebugJS.checkRadix = function(v) {
  if (v.match(/^-{0,1}[0-9,]+$/)) {
    return 10;
  } else if (v.match(/^-{0,1}0x[0-9A-Fa-f]+$/)) {
    return 16;
  } else if (v.match(/^-{0,1}0b[01\s]+$/)) {
    return 2;
  }
  return 0;
};

DebugJS.arr = {};
DebugJS.arr.pos = function(a, v, f) {
  var r = -1;
  for (var i = 0; i < a.length; i++) {
    if ((!f && (a[i] == v)) || (f && (a[i] === v))) {
      r = i;
      break;
    }
  }
  return r;
};
DebugJS.arr.count = function(a, v, f) {
  var c = 0;
  for (var i = 0; i < a.length; i++) {
    if ((!f && (a[i] == v)) || (f && (a[i] === v))) c++;
  }
  return c;
};
DebugJS.arr.has = function(a, v, f) {
  return (DebugJS.arr.pos(a, v, f) >= 0);
};
DebugJS.arr.del = function(arr, v) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == v) {
      arr.splice(i--, 1);
    }
  }
};
DebugJS.arr.next = function(a, v) {
  var r = a[0];
  for (var i = 0; i < a.length; i++) {
    if ((a[i] == v) && (i < (a.length - 1))) {
      r = a[i + 1];break;
    }
  }
  return r;
};
DebugJS.arr.prev = function(a, v) {
  var r = a[a.length - 1];
  for (var i = 0; i < a.length; i++) {
    if ((a[i] == v) && (i > 0)) {
      r = a[i - 1];break;
    }
  }
  return r;
};
DebugJS.arr.toSet = function(a, f) {
  var s = [];
  for (var i = 0; i < a.length; i++) {
    var v = a[i];
    if (DebugJS.arr.pos(s, v, f) < 0) {
      s.push(v);
    }
  }
  return s;
};
DebugJS.dndSet = function(s) {
  var l = DebugJS.txt2arr(s);
  var o = DebugJS.cntByGrp(l);
  var arg = DebugJS.ctx.dndArg;
  var v = [];
  for (var k in o) {
    v.push({key: k, cnt: o[k]});
  }
  if (DebugJS.hasOpt(arg, 'count')) {
    if (DebugJS.hasOpt(arg, 'asc')) {
      v.sort(function(a, b) {
        return a.cnt - b.cnt;
      });
    } else {
      v.sort(function(a, b) {
        return b.cnt - a.cnt;
      });
    }
  }
  var w = [];
  for (var i = 0; i < v.length; i++) {
    if ((v[i].key != '') || DebugJS.hasOpt(arg, 'blank')) {
      w.push(v[i]);
    }
  }
  var r;
  if (DebugJS.hasOpt(arg, 'count')) {
    r = DebugJS._dndSetCnt(v, w);
  } else {
    r = DebugJS._dndSet(w, arg);
  }
  return r;
};
DebugJS._dndSet = function(w, a) {
  var r = '';
  var m = '';
  var b = [];
  for (var i = 0; i < w.length; i++) {
    b.push(w[i].key);
  }
  if (DebugJS.hasOpt(a, 'asc')) {
    b.sort();
  } else if (DebugJS.hasOpt(a, 'desc')) {
    b.reverse();
  }
  for (i = 0; i < b.length; i++) {
    m += DebugJS.hlCtrlCh(b[i]) + '\n';
    r += b[i] + '\n';
  }
  DebugJS._log.mlt(m);
  return r;
};
DebugJS._dndSetCnt = function(v, w) {
  var mxD = 3;
  for (var i = 0; i < v.length; i++) {
    var d = DebugJS.digits(v[i].cnt);
    if (d > mxD) mxD = d;
  }
  var idxD = DebugJS.digits(w.length);
  if (idxD < 2) idxD = 2;
  var h = DebugJS.strPadding('idx', ' ', idxD, 'R') + ' ' + DebugJS.strPadding('cnt', ' ', mxD, 'R') + ' val\n---------------\n';
  var r = h;
  var m = h;
  for (i = 0; i < w.length; i++) {
    var idx = DebugJS.strPadding(i + 1, ' ', idxD, 'L');
    var c = DebugJS.strPadding(w[i].cnt, ' ', mxD, 'L');
    var p = idx + ': ' + c + ' ';
    m += p + DebugJS.quoteStr(DebugJS.hlCtrlCh(w[i].key)) + '\n';
    r += p + w[i].key + '\n';
  }
  DebugJS._log.mlt(m);
  return r;
};
DebugJS.cntByGrp = function(a) {
  var o = {};
  for (var i = 0; i < a.length; i++) {
    var v = a[i];
    if (o[v] == undefined) o[v] = 0;
    o[v]++;
  }
  return o;
};
DebugJS.dndSort = function(s) {
  var arg = DebugJS.ctx.dndArg;
  var a = DebugJS.txt2arr(s).sort();
  if (DebugJS.hasOpt(arg, 'desc')) a.reverse();
  var r = '';
  for (var i = 0; i < a.length; i++) {
    if (a[i] != '') r += a[i] + '\n';
  }
  DebugJS._log.mlt(r);
  return r;
};
DebugJS.dndFnFin = function() {
  var ctx = DebugJS.ctx;
  ctx.dndCmd = null;
  ctx.dndArg = null;
  ctx.dndRM = false;
};

DebugJS.printUsage = function(m) {
  DebugJS._log('Usage: ' + m);
};

DebugJS.convRGB = function(v) {
  var r, rgb;
  if (v.indexOf('#') == 0) {
    rgb = DebugJS.convRGB16to10(v);
    r = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
  } else {
    v = v.replace(/rgb\(/, '').replace(/\)/, '').replace(/,/g, ' ').trim();
    v = DebugJS.unifySP(v);
    rgb = DebugJS.convRGB10to16(v);
    r = '#' + rgb.r + rgb.g + rgb.b;
  }
  DebugJS._log(rgb.rgb);
  return r;
};
DebugJS.convRGB16to10 = function(rgb16) {
  var boxSize = '0.7em';
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
    return {rgb: '<span style="color:' + DebugJS.ctx.opt.logColorE + '">invalid value</span>'};
  }
  r10 = parseInt(r16, 16);
  g10 = parseInt(g16, 16);
  b10 = parseInt(b16, 16);
  var rgb10 = '<span style="vertical-align:top;display:inline-block;height:1em"><span style="background:rgb(' + r10 + ',' + g10 + ',' + b10 + ');width:' + boxSize + ';height:' + boxSize + ';margin-top:0.2em;display:inline-block"> </span></span> <span style="color:' + DebugJS.COLOR_R + '">' + r10 + '</span> <span style="color:' + DebugJS.COLOR_G + '">' + g10 + '</span> <span style="color:' + DebugJS.COLOR_B + '">' + b10 + '</span>';
  var rgb = {r: r10, g: g10, b: b10, rgb: rgb10};
  return rgb;
};
DebugJS.convRGB10to16 = function(rgb10) {
  var boxSize = '0.7em';
  rgb10 = DebugJS.unifySP(rgb10);
  var rgb10s = rgb10.split(' ', 3);
  if ((rgb10s.length != 3) || ((rgb10s[0] < 0) || (rgb10s[0] > 255)) || ((rgb10s[1] < 0) || (rgb10s[1] > 255)) || ((rgb10s[2] < 0) || (rgb10s[2] > 255))) {
    return {rgb: '<span style="color:' + DebugJS.ctx.opt.logColorE + '">invalid value</span>'};
  }
  var r16 = ('0' + parseInt(rgb10s[0]).toString(16)).slice(-2);
  var g16 = ('0' + parseInt(rgb10s[1]).toString(16)).slice(-2);
  var b16 = ('0' + parseInt(rgb10s[2]).toString(16)).slice(-2);
  if ((r16.charAt(0) == r16.charAt(1)) && (g16.charAt(0) == g16.charAt(1)) && (b16.charAt(0) == b16.charAt(1))) {
    r16 = r16.substring(0, 1);
    g16 = g16.substring(0, 1);
    b16 = b16.substring(0, 1);
  }
  var rgb16 = '<span style="vertical-align:top;display:inline-block;height:1em"><span style="background:#' + r16 + g16 + b16 + ';width:' + boxSize + ';height:' + boxSize + ';margin-top:0.2em;display:inline-block"> </span></span> #<span style="color:' + DebugJS.COLOR_R + '">' + r16 + '</span><span style="color:' + DebugJS.COLOR_G + '">' + g16 + '</span><span style="color:' + DebugJS.COLOR_B + '">' + b16 + '</span>';
  var rgb = {r: r16, g: g16, b: b16, rgb: rgb16};
  return rgb;
};

DebugJS.convRadixFromHEX = function(v16) {
  var v10 = parseInt(v16, 16).toString(10);
  var bin = DebugJS.convertBin({exp: v10, digit: DebugJS.DFLT_UNIT});
  if (v10 > 0xffffffff) {
    var v2 = parseInt(v10).toString(2);
    bin = DebugJS.formatBin(v2, true, DebugJS.DISP_BIN_DIGITS_THR);
  }
  var hex = DebugJS.formatHex(v16, true, false);
  if (hex.length >= 2) {
    hex = '0x' + hex;
  }
  DebugJS.printRadixConv(v10, hex, bin);
};
DebugJS.convRadixFromDEC = function(v10) {
  var unit = DebugJS.DFLT_UNIT;
  var bin = DebugJS.convertBin({exp: v10, digit: DebugJS.DFLT_UNIT});
  var v16 = parseInt(v10).toString(16);
  var v2 = '';
  if (v10 < 0) {
    for (var i = (unit - 1); i >= 0; i--) {
      v2 += (v10 & 1 << i) ? '1' : '0';
    }
    v16 = parseInt(v2, 2).toString(16);
  } else if (v10 > 0xffffffff) {
    v2 = parseInt(v10).toString(2);
    bin = DebugJS.formatBin(v2, true, DebugJS.DISP_BIN_DIGITS_THR);
  }
  var hex = DebugJS.formatHex(v16, true, false);
  if (hex.length >= 2) {
    hex = '0x' + hex;
  }
  DebugJS.printRadixConv(v10, hex, bin);
};
DebugJS.convRadixFromBIN = function(v2) {
  v2 = v2.replace(/\s/g, '');
  var v10 = parseInt(v2, 2).toString(10);
  var v16 = parseInt(v2, 2).toString(16);
  var bin = DebugJS.convertBin({exp: v10, digit: DebugJS.DFLT_UNIT});
  if (v10 > 0xffffffff) {
    v2 = parseInt(v10).toString(2);
    bin = DebugJS.formatBin(v2, true, DebugJS.DISP_BIN_DIGITS_THR);
  }
  var hex = DebugJS.formatHex(v16, true, false);
  if (hex.length >= 2) {
    hex = '0x' + hex;
  }
  DebugJS.printRadixConv(v10, hex, bin);
};
DebugJS.printRadixConv = function(v10, hex, bin) {
  var rdx = DebugJS.ctx.props.radix;
  var s = '';
  if (DebugJS.hasKeyWd(rdx, 'dec', '|')) s += 'DEC ' + DebugJS.formatDec(v10) + '\n';
  if (DebugJS.hasKeyWd(rdx, 'hex', '|')) s += 'HEX ' + hex + '\n';
  if (DebugJS.hasKeyWd(rdx, 'bin', '|')) s += 'BIN ' + bin + '\n';
  DebugJS._log.mlt(s);
};
DebugJS.toBin = function(v) {
  return ('0000000' + v.toString(2)).slice(-8);
};
DebugJS.toHex = function(v, uc, pFix, d) {
  var hex = parseInt(v).toString(16);
  return DebugJS.formatHex(hex, uc, pFix, d);
};
DebugJS.convertBin = function(data) {
  var digit = data.digit;
  if (digit == 0) digit = DebugJS.DFLT_UNIT;
  var val;
  try {
    val = eval(data.exp);
  } catch (e) {
    DebugJS._log.e('Invalid value: ' + e);return;
  }
  var v2 = parseInt(val).toString(2);
  var v2len = v2.length;
  var loop = ((digit > v2len) ? digit : v2len);
  v2 = '';
  for (var i = (loop - 1); i >= 0; i--) {
    v2 += (val & 1 << i) ? '1' : '0';
  }
  var hldigit = v2len;
  var overflow = false;
  if (val < 0) {
    hldigit = digit;
  } else if ((data.digit > 0) && (v2len > data.digit)) {
    overflow = true;
    hldigit = data.digit;
  }
  return DebugJS.formatBin(v2, true, DebugJS.DISP_BIN_DIGITS_THR, hldigit, overflow);
};
DebugJS.formatBin = function(v2, grouping, n, highlight, overflow) {
  var len = v2.length;
  var bin = '';
  if (grouping) {
    if ((highlight > 0) && (len > highlight)) {
      bin += '<span style="color:#888">';
    }
    for (var i = 0; i < len; i++) {
      if ((i != 0) && ((len - i) % 4 == 0)) {
        bin += ' ';
      }
      bin += v2.charAt(i);
      if ((highlight > 0) && ((len - i) == (highlight + 1))) {
        bin += '</span>';
      }
    }
  } else {
    bin = v2;
  }
  if (n) {
    if (len >= n) {
      var digits = len;
      if (overflow == false) {
        digits = highlight;
      }
      bin += ' (' + digits + ' bits)';
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
      if (!((i == 1) && (v10.charAt(0) == '-'))) {
        dec += ',';
      }
    }
    dec += v10.charAt(i);
  }
  return dec;
};
DebugJS.formatHex = function(hex, uc, pFix, d) {
  if (uc) hex = hex.toUpperCase();
  if ((d) && (hex.length < d)) {
    hex = (DebugJS.repeatCh('0', d) + hex).slice(d * (-1));
  }
  if (pFix) hex = '0x' + hex;
  return hex;
};

DebugJS.bit8 = {};
DebugJS.bit8.rotateL = function(v, n) {
  n = n % 8;
  return ((v << n) | (v >> (8 - n))) & 255;
};
DebugJS.bit8.rotateR = function(v, n) {
  n = n % 8;
  return ((v >> n) | (v << (8 - n))) & 255;
};
DebugJS.bit8.invert = function(v) {
  return (~v) & 255;
};

DebugJS.UTF8 = {};
DebugJS.UTF8.toByte = function(s) {
  var a = [];
  if (!s) return a;
  for (var i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i);
    if (c <= 0x7F) {
      a.push(c);
    } else if (c <= 0x07FF) {
      a.push(((c >> 6) & 0x1F) | 0xC0);
      a.push((c & 0x3F) | 0x80);
    } else {
      a.push(((c >> 12) & 0x0F) | 0xE0);
      a.push(((c >> 6) & 0x3F) | 0x80);
      a.push((c & 0x3F) | 0x80);
    }
  }
  return a;
};
DebugJS.UTF8.fmByte = function(a) {
  if (!a) return null;
  var s = '';
  var i, c;
  while (i = a.shift()) {
    if (i <= 0x7F) {
      s += String.fromCharCode(i);
    } else if (i <= 0xDF) {
      c = ((i & 0x1F) << 6);
      c += a.shift() & 0x3F;
      s += String.fromCharCode(c);
    } else if (i <= 0xE0) {
      c = ((a.shift() & 0x1F) << 6) | 0x800;
      c += a.shift() & 0x3F;
      s += String.fromCharCode(c);
    } else {
      c = ((i & 0x0F) << 12);
      c += (a.shift() & 0x3F) << 6;
      c += a.shift() & 0x3F;
      s += String.fromCharCode(c);
    }
  }
  return s;
};

DebugJS.encodeB64 = function(s) {
  if (!window.btoa) return '';
  return DebugJS.encodeBase64(s);
};
DebugJS.decodeB64 = function(s, q) {
  var r = '';
  if (!window.atob) return r;
  try {
    r = DebugJS.decodeBase64(s);
  } catch (e) {
    if (!q) DebugJS._log.e('decodeB64(): ' + e);
  }
  return r;
};
DebugJS.encodeBase64 = function(s) {
  var r;
  try {
    r = btoa(s);
  } catch (e) {
    r = btoa(encodeURIComponent(s).replace(/%([0-9A-F]{2})/g, function(match, p1) {return String.fromCharCode('0x' + p1);}));
  }
  return r;
};
DebugJS.decodeBase64 = function(s) {
  var r = '';
  if (!window.atob) return r;
  try {
    r = decodeURIComponent(Array.prototype.map.call(atob(s), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    r = atob(s);
  }
  return r;
};
DebugJS.Base64 = {};
DebugJS.Base64.encode = function(arr) {
  var len = arr.length;
  if (len == 0) return '';
  var tbl = {64: 61, 63: 47, 62: 43};
  for (var i = 0; i < 62; i++) {
    tbl[i] = (i < 26 ? i + 65 : (i < 52 ? i + 71 : i - 4));
  }
  var str = '';
  for (i = 0; i < len; i += 3) {
    str += String.fromCharCode(
      tbl[arr[i] >>> 2],
      tbl[(arr[i] & 3) << 4 | arr[i + 1] >>> 4],
      tbl[(i + 1) < len ? (arr[i + 1] & 15) << 2 | arr[i + 2] >>> 6 : 64],
      tbl[(i + 2) < len ? (arr[i + 2] & 63) : 64]
    );
  }
  return str;
};
DebugJS.Base64.decode = function(str) {
  var arr = [];
  if (str.length == 0) return arr;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (!(((c >= 0x30) && (c <= 0x39)) || ((c >= 0x41) && (c <= 0x5A)) || ((c >= 0x61) && (c <= 0x7A)) || (c == 0x2B) || (c == 0x2F) || (c == 0x3D))) {
      DebugJS._log.e('invalid b64 char: 0x' + c.toString(16).toUpperCase() + ' at ' + i);
      return arr;
    }
  }
  var tbl = {61: 64, 47: 63, 43: 62};
  for (i = 0; i < 62; i++) {
    tbl[i < 26 ? i + 65 : (i < 52 ? i + 71 : i - 4)] = i;
  }
  var buf = [];
  for (i = 0; i < str.length; i += 4) {
    for (var j = 0; j < 4; j++) {
      buf[j] = tbl[str.charCodeAt(i + j) || 0];
    }
    arr.push(
      buf[0] << 2 | (buf[1] & 63) >>> 4,
      (buf[1] & 15) << 4 | (buf[2] & 63) >>> 2,
      (buf[2] & 3) << 6 | buf[3] & 63
    );
  }
  if (buf[3] == 64) {
    arr.pop();
    if (buf[2] == 64) {
      arr.pop();
    }
  }
  return arr;
};
DebugJS.Base64.getMimeType = function(s) {
  var H = {
    image: {jpeg: '/9', png: 'iVBORw0KGgo', gif: 'R0lGO', bmp: 'Qk0'},
    application: {xml: 'PD94bWw'}
  };
  var r = {type: '', subtype: ''};
  for (var tp in H) {
    for (var stp in H[tp]) {
      if (DebugJS.startsWith(s, H[tp][stp])) {
        r.type = tp;
        r.subtype = stp;
        return r;
      }
    }
  }
  return r;
};

DebugJS.isBase64 = function(s) {
  return (s && s.match(/^[A-Za-z0-9/+]*=*$/) ? true : false);
};
DebugJS.encodeBSB64 = function(s, n) {
  var a = DebugJS.UTF8.toByte(s);
  return DebugJS.BSB64.encode(a, n);
};
DebugJS.decodeBSB64 = function(s, n) {
  if (s.match(/\$\d+$/)) {
    var v = s.split('$');
    s = v[0];
    n = v[1];
  }
  var a = DebugJS.BSB64.decode(s, n);
  return DebugJS.UTF8.fmByte(a);
};
DebugJS.BSB64 = {};
DebugJS.BSB64.encode = function(a, n) {
  var fn = DebugJS.bit8.rotateL;
  if (n % 8 == 0) fn = DebugJS.bit8.invert;
  var b = [];
  for (var i = 0; i < a.length; i++) {
    b.push(fn(a[i], n));
  }
  return DebugJS.Base64.encode(b);
};
DebugJS.BSB64.decode = function(s, n) {
  var fn = DebugJS.bit8.rotateR;
  if (n % 8 == 0) fn = DebugJS.bit8.invert;
  var b = DebugJS.Base64.decode(s);
  var a = [];
  for (var i = 0; i < b.length; i++) {
    a.push(fn(b[i], n));
  }
  return a;
};

DebugJS.encodeROT5 = function(s, n) {
  if ((n < -9) || (n > 9)) n = n % 10;
  var r = '';
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    var cc = c.charCodeAt();
    if (DebugJS.isNumeric(c)) {
      cc += n;
      if (cc > 0x39) {
        cc = 0x2F + (cc - 0x39);
      } else if (cc < 0x30) {
        cc = 0x3A - (0x30 - cc);
      }
      r += String.fromCharCode(cc);
    } else {
      r += c;
    }
  }
  return r;
};
DebugJS.decodeROT5 = function(s, n) {
  return DebugJS.encodeROT5(s, ((n | 0) * (-1)));
};
DebugJS.encodeROT13 = function(s, n) {
  if ((n < -25) || (n > 25)) n = n % 26;
  var r = '';
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    var cc = c.charCodeAt();
    if (DebugJS.isAlphabetic(c)) {
      cc += n;
      if (DebugJS.isUpperCase(c)) {
        if (cc > 0x5A) {
          cc = 0x40 + (cc - 0x5A);
        } else if (cc < 0x41) {
          cc = 0x5B - (0x41 - cc);
        }
      } else if (DebugJS.isLowerCase(c)) {
        if (cc > 0x7A) {
          cc = 0x60 + (cc - 0x7A);
        } else if (cc < 0x61) {
          cc = 0x7B - (0x61 - cc);
        }
      }
      r += String.fromCharCode(cc);
    } else {
      r += c;
    }
  }
  return r;
};
DebugJS.decodeROT13 = function(s, n) {
  return DebugJS.encodeROT13(s, ((n | 0) * (-1)));
};
DebugJS.encodeROT47 = function(s, n) {
  if ((n < -93) || (n > 93)) n = n % 94;
  var r = '';
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    var cc = c.charCodeAt();
    if ((cc >= 0x21) && (cc <= 0x7E)) {
      if (n < 0) {
        cc += n;
        if (cc < 0x21) cc = 0x7F - (0x21 - cc);
      } else {
        cc = ((cc - 0x21 + n) % 94) + 0x21;
      }
      r += String.fromCharCode(cc);
    } else {
      r += c;
    }
  }
  return r;
};
DebugJS.decodeROT47 = function(s, n) {
  return DebugJS.encodeROT47(s, ((n | 0) * (-1)));
};

DebugJS.buildDataUrl = function(scheme, data) {
  scheme = scheme.replace(/,$/, '');
  return scheme + ',' + data;
};
DebugJS.splitDataUrl = function(url) {
  var a = url.split(',');
  var b64cnt = {scheme: a[0], data: (a[1] == undefined ? '' : a[1])};
  return b64cnt;
};
DebugJS.str2binArr = function(str, blkSize, pFix) {
  var arr = [];
  for (var i = 0; i < str.length; i += blkSize) {
    var v = str.substr(i, blkSize);
    if (v.length == blkSize) {
      arr.push(DebugJS.parseInt(pFix + v));
    }
  }
  return arr;
};

DebugJS.decodeUnicode = function(arg) {
  var str = '';
  var a = arg.split(' ');
  for (var i = 0; i < a.length; i++) {
    if (a[i] == '') continue;
    var cdpt = a[i].replace(/^U\+/i, '');
    if (cdpt == '20') {
      str += ' ';
    } else {
      str += '&#x' + cdpt;
    }
  }
  return str;
};
DebugJS.getUnicodePoints = function(str) {
  var code = '';
  for (var i = 0; i < str.length; i++) {
    var p = DebugJS.getCodePoint(str.charAt(i), true);
    if (i > 0) code += ' ';
    code += 'U+' + DebugJS.formatHex(p, true, '', 4);
  }
  return code;
};
DebugJS.getCodePoint = function(c, hex) {
  var p;
  if (String.prototype.codePointAt) {
    p = c.codePointAt(0);
  } else {
    p = c.charCodeAt(0);
  }
  if (hex) p = DebugJS.toHex(p, true, '', 0);
  return p;
};

DebugJS.decodeUri = function(s) {
  return decodeURIComponent(s);
};
DebugJS.encodeUri = function(s) {
  return encodeURIComponent(s);
};

DebugJS.tmStr2ms = function(t) {
  var hour = 0;
  var min = 0;
  var sec = 0;
  var msec = 0;
  var s = '0';
  var times = t.split(':');
  if (times.length == 3) {
    hour = times[0] | 0;
    min = times[1] | 0;
    s = times[2];
  } else if (times.length == 2) {
    hour = times[0] | 0;
    min = times[1] | 0;
  } else {
    return null;
  }
  var ss = s.split('.');
  sec = ss[0] | 0;
  if (ss.length >= 2) {
    msec = ss[1] | 0;
  }
  var time = (hour * 3600000) + (min * 60000) + (sec * 1000) + msec;
  return time;
};
DebugJS.str2ms = function(t) {
  var d = 0, h = 0, m = 0, s = 0, ms = 0;
  var i = t.indexOf('d');
  if (i > 0) {
    d = t.substr(0, i) | 0;
    t = t.substr(i + 1);
  }
  i = t.indexOf('h');
  if (i > 0) {
    h = t.substr(0, i) | 0;
    t = t.substr(i + 1);
  }
  i = t.indexOf('m');
  if (i > 0) {
    m = t.substr(0, i) | 0;
    t = t.substr(i + 1);
  }
  i = t.indexOf('s');
  if (i > 0) {
    s = t.substr(0, i);
    ms = t.substr(i + 1);
    i = s.indexOf('.');
    if (i > 0) {
      s = s.substr(0, i);
      ms = t.substr(i + 1, t.length - i - 2);
      ms = ms + DebugJS.repeatCh('0', 3 - ms.length);
    }
    s = s | 0;
  }
  if ((ms == 0) && (!isNaN(t))) ms = t;
  ms = ms | 0;
  return d * 86400000 + h * 3600000 + m * 60000 + s * 1000 + ms;
};
DebugJS.isTmStr = function(s) {
  s = DebugJS.delAllSP(s + '');
  if (!s.match(/^\d/) || s.match(/[^\d.dhms]/)) return false;
  var m = s.match(/\d*d?\d*h?\d*m?\d*\.?\d?s?/);
  return (isNaN(s) && m && (m != ''));
};
DebugJS.isUnixTm = function(s) {
  return (s.match(/^\d*\.\d*$/));
};

DebugJS.subTime = function(tL, tR, byTheDay) {
  var A_DAY = 86400000;
  var res = tL - tR;
  var days = 0;
  if ((res < 0) && (byTheDay)) {
    res *= (-1);
    days = ((res / A_DAY) | 0);
    days = days + ((res % A_DAY != 0) ? 1 : 0);
    if (tL != 0) {
      if ((res % A_DAY == 0) && (res != A_DAY)) {
        days += 1;
      }
    }
    res = A_DAY - (res - days * A_DAY);
  }
  return DebugJS.calcTime(res, days, byTheDay, true);
};

DebugJS.addTime = function(tL, tR, byTheDay) {
  var res = tL + tR;
  var days = 0;
  if (byTheDay) {
    days = (res / 86400000) | 0;
    res -= days * 86400000;
  }
  return DebugJS.calcTime(res, days, byTheDay, false);
};

DebugJS.calcTime = function(res, days, byTheDay, isSub) {
  var t = DebugJS.ms2struct(res);
  var ex = '';
  if (days > 0) {
    ex = ' (' + (isSub ? '-' : '+') + days + ' ' + DebugJS.plural('Day', days) + ')';
  }
  var hh = (byTheDay ? t.hr : t.hh);
  if (hh < 10) hh = '0' + hh;
  var r = (t.sign ? '-' : '') + hh + ':' + ('0' + t.mi).slice(-2) + ':' + ('0' + t.ss).slice(-2) + '.' + ('00' + t.sss).slice(-3) + ex;
  return r;
};
DebugJS.getElapsedTimeStr = function(t1, t2) {
  var delta = t2 - t1;
  return DebugJS.getTmrStr(delta);
};

DebugJS.isTZOffsetStr = function(s) {
  return (s.match(/^[+-]\d{1,4}$/) ? true : false);
};
DebugJS.tzOffset2ms = function(t) {
  t = DebugJS.toFullTz(t);
  var s = (t.charAt(0) == '-' ? -1 : 1);
  var h = t.substr(1, 2);
  var m = t.substr(3, 2);
  return (h * 3600000 + m * 60000) * s;
};
DebugJS.jsTzOffset2ms = function(t) {
  return t * 60000 * -1;
};
DebugJS.getTZedDateTimeStr = function(d, tz, iso) {
  var loc = DebugJS.jsTzOffset2ms(d.getTimezoneOffset());
  var tgt = DebugJS.tzOffset2ms(tz);
  var df = loc - tgt;
  var ts = d.getTime() - df;
  return DebugJS.getDateTimeStr(ts, true, iso);
};
DebugJS.cmdTZedNow = function(c, echo) {
  var tz = DebugJS.toFullTz(DebugJS.TZ[c]);
  var ts = DebugJS.now();
  var r = DebugJS._date(ts, tz, false, false);
  if (echo) DebugJS._log.res(r);
  return r;
};
DebugJS.toFullTz = function(t) {
  if (t.length == 2) {
    t = t.charAt(0) + '0' + t.charAt(1) + '00';
  } else if (t.length == 3) {
    t += '00';
  } else if (t.length == 4) {
    t = t.charAt(0) + '0' + t.charAt(1) + t.substr(2);
  }
  return t;
};
DebugJS.isTimeStr = function(v) {
  var a = v.split(':');
  if ((a.length < 2) || (a.length > 3)) return false;
  var h = a[0];
  var m = a[1];
  var s = a[2];
  var ss, sss;
  if (!s) {
    ss = '00';
    sss = '000';
  } else {
    s = s.split('.');
    ss = s[0];
    sss = s[1];
    if (!sss) sss = '000';
  }
  if (h.length > 2) return false;
  if (m.length != 2) return false;
  if (ss.length != 2) return false;
  if (sss.length != 3) return false;
  h |= 0;
  m |= 0;
  ss |= 0;
  sss |= 0;
  if ((h < 0) || (h > 23)) return false;
  if ((m < 0) || (m > 59)) return false;
  if ((ss < 0) || (ss > 59)) return false;
  if (sss < 0) return false;
  return true;
};
DebugJS.toClocklikeStr = function(s) {
  return s.substr(0, 3) + ':' + s.substr(3, 2);
};
DebugJS.isSTN = function(s) {
  for (var k in DebugJS.TZ) {
    if (s == k) return true;
  }
  return false;
};

DebugJS.random = function(min, max) {
  return DebugJS.getRandomN(min, max);
};

DebugJS.getRandomN = function(min, max) {
  if (isNaN(min)) {
    min = 0;
    max = 0x7fffffff;
  } else {
    min = parseInt(min);
    if (isNaN(max)) {
      max = min;
      min = 0;
    } else {
      max = parseInt(max);
    }
    if (min > max) {
      var wk = min; min = max; max = wk;
    }
  }
  return DebugJS.getRndNum(min, max);
};

DebugJS.getRandomS = function(min, max) {
  if (isNaN(min)) {
    min = 1;
    max = DebugJS.RND_STR_DFLT_MAX_LEN;
  } else {
    min = parseInt(min);
    if (isNaN(max)) {
      max = min;
    } else {
      max = parseInt(max);
    }
    if (min > max) {
      var wk = min; min = max; max = wk;
    }
  }
  return DebugJS.getRndStr(min, max);
};

DebugJS.getRndNum = function(min, max) {
  min = parseInt(min);
  max = parseInt(max);
  return parseInt(Math.random() * (max - min + 1)) + min;
};
DebugJS.getRndNums = function(d) {
  var n = '';
  for (var i = 0; i < d; i++) {
    n += DebugJS.getRndNum(0, 9);
  }
  return n;
};

DebugJS.SYM = [' ', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
DebugJS.RND_STR_DFLT_MAX_LEN = 10;
DebugJS.RND_STR_MAX_LEN = 1024;
DebugJS.getRndStr = function(min, max, tp, atbl) {
  if (min > DebugJS.RND_STR_MAX_LEN) min = DebugJS.RND_STR_MAX_LEN;
  if (max == undefined) max = min;
  if (max > DebugJS.RND_STR_MAX_LEN) max = DebugJS.RND_STR_MAX_LEN;
  var len = DebugJS.getRndNum(min, max);
  var alphUc = 1, alphLc = 1, num = 1, sym = 0;
  if (tp != undefined) {
    alphUc = (tp.match(/A/) ? 1 : 0);
    alphLc = (tp.match(/a/) ? 1 : 0);
    num = (tp.match(/1/) ? 1 : 0);
    sym = (tp.match(/!/) ? 1 : 0);
  }
  var tbl = [];
  if (alphUc) {
    for (var i = 0x41; i <= 0x5A; i++) {
      tbl.push(String.fromCharCode(i));
    }
  }
  if (alphLc) {
    for (i = 0x61; i <= 0x7A; i++) {
      tbl.push(String.fromCharCode(i));
    }
  }
  if (num) {
    for (i = 0x30; i <= 0x39; i++) {
      tbl.push(String.fromCharCode(i));
    }
  }
  if (sym) {
    for (i = 0; i < DebugJS.SYM.length; i++) {
      tbl.push(DebugJS.SYM[i]);
    }
  }
  if (atbl) {
    for (i = 0; i < atbl.length; i++) {
      tbl.push(atbl[i]);
    }
  }
  var s = '';
  if (tbl.length > 0) {
    for (i = 0; i < len; i++) {
      s += tbl[Math.floor(Math.random() * tbl.length)];
    }
  }
  return s;
};

DebugJS.http = function(rq, cb) {
  var data = null;
  if (!rq.method) rq.method = 'GET';
  if (rq.async == undefined) rq.async = true;
  if ((rq.data != undefined) && (rq.data != '')) {
    data = rq.data;
    if (data instanceof Object) {
      data = DebugJS.http.buildParam(data);
    }
  }
  rq.method = rq.method.toUpperCase();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (cb) cb(xhr, rq);
    }
  };
  xhr.open(rq.method, rq.url, rq.async, rq.user, rq.pass);
  if (rq.contentType) {
    xhr.setRequestHeader('Content-Type', rq.contentType);
  } else {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  if (!rq.cache) {
    xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT');
  }
  for (var key in rq.headers) {
    xhr.setRequestHeader(key, rq.headers[key]);
  }
  if (rq.withCredentials) {
    xhr.withCredentials = true;
  }
  xhr.send(data);
  return xhr;
};
DebugJS.http.buildParam = function(p) {
  var s = '';
  var cnt = 0;
  for (var k in p) {
    if (cnt > 0) s += '&';
    s += k + '=' + encodeURIComponent(p[k]);
    cnt++;
  }
  return s;
};
DebugJS.http.echo = true;
DebugJS.onHttpReqDone = function(xhr) {
  var echo = DebugJS.http.echo;
  var stmsg = xhr.status + ' ' + xhr.statusText;
  if (xhr.status == 0) {
    if (echo) DebugJS._log.e('Cannot load: ' + stmsg);
  } else {
    if (echo) DebugJS._log(stmsg);
  }
  var head = xhr.getAllResponseHeaders();
  var txt = xhr.responseText.replace(/</g, '&lt;');
  txt = txt.replace(/>/g, '&gt;');
  if (head || txt) {
    var r = '<span style="color:#5ff">' + head + '</span>' + txt;
    if (echo) DebugJS._log.mlt(r);
  }
};

DebugJS.encodeURIString = function(data) {
  var s = encodeURIComponent(data);
  return s.replace(/%20/g, '+').replace(/%3D/gi, '=').replace(/%26/g, '&');
};

DebugJS.getWinZoomRatio = function() {
  return Math.round(window.devicePixelRatio * 100) + '%';
};

DebugJS.getLanguages = function(indent) {
  var langs;
  var navLangs = navigator.languages;
  if (navLangs) {
    for (var i = 0; i < navLangs.length; i++) {
      if (i == 0) {
        langs = '[' + i + '] ' + navLangs[i];
      } else {
        langs += '\n' + indent + '[' + i + '] ' + navLangs[i];
      }
    }
  } else {
    langs = DebugJS.setStyleIfObjNA(navLangs);
  }
  return langs;
};

DebugJS.getBrowserType = function() {
  var ua = navigator.userAgent;
  var ver;
  var brws = {name: '', version: ''};
  if (ua.indexOf('Edge') >= 1) {
    brws.name = 'Edge';
    ver = ua.match(/Edge\/(.*)/);
    if (ver) brws.version = ver[1];
    return brws;
  }
  if (ua.indexOf('OPR/') >= 1) {
    brws.name = 'Opera';
    ver = ua.match(/OPR\/(.*)/);
    if (ver) brws.version = ver[1];
    return brws;
  }
  if (ua.indexOf('Chrome') >= 1) {
    brws.name = 'Chrome';
    ver = ua.match(/Chrome\/(.*)\s/);
    if (ver) brws.version = ver[1];
    return brws;
  }
  if (ua.indexOf('Firefox') >= 1) {
    brws.name = 'Firefox';
    ver = ua.match(/Firefox\/(.*)/);
    if (ver) brws.version = ver[1];
    return brws;
  }
  if (ua.indexOf('Trident/7.') >= 1) {
    brws.name = 'IE11';
    brws.family = 'IE';
    return brws;
  }
  if (ua.indexOf('Trident/6.') >= 1) {
    brws.name = 'IE10';
    brws.family = 'IE';
    return brws;
  }
  if (ua.indexOf('Trident/5.') >= 1) {
    brws.name = 'IE9';
    brws.family = 'IE';
    return brws;
  }
  if ((ua.indexOf('Safari/') >= 1) && (ua.indexOf('Version/') >= 1)) {
    brws.name = 'Safari';
    ver = ua.match(/Version\/(.*)\sSafari/);
    if (ver) brws.version = ver[1];
    return brws;
  }
  return brws;
};
DebugJS.browserColoring = function(nm) {
  var s = nm;
  switch (nm) {
    case 'Chrome':
      s = '<span style="color:#f44">Ch</span><span style="color:#ff0">ro</span><span style="color:#4f4">m</span><span style="color:#6cf">e</span>';
      break;
    case 'Edge':
      s = '<span style="color:#0af">' + nm + '</span>';
      break;
    case 'Firefox':
      s = '<span style="color:#e57f25">' + nm + '</span>';
      break;
    case 'Opera':
      s = '<span style="color:#f44">' + nm + '</span>';
      break;
    case 'IE11':
    case 'IE10':
    case 'IE9':
      s = '<span style="color:#61d5f8">' + nm + '</span>';
      break;
    case 'Safari':
      s = '<span style="color:#86c8e8">Safa</span><span style="color:#dd5651">r</span><span style="color:#ececec">i</span>';
  }
  return s;
};

DebugJS.substr = function(txt, len) {
  var txtLen = txt.length;
  var cnt = 0;
  var str = '';
  var i, x;
  if (len >= 0) {
    for (i = 0; i < txtLen; i++) {
      x = encodeURIComponent(txt.charAt(i));
      if (x.length <= 3) {
        cnt++;
      } else {
        cnt += 2;
      }
      if (cnt > len) break;
      str += txt.charAt(i);
    }
  } else {
    len *= (-1);
    for (i = (txtLen - 1); i >= 0; i--) {
      x = encodeURIComponent(txt.charAt(i));
      if (x.length <= 3) {
        cnt++;
      } else {
        cnt += 2;
      }
      if (cnt >= len) break;
    }
    str = txt.substr(i);
  }
  return str;
};
DebugJS.startsWith = function(s, p, o) {
  if (o) s = s.substr(o);
  if ((s == '') && (p == '')) return true;
  if (p == '') return false;
  return (s.substr(0, p.length) == p);
};
DebugJS.endsWith = function(s, p) {
  if ((s == '') && (p == '')) return true;
  if (p == '') return false;
  return (s.substr(s.length - p.length) == p);
};
DebugJS.needNL = function(s, n) {
  var nl = '\n';
  if (n > 1) nl = DebugJS.repeatCh(nl, n);
  return ((s != '') && (!DebugJS.endsWith(s, nl)));
};
DebugJS.strcount = function(s, p) {
  var i = 0;
  var pos = s.indexOf(p);
  while ((p != '') && (pos != -1)) {
    i++;
    pos = s.indexOf(p, pos + p.length);
  }
  return i;
};
DebugJS.strcmpWOsp = function(s1, s2) {
  return (s1.trim() == s2.trim());
};
DebugJS.strcatWnl = function(s1, s2) {
  s1 += s2;
  if (!DebugJS.endsWith(s2, '\n')) s1 += '\n';
  return s1;
};
DebugJS.strPadding = function(s, c, l, p) {
  var t = s + '';
  var d = l - t.length;
  if (d <= 0) return t;
  var pd = DebugJS.repeatCh(c, d);
  if (p == 'L') {
    t = pd + t;
  } else {
    t += pd;
  }
  return t;
};
DebugJS.repeatCh = function(c, n) {
  var s = '';
  for (var i = 0; i < n; i++) s += c;
  return s;
};
DebugJS.crlf2lf = function(s) {
  return s.replace(/\r\n/g, '\n');
};
DebugJS.str = function(c1, c2) {
  var p1 = c1, p2 = c2;
  if (typeof c1 == 'string') {
    c1 = c1.replace(/^U\+/, '0x');
    if (!isNaN(c1) && c1.length > 1) {
      p1 = c1 | 0;
    } else {
      p1 = DebugJS.getCodePoint(c1);
    }
  }
  if (!c2) p2 = p1;
  if (typeof c2 == 'string') {
    c2 = c2.replace(/^U\+/, '0x');
    if (!isNaN(c2) && c2.length > 1) {
      p2 = c2 | 0;
    } else {
      p2 = DebugJS.getCodePoint(c2);
    }
  }
  var s = '';
  if (p1 > p2) {
    for (var i = p1; i >= p2; i--) {
      s += String.fromCharCode(i);
    }
  } else {
    for (i = p1; i <= p2; i++) {
      s += String.fromCharCode(i);
    }
  }
  return s;
};
DebugJS.plural = function(s, n) {
  return (n >= 2 ? (s + 's') : s);
};
DebugJS.toHalfWidth = function(s) {
  var h = s.replace(/　/g, ' ').replace(/”/g, '"').replace(/’/g, '\'').replace(/‘/g, '`').replace(/￥/g, '\\');
  h = h.replace(/[！-～]/g, function(wk) {return String.fromCharCode(wk.charCodeAt(0) - 65248);});
  return h;
};
DebugJS.toFullWidth = function(s) {
  var f = s.replace(/ /g, '　').replace(/"/g, '”').replace(/'/g, '’').replace(/`/g, '‘').replace(/\\/g, '￥');
  f = f.replace(/[!-~]/g, function(wk) {return String.fromCharCode(wk.charCodeAt(0) + 65248);});
  return f;
};
DebugJS.lenB = function(s) {
  return (new Blob([s], {type: 'text/plain'})).size;
};
DebugJS.isAscii = function(s) {
  return (s.match(/^[\x0-\x7f]*$/) ? true : false);
};
DebugJS.txt2arr = function(s) {
  return DebugJS.crlf2lf(s).split('\n');
};

DebugJS.trimDownText = function(txt, maxLen, style) {
  var snip = '...';
  if (style) snip = '<span style="' + style + '">' + snip + '</span>';
  var s = txt;
  if (txt.length > maxLen) s = DebugJS.substr(s, maxLen - 3) + snip;
  return s;
};
DebugJS.trimDownText2 = function(txt, maxLen, omitpart, style) {
  var snip = '...';
  if (style) snip = '<span style="' + style + '">' + snip + '</span>';
  if (maxLen == 0) return snip;
  var str = DebugJS.unifySP(txt.replace(/(\r?\n|\r)/g, ' ').replace(/\t/g, ' '));
  if (txt.length > maxLen) {
    switch (omitpart) {
      case DebugJS.OMIT_FIRST:
        str = DebugJS.substr(str, ((maxLen - 3) * (-1)));
        str = snip + DebugJS.escHtml(str);
        break;
      case DebugJS.OMIT_MID:
        var firstLen = (maxLen / 2) - 2;
        var latterLen = firstLen + 1;
        if ((maxLen % 2) != 0) {
          firstLen = (firstLen | 0);
          latterLen = firstLen + 1;
        }
        var firstText = DebugJS.substr(str, firstLen);
        var latterText = DebugJS.substr(str, (latterLen * (-1)));
        str = DebugJS.escHtml(firstText) + snip + DebugJS.escHtml(latterText);
        break;
      default:
        str = DebugJS.substr(str, maxLen - 3);
        str = DebugJS.escHtml(str) + snip;
    }
  }
  return str;
};

DebugJS.hasKeyWd = function(s, k, d) {
  if (!s) return false;
  var a = s.split(d);
  for (var i = 0; i < a.length; i++) {
    if (a[i] == k) return true;
  }
  return false;
};

DebugJS.isEmptyVal = function(o) {
  return ((o === undefined) || (o === null) || (o === false) || (o === ''));
};

DebugJS.setStyleIfObjNA = function(obj, exceptFalse) {
  var s = obj;
  if ((exceptFalse && ((obj == undefined) || (obj == null))) ||
      ((!exceptFalse) && (obj !== 0) && (obj !== '') && (!obj))) {
    s = '<span class="dbg-na">' + obj + '</span>';
  }
  return s;
};

DebugJS.dumpAddr = function(i) {
  return ('0000000' + i.toString(16)).slice(-8).toUpperCase() + ' : ';
};
DebugJS.dumpBin = function(i, buf) {
  return ((buf[i] == undefined) ? '        ' : DebugJS.toBin(buf[i]));
};
DebugJS.dumpDec = function(i, buf) {
  return ((buf[i] == undefined) ? '   ' : ('  ' + buf[i].toString()).slice(-3));
};
DebugJS.dumpHex = function(i, buf) {
  return ((buf[i] == undefined) ? '  ' : ('0' + buf[i].toString(16)).slice(-2).toUpperCase());
};
DebugJS.dumpAscii = function(pos, buf) {
  var b = '';
  var end = pos + 0x10;
  for (var i = pos; i < end; i++) {
    var code = buf[i];
    if (code == undefined) break;
    switch (code) {
      case 0x0A:
        b += DebugJS.CHR_LF_S;
        break;
      case 0x0D:
        b += DebugJS.CHR_CR_S;
        break;
      case 0x22:
        b += '&quot;';
        break;
      case 0x26:
        b += '&amp;';
        break;
      case 0x3C:
        b += '&lt;';
        break;
      case 0x3E:
        b += '&gt;';
        break;
      default:
        if ((code >= 0x20) && (code <= 0x7E)) {
          b += String.fromCharCode(code);
        } else {
          b += ' ';
        }
    }
  }
  return b;
};

DebugJS.escape = function(s, c) {
  if (c instanceof Array) {
    for (var i = 0; i < c.length; i++) {
      s = DebugJS._escape(s, c[i]);
    }
  } else {
    s = DebugJS._escape(s, c);
  }
  return s;
};
DebugJS._escape = function(s, c) {
  return s.replace(new RegExp(c, 'g'), '\\' + c);
};
DebugJS.escHtml = function(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
};
DebugJS.escSpclCh = function(s) {
  return (s + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
DebugJS.escCtrlCh = function(s) {
  return s.replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\f/g, '\\f');
};
DebugJS.decCtrlCh = function(s) {
  return s.replace(/\\t/g, '\t').replace(/\\v/g, '\v').replace(/\\r/g, '\r').replace(/\\n/g, '\n').replace(/\\f/g, '\f');
};
DebugJS.hlCtrlCh = function(s, sp) {
  var st = '<span class="dbg-txt-hl">';
  var et = '</span>';
  if (sp) s = s.replace(/ /g, st + ' ' + et);
  s = s.replace(/\0/g, st + '\\0' + et);
  s = s.replace(/\t/g, st + '\\t' + et);
  s = s.replace(/\v/g, st + '\\v' + et);
  s = s.replace(/\r/g, st + '\\r' + et);
  s = s.replace(/\n/g, st + '\\n' + et);
  s = s.replace(/\f/g, st + '\\f' + et);
  return s;
};

DebugJS.getType = function(o) {
  var t = typeof o;
  if (t != 'object') return t;
  if (o === undefined) return 'undefined';
  if (o === null) return 'null';
  if (o instanceof Array) return 'Array';
  if (o instanceof Set) return 'Set';
  t = Object.prototype.toString.call(o);
  if ((t != '[object Object]') && DebugJS.startsWith(t, '[object ')) {
    return t.substr(8, t.length - 9);
  }
  return 'object';
};

DebugJS.html2text = function(html) {
  var p = document.createElement('pre');
  p.innerHTML = html;
  return p.innerText;
};

DebugJS.addClass = function(el, n) {
  if (DebugJS.hasClass(el, n)) return;
  if (el.className == '') {
    el.className = n;
  } else {
    el.className += ' ' + n;
  }
};
DebugJS.removeClass = function(el, n) {
  var names = el.className.split(' ');
  var nm = '';
  for (var i = 0; i < names.length; i++) {
    if (names[i] != n) {
      if (i > 0) nm += ' ';
      nm += names[i];
    }
  }
  el.className = nm;
};
DebugJS.hasClass = function(el, n) {
  var names = el.className.split(' ');
  for (var i = 0; i < names.length; i++) {
    if (names[i] == n) return true;
  }
  return false;
};
DebugJS.setStyle = function(el, n, v) {
  el.style.setProperty(n, v, 'important');
};
DebugJS.setStyles = function(e, s, f) {
  if (s) {
    for (var k in s) {
      if (f) {
        e.style[k] = s[k];
      } else {
        DebugJS.setStyle(e, k, s[k]);
      }
    }
  }
};

DebugJS.copyProp = function(src, dst) {
  for (var k in src) {
    dst[k] = src[k];
  }
};

DebugJS.sleep = function(ms) {
  ms |= 0;
  var t1 = DebugJS.now();
  while (true) {
    var t2 = DebugJS.now();
    if (t2 - t1 > ms) break;
  }
};

DebugJS.createCttInfo = function(fInfo, bInfo) {
  var s = '<span style="color:#cff">';
  if (fInfo) s += fInfo;
  if (bInfo) s += bInfo;
  s += '</span>';
  return s;
};
DebugJS.getFileInfo = function(file) {
  var lastMod = (file.lastModified ? file.lastModified : file.lastModifiedDate);
  var fileDate = DebugJS.getDateTimeStr(lastMod, true);
  var s = 'File    : ' + file.name + '\n' +
  'Type    : ' + file.type + '\n' +
  'Size    : ' + DebugJS.formatDec(file.size) + ' ' + DebugJS.plural('byte', file.size) + '\n' +
  'Modified: ' + fileDate + '\n';
  return s;
};
DebugJS.getBinInfo = function(b) {
  var inf = '';
  var t = DebugJS.getBinType(b);
  if (t) inf = DebugJS._getBinInfo[t](b) + '\n';
  return inf;
};
DebugJS.getBinType = function(b) {
  var HDR = {exe: 0x4D5A, java: 0xCAFEBABE};
  var t = '';
  for (var k in HDR) {
    if (DebugJS.chkBinHdr(b, HDR[k])) {
      t = k;break;
    }
  }
  return t;
};
DebugJS._getBinInfo = {
  exe: function(b) {
    var pe = -1;
    var len = 512;
    for (var i = 0; i < len; i++) {
      if (i + 3 >= len) break;
      var ptn = DebugJS.scanBin(b, i, 4);
      if (ptn == 0x50450000) {
        pe = i;break;
      }
    }
    var v = 0;
    if ((pe >= 0) && (pe + 5 < len)) {
      v = DebugJS.scanBin(b, pe + 4, 2);
    }
    var r = '';
    var arch = '';
    if (v == 0x6486) {
      arch = 'x86-64 (64bit)';
    } else if (v == 0x4C01) {
      arch = 'x86 (32bit)';
    }
    if (arch) r += 'Arch    : ' + arch;
    return r;
  },
  java: function(b) {
    var v = b[7];
    var j;
    if (v <= 48) {
      j = '1.' + v - 44;
    } else {
      j = v - 44;
    }
    var r = '';
    if (j) r += 'Java ver: Java SE ' + j + ' (' + DebugJS.toHex(v, true, '0x', 2) + ')';
    return r;
  }
};
DebugJS.scanBin = function(b, p, ln) {
  var upto = 6;
  if ((p + (ln - 1) >= b.length) || (ln > upto)) return -1;
  var r = 0;
  for (var i = 0; i < ln; i++) {
    var d = b[p + i] * Math.pow(256, ln - (i + 1));
    r += d;
  }
  return r;
};
DebugJS.chkBinHdr = function(b, v) {
  var ln = (DebugJS.getBaseLog(256, v) + 1) | 0;
  return (v == DebugJS.scanBin(b, 0, ln));
};

DebugJS.getBaseLog = function(x, y) {
  return Math.log(y) / Math.log(x);
};

DebugJS.getLogBufSize = function() {
  return DebugJS.ctx.logBuf.size();
};
DebugJS.setLogBufSize = function(n) {
  if (n > 0) DebugJS.ctx.initBuf(DebugJS.ctx, n);
};
DebugJS.dumpLog = function(fmt, b64, fmtTime) {
  var buf = DebugJS.ctx.logBuf.getAll();
  var b = [];
  var l = '';
  for (var i = 0; i < buf.length; i++) {
    var data = buf[i];
    var type = data.type;
    var time = (fmtTime ? DebugJS.getDateTimeStr(data.time) : data.time);
    var msg = data.msg;
    if (fmt == 'json') {
      l = {type: type, time: time, msg: DebugJS.encodeB64(msg)};
      b.push(l);
    } else {
      var lv = 'LOG';
      switch (type) {
        case DebugJS.LOG_TYPE_VRB:
          lv = 'VRB';
          break;
        case DebugJS.LOG_TYPE_DBG:
          lv = 'DBG';
          break;
        case DebugJS.LOG_TYPE_INF:
          lv = 'INF';
          break;
        case DebugJS.LOG_TYPE_WRN:
          lv = 'WRN';
          break;
        case DebugJS.LOG_TYPE_ERR:
          lv = 'ERR';
          break;
        case DebugJS.LOG_TYPE_FTL:
          lv = 'FTL';
          break;
        case DebugJS.LOG_TYPE_SYS:
          lv = 'SYS';
          break;
        case DebugJS.LOG_TYPE_RES:
        case DebugJS.LOG_TYPE_ERES:
          msg = '> ' + msg;
      }
      l += time + '\t' + lv + '\t' + msg + '\n';
    }
  }
  if (fmt == 'json') l = JSON.stringify(b);
  if (b64) l = DebugJS.encodeB64(l);
  return l;
};
DebugJS.sendLog = function(url, pName, param, extInfo, flg, cb) {
  var b = DebugJS.createLogData(extInfo, flg);
  var data = DebugJS.http.buildParam(param);
  if (data != '') data += '&';
  if (DebugJS.isEmptyVal(pName)) pName = 'data';
  data += pName + '=' + encodeURIComponent(b);
  var r = {
    url: url,
    method: 'POST',
    data: data
  };
  DebugJS.http(r, (cb ? cb : DebugJS.sendLogCb));
};
DebugJS.sendLogCb = function(xhr) {
  var st = xhr.status;
  if (st == 200) {
    DebugJS._log('Send Log OK');
  } else {
    DebugJS._log.e('Send Log ERR (' + st + ')');
  }
};
DebugJS.createLogData = function(extInfo, flg) {
  var LINE = '------------------------------------------------------------------------\n';
  if (flg == undefined) flg = 'head|log';
  var info = ['', '', '', ''];
  if (extInfo) {
    if (extInfo.info0) info[0] = extInfo.info0;
    if (extInfo.info1) info[1] = extInfo.info1;
    if (extInfo.info2) info[2] = extInfo.info2;
    if (extInfo.info3) info[3] = extInfo.info3;
  }
  var b = '';
  if (info[0]) {
    b = DebugJS.strcatWnl(b, info[0]);
  }
  if (DebugJS.hasKeyWd(flg, 'head', '|')) {
    b += LINE + DebugJS.createLogHeader() + LINE;
  }
  if (info[1]) {
    info[1] = DebugJS.crlf2lf(info[1]);
    b = DebugJS.strcatWnl(b, info[1]);
    b += LINE;
  }
  if (DebugJS.hasKeyWd(flg, 'log', '|')) {
    var logTxt = DebugJS.dumpLog('text', false, true);
    logTxt = DebugJS.html2text(logTxt);
    logTxt = DebugJS.crlf2lf(logTxt);
    if (DebugJS.needNL(b, 2)) b += '\n';
    b += DebugJS.LOG_HEAD + '\n' + logTxt;
    if (DebugJS.needNL(logTxt, 1)) b += '\n';
  }
  if (info[2]) {
    b += '\n';
    b = DebugJS.strcatWnl(b, info[2]);
  }
  if (DebugJS.hasKeyWd(flg, 'b64buf', '|')) {
    var b64log = DebugJS.dumpLog('json', true, false);
    if (DebugJS.needNL(b, 2)) b += '\n';
    b += DebugJS.LOG_BOUNDARY_BUF + '\n' + b64log + '\n';
  }
  if (info[3]) {
    b += '\n';
    b = DebugJS.strcatWnl(b, info[3]);
  }
  return b;
};
DebugJS.createLogHeader = function() {
  var dt = DebugJS.getDateTime();
  var brw = DebugJS.getBrowserType();
  var s = 'Sending Time : ' + DebugJS.getDateTimeStr(dt.time) + ' ' + DebugJS.getTimeOffsetStr(dt.offset, true) + '\n';
  s += 'Timestamp    : ' + dt.time + '\n';
  s += 'Browser      : ' + brw.name + (brw.version == '' ? '' : ' ' + brw.version) + '\n';
  s += 'User Agent   : ' + navigator.userAgent + '\n';
  s += 'Screen Size  : w=' + screen.width + ' h=' + screen.height + '\n';
  s += 'Window Size  : w=' + document.documentElement.clientWidth + ' h=' + document.documentElement.clientHeight + '\n';
  s += 'Body Size    : w=' + document.body.clientWidth + ' h=' + document.body.clientHeight + '\n';
  s += 'Zoom Ratio   : ' + DebugJS.getWinZoomRatio() + '\n';
  s += 'Language     : ' + navigator.language;
  var navLangs = navigator.languages;
  if (navLangs) {
    s += ' (';
    for (var i = 0; i < navLangs.length; i++) {
      if (i > 0) s += ', ';
      s += navLangs[i];
    }
    s += ')';
  }
  s += '\n';
  return s;
};
DebugJS.loadLog = function(json, b64) {
  var ctx = DebugJS.ctx;
  if (b64) json = DebugJS.decodeB64(json);
  var buf = JSON.parse(json);
  if (ctx.logBuf.size() < buf.length) {
    ctx.logBuf = new DebugJS.RingBuffer(buf.length);
  }
  for (var i = 0; i < buf.length; i++) {
    var bf = buf[i];
    bf.msg = DebugJS.decodeB64(bf.msg);
    ctx.logBuf.add(bf);
  }
};
DebugJS.preserveLog = function() {
  var v = DebugJS.dumpLog('json');
  localStorage.setItem('DebugJS-log', v);
};
DebugJS.restoreLog = function() {
  var s = localStorage.getItem('DebugJS-log');
  if (!s) return;
  localStorage.removeItem('DebugJS-log');
  DebugJS.loadLog(s);
};

DebugJS.saveStatus = function() {
  var ctx = DebugJS.ctx;
  var data = {
    status: ctx.status,
    toolStatus: ctx.toolStatus,
    toolsActvFnc: ctx.toolsActvFnc,
    toolTimerMode: ctx.toolTimerMode,
    timerClockSSS: ctx.timerClockSSS,
    timerExpTime: ctx.timerExpTime,
    timerSwTimeCd: ctx.timerSwTimeCd,
    timerSwTimeCdContinue: ctx.timerSwTimeCdContinue,
    featStackBak: ctx.featStack,
    props: ctx.props,
    timers: ctx.timers,
    alias: ctx.CMD_ALIAS
  };
  var st = JSON.stringify(data);
  localStorage.setItem('DebugJS-st', st);
};
DebugJS.loadStatus = function() {
  var st = localStorage.getItem('DebugJS-st');
  if (st == null) return st;
  localStorage.removeItem('DebugJS-st');
  return JSON.parse(st);
};

DebugJS.cookie = {};
DebugJS.cookie.getAll = function() {
  var a = document.cookie.replace(/\s/g, '').split(';');
  var c = {};
  for (var i = 0; i < a.length; i++) {
    var nv = a[i].split('=');
    if (nv[1] == undefined) {
      if (nv[0] != '') {
        c[''] = nv[0];
      }
    } else {
      c[nv[0]] = nv[1];
    }
  }
  return c;
};
DebugJS.cookie.get = function(k) {
  return DebugJS.cookie.getAll()[k];
};
DebugJS.cookie.getKeys = function() {
  var c = DebugJS.cookie.getAll();
  var a = [];
  for (var k in c) {
    a.push(k);
  }
  return a;
};
DebugJS.cookie.set = function(k, v) {
  document.cookie = k + '=' + v;
};
DebugJS.cookie.delete = function(k) {
  document.cookie = k + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};
DebugJS.cookie.deleteAll = function() {
  var k = DebugJS.cookie.getKeys();
  for (var i = 0; i < k.length; i++) {
    DebugJS.cookie.delete(k[i]);
  }
};

DebugJS.file = {};
DebugJS.file.loaders = [];
DebugJS.file.ongoingLdr = null;
DebugJS.file.onDragOver = function(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
};
DebugJS.file.onDrop = function(e) {
  var ctx = DebugJS.ctx;
  ctx.onDrop(e);
  var loader = null;
  for (var i = 0; i < DebugJS.file.loaders.length; i++) {
    loader = DebugJS.file.loaders[i];
    if (DebugJS.isTargetEl(e.target, loader.el)) {
      DebugJS.file.ongoingLdr = loader;
      break;
    }
  }
  if (i == DebugJS.file.loaders.length) {
    DebugJS._log.e('onDrop(): loader not found');
    return;
  }
  var d = e.dataTransfer.getData('text');
  if (d) {
    DebugJS.file.callCb(loader, d, null);
  } else {
    var f = (ctx.status & DebugJS.ST_TOOLS ? false : true);
    ctx.openFeature(ctx, DebugJS.ST_TOOLS, 'file', loader.mode);
    if (f) ctx.closeTools(ctx);
    ctx.handleDroppedFile(ctx, e, loader.mode, null);
  }
};
DebugJS.isTargetEl = function(tgt, el) {
  do {
    if (tgt == el) return true;
    tgt = tgt.parentNode;
  } while (tgt != null);
  return false;
};
DebugJS.file.onLoaded = function(file, ctt) {
  var loader = DebugJS.file.ongoingLdr;
  if (!loader || !loader.cb) return;
  if ((loader.mode == 'b64') && loader.decode) {
    ctt = DebugJS.decodeB64(DebugJS.splitDataUrl(ctt).data);
  }
  DebugJS.file.callCb(loader, ctt, file);
};
DebugJS.file.callCb = function(loader, ctt, file) {
  if (loader.cb) {
    if (loader.txtOnly) {
      loader.cb(ctt);
    } else {
      loader.cb(file, ctt);
    }
  }
};
DebugJS.file.finalize = function() {
  DebugJS.file.ongoingLdr = null;
};
DebugJS.addFileLoader = function(el, cb, mode, decode, txtOnly) {
  el = DebugJS.getElement(el);
  if (!el) {
    DebugJS._log.e('addFileLoader(): target element is ' + el);
    return;
  }
  el.addEventListener('dragover', DebugJS.file.onDragOver, false);
  el.addEventListener('drop', DebugJS.file.onDrop, false);
  var loader = {el: el, mode: mode, decode: decode, txtOnly: txtOnly, cb: cb};
  DebugJS.file.loaders.push(loader);
};
DebugJS.addDropHandler = function(el, cb) {
  DebugJS.addFileLoader(el, cb, 'b64', true, true);
};

DebugJS.getOptionValue = function(k) {
  return DebugJS.ctx.opt[k];
};
DebugJS.getStatus = function() {
  return DebugJS.ctx.status;
};
DebugJS.getUiStatus = function() {
  return DebugJS.ctx.uiStatus;
};
DebugJS.getFeatureStack = function() {
  return DebugJS.ctx.featStack.concat();
};
DebugJS.show = function() {
  DebugJS.ctx.showDbgWin();
};
DebugJS.hide = function() {
  DebugJS.ctx.closeDbgWin();
};
DebugJS.kiosk = function(z) {
  var ctx = DebugJS.ctx;
  if (!(ctx.status & DebugJS.ST_KIOSK)) {
    ctx.status |= DebugJS.ST_KIOSK;
    if (!z) z = 1.4;
    ctx.kiosk(ctx, z);
  }
};
DebugJS.opacity = function(v) {
  if (v > 1) {
    v = 1;
  } else if (v < 0.1) {
    v = 0.1;
  }
  DebugJS.ctx.win.style.opacity = v;
};
DebugJS.isVisible = function() {
  if (DebugJS.ctx.uiStatus & DebugJS.UI_ST_VISIBLE) return true;
  return false;
};
DebugJS.pos = function(x, y) {
  DebugJS.ctx._cmdDbgWinPos(DebugJS.ctx, x, y);
};
DebugJS.size = function(w, h) {
  DebugJS.ctx._cmdDbgWinSize(DebugJS.ctx, w, h);
};
DebugJS.pin = function(f) {
  if (f == undefined) return ((DebugJS.ctx.uiStatus & DebugJS.UI_ST_DRAGGABLE) ? false : true);
  var fn = (f ? 'disableDraggable' : 'enableDraggable');
  DebugJS.ctx[fn](DebugJS.ctx);
  return DebugJS.pin();
};
DebugJS.zoom = function(n) {
  var ctx = DebugJS.ctx;
  if (n == undefined) {
    return ctx.zoom;
  } else if (n == 0) {
    n = ctx.opt.zoom;
  }
  var rstrOpt = {
    cause: DebugJS.INIT_CAUSE_ZOOM,
    status: ctx.status,
    sizeStatus: ctx.sizeStatus
  };
  ctx.featStackBak = ctx.featStack.concat();
  ctx.finalizeFeatures(ctx);
  ctx.setWinSize('normal');
  ctx.zoom = n;
  ctx.init(null, rstrOpt);
  return n;
};
DebugJS.isTmrMode = function() {
  return ((DebugJS.ctx.status & DebugJS.ST_TOOLS) && (DebugJS.ctx.toolsActvFnc & DebugJS.TOOLS_FNC_TIMER));
};

DebugJS._log = function(m) {
  if (m instanceof Object) {
    DebugJS._log.p(m, 0, null, false);
  } else {
    DebugJS._log.out(m, DebugJS.LOG_TYPE_LOG);
  }
};
DebugJS._log.v = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_VRB);
};
DebugJS._log.d = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_DBG);
};
DebugJS._log.i = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_INF);
};
DebugJS._log.w = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_WRN);
};
DebugJS._log.e = function(m) {
  DebugJS._log._e(m, DebugJS.LOG_TYPE_ERR);
};
DebugJS._log.f = function(m) {
  DebugJS._log._e(m, DebugJS.LOG_TYPE_FTL);
};
DebugJS._log._e = function(m, t) {
  if (DebugJS.bat.hasBatStopCond('error')) {
    DebugJS.bat.ctrl.stopReq = true;
  }
  DebugJS._log.out(m, t);
  DebugJS.ctx.showDbgWinOnError(DebugJS.ctx);
  if (!DebugJS.ctx.preventErrCb) {
    DebugJS.callEvtListeners('error');
  }
};
DebugJS._log.s = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_SYS);
};
DebugJS._log.p = function(o, l, m, j) {
  var s = (m ? m : '') + '\n' + DebugJS.objDump(o, j, l, DebugJS.ctx.props.dumplimit, DebugJS.ctx.props.dumpvallen);
  if (j) s = DebugJS.escHtml(s);
  DebugJS._log.out(s, DebugJS.LOG_TYPE_LOG);
};
DebugJS._log.res = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_RES);
};
DebugJS._log.res.err = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_ERES);
};
DebugJS._log.mlt = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_MLT);
};
DebugJS._log.out = function(m, type) {
  m = DebugJS.setStyleIfObjNA(m);
  if (typeof m != 'string') {m = m.toString();}
  var data = {type: type, time: DebugJS.now(), msg: m};
  DebugJS.ctx.logBuf.add(data);
  if (!(DebugJS.ctx.status & DebugJS.ST_INITIALIZED)) {
    if (!DebugJS._init()) return;
  }
  DebugJS.ctx.printLogs();
};

DebugJS.stack = function(ldx, q) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  var stk;
  try {
    DebugJS.a.b;
  } catch (e) {
    stk = e.stack.split('\n');
  }
  ldx |= 0;
  var cnt = 0, skp = 0;
  var rslt = '';
  for (var i = 0; i < stk.length; i++) {
    var s = stk[i];
    if (s.match(/^TypeError.*/) || s.match(/^DebugJS\.stack@.*/) || s.match(/^\s+at\s.*DebugJS\.stack\s/)) continue;
    if (skp < ldx) {skp++;continue;}
    if (cnt > 0) {rslt += '\n';}
    rslt += DebugJS.delLeadingSP(s).replace(/^at /, '');cnt++;
  }
  if (!q) DebugJS._log('Stack:\n' + DebugJS.escHtml(rslt));
  return rslt;
};
DebugJS.stktop = function(idx) {
  return DebugJS.stack((idx | 0) + 1, true).split('\n')[0];
};
DebugJS.line = function(idx) {
  return DebugJS._line(DebugJS.stktop((idx | 0) + 1));
};
DebugJS._line = function(s) {
  var a = s.split(':');
  var l = a[a.length - 2] | 0;
  return l;
};
DebugJS.funcname = function(idx) {
  return DebugJS._funcname(DebugJS.stktop((idx | 0) + 1));
};
DebugJS._funcname = function(s) {
  return s.replace(/@/, ' ').replace(/^(.*?)\s.*/, '$1');
};
DebugJS.filename = function(idx, abs) {
  return DebugJS._filename(DebugJS.stktop((idx | 0) + 1), idx, abs);
};
DebugJS._filename = function(s, idx, abs) {
  if (s == '') return s;
  var n = s.replace(/@/, ' ');
  n = n.replace(/^.*?\s/, '');
  n = n.replace(/^\(/, '');
  n = n.replace(/\)$/, '');
  n = n.replace(/:\d+$/, '');
  n = n.replace(/:\d+$/, '');
  if (!abs) {
    var p = n.split('/');
    n = p[p.length - 1];
    if (n == '') {
      if ((p.length >= 2) && (p.length != 4)) {
        n = p[p.length - 2];
      }
      n += '/';
    }
  }
  if ((n == '<anonymous>') || (n == 'Unknown script code')) {
    n = '&lt;anonymous&gt;';
  } else if ((n == 'code (eval code') || n.match(/> eval$/) || n.match(/<anonymous>$/)) {
    n = '*eval*';
  }
  return n;
};
DebugJS.fileline = function(idx, abs) {
  var s = DebugJS.stktop((idx | 0) + 1);
  if (s == '') return s;
  var f = DebugJS._filename(s, idx, abs);
  var l = DebugJS._line(s);
  return f + ':' + l;
};

DebugJS.inject = function(fn, cd) {
  try {
    var f = eval(fn + '+\'\'');
    var p = f.indexOf('{') + 1;
    if (p > 0) {
      var fnc = f.substr(0, p) + cd + f.substr(p);
      eval(fn + '=' + fnc);
    }
  } catch (e) {
    DebugJS._log.e(e);
  }
};
DebugJS.stk = function(fn) {
  DebugJS.inject(fn, 'DebugJS.stack();');
};

DebugJS.time = {};
DebugJS.time.start = function(nm, msg) {
  var _nm = nm;
  if ((nm === undefined) || (nm === null)) {
    _nm = DebugJS.DFLT_TMR_NM;
  }
  DebugJS.ctx.timers[_nm] = {};
  DebugJS.ctx.timers[_nm].start = DebugJS.now();
  if ((msg === null) || ((nm === null) && (msg === undefined))) {
    return;
  }
  var s;
  if (msg === undefined) {
    s = _nm + ': timer started';
  } else {
    s = msg.replace(/%n/g, _nm).replace(/%t/g, '<span style="color:' + DebugJS.ctx.opt.timerColor + '">' + DebugJS.TIME_RST_STR + '</span>');
  }
  DebugJS._log(s);
};
DebugJS.time.s = DebugJS.time.start;
DebugJS.time.restart = function(nm) {
  var now = DebugJS.now();
  var ctx = DebugJS.ctx;
  if (ctx.timers[nm]) {
    var paused = now - ctx.timers[nm].pause;
    ctx.timers[nm].start = now - ctx.timers[nm].count;
    ctx.timers[nm].pause = 0;
    ctx.timers[nm].split += paused;
  } else {
    ctx.timers[nm] = {start: now, pause: 0, split: 0, count: 0};
  }
};
DebugJS.time.split = function(nm, msg) {
  var t = DebugJS.time._split(nm, false, msg);
  if ((msg === null) || ((nm === null) && (msg === undefined))) {
    return t;
  }
};
DebugJS.time._split = function(nm, isEnd, msg) {
  var now = DebugJS.now();
  var ctx = DebugJS.ctx;
  var _nm = nm;

  if ((nm === undefined) || (nm === null)) {
    _nm = DebugJS.DFLT_TMR_NM;
  }

  if (!ctx.timers[_nm]) {
    DebugJS._log.w(_nm + ': timer undefined');
    return null;
  }

  var prevSplit = ctx.timers[_nm].split;
  var t = DebugJS.getElapsedTimeStr(ctx.timers[_nm].start, now);
  var dt = '<span style="color:' + ctx.opt.timerColor + '">' + t + '</span>';

  if (isEnd) {
    delete ctx.timers[_nm];
  } else {
    ctx.timers[_nm].split = now;
  }

  if ((msg === null) || ((nm === null) && (msg === undefined))) {
    return t;
  }

  var dtLap = '';
  if (prevSplit) {
    var tLap = DebugJS.getElapsedTimeStr(prevSplit, now);
    dtLap = '<span style="color:' + ctx.opt.timerColor + '">' + tLap + '</span>';
  } else {
    if (!isEnd) {
      dtLap = dt;
    }
  }

  var s;
  if (msg === undefined) {
    s = _nm + ': ' + dt;
    if (dtLap != '') {
      s += '(' + DebugJS.CHR_DELTA + dtLap + ')';
    }
  } else {
    s = msg.replace(/%n/g, _nm).replace(/%lt/g, dtLap).replace(/%t/g, dt);
  }

  DebugJS._log(s);
  return t;
};
DebugJS.time.pause = function(nm) {
  var now = DebugJS.now();
  var ctx = DebugJS.ctx;
  if (!ctx.timers[nm]) return;
  ctx.timers[nm].pause = now;
  ctx.timers[nm].count = now - ctx.timers[nm].start;
};
DebugJS.time.end = function(nm, msg) {
  var t = DebugJS.time._split(nm, true, msg);
  if ((msg === null) || ((nm === null) && (msg === undefined))) {
    return t;
  }
};
DebugJS.time.e = DebugJS.time.end;
DebugJS.time.check = function(nm) {
  var now = new Date();
  if (nm === undefined) nm = DebugJS.DFLT_TMR_NM;
  if (!DebugJS.ctx.timers[nm]) return null;
  var t = DebugJS.getElapsedTimeStr(DebugJS.ctx.timers[nm].start, now);
  return t;
};
DebugJS.time.list = function() {
  var l = '<span style="color:#ccc">no timers</span>';
  if (Object.keys(DebugJS.ctx.timers).length > 0) {
    l = '<table>';
    for (var k in DebugJS.ctx.timers) {
      l += '<tr><td>' + k + '</td><td><span style="color:' + DebugJS.ctx.opt.timerColor + '">' + DebugJS.time.check(k) + '</font></td></tr>';
    }
    l += '</table>';
  }
  DebugJS._log.mlt(l);
};
DebugJS.time.reset = function(nm) {
  var now = DebugJS.now();
  var ctx = DebugJS.ctx;
  ctx.timers[nm] = ctx.timers[nm] || {};
  ctx.timers[nm].start = now;
  ctx.timers[nm].split = now;
  ctx.timers[nm].pause = now;
  ctx.timers[nm].count = 0;
};
DebugJS.time.getCount = function(nm) {
  if (DebugJS.ctx.timers[nm]) {
    return DebugJS.ctx.timers[nm].count;
  } else {
    return 0;
  }
};
DebugJS.time.updateCount = function(nm) {
  if (DebugJS.ctx.timers[nm]) {
    DebugJS.ctx.timers[nm].count = DebugJS.now() - DebugJS.ctx.timers[nm].start;
  }
};
DebugJS.time.log = function(msg, nm) {
  var now = DebugJS.now();
  var ctx = DebugJS.ctx;
  if (!nm) nm = DebugJS.DFLT_TMR_NM;
  var t;
  var tLap;
  if (ctx.timers[nm]) {
    t = DebugJS.getElapsedTimeStr(ctx.timers[nm].start, now);
    tLap = DebugJS.getElapsedTimeStr(ctx.timers[nm].split, now);
    ctx.timers[nm].split = now;
  } else {
    ctx.timers[nm] = {};
    ctx.timers[nm].start = now;
    ctx.timers[nm].split = now;
    t = DebugJS.TIME_RST_STR;
    tLap = t;
  }
  var dt = '<span style="color:' + ctx.opt.timerColor + '">' + t + '</span>';
  var dtLap = '<span style="color:' + ctx.opt.timerColor + '">' + tLap + '</span>';
  var s = dt + ' ' + msg.replace(/%n/g, nm).replace(/%lt/g, dtLap).replace(/%t/g, dt);
  DebugJS._log(s);
};

DebugJS.stopwatch = function(n) {
  if (n != 2) n = 1;
  var ctx = DebugJS.ctx;
  if (!ctx.isAvailableTools(ctx)) return false;
  ctx.showDbgWin();
  ctx.openFeature(ctx, DebugJS.ST_TOOLS, 'timer', 'sw' + n);
  return true;
};
DebugJS.stopwatch.tmNm = [DebugJS.TMR_NM_SW_0, DebugJS.TMR_NM_SW_CU];
DebugJS.stopwatch.start = function(n, m) {
  if (n == 0) {
    DebugJS.ctx.startStopwatch();
  } else {
    n = 1;
    if (DebugJS.stopwatch()) {
      DebugJS.ctx.startTimerStopwatchCu();
    }
  }
  if (m) DebugJS.stopwatch.log(n, m);
};
DebugJS.stopwatch.stop = function(n) {
  if (n == 0) {
    DebugJS.ctx.stopStopwatch();
  } else {
    if (DebugJS.stopwatch()) {
      DebugJS.ctx.stopTimerStopwatchCu();
    }
  }
};
DebugJS.stopwatch.end = function(n, m) {
  if (n == 0) {
    DebugJS.ctx.endStopwatch();
  } else {
    n = 1;
    if (DebugJS.stopwatch()) {
      DebugJS.ctx.endTimerStopwatchCu();
    }
  }
  if (m) DebugJS.stopwatch.log(n, m);
  return DebugJS.stopwatch.val(n);
};
DebugJS.stopwatch.split = function(n, m) {
  if (n != 0) n = 1;
  var nm = DebugJS.stopwatch.tmNm[n];
  if (DebugJS.ctx.isAvailableTools(DebugJS.ctx)) {
    m = nm + ': %t(' + DebugJS.CHR_DELTA + '%lt)' + (m == undefined ? '' : ' ' + m);
    DebugJS.time._split(nm, false, m);
  }
};
DebugJS.stopwatch.reset = function(n) {
  if (n == 0) {
    DebugJS.ctx.resetStopwatch();
  } else {
    if (DebugJS.stopwatch()) {
      DebugJS.ctx.resetTimerStopwatchCu();
    }
  }
};
DebugJS.stopwatch.val = function(n) {
  if (n != 0) n = 1;
  var nm = DebugJS.stopwatch.tmNm[n];
  DebugJS.time.updateCount(nm);
  return DebugJS.time.getCount(nm);
};
DebugJS.stopwatch.log = function(n, msg) {
  var nm = DebugJS.stopwatch.tmNm[n];
  var t = DebugJS.getTmrStr(DebugJS.time.getCount(nm));
  var m = nm + ': <span style="color:' + DebugJS.ctx.opt.timerColor + '">' + t + '</span>';
  if (msg != undefined) m += ' ' + msg;
  DebugJS._log(m);
};

DebugJS.addCmdListener = function(fn) {
  DebugJS.ctx.cmdListeners.push(fn);
};
DebugJS.addEvtListener = function(type, fn) {
  var l = DebugJS.ctx.evtListener[type];
  if (l) {
    l.push(fn);
  } else {
    DebugJS._log.e('No such event: ' + type);
  }
};
DebugJS.callEvtListeners = function(type, a1, a2, a3) {
  var fns = DebugJS.ctx.evtListener[type];
  return DebugJS.callListeners(fns, a1, a2, a3);
};
DebugJS.callListeners = function(fns, a1, a2, a3) {
  for (var i = fns.length - 1; i >= 0; i--) {
    var fn = fns[i];
    if (fn) {
      if (fn(a1, a2, a3) === false) return false;
    }
  }
  return true;
};

DebugJS.trimEchoStr = function(s) {
  return DebugJS.trimDownText(s, DebugJS.CMD_ECHO_MAX_LEN, 'color:#aaa');
};

DebugJS.cmd = function(c, echo, sv) {
  return DebugJS.ctx._execCmd(c, echo, false, sv);
};
DebugJS.cmd.set = function(c) {
  if (DebugJS.ctx.cmdLine) DebugJS.ctx.cmdLine.value = c;
};
DebugJS.cmd.exec = function() {
  if (DebugJS.ctx.cmdLine) DebugJS.ctx.execCmd(DebugJS.ctx);
};
DebugJS.cmd.focus = function() {
  DebugJS.ctx.focusCmdLine();
};
DebugJS.cmd.blur = function() {
  DebugJS.ctx.blurCmdLine();
};
DebugJS.cmd.hasFocus = function() {
  return document.activeElement == DebugJS.ctx.cmdLine;
};
DebugJS.cmd.toggleFocus = function() {
  if (DebugJS.cmd.hasFocus()) {
    DebugJS.cmd.blur();
  } else {
    DebugJS.cmd.focus();
  }
};
DebugJS.cmd.setMode = function(m) {
  if (m != 'password') m = 'text';
  DebugJS.ctx.cmdLine.type = m;
};
DebugJS.cmd.saveHistory = function(f) {
  var b = DebugJS.ST_NO_HIST;
  if (f) {
    DebugJS.ctx.status &= ~b;
  } else {
    DebugJS.ctx.status |= b;
  }
};
DebugJS.cmd.getElement = function() {
  return DebugJS.ctx.cmdLine;
};
DebugJS.getCmdVal = function(n) {
  return DebugJS.ctx.CMDVALS[n];
};
DebugJS.setCmdVal = function(n, v) {
  if (DebugJS.isSysVal(n)) {
    DebugJS._log.e('Error: ${' + n + '} is read-only');
  } else {
    DebugJS.ctx.CMDVALS[n] = v;
  }
};
DebugJS.isSysVal = function(n) {
  return (((n == '?') || (n.match(/^%.*%$/))) ? true : false);
};

DebugJS.cp2cb = function(s) {
  if ((DebugJS.ctx.status & DebugJS.ST_CLP) && (s !== undefined)) {
    DebugJS.copy2clpbd(s);
  }
};
DebugJS.copy2clpbd = function(s) {
  var b = DebugJS.ctx.bodyEl;
  var ta = document.createElement('textarea');
  ta.style.position = 'fixed';
  ta.style.left = '-9999';
  ta.value = s;
  b.appendChild(ta);
  ta.select();
  var r = document.execCommand('copy');
  b.removeChild(ta);
  return r;
};

DebugJS.bat = function(b, a, sl, el) {
  if (!b) return;
  var bat = DebugJS.bat;
  if (!(DebugJS.ctx.status & DebugJS.ST_INITIALIZED)) {
    bat.q = {b: b, a: a, sl: sl, el: el};
    return;
  }
  if (DebugJS.ctx.status & DebugJS.ST_BAT_RUNNING) bat.stCtx();
  bat.set(b);
  bat.setExecArg(a);
  bat.run.arg.s = sl;
  bat.run.arg.e = el;
  bat.setRunningSt(true);
  setTimeout(bat._run, 0);
};
DebugJS.bat.q = null;
DebugJS.bat.cmds = [];
DebugJS.bat.ctrl = {
  pc: 0,
  lr: 0,
  startPc: 0,
  endPc: 0,
  breakP: 0,
  delay: 0,
  echo: true,
  tmpEchoOff: false,
  js: 0,
  tmid: 0,
  lock: 0,
  block: [],
  fnArg: undefined,
  condKey: null,
  pauseKey: null,
  pauseTimeout: 0,
  pauseTmId: 0,
  cont: false,
  stopReq: false,
  execArg: '',
  label: '',
  fnnm: '',
  stack: []
};
DebugJS.bat.labels = {};
DebugJS.bat.fncs = {};
DebugJS.bat.ctx = [];
DebugJS.bat.set = function(b) {
  var ctx = DebugJS.ctx;
  var bat = DebugJS.bat;
  if (ctx.status & DebugJS.ST_BAT_RUNNING) {
    if (bat.nestLv() == 0) {
      bat.stop(DebugJS.EXIT_CLEARED);
    } else {
      bat.stopNext();
    }
  }
  if (b instanceof DebugJS.TextBuffer) b = b.toString();
  if (DebugJS.isB64Bat(b)) b = DebugJS.decodeB64(b);
  if (ctx.batTextEditor) {
    ctx.batTextEditor.value = b;
    ctx.onBatInput();
  }
  bat.store(b);
  if (bat.nestLv() > 0) {
    bat.inheritSt();
  }
};
DebugJS.bat.inheritSt = function() {
  var bat = DebugJS.bat;
  var callerCtrl = bat.ctx[bat.nestLv() - 1].ctrl;
  bat.ctrl.echo = callerCtrl.echo;
};
DebugJS.bat.store = function(b) {
  var bat = DebugJS.bat;
  b = b.replace(/(\r?\n|\r)/g, '\n');
  bat.cmds = b.split('\n');
  var last = bat.cmds.pop();
  if (last != '') {
    bat.cmds.push(last);
  }
  bat.parseLabelFncs();
  bat.initCtrl(true);
  DebugJS.ctx.updateTotalLine();
  DebugJS.ctx.updateBatNestLv();
};
DebugJS.bat.parseLabelFncs = function() {
  var bat = DebugJS.bat;
  var cmnt = 0;
  bat.labels = {};
  bat.fncs = {};
  for (var i = 0; i < bat.cmds.length; i++) {
    var c = DebugJS.delLeadingSP(bat.cmds[i]);
    if (c.substr(0, 2) == '/*') {
      cmnt++;
      continue;
    }
    if (DebugJS.delTrailingSP(c).slice(-2) == '*/') {
      cmnt--;
      continue;
    }
    if (cmnt > 0) continue;
    if ((c.charAt(0) == DebugJS.BAT_TKN_LABEL) && (c.length >= 2)) {
      var label = c.substr(1);
      bat.labels[label] = i;
    } else if (DebugJS.startsWith(c, DebugJS.BAT_TKN_FNC)) {
      var fn = DebugJS.splitArgs(c)[1];
      bat.fncs[fn] = i;
    }
  }
};
DebugJS.bat.run = function(s, e, a) {
  var bat = DebugJS.bat;
  bat.run.arg.s = s;
  bat.run.arg.e = e;
  if (a != undefined) {
    bat.setExecArg(a);
  }
  bat._run();
};
DebugJS.bat._run = function() {
  var bat = DebugJS.bat;
  bat.setRunningSt(false);
  bat.setExitStatus(DebugJS.EXIT_SUCCESS);
  if (bat.cmds.length == 0) {
    DebugJS._log('No batch script');
    return;
  }
  var s = bat.run.arg.s;
  var e = bat.run.arg.e;
  var sl, el;
  if ((s == undefined) || (s == '*')) {
    sl = 0;
  } else if (isNaN(s)) {
    if (s.charAt(0) == DebugJS.BAT_TKN_LABEL) s = s.substr(1);
    sl = bat.labels[s];
    if (sl == undefined) {
      DebugJS._log.e('No such label: ' + s);
      return;
    }
  } else {
    sl = (s | 0) - 1; if (sl < 0) sl = 0;
  }
  if (sl >= bat.cmds.length) {
    DebugJS._log.e('Out of range (1-' + bat.cmds.length + ')');
    return;
  }
  if ((e == undefined) || (e == '*')) {
    el = bat.cmds.length - 1;
  } else if (isNaN(e)) {
    if (e.charAt(0) == DebugJS.BAT_TKN_LABEL) e = e.substr(1);
    el = bat.labels[e];
    if (el == undefined) {
      DebugJS._log.e('No such label: ' + e);
      return;
    }
  } else {
    el = (e | 0) - 1; if (el < 0) el = 0;
  }
  if (el < sl) {
    el = sl;
  } else if (el >= bat.cmds.length) {
    el = bat.cmds.length - 1;
  }
  bat.setRunningSt(true);
  DebugJS.ctx.updateBatRunBtn();
  bat.initCtrl(false);
  var ctrl = bat.ctrl;
  if (bat.nestLv() == 0) {
    ctrl.echo = DebugJS.ctx.cmdEchoFlg;
  }
  DebugJS.ctx.updateCurPc();
  ctrl.startPc = sl;
  ctrl.endPc = el;
  bat.setExecArg(ctrl.execArg);
  bat.stopNext();
  if (bat.nestLv() == 0) DebugJS.callEvtListeners('batstart');
  bat.exec();
};
DebugJS.bat.run.arg = {s: 0, e: 0};
DebugJS.bat.clearTimer = function() {
  var ctrl = DebugJS.bat.ctrl;
  clearTimeout(ctrl.tmid);
  ctrl.tmid = 0;
};
DebugJS.bat.exec = function() {
  var ctx = DebugJS.ctx;
  var bat = DebugJS.bat;
  var ctrl = bat.ctrl;
  ctrl.tmid = 0;
  if ((ctx.status & DebugJS.ST_BAT_PAUSE) || (ctx.status & DebugJS.ST_BAT_PAUSE_CMD) || (ctx.status & DebugJS.ST_BAT_PAUSE_CMD_KEY)) {
    return;
  }
  if (ctrl.stopReq) {
    DebugJS._log.e('BAT ERROR STOPPED (L:' + ctrl.pc + ')');
    DebugJS._log.e('--------------------------------');
    for (var i = -3; i <= 0; i++) {
      var pc = ctrl.pc + i;
      var len = bat.cmds.length;
      if ((pc >= 0) && (pc < len)) {
        var n = pc + 1;
        var df = DebugJS.digits(len) - DebugJS.digits(n);
        var pdng = '';
        for (var j = 0; j < df; j++) {
          pdng += '0';
        }
        var pre = ((pc == (ctrl.pc - 1)) ? '&gt; ' : '  ');
        DebugJS._log.e(pre + pdng + n + ': ' + DebugJS.trimDownText(bat.cmds[pc], 98));
      }
    }
    DebugJS._log.e('--------------------------------');
    ctrl.stopReq = false;
    bat._exit(DebugJS.EXIT_FAILURE);
    return;
  }
  if (!(ctx.status & DebugJS.ST_BAT_RUNNING)) {
    bat.initCtrl(false);
    return;
  }
  if (ctrl.pc > ctrl.endPc) {
    if ((ctrl.pc == bat.cmds.length) && (ctrl.stack.length > 0)) {
      bat.ret();
      bat.next(0);
      return;
    }
    bat._exit(DebugJS.EXIT_SUCCESS);
    return;
  }
  if (bat.isLocked()) {
    ctrl.tmid = setTimeout(bat.exec, 50);
    return;
  }
  if (ctx.status & DebugJS.ST_BAT_BP) {
    ctx.status &= ~DebugJS.ST_BAT_BP;
    bat.setPc(--ctrl.pc);
  } else {
    if (ctrl.pc + 1 == ctrl.breakP) {
      ctx.status |= DebugJS.ST_BAT_BP;
      bat.setPc(++ctrl.pc, true);
      bat.pause();
      ctx.showDbgWin();
      return;
    }
  }
  var c = bat.cmds[ctrl.pc];
  if (c == undefined) {
    bat._exit(DebugJS.EXIT_CLEARED);
    return;
  }
  c = DebugJS.delLeadingSP(c);
  ctrl.pc++;
  var r = bat.prepro(ctx, c);
  ctx.updateCurPc();
  switch (r) {
    case 1:
      ctrl.tmpEchoOff = false;
      bat.next(0);
      return;
    case 2:
      ctrl.tmpEchoOff = false;
      return;
  }
  var echoFlg = (ctrl.echo && !ctrl.tmpEchoOff);
  ctrl.tmpEchoOff = false;
  if (ctrl.pc > ctrl.startPc) {
    ctx._execCmd(c, echoFlg);
  }
  bat.next(1);
};
DebugJS.bat.next = function(f) {
  var d = (f == 1 ? DebugJS.bat.ctrl.delay : 0);
  DebugJS.bat.ctrl.tmid = setTimeout(DebugJS.bat.exec, d);
};
DebugJS.bat.exec1 = function(l) {
  var cmd = DebugJS.bat.cmds[l - 1];
  if (cmd == undefined) return;
  if (DebugJS.bat.isPpTkn(cmd)) {
    DebugJS._log(cmd);
    return;
  }
  return DebugJS.ctx._execCmd(cmd, true);
};
DebugJS.bat.restart = function() {
  if (DebugJS.bat.ctrl.pauseTmId > 0) {
    DebugJS.bat.restartPauseTmr();
  } else {
    DebugJS.bat.exec();
  }
};
DebugJS.bat.isPpTkn = function(cmd) {
  var c = DebugJS.splitCmdLineInTwo(cmd)[0];
  if (c.match(/^\s*@/)) {
    c = c.substr(c.indexOf('@') + 1);
  }
  if (((c.charAt(0) == '#') || (c.substr(0, 2) == '//')) ||
      (DebugJS.delLeadingSP(cmd).substr(0, 2) == '/*') ||
      (DebugJS.delTrailingSP(cmd).slice(-2) == '*/') ||
      (c.charAt(0) == DebugJS.BAT_TKN_LABEL)) {
    return 1;
  }
  switch (c) {
    case DebugJS.BAT_TKN_IF:
    case DebugJS.BAT_TKN_LOOP:
    case DebugJS.BAT_TKN_BREAK:
    case DebugJS.BAT_TKN_CONTINUE:
    case DebugJS.BAT_TKN_JS:
    case DebugJS.BAT_TKN_TXT:
    case DebugJS.BAT_TKN_BLOCK_END:
      return 1;
  }
  if (DebugJS.delAllSP(cmd) == DebugJS.RE_ELSE) {
    return 1;
  }
  return 0;
};
DebugJS.bat._exit = function(st) {
  var bat = DebugJS.bat;
  bat.setExitStatus(st);
  if (!bat.ldCtx()) bat._stop(st);
};
DebugJS.bat.setExecArg = function(a) {
  a = ((a === undefined) ? '' : a);
  DebugJS.ctx.CMDVALS['%%ARG%%'] = a;
  DebugJS.bat.ctrl.execArg = a;
  DebugJS.ctx.setBatArgTxt(DebugJS.ctx);
};
DebugJS.bat.setLabel = function(s) {
  s = ((s === undefined) ? '' : s);
  DebugJS.ctx.CMDVALS['%LABEL%'] = s;
  DebugJS.bat.ctrl.label = s;
};
DebugJS.bat.setFnNm = function(s) {
  s = ((s === undefined) ? '' : s);
  DebugJS.ctx.CMDVALS['%FUNCNAME%'] = s;
  DebugJS.bat.ctrl.fnnm = s;
};
DebugJS.bat.setExitStatus = function(st) {
  if ((st == undefined) || (st == '')) {
    st = DebugJS.EXIT_SUCCESS;
  } else {
    try {
      st = eval(st);
    } catch (e) {
      DebugJS._log.e(e);
      st = DebugJS.EXIT_FAILURE;
    }
  }
  DebugJS.ctx.CMDVALS['?'] = st;
};
DebugJS.bat.prepro = function(ctx, cmd) {
  var b, r;
  var bat = DebugJS.bat;
  var ctrl = bat.ctrl;
  if (cmd.match(/^\s*@/)) {
    ctrl.tmpEchoOff = true;
    cmd = cmd.substr(cmd.indexOf('@') + 1);
  }
  cmd = DebugJS.replaceCmdVals(cmd);
  var cmds = DebugJS.splitCmdLineInTwo(cmd);
  var c = cmds[0];
  for (var key in ctx.CMD_ALIAS) {
    if (c == key) {
      cmd = cmd.replace(new RegExp(c), ctx.CMD_ALIAS[key]);
      cmd = DebugJS.replaceCmdVals(cmd);
      cmds = DebugJS.splitCmdLineInTwo(cmd);
      c = cmds[0];
      break;
    }
  }
  var a = DebugJS.splitArgs(cmds[1]);
  var pc = bat.nextExecLine(ctrl.pc - 1);
  if (pc != (ctrl.pc - 1)) {
    bat.setPc(pc);
    return 1;
  }
  if (c == DebugJS.BAT_TKN_FNC) {
    if (ctrl.stack.length == 0) {
      pc = bat.findEndOfFnc(ctrl.pc);
      bat.setPc(pc + 1);
    } else {
      DebugJS.bat.ret();
    }
    return 1;
  }
  if (c.charAt(0) == DebugJS.BAT_TKN_LABEL) {
    bat.setLabel(c.substr(1));
    return 1;
  }
  switch (c) {
    case 'nop':
      DebugJS._log('');
    case '':
      return 1;
    case 'echo':
      if (a[0] == 'off') {
        bat.ppEcho(cmd);
        ctrl[c] = false;
        return 1;
      } else if (a[0] == 'on') {
        bat.ppEcho(cmd);
        ctrl[c] = true;
        return 1;
      }
      break;
    case DebugJS.BAT_TKN_IF:
      if (ctrl.pc <= ctrl.startPc) return 1;
      r = bat.ppIf(c, cmds[1], cmd);
      if (!r.err) {
        if (r.cond) {
          ctrl.block.push({t: DebugJS.BAT_TKN_IF});
        } else {
          bat.ppElIf(ctrl.pc);
        }
      }
      return 1;
    case DebugJS.BAT_TKN_LOOP:
      if (ctrl.pc <= ctrl.startPc) return 1;
      r = bat.ppIf(c, cmds[1], cmd);
      var endBlk = bat.findEndOfBlock(DebugJS.BAT_TKN_LOOP, ctrl.pc);
      if (!r.err) {
        if (r.cond) {
          if ((ctrl.block.length == 0) ||
              ((ctrl.block.length > 0) && (ctrl.block[ctrl.block.length - 1].s != (ctrl.pc - 1)))) {
            ctrl.block.push({t: DebugJS.BAT_TKN_LOOP, s: (ctrl.pc - 1), e: endBlk.l});
          }
        } else {
          if ((ctrl.block.length > 0) && (ctrl.block[ctrl.block.length - 1].s == (ctrl.pc - 1))) {
            ctrl.block.pop();
          }
          ctrl.pc = endBlk.l + 1;
        }
      }
      return 1;
    case DebugJS.BAT_TKN_BREAK:
    case DebugJS.BAT_TKN_CONTINUE:
      while (ctrl.block.length > 0) {
        b = ctrl.block.pop();
        if (b.t == DebugJS.BAT_TKN_LOOP) {
          ctrl.pc = (c == DebugJS.BAT_TKN_BREAK ? (b.e + 1) : b.s);
          break;
        }
      }
      return 1;
    case DebugJS.BAT_TKN_JS:
      if (ctrl.js) {
        ctrl.js = 0;
      } else {
        ctrl.js = ((a[0] == 'pure') ? 1 : 2);
        bat.execJs();
      }
      return 1;
    case DebugJS.BAT_TKN_TXT:
      bat.text();
      return 1;
  }
  if (DebugJS.unifySP(cmd.trim()).match(DebugJS.RE_ELIF)) {
    b = ctrl.block.pop();
    if (b != undefined) {
      ctrl.pc = bat.findEndOfBlock(DebugJS.BAT_TKN_BLOCK_END, ctrl.pc).l + 1;
      return 1;
    }
  } else if (DebugJS.delAllSP(cmd) == DebugJS.RE_ELSE) {
    b = ctrl.block.pop();
    if (b != undefined) {
      ctrl.pc = bat.findEndOfBlock(DebugJS.BAT_TKN_IF, ctrl.pc).l + 1;
      return 1;
    }
  } else if (cmd.trim() == DebugJS.BAT_TKN_BLOCK_END) {
    if (ctrl.block.length > 0) {
      b = ctrl.block[ctrl.block.length - 1];
      if (b.t == DebugJS.BAT_TKN_LOOP) {
        if (b.e == (ctrl.pc - 1)) {
          ctrl.pc = b.s;
        }
      } else {
        ctrl.block.pop();
      }
      return 1;
    }
  }
  if (ctrl.pc <= ctrl.startPc) {
    return 1;
  }
  switch (c) {
    case 'exit':
      bat.ppEcho(cmd);
      bat._exit(cmds[1]);
      return 2;
    case 'wait':
      var w = cmds[1];
      if (w == '') {
        w = ctx.props.wait;
      } else if (DebugJS.isTmStr(w)) {
        w = DebugJS.str2ms(w);
      } else if (!(DebugJS.isTimeFormat(w) || w.match(/\|/))) {
        try {
          w = eval(w);
        } catch (e) {
          DebugJS._log.e(e);
        }
      }
      w += '';
      if (w.match(/\|/)) {
        w = DebugJS.calcNextTime(w).t;
      }
      if (DebugJS.isTimeFormat(w)) {
        w = DebugJS.calcTargetTime(w);
      }
      bat.ppEcho(cmd);
      ctrl.tmid = setTimeout(bat.exec, w | 0);
      return 2;
  }
  if (ctrl.js) {
    ctrl.pc--;
    bat.execJs();
    return 1;
  }
  return 0;
};
DebugJS.bat.nextExecLine = function(pc) {
  var bat = DebugJS.bat;
  while (pc <= bat.ctrl.endPc) {
    pc = DebugJS.bat.nextELOC(pc);
    var cmd = bat.cmds[pc];
    if (cmd == undefined) return pc;
    pc++;
    var cmds = DebugJS.splitCmdLineInTwo(cmd);
    var c = cmds[0];
    if ((c == DebugJS.BAT_TKN_FNC) && (bat.ctrl.stack.length == 0)) {
      pc = bat.findEndOfFnc(pc) + 1;
    } else {
      pc--;
      break;
    }
  }
  return pc;
};
DebugJS.bat.nextELOC = function(pc) {
  var bat = DebugJS.bat;
  var cmnt = 0;
  while (pc <= bat.ctrl.endPc) {
    var cmd = bat.cmds[pc];
    pc++;
    var cmds = DebugJS.splitCmdLineInTwo(cmd);
    var c = cmds[0];
    if ((c == '') || (c.charAt(0) == '#') || (c.substr(0, 2) == '//')) {
      continue;
    }
    if (DebugJS.delLeadingSP(cmd).substr(0, 2) == '/*') {
      cmnt++;
      continue;
    }
    if (DebugJS.delTrailingSP(cmd).slice(-2) == '*/') {
      cmnt--;
      if (cmnt < 0) {
        bat.syntaxErr(cmd);
        break;
      }
      continue;
    }
    if (cmnt == 0) {
      pc--;
      break;
    }
  }
  return pc;
};
DebugJS.bat.ppIf = function(t, cnd, cmd) {
  var r = {cond: false, err: true};
  var v = cnd.trim();
  if (DebugJS.endsWith(v, DebugJS.BAT_TKN_BLOCK_START)) {
    v = v.substr(0, v.length - 1);
    if ((t == DebugJS.BAT_TKN_LOOP) && (v == '')) {
      r.cond = true;r.err = false;
      return r;
    }
    v = DebugJS.replaceCmdVals(v);
    try {
      r.cond = eval(v);
      r.err = false;
    } catch (e) {
      DebugJS._log.e(e);
    }
  } else {
    DebugJS.bat.syntaxErr(cmd);
  }
  return r;
};
DebugJS.bat.ppElIf = function(pc) {
  var bat = DebugJS.bat;
  var ctrl = bat.ctrl;
  while (pc <= ctrl.endPc) {
    var endBlk = bat.findEndOfBlock(DebugJS.BAT_TKN_ELIF, pc);
    pc = endBlk.l + 1;
    if (endBlk.endTkn == DebugJS.BAT_TKN_ELSE) {
      ctrl.block.push({t: DebugJS.BAT_TKN_ELSE});
      break;
    } else if (endBlk.endTkn == DebugJS.BAT_TKN_BLOCK_END) {
      break;
    }
    var cmd = bat.cmds[pc - 1];
    var cnd = DebugJS.getArgsFrom(cmd, 3);
    var r = bat.ppIf(DebugJS.BAT_TKN_IF, cnd, cmd);
    if (r.err) break;
    if (r.cond) {
      ctrl.block.push({t: DebugJS.BAT_TKN_IF});
      break;
    }
  }
  ctrl.pc = pc;
};
DebugJS.bat.findEndOfBlock = function(type, pc) {
  var bat = DebugJS.bat;
  var l = pc;
  var ignrBlkLv = 0;
  var data = {l: 0, endTkn: DebugJS.BAT_TKN_BLOCK_END};
  while (l <= bat.ctrl.endPc) {
    var cmd = bat.cmds[l];
    var c = DebugJS.splitCmdLineInTwo(cmd)[0];
    if (DebugJS.unifySP(cmd.trim()).match(DebugJS.RE_ELIF)) {
      if (ignrBlkLv == 0) {
        if (type == DebugJS.BAT_TKN_ELIF) {
          data.endTkn = DebugJS.BAT_TKN_ELIF;
          break;
        }
      }
    } else if (DebugJS.delAllSP(cmd) == DebugJS.RE_ELSE) {
      if (ignrBlkLv == 0) {
        if ((type == DebugJS.BAT_TKN_IF) || (type == DebugJS.BAT_TKN_ELIF)) {
          data.endTkn = DebugJS.BAT_TKN_ELSE;
          break;
        }
      }
    } else if (cmd.trim() == DebugJS.BAT_TKN_BLOCK_END) {
      if (ignrBlkLv == 0) {
        break;
      }
      ignrBlkLv--;
    } else if ((c == DebugJS.BAT_TKN_IF) || (c == DebugJS.BAT_TKN_LOOP)) {
      ignrBlkLv++;
    }
    l++;
  }
  if (l > bat.ctrl.endPc) {
    DebugJS._log.e('End of block "' + DebugJS.BAT_TKN_BLOCK_END + '" not found');
    DebugJS._log.e('L' + pc + ': ' + bat.cmds[pc - 1]);
  }
  data.l = l;
  return data;
};
DebugJS.bat.findEndOfFnc = function(pc) {
  var blkLv = 0;
  while (pc <= DebugJS.bat.ctrl.endPc) {
    var cmd = DebugJS.bat.cmds[pc];
    var c = DebugJS.splitCmdLineInTwo(cmd)[0];
    var l = DebugJS.bat.nextELOC(pc);
    if (l != pc) {
      pc = l;
      continue;
    }
    if ((c == DebugJS.BAT_TKN_IF) || (c == DebugJS.BAT_TKN_LOOP)) {
      blkLv++;
    } else if (cmd.trim() == DebugJS.BAT_TKN_BLOCK_END) {
      blkLv--;
    } else if (c == DebugJS.BAT_TKN_RET) {
      if (blkLv == 0) break;
    }
    pc++;
  }
  return pc;
};
DebugJS.bat.execJs = function() {
  var bat = DebugJS.bat;
  var ctrl = bat.ctrl;
  var pure = (ctrl.js == 1);
  var js = '';
  while ((ctrl.pc >= ctrl.startPc) && (ctrl.pc <= ctrl.endPc)) {
    var c = bat.cmds[ctrl.pc];
    ctrl.pc++;
    if (!DebugJS.strcmpWOsp(c, DebugJS.BAT_TKN_JS)) {
      if (!pure) {
        c = DebugJS.replaceCmdVals(c);
      }
      js += c + '\n';
    }
    if (DebugJS.strcmpWOsp(c, DebugJS.BAT_TKN_JS) || (ctrl.pc > ctrl.endPc)) {
      try {
        eval(js);
      } catch (e) {
        DebugJS._log.e(e);
      }
      ctrl.js = 0;
      break;
    }
  }
};
DebugJS.bat.text = function() {
  var bat = DebugJS.bat;
  var ctrl = bat.ctrl;
  var txt = '';
  while ((ctrl.pc >= ctrl.startPc) && (ctrl.pc <= ctrl.endPc)) {
    var c = bat.cmds[ctrl.pc];
    ctrl.pc++;
    if (!DebugJS.strcmpWOsp(c, DebugJS.BAT_TKN_TXT)) {
      txt += c + '\n';
    }
    if (DebugJS.strcmpWOsp(c, DebugJS.BAT_TKN_TXT) || (ctrl.pc > ctrl.endPc)) {
      DebugJS.ctx.CMDVALS['%TEXT%'] = txt;
      break;
    }
  }
};
DebugJS.bat.ppEcho = function(c) {
  if (DebugJS.bat.ctrl.echo && !DebugJS.bat.ctrl.tmpEchoOff) DebugJS._log.s(c);
};
DebugJS.bat.ret = function(arg) {
  var bat = DebugJS.bat;
  var ctrl = bat.ctrl;
  if (bat.isCmdExecutable()) {
    var fnCtx = ctrl.stack.pop();
    if (!fnCtx) {
      bat.syntaxErr('Illegal return statement');
      return;
    }
    try {
      DebugJS.ctx.CMDVALS['%RET%'] = eval(arg);
    } catch (e) {
      DebugJS._log.e(e);return;
    }
    DebugJS.ctx.CMDVALS['%ARG%'] = fnCtx.fnArg;
    ctrl.fnArg = fnCtx.fnArg;
    ctrl.block = fnCtx.block;
    ctrl.lr = fnCtx.lr;
    ctrl.pc = ctrl.lr;
    bat.setLabel(fnCtx.label);
    bat.setFnNm(fnCtx.fnnm);
  }
};
DebugJS.bat.syntaxErr = function(c) {
  DebugJS._log.e('BAT SyntaxError: ' + c);
};
DebugJS.bat.lock = function() {
  DebugJS.bat.ctrl.lock++;
};
DebugJS.bat.unlock = function() {
  var ctrl = DebugJS.bat.ctrl;
  ctrl.lock--;
  if (ctrl.lock < 0) {
    ctrl.lock = 0;
  }
};
DebugJS.bat.isLocked = function() {
  return (DebugJS.bat.ctrl.lock != 0);
};
DebugJS.bat.getList = function() {
  return DebugJS.bat.cmds;
};
DebugJS.bat.list = function(s, e) {
  var l = '';
  var pc = DebugJS.bat.ctrl.pc;
  var js = false;
  var cmds = DebugJS.bat.cmds;
  var len = cmds.length;
  if ((s == undefined) || (s == '*')) {
    s = 0;
    e = len;
  } else {
    s -= 1;
    if (s < 0) s = 0;
    if (e == undefined) {
      e = s + 1;
    }
  }
  if ((e > len) || (e == '*')) {
    e = len;
  }
  s |= 0; e |= 0;
  if ((s == 0) && (e == len) && (pc == 0)) {l += '>\n';}
  for (var i = 0; i < len; i++) {
    var cmd = cmds[i];
    var n = i + 1;
    var df = DebugJS.digits(len) - DebugJS.digits(n);
    var pdng = '';
    for (var j = 0; j < df; j++) {
      pdng += '0';
    }
    if (DebugJS.startsWith(DebugJS.delLeadingSP(cmd), DebugJS.BAT_TKN_JS)) {
      if (!js) {
        l += '<span style="color:#0ff">';
      }
    }
    if ((i >= s) && (i < e)) {
      if (i == pc - 1) {
        l += '>';
      } else {
        l += ' ';
      }
      l += ' ' + pdng + n + ': ' + cmd + '\n';
    }
    if (DebugJS.startsWith(DebugJS.delLeadingSP(cmd), DebugJS.BAT_TKN_JS)) {
      if (js) {
        l += '</span>';
        js = false;
      } else {
        js = true;
      }
    }
  }
  if (js) l += '</span>';
  return l;
};
DebugJS.bat.pause = function() {
  DebugJS.ctx.status |= DebugJS.ST_BAT_PAUSE;
  DebugJS.ctx.updateBatRunBtn();
};
DebugJS.bat.resume = function(key) {
  var bat = DebugJS.bat;
  if (key == undefined) {
    bat._resume();
  } else {
    if (bat.ctrl.pauseKey == '') {
      bat._resume('cmd-key', key);
    } else {
      if (bat.ctrl.pauseKey != null) {
        if (DebugJS.hasKeyWd(DebugJS.delAllSP(bat.ctrl.pauseKey), key, '|')) {
          bat._resume('cmd-key', key);
        }
      }
    }
  }
};
DebugJS.bat._resume = function(trigger, key, to, fmCnd) {
  var ctx = DebugJS.ctx;
  var bat = DebugJS.bat;
  var ctrl = bat.ctrl;
  if (trigger) {
    var resumed = false;
    if (trigger == 'cmd') {
      if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD) {
        ctx.status &= ~DebugJS.ST_BAT_PAUSE_CMD;
        ctx.updateBatResumeBtn();
        resumed = true;
      }
    } else if (trigger == 'cmd-key') {
      if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD_KEY) {
        ctx.status &= ~DebugJS.ST_BAT_PAUSE_CMD_KEY;
        ctrl.pauseKey = null;
        ctx.CMDVALS['%RESUMED_KEY%'] = (key == undefined ? '' : key);
        ctx.updateBatResumeBtn();
        resumed = true;
      }
    }
    if (resumed) bat.clrPauseTmr();
    var msg;
    if (resumed) {
      ctrl.pauseKey = null;
      msg = 'Resumed.';
      if (to) msg += ' (timed out)';
      if (key != undefined) msg += ' (' + key + ')';
    } else {
      if (!fmCnd) msg = 'not paused.';
    }
    if (msg) DebugJS._log(msg);
  } else {
    ctx.status &= ~DebugJS.ST_BAT_PAUSE;
    ctx.updateBatRunBtn();
  }
  bat.stopNext();
  if (bat.isRunning()) {
    ctrl.tmid = setTimeout(bat.exec, 0);
  }
};
DebugJS.bat.stopNext = function() {
  if (DebugJS.bat.ctrl.tmid > 0) {
    DebugJS.bat.clearTimer();
  }
};
DebugJS.bat.stop = function(st) {
  DebugJS.bat._stop(st);
  DebugJS.bat.resetPc();
};
DebugJS.bat._stop = function(st) {
  var ctx = DebugJS.ctx;
  var bat = DebugJS.bat;
  bat.stopNext();
  bat.ctx = [];
  ctx.updateBatNestLv();
  ctx.status &= ~DebugJS.ST_BAT_BP;
  ctx.status &= ~DebugJS.ST_BAT_PAUSE_CMD_KEY;
  ctx.status &= ~DebugJS.ST_BAT_PAUSE_CMD;
  bat.clrPauseTmr();
  ctx.updateBatResumeBtn();
  bat.setRunningSt(false);
  ctx.status &= ~DebugJS.ST_BAT_PAUSE;
  ctx.updateBatRunBtn();
  delete ctx.CMDVALS['%%ARG%%'];
  delete ctx.CMDVALS['%ARG%'];
  delete ctx.CMDVALS['%RET%'];
  delete ctx.CMDVALS['%LABEL%'];
  delete ctx.CMDVALS['%FUNCNAME%'];
  delete ctx.CMDVALS['%TEXT%'];
  bat.setExitStatus(st);
  DebugJS.callEvtListeners('batstop', ctx.CMDVALS['?']);
};
DebugJS.bat.terminate = function() {
  DebugJS.bat.stop(DebugJS.EXIT_SIG + DebugJS.SIGTERM);
};
DebugJS.bat.cancel = function() {
  DebugJS._log('Canceled.');
  DebugJS.bat.terminate();
  DebugJS.point.init();
};
DebugJS.bat.exit = function() {
  DebugJS.bat.terminate();
  DebugJS.point.init();
  DebugJS.bat.clear();
};
DebugJS.bat.hasBatStopCond = function(key) {
  return DebugJS.hasKeyWd(DebugJS.ctx.props.batstop, key, '|');
};
DebugJS.bat.getPc = function() {
  return DebugJS.bat.ctrl.pc;
};
DebugJS.bat.setPc = function(v, b) {
  DebugJS.bat.ctrl.pc = v;
  DebugJS.ctx.updateCurPc(b);
};
DebugJS.bat.resetPc = function() {
  DebugJS.bat.setPc(0);
};
DebugJS.bat.clear = function() {
  DebugJS.bat.set('');
};
DebugJS.bat.initCtrl = function(all) {
  var ctrl = DebugJS.bat.ctrl;
  ctrl.pc = 0;
  ctrl.lr = 0;
  ctrl.fnArg = undefined;
  ctrl.startPc = 0;
  ctrl.endPc = 0;
  ctrl.tmpEchoOff = false;
  ctrl.block = [];
  ctrl.js = 0;
  ctrl.lock = 0;
  ctrl.conddKey = null;
  ctrl.pauseKey = null;
  ctrl.pauseTimeout = 0;
  ctrl.pauseTmId = 0;
  ctrl.stopReq = false;
  ctrl.stack = [];
  if (all) {
    ctrl.echo = true;
    ctrl.execArg = '';
    DebugJS.ctx.status &= ~DebugJS.ST_BAT_CONT;
  }
  if (ctrl.tmid > 0) {
    clearTimeout(ctrl.tmid);
    ctrl.tmid = 0;
  }
  DebugJS.bat.setLabel('');
  DebugJS.bat.setFnNm('');
  DebugJS.ctx.updateCurPc();
};
DebugJS.bat.stCtx = function() {
  var bat = DebugJS.bat;
  var ctrl = {};
  DebugJS.copyProp(bat.ctrl, ctrl);
  var cmds = bat.cmds.slice();
  var batCtx = {
    cmds: cmds,
    ctrl: ctrl,
    labels: bat.labels,
    fncs: bat.fncs
  };
  bat.ctx.push(batCtx);
};
DebugJS.bat.ldCtx = function() {
  var ctx = DebugJS.ctx;
  var bat = DebugJS.bat;
  var batCtx = bat.ctx.pop();
  if (!batCtx) return false;
  DebugJS.copyProp(batCtx.ctrl, bat.ctrl);
  bat.setExecArg(bat.ctrl.execArg);
  bat.setLabel(bat.ctrl.label);
  bat.setFnNm(bat.ctrl.fnnm);
  bat.cmds = batCtx.cmds;
  bat.labels = batCtx.labels;
  bat.fncs = batCtx.fncs;
  ctx.setBatTxt(ctx);
  ctx.updateTotalLine();
  ctx.updateBatNestLv();
  ctx.updateCurPc();
  bat.next(1);
  return true;
};
DebugJS.bat.save = function() {
  var bt = {
    ctrl: DebugJS.bat.ctrl,
    cmds: DebugJS.bat.cmds,
    ctx: DebugJS.bat.ctx,
    vals: DebugJS.ctx.CMDVALS
  };
  var b = JSON.stringify(bt);
  localStorage.setItem('DebugJS-bat', b);
};
DebugJS.bat.load = function() {
  var bat = DebugJS.bat;
  var b = localStorage.getItem('DebugJS-bat');
  if (b == null) {
    return;
  }
  localStorage.removeItem('DebugJS-bat');
  var bt = JSON.parse(b);
  bat.ctrl = bt.ctrl;
  bat.cmds = bt.cmds;
  bat.ctx = bt.ctx;
  DebugJS.ctx.CMDVALS = bt.vals;
  bat.setExecArg(bat.ctrl.execArg);
  bat.parseLabelFncs();
  bat.setRunningSt(true);
  if (bat.q) {
    bat.lazyExec();
  } else {
    bat.restart();
  }
};
DebugJS.bat.lazyExec = function() {
  var q = DebugJS.bat.q;
  DebugJS.bat(q.b, q.a, q.sl, q.el);
  DebugJS.bat.q = null;
};
DebugJS.bat.setRunningSt = function(f) {
  var ctx = DebugJS.ctx;
  if (f) {
    ctx.status |= DebugJS.ST_BAT_RUNNING;
    if (ctx.props.batcont == 'on') {
      ctx.status |= DebugJS.ST_BAT_CONT;
    }
  } else {
    ctx.status &= ~DebugJS.ST_BAT_RUNNING;
    ctx.status &= ~DebugJS.ST_BAT_CONT;
  }
};
DebugJS.bat.isRunning = function() {
  return ((DebugJS.ctx.status & DebugJS.ST_BAT_RUNNING) ? true : false);
};
DebugJS.bat.isCmdExecutable = function() {
  if (DebugJS.ctx.status & DebugJS.ST_BAT_RUNNING) return true;
  DebugJS._log('BAT dedicated command');
  return false;
};
DebugJS.bat.status = function() {
  var ctx = DebugJS.ctx;
  var st = 'STOPPED';
  if (ctx.status & DebugJS.ST_BAT_PAUSE) {
    st = 'PAUSED';
  } else if ((ctx.status & DebugJS.ST_BAT_PAUSE_CMD) || (ctx.status & DebugJS.ST_BAT_PAUSE_CMD_KEY)) {
    st = 'PAUSED_CMD';
  } else if (ctx.status & DebugJS.ST_BAT_RUNNING) {
    st = 'RUNNING';
  }
  return st;
};
DebugJS.bat.getPauseKey = function() {
  return DebugJS.bat.ctrl.pauseKey;
};
DebugJS.bat.getCondKey = function() {
  return DebugJS.bat.ctrl.condKey;
};
DebugJS.bat.setCond = function(key) {
  var bat = DebugJS.bat;
  if (DebugJS.hasKeyWd(bat.ctrl.condKey, key, '|')) {
    bat._resume('cmd-key', key, false, true);
    bat.ctrl.condKey = null;
  }
};
DebugJS.bat._initCond = function() {
  var bat = DebugJS.bat;
  if (bat.ctrl.condKey == null) return;
  if (bat.ctrl.pauseKey == bat.ctrl.condKey) {
    bat._resume('cmd-key');
  }
  bat.ctrl.condKey = null;
};
DebugJS.bat.restartPauseTmr = function() {
  var bat = DebugJS.bat;
  var t = bat.ctrl.pauseTimeout - DebugJS.now();
  if (t > 0) {
    bat.ctrl.pauseTmId = setTimeout(bat.onPauseTimeout, t);
  } else {
    bat.onPauseTimeout();
  }
};
DebugJS.bat.clrPauseTmr = function() {
  var ctrl = DebugJS.bat.ctrl;
  if (ctrl.pauseTmId > 0) {
    clearTimeout(ctrl.pauseTmId);
    ctrl.pauseTmId = 0;
    ctrl.pauseTimeout = 0;
  }
};
DebugJS.bat.onPauseTimeout = function() {
  if (DebugJS.ctx.status & DebugJS.ST_BAT_PAUSE_CMD_KEY) {
    DebugJS.bat._resume('cmd-key', undefined, true);
  } else if (DebugJS.ctx.status & DebugJS.ST_BAT_PAUSE_CMD) {
    DebugJS.bat._resume('cmd', undefined, true);
  }
};
DebugJS.bat.getSymbols = function(t, p) {
  var a = [];
  var re = null;
  if (p) {
    try {
      var cnd = eval('/' + p + '/');
    } catch (e) {
      DebugJS._log.e('Get symbols error (' + e + ')');
      return a;
    }
    re = new RegExp(cnd);
  }
  var o = (t == 'function' ? DebugJS.bat.fncs : DebugJS.bat.labels);
  for (var k in o) {
    if (!re || (re && k.match(re))) {
      a.push(k);
    }
  }
  return a;
};
DebugJS.bat.nestLv = function() {
  return DebugJS.bat.ctx.length;
};
DebugJS.bat.isAvailable = function() {
  return DebugJS.bat.cmds.length > 0;
};
DebugJS.isBat = function(s) {
  return DebugJS.startsWith(s, DebugJS.BAT_HEAD);
};
DebugJS.isB64Bat = function(s) {
  return DebugJS.startsWith(s, DebugJS.BAT_HEAD_B64);
};

DebugJS.isDataURL = function(s) {
  return DebugJS.startsWith(s, 'data:');
};

DebugJS.led = function(v) {
  DebugJS.ctx.setLed(v);
};
DebugJS.led.on = function(pos) {
  DebugJS.ctx.turnLed(pos, true);
};
DebugJS.led.off = function(pos) {
  DebugJS.ctx.turnLed(pos, false);
};
DebugJS.led.val = function() {
  return DebugJS.ctx.led;
};

DebugJS.msg = function(v) {
  DebugJS.ctx.setMsg(v);
};
DebugJS.msg.clear = function() {
  DebugJS.ctx.setMsg('');
};

DebugJS.point = function(x, y) {
  x += ''; y += '';
  var point = DebugJS.point;
  var ptr = point.getPtr();
  if (!ptr.el) point.createPtr();
  if (x.charAt(0) == '+') {
    ptr.x += (x.substr(1) | 0);
  } else if (x.charAt(0) == '-') {
    ptr.x -= (x.substr(1) | 0);
  } else {
    ptr.x = x | 0;
  }
  if (y.charAt(0) == '+') {
    ptr.y += (y.substr(1) | 0);
  } else if (y.charAt(0) == '-') {
    ptr.y -= (y.substr(1) | 0);
  } else {
    ptr.y = y | 0;
  }
  ptr.el.style.top = ptr.y + 'px';
  ptr.el.style.left = ptr.x + 'px';
  document.body.appendChild(ptr.el);
  point.hint.move();
  if (DebugJS.ctx.props.mousemovesim == 'true') {
    var e = point.createMouseEvt('mousemove', 0);
    var el = point.getElementFromCurrentPos();
    if (el) {
      e.target = el;
      el.dispatchEvent(e);
    } else {
      e.target = window;
      window.dispatchEvent(e);
    }
  }
};
DebugJS.point.ptrs = [];
DebugJS.point.ch = 0;
DebugJS.point.CURSOR_DFLT = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAMAAACTKxybAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD9QTFRFCwsY9PT3S0xX1tbYKCg04eHjLCw4wsLJMzM/zs7S+Pn7Q0ROs7S86OjqLi468PDzYWJsGBgkQkNN////////FEPnZwAAABV0Uk5T//////////////////////////8AK9l96gAAAF5JREFUeNpMzlcOwDAIA1Cyulcw9z9rQ0aLv3iSZUFZ/lBmC7DFL8WniqGGro6mgY0NcLMBTjZA4gpXBjQKRwf2vuZIJqSpotziZ3gFkxYiwlXQvvIByweJzyryCjAA+AIPnHnE+0kAAAAASUVORK5CYII=';
DebugJS.point.CURSOR_PTR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAYCAMAAADAi10DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJZQTFRF////EhQmHyIzPkBPT1Be+fn68fHywcHHFxorWltovr/E4+PmUlNgLS8//Pz8GRwuqquyFBcpSUtZeHqEa2x35ubo6enrQENRw8TKnJ6lTE5bc3R/9/f3paatRkhWKyw8NThHhoiRtra8lJWdFBYo1dbZKi092NjbFxkrMDJCMjVE0NDUx8jM9PT1ZWZyoqOqOz1M////QATI2QAAADJ0Uk5T/////////////////////////////////////////////////////////////////wANUJjvAAAAoUlEQVR42ozQ1xKDIBAF0GuwYO+a3nvn/38uChGFvOTODrNzXpZdMB7TZTIQ4mxdjfaRRTUyAOM/ehY/lCyKmqjU1NwPCVFo1LyPcqVRq5IosNaoBGzA4xRQTjIGAs/OU5WmY8C5KsSOFVCpxDJrALDO7cTZkPyQf+I1oEQsFJ96Wn53JHYnk+4S7HLjEG1SSSzO7wdnV/f3apO9TdF8BBgAC6AoMWCQ0+8AAAAASUVORK5CYII=';
DebugJS.point.CURSOR_TXT = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAQCAMAAADtX5XCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAA////pdmf3QAAAAJ0Uk5T/wDltzBKAAAAGElEQVR42mJgYGBgZAARjIx0xVB7AQIMABYAAFfcyzDzAAAAAElFTkSuQmCC';
DebugJS.point.getPtr = function() {
  var point = DebugJS.point;
  var ch = point.ch;
  if (!point.ptrs[ch]) {
    point.ptrs[ch] = {el: null, w: 12, h: 19, x: 0, y: 0, drg: false};
  }
  return point.ptrs[ch];
};
DebugJS.point.createPtr = function() {
  var ptr = DebugJS.point.getPtr();
  ptr.x = 0;
  ptr.y = 0;
  var el = document.createElement('img');
  var st = el.style;
  st.position = 'fixed';
  st.width = ptr.w + 'px';
  st.height = ptr.h + 'px';
  st.top = ptr.y;
  st.left = ptr.x;
  st.zIndex = 0x7ffffffe;
  el.src = DebugJS.point.CURSOR_DFLT;
  el.onmousedown = DebugJS.point.startDragging;
  document.body.appendChild(el);
  ptr.el = el;
};
DebugJS.point.init = function(all) {
  var point = DebugJS.point;
  if (all) {
    for (var i = 0; i < point.ptrs.length; i++) {
      if (point.ptrs[i]) {
        point.ch = i;
        point._init();
      }
    }
    point.ch = 0;
  } else {
    point._init();
  }
  var k = 'pointmsgsize';
  DebugJS.ctx._cmdSet(DebugJS.ctx, k, DebugJS.ctx.PROPS_DFLT_VALS[k], false);
};
DebugJS.point._init = function() {
  var point = DebugJS.point;
  point(0, 0);
  point.cursor();
  point.hint.clear();
  point.hide();
};
DebugJS.point.show = function() {
  var point = DebugJS.point;
  var ptr = point.getPtr();
  if (!ptr.el) {
    point.createPtr();
  } else {
    document.body.appendChild(ptr.el);
  }
  var area = point.hint.getArea();
  if (area.visible) {
    point.hint.show();
  }
};
DebugJS.point.hide = function() {
  var ptr = DebugJS.point.getPtr();
  if (ptr.el && ptr.el.parentNode) {
    document.body.removeChild(ptr.el);
  }
  DebugJS.point.hint.hide(true);
};
DebugJS.point.cursor = function(src, w, h) {
  var point = DebugJS.point;
  var ptr = point.getPtr();
  if (!ptr.el) point.createPtr();
  if (!src) {
    src = point.CURSOR_DFLT;
    w = 12;
    h = 19;
  } else if (src == 'pointer') {
    src = point.CURSOR_PTR;
  } else if (src == 'text') {
    src = point.CURSOR_TXT;
  } else if (src == 'none') {
    src = point.CURSOR_DFLT;
    w = 0;
    h = 0;
  }
  if (w == undefined) {
    w = '';
  } else {
    ptr.w = w;
    w += 'px';
  }
  if (h == undefined) {
    h = '';
  } else {
    ptr.h = h;
    h += 'px';
  }
  ptr.el.src = src;
  ptr.el.style.width = w;
  ptr.el.style.height = h;
  setTimeout(point._cursor, 0);
};
DebugJS.point._cursor = function() {
  var ptr = DebugJS.point.getPtr();
  if (document.body.contains(ptr.el)) {
    var s = window.getComputedStyle(ptr.el);
    ptr.w = s.width.replace('px', '') | 0;
    ptr.h = s.height.replace('px', '') | 0;
  }
};
DebugJS.point.event = function(args) {
  var el = DebugJS.point.getElementFromCurrentPos();
  if (!el) return;
  var type = DebugJS.getArgVal(args, 0);
  var opts = DebugJS.getOptVals(args);
  var e = DebugJS.point.createMouseEvt(type, el);
  for (var k in opts) {
    try {
      e[k] = eval(opts[k]);
    } catch (e) {
      DebugJS._log.e('Set property error (' + e + ')');
    }
  }
  return el.dispatchEvent(e);
};
DebugJS.point.simpleEvent = function(type, opt) {
  var point = DebugJS.point;
  var el = point.getElementFromCurrentPos();
  if (!el) return;
  switch (type) {
    case 'click':
      point.click(0, el, opt);
      break;
    case 'cclick':
      point.click(1, el, opt);
      break;
    case 'rclick':
      point.click(2, el, opt);
      break;
    case 'dblclick':
      point.dblclick(el, opt);
      break;
    case 'focus':
      point.focus(el);
      break;
    case 'blur':
      point.blur(el);
      break;
    case 'change':
      DebugJS.dispatchChangeEvt(el);
      break;
    case 'contextmenu':
      point.contextmenu(el);
      break;
    case 'mousedown':
    case 'mouseup':
      point.mouseevt(type, opt, el);
  }
};
DebugJS.point.click = function(button, target, speed, cb) {
  var click = DebugJS.point.click;
  if (click.tmid[button] > 0) {
    clearTimeout(click.tmid[button]);
    click.tmid[button] = 0;
    DebugJS.point.clickUp(button);
  }
  DebugJS.bat.lock();
  click.target[button] = target;
  click.cb = cb;
  DebugJS.point.mouseevt('mousedown', button, target);
  var el = DebugJS.findFocusableEl(target);
  if (el != null) el.focus();
  if (speed == undefined) speed = 100;
  click.tmid[button] = setTimeout('DebugJS.point.clickUp(' + button + ')', speed);
};
DebugJS.point.dblclick = function(target, speed) {
  var data = DebugJS.point.dblclick.data;
  if (data.cnt > 1) {
    if (data.tmid > 0) {
      clearTimeout(data.tmid);
      data.tmid = 0;
    }
    data.cnt = 0;
    DebugJS.bat.unlock();
  }
  if (speed == undefined) speed = 100;
  data.target = target;
  data.cnt = 0;
  data.speed = speed;
  DebugJS.bat.lock();
  DebugJS.point._dblclick();
};
DebugJS.point._dblclick = function() {
  var data = DebugJS.point.dblclick.data;
  var clickcpeed = data.speed / 2 | 0;
  DebugJS.point.click(0, data.target, clickcpeed, DebugJS.point.dblclick.onDone);
};
DebugJS.point.dblclick.onDone = function() {
  var data = DebugJS.point.dblclick.data;
  data.tmid = 0;
  data.cnt++;
  if (data.cnt < 2) {
    data.tmid = setTimeout(DebugJS.point._dblclick, data.speed);
  } else {
    DebugJS.point.mouseevt('dblclick', 0, data.target);
    data.cnt = 0;
    DebugJS.bat.unlock();
  }
};
DebugJS.point.dblclick.data = {
  target: null,
  tmid: 0,
  cnt: 0,
  speed: 0
};
DebugJS.point.clickUp = function(n) {
  var click = DebugJS.point.click;
  var target = click.target[n];
  click.tmid[n] = 0;
  DebugJS.point.mouseevt('mouseup', n, target);
  switch (n) {
    case 0:
      if (!click.invalid) {
        target.click();
      }
      click.invalid = false;
      break;
    case 1:
      if (click.tmid[0] > 0) {
        click.invalid = true;
      }
      break;
    case 2:
      DebugJS.point.contextmenu(target);
      if (click.tmid[0] > 0) {
        click.invalid = true;
      }
  }
  click.target[n] = null;
  DebugJS.bat.unlock();
  if (click.cb) {
    click.cb();
    click.cb = null;
  }
};
DebugJS.point.click.target = [null, null, null];
DebugJS.point.click.tmid = [0, 0, 0];
DebugJS.point.click.invalid = false;
DebugJS.point.click.cb = null;
DebugJS.point.focus = function(el) {
  el.focus();
};
DebugJS.point.blur = function(el) {
  el.blur();
};
DebugJS.point.contextmenu = function(el) {
  var e = DebugJS.event.create('contextmenu');
  el.dispatchEvent(e);
};
DebugJS.point.mouseevt = function(ev, b, el) {
  el.dispatchEvent(DebugJS.point.createMouseEvt(ev, b, el));
};
DebugJS.point.createMouseEvt = function(ev, b, el) {
  var ptr = DebugJS.point.getPtr();
  var e = DebugJS.event.create(ev);
  var x = ptr.x;
  var y = ptr.y;
  e.target = el;
  e.button = b | 0;
  e.clientX = x;
  e.clientY = y;
  e.pageX = x + window.pageXOffset;
  e.pageY = y + window.pageYOffset;
  e.screenX = x + window.screenX;
  e.screenY = y + window.screenY;
  return e;
};
DebugJS.point.keyevt = function(args) {
  var el = DebugJS.point.getElementFromCurrentPos();
  if (!el) return;
  var ev = args[0];
  var e = DebugJS.event.create(ev);

  var keyCode = DebugJS.getOptVal(args, 'keyCode');
  if (keyCode != null) {e.keyCode = keyCode | 0;}

  var code = DebugJS.getOptVal(args, 'code');
  if (code != null) e.code = code;

  var key = DebugJS.getOptVal(args, 'key');
  if (key != null) e.key = key;

  e.ctrlKey = false;
  e.shiftKey = false;
  e.altKey = false;
  e.metaKey = false;
  e = DebugJS.point.setKeyFlag(e, args);
  el.dispatchEvent(e);
};
DebugJS.point.setKeyFlag = function(e, a) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] == '-c') e.ctrlKey = true;
    if (a[i] == '-s') e.shiftKey = true;
    if (a[i] == '-a') e.altKey = true;
    if (a[i] == '-m') e.metaKey = true;
  }
  return e;
};
DebugJS.point.getElementFromCurrentPos = function() {
  var ctx = DebugJS.ctx;
  var ptr = DebugJS.point.getPtr();
  var hide = false;
  var cmdActive = DebugJS.cmd.hasFocus();
  if (!ptr.el || !ptr.el.parentNode) {
    return null;
  }
  var area = DebugJS.point.hint.getArea();
  var hint = area.el;
  var hintFlg = false;
  if (hint && (hint.parentNode)) {
    hintFlg = true;
    ctx.bodyEl.removeChild(hint);
  }
  ctx.bodyEl.removeChild(ptr.el);
  if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
    if (ctx.isOnDbgWin(ptr.x, ptr.y)) {
      hide = true;
      ctx.bodyEl.removeChild(ctx.win);
    }
  }
  var el = document.elementFromPoint(ptr.x, ptr.y);
  if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
    if (hide) {
      ctx.bodyEl.appendChild(ctx.win);
      ctx.scrollLogBtm(ctx);
      if (cmdActive) ctx.focusCmdLine();
    }
  }
  ctx.bodyEl.appendChild(ptr.el);
  if (hintFlg) {
    ctx.bodyEl.appendChild(hint);
  }
  return el;
};
DebugJS.point.getProp = function(prop) {
  var el = DebugJS.point.getElementFromCurrentPos();
  if (!el) return;
  var p = prop.split('.');
  var v = el;
  for (var i = 0; i < p.length; i++) {
    v = v[p[i]];
  }
  DebugJS._log(DebugJS.styleVal(v));
  return v;
};
DebugJS.point.setProp = function(prop, val, echo) {
  var el = DebugJS.point.getElementFromCurrentPos();
  if (!el) return;
  try {
    var v = eval(val);
  } catch (e) {
    DebugJS._log.e(e);return;
  }
  var p = prop.split('.');
  var e = el;
  for (var i = 0; i < (p.length - 1); i++) {
    e = e[p[i]];
  }
  e[p[(p.length - 1)]] = v;
  if (echo) DebugJS._log.res(v);
};
DebugJS.point.verify = function(prop, method, exp, label) {
  var ptr = DebugJS.point.getPtr();
  var test = DebugJS.test;
  var st = test.STATUS_ERR;
  var info;
  var errPfix = 'Verify error: ';
  if (prop == undefined) {
    info = errPfix + 'Property name is undefined';
    DebugJS._log.e(info);
    test.addResult(st, label, exp, undefined, method, info);
    test.onVrfyAftr(st);
    return st;
  }
  var el = DebugJS.point.getElementFromCurrentPos();
  if (!el) {
    info = errPfix + 'No element (x=' + ptr.x + ', y=' + DebugJS.ptr.y + ')';
    DebugJS._log.e(info);
    test.addResult(st, label, exp, undefined, method, info);
    test.onVrfyAftr(st);
    return st;
  }
  var p = prop.split('.');
  var got = el;
  for (var i = 0; i < p.length; i++) {
    got = got[p[i]];
  }
  return test.verify(got, method, exp, false, label);
};
DebugJS.point.move = function(x, y, speed, step) {
  x += ''; y += '';
  var point = DebugJS.point;
  var ptr = point.getPtr();
  var dst = point.move.dstPos;
  if (x.charAt(0) == '+') {
    dst.x = ptr.x + (x.substr(1) | 0);
  } else if (x.charAt(0) == '-') {
    dst.x = ptr.x - (x.substr(1) | 0);
  } else {
    dst.x = x | 0;
  }
  if (y.charAt(0) == '+') {
    dst.y = ptr.y + (y.substr(1) | 0);
  } else if (y.charAt(0) == '-') {
    dst.y = ptr.y - (y.substr(1) | 0);
  } else {
    dst.y = y | 0;
  }
  if (dst.x < 0) dst.x = 0;
  if (dst.y < 0) dst.y = 0;
  if ((speed == null) || (speed == undefined) || (speed == 'auto')) {
    speed = DebugJS.ctx.props.pointspeed;
  }
  speed |= 0;
  if (speed == 0) {
    point(x, y);
  }
  if ((step == null) || (step == undefined) || (step == 'auto')) {
    step = DebugJS.ctx.props.pointstep;
  }
  step |= 0;
  point.move.speed = speed;
  if (dst.x >= ptr.x) {
    point.move.mvX = step;
  } else {
    point.move.mvX = step * (-1);
  }
  if (dst.y >= ptr.y) {
    point.move.mvY = step;
  } else {
    point.move.mvY = step * (-1);
  }
  if (point.move.tmid > 0) {
    DebugJS.bat.unlock();
    clearTimeout(point.move.tmid);
    point.move.tmid = 0;
  }
  DebugJS.bat.lock();
  point._move();
};
DebugJS.point.move.dstPos = {x: 0, y: 0};
DebugJS.point.move.speed = 10;
DebugJS.point.move.step = 10;
DebugJS.point.move.tmid = 0;
DebugJS.point.move.cb = null;
DebugJS.point._move = function() {
  var point = DebugJS.point;
  var ptr = point.getPtr();
  var move = point.move;
  move.tmid = 0;
  if ((move.mvX == 0) && (move.mvY == 0)) {
    DebugJS.bat.unlock();
    return;
  }
  var dst = move.dstPos;
  var mvX = move.mvX;
  var mvY = move.mvY;
  var x = ptr.x + mvX;
  var y = ptr.y + mvY;

  if (mvX < 0) {
    if (x < dst.x) {
      x = dst.x;
    }
  } else {
    if (x > dst.x) {
      x = dst.x;
    }
  }

  if (mvY < 0) {
    if (y < dst.y) {
      y = dst.y;
    }
  } else {
    if (y > dst.y) {
      y = dst.y;
    }
  }

  point(x, y);
  if ((x == dst.x) && (y == dst.y)) {
    DebugJS.bat.unlock();
    if (move.cb) {
      setTimeout(move.cb, 10);
      move.cb = null;
    }
  } else {
    move.tmid = setTimeout(point._move, move.speed);
  }
};
DebugJS.point.move.stop = function() {
  if (DebugJS.point.move.tmid > 0) {
    clearTimeout(DebugJS.point.move.tmid);
    DebugJS.point.move.tmid = 0;
    DebugJS.bat.unlock();
  }
};
DebugJS.point.startDragging = function() {
  var ptr = DebugJS.point.getPtr();
  ptr.drg = true;
  ptr.el.style.cursor = 'move';
};
DebugJS.point.endDragging = function() {
  var ptr = DebugJS.point.getPtr();
  ptr.drg = false;
  ptr.el.style.cursor = 'auto';
};
DebugJS.point.drag = function(arg) {
  var data = DebugJS.point.drag.data;
  DebugJS.point.drag.cancel();
  data.step = 0;
  data.arg = arg;
  data.mousemovesim = DebugJS.ctx.props.mousemovesim;
  DebugJS.ctx.props.mousemovesim = 'true';
  DebugJS.bat.lock();
  DebugJS.point.drag.proc();
};
DebugJS.point.drag.data = {
  step: 0,
  arg: null,
  el: null,
  mousemovesim: undefined
};
DebugJS.point.drag.proc = function() {
  var point = DebugJS.point;
  var drag = point.drag;
  var data = drag.data;
  data.step++;
  var el = point.getElementFromCurrentPos();
  switch (data.step) {
    case 1:
      data.el = el;
      if (el) point.mouseevt('mousedown', 0, el);
      setTimeout(drag.proc, 10);
      break;
    case 2:
      point.move.cb = drag.proc;
      DebugJS.ctx.cmdPoint('move ' + data.arg);
      break;
    case 3:
      if (el) {
        point.mouseevt('mouseup', 0, el);
        if (data.el == el) point.mouseevt('click', 0, el);
      }
      drag.stop();
  }
};
DebugJS.point.drag.cancel = function() {
  if (DebugJS.point.drag.data.step == 2) {
    DebugJS.point.move.stop();
  }
  DebugJS.point.drag.stop();
};
DebugJS.point.drag.stop = function() {
  var data = DebugJS.point.drag.data;
  data.step = 0;
  data.arg = null;
  data.el = null;
  if (data.mousemovesim != undefined) {
    DebugJS.ctx.props.mousemovesim = data.mousemovesim;
  }
  DebugJS.bat.unlock();
};

DebugJS.pointBySelector = function(selector, idx, alignX, alignY) {
  var el = DebugJS.getElement(selector, idx);
  if (!el) {
    DebugJS._log.e(selector + (selector.charAt(0) == '#' ? '' : (idx == undefined ? '' : ' [' + idx + ']')) + ': Element not found');
    return;
  }
  var ps = DebugJS.getElPosSize(el);
  DebugJS.scrollWinToTarget(ps);
  ps = DebugJS.getElPosSize(selector, idx);
  DebugJS.pointTarget(ps, alignX, alignY);
};
DebugJS.pointByLabel = function(label, idx, alignX, alignY) {
  var el = DebugJS.getLabelEl(label, idx);
  if (!el) {
    DebugJS._log.e(label + ' [' + idx + ']: Element not found');
    return;
  }
  var ps = DebugJS.getElPosSize(el);
  DebugJS.scrollWinToTarget(ps);
  el = DebugJS.getLabelEl(label, idx);
  ps = DebugJS.getElPosSize(el);
  DebugJS.pointTarget(ps, alignX, alignY);
};
DebugJS.pointTarget = function(ps, alignX, alignY) {
  if (alignX == undefined) alignX = 0.5;
  if (alignY == undefined) alignY = 0.5;
  var p = DebugJS.getAlignedPos(ps, alignX, alignY);
  DebugJS.point(p.x, p.y);
};

DebugJS.getCenterPos = function(ps) {
  return DebugJS.getAlignedPos(ps, 0.5, 0.5);
};
DebugJS.getAlignedPos = function(ps, alignX, alignY) {
  var x = ps.x;
  var y = ps.y;
  if (ps.w > 1) x = x + ps.w * alignX;
  if (ps.h > 1) y = y + ps.h * alignY;
  return {x: x, y: y};
};

DebugJS.point.moveToSelector = function(selector, idx, speed, step, alignX, alignY) {
  var data = {
    selector: selector,
    idx: idx,
    speed: speed,
    step: step,
    alignX: alignX,
    alignY: alignY
  };
  var ps = DebugJS.getElPosSize(selector, idx);
  if (!ps) {
    DebugJS._log.e(selector + (selector.charAt(0) == '#' ? '' : (idx == undefined ? '' : ' [' + idx + ']')) + ': Element not found');
    return;
  }
  if (DebugJS.scrollWinToTarget(ps, DebugJS.ctx.props.scrollspeed, DebugJS.ctx.props.scrollstep, DebugJS.point._moveToSelector, data)) {
    return;
  }
  DebugJS.point._moveToSelector(data);
};
DebugJS.point._moveToSelector = function(data) {
  var el = DebugJS.getElement(data.selector, data.idx);
  var ps = DebugJS.getElPosSize(el);
  if (data.alignX == undefined) data.alignX = 0.5;
  if (data.alignY == undefined) data.alignY = 0.5;
  DebugJS.point.moveToElement(ps, data.speed, data.step, data.alignX, data.alignY);
};
DebugJS.point.moveToLabel = function(label, idx, speed, step, alignX, alignY) {
  var data = {
    label: label,
    idx: idx,
    speed: speed,
    step: step,
    alignX: alignX,
    alignY: alignY
  };
  var el = DebugJS.getLabelEl(label, idx);
  if (!el) {
    DebugJS._log.e(label + ' [' + idx + ']: Element not found');
    return;
  }
  var ps = DebugJS.getElPosSize(el);
  if (DebugJS.scrollWinToTarget(ps, DebugJS.ctx.props.scrollspeed, DebugJS.ctx.props.scrollstep, DebugJS.point._moveToLabel, data)) {
    return;
  }
  DebugJS.point._moveToLabel(data);
};
DebugJS.point._moveToLabel = function(data) {
  var el = DebugJS.getLabelEl(data.label, data.idx);
  var ps = DebugJS.getElPosSize(el);
  if (data.alignX == undefined) data.alignX = 0.5;
  if (data.alignY == undefined) data.alignY = 0.5;
  DebugJS.point.moveToElement(ps, data.speed, data.step, data.alignX, data.alignY);
};
DebugJS.point.moveToElement = function(ps, speed, step, alignX, alignY) {
  if (ps) {
    var p = DebugJS.getAlignedPos(ps, alignX, alignY);
    if (p) {
      DebugJS.point.move(p.x, p.y, speed, step);
    }
  }
};

DebugJS.point.hint = function(msg, speed, step, start, end) {
  var hint = DebugJS.point.hint;
  var area = hint.getArea();
  if (!area.el) {
    hint.createArea();
  }
  document.body.appendChild(area.el);
  try {
    var m = eval(msg) + '';
  } catch (e) {
    m = e + '';
  }
  if (speed && step) {
    hint.msgseq(msg, m, speed, step, start, end);
  } else {
    DebugJS.point.hint.setMsg(DebugJS.point.hint.replaceMsg(m));
  }
  area.hasMsg = true;
  hint.show();
};
DebugJS.point.hint.areas = [];
DebugJS.point.hint.getArea = function() {
  var areas = DebugJS.point.hint.areas;
  var ch = DebugJS.point.ch;
  if (!areas[ch]) {
    areas[ch] = {el: null, pre: null, visible: false, hasMsg: false};
  }
  return areas[ch];
};
DebugJS.point.hint.createArea = function() {
  var ctx = DebugJS.ctx;
  var area = DebugJS.point.hint.getArea();
  var el = document.createElement('div');
  el.className = 'dbg-hint';
  var sz = ctx.props.pointmsgsize;
  try {
    sz = eval(sz);
  } catch (e) {DebugJS._log.e(e);}
  var style = {
    'width': 'auto',
    'height': 'auto',
    'margin': 0,
    'padding': 0,
    'line-height': '1.2',
    'color': ctx.opt.fontColor,
    'font-size': sz,
    'font-family': ctx.opt.fontFamily
  };
  area.pre = DebugJS.ui.addElement(el, 'pre', style);
  document.body.appendChild(el);
  area.el = el;
};
DebugJS.point.hint.setMsg = function(m) {
  var area = DebugJS.point.hint.getArea();
  var el = area.pre;
  DebugJS.setStyle(el, 'width', 'auto');
  DebugJS.setStyle(el, 'height', 'auto');
  el.innerHTML = m;
};
DebugJS.point.hint.msgseq = function(msg, m, speed, step, start, end) {
  var area = DebugJS.point.hint.getArea();
  var el = area.pre;
  DebugJS.point.hint.setMsg(m);
  var s = window.getComputedStyle(el);
  DebugJS.setStyle(el, 'width', s.width);
  DebugJS.setStyle(el, 'height', s.height);
  el.innerHTML = '';
  DebugJS.setText(el, msg, speed, step, start, end);
};
DebugJS.point.hint.replaceMsg = function(s) {
  s = s.replace(/\\n/g, '\n');
  s = DebugJS.point.hint.rplcBtn(s);
  if (s.match(/!TEST_COUNT!/)) s = s.replace(/!TEST_COUNT!/g, DebugJS.test.getCountStr(DebugJS.test.getSumCount()));
  if (s.match(/!TEST_RESULT!/)) s = s.replace(/!TEST_RESULT!/g, DebugJS.test.result());
  return s;
};
DebugJS.point.hint.rplcBtn = function(s) {
  var PREFIX = '<span class="dbg-btn dbg-nomove" onclick="DebugJS.';
  var SUFFIX = '</span>';
  var d = {RESUME: 'ctx.batResume', STOP: 'bat.cancel', CLOSE: 'point.hide'};
  for (var k in d) {
    var re = new RegExp('!' + k + '!', 'g');
    if (s.match(re)) {
      var b = PREFIX + d[k] + '();">[' + k + ']' + SUFFIX;
      s = s.replace(re, b);
    }
  }
  return s;
};

DebugJS.point.hint.move = function() {
  var ptr = DebugJS.point.getPtr();
  var area = DebugJS.point.hint.getArea();
  var el = area.el;
  if (!el) return;
  var clW = document.documentElement.clientWidth;
  var clH = document.documentElement.clientHeight;
  var ps = DebugJS.getElPosSize(el);
  var y = (ptr.y - ps.h - 2);
  if (y < 0) {
    if (ps.h > ptr.y) {
      y = ptr.y + ptr.h;
    } else {
      y = 0;
    }
  }
  var x = ptr.x;
  if (x < 0) {
    x = 0;
  }
  if ((y + ps.h) > ptr.y) {
    x = ptr.x + ptr.w;
  }
  if ((x + ps.w) > clW) {
    if (ps.w < clW) {
      x = clW - ps.w;
    } else {
      x = 0;
    }
  }
  if ((y + ps.h) > clH) {
    if (ps.h < clH) {
      y = clH - ps.h;
    } else {
      y = 0;
    }
  }
  el.style.top = y + 'px';
  el.style.left = x + 'px';
};
DebugJS.point.hint.show = function() {
  var hint = DebugJS.point.hint;
  var area = hint.getArea();
  if (!area.hasMsg) return;
  if (!area.el) {
    hint.createArea();
  } else {
    document.body.appendChild(area.el);
  }
  area.visible = true;
  hint.move();
};
DebugJS.point.hint.hide = function(hold) {
  var area = DebugJS.point.hint.getArea();
  if (area.el && area.el.parentNode) document.body.removeChild(area.el);
  if (!hold) area.visible = false;
};
DebugJS.point.hint.clear = function() {
  var area = DebugJS.point.hint.getArea();
  if (area.el) {
    area.pre.innerHTML = '';
    DebugJS.point.hint.hide();
  }
  area.hasMsg = false;
};

DebugJS.scrollWinTo = function(x, y, speed, step) {
  var ctx = DebugJS.ctx;
  var d = DebugJS.scrollWinTo.data;
  DebugJS.scrollWinTo.stop();
  d.dstX = x - ctx.scrollPosX;
  d.dstY = y - ctx.scrollPosY;
  if ((speed == undefined) || (speed == null)) {
    d.speed = ctx.props.scrollspeed | 0;
  } else {
    d.speed = speed | 0;
  }
  if ((step == undefined) || (step == null)) {
    d.step = ctx.props.scrollstep | 0;
  } else {
    d.step = step | 0;
  }
  DebugJS.bat.lock();
  DebugJS._scrollWinTo();
  return true;
};
DebugJS._scrollWinTo = function() {
  var d = DebugJS.scrollWinTo.data;
  d.tmid = 0;
  if (d.speed == 0) d.step = 0;
  var dX = DebugJS.calcDestPosAndStep(d.dstX, d.step);
  d.dstX = dX.dest;
  var dY = DebugJS.calcDestPosAndStep(d.dstY, d.step);
  d.dstY = dY.dest;
  window.scrollBy(dX.step, dY.step);
  if ((d.dstX == 0) && (d.dstY == 0)) {
    if (d.cb) d.cb(d.arg);
    DebugJS.scrollWinTo.fin();
  } else {
    d.tmid = setTimeout(DebugJS._scrollWinTo, d.speed);
  }
};
DebugJS.scrollWinTo.data = {};
DebugJS.scrollWinTo.initData = function() {
  var d = DebugJS.scrollWinTo.data;
  d.dstX = 0;
  d.dstY = 0;
  d.speed = 10;
  d.step = 100;
  d.tmid = 0;
  d.cb = null;
  d.arg = null;
};
DebugJS.scrollWinTo.initData();
DebugJS.scrollWinTo.stop = function() {
  var tmid = DebugJS.scrollWinTo.data.tmid;
  if (tmid > 0) {
    clearTimeout(tmid);
    DebugJS.scrollWinTo.fin();
  }
};
DebugJS.scrollWinTo.fin = function() {
  DebugJS.scrollWinTo.initData();
  DebugJS.bat.unlock();
};

DebugJS.scrollWinToTarget = function(ps, speed, step, cb, arg, top) {
  if (!ps) return false;
  var d = DebugJS.scrollWinTo.data;
  if (d.tmid > 0) {
    clearTimeout(d.tmid);
    d.tmid = 0;
    DebugJS.bat.unlock();
  }
  d.dstX = 0;
  d.dstY = 0;
  d.speed = speed | 0;
  d.cb = cb;
  d.arg = arg;
  if ((ps.x < 0) || ((ps.x + ps.w) > document.documentElement.clientWidth)) {
    d.dstX = ps.x;
  }
  var clH = document.documentElement.clientHeight;
  var bodyH = document.body.clientHeight;
  var absScrnBtmT = bodyH - clH;
  var absScrnBtmB = bodyH;
  var absTargetPosYinDoc = ps.y + window.pageYOffset;
  var alignY = (top ? 0 : (clH / 2));
  if (top) {
    d.dstY = ps.y;
  } else if (ps.y < 0) {
    if ((ps.y + window.pageYOffset) < (clH / 2)) {
      d.dstY = window.pageYOffset * (-1);
    } else {
      d.dstY = ps.y - alignY;
    }
  } else if ((ps.y + ps.h) > clH) {
    if ((absTargetPosYinDoc >= absScrnBtmT) && (absTargetPosYinDoc <= absScrnBtmB)) {
      d.dstY = absScrnBtmB - DebugJS.ctx.scrollPosY;
    } else {
      d.dstY = ps.y - alignY;
    }
  }
  if ((d.dstX != 0) || (d.dstY != 0)) {
    if (step >= 0) {
      d.step = step | 0;
    } else {
      d.step = DebugJS.ctx.props.scrollstep | 0;
    }
    DebugJS.bat.lock();
    DebugJS._scrollWinTo();
    return true;
  }
  DebugJS.scrollWinTo.initData();
  return false;
};
DebugJS.scrollElTo = function(tgt, x, y) {
  x += '';
  y += '';
  var el = DebugJS.getElement(tgt);
  if (!el) {
    DebugJS._log.e('Element not found: ' + tgt);
    return;
  }

  if ((x.charAt(0) == '+') || (x.charAt(0) == '-')) {
    x = el.scrollLeft + (x | 0);
  } else {
    switch (x) {
      case 'left':
        x = 0;
        break;
      case 'center':
        el.scrollLeft = el.scrollWidth;
        var wkX = el.scrollLeft;
        x = wkX / 2;
        break;
      case 'right':
        x = el.scrollWidth;
        break;
      case 'current':
        x = null;
    }
  }

  if ((y.charAt(0) == '+') || (y.charAt(0) == '-')) {
    y = el.scrollTop + (y | 0);
  } else {
    switch (y) {
      case 'top':
        y = 0;
        break;
      case 'middle':
        el.scrollTop = el.scrollHeight;
        var wkY = el.scrollTop;
        y = wkY / 2;
        break;
      case 'bottom':
        y = el.scrollHeight;
        break;
      case 'current':
        y = null;
    }
  }

  if (x != null) el.scrollLeft = x;
  if (y != null) el.scrollTop = y;
};

DebugJS.calcDestPosAndStep = function(dest, step) {
  if (dest < 0) {
    if (((dest * (-1)) < step) || (step == 0)) {
      step = dest * (-1);
    }
    dest += step;
    step *= (-1);
  } else {
    if ((dest < step) || (step == 0)) {
      step = dest;
    }
    dest -= step;
  }
  var d = {
    dest: dest,
    step: step
  };
  return d;
};

DebugJS.setText = function(elm, txt, speed, step, start, end) {
  if (txt == undefined) return;
  var data = DebugJS.setText.data;
  if (data.tmid > 0) {
    clearTimeout(data.tmid);
    data.tmid = 0;
    DebugJS.bat.unlock();
  }
  var el = DebugJS.getElement(elm);
  if (!el) {
    DebugJS._log.e('Element not found: ' + elm);
    return;
  }
  try {
    txt = eval(txt) + '';
  } catch (e) {
    DebugJS._log.e('setText(): ' + e);
  }
  txt = DebugJS.decCtrlCh(txt);
  data.txt = txt;
  if ((speed == undefined) || (speed == null) || (speed == '')) {
    speed = DebugJS.ctx.props.textspeed;
  }
  if ((step == undefined) || (step == null) || (step == '')) {
    step = DebugJS.ctx.props.textstep;
  }
  start |= 0;
  if (start > 0) start -= 1;
  data.speed = speed;
  data.step = step | 0;
  data.i = start;
  data.end = end | 0;
  data.el = el;
  data.isInp = DebugJS.isTxtInp(el);
  DebugJS.bat.lock();
  DebugJS._setText();
};
DebugJS._setText = function() {
  var data = DebugJS.setText.data;
  var speed = data.speed;
  var step = data.step;
  if ((speed == 0) || (step == 0) || (data.end > 0) && (data.i >= data.end)) {
    data.i = data.txt.length;
  } else {
    data.i += step;
  }
  data.tmid = 0;
  var txt = data.txt.substr(0, data.i);
  if (data.isInp) {
    data.el.value = txt;
    var e = DebugJS.event.create('input');
    data.el.dispatchEvent(e);
  } else {
    data.el.innerText = txt;
  }
  if (data.i < data.txt.length) {
    speed = DebugJS.getSpeed(speed) | 0;
    data.tmid = setTimeout(DebugJS._setText, speed);
  } else {
    DebugJS.setText.stop();
  }
};
DebugJS.setText.stop = function() {
  DebugJS.setText.finalize();
  DebugJS.bat.unlock();
};
DebugJS.setText.finalize = function() {
  var data = DebugJS.setText.data;
  if (data.tmid > 0) {
    clearTimeout(data.tmid);
    data.tmid = 0;
  }
  data.el = null;
  data.isInp = false;
  data.txt = '';
  data.speed = 0;
  data.end = 0;
  data.i = 0;
};
DebugJS.setText.data = {el: null, isInp: false, txt: '', speed: 0, end: 0, i: 0, tmid: 0};

DebugJS.getSpeed = function(v) {
  v += '';
  if (v.indexOf('-') == -1) return v;
  var a = v.split('-');
  var min = a[0];
  var max = a[1];
  if ((min == '') || (max == '')) return 0;
  return DebugJS.getRndNum(min, max);
};

DebugJS.selectOption = function(elm, method, type, val) {
  var i;
  var el = DebugJS.getElement(elm);
  if (!el) {
    DebugJS._log.e('Element not found: ' + elm);
    return;
  }
  if (el.tagName != 'SELECT') {
    DebugJS._log.e('Element is not select (' + el + ')');
    return;
  }
  if (method == 'set') {
    if ((type != 'value') && (type != 'text')) return;
    var prevVal = el.value;
    for (i = 0; i < el.options.length; i++) {
      if (((type == 'text') && (el.options[i].innerText == val)) ||
          ((type == 'value') && (el.options[i].value == val))) {
        el.options[i].selected = true;
        if (prevVal != val) {
          DebugJS.dispatchChangeEvt(el);
        }
        return;
      }
    }
  } else {
    var r;
    var idx = el.selectedIndex;
    if (type == 'value') {
      r = el.options[idx].value;
    } else if (type == 'text') {
      r = el.options[idx].innerText;
    } else if ((type == 'values') || (type == 'texts')) {
      var prop = (type == 'values' ? 'value' : 'innerText');
      r = [];
      for (i = 0; i < el.options.length; i++) {
        r.push(el.options[i][prop]);
      }
    }
    return r;
  }
  DebugJS._log.e('No such option: ' + val);
};

DebugJS.dispatchChangeEvt = function(tgt) {
  var e = DebugJS.event.create('change');
  return tgt.dispatchEvent(e);
};

DebugJS.event = {};
DebugJS.event.evt = null;
DebugJS.event.evtDef = {
  blur: {bubbles: false, cancelable: false},
  change: {bubbles: true, cancelable: false},
  click: {bubbles: true, cancelable: true},
  contextmenu: {bubbles: true, cancelable: true},
  dblclick: {bubbles: true, cancelable: true},
  dragover: {bubbles: true, cancelable: true},
  drop: {bubbles: true, cancelable: true},
  focus: {bubbles: false, cancelable: false},
  input: {bubbles: true, cancelable: false},
  keydown: {bubbles: true, cancelable: true},
  keypress: {bubbles: true, cancelable: true},
  keyup: {bubbles: true, cancelable: true},
  mousedown: {bubbles: true, cancelable: true},
  mousemove: {bubbles: true, cancelable: true},
  mouseup: {bubbles: true, cancelable: true},
  wheel: {bubbles: true, cancelable: true}
};
DebugJS.event.create = function(type) {
  var e = document.createEvent('Events');
  e.initEvent(type, true, true);
  var df = DebugJS.event.evtDef[type];
  if (df) {
    e.bubbles = df.bubbles;
    e.cancelable = df.cancelable;
  }
  DebugJS.event.evt = e;
  return e;
};
DebugJS.event.set = function(prop, v) {
  var e = DebugJS.event.evt;
  if (e) {
    e[prop] = v;
  } else {
    DebugJS._log.e('Event is not created');
  }
};
DebugJS.event.dispatch = function(el, idx) {
  var tgt;
  if (el == 'window') {
    tgt = window;
  } else if (el == 'document') {
    tgt = document;
  } else if (el == 'active') {
    tgt = document.activeElement;
  } else if (el == 'point') {
    tgt = DebugJS.point.getElementFromCurrentPos();
  } else {
    tgt = DebugJS.getElement(el, idx);
  }
  if (!tgt) {
    DebugJS._log.e('Target is not found');
    return false;
  }
  var e = DebugJS.event.evt;
  if (e) {
    return tgt.dispatchEvent(e);
  } else {
    DebugJS._log.e('Event is not created');
    return false;
  }
};
DebugJS.event.clear = function() {
  DebugJS.event.evt = null;
};

DebugJS.keyPress = function(data) {
  DebugJS.keyPress.data = data;
  DebugJS.bat.lock();
  DebugJS.keyPress.down();
};
DebugJS.keyPress.data = null;
DebugJS.keyPress.down = function() {
  DebugJS.keyPress.send('keydown');
  setTimeout(DebugJS.keyPress.up, 10);
};
DebugJS.keyPress.up = function() {
  DebugJS.keyPress.send('keyup');
  DebugJS.keyPress.end();
};
DebugJS.keyPress.send = function(type) {
  var data = DebugJS.keyPress.data;
  DebugJS.event.create(type);
  DebugJS.event.set('keyCode', data.keyCode);
  DebugJS.event.set('ctrlKey', data.ctrl);
  DebugJS.event.set('shiftKey', data.shift);
  DebugJS.event.set('altKey', data.alt);
  DebugJS.event.set('metaKey', data.meta);
  var tgt = (DebugJS.isDescendant(document.activeElement, DebugJS.ctx.win) ? 'window' : 'active');
  DebugJS.event.dispatch(tgt);
};
DebugJS.keyPress.end = function() {
  DebugJS.bat.unlock();
};

DebugJS.test = {
  STATUS_OK: 'OK',
  STATUS_NG: 'NG',
  STATUS_ERR: 'ERR',
  STATUS_NT: 'NT',
  COLOR_OK: '#0f0',
  COLOR_NG: '#f66',
  COLOR_ERR: '#fa0',
  STATUS_NT_COLOR: '#fff',
  data: {}
};
DebugJS.test.initData = function() {
  var data = DebugJS.test.data;
  data.name = '';
  data.desc = [];
  data.running = false;
  data.startTime = 0;
  data.endTime = 0;
  data.seq = 0;
  data.executingTestId = '';
  data.lastRslt = DebugJS.test.STATUS_NT;
  data.ttlRslt = DebugJS.test.STATUS_NT;
  data.cnt = {ok: 0, ng: 0, err: 0, nt: 0};
  data.results = {};
};
DebugJS.test.initData();
DebugJS.test.init = function(name) {
  var test = DebugJS.test;
  test.initData();
  DebugJS.ctx.CMDVALS['%TEST_TOTAL_RESULT%'] = test.STATUS_NT;
  DebugJS.ctx.CMDVALS['%TEST_LAST_RESULT%'] = test.STATUS_NT;
  var data = test.data;
  data.name = ((name == undefined) ? '' : name);
  data.running = true;
  data.startTime = DebugJS.now();
};
DebugJS.test.setName = function(n) {
  DebugJS.test.data.name = n;
  DebugJS._log('TestName: ' + n);
};
DebugJS.test.setDesc = function(s) {
  DebugJS.test.data.desc.push(s);
  DebugJS._log(s);
};
DebugJS.test.save = function() {
  var d = JSON.stringify(DebugJS.test.data);
  localStorage.setItem('DebugJS-test', d);
};
DebugJS.test.load = function() {
  var d = localStorage.getItem('DebugJS-test');
  localStorage.removeItem('DebugJS-test');
  if (d == null) return;
  DebugJS.test.data = JSON.parse(d);
};
DebugJS.test.fin = function() {
  DebugJS.test.data.running = false;
  DebugJS.test.data.endTime = DebugJS.now();
};
DebugJS.test.setResult = function(st, label, info) {
  var test = DebugJS.test;
  switch (st) {
    case test.STATUS_OK:
    case test.STATUS_NG:
    case test.STATUS_ERR:
    case test.STATUS_NT:
      break;
    default:
      DebugJS._log.e('Test status must be OK|NG|ERR|NT: ' + st);
      return;
  }
  test.addResult(st, label, null, null, null, info);
};
DebugJS.test.addResult = function(st, label, exp, got, method, info) {
  var test = DebugJS.test;
  var data = test.data;
  var lm = DebugJS.ctx.props.testvallimit;
  switch (st) {
    case test.STATUS_OK:
      data.cnt.ok++;
      break;
    case test.STATUS_NG:
      data.cnt.ng++;
      break;
    case test.STATUS_ERR:
      data.cnt.err++;
      break;
    case test.STATUS_NT:
      data.cnt.nt++;
  }
  test.setRsltStatus(st);
  test.setLastResult(st);
  var id = data.executingTestId;
  test.prepare();
  if (label == null) {
    label = '';
  } else if (label.match(/^".*"$/)) {
    label = eval(label);
  }
  if (typeof exp == 'string') {
    exp = DebugJS.trimDownText(exp, lm);
  }
  if (typeof got == 'string') {
    got = DebugJS.trimDownText(got, lm);
  }
  var rslt = {
    label: label,
    status: st,
    method: method,
    exp: exp,
    got: got,
    info: info
  };
  data.results[id].results.push(rslt);
};
DebugJS.test.setRsltStatus = function(st) {
  var test = DebugJS.test;
  var data = test.data;
  switch (st) {
    case test.STATUS_NT:
      return;
    case test.STATUS_OK:
      if (data.ttlRslt != test.STATUS_NT) return;
      break;
    case test.STATUS_NG:
      if (data.ttlRslt == test.STATUS_ERR) return;
  }
  data.ttlRslt = st;
  DebugJS.ctx.CMDVALS['%TEST_TOTAL_RESULT%'] = st;
};
DebugJS.test.setLastResult = function(st) {
  DebugJS.test.data.lastRslt = st;
  DebugJS.ctx.CMDVALS['%TEST_LAST_RESULT%'] = st;
};
DebugJS.test.getLastResult = function() {
  return DebugJS.test.data.lastRslt;
};
DebugJS.test.getTotalResult = function() {
  return DebugJS.test.data.ttlRslt;
};
DebugJS.test.prepare = function() {
  DebugJS.test.setId(DebugJS.test.data.executingTestId);
};
DebugJS.test.setId = function(id) {
  if (id.match(/%SEQ%/)) id = id.replace(/%SEQ%/, DebugJS.test.nextSeq());
  var data = DebugJS.test.data;
  if (!data.results[id]) {
    data.results[id] = {comment: [], results: []};
  }
  data.executingTestId = id;
};
DebugJS.test.setSeq = function(v) {
  if (v != '') DebugJS.test.data.seq = v | 0;
};
DebugJS.test.nextSeq = function() {
  return ++DebugJS.test.data.seq;
};
DebugJS.test.setCmnt = function(c) {
  DebugJS.test.prepare();
  DebugJS.test.data.results[DebugJS.test.data.executingTestId].comment.push(c);
  DebugJS._log('# ' + c);
};
DebugJS.test.chkResult = function(results) {
  var test = DebugJS.test;
  var r = test.STATUS_NT;
  for (var i = 0; i < results.length; i++) {
    var st = results[i].status;
    if (st == test.STATUS_ERR) {
      return test.STATUS_ERR;
    } else if (st == test.STATUS_NG) {
      r = test.STATUS_NG;
    } else if ((st == test.STATUS_OK) && (r == test.STATUS_NT)) {
      r = test.STATUS_OK;
    }
  }
  return r;
};
DebugJS.test.getStyledResultStr = function(st, info) {
  var s = DebugJS.test.getStyledStStr(st);
  if (info) s += ' ' + info;
  return s;
};
DebugJS.test.getStyledStStr = function(st) {
  var test = DebugJS.test;
  var color;
  switch (st) {
    case test.STATUS_OK:
      color = test.COLOR_OK;
      break;
    case test.STATUS_NG:
      color = test.COLOR_NG;
      break;
    case test.STATUS_ERR:
      color = test.COLOR_ERR;
      break;
    default:
      color = test.COLOR_NT;
  }
  return '[<span style="color:' + color + '">' + st + '</span>]';
};
DebugJS.test.getStyledInfoStr = function(result) {
  if (result.info) return result.info;
  if (!result.method) return '';
  var echoExp = result.exp;
  if (result.method == 'regexp') {
    echoExp = DebugJS.decodeEsc(echoExp);
    echoExp = '<span style="color:#0ff">/</span>' + echoExp + '<span style="color:#0ff">/</span>';
  } else if (typeof echoExp == 'string') {
    echoExp = DebugJS.styleVal(echoExp);
    echoExp = DebugJS.hlCtrlCh(echoExp);
  } else {
    echoExp = DebugJS.styleVal(echoExp);
  }
  var echoGot = result.got;
  if (typeof echoGot == 'string') {
    echoGot = DebugJS.styleVal(echoGot);
    echoGot = DebugJS.hlCtrlCh(echoGot);
  } else {
    echoGot = DebugJS.styleVal(echoGot);
  }
  return 'Got=' + echoGot + ' ' + result.method + ' Exp=' + echoExp;
};
DebugJS.test.getCountStr = function(cnt) {
  var test = DebugJS.test;
  var total = test.countTotal(cnt);
  return '<span style="color:' + test.COLOR_OK + '">OK</span>:' + cnt.ok + '/' + total + ' <span style="color:' + test.COLOR_NG + '">NG</span>:' + cnt.ng + ' <span style="color:' + test.COLOR_ERR + '">ERR</span>:' + cnt.err + ' <span style="color:' + test.COLOR_NT + '">NT</span>:' + cnt.nt;
};
DebugJS.test.getSumCount = function() {
  var test = DebugJS.test;
  var cnt = {ok: 0, ng: 0, err: 0, nt: 0};
  for (var id in test.data.results) {
    var st = test.chkResult(test.data.results[id].results);
    switch (st) {
      case test.STATUS_OK:
        cnt.ok++;
        break;
      case test.STATUS_NG:
        cnt.ng++;
        break;
      case test.STATUS_ERR:
        cnt.err++;
        break;
      case test.STATUS_NT:
        cnt.nt++;
    }
  }
  return cnt;
};
DebugJS.test.countTotal = function(cnt) {
  return (cnt.ok + cnt.ng + cnt.err + cnt.nt);
};
DebugJS.test.result = function() {
  var test = DebugJS.test;
  var data = test.data;
  var nm = data.name;
  var ttl = test.getTotalResult();
  var cnt = test.getSumCount();
  var s = 'Test Result:\n';
  if (nm != '') s += '[TEST NAME]\n' + nm + '\n\n';
  if (data.desc.length > 0) s += '[DESCRIPTION]\n';
  for (var i = 0; i < data.desc.length; i++) {
    s += data.desc[i] + '\n';
  }
  if (data.desc.length > 0) s += '\n';
  if (test.countTotal(cnt) > 0) s += '[RESULTS]\n---------\n';
  s += test.getDetailStr(data.results);
  s += '[SUMMARY]\n' + test.getCountStr(cnt) + ' (' + test.getCountStr(data.cnt) + ')\n';
  s += DebugJS.repeatCh('-', ttl.length + 2) + '\n' + test.getStyledStStr(ttl);
  return s;
};
DebugJS.test.getDetailStr = function(results) {
  var test = DebugJS.test;
  var M = 16;
  var n = test.countLongestLabel();
  if (n > M) n = M;
  var details = '';
  for (var id in results) {
    var testId = (id == '' ? '<span style="color:#ccc">&lt;No Test ID&gt;</span>' : id);
    var st = test.chkResult(results[id].results);
    var rs = test.getStyledStStr(st);
    details += rs + ' ' + testId + '\n';
    for (var i = 0; i < results[id].comment.length; i++) {
      var comment = results[id].comment[i];
      details += ' # ' + comment + '\n';
    }
    for (i = 0; i < results[id].results.length; i++) {
      var result = results[id].results[i];
      var info = test.getStyledInfoStr(result);
      details += ' ' + DebugJS.strPadding(result.label, ' ', n, 'R') + ' ' + test.getStyledResultStr(result.status, info) + '\n';
    }
    details += '\n';
  }
  return details;
};
DebugJS.test.getResult = function(j) {
  var data = DebugJS.test.data;
  var r = {
    name: data.name,
    desc: data.desc,
    startTime: data.startTime,
    endTime: data.endTime,
    totalResult: data.ttlRslt,
    count: data.cnt,
    results: data.results
  };
  if (j) return DebugJS.toJSON(r);
  return r;
};
DebugJS.test.verify = function(got, method, exp, reqEval, label) {
  var r;
  var test = DebugJS.test;
  var status = test.STATUS_ERR;
  var info = '';
  try {
    if (method != 'regexp') {
      exp = eval(exp);
      if (typeof exp == 'string') {
        exp = exp.replace(/\r?\n/g, '\n');
      }
    }
    if (reqEval) {
      got = eval(got);
    }
    if (typeof got == 'string') {
      got = got.replace(/\r?\n/g, '\n');
    }
    if (method == '==') {
      if (got == exp) {
        status = test.STATUS_OK;
      } else {
        status = test.STATUS_NG;
      }
    } else if (method == '!=') {
      if (got != exp) {
        status = test.STATUS_OK;
      } else {
        status = test.STATUS_NG;
      }
    } else if ((method == 'regexp') ||
        (method == '<') || (method == '<=') ||
        (method == '>') || (method == '>=')) {
      var evl;
      if (method == 'regexp') {
        exp = DebugJS.encodeEsc(exp);
        var wkGot = got.replace(/\n/g, '\\n').replace(/\\/g, '\\\\');
        evl = '(new RegExp(\'' + exp + '\')).test(\'' + wkGot + '\')';
      } else {
        evl = got + method + exp;
      }
      try {
        r = eval(evl);
      } catch (e) {
        info = 'Failed to evaluate: ' + e;
        DebugJS._log.e(info);
        test.addResult(status, label, exp, got, method, info);
        test.onVrfyAftr(status);
        return status;
      }
      if (r) {
        status = test.STATUS_OK;
      } else {
        status = test.STATUS_NG;
      }
    } else {
      if (method == undefined) {
        DebugJS.printUsage('test|point verify [-label:text] got ==|!=|<|>|<=|>=|regexp exp');
      } else {
        info = 'Unknown verify method: ' + method;
        DebugJS._log.e(info);
        test.addResult(status, label, exp, got, method, info);
        test.onVrfyAftr(status);
      }
      return status;
    }
  } catch (e) {
    info = e.toString();
  }
  test.addResult(status, label, exp, got, method, info);
  var s = test.getStyledResultStr(status, info);
  DebugJS._log(s);
  test.onVrfyAftr(status);
  return status;
};
DebugJS.test.onVrfyAftr = function(st) {
  if (DebugJS.bat.isRunning() && DebugJS.bat.hasBatStopCond('test')) {
    if (st != DebugJS.test.STATUS_OK) {
      DebugJS.bat.ctrl.stopReq = true;
    }
  }
};
DebugJS.test.countLongestLabel = function() {
  var results = DebugJS.test.data.results;
  var l = 0;
  for (var id in results) {
    for (var i = 0; i < results[id].results.length; i++) {
      var r = results[id].results[i];
      if (r.label.length > l) {
        l = r.label.length;
      }
    }
  }
  return l;
};
DebugJS.test.getStatus = function() {
  var data = DebugJS.test.data;
  var r = {
    name: data.name,
    running: data.running,
    startTime: data.startTime,
    endTime: data.endTime,
    seq: data.seq,
    executingTestId: data.executingTestId,
    lastRslt: data.lastRslt,
    ttlRslt: data.ttlRslt,
    cnt: data.cnt
  };
  return r;
};
DebugJS.test.isRunning = function() {
  return DebugJS.test.data.running;
};

DebugJS.getElement = function(selector, idx) {
  if (typeof selector != 'string') return selector;
  idx |= 0;
  var el = null;
  try {
    el = document.querySelectorAll(selector).item(idx);
  } catch (e) {}
  return el;
};

DebugJS.getElPosSize = function(el, idx) {
  el = DebugJS.getElement(el, idx);
  if (!el) return null;
  var rect = el.getBoundingClientRect();
  var rectT = Math.round(rect.top);
  var rectL = Math.round(rect.left);
  var rectR = Math.round(rect.right);
  var rectB = Math.round(rect.bottom);
  var ps = {
    x: rectL,
    y: rectT,
    w: ((rectR - rectL) + 1),
    h: ((rectB - rectT) + 1)
  };
  return ps;
};

DebugJS.getScreenCenter = function() {
  var p = {
    x: (document.documentElement.clientWidth / 2),
    y: (document.documentElement.clientHeight / 2)
  };
  return p;
};

DebugJS.getLabelEl = function(label, idx) {
  var el = null;
  var cnt = 0;
  var c = document.getElementsByTagName('label');
  for (var i = 0; i < c.length; i++) {
    if (c[i].innerText == label) {
      if (idx == cnt) {
        el = c[i];
        break;
      }
      cnt++;
    }
  }
  return el;
};

DebugJS.findFocusableEl = function(e) {
  var el = e;
  do {
    if (el.tagName == 'HTML') {
      el = null;
      break;
    }
    if (DebugJS.isFocusable(el)) break;
    el = el.parentNode;
  } while (el != null);
  return el;
};
DebugJS.isFocusable = function(el) {
  var a = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
  return (a.indexOf(el.tagName) == -1 ? false : true);
};
DebugJS.isTxtInp = function(el) {
  if (el.tagName == 'TEXTAREA') return true;
  if (el.tagName == 'INPUT') {
    if ((el.type == 'text') || (el.type == 'password')) return true;
  }
  return false;
};

DebugJS.toggleElShowHide = function(el) {
  var v = (el.style.display == 'none' ? '' : 'none');
  el.style.display = v;
};

DebugJS.createResBox = function(m) {
  return DebugJS._createResBox(m);
};
DebugJS.createResBoxErr = function(m) {
  return DebugJS._createResBox(m, true);
};
DebugJS._createResBox = function(m, e) {
  return '<textarea class="dbg-resbox box ' + (e ? 'err' : 'ok') + '" readonly>' + m + '</textarea>';
};
DebugJS.adjustResBox = function(adj) {
  DebugJS.adjustResBox.a = adj | 0;
  setTimeout(DebugJS._adjustResBox, 10);
};
DebugJS.adjustResBox.a = 0;
DebugJS._adjustResBox = function() {
  var el = document.getElementsByClassName('dbg-resbox box');
  for (var i = 0; i < el.length; i++) {
    DebugJS.setStyle(el[i], 'height', (el[i].scrollHeight + DebugJS.adjustResBox.a) + 'px');
  }
};

DebugJS.getProtocol = function() {
  return location.protocol;
};
DebugJS.getHost = function() {
  return location.host.split(':')[0];
};
DebugJS.getPort = function() {
  return location.port;
};
DebugJS.getParentPath = function() {
  return location.href.replace(/(.*\/).*/, '$1');
};
DebugJS.getQuery = function(k) {
  var s = window.location.search.substr(1);
  if (!k) return s;
  var q = s.split('&');
  var a = [];
  for (var i = 0; i < q.length; i++) {
    var p = q[i].split('=');
    if (p[0] == k) a.push(p[1]);
  }
  var v = null;
  if (a.length == 1) {
    v = a[0];
  } else if (a.length > 1) {
    v = a;
  }
  return v;
};
DebugJS.getUrlHash = function() {
  var s = window.location.hash;
  if (s) s = s.substr(1);
  return s;
};

DebugJS.xlsCol = function(c) {
  var f = (isNaN(c) ? DebugJS.xlsColA2N : DebugJS.xlsColN2A);
  return f(c);
};
DebugJS.xlsColA2N = function(c) {
  var t = DebugJS.A2Z();
  return DebugJS.pIndex(t, c.trim().toUpperCase());
};
DebugJS.xlsColN2A = function(n) {
  var t = DebugJS.A2Z();
  var a = DebugJS.strp(t, n);
  if (n <= 0) a = '';
  return a;
};
DebugJS.A2Z = function() {
  var t = [];
  for (var i = 65; i <= 90; i++) {
    t.push(String.fromCharCode(i));
  }
  return t;
};

DebugJS.pIndex = function(tbl, ptn) {
  var len = ptn.length;
  var rdx = tbl.length;
  var idx = 0;
  for (var i = 0; i < len; i++) {
    var d = len - i - 1;
    var c = ptn.substr(d, 1);
    var v = tbl.indexOf(c);
    if (v == -1) return 0;
    v++;
    var n = v * Math.pow(rdx, i);
    idx += n;
  }
  return idx;
};
DebugJS.strp = function(tbl, idx) {
  var len = tbl.length;
  var a = [-1];
  for (var i = 0; i < idx; i++) {
    var j = 0;
    var cb = 1;
    while (j < a.length) {
      if (cb) {
        a[j]++;
        if (a[j] > len - 1) {
          a[j] = 0;
          if (a.length <= j + 1) {
            a[j + 1] = -1;
          }
        } else {
          cb = 0;
        }
      }
      j++;
    }
  }
  var s = '';
  for (i = a.length - 1; i >= 0; i--) {
    s += tbl[a[i]];
  }
  return s;
};

DebugJS.ui = {};
DebugJS.ui.addElement = function(base, tag, style, std) {
  var el = document.createElement(tag);
  DebugJS.setStyles(el, style, std);
  base.appendChild(el);
  return el;
};
DebugJS.ui.addBtn = function(base, label, onclick, style) {
  var el = DebugJS.ui.addElement(base, 'span', style);
  el.className = 'dbg-btn dbg-nomove';
  el.innerText = label;
  el.onclick = onclick;
  return el;
};
DebugJS.ui.addLabel = function(base, label, style) {
  var el = DebugJS.ui.addElement(base, 'span', style);
  el.innerText = label;
  return el;
};
DebugJS.ui.addTextInput = function(base, width, txtAlign, color, val, oninput) {
  var ctx = DebugJS.ctx;
  var s = {
    'width': width,
    'min-height': ctx.computedFontSize + 'px',
    'margin': '0',
    'padding': '0',
    'color': color
  };
  var el = DebugJS.ui.addElement(base, 'input', s);
  el.className = 'dbg-txtbox';
  if (txtAlign) DebugJS.setStyle(el, 'text-align', txtAlign);
  el.value = val;
  el.oninput = oninput;
  return el;
};
DebugJS.ui.createBtnHtml = function(label, onclick, style) {
  return '<span class="dbg-btn dbg-nomove" ' + (style == undefined ? '' : 'style="' + style + '" ') + 'onclick="' + onclick + '">' + label + '</span>';
};

DebugJS.wd = {};
DebugJS.wd.INTERVAL = 50;
DebugJS.wd.wdTmId = 0;
DebugJS.wd.wdPetTime = 0;
DebugJS.wd.cnt = 0;
DebugJS.wd.start = function(interval) {
  var wd = DebugJS.wd;
  interval |= 0;
  if (interval > 0) DebugJS.ctx.props.wdt = interval;
  DebugJS.ctx.status |= DebugJS.ST_WD;
  wd.cnt = 0;
  wd.wdPetTime = DebugJS.now();
  DebugJS._log.s('Start watchdog (' + DebugJS.ctx.props.wdt + 'ms)');
  if (wd.wdTmId > 0) clearTimeout(wd.wdTmId);
  wd.wdTmId = setTimeout(wd.pet, wd.INTERVAL);
};
DebugJS.wd.pet = function() {
  if (!(DebugJS.ctx.status & DebugJS.ST_WD)) return;
  var wd = DebugJS.wd;
  var now = DebugJS.now();
  var elps = now - wd.wdPetTime;
  if (elps > DebugJS.ctx.props.wdt) {
    wd.cnt++;
    DebugJS._log.w('Watchdog bark! (' + elps + 'ms)');
    DebugJS.callEvtListeners('watchdog', elps);
  }
  wd.wdPetTime = now;
  wd.wdTmId = setTimeout(wd.pet, wd.INTERVAL);
};
DebugJS.wd.stop = function() {
  var wd = DebugJS.wd;
  if (wd.wdTmId > 0) {
    clearTimeout(wd.wdTmId);
    wd.wdTmId = 0;
  }
  DebugJS.ctx.status &= ~DebugJS.ST_WD;
  DebugJS._log.s('Stop watchdog');
};

DebugJS.log = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS._log(m);
};
DebugJS.log.v = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS._log.v(m);
};
DebugJS.log.d = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS._log.d(m);
};
DebugJS.log.i = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS._log.i(m);
};
DebugJS.log.w = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS._log.w(m);
};
DebugJS.log.e = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS.ctx.errStatus |= DebugJS.ERR_ST_LOG;
  DebugJS._log.e(m);
};
DebugJS.log.f = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS.ctx.errStatus |= DebugJS.ERR_ST_LOG_F;
  DebugJS._log.f(m);
};
DebugJS.log.t = function(m, n) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS.time.log(m, n);
};
DebugJS.log.p = function(o, l, m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS._log.p(o, l, m, false);
};
DebugJS.log.json = function(o, l, m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS._log.p(o, l, m, true);
};
DebugJS.log.j = DebugJS.log.json;
DebugJS.log.res = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS._log.res(m);
};
DebugJS.log.res.err = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS._log.res.err(m);
};
DebugJS.log.mlt = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS._log.mlt(m);
};
DebugJS.log.clear = function() {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS.ctx.clearLog();
};
DebugJS.log.suspend = function() {
  DebugJS.ctx.suspendLog();
};
DebugJS.log.resume = function() {
  DebugJS.ctx.resumeLog();
};
DebugJS.log.preserve = function(f) {
  if (f == undefined) {
    return ((DebugJS.ctx.status & DebugJS.ST_LOG_PRESERVED) ? true : false);
  }
  if (DebugJS.LS_AVAILABLE) DebugJS.ctx.setLogPreserve(DebugJS.ctx, f);
};
DebugJS.log.toBottom = function() {
  DebugJS.ctx.scrollLogBtm(DebugJS.ctx);
};
DebugJS.log.root = function(m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  if (window.opener) {
    window.opener.log.root(m);
  } else if (window.top.opener) {
    window.top.opener.log.root(m);
  } else {
    window.top.DebugJS._log(m);
  }
};
DebugJS.log.root.fn = function(lv, m) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  if (window.opener) {
    window.opener.log[lv].root(m);
  } else if (window.top.opener) {
    window.top.opener.log[lv].root(m);
  } else {
    window.top.DebugJS._log[lv](m);
  }
};
DebugJS.rootFncs = function() {
  var fn = ['v', 'd', 'i', 'w', 'e', 'f'];
  for (var i = 0; i < fn.length; i++) {
    var lv = fn[i];
    DebugJS.log[lv].root = (DebugJS.ENABLE ? DebugJS.log.root.fn.bind(undefined, lv) : DebugJS.fn);
  }
};

DebugJS.setConsoleLogOut = function(f) {
  if (!window.console) return;
  if (f) {
    console.log = function(x) {log(x);};
    console.info = function(x) {log.i(x);};
    console.warn = function(x) {log.w(x);};
    console.error = function(x) {log.e(x);};
    console.time = function(x) {DebugJS.time.start(x);};
    console.timeEnd = function(x) {DebugJS.time.end(x);};
  } else {
    console.log = DebugJS.bak.console.log;
    console.info = DebugJS.bak.console.info;
    console.warn = DebugJS.bak.console.warn;
    console.error = DebugJS.bak.console.error;
    console.time = DebugJS.bak.console.time;
    console.timeEnd = DebugJS.bak.console.timeEnd;
  }
};

DebugJS.restoreStatus = function(ctx) {
  var data = DebugJS.loadStatus();
  if (!data || !((data.status & DebugJS.ST_LOG_PRESERVED) || (data.status & DebugJS.ST_BAT_CONT))) {
    return;
  }
  var b = DebugJS.ST_LOG_PRESERVED;
  if (data.status & b) {
    ctx.status |= b;
    DebugJS.restoreLog();
  }
  DebugJS._log.v('load st ' + data.status);
  b = DebugJS.ST_BAT_CONT;
  if (data.status & b) ctx.status |= b;
  b = DebugJS.ST_BAT_PAUSE_CMD;
  if (data.status & b) ctx.status |= b;
  b = DebugJS.ST_BAT_PAUSE_CMD_KEY;
  if (data.status & b) ctx.status |= b;
  ctx.timers = data.timers;
  if (data.status & DebugJS.ST_STOPWATCH_RUNNING) {
    ctx.startStopwatch();
  } else {
    ctx.updateSwLabel();
  }
  ctx.toolStatus = data.toolStatus;
  ctx.toolsActvFnc = data.toolsActvFnc;
  ctx.toolTimerMode = data.toolTimerMode;
  ctx.timerClockSSS = data.timerClockSSS;
  ctx.timerExpTime = data.timerExpTime;
  ctx.timerSwTimeCd = data.timerSwTimeCd;
  ctx.timerSwTimeCdContinue = data.timerSwTimeCdContinue;
  ctx.featStackBak = data.featStackBak;
  DebugJS.restoreProps(ctx, data.props);
  DebugJS.ctx.CMD_ALIAS = data.alias;
};
DebugJS.restoreProps = function(ctx, props) {
  for (var k in props) {
    ctx._cmdSet(ctx, k, props[k], false);
  }
};
DebugJS.ver = function() {
  return DebugJS.ctx.v;
};
DebugJS.x = DebugJS.x || {};
DebugJS.x.addCmdTbl = function(table) {
  var ctx = DebugJS.ctx;
  for (var i = 0; i < table.length; i++) {
    var c = table[i];
    if (ctx.existsCmd(c.cmd, ctx.INT_CMD_TBL) || ctx.existsCmd(c.cmd, ctx.EXT_CMD_TBL)) {
      c.attr |= DebugJS.CMD_ATTR_DISABLED;
    }
    ctx.EXT_CMD_TBL.push(c);
  }
};

DebugJS.x.pnl = {};
DebugJS.x.pnl.add = function(p) {
  var ctx = DebugJS.ctx;
  p.base = null;
  p.btn = null;
  if (p.hidden == undefined) p.hidden = false;
  var idx = ctx.extPanels.push(p) - 1;
  if (ctx.status & DebugJS.ST_INITIALIZED) {
    ctx.initExtPanel(ctx);
  }
  return idx;
};
DebugJS.x.pnl.remove = function(id, hidden) {
  var ctx = DebugJS.ctx;
  var pnl = DebugJS.x.pnl;
  var idx = (typeof id == 'string' ? pnl.getIdx(id) : id);
  var p = ctx.extPanels[idx];
  if (!p) return;
  if (!(ctx.status & DebugJS.ST_INITIALIZED)) {
    if (!hidden) ctx.extPanels[idx] = null;
    return;
  }
  var nIdx = ctx.extActPnlIdx;
  if (ctx.extActPnlIdx == idx) {
    nIdx = ctx.prevVisibleExtPanelIdx(ctx, idx);
    if (nIdx == -1) {
      nIdx = ctx.nextVisibleExtPanelIdx(ctx, idx);
    }
  }
  ctx.switchExtPanel(nIdx);
  if (!hidden) ctx.extPanels[idx] = null;
  ctx.redrawExtPanelBtn(ctx);
  if (nIdx == -1) {
    ctx.closeExtPanel(ctx);
    if (pnl.len(true) == 0) ctx.extPanels = [];
    if (!pnl.len()) DebugJS.showExtBtn(false);
  }
};
DebugJS.x.pnl.setBtnLabel = function(l) {
  DebugJS.ctx.extBtnLabel = l;
  if (DebugJS.ctx.extBtn) DebugJS.ctx.extBtn.innerHTML = l;
};
DebugJS.x.pnl.getIdx = function(nm) {
  var a = DebugJS.ctx.extPanels;
  var i = -1;
  for (i = 0; i < a.length; i++) {
    if (a[i] && a[i].name == nm) {
      break;
    }
  }
  return i;
};
DebugJS.x.pnl.getPanel = function(id) {
  var a = DebugJS.ctx.extPanels;
  var i = (typeof id == 'string' ? DebugJS.x.pnl.getIdx(id) : id);
  var p = a[i];
  return (p ? p : null);
};
DebugJS.x.pnl.getActivePanel = function() {
  return DebugJS.x.pnl.getPanel(DebugJS.ctx.extActPnlIdx);
};
DebugJS.x.pnl.isActive = function(nm) {
  if (!(DebugJS.ctx.status & DebugJS.ST_EXT_PANEL)) return false;
  var i = DebugJS.x.pnl.getIdx(nm);
  return i == DebugJS.ctx.extActPnlIdx;
};
DebugJS.x.pnl.exists = function(nm) {
  return DebugJS.x.pnl.getPanel(nm) != null;
};
DebugJS.x.pnl.setHidden = function(nm, f) {
  var ctx = DebugJS.ctx;
  var p = DebugJS.x.pnl.getPanel(nm);
  if (p) {
    if (f) {
      p.hidden = true;
      DebugJS.x.pnl.remove(nm, true);
    } else {
      p.hidden = false;
      ctx.redrawExtPanelBtn(ctx);
      DebugJS.showExtBtn(true);
    }
  }
};
DebugJS.x.pnl.switchPanel = function(id) {
  var i = (typeof id == 'string' ? DebugJS.x.pnl.getIdx(id) : id);
  if (DebugJS.ctx.extPanels[i]) {
    DebugJS.ctx.switchExtPanel(i);
  }
};
DebugJS.x.pnl.len = function(all) {
  var a = DebugJS.ctx.extPanels;
  var n = 0;
  for (var i = 0; i < a.length; i++) {
    if ((a[i] != null) && (all || !a[i].hidden)) n++;
  }
  return n;
};
DebugJS.x.pnl.addFileLdr = function(p) {
  var d = p.fileloader;
  if (d) DebugJS.addFileLoader(p.panel, d.cb, d.mode, d.decode);
  if (p.onDrop) DebugJS.addDropHandler(p.panel, p.onDrop);
};
DebugJS.showExtBtn = function(f) {
  if (DebugJS.ctx.extBtn) DebugJS.ctx.extBtn.style.display = (f ? '' : 'none');
};
DebugJS.init = function(opt) {
  DebugJS.ctx.init(opt, null);
};
DebugJS._init = function() {
  if (DebugJS.ctx.status & DebugJS.ST_INITIALIZED) {
    return true;
  } else {
    return DebugJS.ctx.init(null, null);
  }
};
DebugJS.onDbgRdy = function() {
  if (!DebugJS.rdy) {
    DebugJS.rdy = true;
    var f = window.ondbgready;
    if (f) f();
  }
};
DebugJS.isReady = function() {
  return DebugJS.ctx.status & DebugJS.ST_INITIALIZED ? true : false;
};
DebugJS.onReady = function() {
  DebugJS._init();
};
DebugJS.onLoad = function() {
  window.addEventListener('beforeunload', DebugJS.onB4Unload, true);
  window.addEventListener('unload', DebugJS.onUnload, true);
  if (DebugJS.LS_AVAILABLE) DebugJS.test.load();
  if (DebugJS.ctx.status & DebugJS.ST_BAT_CONT) {
    if (DebugJS.LS_AVAILABLE) DebugJS.bat.load();
  } else if (DebugJS.bat.q) {
    DebugJS.bat.lazyExec();
  }
  DebugJS.ctx.reopenFeatures(DebugJS.ctx);
};
DebugJS.onB4Unload = function() {};
DebugJS.onUnload = function() {
  var ctx = DebugJS.ctx;
  if (DebugJS.LS_AVAILABLE) {
    if (DebugJS.test.data.running) {
      DebugJS.test.save();
    }
    if (ctx.status & DebugJS.ST_BAT_CONT) {
      DebugJS.bat.save();
    }
    if ((ctx.status & DebugJS.ST_LOG_PRESERVED) || (ctx.status & DebugJS.ST_BAT_CONT)) {
      DebugJS.saveStatus();
    }
  }
  DebugJS._log.v('unload');
  if (DebugJS.LS_AVAILABLE && (ctx.status & DebugJS.ST_LOG_PRESERVED)) {
    DebugJS.preserveLog();
  }
};
DebugJS.onError = function(e) {
  var msg;
  DebugJS.ctx.errStatus |= DebugJS.ERR_ST_SCRIPT;
  if (e.error && e.error.stack) {
    var stk = e.error.stack;
    msg = stk;
    if (!stk.match(/\n/)) {
      msg += '\n' + e.filename + '(' + e.lineno + ':' + e.colno + ')';
    }
  } else {
    if ((e.message == undefined) && (e.filename == undefined)) {
      if (e.target && e.target.outerHTML) {
        DebugJS.ctx.errStatus |= DebugJS.ERR_ST_LOAD;
        DebugJS.ctx.errStatus &= ~DebugJS.ERR_ST_SCRIPT;
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
DebugJS.balse = function(o) {
  var x = (typeof o == 'function' ? function() {} : o);
  for (var k in o) {
    x[k] = (typeof o[k] == 'function' ? DebugJS.balse(o[k]) : o[k]);
  }
  return x;
};
DebugJS.boot = function() {
  DebugJS.rootFncs();
  DebugJS.ctx = DebugJS.ctx || new DebugJS();
  DebugJS.el = null;
  window.addEventListener('error', DebugJS.onError, true);
  window.addEventListener('DOMContentLoaded', DebugJS.onReady, true);
  window.addEventListener('load', DebugJS.onLoad, true);
  if (window.el === undefined) DebugJS.G_EL_AVAILABLE = true;
  try {
    if (typeof window.localStorage != 'undefined') {
      DebugJS.LS_AVAILABLE = true;
    }
  } catch (e) {}
  try {
    if (typeof window.sessionStorage != 'undefined') {
      DebugJS.SS_AVAILABLE = true;
    }
  } catch (e) {}
  if (window.console) {
    DebugJS.bak = {
      console: {
        log: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error,
        time: console.time,
        timeEnd: console.timeEnd
      }
    };
  }
  if (DebugJS.LS_AVAILABLE) {
    DebugJS.restoreStatus(DebugJS.ctx);
  }
  if (document.body) {
    DebugJS.onReady();
    DebugJS.onLoad();
  }
};
DebugJS.start = function(o) {
  if (!o) o = {visible: true};
  DebugJS.init(o);
};
DebugJS.ENABLE = true;
if (DebugJS.ENABLE) {
  DebugJS.boot();
} else {
  DebugJS = DebugJS.balse(DebugJS);
}
var dbg = (dbg === undefined ? DebugJS : dbg);
var log = DebugJS.log;
