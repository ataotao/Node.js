var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express', photolist: photolist });
  res.redirect('/home/2016');
});

//按年索引列表
router.get('/home/:year', function(req, res, next) {
  var photolist = require('../public/json/' + req.params.year + '.json');
  var current = req.params.year;
  res.render('index', { current: current, photolist: photolist });

});

module.exports = router;