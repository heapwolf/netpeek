var netjack = require('../../netpeek')({ aggregate: true });
var assert = require('assert');

var testA = require('../fixtures/http-request');

setTimeout(function() {

  console.log(netjack.data)
  // assert(netjack.data.bytesRead, 3);
  // assert(netjack.data.bytesDispatched, 9);

}, 1000)
