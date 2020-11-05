const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController')

/* GET Shop page. */


router.get('/', productsController.index);
router.get('/detail', productsController.detail);
router.get('/wishlist', productsController.wishlist);
router.get('/upload', productsController.upload);


module.exports = router;
