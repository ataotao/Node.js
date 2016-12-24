// 使用中间件
// 在 Express 中使用模板引擎
var express = require('express');
var app = express();

app.use(express.static('public'));

//设置模板路径
app.set('views', __dirname + '/views');
//设置模板引擎为ejs
app.set('view engine', 'ejs');

app.use('/', function (req, res) {
    //渲染html页面
    // res.sendfile('./views/index.html');  
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.use('/test', function (req, res) {
    //渲染html页面
    // res.send({ title: 'Hey', message: 'Hello there!'});
    res.render('index', { title: 'test', message: '测试接口'});
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
//   console.log('Example app listening at http://%s:%s', host, port);
});
