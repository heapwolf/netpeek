# NAME
netpeek(3)

# SYNOPSIS
Find out how many bytes each module communicates over the network without using
c++

# USAGE
Netpeek can also take an option `{ aggregate: true }` if you want to add all the
bytes together instead of emitting them each time data is collected. Once Netpeek
is required, it will start collecting data from anywhere in your application.

```js
var netpeek = require('../../netpeek')();
var assert = require('assert');

require('./test/tests/http-request-aggregate');

netpeek.on('data', function(data) {
  console.log(data);
});
```

# EXAMPLES
Output data is json.
```json
{ 
  "/Users/workroot/git/hij1nx/net-peek/test/tests/http-request-aggregate.js": {
    "httpParseCount": 2,
    "bytesRead": 3423,
    "bytesDispatched": 496
  }
}
```

The following code (test/tests/http-request-aggregate.js) produced the output above.
```js
var http = require('http');

var options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST'
};

var req = http.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {});
});

req.on('error', function(e) {});

req.write('data\n');
req.write('data\n');
req.end();
```
