/*!
 * debug.js
 *
 * Copyright 2016 Takashi Harano
 * Released under the MIT license
 * https://github.com/takashiharano/debug.js
 *
 * Date: 2016-03-13T20:15+09:00
 */
function DebugJS() {
  this.ENABLE = true;

  this.defaultOptions = {
    'buffSize': 15,
    'width': 450,
    'showLineNums': true,
    'showClearButton': true,
    'defaultShow': true,
  };

  this.defaultStyle = {
    'position': 'absolute',
    'width': this.defaultOptions.width + 'px',
    'padding': '.3em',
    'line-height': '1em',
    'border': 'solid 1px #888',
    'font-family': 'Consolas',
    'font-size': '9pt',
    'color': '#fff',
    'background': '#111',
    'display': 'block'
  };

  this.id = null;
  this.msgArea = null;
  this.automode = false;
  this.show = false;

  this.options = {
    'buffSize': null,
    'width': null,
    'showLineNums': true,
    'showClearButton': true,
    'defaultShow': false,
  };

  this.DEFAULT_ELM_ID = '_debug_';
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
      this.options = this.defaultOptions;
    } else {
      this.options = options;
    }
    this.show = this.options.defaultShow;

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
    styles[selector] = this.defaultStyle;

    if (this.automode) {
      var wkStyle = styles[selector];
      wkStyle.position = 'fixed';
      wkStyle.width = this.options.width + 'px';
      wkStyle.top = '50px';
      wkStyle.left = (window.innerWidth - this.options.width - 50) + 'px';
      wkStyle.background = 'rgba(0,0,0,0.8)';
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
    if (this.options.showClearButton) {
      msg += '<a href="#" onclick="Debug.clearMessage();">[clear]</a><br/>';
    }
    for (var i = 0; i < buf.length; i++) {
      msg += buf[i] + '<br/>';
    }
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
        var selector = '#' + Debug.id;
        var styles = {};
        styles[selector] = {'display': 'none'};
        Debug.applyStyles(styles);
        Debug.show = false;
      } else {
        var selector = '#' + Debug.id;
        var styles = {};
        styles[selector] = {'display': 'block'};
        Debug.applyStyles(styles);
        Debug.show = true;
      }
    }
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
    var padding = '';
    var line = '';
    var msg = '';
    var pos = 0;
    var cnt;

    var maxCnt = bufLen;
    if (bufCnt > this.buffer.length) {
      pos = (bufCnt % this.buffer.length);
      maxCnt = bufCnt;
    }

    for (var i = 0; i < bufLen; i++) {
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
        padding = '';
        for (var j = 0; j < diffDigits; j++) {
          padding = padding + '0';
        }
        line = padding + cnt + ': ';
      }

      if (this.buffer[pos] == undefined) {
        msg = '';
      } else {
        msg = this.buffer[pos];
      }

      allBuff[i] = line + msg;
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

function log(msg) {
  if(!Debug.ENABLE){return;}

  if (!Debug.isInitialized()) {
    Debug.init(null, null);
  }
  Debug.msgBuff.add(msg);
  Debug.printMessage();
}
