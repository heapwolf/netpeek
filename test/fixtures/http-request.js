var http = require('http');

var options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST'
};

require('./net');

var req = http.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {});
});

req.on('error', function(e) {});

req.write('data\n');
req.write('data\n');
req.end();