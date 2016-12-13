function CECReceive(client) {
  this.client = client;
  this.listeners = [];

  var context = this;

  this.client.stdout.on('data', function(data) {
    var buff = new Buffer(data);
    var line = buff.toString('utf8');

    var match = line.match(/^TRAFFIC:\s+\[.+\]\s+(<<|>>)\s(.+)/);
    if(match) {
      var opcode = match[2];
      
      for(var i = 0; i < context.listeners.length; i++) {
        var listener = context.listeners[i];
        if(listener.matcher.exec(opcode)) {
          listener.callback(opcode);
        }
      }
    }
  });
}

/**
 * Register a call back
 * @param {String} - The matcher. Use * as a wildcard. ie to listen to all volume reports to the audio device: *5:71
 * @params {Function} callback - the callback
 * @return {Int} Listener id. Used to cancel the listener.
 */
CECReceive.prototype.addListener = function(matcher, callback, id) {
  var id = this.listeners.length;
  
  this.listeners[id] = {
    matcher: new RegExp("^" + matcher.replace("*", "[0-9a-fA-F]")),
    callback: callback
  }
  
  return id;
}

CECReceive.prototype.removeListener = function(id) {
  if(id < this.listeners.length) {
    this.listeners.splice(id, 1);
  }
}

exports = module.exports = CECReceive;
