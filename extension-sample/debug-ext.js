DebugJS.ext = {};
DebugJS.ext.v = '201608300733';

DebugJS.ext.cmdTest = function() {
  DebugJS.log('test');
};

DebugJS.ext.cmdV = function() {
  DebugJS.log('ext.' + DebugJS.ext.v);
};

DebugJS.ext.CMD_TBL = [
  {'cmd': 'test', 'fnc': DebugJS.ext.cmdTest, 'desc': 'extention\'s command example'},
  {'cmd': 'extv', 'fnc': DebugJS.ext.cmdV, 'desc': 'Displays extension version info'}
];
