# debug.js
debug.js is embedded JavaScript debugger for web development.

It allows you to debug easily without the F12 Tools.
The library has useful features such as logging, DOM element inspection, screen measure, command-line, etc.

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

**[Demo and Description](https://debugjs.net/ "debug.js demo page")**

[ ![sample](https://debugjs.net/debugjs20161029.png) ](https://debugjs.net/ "debug.js")
