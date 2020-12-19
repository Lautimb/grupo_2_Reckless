const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const cartController = require('../controllers/cartController')

/* GET Cart Page. */

router.get('/', cartController.cart);
router.get('/checkout',auth, cartController.checkout);

module.exports = router;
