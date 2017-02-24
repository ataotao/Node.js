// var http = require('http');

// http.createServer(function(request, response) {

//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.write('Hello World');
//   response.end();
// }).listen(8888);

/*
  （请注意，当我们在服务器访问网页时，我们的服务器可能会输出两次“Request received.”。
  那是因为大部分浏览器都会在你访问 http://localhost:8888/ 时尝试读取 http://localhost:8888/favicon.ico )
*/

var http = require('http');
var url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Request for ' + pathname + ' received.');
        route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(15000);
    console.log('Server has started.');
}

exports.start = start;


