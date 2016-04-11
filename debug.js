/*!
 * debug.js
 *
 * Copyright 2016 Takashi Harano
 * Released under the MIT license
 * https://github.com/takashiharano/debug.js
 *
 * Date: 2016-04-11T121:31+09:00
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
    'specialColor': '#0f0',
    'showLineNums': true,
    'showClearButton': true,
    'showCloseButton': true
  };

  this.DEFAULT_STYLE = {
    'position': 'absolute',
    'width': this.DEFAULT_OPTIONS.width + 'px',
    'padding': '0',
    'line-height': '1em',
    'border': 'solid 1px #888',
    'font-family': 'Consolas',
    'font-size': '12px',
    'color': '#fff',
    'background': '#111',
    'display': 'block',
    'z-index': 0x7fffffff,
    'box-shadow': '10px 10px 10px rgba(0,0,0,.3)'
  };

  this.id = null;
  this.msgArea = null;
  this.automode = false;
  this.show = false;
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

DebugJS.time = function() {
  var dt = DebugJS.getTime();
  var tm = dt.hh + ':' + dt.mi + ':' + dt.ss + '.' + dt.ms;
  return tm;
}

DebugJS.prototype = {
  init:  function(elmId, options) {
    if(!this.ENABLE){return;}

    if (elmId == null) {
      this.id = this.DEFAULT_ELM_ID;
      this.automode = true;
    } else {
      this.id = elmId;
      this.msgArea = document.getElementById(this.id);
    }

    if (options == null) {
      this.options = this.DEFAULT_OPTIONS;
    } else {
      this.options = options;
    }
    this.show = this.DEFAULT_SHOW;

    if (this.msgArea == null) {
      var div = document.createElement('div');
      div.id = this.id;
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(div);
      this.msgArea = div;
    }

    this.msgBuff = new RingBuffer(this.options.buffSize);

    var selector = '#' + this.id;
    var styles = {};
    styles[selector] = this.DEFAULT_STYLE;

    if (this.automode) {
      var wkStyle = styles[selector];
      wkStyle.position = 'fixed';
      wkStyle.width = this.options.width + 'px';
      wkStyle.top = this.options.top  + 'px';
      wkStyle.left = (window.innerWidth - this.options.width - this.options.right) + 'px';
      wkStyle.background = 'rgba(0,0,0,0.7)';
      if (!this.show) {
        wkStyle.display = 'none';
      }
    }

    selector = '#' + this.id + ' a';
    styles[selector] = {'color': '#00bfff'};
    this.applyStyles(styles);

    this.clearMessage();

    if (this.automode) {
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
    var buf = this.msgBuff.getAll();
    var msg = '';
    msg += '<div style="padding:2px 2px 5px 2px;background:rgba(0,68,118,0);">';
    if (this.options.showClearButton) {
      msg += '<a href="#" onclick="Debug.clearMessage();">[clear]</a>';
    }

    if (this.options.showCloseButton) {
      msg += '<span style="float:right;margin-right:2px;font-size:22px;"><a href="#" onclick="Debug.hideDebugWindow();" style="color:#888;text-decoration:none;">×</a></span>';
    }
    msg += '</div>';

    msg += '<div style="position:relative;padding:0 .3em .3em .3em;word-break:break-all;">';
    msg += '<table style="line-height:.7em;">';
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
    if (e.keyCode == 113) {
      // F2
      if (Debug.show) {
        Debug.hideDebugWindow();
      } else {
        Debug.showDebugWindow();
      }
    } else if (e.keyCode == 27) {
      // ESC
      Debug.hideDebugWindow();
    }
  },

  hideDebugWindow: function() {
    var selector = '#' + Debug.id;
    var styles = {};
    styles[selector] = {'display': 'none'};
    Debug.applyStyles(styles);
    Debug.show = false;
  },

  showDebugWindow: function() {
    var selector = '#' + Debug.id;
    var styles = {};
    styles[selector] = {'display': 'block'};
    Debug.applyStyles(styles);
    Debug.show = true;
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

      line += '<td>' + msg + '</td>';
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
  if (msg) {
    msg = msg.replace(/ /g , '&nbsp;');
  }
  return msg;
}

log.out = function(msg, styleStart, styleEnd) {
  var t = DebugJS.time();
  var m = styleStart + t + ' ' + msg + styleEnd;
  Debug.msgBuff.add(m);
  Debug.printMessage();
}
