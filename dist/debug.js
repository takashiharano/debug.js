/*!
 * debug.js
 *
 * Copyright 2015 Takashi Harano
 * Released under the MIT license
 *
 * Date: 2015-09-06T22:22+09:00
 */
var LogBuffer;
var LogArea;
var Debug = function(logAreaId, logBufferSize) {
	LogBuffer = new RingBuffer(logBufferSize);
	LogArea = $("#" + logAreaId);
};

function log(msg) {
	LogBuffer.add(msg);
	var buf = LogBuffer.getAll();
	var msg = "";
	for (var i = 0; i < buf.length; i++) {
		msg = msg + buf[i] + "<br/>";
	}
	LogArea.html(msg);
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
		var loopMax;
		var pos;

		if (this.count < this.buffer.length) {
			loopMax = this.count;
			pos = 0;
		} else {
			loopMax = this.buffer.length;
			pos = (this.count % this.buffer.length);
		}

		for (var i = 0; i < loopMax; i++) {
			if (pos >= this.buffer.length) {
				pos = 0;
			}
			allBuff[i] = this.buffer[pos];
			pos++;
		}

		return allBuff;
	}
};
