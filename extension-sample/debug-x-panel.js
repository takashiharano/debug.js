var extsample = extsample || {};

//--------------------------------------
extsample.p1Body = null;
extsample.p1ActiveCount = 0;

extsample.onCreateP1 = function(panel) {
  log('onCreateP1');
  panel.innerHTML = 'Panel1';
};

extsample.onActiveP1 = function(panel) {
  log('onActiveP1');
  extsample.p1ActiveCount++;

  var content = 'Panel1\n' +
                'Active = ' + extsample.p1ActiveCount;

  panel.innerHTML = content;
};

extsample.onInActiveP1 = function(panel) {
  log('onInActiveP1');
};

//--------------------------------------
extsample.onCreateP2 = function(panel) {
  log('onCreateP2');
  panel.innerHTML = 'Panel2';
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
  var html = '<div style="box-sizing:border-box; ' +
             'width:100%; ' +
             'height:100%; ' +
             'padding:4px; ' +
             'background:rgba(255, 240, 240, 0.6); ' +
             'color:#a00;">' +
             'Panel3' +
             '</div>';
  panel.innerHTML = html;
};

extsample.onActiveP3 = function(panel) {
  log('onActiveP3');
};

extsample.onInActiveP3 = function(panel) {
  log('onInActiveP3');
};

//--------------------------------------
extsample.init = function() {
  var p1base = document.createElement('pre');
  p1base.style.boxSizing = 'border-box';
  p1base.style.width = '100%';
  p1base.style.height = '100%';
  p1base.style.padding = '4px';

  var panel1 = {
    name: 'P1',
    panel: p1base,
    onCreate: extsample.onCreateP1,
    onActive: extsample.onActiveP1,
    onInActive: extsample.onInActiveP1
  };
  DebugJS.x.addPanel(panel1);
};

extsample.onLoad = function() {
  DebugJS.x.setBtnLabel('EXT');
  extsample.addMorePanels();
};

extsample.addMorePanels = function() {
  var p2base = document.createElement('div');
  p2base.style.boxSizing = 'border-box';
  p2base.style.width = '100%';
  p2base.style.height = '100%';
  p2base.style.padding = '4px';
  p2base.style.background = 'rgba(240, 255, 255, 0.6)';
  p2base.style.color = '#00f';

  var panel2 = {
    name: 'P2',
    panel: p2base,
    onCreate: extsample.onCreateP2,
    onActive: extsample.onActiveP2,
    onInActive: extsample.onInActiveP2
  };
  DebugJS.x.addPanel(panel2);

  var panel3 = {
    name: 'P3',
    onCreate: extsample.onCreateP3,
    onActive: extsample.onActiveP3,
    onInActive: extsample.onInActiveP3
  };
  DebugJS.x.addPanel(panel3);
};

//--------------------------------------
extsample.init();
window.addEventListener('load', extsample.onLoad, true);
