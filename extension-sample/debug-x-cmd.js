var extsample = extsample || {};

extsample.cmdAbc = function(arg, tbl) {
  dbg.log('Hello!');
};

extsample.cmdXyz = function(arg, tbl) {
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
  {'cmd': 'abc', 'fnc': extsample.cmdAbc, 'desc': 'extention command example1'},
  {'cmd': 'xyz', 'fnc': extsample.cmdXyz, 'desc': 'extention command example2', 'usage': 'xyz args...'}
];

dbg.x.addCmdTbl(extsample.CMD_TBL);
