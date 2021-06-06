const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController')

router.get('/', productsAPIController.list)
router.get('/detail/:id', productsAPIController.detail)
router.post('/stocksList',productsAPIController.stocksList)


module.exports = router;