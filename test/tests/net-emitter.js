var netpeek = require('../../netpeek')();
var assert = require('assert');

var testA = require('../fixtures/net');

netpeek.on('data', function(data) {
  console.log(data);
});
