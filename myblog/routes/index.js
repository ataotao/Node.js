module.exports = function (app) {
    //默认访问/目录时跳转到/posts
    app.get('/', function (req, res) {
        res.redirect('/posts');
    });
    //注册页
    app.use('/signup', require('./signup'));
    //登录页
    app.use('/signin', require('./signin'));
    //退出
    app.use('/signout', require('./signout'));
    //文章页
    app.use('/posts', require('./posts'));
};