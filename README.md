# debug.js
debug.js allows you to debug easily with direct output log messages to HTML page.

### Get Started
  To enable log output, follow the steps below.
  * include debug.js e.g.) &lt;script src="debug.js"&gt;&lt;/script&gt;
  * prepare a log output area. e.g.)  &lt;div id="log"&gt;&lt;/div&gt;
  * initialize the debug.js with id of &lt;div&gt; for log message area and number of log buffer. e.g.) var debug = new Debug("log", 10);
  * put log output anywhere you need to debug. e.g.) log(&lt;message&gt;);
