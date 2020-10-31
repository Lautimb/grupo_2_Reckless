const express = require('express');
const router = express.Router();

const registerController = require('../controllers/registerController')

/* GET Register page. */

router.get('/', registerController.index);


module.exports = router;