/*!
 * debug.js
 * Copyright 2015 Takashi Harano
 * Released under the MIT license
 * https://debugjs.net/
 */
var DebugJS = DebugJS || function() {
  this.v = '202209250043';

  this.DEFAULT_OPTIONS = {
    visible: false,
    keyAssign: {
      show: {key: 113},
    },
    focusOnShow: true,
    autoPopup: {
      scriptError: true,
      loadError: true,
      error: true,
      fatal: true
    },
    lines: 20,
    bufsize: 300,
    width: 602,
    zoom: 1,
    position: 'se',
    adjX: 20,
    adjY: 20,
    fontSize: 12,
    fontFamily: 'Consolas, Monaco, Menlo, monospace, sans-serif',
    fontColor: '#fff',
    logColorV: '#99bcc8',
    logColorD: '#ccc',
    logColorI: '#9de',
    logColorW: '#ee4',
    logColorE: '#d9a',
    logColorF: '#ea4',
    logColorS: '#fff',
    clockColor: '#8f0',
    timerColor: '#9ef',
    sysInfoColor: '#ddd',
    btnColor: '#6cf',
    btnHoverColor: '#8ef',
    promptColor: '#0cf',
    promptColorE: '#f45',
    background: 'linear-gradient(150deg, rgba(0,0,0,0.8),rgba(0,0,0,0.5))',
    border: 'solid 1px #888',
    borderRadius: '0',
    opacity: '1',
    showLineNums: true,
    showTimestamp: 1,
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
    useElementInfo: true,
    useJsEditor: true,
    useTools: true,
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
  this.elmInfoBtn = null;
  this.elmInfoPanel = null;
  this.elmInfoHdrPanel = null;
  this.elmPrevBtn = null;
  this.elmTitle = null;
  this.elmNextBtn = null;
  this.elmPrevSblBtn = null;
  this.elmNextSblBtn = null;
  this.elmParenttBtn = null;
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
  this.timerSwSubPanel = null;
  this.timerSwLabel = null;
  this.timerSwInpSubPanel = null;
  this.timerSwInputDiv = null;
  this.timerSign = true;
  this.timerT0 = 0;
  this.timerSwT0 = 0;
  this.timerSwVal = 0;
  this.timerStartedV = 0;
  this.timerSwPrevSplit = 0;
  this.timerContinueTplus = true;
  this.timerStartStopBtn = null;
  this.timerSplitBtn = null;
  this.timerSplitF = false;
  this.timerCntTplsBtn1 = null;
  this.timerCntTplsBtn2 = null;
  this.timerStartStopBtnInp = null;
  this.fontChkBtn = null;
  this.fontChkPanel = null;
  this.fontChkTxt = null;
  this.fontChkFontSizeRange = null;
  this.fontChkFontSizeInput = null;
  this.fontChkFontSizeUnitInput = null;
  this.fontChkFontWeightRange = null;
  this.fontChkFontWeightLabel = null;
  this.fontChkInputFgRGB = null;
  this.fontChkRangeFgR = null;
  this.fontChkRangeFgG = null;
  this.fontChkRangeFgB = null;
  this.fontChkLabelFgR = null;
  this.fontChkLabelFgG = null;
  this.fontChkLabelFgB = null;
  this.fontChkInputBgRGB = null;
  this.fontChkRangeBgR = null;
  this.fontChkRangeBgG = null;
  this.fontChkRangeBgB = null;
  this.fontChkLabelBgR = null;
  this.fontChkLabelBgG = null;
  this.fontChkLabelBgB = null;
  this.fontChkTargetEl = null;
  this.fontChkItalic = false;
  this.fileVwrMode = 'b64';
  this.fileVwrBtn = null;
  this.fileVwrPanel = null;
  this.fileInput = null;
  this.fileVwrLabelB64 = null;
  this.fileVwrRadioB64 = null;
  this.fileVwrLabelBin = null;
  this.fileVwrRadioBin = null;
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
  this.fileVwrHash = null;
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
  this.txtBtn = null;
  this.txtBasePanel = null;
  this.txtEdtTxt = null;
  this.txtTxtSt = null;
  this.txtClrBtn = null;
  this.txtEdtExecBtn = null;
  this.txtEdtMdSlct = null;
  this.txtEdtSrtSlct = null;
  this.txtEdtOptLbl = null;
  this.txtEdtOpt = null;
  this.swBtnPanel = null;
  this.swLabel = null;
  this.clearBtn = null;
  this.wdBtn = null;
  this.preserveLogBtn = null;
  this.suspendLogBtn = null;
  this.pinBtn = null;
  this.clpBtn = null;
  this.hdrInfBtn = null;
  this.winCtrlBtnPanel = null;
  this.closeBtn = null;
  this.mousePosLabel = null;
  this.mousePos = {x: '-', y: '-'};
  this.mouseClickLabel = null;
  this.mouseClick = [DebugJS.COLOR_INACT, DebugJS.COLOR_INACT, DebugJS.COLOR_INACT];
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
  this.logTimeBtn = null;
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
  this.cmdDelayData = {tmid: 0, cmd: null, t: 0};
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
  this.ptDnTm = 0;
  this.ptOpTm = 0;
  this.logFilter = DebugJS.LOG_FLTR_ALL;
  this.toolsActvFnc = DebugJS.TOOLS_DFLT_ACTIVE_FNC;
  this.logBuf = new DebugJS.RingBuffer(this.DEFAULT_OPTIONS.bufsize);
  this.INT_CMD_TBL = [
    {cmd: 'alias', fn: this.cmdAlias, desc: 'Define or display aliases', help: 'alias [name=[\'command\']]'},
    {cmd: 'arr2set', fn: this.cmdArr2Set, desc: 'Convert Array to Set', help: 'arr2set [-j] [-s] [-sort] Array'},
    {cmd: 'ascii', fn: this.cmdAscii, desc: 'Print all ASCII characters'},
    {cmd: 'base64', fn: this.cmdBase64, desc: 'Encodes/Decodes Base64', help: 'base64 [-e|-d] str'},
    {cmd: 'bat', fn: this.cmdBat, desc: 'Manipulate BAT Script', help: 'bat run [-s s] [-e e] [-arg arg]|pause|stop|list|status|pc|symbols|clear|exec b64-encoded-bat|set key val'},
    {cmd: 'bit', fn: this.cmdBit, desc: 'Displays the value of the given bit position', help: 'bit [-a] N'},
    {cmd: 'bsb64', fn: this.cmdBSB64, desc: 'Encodes/Decodes BSB64 reversible encryption string', help: 'bsb64 -e|-d [-n N] STR'},
    {cmd: 'byte', fn: this.cmdByte, desc: 'Displays the number of bytes', help: 'byte [-k|m|g|t|p] V'},
    {cmd: 'char', fn: this.cmdChar, desc: 'Print Unicode characters that consists of consecutive code points', help: 'char CH(U+xxxx) [CH(U+xxxx)]'},
    {cmd: 'close', fn: this.cmdClose, desc: 'Close a function', help: 'close [measure|sys|dom|js|tool|ext]'},
    {cmd: 'clock', fn: this.cmdClock, desc: 'Open clock mode', help: 'clock DATE_TIME|OFFSET|now|start|stop|on|off|-label TXT'},
    {cmd: 'cls', fn: this.cmdCls, desc: 'Clear log message', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'chmod', fn: this.cmdChmod, desc: 'Convert the Linux file mode between numeric and symbolic notation', help: 'chmod [755|rwxr-xr-x]'},
    {cmd: 'condwait', fn: this.cmdCondWait, desc: 'Suspends processing of batch file until condition key is set', help: 'condwait set -key key | pause [-timeout ms|1d2h3m4s500] | init'},
    {cmd: 'cookie', fn: this.cmdCookie, desc: 'Manipulate cookies', help: 'cookie keys|get|set|delete [key|-a] [val]'},
    {cmd: 'copy', fn: this.cmdCopy, desc: 'Copy to clipboard', help: 'copy ["STR"]'},
    {cmd: 'date', fn: this.cmdDate, desc: 'Convert ms <--> Date-Time', help: 'date [-iso] [ms|YYYY/MM/DD HH:MI:SS.sss] [+|-0000]'},
    {cmd: 'dbgwin', fn: this.cmdDbgWin, desc: 'Control the debug window', help: 'dbgwin show|hide|pos|size|opacity|status|lock'},
    {cmd: 'delay', fn: this.cmdDelay, desc: 'Delay command execution', help: 'delay [-c|-q] ms|[YYYYMMDD]THHMI[SS]|1d2h3m4s567 COMMAND'},
    {cmd: 'echo', fn: this.cmdEcho, desc: 'Echo the STRING(s) to the log window'},
    {cmd: 'elements', fn: this.cmdElements, desc: 'Count elements by #id / .className / tagName', help: 'elements [#id|.className|tagName]'},
    {cmd: 'event', fn: this.cmdEvent, desc: 'Manipulate an event', help: 'event create|set|dispatch|clear type|prop value'},
    {cmd: 'exit', fn: this.cmdExit, desc: 'Close the debug window and clear all status', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'float', fn: this.cmdFloat, desc: 'Displays IEEE 754 bit-level encodings', help: 'float [-b|-h] VAL'},
    {cmd: 'help', fn: this.cmdHelp, desc: 'Displays available command list', help: 'help command', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'history', fn: this.cmdHistory, desc: 'Displays command history', help: 'history [-c] [-d offset]', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'http', fn: this.cmdHttp, desc: 'Send an HTTP request', help: 'http [method] [-u user:pass] url [data]'},
    {cmd: 'inject', fn: this.cmdInject, desc: 'Inject a given code into a given function', help: 'inject funcname code'},
    {cmd: 'int', fn: this.cmdInt, desc: 'Radix conversion', help: 'int VAL'},
    {cmd: 'json', fn: this.cmdJson, desc: 'Parse one-line JSON', help: 'json [-l&lt;n&gt;] [-p] {JSON}'},
    {cmd: 'keypress', fn: this.cmdKeyPress, desc: 'Dispatch a key event to active element', help: 'keypress keycode [-shift] [-ctrl] [-alt] [-meta]'},
    {cmd: 'keys', fn: this.cmdKeys, desc: 'Displays all enumerable property keys of an object', help: 'keys object'},
    {cmd: 'kiosk', fn: this.cmdKiosk, desc: 'Make the debugger window go full screen', help: 'kiosk [zoom]'},
    {cmd: 'laptime', fn: this.cmdLaptime, desc: 'Lap time test'},
    {cmd: 'led', fn: this.cmdLed, desc: 'Set a bit pattern to the indicator', help: 'led bit-pattern'},
    {cmd: 'len', fn: this.cmdLen, desc: 'Count the length of the given string', help: 'len [-b] STR'},
    {cmd: 'log', fn: this.cmdLog, desc: 'Manipulate log output', help: 'log bufsize|copy|dump|filter|html|load|preserve|suspend|time|lv'},
    {cmd: 'msg', fn: this.cmdMsg, desc: 'Set a string to the message display', help: 'msg message'},
    {cmd: 'nexttime', fn: this.cmdNextTime, desc: 'Returns next time from given args', help: 'nexttime T0000|T1200|...|1d2h3m4s|ms'},
    {cmd: 'now', fn: this.cmdNow, desc: 'Returns the number of milliseconds elapsed since Jan 1, 1970 00:00:00 UTC'},
    {cmd: 'num', fn: this.cmdNum, desc: 'Displays the numbers in order', help: 'num V1 V2 [ST] [-z]'},
    {cmd: 'open', fn: this.cmdOpen, desc: 'Launch a function', help: 'open [measure|sys|dom|js|tool|ext] [timer|font|file|html|bat]|[idx] [clock|sw]|[b64|bin]'},
    {cmd: 'p', fn: this.cmdP, desc: 'Print value of expression EXP', help: 'p [-l&lt;n&gt;] [-json] EXP'},
    {cmd: 'pause', fn: this.cmdPause, desc: 'Suspends processing of batch file', help: 'pause [-key key] [-timeout ms|1d2h3m4s500]'},
    {cmd: 'pin', fn: this.cmdPin, desc: 'Fix the window in its position', help: 'pin on|off'},
    {cmd: 'point', fn: this.cmdPoint, desc: 'Show the pointer to the specified coordinate', help: 'point [+|-]x [+|-]y|#id|.class [idx]|TAGNAME [idx]|click|cclick|rclick|dblclick|contextmenu|mousedown|mouseup|keydown|keypress|keyup|focus|blur|change|show|hide|getelement|getprop|setprop|verify|init|center|mouse|move|drag|text|selectoption|value|scroll|hint|cursor src [w] [h]|ch [n]'},
    {cmd: 'prop', fn: this.cmdProp, desc: 'Displays a property value', help: 'prop property-name'},
    {cmd: 'props', fn: this.cmdProps, desc: 'Displays property list', help: 'props [-reset]'},
    {cmd: 'random', fn: this.cmdRandom, desc: 'Generate a random number/string', help: 'random [-n|-s] [min[d]] [max] [-tbl "ABC..."]'},
    {cmd: 'resume', fn: this.cmdResume, desc: 'Resume a suspended batch process', help: 'resume [-key key]'},
    {cmd: 'rgb', fn: this.cmdRGB, desc: 'Convert RGB color values between HEX and DEC', help: 'rgb values (#<span style="color:' + DebugJS.COLOR_R + '">R</span><span style="color:' + DebugJS.COLOR_G + '">G</span><span style="color:' + DebugJS.COLOR_B + '">B</span> | <span style="color:' + DebugJS.COLOR_R + '">R</span> <span style="color:' + DebugJS.COLOR_G + '">G</span> <span style="color:' + DebugJS.COLOR_B + '">B</span>)'},
    {cmd: 'rot', fn: this.cmdROT, desc: 'Replaces a letter with ROTx', help: 'rot 5|13|18|47 [-n N] STR'},
    {cmd: 'scrollto', fn: this.cmdScrollTo, desc: 'Set scroll position', help: '\nscrollto log top|px|bottom [+|-]px(x)|left|center|right|current\nscrollto window [+|-]px(y)|top|middle|bottom|current [-speed speed(ms)] [-step step(px)]'},
    {cmd: 'select', fn: this.cmdSelect, desc: 'Select an option of select element', help: 'select selectors get|set text|texts|value|values val'},
    {cmd: 'set', fn: this.cmdSet, desc: 'Set a property value', help: 'set property-name value'},
    {cmd: 'setattr', fn: this.cmdSetAttr, desc: 'Set the value of an attribute on the specified element', help: 'setattr selector [idx] name value'},
    {cmd: 'sleep', fn: this.cmdSleep, desc: 'Causes the currently executing thread to sleep', help: 'sleep ms'},
    {cmd: 'stack', fn: this.cmdStack, desc: 'Inject print stack trace code into a given function', help: 'stack funcname'},
    {cmd: 'stopwatch', fn: this.cmdStopwatch, desc: 'Manipulate the stopwatch', help: 'stopwatch [0|1] start|stop|reset|split|end|time|value|t0 V'},
    {cmd: 'strp', fn: this.cmdStrP, desc: 'String permutation', help: 'strp [-total] "CHARS" INDEX|"STR" [INDEX]'},
    {cmd: 'sw', fn: this.cmdSw, desc: 'Launch the stopwatch in the full-screen mode'},
    {cmd: 'test', fn: this.cmdTest, desc: 'Manage unit test', help: 'test init|set|count|result|last|ttlresult|status|verify GOT method EXP|end'},
    {cmd: 'text', fn: this.cmdText, desc: 'Set text value into an element', help: 'text SELECTOR "TEXT" [-speed MILLIS] [-start SEQ_START_POS] [-end SEQ_END_POS]'},
    {cmd: 'time', fn: this.cmdTime, desc: 'String <--> millis', help: 'time ms|sec.ms|1d 2h 3m 4s 567|01:23:45.678'},
    {cmd: 'timediff', fn: this.cmdTimeDiff, desc: 'Time duration calculator', help: '\ntimediff ms|HH:MI:SS.sss|"DATE_TIME" ms|HH:MI:SS.sss|"DATE_TIME"\nDATE_TIME: YYYY-MM-DD HH:MI:SS.sss|YYYYMMDDTHHMISS.sss'},
    {cmd: 'timer', fn: this.cmdTimer, desc: 'Manipulate the timer', help: 'timer start|check|split|stop|list [TIMER_NAME]'},
    {cmd: 'tofull', fn: this.cmdToFull, desc: 'Convert half-width character(s) to full-width', help: 'tofull STR'},
    {cmd: 'tohalf', fn: this.cmdToHalf, desc: 'Convert full-width character(s) to half-width', help: 'tohalf STR'},
    {cmd: 'unalias', fn: this.cmdUnAlias, desc: 'Remove each NAME from the list of defined aliases', help: 'unalias [-a] name [name ...]'},
    {cmd: 'unicode', fn: this.cmdUnicode, desc: 'Displays Unicode escape sequences / Decodes unicode string', help: 'unicode [-e|-d] "STR"|CODE_POINT'},
    {cmd: 'uri', fn: this.cmdUri, desc: 'Encodes/Decodes a URI component', help: 'uri [-e|-d] str'},
    {cmd: 'utf8', fn: this.cmdUtf8, desc: 'Dump UTF-8 byte sequence', help: 'utf8 "STR"'},
    {cmd: 'v', fn: this.cmdV, desc: 'Displays version info', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'vals', fn: this.cmdVals, desc: 'Displays variable list'},
    {cmd: 'watchdog', fn: this.cmdWatchdog, desc: 'Start/Stop watchdog timer', help: 'watchdog [start|stop] [time(ms)]'},
    {cmd: 'win', fn: this.cmdWin, desc: 'Set the debugger window size/pos', help: 'win normal|expand|full|restore|reset', attr: DebugJS.CMD_ATTR_DYNAMIC | DebugJS.CMD_ATTR_NO_KIOSK},
    {cmd: 'xlscol', fn: this.cmdXlsCol, desc: 'Excel column number <--> reference', help: 'xlscol COL [+|-|:] [COL]'},
    {cmd: 'xlsdate', fn: this.cmdXlsDate, desc: 'Serial number <--> Date', help: 'xlsdate NUM|YYYY/MM/DD'},
    {cmd: 'xlstime', fn: this.cmdXlsTime, desc: 'Serial number <--> Time', help: 'xlstime NUM|hh:mm:ss.000'},
    {cmd: 'zoom', fn: this.cmdZoom, desc: 'Zoom the debugger window', help: 'zoom ratio', attr: DebugJS.CMD_ATTR_DYNAMIC},
    {cmd: 'call', fn: this.cmdCall, attr: DebugJS.CMD_ATTR_SYSTEM | DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'goto', fn: this.cmdGoto, attr: DebugJS.CMD_ATTR_SYSTEM | DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'jump', fn: this.cmdJump, attr: DebugJS.CMD_ATTR_SYSTEM | DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'quit', fn: this.cmdQuit, attr: DebugJS.CMD_ATTR_SYSTEM | DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'return', fn: this.cmdReturn, attr: DebugJS.CMD_ATTR_SYSTEM | DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'wait', fn: this.cmdNop, attr: DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'nop', fn: this.cmdNop, attr: DebugJS.CMD_ATTR_HIDDEN}
  ];
  this.CMD_TBL = [];
  this.EXT_CMD_TBL = [];
  this.CMD_ALIAS = {};
  this.CMD_ALIAS_BI = {b64: 'base64', d: 'date', t: 'time'};
  this.CMDVALS = {};
  this.opt = null;
  this.errStatus = DebugJS.ERR_ST_NONE;
  this.PROPS_RESTRICTION = {
    batcont: /^on$|^off$/,
    batstop: /^[^|][a-z|]+[^|]$/,
    clockoffset: /^-?[0-9]+$/,
    esc: /^enable$|^disable$/,
    dumplimit: /^[0-9]+$/,
    dumpvallen: /^[0-9]+$/,
    prevlimit: /^[0-9]+$/,
    hexdumplimit: /^[0-9]+$/,
    hexdumplastrows: /^[0-9]+$/,
    indent: /^[0-9]+$/,
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
    clockoffset: 0,
    esc: 'enable',
    dumplimit: 1000,
    dumpvallen: 4096,
    prevlimit: 5 * 1024 * 1024,
    hexdumplimit: 1048576,
    hexdumplastrows: 16,
    indent: 1,
    pointspeed: DebugJS.point.move.speed,
    pointstep: DebugJS.point.move.step,
    pointmsgsize: '12px',
    scrollspeed: DebugJS.scrollWinTo.data.speed,
    scrollstep: DebugJS.scrollWinTo.data.step,
    textspeed: 30,
    textstep: 1,
    testvallimit: 4096,
    wait: 500,
    timer: '-00:00:00.000',
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
  this.$mF = 0;
  this.$m = undefined;
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
DebugJS.ST_ELM_INFO = 1 << 17;
DebugJS.ST_ELM_EDIT = 1 << 18;
DebugJS.ST_JS = 1 << 19;
DebugJS.ST_TOOLS = 1 << 20;
DebugJS.ST_EXT_PANEL = 1 << 21;
DebugJS.ST_WD = 1 << 22;
DebugJS.ST_NO_HIST = 1 << 23;
DebugJS.ST_SW = 1 << 24;
DebugJS.ST_KIOSK = 1 << 25;
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
DebugJS.UI_ST_HEADINFO = 1 << 14;
DebugJS.TOOL_ST_SW_RUNNING = 1;
DebugJS.TOOL_ST_SW_PAUSED = 1 << 1;
DebugJS.TOOL_ST_SW_TPLUS = 1 << 2;
DebugJS.TOOL_ST_SW_END = 1 << 3;
DebugJS.TOOL_TMR_MODE_CLOCK = 0;
DebugJS.TOOL_TMR_MODE_SW = 1;
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
DebugJS.TOOLS_FNC_FONT = 0x2;
DebugJS.TOOLS_FNC_HTML = 0x4;
DebugJS.TOOLS_FNC_FILE = 0x8;
DebugJS.TOOLS_FNC_BAT = 0x10;
DebugJS.TOOLS_FNC_TEXT = 0x20;
DebugJS.TOOLS_DFLT_ACTIVE_FNC = DebugJS.TOOLS_FNC_TIMER;
DebugJS.CMD_ATTR_SYSTEM = 0x1;
DebugJS.CMD_ATTR_HIDDEN = 0x2;
DebugJS.CMD_ATTR_DYNAMIC = 0x4;
DebugJS.CMD_ATTR_NO_KIOSK = 0x8;
DebugJS.CMD_ATTR_DISABLED = 0x10;
DebugJS.CMD_ECHO_MAX_LEN = 256;
DebugJS.DBGWIN_MIN_W = 292;
DebugJS.DBGWIN_MIN_H = 155;
DebugJS.DBGWIN_EXPAND_W = 900;
DebugJS.DBGWIN_EXPAND_H = 600;
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
DebugJS.DOM_BTN_COLOR = '#f63';
DebugJS.JS_BTN_COLOR = '#6df';
DebugJS.TOOLS_BTN_COLOR = '#ff0';
DebugJS.EXT_BTN_COLOR = '#f8f';
DebugJS.HDRINF_BTN_COLOR = '#eee';
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
DebugJS.TMR_NM_SW_S = 'sw0';
DebugJS.TMR_NM_SW_L = 'sw1';
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
DebugJS.CHR_WIN_RSTR = '&#x2750;';
DebugJS.LOG_HEAD = '[LOG]';
DebugJS.LOG_BOUNDARY_BUF = '-- ORIGINAL LOG BUFFER --';
DebugJS.SYS_INFO_FULL_OVERLAY = true;
DebugJS.HTML_SRC_FULL_OVERLAY = true;
DebugJS.HTML_SRC_EXPAND_H = false;
DebugJS.ELM_INFO_FULL_OVERLAY = false;
DebugJS.LS_AVAILABLE = false;
DebugJS.SS_AVAILABLE = false;
DebugJS.G_EL_AVAILABLE = false;
DebugJS.Aa0 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
DebugJS.A2Z = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
DebugJS.JS_SNIPPET = [
'dbg.time.s();\nfor (var i = 0; i < 1000000; i++) {\n\n}\ndbg.time.e();\n\'done\';',
'',
'',
'',
''
];
DebugJS.HTML_SNIPPET = [
'<div style="width:100%; height:100%; background:#fff; color:#000;">\n\n</div>\n',
'<button onclick=""></button>',
'<video src="" controls autoplay>',
'',
'<!DOCTYPE html>\n<html>\n<head>\n<meta http-equiv="X-UA-Compatible" content="IE=edge">\n<meta charset="utf-8">\n<meta name="robots" content="none">\n<meta name="referrer" content="no-referrer">\n<meta name="referrer" content="never">\n<title></title>\n<link rel="stylesheet" href="style.css" />\n<script src="script.js"></script>\n<style>\n</style>\n<script>\nonReady = function() {\n};\nonLoad = function() {\n};\nwindow.addEventListener(\'DOMContentLoaded\', onReady, true);\nwindow.addEventListener(\'load\', onLoad, true);\n</script>\n</head>\n<body>\n\n</body>\n</html>\n'
];
DebugJS.FEATURES = [
  'togglableShowHide', 'useClock', 'useClearButton', 'useSuspendLogButton',
  'usePinButton', 'useWinCtrlButton', 'useStopwatch', 'useDeviceInfo',
  'useLed', 'useMsgDisplay', 'useScreenMeasure', 'useSystemInfo',
  'useElementInfo', 'useJsEditor', 'useTools', 'useLogFilter', 'useCommandLine'
];
DebugJS.TZ = {'HST': '-10', 'PST': '-8', 'PDT': '-7', 'MST': '-7', 'MDT': '-6', 'CST': '-6', 'CDT': '-5', 'EST': '-5', 'EDT': '-4', 'UTC': '+0', 'GMT': '+0', 'CET': '+1', 'CEST': '+2', 'IST': '+0530', 'CTT': '+8', 'JST': '+9'};
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
      if (!(ctx.status & DebugJS.ST_LOG_PRESERVED) || ((ctx.status & DebugJS.ST_LOG_PRESERVED) && (ctx.logBuf.size() < ctx.opt.bufsize))) {
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
    if (rstrOpt && !(rstrOpt.uiStatus & DebugJS.UI_ST_HEADINFO)) {
      ctx.showHeaderInfo(false);
    }
    if (ctx.uiStatus & DebugJS.UI_ST_RESIZABLE) ctx.initResize(ctx);
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
        if (!(ctx.uiStatus & DebugJS.UI_ST_VISIBLE) || (ctx.uiStatus & DebugJS.UI_ST_PROTECTED)) {
          ctx.win.style.display = 'none';
        } else {
          ctx.focusCmdLine();
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
    styles['.dbg-select'] = {
      'height': '1.2em; !important',
      'border': 'solid 1px #aaa; !important',
      'border-radius': '0 !important',
      'padding': '0 !important',
      'background': '#000 !important',
      'color': '#fff !important',
      'font-size': fontSize + ' !important',
      'font-family': 'Consolas !important'
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

  createResizeArea: function(cursor, state, width, height) {
    var ctx = DebugJS.ctx;
    var el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.background = 'rgba(0,0,0,0)';
    el.style.width = width;
    el.style.height = height;
    el.style.cursor = cursor;
    el.onmousedown = function(e) {
      if (!(ctx.uiStatus & DebugJS.UI_ST_RESIZABLE)) return;
      if (e.button != 0) return;
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
    var f = window.removeEventListener;
    f('keydown', ctx.keyHandler, true);
    f('mousedown', ctx.onMouseDown, true);
    f('mousemove', ctx.onMouseMove, true);
    f('mouseup', ctx.onMouseUp, true);
    f('resize', ctx.onResize, true);
    f('scroll', ctx.onScroll, true);
    f('keydown', ctx.onKeyDown, true);
    f('keypress', ctx.onKeyPress, true);
    f('keyup', ctx.onKeyUp, true);
    f('touchstart', ctx.onTouchStart, true);
    f('touchmove', ctx.onTouchMove, true);
    f('touchend', ctx.onTouchEnd, true);
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
    ctx.opt.useElementInfo = false;
    ctx.status |= DebugJS.ST_KIOSK;
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
      ctx.uiStatus |= DebugJS.UI_ST_HEADINFO;
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
      var style = {position: 'relative', height: fontSize, 'margin-bottom': '2px'};
      DebugJS.setStyle(ctx.logHdrPanel, style);
      ctx.mainPanel.appendChild(ctx.logHdrPanel);
      ctx.uiStatus |= DebugJS.UI_ST_HEADINFO;
    }

    if (opt.useClearButton) {
      ctx.clearBtn = DebugJS.ui.addBtn(ctx.headPanel, '[CLR]', ctx.onClr);
    }

    if (opt.useLogFilter) {
      ctx.createLogFilter(ctx);
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
    if (ctx.logHdrPanel || ctx.infoPanel) {
      ctx.hdrInfBtn = ctx.createHdrBtn('hdrInfBtn', '=', 3, fontSize, ctx.toggleHeaderInfo, null, null, 'HDRINF_BTN_COLOR', false, 'Show header info');
    }
    if (opt.useCommandLine) {
      ctx.clpBtn = ctx.createHdrBtn('clpBtn', 'C', 3, fontSize, DebugJS.copyContent, null, null, 'CLP_BTN_COLOR', false, 'Copy to clipboard');
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
      ctx.swLabel.style.marginLeft = '1px';
      setStyle(ctx.swLabel, 'color', opt.fontColor);
      ctx.headPanel.appendChild(ctx.swLabel);
      ctx.swBtnPanel = document.createElement('span');
      ctx.swBtnPanel.style.float = 'right';
      ctx.swBtnPanel.style.marginLeft = '4px';
      ctx.headPanel.appendChild(ctx.swBtnPanel);
    }

    ctx.extBtn = ctx.createHdrBtn('extBtn', ctx.extBtnLabel, 3, null, ctx.toggleExtPanel, 'status', 'ST_EXT_PANEL', 'EXT_BTN_COLOR', false);
    DebugJS.showExtBtn(false);

    if (opt.useTools) {
      ctx.toolsBtn = ctx.createHdrBtn('toolsBtn', 'TOOL', 3, null, ctx.toggleTools, 'status', 'ST_TOOLS', 'TOOLS_BTN_COLOR', false);
    }
    if (opt.useJsEditor) {
      ctx.jsBtn = ctx.createHdrBtn('jsBtn', 'JS', 3, null, ctx.toggleJs, 'status', 'ST_JS', 'JS_BTN_COLOR', false);
    }
    if (opt.useElementInfo) {
      ctx.elmInfoBtn = ctx.createHdrBtn('elmInfoBtn', 'DOM', 3, null, ctx.toggleElmInfo, 'status', 'ST_ELM_INFO', 'DOM_BTN_COLOR', false);
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
      style = {
        'min-height': fontSize,
        'margin': '0 0 0 2px',
        'border': '0',
        'border-bottom': 'solid 1px #888',
        'padding': '1px'
      };
      ctx.cmdLine = DebugJS.ui.addTextInput(ctx.cmdPanel, 'calc(100% - ' + fontSize + ')', null, opt.fontColor, '', null);
      DebugJS.setStyle(ctx.cmdLine, style);
      ctx.cmdLine.spellcheck = false;
      ctx.initHistory(ctx);
    }
  },

  initResize: function(ctx) {
    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      var rsN = ctx.createResizeArea('ns-resize', DebugJS.UI_ST_RESIZING_N, '100%', '6px');
      rsN.style.top = '-3px';
      rsN.style.left = '0';
      ctx.win.appendChild(rsN);
    }

    var rsE = ctx.createResizeArea('ew-resize', DebugJS.UI_ST_RESIZING_E, '6px', '100%');
    rsE.style.top = '0';
    rsE.style.right = '-3px';
    ctx.win.appendChild(rsE);

    var rsS = ctx.createResizeArea('ns-resize', DebugJS.UI_ST_RESIZING_S, '100%', '6px');
    rsS.style.bottom = '-3px';
    rsS.style.left = '0';
    ctx.win.appendChild(rsS);

    var rsSE = ctx.createResizeArea('nwse-resize', DebugJS.UI_ST_RESIZING_S | DebugJS.UI_ST_RESIZING_E, '6px', '6px');
    rsSE.style.bottom = '-3px';
    rsSE.style.right = '-3px';
    ctx.win.appendChild(rsSE);

    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      var rsW = ctx.createResizeArea('ew-resize', DebugJS.UI_ST_RESIZING_W, '6px', '100%');
      rsW.style.top = '0';
      rsW.style.left = '-3px';
      ctx.win.appendChild(rsW);

      var rsNW = ctx.createResizeArea('nwse-resize', DebugJS.UI_ST_RESIZING_N | DebugJS.UI_ST_RESIZING_W, '6px', '6px');
      rsNW.style.top = '-3px';
      rsNW.style.left = '-3px';
      ctx.win.appendChild(rsNW);

      var rsNE = ctx.createResizeArea('nesw-resize', DebugJS.UI_ST_RESIZING_N | DebugJS.UI_ST_RESIZING_E, '6px', '6px');
      rsNE.style.top = '-3px';
      rsNE.style.right = '-3px';
      ctx.win.appendChild(rsNE);

      var rsSW = ctx.createResizeArea('nesw-resize', DebugJS.UI_ST_RESIZING_S | DebugJS.UI_ST_RESIZING_W, '6px', '6px');
      rsSW.style.bottom = '-3px';
      rsSW.style.left = '-3px';
      ctx.win.appendChild(rsSW);

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
      ctx.updateWinCtrlBtns();
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

  createHdrBtn: function(btnObj, label, marginLeft, fontSize, handler, stVar, stNm, actvColor, reverse, title) {
    var ctx = DebugJS.ctx;
    var btn = DebugJS.ui.addBtn(ctx.headPanel, label, handler);
    btn.style.float = 'right';
    btn.style.marginLeft = (marginLeft * ctx.zoom) + 'px';
    if (fontSize) DebugJS.setStyle(btn, 'font-size', fontSize);
    DebugJS.setStyle(btn, 'color', DebugJS.COLOR_INACT);
    btn.onmouseover = new Function('DebugJS.setStyle(DebugJS.ctx.' + btnObj + ', \'color\', DebugJS.' + actvColor + ');');
    var fnSfx = (reverse ? 'DebugJS.COLOR_INACT : DebugJS.' + actvColor + ');' : 'DebugJS.' + actvColor + ' : DebugJS.COLOR_INACT);');
    if (stVar) {
      btn.onmouseout = new Function('DebugJS.setStyle(DebugJS.ctx.' + btnObj + ', \'color\', (DebugJS.ctx.' + stVar + ' & DebugJS.' + stNm + ') ? ' + fnSfx);
    } else {
      btn.onmouseout = new Function('DebugJS.setStyle(DebugJS.ctx.' + btnObj + ', \'color\', DebugJS.COLOR_INACT)');
    }
    if (title) btn.title = title;
    return btn;
  },

  createSysInfoLabel: function() {
    var el = DebugJS.ui.addElement(DebugJS.ctx.infoPanel, 'span');
    el.className = 'dbg-sys-info';
    return el;
  },

  createLogFilter: function(ctx) {
    ctx.logTimeBtn = ctx.createLogFltBtn2(ctx, '', 'logTimeBtn', 1, '', ctx.toggleLogTimestamp);
    ctx.updateLogTimestampBtn(ctx, ctx.opt.showTimestamp);
    ctx.fltrBtnAll = ctx.createLogFltBtn('ALL', 'ALL', 'fltrBtnAll', 'btnColor');
    ctx.fltrBtnStd = ctx.createLogFltBtn('L', 'LOG', 'fltrBtnStd', 'fontColor');
    ctx.fltrBtnVrb = ctx.createLogFltBtn('V', 'VRB', 'fltrBtnVrb', 'logColorV');
    ctx.fltrBtnDbg = ctx.createLogFltBtn('D', 'DBG', 'fltrBtnDbg', 'logColorD');
    ctx.fltrBtnInf = ctx.createLogFltBtn('I', 'INF', 'fltrBtnInf', 'logColorI');
    ctx.fltrBtnWrn = ctx.createLogFltBtn('W', 'WRN', 'fltrBtnWrn', 'logColorW');
    ctx.fltrBtnErr = ctx.createLogFltBtn('E', 'ERR', 'fltrBtnErr', 'logColorE');
    ctx.fltrBtnFtl = ctx.createLogFltBtn('F', 'FTL', 'fltrBtnFtl', 'logColorF');

    var style = {'margin-left': '4px', 'color': ctx.opt.sysInfoColor};
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
    var mofn = 'DebugJS.setStyle(DebugJS.ctx.' + btnNm + ', \'color\',';
    if (flgNm) {
      mofn += ' (DebugJS.ctx.' + flgNm + ') ? DebugJS.FLT_BTN_COLOR : DebugJS.COLOR_INACT);';
    } else {
      mofn += ' DebugJS.FLT_BTN_COLOR);';
    }
    btn.onmouseover = new Function('DebugJS.setStyle(DebugJS.ctx.' + btnNm + ', \'color\', DebugJS.FLT_BTN_COLOR);');
    btn.onmouseout = new Function(mofn);
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
            (!((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) && (ctx.opt.mode == 'kiosk') && (ctx.INT_CMD_TBL[i].attr & DebugJS.CMD_ATTR_NO_KIOSK)))) {
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
  tick: function() {
    var ctx = DebugJS.ctx;
    ctx.updateClockLabel(ctx);
    ctx.clockTmId = setTimeout(ctx.tick, ctx.clockUpdInt);
  },
  updateClockLabel: function(ctx) {
    var dt = DebugJS.getClockVal();
    var t = dt.yyyy + '-' + dt.mm + '-' + dt.dd + ' ' + DebugJS.WDAYS[dt.wday] + ' ' + dt.hh + ':' + dt.mi + ':' + dt.ss;
    ctx.clockLabel.innerText = t;
  },
  startUdtClock: function(ctx) {
    ctx.stopUdtClock(ctx);
    ctx.tick();
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
    var s = '<span style="color:' + this.mouseClick[0] + ' !important;margin-right:2px;">0</span>' +
    '<span style="color:' + this.mouseClick[1] + ' !important;margin-right:2px;">1</span>' +
    '<span style="color:' + this.mouseClick[2] + ' !important">2</span>';
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

  updateBtnActive: function(btn, st, actvColor) {
    if (btn) DebugJS.setStyle(btn, 'color', (DebugJS.ctx.status & st) ? actvColor : DebugJS.COLOR_INACT);
  },

  updateWinCtrlBtns: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.winCtrlBtnPanel) return;
    var fn = 'DebugJS.ctx.expandDbgWin(\'full\');';
    var btn = DebugJS.CHR_WIN_FULL;
    if (ctx.sizeStatus == DebugJS.SIZE_ST_FULL_WH) {
      fn = 'DebugJS.ctx.restoreDbgWin();';
      btn = DebugJS.CHR_WIN_RSTR;
    }
    fn += 'DebugJS.ctx.updateWinCtrlBtns();DebugJS.ctx.focusCmdLine();';
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
    var mxDgt = DebugJS.digits(cnt);
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
        var diff = mxDgt - DebugJS.digits(lineCnt);
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
        if (opt.showTimestamp) {
          var tmfn = (opt.showTimestamp == 2 ? DebugJS.getDateTimeStr : DebugJS.getTimeStr);
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
    DebugJS.cls();
    DebugJS.ctx.focusCmdLine();
  },
  clearLog: function() {
    DebugJS.ctx.logBuf.clear();
    DebugJS.ctx.printLogs();
  },

  toggleLogTimestamp: function() {
    var v = DebugJS.ctx.opt.showTimestamp + 1;
    if (v > 2) v = 0;
    DebugJS.ctx.setLogTimestamp(DebugJS.ctx, v);
  },
  setLogTimestamp: function(ctx, v) {
    ctx.opt.showTimestamp = v;
    ctx.updateLogTimestampBtn(ctx, v);
    ctx.printLogs();
  },
  updateLogTimestampBtn: function(ctx, v) {
    var b = '--';
    if (v == 2) {
      b = 'DT';
    } else if (v == 1) {
      b = '-T';
    }
    ctx.logTimeBtn.innerText = '|' + b + '|';
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
      var css = '';
      for (var nm in props) {
        var vl = props[nm];
        var impt = '';
        if (vl[1] === true) {
          vl = vl[0];
          impt = ' !important';
        }
        css += nm + ':' + vl + impt + ';\n';
      }
      s.insertRule(selector + '{' + css + '}', s.cssRules.length);
    }
  },

  setIntervalL: function(ctx) {
    if (ctx.clockUpdIntHCnt > 0) ctx.clockUpdIntHCnt--;
    if (ctx.clockUpdIntHCnt == 0) ctx.clockUpdInt = DebugJS.UPDATE_INTERVAL_L;
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
    ctx.ptDnTm = Date.now();
    if ((ctx.ptDnTm - t) < 300) {
      ctx.onDbgWinDblClick(e);
    } else {
      ctx.startMove(ctx, x, y);
    }
    e.preventDefault();
  },
  startMove: function(ctx, x, y) {
    ctx.uiStatus |= DebugJS.UI_ST_DRAGGING;
    ctx.ptOpTm = Date.now();
    ctx.winBody.style.cursor = 'move';
    ctx.disableTextSelect(ctx);
    ctx.ptOfstY = y - ctx.win.offsetTop;
    ctx.ptOfstX = x - ctx.win.offsetLeft;
    if (!document.all) {
      window.getSelection().removeAllRanges();
    }
  },

  moveDbgWin: function(ctx, x, y) {
    ctx.ptOpTm = Date.now();
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
      if ((el == ctx.logPanel) || (el == ctx.sysInfoPanel) ||
          (el == ctx.elmInfoBodyPanel) || (el == ctx.filePreviewWrapper) ||
          (el == ctx.toolsPanel) ||
          (el == ctx.extPanel) || (el == ctx.extBodyPanel)) {
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
    ctx.uiStatus |= DebugJS.UI_ST_RESIZING;
    ctx.clickedPosX = e.clientX;
    ctx.clickedPosY = e.clientY;
    ctx.saveSizeAndPos(ctx);
    ctx.sizeStatus = DebugJS.SIZE_ST_NORMAL;
    ctx.updateWinCtrlBtns();
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
        t = ctx.orgSizePos.t - (ctx.computedMinH - ctx.orgSizePos.h);
        h = ctx.computedMinH;
      } else {
        t = ctx.orgSizePos.t - mvY;
      }
      if (ctx.logPanel.scrollTop != 0) {
        ctx.scrollLogBtm(ctx);
      }
    }

    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING_W) {
      mvX = ctx.clickedPosX - currentX;
      w = ctx.orgSizePos.w + mvX;
      if (w < ctx.computedMinW) {
        l = ctx.orgSizePos.l - (ctx.computedMinW - ctx.orgSizePos.w);
        w = ctx.computedMinW;
      } else {
        l = ctx.orgSizePos.l - mvX;
      }
    }

    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING_E) {
      mvX = currentX - ctx.clickedPosX;
      w = ctx.orgSizePos.w + mvX;
      if (w < ctx.computedMinW) w = ctx.computedMinW;
    }

    if (ctx.uiStatus & DebugJS.UI_ST_RESIZING_S) {
      mvY = currentY - ctx.clickedPosY;
      h = ctx.orgSizePos.h + mvY;
      if (ctx.initHeight < ctx.computedMinH) {
        if (h < ctx.initHeight) h = ctx.initHeight;
      } else if (h < ctx.computedMinH) {
        h = ctx.computedMinH;
      }
      if (ctx.logPanel.scrollTop != 0) ctx.scrollLogBtm(ctx);
    }

    if (t != undefined) ctx.win.style.top = t + 'px';
    if (l != undefined) ctx.win.style.left = l + 'px';
    if (w != undefined) ctx.win.style.width = w + 'px';
    if (h != undefined) ctx.win.style.height = h + 'px';
    ctx.adjLayout();
  },

  endResize: function(ctx) {
    ctx.uiStatus &= ~DebugJS.UI_ST_RESIZING_ALL;
    ctx.bodyEl.style.cursor = ctx.cursor;
    ctx.enableTextSelect(ctx);
  },

  adjLayout: function() {
    DebugJS.ctx.resizeMainHeight();
    DebugJS.ctx.resizeImgPreview();
  },

  resizeMainHeight: function() {
    var ctx = DebugJS.ctx;
    var headPanelH = (ctx.headPanel) ? ctx.headPanel.offsetHeight : 0;
    var infoPanelH = (ctx.infoPanel) ? ctx.infoPanel.offsetHeight : 0;
    var cmdPanelH = (ctx.cmdPanel) ? ctx.cmdPanel.offsetHeight : 0;
    var mainPanelHeight = ctx.win.offsetHeight - headPanelH - infoPanelH - cmdPanelH - DebugJS.WIN_ADJUST;
    ctx.mainPanel.style.height = mainPanelHeight + 'px';
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
    var f = ((DebugJS.ctx.status & DebugJS.ST_LOG_PRESERVED) ? false : true);
    DebugJS.ctx.setLogPreserve(DebugJS.ctx, f);
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

  startStopStopwatch: function() {
    if (DebugJS.ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
      DebugJS.ctx.stopStopwatch();
    } else {
      DebugJS.ctx.startStopwatch();
    }
  },
  startStopwatch: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_STOPWATCH_RUNNING) return;
    if (ctx.status & DebugJS.ST_STOPWATCH_END) ctx.resetStopwatch();
    ctx.status |= DebugJS.ST_STOPWATCH_RUNNING;
    DebugJS.time.restart(DebugJS.TMR_NM_SW_S);
    ctx.updateSwLabel();
    ctx.updateSwBtnPanel(ctx);
    var v = DebugJS.time.getCount(DebugJS.TMR_NM_SW_S);
    DebugJS.callEvtListeners('stopwatch', 0, 'start', v);
  },
  stopStopwatch: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
      ctx.status &= ~DebugJS.ST_STOPWATCH_RUNNING;
      if (ctx.status & DebugJS.ST_STOPWATCH_LAPTIME) {
        ctx.status &= ~DebugJS.ST_STOPWATCH_LAPTIME;
        ctx.resetStopwatch();
      }
      DebugJS.time.pause(DebugJS.TMR_NM_SW_S);
      var v = DebugJS.time.getCount(DebugJS.TMR_NM_SW_S);
      DebugJS.callEvtListeners('stopwatch', 0, 'stop', v);
    }
    ctx.updateSwLabel();
    ctx.updateSwBtnPanel(ctx);
  },
  resetStopwatch: function() {
    DebugJS.ctx.status &= ~DebugJS.ST_STOPWATCH_END;
    DebugJS.time.reset(DebugJS.TMR_NM_SW_S);
    DebugJS.ctx.updateSwLabel();
    DebugJS.callEvtListeners('stopwatch', 0, 'reset');
  },
  splitStopwatch: function() {
    if (DebugJS.ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
      DebugJS.time.split(DebugJS.TMR_NM_SW_S);
    }
  },
  endStopwatch: function() {
    DebugJS.ctx.status |= DebugJS.ST_STOPWATCH_END;
    DebugJS.ctx.stopStopwatch();
  },
  updateSwLabel: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
      DebugJS.time.updateCount(DebugJS.TMR_NM_SW_S);
    }
    var str = DebugJS.getTmrStr(DebugJS.time.getCount(DebugJS.TMR_NM_SW_S));
    if (ctx.swLabel) {
      if (ctx.status & DebugJS.ST_STOPWATCH_LAPTIME) {
        str = '<span style="color:' + ctx.opt.timerColor + ' !important">' + str + '</span>';
      } else if (ctx.status & DebugJS.ST_STOPWATCH_END) {
        var now = DebugJS.getDateTime();
        if (now.sss > 500) str = DebugJS.repeatCh('&nbsp;', 14);
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
      case DebugJS.ST_ELM_INFO:
        ctx.openElmInfo(ctx);
        return true;
      case DebugJS.ST_JS:
        ctx.openJsEditor(ctx);
        return true;
      case DebugJS.ST_TOOLS:
        var kind, param;
        switch (subfnc) {
          case 'timer':
            kind = DebugJS.TOOLS_FNC_TIMER;
            if (opt == 'clock') {
              param = DebugJS.TOOL_TMR_MODE_CLOCK;
            } else if (opt == 'sw') {
              param = DebugJS.TOOL_TMR_MODE_SW;
            }
            break;
          case 'font':
            kind = DebugJS.TOOLS_FNC_FONT;
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
          case 'text':
            kind = DebugJS.TOOLS_FNC_TEXT;
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
        if (!(ctx.status & DebugJS.ST_EXT_PANEL)) ctx.openExtPanel(ctx);
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
    if (st & DebugJS.ST_ELM_INFO) ctx.closeElmInfo(ctx);
    if (st & DebugJS.ST_JS) ctx.closeJsEditor();
    if (st & DebugJS.ST_TOOLS) ctx.closeTools(ctx);
    if (st & DebugJS.ST_EXT_PANEL) ctx.closeExtPanel(ctx);
  },
  launchFnc: function(ctx, fn, subfn, opt) {
    var a = {
      measure: DebugJS.ST_MEASURE,
      sys: DebugJS.ST_SYS_INFO,
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
    var cmds;
    if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD) DebugJS.bat._resume('cmd');
    if (e.keyCode == ctx.opt.keyAssign.show.key) {
      if (DebugJS.chkKeyCmb(ctx.opt.keyAssign.show, e)) {
        if ((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) && (ctx.isOutOfWin(ctx))) {
          ctx.resetWinToOrgPos(ctx);
        } else if (ctx.uiStatus & DebugJS.UI_ST_VISIBLE) {
          ctx.closeDbgWin();
        } else {
          ctx.showDbgWin();
          if (ctx.opt.focusOnShow) ctx.focusCmdLine();
        }
      }
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
        if ((ctx.status & DebugJS.ST_SW) && DebugJS.isTmrMode()) {
          DebugJS.cmd.toggleFocus();
          break;
        } else if (ctx.status & DebugJS.ST_KIOSK) {
          if (ctx.featStack.length > 0) {
            ctx.closeTopFeature(ctx);
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
          if (ctx.cmdHistoryIdx < cmds.length) ctx.cmdHistoryIdx++;
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

      case 118: // F7
        if (e.shiftKey && DebugJS.cmd.hasFocus()) {
          if (ctx.$m != undefined) DebugJS.insertText(ctx.cmdLine, ctx.$m + '');
        }
        break;
    }
    if ((ctx.status & DebugJS.ST_TOOLS) && (ctx.toolsActvFnc & DebugJS.TOOLS_FNC_TIMER)) {
      ctx.handleTimerKey(ctx, e);
    }
  },
  onKeyDown: function(e) {
    var ctx = DebugJS.ctx;
    if (ctx.opt.useDeviceInfo) ctx.updateStatusInfoOnKeyDown(ctx, e);
    if (ctx.uiStatus & DebugJS.UI_ST_PROTECTED) ctx.procOnProtectedD(ctx, e);
  },
  onKeyPress: function(e) {
    var ctx = DebugJS.ctx;
    if (ctx.opt.useDeviceInfo) ctx.updateStatusInfoOnKeyPress(ctx, e);
    if (ctx.uiStatus & DebugJS.UI_ST_PROTECTED) ctx.procOnProtectedP(ctx, e);
  },
  onKeyUp: function(e) {
    var ctx = DebugJS.ctx;
    if (ctx.opt.useDeviceInfo) ctx.updateStatusInfoOnKeyUp(ctx, e);
    if (e.keyCode == 18) ctx.enableDraggable(ctx);
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
    if (DebugJS.isTypographic(ch)) ctx.unlockCode += ch;
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
      ctx.updateSysInfoScrollPosLabel(ctx.id);
    }
    ctx.resizeMainHeight();
  },

  updateSysInfoScrollPosLabel: function(id) {
    DebugJS.writeHTML(id + '-sys-scroll-x', DebugJS.setStyleIfObjNA(window.scrollX));
    DebugJS.writeHTML(id + '-sys-scroll-y', DebugJS.setStyleIfObjNA(window.scrollY));
    DebugJS.writeHTML(id + '-sys-pgoffset-x', window.pageXOffset);
    DebugJS.writeHTML(id + '-sys-pgoffset-y', window.pageYOffset);
    DebugJS.writeHTML(id + '-sys-cli-scroll-x', document.documentElement.scrollLeft);
    DebugJS.writeHTML(id + '-sys-cli-scroll-y', document.documentElement.scrollTop);
  },

  onMouseDown: function(e) {
    var ctx = DebugJS.ctx;
    var posX = e.clientX;
    var posY = e.clientY;
    switch (e.button) {
      case 0:
        ctx.mouseClick[0] = DebugJS.COLOR_ACTIVE;
        if (ctx.status & DebugJS.ST_MEASURE) ctx.startMeasure(ctx, posX, posY);
        if (ctx.status & DebugJS.ST_STOPWATCH_LAPTIME) {
          DebugJS._log('<span style="color:' + ctx.opt.timerColor + '">' + DebugJS.getTmrStr(DebugJS.time.getCount(DebugJS.TMR_NM_SW_S)) + '</span>');
          ctx.resetStopwatch();
        }
        if (ctx.status & DebugJS.ST_BAT_PAUSE_CMD) DebugJS.bat._resume('cmd');
        break;
      case 1:
        ctx.mouseClick[1] = DebugJS.COLOR_ACTIVE;
        break;
      case 2:
        ctx.mouseClick[2] = DebugJS.COLOR_ACTIVE;
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
    if (ctx.opt.useDeviceInfo) ctx.updateMouseClickLabel();
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
        ctx.mouseClick[0] = DebugJS.COLOR_INACT;
        ctx._onPointerUp(ctx, e);
        break;
      case 1:
        ctx.mouseClick[1] = DebugJS.COLOR_INACT;
        break;
      case 2:
        ctx.mouseClick[2] = DebugJS.COLOR_INACT;
    }
    if (ctx.opt.useDeviceInfo) ctx.updateMouseClickLabel();
  },
  onTouchEnd: function(e) {
    DebugJS.ctx._onPointerUp(DebugJS.ctx, e);
  },
  _onPointerUp: function(ctx, e) {
    var el = e.target;
    if (ctx.status & DebugJS.ST_MEASURING) ctx.stopMeasure(ctx);
    if (ctx.uiStatus & DebugJS.UI_ST_DRAGGING) {
      ctx.endMove(ctx);
      if ((el != ctx.extActivePanel) && (!DebugJS.isDescendant(el, ctx.extActivePanel))) {
        if ((Date.now() - ctx.ptOpTm) < 300) ctx.focusCmdLine();
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
    ctx.updateWinCtrlBtns();
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
    var cx = (clW / 2) - (sp.w / 2);
    var dx = Math.abs(sp.x1 - cx);
    if (dx <= 4) {
      l = (clW / 2) - (DebugJS.DBGWIN_EXPAND_W / 2);
    } else if (sp.x1 - 1 > (clW - sp.x2)) {
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
    ctx.updateWinCtrlBtns();
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
    ctx.setDbgWinPos(0, 0);
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
    var clW = document.documentElement.clientWidth;
    var clH = document.documentElement.clientHeight;
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
      var cx = (clW / 2) - (sp.w / 2);
      var dx = Math.abs(sp.x1 - cx);
      if ((dx > 4) &&
          (((Math.abs(sp.x1 - l) > thold) && (Math.abs(sp.x2 - orgX2) > thold)) ||
           ((Math.abs(sp.y1 - t) > thold) && (Math.abs(sp.y2 - orgY2) > thold)))) {
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
          if ((t > clH) || (t + h > clH)) t = clH - h;
          t -= 6;
        }
        if (mL > mR) {
          l = sp.x2 - w;
          if ((l > clW) || (l + w > clW)) l = clW - w;
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
    if (ctx.uiStatus & DebugJS.UI_ST_POS_AUTO_ADJ) ctx.adjustDbgWinPos(ctx);
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
    ctx.updateWinCtrlBtns();
  },

  isOutOfWin: function(ctx) {
    var sp = ctx.getSelfSizePos();
    if ((sp.x1 > document.documentElement.clientWidth) || (sp.y1 > document.documentElement.clientHeight) || (sp.x2 < 0) || (sp.y2 < 0)) {
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
    if ((ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) && ctx.isOutOfWin(ctx)) ctx.uiStatus |= DebugJS.UI_ST_POS_AUTO_ADJ;
    if (ctx.uiStatus & DebugJS.UI_ST_POS_AUTO_ADJ) {
      ctx.adjustDbgWinPos(ctx);
    } else {
      ctx.adjustWinMax(ctx);
    }
    if (ctx.uiStatus & DebugJS.UI_ST_LOG_SCROLL) ctx.scrollLogBtm(ctx);
    ctx.resizeMainHeight();
    if (ctx.uiStatus & DebugJS.UI_ST_SHOW_CLOCK) ctx.startUdtClock(ctx);
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
    if (ctx.status & DebugJS.ST_MEASURE) ctx.closeScreenMeasure(ctx);
    if (ctx.status & DebugJS.ST_ELM_INFO) ctx.closeElmInfo(ctx);
    ctx.hideDbgWin(ctx);
  },

  toggleHeaderInfo: function() {
    var f = (DebugJS.ctx.uiStatus & DebugJS.UI_ST_HEADINFO) ? false : true;
    DebugJS.ctx.showHeaderInfo(f);
  },
  showHeaderInfo: function(f) {
    var ctx = DebugJS.ctx;
    if (f) {
      ctx.uiStatus |= DebugJS.UI_ST_HEADINFO;
    } else {
      ctx.uiStatus &= ~DebugJS.UI_ST_HEADINFO;
    }
    DebugJS.ctx._showHeaderInfo(ctx);
  },
  _showHeaderInfo: function(ctx) {
    var v = (ctx.uiStatus & DebugJS.UI_ST_HEADINFO) ? 1 : 0;
    if (ctx.logHdrPanel) ctx.logHdrPanel.style.opacity = v;
    if (ctx.infoPanel) ctx.infoPanel.style.opacity = v;
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

  addOverlayPanel: function(ctx, pnl) {
    if (ctx.overlayBasePanel == null) {
      ctx.collapseLogPanel(ctx);
      ctx.overlayBasePanel = document.createElement('div');
      ctx.overlayBasePanel.className = 'dbg-overlay-base-panel';
      ctx.mainPanel.appendChild(ctx.overlayBasePanel);
    }
    ctx.overlayBasePanel.appendChild(pnl);
    ctx.overlayPanels.push(pnl);
  },
  removeOverlayPanel: function(ctx, pnl) {
    if (ctx.overlayBasePanel) {
      for (var i = 0; i < ctx.overlayPanels.length; i++) {
        if (ctx.overlayPanels[i] == pnl) {
          ctx.overlayPanels.splice(i, 1);
          ctx.overlayBasePanel.removeChild(pnl);
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

  addOverlayPanelFull: function(pnl) {
    DebugJS.ctx.mainPanel.appendChild(pnl);
  },
  removeOverlayPanelFull: function(pnl) {
    if (pnl.parentNode) DebugJS.ctx.mainPanel.removeChild(pnl);
  },

  getDbgWinElm: function(n) {
    return document.getElementById(DebugJS.ctx.id + '-' + n);
  },

  openClosePanel: function(ctx, st, oFn, cFn) {
    var f = ((ctx.status & st) ? cFn : oFn);
    f(ctx);
  },

  toggleSystemInfo: function() {
    var ctx = DebugJS.ctx;
    ctx.openClosePanel(ctx, DebugJS.ST_SYS_INFO, ctx.openSystemInfo, ctx.closeSystemInfo);
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
    var time = Date.now();
    var b = time.toString(2);
    var bin = DebugJS.formatBin(b, false, 1, b.length);
    var span = '<span style="color:' + DebugJS.ITEM_NM_COLOR + '">';
    var html = '<pre>' + span + 'SYSTEM TIME</span> : ' + DebugJS.getDateTimeStr(time, 1);
    html += '\n' + span + '         RAW</span>  Date.now() = ' + time + '\n' + span + '         BIN</span>  ' + bin + '\n</pre>';
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
    var screenSize = 'width=' + screen.width + ' x height=' + screen.height;
    var screenInfo = screenSize + ' (colorDepth=' + screen.colorDepth + ')';
    var languages = DebugJS.getLanguages(INDENT);
    var browser = DebugJS.getBrowserType();
    var jq = '<span class="dbg-na">not loaded</span>';
    var uv = jq;
    if (typeof jQuery != 'undefined') jq = 'v' + jQuery.fn.jquery;
    if (window.util && window.util.v) uv = 'v' + window.util.v;

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
          if (cntval != null) {charset = cntval[1];break;}
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
    } catch (e) {winOnerror = e;}
    var docOnclick = foldingTxt(document.onclick, 'documentOnclick', OMIT_LAST);
    var docOnmousedown = foldingTxt(document.onmousedown, 'documentOnmousedown', OMIT_LAST);
    var docOnmousemove = foldingTxt(document.onmousemove, 'documentOnmousemove', OMIT_LAST);
    var docOnmouseup = foldingTxt(document.onmousedown, 'documentOnmouseup', OMIT_LAST);
    var docOnkeydown = foldingTxt(document.onkeydown, 'documentOnkeydown', OMIT_LAST);
    var docOnkeypress = foldingTxt(document.onkeypress, 'documentOnkeypress', OMIT_LAST);
    var docOnkeyup = foldingTxt(document.onkeyup, 'documentOnkeyup', OMIT_LAST);
    var docOnselectstart = foldingTxt(document.onselectstart, 'documentOnselectstart', OMIT_LAST);
    var docOncontextmenu = foldingTxt(document.oncontextmenu, 'documentOncontextmenu', OMIT_LAST);
    var offset = (new Date()).getTimezoneOffset();
    var html = '<pre>';
    html += '              .getTimezoneOffset() = ' + offset + ' (UTC' + DebugJS.formatTZ(offset * (-1), true) + ')';
    var tznm = DebugJS.getLocalTzName();
    if (tznm) html += ' ' + tznm;
    html += '\n';
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
    html += addSysInfo('util   ', uv);
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
      html += ' <span class="dbg-btn" onclick="DebugJS.ctx.clearLocalStorage();">clear()</span>\n<span id="' + ctx.id + '-sys-ls"></span>\n';
      html += DebugJS.ctx.createStorageEditor(ctx, 0);
    } else {
      html += ' <span class="dbg-na">undefined</span>';
    }
    html += addPropSep();
    html += addSysInfoPropH('sessionStorage');
    if (DebugJS.SS_AVAILABLE) {
      html += ' <span class="dbg-btn" onclick="DebugJS.ctx.clearSessionStorage();">clear()</span>\n<span id="' + ctx.id + '-sys-ss"></span>\n';
      html += DebugJS.ctx.createStorageEditor(ctx, 1);
    } else {
      html += ' <span class="dbg-na">undefined</span>';
    }
    html += addPropSep();
    html += '\n</pre>';
    ctx.sysInfoPanelBody.innerHTML = html;
    ctx.updateCookieInfo();
    if (DebugJS.LS_AVAILABLE) ctx.updateStorageInfo(0);
    if (DebugJS.SS_AVAILABLE) ctx.updateStorageInfo(1);
  },
  updateCookieInfo: function() {
    var ctx = DebugJS.ctx;
    var ks = DebugJS.getCookieKeys();
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
    DebugJS.setVal(DebugJS.ctx.id + '-cookieval', DebugJS.getCookie(k));
  },
  setCookie: function() {
    var k = DebugJS.getVal(DebugJS.ctx.id + '-cookiekey');
    var v = DebugJS.getVal(DebugJS.ctx.id + '-cookieval');
    DebugJS.setCookie(k, v);
    DebugJS.ctx.updateCookieInfo();
  },
  delCookie: function(k) {
    DebugJS.deleteCookie(k);
    DebugJS.ctx.updateCookieInfo();
  },
  clearLocalStorage: function() {
    localStorage.clear();
    DebugJS.ctx.updateStorageInfo(0);
  },
  removeLocalStorage: function(k) {
    localStorage.removeItem(k);
    DebugJS.ctx.updateStorageInfo(0);
  },
  clearSessionStorage: function() {
    sessionStorage.clear();
    DebugJS.ctx.updateStorageInfo(1);
  },
  removeSessionStorage: function(k) {
    sessionStorage.removeItem(k);
    DebugJS.ctx.updateStorageInfo(1);
  },
  updateStorageInfo: function(type) {
    var ctx = DebugJS.ctx;
    var strg, nm, rmvFn, id;
    if (type == 0) {
      strg = localStorage;
      nm = 'localStorage';
      rmvFn = 'removeLocalStorage';
      id = 'ls';
    } else {
      strg = sessionStorage;
      nm = 'sessionStorage';
      rmvFn = 'removeSessionStorage';
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
    DebugJS.ctx.updateStorageInfo(type);
  },

  showHideByName: function(name) {
    var ctx = DebugJS.ctx;
    var btn = ctx.getDbgWinElm(name + '__button');
    var prtBdy = ctx.getDbgWinElm(name + '__prt-body');
    var body = ctx.getDbgWinElm(name + '__body');
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
    ctx.openClosePanel(ctx, DebugJS.ST_ELM_INFO, ctx.openElmInfo, ctx.closeElmInfo);
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

    ctx.elmPrevSblBtn = ctx.createElmInfoHeadBtn('<<', ctx.showPrevSblElm);
    ctx.elmPrevSblBtn.style.marginRight = '4px';
    ctx.enablePrevSblElBtn(ctx, false);

    ctx.elmPrevBtn = ctx.createElmInfoHeadBtn('<', ctx.showPrevElm);
    ctx.enablePrevElBtn(ctx, false);

    ctx.elmTitle = document.createElement('span');
    ctx.elmTitle.style.marginLeft = '4px';
    ctx.elmTitle.style.marginRight = '4px';
    DebugJS.setStyle(ctx.elmTitle, 'color', DebugJS.DOM_BTN_COLOR);
    ctx.elmTitle.innerText = 'ELEMENT INFO';
    ctx.elmInfoHdrPanel.appendChild(ctx.elmTitle);

    ctx.elmNextBtn = ctx.createElmInfoHeadBtn('>', ctx.showNextElm);
    ctx.enableNextElBtn(ctx, false);

    ctx.elmNextSblBtn = ctx.createElmInfoHeadBtn('>>', ctx.showNextSblElm);
    ctx.elmNextSblBtn.style.marginLeft = '4px';
    ctx.enableNextSblElBtn(ctx, false);

    ctx.elmParenttBtn = ctx.createElmInfoHeadBtn('PARENT', ctx.showParentElm);
    ctx.elmParenttBtn.style.marginLeft = '8px';
    ctx.elmParenttBtn.style.marginRight = '4px';

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
    if (el && el.tagName) html += ctx.getElmInfo(ctx, el);
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
        if (el.innerText != undefined) text = DebugJS.escHtml(el.innerText);
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
      if ((k.match(/^\d.*/)) || (typeof cStyle[k] == 'function')) continue;
      var indent = '';
      if (k.length < MIN_KEY_LEN) {
        for (var i = 0; i < (MIN_KEY_LEN - k.length); i++) {
          indent += ' ';
        }
      }
      allStyles += ' ' + k + indent + ': ' + cStyle[k] + '\n';
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
  showPrevElm: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.tgtEl) return;
    var el = ctx.getPrevElm(ctx, ctx.tgtEl);
    if (el) ctx._updateElmInfo(ctx, el);
  },
  showNextElm: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.tgtEl) return;
    var el = ctx.getNextElm(ctx, ctx.tgtEl);
    if (el) ctx._updateElmInfo(ctx, el);
  },
  showPrevSblElm: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.tgtEl) return;
    var el = ctx.tgtEl.previousElementSibling;
    if (el) ctx._updateElmInfo(ctx, el);
  },
  showNextSblElm: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.tgtEl) return;
    var el = ctx.tgtEl.nextElementSibling;
    if (el) ctx._updateElmInfo(ctx, el);
  },
  showParentElm: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.tgtEl || (ctx.tgtEl.tagName == 'HTML')) return;
    var el = ctx.tgtEl.parentNode;
    if (el) ctx._updateElmInfo(ctx, el);
  },
  _updateElmInfo: function(ctx, el) {
    ctx.showElementInfo(el);
    ctx.updateTargetElm(el);
  },
  getPrevElm: function(ctx, node) {
    if (!node) return null;
    var el = node.previousElementSibling;
    if (el && (el.id == ctx.id)) el = node.previousElementSibling;
    if (el) {
      if (el.childElementCount > 0) {
        var lastChild = el.lastElementChild;
        while (lastChild.childElementCount > 0) {
          lastChild = lastChild.lastElementChild;
        }
        el = lastChild;
      }
    } else {
      el = node.parentNode;
    }
    if (el instanceof HTMLDocument) el = null;
    return el;
  },
  getNextElm: function(ctx, node) {
    if (!node) return null;
    var el = node.firstElementChild;
    if (!el || (el && (el.id == ctx.id))) {
      el = node.nextElementSibling;
      if (el == null) {
        var parent = node.parentNode;
        if (parent) {
          do {
            el = parent.nextElementSibling;
            if (el && (el.id != ctx.id)) break;
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
      ctx.enablePrevSblElBtn(ctx, (el.previousElementSibling ? true : false));
      ctx.enableNextSblElBtn(ctx, (el.nextElementSibling ? true : false));
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
    ctx.enableElBtn(ctx, ctx.elmPrevBtn, f);
  },
  enableNextElBtn: function(ctx, f) {
    ctx.enableElBtn(ctx, ctx.elmNextBtn, f);
  },
  enablePrevSblElBtn: function(ctx, f) {
    ctx.enableElBtn(ctx, ctx.elmPrevSblBtn, f);
  },
  enableNextSblElBtn: function(ctx, f) {
    ctx.enableElBtn(ctx, ctx.elmNextSblBtn, f);
  },
  enableElBtn: function(ctx, b, f) {
    DebugJS.setStyle(b, 'color', (f ? ctx.opt.btnColor : DebugJS.COLOR_INACT));
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
    if ((ctx.fontChkTargetEl) && (ctx.fontChkTargetEl.contentEditableBak)) {
      ctx.fontChkTargetEl.contentEditable = ctx.fontChkTargetEl.contentEditableBak;
    }
    ctx.fontChkTargetEl = el;
    ctx.fontChkTargetEl.contentEditableBak = el.contentEditable;
    ctx.fontChkTargetEl.contentEditable = true;
  },
  getEvtHandlerStr: function(handler, name) {
    var MAX_LEN = 300;
    var s = '';
    if (handler) {
      s = handler.toString();
      s = s.replace(/\n/g, '').replace(/[^.]{1,}\{/, '').replace(/\}$/, '').replace(/^\s{1,}/, '');
    } else {
      s = '<span style="color:#aaa">null</span>';
    }
    s = DebugJS.ctx.createFoldingText(s, name, DebugJS.OMIT_LAST, MAX_LEN, 'color:#888');
    return s;
  },

  toggleJs: function() {
    var ctx = DebugJS.ctx;
    ctx.openClosePanel(ctx, DebugJS.ST_JS, ctx.openJsEditor, ctx.closeJsEditor);
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
    DebugJS.ui.createBtnHtml('[CLR]', 'DebugJS.ctx.insertJsSnippet(-1);', 'margin-left:4px;margin-right:4px');
    for (var i = 0; i < 5; i++) {
      html += ctx.createJsSnippetBtn(ctx, i);
    }
    ctx.jsPanel.innerHTML = html;
    ctx.addOverlayPanel(ctx, ctx.jsPanel);
    var editor = document.createElement('textarea');
    editor.className = 'dbg-editor';
    editor.spellcheck = false;
    editor.onblur = ctx.saveJsBuf;
    editor.value = ctx.jsBuf;
    ctx.enableDnDFileLoad(editor, ctx.onDropOnJS);
    ctx.jsPanel.appendChild(editor);
    ctx.jsEditor = editor;
  },
  createJsSnippetBtn: function(ctx, i) {
    return DebugJS.ui.createBtnHtml('{CODE' + (i + 1) + '}', 'DebugJS.ctx.insertJsSnippet(' + i + ');', 'margin-left:4px');
  },
  insertJsSnippet: function(n) {
    var el = DebugJS.ctx.jsEditor;
    if (n < 0) {
      el.value = '';
      el.focus();
    } else {
      DebugJS.insertText(el, DebugJS.JS_SNIPPET[n]);
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
      if (typeof r == 'string') res = DebugJS.quoteStr(r);
      if (echo) DebugJS._log.res(res);
    } catch (e) {DebugJS._log.e(e);}
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
    ctx.openClosePanel(ctx, DebugJS.ST_TOOLS, ctx.openTools, ctx.closeTools);
  },
  openTools: function(ctx) {
    ctx.status |= DebugJS.ST_TOOLS;
    ctx.featStack.push(DebugJS.ST_TOOLS);
    if (!ctx.toolsPanel) ctx.createToolsPanel(ctx);
    ctx.addOverlayPanelFull(ctx.toolsPanel);
    ctx.resizeImgPreview();
    ctx.switchToolsFunction(ctx.toolsActvFnc);
    ctx.updateToolsBtns(ctx);
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
    ctx.fontChkBtn = ctx.createToolsHdrBtn('FONT', 'TOOLS_FNC_FONT', 'fontChkBtn');
    ctx.htmlPrevBtn = ctx.createToolsHdrBtn('HTML', 'TOOLS_FNC_HTML', 'htmlPrevBtn');
    ctx.fileVwrBtn = ctx.createToolsHdrBtn('FILE', 'TOOLS_FNC_FILE', 'fileVwrBtn');
    ctx.batBtn = ctx.createToolsHdrBtn('BAT', 'TOOLS_FNC_BAT', 'batBtn');
    ctx.txtBtn = ctx.createToolsHdrBtn('TEXT', 'TOOLS_FNC_TEXT', 'txtBtn');
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
  updateToolsBtns: function(ctx) {
    var setStyle = DebugJS.setStyle;
    var f = ctx.toolsActvFnc;
    setStyle(ctx.timerBtn, 'color', (f & DebugJS.TOOLS_FNC_TIMER) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACT);
    setStyle(ctx.fontChkBtn, 'color', (f & DebugJS.TOOLS_FNC_FONT) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACT);
    setStyle(ctx.htmlPrevBtn, 'color', (f & DebugJS.TOOLS_FNC_HTML) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACT);
    setStyle(ctx.fileVwrBtn, 'color', (f & DebugJS.TOOLS_FNC_FILE) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACT);
    setStyle(ctx.batBtn, 'color', (f & DebugJS.TOOLS_FNC_BAT) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACT);
    setStyle(ctx.txtBtn, 'color', (f & DebugJS.TOOLS_FNC_TEXT) ? DebugJS.SBPNL_COLOR_ACTIVE : DebugJS.SBPNL_COLOR_INACT);
  },
  switchToolsFunction: function(kind, param) {
    var ctx = DebugJS.ctx;
    if (kind & DebugJS.TOOLS_FNC_TIMER) {
      ctx.openTimer(param);
    } else {
      ctx.closeTimer();
    }
    if (kind & DebugJS.TOOLS_FNC_FONT) {
      ctx.openFontChecker();
    } else {
      ctx.closeFontChecker();
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
    if (kind & DebugJS.TOOLS_FNC_TEXT) {
      ctx.openTxtEditor();
    } else {
      ctx.closeTxtEditor();
    }
    if (kind) ctx.toolsActvFnc = kind;
    ctx.updateToolsBtns(ctx);
  },
  removeToolFuncPanel: function(ctx, pnl) {
    if (pnl.parentNode) ctx.toolsBodyPanel.removeChild(pnl);
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
        case DebugJS.TOOL_TMR_MODE_SW:
          ctx.updateTimerStopwatch();
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
    ctx.createTimerStopwatchSubPanel(ctx);
    ctx.createTimerStopwatchInpSubPanel(ctx);
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
    ctx.clockSSSbtn = ctx.createTimerBtn(btns, 'ms', ctx.toggleSSS, false, (fontSize * 1.5));
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
  createTimerStopwatchSubPanel: function(ctx) {
    var handlers = {
      reset: ctx.resetTimerStopwatch,
      startStop: ctx.startStopTimerStopwatch,
      split: ctx.splitTimerStopwatch
    };
    var pnl = ctx._createTimerStopwatchSubPanel(ctx, handlers);
    ctx.timerSwSubPanel = pnl.basePanel;
    ctx.timerSwLabel = pnl.stopWatchLabel;
    ctx.timerStartStopBtn = pnl.startStopBtn;
    ctx.timerSplitBtn = pnl.splitBtn;
    ctx.timerCntTplsBtn1 = ctx.createTimerBtn(pnl.btns, 'T+', ctx.toggleContinueTplus, false, (ctx.computedFontSize * 1.5));
    ctx.updateContinueTplusBtn(ctx);
  },
  _createTimerStopwatchSubPanel: function(ctx, handlers) {
    var pnl = {basePanel: null, stopWatchLabel: null, btns: null, startStopBtn: null, splitBtn: null};
    var fontSize = ctx.computedFontSize;
    var btnFontSize = fontSize * 3;
    pnl.basePanel = document.createElement('div');

    var marginT = 40 * ctx.zoom;
    var marginB = 40 * ctx.zoom;
    pnl.stopWatchLabel = document.createElement('div');
    pnl.stopWatchLabel.style.margin = marginT + 'px 0 ' + marginB + 'px 0';
    pnl.stopWatchLabel.style.whiteSpace = 'nowrap';
    pnl.basePanel.appendChild(pnl.stopWatchLabel);

    var btns = document.createElement('div');
    btns.style.borderTop = 'solid 2px ' + ctx.opt.timerLineColor;
    btns.style.paddingTop = fontSize + 'px';
    btns.style.lineHeight = btnFontSize + 'px';
    pnl.basePanel.appendChild(btns);

    ctx.createTimerBtn(btns, 'MODE', ctx.toggleTimerMode, false, btnFontSize);
    ctx.createTimerBtn(btns, 'RESET', handlers.reset, false, btnFontSize);
    pnl.startStopBtn = ctx.createTimerBtn(btns, '>>', handlers.startStop, false, btnFontSize);
    pnl.splitBtn = ctx.createTimerBtn(btns, 'SPLIT', handlers.split, false, btnFontSize);

    pnl.btns = btns;
    return pnl;
  },
  createTimerStopwatchInpSubPanel: function(ctx) {
    var fontSize = ctx.computedFontSize;
    var baseFontSize = fontSize * 7;
    var btnFontSize = fontSize * 3;
    var msFontSize = baseFontSize * 0.65;
    var basePanel = document.createElement('div');
    var udBtnPdng = btnFontSize * 2.2 + 'px';

    var timerUpBtns = document.createElement('div');
    timerUpBtns.style.margin = '0 0 -' + fontSize * 0.8 + 'px 0';
    timerUpBtns.style.paddingLeft = udBtnPdng;
    timerUpBtns.style.lineHeight = btnFontSize + 'px';
    basePanel.appendChild(timerUpBtns);
    ctx.createTimerUpDwnBtn(true, 'hh', timerUpBtns, btnFontSize, 1.5, 2.5);
    ctx.createTimerUpDwnBtn(true, 'mi', timerUpBtns, btnFontSize, 0.5, 3);
    ctx.createTimerUpDwnBtn(true, 'ss', timerUpBtns, btnFontSize, 0.5, 3);
    ctx.createTimerUpDwnBtn(true, 'sss', timerUpBtns, btnFontSize, 0, 1);

    ctx.timerSwInputDiv = document.createElement('div');
    ctx.timerSwInputDiv.style.margin = '0';
    ctx.timerSwInputDiv.style.lineHeight = baseFontSize + 'px';
    basePanel.appendChild(ctx.timerSwInputDiv);

    var initTmrVal = DebugJS.timerstr2struct(ctx.props.timer);
    var tpm = 'T+';
    ctx.timerSign = false;
    if (initTmrVal.sign) {
      tpm = 'T-';
      ctx.timerSign = true;
    }
    ctx.btnTPM = ctx.createTimerBtn(ctx.timerSwInputDiv, tpm, ctx.togglePlusMinus, false, baseFontSize * 0.9);
    ctx.btnTPM.style.marginRight = '5px';

    ctx.timerTxtHH = ctx.createTimerInput(ctx.timerSwInputDiv, initTmrVal.hh, baseFontSize);
    ctx.createTimerInputLabel(ctx.timerSwInputDiv, ':', baseFontSize);
    ctx.timerTxtMI = ctx.createTimerInput(ctx.timerSwInputDiv, initTmrVal.mi, baseFontSize);
    ctx.createTimerInputLabel(ctx.timerSwInputDiv, ':', baseFontSize);
    ctx.timerTxtSS = ctx.createTimerInput(ctx.timerSwInputDiv, initTmrVal.ss, baseFontSize);
    ctx.createTimerInputLabel(ctx.timerSwInputDiv, '.', msFontSize);
    ctx.timerTxtSSS = ctx.createTimerInput(ctx.timerSwInputDiv, initTmrVal.sss, msFontSize, '1.7em');

    var timerDwnBtns = document.createElement('div');
    var marginT = fontSize * 2;
    var marginB = fontSize * 0.5;
    timerDwnBtns.style.margin = '-' + marginT + 'px 0 ' + marginB + 'px 0';
    timerDwnBtns.style.paddingLeft = udBtnPdng;
    timerDwnBtns.style.lineHeight = btnFontSize + 'px';
    ctx.createTimerUpDwnBtn(false, 'hh', timerDwnBtns, btnFontSize, 1.5, 2.5);
    ctx.createTimerUpDwnBtn(false, 'mi', timerDwnBtns, btnFontSize, 0.5, 3);
    ctx.createTimerUpDwnBtn(false, 'ss', timerDwnBtns, btnFontSize, 0.5, 3);
    ctx.createTimerUpDwnBtn(false, 'sss', timerDwnBtns, btnFontSize, 0, 1);
    basePanel.appendChild(timerDwnBtns);

    var btns = document.createElement('div');
    btns.style.borderTop = 'solid 2px ' + ctx.opt.timerLineColor;
    btns.style.paddingTop = fontSize + 'px';
    btns.style.lineHeight = btnFontSize + 'px';
    ctx.createTimerBtn(btns, 'MODE', ctx.toggleTimerMode, false, btnFontSize);
    ctx.createTimerBtn(btns, 'RESET', ctx.resetTimerStopwatch, false, btnFontSize);
    ctx.timerStartStopBtnInp = ctx.createTimerBtn(btns, '>>', ctx.startStopTimerStopwatch, false, btnFontSize);
    ctx.createTimerBtn(btns, 'SPLIT', null, true, btnFontSize);
    ctx.timerCntTplsBtn2 = ctx.createTimerBtn(btns, 'T+', ctx.toggleContinueTplus, false, fontSize * 1.5);
    basePanel.appendChild(btns);

    ctx.timerSwInpSubPanel = basePanel;
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
    return el;
  },
  createTimerBtn: function(base, label, handler, disabled, fontSize) {
    var btn = DebugJS.ui.addBtn(base, label, handler);
    btn.style.marginRight = '0.5em';
    DebugJS.setStyle(btn, 'color', (disabled ? '#888' : DebugJS.TOOL_TMR_BTN_COLOR));
    if (fontSize) DebugJS.setStyle(btn, 'font-size', fontSize + 'px');
    return btn;
  },
  createTimerUpDwnBtn: function(up, part, area, fontSize, marginL, marginR) {
    var lbl = (up ? '+' : '-');
    var fn = new Function('DebugJS.ctx.timerUpDwn(\'' + part + '\', ' + up + ')');
    var btn = DebugJS.ui.addBtn(area, lbl, fn);
    if (marginL) btn.style.marginLeft = marginL + 'em';
    btn.style.marginRight = marginR + 'em';
    DebugJS.setStyle(btn, 'color', DebugJS.TOOL_TMR_BTN_COLOR);
    DebugJS.setStyle(btn, 'font-size', fontSize + 'px');
    return btn;
  },
  togglePlusMinus: function() {
    var ctx = DebugJS.ctx;
    ctx.timerSign = ctx.timerSign ? false : true;
    ctx.updatePlusMinusBtn(ctx);
  },
  updatePlusMinusBtn: function(ctx) {
    ctx.btnTPM.innerText = (ctx.timerSign ? 'T-' : 'T+');
  },
  timerUpDwn: function(part, up) {
    var ctx = DebugJS.ctx;
    var val = ctx.calcTimerInitVal(ctx);
    var ms = {'hh': 3600000, 'mi': 60000, 'ss': 1000, 'sss': 1};
    var v = (ms[part] === undefined ? 0 : ms[part]);
    if (up) {
      val += v;
    } else {
      val -= v;
    }
    ctx.timerSign = (val <= 0);
    ctx.updatePlusMinusBtn(ctx);
    ctx.updateTimerInitValInp(val);
    ctx.drawStopwatch();
  },
  updatePropTimer: function() {
    var ctx = DebugJS.ctx;
    var sn = ctx.timerSign ? '-' : '+';
    ctx.props.timer = sn + ctx.timerTxtHH.value + ':' + ctx.timerTxtMI.value + ':' + ctx.timerTxtSS.value + '.' + ctx.timerTxtSSS.value;
  },
  calcTimerInitVal: function(ctx) {
    var h = (ctx.timerTxtHH.value | 0) * 3600000;
    var m = (ctx.timerTxtMI.value | 0) * 60000;
    var s = (ctx.timerTxtSS.value | 0) * 1000;
    var ms = (ctx.timerTxtSSS.value | 0);
    var v = h + m + s + ms;
    if (ctx.timerSign) v *= -1;
    return v;
  },
  updateTimerInitValInp: function(v) {
    var ctx = DebugJS.ctx;
    var tm = DebugJS.ms2struct(v, true);
    ctx.timerTxtHH.value = tm.hh;
    ctx.timerTxtMI.value = tm.mi;
    ctx.timerTxtSS.value = tm.ss;
    ctx.timerTxtSSS.value = tm.sss;
    ctx.updatePropTimer();
  },
  toggleTimerMode: function(e, rv) {
    var a = [DebugJS.TOOL_TMR_MODE_CLOCK, DebugJS.TOOL_TMR_MODE_SW];
    var f = rv ? DebugJS.arr.prev : DebugJS.arr.next;
    var nextMode = f(a, DebugJS.ctx.toolTimerMode);
    DebugJS.ctx.switchTimerMode(nextMode);
  },
  switchTimerMode: function(mode) {
    if (mode == DebugJS.TOOL_TMR_MODE_SW) {
      DebugJS.ctx.switchTimerModeToStopwatch();
    } else {
      DebugJS.ctx.switchTimerModeToClock();
    }
  },
  switchTimerModeToClock: function() {
    var ctx = DebugJS.ctx;
    ctx.replaceTimerSubPanel(ctx.timerClockSubPanel);
    ctx.toolTimerMode = DebugJS.TOOL_TMR_MODE_CLOCK;
    ctx.updateTimerClock();
  },
  switchTimerModeToStopwatch: function() {
    var ctx = DebugJS.ctx;
    ctx.toolTimerMode = DebugJS.TOOL_TMR_MODE_SW;
    if ((ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING) ||
        (ctx.toolStatus & DebugJS.TOOL_ST_SW_PAUSED) ||
        (ctx.toolStatus & DebugJS.TOOL_ST_SW_END)) {
      ctx.replaceTimerSubPanel(ctx.timerSwSubPanel);
      ctx.drawStopwatch();
      ctx.updateTimerStopwatch();
    } else {
      ctx.replaceTimerSubPanel(ctx.timerSwInpSubPanel);
    }
    ctx.updateTimerSwBtns();
  },
  replaceTimerSubPanel: function(pnl) {
    var ctx = DebugJS.ctx;
    for (var i = ctx.timerBasePanel.childNodes.length - 1; i >= 0; i--) {
      ctx.timerBasePanel.removeChild(ctx.timerBasePanel.childNodes[i]);
    }
    ctx.timerBasePanel.appendChild(pnl);
  },
  updateTimerClock: function() {
    var ctx = DebugJS.ctx;
    if ((!(ctx.status & DebugJS.ST_TOOLS)) || (ctx.toolTimerMode != DebugJS.TOOL_TMR_MODE_CLOCK)) return;
    var tm = DebugJS.getClockVal();
    ctx.timerClockLabel.innerHTML = ctx.createClockStr(ctx, tm);
    setTimeout(ctx.updateTimerClock, ctx.clockUpdInt);
  },
  createClockStr: function(ctx, tm) {
    var fontSize = ctx.computedFontSize * 8;
    var dtFontSize = fontSize * 0.45;
    var ssFontSize = fontSize * 0.65;
    var msFontSize = fontSize * 0.45;
    var marginT = 20 * ctx.zoom;
    var marginB = 20 * ctx.zoom;
    var dot = '.';
    if (tm.sss > 500) dot = '&nbsp;';
    var date = tm.yyyy + '-' + tm.mm + '-' + tm.dd + ' <span style="color:#' + DebugJS.WDAYS_COLOR[tm.wday] + ' !important;font-size:' + dtFontSize + 'px !important">' + DebugJS.WDAYS[tm.wday] + '</span>';
    var time = tm.hh + ':' + tm.mi + '<span style="margin-left:' + (ssFontSize / 5) + 'px;color:' + ctx.opt.fontColor + ' !important;font-size:' + ssFontSize + 'px !important">' + tm.ss + dot + '</span>';
    if (ctx.timerClockSSS) {
      time += '<span style="font-size:' + msFontSize + 'px !important">' + tm.sss + '</span>';
      marginB -= 26 * ctx.zoom;
    }
    var s = '<div style="color:' + ctx.opt.fontColor + ' !important;font-size:' + dtFontSize + 'px !important">' + date + '</div>' +
    '<div style="color:' + ctx.opt.fontColor + ' !important;font-size:' + fontSize + 'px !important;margin:-' + marginT + 'px 0 ' + marginB + 'px 0">' + time + '</div>';
    return s;
  },
  startStopTimerStopwatch: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING) {
      ctx.stopTimerStopwatch();
    } else {
      ctx.startTimerStopwatch();
    }
  },
  toggleContinueTplus: function() {
    DebugJS.ctx.setContinueTplus(DebugJS.ctx, DebugJS.ctx.timerContinueTplus ? false : true);
  },
  setContinueTplus: function(ctx, f) {
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_TPLUS) return;
    ctx.timerContinueTplus = f;
    ctx.updateContinueTplusBtn(ctx);
  },
  updateContinueTplusBtn: function(ctx) {
    var color = DebugJS.TOOL_TMR_BTN_COLOR;
    if (ctx.timerContinueTplus) {
      if (ctx.toolStatus & DebugJS.TOOL_ST_SW_TPLUS) color = '#888';
    } else {
      color = '#888';
    }
    if (ctx.timerCntTplsBtn1) DebugJS.setStyle(ctx.timerCntTplsBtn1, 'color', color);
    if (ctx.timerCntTplsBtn2) DebugJS.setStyle(ctx.timerCntTplsBtn2, 'color', color);
  },
  startTimerStopwatch: function() {
    var now = Date.now();
    var ctx = DebugJS.ctx;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING) return;
    var timerV;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_END) ctx.resetTimerStopwatch();
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_PAUSED) {
      ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_PAUSED;
      timerV = ctx.timerSwVal;
    } else {
      timerV = ctx.calcTimerInitVal(ctx);
      ctx.timerStartedV = timerV;
      ctx.timerSwPrevSplit = timerV;
      if (ctx.timerT0) ctx.timerSwPrevSplit = now - ctx.timerSwT0;
      if (timerV > 0) ctx.timerContinueTplus = true;
      ctx.replaceTimerSubPanel(ctx.timerSwSubPanel);
    }
    if (ctx.timerT0) {
      ctx.timerT0 = 0;
    } else {
      ctx.timerSwT0 = now - timerV;
    }
    ctx.toolStatus |= DebugJS.TOOL_ST_SW_RUNNING;
    DebugJS.callEvtListeners('stopwatch', 1, 'start', timerV);
    ctx.updateTimerStopwatch();
    ctx.updateTimerSwBtns();
  },
  stopTimerStopwatch: function() {
    var ctx = DebugJS.ctx;
    ctx.updateTimerStopwatch();
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_RUNNING;
    ctx.toolStatus |= DebugJS.TOOL_ST_SW_PAUSED;
    if (ctx.status & DebugJS.ST_TOOLS) ctx.drawStopwatch();
    ctx.updateTimerSwBtns();
    DebugJS.callEvtListeners('stopwatch', 1, 'stop', ctx.timerSwVal);
  },
  splitTimerStopwatch: function() {
    var ctx = DebugJS.ctx;
    if (ctx.timerSplitF) ctx._splitTimerStopwatch(ctx);
    if (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING)) {
      ctx.timerSplitF = false;
      if (ctx.status & DebugJS.ST_TOOLS) ctx.updateTimerLapBtn();
    }
  },
  _splitTimerStopwatch: function(ctx) {
    ctx._updateTimerStopwatch(ctx);
    var t = ctx.timerSwVal;
    var dt = DebugJS.getDiffTimeStr(ctx.timerSwPrevSplit, t).substr(2);
    var m = DebugJS.TMR_NM_SW_L + ': <span style="color:' + ctx.opt.timerColor + '">' + DebugJS.getTmrStr(ctx.timerSwVal) + '</span> (' + DebugJS.CHR_DELTA + '<span style="color:' + ctx.opt.timerColor + '">' + dt + '</span>)';
    ctx.timerSwPrevSplit = t;
    DebugJS._log(m);
  },
  endTimerStopwatch: function(ctx) {
    ctx._endTimerStopwatch(ctx);
    ctx.updateTimerStopwatch();
  },
  _endTimerStopwatch: function(ctx) {
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_RUNNING;
    ctx.toolStatus |= DebugJS.TOOL_ST_SW_END;
    ctx.updateTimerSwBtns();
  },
  resetTimerStopwatch: function() {
    var ctx = DebugJS.ctx;
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_PAUSED;
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_TPLUS;
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_END;
    ctx.timerT0 = 0;
    var timerV = ctx.calcTimerInitVal(ctx);
    ctx.timerSwT0 = Date.now() - timerV;
    ctx.timerSwVal = timerV;
    ctx.timerSwPrevSplit = timerV;
    ctx.timerSplitF = false;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING) {
      ctx.updateTimerStopwatch();
    } else {
      ctx.replaceTimerSubPanel(ctx.timerSwInpSubPanel);
    }
    ctx.updateTimerSwBtns();
    DebugJS.callEvtListeners('stopwatch', 1, 'reset');
  },
  setTimerStopwatchVal: function(ctx, v) {
    if (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING)) ctx.toolStatus |= DebugJS.TOOL_ST_SW_PAUSED;
    var now = Date.now();
    ctx.timerSwT0 = now - v;
    ctx.timerSwVal = now - ctx.timerSwT0;
    ctx._updateTimerStopwatch(ctx);
    if (ctx.status & DebugJS.ST_TOOLS) {
      ctx.replaceTimerSubPanel(ctx.timerSwSubPanel);
      ctx.drawStopwatch();
    }
  },
  updateTimerStopwatch: function() {
    var ctx = DebugJS.ctx;
    if ((!(ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING)) &&
        (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_END))) return;
    var v = ctx._updateTimerStopwatch(ctx);
    if (ctx.status & DebugJS.ST_TOOLS) {
      ctx.drawStopwatch();
      ctx.nextSwIntvl(ctx);
    } else if (v < 0) {
      ctx.nextSwIntvl(ctx);
    }
  },
  _updateTimerStopwatch: function(ctx) {
    var t = ctx.timerSwVal;
    if (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING)) return t;
    if (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_END)) {
      t = Date.now() - ctx.timerSwT0;
    }
    if (t >= 0) {
      if (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_TPLUS)) {
        ctx.toolStatus |= DebugJS.TOOL_ST_SW_TPLUS;
        if (!ctx.timerContinueTplus || (ctx.timerContinueTplus && (ctx.timerStartedV < 0))) DebugJS.callEvtListeners('stopwatch', 1, 'timesup');
        ctx.updateContinueTplusBtn(ctx);
        if (!ctx.timerContinueTplus) {
          ctx._endTimerStopwatch(ctx);
          t = 0;
        }
      }
    }
    ctx.timerSwVal = t;
    return t;
  },
  nextSwIntvl: function(ctx) {
    setTimeout(ctx.updateTimerStopwatch, DebugJS.UPDATE_INTERVAL_H);
  },
  drawStopwatch: function() {
    var tm = DebugJS.ms2struct(DebugJS.ctx.timerSwVal, true);
    DebugJS.ctx.timerSwLabel.innerHTML = DebugJS.ctx.buildTmrStr(tm);
  },
  updateTimerSwBtns: function() {
    var ctx = DebugJS.ctx;
    if (!(ctx.status & DebugJS.ST_TOOLS)) return;
    var btn = '>>';
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING) {
      btn = '||';
      ctx.timerSplitF = true;
    }
    ctx.timerStartStopBtn.innerText = btn;
    ctx.timerStartStopBtnInp.innerText = btn;
    ctx.updateTimerLapBtn();
    ctx.updateContinueTplusBtn(ctx);
  },
  updateTimerLapBtn: function() {
    var ctx = DebugJS.ctx;
    var color = '#888';
    var fn = null;
    if (ctx.timerSplitF) {
      color = DebugJS.TOOL_TMR_BTN_COLOR;
      fn = ctx.splitTimerStopwatch;
    }
    DebugJS.setStyle(ctx.timerSplitBtn, 'color', color);
    ctx.timerSplitBtn.onclick = fn;
  },
  buildTmrStr: function(tm) {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize * 7;
    var msFontSize = fontSize * 0.65;
    var color = ctx.opt.fontColor;
    var str;
    var pfxStyle = '"font-size:' + fontSize * 0.9 + 'px !important;margin-right:' + fontSize * 0.1 + 'px;"';
    var pfx = 'T-';
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_END) {
      var now = DebugJS.getDateTime();
      if (now.sss > 500) {
        str = '&nbsp;<span style="font-size:' + msFontSize + 'px !important">' + '&nbsp;</span>';
      } else {
        str = '<span style=' + pfxStyle + '>' + pfx + '</span>';
        if (tm.d) str += '<span style="margin-right:10px;font-size:' + fontSize + 'px !important">' + tm.d + 'd</span>';
        str += tm.hr + ':' + tm.mi + ':' + tm.ss + '<span style="color:' + color + ' !important;font-size:' + msFontSize + 'px !important">.' + tm.sss + '</span>';
      }
    } else {
      var dot;
      var styleS = '';
      var styleE = '';
      if (tm.sign) {
        dot = (((ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING) && (tm.sss < 500)) ? '&nbsp;' : '.');
      } else {
        pfx = 'T+';
        dot = (((ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING) && (tm.sss > 500)) ? '&nbsp;' : '.');
        styleS = '<span style="color:' + color + ' !important;font-size:' + fontSize + 'px !important">';
        styleE = '</span>';
      }
      str = '<span style=' + pfxStyle + '>' + pfx + '</span>' + styleS;
      if (tm.d) str += '<span style="margin-right:10px;font-size:' + fontSize + 'px !important">' + tm.d + 'd</span>';
      str += tm.hr + ':' + tm.mi + ':' + tm.ss + '<span style="color:' + color + ' !important;font-size:' + msFontSize + 'px !important">' + dot + tm.sss + '</span>' + styleE;
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
  handleTimerKey: function(ctx, e) {
    if ((ctx.sizeStatus != DebugJS.SIZE_ST_FULL_WH) || DebugJS.cmd.hasFocus()) return;
    if ((e.keyCode == 13) || (e.keyCode == 32)) {
      if (ctx.toolTimerMode == DebugJS.TOOL_TMR_MODE_SW) {
        ctx.startStopTimerStopwatch();
      }
    } else if (e.keyCode == 8) {
      if (!DebugJS.isFocusInput()) {
        if (ctx.toolTimerMode == DebugJS.TOOL_TMR_MODE_SW) {
          ctx.resetTimerStopwatch();
        }
        e.preventDefault();
      }
    } else if (e.keyCode == 9) {
      if (!DebugJS.isFocusInput()) {
        ctx.toggleTimerMode(null, e.shiftKey);
        e.preventDefault();
      }
    } else if (e.keyCode == 16) {
      if (ctx.toolTimerMode == DebugJS.TOOL_TMR_MODE_SW) ctx.splitTimerStopwatch();
    } else if (e.keyCode == 83) {
      if (ctx.toolTimerMode == DebugJS.TOOL_TMR_MODE_CLOCK) ctx.toggleSSS();
    } else if (e.keyCode == 84) {
      if (ctx.toolTimerMode == DebugJS.TOOL_TMR_MODE_SW) {
        if (!DebugJS.isFocusInput()) ctx.toggleContinueTplus();
      }
    }
  },

  openFontChecker: function() {
    var ctx = DebugJS.ctx;
    if (ctx.fontChkPanel) {
      ctx.toolsBodyPanel.appendChild(ctx.fontChkPanel);
    } else {
      ctx.createTxtChkPanel(ctx);
    }
  },
  createTxtChkPanel: function(ctx) {
    var dfltFontSize = ctx.computedFontSize;
    var dfltFontFamily = 'Consolas';
    var dfltFontWeight = 400;
    var dfltFgRGB16 = 'fff';
    var dfltBgRGB16 = '000';
    var panelPdng = 2;
    ctx.fontChkPanel = DebugJS.addSubPanel(ctx.toolsBodyPanel);
    var txtPdng = 4;

    var style = {
      'width': 'calc(100% - ' + ((txtPdng + panelPdng) * 2) + 'px)',
      'min-height': (20 * ctx.zoom) + 'px',
      'margin-bottom': '8px',
      'padding': txtPdng + 'px',
      'border': '0',
      'border-radius': '0',
      'outline': 'none',
      'font-size': dfltFontSize + 'px',
      'font-family': dfltFontFamily
    };
    ctx.fontChkTxt = DebugJS.ui.addElement(ctx.fontChkPanel, 'input', style);
    ctx.fontChkTxt.value = 'ABCDEFG.abcdefg 12345-67890_!?';
    ctx.fontChkTxt.spellcheck = false;
    ctx.fontChkTargetEl = ctx.fontChkTxt;

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
    ctx.fontChkCtrl = DebugJS.ui.addElement(ctx.fontChkPanel, 'div');
    ctx.fontChkCtrl.innerHTML = html;

    ctx.fontChkFontSizeRange = ctx.getDbgWinElm('fontsize-range');
    ctx.fontChkFontSizeInput = ctx.getDbgWinElm('font-size');
    ctx.fontChkFontSizeUnitInput = ctx.getDbgWinElm('font-size-unit');
    ctx.fontChkFontWeightRange = ctx.getDbgWinElm('fontweight-range');
    ctx.fontChkFontWeightLabel = ctx.getDbgWinElm('font-weight');
    ctx.fontChkInputFgRGB = ctx.getDbgWinElm('fg-rgb');
    ctx.fontChkRangeFgR = ctx.getDbgWinElm('fg-range-r');
    ctx.fontChkRangeFgG = ctx.getDbgWinElm('fg-range-g');
    ctx.fontChkRangeFgB = ctx.getDbgWinElm('fg-range-b');
    ctx.fontChkLabelFgR = ctx.getDbgWinElm('fg-r');
    ctx.fontChkLabelFgG = ctx.getDbgWinElm('fg-g');
    ctx.fontChkLabelFgB = ctx.getDbgWinElm('fg-b');
    ctx.fontChkInputBgRGB = ctx.getDbgWinElm('bg-rgb');
    ctx.fontChkRangeBgR = ctx.getDbgWinElm('bg-range-r');
    ctx.fontChkRangeBgG = ctx.getDbgWinElm('bg-range-g');
    ctx.fontChkRangeBgB = ctx.getDbgWinElm('bg-range-b');
    ctx.fontChkLabelBgR = ctx.getDbgWinElm('bg-r');
    ctx.fontChkLabelBgG = ctx.getDbgWinElm('bg-g');
    ctx.fontChkLabelBgB = ctx.getDbgWinElm('bg-b');

    ctx.onChangeFontSizeTxt();
    ctx.onChangeFontWeight();
    ctx.onChangeFgRGB();
    ctx.onChangeBgRGB();
  },
  toggleTxtItalic: function(btn) {
    var ctx = DebugJS.ctx;
    var style = '';
    if (ctx.fontChkItalic) {
      ctx.fontChkItalic = false;
    } else {
      ctx.fontChkItalic = true;
      style = 'italic';
    }
    DebugJS.setStyle(ctx.fontChkTargetEl, 'font-style', style);
    ctx.updateTxtItalicBtn(btn);
  },
  updateTxtItalicBtn: function(btn) {
    var c = (DebugJS.ctx.fontChkItalic ? DebugJS.ctx.opt.btnColor : DebugJS.COLOR_INACT);
    DebugJS.setStyle(btn, 'color', c);
  },
  toggleElmEditable: function(btn) {
    var ctx = DebugJS.ctx;
    var b = DebugJS.ST_ELM_EDIT;
    if (ctx.status & b) {
      ctx.status &= ~b;
      ctx.updateEditable(ctx, ctx.fontChkTxt);
    } else {
      ctx.status |= b;
      if (DebugJS.el) ctx.updateEditable(ctx, DebugJS.el);
    }
    ctx.updateElBtn(btn);
  },
  updateElBtn: function(btn) {
    var c = (DebugJS.ctx.status & DebugJS.ST_ELM_EDIT ? DebugJS.ctx.opt.btnColor : DebugJS.COLOR_INACT);
    DebugJS.setStyle(btn, 'color', c);
  },
  onChangeFgRGB: function() {
    var ctx = DebugJS.ctx;
    var rgb16 = '#' + ctx.fontChkInputFgRGB.value;
    var rgb10 = DebugJS.rgb16to10(rgb16);
    if (!rgb10) return;
    ctx.fontChkRangeFgR.value = rgb10.r;
    ctx.fontChkRangeFgG.value = rgb10.g;
    ctx.fontChkRangeFgB.value = rgb10.b;
    ctx.onChangeFgColor(null);
    DebugJS.setStyle(ctx.fontChkTargetEl, 'color', rgb16);
  },
  onChangeBgRGB: function() {
    var ctx = DebugJS.ctx;
    var rgb16 = '#' + ctx.fontChkInputBgRGB.value;
    if (rgb16 == '#') {
      DebugJS.setStyle(ctx.fontChkTargetEl, 'background', 'transparent');return;
    }
    var rgb10 = DebugJS.rgb16to10(rgb16);
    if (!rgb10) return;
    ctx.fontChkRangeBgR.value = rgb10.r;
    ctx.fontChkRangeBgG.value = rgb10.g;
    ctx.fontChkRangeBgB.value = rgb10.b;
    ctx.onChangeBgColor(null);
    DebugJS.setStyle(ctx.fontChkTargetEl, 'background', rgb16);
  },
  onChangeFgColor: function(callFromRange) {
    var ctx = DebugJS.ctx;
    var fgR = ctx.fontChkRangeFgR.value;
    var fgG = ctx.fontChkRangeFgG.value;
    var fgB = ctx.fontChkRangeFgB.value;
    var rgb16 = DebugJS.rgb10to16(fgR, fgG, fgB);
    ctx.fontChkLabelFgR.innerText = fgR;
    ctx.fontChkLabelFgG.innerText = fgG;
    ctx.fontChkLabelFgB.innerText = fgB;
    if (callFromRange) {
      ctx.fontChkInputFgRGB.value = rgb16.r + rgb16.g + rgb16.b;
      DebugJS.setStyle(ctx.fontChkTargetEl, 'color', 'rgb(' + fgR + ',' + fgG + ',' + fgB + ')');
    }
  },
  onChangeBgColor: function(callFromRange) {
    var ctx = DebugJS.ctx;
    var bgR = ctx.fontChkRangeBgR.value;
    var bgG = ctx.fontChkRangeBgG.value;
    var bgB = ctx.fontChkRangeBgB.value;
    var rgb16 = DebugJS.rgb10to16(bgR, bgG, bgB);
    ctx.fontChkLabelBgR.innerText = bgR;
    ctx.fontChkLabelBgG.innerText = bgG;
    ctx.fontChkLabelBgB.innerText = bgB;
    if (callFromRange) {
      ctx.fontChkInputBgRGB.value = rgb16.r + rgb16.g + rgb16.b;
      DebugJS.setStyle(ctx.fontChkTargetEl, 'background', 'rgb(' + bgR + ',' + bgG + ',' + bgB + ')');
    }
  },
  onChangeFontSizeTxt: function() {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.fontChkFontSizeInput.value;
    var unit = ctx.fontChkFontSizeUnitInput.value;
    ctx.fontChkFontSizeRange.value = fontSize;
    ctx.onChangeFontSize(null);
    DebugJS.setStyle(ctx.fontChkTargetEl, 'font-size', fontSize + unit);
  },
  onChangeFontSize: function(callFromRange) {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.fontChkFontSizeRange.value;
    var unit = ctx.fontChkFontSizeUnitInput.value;
    if (callFromRange) {
      ctx.fontChkFontSizeInput.value = fontSize;
      DebugJS.setStyle(ctx.fontChkTargetEl, 'font-size', fontSize + unit);
    }
  },
  onChangeFontWeight: function() {
    var fontWeight = DebugJS.ctx.fontChkFontWeightRange.value;
    DebugJS.setStyle(DebugJS.ctx.fontChkTargetEl, 'font-weight', fontWeight);
    if (fontWeight == 400) {
      fontWeight += '(normal)';
    } else if (fontWeight == 700) {
      fontWeight += '(bold)';
    }
    DebugJS.ctx.fontChkFontWeightLabel.innerText = fontWeight;
  },
  onChangeFontFamily: function(font) {
    DebugJS.setStyle(DebugJS.ctx.fontChkTargetEl, 'font-family', font.value);
  },
  closeFontChecker: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActvFnc & DebugJS.TOOLS_FNC_FONT) && (ctx.fontChkPanel)) {
      ctx.removeToolFuncPanel(ctx, ctx.fontChkPanel);
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
    if (fmt && (ctx.fileVwrMode != fmt)) ctx.switchFileScreen();
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
    ctx.fileInput.style.width = 'calc(100% - 180px)';

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
    if (DebugJS.isBat(t)) {
      ctx.openBat(ctx, t);
    } else {
      var s = DebugJS.delAllNL(t.trim());
      if (DebugJS.isDataURL(s)) {
        ctx.decodeDataURL(ctx, s);
      } else if (DebugJS.isUnixTm(s.trim()) || DebugJS.isDateTimeStr(s)) {
        ctx.cmdDate(s, null);
      } else if (DebugJS.isInt(s)) {
        DebugJS.cmdInt(s, true);
      } else {
        if (ctx.decB64(ctx, s)) return;
        ctx.fmtJson(ctx, t);
      }
    }
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
    } catch (e) {o.e = e;}
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
    if (!file) return;
    if (DebugJS.wBOM(ctt)) ctt = ctt.substr(1);
    if (DebugJS.isBat(ctt) || DebugJS.isB64Bat(ctt)) {
      ctx.onBatLoaded(ctx, file, ctt);
    } else if (file.name.match(/\.json$/)) {
      ctx.closeTools(ctx);
      DebugJS._log('');
      DebugJS._cmdJson(DebugJS.delAllNL(ctt), true);
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
  onDropOnJS: function(e) {
    DebugJS.ctx._onDropOnFeat(DebugJS.ctx, e, DebugJS.ctx.onJsLoaded);
  },
  onJsLoaded: function(ctx, file, ctt) {
    ctx.closeTools(ctx);
    ctx.openFeature(ctx, DebugJS.ST_JS);
    ctx.jsEditor.value = ctx.jsBuf = ctt;
  },
  onDropOnBat: function(e) {
    DebugJS.ctx._onDropOnFeat(DebugJS.ctx, e, DebugJS.ctx.onBatLoaded);
  },
  onBatLoaded: function(ctx, file, ctt) {
    DebugJS.bat.set(ctt);
    ctx.switchToolsFunction(DebugJS.TOOLS_FNC_BAT);
  },
  onDropOnTxtEdt: function(e) {
    DebugJS.ctx._onDropOnFeat(DebugJS.ctx, e, DebugJS.ctx.onTxtEdtLoaded);
  },
  onTxtEdtLoaded: function(ctx, file, ctt) {
    ctx.txtEdtTxt.value = ctt;
    ctx.switchToolsFunction(DebugJS.TOOLS_FNC_TEXT);
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
    if (!e.lengthComputable) return;
    var total = e.total;
    var loaded = e.loaded;
    var pct = (total == 0) ? 100 : Math.round((loaded / total) * 100);
    DebugJS.ctx.fileLoadProg.style.width = 'calc(' + pct + '% - ' + (DebugJS.WIN_BORDER * 2) + 'px)';
    DebugJS.ctx.fileLoadProg.textContent = pct + '%';
    DebugJS.ctx.updateFilePreview('LOADING...\n' + DebugJS.formatDec(loaded) + ' / ' + DebugJS.formatDec(total) + ' bytes');
  },
  onFileLoaded: function() {
    var ctx = DebugJS.ctx;
    var file = ctx.fileReader.file;
    var ctt = '';
    try {
      if (ctx.fileReader.result != null) ctt = ctx.fileReader.result;
    } catch (e) {
      DebugJS._log.e('onFileLoaded: ' + e);
    }
    if (ctx.fileVwrMode == 'bin') {
      ctx.onFileLoadedBin(ctx, file, ctt);
    } else {
      ctx.onFileLoadedB64(ctx, file, ctt);
    }
    setTimeout(ctx.fileLoadFinalize, 1000);
    var isB64 = (ctx.fileVwrMode == 'b64');
    DebugJS.callEvtListeners('fileloaded', file, ctt, isB64);
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
    try {
      if (ctx.decMode == 'bsb64') {
        ctx.decodeFileVwrDataBSB64(ctx, data, mode, scheme);
      } else {
        ctx.decodeFileVwrDataB64(ctx, data, mode, scheme);
      }
    } catch (e) {ctx.showFilePreview(ctx, null, scheme, 'DECODE ERROOR');}
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
    var decoded = DebugJS.decodeB64(b64cnt.data);
    if (ctx.fileVwrSysCb) {
      ctx.fileVwrSysCb(ctx, file, decoded);
    } else {
      if (ctx.decMode == 'bsb64') {
        ctx.decodeFileVwrData();
      }
    }
  },
  onFileLoadedBin: function(ctx, file, ctt) {
    var buf = new Uint8Array(ctt);
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
      fInfo = '';
      if (file) fInfo = DebugJS.getFileInfo(file);
      ctx.fileVwrFileInfo = fInfo;
    }
    var hash = ctx.fileVwrHash;
    if (hash == null) {
      hash = '';
      if (DebugJS.shaAvailable()) {
        hash = 'SHA-1   : ' + DebugJS.getSHA('SHA-1', buf) + '\n';
        hash += 'SHA-256 : ' + DebugJS.getSHA('SHA-256', buf) + '\n';
        hash += 'SHA-512 : ' + DebugJS.getSHA('SHA-512', buf) + '\n';
        ctx.fileVwrHash = hash;
      }
    }
    fInfo += hash;
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
    var hash = ctx.fileVwrHash;
    if (hash) fInfo += hash;
    return DebugJS.createCttInfo(fInfo);
  },
  showFileSizeExceeds: function(ctx, file, lm) {
    var s = ctx.getFileInfo(ctx, file) + '<span style="color:' + ctx.opt.logColorW + '">The file size exceeds the limit allowed. (limit=' + lm + ')</span>';
    ctx.updateFilePreview(s);
  },
  getTextPreview: function(decoded) {
    DebugJS.ctx.fileVwrCtt = decoded;
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
    return '<img src="' + img + '" id="' + ctx.id + '-img-preview" style="max-width:' + (ctxSizePos.w - 32) + 'px;max-height:' + (ctxSizePos.h - (ctx.computedFontSize * 13) - 8) + 'px">\n';
  },
  resizeImgPreview: function() {
    var ctx = DebugJS.ctx;
    if ((!(ctx.status & DebugJS.ST_TOOLS)) ||
        (!(ctx.toolsActvFnc & DebugJS.TOOLS_FNC_FILE)) ||
        (!(ctx.fileVwrMode == 'b64'))) {
      return;
    }
    var imgPreview = ctx.getDbgWinElm('img-preview');
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
        if (showAddr) b += DebugJS.dumpAddr(i + 1);
      }
    } else if (showSp) {
      b += (((i + 1) % 8 == 0) ? '  ' : ' ');
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
  clearFile: function() {
    var ctx = DebugJS.ctx;
    ctx.fileVwrDataSrcType = null;
    ctx.fileVwrFile = null;
    ctx.fileVwrFileInfo = null;
    ctx.fileVwrHash = null;
    ctx.fileVwrBinInfo = null;
    ctx.fileVwrDataSrc = null;
    ctx.fileVwrByteArray = null;
    ctx.fileReader = null;
    ctx.fileVwrCtt = null;
    if (ctx.fileVwrPanel) {
      ctx.filePreview.innerText = 'Drop a file here';
      ctx.setDtSchmTxt();
      ctx.fileVwrDtTxtArea.value = '';
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
    var setStyle = DebugJS.setStyle;
    ctx.decMode = 'b64';
    setStyle(ctx.fileVwrBsbBtn, 'color', DebugJS.COLOR_INACT);
    setStyle(ctx.fileVwrB64Btn, 'color', '');
    setStyle(ctx.fileVwrBSB64nL, 'color', '#888');
    setStyle(ctx.fileVwrBSB64n, 'color', '#888');
    ctx.fileVwrRadioB64.disabled = false;
    ctx.fileVwrRadioBin.disabled = false;
    setStyle(ctx.fileVwrLabelB64, 'color', '#fff');
    setStyle(ctx.fileVwrLabelBin, 'color', '#fff');
  },
  setModeBSB64: function() {
    var ctx = DebugJS.ctx;
    var setStyle = DebugJS.setStyle;
    ctx.decMode = 'bsb64';
    setStyle(ctx.fileVwrB64Btn, 'color', DebugJS.COLOR_INACT);
    setStyle(ctx.fileVwrBsbBtn, 'color', '');
    var m = ctx.fileVwrDecMode;
    if ((m == 'hex') || (m == 'bin')) ctx.setDecMode(ctx, 'b64');
    setStyle(ctx.fileVwrBSB64nL, 'color', '#ccc');
    setStyle(ctx.fileVwrBSB64n, 'color', '#ccc');
    ctx.fileVwrRadioB64.disabled = true;
    ctx.fileVwrRadioBin.disabled = true;
    setStyle(ctx.fileVwrLabelB64, 'color', '#888');
    setStyle(ctx.fileVwrLabelBin, 'color', '#888');
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
    DebugJS.ui.createBtnHtml('[CLR]', 'DebugJS.ctx.insertHtmlSnippet(-1);', 'margin-left:4px;margin-right:4px');
    for (var i = 0; i < 5; i++) {
      html += ctx.createHtmlSnippetBtn(ctx, i);
    }
    ctx.htmlPrevEditorPanel = DebugJS.ui.addElement(ctx.htmlPrevBasePanel, 'div');
    ctx.htmlPrevEditorPanel.innerHTML = html;

    style = {height: 'calc(50% - ' + (ctx.computedFontSize + 10) + 'px)'};
    var editor = DebugJS.ui.addElement(ctx.htmlPrevBasePanel, 'textarea', style);
    editor.className = 'dbg-editor';
    editor.spellcheck = false;
    editor.onblur = ctx.saveHtmlBuf;
    editor.value = ctx.htmlPrevBuf;
    ctx.htmlPrevEditor = editor;
  },
  createHtmlSnippetBtn: function(ctx, i) {
    return DebugJS.ui.createBtnHtml('&lt;CODE' + (i + 1) + '&gt;', 'DebugJS.ctx.insertHtmlSnippet(' + i + ');', 'margin-left:4px');
  },
  insertHtmlSnippet: function(n) {
    var el = DebugJS.ctx.htmlPrevEditor;
    if (n < 0) {
      el.value = '';
      el.focus();
    } else {
      DebugJS.insertText(el, DebugJS.HTML_SNIPPET[n]);
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
  closeBatEditor: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActvFnc & DebugJS.TOOLS_FNC_BAT) && (ctx.batBasePanel)) {
      ctx.removeToolFuncPanel(ctx, ctx.batBasePanel);
    }
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
  onBatInput: function() {
    DebugJS.ctx.onTextInput(DebugJS.ctx.batTxtSt, DebugJS.ctx.batTextEditor);
  },

  openTxtEditor: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.txtBasePanel) {
      ctx.createTxtBasePanel(ctx);
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.txtBasePanel);
    }
    ctx.txtEdtTxt.focus();
  },
  closeTxtEditor: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActvFnc & DebugJS.TOOLS_FNC_TEXT) && (ctx.txtBasePanel)) {
      ctx.removeToolFuncPanel(ctx, ctx.txtBasePanel);
    }
  },
  createTxtBasePanel: function(ctx) {
    var basePanel = DebugJS.addSubPanel(ctx.toolsBodyPanel);
    ctx.txtClrBtn = DebugJS.ui.addBtn(basePanel, '[CLEAR]', ctx.clearTxt);
    ctx.txtClrBtn.style.float = 'right';
    ctx.txtEdtExecBtn = DebugJS.ui.addBtn(basePanel, '[EXEC]', ctx.execTxtEdit);
    ctx.txtEdtExecBtn.style.float = 'right';
    ctx.txtEdtExecBtn.style.marginRight = (ctx.computedFontSize * 0.4) + 'px';

    DebugJS.ui.addLabel(basePanel, 'MODE: ');
    ctx.txtEdtMdSlct = DebugJS.ui.addElement(basePanel, 'select');
    ctx.txtEdtMdSlct.className = 'dbg-select dbg-nomove';
    DebugJS.setStyle(ctx.txtEdtMdSlct, 'width', '9em');
    var o = '';
    for (var k in ctx.editTxtFn) {
      o += '<option value="' + k + '">' + ctx.editTxtFn[k].lbl + '</option>';
    }
    ctx.txtEdtMdSlct.innerHTML = o;
    ctx.txtEdtMdSlct.addEventListener('change', ctx.onTxtEdtMdChg);

    DebugJS.ui.addLabel(basePanel, 'SORT: ', {'margin-left': ctx.computedFontSize + 'px'});
    ctx.txtEdtSrtSlct = DebugJS.ui.addElement(basePanel, 'select');
    ctx.txtEdtSrtSlct.className = 'dbg-select dbg-nomove';
    ctx.txtEdtSrtSlct.innerHTML = '<option value="0"></option><option value="1">asc</option><option value="2">desc</option>';

    ctx.txtEdtOptLbl = DebugJS.ui.addLabel(basePanel, 'OPT:', {'margin-left': ctx.computedFontSize + 'px'});
    ctx.txtEdtOpt = DebugJS.ui.addTextInput(basePanel, '45px', 'left', ctx.opt.fontColor, '', null);

    var style = {'height': 'calc(100% - ' + (ctx.computedFontSize * 3) + 'px)'};
    ctx.txtEdtTxt = DebugJS.ui.addElement(basePanel, 'textarea', style);
    ctx.txtEdtTxt.className = 'dbg-editor';
    ctx.txtEdtTxt.spellcheck = false;
    var ev = ['input', 'change', 'keydown', 'keyup', 'click'];
    for (var i = 0; i < ev.length; i++) {
      ctx.txtEdtTxt.addEventListener(ev[i], ctx.onTxtEdtInput);
    }
    ctx.txtTxtSt = DebugJS.ui.addLabel(basePanel, '', {color: '#ccc'});
    ctx.enableDnDFileLoad(ctx.txtEdtTxt, ctx.onDropOnTxtEdt);
    ctx.txtBasePanel = basePanel;
    ctx.onTxtEdtInput();
  },
  addTxtEdtModeBtn: function(ctx, bsPnl, lbl, fn) {
    var b = DebugJS.ui.addBtn(bsPnl, lbl, fn);
    var mgn = (ctx.computedFontSize * 0.2);
    b.style.marginRight = mgn + 'px';
    return b;
  },
  onTxtEdtInput: function() {
    DebugJS.ctx.onTextInput(DebugJS.ctx.txtTxtSt, DebugJS.ctx.txtEdtTxt);
  },
  clearTxt: function() {
    DebugJS.ctx.txtEdtTxt.value = '';
  },
  onTxtEdtMdChg: function() {
    var ctx = DebugJS.ctx;
    var v = ctx.txtEdtMdSlct.value;
    var d = ctx.editTxtFn[v];
    var slct = ctx.txtEdtSrtSlct;
    if (d.srt) {
      slct.disabled = false;
    } else {
      slct.disabled = true;
      slct.value = '';
    }
    var s = (d.opt ? d.opt : 'OPT');
    ctx.txtEdtOptLbl.innerText = s + ':';
  },
  execTxtEdit: function() {
    var ctx = DebugJS.ctx;
    var d = ctx.editTxtFn[ctx.txtEdtMdSlct.value];
    if (!d.fn) return;
    var v = ctx.txtEdtTxt.value;
    var srt = ctx.txtEdtSrtSlct.value | 0;
    var o = ctx.txtEdtOpt.value;
    ctx.txtEdtTxt.value = d.fn(ctx, v, srt, o);
    ctx.onTxtEdtInput();
  },
  editTxtFn: {
    nop: {lbl: ''},
    unique: {
      lbl: 'UNIQUE', srt: 1, opt: 'CNT?',
      fn: function(ctx, s, srt, o) {
        var opt = {sort: srt, count: 0, blank: 0};
        if (o) opt.count = 1;
        return DebugJS.toUnique(s, opt).r;
      }
    },
    sort: {
      lbl: 'SORT', srt: 1, opt: 'INDEX',
      fn: function(ctx, s, srt, n) {
        var d = (srt == 2 ? 1 : 0);
        return DebugJS.sort(s, d, n);
      }
    },
    lflf2lf: {
      lbl: 'LFLF_TO_LF',
      fn: function(ctx, s) {return DebugJS.lflf2lf(s);}
    },
    lf2lflf: {
      lbl: 'LF_TO_LFLF',
      fn: function(ctx, s) {return DebugJS.lf2lflf(s);}
    },
    trimblank: {
      lbl: 'TRIM_BLANK',
      fn: function(ctx, s) {return DebugJS.trimBlank(s);}
    },
    tabalign: {
      lbl: 'TAB_ALIGN',
      opt: 'N',
      fn: function(ctx, s, x, n) {return DebugJS.alignByTab(s, n | 0);}
    },
    uc: {
      lbl: 'UPPERCASE',
      fn: function(ctx, s) {return s.toUpperCase();}
    },
    lc: {
      lbl: 'lowercase',
      fn: function(ctx, s) {return s.toLowerCase();}
    },
    tofull: {
      lbl: 'TO_FULL_WIDTH',
      fn: function(ctx, s) {return DebugJS.toFullWidth(s);}
    },
    tohalf: {
      lbl: 'TO_HALF_WIDTH',
      fn: function(ctx, s) {return DebugJS.toHalfWidth(s);}
    },
    padseq: {
      lbl: 'PAD_SEQ', opt: 'LEN',
      fn: function(ctx, s, x, n) {return DebugJS.padSeq(s, n | 0);}
    },
    datesep: {
      lbl: 'DATE_SEP', opt: 'SEP',
      fn: function(ctx, s, x, a) {return DebugJS.dateSep(s, a);}
    },
    h2v: {
      lbl: 'HORIZ_TO_VERT',
      fn: function(ctx, s) {return s.replace(/\t/g, '\n');}
    },
    v2h: {
      lbl: 'VERT_TO_HORIZ',
      fn: function(ctx, s) {return s.replace(/\n/g, '\t');}
    },
    maxlen: {
      lbl: 'MAX_LEN',
      fn: function(ctx, s, x, n) {return ctx.minMaxLen(s, 1, n);}
    },
    rot18: {
      lbl: 'ROT18', opt: 'SHIFT',
      fn: function(ctx, s, x, n) {return DebugJS.rot(18, s, n);}
    },
    rot47: {
      lbl: 'ROT47', opt: 'SHIFT',
      fn: function(ctx, s, x, n) {return DebugJS.rot(47, s, n);}
    }
  },
  minMaxLen: function(s, f, n) {
    var x = DebugJS.lenMinMax(s, f, n);
    var r = 'len=' + x.c + '\n';
    for (var i = 0; i < x.m.length; i++) {
      r += x.m[i] + '\n';
    }
    return r;
  },

  onTextInput: function(txtSt, edt) {
    if (!txtSt) return;
    var txt = edt.value;
    var len = txt.length;
    var lenB = DebugJS.lenB(txt);
    var lfCnt = DebugJS.countLineBreak(txt);
    var chrs = len - lfCnt;
    var tl = (len == 0 ? 0 : lfCnt + 1);
    var st = edt.selectionStart;
    var ed = edt.selectionEnd;
    var sl = ed - st;
    var ch = DebugJS.str2arr(txt)[st] || '';
    var u10 = DebugJS.getCodePoint(ch);
    var u16 = DebugJS.getUnicodePoints(ch, true);
    var CTCH = {0: 'NUL', 9: 'TAB', 10: 'LF', 11: 'ESC', 32: 'SP', 127: 'DEL', 12288: 'emSP'};
    var co = '8cc';
    if (isNaN(u10)) {
      ch = '[END]';
      u16 = 'U+----';
      co = '8aa';
    } else if (CTCH[u10]) {
      ch = CTCH[u10];
      co = '8aa';
    }
    var cp = '<span style="color:#' + co + '">' + ch + '</span>&nbsp;' + u16 + (u10 ? '(' + u10 + ')' : '');
    var t = txt.substr(0, st);
    var l = (t.match(/\n/g) || []).length + 1;
    var c = t.replace(/.*\n/g, '').length + 1;
    var tc = DebugJS.clipTextLine(txt, st).length;
    var slT = txt.substring(st, ed);
    var slL = DebugJS.countLineBreak(slT) + 1;
    var slct = (sl ? ' SEL:' + ('LEN=' + sl + '/L=' + slL) : '');
    var s = cp;
    s += ' ' + l + ':' + c + ' ';
    s += ' C=' + tc + ' L=' + tl;
    s += ' CHARS=' + chrs;
    s += ' LEN=' + len;
    s += ' bytes=' + lenB;
    txtSt.innerHTML = s + slct;
  },

  toggleExtPanel: function() {
    var ctx = DebugJS.ctx;
    ctx.openClosePanel(ctx, DebugJS.ST_EXT_PANEL, ctx.openExtPanel, ctx.closeExtPanel);
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
        if (ctx.status & DebugJS.ST_EXT_PANEL) ctx.onExtPanelInActive(ctx, p2);
        ctx.extBodyPanel.removeChild(p2.base);
      }
    }
    var p1 = ctx.extPanels[idx];
    if (p1) {
      ctx.extBodyPanel.appendChild(p1.base);
      if (ctx.status & DebugJS.ST_EXT_PANEL) ctx.onExtPanelActive(ctx, p1);
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
    } catch (e) {DebugJS._log.e('Invalid value');}
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
    var r = ctx._execCmd(cl, ctx.cmdEchoFlg, false, true);
    ctx.$m = ((ctx.$mF || (typeof r == 'number')) ? r : undefined);
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
    var cmds = DebugJS.splitCmdLineInTwo(cl);
    var cmd = cmds[0];
    if (cmd == 'copy') {
      ctx.cmdCopy(cmds[1]);
      return;
    }
    if (echo && plain) {
      var echoStr = str;
      echoStr = DebugJS.escHtml(echoStr);
      echoStr = DebugJS.trimEchoStr(echoStr);
      DebugJS._log.s(echoStr);
    }
    if (!DebugJS.callListeners(ctx.cmdListeners, str)) return;
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
    if (setValName != null) DebugJS.setCmdVal(setValName, ret);
    return ret;
  },
  __execCmd: function(ctx, cmdline, echo, aliased) {
    ctx.$mF = 0;
    cmdline = DebugJS.escCtrlCh(cmdline);
    var cmds = DebugJS.splitCmdLineInTwo(cmdline);
    var cmd = cmds[0];
    var arg = cmds[1];
    if (!aliased) {
      var alsTbls = [ctx.CMD_ALIAS, ctx.CMD_ALIAS_BI];
      for (var i = 0; i < alsTbls.length; i++) {
        var aliases = alsTbls[i];
        for (var key in aliases) {
          if (cmd == key) {
            var cl = cmdline.replace(new RegExp(cmd), aliases[key]);
            return ctx.__execCmd(ctx, cl, echo, true);
          }
        }
      }
    }
    var cmdln = cmdline.trim();
    if (cmdln.match(/^\d+bit$/)) {
      cmd = 'bit';
      arg = cmdln.replace(/bit/, '');
    } else if (cmdln.match(/^\d+bits$/)) {
      cmd = 'bit';
      arg = '-a ' + cmdln.replace(/bits/, '');
    }

    for (i = 0; i < ctx.CMD_TBL.length; i++) {
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

    var ret = ctx.cmdInt(cmdline, null, echo);
    if (ret != null) return ret;

    if (DebugJS.isFloat(cmd)) {
      ret = ctx.cmdFmtFloat(cmdline);
      if (ret) return ret;
      return ctx.cmdFloat(cmd, null, echo);
    }

    ret = ctx.cmdFmtNum(cmdline);
    if (ret != null) return ret;

    ret = ctx.cmdRatio(cmdline, echo);
    if (ret != null) return ret;

    ret = ctx.cmdTimeCalc(cmdline, echo);
    if (ret != null) {
      ctx.$mF = 1;
      return ret;
    }

    ret = ctx.cmdDateCalc(cmdline, echo);
    if (ret != null) return ret;

    ret = ctx.cmdDateDiff(cmdline, echo);
    if (!isNaN(ret)) return ret;

    ret = ctx.cmdDateConv(cmdline);
    if (ret != null) return ret;

    if (DebugJS.isUnixTm(cmd)) {
      return ctx.cmdDate(cmdline, null);
    }

    if (DebugJS.isSTN(cmd)) {
      return DebugJS.cmdTZedNow(cmd, arg);
    } else if (cmdln.match(/^UTC[+-]\d+/i)) {
      return DebugJS.cmdTZedNow('UTC', cmdln.substr(3));
    }

    if (DebugJS.isTimerFormat(cmdln)) {
      return DebugJS.ctx.cmdTime(cmdln);
    }

    if (cmdln.match(/^[\d,]+\.?\d*\s*[KMGTP]?B$/i)) {
      return DebugJS.cmdByte(cmdln, echo);
    }

    if (cmdln.match(/^\d+!$/i)) {
      return DebugJS.cmdFactorial(cmdln.replace(/!/, ''), echo);
    }

    if (cmdln.match(/^\d+p\d+$/i)) {
      return DebugJS.cmdPerm(cmdln, echo);
    }

    if (cmdln.match(/^\d+c\d+$/i)) {
      return DebugJS.cmdCombi(cmdln, echo);
    }

    if (cmdln.match(/^\d+h\d+$/i)) {
      return DebugJS.cmdMultiChoose(cmdln, echo);
    }

    if (cmdline.match(/^\s*U\+/i)) {
      return ctx.cmdUnicode('-d ' + cmdline, null, echo);
    }

    if (DebugJS.isURIencoding(cmdln)) {
      return ctx.cmdUri('-d ' + cmdln, null, echo);
    }

    if (cmdline.match(/^\s*http/)) {
      return DebugJS.ctx.doHttpRequest('GET', cmdline, echo);
    }

    return ctx.execCode(cmdline, echo);
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
    s += ((c == undefined) ? ': not found' : "='" + c + "'");
    return s;
  },

  cmdArr2Set: function(arg, tbl) {
    var v = DebugJS.getNonOptVal(arg);
    if (!v) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var s = DebugJS.hasOpt(arg, 's');
    var j = DebugJS.hasOpt(arg, 'j');
    var sort = DebugJS.hasOpt(arg, 'sort');
    try {
      var a = eval(v);
      var r = DebugJS.arr2set(a, s);
      if (sort) r.sort();
      DebugJS._log.p(r, 0, '', j);
    } catch (e) {DebugJS._log.e(e);}
    return r;
  },

  cmdAscii: function() {
    var s = DebugJS.chars(32, 126);
    DebugJS._log(s);
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

  cmdBit: function(arg, tbl, echo) {
    var n = DebugJS.getNonOptVal(arg);
    if (!n) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    n |= 0;
    var v = 0;
    if (n != 0) {
      if (DebugJS.hasOpt(arg, 'a')) {
        v = Math.pow(2, n) - 1;
      } else {
        v = Math.pow(2, n - 1);
      }
    }
    return DebugJS.cmdInt(v + '', echo);
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

  cmdByte: function(arg, tbl, echo) {
    var v = DebugJS.getNonOptVal(arg);
    if (v == undefined) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var p = DebugJS.get1stOpt(arg);
    if (p && p.match(/^[KMGTP]$/i)) v += p;
    return DebugJS.cmdByte(v, echo);
  },

  cmdCall: function(arg) {
    if (DebugJS.bat.isCmdExecutable()) {
      DebugJS.ctx._cmdJump(DebugJS.ctx, arg, true, 'func');
    }
  },

  cmdChar: function(arg, tbl) {
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
    var s = DebugJS.chars(c1, c2);
    DebugJS._log(s);
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

  cmdClock: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var v = arg.trim();
    var s;
    if (v == '') {
      DebugJS.printUsage(tbl.help);
    } else if (v == 'start') {
      ctx.startUdtClock(ctx);
    } else if (v == 'stop') {
      ctx.stopUdtClock(ctx);
    } else if (v == 'on') {
      ctx.clockLabel.style.display = '';
    } else if (v == 'off') {
      ctx.clockLabel.style.display = 'none';
    } else if (v.match(/^[+-]\d+$/)) {
      ctx._cmdSet(ctx, 'clockoffset', v.replace('+', ''));
      ctx.startUdtClock(ctx);
    } else if (s = DebugJS.getOptVal(v, 'label')) {
      ctx._cmdClockLabel(ctx, s);
    } else {
      ctx._cmdClockDate(ctx, v);
    }
  },
  _cmdClockDate: function(ctx, v) {
    var now = Date.now();
    var t = (v == 'now' ? now : DebugJS.toTimestamp(v, now));
    if (isNaN(t)) {
      DebugJS._log.e('Invalid date format');
    } else {
      ctx._cmdSet(ctx, 'clockoffset', t - now);
      ctx.updateClockLabel(ctx);
    }
  },
  _cmdClockLabel: function(ctx, v) {
    try {
      v = eval(v);
      ctx.stopUdtClock(ctx);
      ctx.clockLabel.innerText = v;
    } catch (e) {DebugJS._log.e(e);}
  },

  cmdCls: function() {
    DebugJS.cls();
  },

  cmdChmod: function(arg, tbl, echo) {
    var a = DebugJS.delAllSP(arg);
    if (!a) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var s = '';
    if (DebugJS.isNum(a.charAt(0))) {
      for (var i = 0; i < a.length; i++) {
        s += DebugJS.n2rwx(+a[i]);
      }
    } else {
      for (i = 0; i < 3; i++) {
        var p = a.substr(i * 3, 3);
        if (p) s += DebugJS.rwx2n(p);
      }
    }
    if (echo) DebugJS._log.res(s);
    return s;
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
        r = DebugJS.getCookieKeys();
        if (echo) DebugJS._log.p(r);
        return r;
      case 'get':
        if (DebugJS.hasOpt(arg, 'a') || (k == undefined)) {
          r = DebugJS.getCookie();
          if (echo) DebugJS._log.resQ(document.cookie);
        } else {
          r = DebugJS.getCookie(k);
          if (r == undefined) {
            DebugJS._log('No such key');
          } else {
            if (echo) DebugJS._log.res(r);
          }
        }
        return r;
      case 'set':
        DebugJS.setCookie(k, v);
        if (echo) DebugJS._log.res(k + '=' + v);
        return;
      case 'delete':
        if (DebugJS.hasOpt(arg, 'a')) {
          DebugJS.deleteCookie();
        } else {
          DebugJS.deleteCookie(k);
        }
        if (echo) DebugJS._log.res('Deleted');
        return;
    }
    DebugJS.printUsage(tbl.help);
  },

  cmdCopy: function(arg) {
    var a = arg.trim();
    if (a) {
      try {
        var s = eval(a) + '';
        DebugJS.copy(s);
      } catch (e) {DebugJS._log.e(e);}
    } else {
      DebugJS.copyContent();
    }
  },

  cmdDate: function(arg, tbl) {
    var v = arg;
    var iso = false;
    var idx = DebugJS.indexOfOptVal(arg, '-iso');
    if (idx >= 0) {
      iso = true;
      v = arg.substr(idx);
    }
    var d = DebugJS.getDateWithTimestamp(v, iso);
    if (d == null) {
      DebugJS.printUsage(tbl.help);
    } else {
      if (!DebugJS.hasOpt(arg, 'q')) DebugJS._log.res(d);
    }
    return d;
  },
  cmdDateConv: function(arg) {
    var d = arg.trim();
    var v = d;
    var tz = d.match(/ [+-]\d{1,4}$/);
    if (tz) {
      var idx = d.indexOf(tz);
      d = d.substr(0, idx);
      tz = tz[0].trim();
    } else {
      tz = DebugJS.getLocalTZ();
    }
    if (!DebugJS.isDateTimeStr(d) && (d != 'today')) return null;
    if (d == 'today') v = DebugJS.today('/');
    var r = DebugJS.getDateWithTimestamp(v);
    if (r != null) {
      DebugJS._log.res(r);
    }
    return r;
  },
  cmdDateCalc: function(arg, echo) {
    var ret = null;
    arg = DebugJS.delAllSP(arg);
    if (!DebugJS.isBasicDateFormat(arg, true) && !DebugJS.isDateFormat(arg, true) && !DebugJS.startsWith(arg, 'today')) {
      return ret;
    }
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
    var d1 = DebugJS._cmdFmtDate(v[0]);
    if (!DebugJS.isDateFormat(d1)) return ret;
    var d2 = v[1];
    var t1 = DebugJS.getDateTime(d1).time;
    var t2 = (d2 | 0) * 86400000;
    var t;
    t = ((op == '-') ? t1 - t2 : t1 + t2);
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
    var d1 = DebugJS._cmdFmtDate(a[0]);
    var d2 = DebugJS._cmdFmtDate(a[1]);
    if (!DebugJS.isDateFormat(d1) || !DebugJS.isDateFormat(d2)) return ret;
    d1 = d1.replace(/-/g, '/');
    d2 = d2.replace(/-/g, '/');
    ret = DebugJS.diffDate(d1, d2);
    if (echo && !isNaN(ret)) DebugJS._log.res(ret);
    return ret;
  },

  cmdFmtNum: function(c) {
    c = DebugJS.unifySP(c.trim());
    var u1 = ['0', '3', '4'];
    var u2 = ['m', 'milli', 'u', 'micro', 'n', 'nano', 'p', 'pico', 'f', 'femto', 'a', 'atto', 'z', 'zepto', 'y', 'yocto'];
    var r = null;
    if (c.match(/^-?[\d,]+\.?\d*\s.+$/)) {
      var a = c.split(' ');
      var v = a[0];
      var n = a[1];
      if (DebugJS.arr.has(u1, n)) {
        r = DebugJS.formatDec(v, n);
      } else if (DebugJS.arr.has(u2, n)) {
        r = DebugJS.formatDecF(v, n);
        var s = DebugJS.formatFloat(r);
        DebugJS._log.mlt(s);
        return parseFloat(r);
      }
    }
    if (r != null) {
      DebugJS._log.res(r);
      if (r.match(/^\d+$/)) r = parseInt(r);
    }
    return r;
  },
  cmdFmtFloat: function(c) {
    c = DebugJS.unifySP(c.trim());
    var a = c.split(' ');
    var v = a[0];
    var n = a[1];
    if (n != '3') return;
    var r = DebugJS.formatFloat(v);
    DebugJS._log.mlt(r);
    return r;
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
    ctx.updateWinCtrlBtns();
  },

  cmdDelay: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var dat = ctx.cmdDelayData;
    var d = DebugJS.splitArgs(arg)[0];
    if (d == '-c') {
      ctx._cmdDelayCancel(ctx);
      return;
    } else if (d == '-q') {
      var t = dat.t;
      if (t) DebugJS._log(DebugJS.getDateTimeStr(t) + ': ' + dat.cmd);
      return;
    }
    if (d.match(/\|/)) {
      d = DebugJS.calcNextTime(d).t;
      d = DebugJS.calcTargetTime(d);
    } else if (DebugJS.isTTimeFormat(d)) {
      d = DebugJS.calcTargetTime(d);
    } else if (DebugJS.isTmStr(d)) {
      d = DebugJS.str2ms(d);
    } else if ((d == '') || isNaN(d)) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    ctx._cmdDelayRst(ctx);
    d |= 0;
    dat.cmd = DebugJS.getArgsFrom(arg, 1);
    dat.t = d + Date.now();
    dat.tmid = setTimeout(ctx._cmdDelayExec, d);
  },
  _cmdDelayExec: function() {
    var ctx = DebugJS.ctx;
    var c = ctx.cmdDelayData.cmd;
    if (c == '') {
      DebugJS._log(c);
    } else {
      ctx._execCmd(c, false, ctx.cmdEchoFlg);
    }
    ctx._cmdDelayRst(ctx);
  },
  _cmdDelayCancel: function(ctx) {
    if (ctx._cmdDelayRst(ctx)) {
      DebugJS._log('Command delay execution has been canceled.');
    }
  },
  _cmdDelayRst: function(ctx) {
    var r = false;
    var dat = ctx.cmdDelayData;
    if (dat.tmid > 0) {
      clearTimeout(dat.tmid);
      r = true;
    }
    dat.tmid = 0;
    dat.t = 0;
    dat.cmd = null;
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

  cmdElements: function(arg, tbl, echo) {
    arg = arg.trim();
    if ((arg == '-h') || (arg == '--help')) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var slct = DebugJS.getNonOptVals(arg)[0];
    var filter = DebugJS.getOptVals(arg);
    return DebugJS.countElements(slct, filter, !echo);
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
    ctx._cmdDelayRst(ctx);
    ctx.CMDVALS = {};
    ctx.finalizeFeatures(ctx);
    ctx.toolsActvFnc = DebugJS.TOOLS_DFLT_ACTIVE_FNC;
    if (ctx.opt.useSuspendLogButton) {
      ctx.status &= ~DebugJS.ST_LOG_SUSPEND;
      ctx.updateSuspendLogBtn(ctx);
    }
    if (ctx.status & DebugJS.ST_STOPWATCH_RUNNING) ctx.stopStopwatch();
    ctx.resetStopwatch();
    if (ctx.timerBasePanel) {
      ctx.stopTimerStopwatch();
      ctx.resetTimerStopwatch();
      ctx.switchTimerModeToClock();
    }
    ctx.setLed(0);
    ctx.setMsg('');
    if (ctx.uiStatus & DebugJS.UI_ST_DYNAMIC) {
      if (ctx.opt.usePinButton) ctx.enableDraggable(ctx);
      if (ctx.opt.mode != 'kiosk') ctx.resetDbgWinSizePos();
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
    if (a) {
      if (ctx._cmdHelp(t1, a) || ctx._cmdHelp(t2, a)) return;
      DebugJS._log('No help topics match `' + a + '\'');
      return;
    }
    var s = 'Available Commands:\n<table>' + ctx._cmdHelpList(t1);
    if (!ctx.opt.disableAllCommands) {
      if (t2.length > 0) s += '<tr><td colspan="2">' + '---- ---- ---- ---- ---- ---- ---- ----</td></tr>';
      s += ctx._cmdHelpList(t2);
    }
    s += '</table>';
    DebugJS._log.mlt(s);
  },
  _cmdHelp: function(tbl, c) {
    for (var i = 0; i < tbl.length; i++) {
      var t = tbl[i];
      if ((t.cmd == c) && !(t.attr & DebugJS.CMD_ATTR_HIDDEN) && !(t.attr & DebugJS.CMD_ATTR_DISABLED)) {
        if (t.help || t.desc) {
          if (t.desc) DebugJS._log(t.desc);
          if (t.help) DebugJS.printUsage(t.help);
        } else {
          DebugJS._log('No help topics match `' + c + '\'');
        }
        return 1;
      }
    }
    return 0;
  },
  _cmdHelpList: function(tbl) {
    var r = '';
    for (var i = 0; i < tbl.length; i++) {
      if (tbl[i].attr & DebugJS.CMD_ATTR_HIDDEN) continue;
      var s1 = '';
      var s2 = '';
      if (tbl[i].attr & DebugJS.CMD_ATTR_DISABLED) {
        s1 = '<span style="color:#aaa">';
        s2 = '</span>';
      }
      r += '<tr><td class="dbg-cmdtd">' + s1 + tbl[i].cmd + s2 + '</td><td>' + s1 + tbl[i].desc + s2 + '</td></tr>';
    }
    return r;
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
    } catch (e) {DebugJS._log.e(e);}
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
        if (i != (idx - 1)) ctx.saveHistory(ctx, cmds[i]);
      } else if (cmds.length >= ctx.opt.cmdHistoryMax) {
        if (i != (idx - 2)) ctx.saveHistory(ctx, cmds[i]);
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

  cmdFloat: function(arg, tbl, echo) {
    var ctx = DebugJS.ctx;
    arg = arg.trim();
    var v, s, fn;
    var vl = ((arg == '-Infinity') ? arg : DebugJS.getNonOptVal(arg));
    if (vl == undefined) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    vl = vl.replace(/[\s\\t()]/g, '');
    if (DebugJS.hasOpt(arg, 'b')) {
      fn = ctx._cmdFloatB;
      vl = vl.replace(/^0b/i, '');
    } else if (DebugJS.hasOpt(arg, 'h')) {
      fn = ctx._cmdFloatH;
      vl = vl.replace(/^0x/i, '');
    } else if (arg.match(/^0b/i)) {
      fn = ctx._cmdFloatB;
      vl = arg.substr(2);
    } else if (arg.match(/^0x/i)) {
      fn = ctx._cmdFloatH;
      vl = arg.substr(2);
    } else {
      vl = arg;
    }
    if ((fn == ctx._cmdFloatB) && (vl.match(/\./))) {
      var fb = vl.split('.');
      var bI = fb[0];
      var sn = 1;
      if (bI.charAt(0) == '-') {
        sn = -1;
        bI = bI.replace(/-/, '');
      }
      vl = DebugJS._fBin2Dec(bI, fb[1]);
      vl *= sn;
      fn = null;
    }
    if (fn) {
      var o = fn(vl);
      if (!o) {
        DebugJS._log.e('invalid bit pattern');
        return;
      }
      v = o.v;
      s = o.s;
    } else {
      v = parseFloat(vl);
      var b32 = DebugJS.toIEEE754Bin(v, 32);
      var b64 = DebugJS.toIEEE754Bin(v, 64);
      if ((v == 0) && (vl.match(/^-/))) {
        b32.s = '1';b64.s = '1';
      }
      s = 'binary32: ';
      if ((Math.abs(v) <= 16777215) || isNaN(v) || (!isFinite(v))) {
        s += ctx._cmdFloat(b32, 8, 23, 127).s;
      } else {
        s += 'overflow (max 16777215.0)';
      }
      s += '\n\nbinary64: ' + ctx._cmdFloat(b64, 11, 52, 1023).s;
    }
    if (echo) DebugJS._log.mlt(s);
    return v;
  },
  _cmdFloatB: function(bin) {
    var de, df, eb;
    var len = bin.length;
    if (len == 32) {
      de = 8;
      df = 23;
      eb = 127;
    } else if (len == 64) {
      de = 11;
      df = 52;
      eb = 1023;
    } else {
      return null;
    }
    var b = {
      s: bin.substr(0, 1),
      e: bin.substr(1, de),
      f: bin.substr(de + 1, df)
    };
    var o = DebugJS.ctx._cmdFloat(b, de, df, eb);
    var s = 'binary' + len + ': ' + o.s + '\n\n';
    return {v: o.v, s: s};
  },
  _cmdFloatH: function(hex) {
    var len = hex.length;
    if ((len != 8) && (len != 16)) return null;
    return DebugJS.ctx._cmdFloatB(DebugJS.hex2bin(hex));
  },
  _cmdFloat: function(b, de, df, eb) {
    var cSh = '#6cc';
    var cEh = '#8c8';
    var cFh = '#c88';
    var cS = '#8ff';
    var cE = '#afa';
    var cF = '#fbb';
    var h = DebugJS.bin2hex(b.s + b.e + b.f);
    var eDigits = DebugJS.rpad(de + 'bits', ' ', de);
    var q = parseInt(b.e, 2);
    var e = q - eb;
    var ex = q + '(' + (q == 0 ? '+0' : (q < eb ? '' : '+') + e) + ')';
    var v = ((q == 0) ? 0 : DebugJS.fBin2Dec(b.f, e));
    var vl, b2;
    if (DebugJS.isAll1(b.e)) {
      vl = ((parseInt(b.f) == 0) ? 'Infinity' : 'NaN');
    } else {
      vl = v + '';
      if (!vl.match(/\./)) vl += '.0';
      b2 = DebugJS.suppressR('1' + b.f, '0');
      if (v == 0) {
        b2 = '0.0';
      } else if (e < 0) {
        b2 = '0.' + DebugJS.repeatCh('0', (e * (-1) - 1)) + b2;
      } else {
        var bI = b2.substr(0, e + 1);
        var bF = b2.substr(e + 1);
        b2 = bI + '.' + ((bF == '') ? '0' : bF);
      }
    }
    var sn = ((b.s == '1') ? '-' : '');
    var s = '<span style="color:#0ff">' + sn + vl + '</span>\n';
    if (b2) s += '<span style="color:#ddd">' + sn + b2 + '</span>\n';
    s += ' <span style="color:' + cEh + ';">' + ex + '</span>\n';
    s += ' <span style="color:' + cEh + ';">' + eDigits + '</span><span style="color:' + cFh + ';">' + df + 'bits</span>\n';
    s += '<span style="color:' + cSh + ';">s</span><span style="color:' + cEh + ';">' + DebugJS.repeatCh('e', de) + '</span><span style="color:' + cFh + ';">' + DebugJS.repeatCh('f', df) + '</span>\n';
    s += '<span style="color:' + cS + ';">' + b.s + '</span><span style="color:' + cE + ';">' + b.e + '</span><span style="color:' + cF + ';">' + b.f + '</span>\n';
    var a = h.split('');
    s += '<span style="color:#ddd">';
    for (var i = 0; i < a.length; i++) {
      s += a[i] + '   ';
    }
    s += '</span>';
    return {v: v, s: s};
  },

  cmdInject: function(arg, tbl) {
    var a = DebugJS.splitCmdLine(arg);
    var f = a[0].trim();
    var c = a[1];
    if (f && c) {
      try {
        c = eval(c);
        DebugJS.inject(f, c);
      } catch (e) {DebugJS._log.e(e);}
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
      if (json) json = json[1];
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
      } catch (e) {DebugJS._log.e(e);}
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
      var h = DebugJS.formatHex(DebugJS.toHex(v), true, '0x');
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
      var _a = DebugJS.getNonOptVal(arg);
      _n = ((DebugJS.hasOpt(arg, 'b')) ? DebugJS.lenB(_a) : _a.length);
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

  cmdLog: function(arg, tbl, echo) {
    var ctx = DebugJS.ctx;
    var a = DebugJS.splitArgs(arg);
    var fn = {
      bufsize: ctx._cmdLogBufsize,
      copy: ctx._cmdLogCopy,
      dump: ctx._cmdLogDump,
      filter: ctx._cmdLogFilter,
      html: ctx._cmdLogHtml,
      load: ctx._cmdLogLoad,
      preserve: ctx._cmdLogPreserve,
      suspend: ctx._cmdLogSuspend,
      time: ctx._cmdLogTime,
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
    DebugJS.copy(s);
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
      DebugJS.printUsage('log load [-b64] LOG-BUF-JSON');
      return;
    }
    try {
      if (data == null) {
        DebugJS.loadLog(arg);
      } else {
        DebugJS.loadLog(data, true);
      }
      ctx.printLogs();
    } catch (e) {DebugJS._log.e(e);}
  },
  _cmdLogPreserve: function(ctx, arg, echo) {
    var op = DebugJS.splitArgs(arg)[1];
    if (op == 'on') {
      ctx.setLogPreserve(ctx, true);
    } else if (op == 'off') {
      ctx.setLogPreserve(ctx, false);
    } else if (echo) {
      var st = ((ctx.status & DebugJS.ST_LOG_PRESERVED) ? 'on' : 'off');
      DebugJS._log.res(st);
      DebugJS.printUsage('log preserve on|off');
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
  _cmdLogTime: function(ctx, arg) {
    var v = DebugJS.splitArgs(arg)[1];
    if ((v == '0') || (v == '1') || (v == '2')) {
      ctx.setLogTimestamp(ctx, v | 0);
    } else {
      DebugJS.printUsage('log date 0|1|2');
    }
    ctx.printLogs();
    return ctx.opt.showTimestamp;
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
    var now = Date.now();
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
      dt = DebugJS.getDateTime(now + ms);
      t = {time: dt.time, t: 'T' + dt.hh + dt.mi + dt.ss};
    } else if (DebugJS.isNum(v)) {
      dt = DebugJS.getDateTime(now + (v | 0));
      t = {time: dt.time, t: 'T' + dt.hh + dt.mi + dt.ss};
    } else {
      DebugJS.printUsage(tbl.help);
      return '';
    }
    if (p) DebugJS.log.res(DebugJS.getDateTimeStr(t.time, 2));
    return t.t;
  },

  cmdNow: function(arg, tbl, echo) {
    var t = Date.now();
    if (echo) DebugJS._log.res(t);
    return t;
  },

  cmdNum: function(arg, tbl) {
    var v = DebugJS.getNonOptVals(arg, true);
    var z = DebugJS.hasOpt(arg, 'z');
    var s = '';
    if (v.length == 0) {
      DebugJS.printUsage(tbl.help);
    } else {
      var v1 = v[0] | 0;
      var v2 = v1;
      var st = 1;
      if (v[1] != undefined) v2 = v[1] | 0;
      if (v[2] != undefined) st = v[2] | 0;
      if (st <= 0) st = 1;
      if (v1 < v2) {
        var mxD = DebugJS.digits(v2);
        for (var i = v1; i <= v2; i += st) {
          s += (z ? DebugJS.lpad(i, '0', mxD) : i) + '\n';
        }
      } else {
        mxD = DebugJS.digits(v1);
        for (i = v1; i >= v2; i -= st) {
          s += (z ? DebugJS.lpad(i, '0', mxD) : i) + '\n';
        }
      }
      DebugJS._log.mlt(s);
    }
    return s;
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
    var now = Date.now();
    var ctx = DebugJS.ctx;
    var bat = DebugJS.bat;
    if (tout) {
      if (DebugJS.isTmStr(tout)) {
        tout = DebugJS.str2ms(tout);
      } else if (DebugJS.isTTimeFormat(tout)) {
        tout = DebugJS.calcNextTime(tout).time - now;
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
      bat.ctrl.pauseTimeout = now + tout;
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
    var op = args[0];
    var alignX = DebugJS.getOptVal(arg, 'alignX');
    var alignY = DebugJS.getOptVal(arg, 'alignY');
    var ret;
    if (op == 'init') {
      point.init(DebugJS.hasOpt(arg, 'a'));
    } else if (op == 'move') {
      ctx._cmdPointMove(ctx, arg, tbl, args);
    } else if (op == 'byattr') {
      ctx._cmdPointByAttr(args, alignX, alignY);
    } else if (op == 'bytext') {
      ctx._cmdPointByText(args, alignX, alignY);
    } else if (op.match(/^node/)) {
      ctx._cmdPointNodeRel(ctx, point, args, alignX, alignY);
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
    if (tgt == undefined) {DebugJS.printUsage(tbl.help);return;}
    var idx;
    var speed = DebugJS.getOptVal(arg, 'speed');
    var step = DebugJS.getOptVal(arg, 'step');
    var alignX = DebugJS.getOptVal(arg, 'alignX');
    var alignY = DebugJS.getOptVal(arg, 'alignY');
    var p = ctx._cmdPointCalcPos(ctx, args[1], args[2]);
    if (p) {
      point.move(p.x, p.y, speed, step);
    } else if (tgt == 'byattr') {
      var attr = args[2];
      var v = args[3];
      idx = args[4] | 0;
      try {v = eval(v);} catch (e) {DebugJS._log.e(e);return;}
      point.moveToElByAttr(attr, v, idx, speed, step, alignX, alignY);
    } else if (tgt == 'bytext') {
      var txt = args[2];
      idx = args[3] | 0;
      try {txt = eval(txt);} catch (e) {DebugJS._log.e(e);return;}
      point.moveToElByAttr('!txt', txt, idx, speed, step, alignX, alignY);
    } else if (tgt.match(/^node/)) {
      ctx._cmdPointMvNodeRel(ctx, point, tgt, speed, step, alignX, alignY);
    } else if (isNaN(tgt)) {
      idx = args[2];
      if (tgt.charAt(0) == '(') tgt = tgt.substr(1, tgt.length - 2);
      point.moveToSelector(tgt, idx, speed, step, alignX, alignY);
    } else {
      var x = args[1];
      var y = args[2];
      point.move(x, y, speed, step);
    }
  },
  _cmdPointMvNodeRel: function(ctx, point, tgt, speed, step, alignX, alignY) {
    var el = ctx._cmdPointGetTgtNodeRel(ctx, point, tgt);
    if (el) {
      point.moveToSelector(el, 0, speed, step, alignX, alignY);
    } else {
      DebugJS._log.e('Element not found');
    }
  },
  _cmdPointGetTgtNodeRel: function(ctx, point, tgt) {
    tgt = tgt.replace('node', '');
    var f;
    var op = tgt.charAt(0);
    var c = tgt.substr(1) | 0;
    if (!c) c = 1;
    if (op == '+') {
      f = ctx.getNextElm;
    } else if (op == '-') {
      f = ctx.getPrevElm;
    } else {
      DebugJS._log.e('Illegal operator: ' + op);
      return null;
    }
    var el = point.getElementFromCurrentPos();
    if (el) {
      for (var i = 0; i < c; i++) {
        el = f(ctx, el);
      }
    }
    return el;
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
      var tp = ((el && el.type) ? el.type : '');
      DebugJS._log.e('Pointed area is not an input element (' + (el ? el.nodeName : 'null') + (tp ? (' type=' + tp) : '') + ')');
      return;
    }
    var txt = DebugJS.getArgVal(arg, 1);
    var speed = DebugJS.getOptVal(arg, 'speed');
    var step = DebugJS.getOptVal(arg, 'step');
    var start = DebugJS.getOptVal(arg, 'start');
    var end = DebugJS.getOptVal(arg, 'end');
    try {
      DebugJS.setText(el, txt, speed, step, start, end);
    } catch (e) {DebugJS._log.e(e);}
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
  _cmdPointByAttr: function(args, alignX, alignY) {
    var attr = args[1];
    var v = args[2];
    try {v = eval(v);} catch (e) {DebugJS._log.e(e);return;}
    var idx = args[3] | 0;
    DebugJS.pointByAttr(attr, v, idx, alignX, alignY);
  },
  _cmdPointByText: function(args, alignX, alignY) {
    var txt = args[1];
    try {txt = eval(txt);} catch (e) {DebugJS._log.e(e);return;}
    var idx = args[2] | 0;
    DebugJS.pointByAttr('!txt', txt, idx, alignX, alignY);
  },
  _cmdPointNodeRel: function(ctx, point, args, alignX, alignY) {
    var tgt = args[0];
    var el = ctx._cmdPointGetTgtNodeRel(ctx, point, tgt);
    if (el) {
      DebugJS.pointBySelector(el, 0, alignX, alignY);
    } else {
      DebugJS._log.e('Element not found');
    }
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
    } catch (e) {DebugJS._log.e(e);}
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
    if (ctx.status & DebugJS.ST_SW) {
      ctx._cmdSwQ(ctx);
    } else if (ctx.status & DebugJS.ST_KIOSK) {
      ctx._cmdKioskQ(ctx);
    }
  },

  cmdRandom: function(arg, tbl) {
    var a = DebugJS.getNonOptVals(arg, true);
    var min = a[0];
    var max = a[1];
    if (isNaN(min)) min = undefined;
    if (isNaN(max)) max = undefined;
    var o = DebugJS.get1stOpt(arg);
    var r;
    if (o && ((o != 'n') && (o != 's'))) {
      DebugJS.printUsage(tbl.help);
      return;
    } else if (o == 's') {
      var t = DebugJS.getOptVal(arg, 'tbl');
      if (t) {
        try {
          t = eval(t);
        } catch (e) {DebugJS._log.e(e);return;}
      }
      r = DebugJS.getRandomString(min, max, t);
    } else if (a[0] && a[0].match(/^\d+d$/)) {
      var d = a[0].replace(/d/, '') | 0;
      r = DebugJS.getRndNums(d);
    } else {
      r = DebugJS.random(min, max);
    }
    DebugJS._log.res(r);
    return r;
  },

  cmdInt: function(arg, tbl, echo) {
    var v = DebugJS.getNonOptVals(arg, true);
    if (v.length == 0) {
      DebugJS.printUsage(tbl.help);
    } else if (v.length == 1) {
      return DebugJS.cmdInt(v[0], echo);
    }
  },

  cmdRatio: function(v, echo) {
    var ctx = DebugJS.ctx;
    v = DebugJS.delAllSP(v);
    var o = v.split('=');
    var r = null;
    if (o.length != 2) return null;
    var mL = o[0].split(':');
    if (mL.length != 2) return null;
    var mR = o[1].split(':');
    if (mR.length != 2) return null;
    if (mL[0] == 'x') {
      if (!ctx._isNaN(mL[1], mR[0], mR[1])) {
        r = mL[1] * mR[0] / mR[1];
      }
    } else if (mL[1] == 'x') {
      if (!ctx._isNaN(mL[0], mR[0], mR[1])) {
        r = mL[0] * mR[1] / mR[0];
      }
    } else if (mR[0] == 'x') {
      if (!ctx._isNaN(mL[0], mL[1], mR[1])) {
        r = mL[0] * mR[1] / mL[1];
      }
    } else if (mR[1] == 'x') {
      if (!ctx._isNaN(mL[0], mL[1], mR[0])) {
        r = mL[1] * mR[0] / mL[0];
      }
    }
    if (echo) DebugJS._log.res('x=' + r);
    return r;
  },
  _isNaN: function(a, b, c) {
    return (isNaN(a) || isNaN(b) || isNaN(c));
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
    var f = DebugJS['rot' + x];
    if (!f) {
      DebugJS.printUsage(tbl.help);return;
    }
    var n = DebugJS.getOptVal(a, 'n');
    if (n == null) {
      var s = a;
    } else {
      n = +n.replace(/[()]/g, '');
      s = DebugJS.getArgsFrom(a, 2);
    }
    var r = f(s, n);
    if (echo) DebugJS._log.res(r);
    return r;
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
    } catch (e) {DebugJS._log.e(e);}
  },

  cmdSet: function(arg, tbl, echo) {
    var a = DebugJS.splitCmdLineInTwo(arg);
    var nm = a[0];
    var v = a[1].trim();
    if ((nm == '') || (v == '')) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    DebugJS.ctx._cmdSet(DebugJS.ctx, nm, v, echo);
  },
  _cmdSet: function(ctx, nm, val, echo) {
    var props = ctx.props;
    if (props[nm] == undefined) {
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
    var r = val;
    if (ctx.PROPS_CB[nm]) {
      r = ctx.PROPS_CB[nm](ctx, val);
      if (r === undefined) return;
    }
    props[nm] = r;
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
    var tm = DebugJS.timerstr2struct(v);
    ctx.timerSign = tm.sign;
    if (ctx.timerSwInputDiv) {
      ctx.timerTxtHH.value = tm.hh;
      ctx.timerTxtMI.value = tm.mi;
      ctx.timerTxtSS.value = tm.ss;
      ctx.timerTxtSSS.value = tm.sss;
    }
    var sn = tm.sign ? '-' : '+';
    return sn + DebugJS.getTimeStr(tm);
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
    var r = null;
    arg = DebugJS.delAllSP(arg);
    if (!arg.match(/^\d{1,}:{1}\d{2}.*[+\-*/]\d{1,}/)) return r;
    var byDays = false;
    if (arg.match(/d$/i)) {
      byDays = true;
      arg = arg.substr(0, arg.length - 1);
    }
    var ops = arg.match(/[+\-*/]/g);
    var n = ops.length;
    var op = ops[0];
    var opp = arg.indexOf(op);
    var vL = arg.substr(0, opp);
    var p = opp + 1;
    for (var i = 0; i < n; i++) {
      var nOp = ops[i + 1];
      var nOpp = arg.indexOf(nOp, p);
      if (nOp) {
        var ln = nOpp - p;
        var vR = arg.substr(p, ln);
      } else {
        vR = arg.substr(p);
      }
      var fn;
      if (op == '+') {
        fn = DebugJS.addTime;
      } else if (op == '-') {
        fn = DebugJS.subTime;
      } else if (op == '*') {
        fn = DebugJS.mltTime;
      } else {
        fn = DebugJS.divTime;
      }
      if (vR != '') {
        r = fn(vL, vR);
        if (isNaN(r)) {
          r = 'Invalid time format';
          DebugJS._log.e(r);
          return r;
        }
      }
      op = nOp;
      opp = nOpp;
      p = opp + 1;
      vL = r;
    }
    r = DebugJS.fmtCalcTime(r, byDays);
    if (echo) DebugJS._log.res(r);
    return r;
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
        } catch (e) {DebugJS._log.e(e);}
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
      case 'end':
        test.end();
        DebugJS._log('The test has been completed.');
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
    } catch (e) {DebugJS._log.e(e);}
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

  cmdTime: function(arg, tbl) {
    if (DebugJS.countArgs(arg) == 0) {
      DebugJS.printUsage(tbl.help);
      return;
    }
    var t = arg.trim();
    var ms, s;
    if (DebugJS.isTmStr(t)) {
      ms = DebugJS.str2ms(t);
    } else if (DebugJS.isTimerFormat(t)) {
      ms = DebugJS.clock2ms(t);
    } else if (DebugJS.isFloat(t)) {
      ms = DebugJS.float2ms(t);
    } else {
      ms = +t;
    }
    s = DebugJS.ms2str(ms, 1) + ' (' + ms + ' ms)';
    DebugJS._log.res(s);
    return s;
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
    var now = Date.now() + '';
    if (t1 == 'now') t1 = now;
    if (t2 == 'now') t2 = now;
    try {
      s1 = DebugJS.cnv2ms(t1);
      s2 = DebugJS.cnv2ms(t2);
      var s = DebugJS.ms2str(s2 - s1, 0).replace('-', '');
      if (echo) DebugJS._log.res(s);
      return s;
    } catch (e) {DebugJS.printUsage(tbl.help);}
  },

  cmdTimer: function(arg, tbl) {
    var time = DebugJS.time;
    var a = DebugJS.splitArgs(arg);
    var op = a[0];
    var nm = a[1];
    if (nm == undefined) nm = DebugJS.DFLT_TMR_NM;
    switch (op) {
      case 'start':
        time.start(nm);
        break;
      case 'check':
        time.check(nm, true);
        break;
      case 'split':
        time.split(nm, '', false);
        break;
      case 'stop':
        time.end(nm);
        break;
      case 'list':
        time.list();
        break;
      default:
        DebugJS.printUsage(tbl.help);
    }
  },

  cmdToFull: function(arg) {
    var s = DebugJS.toFullWidth(arg);
    DebugJS._log.res(s);
    return s;
  },
  cmdToHalf: function(arg) {
    var s = DebugJS.toHalfWidth(arg);
    DebugJS._log.res(s);
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

  cmdStopwatch: function(arg, tbl, echo) {
    var a = DebugJS.splitArgs(arg);
    var n = 0;
    var op = a[0];
    var v = a[1];
    if (DebugJS.isInt(op)) {
      n = +op;
      op = a[1];
      v = a[2];
    }
    var r;
    if ((op != 't0') && (op != 'value')) v = undefined;
    if (n == 0) {
      r = DebugJS.ctx._cmdStopwatch(op, v);
    } else if (n == 1) {
      r = DebugJS.ctx._cmdStopwatch1(DebugJS.ctx, op, v);
    }
    if (r == undefined) {
      DebugJS.printUsage(tbl.help);
      return r;
    }
    if (op == 'time') r = DebugJS.getTmrStr(r);
    if ((op == 'time') || (op == 'value')) {
      if (echo) DebugJS._log.res(r);
    }
    return r;
  },
  _cmdStopwatch: function(op, v) {
    var stopwatch = DebugJS.stopwatch;
    switch (op) {
      case 'start':
        stopwatch.start(0);
        break;
      case 'stop':
        stopwatch.stop(0);
        break;
      case 'reset':
        stopwatch.reset(0);
        break;
      case 'split':
        stopwatch.split(0);
        break;
      case 'end':
        stopwatch.end(0);
        break;
      case 't0':
        stopwatch.t0(0, v);
        break;
      case 'time':
      case 'value':
        break;
      default:
        return;
    }
    return stopwatch.val(0, v);
  },
  _cmdStopwatch1: function(ctx, op, v) {
    if (!ctx.isAvailableTools(ctx)) return;
    var stopwatch = DebugJS.stopwatch;
    switch (op) {
      case 'start':
        stopwatch(1);
        ctx.startTimerStopwatch();
        break;
      case 'stop':
        stopwatch(1);
        ctx.stopTimerStopwatch();
        break;
      case 'reset':
        stopwatch(1);
        ctx.resetTimerStopwatch();
        break;
      case 'split':
        ctx.splitTimerStopwatch();
        break;
      case 'end':
        stopwatch(1);
        ctx.endTimerStopwatch(ctx);
        break;
      case 't0':
        stopwatch.t0(1, v);
        return ctx._updateTimerStopwatch(ctx);
      case 'time':
        return stopwatch.val(1);
      case 'value':
        stopwatch.val(1, v);
        break;
      default:
        return;
    }
    return ctx._updateTimerStopwatch(ctx);
  },

  cmdStrP: function(arg, tbl, echo) {
    var a = DebugJS.getNonOptVals(arg, true);
    var m = 0;
    if (DebugJS.hasOpt(arg, 'total')) {
      var t = a[0];
      var p = a[1];
      m = 1;
    } else {
      t = a[0];
      p = a[1];
      var p2 = a[2];
      if (DebugJS.hasOpt(arg, 'a')) {
        t = '"' + DebugJS.Aa0 + '"';
        p = a[0];
        p2 = a[1];
      }
      if (p2 == undefined) p2 = p;
    }
    try {
      t = eval(t);
      p = eval(p);
      p2 = eval(p2);
    } catch (e) {
      DebugJS.printUsage(tbl.help);return;
    }
    if (!t || (p == undefined)) {
      DebugJS.printUsage(tbl.help);return;
    }
    var r = '';
    var logFn = DebugJS._log.res;
    if (m) {
      r = DebugJS.strpTotal(t, p);
    } else if (typeof p == 'string') {
      r = DebugJS.strpIndex(t, p);
    } else {
      if (p == p2) {
        r = DebugJS.strp(t, p);
      } else if (p < p2) {
        logFn = DebugJS._log.mlt;
        for (var i = p; i <= p2; i++) {
          r += DebugJS.strp(t, i) + '\n';
        }
      } else {
        logFn = DebugJS._log.mlt;
        for (i = p; i >= p2; i--) {
          r += DebugJS.strp(t, i) + '\n';
        }
      }
    }
    if (echo) logFn(r);
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

  cmdUnicode: function(arg, tbl) {
    var iIdx = 0;
    if (DebugJS.hasOpt(arg, 'd') || DebugJS.hasOpt(arg, 'e')) iIdx++;
    return DebugJS.ctx.execEncAndDec(arg, tbl, true, false, DebugJS.getUnicodeEscSeq, DebugJS.decodeUnicode, iIdx);
  },

  cmdUri: function(arg, tbl, echo) {
    var iIdx = 0;
    if (DebugJS.hasOpt(arg, 'd') || DebugJS.hasOpt(arg, 'e')) iIdx++;
    return DebugJS.ctx.execEncAndDec(arg, tbl, echo, true, DebugJS.encodeUri, DebugJS.decodeUri, iIdx);
  },

  cmdUtf8: function(arg, tbl) {
    try {
      var s = eval(arg);
      if (typeof s == 'string') {
        var bf = DebugJS.UTF8.toByteArray(s);
        DebugJS.ctx._dumpByteSeq(s, bf.length);
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
    var chs = DebugJS.str2arr(str);
    for (var i = 0; i < chs.length; i++) {
      var ch = chs[i];
      var a = DebugJS.UTF8.toByteArray(ch);
      for (var j = 0; j < a.length; j++) {
        var v = a[j];
        s += '[' + DebugJS.lpad(cnt, ' ', DebugJS.digits(len)) + '] ';
        s += DebugJS.toHex(v, true, '0x', 2) + '  ';
        s += DebugJS.lpad(v, ' ', 3) + '  ';
        s += DebugJS.toBin(v);
        if (j == 0) {
          var d = DebugJS.getCodePoint(ch);
          var rf = '&amp;#' + d + ';';
          s += '  ' + DebugJS.getUnicodePoints(ch);
          s += '  ' + DebugJS.lpad(rf, ' ', 12);
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
        ctx.updateWinCtrlBtns();
        ctx.scrollLogBtm(ctx);
        break;
      case 'restore':
        if (ctx.sizeStatus != DebugJS.SIZE_ST_NORMAL) {
          ctx.restoreDbgWin();
          ctx.updateWinCtrlBtns();
        }
        break;
      case 'reset':
        ctx.resetDbgWinSizePos();
        break;
      case 'full':
      case 'expand':
        ctx.expandDbgWin(opt);
        ctx.updateWinCtrlBtns();
    }
  },

  cmdXlsCol: function(arg, tbl) {
    var r;
    if (!arg) {
      DebugJS.printUsage(tbl.help);return;
    }
    arg = DebugJS.unifySP(arg).trim();
    var op;
    if (arg.indexOf('+') >= 0) {
      op = '+';
    } else if (arg.indexOf('-') >= 0) {
      op = '-';
    } else if (arg.indexOf(':') >= 0) {
      op = ':';
    } else if (arg.indexOf(' ') >= 0) {
      op = ' ';
    }
    var v = arg.split(op);
    var a = v[0];
    var b = v[1];
    r = DebugJS.xlsCol(a);
    if (isNaN(a)) {
      if (op == '+') {
        r = DebugJS.xlsCol(r + (b | 0));
      } else if (op == '-') {
        r = DebugJS.xlsCol(r - (b | 0));
      } else if (op == ':') {
        r = DebugJS.ctx._cmdXlsCols(arg);
        DebugJS._log.mlt(r);
        return r;
      } else if (op == ' ') {
        var c = DebugJS.xlsCol(b);
        r = c - r;
        r = (r < 0 ? (r * (-1)) : r) + 1;
      }
    }
    DebugJS._log.res(r);
    return r;
  },
  _cmdXlsCols: function(v) {
    var a = v.split(':');
    var b = a[0];
    var e = a[1];
    if (isNaN(b)) b = DebugJS.xlsColA2N(b);
    if (isNaN(e)) e = DebugJS.xlsColA2N(e);
    b |= 0;
    e |= 0;
    var s = '';
    if (b < e) {
      for (var i = b; i <= e; i++) {
        s += DebugJS.xlsColN2A(i) + '\n';
      }
    } else {
      for (i = b; i >= e; i--) {
        s += DebugJS.xlsColN2A(i) + '\n';
      }
    }
    return s;
  },

  cmdXlsDate: function(arg, tbl) {
    arg = arg.trim();
    if (!arg) {
      DebugJS.printUsage(tbl.help);return;
    }
    var f = (isNaN(arg) ? DebugJS.xlsDateA2N : DebugJS.xlsDateN2A);
    var r = f(arg);
    DebugJS._log.res(r);
    return r;
  },

  cmdXlsTime: function(arg, tbl) {
    arg = arg.trim();
    if (!arg) {
      DebugJS.printUsage(tbl.help);return;
    }
    var f = (isNaN(arg) ? DebugJS.xlsTimeA2N : DebugJS.xlsTimeN2A);
    var r = f(arg);
    DebugJS._log.res(r);
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
      i = ((i == null) ? DebugJS.getArgsFrom(arg, iIdx) : eval(i));
      var ret = fn(i, a1);
      var r = (esc ? DebugJS.escHtml(ret) : ret);
      if (echo) DebugJS._log.res(DebugJS.quoteStrIfNeeded(r));
      return ret;
    } catch (e) {DebugJS._log.e(e);}
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
    var rq = {
      url: url,
      method: method,
      data: data,
      async: false,
      cache: false,
      user: user,
      pass: pass,
      headers: headers,
      withCredentials: true,
      cb: DebugJS.onHttpReqDone
    };
    var r;
    DebugJS.http.echo = echo;
    try {
      r = DebugJS.http(rq);
    } catch (e) {
      DebugJS._log.e(e);
      var baseURI = document.baseURI;
      var re = new RegExp('^' + baseURI + '(.*?)');
      if (!url.match(re)) {
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
        if ((p != null) && !p.hidden) ctx.extHdrPanel.appendChild(p.btn);
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
    var c10a = c10.split(' ');
    var c16 = DebugJS.rgb10to16(c10a[0], c10a[1], c10a[2]);
    hex = '#' + c16.r + c16.g + c16.b;
  }
  return hex;
};

DebugJS.RingBuffer = function(size) {
  this.buf = new Array(size);
  this.len = size;
  this.cnt = 0;
};
DebugJS.RingBuffer.prototype = {
  add: function(data) {
    var i = this.cnt % this.len;
    this.buf[i] = data;
    this.cnt++;
  },
  get: function(idx) {
    if (this.len < this.cnt) {
      idx += this.cnt;
    }
    idx %= this.len;
    return this.buf[idx];
  },
  getAll: function() {
    var bf = [];
    var len = this.cnt;
    var pos = 0;
    if (this.cnt > this.len) {
      len = this.len;
      pos = (this.cnt % len);
    }
    for (var i = 0; i < len; i++) {
      if (pos >= len) pos = 0;
      bf[i] = this.buf[pos];
      pos++;
    }
    return bf;
  },
  set: function(idx, data) {
    var ctx = this;
    var p;
    if (idx < 0) {
      idx *= -1;
      if (((ctx.cnt < ctx.len) && (idx > ctx.cnt)) || ((ctx.cnt >= ctx.len) && (idx > ctx.len))) {
        return;
      }
      p = ctx.cnt - idx;
    } else {
      if (((ctx.cnt < ctx.len) && (idx >= ctx.cnt)) || ((ctx.cnt >= ctx.len) && (idx >= ctx.len))) {
        return;
      }
      p = ctx.cnt - ctx.len;
      if (p < 0) p = 0;
      p += idx;
    }
    var i = p % ctx.len;
    ctx.buf[i] = data;
  },
  clear: function() {
    this.buf = new Array(this.len);
    this.cnt = 0;
  },
  count: function() {
    return this.cnt;
  },
  size: function() {
    return this.len;
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
DebugJS.splitArgs = function(a) {
  return DebugJS.unifySP(a.trim()).split(' ');
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
DebugJS.getOptVal = function(a, opt) {
  var v = DebugJS.getOptVals(a);
  return (v[opt] == undefined ? null : v[opt]);
};
DebugJS.getOptVals = function(args) {
  var i, k, v, nv;
  var o = {'': []};
  if (typeof args == 'string') {
    args = DebugJS.splitCmdLine(args);
  }
  for (i = 0; i < args.length; i++) {
    k = args[i].substr(1);
    if (DebugJS.isOptTkn(args[i])) {
      nv = args[i + 1];
      if ((nv == undefined) || DebugJS.isOptTkn(nv)) {
        v = '';
      } else {
        v = nv;
        i++;
      }
      o[k] = v;
    } else {
      o[''].push(args[i]);
    }
  }
  return o;
};
DebugJS.hasOpt = function(a, opt) {
  var b = false;
  var v = DebugJS.getOptVal(a, opt);
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
  if (i >= 0) r = i + o.length + 1;
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
DebugJS.getNonOptVal = function(a) {
  return DebugJS.getNonOptVals(a, true)[0];
};
DebugJS.getNonOptVals = function(args, all) {
  var a = DebugJS.splitCmdLine(args);
  var r = [];
  if (a[0] == '') return r;
  var pv = '';
  for (var i = 0; i < a.length; i++) {
    var v = a[i];
    if (!DebugJS.isOptTkn(v)) {
      if (all || (!DebugJS.isOptTkn(pv))) r.push(v);
    }
    pv = v;
  }
  return r;
};
DebugJS.isOptTkn = function(s) {
  return ((s.length > 1) && ((s.charAt(0) == '-') && (!s.match(/^-\d+/))) ? true : false);
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
  var pos = {open: -1, close: -1};
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
      if (s[i] == closeCh) pos.close = i;
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

DebugJS.isNumber = function(ch) {
  var c = ch.charCodeAt(0);
  return ((c >= 0x30) && (c <= 0x39));
};
DebugJS.isAlphabet = function(ch) {
  var c = ch.charCodeAt(0);
  return (((c >= 0x41) && (c <= 0x5A)) || ((c >= 0x61) && (c <= 0x7A)));
};
DebugJS.isUpperCase = function(ch) {
  var c = ch.charCodeAt(0);
  return ((c >= 0x41) && (c <= 0x5A));
};
DebugJS.isLowerCase = function(ch) {
  var c = ch.charCodeAt(0);
  return ((c >= 0x61) && (c <= 0x7A));
};
DebugJS.isPunctuation = function(ch) {
  var c = ch.charCodeAt(0);
  if (((c >= 0x20) && (c <= 0x2F)) || ((c >= 0x3A) && (c <= 0x40)) ||
      ((c >= 0x5B) && (c <= 0x60)) || ((c >= 0x7B) && (c <= 0x7E))) {
    return true;
  }
  return false;
};
DebugJS.isNumAlpha = function(ch) {
  return (DebugJS.isNumber(ch) || DebugJS.isAlphabet(ch));
};
DebugJS.isTypographic = function(ch) {
  return (DebugJS.isNumAlpha(ch) || DebugJS.isPunctuation(ch));
};
DebugJS.isNum = function(s) {
  return (s.match(/^-?\d+$/) ? true : false);
};
DebugJS.isInt = function(s) {
  return (s.match(/^-?[\d]+[\d,]*$/) ? true : false);
};
DebugJS.isFloat = function(s) {
  return (s.match(/^[+-]?\d*\.\d*$/) ? true : false);
};
DebugJS.isStr = function(s) {
  s = s.trim();
  return ((s.match(/^".*"$/) || s.match(/^'.*'$/)) ? true : false);
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
DebugJS.trimBlank = function(s) {
  return DebugJS.crlf2lf(s).replace(/[ \t\u3000]+\n/g, '\n');
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
  } else if (typeof dt == 'number') {
    dt = new Date(dt);
  } else if (typeof dt == 'string') {
    var wk = DebugJS.serializeDateTime(dt);
    var _y = wk.substr(0, 4) | 0;
    var _m = wk.substr(4, 2) | 0;
    var _d = wk.substr(6, 2) | 0;
    var _h = wk.substr(8, 2) | 0;
    var _mi = wk.substr(10, 2) | 0;
    var _s = wk.substr(12, 2) | 0;
    var _ms = wk.substr(14, 3);
    dt = new Date(_y, _m - 1, _d, _h, _mi, _s, _ms);
    dt.setFullYear(_y);
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
  if (ms < 10) {ms = '00' + ms;} else if (ms < 100) {ms = '0' + ms;}
  var dateTime = {time: time, offset: offset, yyyy: yyyy, mm: mm, dd: dd, hh: hh, mi: mi, ss: ss, sss: ms, wday: wd};
  return dateTime;
};
DebugJS.serializeDateTime = function(s) {
  var w = s.trim().replace(/\s{2,}/g, ' ').replace(/T/, ' ').replace(/,/, '.');
  if (!w.match(/[-/:]/)) return DebugJS._serializeDateTime(w);
  var prt = w.split(' ');
  var date = prt[0];
  var time = (prt[1] ? prt[1] : '');
  date = date.replace(/\//g, '-');
  prt = date.split('-');
  var y = prt[0];
  var m = DebugJS.lpad(prt[1], '0', 2);
  var d = DebugJS.lpad(prt[2], '0', 2);
  date = y + m + d;
  prt = time.split('.');
  var ms = '';
  if (prt[1]) {
    ms = prt[1];
    time = prt[0];
  }
  prt = time.split(':');
  var hh = prt[0] | 0;
  var mi = prt[1] | 0;
  var ss = prt[2] | 0;
  hh = DebugJS.lpad(hh, '0', 2);
  mi = DebugJS.lpad(mi, '0', 2);
  ss = DebugJS.lpad(ss, '0', 2);
  time = hh + mi + ss + ms;
  return DebugJS._serializeDateTime(date + time);
};
DebugJS._serializeDateTime = function(s) {
  s = s.replace(/-/g, '').replace(/\s/g, '').replace(/:/g, '').replace(/\./g, '');
  return (s + '000000000').substr(0, 17);
};
DebugJS.getClockVal = function() {
  return DebugJS.getDateTime(Date.now() + (+DebugJS.ctx.props.clockoffset));
};
DebugJS.serializedN2clock = function(s) {
  return s.substr(0, 2) + ':' + s.substr(2, 2) + ':' + s.substr(4, 2) + '.' + s.substr(6, 3);
};
DebugJS.getDateWithTimestamp = function(val, iso) {
  var o = DebugJS.getDateTimeAndTimestamp(val, iso);
  var s = o.datetime;
  if (o.f) s += ' (' + o.timestamp + ')';
  return s;
};
DebugJS.getDateTimeAndTimestamp = function(val, iso) {
  val = (val + '').trim().toUpperCase();
  var f = 0;
  if (val && (val.match(/^[+-]\d{4}$/)) || val.match(/^Z$/)) {
    val = Date.now() + val;
    f = 1;
  }
  var dt = val;
  var tz = DebugJS.getLocalTZ();
  if (val === '') {
    dt = Date.now();
  } else {
    var p = DebugJS.tzPos(val);
    if (p != -1) {
      tz = val.substr(p).replace(/:/, '');
      if (tz == 'Z') tz = '+0000';
      dt = val.substr(0, p).trim();
    }
  }
  if (isNaN(dt)) {
    var o = DebugJS._getDateTimeAndTimestamp(dt, tz, iso);
  } else {
    o = {
      timestamp: dt,
      datetime: DebugJS.int2DateStr(dt, tz, iso)
    };
  }
  o.f = ((val === '') || isNaN(dt) || f);
  return o;
};
DebugJS._getDateTimeAndTimestamp = function(v, tz, iso) {
  var _v = v.replace(/-/g, '').replace(/:/g, '');
  if (DebugJS.isTHHMM(_v)) v = DebugJS.today('') + _v;
  var dt = DebugJS.getDateTime(v);
  var loc = DebugJS.jsTzOffset2ms(dt.offset);
  var tgt = DebugJS.tzOffset2ms(tz);
  var df = loc - tgt;
  v = dt.time + df;
  var s = DebugJS.int2DateStr(v, tz, iso);
  return {timestamp: v, datetime: s};
};
DebugJS.isTHHMM = function(v) {
  return ((v.match(/^T\d{4,}$/)) ? true : false);
};
DebugJS.toTimestamp = function(v, now) {
  var t;
  if (isNaN(v)) {
    if (!DebugJS.isDateTimeStr(v + '') && !DebugJS.isTHHMM(v)) return NaN;
    t = DebugJS.getDateTimeAndTimestamp(v).timestamp;
  } else {
    v = parseInt(v);
    t = (v == 0 ? now : v);
  }
  return t;
};
DebugJS.int2DateStr = function(v, tz, iso) {
  tz = DebugJS.toFullTz(tz);
  v += '';
  if (DebugJS.isUnixTm(v)) v = DebugJS.float2ms(v);
  var ms = DebugJS.parseInt(v);
  var dt = new Date(ms);
  var loc = DebugJS.jsTzOffset2ms(dt.getTimezoneOffset());
  var tgt = DebugJS.tzOffset2ms(tz);
  var df = loc - tgt;
  var ts = dt.getTime() - df;
  return DebugJS.getDateTimeStr(ts, 2, iso, tz);
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
  var r = '^\\d{4}[-/]\\d{1,2}[-/]\\d{1,2}[T ]{1,}\\d{1,2}:\\d{2}:?\\d{0,2}.?\\d{0,3}';
  return DebugJS._isDTFmt(s, p, r);
};
DebugJS.isDateTimeFormatIso = function(s, p) {
  if (typeof s != 'string') return false;
  var r = '^\\d{8}T\\d{0,6}[.,]?\\d{0,3}';
  return DebugJS._isDTFmt(s, p, r);
};
DebugJS._isDTFmt = function(s, p, r) {
  if (!p) r += '$';
  return (s.match(new RegExp(r)) ? true : false);
};
DebugJS.tzPos = function(s) {
  var p = -1;
  if ((s.match(/[+-]\d{1,2}\.?\d{0,2}$/)) || (s.match(/[+-]\d{2}:\d{2}$/))) {
    p = s.lastIndexOf('+');
    if (p == -1) p = s.lastIndexOf('-');
  } else if (s.match(/Z$/)) {
    p = s.lastIndexOf('Z');
  }
  return p;
};
DebugJS.isClockFormat = function(v) {
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
  if ((h.length > 2) || (m.length != 2) || (ss.length != 2) || (sss.length != 3)) {
    return false;
  }
  h |= 0;
  m |= 0;
  ss |= 0;
  sss |= 0;
  if (((h < 0) || (h > 23)) || ((m < 0) || (m > 59)) || ((ss < 0) || (ss > 59)) || (sss < 0)) {
    return false;
  }
  return true;
};
DebugJS.isTimerFormat = function(s) {
  return (s.match(/^\d*:?\d{1,2}:\d{2}\.?\d*$/)) ? true : false;
};
DebugJS.isTTimeFormat = function(s) {
  return ((s.match(/^\d{8}T\d{4,6}$/)) || (s.match(/^T[\d*]{4,6}$/))) ? true : false;
};
DebugJS.isDateTimeStr = function(s) {
  var z = DebugJS.tzPos(s);
  if (z != -1) s = s.substr(0, z).trim();
  return (DebugJS.isDateFormat(s) || DebugJS.isDateTimeFormat(s) || DebugJS.isDateTimeFormatIso(s));
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
DebugJS._cmdFmtDate = function(d) {
  if ((d.length == 8) && !isNaN(d)) {
    d = DebugJS.num2date(d);
  } else if (d == 'today') {
    d = DebugJS.today('/');
  }
  return d;
};

DebugJS.getDateTimeStr = function(t, w, iso, tz) {
  var d = DebugJS.getDateTime(t);
  var s;
  if (iso) {
    s = '' + d.yyyy + d.mm + d.dd + 'T' + d.hh + d.mi + d.ss + '.' + d.sss;
    if (tz != undefined) s += tz;
  } else {
    var wd = DebugJS.WDAYS[d.wday];
    s = d.yyyy + '-' + d.mm + '-' + d.dd;
    if (w == 1) s += ' ' + wd;
    s += ' ' + d.hh + ':' + d.mi + ':' + d.ss + '.' + d.sss;
    if (tz != undefined) s += ' ' + DebugJS.nnnn2clock(tz);
    if (w == 2) s += ' ' + wd;
  }
  return s;
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
  var pfx = 'T' + (t.sign ? '-' : '+');
  var s = pfx;
  if (t.d) s += t.d + 'd';
  s += t.hr + ':' + t.mi + ':' + t.ss + '.' + t.sss;
  return s;
};
DebugJS.ms2str = function(v, m) {
  if (m == 1) {
    var o = DebugJS.ms2struct(v);
    var s = (o.sign ? '-' : '');
    if (o.d) s += o.d + 'd ';
    if (o.d || o.hr) s += o.hr + 'h ';
    if (o.d || o.hr || o.mi) s += o.mi + 'm ';
    if (o.d || o.hr || o.mi || o.ss) {
      s += o.ss + 's';
      if (o.sss) s += ' ' + o.sss;
    } else {
      if (o.sss) {
        s += '0.' + ('00' + o.sss).slice(-3).replace(/0+$/, '');
      } else {
        s += '0';
      }
      s += 's';
    }
  } else {
    o = DebugJS.ms2struct(v, true);
    s = (o.sign ? '-' : '');
    if (o.d > 0) s += o.d + 'd ';
    s += o.hr + ':' + o.mi + ':' + o.ss + '.' + o.sss;
  }
  return s;
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
    if (tm.hr < 10) tm.hr = '0' + tm.hr;
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
DebugJS.timerstr2struct = function(str) {
  var wk = str;
  var sn = str.charAt(0);
  var sign = false;
  if (sn == '-') {
    sign = true;
    wk = wk.substr(1);
  } else if (sn == '+') {
    wk = wk.substr(1);
  }
  wk = wk.split(':');
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
    sign: sign,
    hh: DebugJS.nan2zero(h),
    mi: ('00' + mi).slice(-2),
    ss: ('00' + ss).slice(-2),
    sss: ('000' + sss).slice(-3)
  };
  return st;
};
DebugJS.cnv2ms = function(t) {
  var s;
  if (DebugJS.isUnixTm(t)) {
    s = +DebugJS.float2ms(t);
  } else if (DebugJS.isInt(t)) {
    s = +t;
  } else {
    s = (DebugJS.isStr(t) ? eval(t) : t);
    s = s.replace(/,/, '.');
    if (DebugJS.isClockFormat(s)) {
      s = DebugJS.getTimestampOfDay(s);
    } else {
      s = DebugJS.getDateTime(s).time;
    }
  }
  return s;
};
DebugJS.formatTZ = function(v, e) {
  var s = '+';
  v = parseFloat(v);
  if (v < 0) {
    s = '-';
    v *= -1;
  }
  var f = ((v <= 24) ? DebugJS.formatTzH : DebugJS.formatTzM);
  var str = s + f(v);
  if (e) str = DebugJS.nnnn2clock(str);
  return str;
};
DebugJS.formatTzH = function(v) {
  var w = ('' + v).split('.');
  var h = +w[0];
  var m = +('0.' + (w[1] | 0)) * 60;
  return ('0' + h).slice(-2) + ('0' + m).slice(-2);
};
DebugJS.formatTzM = function(v) {
  var h = (v / 60) | 0;
  var m = v - h * 60;
  return ('0' + h).slice(-2) + ('0' + m).slice(-2);
};
DebugJS.getLocalTZ = function() {
  return DebugJS.formatTZ(new Date().getTimezoneOffset() * (-1));
};
DebugJS.getLocalTzName = function() {
  var n = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!n) n = '';
  return n;
};
DebugJS.getTimestampOfDay = function(t, d) {
  if (!d) d = DebugJS.getDateTime();
  if (t.indexOf(':') == 1) t = '0' + t;
  t = t.replace(/:/g, '').replace(/\./g, '');
  var hh = t.substr(0, 2);
  var mi = t.substr(2, 2);
  var ss = t.substr(4, 2);
  var sss = t.substr(6, 3);
  if (ss == '') ss = '00';
  if (sss == '') sss = '000';
  return DebugJS.getTimestamp(d.yyyy, d.mm, d.dd, hh, mi, ss, sss);
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
    t1 = ((now.time > tgt.time) ? tgt.time + 86400000 : tgt.time);
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
    var t = ts[i].replace(/T/, '');
    var tgt = DebugJS.getTimestampOfDay(t, now);
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
  if (m == '**') mi = ((hh == now.hh) ? now.mi : 0);
  var ss = s;
  if (s == '') {
    ss = 0;
  } else if (s == '**') {
    ss = (((hh == now.hh) && (mi == now.mi)) ? now.ss : 0);
  }
  hh |= 0;mi |= 0;ss |= 0;
  var d = DebugJS.getTimestamp(now.yyyy, now.mm, now.dd, hh, mi, ss);
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
    d = DebugJS.getTimestamp(now.yyyy, now.mm, (now.dd | 0) + cf, hh, mi, ss);
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
      d = DebugJS.getTimestamp(now.yyyy, now.mm, (now.dd | 0) + cf, hh, mi, ss);
    }
  }
  var ret = {
    t: 'T' + ('0' + hh).slice(-2) + ('0' + mi).slice(-2) + (s == '' ? '' : ('0' + ss).slice(-2)),
    time: d
  };
  return ret;
};
DebugJS.getTimestamp = function(y, m, d, h, mi, s, ms) {
  y |= 0;
  m |= 0;
  d |= 0;
  h |= 0;
  mi |= 0;
  s |= 0;
  m |= 0;
  ms |= 0;
  return (new Date(y, m - 1, d, h, mi, s)).getTime() + ms;
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
  return +(d * 86400000 + h * 3600000 + m * 60000 + s * 1000);
};

DebugJS.nan2zero = function(v) {
  return (isNaN(v) ? 0 : v);
};

DebugJS.checkModKey = function(e) {
  var c0 = DebugJS.COLOR_INACT;
  var c1 = DebugJS.COLOR_ACTIVE;
  var ctrl = e.ctrlKey ? c1 : c0;
  var shift = e.shiftKey ? c1 : c0;
  var alt = e.altKey ? c1 : c0;
  var meta = e.metaKey ? c1 : c0;
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
    if ((_k == '') && (_opt[_k].length > 0)) _obj = _opt[_k][0];
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
  } catch (e) {DebugJS._log.e(e);}
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
          if ((typeof obj[key] != 'function') || (Object.keys(obj[key]).length > 0)) {
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
  arg.dump += (toJson ? '{}' : v);
  return arg;
};
DebugJS._objDmp1 = function(arg, key, toJson, indent, v) {
  arg.dump += indent;
  if (toJson) {arg.dump += '"';}
  arg.dump += (toJson ? key : DebugJS.escHtml(key));
  if (toJson) {arg.dump += '"';}
  arg.dump += ': ' + (toJson ? '{}' : v);
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
DebugJS.countElements = function(selector, filter, q) {
  if (!selector) selector = '*';
  var cnt = {};
  var el = null;
  var els = [];
  var total = 0;
  if (selector.charAt(0) == '#') {
    el = document.getElementById(selector.substr(1));
  } else {
    if (selector.charAt(0) == '(') selector = selector.substr(1, selector.length - 2);
    els = document.querySelectorAll(selector);
  }
  if (el) DebugJS.getChildElements(el, els);
  if (els) {
    for (var i = 0; i < els.length; i++) {
      el = els[i];
      if (!DebugJS.fltrEl(el, filter)) continue;
      if (cnt[el.tagName] == undefined) cnt[el.tagName] = 0;
      cnt[el.tagName]++;
      total++;
    }
  }
  if (!q) {
    var l = '<table>';
    for (var k in cnt) {
      l += '<tr><td>' + k + '</td><td style="text-align:right">' + cnt[k] + '</td></tr>';
    }
    l += '<tr><td>Total</td><td style="text-align:right">' + total + '</td></tr></table>';
    DebugJS._log.mlt(l);
  }
  return total;
};
DebugJS.fltrEl = function(el, flt) {
  for (var k in flt) {
    if (k == '') continue;
    var v = flt[k];
    try {v = eval(v);} catch (e) {DebugJS._log.e(e);return 0;}
    if (el[k] != v) return 0;
  }
  return 1;
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
      if (p == t) return true;
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

DebugJS.getHTML = function(inB64) {
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
  if (inB64) html = DebugJS.encodeB64(html);
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
  if (rdx == 0) {
    return 0;
  } else if (rdx == 2) {
    v = v.substr(2);
  }
  return parseInt(v, rdx);
};

DebugJS.checkRadix = function(v) {
  if (v.match(/^-{0,1}0x[0-9A-Fa-f\s]+$/i)) {
    return 16;
  } else if (v.match(/^-{0,1}0[0-7\s]+$/i)) {
    return 8;
  } else if (v.match(/^-{0,1}0b[01\s]+$/i)) {
    return 2;
  } else if (v.match(/^-{0,1}[0-9,]+$/)) {
    return 10;
  }
  return 0;
};

DebugJS.arr = {};
DebugJS.arr.pos = function(a, v, f) {
  var r = -1;
  for (var i = 0; i < a.length; i++) {
    if ((!f && (a[i] == v)) || (f && (a[i] === v))) {
      r = i;break;
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
    if (arr[i] == v) arr.splice(i--, 1);
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
DebugJS.arr2set = function(a, f) {
  var s = [];
  for (var i = 0; i < a.length; i++) {
    var v = a[i];
    if (DebugJS.arr.pos(s, v, f) < 0) s.push(v);
  }
  return s;
};

DebugJS.dateSep = function(s, a) {
  if (!a) a = '/';
  s = s.replace(/[^A-Za-z\d\n\s:.]/g, '/');
  s = s.replace(/(\d+)/g, '0$1').replace(/0*(\d{2,})/g, '$1');
  s = s.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d+)/g, '$1/$2/$3 $4:$5:$6.$7');
  s = s.replace(/(\d{4})(\d{2})(\d{2})/g, '$1/$2/$3');
  s = s.replace(/(\d{2})(\d{2})(\d{2})/g, '$1 $2:$3');
  s = s.replace(/(:\d{2})(\d{2})/g, '$1:$2');
  if (a != '/') s = s.replace(/\//g, a);
  return s;
};
DebugJS.lflf2lf = function(s) {
  return DebugJS.trimBlank(s).replace(/\n\n/g, '\n');
};
DebugJS.lf2lflf = function(s) {
  return s.replace(/\n/g, '\n\n');
};
DebugJS.lenMinMax = function(t, f, th) {
  var a = DebugJS.txt2arr(t);
  var c = 0;
  var b = [];
  th |= 0;
  for (var i = 0; i < a.length; i++) {
    var s = a[i];
    if (s) {
      var v = s.length;
      if ((f && (c <= v)) || (!f && ((c == 0) || (c >= v)))) {
        c = v;
        b.push(s);
      }
    }
  }
  var m = [];
  for (i = 0; i < b.length; i++) {
    v = b[i].length;
    if (th > 0) {
      if ((f && v >= th) || (!f && v <= th)) m.push(b[i]);
    } else if (v == c) {
      m.push(b[i]);
    }
  }
  m = DebugJS.arr2set(m);
  return {m: m, c: c};
};
DebugJS.sort = function(s, d, n) {
  if (n > 0) {
    if (isNaN(n)) n = DebugJS.xlsCol(n);
    var a = DebugJS.csv2arr(s, (n | 0), d);
  } else {
    a = DebugJS.txt2arr(s).sort();
    if (d) a.reverse();
  }
  var r = '';
  for (var i = 0; i < a.length; i++) {
    if (a[i] != '') r += a[i] + '\n';
  }
  return r;
};
DebugJS.alignByTab = function(s, n) {
  var a = DebugJS.txt2arr(s);
  if (!n) n = 1;
  var d = ' ';
  var c = [];
  for (var i = 0; i < a.length; i++) {
    var l = a[i].split('\t');
    for (var j = 0; j < l.length; j++) {
      var b = DebugJS.lenW(l[j]);
      if ((c[j] | 0) < b) c[j] = b;
    }
  }
  var r = '';
  for (i = 0; i < a.length; i++) {
    l = a[i].split('\t');
    for (j = 0; j < l.length - 1; j++) {
      r += DebugJS.rpad(l[j], d, c[j] + n);
    }
    r += l[j] + '\n';
  }
  return r;
};
DebugJS.toUnique = function(s, opt) {
  var l = DebugJS.txt2arr(s);
  var o = DebugJS.cntByGrp(l);
  var v = [];
  for (var k in o) {
    v.push({key: k, cnt: o[k]});
  }
  if (opt.count) {
    if (opt.sort == 2) {
      v.sort(function(a, b) {return b.cnt - a.cnt;});
    } else if (opt.sort == 1) {
      v.sort(function(a, b) {return a.cnt - b.cnt;});
    }
  }
  var w = [];
  for (var i = 0; i < v.length; i++) {
    if ((v[i].key != '') || opt.blank) w.push(v[i]);
  }
  if (opt.count) {
    var r = DebugJS.toUniqueCnt(v, w);
  } else {
    r = DebugJS._toUnique(w, opt.sort);
  }
  return r;
};
DebugJS._toUnique = function(w, srt) {
  var b = [];
  for (var i = 0; i < w.length; i++) {
    b.push(w[i].key);
  }
  if (srt == 2) {
    b.sort();
    b.reverse();
  } else if (srt == 1) {
    b.sort();
  }
  var r = '';
  var m = '';
  for (i = 0; i < b.length; i++) {
    m += DebugJS.hlCtrlCh(b[i]) + '\n';
    r += b[i] + '\n';
  }
  return {r: r, m: m};
};
DebugJS.toUniqueCnt = function(v, w) {
  var mxD = 3;
  var mxL = 0;
  for (var i = 0; i < v.length; i++) {
    var d = DebugJS.digits(v[i].cnt);
    var l = DebugJS.lenW(v[i].key);
    if (d > mxD) mxD = d;
    if (l > mxL) mxL = l;
  }
  var idxD = DebugJS.digits(w.length);
  if (idxD < 2) idxD = 2;
  var h = DebugJS.rpad('IDX', ' ', idxD) + ' ' + DebugJS.rpad('VAL', ' ', mxL) + ' CNT\n' + DebugJS.repeatCh('-', idxD + mxL + mxD + 3) + '\n';
  var r = h;
  var m = h;
  for (i = 0; i < w.length; i++) {
    var idx = DebugJS.lpad(i + 1, ' ', idxD);
    var c = DebugJS.lpad(w[i].cnt, ' ', mxD);
    var k = w[i].key;
    var pdLn = mxL - DebugJS.lenW(k);
    var ky = DebugJS.hlCtrlCh(k);
    if ((k == '') || k.match(/\s$|&#x3000$/)) {
      ky = DebugJS.quoteStr(ky);
      pdLn -= 2;
    }
    var pd = DebugJS.repeatCh(' ', pdLn);
    var p = idx + ': ';
    m += p + ky + pd + ' ' + c + '\n';
    r += p + w[i].key + pd + ' ' + c + '\n';
  }
  return {r: r, m: m};
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

DebugJS.csv2arr = function(s, n, desc) {
  var d = ',';
  if (s.match(/\t/)) d = '\t';
  var c = DebugJS._csv2arr(s, d);
  if (n > 0) c = DebugJS.sortCsv(c, n, desc);
  var a = [];
  for (var i = 0; i < c.length; i++) {
    var w = '';
    for (var j = 0; j < c[i].length; j++) {
      if (j > 0) w += d;
      w += c[i][j];
    }
    a.push(w);
  }
  return a;
};
DebugJS._csv2arr = function(s, d) {
  var c = DebugJS.txt2arr(s);
  var a = [];
  for (var i = 0; i < c.length; i++) {
    a.push(DebugJS.splitCsvFields(c[i], d, true));
  }
  return a;
};
DebugJS.splitCsvFields = function(s, d, inclDq) {
  if ((d == '\t') || (!s.match(/"/))) return s.split(d);
  var a = [];
  var p, q;
  var srch = 1;
  for (var i = 0; i < s.length; i++) {
    var ch = s.charAt(i);
    if (srch) {
      srch = 0;
      q = 0;
      p = ((!inclDq && (ch == '"')) ? (i + 1) : i);
    } else {
      if (ch == '"') {
        q++;
      } else if (ch == d) {
        if (inclDq || (q == 0)) {
          DebugJS._pushCsvCol(s, p, i - p, a, inclDq);
          srch = 1;
        } else if ((q % 2) == 1) {
          DebugJS._pushCsvCol(s, p, i - p - 1, a, inclDq);
          srch = 1;
        }
      }
    }
  }
  if (ch != d) {
    var j = ((inclDq || (ch != '"')) ? 0 : 1);
    DebugJS._pushCsvCol(s, p, i - p - j, a, inclDq);
  }
  return a;
};
DebugJS._pushCsvCol = function(s, p, len, a, inclDq) {
  var w = s.substr(p, len);
  if (!inclDq) w = w.replace(/""/g, '"');
  a.push(w);
};
DebugJS.sortCsv = function(c, n, desc) {
  var f = DebugJS._sortCsv;
  n--;
  if (n < 0) n = 0;
  if (desc) {
    c.sort(function(a, b) {return f(b, a, n);});
  } else {
    c.sort(function(a, b) {return f(a, b, n);});
  }
  return c;
};
DebugJS._sortCsv = function(a, b, n) {
  var x = a[n];
  var y = b[n];
  if (x == undefined) x = '';
  if (y == undefined) y = '';
  if (DebugJS.isNum(x) && DebugJS.isNum(y)) return x - y;
  return x.localeCompare(y);
};
DebugJS.padSeq = function(s, n) {
  var f = (DebugJS.isAscii(s) ? 0 : 1);
  var p = '';
  for (var i = (s.length + 1); i <= n; i++) {
    p += (i % 10);
  }
  if (f) p = DebugJS.toFullWidth(p);
  return s + p;
};

DebugJS.printUsage = function(m) {
  DebugJS._log('Usage: ' + m);
};

DebugJS.convRGB = function(v) {
  var boxSize = '0.7em';
  var r = null;
  var s = '<span style="color:' + DebugJS.ctx.opt.logColorE + '">invalid value</span>';
  var span1 = '<span style="vertical-align:top;display:inline-block;height:1em">';
  var rgb;
  if (v.indexOf('#') == 0) {
    rgb = DebugJS.rgb16to10(v);
    if (rgb) {
      r = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
      s = span1 + '<span style="background:rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ');width:' + boxSize + ';height:' + boxSize + ';margin-top:0.2em;display:inline-block"> </span></span> <span style="color:' + DebugJS.COLOR_R + '">' + rgb.r + '</span> <span style="color:' + DebugJS.COLOR_G + '">' + rgb.g + '</span> <span style="color:' + DebugJS.COLOR_B + '">' + rgb.b + '</span>';
    }
  } else {
    v = v.trim().replace(/rgb\(/, '').replace(/\)/, '').replace(/,/g, ' ');
    v = DebugJS.unifySP(v);
    var a = v.split(' ');
    if (a.length == 3) {
      rgb = DebugJS.rgb10to16(a[0], a[1], a[2]);
      if (rgb) {
        r = '#' + rgb.r + rgb.g + rgb.b;
        s = span1 + '<span style="background:#' + rgb.r + rgb.g + rgb.b + ';width:' + boxSize + ';height:' + boxSize + ';margin-top:0.2em;display:inline-block"> </span></span> #<span style="color:' + DebugJS.COLOR_R + '">' + rgb.r + '</span><span style="color:' + DebugJS.COLOR_G + '">' + rgb.g + '</span><span style="color:' + DebugJS.COLOR_B + '">' + rgb.b + '</span>';
      }
    }
  }
  DebugJS._log(s);
  return r;
};
DebugJS.rgb16to10 = function(rgb16) {
  var r16, g16, b16, r10, g10, b10;
  rgb16 = rgb16.replace(/#/, '').replace(/\s/g, '');
  if (rgb16.length == 6) {
    r16 = rgb16.substr(0, 2);
    g16 = rgb16.substr(2, 2);
    b16 = rgb16.substr(4, 2);
  } else if (rgb16.length == 3) {
    r16 = rgb16.substr(0, 1);
    g16 = rgb16.substr(1, 1);
    b16 = rgb16.substr(2, 1);
    r16 += r16;
    g16 += g16;
    b16 += b16;
  } else {
    return null;
  }
  r10 = parseInt(r16, 16);
  g10 = parseInt(g16, 16);
  b10 = parseInt(b16, 16);
  return {r: r10, g: g10, b: b10};
};
DebugJS.rgb10to16 = function(r, g, b) {
  var r16 = ('0' + parseInt(r).toString(16)).slice(-2);
  var g16 = ('0' + parseInt(g).toString(16)).slice(-2);
  var b16 = ('0' + parseInt(b).toString(16)).slice(-2);
  var r0 = r16.charAt(0);
  var r1 = r16.charAt(1);
  var g0 = g16.charAt(0);
  var g1 = g16.charAt(1);
  var b0 = b16.charAt(0);
  var b1 = b16.charAt(1);
  if ((r0 == r1) && (g0 == g1) && (b0 == b1)) {
    r16 = r0;
    g16 = g0;
    b16 = b0;
  }
  return {r: r16, g: g16, b: b16};
};

DebugJS.cmdInt = function(v, echo) {
  v = v.trim().replace(/\s/g, '');
  var rdx = DebugJS.checkRadix(v);
  if (rdx == 10) {
    v = v.replace(/,/g, '');
  } else if ((rdx == 16) || (rdx == 2)) {
    v = v.substr(2);
  } else if (rdx == 8) {
    v = v.substr(1);
  } else {
    return null;
  }
  var val = parseInt(v, rdx);
  if (echo) DebugJS.printRadixConv(val);
  return val;
};
DebugJS.printRadixConv = function(v) {
  var MAX = 0x20000000000000;
  var flDgt = DebugJS.DFLT_UNIT;
  var v2 = DebugJS.cnvBin(v);
  var dgt = v2.length;
  var b = v2;
  if (dgt % flDgt != 0) {
    var pd = flDgt - (dgt % flDgt);
    b = DebugJS.repeatCh('0', pd) + v2;
  }
  var bin = DebugJS.formatBin(b, true, DebugJS.DISP_BIN_DIGITS_THR, dgt);
  var v8 = v.toString(8).replace(/-/, '');
  if (v8.length >= 2) v8 = '0' + v8;
  if (v < 0) v8 = '-' + v8;
  var v16 = DebugJS.bin2hex(v2);
  var hex = DebugJS.formatHex(v16, true);
  if (hex.length >= 2) hex = '0x' + hex;
  var s = 'HEX ' + hex + '\nDEC ' + DebugJS.formatDec(v) + '\nOCT ' + v8 + '\nBIN ' + bin + '\n';
  if (v > MAX) s += '<span style="color:' + DebugJS.ctx.opt.logColorE + '">unsafe</span>';
  DebugJS._log.mlt(s);
};
DebugJS.toBin = function(v) {
  return ('0000000' + v.toString(2)).slice(-8);
};
DebugJS.toHex = function(v, uc, pFix, d) {
  var hex = parseInt(v).toString(16);
  return DebugJS.formatHex(hex, uc, pFix, d);
};
DebugJS.cnvBin = function(val) {
  var v2 = Math.abs(val).toString(2);
  if (val < 0) v2 = DebugJS.cnvNegativeBin(v2);
  return v2;
};
DebugJS.cnvNegativeBin = function(absV2) {
  var absBin = DebugJS.lpad(absV2, '0', 32);
  var p1 = -1;
  for (var i = absBin.length - 1; i >= 0; i--) {
    if (absBin.charAt(i) == '1') {
      p1 = i;
      break;
    }
  }
  var v2 = '';
  for (i = 0; i < p1; i++) {
    var b = absBin.charAt(i);
    v2 += (b == '0' ? '1' : '0');
  }
  for (i = p1; i < absBin.length; i++) {
    v2 += absBin.charAt(i);
  }
  if (absV2.length == 32) v2 = DebugJS.repeatCh('1', 32) + v2;
  return v2;
};
DebugJS.bin2hex = function(b) {
  if ((b.length % 4) != 0) {
    var pd = 4 - (b.length % 4);
    b = DebugJS.repeatCh('0', pd) + b;
  }
  var h = '';
  for (var i = 0; i < b.length; i += 4) {
    var v = b.substr(i, 4);
    var n = parseInt(v, 2);
    h += (isNaN(n) ? ' ' : n.toString(16));
  }
  return h.toUpperCase();
};
DebugJS.hex2bin = function(h) {
  var bin = '';
  for (var i = 0; i < h.length; i++) {
    var b = parseInt(h[i], 16).toString(2);
    if (b == 'NaN') return b;
    bin += DebugJS.lpad(b, '0', 4);
  }
  return bin;
};
DebugJS.toIEEE754Bin = function(v, fmt) {
  var BIAS = (fmt == 32 ? 127 : 1023);
  var EXP = (fmt == 32 ? 8 : 11);
  var DIGITS = (fmt == 32 ? 23 : 52);
  var s = ((v < 0) ? '1' : '0');
  if (v == 0) {
    return {s: s, e: DebugJS.repeatCh('0', EXP), f: DebugJS.repeatCh('0', DIGITS)};
  } else if (isNaN(v)) {
    return {s: s, e: DebugJS.repeatCh('1', EXP), f: DebugJS.repeatCh('x', DIGITS)};
  } else if (!isFinite(v)) {
    return {s: s, e: DebugJS.repeatCh('1', EXP), f: DebugJS.repeatCh('0', DIGITS)};
  }
  var b = v.toString(2);
  var a = b.replace(/-/, '');
  var f = a.replace(/\./, '').replace(/^0+/, '').substr(1, DIGITS);
  var p1 = a.indexOf('1');
  var p2 = a.indexOf('.');
  if (p2 == -1) {
    a += '.0';
    p2 = a.indexOf('.');
  }
  var sft = ((p1 < p2) ? (p2 - 1) : ((p1 - 1) * (-1)));
  var e = (BIAS + sft).toString(2);
  var ee = DebugJS.lpad(e, '0', EXP);
  var ff = DebugJS.rpad(f, '0', DIGITS);
  return {s: s, e: ee, f: ff};
};
DebugJS.fBin2Dec = function(bin, e) {
  bin = '1' + bin;
  var bI = 0;
  var bF;
  if (e < 0) {
    bF = DebugJS.repeatCh('0', (e * (-1) - 1)) + bin;
  } else {
    bI = bin.substr(0, e + 1);
    bF = bin.substr(e + 1);
  }
  return DebugJS._fBin2Dec(bI, bF);
};
DebugJS._fBin2Dec = function(bI, bF) {
  var vI = parseInt(bI, 2);
  var f = 0;
  for (var i = 0; i < bF.length; i++) {
    var b = bF.charAt(i);
    var w = (-1) * (i + 1);
    f += Math.pow(2, w) * ((b == '1') ? 1 : 0);
  }
  return vI + f;
};
DebugJS.isAll1 = function(b) {
  for (var i = 0; i < b.length; i++) {
    if (b[i] != '1') return false;
  }
  return true;
};
DebugJS.suppressR = function(v, c) {
  for (var i = v.length - 1; i >= 0; i--) {
    if (v.charAt(i) != c) break;
  }
  return v.substr(0, i + 1);
};
DebugJS.formatBin = function(v2, grouping, n, hlDigits) {
  var len = v2.length;
  var bin = '';
  if (grouping) {
    if ((hlDigits > 0) && (len > hlDigits)) bin += '<span style="color:#888">';
    for (var i = 0; i < len; i++) {
      if ((i != 0) && ((len - i) % 4 == 0)) bin += ' ';
      bin += v2.charAt(i);
      if ((hlDigits > 0) && ((len - i) == (hlDigits + 1))) bin += '</span>';
    }
  } else {
    bin = v2;
  }
  if ((n) && (len >= n)) {
    bin += ' (' + hlDigits + ' ' + DebugJS.plural('bit', hlDigits) + ')';
  }
  return bin;
};
DebugJS.formatDec = function(v, n) {
  var U = ['\u4E07', '\u5104', '\u5146', '\u4EAC', '\u5793', '\u79ED', '\u7A63', '\u6E9D', '\u6F97', '\u6B63', '\u8F09', '\u6975', '\u6052\u6CB3\u6C99', '\u963F\u50E7\u7947', '\u90A3\u7531\u4ED6', '\u4E0D\u53EF\u601D\u8B70', '\u7121\u91CF\u5927\u6570'];
  if (n == undefined) n = 3;
  v = (v + '').replace(/,/g, '').replace(/^0*/, '');
  if (!v) v = '0';
  if (n == 0) return v;
  var v0 = v;
  var v1 = '';
  if (v.match(/\./)) {
    var a = v.split('.');
    v0 = a[0];
    v1 = '.' + a[1];
  }
  var len = v0.length;
  var r = '';
  for (var i = 0; i < len; i++) {
    if ((i != 0) && ((len - i) % n == 0)) {
      if (!((i == 1) && (v0.charAt(0) == '-'))) {
        if (n == 4) {
          var j = (len - i) / 4;
          if (j <= U.length) r += U[j - 1];
        } else {
          r += ',';
        }
      }
    }
    r += v0.charAt(i);
  }
  r += v1;
  return r;
};
DebugJS.formatDecF = function(v, p, f) {
  var t = {'m': 3, 'milli': 3, 'u': 6, 'micro': 6, 'n': 9, 'nano': 9, 'p': 12, 'pico': 12, 'f': 15, 'femto': 15, 'a': 18, 'atto': 18, 'z': 21, 'zepto': 21, 'y': 24, 'yocto': 24};
  var d = t[p];
  if (!d) return v;
  v = (v + '').replace(/,/g, '').replace(/^0*/, '');
  if (!v) v = '0';
  var a = '0';
  var b = v;
  if (v.length > d) {
    a = v.substr(0, v.length - d);
    b = v.substr(v.length - d);
  }
  b = (DebugJS.repeatCh('0', d) + b).slice(d * -1);
  var w = '';
  for (var i = 0; i < d; i++) {
    if (f && (i > 0) && (i % 3 == 0)) w += ' ';
    w += b.charAt(i);
  }
  return a + '.' + w;
};
DebugJS.formatFloat = function(v) {
  var U = ['m', 'u', 'n', 'p', 'f', 'a', 'z', 'y'];
  var j = 0;
  var a = v.split('.');
  var d = a[0];
  var f = a[1];
  var s = d + '.';
  var e = f.length;
  if ((e % 3) != 0) e += (3 - (e % 3));
  for (var i = 0; i < e; i++) {
    if (i < f.length) {
      if ((i > 0) && ((i % 3) == 0)) s += ' ';
      s += f.substr(i, 1);
    } else {
      s += '0';
    }
  }
  s += '\n';
  s += DebugJS.repeatCh(' ', d.length + 1);
  for (i = 0; i < e; i++) {
    if ((i > 0) && ((i % 3) == 0)) s += ' ';
    if ((i % 3 == 0) && (U[j])) {
      s += U[j];j++;
    } else {
      s += ' ';
    }
  }
  return s;
};
DebugJS.formatHex = function(hex, uc, pFix, d) {
  if (uc) hex = hex.toUpperCase();
  if ((d) && (hex.length < d)) {
    hex = (DebugJS.repeatCh('0', d) + hex).slice(d * (-1));
  }
  if (pFix) hex = pFix + hex;
  return hex;
};
DebugJS.rwx2n = function(a) {
  var M = {r: 4, w: 2, x: 1, '-': 0};
  var n = 0;
  for (var i = 0; i < a.length; i++) {
    n += ((M[a[i]] == undefined) ? 0 : M[a[i]]);
  }
  return n;
};
DebugJS.n2rwx = function(n) {
  if (n > 7) return '???';
  var s = ((n & 4) ? 'r' : '-');
  s += ((n & 2) ? 'w' : '-');
  s += ((n & 1) ? 'x' : '-');
  return s;
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
DebugJS.UTF8.toByteArray = function(s) {
  var a = [];
  if (!s) return a;
  var chs = DebugJS.str2arr(s);
  for (var i = 0; i < chs.length; i++) {
    var ch = chs[i];
    var c = ch.charCodeAt(0);
    if (c <= 0x7F) {
      a.push(c);
    } else {
      var e = encodeURIComponent(ch);
      var w = e.split('%');
      for (var j = 1; j < w.length; j++) {
        a.push(('0x' + w[j]) | 0);
      }
    }
  }
  return a;
};
DebugJS.UTF8.fromByteArray = function(b) {
  if (!b) return null;
  var e = '';
  for (var i = 0; i < b.length; i++) {
    e += '%' + DebugJS.toHex(b[i], true, '', 2);
  }
  return decodeURIComponent(e);
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
  var s = '';
  for (i = 0; i < len; i += 3) {
    s += String.fromCharCode(
      tbl[arr[i] >>> 2],
      tbl[(arr[i] & 3) << 4 | arr[i + 1] >>> 4],
      tbl[(i + 1) < len ? (arr[i + 1] & 15) << 2 | arr[i + 2] >>> 6 : 64],
      tbl[(i + 2) < len ? (arr[i + 2] & 63) : 64]
    );
  }
  return s;
};
DebugJS.Base64.decode = function(s) {
  var arr = [];
  if (s.length == 0) return arr;
  for (var i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i);
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
  for (i = 0; i < s.length; i += 4) {
    for (var j = 0; j < 4; j++) {
      buf[j] = tbl[s.charCodeAt(i + j) || 0];
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
  var a = DebugJS.UTF8.toByteArray(s);
  return DebugJS.BSB64.encode(a, n);
};
DebugJS.decodeBSB64 = function(s, n) {
  if (s.match(/\$\d+$/)) {
    var v = s.split('$');
    s = v[0];
    n = v[1];
  }
  var a = DebugJS.BSB64.decode(s, n);
  return DebugJS.UTF8.fromByteArray(a);
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

DebugJS.rot = function(x, s, n) {
  n = (n == '' ? null : n | 0);
  return DebugJS['rot' + x](s, n);
};
DebugJS.rot5 = function(s, n) {
  if (n == null) n = 5;
  if ((n < -9) || (n > 9)) n = n % 10;
  var r = '';
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    var cc = c.charCodeAt(0);
    if (DebugJS.isNumber(c)) {
      cc += n;
      if (cc > 0x39) {
        cc = 0x2F + (cc - 0x39);
      } else if (cc < 0x30) {
        cc = 0x3A - (0x30 - cc);
      }
    }
    r += String.fromCharCode(cc);
  }
  return r;
};
DebugJS.rot13 = function(s, n) {
  if (n == null) n = 13;
  if ((n < -25) || (n > 25)) n = n % 26;
  var r = '';
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    var cc = c.charCodeAt(0);
    if (DebugJS.isAlphabet(c)) {
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
    }
    r += String.fromCharCode(cc);
  }
  return r;
};
DebugJS.rot18 = function(s, n) {
  return DebugJS.rot5(DebugJS.rot13(s, n), n);
};
DebugJS.rot47 = function(s, n) {
  if (n == null) n = 47;
  if ((n < -93) || (n > 93)) n = n % 94;
  var r = '';
  for (var i = 0; i < s.length; i++) {
    var cc = s.charCodeAt(i);
    if ((cc >= 0x21) && (cc <= 0x7E)) {
      if (n < 0) {
        cc += n;
        if (cc < 0x21) cc = 0x7F - (0x21 - cc);
      } else {
        cc = ((cc - 0x21 + n) % 94) + 0x21;
      }
    }
    r += String.fromCharCode(cc);
  }
  return r;
};

DebugJS.buildDataUrl = function(scheme, data) {
  return (scheme.replace(/,$/, '') + ',' + data);
};
DebugJS.splitDataUrl = function(url) {
  var a = url.split(',');
  var b64cnt = {scheme: a[0], data: (a[1] == undefined ? '' : a[1])};
  return b64cnt;
};
DebugJS.str2binArr = function(str, blkSize, pFix) {
  var a = [];
  for (var i = 0; i < str.length; i += blkSize) {
    var v = str.substr(i, blkSize);
    if (v.length == blkSize) {
      a.push(DebugJS.parseInt(pFix + v));
    }
  }
  return a;
};

DebugJS.decodeUnicode = function(arg) {
  var s = '';
  var a = arg.split(' ');
  for (var i = 0; i < a.length; i++) {
    if (a[i] == '') continue;
    var cdpt = a[i].replace(/^U\+/i, '');
    s += ((cdpt == '20') ? ' ' : '&#x' + cdpt);
  }
  return s;
};
DebugJS.getUnicodePoints = function(s) {
  var cd = '';
  var chs = DebugJS.str2arr(s);
  for (var i = 0; i < chs.length; i++) {
    var p = DebugJS.getCodePoint(chs[i], true);
    if (i > 0) cd += ' ';
    cd += 'U+' + DebugJS.formatHex(p, true, '', 4);
  }
  return cd;
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
DebugJS.getUnicodeEscSeq = function(s) {
  try {
    s = eval(s);
  } catch (e) {
    DebugJS._log.e(e);
    return;
  }
  if (typeof s != 'string') return;
  var r = '';
  var chs = DebugJS.str2arr(s);
  for (var i = 0; i < chs.length; i++) {
    var p = DebugJS.getCodePoint(chs[i], false);
    r += '\\u' + DebugJS.toHex(p, false, '', 4);
  }
  return r;
};

DebugJS.decodeUri = function(s) {
  return decodeURIComponent(s);
};
DebugJS.encodeUri = function(s) {
  return encodeURIComponent(s);
};

DebugJS.hex2base64 = function(h) {
  h = DebugJS.delAllSP(DebugJS.delAllNL(h));
  var b = DebugJS.str2binArr(h, 2, '0x');
  return DebugJS.Base64.encode(b);
};
DebugJS.base642hex = function(s) {
  var b = DebugJS.Base64.decode(s);
  var h = '';
  for (var i = 0; i < b.length; i++) {
    if (i > 0) h += ' ';
    h += DebugJS.toHex(b[i], true, '', 2);
  }
  return h;
};
DebugJS.hex2str = function(h) {
  return DebugJS.decodeB64(DebugJS.hex2base64(h));
};
DebugJS.str2hex = function(s) {
  var h = '';
  var cnt = 0;
  for (var i = 0; i < s.length; i++) {
    var ch = s.charAt(i);
    var a = DebugJS.UTF8.toByteArray(ch);
    for (var j = 0; j < a.length; j++) {
      if (cnt > 0) h += ' ';
      h += DebugJS.toHex(a[j], true, '', 2);
      cnt++;
    }
  }
  return h;
};

DebugJS.clock2ms = function(t) {
  var hour = 0;
  var min = 0;
  var sec = 0;
  var msec = 0;
  var s = '0';
  var times = t.split(':');
  if (times.length == 3) {
    hour = +times[0];
    min = +times[1];
    s = times[2];
  } else if (times.length == 2) {
    hour = +times[0];
    min = +times[1];
  } else {
    return NaN;
  }
  var ss = s.split('.');
  sec = +ss[0];
  if (ss.length >= 2) {
    msec = +(ss[1] + '00').substr(0, 3);
  }
  return (hour * 3600000) + (min * 60000) + (sec * 1000) + msec;
};
DebugJS.str2ms = function(t) {
  var d = 0, h = 0, m = 0, s = 0, ms = 0;
  var i = t.indexOf('d');
  if (i > 0) {
    d = +t.substr(0, i);
    t = t.substr(i + 1);
  }
  i = t.indexOf('h');
  if (i > 0) {
    h = +t.substr(0, i);
    t = t.substr(i + 1);
  }
  i = t.indexOf('m');
  if (i > 0) {
    m = +t.substr(0, i);
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
    s = +s;
  }
  if ((ms == 0) && (!isNaN(t))) ms = t;
  ms = +ms;
  return d * 86400000 + h * 3600000 + m * 60000 + s * 1000 + ms;
};
DebugJS.isTmStr = function(s) {
  s = DebugJS.delAllSP(s + '');
  if (!s.match(/^\d/) || s.match(/[^\d.dhms]/)) return false;
  var m = s.match(/\d*d?\d*h?\d*m?\d*\.?\d?s?/);
  return (isNaN(s) && m && (m != ''));
};
DebugJS.isUnixTm = function(s) {
  return (s.match(/^\d*\.\d*$/) ? true : false);
};

DebugJS.addTime = function(t1, t2) {
  var s1 = (typeof t1 == 'number' ? t1 : DebugJS.clock2ms(t1));
  var s2 = DebugJS.clock2ms(t2);
  if (isNaN(s1) || isNaN(s2)) return NaN;
  return s1 + s2;
};
DebugJS.subTime = function(t1, t2) {
  var s1 = (typeof t1 == 'number' ? t1 : DebugJS.clock2ms(t1));
  var s2 = DebugJS.clock2ms(t2);
  if (isNaN(s1) || isNaN(s2)) return NaN;
  return s1 - s2;
};
DebugJS.mltTime = function(t, v) {
  v |= 0;
  var s = (typeof t == 'number' ? t : DebugJS.clock2ms(t));
  if (isNaN(s)) return NaN;
  return s * v;
};
DebugJS.divTime = function(t, v) {
  v |= 0;
  var s = (typeof t == 'number' ? t : DebugJS.clock2ms(t));
  if (isNaN(s)) return NaN;
  return s / v;
};
DebugJS.fmtCalcTime = function(ms, byDays) {
  var A_DAY = 86400000;
  var s = ms < 0;
  var days = 0;
  if (byDays) {
    if (s) {
      ms *= (-1);
      days = ((ms / A_DAY) | 0);
      days = days + ((ms % A_DAY != 0) ? 1 : 0);
      if ((ms % A_DAY == 0) && (ms != A_DAY)) {
        days += 1;
      }
      ms = A_DAY - (ms - days * A_DAY);
    } else {
      days = (ms / A_DAY) | 0;
      ms -= days * A_DAY;
    }
  }
  var t = DebugJS.ms2struct(ms);
  var hh = (byDays ? t.hr : t.hh);
  if (hh < 10) hh = '0' + hh;
  var r = (t.sign ? '-' : '') + hh + ':' + ('0' + t.mi).slice(-2) + ':' + ('0' + t.ss).slice(-2) + '.' + ('00' + t.sss).slice(-3);
  if (days > 0) {
    r += ' (' + (s ? '-' : '+') + days + ' ' + DebugJS.plural('Day', days) + ')';
  }
  return r;
};
DebugJS.getDiffTimeStr = function(t1, t2) {
  return DebugJS.getTmrStr(t2 - t1);
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
DebugJS.cmdTZedNow = function(t, o) {
  var ts = Date.now();
  t = t.toUpperCase();
  var tz = DebugJS.toFullTz(DebugJS.TZ[t]);
  var os;
  if (o) {
    o = o.replace(/:/, '');
    os = DebugJS.toFullTz(o);
    o = DebugJS.tzOffset2ms(os) | 0;
    os = os.substr(0, 3) + ':' + os.substr(3);
    ts += o;
  }
  var r = DebugJS.int2DateStr(ts, tz, false);
  if ((t == 'UTC') && os) r = r.replace('+00:00', os);
  DebugJS._log.res(r);
  return r;
};
DebugJS.toFullTz = function(t) {
  if (t.match(/\./)) {
    var p = t.split('.');
    t = p[0] + ('0' + (+('0.' + p[1]) * 60)).slice(-2);
  }
  var s = t.charAt(0);
  if (t.length == 1) {
    t = '+0' + t + '00';
  } else if (t.length == 2) {
    t = ((s.match(/\d/)) ? '+' + t + '00' : s + '0' + t.charAt(1) + '00');
  } else if (t.length == 3) {
    t += '00';
  } else if (t.length == 4) {
    t = s + '0' + t.charAt(1) + t.substr(2);
  }
  return t;
};
DebugJS.nnnn2clock = function(s) {
  return s.substr(0, 3) + ':' + s.substr(3, 2);
};
DebugJS.isSTN = function(s) {
  s = s.toUpperCase();
  for (var k in DebugJS.TZ) {
    if (s == k) return true;
  }
  return false;
};

DebugJS.isURIencoding = function(s) {
  return s.match(/^(%[A-Fa-f0-9][A-Fa-f0-9])+$/) ? true : false;
};

DebugJS.cmdByte = function(s, echo) {
  s = s.toUpperCase().replace(/,/g, '');
  var v = s.match(/\d+\.?\d*/)[0];
  var u = s.match(/[KMGTP]/);
  var p = (u ? u[0] : '');
  var c = {P: 5, T: 4, G: 3, M: 2, K: 1};
  if (c[p]) v *= Math.pow(1024, c[p]);
  return DebugJS._cmdByte(v, echo);
};
DebugJS._cmdByte = function(v, echo) {
  var U = ['', 'K', 'M', 'G', 'T', 'P'];
  var b = '';
  for (var i = 5; i >= 1; i--) {
    var c = Math.pow(1024, i);
    if (v >= c) {
      var w = v / c;
      b += DebugJS.formatDec(DebugJS.round(w, 2)) + ' ' + U[i] + 'B\n';
    }
  }
  b += DebugJS.formatDec(v) + '&nbsp;&nbsp;B';
  var m = v % 1024;
  var a;
  if ((m == 0) && (v != 0)) {
    a = '=';
  } else if ((m == 1) && (v != 1)) {
    a = '(+1)';
  } else if (m == 1023) {
    a = '(-1)';
  }
  var s = '<span style="display:inline-block;text-align:right;">' + b + '</span>';
  if (a) s += '<span style="display:inline-block;"> ' + a + '</span>';
  if (echo) DebugJS._log.mlt(s);
  return v;
};
DebugJS.cmdFactorial = function(n, echo) {
  var v = DebugJS.factorial(n);
  if (echo) DebugJS._log.res(v);
  return v;
};
DebugJS.factorial = function(n) {
  var v = 1;
  for (var i = n; i >= 1; i--) {
    v *= i;
  }
  return v;
};
DebugJS.cmdPerm = function(s, echo) {
  var a = s.toLowerCase().split('p');
  var v = DebugJS.permutation(+a[0], +a[1]);
  if (echo) DebugJS._log.res(v);
  return v;
};
DebugJS.permutation = function(n, r) {
  var v = 1;
  for (var i = 0; i < r; i++) {
    v *= (n - i);
  }
  return v;
};
DebugJS.cmdCombi = function(s, echo) {
  var a = s.toLowerCase().split('c');
  var v = DebugJS.combination(+a[0], +a[1]);
  if (echo) DebugJS._log.res(v);
  return v;
};
DebugJS.combination = function(n, r) {
  return DebugJS.permutation(n, r) / DebugJS.factorial(r);
};

DebugJS.cmdMultiChoose = function(s, echo) {
  var a = s.toLowerCase().split('h');
  var v = DebugJS.multiChoose(+a[0], +a[1]);
  if (echo) DebugJS._log.res(v);
  return v;
};
DebugJS.multiChoose = function(n, r) {
  return DebugJS.combination(n + r - 1, r);
};

DebugJS.round = function(num, precision) {
  precision |= 0;
  return DebugJS._shift(Math.round(DebugJS._shift(num, precision, false)), precision, true);
};
DebugJS._shift = function(num, precision, rvsShift) {
  if (rvsShift) precision = -precision;
  var numArr = ('' + num).split('e');
  return +(numArr[0] + 'e' + (numArr[1] ? (+numArr[1] + precision) : precision));
};

DebugJS.random = function(min, max) {
  if (isNaN(min)) {
    min = 0;
    max = 0x7fffffff;
  } else if (isNaN(max)) {
    max = min;
    min = 0;
  }
  return DebugJS._random(min, max);
};
DebugJS._random = function(min, max) {
  min = parseInt(min);
  max = parseInt(max);
  return parseInt(Math.random() * (max - min + 1)) + min;
};

DebugJS.getRndNums = function(d) {
  var n = '';
  for (var i = 0; i < d; i++) {
    n += DebugJS._random(0, 9);
  }
  return n;
};
DebugJS.getRandomString = function(min, max, tbl) {
  var DFLT_MAX_LEN = 8;
  if (!tbl) tbl = DebugJS.Aa0;
  if (typeof tbl == 'string') tbl = tbl.split('');
  if (min == undefined) {
    min = DFLT_MAX_LEN;
    max = min;
  }
  if (max == undefined) max = min;
  var s = '';
  var len = DebugJS._random(min, max);
  if (tbl.length > 0) {
    for (var i = 0; i < len; i++) {
      s += tbl[Math.floor(Math.random() * tbl.length)];
    }
  }
  return s;
};

DebugJS.http = function(req) {
  if (!req.method) req.method = 'GET';
  req.method = req.method.toUpperCase();
  var data = (((req.data != undefined) && (req.data != '')) ? req.data : null);
  if (data instanceof Object) data = DebugJS.http.buildQueryString(data);
  var url = req.url;
  if (data && (req.method == 'GET')) {
    url += '?' + data;
    data = null;
  }
  if (req.async == undefined) req.async = true;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var res = xhr.responseText;
      if (DebugJS.http.logging && !req.sys) {
        var m = res;
        if (m) {
          if (m.length > DebugJS.http.LOG_LIMIT) {
            m = '(size=' + m.length + ')';
          } else if (m.length > DebugJS.http.maxLogLen) {
            m = m.substr(0, DebugJS.http.maxLogLen) + '...';
          }
        }
        m = DebugJS.escHtml(m);
        DebugJS.log.v('<= ' + m);
      }
      if (req.cb) req.cb(xhr, res, req);
    }
  };
  xhr.open(req.method, url, req.async, req.user, req.pass);
  var contentType = 'application/x-www-form-urlencoded';
  if (req.contentType) contentType = req.contentType;
  xhr.setRequestHeader('Content-Type', contentType);
  if (!req.cache) {
    xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT');
  }
  for (var k in req.headers) {
    xhr.setRequestHeader(k, req.headers[k]);
  }
  if (req.withCredentials) xhr.withCredentials = true;
  if (DebugJS.http.logging && !req.sys) {
    DebugJS.log.v('=> ' + url);
    if (data) DebugJS.log.v('[DATA] ' + data.substr(0, DebugJS.http.maxLogLen));
  }
  xhr.send(data);
  return xhr;
};
DebugJS.http.buildQueryString = function(p) {
  var s = '';
  var cnt = 0;
  for (var k in p) {
    if (cnt > 0) s += '&';
    s += k + '=' + encodeURIComponent(p[k]);
    cnt++;
  }
  return s;
};
DebugJS.onHttpReqDone = function(xhr) {
  var echo = DebugJS.http.echo;
  var stmsg = xhr.status + ' ' + xhr.statusText;
  if (xhr.status == 0) {
    if (echo) DebugJS._log.e('Cannot load: ' + stmsg);
  }
  var hd = xhr.getAllResponseHeaders();
  var bd = DebugJS.escHtml(xhr.responseText);
  if (hd || bd) {
    var r = '<span style="color:#5ff">' + stmsg + '\n' + hd + '</span>' + bd;
    if (echo) DebugJS._log.mlt(r);
  }
};
DebugJS.http.echo = true;
DebugJS.http.logging = true;
DebugJS.http.LOG_LIMIT = 3145728;
DebugJS.http.maxLogLen = 4096;

DebugJS.encodeURIString = function(s) {
  var r = encodeURIComponent(s);
  return r.replace(/%20/g, '+').replace(/%3D/gi, '=').replace(/%26/g, '&');
};

DebugJS.getWinZoomRatio = function() {
  return Math.round(window.devicePixelRatio * 100) + '%';
};

DebugJS.getLanguages = function(indent) {
  var langs;
  var navLngs = navigator.languages;
  if (navLngs) {
    for (var i = 0; i < navLngs.length; i++) {
      if (i == 0) {
        langs = '[' + i + '] ' + navLngs[i];
      } else {
        langs += '\n' + indent + '[' + i + '] ' + navLngs[i];
      }
    }
  } else {
    langs = DebugJS.setStyleIfObjNA(navLngs);
  }
  return langs;
};

DebugJS.getBrowserType = function() {
  var ua = navigator.userAgent;
  var ver;
  var brws = {name: '', version: ''};
  if (ua.indexOf('Edge') >= 1) {
    brws.name = 'Edge Legacy';
    ver = ua.match(/Edge\/(.*)/);
    if (ver) brws.version = ver[1];
    return brws;
  }
  if (ua.indexOf('Edg') >= 1) {
    brws.name = 'Edge';
    ver = ua.match(/Edg\/(.*)/);
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
    brws.name = 'IE11';brws.family = 'IE';return brws;
  }
  if ((ua.indexOf('Safari/') >= 1) && (ua.indexOf('Version/') >= 1)) {
    brws.name = 'Safari';
    ver = ua.match(/Version\/(.*)\sSafari/);
    if (ver) brws.version = ver[1];
    return brws;
  }
  return brws;
};
DebugJS.browserColoring = function(n) {
  var s = n;
  switch (n) {
    case 'Chrome':
      s = '<span style="color:#f44">Ch</span><span style="color:#ff0">ro</span><span style="color:#4f4">m</span><span style="color:#6cf">e</span>';
      break;
    case 'Edge Legacy':
      s = '<span style="color:#0af">Edge</span>';
      break;
    case 'Edge':
      s = '<span style="color:#4e7">E</span><span style="color:#3df">d</span><span style="color:#0af">ge</span>';
      break;
    case 'Firefox':
      s = '<span style="color:#e57f25">' + n + '</span>';
      break;
    case 'Opera':
      s = '<span style="color:#f44">' + n + '</span>';
      break;
    case 'IE11':
      s = '<span style="color:#61d5f8">' + n + '</span>';
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
DebugJS.countLineBreak = function(s) {
  return (s.match(/\n/g) || []).length;
};
DebugJS.clipTextLine = function(s, p) {
  var n = s.indexOf('\n', p);
  if (n > 0) s = s.substr(0, n);
  return s.replace(/.*\n/g, '');
};
DebugJS.capitalize = function(s) {
  return ((s && (typeof s == 'string')) ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s);
};
DebugJS.str2arr = function(s) {
  return s.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]/g) || [];
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
DebugJS.lpad = function(s, c, l) {
  s += '';
  var d = l - DebugJS.lenW(s);
  if (d <= 0) return s;
  var p = DebugJS.repeatCh(c, d);
  return (p + s);
};
DebugJS.rpad = function(s, c, l) {
  s += '';
  var d = l - DebugJS.lenW(s);
  if (d <= 0) return s;
  var p = DebugJS.repeatCh(c, d);
  return (s += p);
};
DebugJS.repeatCh = function(c, n) {
  var s = '';
  for (var i = 0; i < n; i++) s += c;
  return s;
};
DebugJS.crlf2lf = function(s) {
  return s.replace(/\r\n/g, '\n');
};
DebugJS.chars = function(c1, c2) {
  var p1 = c1, p2 = c2;
  if (typeof c1 == 'string') {
    c1 = c1.replace(/^U\+/i, '0x');
    if (!isNaN(c1) && c1.match(/^0x/)) {
      p1 = c1 | 0;
    } else {
      p1 = DebugJS.getCodePoint(c1);
    }
  }
  if (!c2) p2 = p1;
  if (typeof c2 == 'string') {
    c2 = c2.replace(/^U\+/i, '0x');
    if (!isNaN(c2) && c2.match(/^0x/)) {
      p2 = c2 | 0;
    } else {
      p2 = DebugJS.getCodePoint(c2);
    }
  }
  var s = '';
  if (p1 > p2) {
    for (var i = p1; i >= p2; i--) {
      if (String.fromCodePoint) {
        s += String.fromCodePoint(i);
      } else {
        s += String.fromCharCode(i);
      }
    }
  } else {
    for (i = p1; i <= p2; i++) {
      if (String.fromCodePoint) {
        s += String.fromCodePoint(i);
      } else {
        s += String.fromCharCode(i);
      }
    }
  }
  return s;
};
DebugJS.plural = function(s, n) {
  return (n == 1 ? s : (s + 's'));
};
DebugJS.toHalfWidth = function(s) {
  var h = s.replace(/\u3000/g, ' ').replace(/\u201D/g, '"').replace(/\u2019/g, '\'').replace(/\u2018/g, '`').replace(/\uFFE5/g, '\\');
  h = h.replace(/[\uFF01-\uFF5E]/g, DebugJS.shift2half);
  return h;
};
DebugJS.shift2half = function(w) {
  return String.fromCharCode(w.charCodeAt(0) - 65248);
};
DebugJS.toFullWidth = function(s) {
  var f = s.replace(/ /g, '\u3000').replace(/"/g, '\u201D').replace(/'/g, '\u2019').replace(/`/g, '\u2018').replace(/\\/g, '\uFFE5');
  f = f.replace(/[!-~]/g, DebugJS.shift2full);
  return f;
};
DebugJS.shift2full = function(w) {
  return String.fromCharCode(w.charCodeAt(0) + 65248);
};
DebugJS.lenB = function(s) {
  return (new Blob([s], {type: 'text/plain'})).size;
};
DebugJS.lenW = function(s) {
  var n = 0;
  for (var i = 0; i < s.length; i++) {
    var p = String.prototype.codePointAt ? s.codePointAt(i) : s.charCodeAt(i);
    n += ((p <= 0x7F) || ((p >= 0xFF61) && (p <= 0xFF9F))) ? 1 : 2;
    if (p >= 0x10000) i++;
  }
  return n;
};
DebugJS.isAscii = function(s) {
  return (s.match(/^[\x00-\x7F]*$/) ? true : false);
};
DebugJS.txt2arr = function(s) {
  var a = DebugJS.crlf2lf(s).split('\n');
  var i = a.length - 1;
  if (a[i] == '') a.splice(i, 1);
  return a;
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
          b += '.';
        }
    }
  }
  return b;
};
DebugJS.shaAvailable = function() {
  return window.jsSHA ? true : false;
};
DebugJS.getSHA = function(a, b) {
  if (!DebugJS.shaAvailable()) return '';
  var s = new window.jsSHA(a, 'UINT8ARRAY');
  s.update(b);
  return s.getHash('HEX');
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
  el.classList.add(n);
};
DebugJS.removeClass = function(el, n) {
  el.classList.remove(n);
};
DebugJS.hasClass = function(el, n) {
  return el.classList.contains(n);
};
DebugJS.setStyle = function(e, s, v) {
  if (typeof s == 'string') {
    e.style.setProperty(s, v, 'important');
    return;
  }
  for (var k in s) {
    if (v) {
      e.style[k] = s[k];
    } else {
      DebugJS.setStyle(e, k, s[k]);
    }
  }
};
DebugJS.insertText = function(el, s) {
  var v = el.value;
  var p = el.selectionStart;
  var vL = v.substr(0, p);
  var vR = v.substr(p, v.length);
  el.focus();
  el.value = vL + s + vR;
  el.selectionStart = el.selectionEnd = p + s.length;
};

DebugJS.copyProp = function(src, dst) {
  for (var k in src) {
    dst[k] = src[k];
  }
};

DebugJS.sleep = function(ms) {
  var t1 = Date.now();
  ms |= 0;
  while (true) {
    var t2 = Date.now();
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
  var dt = DebugJS.getDateTimeStr(lastMod, 2);
  var s = 'File    : ' + file.name + '\n' +
  'Type    : ' + file.type + '\n' +
  'Size    : ' + DebugJS.formatDec(file.size) + ' ' + DebugJS.plural('byte', file.size) + '\n' +
  'Modified: ' + dt + '\n';
  return s;
};
DebugJS.getBinInfo = function(b) {
  var s = '';
  var t = DebugJS.getBinType(b);
  if (t) s = DebugJS._getBinInfo[t](b) + '\n';
  return s;
};
DebugJS.getBinType = function(b) {
  var H = {exe: 0x4D5A, java: 0xCAFEBABE};
  var t = '';
  for (var k in H) {
    if (DebugJS.chkBinHdr(b, H[k])) {t = k;break;}
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
    if (j) r += 'Java ver: Java SE ' + j + ' = ' + v + ' (' + DebugJS.toHex(v, true, '0x', 2) + ')';
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

DebugJS.chkKeyCmb = function(cnd, e) {
  return (((cnd.ctrl == undefined) || (cnd.ctrl == e.ctrlKey)) &&
         ((cnd.shift == undefined) || (cnd.shift == e.shiftKey)) &&
         ((cnd.alt == undefined) || (cnd.alt == e.altKey)) &&
         ((cnd.meta == undefined) || (cnd.meta == e.metaKey)));
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
  var b = DebugJS.buildLogData(extInfo, flg);
  var data = DebugJS.http.buildQueryString(param);
  if (data != '') data += '&';
  if (DebugJS.isEmptyVal(pName)) pName = 'data';
  data += pName + '=' + encodeURIComponent(b);
  var r = {
    url: url,
    method: 'POST',
    data: data,
    cb: (cb ? cb : DebugJS.sendLogCb),
    sys: 1
  };
  DebugJS.http(r);
};
DebugJS.sendLogCb = function(xhr) {
  var st = xhr.status;
  if (st == 200) {
    DebugJS._log('Send Log OK');
  } else {
    DebugJS._log.e('Send Log ERR (' + st + ')');
  }
};
DebugJS.buildLogData = function(extInfo, flg) {
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
    b += LINE + DebugJS.buildLogHeader() + LINE;
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
DebugJS.buildLogHeader = function() {
  var dt = DebugJS.getDateTime();
  var brw = DebugJS.getBrowserType();
  var s = 'Sending Time : ' + DebugJS.getDateTimeStr(dt.time) + ' ' + DebugJS.formatTZ(dt.offset, true) + ' (' + DebugJS.getLocalTzName() + ')\n';
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
    timerSwVal: ctx.timerSwVal,
    timerStartedV: ctx.timerStartedV,
    timerSwT0: ctx.timerSwT0,
    timerSwPrevSplit: ctx.timerSwPrevSplit,
    timerSplitF: ctx.timerSplitF,
    timerContinueTplus: ctx.timerContinueTplus,
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

DebugJS.getAllCookie = function() {
  var a = document.cookie.replace(/\s/g, '').split(';');
  var c = {};
  for (var i = 0; i < a.length; i++) {
    var nv = a[i].split('=');
    if (nv[1] == undefined) {
      if (nv[0] != '') c[''] = nv[0];
    } else {
      c[nv[0]] = nv[1];
    }
  }
  return c;
};
DebugJS.getCookie = function(k) {
  var c = DebugJS.getAllCookie();
  if (k) return c[k];
  return c;
};
DebugJS.getCookieKeys = function() {
  return DebugJS.getKeys(DebugJS.getAllCookie());
};
DebugJS.setCookie = function(k, v) {
  document.cookie = ((v == undefined) ? k : (k + '=' + v));
};
DebugJS.deleteCookie = function(k) {
  var v = '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  if (k) {
    document.cookie = k + v;
  } else {
    var keys = DebugJS.getCookieKeys();
    for (var i = 0; i < keys.length; i++) {
      document.cookie = keys[i] + v;
    }
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
DebugJS.isTargetEl = function(el, tgt) {
  do {
    if (el == tgt) return true;
    el = el.parentNode;
  } while (el != null);
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
DebugJS.setWindowSize = function(a, b) {
  if (b) {
    DebugJS.ctx._cmdDbgWinSize(DebugJS.ctx, a, b);
  } else {
    DebugJS.ctx.setWinSize(a);
  }
};
DebugJS.setWindowPos = function(x, y) {
  DebugJS.ctx._cmdDbgWinPos(DebugJS.ctx, x, y);
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
    uiStatus: ctx.uiStatus,
    sizeStatus: ctx.sizeStatus
  };
  ctx.featStackBak = ctx.featStack.concat();
  ctx.finalizeFeatures(ctx);
  ctx.setWinSize('normal');
  ctx.zoom = n;
  ctx.init(null, rstrOpt);
  return n;
};
DebugJS.showHeaderInfo = function(f) {
  DebugJS.ctx.showHeaderInfo(f);
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
DebugJS._log.t = function(m, t) {
  var now = Date.now();
  var ctx = DebugJS.ctx;
  var nm = '_log_';
  var tmr = ctx.timers[nm];
  if (!tmr) {
    tmr = {start: now, split: now};
    ctx.timers[nm] = tmr;
  }
  if (t != undefined) {
    var v = now - t;
    tmr.start = v;
    tmr.split = v;
  }
  var elps = DebugJS.getDiffTimeStr(tmr.start, now);
  var dlta = DebugJS.getDiffTimeStr(tmr.split, now).substr(2);
  tmr.split = now;

  var tm = '<span style="color:' + ctx.opt.timerColor + '">' + elps + '</span>';
  var dt = '(' + DebugJS.CHR_DELTA + '<span style="color:' + ctx.opt.timerColor + '">' + dlta + '</span>)';
  m = DebugJS.setStyleIfObjNA(m);
  if (m instanceof Object) m = DebugJS.objDump(m, false, 0, ctx.props.dumplimit, ctx.props.dumpvallen);
  var s = tm + ' ' + m.replace(/%dt/g, dt);
  DebugJS._log(s);
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
DebugJS._log.resQ = function(m) {
  DebugJS._log.res(DebugJS.quoteStr(m));
};
DebugJS._log.mlt = function(m) {
  DebugJS._log.out(m, DebugJS.LOG_TYPE_MLT);
};
DebugJS._log.out = function(m, type) {
  m = DebugJS.setStyleIfObjNA(m);
  if (typeof m != 'string') {m = m.toString();}
  var data = {type: type, time: Date.now(), msg: m};
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
  return (a[a.length - 2] | 0);
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
      if ((p.length >= 2) && (p.length != 4)) n = p[p.length - 2];
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
  } catch (e) {DebugJS._log.e(e);}
};
DebugJS.stk = function(fn) {
  DebugJS.inject(fn, 'DebugJS.stack();');
};

DebugJS.time = {};
DebugJS.time.start = function(nm, msg) {
  var now = Date.now();
  var ctx = DebugJS.ctx;
  if (!nm) nm = DebugJS.DFLT_TMR_NM;
  ctx.timers[nm] = {start: now, split: now};
  var s;
  if (msg) {
    s = msg.replace(/%n/g, nm).replace(/%t/g, '<span style="color:' + ctx.opt.timerColor + '">' + DebugJS.TIME_RST_STR + '</span>');
  } else {
    s = nm + ': timer started';
  }
  DebugJS._log(s);
};
DebugJS.time.restart = function(nm) {
  var now = Date.now();
  var tmr = DebugJS.ctx.timers;
  if (tmr[nm]) {
    var paused = now - tmr[nm].pause;
    tmr[nm].start = now - tmr[nm].count;
    tmr[nm].pause = 0;
    tmr[nm].split += paused;
  } else {
    tmr[nm] = {start: now, pause: 0, split: now, count: 0};
  }
};
DebugJS.time.split = function(nm, msg, isEnd) {
  var now = Date.now();
  var tmr = DebugJS.ctx.timers;
  if (!nm) nm = DebugJS.DFLT_TMR_NM;
  if (!tmr[nm]) {
    DebugJS._log.w(nm + ': timer undefined');
    return null;
  }
  var t = DebugJS.getDiffTimeStr(tmr[nm].start, now);
  var tm = '<span style="color:' + DebugJS.ctx.opt.timerColor + '">' + t + '</span>';
  var lap = DebugJS.getDiffTimeStr(tmr[nm].split, now);
  tmr[nm].split = now;
  var dt = '<span style="color:' + DebugJS.ctx.opt.timerColor + '">' + lap.substr(2) + '</span>';
  var s;
  if (msg) {
    s = msg.replace(/%n/g, nm).replace(/%dt/g, dt).replace(/%t/g, tm);
  } else {
    s = nm + ': ' + tm + ' (' + DebugJS.CHR_DELTA + dt + ')';
  }
  DebugJS._log(s);
  if (isEnd) delete tmr[nm];
  return t;
};
DebugJS.time.pause = function(nm) {
  var now = Date.now();
  var tmr = DebugJS.ctx.timers;
  if (!tmr[nm]) return;
  tmr[nm].pause = now;
  tmr[nm].count = now - tmr[nm].start;
};
DebugJS.time.end = function(nm, msg) {
  return DebugJS.time.split(nm, msg, true);
};
DebugJS.time.check = function(nm, echo) {
  if (nm === undefined) nm = DebugJS.DFLT_TMR_NM;
  if (!DebugJS.ctx.timers[nm]) return null;
  var t = DebugJS.getDiffTimeStr(DebugJS.ctx.timers[nm].start, Date.now());
  if (echo) DebugJS._log(nm + ': <span style="color:' + DebugJS.ctx.opt.timerColor + '">' + t + '</span>');
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
  var now = Date.now();
  var tmr = DebugJS.ctx.timers;
  tmr[nm] = tmr[nm] || {};
  tmr[nm].start = now;
  tmr[nm].split = now;
  tmr[nm].pause = now;
  tmr[nm].count = 0;
};
DebugJS.time.getCount = function(nm) {
  return (DebugJS.ctx.timers[nm] ? DebugJS.ctx.timers[nm].count : 0);
};
DebugJS.time.setCount = function(nm, v) {
  var tmr = DebugJS.ctx.timers;
  if (!tmr[nm]) return;
  tmr[nm].start = Date.now() - v;
  DebugJS.time.updateCount(nm);
};
DebugJS.time.updateCount = function(nm) {
  var tmr = DebugJS.ctx.timers;
  if (tmr[nm]) tmr[nm].count = Date.now() - tmr[nm].start;
};
DebugJS.time.setT0 = function(nm, v) {
  if (DebugJS.ctx.timers[nm]) DebugJS.ctx.timers[nm].start = v;
};
DebugJS.time.s = DebugJS.time.start;
DebugJS.time.e = DebugJS.time.end;

DebugJS.stopwatch = function() {
  var ctx = DebugJS.ctx;
  if (!ctx.isAvailableTools(ctx)) return false;
  ctx.showDbgWin();
  ctx.openFeature(ctx, DebugJS.ST_TOOLS, 'timer', 'sw1');
  return true;
};
DebugJS.stopwatch.tmNm = [DebugJS.TMR_NM_SW_S, DebugJS.TMR_NM_SW_L];
DebugJS.stopwatch.start = function(n, m) {
  if (n == 0) {
    DebugJS.ctx.startStopwatch();
  } else {
    n = 1;
    if (DebugJS.stopwatch()) DebugJS.ctx.startTimerStopwatch();
  }
  if (m) DebugJS.stopwatch.log(n, m);
};
DebugJS.stopwatch.stop = function(n) {
  if (n == 0) {
    DebugJS.ctx.stopStopwatch();
  } else {
    if (DebugJS.stopwatch()) DebugJS.ctx.stopTimerStopwatch();
  }
};
DebugJS.stopwatch.end = function(n, m) {
  if (n == 0) {
    DebugJS.ctx.endStopwatch();
  } else {
    n = 1;
    if (DebugJS.stopwatch()) DebugJS.ctx.endTimerStopwatch(DebugJS.ctx);
  }
  if (m) DebugJS.stopwatch.log(n, m);
  return DebugJS.stopwatch.val(n);
};
DebugJS.stopwatch.split = function(n) {
  var ctx = DebugJS.ctx;
  if (n == 0) {
    ctx.splitStopwatch();
  } else {
    if (ctx.isAvailableTools(ctx)) ctx.splitTimerStopwatch();
  }
};
DebugJS.stopwatch.reset = function(n) {
  if (n == 0) {
    DebugJS.ctx.resetStopwatch();
  } else {
    if (DebugJS.stopwatch()) DebugJS.ctx.resetTimerStopwatch();
  }
};
DebugJS.stopwatch.t0 = function(n, v) {
  if (v == undefined) return;
  var ctx = DebugJS.ctx;
  var now = Date.now();
  var t0 = DebugJS.toTimestamp(v, now);
  if (isNaN(t0)) return;
  if (n == 0) {
    DebugJS.time.setT0(DebugJS.TMR_NM_SW_S, t0);
    return;
  }
  ctx.timerT0 = t0;
  ctx.timerSwT0 = t0;
  if (t0 > now) {
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_TPLUS;
    ctx.updateContinueTplusBtn(ctx);
  }
  return v;
};
DebugJS.stopwatch.val = function(n, v) {
  var ctx = DebugJS.ctx;
  if (n == 0) {
    var nm = DebugJS.stopwatch.tmNm[0];
    if (ctx.status & DebugJS.ST_STOPWATCH_RUNNING) {
      DebugJS.time.updateCount(nm);
    }
    if (v == undefined) {
      v = DebugJS.time.getCount(nm);
    } else {
      ctx.resetStopwatch();
      DebugJS.time.setCount(nm, v);
      ctx.updateSwLabel();
    }
  } else {
    if (v == undefined) {
      v = ctx._updateTimerStopwatch(ctx);
    } else {
      ctx.setTimerStopwatchVal(ctx, v);
    }
  }
  return v;
};
DebugJS.stopwatch.log = function(n, msg) {
  var nm = DebugJS.stopwatch.tmNm[n];
  var v;
  if (n == 1) {
    v = DebugJS.ctx._updateTimerStopwatch(DebugJS.ctx);
  } else {
    v = DebugJS.time.getCount(nm);
  }
  var t = DebugJS.getTmrStr(v);
  var m = nm + ': <span style="color:' + DebugJS.ctx.opt.timerColor + '">' + t + '</span>';
  if (msg != undefined) m += ' ' + msg;
  DebugJS._log(m);
};
DebugJS.stopwatch.setContinueTplus = function(f) {
  DebugJS.ctx.setContinueTplus(DebugJS.ctx, f);
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
  var f = (DebugJS.cmd.hasFocus() ? DebugJS.cmd.blur : DebugJS.cmd.focus);
  f();
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

DebugJS.copy = function(s) {
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

DebugJS.copyContent = function() {
  var ctx = DebugJS.ctx;
  if (ctx.status & DebugJS.ST_TOOLS) {
    if (ctx.toolsActvFnc & DebugJS.TOOLS_FNC_TEXT) {
      DebugJS.copy(ctx.txtEdtTxt.value);
    } else if (ctx.toolsActvFnc & DebugJS.TOOLS_FNC_FILE) {
      DebugJS.copy(ctx.fileVwrCtt);
    }
  } else {
    DebugJS.copyLogs();
  }
};
DebugJS.copyLogs = function() {
  var cmdActv = DebugJS.cmd.hasFocus();
  DebugJS.copy(DebugJS.ctx.logPanel.innerText);
  if (cmdActv) setTimeout(DebugJS.ctx.focusCmdLine, 0);
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
  if (last != '') bat.cmds.push(last);
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
  if (a != undefined) bat.setExecArg(a);
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
      } else if (!(DebugJS.isTTimeFormat(w) || w.match(/\|/))) {
        try {
          w = eval(w);
        } catch (e) {DebugJS._log.e(e);}
      }
      w += '';
      if (w.match(/\|/)) {
        w = DebugJS.calcNextTime(w).t;
      }
      if (DebugJS.isTTimeFormat(w)) {
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
    } catch (e) {DebugJS._log.e(e);}
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
  var nestingLv = 0;
  var data = {l: 0, endTkn: DebugJS.BAT_TKN_BLOCK_END};
  while (l <= bat.ctrl.endPc) {
    var cmd = bat.cmds[l];
    var c = DebugJS.splitCmdLineInTwo(cmd)[0];
    if (DebugJS.unifySP(cmd.trim()).match(DebugJS.RE_ELIF)) {
      if (nestingLv == 0) {
        if (type == DebugJS.BAT_TKN_ELIF) {
          data.endTkn = DebugJS.BAT_TKN_ELIF;
          break;
        }
      }
    } else if (DebugJS.delAllSP(cmd) == DebugJS.RE_ELSE) {
      if (nestingLv == 0) {
        if ((type == DebugJS.BAT_TKN_IF) || (type == DebugJS.BAT_TKN_ELIF)) {
          data.endTkn = DebugJS.BAT_TKN_ELSE;
          break;
        }
      }
    } else if (cmd.trim() == DebugJS.BAT_TKN_BLOCK_END) {
      if (nestingLv == 0) {
        break;
      }
      nestingLv--;
    } else if ((c == DebugJS.BAT_TKN_IF) || (c == DebugJS.BAT_TKN_LOOP)) {
      nestingLv++;
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
      } catch (e) {DebugJS._log.e(e);}
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
    if (e == undefined) e = s + 1;
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
      l += ((i == pc - 1) ? '>' : ' ');
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
  var NM = ['%ARG%', 'ARG', 'RET', 'LABEL', 'FUNCNAME', 'TEXT'];
  for (var i = 0; i < NM.length; i++) {
    delete ctx.CMDVALS['%' + NM[i] + '%'];
  }
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
  if (b == null) return;
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
  var t = bat.ctrl.pauseTimeout - Date.now();
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
  var v = '\'' + DebugJS.ctx.PROPS_DFLT_VALS[k] + '\'';
  DebugJS.ctx._cmdSet(DebugJS.ctx, k, v, false);
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
  if (ptr.el) {
    document.body.appendChild(ptr.el);
  } else {
    point.createPtr();
  }
  var area = point.hint.getArea();
  if (area.visible) point.hint.show();
};
DebugJS.point.hide = function() {
  var ptr = DebugJS.point.getPtr();
  if (ptr.el && ptr.el.parentNode) document.body.removeChild(ptr.el);
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
  if (DebugJS.point.drag.data.step == 2) DebugJS.point.move.stop();
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
  ps = DebugJS.getElPosSize(el);
  DebugJS.pointTarget(ps, alignX, alignY);
};

DebugJS.pointByAttr = function(attr, v, idx, alignX, alignY) {
  var el = DebugJS.getElByAttr(attr, v, idx);
  if (!el) {
    DebugJS._log.e('Element not found: attr=' + attr + ' v=' + v + ' [' + idx + ']');
    return;
  }
  var ps = DebugJS.getElPosSize(el);
  DebugJS.scrollWinToTarget(ps);
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
    selector: selector, idx: idx,
    speed: speed, step: step, alignX: alignX, alignY: alignY
  };
  var ps = DebugJS.getElPosSize(selector, idx);
  if (!ps) {
    DebugJS._log.e('Element not found: ' + selector + (selector.charAt(0) == '#' ? '' : (idx == undefined ? '' : ' [' + idx + ']')));
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
DebugJS.point.moveToElByAttr = function(attr, v, idx, speed, step, alignX, alignY) {
  var data = {
    attr: attr, v: v, idx: idx,
    speed: speed, step: step, alignX: alignX, alignY: alignY
  };
  var el = DebugJS.getElByAttr(attr, v, idx);
  if (!el) {
    DebugJS._log.e('Element not found: attr=' + attr + ' v=' + v + ' [' + idx + ']');
    return;
  }
  var ps = DebugJS.getElPosSize(el);
  if (DebugJS.scrollWinToTarget(ps, DebugJS.ctx.props.scrollspeed, DebugJS.ctx.props.scrollstep, DebugJS.point._moveToElByAttr, data)) {
    return;
  }
  DebugJS.point._moveToElByAttr(data);
};
DebugJS.point._moveToElByAttr = function(data) {
  var el = DebugJS.getElByAttr(data.attr, data.v, data.idx);
  var ps = DebugJS.getElPosSize(el);
  if (data.alignX == undefined) data.alignX = 0.5;
  if (data.alignY == undefined) data.alignY = 0.5;
  DebugJS.point.moveToElement(ps, data.speed, data.step, data.alignX, data.alignY);
};
DebugJS.point.moveToElement = function(ps, speed, step, alignX, alignY) {
  if (ps) {
    var p = DebugJS.getAlignedPos(ps, alignX, alignY);
    if (p) DebugJS.point.move(p.x, p.y, speed, step);
  }
};
DebugJS.point.hint = function(msg, speed, step, start, end) {
  var hint = DebugJS.point.hint;
  var area = hint.getArea();
  if (!area.el) hint.createArea();
  document.body.appendChild(area.el);
  try {
    var m = eval(msg) + '';
  } catch (e) {m = e + '';}
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
  var style = {
    'width': 'auto',
    'height': 'auto',
    'margin': 0,
    'padding': 0,
    'line-height': '1.2',
    'color': ctx.opt.fontColor,
    'font-size': ctx.props.pointmsgsize,
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
  if (x < 0) x = 0;
  if ((y + ps.h) > ptr.y) x = ptr.x + ptr.w;
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
    DebugJS.scrollWinTo.end();
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
    DebugJS.scrollWinTo.end();
  }
};
DebugJS.scrollWinTo.end = function() {
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
  x += '';y += '';
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
        x = el.scrollLeft / 2;
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
        y = el.scrollTop / 2;
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
    if (((dest * (-1)) < step) || (step == 0)) step = dest * (-1);
    dest += step;
    step *= (-1);
  } else {
    if ((dest < step) || (step == 0)) step = dest;
    dest -= step;
  }
  return {dest: dest, step: step};
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
  } catch (e) {DebugJS._log.e('setText(): ' + e);}
  txt = DebugJS.decCtrlCh(txt);
  data.text = txt;
  data.txt = DebugJS.html2text(txt);
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
    data.el.innerHTML = data.text;
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
  return DebugJS._random(min, max);
};

DebugJS.selectOption = function(elm, method, type, val) {
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
    for (var i = 0; i < el.options.length; i++) {
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
  }
  return false;
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
  data.startTime = Date.now();
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
DebugJS.test.end = function() {
  DebugJS.test.data.running = false;
  DebugJS.test.data.endTime = Date.now();
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
    label: label, status: st, method: method, exp: exp, got: got, info: info
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
  var c;
  switch (st) {
    case test.STATUS_OK:
      c = test.COLOR_OK;
      break;
    case test.STATUS_NG:
      c = test.COLOR_NG;
      break;
    case test.STATUS_ERR:
      c = test.COLOR_ERR;
      break;
    default:
      c = test.COLOR_NT;
  }
  return '[<span style="color:' + c + '">' + st + '</span>]';
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
  s += test.getDetails(data.results);
  s += '[SUMMARY]\n' + test.getCountStr(cnt) + ' (' + test.getCountStr(data.cnt) + ')\n';
  s += DebugJS.repeatCh('-', ttl.length + 2) + '\n' + test.getStyledStStr(ttl);
  return s;
};
DebugJS.test.getDetails = function(results) {
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
      details += ' ' + DebugJS.rpad(result.label, ' ', n) + ' ' + test.getStyledResultStr(result.status, info) + '\n';
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
      if (typeof exp == 'string') exp = exp.replace(/\r?\n/g, '\n');
    }
    if (reqEval) {
      got = eval(got);
    }
    if (typeof got == 'string') {
      got = got.replace(/\r?\n/g, '\n');
    }
    if (method == '==') {
      status = ((got == exp) ? test.STATUS_OK : test.STATUS_NG);
    } else if (method == '!=') {
      status = ((got != exp) ? test.STATUS_OK : test.STATUS_NG);
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
      status = (r ? test.STATUS_OK : test.STATUS_NG);
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
      if (r.label.length > l) l = r.label.length;
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
    x: rectL, y: rectT, w: ((rectR - rectL) + 1), h: ((rectB - rectT) + 1)
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

DebugJS.getElByAttr = function(attr, v, idx) {
  var el;
  var f = DebugJS._getElByAttr;
  if (attr == '!txt') {
    el = f('innerText', v, idx);
    if (!el) el = f('value', v, idx);
  } else {
    el = f(attr, v, idx);
  }
  return el;
};
DebugJS._getElByAttr = function(attr, v, idx) {
  idx |= 0;
  var el = document.body;
  var n = 0;
  while (el) {
    if (el[attr] == v) {
      if (idx == n) {
        break;
      } else {
        n++;
      }
    }
    el = DebugJS.ctx.getNextElm(DebugJS.ctx, el);
  }
  return el;
};

DebugJS.findFocusableEl = function(el) {
  while (el != null) {
    if (el.tagName == 'HTML') return null;
    if (DebugJS.isFocusable(el)) break;
    el = el.parentNode;
  }
  return el;
};
DebugJS.isFocusable = function(el) {
  var a = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
  return (a.indexOf(el.tagName) == -1 ? false : true);
};
DebugJS.isTxtInp = function(el) {
  if (el.tagName == 'TEXTAREA') return true;
  if (el.tagName == 'INPUT') {
    switch (el.type) {
      case 'text':
      case 'password':
      case 'email':
      case 'number':
      case 'search':
      case 'tel':
      case 'url':
        return true;
    }
  }
  return false;
};

DebugJS.toggleElShowHide = function(el) {
  el.style.display = (el.style.display == 'none' ? '' : 'none');
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
  return DebugJS.strpIndex(DebugJS.A2Z, c.trim().toUpperCase());
};
DebugJS.xlsColN2A = function(n) {
  var a = DebugJS.strp(DebugJS.A2Z, n);
  if (n <= 0) a = '';
  return a;
};
DebugJS.xlsDateA2N = function(v) {
  v = DebugJS.serializeDateTime(v);
  var d = v.substr(0, 8);
  var t = v.substr(8);
  var r = DebugJS.diffDate('1900/01/01 ', d) + 1;
  if (r >= 60) r++;
  if (d == '19000100') {
    r = 0;
  } else if (d == '19000229') {
    r = 60;
  }
  if (t | 0 > 0) {
    t = DebugJS.serializedN2clock(t);
    r += DebugJS.xlsTimeA2N(t);
  }
  return r;
};
DebugJS.xlsDateN2A = function(v) {
  var w = v.split('.');
  v = w[0] | 0;
  var t = (w[1] == undefined ? 0 : parseFloat('0.' + w[1]));
  var o = (v < 60 ? 1 : 2);
  var d = v - o;
  if (v < 0) {
    var r = '######';
  } else if (v == 0) {
    r = '1900/01/00';
  } else if (v == 60) {
    r = '1900/02/29';
  } else {
    r = DebugJS.ctx.cmdDateCalc('1900/01/01+' + d);
  }
  if (t > 0) r += ' ' + DebugJS.xlsTimeN2A(t);
  return r;
};
DebugJS.xlsTimeA2N = function(v) {
  return DebugJS.clock2ms(v) / 86400000;
};
DebugJS.xlsTimeN2A = function(v) {
  return DebugJS.ms2str(86400000 * parseFloat(v));
};

DebugJS.strp = function(tbl, idx) {
  if (typeof tbl == 'string') tbl = tbl.split('');
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
DebugJS.strpIndex = function(tbl, ptn) {
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
DebugJS.strpTotal = function(tbl, d) {
  if (typeof tbl == 'string') tbl = tbl.split('');
  var c = tbl.length;
  var n = 0;
  for (var i = 1; i <= d; i++) {
    n += Math.pow(c, i);
  }
  return n;
};

DebugJS.ui = {};
DebugJS.ui.addElement = function(base, tag, style, std) {
  var el = document.createElement(tag);
  if (style) DebugJS.setStyle(el, style, std);
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
  wd.wdPetTime = Date.now();
  DebugJS._log.s('Start watchdog (' + DebugJS.ctx.props.wdt + 'ms)');
  if (wd.wdTmId > 0) clearTimeout(wd.wdTmId);
  wd.wdTmId = setTimeout(wd.pet, wd.INTERVAL);
};
DebugJS.wd.pet = function() {
  if (!(DebugJS.ctx.status & DebugJS.ST_WD)) return;
  var now = Date.now();
  var wd = DebugJS.wd;
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
DebugJS.log.t = function(m, t) {
  if (DebugJS.ctx.status & DebugJS.ST_LOG_SUSPEND) return;
  DebugJS._log.t(m, t);
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
  DebugJS.cls();
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
DebugJS.cls = function() {
  DebugJS.ctx.clearLog();
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
  ctx.timerSwVal = data.timerSwVal;
  ctx.timerStartedV = data.timerStartedV;
  ctx.timerSwT0 = data.timerSwT0;
  ctx.timerSwPrevSplit = data.timerSwPrevSplit;
  ctx.timerSplitF = data.timerSplitF;
  ctx.timerContinueTplus = data.timerContinueTplus;
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
  if (ctx.status & DebugJS.ST_INITIALIZED) ctx.initExtPanel(ctx);
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
  for (var i = 0; i < a.length; i++) {
    if (a[i] && a[i].name == nm) break;
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
  if (DebugJS.ctx.extPanels[i]) DebugJS.ctx.switchExtPanel(i);
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
var dbg = (dbg === undefined ? DebugJS : dbg);
var log = DebugJS.log;
DebugJS.ENABLE = true;
if (DebugJS.ENABLE) {
  DebugJS.boot();
} else {
  DebugJS = DebugJS.balse(DebugJS);
}
