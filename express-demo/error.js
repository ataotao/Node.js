// 错误处理
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(express.static('public'));


// 如果向 next() 传入参数（除了 ‘route’ 字符串），Express 会认为当前请求有错误的输出，因此跳过后续其他非错误处理和路由/中间件函数。如果需做特殊处理，需要创建新的错误处理路由，如下节所示。
// 如果路由句柄有多个回调函数，可使用 ‘route’ 参数跳到下一个路由句柄。比如：
app.get('/a_route_behind_paywall', 
  function checkIfPaidSubscriber(req, res, next) {
  if(!req.user.hasPaid) { 
    // 继续处理该请求
     next('route');
  }
  }, function getPaidContent(req, res, next) {
    PaidContent.find(function(err, doc) {
      if(err) return next(err);
      res.json(doc);
    });
  });


// 在其他 app.use() 和路由调用后，最后定义错误处理中间件，比如：
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// logErrors 将请求和错误信息写入标准错误输出、日志或类似服务：
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

// clientErrorHandler 的定义如下（注意这里将错误直接传给了 next）：
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something blew up!' });
  } else {
    next(err);
  }
}
// errorHandler 能捕获所有错误，其定义如下：
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.send(err.message);
}

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
