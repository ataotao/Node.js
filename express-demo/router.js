// 路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成，它的结构如下： 
// app.METHOD(path, [callback...], callback)， 
// app 是 express 对象的一个实例， METHOD 是一个 HTTP 请求方法， path 是服务器上的路径， callback 是当路由匹配时要执行的函数。

var express = require('express');
var app = express();

// app.all() 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。
// 在下面的例子中，来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  res.send('Accessing the secret section ...');
  next(); // pass control to the next handler
});

// 匹配根路径的请求
app.get('/', function (req, res) {
  res.send('root');
});

// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
  res.send('about');
});

// 匹配 /random.text 路径的请求
app.get('/random.text', function (req, res) {
  res.send('random.text');
});

// 匹配 acd 和 abcd
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});

// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});

// 匹配任何路径中含有 a 的路径：
// app.get(/a/, function(req, res) {
//   res.send('/a/');
// });

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});


// 使用多个回调函数处理路由（记得指定 next 对象）：
app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});

//使用回调函数数组处理路由：
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from CB2!');
}

app.get('/example/c', [cb0, cb1, cb2]);

// 混合使用函数和函数数组处理路由：
var cb0 = function (req, res, next) {
  console.log('混合CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('混合CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
    //res.json({ user: 'tobi' });
    // res.status(500).json({ error: 'message' })
  res.send('混合 Hello from D!');
});


//app.route()
// 可使用 app.route() 创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误。
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

//express.Router 访问 http://localhost:3000/birds
var birds = require('./router-birds');
app.use('/birds', birds);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
//   console.log('Example app listening at http://%s:%s', host, port);
});