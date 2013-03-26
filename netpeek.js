var inherit = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

var Emitter = function(opts) {

  opts = opts || {};

  this.data = {
    httpParseCount: 0,
    bytesRead: 0,
    bytesDispatched: 0
  };

  var that = this;

  function httpPeek(binding) {

    var execute = binding.prototype.execute;

    binding.prototype.execute = function() {
      that.data.httpParseCount++;
      execute.apply(this, arguments);
    };
  }

  function netPeek(binding) {

    var readStart = binding.prototype.readStart;

    binding.prototype.readStart = function() {
      if (opts.aggregate) {
        that.data.bytesRead += this.owner.bytesRead;
        that.data.bytesDispatched += this.owner._bytesDispatched;
      }
      else {
        that.data.bytesRead = this.owner.bytesRead;
        that.data.bytesDispatched = this.owner._bytesDispatched;
        that.emit('data', that.data);
      }
      readStart.apply(this, arguments);
    };
  }

  process._binding = process.binding;

  process.binding = function() {

    var binding = process._binding.apply(process, arguments);

    if (binding.TCP) {
      netPeek(binding.TCP, that.data);
    }
    else if (binding.HTTPParser) {
      httpPeek(binding.HTTPParser, that.data);
    }

    return binding;
  };

  EventEmitter.call(this);
};

inherit(Emitter, EventEmitter);

module.exports = function(opts) {
  return new Emitter(opts);
};
