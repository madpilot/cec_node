function CECSend(client) {
  this.client = client;
}

CECSend.prototype.tx = function(code, callback) {
  this.client.stdin.write("tx " + code);
}

exports = module.exports = CECSend;
