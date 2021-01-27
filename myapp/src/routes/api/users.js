const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController')

router.post('/', usersAPIController.list)


module.exports = router;