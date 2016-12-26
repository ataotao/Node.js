var express = require('express');
var router = express.Router();

//验证权限
var checkLogin = require('../middlewares/check').checkLogin;

// GET /signout 登出
router.get('/', checkLogin, function (req, res, next) {
    res.send(req.flash());
});

module.exports = router;