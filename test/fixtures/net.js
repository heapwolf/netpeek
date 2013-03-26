var net = require('net');

var server = net.createServer(function(c) {
  c.on('1', function() {});
  c.write('1');
  c.pipe(c);
});

server.listen(8124, function() {

  var client = net.connect({port: 8124}, function() {
    client.write('1');
  });

  client.on('data', function(data) {
    client.end();
  });

  client.on('end', function() {});

});
