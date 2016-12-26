// 权限控制
module.exports = {
    // checkLogin: 用于需要用户登录才能操作的页面及接口
    checkLogin: function checkLogin(req, res, next) {
        //当用户信息（req.session.user）不存在，即认为用户没有登录
        if (!req.session.user) {
            //则跳转到登录页，同时显示 未登录 的通知
            req.flash('error', '未登录');
            return res.redirect('/signin');
        }
        next();
    },
    //checkNotLogin: 如登录、注册页面及登录、注册的接口
    checkNotLogin: function checkNotLogin(req, res, next) {
        //当用户信息（req.session.user）存在，即认为用户已经登录
        if (req.session.user) {
            // 则跳转到之前的页面，同时显示 已登录 的通知
            req.flash('error', '已登录');
            return res.redirect('back');//返回之前的页面
        }
        next();
    }
};