const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController')

router.post('/', usersAPIController.list)
router.post('/detail/:id', usersAPIController.detail)
router.post('/addWishlist', usersAPIController.addWishlist)
router.post('/removeWishlist', usersAPIController.removeWishlist)
router.post('/log', usersAPIController.log)
router.get('/addedWishlists', usersAPIController.addedWishlists)

module.exports = router;