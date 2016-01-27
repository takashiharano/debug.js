/*!
 * debug.js
 *
 * Copyright 2016 Takashi Harano
 * Released under the MIT license
 * https://github.com/takashiharano/debug.js
 *
 * Date: 2016-01-27T21:34+09:00
 */
var Debug = null;

function DebugJS() {
	this.DEFAULT_DEBUG_ARIA_ID = 'debug';
	this.DEFAULT_BUFFER_SIZE = 10;
	this.DEFAULT_SHOW_LINE_NUMS = true;
}

DebugJS.prototype = {
	init:  function(messageAreaId, messageBufferSize, showLineNums) {
		this.DebugMessageBuffer = new RingBuffer(messageBufferSize);
		this.DebugMessageArea = document.getElementById(messageAreaId);
		this.DebugIsShowLineNums = showLineNums;

		var selector = '#' + messageAreaId;
		var styles = {};
		styles[selector] = {
			'width': '99%',
			'padding': '.3em',
			'line-height': '1em',
			'border': 'solid 1px #888',
			'font-family': 'Consolas',
			'font-size': '9pt',
			'color': '#fff',
			'background': '#000'
		};

		selector = '#' + messageAreaId + ' a';
		styles[selector] = {'color': '#00bfff'};
		applyStyles(styles);

		this.clearMessage();
	},

	printMessage: function() {
		var buf = this.DebugMessageBuffer.getAll();
		var msg = '<a href="#" onclick="Debug.clearMessage();">[clear]</a><br/>';
		for (var i = 0; i < buf.length; i++) {
			msg = msg + buf[i] + '<br/>';
		}
		this.DebugMessageArea.innerHTML = msg;
	},

	clearMessage: function() {
		this.DebugMessageBuffer.clear();
		this.printMessage();
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

			if (Debug.DebugIsShowLineNums) {
				var diffDigits = digits(maxCnt) - digits(cnt);
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
	}
};

function digits(x) {
	var digit = 0;
	while (x != 0) {
		x = (x / 10) << 0;
		digit++;
	}
	return digit;
};

function debug(msg) {
	if (Debug) {
		Debug.DebugMessageBuffer.add(msg);
		Debug.printMessage();
	} else {
		Debug = new DebugJS();
		Debug.init(Debug.DEFAULT_DEBUG_ARIA_ID, Debug.DEFAULT_BUFFER_SIZE, Debug.DEFAULT_SHOW_LINE_NUMS);
	}
}

function DebugAddEventListener(func) { 
	try { 
		window.addEventListener('load', func, false);
	} catch (e) { 
		window.attachEvent('onload', func);  // for IE
	}
}

function DebugInit() {
	Debug = new DebugJS();
	Debug.init(Debug.DEFAULT_DEBUG_ARIA_ID, Debug.DEFAULT_BUFFER_SIZE, Debug.DEFAULT_SHOW_LINE_NUMS);
}

function applyStyles(styles) {
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
}

DebugAddEventListener(DebugInit);
