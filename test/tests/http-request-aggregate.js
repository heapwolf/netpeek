var netpeek = require('../../netpeek')({ aggregate: true });
var assert = require('assert');

var x = require('../fixtures/net');
var testA = require('../fixtures/http-request');


setTimeout(function() {

  console.log(netpeek.data)
  // assert(netpeek.data.bytesRead, 3);
  // assert(netpeek.data.bytesDispatched, 9);

}, 1000)
