var path = require('path');
var express = require('express');
//session 中间件
var session = require('express-session');
//将 session 存储于 mongodb，结合 express-session 使用
var MongoStore = require('connect-mongo')(session);
//页面通知提示的中间件，基于 session 实现
var flash = require('connect-flash');
//读取配置文件
var config = require('config-lite');
//路由
var routes = require('./routes');
var pkg = require('./package');

var app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// session 中间件
app.use(session({
    name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    })
}));

// flash 中间价，用来显示通知
app.use(flash());

// 处理表单及文件上传的中间件
//我们使用 express-formidable 处理 form 表单（包括文件上传
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
    keepExtensions: true // 保留后缀
}));

/**
 * 设置全局变量和模板变量
 * 这样在调用 res.render 的时候就不用传入这四个变量了，express 为我们自动 merge 并传入了模板，所以我们可以在模板中直接使用这四个变量。
 */
// 设置模板全局常量
//app.locals 上通常挂载常量信息（如博客名、描述、作者信息）
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
};

// 添加模板必需的三个变量
//res.locals 上通常挂载变量信息，即每次请求可能的值都不一样（如请求者信息，res.locals.user = req.session.user）。
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

// 路由执行
routes(app);

// 监听端口，启动程序
app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`);
});

// 注意：中间件的加载顺序很重要。如上面设置静态文件目录的中间件应该放到 routes(app) 之前加载，这样静态文件的请求就不会落到业务逻辑的路由里；flash 中间件应该放到 session 中间件之后加载，因为 flash 是基于 session 的。

// 运行 supervisor --harmony index 启动博客，访问以下地址查看效果：

// http://localhost:3000/posts
// http://localhost:3000/signout
// http://localhost:3000/signup