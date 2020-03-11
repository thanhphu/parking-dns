let named = require('./lib/index');
let server = named.createServer();
let ttl = 300;
let port = 9953;

server.listen(port, '0.0.0.0', function () {
  console.log('DNS server started on port', port);
});

server.on('query', function (query) {
  var domain = query.name();
  console.log('DNS Query: %s', domain)
  switch (query.type()) {
    case "SOA":
      query.addAnswer(domain, new named.SOARecord(domain, {
        serial: 201905150000
      }), ttl);
      break;
    case "A":
      query.addAnswer(domain, new named.ARecord("183.111.125.105"), ttl);
      break;
    case "MX":
      query.addAnswer(domain, new named.MXRecord("mx1.forwardemail.net", {
        priority: 10
      }), ttl);
      break;
    case "TXT":
      query.addAnswer(domain, new named.TXTRecord("forward-email=inquiry-" + domain + "@netviet.kr"), ttl);
      break;
  }
  server.send(query);
});