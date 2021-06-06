const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const cartController = require('../controllers/cartController')

/* GET Cart Page. */

router.get('/', cartController.cart);

// cart/addToCart

router.post('/addToCart/:id', cartController.addToCart);

// cart/deleteFromCart

router.delete('/delete/:id', cartController.delete);

//cart/shop
router.post("/shop", cartController.shop);

//cart/checkout

router.get('/checkout',auth, cartController.checkout);

module.exports = router;
