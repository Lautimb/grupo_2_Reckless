const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController')

/* GET Cart Page. */

router.get('/', cartController.cart);
router.get('/checkout', cartController.checkout);

module.exports = router;
