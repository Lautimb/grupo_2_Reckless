const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController')

router.post('/', usersAPIController.list)
router.post('/:id', usersAPIController.detail)
router.post('/addWishlist', usersAPIController.addWishlist)
router.post('/addWishlist/:id', usersAPIController.addWishlist)
router.delete('/removeWishlist/:id', usersAPIController.removeWishlist)

module.exports = router;