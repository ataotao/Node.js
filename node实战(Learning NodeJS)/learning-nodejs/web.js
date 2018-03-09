var http = require('http');

function process_request(req, res) {

    var body = 'Thinks for calling! \n';
    var content_length = body.length;

    res.writeHead(200, {
        'Content-Length': content_length,
        'Content-Type': 'text/plain'
    });
    res.write(body);
    res.end();
}

var s = http.createServer(process_request);
s.listen(3000);

// var http = require('http');

// http.createServer(function(request, response) {

//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.write('Hello World');
//   response.end();
// }).listen(8888);