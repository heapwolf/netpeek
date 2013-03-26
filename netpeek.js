var inherit = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

var Emitter = function(opts) {

  opts = opts || {};

  this.data = {};

  var that = this;

  function httpPeek(binding, report) {

    var execute = binding.prototype.execute;

    binding.prototype.execute = function() {
      report.httpParseCount++;
      execute.apply(this, arguments);
    };
  }

  function netPeek(binding, report) {

    var readStart = binding.prototype.readStart;

    binding.prototype.readStart = function() {

      if (opts.aggregate) {
        report.bytesRead += this.owner.bytesRead;
        report.bytesDispatched += this.owner._bytesDispatched;
      }
      else {
        report.bytesRead = this.owner.bytesRead;
        report.bytesDispatched = this.owner._bytesDispatched;
        that.emit('data', report);
      }
      readStart.apply(this, arguments);
    };
  }

  process._binding = process.binding;

  process.binding = function() {

    var binding = process._binding.apply(process, arguments);

    if (binding.TCP) {
      that.data[module.parent.filename] = that.data[module.parent.filename] || {
        bytesRead: 0,
        bytesDispatched: 0
      };
      netPeek(binding.TCP, that.data[module.parent.filename]);
    }
    else if (binding.HTTPParser) {
      that.data[module.parent.filename] = that.data[module.parent.filename] || {
        httpParseCount: 0,
        bytesRead: 0,
        bytesDispatched: 0
      };
      httpPeek(binding.HTTPParser, that.data[module.parent.filename]);
    }

    return binding;
  };

  EventEmitter.call(this);
};

inherit(Emitter, EventEmitter);

module.exports = function(opts) {
  return new Emitter(opts);
};
