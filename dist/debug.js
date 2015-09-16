/*!
 * debug.js
 *
 * Copyright 2015 Takashi Harano
 * Released under the MIT license
 * https://github.com/takashiharano/debug.js
 *
 * Date: 2015-09-17T00:07+09:00
 */
var Debug = null;

function DebugJS() {
	this.DEFAULT_LOG_ARIA_ID = "log";
	this.DEFAULT_BUFFER_SIZE = 5;
	this.DEFAULT_SHOW_LINE_NUMS = true;
}

DebugJS.prototype = {
	init:  function(logAreaId, logBufferSize, showLineNums) {
		this.DebugLogBuffer = new RingBuffer(logBufferSize);
		this.DebugLogArea = document.getElementById(logAreaId);
		this.DebugIsShowLineNums = showLineNums;
	},

	printLog: function() {
		var buf = this.DebugLogBuffer.getAll();
		var msg = "<a href=\"#\" onclick=\"Debug.clearLog();\">[clear]</a><br/>";
		for (var i = 0; i < buf.length; i++) {
			msg = msg + buf[i] + "<br/>";
		}
		this.DebugLogArea.innerHTML = msg;
	},

	clearLog: function() {
		this.DebugLogBuffer.clear();
		this.printLog();
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
		var padding = "";
		var line = "";
		var msg = "";
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
				padding = "";
				for (var j = 0; j < diffDigits; j++) {
					padding = padding + "0";
				}
				line = padding + cnt + ": ";
			}

			if (this.buffer[pos] == undefined) {
				msg = "";
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

function log(msg) {
	if (Debug) {
		Debug.DebugLogBuffer.add(msg);
		Debug.printLog();
	} else {
		Debug = new DebugJS();
		Debug.init(Debug.DEFAULT_LOG_ARIA_ID, Debug.DEFAULT_BUFFER_SIZE, Debug.DEFAULT_SHOW_LINE_NUMS);
	}
}

function DebugAddEventListener(func) { 
	try { 
		window.addEventListener("load", func, false);
	} catch (e) { 
		window.attachEvent("onload", func);  // for IE
	}
}

function DebugInit() {
	Debug = new DebugJS();
	Debug.init(Debug.DEFAULT_LOG_ARIA_ID, Debug.DEFAULT_BUFFER_SIZE, Debug.DEFAULT_SHOW_LINE_NUMS);
}

DebugAddEventListener(DebugInit);
