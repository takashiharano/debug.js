var extsample = extsample || {};

extsample.cmdAbc = function(arg, tbl) {
  DebugJS.log('Hello!');
};

extsample.cmdXyz = function(arg, tbl) {
  var args = DebugJS.splitArgs(arg);
  if (args[0] == '') {
    DebugJS.printUsage(tbl.usage);
    return;
  }
  for (var i = 0; i < args.length; i++) {
    DebugJS.log('arg' + i + ' = ' + args[i]);
  }
};

DebugJS.x.CMD_TBL = [
  {'cmd': 'abc', 'fnc': extsample.cmdAbc, 'desc': 'extention command example1'},
  {'cmd': 'xyz', 'fnc': extsample.cmdXyz, 'desc': 'extention command example2', 'usage': 'xyz args...'}
];
