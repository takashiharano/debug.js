var extsample = extsample || {};

extsample.cmdHello = function(arg, tbl) {
  dbg.log('Hello, World!');
};

extsample.cmdAbc = function(arg, tbl) {
  var args = dbg.splitArgs(arg);
  if (args[0] == '') {
    dbg.printUsage(tbl.usage);
    return;
  }
  for (var i = 0; i < args.length; i++) {
    dbg.log('arg' + i + ' = ' + args[i]);
  }
};

extsample.CMD_TBL = [
  {'cmd': 'hello', 'fnc': extsample.cmdHello, 'desc': 'extention command example1'},
  {'cmd': 'abc', 'fnc': extsample.cmdAbc, 'desc': 'extention command example2', 'usage': 'abc args...'}
];

dbg.x.addCmdTbl(extsample.CMD_TBL);
