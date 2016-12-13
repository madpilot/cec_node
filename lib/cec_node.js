var CECSend = require('./cec_send');
var CECReceive = require('./cec_receive');
var CECConstants = require('./cec_constants.js');
var spawn = require("child_process").spawn;

var instance = null;

process.on('exit', function() {
  stop();
});

function start(type, monitor) {
  if(instance == null) {
    instance = spawn("cec-client", [ '-d', '8' ]);
  }
   
  var send = new CECSend(instance);
  var receive = new CECReceive(instance);

  return {
    send: send.tx,
    addListener: receive.addListener,
    removeListener: receive.removeListener;
  }
}

function stop() {
  if(instance != null) {
    instance.kill();
    instance = null;
  }
}

process.on('exit', function() {
  client.kill();
});

exports.CONSTANTS = CECConstants;

exports.start = start;
exports.stop = stop;
