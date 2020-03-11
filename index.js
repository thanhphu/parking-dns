let named = require('./lib/index');
let server = named.createServer();
let ttl = 300;
let port = 53;

server.listen(port, '0.0.0.0', function () {
  console.log('DNS server started on port ', port);
});

server.on('query', function (query) {
  var domain = query.name();
  console.log('DNS Query: %s', domain)
  var target = new named.SOARecord(domain, { serial: 12345 });
  query.addAnswer(domain, target, ttl);
  server.send(query);
});