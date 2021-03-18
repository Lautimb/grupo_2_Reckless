const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController')

router.post('/', usersAPIController.list)
router.post('/:id', usersAPIController.detail)


module.exports = router;