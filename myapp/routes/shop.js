const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shopController')

/* GET Shop page. */


router.get('/', shopController.index);
router.get('/product-detail', shopController.productDetail);
router.get('/wishlist', shopController.wishlist);


module.exports = router;
