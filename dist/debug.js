/*!
 * debug.js
 *
 * Copyright 2015 Takashi Harano
 * Released under the MIT license
 * https://github.com/takashiharano/debug.js
 *
 * Date: 2015-09-14T23:23+09:00
 */
var LogBuffer;
var LogArea;
var isShowLineNums = false;
var Debug = function(logAreaId, logBufferSize, showLineNums) {
	LogBuffer = new RingBuffer(logBufferSize);
	LogArea = document.getElementById(logAreaId);
	isShowLineNums = showLineNums;
};

function log(msg) {
	LogBuffer.add(msg);
	printLog();
}

function printLog() {
	var buf = LogBuffer.getAll();
	var msg = "<a href=\"#\" onclick=\"clearLog();\">[clear]</a><br/>";
	for (var i = 0; i < buf.length; i++) {
		msg = msg + buf[i] + "<br/>";
	}
	LogArea.innerHTML = msg;
}

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

			if (isShowLineNums) {
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

function clearLog() {
	LogBuffer.clear();
	printLog();
}

function digits(x) {
	var digit = 0;
	while (x != 0) {
		x = (x / 10) << 0;
		digit++;
	}
	return digit;
};
