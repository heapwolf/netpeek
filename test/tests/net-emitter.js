var netjack = require('../../netpeek')();
var assert = require('assert');

var testA = require('../fixtures/net');

netjack.on('data', function(data) {
  console.log(data);
});
