const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController')
router.get('/', usersAPIController.index)


module.exports = router;