var extsample = extsample || {};

//-----------------------------------------------
// Panel1
//-----------------------------------------------
extsample.panel1 = {};
extsample.panel1.onCreate = function(panel) {
  log('[panel1] onCreate');
  panel.innerHTML = 'Panel 1';
};

extsample.panel1.onActive = function(panel) {
  log('[panel1] onActive');
};

extsample.panel1.onInActive = function(panel) {
  log('[panel1] onInActive');
};

//-----------------------------------------------
// Panel2
//-----------------------------------------------
extsample.panel2 = {};
extsample.panel2.onCreate = function(panel) {
  log('[panel2] onCreate');
  var html = '<div>Panel 2</div>';
  panel.innerHTML = html;
};

extsample.panel2.onActive = function(panel) {
  log('[panel2] onActive');
};

extsample.panel2.onInActive = function(panel) {
  log('[panel2] onInActive');
};

//-----------------------------------------------
// Panel3
//-----------------------------------------------
extsample.panel3 = {};
extsample.panel3.div = null;
extsample.panel3.onCreate = function(panel) {
  log('[panel3] onCreate');
  var div1 = document.createElement('div');
  div1.innerText = 'Panel 3';
  panel.appendChild(div1);

  var div2 = document.createElement('div');
  div2.innerText = '';
  panel.appendChild(div2);
  extsample.panel3.div = div2;
};

extsample.panel3.onActive = function(panel) {
  log('[panel3] onActive');
  var content = 'Date: ' + new Date();
  extsample.panel3.div.innerText = content;
};

extsample.panel3.onInActive = function(panel) {
  log('[panel3] onInActive');
};


//-----------------------------------------------
extsample.init = function() {
  extsample.registerPanel1();
  extsample.registerPanel2();
  extsample.registerPanel3();

  //dbg.x.pnl.setBtnLabel('EXT1');
};

extsample.registerPanel1 = function() {
  var panel1 = {
    name: 'PANEL1',
    onCreate: extsample.panel1.onCreate,
    onActive: extsample.panel1.onActive,
    onInActive: extsample.panel1.onInActive
  };
  dbg.x.pnl.add(panel1);
};

extsample.registerPanel2 = function() {
  var p2base = document.createElement('div');
  p2base.style.boxSizing = 'border-box';
  p2base.style.width = '100%';
  p2base.style.height = '100%';
  p2base.style.padding = '4px';

  var panel2 = {
    name: 'PANEL2',
    panel: p2base,
    onCreate: extsample.panel2.onCreate,
    onActive: extsample.panel2.onActive,
    onInActive: extsample.panel2.onInActive
  };
  dbg.x.pnl.add(panel2);
};

extsample.registerPanel3 = function() {
  var p1base = document.createElement('pre');
  p1base.style.boxSizing = 'border-box';
  p1base.style.width = '100%';
  p1base.style.height = '100%';
  p1base.style.padding = '4px';

  var panel3 = {
    name: 'PANEL3',
    panel: p1base,
    onCreate: extsample.panel3.onCreate,
    onActive: extsample.panel3.onActive,
    onInActive: extsample.panel3.onInActive,
    hidden: true
  };
  dbg.x.pnl.add(panel3);
};


//-----------------------------------------------
extsample.init();
