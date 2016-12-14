function CECSend(client) {
  this.client = client;
}

CECSend.prototype.tx = function(code, callback) {
  this.client.stdin.write("tx " + code);
  callback();
}

exports = module.exports = CECSend;
