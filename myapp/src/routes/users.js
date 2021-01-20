const express = require('express');
const router = express.Router();
const validator = require('../middlewares/validator')

const usersController = require('../controllers/usersController');
const auth = require('../middlewares/auth');
const guest = require('../middlewares/guest');

/* GET Users page. */

router.get('/profile', auth, usersController.index);
router.get('/edit/:id', auth, usersController.edit);
router.put('/edit/:id', auth, usersController.update);
router.get('/login', guest, usersController.requireLogin);
router.post('/login',guest, validator.login, usersController.processLogin);
router.get('/register',guest, usersController.register);
router.post('/register', validator.register, usersController.createUser);
router.get('/logout',auth, usersController.logout)



module.exports = router;