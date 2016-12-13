var CECSend = require('./cec_send');
var CECReceive = require('./cec_receive');

var spawn = require("child_process").spawn;
var client = spawn("cec-client", [ '-d', '8' ]);

process.on('exit', function() {
  client.kill();
});


exports.send = new exports.CECSend(client);
exports.receive = new exports.CECReceive(client);
