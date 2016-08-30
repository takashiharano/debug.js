DebugJS.x.cmdAbc = function(args, tbl) {
  DebugJS.log('Hello!');
};

DebugJS.x.cmdXyz = function(args, tbl) {
  if (args == '') {
    DebugJS.printUsage(tbl.usage);
  } else {
    var a = args.split(' ');
    for (var i = 0; i < a.length; i++) {
      DebugJS.log('arg' + i + ' = ' + a[i]);
    }
  }
};

DebugJS.x.CMD_TBL = [
  {'cmd': 'abc', 'fnc': DebugJS.x.cmdAbc, 'desc': 'extention command example1'},
  {'cmd': 'xyz', 'fnc': DebugJS.x.cmdXyz, 'desc': 'extention command example2', 'usage': 'xyz args...'}
];
