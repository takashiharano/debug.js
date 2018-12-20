var extsample = extsample || {};

extsample.cmdHello = function(arg, tbl) {
  log('Hello, World!');
};

extsample.cmdAbc = function(arg, tbl) {
  var args = dbg.splitCmdLine(arg);
  if (args[0] == '') {
    dbg.printUsage(tbl.help);
    return;
  }
  for (var i = 0; i < args.length; i++) {
    log('arg' + i + ' = ' + args[i]);
  }
};

extsample.CMD_TBL = [
  {'cmd': 'hello', 'fn': extsample.cmdHello, 'desc': 'extention command example1'},
  {'cmd': 'abc', 'fn': extsample.cmdAbc, 'desc': 'extention command example2', 'help': 'abc args...'}
];

dbg.x.addCmdTbl(extsample.CMD_TBL);
