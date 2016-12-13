var CECSend = require('./cec_send');
var CECReceive = require('./cec_receive');
var CECConstants = require('./cec_constants.js');

var spawn = require("child_process").spawn;
var client = spawn("cec-client", [ '-d', '8' ]);

process.on('exit', function() {
  client.kill();
});


exports.CONSTANTS = CECConstants;
exports.send = new CECSend(client);
exports.receive = new CECReceive(client);
