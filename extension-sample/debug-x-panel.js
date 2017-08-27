var extsample = extsample || {};

extsample.init = function() {
  var panel1 = {
    name: 'P1',
    onCreate: extsample.onCreateP1,
    onActive: extsample.onActiveP1,
    onInActive: extsample.onInActiveP1
  };
  dbg.x.addPanel(panel1);
};

extsample.onLoad = function() {
  DebugJS.x.setBtnLabel('EXT1');
  extsample.addMorePanels();
};

extsample.addMorePanels = function() {
  var panel2 = {
    name: 'P2',
    onCreate: extsample.onCreateP2,
    onActive: extsample.onActiveP2,
    onInActive: extsample.onInActiveP2
  };
  dbg.x.addPanel(panel2);

  var panel3 = {
    name: 'P3',
    onCreate: extsample.onCreateP3,
    onActive: extsample.onActiveP3,
    onInActive: extsample.onInActiveP3
  };
  dbg.x.addPanel(panel3);
};

//--------------------------------------
extsample.onCreateP1 = function(panel) {
  log('onCreateP1');
  panel.innerHTML = 'panel1';
};

extsample.onActiveP1 = function(panel) {
  log('onActiveP1');
};

extsample.onInActiveP1 = function(panel) {
  log('onInActiveP1');
};

//--------------------------------------
extsample.onCreateP2 = function(panel) {
  log('onCreateP2');
  panel.innerHTML = 'panel2';
};

extsample.onActiveP2 = function(panel) {
  log('onActiveP2');
};

extsample.onInActiveP2 = function(panel) {
  log('onInActiveP2');
};

//--------------------------------------
extsample.onCreateP3 = function(panel) {
  log('onCreateP3');
  panel.innerHTML = 'panel3';
};

extsample.onActiveP3 = function(panel) {
  log('onActiveP3');
};

extsample.onInActiveP3 = function(panel) {
  log('onInActiveP3');
};

//--------------------------------------
extsample.init();
window.addEventListener('load', extsample.onLoad, true);
