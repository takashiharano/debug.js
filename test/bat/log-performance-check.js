// Logging performance check
var n = 1000;
var i = 0;
dbg.time.s('total');
test();
function test() {
  dbg.time.s();
  dbg.time.e();
  i++;
  if (i == n) {
    dbg.msg.clear();
    dbg.time.e('total');
  } else {
    if (i % 100 == 0) {
      dbg.msg('i=' + i + ' ' + dbg.time.check('total'));
    }
    setTimeout(test, 0);
  }
}
