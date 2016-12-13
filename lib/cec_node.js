var CECSend = require('./cec_send');
var CECReceive = require('./cec_receive');
var CECConstants = require('./cec_constants.js');
var spawn = require("child_process").spawn;

var instance = null;

function getNameArgs(args, options) {
  if(options.name) {
    args.push('-o');
    args.push(options.name.substr(0, 13));
  }
  return args;
}

function getPortArgs(args, options) {
  if(options.port) {
    args.push('-p');
    args.push(options.port);
  }
  return args;
}

function getBaseArgs(args, options) {
  if(options.base) {
    args.push('-b');
    args.push(options.base);
  }
  return args;
}

function getMonitorArgs(args, options) {
  if(options.monitor === true) {
    args.push('-m');
  }
  return args;
}

function getCommportArgs(args, options) {
  if(options.commport) {
    args.push(options.commport);
  }
  return args;
}

function getTypeArgs(args, options) {
  if(options.types) {
    var types = options.types;

    if(typeof(type != 'array')) {
      types = [ types ];
    }

    for(var i = 0; i < types.length; i++) {
      var type = types[i];
      if(type == 'playback') {
        args.push('-t');
        args.push('p');
      } else if(type == 'recording') {
        args.push('-t');
        args.push('r');
      } else if(type == 'tv') {
        args.push('-t');
        args.push('t');
      } else if(type == 'audio') {
        args.push('-t');
        args.push('a');
      }
    }
  }

  return args;
}

function start(options) {
  if(instance == null) {
    var args = [ '-d', '8' ];
    args = getNameArgs(args, options);
    args = getPortArgs(args, options);
    args = getBaseArgs(args, options);
    args = getTypeArgs(args, options);
    args = getMonitorArgs(args, options);
    args = getCommportArgs(args, options);
    instance = spawn("cec-client", args);
  }
   
  var send = new CECSend(instance);
  var receive = new CECReceive(instance);

  return {
    send: send.tx.bind(send),
    addListener: receive.addListener.bind(receive),
    removeListener: receive.removeListener.bind(receive)
  }
}

function stop() {
  if(instance != null) {
    instance.kill();
    instance = null;
  }
}

process.on('exit', function() {
  stop();
});

exports.CONSTANTS = CECConstants;

exports.start = start;
exports.stop = stop;
