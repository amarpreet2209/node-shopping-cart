var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find(function(err, docs) {
      res.render('shop/index', { title: 'Shopping Cart', products: docs });
  });
 
});

router.get('/add-to-cart/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart.items : {});
  
  Product.findById(productId, function (err, product) {
      cart.add(product, product.id);
      req.session.cart = cart;
      res.redirect('/');
  });
});

router.get('/shopping-cart', function (req, res, next) {
  if (!req.session.cart) {
      return res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart.items);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', function(req, res, next) {
  if (!req.session.cart) {
      return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart.items);
  res.render('shop/checkout', {total: cart.totalPrice})  
});


module.exports = router;
