var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csurf = require('csurf');

var csurfProtection = csurf();
router.use(csurfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find(function(err, docs) {
      res.render('shop/index', { title: 'Shopping Cart', products: docs });
  });
 
});

router.get('/user/signup', function(req, res, next) {
  res.render('user/signup', {csrfToken: req.csrfToken()});
});

router.post('/user/signup', function(req, res, next) {
  res.redirect('/');
});


module.exports = router;
