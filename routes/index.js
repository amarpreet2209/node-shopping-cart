var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');

var csurfProtection = csurf();
router.use(csurfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find(function(err, docs) {
      res.render('shop/index', { title: 'Shopping Cart', products: docs });
  });
 
});

router.get('/user/signup', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/user/profile', function(req, res, next) {
  res.render('user/profile');
});


module.exports = router;
