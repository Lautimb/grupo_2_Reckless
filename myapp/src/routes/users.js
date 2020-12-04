const express = require('express');
const router = express.Router();
const validator = require('../middlewares/validator')

const usersController = require('../controllers/usersController')

/* GET Users page. */

router.get('/', usersController.index);
router.get('/register', usersController.register);
router.post('/register', validator.register, usersController.createUser);
router.post('/register-business', usersController.createBusinessUser);


module.exports = router;