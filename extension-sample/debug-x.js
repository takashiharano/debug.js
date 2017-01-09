DebugJS.x.cmdAbc = function(arg, tbl) {
  DebugJS.log('Hello!');
};

DebugJS.x.cmdXyz = function(arg, tbl) {
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
  {'cmd': 'abc', 'fnc': DebugJS.x.cmdAbc, 'desc': 'extention command example1'},
  {'cmd': 'xyz', 'fnc': DebugJS.x.cmdXyz, 'desc': 'extention command example2', 'usage': 'xyz args...'}
];
