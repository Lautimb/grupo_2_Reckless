const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController')

/* GET Users page. */

router.get('/', usersController.index);
router.get('/register', usersController.register);


module.exports = router;