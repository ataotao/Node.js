// 使用中间件

// 中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。

/**
 * 应用级中间件
 */

// 应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()， 其中， METHOD 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写。例如：
var express = require('express');
var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('app Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send('USER' + req.params.id);
});

// 下面这个例子展示了在一个挂载点装载一组中间件。
// 一个中间件栈，对任何指向 /user/:id 的 HTTP 请求打印出相关信息
app.use('/test/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

app.get('/test/:id', function (req, res, next) {
  res.send('USER' + req.params.id);
});


// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/tt/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('tt Info');
});

//作为中间件系统的路由句柄，使得为路径定义多个路由成为可能。在下面的例子中，为指向 /user/:id 的 GET 请求定义了两个路由。第二个路由虽然不会带来任何问题，但却永远不会被调用，因为第一个路由已经终止了请求-响应循环。
// 处理 /tt/:id， 打印出用户 id
app.get('/tt/:id', function (req, res, next) {
  res.end(req.params.id);
});

// 如果需要在中间件栈中跳过剩余中间件，调用 next('route') 方法将控制权交给下一个路由。 注意： next('route') 只对使用 app.VERB() 或 router.VERB() 加载的中间件有效。
// 一个中间件栈，处理指向 /next/:id 的 GET 请求
app.get('/next/:id', function (req, res, next) {
  // 如果 next id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 否则将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.send('regular');
});

// 处理 /next/:id， 渲染一个特殊页面
app.get('/next/:id', function (req, res, next) {
  res.send('special');
});


/**
 * 路由级中间件
 */
// 路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。
var router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('router Time:', Date.now());
  next();
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function(req, res, next) {
  console.log('router Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('router Request Type:', req.method);
  next();
});
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', function (req, res, next) {
  res.send('router Request Type:' + req.params.id);
});

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/aaa/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 负责将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.send('router regular');
});

// 处理 /user/:id， 渲染一个特殊页面
router.get('/aaa/:id', function (req, res, next) {
  console.log(req.params.id);
  res.send('router special');
});

// 将路由挂载至应用
app.use('/router', router);

/**
 * 错误处理中间件
 * 错误处理中间件有 4 个参数，定义错误处理中间件时必须使用这 4 个参数。
 * 即使不需要 next 对象，也必须在签名中声明它，否则中间件会被识别为一个常规中间件，不能处理错误。
 * 错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： (err, req, res, next)。
 */

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use('/error', function (req, res, next) {
  throw new Error('arguments are not numbers');
});

router.use('/error', function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.stack);
});



/**
 * 内置中间件
 * 从 4.x 版本开始，, Express 已经不再依赖 Connect 了。除了 express.static, Express 以前内置的中间件现在已经全部单独作为模块安装使用了。请参考 中间件列表。
 * 中间件列表 https://github.com/senchalabs/connect#middleware
 * express.static(root, [options])
 * express.static 是 Express 唯一内置的中间件。它基于 serve-static，负责在 Express 应用中提托管静态资源。
 * 参数 root 指提供静态资源的根目录。
 * 可选的 options 参数拥有如下属性。
 * 属性	            描述	                                                  类型	                                        缺省值
 * dotfiles	         是否对外输出文件名以点（.）开头的文件。                       可选值为 “allow”、“deny” 和 “ignore”	String	   “ignore”
 * etag	             是否启用 etag 生成	                                     Boolean	                                    true
 * extensions	     设置文件扩展名备份选项	                                  Array	                                         []
 * index	         发送目录索引文件，设置为 false                              禁用目录索引。	Mixed	                        “index.html”
 * lastModified	     设置 Last-Modified 头为文件在操作系统上的最后修改日期。        可能值为 true 或 false。	                        Boolean	true
 * maxAge	         以毫秒或者其字符串格式设置 Cache-Control 头的 max-age 属性。	  Number	                                     0
 * redirect	         当路径为目录时，重定向至 “/”。	                             Boolean	                                    true
 * setHeaders	     设置 HTTP 头以提供文件的函数。	                              Function	 
 */

//options 非比填
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
    }
}

//将资源文件夹指向到public ， 访问http://localhost:3000/images/pic1.jpg
app.use(express.static('public', options));

// 每个应用可有多个静态目录。
app.use(express.static('files')); //访问http://localhost:3000/images/pic2.jpg


/**
 * 第三方中间件
 * 请参考 第三方中间件 获取 Express 中经常用到的第三方中间件列表
 * 中间件列表 https://github.com/senchalabs/connect#middleware
 * 安装所需功能的 node 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。
 * 下面的例子安装并加载了一个解析 cookie 的中间件： cookie-parser
 * $ npm install cookie-parser --save
 */
var cookieParser = require('cookie-parser');

// 加载用于解析 cookie 的中间件
app.use(cookieParser());


app.get('/cookie', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies);

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies);
  res.send('Cookies: ' + JSON.stringify(req.cookies));
})


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
//   console.log('Example app listening at http://%s:%s', host, port);
});
