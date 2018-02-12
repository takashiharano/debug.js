# debug.js
debug.js is embedded JavaScript debugger for web development.

It allows you to debug easily without the F12 Tools.
The library has useful features such as logging, DOM element inspection, screen measure, command-line, etc.

## Quick Start
Logging:
```html
<!DOCTYPE html>
<html>
<head>
  <script src="debug.js"></script>
  <script>
    function foo() {
      log('button was clicked');
    }
  </script>
</head>
<body>
  <button onclick="foo();">BUTTON</button>
</body>
</html>
```

## Documents & Demos
For more information on how to use, see: https://debugjs.net/

[ ![sample](https://debugjs.net/debugjs20180212.png) ](https://debugjs.net/ "debug.js")
