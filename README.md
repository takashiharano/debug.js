# debug.js
debug.js is embedded JavaScript debugger for web development.

It allows you to debug easily without the F12 Tools.
The library has useful features such as logging, DOM element inspector, screen measure, file viewer, command-line, original script interpreter for automated testing, etc.

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
